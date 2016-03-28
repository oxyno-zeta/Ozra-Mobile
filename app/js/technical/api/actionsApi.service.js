/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 24/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.api')
		.service('actionsApiService', actionsApiService);

	/** @ngInject */
	function actionsApiService($rootScope, $resource, preferencesService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */

		self.resource = $resource(preferencesService.getServerUrlForAPI() + '/api/actions/:id/:subtext',
			null,
			{
				get: {method: 'GET'}
			});

		//////////////////////////

		// Update
		$rootScope.$on('preferencesService:update', function(){
			// Refresh resource
			self.resource = $resource(preferencesService.getServerUrlForAPI() + '/api/actions/:id',
				null,
				{
					get: {method: 'GET'}
				});
		});

		$rootScope.$on('preferencesService:cached', function(){
			// Refresh resource
			self.resource = $resource(preferencesService.getServerUrlForAPI() + '/api/actions/:id',
				null,
				{
					get: {method: 'GET'}
				});
		});
	}

})();
