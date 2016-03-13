/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 11/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.services')
		.service('preferencesService', preferencesService);

	/* @ngInject */
	function preferencesService($q, $rootScope, preferencesDaoService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Variables
		var cache;
		// Functions
		self.getPreferences = getPreferences;
		self.savePreferences = savePreferences;
		self.isPreferencesCompleted = isPreferencesCompleted;
		self.init = init;
		self.getServerUrlForAPI = getServerUrlForAPI;

		////////////////

		/**
		 * Get Preferences
		 * @returns {*}
		 */
		function getPreferences(){
			var deferred = $q.defer();
			preferencesDaoService.getPreferences().then(function(preferences){
				// Save in cache
				cache = preferences;
				deferred.resolve(preferences);
			}, deferred.reject);
			return deferred.promise;
		}

		/**
		 * Save preferences
		 * @returns {*}
		 */
		function savePreferences(preferences){
			var deferred = $q.defer();
			var _preferences = _.cloneDeep(preferences);
			// Modify url if needed
			if (!(_.startsWith(_preferences.serverUrl, 'http://') ||
				_.startsWith(_preferences.serverUrl, 'https://'))){
				_preferences.serverUrl = 'http://' + _preferences.serverUrl;
			}
			if (!_.endsWith(_preferences.serverUrl, '/')){
				_preferences.serverUrl.substring(0, (_preferences.serverUrl.length - 1));
			}

			// Save in cache
			cache = _preferences;
			// Save
			preferencesDaoService.setPreferences(_preferences).then(function(){
				$rootScope.$broadcast('preferencesService:update');
				deferred.resolve(_preferences);
			}, deferred.reject);

			return deferred.promise;
		}

		/**
		 * Is preferences Completed
		 * @param preferences
		 * @returns {boolean}
		 */
		function isPreferencesCompleted(preferences){
			if (_.isUndefined(preferences) || _.isNull(preferences)){
				return false;
			}

			if (_.isUndefined(preferences.serverUrl) ||
				_.isNull(preferences.serverUrl) ||
				!_.isString(preferences.serverUrl) ||
				_.isEqual(preferences.serverUrl, '')){
				return false;
			}

			return true;
		}

		/**
		 * Init preferences
		 * @returns {*}
		 */
		function init(){
			return preferencesDaoService.setPreferences(preferencesDaoService.createEmpty());
		}

		/**
		 * Get Server url for API request
		 * @returns {string}
		 */
		function getServerUrlForAPI(){
			return cache.serverUrl;
		}
	}

})();
