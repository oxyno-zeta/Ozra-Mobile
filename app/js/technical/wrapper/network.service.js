/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 28/03/16
 * Licence: See Readme
 */
(function () {
	'use strict';

	angular
		.module('ozra.technical.wrapper')
		.service('networkWrapperService', networkWrapperService);

	/** @ngInject */
	function networkWrapperService($document, $rootScope, platformWrapperService) {
		/* jshint validthis: true */
		var self = this;
		/* jshint validthis: false */
		// Variables
		var status = {
			isOnline:null // Default value
		};
		// Functions
		self.isDeviceOnline = isDeviceOnline;

		////////////////

		/**
		 * Get network status
		 */
		function isDeviceOnline(){
			if (!_.isNull(status.isOnline)){
				return status.isOnline; // Cached value
			}

			if (platformWrapperService.isServeMode()){
				// Serve mode
				status.isOnline = true;
			}
			else {
				// On device => need to check
				var networkState = navigator.connection.type;
				status.isOnline =
					!(_.isEqual(networkState, Connection.UNKNOWN) || _.isEqual(networkState, Connection.NONE));
			}
			return status.isOnline;
		}

		// Updates
		$document.on('offline', function() {
			$rootScope.$apply(function() {
				status.isOnline = false;
				// Broadcast event
				$rootScope.$broadcast('networkWrapperService:offline');
			});
		});
		$document.on('online', function() {
			$rootScope.$apply(function() {
				status.isOnline = true;
				// Broadcast event
				$rootScope.$broadcast('networkWrapperService:online');
			});
		});
	}

})();
