// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("productsCtrl", function($scope, productService, orderService, $state) {

  // VARIABLES
  // ============================================================
  productService.getProducts().then(function(response) {
    $scope.products = response.data;
  });
  $scope.qty = 1;

  // FUNCTIONS
  // ============================================================
  $scope.addToCart = function(id, qty) {
    // console.log(id, qty);
    orderService.addToCart(id, qty).then(function(response) {
      console.log(response);
      $state.go("orders")
    });
  }

});
