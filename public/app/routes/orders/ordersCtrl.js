// INITILIZE CONTROLLER
// ============================================================
angular.module("app")
  .controller("ordersCtrl", function($scope, user, orders, orderService) {

    // VARIABLES
    // ============================================================
    $scope.user = user;
    $scope.orders = orders.data;

    // FUNCTIONS
    // ============================================================
    $scope.orderTotal = orderService.orderTotal;

  });
