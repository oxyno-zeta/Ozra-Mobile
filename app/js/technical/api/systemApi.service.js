/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 17/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.api')
		.service('systemApiService', systemApiService);

	/* @ngInject */
	function systemApiService($rootScope, $resource, preferencesService) {
		/* jshint validthis: true */
		var vm = this;
		/* jshint validthis: false */
		vm.resource = $resource(preferencesService.getServerUrlForAPI() + '/api/system/login',
			null,
			{
				post: {method: 'POST'}
			});

		// Update
		$rootScope.$on('preferencesService:update', function(){
			// Refresh resource
			vm.resource = $resource(preferencesService.getServerUrlForAPI() + '/api/system/login',
				null,
				{
					post: {method: 'POST'}
				});
		});

		$rootScope.$on('preferencesService:cached', function(){
			// Refresh resource
			vm.resource = $resource(preferencesService.getServerUrlForAPI() + '/api/system/login',
				null,
				{
					post: {method: 'POST'}
				});
		});
	}

})();
