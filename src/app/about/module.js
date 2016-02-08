(function () {
	'use strict';
	
	angular.module('app.about', [
		'ngRoute'
	])
	.config(
				['$routeProvider',
		function ($routeProvider) { 
			$routeProvider
				.when('/about', {
					data: {
						pageTitle: 'About'
					},
					templateUrl: 'app/about/about.html'
				});
		}]	
	);
})();