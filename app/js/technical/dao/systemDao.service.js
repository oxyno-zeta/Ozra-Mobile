/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 02/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.dao')
		.service('systemDaoService', systemDaoService);

	/* @ngInject */
	function systemDaoService($resource) {
		/* jshint validthis: true */
		var vm = this;
		/* jshint validthis: false */

		vm.login = $resource('http://localhost:2050/api/system/login',
			null,
			{
				post: {method:'POST'}
			});
	}

})();
