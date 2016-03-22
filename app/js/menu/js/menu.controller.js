/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 19/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.menu')
		.controller('MenuController', MenuController);

	/** @ngInject */
	function MenuController($q, $state, $ionicHistory, popupService, userService, userData) {
		/* jshint validthis: true */
		var vm = this;
		/* jshint validthis: false */
		// Variables
		vm.user = userData;
		// Functions
		vm.logout = logout;

		////////////////

		/**
		 * Logout
		 */
		function logout(){
			// Store promises
			var promises = [];
			promises.push(userService.saveUserId(null));
			promises.push(userService.saveUserToken(null));
			// Wait for all save
			$q.all(promises).then(function(){
				// No back button
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});

				// New data stored => Token and user id cleared => Go to login
				$state.go('solo.login');
			}, function(){
				// Something fail
				popupService.unknownError();
			});
		}

	}

})();
