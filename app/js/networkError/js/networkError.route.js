/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 28/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.networkError')
		.config(routeConfig);

	/** @ngInject */
	function routeConfig ($stateProvider) {
	    $stateProvider
			.state('solo.networkerror', {
				url: '/networkerror',
				views: {
					'content@solo': {
						templateUrl: 'js/networkError/networkError.html',
						controller: 'NetworkErrorController',
						controllerAs: 'networkErrorCtrl'
					}
				}
			});
	}

})();