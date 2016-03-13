/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 29/02/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.splash')
		.run(runLoading);

	/** @ngInject */
	function runLoading ($rootScope, $state, splashService) {
		$rootScope.$on('$stateChangeStart', function(event, _toState, _toParams) {
			// Check if init is already done
			if (!splashService.initialized){
				// Get right state
				var toParams = (_.isEqual(_toState.name, 'splash')) ? {} : _toParams;
				var toState = (_.isEqual(_toState.name, 'splash')) ? 'solo.login' : _toState.name;
				// Store data
				splashService.toParams = toParams;
				splashService.toState = toState;
				splashService.initialized = true;
				event.preventDefault();

				$state.go('splash');
			}
		});
	}

})();