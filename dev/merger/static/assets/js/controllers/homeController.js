
angular.module('merger').controller('homeController',
  ['$scope', '$location', '$window', 'AuthService', '$document', '$uibModal', '$timeout', 'Upload', 'FileService', 'fileType',
  function ($scope, $location, $window, AuthService, $document, $uibModal, $timeout, Upload, FileService, fileType) {
    

    $scope.getData = function(){
      console.log(fileType)
      FileService.getFile(fileType)
      .then(function(response){
        $scope.data = response.data.result
      })
    }

    $scope.slideAndPopulate = function(item){
      
      $window.$('.side-pane').fadeToggle();
      $window.$('.content-cover').fadeToggle();
      $window.slideoutDesktop.toggle();

      $scope.slideData = []
      for (var i = 0; i < item.length; i++){
        $scope.slideData.push(
          {
            heading: $scope.data.head[i],
            body : item[i]
          }
        );
      }
    };

    $scope.activeClass = function (path) {
      return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    };

    $scope.logout = function () {

      // call logout from auth service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };
    $scope.openModal = function (template) {
      var parentElem = $document.find('body')
      $uibModal.open({
        templateUrl: 'static/partials/' + template + '.html',
        appendTo: parentElem,
        controller: 'homeController',
        scope: $scope
      })
    }
    
    $scope.dismissModal = function () {
      $uibModal.dismiss('cancel');
    }

    $scope.uploadedComment = '';

    $scope.uploadFiles = function (files) {
        $scope.files = files;
        if (files && files.length) {
            Upload.upload({
                url: '/api/v1.0/upload',
                data: {
                    files: files
                }
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                });
            }, 
            function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, 
            function (evt) {
                $scope.uploadedComment = 'Upload Complete! Below are the files uploaded';
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };

}]);
