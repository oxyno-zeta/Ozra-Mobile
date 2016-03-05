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
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
				if (!splashService.initialized){
					splashService.toParams = toParams;
					splashService.toState = toState;
					splashService.initialized = true;
					event.preventDefault();

					$state.go('splash');
				}
			});
		}

})();