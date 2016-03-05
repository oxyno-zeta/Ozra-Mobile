/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 02/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.base')
		.service('RequestBaseService', RequestBaseService);

	/* @ngInject */
	function RequestBaseService($resource) {
		var vm = this;
		//vm = $resource();
	}

})();
