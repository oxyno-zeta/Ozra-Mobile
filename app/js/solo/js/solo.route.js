/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 05/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.solo')
		.config(routeConfig);

		/** @ngInject */
		function routeConfig ($stateProvider) {
		    $stateProvider
				.state('solo', {
					templateUrl: 'js/solo/solo.html'
				});
		}

})();