angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
    $scope.codec = undefined;

    //Check if the input and code or name of the building matches
    $scope.valid = function (json) {
           if ($scope.codec == undefined) return true;
           return (json.code.toLowerCase().startsWith($scope.codec.toLowerCase()) ||
                   json.name.toLowerCase().startsWith($scope.codec.toLowerCase()));
    };

    $scope.addListing = function() {
      if ($scope.buildingCode == null || $scope.buildingName == null)
        return;
      var newListing =
        {
        "code" : $scope.buildingCode,
        "name" : $scope.buildingName,
        "coordinates" :
          {
          "latitude" : $scope.buildingLatitudeCoordinates,
          "longitude" : $scope.buildingLongitudeCoordinates
          },
          "address" : $scope.buildingAddress
        };
        $scope.listings.push(newListing);
    };

    $scope.deleteListing = function(index) {
      return $scope.listings.splice(index, 1);
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo =  $scope.listings[index];
    };
  }
]);
