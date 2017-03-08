SELECT * FROM product_in_order pio
WHERE
  pio.product_id = $1 AND
  pio.order_id = $2;
