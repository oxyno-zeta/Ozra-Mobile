/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 13/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.popup')
		.service('popupService', popupService);

	/** @ngInject */
	function popupService($ionicPopup) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Variables
		// Functions
		self.unknownError = unknownError;
		self.notAuthorized = notAuthorized;
		self.serverNotAccessible = serverNotAccessible;
		self.serverError = serverError;

		////////////////

		function unknownError(){
			return $ionicPopup.alert({
				title: 'Unknown Error',
				templateUrl: 'js/popup/unknownError/unknownError.html',
				okText: 'Ok',
				okType: 'button-positive'
			});
		}

		/**
		 * User not authorized popup
		 * @returns {*}
		 */
		function notAuthorized(){
			return $ionicPopup.alert({
				title: 'Not Authorized',
				templateUrl: 'js/popup/notAuthorized/notAuthorized.html',
				okText: 'Ok',
				okType: 'button-positive'
			});
		}

		/**
		 * Server not accessible popup
		 * @returns {*}
		 */
		function serverNotAccessible() {
			return $ionicPopup.alert({
				title: 'Server not accessible',
				templateUrl: 'js/popup/serverNotAccessible/serverNotAccessible.html',
				okText: 'Ok',
				okType: 'button-positive'
			});
		}

		/**
		 * Server error popup
		 * @returns {*}
		 */
		function serverError(){
			return $ionicPopup.alert({
				title: 'Server error',
				templateUrl: 'js/popup/serverError/serverError.html',
				okText: 'Ok',
				okType: 'button-positive'
			});
		}
	}

})();
