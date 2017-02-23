// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("ordersCtrl", function($scope, orderService) {

  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
  $scope.getTotal = function() {
    var total = 0;
    for (var i = 0; i < $scope.orderData.products.length; i++) {
      total += $scope.orderData.products[i].price * $scope.orderData.products[i].qty
    }
    $scope.total = total;
  }

  $scope.getOrder = function() {
    orderService.getOrder().then(function(response) {
      $scope.orderData = response.data;
      $scope.getTotal();
    });
  }
  $scope.getOrder();

  $scope.updateItem = function(id, qty) {
    orderService.updateItem(id, qty).then(function(response) {
      $scope.getTotal();
    });
  };

  $scope.deleteItem = function(id) {
    orderService.deleteItem(id).then(function(response) {
      $scope.getOrder();
    });
  };

  $scope.submit = function() {
    console.log('Submiting order');
    orderService.completeOrder().then(function(response) {
      $scope.getOrder();
    });
  };

});
