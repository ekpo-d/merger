var event = angular.module('event', ['ui.bootstrap', 'videoService'])


event.controller('EventCtrl', function($scope, $document, $uibModal, $routeParams, $location, getVideo) {
  $scope.likeOptions = {
    like : function(likeCount){
      likes = parseInt(likeCount) + 1
      $scope.videoData.likes = likes
    }
  }

  $scope.commentOptions = {
    showCommentBox : false,
    newComment : "",

    addComment : function(){
      $scope.videoData.commentsArr.push({
        user : 'user' + Math.ceil(Math.random(3, 100)),
        comment : this.newComment
      })
      this.newComment = ""
      this.showCommentBox = !this.showCommentBox
    }
  }
  
  $scope.followOptions = {
    text : 'Follow channel',
    follow : function(){
      this.text = this.text == 'Follow channel' ? 'Following' : 'Follow channel'
    }
  }

  $scope.getEventData = function(){
    getVideo($routeParams.id).then(function(result){
      $scope.videoData  = result.data

      $scope.currentUrl = $location.absUrl()
      console.log($scope.videoData)
    })
  }
})
