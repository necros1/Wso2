(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name medipassBE.controller:TocController
     * @description
     * # TocController
     * Controller of the medipassBE
     */
    angular.module('medipassBE')
        .controller('TocController_sin_toc', TocController_sin_toc);
    TocController_sin_toc.$inject = ['$http','$scope', '$timeout', '$sce', '$window', '$state', '$stateParams', 'verificadorConexion', 'servicioLocal','servicioMilliways','$localStorage'];

    function TocController_sin_toc($http,$scope, $timeout, $sce, $window, $state, $stateParams, verificadorConexion, servicioLocal,servicioMilliways,$localStorage) {

        var vm = this;
        vm.$state = $state;
        vm.$stateParams = $stateParams;
        vm.verificadorConexion = verificadorConexion;
        vm.datosSesion = servicioLocal.getDatosSesion();
        vm.datosPaciente = servicioLocal.getDatosPaciente();
        vm.datosMensaje = servicioLocal.datosMensaje; 
        vm.servicioMilliways = servicioMilliways;
        vm.servicioLocal  = servicioLocal;
  
        $scope.$watch('vm.verificadorConexion.isOnline()', function (online) {
            
            vm.onlineStatusString = online ? 'ONLINE' : 'OFFLINE';
     
        });

        //servicioLocal.limpiarDatoPaciente();
        vm.confirmarToc = function (stateName) {
 
 
            switch (stateName) {
                case 'tocusuario':
  
                    var rut = $("#id_rut_apertura_caja").html();
                    vm.servicioMilliways.validarUsuario(rut);
                                   
                    break;

                case 'tocpaciente':

                    var rut = $("#campo_texto_rut-paciente").val();
                    vm.servicioMilliways.buscarEntidadesRutBeneficiario(rut);                               
     
                    break;

                case 'simulacion':

                    vm.$stateParams.nombreOpcion = "ramsimulacion";

                    var rut = $("#campo_texto_rut-paciente").val();
                    vm.servicioMilliways.buscarEntidadesRutBeneficiario(rut);                               
     
                    break;


            }

        };

        // vm.confirmarDiscapacitado = function() {
        //
        //     //pantalla de login y pass del paciente con atencion especial
        //     alert('EN DESARROLLO');
        // };
        //

        //funcion que hace el equivalente del document ready de jquery

        $timeout(function () {
        console.log('vm.servicioLocal');
         console.log(vm.servicioLocal);
 
            if(!vm.datosSesion){

               $state.go('menu');

            }

            console.log('DOM ready');

            console.log($window.rutBene);

            $scope.$watch(function () {
                return location.hash
            }, function (value) {


 

  


 

                if(value == "#/identificacion-usuario-sin-toc"){

                  //  vm.servicioMilliways.validarUsuario("25034824-K"); 
                   
            vm.servicioMilliways.validarUsuario("13942219-8"); 
            
  //        records2 = vm.servicioLocal.consultaVentas;
                //console.log('vm.records2');
                //console.log(vm.servicioLocal.consultaVentas);
                 //  vm.servicioMilliways.validarUsuario("16316645-3");
       //          vm.servicioMilliways.validarUsuario("13942219-8"); 


                }


 
          
            });

                     //scope.reloadAndChooseView();
            $scope.$watch(
            function () {
                return $window.rutBene;
            }, function (n, o) {
                //ngErrorIniciarTOC();
                console.log("changed rutBene ", n);
            }
            );

            }

        );
    }

})();
