'use strict';

angular.module('remoteContactsApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

remoteStorage.claimAccess({ contacts: 'rw' });
remoteStorage.displayWidget();
