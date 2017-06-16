var app = angular.module('app', ['ngRoute', 'chieffancypants.loadingBar','truncate', 'homeModule', 'loginModule'])

app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/login', {
      title: ' | Welcome',
      templateUrl: 'login.html',
      controller: 'LoginCtrlr'
      // access: {restricted: false}
    })
    .when('/merged', {
      title: ' | Merged',
      templateUrl: 'dashboard.html',
      controller: 'HomeCtrlr'
      // access: {restricted: true}
    })
    .when('/conflicts', {
      title: ' | Conflicts',
      templateUrl: 'dashboard.html',
      controller: 'HomeCtrlr'
      // access: {restricted: true}
    })
    .when('/logs', {
      title: ' | Logs',
      templateUrl: 'dashboard.html',
      controller: 'HomeCtrlr'
      // access: {restricted: true}
    })
    .otherwise({redirectTo: '/merged'})

  // $locationProvider.html5Mode(true);
})

app.run(['$rootScope', 'authService', '$location', '$route', function($rootScope, $location, $route, authService, $get) {
  
    // $rootScope.$on('$routeChangeStart',
    // function (event, current, next) {
    //     authService.getUserStatus()
    //     .then(function(){
    //       if (next.access.restricted && !authService.isLoggedIn()){
    //         $location.path('/login');
    //         $route.reload();
    //       }
    //     });
    // });

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
