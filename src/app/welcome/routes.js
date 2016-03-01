(function () {
    'use strict';

    angular
        .module('app.welcome')
        .config(
            ['$routeProvider',
                function ($routeProvider) {
                    $routeProvider
                        .when('/welcome', {
                            title: 'My Welcome Page',
                            templateUrl: 'app/welcome/welcome.html',
                            controller: 'WelcomeController',
                            controllerAs: 'vm'
                        });
                }]
            );
})();