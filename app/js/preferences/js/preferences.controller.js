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
	function preferencesController($state, $ionicHistory, preferencesService, preferences) {
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

				if (!$state.includes('menu')){
					// Not in menu => go to login
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});

					$state.go('solo.login');
				}
			});
		}
	}

})();
