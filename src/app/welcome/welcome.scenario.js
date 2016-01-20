var WelcomePage = require('./welcome.po.js');

describe('Welcome Page', function () {
    beforeEach(function () {
        WelcomePage.get();
    });

    it('Heading is "Welcome Page"', function () {
        expect(WelcomePage.getHeading()).toBe('Welcome Page');
    });
});