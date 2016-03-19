/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 14/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.services')
		.service('userService', userService);

	/** @ngInject */
	function userService($q, userDaoService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Variables
		// Functions
		self.saveUserId = saveUserId;
		self.getUserId = getUserId;
		self.saveUserToken = saveUserToken;
		self.getUserToken = getUserToken;
		self.getUserData = getUserData;

		////////////////

		/**
		 * Save user id
		 * @param userId
		 * @returns {*}
		 */
		function saveUserId(userId){
			return userDaoService.saveUserId(userId);
		}

		/**
		 * Get user id
		 * @returns {*}
		 */
		function getUserId(){
			return userDaoService.getUserId();
		}

		/**
		 * Save user token
		 * @param token
		 * @returns {*}
		 */
		function saveUserToken(token){
			return userDaoService.saveUserToken(token);
		}

		/**
		 * Get user token
		 * @returns {*}
		 */
		function getUserToken(){
			return userDaoService.getUserToken();
		}

		/**
		 * Get user data
		 * @returns {*}
		 */
		function getUserData(){
			var deferred = $q.defer();
			// Get data
			var promises = [];
			promises.push(userDaoService.getUserId());
			promises.push(userDaoService.getUserToken());
			// Waiting all data
			$q.all(promises).then(function(data){
				var params = {
					id: data[0],
					token: data[1]
				};
				userDaoService.getUserData(params).then(deferred.resolve, deferred.reject);
			}, deferred.reject);
			return deferred.promise;
		}
	}

})();
