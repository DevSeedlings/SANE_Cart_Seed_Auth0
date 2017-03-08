// INITILIZE CONTROLLER
// ============================================================
angular.module("app")
  .controller("productDetailsCtrl", function($scope, user, product, orderService) {

    // VARIABLES
    // ============================================================
    $scope.user = user;
    $scope.product = product.data;
    $scope.qty = 1;
    $scope.image = {
      'background-image': 'url(' + $scope.product.image_url + ')'
    };

    // FUNCTIONS
    // ============================================================
    $scope.addToCart = function(product_id, qty) {

      // Is user logged in?
      if (!$scope.user) {
        // Send user to login and then to that products details page
        location.href = '/auth?state=details/' + product_id
      } else {
        // Add item to cart
        orderService.addToCart(product_id, qty).then(function(response) {
          console.log(response.data);
        });
      }
    };


  });
