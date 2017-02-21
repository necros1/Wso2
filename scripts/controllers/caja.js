(function () {
'use strict';

/**
 * @ngdoc function
 * @name medipassBE.controller:CajaController
 * @description
 * # CajaController
 * Controller of the medipassBE
 */
angular.module('medipassBE')
  .controller('CajaController', CajaController);
CajaController.$inject = ['$state', 'servicioLocal','$localStorage','servicioMilliways','$resource'];
function CajaController($state, servicioLocal,$localStorage,servicioMilliways,$resource) {
    var vm = this;
    vm.$state = $state;
    vm.servicioLocal = servicioLocal;
    vm.datosSesion = servicioLocal.getDatosSesion();
    vm.servicioMilliways = servicioMilliways;
 
 
    var fecha_hora=vm.datosSesion.fechaHoraServidor;
    var resultadoFecha=fecha_hora.substring(0,10);
    var resultadoHora=fecha_hora.substring(11,19);
 
    vm.fechaAperturaCaja = resultadoFecha +" | "+ resultadoHora;
    $("#monto").numeric(); 
    $("#monto").css("color","#fff");
    if($localStorage.monto){
      // location.href = location.pathname+"#/menu";
       // $state.go('menu');

    }


   
    vm.inputVacioClick = function(){ 
 

        if($("#monto").val() == "0.00"){
            
            $("#monto").css("color","#fff");

           $("#monto").val("");     

        }

    }

    vm.inputVacioChange = function(){ 

        if($("#monto").val() != "0.00"){

            if($("#monto").val() != ""){

                $("#monto").css("color","#777");

            }    

        } 
     
  
    }

    vm.abrirCaja = function () {
         vm.servicioMilliways.consultaAtencion();
        //   $localStorage.consultaVentas =  vm.servicioLocal.consultaVentas;
        vm.datosSesion.montoApertura =  vm.montoApertura;
        vm.datosSesion.fechaAperturaCaja = vm.fechaAperturaCaja;
    
        var montoAperturaCaja = $("#monto").val();
        montoAperturaCaja = montoAperturaCaja.replace("$","");
        montoAperturaCaja = montoAperturaCaja.replace(".",""); 
        montoAperturaCaja = montoAperturaCaja.replace(".",""); 
        montoAperturaCaja = montoAperturaCaja.replace(".","");              
        montoAperturaCaja = montoAperturaCaja.replace(".",""); 

        vm.servicioLocal.datosSesion.idUsuario; 
     //   alert(vm.servicioLocal.datosSesion.fechaServidor);

         
        $resource('http://bem.openpartner.cl/financiador/sp?tipo_tx=1&monto_ap_ci='+montoAperturaCaja+'&id_usuario='+vm.servicioLocal.datosSesion.idUsuario+'&fecha_ap_ci='+vm.servicioLocal.datosSesion.fechaServidor+'&detalle=promise&id_session=6&accion=session_caja').query().$promise.then(function(response) {
          
            vm.servicioLocal.idSesionCaja = response[0].idSesionCaja;
                     console.log(vm.servicioLocal.idSesionCaja);
        });

        $localStorage.$default({
            monto : vm.montoApertura,
            fechaAperturaCaja:vm.fechaAperturaCaja
        });
        //aqui se llama el servicio de apertura de caja
        vm.$state.go('menu');

    };

}
})();
