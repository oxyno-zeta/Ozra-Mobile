/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 02/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.dao')
		.service('systemDaoService', systemDaoService);

	/* @ngInject */
	function systemDaoService($resource, $rootScope, preferencesService) {
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
	}

})();
