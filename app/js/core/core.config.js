/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 29/02/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.core')
		.config(routeConfig)
		.config(storageConfig);

	/** @ngInject */
	function routeConfig($urlRouterProvider) {
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('splash');
	}

	/** @ngInject */
	function storageConfig(localStorageServiceProvider){
		localStorageServiceProvider
			.setPrefix('ozra');
	}

})();