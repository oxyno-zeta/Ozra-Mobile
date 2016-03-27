/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 26/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.wrapper')
		.service('platformWrapperService', platformWrapperService);

	/** @ngInject */
	function platformWrapperService() {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Functions
		self.isServeMode = isServeMode;

		////////////////

		/**
		 * Check is serve mode (development mode)
		 * @returns {boolean}
		 */
		function isServeMode(){
			return (_.isUndefined(window.cordova));
		}
	}

})();

