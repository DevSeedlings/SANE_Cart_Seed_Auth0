// INITILIZE CONTROLLER
// ============================================================
angular.module("app")
  .controller("shopCtrl", function($scope, products, user) {

    // VARIABLES
    // ============================================================
    $scope.products = products.data;
    $scope.user = user;

    // FUNCTIONS
    // ============================================================


  });
