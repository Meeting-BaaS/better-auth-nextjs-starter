ALTER TABLE accounts
ADD COLUMN full_name text,
ADD COLUMN email_verified boolean,
ADD COLUMN image text,
ADD COLUMN updated_at timestamp without time zone DEFAULT now() NOT NULL;

ALTER TABLE accounts
ALTER COLUMN password DROP NOT NULL;

ALTER TABLE accounts
ADD CONSTRAINT accounts_email_unique UNIQUE (email);

UPDATE accounts
SET updated_at = created_at;