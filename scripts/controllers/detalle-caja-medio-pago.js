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



  .controller('detalleCajaMedioPagoController', detalleCajaMedioPagoController);

function detalleCajaMedioPagoController($scope,$state, $timeout, $resource, $filter, DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder,$uibModal,$localStorage,Excel,servicioMilliways,servicioLocal){
  //Consultar el ws para cargar en la vista
  // testService.ConsultaWs($scope.RutPaciente, $scope.DvPaciente, $scope.Usuario, $scope.Clave).then(function(response){
    // $scope.response = response;
  // });
  var vm = this;
  var oTable = $('#CDV-T');
  vm.servicioMilliways = servicioMilliways;
  vm.datosSupervisor = servicioLocal.datosSupervisor; 
  vm.servicioLocal = servicioLocal;
 

    //    oTable.buttons().container().appendTo( $('#buttonsContainer') );
/*    $timeout(function(){  $(".exportar").mouseover(function(){
 

$(".exportar2").css("opacity","1");

  });

  $(".exportar").mouseout(function() {
    $(".exportar2").css("opacity","0,5");
  });



},3000);

  $timeout(function(){  $(".exportar2").mouseover(function(){
 

  $(".exportar").css("opacity","1");

  });

  $(".exportar2").mouseout(function() {
    $(".exportar").css("opacity","0,5");
  });



 },3000);*/
  





      console.log('--------------cargaDatos----------------');      
    // $scope.getArray = cargaDatos;









    vm.dtInstance = {};
  vm.someClickHandler = someClickHandler;
  vm.message = '';
  vm.message2 = '';
  vm.records = [];
 

                  //  $localStorage.consultaVentas =  vm.servicioLocal.consultaVentas;

    vm.records =  vm.servicioLocal.datosDetalleCajaMedioPago[0];


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
     /* extend: 'pdfHtml5',
      className: 'pdf',
      text: ' ',
      orientation: 'landscape',
      exportOptions: {
        columns: ':visible'
      },*/
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

            DTColumnDefBuilder.newColumnDef(0).notVisible(),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),           
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6),
            DTColumnDefBuilder.newColumnDef(7),
            DTColumnDefBuilder.newColumnDef(8),
            DTColumnDefBuilder.newColumnDef(9)           
     
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

  };

  //Filtros de busqueda
  // $('#searchfecha').on( 'keyup', function () {
  //  oTable.dataTable().fnFilter( this.value , 6 );
  // });

 

 

 
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
  //    size: 'lg',

      
    });

     
  }

 



    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
 
        $("td:not(:nth-child(1)) ",nRow).unbind('click');

        $("td:not(:nth-child(1)) ",nRow).bind('click', function() {
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
              
            $("#id_anular_"+idAtencion[0].id).text("Anulada").addClass("roj-roj").removeClass("gri-gri").attr("disabled",true);
        //} 
        });

        }else{

            $("#accionEnToc").text("El USUARIO NO ES SUPERVISOR");
        }


      }, 1000);






    }





}
})();




 

 

 

 
