/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 06/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.preferences')
		.config(routeConfig).run(function($rootScope){
		$rootScope.$on('$stateChangeError', function(){
			console.log(arguments);
		});
	});

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
				});
		}

})();