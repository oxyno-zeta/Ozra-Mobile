/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 26/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.wrapper')
		.service('startAppWrapperService', startAppWrapperService);

	/** @ngInject */
	function startAppWrapperService($q, platformWrapperService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Functions
		self.checkExistApp = checkExistApp;
		self.startApp = startApp;

		////////////////

		/**
		 * Check if app exist
		 * @param appId
		 * @returns {*}
		 */
		function checkExistApp(appId){
			var deferred = $q.defer();
			if (platformWrapperService.isServeMode()){
				deferred.resolve();
			}
			else {
				navigator.startApp.check(appId, deferred.resolve, deferred.reject);
			}
			return deferred.promise;
		}

		/**
		 * Start app
		 * @param appId
		 * @returns {*}
		 */
		function startApp(appId){
			var deferred = $q.defer();
			if (platformWrapperService.isServeMode()){
				deferred.resolve();
			}
			else {
				navigator.startApp.start(appId, deferred.resolve, deferred.reject);
			}
			return deferred.promise;
		}
	}

})();
