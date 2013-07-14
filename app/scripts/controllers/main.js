'use strict';

function MainCtrl($scope, $q) {
  $scope.contacts = $promise($scope, $q, remoteStorage.contacts.getAll());
}

MainCtrl.$inject = ['$scope', '$q'];
angular.module('remoteContactsApp')
  .controller('MainCtrl', MainCtrl);
