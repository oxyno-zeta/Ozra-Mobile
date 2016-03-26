/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 25/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.services')
		.service('actionsService', actionsService);

	/** @ngInject */
	function actionsService($q, userService, actionsDaoService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Functions
		self.getActions = getActions;
		self.getCategories = getCategories;

		////////////////

		/**
		 * Get all actions for a specific categories
		 * @param category
		 * @returns {*}
		 */
		function getActions(category){
			var deferred = $q.defer();
			// Get user token
			userService.getUserToken().then(function(token){
				// Get all actions
				actionsDaoService.getAll(token).then(function(actions){
					deferred.resolve(_.filter(actions, {category: category}));
				}, deferred.reject);
			}, deferred.reject);
			return deferred.promise;
		}

		/**
		 * Get all categories
		 * @returns {*}
		 */
		function getCategories(){
			var deferred = $q.defer();
			// Get user token
			userService.getUserToken().then(function(token){
				// Get all actions
				actionsDaoService.getAll(token).then(function(actions){
					deferred.resolve(_.uniq(_.map(actions, 'category')));
				}, deferred.reject);
			}, deferred.reject);
			return deferred.promise;
		}
	}

})();

