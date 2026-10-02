-- ---------------------------------------------------------------------------
-- ComplianceBoxx — Leads table
--
-- HOW TO RUN THIS ON HOSTINGER (2 easy options)
--
-- Option A — phpMyAdmin (recommended, no uploads needed)
--   hPanel -> Databases -> (your db) -> phpMyAdmin -> SQL tab
--   Open this file in a text editor, copy everything, paste, click "Go".
--
-- Option B — Import
--   Rename this file to  leads.sql  and upload it in phpMyAdmin's Import tab.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `leads` (
  `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

  -- What the visitor typed
  `name`          VARCHAR(120)  NOT NULL,
  `phone`         VARCHAR(30)   NOT NULL,
  `email`         VARCHAR(190)  NOT NULL,
  `service`       VARCHAR(100)  NOT NULL,
  `service_label` VARCHAR(120)  NOT NULL,
  `message`       TEXT          NOT NULL,

  -- Which page the form was submitted from
  `source_page`   VARCHAR(255)  DEFAULT NULL,

  -- Technical context (useful for spotting spam)
  `ip_address`    VARCHAR(45)   DEFAULT NULL,
  `user_agent`    VARCHAR(255)  DEFAULT NULL,

  -- Pipeline status. 'new' means nobody has touched it yet.
  -- Future dashboard will move these: new -> contacted -> qualified -> won/lost
  `status`        VARCHAR(20)   NOT NULL DEFAULT 'new',

  `notes`         TEXT          DEFAULT NULL,
  `assigned_to`   VARCHAR(120)  DEFAULT NULL,
  `created_at`    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  KEY `idx_status`   (`status`),
  KEY `idx_created`  (`created_at`),
  KEY `idx_phone`    (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;