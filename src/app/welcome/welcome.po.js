var WelcomePage = function () {
    this.get = function () {
        browser.get('http://localhost:9000/#/welcome');
    };
    this.getHeading = function () {
        return element(by.tagName('h2')).getText();
    };
};

module.exports = new WelcomePage();