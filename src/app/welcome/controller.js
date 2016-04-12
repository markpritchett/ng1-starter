(function () {
    'use strict';

    angular
        .module('app.welcome')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['dataService'];
    function WelcomeController(dataService) {
        var vm = this;
        vm.message = 'Hallo';
        
        function activate() {
            dataService
                .getStarWarsCharacter()
                .then(function(character) {
                   vm.character = character; 
                });
        }
        
        activate();
    }
})();