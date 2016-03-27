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
	function actionsService($q, $timeout, userService, loadingService, actionsDaoService, startAppWrapperService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Functions
		self.run = run;
		self.getActions = getActions;
		self.getCategories = getCategories;

		////////////////

		/**
		 * Run action
		 * @param action
		 * @returns {*}
		 */
		function run(action){
			loadingService.sendingRequestWaiting();

			var deferred = $q.defer();
			// Get user token
			userService.getUserToken().then(function(token){
				// Run action
				actionsDaoService.run(token, action.id).then(function(result){
					if (_.isEqual(result.code, 0)){
						// Ok
						loadingService.actionSucceed();
						// Check if there is an application to run
						if (!_.isNull(action.application) && !_.isEqual(action.application, '')){
							// Application to run
							// Check if application exist on device
							startAppWrapperService.checkExistApp(action.application).then(function(){
								// Wait
								$timeout(function(){
									// Run application
									startAppWrapperService.startApp(action.application).then(deferred.resolve,
										function(err){
											loadingService.unexpectedError();
											deferred.reject(err);
										});
								}, 1500);
							}, function(err){
								loadingService.applicationNotFound();
								deferred.reject(err);
							});
							return;
						}

						// Nothing to run
						deferred.resolve();
					}
					else {
						// Error
						loadingService.actionError();
					}
				}, function(err){
					// Unexpected error
					loadingService.unexpectedError();
					deferred.reject(err);
				});
			}, function(err){
				loadingService.unexpectedError();
				deferred.reject(err);
			});
			return deferred.promise;
		}

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

