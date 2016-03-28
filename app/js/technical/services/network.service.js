/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 28/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.services')
		.service('networkService', networkService);

	/* @ngInject */
	function networkService($rootScope, networkWrapperService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Functions
		self.isDeviceOnline = networkWrapperService.isDeviceOnline;

		////////////////

		// Updates
		$rootScope.$on('networkWrapperService:offline', function(){
			$rootScope.$broadcast('networkService:offline');
		});

		$rootScope.$on('networkWrapperService:online', function(){
			$rootScope.$broadcast('networkService:online');
		});
	}

})();
