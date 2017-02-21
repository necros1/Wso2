(function () {
'use strict';

/**
 * @ngdoc function
 * @name medipassBE.controller:CierreController
 * @description
 * # CierreController
 * Controller of the medipassBE
 */
/*angular.module('medipassBE')
  .controller('CierreController', function () {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma',
      ];
  });*/


 angular.module('medipassBE').controller('CierreCajaController', CierreCajaController);
    CierreCajaController.$inject = ['$http','$scope', '$state', '$stateParams', 'verificadorConexion', 'servicioLocal', '$window', '$timeout','servicioMilliways','$localStorage','$sessionStorage','_'];

    function CierreCajaController(servicioLocal, $window, $timeout,servicioMilliways,$localStorage,$sessionStorage,ngMessages,_) {

    	var vm = this;
    	alert();
 
    	vm.servicioLocal. = servicioLocal.datosCaja;

    	console.log(vm.servicioLocal);

    }
 
})();
