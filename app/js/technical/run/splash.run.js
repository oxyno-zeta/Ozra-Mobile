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
	function runLoading ($rootScope, $state, splashService, systemService, popupService) {
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

		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
			// Check if it is an error from api
			if (!_.isNull(error) && !_.isUndefined(error) && _.has(error, 'status') &&
				(_.isEqual(error.status, 403) || _.isEqual(error.status, 401) || _.isEqual(error.status, 500))){
				systemService.logout().finally(function(){
					popupService.notAuthorized();
				});
			}
		});
	}

})();