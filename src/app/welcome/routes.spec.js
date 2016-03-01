describe('Welcome Route', function () {
    var route;

    beforeEach(module('app.welcome'));

    beforeEach(inject(function ($route) {
        route = $route.routes['/welcome'];
    }));

    it('should use correct controller', function () {
        expect(route.controller).toBe('WelcomeController');
    });

    it('should use correct template', function () {
        expect(route.templateUrl).toBe('app/welcome/welcome.html');
    });
});