'use strict';

function MainCtrl($scope, $q, $location) {
  $scope.contacts = [];
  getAll();

  remoteStorage.contacts.on('change', function (event) {
    var newValue = event.newValue;
    var oldValue = event.oldValue;
    if (!(newValue && newValue.id || oldValue && oldValue.id)) {
      return;
    }
    if (!newValue) {
      $scope.contacts.remove({id: oldValue.id});
      digest($scope);
      return;
    }
    var existingContact = $scope.contacts.find({id: newValue.id});
    if (existingContact) {
      Object.merge(existingContact, newValue);
    } else {
      $scope.contacts.insert(newValue, 0);
    }
    digest($scope);
  });

  $scope.editContact = function (contact) {
    $location.path('contact/' + contact.id);
  }

  function getAll() {
    remoteStorage.contacts.getAll().then(function (allContacts) {
      $scope.contacts = allContacts;
      digest($scope);
    });
  }
}

angular.module('remoteContactsApp')
  .controller('MainCtrl', ['$scope', '$q', '$location', MainCtrl]);
