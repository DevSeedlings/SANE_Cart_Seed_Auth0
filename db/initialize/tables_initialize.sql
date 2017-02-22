CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name text,
  email text UNIQUE
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id int,
  completed_date text,
  fulfilled text
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name text,
  description text,
  price int,
  image_url text
);

CREATE TABLE IF NOT EXISTS products_in_order (
  id SERIAL PRIMARY KEY,
  order_id int,
  product_id int,
  qty int
)
