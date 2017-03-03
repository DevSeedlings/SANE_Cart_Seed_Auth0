UPDATE products_in_order
SET
  qty = $2
WHERE pio_id = $1
RETURNING *;
