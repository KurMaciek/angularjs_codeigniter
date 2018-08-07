'use strict'
var controllerUser = angular.module('controllerUser', []);

controllerUser.controller('productsUser', ['$scope', '$http', 'cartSrv', function($scope, $http, cartSrv){
	$http({
		method: "GET",
		url: 'api/user/products/get/'
	}).then(function(response){
		$scope.products = response.data;
		console.log($scope.products);
	},function(response){
		console.log("Błąd");
	});
	$scope.addToCart = function(product){
		cartSrv.add(product);
		
	};

	
	//console.log(store.get('test'));

	

	
}]);

controllerUser.controller('productUser', ['$scope', '$http', '$routeParams', 'cartSrv', function($scope, $http, $routeParams, cartSrv){
	var id = $routeParams.index;
	$scope.id = id;
	$http({
		method: 'GET',
		url: 'api/user/products/get/' + id
	}).then(function(response){
		$scope.product = response.data;
		console.log($scope.product);
	});

	$scope.addToCart = function(product){
		cartSrv.add(product);
	};
	getImages();
	function getImages(){
		$http({
		method: "GET",
		url: 'api/admin/images/getImages/' + id
		}).then(function(response){
			$scope.images = response.data; 
			console.log(response.data);
		});
	}
}]);


controllerUser.controller('cartCtrl', ['$scope', '$http', "$location", '$timeout', '$filter', 'cartSrv',  function($scope, $http,  $location, $timeout, $filter, cartSrv){
	

	$scope.cart = cartSrv.show();
	

	$scope.emptyCart = function(){
		cartSrv.emptyCart();
	};

	$scope.totalPrice = function(){
		var totalPrice = 0;

		angular.forEach($scope.cart, function(item){
			totalPrice += item.qty * item.cena;
		});
		totalPrice = $filter( 'number')(totalPrice, 2);
		return totalPrice;
	};

	$scope.removeItem = function($index){
		$scope.cart.splice($index, 1);
		cartSrv.update($scope.cart);
	};

	$scope.setOrder = function($event){

		var isLogged = true;

		if(!isLogged){
			$scope.alert = {type: 'warning', msg: 'Nie jesteś zalogowany'};
			$event.preventDefault();
			return false;
		}else{
			$scope.alert = {type: 'success', msg: 'Zamówienie zostało złożone. Następuje przekierowanie do płatności'};
			console.log( $scope.totalPrice());
			cartSrv.emptyCart();
		}
	};

	$scope.$watch(function(){
		cartSrv.update( $scope.cart );
	});

	var isEmpty = function(){
		if(cartSrv.length == 0){
			$location.path('#/products');
		}	
	};
	//$timeout(isEmpty, 4000);
	

}]);

controllerUser.controller('ordersUser', ['$scope', '$http', function($scope, $http){
	$http({
		methon: 'GET',
		url: 'model/orders.json'
	}).then(function(response){
		$scope.orders = response.data;
		console.log($scope.orders);
	},function(response){
		console.log("Błąd przesyłu");
	});
	

}]);

controllerUser.controller('login', ['$scope', '$http', function($scope, $http){
	$scope.login = function(){
		console.log($scope.input);
		$scope.isLogin = true;
	};
}]);

controllerUser.controller('register', ['$scope', '$http', function($scope, $http){
	$scope.register = function(){
		$scope.submit = true;
		$scope.errors = {};
		$scope.errors.name = "Ktoś już używa tego imienia";

		$scope.userCreate = function(user){
		$http({
			method: "POST",
			url: "api/admin/users/create",
			data: user,
			name: user.name,
			email: user.email,
			password: user.password,
			passconf: user.passconf

		}).then(function(response){
			console.log(response.data.name);

			if(!response.data.error)
			{
				$scope.success = true;
				$timeout(function(){
					$scope.success = false;
					$scope.user = {};
				}, 2000);
			}else{
				$scope.error = response.data.error;
				$scope.errorName = response.data.name;
				$scope.errorEmail = response.data.email;
				$scope.errorPassword = response.data.password;
				$scope.errorPassconf = response.data.passconf;
			}

		},function(response){
			console.log("Bład dodawania użytkownika");
			console.log(response);
		});
	};
		
	};
}]);

