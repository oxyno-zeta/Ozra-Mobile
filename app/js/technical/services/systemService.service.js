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
	function systemService($q, $state, $ionicHistory, userService, popupService, systemDaoService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		self.login = login;
		self.logout = logout;

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

		/**
		 * User logout
		 */
		function logout(){
			var deferred = $q.defer();
			// Store promises
			var promises = [];
			promises.push(userService.saveUserId(null));
			promises.push(userService.saveUserToken(null));
			// Wait for all save
			$q.all(promises).then(function(){
				// No back button
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});

				// New data stored => Token and user id cleared => Go to login
				$state.go('solo.login').then(deferred.resolve, deferred.reject);
			}, function(){
				// Something fail
				popupService.unknownError();
				deferred.reject();
			});
			return deferred.promise;
		}
	}

})();

