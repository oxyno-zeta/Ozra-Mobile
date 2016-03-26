/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 26/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.categories')
		.controller('CategoriesController', CategoriesController);

	/** @ngInject */
	function CategoriesController(categories) {
		/* jshint validthis: true */
		var vm = this;
		/* jshint validthis: false */
		// Variables
		vm.categories = categories;

		////////////////

	}

})();
