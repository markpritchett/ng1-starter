describe('Welcome Route', function () {
    var route;

    beforeEach(angular.mock.module('app.welcome'));

    beforeEach(angular.mock.inject(function ($route) {
        route = $route.routes['/welcome'];
    }));

    it('should use correct controller', function () {
        expect(route.controller).toBe('WelcomeController');
    });

    it('should use correct template', function () {
        expect(route.templateUrl).toBe('app/welcome/welcome.html');
    });
});