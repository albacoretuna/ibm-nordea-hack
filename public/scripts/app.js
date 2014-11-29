var app = angular.module('testApp',
['ngRoute', 'jsonFormatter', 'ui.bootstrap']
);

app.config(function ($routeProvider) {
  $routeProvider

  .when('/apitester', {
    templateUrl: 'views/apitester.html',
    controller: 'ApiTesterCtrl'
  })
  .when('/customer', {
    templateUrl: 'views/customer.html',
    controller: 'CustomerCtrl'
  })
  .when('/account', {
    templateUrl: 'views/account.html',
    controller: 'AccountCtrl'
  })
  .otherwise({
    redirectTo: '/apitester'
  });
})
