/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 26/02/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.core')
		.run(runCore);

		/** @ngInject */
		function runCore ($ionicPlatform) {
			$ionicPlatform.ready(function() {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				if (window.cordova && window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					cordova.plugins.Keyboard.disableScroll(true);

				}
				if (window.StatusBar) {
					// org.apache.cordova.statusbar required
					StatusBar.styleDefault();
				}
			});
		}

})();