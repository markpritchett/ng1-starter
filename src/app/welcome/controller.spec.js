(function () {
	'use strict';
	
	describe('Welcome Controller', function () {
		var $controller;
		
		beforeEach(module('app.welcome'));
		
		beforeEach(inject(function (_$controller_) { 
			$controller = _$controller_;
		}));
		
		it('should be defined', function () {
			var controller = $controller('WelcomeController');
			expect(controller).toBeDefined();	
		});
	});
})();