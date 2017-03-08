SELECT * FROM products p
JOIN product_in_order pio
ON p.product_id = pio.product_id
WHERE pio.order_id = ANY($1);
