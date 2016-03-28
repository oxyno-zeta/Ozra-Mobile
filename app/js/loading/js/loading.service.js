/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 27/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.loading')
		.service('loadingService', loadingService);

	/** @ngInject */
	function loadingService($ionicLoading) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Functions
		self.sendingRequestWaiting = sendingRequestWaiting;
		self.unexpectedError = unexpectedError;
		self.actionError = actionError;
		self.actionSucceed = actionSucceed;
		self.applicationNotFound = applicationNotFound;

		////////////////

		/**
		 * Sending Request and waiting
		 */
		function sendingRequestWaiting(){
			$ionicLoading.show({
				templateUrl: 'js/loading/sendingRequestWaiting.html'
			});
		}

		/**
		 * Unexpected error
		 */
		function unexpectedError(){
			$ionicLoading.show({
				templateUrl: 'js/loading/unexpectedError.html',
				duration: 2000
			});
		}

		/**
		 * Action error
		 */
		function actionError(){
			$ionicLoading.show({
				templateUrl: 'js/loading/actionError.html',
				duration: 2000
			});
		}

		/**
		 * Action succeed
		 */
		function actionSucceed(){
			$ionicLoading.show({
				templateUrl: 'js/loading/actionSucceed.html',
				duration: 1500
			});
		}

		/**
		 * Application not found
		 */
		function applicationNotFound(){
			$ionicLoading.show({
				templateUrl: 'js/loading/applicationNotFound.html',
				duration: 1500
			});
		}
	}

})();

