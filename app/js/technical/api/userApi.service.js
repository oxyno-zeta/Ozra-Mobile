/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 17/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.api')
		.service('userApiService', userApiService);

	/* @ngInject */
	function userApiService($rootScope, $resource, preferencesService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */

		self.resource = $resource(preferencesService.getServerUrlForAPI() + '/api/users/:id',
			null,
			{
				get: {method: 'GET'}
			});

		//////////////////////////

		// Update
		$rootScope.$on('preferencesService:update', function(){
			// Refresh resource
			self.resource = $resource(preferencesService.getServerUrlForAPI() + '/api/users/:id',
				null,
				{
					get: {method: 'GET'}
				});
		});

		$rootScope.$on('preferencesService:cached', function(){
			// Refresh resource
			self.resource = $resource(preferencesService.getServerUrlForAPI() + '/api/users/:id',
				null,
				{
					get: {method: 'GET'}
				});
		});
	}

})();

