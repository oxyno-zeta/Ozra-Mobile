/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 06/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.model')
		.service('preferencesModel', preferencesModel);

	/** @ngInject */
	function preferencesModel() {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */

		// Export
		self.createEmptyNew = createEmptyNew;

		////////////////

		/**
		 * Preferences model
		 * @type {{serverUrl: undefined}}
		 */
		var preferencesModelObject = {
			serverUrl: undefined
		};

		/**
		 * Create empty preferences model
		 * @returns {*|Mixed}
		 */
		function createEmptyNew(){
			return _.cloneDeep(preferencesModelObject);
		}
	}

})();

