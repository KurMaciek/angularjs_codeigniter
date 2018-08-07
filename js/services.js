'use strict';

var myServices = angular.module( 'myServices', []);

myServices.factory('cartSrv', ['store', function(store){
	
	if(store.get('cart')){
		var cartSrv = store.get('cart');
	}else{
		var cartSrv = [];
	}

	cartSrv.show = function(){

		return cartSrv;

	}
	cartSrv.content = function(){		
		return cartSrv.length;
	};
	
	
	cartSrv.add = function(product){
		
		if( !cartSrv.length ){
			product.qty = 0;
			cartSrv.push(product);
		}
		
		var addNew = true;
		angular.forEach(cartSrv, function(value, key){
			if(value.nazwa == product.nazwa){

				addNew = false;
				cartSrv[key].qty++;
				console.log(value.nazwa);
				console.log(product.nazwa);
			}

		});
		
		if(addNew){
			product.qty = 1;
			cartSrv.push(product);
		}
		store.set('cart', cartSrv);
		console.log(cartSrv);
		
	};
	cartSrv.emptyCart = function(){
		console.log('Koszyk wyczyszczony');		
		store.remove('cart');
		cartSrv.length = 0;
	};	
	cartSrv.update = function(newCart){
		store.set('cart', newCart);
	};
	return cartSrv;
	
}]);