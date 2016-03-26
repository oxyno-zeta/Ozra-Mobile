/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 25/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.actions')
		.controller('ActionsController', ActionsController);

	/* @ngInject */
	function ActionsController(actionsService, actions) {
		/* jshint validthis: true */
		var vm = this;
		/* jshint validthis: false */
		// Variables
		vm.actions = actions;
		// Functions

		////////////////

	}

})();
