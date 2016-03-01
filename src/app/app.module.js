(function () {
    'use strict';

    angular.module('app', [
        'templates',

        'app.welcome',
        'app.about',

        'ngRoute'
    ])
        .run([
            '$rootScope', '$location',
            function ($rootScope, $location) {
                $rootScope.currentRoute = {
                    is: function (routeName) {
                        return $location.path().substring(1) === routeName;
                    }
                };
                $rootScope.$on('$routeChangeSuccess', function (event, current) {
                    $rootScope.title = current.$$route.title;
                });
            }
        ]);
})();