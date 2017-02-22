SELECT * FROM orders
WHERE user_id = $1
   && completed_date = NULL;
