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
	function systemService($q, userService, systemDaoService) {
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
			systemDaoService.login(body).then(function(response){
				// Store data before resolve
				var promises = [];
				promises.push(userService.saveUserId(response.userId));
				promises.push(userService.saveUserToken(response.token));
				// Save all
				$q.all(promises).then(function(){
					// Resolve
					deferred.resolve(response);
				}, deferred.reject);
			}, deferred.reject);
			return deferred.promise;
		}
	}

})();

