(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name medipassBE.directive:botonUsuario
     * @description
     * # botonUsuario
     */
    angular.module('medipassBE')
  .directive('botonUsuario', botonUsuario);

    function botonUsuario() {
        var directive = {
          restrict: 'E',
          replace: true,
          templateUrl: 'views/components/boton-usuario.html',
          link: linkFunc,
          controller: BotonUsuarioController,
          controllerAs: 'vm',
          scope: {
            eventHandler: '&ngClick'
          },

      };
        return directive;

        function linkFunc(scope,attr, Controller, state) {

        }
    }

    

    BotonUsuarioController.$inject = ['servicioLocal', '$state','$scope','$localStorage'];

    function BotonUsuarioController(servicioLocal, $state,$scope,$localStorage) {
          var vm = this;         
          vm.datosSesion = servicioLocal.getDatosSesion();
       
          $scope.cerraSesion = function ($state) {

              localStorage.clear();//limpio localstorage
              servicioLocal.limpiarDatosSesion();
              vm.datosSesion = {};
      
              location.href =location.pathname;
              //vm.$state.go('tocusuario');
           };

           $scope.desbloquearCaja = function(){

             // $('#Modal2').modal('show');
              $('#Modal-boquear-caja').modal({show:true,backdrop: 'static'});




           };




      }

})();
