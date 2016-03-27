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
			var isEdge = ionic.Platform.isEdge();
			var isIOS = ionic.Platform.isIOS();
			var isAndroid = ionic.Platform.isAndroid();
			var isWindowsPhone = ionic.Platform.isWindowsPhone();
			return !(isAndroid && isEdge && isIOS && isWindowsPhone);
		}
	}

})();

