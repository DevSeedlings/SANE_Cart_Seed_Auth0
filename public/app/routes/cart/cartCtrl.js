// INITILIZE CONTROLLER
// ============================================================
angular.module("app")
  .controller("cartCtrl", function($scope, user, order, orderService) {

    // VARIABLES
    // ============================================================
    $scope.user = user;
    $scope.order = order.data;

    // FUNCTIONS
    // ============================================================
    $scope.orderTotal = orderService.orderTotal;
    
    $scope.updateQty = function(id, qty) {
      orderService.updateItem(id, qty).then(function(response) {
        console.log('update response.data: ', response.data);
      });
    };

    $scope.deleteProduct = function(id, i) {
      orderService.deleteItem(id).then(function(response) {
        console.log('delete response.data: ', response.data);
        $scope.order.products.splice(i, 1);
      });
    };

    $scope.submitOrder = function() {
      orderService.completeOrder().then(function(response) {
        $scope.order = response.data;
      });
    }

  });
