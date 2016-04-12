(function() {
'use strict';

    angular
        .module('app.welcome')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q'];
    function dataService($http, $q) {
        var service = {
            getStarWarsCharacter: getStarWarsCharacter
        };

        return service;

        function getStarWarsCharacter() {
            return $http
                .get('http://swapi.co/api/people/1/')
                .then(function(result) {
                    return $q.when(result.data);
                });
        }
    }
})();