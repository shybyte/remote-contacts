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

function benchmarkImport(n) {
  var contacts = [];

  // create some dummy contacts
  for (var i = 0; i < n; i++) {
    contacts.push({fn: 'Contact ' + i});
  }

  // measure time needed for adding all
  var startTime = new Date().getTime();
  importContacts(contacts, function () {
    var neededTime = new Date().getTime() - startTime;
    var resultMessage = "Needed Time: " + neededTime;
    document.getElementsByTagName('body')[0].appendChild(document.createTextNode(resultMessage));
    console.log(resultMessage);
  });
}


function importContacts(contacts, doneCallback) {
  var counter = 0;

  function contactDone(contact, e) {
    counter++;
    console.log(contact, e);
    if (contacts.length == counter) {
      doneCallback();
    }
  }

  contacts.forEach(function (contact) {
    console.log("Import:", contact);
    remoteStorage.contacts.add(contact).then(function () {
      contactDone(contact);
    }, function (e) {
      contactDone(contact, e);
    });
  });
}