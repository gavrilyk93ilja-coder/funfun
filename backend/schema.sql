CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  email TEXT,
  password_hash TEXT,
  role TEXT,
  rating FLOAT DEFAULT 0
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title TEXT,
  price NUMERIC,
  game TEXT,
  seller_id INTEGER REFERENCES users(id)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  buyer_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER,
  receiver_id INTEGER,
  content TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
