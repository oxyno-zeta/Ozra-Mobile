/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 26/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.categories')
		.config(routeConfig);

		/** @ngInject */
		function routeConfig ($stateProvider) {
		    $stateProvider
				.state('menu.categories', {
					url: '/categories',
					views: {
						'content@menu': {
							templateUrl: 'js/categories/categories.html',
							controller: 'CategoriesController',
							controllerAs: 'categoriesCtrl'
						}
					},
					resolve: {
						categories: function(actionsService){
							return actionsService.getCategories();
						}
					}
				});
		}

})();