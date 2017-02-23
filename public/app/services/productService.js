// INITILIZE SERVICE
// ============================================================
angular.module("app").service("productService", function($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: '/api/products'
    });
  };

  // OTHER FUNCTIONS
  // ============================================================


});
