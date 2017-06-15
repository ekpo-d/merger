var eventManagerModule = angular.module('eventManagerModule', ['ui.bootstrap'])

eventManagerModule.controller('EventManagerCtrl', function($scope, $document, $uibModal) {
  $scope.events = [
    {
      id: 0,
      name: 'felabration',
      type: 'free',
      link: 'https://google.com',
      tickets: 0,
      price: 0,
      desc: 'description',
      starts: '1/12/2016',
      ends: '1/1/2017',
      contentType: 'event',
      isSuspended: ''
    },
    {
      id: 1,
      name: 'event2',
      type: 'standard',
      link: 'https://google.com',
      tickets: 20,
      price: 2000,
      desc: 'description2',
      starts: '1/12/2016',
      ends: '1/1/2017',
      contentType: 'event',
      isSuspended: ''
    },
    {
      id: 2,
      name: 'event3',
      type: 'premium',
      link: 'https://google.com',
      tickets: 20,
      price: 5000,
      desc: 'description3',
      starts: '1/12/2016',
      ends: '1/1/2017',
      contentType: 'event',
      isSuspended: ''
    },
    {
      id: 3,
      name: 'event3',
      type: 'premium',
      link: 'https://google.com',
      tickets: 20,
      price: 5000,
      desc: 'description4',
      starts: '1/12/2016',
      ends: '1/1/2017',
      contentType: 'blog',
      isSuspended: 'true'
    }
  ]

  $scope.open = {

    openModal : function(template){
      var parentElem = $document.find('body')
      $uibModal.open({
        templateUrl: 'partials/' + template + '.html',
        appendTo: parentElem,
        scope: $scope
      })
    },

    init : function(template, id) {
      $scope.eventId = id
      $scope.eventData = $scope.events.filter(function(elt){
        return elt.id == id
      })[0]
      $scope.newdata = {}
      $scope.newdata = Object.create($scope.eventData)
      this.openModal(template)
    },

    save : function(id){
      for (i = 0; i < $scope.events.length; i++){
        if ($scope.events[i].id == id){
          $scope.events[i] = $scope.newdata
        }
      }
      return true
    },

    delete : function () {
      for (var i = 0; i < $scope.events.length; i++){
        if ($scope.events[i].id == $scope.eventId ){
          $scope.events.splice(i, 1)
        }
      }
      return true
    }
  }

})
