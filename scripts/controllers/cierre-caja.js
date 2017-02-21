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
  //  CierreCajaController.$inject = ['$http','$scope', '$state', '$stateParams', 'verificadorConexion', 'servicioLocal', '$window', '$timeout','servicioMilliways','$localStorage','$sessionStorage','$resource'];

 //   function CierreCajaController($http,$scope, $state, $stateParams, verificadorConexion, servicioLocal, $window, $timeout,servicioMilliways,$localStorage,$sessionStorage,ngMessages,$resource) {
    CierreCajaController.$inject = ['$state', 'servicioLocal','$localStorage','servicioMilliways','$resource','$timeout'];

    function CierreCajaController($state, servicioLocal,$localStorage,servicioMilliways,$resource,$timeout) {

    	var vm = this;
 
 
    	vm.servicioLocal = servicioLocal;
      	vm.servicioMilliways = servicioMilliways;
 

      	//if(typeof vm.servicioLocal.datosDetalleCaja === "undefined"){

      	    	vm.servicioMilliways.consultaDatosCierreCaja();
      	//}

 
      //$scope.$watch( vm.servicioMilliways.consultaDatosCierreCaja());


      //$scope.$watch(vm.servicioLocal.datosDetalleCaja);

 
    	vm.cuadrarCaja = function(){

	
		    $resource('http://bem.openpartner.cl/financiador/sp?tipo_tx=1&monto_ap_ci='+$("#total_monto_recaudado").text()+'&id_usuario='+vm.servicioLocal.datosSesion.idUsuario+'&fecha_ap_ci='+vm.servicioLocal.datosSesion.fechaServidor+'&detalle=promise&id_session='+vm.servicioLocal.idSesionCaja+'&accion=session_caja_cuadrar').query().$promise.then(function(response) {
	          
	            $state.go('cajaCuadrada');

	        });

    	}


    	vm.calculaMontoPorMedioPago = function(nom_tipo_pago){

    		var str = $("#id_"+nom_tipo_pago+"_monto_sv").text();
			var str= str.replace("$", ""); 
			var monto_sv = str.replace(".", "");  
        	var monto_recaudado = $("#id_"+nom_tipo_pago+"_monto_recaudado").val();

 

    		var diferencia = parseInt(monto_sv) -  parseFloat(monto_recaudado) ;

  			$("#id_"+nom_tipo_pago+"_diferencia").text(parseFloat(diferencia));

         
	        if(parseFloat(diferencia) > 0){
	     
	          $("#id_btn_validacion_"+nom_tipo_pago).removeClass().addClass("roj-roj input-group-addon");  
	          $("#id_btn_validacion_"+nom_tipo_pago).children().removeClass().addClass("glyphicon glyphicon-remove");           

	        }else if(parseFloat(diferencia) < 0){
	          
	          $("#id_btn_validacion_"+nom_tipo_pago).removeClass().addClass("roj-roj input-group-addon"); 
	          $("#id_btn_validacion_"+nom_tipo_pago).children().removeClass().addClass("glyphicon glyphicon-remove"); 

	        }else{

	           $("#id_btn_validacion_"+nom_tipo_pago).removeClass().addClass("ver-ver input-group-addon")
	           $("#id_btn_validacion_"+nom_tipo_pago).children().removeClass().addClass("glyphicon glyphicon-ok");          

	          
	        };


        	var sumaMontoRecaudado=0;

	        $("#tabla_cierre_caja .monto_recaudado").each(function(k,v){

	       		vm.servicioLocal.datosDetalleCaja[k]["montoRecaudado"] = $(this).val();
                  
	          	sumaMontoRecaudado += parseInt($(this).val());

	          	$("#total_monto_recaudado").text(sumaMontoRecaudado);

	        });

	        var sumaDiferencia=0;

	        $("#tabla_cierre_caja .diferencia").each(function(k,v){

	          var diferencia =  $(this).text();
	       
	          if(!diferencia){

	            diferencia = 0;

	          }
	           
	          sumaDiferencia += parseInt(diferencia);

	          $("#total_diferencia").text(sumaDiferencia);

	        });

       		var incrementoActivaCuadraCaja = 0;
        $("#tabla_cierre_caja .input-group span").each(function(k,v){

             
	        if($(this).hasClass('ver-ver')) {

	            incrementoActivaCuadraCaja++

	            if(incrementoActivaCuadraCaja == 3){

	              $("#btn_cuadrar_caja").attr("disabled",false);

	            }else{

	              $("#btn_cuadrar_caja").attr("disabled",true);   
	            }

	        } 

        });



        

      	}

      
      




      $timeout(function () {


        var sumaMontos=0;
 

        $("#tabla_cierre_caja .montos").each(function(k,v){
           
          sumaMontos += parseInt($(this).text());

          $("#total_monto").text(sumaMontos);

        });

        var sumaCantidad=0;        

        $("#tabla_cierre_caja .cantidad").each(function(k,v){

          sumaCantidad += parseInt($(this).text());

          $("#total_cantidad").text(sumaCantidad);

        });



        var sumaMontoRecaudado=0;

        $("#tabla_cierre_caja .monto_recaudado").each(function(k,v){


       		vm.servicioLocal.datosDetalleCaja[k]["montoRecaudado"] = $(this).val();

   
           
          	sumaMontoRecaudado += parseInt($(this).val());

          	$("#total_monto_recaudado").text(sumaMontoRecaudado);

        });

      $("#id_cheque_monto_recaudado").numeric(); 
      $("#id_efectivo_monto_recaudado").numeric();


       console.log(vm.servicioLocal.datosDetalleCaja);

        

      },500);
 
      
    }
 
})();
