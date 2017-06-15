videoService = angular.module('videoService', [])

videoService.factory('getVideo', function($http, $q){
  return function(videoId){
    var defObj = $q.defer()
    $http.get('https://videodataapi.herokuapp.com/v1.0/video/' + videoId)
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
      return defObj.promise
    }
})
