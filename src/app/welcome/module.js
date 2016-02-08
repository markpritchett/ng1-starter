(function () {
	'use strict';
	
	angular.module('app.welcome', [
		'ngRoute'
	])
	.config(
				['$routeProvider',
		function ($routeProvider) { 
			$routeProvider
				.when('/welcome', {
					title: 'My Welcome Page',
					templateUrl: 'app/welcome/welcome.html',
					controller: 'WelcomeController',
					controllerAs: 'vm'
				});
		}]	
	);
})();