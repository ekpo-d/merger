angular.module('merger').factory('FileService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in controllers
    return ({
      download: download,
      getFile: getFile,
      handleConflict: handleConflict
    });

    function download(fileType) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.get('/api/v1.0/download/' + fileType)
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.data){
            deferred.resolve({
              data : data
            });
          } 
          else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (e) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }

    function getFile(fileType) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.get('/api/v1.0/get/' + fileType)
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.result){
            deferred.resolve({
              data
            });
          } 
          else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (e) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }

    function handleConflict(fileType) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.get('/api/v1.0/get/merged')
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.data){
            deferred.resolve({
              data : data
            });
          } 
          else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (e) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }




}]);