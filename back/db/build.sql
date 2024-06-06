BEGIN;

DROP TABLE IF EXISTS users, requests, comments;
DROP TYPE IF EXISTS ROLE, DEPARTAMENT, STATUS;

CREATE TYPE ROLE AS ENUM ('specialist', 'user');
CREATE TYPE DEPARTAMENT AS ENUM ('client', 'study');
CREATE TYPE STATUS AS ENUM ('open', 'close','awaiting');

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL,
  role ROLE NOT NULL,
  departament DEPARTAMENT
);

CREATE TABLE IF NOT EXISTS requests (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

DROP TRIGGER IF EXISTS update_timestamp ON requests;

CREATE OR REPLACE FUNCTION timestamp_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_timestamp
BEFORE UPDATE ON requests
FOR EACH ROW
EXECUTE PROCEDURE timestamp_update();

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT,
  request_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (request_id) REFERENCES requests(id)
);


INSERT INTO users (name, username, password, role) VALUES 
  ('Дмитрий', 'dmitry', '12345', 'user');
INSERT INTO users (name, username, password, role, departament) VALUES 
  ('Екатерина', 'kate', '12345', 'specialist', 'client');
INSERT INTO users (name, username, password, role, departament) VALUES 
  ('Валерия', 'valeria', '12345', 'specialist', 'study');

COMMIT;