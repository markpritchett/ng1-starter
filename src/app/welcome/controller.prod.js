(function () {
	'use strict';
	// Some Prod specific controller
	angular
		.module('app.welcome')
		.controller('WelcomeController', WelcomeController);
		
	function WelcomeController() { 
		var vm = this;
	}
})();