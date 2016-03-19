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
	function systemDaoService($q, systemApiService) {
		/* jshint validthis: true */
		var vm = this;
		/* jshint validthis: false */
		// Variables
		// Functions
		vm.login = login;

		////////////////////////////:

		/**
		 * Login
		 * @param body
		 * @returns {*}
		 */
		function login(body){
			var deferred = $q.defer();
			systemApiService.resource.post(null, body, deferred.resolve, deferred.reject);
			return deferred.promise;
		}

	}

})();
