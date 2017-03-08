// INITILIZE APP
// ============================================================
var app = angular.module("app", ['ui.router'])

	// CONFIG
	// ============================================================
	.config(function($stateProvider, $urlRouterProvider) {

		// RESOLVE CONSTANTS
		// ============================================================
		var limitUser = function(authService, $state) {
			return authService.getCurrentUser()
				.then(function(response) {
					if (!response.data)
						$state.go('home');
					return response.data;
				})
				.catch(function(err) {
					$state.go('home');
				});
		};

		var getUser = function(authService) {
			return authService.getCurrentUser()
				.then(function(response) {
					return response.data;
				})
		};

	  // INITILIZE STATES
	  // ============================================================
		$stateProvider

			// HOME STATE
			.state('home', {
				url: "/",
				templateUrl: "./app/routes/home/homeTmpl.html",
				controller: 'homeCtrl',
				resolve: {
					user: getUser
				}
			})

			// PROFILE STATE
			.state('profile', {
			  url: '/profile',
			  templateUrl: './app/routes/profile/profileTmpl.html',
			  controller: 'profileCtrl',
				resolve: {
					user: limitUser
				}
			})

			// ORDERS STATE
			.state('orders', {
			  url: '/orders',
			  templateUrl: './app/routes/orders/ordersTmpl.html',
			  controller: 'ordersCtrl',
				resolve: {
					user: limitUser,
					orders: function(orderService) {
					  return orderService.getHistory();
					}
				}
			})

			// CART STATE
			.state('cart', {
			  url: '/cart',
			  templateUrl: './app/routes/cart/cartTmpl.html',
			  controller: 'cartCtrl',
				resolve: {
					user: limitUser,
					order: function(orderService) {
					  return orderService.getOrder();
					}
				}
			})

			// PRODUCT STATE
			.state('productDetails', {
			  url: '/details/:product_id',
			  templateUrl: './app/routes/productDetails/productDetailsTmpl.html',
			  controller: 'productDetailsCtrl',
				resolve: {
					user: getUser,
					product: function(productService, $stateParams) {
						return productService.getProduct($stateParams.product_id);
					}
				}
			})

			// SHOP STATE
			.state('shop', {
			  url: '/shop',
			  templateUrl: './app/routes/shop/shopTmpl.html',
			  controller: 'shopCtrl',
				resolve: {
					user: getUser,
					products: function(productService) {
						return productService.getProducts();
					}
				}
			});


	  // ASSIGN OTHERWISE
	  // ============================================================
	  $urlRouterProvider.otherwise('/home');
	});
