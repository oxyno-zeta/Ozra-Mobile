/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 06/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.preferences')
		.config(routeConfig);

		/** @ngInject */
		function routeConfig ($stateProvider) {
		    $stateProvider
				.state('solo.preferences', {
					url: '/preferences',
					views: {
						'content@solo': {
							templateUrl: 'js/preferences/preferences.html',
							controller: 'preferencesController',
							controllerAs: 'preferencesCtrl'
						}
					},
					resolve: {
						preferences: function (preferencesService){
							return preferencesService.getPreferences();
						}
					}
				})
				.state('menu.preferences', {
					url: '/preferences',
					views: {
						'content@menu': {
							templateUrl: 'js/preferences/preferences.html',
							controller: 'preferencesController',
							controllerAs: 'preferencesCtrl'
						}
					},
					resolve: {
						preferences: function (preferencesService){
							return preferencesService.getPreferences();
						}
					}
				});
		}

})();