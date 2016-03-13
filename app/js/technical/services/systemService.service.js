/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 02/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.services')
		.service('systemService', systemService);

	/** @ngInject */
	function systemService($q, systemDaoService) {
		/* jshint validthis: true */
		this.login = login;
		/* jshint validthis: false */

		////////////////

		/**
		 * User login
		 * @param username
		 * @param password
		 * @returns {*}
		 */
		function login(username, password) {
			var deferred = $q.defer();
			var body = {
				username: username,
				password: password
			};
			systemDaoService.resource.post(null, body, deferred.resolve, deferred.reject);
			return deferred.promise;
		}
	}

})();

