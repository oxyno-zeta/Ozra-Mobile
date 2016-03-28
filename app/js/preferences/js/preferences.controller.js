/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 12/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.preferences')
		.controller('preferencesController', preferencesController);

	/* @ngInject */
	function preferencesController($state, $ionicHistory, popupService, preferencesService, preferences) {
		/* jshint validthis: true */
		var vm = this;
		/* jshint validthis: false */
		// Variables
		vm.preferences = preferences;
		// Functions
		vm.isPreferencesCompleted = isPreferencesCompleted;
		vm.save = save;

		////////////////

		/**
		 * Check is preferences are completed
		 * @returns {*}
		 */
		function isPreferencesCompleted() {
			return preferencesService.isPreferencesCompleted(vm.preferences);
		}

		/**
		 * Save preferences
		 */
		function save(){
			preferencesService.savePreferences(vm.preferences).then(function(_preferences){
				vm.preferences = _preferences;

				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});

				if (!$state.includes('menu')){
					// Not in menu => go to login
					$state.go('solo.login');
				}
				else {
					// Go to welcome page
					$state.go('menu.welcome');
				}
			}, function(){
				// Something fail
				popupService.unknownError();
			});
		}
	}

})();
