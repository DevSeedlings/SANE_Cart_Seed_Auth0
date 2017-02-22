INSERT INTO products_in_order (order_id, product_id, qty)
VALUES ($1, $2, $3)
RETURNING *;
