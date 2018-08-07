'use strcit';
var aplikacja = angular.module('aplikacja', ['ngRoute', 'angular-storage', 'controllerNavigation', 'controllerAdmin', 'controllerUser', 'myServices']);

aplikacja.config(['$locationProvider', function($locationProvider) {
  
  $locationProvider.hashPrefix('');
  //$locationProvider.html5Mode(true);

 
}]);
aplikacja.config(['$routeProvider', '$httpProvider', function( $routeProvider, $httpProvider){
	// =======	

	$routeProvider.when( '/admin/product/edit/:index', {
		controller: 'productEdit',
		templateUrl: 'partials/admin/product-edit.html'
	});
	$routeProvider.when( '/admin/products', {
		controller: 'products',
		templateUrl: 'partials/admin/products.html'
	});
	$routeProvider.when( '/admin/product/create', {
		controller: 'productCreate',
		templateUrl: 'partials/admin/product-create.html'
	});
	$routeProvider.when('/admin/users', {
		controller: 'users',
		templateUrl: 'partials/admin/users.html'
	});
	$routeProvider.when('/admin/user/edit/:id', {
		controller: 'userEdit',
		templateUrl: 'partials/admin/user-edit.html'
	});
	$routeProvider.when('/admin/orders', {
		controller: 'orders',
		templateUrl: 'partials/admin/orders.html'
	});
	$routeProvider.when('/admin/user/create', {
		controller: 'userCreate',
		templateUrl: 'partials/admin/user-create.html'
	});
	$routeProvider.when('/products', {
		controller: 'productsUser',
		templateUrl: 'partials/site/products.html'
	});
	$routeProvider.when('/product/:index',{
		controller: 'productUser',
		templateUrl: 'partials/site/product.html'
	});
	$routeProvider.when('/cart', {
		controller: 'cartCtrl',
		templateUrl: 'partials/site/cart.html'
	});
	$routeProvider.when('/orders', {
		controller: 'ordersUser',
		templateUrl: 'partials/site/orders.html'
	});
	$routeProvider.when('/login', {
		controller: 'login',
		templateUrl: 'partials/site/login.html'
	});
	$routeProvider.when('/register', {
		controller: 'register',
		templateUrl: 'partials/site/register.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/products'
	});

	
}]);


	