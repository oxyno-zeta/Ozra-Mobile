/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 14/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.dao')
		.service('userDaoService', userDaoService);

	/** @ngInject */
	function userDaoService($q, localStorageService, userApiService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Variables
		var databaseNameUserId = 'userId';
		var databaseNameUserToken = 'userToken';
		// Functions
		self.saveUserId = saveUserId;
		self.getUserId = getUserId;
		self.saveUserToken = saveUserToken;
		self.getUserToken = getUserToken;
		self.getUserData = getUserData;

		//////////////////////////

		/**
		 * Save user id
		 * @param userId
		 * @returns {*}
		 */
		function saveUserId(userId){
			var deferred = $q.defer();
			var result = localStorageService.set(databaseNameUserId, userId);
			if (result){
				deferred.resolve(userId);
			}
			else {
				deferred.reject();
			}
			return deferred.promise;
		}

		/**
		 * Get user id
		 * @returns {*}
		 */
		function getUserId(){
			var deferred = $q.defer();
			var userId = localStorageService.get(databaseNameUserId);
			if (_.isUndefined(userId) || _.isNull(userId)){
				deferred.reject();
			}
			else {
				deferred.resolve(userId);
			}
			return deferred.promise;
		}

		/**
		 * Save user token
		 * @param userToken
		 * @returns {*}
		 */
		function saveUserToken(userToken){
			var deferred = $q.defer();
			var result = localStorageService.set(databaseNameUserToken, userToken);
			if (result){
				deferred.resolve(userToken);
			}
			else {
				deferred.reject();
			}
			return deferred.promise;
		}

		/**
		 * Get user token
		 * @returns {*}
		 */
		function getUserToken(){
			var deferred = $q.defer();
			var userToken = localStorageService.get(databaseNameUserToken);
			if (_.isUndefined(userToken) || _.isNull(userToken)){
				deferred.reject();
			}
			else {
				deferred.resolve(userToken);
			}
			return deferred.promise;
		}

		/**
		 * Get user data from api
		 * @param params
		 * @returns {*}
		 */
		function getUserData(params){
			var deferred = $q.defer();
			userApiService.resource.get(params, function(response){
				deferred.resolve(response.user);
			}, deferred.reject);
			return deferred.promise;
		}
	}

})();
