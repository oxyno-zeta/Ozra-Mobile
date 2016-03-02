/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 26/02/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.splash')
		.config(routeConfig);

		/** @ngInject */
		function routeConfig ($stateProvider) {
		    $stateProvider
				.state('splash', {
					url: '/splash',
					templateUrl: 'js/splash/splash.html',
					cache: false
				});
		}

})();