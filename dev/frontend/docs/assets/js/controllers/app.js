var app = angular.module('app', ['ngRoute', 'chieffancypants.loadingBar','truncate', 'loginModule', 'homeModule'])

app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/merged', {
      title: 'Merged',
      templateUrl: 'dashboard.html',
      controller: 'HomeCtrlr'
    })
    .when('/login', {
      title: 'Welcome',
      templateUrl: 'login.html',
      controller: 'LoginCtrlr'
    })
    .when('/conflicts', {
      title: 'Conflicts',
      templateUrl: 'dashboard.html',
      controller: 'HomeCtrlr'
    })
    .when('/logs', {
      title: 'Logs',
      templateUrl: 'dashboard.html',
      controller: 'HomeCtrlr'
    })
    .otherwise({redirectTo: '/merged'})

  $locationProvider.html5Mode(true);
})

app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

// var app = angular.module('app', ['ngRoute', 'chieffancypants.loadingBar','truncate','ngAnimate', 'ui.bootstrap',  'loginModule', 'homeModule'])

// app.config(function($routeProvider, $locationProvider){
//   $routeProvider
//     .when('/merged', {
//       title: 'Merged',
//       templateUrl: 'dashboard.html',
//       controller: 'HomeCtrlr'
//     })
//     .when('/login', {
//       title: 'Welcome',
//       templateUrl: 'login.html',
//       controller: 'LoginCtrlr'
//     })
//     .when('/conflicts', {
//       title: 'Conflicts',
//       templateUrl: 'dashboard.html',
//       controller: 'HomeCtrlr'
//     })
//     .when('/logs', {
//       title: 'Logs',
//       templateUrl: 'dashboard.html',
//       controller: 'HomeCtrlr'
//     })
//     .otherwise({redirectTo: '/merged'})

//   $locationProvider.html5Mode(true);
// })

// app.run(['$rootScope', function($rootScope) {
//     $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
//         $rootScope.title = current.$$route.title;
//     });
// }]);