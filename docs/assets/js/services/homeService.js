var homeService = angular.module('homeService', [])

homeService.factory('getContent', function($http, $q){
  return function(contentName){
    var defObj = $q.defer()
    // $http.get('https://videodataapi.herokuapp.com/v1.0/' + contentName)
    $http.get('http://127.0.0.1:5000/v1.0/' + contentName)
      .success(function(data){
        defObj.resolve({
          data : data
        })
      })
      .error(function(e){
        defObj.resolve({
          data : false
        })
      })
      
      console.log(defObj.promise)
      return defObj.promise
    }
})
