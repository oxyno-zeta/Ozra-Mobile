/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 28/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.run')
		.run(runApiError);

	/** @ngInject */
	function runApiError($rootScope, $state, systemService, popupService) {
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