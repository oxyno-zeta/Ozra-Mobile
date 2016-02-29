/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 26/02/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.loading')
		.config(routeConfig);

		/** @ngInject */
		function routeConfig ($stateProvider) {
		    $stateProvider
				.state('loading', {
					url: '/'
				});
		}

})();