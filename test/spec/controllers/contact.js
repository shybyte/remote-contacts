'use strict';

describe('Controller: ContactCtrl', function () {

  // load the controller's module
  beforeEach(module('remoteContactsApp'));

  var ContactCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactCtrl = $controller('ContactCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // TODO: expect(scope.awesomeThings.length).toBe(3);
  });
});
