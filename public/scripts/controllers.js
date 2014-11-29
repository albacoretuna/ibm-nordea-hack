app.controller('ApiTesterCtrl', function($scope, $http){
  $scope.clientid = "<INTSERT CLIENT ID HERE>";
  $scope.jsonResponse = {no: "data"};

  $http.get("data/apidata.json").success(function(data){
    $scope.apiData = data;
    $scope.selectedApi = data[0].apis[0];
  });

  $scope.selectApi = function(api){
    $scope.selectedApi = angular.copy(api);
  };

  $scope.hasPayload = function(){
    if ($scope.selectedApi) {
      return $scope.selectedApi.method != "GET";
    }
  };

  $scope.execute = function(){
    $scope.loading = true;

    var start = (new Date()).getTime();

    var payload = {
      path: $scope.selectedApi.path+"&client_id="+$scope.clientid,
      method: $scope.selectedApi.method
    };

    if ($scope.hasPayload()) {
      payload.payload = $scope.selectedApi.payload;
    }

    $http.post("api/test", payload)
    .success(function(response){
      $scope.jsonResponse = response;
    })
    .error(function(response){
      console.log("error: "+response);
    })
    .then(function(){
      $scope.loading = false;
      var finish = (new Date()).getTime();
      $scope.responseTime = finish - start;
    });
  };
});

app.controller('CustomerCtrl', function($scope, $http){

  // start HERE Maps
  var platform = new H.service.Platform({
    'app_id': '3km11WSzxkHOAgiPyMkD',
    'app_code': '6ca5fCTAZdajHHd8sQpHwA'
  });

  var maptypes = platform.createDefaultLayers();

  var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.normal.map,
    {
      zoom: 10,
      center: { lng: 13.4, lat: 52.51 }
    }
  );

  // end HERE maps

  var marker;
  $scope.getCustomer = function(){
    $scope.loading = true;
    $http.get("api/getCustomer/"+$scope.customerId)
    .success(function(response){

      $scope.customer = response;
      var coord = {lat: response.latitude, lng: response.longitude};
      console.log("coord: "+JSON.stringify(coord));
      if (marker) {
        map.removeObject(marker);
      }
      marker = new H.map.Marker(coord);
      map.addObject(marker);
      map.setCenter(coord);
    })
    .error(function(response){
      console.log(response);
    })
    .then(function(){
      $scope.loading = false;
    });
  };
});

app.controller('AccountCtrl', function($scope, $http){
  $scope.getAccount = function(){
    $http.get("api/getAccount/"+$scope.accountId)
    .success(function(response){
      $scope.account = response;
    })
    .error(function(response){
      console.log(response);
    });
  };
});
