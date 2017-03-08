// INITILIZE SERVICE
// ============================================================
angular.module("app")
  .service("productService", function($http) {

    // VARIABLES
    // ============================================================


    // FUNCTIONS
    // ============================================================
    this.getProducts = function() {
      return $http({
        method: 'GET',
        url: '/api/products'
      });
    };

    this.getProduct = function(id) {
      return $http({
        method: 'GET',
        url: '/api/product/' + id
      });
    };

  });
