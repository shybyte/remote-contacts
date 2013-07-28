'use strict';

angular.module('remoteContactsApp', ['$strap.directives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/contact/:id', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/add', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/import', {
        templateUrl: 'views/import.html',
        controller: 'ImportCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).directive('file', function () {
    return {
      scope: {
        file: '='
      },
      link: function (scope, el, attrs) {
        el.bind('change', function (event) {
          scope.file = event.target.files[0];
          scope.$apply();
        });
      }
    };
  });

remoteStorage.claimAccess({ contacts: 'rw' });
remoteStorage.displayWidget();
