/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 29/02/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.services')
		.service('splashService', splashService);

	/** @ngInject */
	function splashService($q, $rootScope, $state, $ionicHistory, $ionicPlatform, preferencesService, userService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */

		self.followRequest = followRequest;
		self.initialized = false; // Init with false value
		self.toParams = undefined;
		self.toState = undefined;

		////////////////

		/**
		 * Continue to next request
		 */
		function followRequest() {
			// Waiting platform ready
			$ionicPlatform.ready(function(){
				// will execute when device is ready, or immediately if the device is already ready.

				// Disable animation and back button for the next transition.
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});

				preferencesService.getPreferences().then(function(preferences){
					// Has preferences => Check if there are ok
					if (preferencesService.isPreferencesCompleted(preferences)){
						var promises = [];
						// Get all user token and id
						promises.push(userService.getUserId());
						promises.push(userService.getUserToken());
						// Wait for all
						$q.all(promises).then(function(){
							// Continue
							$state.go(self.toState, self.toParams);
						}, function(){
							$state.go('solo.login');
						});
					}
					else {
						// Not complete
						$state.go('solo.preferences');
					}
				}, function(err){
					if (_.isUndefined(err) || _.isNull(err)){
						// If there is nothing, populate with default object
						preferencesService.init().finally(function(){
							$state.go('solo.preferences');
						});
						return;
					}
					// Has not preferences => go to preferences
					$state.go('solo.preferences');
				});
			});
		}
	}

})();

