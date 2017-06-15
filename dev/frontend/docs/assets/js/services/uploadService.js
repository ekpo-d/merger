var uploadService = angular.module('uploadService', [])

uploadService.factory('upload', function($http, $q){
  return function(content){
    var defObj = $q.defer()
    $http.post('http://videodataapi.heroku.com/v1.0/upload/content', content, {headers: {'Content-Type': 'application/json'}} )
      .success(function(data){
        defObj.resolve({
          data : data
        })
      })
      .error(function(e){
        defObj.resolve({
          data : e
        })
      })
      return defObj.promise
    }
})
