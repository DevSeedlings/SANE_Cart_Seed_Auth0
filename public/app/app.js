var app = angular.module("app", ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "./app/routes/home/homeTmpl.html",
			controller: 'homeCtrl'
		})

		// PRODUCTS STATE
		.state('products', {
		  url: '/products',
		  templateUrl: './app/routes/products/productsTmpl.html',
		  controller: 'productsCtrl'
		})

		// ORDERS STATE
		.state('orders', {
		  url: '/orders',
		  templateUrl: './app/routes/orders/ordersTmpl.html',
		  controller: 'ordersCtrl'
		});



});
