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
	function preferencesService(preferencesDaoService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Functions
		self.getPreferences = getPreferences;
		self.savePreferences = savePreferences;
		self.isPreferencesCompleted = isPreferencesCompleted;
		self.init = init;

		////////////////

		/**
		 * Get Preferences
		 * @returns {*}
		 */
		function getPreferences(){
			return preferencesDaoService.getPreferences();
		}

		/**
		 * Save preferences
		 * @returns {*}
		 */
		function savePreferences(preferences){
			var _preferences = _.cloneDeep(preferences);
			// Modify url if needed
			if (!(_.startsWith(_preferences.serverUrl, 'http://') ||
				_.startsWith(_preferences.serverUrl, 'https://'))){
				_preferences.serverUrl = 'http://' + _preferences.serverUrl;
			}
			if (!_.endsWith(_preferences.serverUrl, '/')){
				_preferences.serverUrl.substring(0, (_preferences.serverUrl.length - 1));
			}

			return preferencesDaoService.setPreferences(_preferences);
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

		function init(){
			return preferencesDaoService.setPreferences(preferencesDaoService.createEmpty());
		}
	}

})();
