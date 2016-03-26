/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 24/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.actions')
		.config(routeConfig);

		/** @ngInject */
		function routeConfig ($stateProvider) {
		    $stateProvider
				.state('menu.actions', {
					url:'/:category/actions',
					views: {
						'content@menu': {
							templateUrl: 'js/actions/actions.html',
							controller: 'ActionsController',
							controllerAs: 'actionsCtrl'
						}
					},
					resolve: {
						actions: function($stateParams, actionsService){
							return actionsService.getActions($stateParams.category);
						}
					}
				});
		}

})();