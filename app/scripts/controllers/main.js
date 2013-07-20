'use strict';

function MainCtrl($scope, $q,$location) {
  getAll();

  remoteStorage.contacts.on('change', function (event) {
    getAll();
    digest($scope);
  });

  $scope.editContact = function (contact) {
    $location.path('contact/' + contact.id);
  }

  function getAll() {
    $scope.contacts = $promise($scope, $q, remoteStorage.contacts.getAll());
  }
}

angular.module('remoteContactsApp')
  .controller('MainCtrl', ['$scope', '$q','$location', MainCtrl]);
