var homeModule = angular.module('homeModule', [])

homeModule.controller('HomeCtrlr', function($scope, $location, $window, $document){

  $scope.data = {
    head: ['Business Name', 'Country', 'Location', 'Sector', 'Revenue', 'Source', 'Founder', 'Employee Size', 'Phone Number', 'Email'],

    body: 
    [
      [
      'Afro Concept', 'jbsidufvbiusbvuisbdibisbvibsidbvi suv ubidudbsuibisbnduisiudbiusbd', 'Abuja', 'Energy', 'USD 120, 000', 'Survey 1', 'Frank Azuoma', '6 - 10', '234-803-2345-432', 'frank@afroconcept.com'
      ],
      [
      'Afro Concept', 'Nigeria', 'Abuja', 'Energy', 'USD 120, 000', 'Survey 1', 'Frank Azuoma', '6 - 10', '234-803-2345-432', 'frank@afroconcept.com'
      ],
      [
      'Afro Concept', 'Nigeria', 'Abuja', 'Energy', 'USD 120, 000', 'Survey 1', 'Frank Azuoma', '6 - 10', '234-803-2345-432', 'frank@afroconcept.com'
      ],
      [
      'Afro Concept', 'Nigeria', 'Abuja', 'Energy', 'USD 120, 000', 'Survey 1', 'Frank Azuoma', '6 - 10', '234-803-2345-432', 'frank@afroconcept.com'
      ]
    ]
  };
  $scope.slideData = [];

  $scope.populateSlide = function(item){
    for (var i = 0; i < item.length; i++){
      $scope.slideData.push(
        {
          heading: $scope.data.head[i],
          body : item[i]
        }
      );
    }
    console.log($scope.slideData)
  };

  $scope.activeClass = function (path) {
    return ($location.path().substr(0, path.length) === path) ? 'active' : '';
  };
  
})
