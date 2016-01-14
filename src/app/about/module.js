(function () {
	'use strict';
	
	angular.module('app.about', [
		'ui.router'
	])
	.config(
				['$stateProvider',
		function ($stateProvider) { 
			$stateProvider
				.state('about', {
					url: '/about',
					data: {
						pageTitle: 'About'
					},
					templateUrl: 'app/about/about.html'
				});
		}]	
	);
})();