'use strict';
var controllerNavigation = angular.module('controllerNavigation', []);

controllerNavigation.controller('navigation', ['$scope', '$location', 'cartSrv', function($scope, $location, cartSrv){
	
	$scope.navigation = function(){
		if(/^\/admin/.test( $location.path())){
			return 'partials/admin/navigation.html';
		}else{
			return 'partials/site/navigation.html';
		}		
	}

	$scope.labelCart = function(){
		return cartSrv.content();
	};
	
	
	$scope.isActive = function(path){
		return $location.path() === path;
	}


}]);

