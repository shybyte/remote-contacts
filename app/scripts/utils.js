function digest($scope) {
  if (!$scope.$$phase) {
    $scope.$digest();
  }
}

function $promise($scope, $q, dfd) {
  var $dfd = $q.defer();
  dfd.then(function (result) {
    $scope.$apply(function () {
        $dfd.resolve(result);
      }, function (errorReason) {
        $dfd.reject(errorReason);
      }
    );
  });
  return $dfd.promise;
}

function log() {
  if (console) {
    console.log.apply(console, arguments)
  }
}