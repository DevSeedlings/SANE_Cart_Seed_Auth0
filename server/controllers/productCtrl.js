// REQUIRE DEPENDENCIES
// ============================================================
var app = require('./../index');
var db = app.get('db');

// EXPORT METHODS
// ============================================================
module.exports = {

  // CRUD METHODS
  // ============================================================
  read: function(req, res, next) {
    db.product.read(function(err, product){
      if (err) {
        console.log('products_read: ', err);
        return res.status(500).send(err);
      }

      return res.status(200).send(product);
    });
  },

  read_id: function(req, res, next) {
    db.product.read_id([req.params.id], function(err, product) {
      if (err) {
        console.log('product_read: ', err);
        return res.status(500).send(err);
      }

      return res.status(200).send(product[0]);
    })
  }

  // OTHER METHODS
  // ============================================================


};
