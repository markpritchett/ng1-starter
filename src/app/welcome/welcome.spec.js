describe('View', function () {
    var view, scope, $compile, template, page;

    beforeEach(angular.mock.module('templates'));

    beforeEach(angular.mock.inject(function ($templateCache, _$compile_, $rootScope) {
        template = $templateCache.get('app/welcome/welcome.html');
        $compile = _$compile_;
        scope = $rootScope.$new();
        scope.vm = {};
    }));

    function ViewObject(view) {
        this.message = angular.element(view[0].querySelector('#message')).text().trim();
    }

    function buildView() {
        view = $compile(angular.element(template))(scope);
        scope.$digest();
        page = new ViewObject(view);
    }

    it('should show message when show message is true', function () {
        scope.vm = {
            message: 'My Message',
            showMessage: true
        };

        buildView();

        expect(page.message).toBe('My Message');
    });
    
    it('should NOT show message when show message is false', function () {
        scope.vm = {
            message: 'My Message',
            showMessage: false
        };

        buildView();

        expect(page.message).toBe('');
    });
});        
