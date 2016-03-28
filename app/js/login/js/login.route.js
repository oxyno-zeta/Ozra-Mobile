/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 02/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.login')
		.config(routeConfig);

		/** @ngInject */
		function routeConfig ($stateProvider) {
		    $stateProvider
				.state('solo.login', {
					url: '/login',
					cache: false,
					views: {
						content: {
							templateUrl: 'js/login/login.html',
							controller: 'LoginController',
							controllerAs: 'loginCtrl'
						}
					}
				});
		}

})();