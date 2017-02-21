(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name medipassBE.controller:RamController
     * @description
     * # RamController
     * Controller of the medipassBE
     */
    angular.module('medipassBE')
        .controller('RamController', RamController);
    RamController.$inject = ['$http','$scope', '$state', '$stateParams', 'verificadorConexion', 'servicioLocal', '$window', '$timeout', 'servicioData','servicioMilliways','_'];

    function RamController($http,$scope, $state, $stateParams, verificadorConexion, servicioLocal, $window, $timeout, servicioData,servicioMilliways,
     _) {
        var vm = this;
        vm.disabled = undefined;
        vm.convenio = '';
        vm.state = $state.current.name;   
        console.log(vm.state);
        vm.stateParams = $stateParams;
        vm.verificadorConexion = verificadorConexion;
        vm.atencion = servicioLocal.atencion;
        vm.datosPaciente = servicioLocal.datosPaciente;
        vm.datosSesion = servicioLocal.datosSesion;
        vm.servicioMilliways = servicioMilliways;
        vm.servicioLocal = servicioLocal;


        console.log(servicioLocal.cancelarRegitroAtencion.valor);
        var $scope;
 

        vm.format = function (input)
        {
            var num = input.value.replace(/\./g,'');
            if(!isNaN(num)){
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/,'');
            input.value = num;
            }
              
            else{ alert('Solo se permiten numeros');
            input.value = input.value.replace(/[^\d\.]*/g,'');
            }
        }
       
        servicioData
            .getAllPrestaciones()
            .then(function (data) {
                vm.prestaciones = data;
            })
            .catch(function (err) {
                // Tratar el error
            });

        servicioData
            .getAllMedicos()
            .then(function (data) {
                vm.medicos = data;                
            })
            .catch(function (err) {
                // Tratar el error
            });

        vm.items = servicioLocal.items;
        vm.ges = servicioLocal.ges;
        vm.tipoAtenciones = servicioLocal.tipoAtenciones;
        vm.consulta = false;
        vm.cambio = 0;

        vm.pago = {
            monto: null,
            numeroCheque: null, //TABLA PAGO_ATENCION_CHQ NUMERO_CHQ
            numeroSerieCheque: null, //TABLA PAGO_ATENCION_CHQ NUMERO_SERIE
            rutTitular: null, //TABLA PAGO_ATENCION_TAR RUT_TITULAR_TAR|| PAGO_ATENCION_CHQ RUT_TITULAR_CHQ
            nombreTitular: null, //NO SE GUARDA
            codigoBanco: null, //TABLA PAGO_ATENCION_TAR BANCO_ID|| PAGO_ATENCION_CHQ BANCO_ID
            nombreBanco: null, //NO SE GUARDA
            tipoTarjeta: null, //TABLA PAGO_ATENCION_TAR TARJETA_ID
            numeroTargeta: null, //TABLA PAGO_ATENCION_TAR NUMERO_TAR
            numeroPagare: null, // TABLA PAGO_ATENCION NO CREADO
            telefonoTitular: null, //TABLA PAGO_ATENCION_TAR TE

        };

        vm.form = {
            cantidad: 1,
            item: {
                selected: vm.items[0],
            },
            codigoGes: {
                selected: vm.ges[0],
            },
        };


        vm.agregarPrestacion = function () {
            var numeroRow;
            if(!vm.form.derivado){
                vm.form.derivado = "N";
            }
            vm.prestacion = {
                idPrestacion: vm.form.prestacion.selected.id, //siempre
                codigo: vm.form.prestacion.selected.cod_prestacion, //siempre
                nombre: vm.form.prestacion.selected.nom_prestacion,
                cantidad: vm.form.cantidad, //siempre
                idItem: vm.form.item.selected.id, //siempre
                codigoItem: vm.form.item.selected.codigo, //siempre
                idCodigoGes: vm.form.codigoGes.selected.id,
                codigoGes: vm.form.codigoGes.selected.codigo,
                recargo: vm.recargo(),
                valorPrestacion: vm.valorPrestacion() + vm.recargo(), //siempre
                copago: vm.copago(vm.valorPrestacion(), vm.recargo(), vm.form.cantidad),
                idMedico: vm.form.medico.selected.id,
                nombreMedico:vm.form.medico.selected.nombreMedico,
                codigoMedico:vm.form.medico.selected.codigoMedico,
                codigoEspecialidad:vm.form.especialidad.selected.codigoEspecialidad,
                idEspecialidad: vm.form.especialidad.selected.idEspecialidad,
                nombreEspecialidad:vm.form.especialidad.selected.nombreEspecialidad,
                medicoDerivado: vm.form.derivado,
                nombre_isapre:"Consalud",
    
            };

 
/*

 
----------------------------------------------------
diferencia ??????

                idCodigoGes: vm.form.codigoGes.selected.id,??????
                codigoGes: vm.form.codigoGes.selected.codigo,?????  */
 

    if(vm.atencion.datosAtencion.tipoAtencion == "PARTICULAR"){

            var prestacionInsert2 =  {
                              "urn:idPrestacion":vm.form.prestacion.selected.id,
                              "urn:idConvenioPrestacion":1,
                              "urn:idEspecialidad":1,
                              "urn:idMedico":vm.form.medico.selected.id,
                              "urn:item":vm.form.item.selected.id,
                              "urn:ges":vm.form.codigoGes.selected.codigo,
                              "urn:rh":0,
                              "urn:cantidad":vm.form.cantidad,
                              "urn:monto":vm.valorPrestacion() + vm.recargo(),
                              "urn:bonificacion":0,
                              "urn:copago":vm.copago(vm.valorPrestacion(), vm.recargo(), vm.form.cantidad),
                              "urn:medicoDerivado": vm.form.derivado,

                          }

    }else{

            var prestacionInsert2 = {

                                   "urn:idPrestacion":vm.form.prestacion.selected.id,
                                   "urn:idConvenioPrestacion":1,
                                   "urn:idEspecialidad":1,
                                   "urn:idMedico":vm.form.medico.selected.id,
                                   "urn:item":vm.form.item.selected.id,
                                   "urn:ges":vm.form.codigoGes.selected.codigo,
                                   "urn:rh":0, //????? ver xml en word 
                                   "urn:cantidad":vm.form.cantidad,

                                   //????   diferencia entre estos 3 datos

                                   "urn:monto":0, // monto
                                    "urn:montoBonificacion":0, // bonificacion 
                                   "urn:bonificacion":0,

                                   //????  Fin  diferencia entre estos 3 datos


                                   "urn:copago":vm.copago(vm.valorPrestacion(), vm.recargo(), vm.form.cantidad),
                                   "urn:medicoDerivado":vm.form.derivado,// validar si esta o no
                                    "urn:idEntidad":4, // 4 es de consalud 
                                   "urn:idEstatus":6, // verificar en tabla estatus cual id corresponde 
                              
                                   "urn:numeroBono":0,  // se pisa en servicio SolicitarFolio
                                   "urn:glosa":1,
                                   "urn:tipoBonificacion":1,   

                                } 


    }

 



        
            vm.form = {
                cantidad: 1,
                item: {
                    selected: vm.items[0],
                },
                codigoGes: {
                    selected: vm.ges[0],
                },
            };

            vm.formularioPrestacion.$setPristine();
            vm.atencion.datosPrestaciones.push(vm.prestacion);

            vm.atencion.datosPrestacionesComprobante.push(vm.prestacion); 

            vm.atencion.datotsPrestacionesInsert.push(prestacionInsert2);  // con las variable necesarias para el servicio insert

            console.log(vm.atencion.datotsPrestacionesInsert);
 
            vm.atencion.datosPrestacionesMilliway.push({"urn:codigo":"0000"+vm.prestacion.codigo,
                                                        "urn:tipo":0,
                                                        "urn:codigoAdicional":"0"+vm.prestacion.codigo,
                                                        "urn:recargoFueraHorario":0,
                                                        "urn:cantidad":"0"+vm.prestacion.cantidad,
                                                        "urn:valor":"000000000000",
                                                        }
                                                    );
            

            if (vm.state !== 'simulacion') {
                if (vm.atencion.datosAtencion.tipoAtencion === 'PARTICULAR') {
                    vm.atencion.datosAtencion.estadoAtencion = 'VALORIZADA';
                } else {
                    vm.atencion.datosAtencion.estadoAtencion = 'NUEVA';
                }
            }

            var    totalPrestacion = 0;
            var    totalCopagos = 0;

            angular.forEach(vm.atencion.datosPrestaciones,function(v,k){

                totalPrestacion =  parseInt(totalPrestacion) +  parseInt(v.valorPrestacion);
                totalCopagos =  parseInt(totalCopagos) +  parseInt(v.copago);
            });

            vm.atencion.datosPago.totales.montoIsapre = 0;
            vm.atencion.datosPago.totales.total = totalPrestacion;
            vm.atencion.datosPago.totales.copago = totalCopagos;              
   

            if (vm.atencion.datosAtencion.tipoAtencion === 'ONLINE') {

                $("#id_btn_valorizar_online").css("display","block");
                $("#id_btn_pagar_online").css("display","none").removeAttr("disabled");                

            }else{

                $("#id_btn_pagar_online").css("display","block").removeAttr("disabled");
            }   

        };

        vm.removeRow = function (row) {
            var index = vm.atencion.datosPrestaciones.indexOf(row);
            if (index !== -1) {
                vm.atencion.datosPrestaciones.splice(index, 1);
                vm.atencion.datosPrestacionesMilliway.splice(index, 1);
              //  vm.atencion.datosPrestacionesComprobante = [];
              //  vm.atencion.datosPrestacionesComprobante.push(vm.atencion.datosPrestaciones); 


              //  vm.divideArray();


             //   vm.atencion.datosPrestacionesComprobante[0].splice(index, 1);                

                if (vm.state !== 'simulacion') {
                    if (vm.atencion.datosAtencion.tipoAtencion === 'PARTICULAR') {
                        vm.atencion.datosAtencion.estadoAtencion = 'VALORIZADA';
                    }
                } else {

                    vm.atencion.datosAtencion.estadoAtencion = 'NUEVA';
                }

            // recorro vm.atencion.datosPrestaciones para calcular el nuevo total 
                var    totalPrestacion = 0;
                var    totalCopagos = 0;
                var     totalAporteFinanciador= 0;

                angular.forEach(vm.atencion.datosPrestaciones,function(v,k){

                    totalPrestacion =  parseInt(totalPrestacion) +  parseInt(v.valorPrestacion);
                    totalCopagos =  parseInt(totalCopagos) +  parseInt(v.copago);
                    totalAporteFinanciador = parseInt(totalAporteFinanciador) + parseInt(v.aporteFinanciador);
                     
                });

                vm.atencion.datosPago.totales.montoIsapre =  totalAporteFinanciador;  
                vm.atencion.datosPago.totales.total = totalPrestacion;
                vm.atencion.datosPago.totales.copago = totalCopagos;


            // recorro vm.atencion.datosPrestaciones para calcular el nuevo total--------------- FIN                 

            }

        


        };
 
        /**
         * Funcion que inicializa el controlador
         * determino si es una consulta o no
         */
        

        var init = function () {


            if (vm.state !== 'simulacion') {
                vm.showPago = false;
                vm.showConfirmacion = false;
                if (vm.atencion._id) {

                } else {

                    vm.atencion.datosAtencion.estadoAtencion = 'NUEVA';
                   // if (!vm.atencion.datosBeneficiario.nombre) {
                    if (!vm.datosPaciente.nombre) {

                        vm.atencion.datosAtencion.tipoAtencion = 'PARTICULAR';

                        vm.atencion.datosBeneficiario.nombre = vm.datosPaciente.nombre;

                        vm.atencion.datosBeneficiario.apellidoPaterno = vm.datosPaciente.apellidoPaterno;

                        vm.atencion.datosBeneficiario.apellidoMaterno = vm.datosPaciente.apellidoMaterno;

                        vm.atencion.datosBeneficiario.rut = vm.datosPaciente.rut;

                        vm.atencion.datosTitular.nombre = vm.datosPaciente.nombre;

                        vm.atencion.datosTitular.apellidoPaterno = vm.datosPaciente.apellidoPaterno;

                        vm.atencion.datosTitular.apellidoMaterno = vm.datosPaciente.apellidoMaterno;

                        vm.atencion.datosTitular.rut = vm.datosPaciente.rut;                        


                    }else{

                        vm.atencion.datosAtencion.tipoAtencion = 'ONLINE';

                        vm.atencion.datosBeneficiario.nombre = vm.datosPaciente.nombre;

                        vm.atencion.datosBeneficiario.apellidoPaterno = vm.datosPaciente.apellidoPaterno;

                        vm.atencion.datosBeneficiario.apellidoMaterno = vm.datosPaciente.apellidoMaterno;

                        vm.atencion.datosBeneficiario.rut = vm.datosPaciente.rut;

                        vm.atencion.datosTitular.nombre = vm.datosPaciente.nombre;

                        vm.atencion.datosTitular.apellidoPaterno = vm.datosPaciente.apellidoPaterno;

                        vm.atencion.datosTitular.apellidoMaterno = vm.datosPaciente.apellidoMaterno;

                        vm.atencion.datosTitular.rut = vm.datosPaciente.rut;   

                    }

                }

                if (!vm.atencion.datosIsapre.nombre) {
                    vm.tieneIsapre = false;

                } else {
                    vm.tieneIsapre = true;
                }

                vm.tipoAtencion = vm.atencion.datosAtencion.tipoAtencion;
               // console.log(vm.atencion.datosTitular);  
             
            }
        };

        // and fire it after definition

        $scope.$watch('vm.verificadorConexion.isOnline()', function (online) {
            vm.onlineStatusString = online ? 'ONLINE' : 'OFFLINE';
            if (vm.tipoAtencion !== 'PARTICULAR') {
                vm.tipoAtencion = vm.onlineStatusString;
                console.log(vm.tipoAtencion);
                console.log("vm.tipoAtencion");
            }
        });
      


        vm.btnParticular = function () {
            vm.tipoAtencion = 'PARTICULAR';
            vm.atencion.datosAtencion.tipoAtencion = vm.tipoAtencion;
        };

        vm.btnCancelarTransaccion = function () {
            servicioLocal.cancelarRegitroAtencion.valor = true;
            servicioLocal.limpiarDatoPaciente();

            servicioLocal.limpiarAtencion();
            vm.atencion.datosPrestacionesComprobante = [];

           
           
            $state.go('menu');
        };

        //calcular el valor de la prestacion
        vm.valorPrestacion = function () {
            return vm.form.prestacion.selected.precio_base * vm.form.cantidad;
        };

        vm.valorizar = function () {
            if (vm.state !== 'simulacion') {
                vm.atencion.datosAtencion.estadoAtencion = 'VALORIZADA';
            }
        };

 

    vm.valorizarPrestaciones = function () {
             

        vm.cargaDatos = {};

        var pl = new SOAPClientParameters();

            pl.add("urn:isapre","isapreConsalud");
            pl.add("urn:seguro","0");
            pl.add("urn:caja","0");
            pl.add("urn:numeroConvenio","1");
            pl.add("urn:lugarConvenio","39541");
            pl.add("urn:sucursalVenta","7923");
            pl.add("urn:rutConvenio","0084655500-5");
         
            pl.add("urn:rutTratante","0084655500-5");
            pl.add("urn:especialidadTratante","XLC");
            pl.add("urn:rutSolicitante","0019371029-8");        
              
            pl.add("urn:rutBeneficiario","0019371029-8");
         
            pl.add("urn:tratamiento","N");
            pl.add("urn:codigoDiagnostico","");
            pl.add("urn:nivelConvenio","1");
            pl.add("urn:urgencia","0");

            pl.add("urn:prestaciones",vm.atencion.datosPrestacionesMilliway);
  
            var url = "http://bem.openpartner.cl/bono/bono_electronico";
      
            SOAPClient.invoke(url, "valorizarPrestacion", pl, true,function (u)
                {
                    
                    if(u == null){
                        alert("Sin respuesta de Servicio");
                    
                    }else{   //-----------------------Si el servicio viene con respuesta ---------------------------          
 
                    vm.atencion.datosIsapre.plan =u[0]; 

                    u.splice(0,1);                    
              
                    var incrementa = 0;
                    var llave ;
                    var cantidad;
                    var cargaDatos = [];

                    $.each(u,function(k,v){

                        if( typeof v != "object"  ){
                             
                            cargaDatos[k] = v;   
                            cantidad =(parseInt(k) / parseInt(4));
                        }
                
                    })
 
                    var cargaDatosPrestaciones =[];            
                    var chunk;
                    var incrementa2 = 0;

                    while (cargaDatos.length > 0) {

                        chunk = cargaDatos.splice(0,Math.round(cantidad));
      
                        if(incrementa2 != 3){
                            
                            cargaDatosPrestaciones[incrementa2] = chunk;

                        }
                        incrementa2++;

                    }
 
                    var   totalPrestacion = 0;
                    var   totalAporteFinanciador = 0;
                    var   totalCopagos = 0;

                    angular.forEach(vm.atencion.datosPrestaciones, function (v,k) {                          

                        for(var i = 0; i < cargaDatosPrestaciones.length ; i++)                       
                        {
                                                            
                            if( typeof cargaDatosPrestaciones[i][k] != "undefined"){
 
                                if(i == 0){

                                    vm.atencion.datosPrestaciones[k].valorPrestacion = cargaDatosPrestaciones[i][k];  
                                    vm.atencion.datosPrestacionesComprobante[k].valorPrestacion = cargaDatosPrestaciones[i][k];
                                    vm.atencion.datotsPrestacionesInsert[k]["urn:monto"] = cargaDatosPrestaciones[i][k];
                                    totalPrestacion = parseInt(totalPrestacion) + parseInt(cargaDatosPrestaciones[i][k]);   

                                }

                                if(i == 1){

                                    vm.atencion.datosPrestaciones[k].aporteFinanciador = cargaDatosPrestaciones[i][k];
                                    vm.atencion.datosPrestacionesComprobante[k].aporteFinanciador = cargaDatosPrestaciones[i][k]; 
                                    vm.atencion.datotsPrestacionesInsert[k]["urn:montoBonificacion"] = cargaDatosPrestaciones[i][k]; 


                                    totalAporteFinanciador =parseInt(totalAporteFinanciador) + parseInt(cargaDatosPrestaciones[i][k]);  

                                }
                                 if(i === 2){

                                    vm.atencion.datosPrestaciones[k].copago  = cargaDatosPrestaciones[i][k];
                                    vm.atencion.datosPrestacionesComprobante[k].copago = cargaDatosPrestaciones[i][k];
                                    vm.atencion.datotsPrestacionesInsert[k]["urn:copago"] = cargaDatosPrestaciones[i][k];                                                                        
                                    totalCopagos = parseInt(totalCopagos) + parseInt(cargaDatosPrestaciones[i][k]);

                                }                                                 
                         
                            }

                        }
                          
                    });

                    vm.atencion.datosPago.totales.copago = totalCopagos;   
                    vm.atencion.datosPago.totales.montoIsapre =  totalAporteFinanciador;  
                    vm.atencion.datosPago.totales.total =  totalPrestacion; 


                    vm.atencion.datosIsapre.nivelConvenio = "BONIFICADO";
          
                    $("#id_btn_valorizar_online").css("display","none");
                    $("#id_btn_pagar_online").css("display","block");    

 
                    vm.atencion.datosAtencion.estadoAtencion = 'VALORIZADA';   
                    $("#id_btn_pagar_online").removeAttr("disabled"); 
             
                    $timeout(function() {
                        var el = document.getElementById('wea');
                        angular.element(el).triggerHandler('click');
                    }, 0);


                } //------------------------------------Fin  si el servicio viene con respuesta-------------------------------    

        
            });



        
        };
 
        vm.divideArray = function (){


            var cargaDatos =[];            
            var chunk;
            var incrementa = 0;


            while (vm.atencion.datosPrestacionesComprobante.length > 0) {  //----while para modelar el array por cada 6 prestaciones

                chunk = vm.atencion.datosPrestacionesComprobante.splice(0,6);
                cargaDatos[incrementa] = chunk;
               
                incrementa++;

            } //Fin ---while para modelar el array por cada 6 prestaciones

            var cargaDatosInsert =[];            
            var chunkInsert;
            var incrementaInsert = 0;


            while (vm.atencion.datotsPrestacionesInsert.length > 0) {  //----while para modelar el array por cada 6 prestaciones

                chunkInsert = vm.atencion.datotsPrestacionesInsert.splice(0,2);
                cargaDatosInsert[incrementaInsert] = chunkInsert;
               
                incrementaInsert++;

            } //Fin ---while para modelar el array por cada 6 prestaciones


// ---------------------SE CALCULA LOS  TOTALES POR CADA COMPROBANTE (BONO)--------------------------------------------
            var totalCopagoComprobante = 0;
            var totaldatosBonificacion = 0;
            var totalMontoComprobante  = 0; 

            var cambia_en_foreach = 0;// variable compara si k cambio para poner en  0 el valor de las variables que suman las cantidades totales , 
                                        // de esta forma no conservo el valor de la variable del total de las prestaciones del bono anterior ya recorrido. 

            angular.forEach(cargaDatos,function(v,k){ 

                if(cambia_en_foreach != k){ // verifico cambio 

                    cambia_en_foreach = k;
                    totalCopagoComprobante = 0;
                    totaldatosBonificacion = 0;
                    totalMontoComprobante  = 0;

                }

                angular.forEach(v,function(vv,kk){ // recorro los respectivos mostos de la prestacion
                    // sumo los montos y los dejo en su total  
                    vm.atencion.datosCopagoTotales[k] = totalCopagoComprobante = parseInt(totalCopagoComprobante) + parseInt(vv.copago);
                    vm.atencion.datosBonificacionTotales[k] = totaldatosBonificacion = parseInt(totaldatosBonificacion) + parseInt(vv.aporteFinanciador);
                    vm.atencion.totalMontoComprobante[k] = totalMontoComprobante = parseInt(totalMontoComprobante) + parseInt(vv.valorPrestacion);
                });        

            });

// -----------------FIN--------------------------SE CALCULA LOS  TOTALES POR CADA COMPROBANTE (BONO)-------------------------------------------- FIN -------------------

            vm.atencion.datosPrestacionesComprobante.push(cargaDatos); // creo el array que luego se itera en la vista html que muestra el bono
            vm.atencion.datotsPrestacionesInsert.push(cargaDatosInsert); // creo el array que luego se itera en la vista html que muestra el bono
            vm.servicioMilliways.solicitarFolio(cargaDatos.length); // traigo los folio  y cambio el avalor de "urn:numeroBono" de cada prestacion por cada bono

        
        };

 
        vm.pagar = function () {
           
            vm.divideArray();

            vm.atencion.datosAtencion.estadoAtencion = 'POR PAGAR';
            vm.showPago = true;
            vm.showConfirmacion = false;
            $state.go('ram.pago');

            vm.pago = {
                monto: vm.atencion.datosPago.totales.copago,
            };
 
        };

        //calcular si hay recargo y cuanto es el monto
        vm.recargo = function () {
            var evalTime = moment();

            var extra = moment().format('YYYY-MM-DD') + ' ';
            var start_time = moment(extra + vm.datosSesion.horarioRecargoDesde);
            var end_time = moment(extra + vm.datosSesion.horarioRecargoHasta);

            if (moment(evalTime).isBetween(start_time, end_time)) {

                if (vm.datosSesion.recargoTipo == 'PORCENTAJE') {
                    return vm.datosSesion.recargoMonto * vm.valorPrestacion() / 100;
                }

                if (vm.datosSesion.recargoTipo == 'MONTO') {
                    return vm.datosSesion.recargoMonto;

                }
            } else {
                return 0;
            }

        };

        vm.copago = function (a, b, c) {
            return (a + b) * c;
        };

        vm.totalCantidad = function () {
            if (!vm.tieneIsapre) {
                var total = 0;
                angular.forEach(vm.atencion.datosPrestaciones, function (prestacion) {
                    total += prestacion.cantidad;
                });

                return total;
            } else {
                return vm.atencion.datosIsapre.numeroPrestaciones;

            }
        };

        /**
         * Funcion que calcula el total
         */
        vm.totalMonto = function () {
            if (!vm.tieneIsapre) {
                var total = 0;
                angular.forEach(vm.atencion.datosPrestaciones, function (prestacion) {
                    total += prestacion.valorPrestacion;
                });

                return total;
            } else {

                return vm.atencion.datosPago.totales.total;

            }
        };

        /**
         * Funcion que calcula el excedente a mostrar
         */
        vm.montoExcendente = function () {

            if (vm.atencion.datosBeneficiario.montoExcedente) {

                if (vm.atencion.datosBeneficiario.montoExcedente > vm.pago.monto) {

                    vm.atencion.datosBeneficiario.montoExcedenteUsar = vm.atencion.datosBeneficiario.montoExcedente - vm.pago.monto;
                    
                    return vm.atencion.datosBeneficiario.montoExcedenteUsar;

                }else{

                    return vm.atencion.datosBeneficiario.montoExcedenteUsar;

                }
            }
        };

        /**
         * Funcion que observa la variable pago.monto para calcular el cambio a devolver
         */
        $scope.$watch('vm.pago.monto', function (value) {

            var patron_entero_positivo = /^\d*$/;        
           
            if (!patron_entero_positivo.test(value)) {  // verifico que sea un valor entero positivo        
                       
                vm.pago.monto = vm.totalPendiente();
            }

            if( value > vm.totalPendiente() ){ // si el valor agregado para pagar es mayor qeu lo pendiente 

                vm.pago.monto = vm.totalPendiente();

            }

        });


        /**
         * Funcion que calcula el copago dependiendo si tiene isapre o no
         */
        vm.totalCopago = function () {
            if (!vm.tieneIsapre) {

                var total = 0;
                angular.forEach(vm.atencion.datosPrestaciones, function (prestacion) {
                    total += prestacion.copago;
                });

                return total;
            } else {
                return vm.atencion.datosPago.totales.copago;
            }

        };

        /**
         * Funcion que agrega el pago en la pantalla copago
         */
 
        vm.agregaRowMediosPago =[];  // array para  agregar valores de medios de pago a mostrar en pantalla (Medios de pago  y monto)
        var pagoRowAgregar ={};  // objeto que se agrega en  vm.agregaRowMediosPago   con  medios de pago y monto 

        vm.agragarPago= function () {
 

            pagoRowAgregar = { tipo:$("#for-pag").val(), monto: vm.pago.monto,}; //lleno de  valores 

            vm.agregaRowMediosPago.push(pagoRowAgregar); //agrego objeto a listado de pago 

 
            var medioPagoCheque = null;
            var medioPagoExcedente = null;
            var medioPagoEfectivo = null;          

            var montoPagoEfectivo = 0;
            var montoPagoCheque = 0;
            var montoPagoExcedente = 0; 

            var montoTotalPagado = 0;           

            angular.forEach(vm.agregaRowMediosPago, function (pago) { // iteracion para sumar los medios de pago 
                switch (pago.tipo) {
                    case 'EFECTIVO':
                        {
                            montoPagoEfectivo += pago.monto;   
                            medioPagoEfectivo = true; 
                                  
                            break;
                        }

                    case 'CHEQUE':
                        {
                            montoPagoCheque += pago.monto;   
                            medioPagoCheque = true;

                            break;
                        }


                    case 'EXCEDENTE':
                        {
                            montoPagoExcedente += pago.monto;   
                            medioPagoExcedente= true;

                            break;
                        }

                }

                montoTotalPagado = montoPagoEfectivo + montoPagoExcedente + montoPagoEfectivo;

                 

            });
   
            vm.pago = {

                monto: vm.totalPendiente(),
                medioPagoCheque: medioPagoCheque,
                montoPagoCheque: montoPagoCheque,                  
                medioPagoExcedente: medioPagoExcedente,
                montoPagoExcedente: montoPagoExcedente,                
                medioPagoEfectivo: medioPagoEfectivo,
                montoPagoEfectivo: montoPagoEfectivo,  

              //  montoTotalPagado: montoTotalPagado,

                numeroCheque: $("#id_cheque_numero").val(),
                numeroSerieCheque: $("#id_cheque_serie").val(),
                rutTitularCheque: $("#id_cheque_rut_titular").val(),
                telefonoTitularCheque: $("#id_cheque_telefono").val(),
                idBancoCheque: $("#id_cheque_banco").val(),   

               /* nombreTitular: null,
                nombreBanco: null,
                tipoTarjeta: null,
                numeroTargeta: null,
                numeroPagare: null,*/
            };

            // console.log(vm.pagos);
            console.log('vm.pago');
            console.log(vm.pago);
            console.log('pagoRow');
            console.log(vm.pagoRow);


        };

        vm.generaArrayInsert = function(){    

            var arrayLLenaParaInsert = [];

            console.log('vm.atencion.datotsPrestacionesInsert[0]ccccccc');
            console.log(vm.atencion.datotsPrestacionesInsert[0]);

            var rutTitularChequeNumero= "000000000";
            var rutTitularChequeDV= "0";

          /*  if(typeof vm.pago.medioPagoCheque == null){
                vm.pago.numeroCheque = 0;
                vm.pago.numeroSerieCheque 0;
                rutTitularChequeNumero= "000000000";
                rutTitularChequeDV= "0";
                vm.pago.telefonoTitularCheque = "00000000"

            }else{

                vm.pago.rutTitularCheque;

            }        */     


            var incrementa = 0; 
            angular.forEach(vm.atencion.datotsPrestacionesInsert[0],function(v,k){
                incrementa++
                arrayLLenaParaInsert.push(

                                            {           
                                                "urn:numeroBono":incrementa, // incrementa por bono numero interno de equipo
                                                "urn:totalPrestacion": vm.atencion.totalMontoComprobante[k],
                                                "urn:montoIsapres":vm.atencion.datosBonificacionTotales[k],
                                                "urn:montoSeguro":0,
                                                "urn:montoCaja":0,
                                                "urn:totalBonificacion":vm.atencion.datosBonificacionTotales[k], // despues este se cambia cundo este caja y seguro
                                                "urn:copago":vm.atencion.datosCopagoTotales[k],
                                                "urn:codigoAtencion":1,// 
                                                "urn:usoExcedente":0,
                                                "urn:numeroOperacion":vm.atencion.datosFolio[k], 
                                            },

                                            {
                                                "urn:montoEfectivo":vm.pago.montoPagoEfectivo,
                                                "urn:montoCheque":vm.pago.montoPagoCheque,
                                                "urn:montoExcedente":vm.pago.montoPagoExcedente,
                                                "urn:montoCCAF":"0",
                                                "urn:montoTarjetaCredito":"0",
                                                "urn:montoTarDebito":"0",
                                                "urn:montoISAPRES":vm.atencion.datosBonificacionTotales[k],
                                                "urn:montoSeguro":"0",
                                                "urn:montoCaja":"0",
                                                "urn:copago":vm.atencion.datosCopagoTotales[k],
                                                "urn:numeroPagare":"0",
                                                "urn:idBanco":"0",
                                                "urn:numeroCheque":"0",
                                                "urn:numeroSerieCheque":"0",
                                                "urn:rutTitularChequeNumero":"000000000",
                                                "urn:rutTitularChequeDV":"0",                           
                                                "urn:telefonoCheque":"0",         
                                            },
                         
                                            angular.forEach(v,function(vv,kk){

                                              
                                                 
                                            })  
 
                                        )// FIN -------------arrayLLenaParaInsert.push(
                            })
 

            var cargaDatosInsert =[];            
            var chunkInsert;
            var incrementaInsert = 0;

            while (arrayLLenaParaInsert.length > 0) {  //----while para modelar el array por cada 6 prestaciones

                chunkInsert = arrayLLenaParaInsert.splice(0,3);
                cargaDatosInsert[incrementaInsert] = chunkInsert;
               
                incrementaInsert++;
            }    
 
            vm.atencion.datosEnvioPrestacionesInsert.push(cargaDatosInsert);  

        };

        vm.confirmarPago = function () {
            vm.showPago = false;
            vm.showConfirmacion = true;
            vm.generaArrayInsert();
            vm.servicioMilliways.insertarAtencion();


            $state.go('ram.confirmacion');
            vm.atencion.datosUsuario = vm.datosSesion;
            vm.atencion.datosPago.tiposPago.push(vm.pago); 
            vm.atencion.datosAtencion.fecha = moment();
            vm.atencion.datosAtencion.tipoAtencion = vm.tipoAtencion;
            if (vm.tipoAtencion === 'PARTICULAR') {
                vm.atencion.datosAtencion.estadoAtencion = 'CONFIRMADA';
            } else {
                vm.atencion.datosAtencion.estadoAtencion = 'PAGADA';
            }

        };
 
        var $scope;  
        vm.seleccionTipoPago = function ($scope) { // funcion para lista desplegable de los tipos de pago
            
            vm.myDropDown = '0';
          

        }

 
        /**
         * Funcion que remueve el pago en la pantalla copago
         */
        vm.removePago = function (row) {

            var index = vm.agregaRowMediosPago.indexOf(row);
            if (index !== -1) {
                
                vm.agregaRowMediosPago.splice(index, 1);

            }

        };
        /**
         * funcion que calcula lo pendiente por pagar en vista TOTAL PENDIENTE
         */

        vm.totalPendiente = function () {
            var total = 0;
            var total_maximo = 0;
            angular.forEach(vm.agregaRowMediosPago, function (pago) {
                total += pago.monto;
                total_maximo += pago.monto;                
            });

            return vm.atencion.datosPago.totales.copago - total;


        };

        vm.totalPendienteExcedente = function () {
            var total = 0;
            angular.forEach(vm.pagos, function (pago) {
                total += pago.excedente;
            });

            return vm.atencion.datosPago.totales.copago - total;

        };



        /**
         * guarda la atencion
         */
        vm.guardarAtencion = function () {

            servicioData.save(vm.atencion).success(function (somedata) {
                console.log(somedata);
                console.log('guarde');
            }).error(function (data) {
                console.log(data);
                console.log('no guarde');
            });


 
           
   
  





        };
        /**
         * imprime la atencion
         */
        vm.print = function (printSectionId) {

            servicioData.envioEmail(vm.atencion).success(function (somedata) {
          
            }).error(function (data) {
           
            });
           // vm.guardarAtencion();


 



            $timeout($window.print, 0);

        };

        vm.validaCheque = function(){

          //  id_cheque_numero
       //   alert($scope.id_cheque_numero);
 

        };

        $timeout(function () {

            if(!vm.datosPaciente.nombre){
            

            //    $state.go('menu');

            }
       



            $('#cantidad').numeric();


            
            $scope.$watch(function () {
                return location.hash
            }, function (value) {

                  

                if(value == "#/ram"){

                    $('#cantidad').numeric();

                   /* $("#id_btn_valorizar_online").css("display","none");
                    $("#id_btn_pagar_online").css("display","none");*/
                    $("#gen_com").css("display","none");
                    $("#id_btn_pagar_online").css("display","block");
                    vm.agregaRowMediosPago = [];
                    vm.pago = {
                        monto: null,
                        numeroCheque: null, //TABLA PAGO_ATENCION_CHQ NUMERO_CHQ
                        numeroSerieCheque: null, //TABLA PAGO_ATENCION_CHQ NUMERO_SERIE
                        rutTitular: null, //TABLA PAGO_ATENCION_TAR RUT_TITULAR_TAR|| PAGO_ATENCION_CHQ RUT_TITULAR_CHQ
                        nombreTitular: null, //NO SE GUARDA
                        codigoBanco: null, //TABLA PAGO_ATENCION_TAR BANCO_ID|| PAGO_ATENCION_CHQ BANCO_ID
                        nombreBanco: null, //NO SE GUARDA
                        tipoTarjeta: null, //TABLA PAGO_ATENCION_TAR TARJETA_ID
                        numeroTargeta: null, //TABLA PAGO_ATENCION_TAR NUMERO_TAR
                        numeroPagare: null, // TABLA PAGO_ATENCION NO CREADO
                        telefonoTitular: null, //TABLA PAGO_ATENCION_TAR TE


                    };
                 //  vm.atencion.datosPrestacionesComprobante = [];
                    console.log(vm.pago);
                                             console.log(vm.atencion.datosPrestacionesComprobante[0]);

                                                                      console.log(vm.atencion.datosPrestaciones);
 
                }

                if(value == "#/ram/pago"){

                    $("#gen_com").css("display","block");
                    $("#id_btn_pagar_online").css("display","none");

                    $('#monto_efectivo').numeric();  
                    $('#id_cheque_numero').numeric();  
                    $('#id_cheque_serie').numeric(); 

                    $('#id_cheque_monto').numeric();


                    $('#monto_excedente').numeric(); 
                          
                } 

                /*    $("#id_btn_valorizar_online").css("display","none");
                    $("#id_btn_pagar_online").css("display","none");
                    $("#gen_com").css("display","block");*/


                                                             
                                 

                 
          
            });



         
        console.log(vm.state);

            var hash = location.hash;
                console.log(hash);





            }

        );

        /**
         * llamada a funcion que inicializa el controlador
         */
        init();
    }
})();
