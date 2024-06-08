BEGIN;

DROP TABLE IF EXISTS users, requests, comments, is_seen, user_attr;
DROP TYPE IF EXISTS ROLE, DEPARTAMENT, STATUS;

CREATE TYPE ROLE AS ENUM ('specialist', 'user');
CREATE TYPE DEPARTAMENT AS ENUM ('client', 'study');
CREATE TYPE STATUS AS ENUM ('open', 'close','awaiting');

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sur_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255),
  username VARCHAR(255) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS requests (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  status STATUS NOT NULL DEFAULT 'open',
  plan_end_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  specialist_id INT,
  FOREIGN KEY (specialist_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS is_seen (
  id SERIAL PRIMARY KEY,
  is_seen_by_user BOOLEAN default 'TRUE',
  is_seen_by_specialist BOOLEAN default 'FALSE',
  request_id INT,
  FOREIGN KEY (request_id) REFERENCES requests(id)
);

CREATE TABLE IF NOT EXISTS user_attr (
  id SERIAL PRIMARY KEY,
  role ROLE NOT NULL,
  departament DEPARTAMENT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT,
  request_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (request_id) REFERENCES requests(id)
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

INSERT INTO users (name, username, password, sur_name) VALUES 
  ('Дмитрий', 'dmitry', '12345', 'Рябов');
INSERT INTO users (name, username, password, sur_name, father_name) VALUES 
  ('Екатерина', 'kate', '12345', 'Рябова', 
'Викторовна');
INSERT INTO users (name, username, password, sur_name, father_name) VALUES 
  ('Валерия', 'valeria', '12345', 'Рябова', 'Дмитриевна');

INSERT INTO user_attr (user_id, role) VALUES 
  (1, 'user');
INSERT INTO user_attr (user_id, role, departament) VALUES 
  (2, 'specialist', 'study');
INSERT INTO user_attr (user_id, role, departament) VALUES 
  (3, 'specialist', 'client');


INSERT INTO requests (text, status, user_id) VALUES 
  ('Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius molestias eaque, nihil aliquam provident consequuntur. Minus assumenda cum, illo, blanditiis sequi nemo ex magnam consequatur hic, placeat praesentium quos iusto.', 'open', 1);
INSERT INTO requests (text, status, user_id, specialist_id,plan_end_time) VALUES 
  ('asdadsasd', 'awaiting', 1, 3, CURRENT_TIMESTAMP + interval '5 day');
INSERT INTO requests (text, status, user_id, specialist_id,plan_end_time) VALUES 
  ('fffff', 'close', 1, 2, CURRENT_TIMESTAMP + interval '2 day');
INSERT INTO requests (text, status, user_id, specialist_id,plan_end_time) VALUES 
  ('gggggg', 'close', 1, 3, CURRENT_TIMESTAMP + interval '3 day');

INSERT INTO is_seen (request_id) VALUES 
  (1);
INSERT INTO is_seen (request_id, is_seen_by_user, is_seen_by_specialist) VALUES 
  (2, 'FALSE', 'TRUE');
INSERT INTO is_seen (request_id, is_seen_by_user, is_seen_by_specialist) VALUES 
  (3, 'TRUE', 'TRUE');
INSERT INTO is_seen (request_id, is_seen_by_user, is_seen_by_specialist) VALUES 
  (3, 'FALSE', 'TRUE');

INSERT INTO comments (text, user_id, request_id) VALUES 
  ('comment1', 3, 2);
INSERT INTO comments (text, user_id, request_id) VALUES 
  ('closed?', 2, 3);
INSERT INTO comments (text, user_id, request_id) VALUES 
  ('closed?', 3, 4);

COMMIT;