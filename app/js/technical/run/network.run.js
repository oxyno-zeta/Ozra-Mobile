/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 28/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.run')
		.run(runNetwork);

		/** @ngInject */
		function runNetwork ($rootScope, $state, networkService) {
			// Check event
			$rootScope.$on('networkService:offline', function(){
				// Go to network error page
				$state.go('solo.networkerror');
			});
		}

})();