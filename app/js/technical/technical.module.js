/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 02/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical', [
			'ozra.technical.api',
			'ozra.technical.wrapper',
			'ozra.technical.dao',
			'ozra.technical.model',
			'ozra.technical.services',
			'ozra.technical.run'
		]);

})();