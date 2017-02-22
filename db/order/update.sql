UPDATE orders
SET
  completed_date = coalesce($2, completed_date),
  fulfilled = coalesce($3, fulfilled)
WHERE id = $1
RETURNING *;
