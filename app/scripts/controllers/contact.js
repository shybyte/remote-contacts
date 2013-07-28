'use strict';

function createNewEmailOrTel() {
  return {type: '', value: ''};
}

function ContactCtrl($rootScope, $scope, $q, $location, $routeParams) {

  $scope.contact = {fn: '', emails: [createNewEmailOrTel()], tels: [createNewEmailOrTel()]};

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

  $scope.addEmail = function () {
    $scope.contact.emails.push(createNewEmailOrTel());
  }

  $scope.deleteEmail = function (index) {
    $scope.contact.emails.splice(index, 1);
  }

  $scope.deleteTel = function (index) {
    $scope.contact.tels.splice(index, 1);
  }


  $scope.addTel = function () {
    $scope.contact.tels.push(createNewEmailOrTel());
  }

  function backToList() {
    $scope.$apply(function () {
      $location.path('/');
    });
  }

}

angular.module('remoteContactsApp')
  .controller('ContactCtrl', ['$rootScope', '$scope', '$q', '$location', '$routeParams', ContactCtrl]);
