(function () {
    'use strict';

    angular
        .module('app.welcome')
        .component('nameComponent', {
            template: 'Welcome, <strong>{{$ctrl.firstName}}</strong>',
            bindings: { firstName: '<'}
        });
})();