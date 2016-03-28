/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 13/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.welcome')
		.config(routeConfig);

		/** @ngInject */
		function routeConfig ($stateProvider) {
		    $stateProvider.state('menu.welcome', {
				url: '/welcome',
				views: {
					content: {
						templateUrl: 'js/welcome/welcome.html'
					}
				}
			});
		}

})();