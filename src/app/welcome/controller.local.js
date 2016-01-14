(function () {
	'use strict';
	// Some Local specific controller
	angular
		.module('app.welcome')
		.controller('WelcomeController', WelcomeController);
		
	function WelcomeController() { 
		var vm = this;
	}
})();