UPDATE products_in_order
SET
  qty = $2
WHERE id = $1
RETURNING *;
