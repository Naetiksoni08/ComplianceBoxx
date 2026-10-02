<?php
/**
 * ComplianceBoxx — Lead Capture Handler
 * ---------------------------------------------------------------------------
 * Flow:  form POST  ->  validate  ->  save to MySQL  ->  send 2 emails  ->  JSON
 *
 * Design notes:
 *  - Database insert happens BEFORE email, so a mail failure never loses a lead.
 *  - No Composer / no PHPMailer. Uses PHP's own stream_socket_client for SMTP,
 *    because Hostinger's Single plan has no SSH and Composer is unavailable.
 *  - All secrets live in .env, which this script never prints.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/* -------------------------------------------------------------------------
 * 0. Reject anything that is not a form POST.
 *    This also means opening /contact.php in a browser returns harmless JSON
 *    instead of leaking config or running the handler.
 * ---------------------------------------------------------------------- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

if (!extension_loaded('mysqli')) {
    respond(500, ['ok' => false, 'error' => 'Server setup incomplete: mysqli extension is missing']);
}

if (!extension_loaded('mbstring')) {
    respond(500, ['ok' => false, 'error' => 'Server setup incomplete: mbstring extension is missing']);
}

/** Used in error messages before .env has been read. */
const PHONE_FALLBACK = '+91 99112 92157';

/* -------------------------------------------------------------------------
 * 1. Config
 * ---------------------------------------------------------------------- */

/** Read .env from outside public_html first, then from this folder. */
function load_env(): array
{
    $candidates = [
        dirname(__DIR__) . '/.env',   // /home/<user>/.env  <- preferred
        __DIR__ . '/.env',            // public_html/.env   <- fallback
    ];

    foreach ($candidates as $file) {
        if (!is_readable($file)) {
            continue;
        }
        $parsed = @parse_ini_file($file, false, INI_SCANNER_RAW);
        if (is_array($parsed) && $parsed !== []) {
            return $parsed;
        }
    }

    respond(
        500,
        [
            'ok' => false,
            'error' => 'Server setup incomplete: .env file not found. '
                . 'Upload it one level ABOVE the public_html folder, '
                . 'or inside public_html (a .htaccess rule blocks direct access).',
        ]
    );
}

$env = load_env();

$config = [
    'db' => [
        'host'    => $env['DB_HOST'] ?? 'localhost',
        'name'    => $env['DB_NAME'] ?? '',
        'user'    => $env['DB_USER'] ?? '',
        'pass'    => $env['DB_PASS'] ?? '',
    ],
    'mail' => [
        'host'         => $env['MAIL_HOST']    ?? 'smtp.hostinger.com',
        'port'         => (int) ($env['MAIL_PORT'] ?? 587),
        'user'         => $env['MAIL_USER']    ?? '',
        'pass'         => $env['MAIL_PASS']    ?? '',
        'from'         => $env['MAIL_FROM']    ?? '',
        'from_name'    => $env['MAIL_FROM_NAME'] ?? 'ComplianceBoxx',
    ],
    'alerts' => [
        'to_user'    => filter_var($env['SEND_MAIL_TO_USER']    ?? 'true', FILTER_VALIDATE_BOOLEAN),
        'to_founder' => filter_var($env['SEND_MAIL_TO_FOUNDER'] ?? 'true', FILTER_VALIDATE_BOOLEAN),
        'founder'    => $env['FOUNDER_EMAIL'] ?? '',
    ],
    'site' => [
        'name'    => $env['SITE_NAME'] ?? 'ComplianceBoxx',
        'phone'   => $env['SITE_PHONE'] ?? '+91 99112 92157',
        'phone_e164' => $env['SITE_PHONE_E164'] ?? '+919911292157',
    ],
];

// Nothing works without a database.
if ($config['db']['name'] === '' || $config['db']['user'] === '') {
    respond(500, ['ok' => false, 'error' => 'Server setup incomplete: DB_NAME / DB_USER missing in .env']);
}

/* -------------------------------------------------------------------------
 * 2. Anti-spam
 * ---------------------------------------------------------------------- */

/* 2a. Honeypot — a real person never sees this field, so it must stay empty.
       Bots fill every input they find. */
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    // Silently pretend success so the bot learns nothing.
    respond(200, ['ok' => true]);
}

/* 2b. Rate limit — max 5 submissions per IP per hour. */
function rate_limit(): void
{
    $dir = sys_get_temp_dir() . '/cbx_rl';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return; // cannot track; do not block a real lead
    }

    $ip  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = $dir . '/' . sha1($ip) . '.json';
    $now = time();

    $state = ['hits' => []];
    if (is_readable($key)) {
        $decoded = json_decode((string) @file_get_contents($key), true);
        if (is_array($decoded) && isset($decoded['hits']) && is_array($decoded['hits'])) {
            $state = $decoded;
        }
    }

    $recent = array_values(array_filter(
        $state['hits'],
        static fn($t) => is_int($t) && ($now - $t) < 3600
    ));

    if (count($recent) >= 5) {
        respond(429, [
            'ok' => false,
            'error' => 'Too many requests from your connection. '
                . 'Please try again later, or call us on ' . PHONE_FALLBACK . '.',
        ]);
    }

    $recent[] = $now;
    @file_put_contents($key, json_encode(['hits' => $recent]), LOCK_EX);
}

rate_limit();

/* -------------------------------------------------------------------------
 * 3. Read + validate input
 * ---------------------------------------------------------------------- */

function clean(string $key, int $max = 255): string
{
    $value = $_POST[$key] ?? '';
    $value = is_string($value) ? $value : '';
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return trim(mb_substr($value, 0, $max, 'UTF-8'));
}

/**
 * Convert whatever the customer typed into E.164 form (+919311251825).
 *
 * The "Call now" and "WhatsApp" buttons in the founder alert link straight to
 * the customer's number, so the number has to be stored in one unambiguous
 * shape or the links break. This accepts every format a real person types:
 *
 *   "9311251825"          -> +919311251825
 *   "+91 93112 51825"     -> +919311251825
 *   "(011) 9311-251825"   -> +911123112518  (trunk 0 dropped)
 *   "0091 93112 51825"    -> +919311251825
 *
 * Returns '' when no digits are present.
 */
function normalize_phone_e164(string $raw): string
{
    $raw = trim($raw);
    if ($raw === '') {
        return '';
    }

    $digits = preg_replace('/\D+/', '', $raw);
    if ($digits === null || $digits === '') {
        return '';
    }

    // International prefix written as "00 91 ..."
    if (str_starts_with($digits, '00')) {
        $rest = substr($digits, 2);
        return $rest === '' ? '' : '+' . $rest;
    }

    // Explicit country code typed with a leading "+".
    if (str_starts_with($raw, '+')) {
        return '+' . $digits;
    }

    // Trunk zero written without a country code, e.g. "09311251825".
    if (strlen($digits) > 10 && $digits[0] === '0') {
        return '+' . substr($digits, 1);
    }

    // Bare 10-digit national number. ComplianceBoxx is an Indian firm, so this
    // is treated as Indian rather than rejected. The country picker on the form
    // normally means the browser already sent a full "+<code>" number.
    if (strlen($digits) === 10) {
        return '+91' . $digits;
    }

    return '+' . $digits;
}

/**
 * Render an E.164 number the way a person would read it aloud:
 * +919311251825 becomes "+91 93112 51825".
 *
 * Only used for display in the emails — the buttons always link to the
 * canonical E.164 form.
 */
function format_phone_display(string $e164): string
{
    $digits = ltrim($e164, '+');
    if ($digits === '') {
        return '';
    }

    // Longest first, so +971 wins over +1 and +91 over +9.
    $codes   = ['971', '974', '966', '965', '880', '977', '94', '91', '61', '44', '86', '81', '65', '60', '49', '33', '1'];
    $code    = '1';
    foreach ($codes as $candidate) {
        if (str_starts_with($digits, $candidate)) {
            $code = $candidate;
            break;
        }
    }

    $rest = substr($digits, strlen($code));
    if ($rest === false || $rest === '') {
        return '+' . $digits;
    }

    // Indian mobile numbers are quoted as 5 + 5 digits, not 3 + 3 + 4.
    if ($code === '91' && strlen($rest) === 10) {
        $grouped = substr($rest, 0, 5) . ' ' . substr($rest, 5, 5);
    } else {
        $grouped = trim(chunk_split($rest, 3, ' '));
    }

    return '+' . $code . ' ' . $grouped;
}

$lead = [
    'name'    => clean('name', 120),
    'phone'   => clean('phone', 30),
    'email'   => clean('email', 190),
    'service' => clean('service', 100),
    'message' => clean('message', 4000),
    'page'    => clean('source_page', 255),
];

// One canonical format (+919311251825) is stored and emailed, so the
// Call / WhatsApp links can never point at the wrong number.
$lead['phone'] = normalize_phone_e164($lead['phone']);

// Pretty version for the emails, e.g. "+91 93112 51825".
$lead['phone_display'] = format_phone_display($lead['phone']);

$errors = [];

if ($lead['name'] === '' || mb_strlen($lead['name']) < 2) {
    $errors['name'] = 'Please enter your name.';
}
$phoneDigits = ltrim($lead['phone'], '+');
if ($phoneDigits === '' || strlen($phoneDigits) < 7 || strlen($phoneDigits) > 15) {
    $errors['phone'] = 'Please enter a valid phone number.';
}
if (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
}
if ($lead['service'] === '' || $lead['service'] === '-') {
    $errors['service'] = 'Please select a service.';
}
if ($lead['message'] === '' || mb_strlen($lead['message']) < 5) {
    $errors['message'] = 'Please tell us briefly what you need.';
}

if ($errors !== []) {
    respond(422, [
        'ok' => false,
        'error' => 'Please check the highlighted fields.',
        'fields' => $errors,
    ]);
}

/** Map the dropdown value to the label shown in emails. */
function service_label(string $value, array $map): string
{
    return $map[$value] ?? $value;
}

$serviceMap = [
    'company-registration' => 'Company Registration',
    'gst'                  => 'GST Registration & Filing',
    'roc-mca'              => 'ROC / MCA Compliance',
    'trademark'            => 'Trademark Registration',
    'fssai'                => 'FSSAI License',
    'labour-law'           => 'Labour Law Compliance',
    'tax-filing'           => 'Income Tax Filing & Advisory',
    'licenses'             => 'Business Licenses & Permits',
    'other'                => 'Other',
];

$lead['service_label'] = service_label($lead['service'], $serviceMap);

$meta = [
    'ip'         => $_SERVER['REMOTE_ADDR'] ?? '',
    'user_agent' => mb_substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255, 'UTF-8'),
];

/* -------------------------------------------------------------------------
 * 4. Save to MySQL FIRST (a lead must never depend on email succeeding)
 * ---------------------------------------------------------------------- */

mysqli_report(MYSQLI_REPORT_OFF); // we handle errors ourselves

$db = @new mysqli(
    $config['db']['host'],
    $config['db']['user'],
    $config['db']['pass'],
    $config['db']['name']
);

if ($db->connect_errno) {
    // Do not leak connection details to the browser.
    error_log('[contact.php] DB connect failed: ' . $db->connect_error);
    respond(500, [
        'ok' => false,
        'error' => 'We could not save your enquiry right now. Please call us on '
            . $config['site']['phone'] . '.',
    ]);
}

$db->set_charset('utf8mb4');

$stmt = $db->prepare(
    'INSERT INTO leads (name, phone, email, service, service_label, message, source_page, ip_address, user_agent, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);

if ($stmt === false) {
    error_log('[contact.php] prepare failed: ' . $db->error);
    respond(500, [
        'ok' => false,
        'error' => 'We could not save your enquiry right now. Please call us on '
            . $config['site']['phone'] . '.',
    ]);
}

$status    = 'new';
$leadSaved = false;

$stmt->bind_param(
    'ssssssssss',
    $lead['name'],
    $lead['phone'],
    $lead['email'],
    $lead['service'],
    $lead['service_label'],
    $lead['message'],
    $lead['page'],
    $meta['ip'],
    $meta['user_agent'],
    $status
);

if ($stmt->execute()) {
    $leadSaved = true;
    $leadId    = (int) $db->insert_id;
} else {
    error_log('[contact.php] insert failed: ' . $stmt->error);
}

$stmt->close();
$db->close();

if (!$leadSaved) {
    respond(500, [
        'ok' => false,
        'error' => 'We could not save your enquiry right now. Please call us on '
            . $config['site']['phone'] . '.',
    ]);
}

$lead['id'] = $leadId ?? 0;

/* -------------------------------------------------------------------------
 * 5. Send emails (lead is already safe in the database)
 * ---------------------------------------------------------------------- */

$sent = ['user' => false, 'founder' => false];

if ($config['mail']['user'] !== '' && $config['mail']['pass'] !== '') {

    // 5a. Confirmation to the person who filled the form
    if ($config['alerts']['to_user'] && $lead['email'] !== '') {
        $bodyHtml = mail_template_user($lead, $config);
        $bodyText = mail_text_user($lead, $config);
        $sent['user'] = smtp_send(
            $config['mail'],
            $lead['email'],
            $lead['name'],
            'We have received your enquiry - ' . $config['site']['name'],
            $bodyHtml,
            $bodyText,
            // If the customer replies, it must come back to the team.
            $config['mail']['from']
        );
    }

    // 5b. Alert to the founder / team
    if ($config['alerts']['to_founder'] && $config['alerts']['founder'] !== '') {
        $bodyHtml = mail_template_founder($lead, $config);
        $bodyText = mail_text_founder($lead, $config);
        $sent['founder'] = smtp_send(
            $config['mail'],
            $config['alerts']['founder'],
            $lead['name'],
            'New enquiry: ' . $lead['name'] . ' - ' . $lead['service_label'],
            $bodyHtml,
            $bodyText,
            // Replying to this alert goes straight to the customer.
            $lead['email']
        );
    }

    if (!$sent['user'] && !$sent['founder']) {
        error_log('[contact.php] lead #' . $lead['id'] . ' saved but all emails failed');
    }
} else {
    error_log('[contact.php] SMTP not configured in .env — lead #' . $lead['id'] . ' saved, no email sent');
}

/* -------------------------------------------------------------------------
 * 6. Respond
 * ---------------------------------------------------------------------- */

respond(200, [
    'ok' => true,
    'id' => $lead['id'],
    'message' => 'Thank you! We have received your enquiry. Our team will contact you within 24 hours.',
]);

/* =========================================================================
 * Helpers
 * ====================================================================== */

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/* -------------------------------------------------------------------------
 * Minimal SMTP client (STARTTLS + AUTH LOGIN), no external dependencies.
 * ---------------------------------------------------------------------- */
function smtp_send(array $mail, string $to, string $toName, string $subject, string $html, string $text, string $replyTo = ''): bool
{
    $host = $mail['host'];
    $port = $mail['port'];
    $from = $mail['from'];

    if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL) || !filter_var($from, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    $errno  = 0;
    $errstr = '';
    $socket = @stream_socket_client(
        $host . ':' . $port,
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT
    );

    if (!$socket) {
        error_log('[smtp] connect failed: ' . $errstr);
        return false;
    }

    stream_set_timeout($socket, 15);

    try {
        $greeting = smtp_cmd($socket, '');
        if ($greeting !== 220) {
            error_log('[smtp] unexpected greeting: ' . $greeting);
            return false;
        }

        $domain = preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['SERVER_NAME'] ?? 'localhost') ?: 'localhost';

        if (($code = smtp_cmd($socket, 'EHLO ' . $domain)) !== 250) {
            error_log('[smtp] EHLO failed: ' . $code);
            return false;
        }

        // Upgrade to TLS when the server supports it.
        // 220 = accepted, 502/454 = not offered (plain relay), anything else = fail.
        $tlsCode = smtp_cmd($socket, 'STARTTLS');
        error_log('[smtp] STARTTLS -> ' . $tlsCode);
        if ($tlsCode === 220) {
            $cryptoOk = @stream_socket_enable_crypto(
                $socket,
                true,
                STREAM_CRYPTO_METHOD_TLS_CLIENT
            );
            if ($cryptoOk !== true) {
                error_log('[smtp] STARTTLS handshake failed');
                return false;
            }
            // RFC 3207: re-issue EHLO after the handshake.
            if (($code = smtp_cmd($socket, 'EHLO ' . $domain)) !== 250) {
                error_log('[smtp] EHLO after TLS failed: ' . $code);
                return false;
            }
        } elseif ($tlsCode !== 502 && $tlsCode !== 454 && $tlsCode !== -1) {
            error_log('[smtp] STARTTLS rejected with code ' . $tlsCode);
            return false;
        }

        // Authenticate. Some relays are open (no AUTH at all), so a "command not
        // implemented" is allowed through. A rejected password is a hard failure.
        if ($mail['user'] !== '') {
            $authCode = smtp_cmd($socket, 'AUTH LOGIN');
            error_log('[smtp] AUTH LOGIN -> ' . $authCode);

            if ($authCode === 334) {
                $u = smtp_cmd($socket, base64_encode($mail['user']));
                if ($u !== 334) {
                    error_log('[smtp] AUTH username step failed: ' . $u);
                    return false;
                }
                $passCode = smtp_cmd($socket, base64_encode($mail['pass']));
                error_log('[smtp] AUTH password step -> ' . $passCode);

                if ($passCode === 235) {
                    $authenticated = true;
                } elseif ($passCode === 535 || $passCode === 534) {
                    error_log('[smtp] auth failed for ' . $mail['user'] . ' (check MAIL_PASS in .env)');
                    return false;
                } else {
                    // Server asked for a different mechanism (e.g. PLAIN). Try it.
                    if (smtp_cmd($socket, 'AUTH PLAIN') !== 334) {
                        error_log('[smtp] unsupported auth mechanism (code ' . $authCode . ')');
                        return false;
                    }
                    $token = base64_encode("\0" . $mail['user'] . "\0" . $mail['pass']);
                    $plain = smtp_cmd($socket, $token);
                    error_log('[smtp] AUTH PLAIN -> ' . $plain);
                    if ($plain !== 235) {
                        error_log('[smtp] AUTH PLAIN failed for ' . $mail['user']);
                        return false;
                    }
                    $authenticated = true;
                }
            } elseif ($authCode === 502 || $authCode === 504 || $authCode === -1) {
                $authenticated = true; // open relay, no auth needed
            } else {
                error_log('[smtp] AUTH rejected with code ' . $authCode);
                return false;
            }
        }

        $fromAddr = format_address($from, $mail['from_name']);
        $toAddr   = format_address($to, $toName);

        // Reply-To decides where a plain "Reply" lands. For the founder alert
        // it must be the CUSTOMER, otherwise hitting Reply in Gmail would send
        // the answer back to our own mailbox and the customer would never hear
        // back. For the customer's own confirmation it stays with us.
        $replyToAddr = format_address(
            ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) ? $replyTo : $from,
            ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) ? $toName : $mail['from_name']
        );

        if (($code = smtp_cmd($socket, 'MAIL FROM:<' . $from . '>')) !== 250) {
            error_log('[smtp] MAIL FROM failed: ' . $code);
            return false;
        }
        if (($code = smtp_cmd($socket, 'RCPT TO:<' . $to . '>')) !== 250) {
            error_log('[smtp] RCPT TO failed: ' . $code . ' for ' . $to);
            return false;
        }
        if (($code = smtp_cmd($socket, 'DATA')) !== 354) {
            error_log('[smtp] DATA failed: ' . $code);
            return false;
        }

        $boundary = 'cbx_' . bin2hex(random_bytes(8));

        $headers = [
            'Date: ' . gmdate('D, d M Y H:i:s +0000', time()),
            'From: ' . $fromAddr,
            'To: ' . $toAddr,
            'Reply-To: ' . $replyToAddr,
            'Subject: ' . smtp_encode_header($subject),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $domain . '>',
            'MIME-Version: 1.0',
            'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        ];

        $plainPart = "--{$boundary}\r\n"
            . "Content-Type: text/plain; charset=UTF-8\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($text));

        $htmlPart = "--{$boundary}\r\n"
            . "Content-Type: text/html; charset=UTF-8\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($html));

        $body = implode("\r\n", $headers)
            . "\r\n\r\n"
            . $plainPart
            . "\r\n"
            . $htmlPart
            . "\r\n--{$boundary}--";

        // Dot-stuffing: a line that is just "." would end the DATA early.
        $body = preg_replace('/^\./m', '..', $body) ?? $body;

        // RFC 5321: the body is terminated by a line containing only a dot.
// The trailing CRLF after the dot is required, otherwise the server keeps
// waiting in DATA state until the socket times out.
if (!smtp_write_raw($socket, $body . "\r\n.\r\n")) {
            error_log('[smtp] message body was rejected after DATA');
            return false;
        }

        smtp_cmd($socket, 'QUIT');

        return true;
    } catch (Throwable $e) {
        error_log('[smtp] exception: ' . $e->getMessage());
        return false;
    } finally {
        @fclose($socket);
    }
}

/**
 * Send a command and return the SMTP reply code.
 * Returns -1 on any I/O or protocol failure.
 *
 * @param string $command Empty string reads the greeting without writing.
 */
function smtp_cmd($socket, string $command): int
{
    if ($command !== '') {
        if (!write_all($socket, $command . "\r\n")) {
            return -1;
        }
    }

    $reply = '';
    while (($line = @fgets($socket, 515)) !== false) {
        $reply .= $line;
        // "250-" means more lines follow; "250 " (or any code + space) is final.
        if (strlen($line) < 4 || $line[3] === ' ') {
            break;
        }
    }

    if ($reply === '') {
        return -1;
    }

    return (int) substr($reply, 0, 3);
}

/**
 * Write every byte to the socket.
 *
 * fwrite() on a stream socket may accept only part of the buffer (it returns a
 * short count whenever the kernel send buffer fills up). A truncated message
 * body makes the SMTP server hang and then reject the DATA payload, so the
 * loop below is required, not optional.
 */
function write_all($socket, string $data): bool
{
    $total = strlen($data);
    $sent  = 0;

    while ($sent < $total) {
        $written = @fwrite($socket, substr($data, $sent));

        if ($written === false || $written === 0) {
            return false;
        }

        $sent += $written;
    }

    return true;
}

/** Send raw bytes (used for the DATA payload terminator). */
function smtp_write_raw($socket, string $data): bool
{
    if (!write_all($socket, $data)) {
        return false;
    }
    return smtp_cmd($socket, '') === 250;
}

function format_address(string $email, string $name): string
{
    $name = trim(preg_replace('/[\r\n"]+/', ' ', $name) ?? '');
    if ($name === '') {
        return $email;
    }
    return smtp_encode_header($name) . ' <' . $email . '>';
}

/** RFC 2047 encode if the value is not plain ASCII. */
function smtp_encode_header(string $value): string
{
    if (preg_match('/^[\x20-\x7E]*$/', $value)) {
        return $value;
    }
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

/* -------------------------------------------------------------------------
 * Email bodies
 * ---------------------------------------------------------------------- */
function esc(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function mail_shell(string $heading, string $innerHtml, string $footerNote = 'This is an automated message. Please do not reply to this email.'): string
{
    return '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f6f9;'
        . 'font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:28px 12px;">'
        . '<tr><td align="center">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;'
        . 'border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">'
        . '<tr><td style="background:#0b2a5b;padding:22px 28px;">'
        . '<div style="color:#ffffff;font-size:19px;font-weight:700;letter-spacing:-0.2px;">' . esc($heading) . '</div>'
        . '<div style="color:#fbbf24;font-size:12px;margin-top:4px;letter-spacing:0.6px;text-transform:uppercase;">ComplianceBoxx</div>'
        . '</td></tr>'
        . '<tr><td style="padding:28px;color:#1f2937;font-size:15px;line-height:1.65;">'
        . $innerHtml
        . '</td></tr>'
        . '<tr><td style="padding:18px 28px;background:#f9fafb;border-top:1px solid #eef0f3;color:#6b7280;font-size:12px;line-height:1.6;">'
        . 'This is an automated alert. Replying reaches the customer directly.'
        . '</td></tr>'
        . '</table></td></tr></table></body></html>';
}

function mail_detail_row(string $label, string $value): string
{
    return '<tr>'
        . '<td style="padding:7px 14px 7px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;width:110px;">'
        . esc($label) . '</td>'
        . '<td style="padding:7px 0;color:#111827;font-size:14px;font-weight:600;word-break:break-word;">'
        . esc($value) . '</td>'
        . '</tr>';
}

function mail_template_user(array $lead, array $config): string
{
    $phone = $config['site']['phone'];
    $phoneHref = $config['site']['phone_e164'];

    $inner =
        '<p style="margin:0 0 16px;">Hi <strong>' . esc($lead['name']) . '</strong>,</p>'
        . '<p style="margin:0 0 16px;">Thank you for contacting <strong>ComplianceBoxx</strong>. '
        . 'We have received your enquiry regarding <strong>' . esc($lead['service_label']) . '</strong>.</p>'
        . '<p style="margin:0 0 20px;">A member of our team will reach out to you <strong>within 24 hours</strong>.</p>'
        . '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0;">'
        . '<tr><td style="background:#0b2a5b;border-radius:8px;">'
        . '<a href="tel:' . esc($phoneHref) . '" style="display:inline-block;padding:12px 22px;color:#ffffff;'
        . 'text-decoration:none;font-weight:600;font-size:14px;">Call ' . esc($phone) . '</a>'
        . '</td></tr></table>'
        . '<p style="margin:0;color:#6b7280;font-size:13px;">For urgent queries, WhatsApp or call us directly.</p>';

    return mail_shell('We have received your enquiry', $inner);
}

function mail_text_user(array $lead, array $config): string
{
    return "Hi {$lead['name']},\n\n"
        . "Thank you for contacting ComplianceBoxx. We have received your enquiry regarding "
        . "{$lead['service_label']}.\n\n"
        . "A member of our team will reach out to you within 24 hours.\n\n"
        . "For urgent queries call us: {$config['site']['phone']}\n\n"
        . "ComplianceBoxx";
}

function mail_template_founder(array $lead, array $config): string
{
    // These buttons must act on the CUSTOMER's number, not ours.
    $customerTel  = $lead['phone'];                       // +919311251825
    $customerWaId = ltrim($lead['phone'], '+');           // 919311251825
    $customerPhone = $lead['phone_display'];

    $inner =
        '<p style="margin:0 0 16px;">A new enquiry has just arrived from the website.</p>'
        . '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;'
        . 'border:1px solid #e5e7eb;border-radius:8px;margin-bottom:20px;">'
        . mail_detail_row('Lead ID', (string) $lead['id'])
        . mail_detail_row('Name', $lead['name'])
        . mail_detail_row('Phone', $customerPhone)
        . mail_detail_row('Email', $lead['email'])
        . mail_detail_row('Service', $lead['service_label'])
        . ($lead['page'] !== '' ? mail_detail_row('Page', $lead['page']) : '')
        . '</table>'
        . '<p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.6px;">Message</p>'
        . '<div style="margin:0 0 22px;padding:14px;background:#f9fafb;border-left:3px solid #f59e0b;'
        . 'border-radius:4px;color:#1f2937;font-size:14px;line-height:1.6;white-space:pre-wrap;">'
        . esc($lead['message']) . '</div>'
        . '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 18px;">'
        . '<tr>'
        . '<td style="padding-right:10px;"><a href="mailto:' . esc($lead['email']) . '?subject=Re:%20Your%20enquiry%20-%20'
        . rawurlencode($lead['service_label']) . '" style="display:inline-block;padding:11px 18px;background:#0b2a5b;'
        . 'color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Reply by email</a></td>'
        . '<td style="padding-right:10px;"><a href="tel:' . esc($customerTel) . '" style="display:inline-block;'
        . 'padding:11px 18px;border:1.5px solid #0b2a5b;color:#0b2a5b;text-decoration:none;border-radius:8px;'
        . 'font-weight:600;font-size:14px;">Call ' . esc($customerPhone) . '</a></td>'
        . '<td><a href="https://wa.me/' . esc($customerWaId) . '" '
        . 'style="display:inline-block;padding:11px 18px;background:#25d366;color:#ffffff;'
        . 'text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">WhatsApp</a></td>'
        . '</tr></table>'
        . '<p style="margin:0;color:#6b7280;font-size:13px;">All three buttons act on the customer&#39;s number, '
        . 'and replying to this email reaches them directly. Please respond within 24 hours.</p>';

    return mail_shell(
        'New website enquiry',
        $inner,
        'This is an automated alert. Replying reaches the customer directly.'
    );
}

function mail_text_founder(array $lead, array $config): string
{
    return "NEW WEBSITE ENQUIRY\n"
        . str_repeat('-', 40) . "\n"
        . "Lead ID : {$lead['id']}\n"
        . "Name    : {$lead['name']}\n"
        . "Phone   : {$lead['phone_display']}\n"
        . "Email   : {$lead['email']}\n"
        . "Service : {$lead['service_label']}\n"
        . ($lead['page'] !== '' ? "Page    : {$lead['page']}\n" : '')
        . str_repeat('-', 40) . "\n"
        . "Message:\n{$lead['message']}\n\n"
        . "Reply by email : {$lead['email']}\n"
        . "Call customer  : {$lead['phone_display']}\n"
        . "WhatsApp       : {$lead['phone_display']}\n\n"
        . "Replying to this email goes straight to the customer.\n";
}