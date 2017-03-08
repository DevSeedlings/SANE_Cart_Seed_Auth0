// INITILIZE CONTROLLER
// ============================================================
angular.module("app")
  .controller("productCtrl", function($scope, orderService) {

    // VARIABLES
    // ============================================================
    $scope.image = {
      'background-image': "url("+$scope.product.image_url+")"
    };

    // FUNCTIONS
    // ============================================================
    $scope.addToCart = function(product_id) {

      // Is user logged in?
      if (!$scope.user) {
        // Send user to login and then to that products details page
        location.href = '/auth?state=details/' + product_id
      } else {
        // Add item to cart
        orderService.addToCart(product_id, 1).then(function(response) {
          console.log(response.data);
        });
      }
    };

  });
