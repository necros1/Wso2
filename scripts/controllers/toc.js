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
        .controller('TocController', TocController);
    TocController.$inject = ['$http','$scope', '$timeout', '$sce', '$window', '$state', '$stateParams', 'verificadorConexion', 'servicioLocal','servicioMilliways','$localStorage'];

    function TocController($http,$scope, $timeout, $sce, $window, $state, $stateParams, verificadorConexion, servicioLocal,servicioMilliways,$localStorage) {

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

 
 
            if(!vm.datosSesion){

               //$state.go('menu');

            }

            console.log('DOM ready');

            console.log($window.rutBene);

            $scope.$watch(function () {
                    return location.hash 
            }, function (value) {


                var operadorOpaciente;
 
 

                 switch (value) { // switch para validar el tipo de pago con respectivos campos
                    case '#/identificacion-usuario':
                        {

                            operadorOpaciente = "OPERADOR ";
                            $("#campo_texto_rut-paciente").hide();
      
                      
                        break
                        }// fin pago CHEQUE

                    case '#/menu':
                        {

                            operadorOpaciente = "SUPERVISOR ";
                            $("#id_boton_login").text("IDENTIFICAR SUPERVISOR");
                            $("#id_boton_login").show();
      
                      
                        break
                        }


                    case '#/identificacion-paciente/ram':
                        {


                            operadorOpaciente = "PACIENTE ";
                            $("#id_boton_login").show();
                            $("#campo_texto_rut-paciente").show();      
                      
                        break
                        }// fin pago CHEQUE


                    case '#/identificacion-paciente/simulacion':
                        {

                            operadorOpaciente = "PACIENTE ";
                            $("#id_boton_login").show();
                            $("#campo_texto_rut-paciente").show();
      
                      
                        break
                        }// fin pago CHEQUE                        

            
              

                }        

                $("#accionEnToc").text("COLOQUE EL RUT DEL " + operadorOpaciente + " SOBRE EL TOC");


 


 
          
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
