(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name medipassBE.directive:bono
     * @description
     * # bono
     */
    angular.module('medipassBE')
  .directive('bonoimprimir',bonoimprimir);

    function bonoimprimir() {
        var directive = {
          restrict: 'E',
          replace: true,
          scope:{
          },
          templateUrl: 'views/components/bono-imprimir.html',
          link: linkFunc,
          controller: bonoimprimirController,
          controllerAs: 'vm',

      };
        return directive;

        function linkFunc(scope, attr, Controller) {
            console.log(attr);
        }
    }

    bonoimprimirController.$inject = ['servicioLocal'];

    function bonoimprimirController(servicioLocal) {
        var vm = this;
        vm.atencion = servicioLocal.atencion;
 
    };

})();
