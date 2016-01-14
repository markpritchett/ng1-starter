(function () {
	'use strict';
	
	angular.module('app.welcome', [
		'ui.router'
	])
	.config(
				['$stateProvider',
		function ($stateProvider) { 
			$stateProvider
				.state('welcome', {
					url: '/welcome',
					data: {
						pageTitle: 'Welcome'
					},
					templateUrl: 'app/welcome/welcome.html',
					controller: 'WelcomeController',
					controllerAs: 'vm'
				});
		}]	
	);
})();