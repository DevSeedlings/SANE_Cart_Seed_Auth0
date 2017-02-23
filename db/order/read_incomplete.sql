SELECT * FROM orders
WHERE user_id = $1
   AND completed_date IS NULL;
