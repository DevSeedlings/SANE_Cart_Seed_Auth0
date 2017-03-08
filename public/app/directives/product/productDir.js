// INITILIZE DIRECTIVE
// ============================================================
angular.module("app")
  .directive('product', function() {
    return {
      restrict: 'E',
      templateUrl: './app/directives/product/productTmpl.html',
      controller: 'productCtrl',
      scope: {
        product: '=productData',
        user: '='
      }
    };
  });
