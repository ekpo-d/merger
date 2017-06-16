var loginModule = angular.module('loginModule', ['ui.bootstrap', 'authModule'])

loginModule.controller('LoginCtrlr', function($scope, $location, authService) {

    $scope.loginForm = {};
    $scope.registerForm = {};

    $scope.login = function () {
        
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      authService.login($scope.loginForm.email, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      authService.register($scope.registerForm.email,
        $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

})
