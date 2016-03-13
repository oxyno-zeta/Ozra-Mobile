/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 06/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.dao')
		.service('preferencesDaoService', preferencesDaoService);

	/** @ngInject */
	function preferencesDaoService($q, localStorageService, preferencesModel) {
		// Private
		var preferencesCache;
		var databaseName = 'preferences';

		// Public
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Variables
		// Functions
		self.getPreferences = getPreferences;
		self.setPreferences = setPreferences;
		self.createEmpty = createEmpty;

		////////////////

		/**
		 * Get Preferences
		 * @returns {*}
		 */
		function getPreferences(){
			var deferred = $q.defer();
			// Get preferences in storage
			preferencesCache = localStorageService.get(databaseName);
			// Check if there is nothing
			if (_.isUndefined(preferencesCache) || _.isNull(preferencesCache)){
				deferred.reject();
			}
			else {
				deferred.resolve(preferencesCache);
			}
			return deferred.promise;
		}

		/**
		 * Set preferences
		 * @param preferences
		 * @returns {*}
		 */
		function setPreferences(preferences){
			var deferred = $q.defer();
			// Set data in database
			var result = localStorageService.set(databaseName, preferences);
			if (result){
				// Set in cache
				preferencesCache = preferences;
				deferred.resolve(preferencesCache);
			}
			else {
				deferred.reject();
			}
			return deferred.promise;
		}

		/**
		 * Create empty new
		 * @returns {*}
		 */
		function createEmpty(){
			return preferencesModel.createEmptyNew();
		}
	}

})();

