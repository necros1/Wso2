(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name medipassBE.controller:RegistroController
     * @description
     * # RegistroController
     * Controller of the medipassBE
     */
    angular.module('medipassBE')
  .controller('RegistroController', function($scope, testService, testServiceGetWeather) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    testService.Conbencertif("71","0000000001-9").then(function(response) {
        $scope.response = response;
        console.log($scope.response);

    });

    testServiceGetWeather.GetWeather("santiago", "chile").then(function(response) {
        $scope.response = response;
        console.log("hola");
    });

});
})();
