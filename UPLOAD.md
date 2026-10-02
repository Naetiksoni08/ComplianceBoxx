# Deploying ComplianceBoxx to Hostinger (Single shared plan)

The site is a **static export** (`out/`) plus **one PHP file** (`contact.php`).
No Node.js runtime is needed, which is why this works on the Single plan.

---

## 0. BEFORE YOU START — rotate the database password

The MySQL password was shared in a chat conversation. **Change it in hPanel
before going live**, then use the new password in step 3.

- hPanel → **Databases → Management → Change Password**
- After changing it, also update the password for `u238326104_cb_admin`.

Never put the old password in any file you upload.

---

## 1. Build the site

```bash
cd complianceboxx
npm run build
```

Output lands in **`out/`**. This folder is what you upload.
Verify it exists:

```bash
ls out/
```

You should see `index.html`, `about/`, `services/`, `contact.php`, `.htaccess`.

---

## 2. Create the database and the table

1. hPanel → **Databases → MySQL Databases** → create a database
   - Name: `leads` → Hostinger prefixes it, giving `u238326104_leads`
   - **Tick "Create MySQL user"** and set a new password
   - Add the user to the database with **ALL PRIVILEGES**
2. Import the table structure:
   - hPanel → **Databases → phpMyAdmin** → select the new database → **Import**
   - Upload `deploy/schema.sql`

If phpMyAdmin import is awkward, you can paste the contents of
`deploy/schema.sql` into phpMyAdmin's **SQL** tab and press **Go**.

---

## 3. Create and fill the `.env` file

```bash
cp deploy/.env.template deploy/.env
```

Open `deploy/.env` and fill in exactly two blanks:

| Key | Where to get the value |
|---|---|
| `DB_NAME` | hPanel → Databases → the prefixed name, e.g. `u238326104_leads` |
| `DB_USER` | hPanel → Databases → the generated user, e.g. `u238326104_cb_admin` |
| `DB_PASS` | the **new** password you set in step 0 |
| `MAIL_PASS` | hPanel → **Emails → Email Accounts** → the mailbox password for `contact@complianceboxx.in` |

Everything else in the template is already correct for Hostinger
(`smtp.hostinger.com`, port `587`).

> `MAIL_PASS` is the password of the **mailbox**, not your hPanel login.

---

## 4. Upload

### 4a. The site

Zip the **contents** of `out/` (not the `out/` folder itself), then
hPanel → **File Manager** → open `public_html` → delete the old WordPress
files (back them up first) → upload the zip → **Extract**.

### 4b. The `.env` file

Upload `.env` to **one level above `public_html`** — the safest spot:

```
/home/u238326104/.env          <-- put it here
/home/u238326104/public_html/  <-- the site
```

If you must put it inside `public_html`, that's OK too: the bundled
`.htaccess` blocks `.env` from being served (verified — it returns HTTP 403).

**Do not upload `deploy/.env.template`.** It is deliberately kept outside
`out/` so it can never be published.

### 4c. Confirm `.htaccess` made it

`public_html/.htaccess` must exist. Without it, the Next.js `.txt` metadata
files become downloadable and `.env` (if placed inside) would be exposed.
Hidden files are skipped by some upload tools — after uploading, refresh
File Manager and confirm `.htaccess` is listed.

---

## 5. Verify on the live site

| Check | Expected |
|---|---|
| `https://compliancebpox.in/` | homepage loads |
| `https://compliancebpox.in/about` | About page loads |
| `https://compliancebpox.in/services/gst-registration-filing` | service page loads |
| Submit the contact form | green "Enquiry Sent!" |
| hPanel → **Emails → Sent** | founder alert arrived |
| Customer inbox | confirmation email arrived |
| phpMyAdmin → `leads` table | new row, `status = new` |
| `https://compliancebpox.in/.env` | **403 Forbidden** |

If the form shows "Could not send your message", check the error text — it
names the failing part (extension, `.env`, database, or SMTP).

---

## 6. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| "mysqli extension is missing" | PHP without mysqli | hPanel → **Advanced** → PHP version → select 8.1+ |
| ".env file not found" | `.env` not uploaded / wrong folder | See step 4b |
| "Could not save your enquiry" | wrong `DB_*` values | Re-check hPanel prefix on name/user |
| Lead saves but no email | wrong `MAIL_PASS` or mailbox not active | hPanel → Emails → activate the account, reset its password |
| Site 500s on every page | bad `.htaccess` | Temporarily rename it to `.htaccess.bak`; the site returns, then re-add rules one at a time |
| `/about` returns 403 | `out/about/index.html` missing | Rebuild with `npm run build`; do not hand-edit `out/` |

### Reading PHP errors

hPanel → **Advanced** → **Error Log**. Every step of the SMTP conversation is
logged to it, so a mail failure shows exactly which command was rejected.

---

## 7. Turning email on/off without touching code

In `.env`, set to `true` or `false`:

```
SEND_MAIL_TO_USER=true      # customer gets a confirmation
SEND_MAIL_TO_FOUNDER=true   # you get the lead alert
FOUNDER_EMAIL=you@yourmail.com
```

---

## 8. Turning on ad tracking

Set `CAPTURE_UTM=true` **before** running any Google or Meta ads. Each lead
will then record which ad it came from. This data cannot be recovered after
the fact, so do this before the ads go live.