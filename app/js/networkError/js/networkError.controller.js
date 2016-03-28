/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 28/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.networkError')
		.controller('NetworkErrorController', NetworkErrorController);

	/* @ngInject */
	function NetworkErrorController($rootScope, $state, $interval, networkService) {
		/* jshint validthis: true */
		var vm = this;
		/* jshint validthis: false */
		// Variables
		vm.isOnline = false; // Default value
		// Functions
		vm.reloadApplication = reloadApplication;

		////////////////

		/**
		 * Reload application
		 */
		function reloadApplication(){
			$state.go('splash');
		}


		// Updates
		$rootScope.$on('networkService:offline', function(){
			console.log('la');
			vm.isOnline = false;
		});

		$rootScope.$on('networkService:online', function(){
			console.log('ici');
			vm.isOnline = true;
		});
	}

})();
