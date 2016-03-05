/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 29/02/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.splash')
		.service('splashService', splashService);

	/** @ngInject */
	function splashService($state, $ionicHistory, $ionicPlatform) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */

		self.followRequest = followRequest;
		self.initialized = false; // Init with false value
		self.toParams = undefined;
		self.toState = undefined;

		////////////////

		function followRequest() {
			// Waiting platform ready
			$ionicPlatform.ready(function(){
				// will execute when device is ready, or immediately if the device is already ready.

				// Disable animation and back button for the next transition.
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});

				$state.go('solo.login');
			});
		}
	}

})();

