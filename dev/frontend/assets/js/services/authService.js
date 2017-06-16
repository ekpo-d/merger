var authModule = angular.module('authModule', [])

authModule.factory('authService',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in controllers
    return ({
      isLoggedIn: function isLoggedIn() {
            if(user) {
                return true;
            } 
            else {
                return false;
            }
        },
      login: function login(email, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('http://localhost:5000/api/auth/login', {email: email, password: password})
            // handle success
            .success(function (data, status) {
            if(status === 200 && data.result){
                user = true;
                deferred.resolve();
            } 
            else {
                user = false;
                deferred.reject();
                }
            })
            // handle error
            .error(function (data) {
                user = false;
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

        },
      logout: function logout() {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a get request to the server
        $http.get('http://localhost:5000/api/auth/logout')
            // handle success
            .success(function (data) {
                user = false;
                deferred.resolve();
            })
            // handle error
            .error(function (data) {
                user = false;
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

        },
      register: function register(email, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('http://localhost:5000/api/auth/register', {email: email, password: password})
            // handle success
            .success(function (data, status) {
                if(status === 200 && data.result){
                    deferred.resolve();
                } 
                else {
                    deferred.reject();
                }
            })
            // handle error
            .error(function (data) {
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

        },
    getUserStatus: function getUserStatus() {
        return $http.get('http://localhost:5000/api/auth/status')
        // handle success
        .success(function (data) {
            if(data.status){
                user = true;
            } 
            else {
                user = false;
            }
        })
        // handle error
        .error(function (data) {
            user = false;
        });
        }
    });

});
