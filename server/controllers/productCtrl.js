// REQUIRE DEPENDENCIES
// ============================================================
var app = require('./../index');
var db = app.get('db');

// EXPORT METHODS
// ============================================================
module.exports = {

  // CRUD METHODS
  // ============================================================
  read: function(req, res) {
    db.product.read(function(err, product){
      if (err) {
        console.log('product_read: ', err);
        return res.status(500).send(err);
      }

      res.status(200).send(product);
    });
  },
  create: function(req, res) {
    db.product.insert([], function(err, product){
      if (err) {
        console.log('product_insert: ', err);
        return res.status(500).send(err);
      }

      res.status(200).send(product);
    });
  },
  update: function(req, res) {
    db.product.update([], function(err, product){
      if (err) {
        console.log('product_update: ', err);
        return res.status(500).send(err);
      }

      res.status(200).send(product);
    });
  },
  delete: function(req, res) {
    db.product.remove([], function(err, product){
      if (err) {
        console.log('product_remove: ', err);
        return res.status(500).send(err);
      }

      res.status(200).send(product);
    });
  }

  // OTHER METHODS
  // ============================================================


};
