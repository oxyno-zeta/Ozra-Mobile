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
	function MenuController(systemService, userData) {
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
			systemService.logout();
		}

	}

})();
