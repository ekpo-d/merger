var merger = angular.module('merger', ['ngRoute', 'ui.bootstrap', 'chieffancypants.loadingBar','truncate', 'ngFileUpload']);

merger.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      title: ' | Welcome',
      templateUrl: 'static/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/merged', {
      title: ' | Merged',
      templateUrl: 'static/dashboard.html',
      controller: 'homeController',
      access: {restricted: true},
      resolve: {
            fileType: function(){
                return 'merged';
        }
      }
    })
    .when('/conflicts', {
      title: ' | Conflicts',
      templateUrl: 'static/dashboard.html',
      controller: 'homeController',
      access: {restricted: true},
      resolve: {
            fileType: function(){
                return 'conflicts';
        }
      }
    })
    .when('/logs', {
      title: ' | Logs',
      templateUrl: 'static/dashboard.html',
      controller: 'homeController',
      access: {restricted: true},
      resolve: {
            fileType: function(){
                return 'logs';
        }
      }
    })
    .otherwise({
      redirectTo: '/merged'
    })
});

merger.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
        $rootScope.param = current.$$route.param;
    });
});