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
      .otherwise({
        redirectTo: '/'
      });
  });

remoteStorage.claimAccess({ contacts: 'rw' });
remoteStorage.displayWidget();




// just for debugging
function addAndGetContact(name) {
  remoteStorage.contacts.add({fn: name}).then(function (savedContact) {
    console.log("Saved Contact: ", savedContact);
    remoteStorage.contacts.get(savedContact.id).then(function (loadedContact) {
      console.log("Loaded Contact: ", savedContact);
    });
  });
}


// just for debugging
// remoteStorage.contacts.add({fn: 'marco'});
function getLastContact() {
  remoteStorage.contacts.getAll().then(function (contacts) {
    console.log("Last Contact by getAll(): ", contacts);
    remoteStorage.contacts.get(contacts[contacts.length - 1].id).then(function (loadedContact) {
      console.log("Last Contact by get(id): ", loadedContact);
    });
  });
}