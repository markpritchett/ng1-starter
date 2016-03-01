(function () {
	'use strict';
	
	describe('Welcome Controller', function () {
		var $controller;
		
		beforeEach(angular.mock.module('app.welcome'));
		
		beforeEach(angular.mock.inject(function (_$controller_) { 
			$controller = _$controller_;
		}));
		
		it('should be defined', function () {
			var controller = $controller('WelcomeController');
			expect(controller).toBeDefined();	
		});
	});
})();