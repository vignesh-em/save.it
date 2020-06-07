CREATE TABLE IF NOT EXISTS save_content (
    content_key VARCHAR(20) PRIMARY KEY NOT NULL,
    saved_content TEXT,
    expiry_time NUMERIC NOT NULL
);