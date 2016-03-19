/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 15/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.model')
		.service('userModel', userModel);

	/** @ngInject */
	function userModel() {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		self.getFromData = getFromData;

		////////////////

		/**
		 * User model object
		 * @type {{id: undefined, name: undefined, token: undefined, groups: undefined}}
		 */
		var model = {
			id: undefined,
			name: undefined,
			token: undefined,
			groups: undefined
		};

		/**
		 * Get from data
		 * @returns {*}
		 */
		function getFromData(data){
			var user = {};
			// Copy data
			_.forIn(model, function(value, key){
				user[key] = data[key];
			});
			return user;
		}

	}

})();
