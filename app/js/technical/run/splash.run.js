/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 29/02/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.run')
		.run(runLoading);

	/** @ngInject */
	function runLoading ($rootScope, $state, splashService) {
		$rootScope.$on('$stateChangeStart', function(event, _toState, _toParams) {
			// Check if init is already done
			if (!splashService.initialized){
				// Store data
				splashService.toParams = _toParams;
				splashService.toState = _toState.name;
				splashService.initialized = true;
				event.preventDefault();

				$state.go('splash');
			}
		});
	}

})();