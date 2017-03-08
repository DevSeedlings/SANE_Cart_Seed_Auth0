angular.module('app').directive('nav', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/nav/navTmpl.html',
    controller: 'navCtrl'
  };
});
