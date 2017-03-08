// INITILIZE SERVICE
// ============================================================
angular.module("app")
  .service("orderService", function($http) {

    // VARIABLES
    // ============================================================


    // FUNCTIONS
    // ============================================================
    this.addToCart = function(id, qty) {
      return $http({
        method: 'POST',
        url: '/api/order/add',
        data: {
          product_id: id,
          qty: qty
        }
      });
    };

    this.getOrder = function() {
      return $http({
        method: 'GET',
        url: '/api/order'
      });
    }

    this.updateItem = function(id, qty) {
      return $http({
        method: 'PUT',
        url: '/api/order/update/' + id,
        data: {
          qty: qty
        }
      });
    };

    this.deleteItem = function(id) {
      return $http({
        method: 'DELETE',
        url: '/api/order/delete/' + id
      });
    };

    this.completeOrder = function() {
      return $http({
        method: 'PUT',
        url: '/api/order/complete'
      });
    };

    this.getHistory = function() {
      return $http({
        method: 'GET',
        url: '/api/order/history'
      });
    };

    this.orderTotal = function(products) {
      var total = 0;

      for (var i = 0; i < products.length; i++) {
        total += products[i].price * products[i].qty;
      }

      return total;
    };

  });
