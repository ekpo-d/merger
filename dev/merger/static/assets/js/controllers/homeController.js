
angular.module('merger').controller('homeController',
  ['$scope', '$location', '$window', 'AuthService', '$document', '$uibModal', '$timeout', 'Upload', 'FileService', 'fileType',
  function ($scope, $location, $window, AuthService, $document, $uibModal, $timeout, Upload, FileService, fileType) {
    
    $scope.tableFilter = '';
    $scope.pageDesc = fileType

    $scope.conflictsBody = []

    function sanitize(data){
      for (var z = 0; z < data.length; z++){
        if (data[z].length < 2){
          data.splice(z, 1);
        }
      }
      return data
    }

    $scope.setup = function(){

      FileService.getFile(fileType)
      .then(function(response){
        $scope.data = response.data.result
        
        if (fileType == 'conflicts'){
          var body = $scope.data.body
          
          for (var key in body) {
            if (body.hasOwnProperty(key)) {
              $scope.conflictsBody.push(body[key][0]);
            }
          }
        }
        else if (fileType == 'logs'){
          $scope.data = sanitize($scope.data)
        }
        else{
          console.log($scope.data)
          $scope.data.body = sanitize($scope.data.body)
        }
      })
    };

    $scope.downloadFile = function(){
      FileService.download(fileType)
      .then(function(response){
        $scope.downloadLink = response.data.result
      })
    }

    $scope.slideAndPopulateMerged = function(item){

      $window.slideoutMerged = new $window.Slideout({
        'panel': document.getElementById('slide-panel'),
        'menu': document.getElementById('extra-d'),
        'padding': 385,
        'side': 'right',
        'tolerance': 70
      });

      $scope.slideData = []
      for (var i = 0; i < item.length; i++){
        $scope.slideData.push(
          {
            heading: $scope.data.head[i],
            body : item[i]
          }
        );
      }

      console.log('slideAndPopulateMerged')
      $window.$('.side-pane').fadeToggle();
      $window.$('.content-cover').fadeToggle();
      $window.slideoutMerged.toggle();
    };

    $scope.slideAndPopulate2 = function(item){

      $window.slideoutDesktop2 = new $window.Slideout({
        'panel': document.getElementById('slide-panel'),
        'menu': document.getElementById('extra-info-desktop2'),
        'padding': 385,
        'side': 'right',
        'tolerance': 70
      });

      $scope.slideData2 = []
      var body = $scope.data.body
      if (body.hasOwnProperty(item)) {
        for (var v = 0; v < body[item].length; v++){
          $scope.slideData2.push([])
          for (var w = 0; w < body[item][v].length; w++){          
            $scope.slideData2[v].push({
              "heading": $scope.data.head[w],
              "body" : body[item][v][w]
            })
          }
        }
      }

      $window.$('.side-pane').fadeToggle();
      $window.$('.content-cover').fadeToggle();
      $window.slideoutDesktop2.toggle();

      $window.$('#slide2 a').click(function (e) {
        e.preventDefault()
        $window.$('#extra-info-desktop2 .tab-pane').removeClass('active in')
        $window.$(this).tab('show')
      })
    };

    $scope.conflictSelected = {};
    $scope.mergeConflict = function(){
      var row = '',
          conflict = $scope.slideData2[$scope.conflictSelected]
      
      for (var j=0; j < conflict.length; j ++){
        row += conflict[j].body + ';'
      }
      row = row.substr(0, row.length - 1)
      FileService.updateFile(row)
        // handle success
        .then(function () {
          console.log("file updated")
        })
    }

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
