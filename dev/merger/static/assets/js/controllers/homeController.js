
angular.module('merger').controller('homeController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    
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

    $scope.populateSlide = function(item){
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

}]);
