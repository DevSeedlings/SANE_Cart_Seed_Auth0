var app = require('./../index');
var db = app.get('db');

module.exports = {
  complete: function (req, res, next) {
    console.log("Completing oder");
    db.order.update([req.user.order_id, new Date(), undefined], function(err, order) {
      if (err) {
        console.log('complete order err: ', err);
        return res.status(500).send(err);
      }

      db.order.insert([req.user.user_id], function(err, order) {
        if (err) {
          console.log('complete order create err: ', err);
          return res.status(500).send(err);
        }

        req.user.order_id = order[0].order_id;
        next();
      })
    })
  },
  read: function(req, res, next) {
    console.log('req.user.order_id: ', req.user.order_id);
    db.order.read_id([req.user.order_id], function(err, order) {
      if (err) {
        console.log('Order read err: ', err);
        return res.status(500).send(err);
      }

      console.log('order: ', order);
      order = order[0];

      db.order.get_products([req.user.order_id], function(err, products) {
        if (err) {
          console.log('Order products read err: ', err);
          return res.status(500).send(err);
        }

        order.products = products;

        return res.status(200).send(order);
      })
    })
  },
  addToCart: function(req, res, next) {
    db.order.read_product([req.body.product_id, req.user.order_id], function(err, product) {
      if (err) {
        console.log('Add to Order err: ', err);
        return res.status(500).send(err);
      }

      if (product.length) {
        db.product.update_order([product[0].pio_id, product[0].qty + req.body.qty], function(err, product) {
          if (err) {
            console.log('Update qty err: ', err);
            return res.status(500).send(err);
          }

          return res.status(200).send('Product updated successfully');
        });
      } else{
        db.product.add_to_cart([req.user.order_id, req.body.product_id, req.body.qty], function(err, product) {
          if (err) {
            console.log('Add to Order err: ', err);
            return res.status(500).send(err);
          }

          return res.status(200).send('Product added to cart');
        });
      }
    });
  },
  updateItemInCart: function(req, res, next) {
    db.product.update_order([req.params.id, req.body.qty], function(err, product) {
      if (err) {
        console.log('Update qty err: ', err);
        return res.status(500).send(err);
      }

      return res.status(200).send('Product updated successfully');
    });
  },
  deleteFromCart: function(req, res, next) {
    db.product.remove_from_order([req.params.id], function(err, response) {
      if (err) {
        console.log('Delete product in cart err: ', err);
        return res.status(500).send(err);
      }

      return res.status(200).send('Product deleted successfully');
    });
  },
  orderHistory: function(req, res, next) {
    db.order.read_user_id([req.user.user_id], function(err, orders) {
      if (err) {
        console.log('Order read err: ', err);
        return res.status(500).send(err);
      }

      var order_ids = orders.map((order) => order.order_id);

      db.order.get_products_multiple([order_ids], function(err, products) {
        if (err) {
          console.log('Order products read err: ', err);
          return res.status(500).send(err);
        }

        orders.forEach((order) => order.products = products.filter((product) => product.order_id === order.order_id));

        return res.status(200).send(orders);
      })
    })
  }
};
