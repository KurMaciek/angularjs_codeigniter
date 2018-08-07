'use strict';

var controllerAdmin = angular.module('controllerAdmin', ['myDirectives', , 'angularFileUpload']);

controllerAdmin.controller('products', ['$scope', '$http', function($scope, $http){

	function getProducts(){
		$http({
		      method: 'GET',
		      url: 'api/admin/products/get'
			}).then(function (data){
				$scope.products = data.data;
				
			},function (data){
				console.log("Błąd " + data );
			});
	}
	getProducts();

	$scope.product_delete = function(product, $index){

		if( !confirm('Czy napewno ? '))
			return false;

		//$scope.products.splice($index, 1);
		$http({
			method: 'POST',
			url: 'api/admin/products/delete',
			data: product
		}).then(function(response){
			alert('Produkt usunięty');
			getProducts();
		});
	};
	
	//console.log(tablica);
	
}]);

controllerAdmin.controller('productEdit', ['$scope', '$http', '$routeParams', '$timeout', 'FileUploader', function($scope, $http, $routeParams, $timeout, FileUploader){

	var idProduct = $routeParams.index;
	
	$scope.id = idProduct;
	$http({
	      method: 'GET',
	      url: 'api/admin/products/get/' + idProduct
		}).then(function (data){			
			//console.log(products[0]);
			$scope.product = data.data;
			
		},function (data){
			console.log("Błąd " + data );
		});

	getImages();
	function getImages(){
		$http({
		method: "GET",
		url: 'api/admin/images/getImages/' + idProduct
		}).then(function(response){
			$scope.images = response.data; 
		});
	}
	
	
	$scope.zapiszZmiany = function(product){
		
		console.log(product);
		$http({
			method: 'POST',
			url: 'api/admin/products/update/',
			data: product
		}).then(function(response){
			console.log(response);
			$scope.success = true;
			$timeout(function(){
				$scope.success = false;
			}, 3000);

		},function(response){
			console.log(response.data);
		});
		
		
	};

	$scope.removeImage = function(imageName){

		$http({
			method: 'POST',
			url: 'api/admin/images/delete/',
			data: {
				id : idProduct,
				image: imageName
			}
		}).then(function(response){
			console.log(response);
			getImages();
		});

		
	};
	
	var uploader = $scope.uploader = new FileUploader({
		url: 'api/admin/images/upload/' + idProduct,
	});

	uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    	getImages();
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
        
	
}]);
controllerAdmin.controller('productCreate', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

	$scope.product_create = function(product){
		
		$http({
	        url: 'api/admin/products/create',
	        method: "POST",
	        data: product,//'message' : message }
	    })
	    .then(function(response) {
	    	$scope.success = true;
	    	$timeout(function(){
	    		$scope.success = false;
	    		$scope.product = {};
	    	}, 2000);
	    }, 
	    function(response) { // optional
	            console.log("Błąd ");
	    });

		console.log(product);
	};
	
}]);


controllerAdmin.controller('users', ['$scope', '$http', function($scope, $http){
	function getUsers(){
		$http({
			url: 'api/admin/users/get',
			method: "GET",
		}).then(function(response){		
			$scope.users = response.data;

		},
		function(response){

		});
	}

	getUsers();

	$scope.delete_user = function(user, $index){
		if( !confirm('Czy napewno ? '))
			return false;

		//$scope.users.splice($index, 1);

		$http({
			method: "POST",
			url: "api/admin/users/delete",
			data: user
		}).then(function(){			
			getUsers();
		}, function(){
			console.log('Błąd usuwania użytkownika');
		});

	}
}]);

controllerAdmin.controller('userEdit', ['$scope', '$http', '$routeParams', '$timeout', function($scope, $http, $routeParams, $timeout){
	var id = $routeParams.id;
	//$scope.id = id;
	
	$http({
		url: 'api/admin/users/get/' + id,
		method: "GET",		

	}).then(function(response){
				
		$scope.user = response.data;
		
	},
	function(response){
		console.log('Bład pobierania danych');
	});


	$scope.saveChanges = function(user){
		$scope.user = {};

		$http({
			method: "POST",
			url: "api/admin/users/update",
			data: user,
			id: id,
			name: user.name,
			email: user.email,
			password: user.password,
			passconf: user.passconf

		}).then(function(response){
			if(!response.data.error)
			{
				$scope.error = response.data.error;
				$scope.success = true;
				$timeout(function(){
					$scope.success = false;
					
				}, 2000);
			}else{
				$scope.error = response.data.error;
				$scope.errorName = response.data.name;
				$scope.errorEmail = response.data.email;
				$scope.errorPassword = response.data.password;
				$scope.errorPassconf = response.data.passconf;
			}
		},function(){
			console.log('Bład zapisu zmian użytkownika');
		});
		console.log($scope.user);
	};
}]);

controllerAdmin.controller('userCreate', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
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
}]);

controllerAdmin.controller('orders',['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	$http({
		url: 'model/orders.json',
		method: 'GET'
	}).then(function(response){
		$scope.orders = response.data;
		console.log($scope.orders);
	},function(response){

	});

	$scope.orderDelete = function($index){
		
		if( !confirm('Czy napewno ? '))
			return false;
		$scope.orders.splice($index, 1);
	};

	$scope.statusChange = function($index){
		if($scope.orders[$index].status == 0){
			$scope.orders[$index].status = 1;
		}
		console.log($scope.orders[$index].status);
	}

}]);