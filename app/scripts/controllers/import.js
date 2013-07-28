'use strict';
(function () {


  function getValueTypePairs(baseName, csvObject) {
    var valueTypePairs = [];
    for (var i = 1; i < 10; i++) {
      var value = csvObject[baseName + ' ' + i + ' - Value'];
      if (value)
        valueTypePairs.push({
          type: csvObject[baseName + ' ' + i + ' - Type'],
          value: value
        });
    }
    return valueTypePairs;
  }

  function ImportCtrl($scope,$location) {
    $scope.file = "";
    $scope.contacts = [];
    $scope.progress = -1;

    function importCsvObjects(csvObjects) {
      log(csvObjects);
      window.c = csvObjects;
      $scope.contacts = csvObjects.map(function (csvObject) {
        log(csvObject);
        return {
          fn: csvObject.Name,
          emails: getValueTypePairs('E-mail', csvObject),
          tels: getValueTypePairs('Phone', csvObject),
          selected: true
        }
      });
      log($scope.contacts);
      digest($scope);
    }

    function swapSelection(contact) {
      contact.selected = !contact.selected;
    }

    $scope.swapSelection = swapSelection;

    $scope.deSelectAll = function (contact) {
      $scope.contacts.forEach(function (contact) {
        contact.selected = false;
      });
    };

    $scope.importSelectedContacts = function () {
      var contactsToImport = $scope.contacts.filter(function (contact) {
        return contact.selected;
      }).map(function (contact) {
          var contact = jQuery.extend({}, contact);
          delete contact.selected;
          return contact;
        });
      log(contactsToImport);
      importContacts2(contactsToImport);
    }


    function importContacts(contacts) {
      if (contacts.length == 0) {
        backToList();
      }
      remoteStorage.contacts.add(contacts[0]).then(function () {
        log("Imported", contacts[0]);
        importContacts(contacts.slice(1));
      });
    }

    function importContacts2(contacts) {
      var counter = 0;
      var startTime = Date.now();
      $scope.progress = 1;
      contacts.forEach(function (contact) {
        log("Import:", contact,(Date.now()-startTime)/1000);
        remoteStorage.contacts.add(contact).then(function () {
          counter++;
          log("Imported", contact,(Date.now()-startTime)/1000);
          $scope.$apply(function () {
            $scope.progress = counter / contacts.length * 100;
          });
          if (contacts.length == counter) {
            backToList();
          }
        },function (e) {
          counter++;
          log("Error", contact,e,(Date.now()-startTime)/1000);
          $scope.$apply(function () {
            $scope.progress = counter / contacts.length * 100;
          });
          if (contacts.length == counter) {
            backToList();
          }
        });
      });
    }


    $scope.$watch('file', function () {
      var reader = new FileReader();
      reader.onload = function (e) {
        importCsvObjects($.csv.toObjects(e.target.result));
      };
      reader.readAsText($scope.file);
    });

    function backToList() {
      $scope.$apply(function () {
        $location.path('/');
      });
    }

  };

  angular.module('remoteContactsApp')
    .controller('ImportCtrl', ImportCtrl);
})();