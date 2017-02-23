SELECT * FROM products
JOIN products_in_order
ON products.id = products_in_order.product_id
WHERE products_in_order.order_id = $1
