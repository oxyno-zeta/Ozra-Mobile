/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 24/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.dao')
		.service('actionsDaoService', actionsDaoService);

	/** @ngInject */
	function actionsDaoService($q, actionsApiService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Functions
		self.getAll = getAll;
		self.run = run;

		////////////////

		/**
		 * Get all actions
		 * @param token
		 * @returns {*}
		 */
		function getAll(token){
			var deferred = $q.defer();
			var params = {
				token: token
			};
			actionsApiService.resource.get(params, function(response){
				deferred.resolve(response.actions);
			}, deferred.reject);
			return deferred.promise;
		}

		/**
		 * Run action
		 * @param token
		 * @param actionId
		 * @returns {*}
		 */
		function run(token, actionId){
			var deferred = $q.defer();
			var params = {
				id: actionId,
				subtext: 'run',
				token: token
			};
			actionsApiService.resource.get(params, function(response){
				deferred.resolve(response.result);
			}, deferred.reject);
			return deferred.promise;
		}

	}

})();
