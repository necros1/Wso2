(function() {
'use strict';
 
/**
 * @ngdoc function
 * @name medipassBE.controller:ConsultaVentaController
 * @description
 * # ConsultaVentaController
 * Controller of the medipassBE
 */
angular.module('medipassBE')

.factory('Excel',function($window){
        var uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId,worksheetName){
                var table=$(tableId),
                    ctx={worksheet:worksheetName,table:table.html()},
                    href=uri+base64(format(template,ctx));
                return href;
            }
        };
    })

  .controller('ConsultaVentaController', ConsultaVentaController);

function ConsultaVentaController($scope,$state, $timeout, $resource, $filter, DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$uibModal,$localStorage,Excel,servicioMilliways,servicioLocal){
	//Consultar el ws para cargar en la vista
  // testService.ConsultaWs($scope.RutPaciente, $scope.DvPaciente, $scope.Usuario, $scope.Clave).then(function(response){
    // $scope.response = response;
  // });
	var vm = this;
	var oTable = $('#CDV-T');
	vm.servicioMilliways = servicioMilliways;
    vm.datosSupervisor = servicioLocal.datosSupervisor;	
    vm.servicioLocal = servicioLocal;
 

    //		oTable.buttons().container().appendTo( $('#buttonsContainer') );
/*    $timeout(function(){ 	$(".exportar").mouseover(function(){
 

$(".exportar2").css("opacity","1");

 	});

  $(".exportar").mouseout(function() {
    $(".exportar2").css("opacity","0,5");
  });



},3000);

 	$timeout(function(){ 	$(".exportar2").mouseover(function(){
 

	$(".exportar").css("opacity","1");

 	});

  $(".exportar2").mouseout(function() {
    $(".exportar").css("opacity","0,5");
  });



 },3000);*/
	
  
	    $scope.filename = "test";

 	$scope.getArray = [];
 		var cargaDatos = [];

	    angular.forEach(vm.servicioLocal.consultaVentas[0][0],function(v,k){

	    	cargaDatos[k] = v;
	    });
	    console.log('--------------cargaDatos----------------');	    
	  // $scope.getArray = cargaDatos;
	   console.log(cargaDatos);

	   $scope.getArray = [{a: 1}, {b:3}];
	   console.log($scope.getArray);

      $scope.addRandomRow = function() {
        $scope.getArray.push({a: Math.floor((Math.random()*10)+1), b: Math.floor((Math.random()*10)+1)});
      };

      $scope.getHeader = function () {return ["A", "B"]};

      $scope.clickFn = function() {
        console.log("click click click");
      };
 
 	$scope.exportToExcel=function(){ // ex: '#my-table'
 

        var exportHref=Excel.tableToExcel('#CDV-T','sheet name');
        console.log(exportHref);
        $timeout(function(){location.href=exportHref;},100); // trigger download

    }

  	vm.dtInstance = {};
	vm.someClickHandler = someClickHandler;
	vm.message = '';
	vm.message2 = '';
	vm.records = [];
 

                  //  $localStorage.consultaVentas =  vm.servicioLocal.consultaVentas;

  	vm.records =  vm.servicioLocal.consultaVentas[0];


  	vm.dtInstance = {};
   //Consulto el json
	// vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
        // return $resource('vendor/bonos.json').query().$promise;
    // })
	//vm.dtOptions = DTOptionsBuilder.fromSource('vendor/bonos.json')
	//vm.dtOptions = DTOptionsBuilder.fromSource('http://bem.openpartner.cl/prestador/admin/servicios/insert_atenciones')
	


 	vm.dtOptions = DTOptionsBuilder.newOptions().withDOM('<"exportar"B>rt<"col-sm-12 paginacion"p i><"clear">').withBootstrap().withOption('responsive', true).withOption('order', [[ 0, "desc" ]])
	 
		.withButtons([
	 {
			extend: 'pdfHtml5',
			className: 'pdf',
			text: ' ',
			orientation: 'landscape',
			exportOptions: {
			  columns: ':visible'
			},
		  },
		]).withLanguage({
		  'processing': 'Procesando...',
		  'lengthMenu': 'Mostrar _MENU_ registros',
		  'zeroRecords': 'No se encontraron resultados',
		  'emptyTable': 'Ningún dato disponible en esta tabla',
		  'info': '&nbsp;Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
		  'infoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
		  'infoFiltered': '(filtrado de un total de _MAX_ registros)',
		  'infoPostFix': '',
		  'search': 'Buscar:',
		  'url': '',
		  'infoThousands': ',',
		  'loadingRecords': 'Cargando...',
		  'paginate': {
			'first': '<<',
			'last': '>>',
			'next': '>',
			'previous': '<'
		  },
		  'aria': {
			'sortAscending': ': Activar para ordenar la columna de manera ascendente',
			'sortDescending': ': Activar para ordenar la columna de manera descendente'
		  }
		})

		.withPaginationType('full_numbers')
		.withOption('rowCallback', rowCallback);
//.notVisible()
  
		    vm.dtColumnDefs = [

		        DTColumnDefBuilder.newColumnDef(0),
		        DTColumnDefBuilder.newColumnDef(1),
		        DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3),		        
	        	DTColumnDefBuilder.newColumnDef(4),
        		DTColumnDefBuilder.newColumnDef(5),
	        	DTColumnDefBuilder.newColumnDef(6),
	            DTColumnDefBuilder.newColumnDef(7),
	        	DTColumnDefBuilder.newColumnDef(8),
	        	DTColumnDefBuilder.newColumnDef(9),
	            DTColumnDefBuilder.newColumnDef(10).notVisible(),
	       		DTColumnDefBuilder.newColumnDef(11).notVisible(),
	            DTColumnDefBuilder.newColumnDef(12).notVisible(),
	       		DTColumnDefBuilder.newColumnDef(13).notVisible(),
                DTColumnDefBuilder.newColumnDef(14).notVisible(),
	        	DTColumnDefBuilder.newColumnDef(15).notVisible(),
        		DTColumnDefBuilder.newColumnDef(16).notVisible(),
	        	DTColumnDefBuilder.newColumnDef(17).notVisible(),
                DTColumnDefBuilder.newColumnDef(18).notVisible(),
                DTColumnDefBuilder.newColumnDef(19).notVisible()
      
		    ];

  vm.fecha = {
    startDate: moment().startOf('month'),
    endDate: moment()
  };

  vm.opts = {
    locale: {
      format: 'YYYY-MM-DD',
      applyClass: 'btn-green',
      applyLabel: 'Aceptar',
      fromLabel: 'Desde:',
      toLabel: 'Hasta:',
      cancelLabel: 'Cancelar',
      customRangeLabel: 'Rango Personalizado',
      daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      firstDay: 1,
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
        'Octubre', 'Nombiembre', 'Diciembre'
      ]
    },
    maxDate: moment(),
    ranges: {
      'Hoy': [moment(), moment()],
      'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Los Ultimos 7 Dias': [moment().subtract(6, 'days'), moment()],
      'Los Ultimos 30 Dias': [moment().subtract(29, 'days'), moment()],
      'Mes Actual': [moment().startOf('month'), moment().endOf('month')],
      'Mes Anterior': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
	eventHandlers: {
		'apply.daterangepicker': function(ev, picker) {

  			vm.records =  vm.servicioLocal.consultaVentas[0]; // cargo nuevamente el array total ya que si no lo actualizo queda reducido con los datos del filtro anterior  			

  			var val = $("#searchfecha").val().split(" - ");
  			var min = val[0];
        	var max = val[1];
        	min = min.replace("-", ".");
			min = min.replace("-", ".");
			max = max.replace("-", ".");
			max = max.replace("-", ".");


			min = (new Date(min.split(".").join("-")).getTime())/1000;
			max = (new Date(max.split(".").join("-")).getTime())/1000;
	 
        	var arrayToReturn = {}; 

	        var incrementa = 0;

	        $.each(vm.records,function(k,v){ 

	        	var fecha =  v.fecha_bono_unix;	 

	            if (fecha >= min )  {

	            	if (fecha <=  max)  {

	                	arrayToReturn[incrementa] = v ;
	        			incrementa++

	            	}
	            }

	        });
 	
	        vm.records = arrayToReturn;
  	 

		}
	}
  };

  //Filtros de busqueda
	// $('#searchfecha').on( 'keyup', function () {
	// 	oTable.dataTable().fnFilter( this.value , 6 );
	// });

 

	$('#searchisapre').on( 'keyup', function () {

		oTable.dataTable().fnFilter( this.value , 12 );
	});
	$('#searchseguros').on( 'keyup', function () {
		oTable.dataTable().fnFilter( this.value , 14 );
	});
	$('#searchbono').on( 'keyup', function () {
		oTable.dataTable().fnFilter( this.value , 5 );
	});
	$('#searchtipo').on( 'keyup', function () {
		oTable.dataTable().fnFilter( this.value , 6 );
	});

 
  //checkbox de ocultar y desocultar columnas
  vm.checkboxModel = {
    value1: true,
    value2: true,
    value3: true,
    value4: true,
    value5: true,
    value6: true,
    value7: true,
    value8: true,
    value9: true,
    value10: false,
    value11: false,
    value12: false,
    value13: false,
    value14: false,
    value15: false,
    value16: false,
    value17: false,
    value18: false,
    value19: false,   
  };
  //oculta o muestra las columnas dado el numero de valor
  vm.showAndHide = function(column, value) {

    oTable.dataTable().fnSetColumnVis(column, value);
  };
 
	  //muestra el bono seleccionado en pantalla
	 function someClickHandler(id_atencion) {



		//Consultar el webServices para traer la información de la atención seleccionada (si el servicio es off debe consultar las transacciones del día almacenadas)
		//Leer el json con el detalle de la atención

		var cargaDatos = [];
		var cargaDatosObjeto = {};
    	var url = "http://bem.openpartner.cl/bono/bono_electronico_v2";
		var pl = new SOAPClientParameters(); 
		//pl.add("urn:idAtencion","1898");
		pl.add("urn:idAtencion",id_atencion);		
		SOAPClient.invoke(url, "consultaAtencionDetalle", pl, true,function(u){
			$.each(u,function(k,v){ 
				
		 	    cargaDatosObjeto = {

						idAtencion : v["ns:idAtencion"],

						apellidoAfiliado : v["ns:apellidoAfiliado"],

						apellidoBeneficiario : v["ns:apellidoBeneficiario"],

						bonificacion : v["ns:bonificacion"],

						cantidad : v["ns:cantidad"],

						codigoAtencion : v["ns:codigoAtencion"],

						codigoMedico : v["ns:codigoMedico"],

						codigoPrestacion : v["ns:codigoPrestacion"],

						copago : v["ns:copago"],

						fechaHoraBono : v["ns:fechaHoraBono"],

						fecha_bono_unix :  moment(v["ns:fechaHoraBono"]).unix(),

						ges : "xxxx",

						idAtencionDetalle : v["ns:idAtencionDetalle"],

						idEspecialidad : v["ns:idEspecialidad"],

						idEstatu : v["ns:idEstatus"],

						idPrestacion : v["ns:idPrestacion"],

						idRazonSocial : v["ns:idRazonSocial"],

						idTipoAtencion : v["ns:idTipoAtencion"],

						item : v["ns:item"],

						monto : v["ns:monto"],

						montoCaja : v["ns:montoCaja"],

						montoIsapre : v["ns:montoIsapre"],

						montoSeguro : v["ns:montoSeguro"],

						nombreAfiliado : v["ns:nombreAfiliado"],

						nombreBeneficiario : v["ns:nombreBeneficiario"],

						nombreEspecialidad : v["ns:nombreEspecialidad"],

						nombreEstadoAtencion : v["ns:nombreEstadoAtencion"],

						nombreEstatus : v["ns:nombreEstatus"],

						nombreFantasia : v["ns:nombreFantasia"],

						nombreMedico : v["ns:nombreMedico"],

						nombrePrestacion : v["ns:nombrePrestacion"],

						nombreRazonSocial : v["ns:nombreRazonSocial"],

						nombreTipoAtencion : v["ns:nombreTipoAtencion"],

						numeroBono : v["ns:numeroBono"],

						planGrupo : v["ns:planGrupo"],

						rh : v["ns:rh"],

						rutAfiliado : v["ns:rutAfiliado"]["ns:numero"]+"-"+v["ns:rutAfiliado"]["ns:dv"],

						rutBeneficiario : v["ns:rutBeneficiario"]["ns:numero"]+"-"+v["ns:rutBeneficiario"]["ns:dv"],

						rutRazonSocial : v["ns:rutRazonSocial"]["ns:numero"]+"-"+v["ns:rutRazonSocial"]["ns:dv"],

						totalBonificacion : v["ns:totalBonificacion"],

						totalCopago : v["ns:totalCopago"],

						totalPrestacion : v["ns:totalPrestacion"],

						usoExcedente : v["ns:usoExcedente"]

					}

		      	  
			      	cargaDatos[k] = cargaDatosObjeto;




			      });

		});	
	

		vm.record = cargaDatos;

	
		var modalInstance = $uibModal.open({
		animation: true,
		scope: $scope,
		size: 'lg',
		templateUrl: 'views/components/bono-modal.html',
		resolve: {
      		record: function() //scope del modal
         { 
            return vm.record;
         }
     	},	 

		controller: function ($scope, $uibModalInstance, record) {


		 $scope.ok = function () {

		         $uibModalInstance.close();

		    };

		    $scope.cancel = function () {

		        $uibModalInstance.dismiss('cancel');

		    };
		}
	//	  size: 'lg',

		  
		});

		 
	}


	/*vm.anulaBono = function(){

		var modalInstance = $uibModal.open({
		animation: true,
		scope: $scope,
		size: 'lg',
		templateUrl: 'views/components/modal-anular-bono.html',
		resolve: {
      		record: function() //scope del modal
         { 
            return vm.record;
         }
     	},	 

		controller: function ($scope, $uibModalInstance, record) {


		 $scope.ok = function () {

		         $uibModalInstance.close();

		    };

		    $scope.cancel = function () {

		        $uibModalInstance.dismiss('cancel');

		    };
		}
	//	  size: 'lg',

		  
		});




	}*/




    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
 
       	$("td:not(:nth-child(2)) ",nRow).unbind('click');

        $("td:not(:nth-child(2)) ",nRow).bind('click', function() {
            $scope.$apply(function() {    

                vm.someClickHandler(aData[0]);

            });
        });
        return nRow;
    }




    vm.btnCancelarTransaccion = function () {
		    $state.go('menu');
    };


    vm.openModalAnular = function(idAtencion,folio){

    	$("#idAtencion").html(idAtencion);    	
    	$("#idFolio").html(folio);
    	$("#Modal-anular").modal("show");
    }



  	vm.confirmarTocSupervisor = function(){


  		var rut = $("#campo_texto_rut_supervisor").val();
  		var idAtencion = $("#idAtencion").text();
    	var folioFinanciador = $("#idFolio").text();
    	vm.servicioMilliways.validarSupervisor(rut);

    		$timeout(function() {	

    		if(vm.datosSupervisor[0].esSupervisor){

    			//vm.servicioMilliways.anulaBono(folioFinanciador);

		    	$resource('http://bem.openpartner.cl/prestador/admin/servicios/insert_atenciones?idAtencion='+idAtencion+'&accion=anular').query().$promise.then(function(idAtencion) {
		    	//$resource('http://bem.openpartner.cl/prestador/admin/servicios/insert_atenciones?idAtencion='+idAtencion+'&accion=session_caja').query().$promise.then(function(idAtencion) {
							
	          		$("#id_anular_"+idAtencion[0].id).text("Anulada").addClass("roj-roj").removeClass("gri-gri").attr("disabled",true);
				//}	
				});

    		}


    	}, 1000);






  	}



/*
vm.download = function(fileName, mimeType) {
var myTableArray = [];
$("#CDV-T tr").each(function() { 
    var arrayOfThisRow = [];
    var tableData = $(this).find('td');
    if (tableData.length > 0) {
        tableData.each(function() { arrayOfThisRow.push($(this).text()); });
        myTableArray.push(arrayOfThisRow);
    }
});

console.log(myTableArray); // alerts the entire array

 

var data = myTableArray;
var data = [['name1', 'city1', 'some other info'], ['name2', 'city2', 'more info']];
var csvContent = '';
data.forEach(function (infoArray, index) {
  dataString = infoArray.join(';');
  csvContent += index < data.length ? dataString + '\n' : dataString;
});

var content = csvContent;


  var a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream';

  if (navigator.msSaveBlob) { // IE10
    return navigator.msSaveBlob(new Blob([content], { type: mimeType }), fileName);
  } else if ('download' in a) { //html5 A[download]
    a.href = 'data:' + mimeType + ',' + encodeURIComponent(content);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    setTimeout(function() {
      a.click();
      document.body.removeChild(a);
    }, 66);
    return true;
  } else { //do iframe dataURL download (old ch+FF):
    var f = document.createElement('iframe');
    document.body.appendChild(f);
    f.src = 'data:' + mimeType + ',' + encodeURIComponent(content);

    setTimeout(function() {
      document.body.removeChild(f);
    }, 333);
    return true;
  }
}


vm.download(csvContent, 'csv file.csv', 'text/csv');

 */



vm.download = function(fileName, mimeType) {

 
/*$("#CDV-T tr").each(function() { 
    var arrayOfThisRow = [];
    var tableData = $(this).find('td');
    if (tableData.length > 0) {
        tableData.each(function() { arrayOfThisRow.push($(this).text()); });
        myTableArray.push(arrayOfThisRow);
    }
});*/

 
 




var data = vm.servicioLocal.consultaVentasExcel; 
//var data = [['name1', 'city1', 'some other info'], ['name2', 'city2', 'more info']];
var content = '';
var dataString;
data.forEach(function (infoArray, index) {
	console.log(infoArray);

  dataString = infoArray.join(';');

  content += index < data.length ? dataString + '\n' : dataString;
});



  var a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream';

  if (navigator.msSaveBlob) { // IE10
    return navigator.msSaveBlob(new Blob([content], { type: mimeType }), fileName);
  } else if ('download' in a) { //html5 A[download]
    a.href = 'data:' + mimeType + ',' + encodeURIComponent(content);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    setTimeout(function() {
      a.click();
      document.body.removeChild(a);
    }, 66);
    return true;
  } else { //do iframe dataURL download (old ch+FF):
    var f = document.createElement('iframe');
    document.body.appendChild(f);
    f.src = 'data:' + mimeType + ',' + encodeURIComponent(content);

    setTimeout(function() {
      document.body.removeChild(f);
    }, 333);
    return true;
  }
}



}
})();




 

 

 

 
