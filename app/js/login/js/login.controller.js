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
	function LoginController(systemService) {
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

		function login(){
			systemService.login(vm.form.username, vm.form.password).then(function(result){
				console.log(result);
			}, function(err){
				console.error(err);
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
