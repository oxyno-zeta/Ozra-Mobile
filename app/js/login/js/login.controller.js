/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 05/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.login')
		.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController($state, systemService, popupService) {
		var vm = this;
		// Variables
		vm.form = {
			username: '',
			password: ''
		};
		// Functions
		vm.login = login;
		vm.isFormReady = isFormReady;

		////////////////

		/**
		 * Login action
		 */
		function login(){
			systemService.login(vm.form.username, vm.form.password).then(function(result){
				$state.go('menu.welcome');
			}, function(err){
				if (_.isEqual(err.status, 0)){
					popupService.serverNotAccessible();
				}
				else if (_.isEqual(err.status, 404) ||
					_.inRange(err.status, 500, 599)){
					popupService.serverError();
				}
				else if (_.isEqual(err.status, 401) || _.isEqual(err.status, 403)){
					popupService.notAuthorized();
				}
				else {
					popupService.unknownError();
				}
			});
		}

		/**
		 * Check if form is ready
		 * @returns {boolean}
		 */
		function isFormReady(){
			var form = vm.form;

			// Check username
			if (_.isEqual(form.username, '') || _.isEqual(form.password, '')){
				return false;
			}

			return true; // Default response
		}


	}

})();
