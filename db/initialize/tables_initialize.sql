CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name_first text,
  name_last text,
  email text UNIQUE
);

CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL PRIMARY KEY,
  user_id int,
  completed_date text,
  fulfilled text
);

CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  name text,
  description text,
  price decimal,
  image_url text
);

CREATE TABLE IF NOT EXISTS product_in_order (
  pio_id SERIAL PRIMARY KEY,
  order_id int,
  product_id int,
  qty int
);
