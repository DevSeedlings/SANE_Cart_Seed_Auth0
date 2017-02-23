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

      db.order.insert([req.user.id], function(err, order) {
        if (err) {
          console.log('complete order create err: ', err);
          return res.status(500).send(err);
        }

        req.user.order_id = order[0].id;
        return res.status(200).send('Order completed successfully');
      })
    })
  },
  read: function(req, res, next) {
    db.order.read_id([req.user.order_id], function(err, order) {
      if (err) {
        console.log('Order read err: ', err);
        return res.status(500).send(err);
      }

      var totalOrder = {
        order: order[0]
      };

      db.order.get_products([req.user.order_id], function(err, products) {
        if (err) {
          console.log('Order products read err: ', err);
          return res.status(500).send(err);
        }

        totalOrder.products = products;

        return res.status(200).send(totalOrder);
      })
    })
  },
  addToCart: function(req, res, next) {
    db.product.add_to_cart([req.user.order_id, req.body.product_id, req.body.qty], function(err, product) {
      if (err) {
        console.log('Add to Order err: ', err);
        return res.status(500).send(err);
      }

      return res.status(200).send('Product added to cart');
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
  }
};
