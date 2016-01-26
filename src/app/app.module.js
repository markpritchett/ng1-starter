(function () {
    'use strict';

    angular.module('app', [
        'templates',

        'app.welcome',
        'app.about',

        'ui.router',
        'ui.bootstrap'
    ])
        .run(
            ['$rootScope', '$state', '$stateParams',
                function ($rootScope, $state, $stateParams) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ]
        )
        .config(
            ['$urlRouterProvider',
                function ($urlRouterProvider) {
                    $urlRouterProvider.otherwise('/welcome');
                }]);
})();