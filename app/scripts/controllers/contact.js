'use strict';

function ContactCtrl($rootScope, $scope, $q, $location, $routeParams) {

  $scope.contact = {fn: '', email: {type: '',value: ''},tel: {type: '',value: ''}};

  if ($routeParams.id) {
    remoteStorage.contacts.get($routeParams.id).then(function (contact) {
      $scope.showDelete = true;
      $scope.contact = contact;
      digest($scope);
    });
  }

  $scope.save = function () {
    remoteStorage.contacts.save($scope.contact).then(backToList);
  }

  $scope.delete = function () {
    remoteStorage.contacts.remove($scope.contact).then(backToList);
  }
  
  function backToList() {
    $location.path('/');
    digest($scope);
  }
  
}

angular.module('remoteContactsApp')
  .controller('ContactCtrl', ['$rootScope', '$scope', '$q', '$location', '$routeParams', ContactCtrl]);
