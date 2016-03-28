/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 13/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.menu')
		.config(routeConfig);

		/** @ngInject */
		function routeConfig ($stateProvider) {
		    $stateProvider.state('menu', {
				url: '/menu',
				templateUrl: 'js/menu/menu.html',
				controller: 'MenuController',
				controllerAs: 'menuCtrl',
				resolve: {
					userData: function(userService){
						return userService.getUserData();
					}
				}
			});
		}

})();