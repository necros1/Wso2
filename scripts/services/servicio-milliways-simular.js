

//'use strict';

/**
 * @ngdoc service
 * @name medipassBE.servicioMilliways
 * @description
 * # servicioMilliways
 * Service in the medipassBE.
 */
angular.module('medipassBE')
  .service('servicioMilliwaysSimular', function ($stateParams,$state,servicioLocal,$timeout,$localStorage) {

    var  vm = this;
    vm.servicioLocal = servicioLocal;
    vm.atencion = servicioLocal.atencion;
    vm.datosPaciente = servicioLocal.datosPaciente;
    vm.datosSesion = servicioLocal.datosSesion;      
    vm.$state = $state;
    vm.$stateParams = $stateParams; 
    vm.datosMensaje = servicioLocal.datosMensaje;


    
    var url = "http://bem.openpartner.cl/bono/bono_electronico_v2";
  
      var incremento = 0;
    this.consultaAtencion = function(){

      var pl = new SOAPClientParameters(); 
            pl.add("urn:offset", "0");
            pl.add("urn:length", "1000");
            pl.add("urn:idRazonSocial", "2");
            pl.add("urn:idSucursal", "15");
            pl.add("urn:idLugarAtencion","18");

   // alert(incremento++);

            SOAPClient.invoke(url, "consultaAtencion", pl, true,callBackConsultaAtencion);    
    };

    function callBackConsultaAtencion(u){

      console.log(u);
      var cargaDatos = {};
      var cargaDatos2 = [];
      var valor_disabled;

      $.each(u,function(k,v){ 


        var str = v["ns:nombreTipoAtencion"];
        var res = str.split("_");

 
  
        valor_disabled = res[1] == 7 ? true : false;
        valor_clase = res[1] == 7 ? 'roj-roj' : 'gri-gri';

       cargaDatos2 = { 
                      idAtencion:v["ns:idAtencion"],
                      disabled : valor_disabled,
                      fechaHoraBono : v["ns:fechaHoraBono"],
                      valor_clase : valor_clase,
                      fecha_bono_unix :  moment(v["ns:fechaHoraBono"]).unix(),
                      estadoAtencionId : res[1],

                      planGrupo : v["ns:planGrupo"],
                      numeroBono : v["ns:numeroBono"],
                      montoIsapres : v["ns:montoIsapres"],
                      montoSeguro : v["ns:montoSeguro"],
                      montoCaja : v["ns:montoCaja"],
                      totalBonif : v["ns:totalBonif"],
                      totalPresta : v["ns:totalPresta"],
                      copago : v["ns:copago"],
                      usoExcedente : v["ns:usoExcedente"],

                      rutAfiliado : v["ns:rutAfiliado"]["ns:numero"]+"-"+v["ns:rutAfiliado"]["ns:dv"],
                       
                      nombreAfiliado : v["ns:nombreAfiliado"],
                      apellidoAfiliado : v["ns:apellidoAfiliado"],
                      rutBeneficiario : v["ns:rutBeneficiario"]["ns:numero"]+"-"+v["ns:rutBeneficiario"]["ns:dv"],

                      nombreBeneficiario : v["ns:nombreBeneficiario"],
                      codigoAtencion : v["ns:codigoAtencion"],
                      idEstatus : v["ns:idEstatus"],
                      idRazonSocial : v["ns:idRazonSocial"],
                      rutRazonsocial : v["ns:rutRazonsocial"]["ns:numero"]+"-"+v["ns:rutRazonsocial"]["ns:dv"],
                       

                      nombreFantasia : v["ns:nombreFantasia"],
                      nombreRazonsocial : v["ns:nombreRazonsocial"],

                      nombreLugaratencion : v["ns:nombreLugaratencion"],

                      nombreSucursal : v["ns:nombreSucursal"],

                      tipoAtencionId : v["ns:tipoAtencionId"],

                      nombreTipoAtencion : res[0],

                      nombreMedico : v["ns:nombreMedico"],

                      rutMedico : v["ns:rutMedico"]["ns:numero"]+"-"+v["ns:rutMedico"]["ns:dv"],
                       
                      isapre : v["ns:isapre"],

                      seguro : v["ns:seguro"],

                      caja : v["ns:caja"],                                   

                    }
             

        cargaDatos[k] = cargaDatos2 ;



      });

      //vm.servicioLocal.consultaVentas = [];


      vm.servicioLocal.consultaVentas.push(cargaDatos);

      console.log('------------------------vm.servicioLocal.consultaVentas------------------------------------');

      console.log(cargaDatos);
    /*  $localStorage.consultaVentas.$reset(vm.servicioLocal.consultaVenta);

    console.log('$localStoragexxxxxxxxxxxxx');
    console.log($localStorage);
    $localStorage.consultaVentas =  vm.servicioLocal.consultaVentas;*/
    }

    this.insertarAtencion = function (){


      var pl = new SOAPClientParameters();
      var tipoAtencion;
      var idTipoAtencion;
      var resultadoFechaPapciente;

      switch (vm.atencion.datosAtencion.tipoAtencion) {

          case 'PARTICULAR':
              {
                  tipoAtencion = "tipoAtencionParticular";
                  resultadoFechaPapciente = "19960909";
                  vm.atencion.datosIsapre.plan = "0";
                  vm.servicioLocal.datosPaciente.rutCotizante = "00000000-0";
                  vm.servicioLocal.datosPaciente.nombreCotizante = "N";
                  vm.servicioLocal.datosPaciente.sexo = "genderUnspecified";
                  vm.servicioLocal.datosPaciente.direccionCalleBeneficiario = "N";
                  vm.servicioLocal.datosPaciente.direccionCiudadBeneficiario = "N";
                  vm.servicioLocal.datosPaciente.rutAcompanante = "00000000-0";
                  vm.servicioLocal.datosPaciente.nombreAcompanante = "N";

                  idTipoAtencion = 3;
                  break;
              }

          case 'ONLINE':
              {
                  tipoAtencion = "tipoAtencionBonificada";
                  idTipoAtencion = 1;


                  resultadoFechaPapciente = vm.servicioLocal.datosPaciente.fechaNacimientoBeneficiario.replace("-", "");
                  resultadoFechaPapciente = resultadoFechaPapciente.replace("-", "");
                  resultadoFechaPapciente=resultadoFechaPapciente.substring(0,8); 


                  break;      
              }

      } 
 
 
       pl.add("urn:tipoAtencion",tipoAtencion);
       pl.add("urn:idConvenio","1");
       pl.add("urn:idLugarAtencion",vm.datosSesion.lugarAtencionId);
      // pl.add("urn:idLugarAtencion","18");
       pl.add("urn:planGrupo",vm.atencion.datosIsapre.plan);// ver por que no carga este valor

        pl.add("urn:rutAfiliado",vm.servicioLocal.datosPaciente.rutCotizante); 
      // pl.add("urn:rutAfiliado","19371029-8"); 
            
       pl.add("urn:nombreAfiliado",vm.servicioLocal.datosPaciente.nombreCotizante);
       pl.add("urn:rutBeneficiario",vm.servicioLocal.datosPaciente.rut);

       pl.add("urn:apellidosBeneficiario",vm.servicioLocal.datosPaciente.apellidoPaterno + vm.servicioLocal.datosPaciente.apellidoMaterno );
       pl.add("urn:nombresBeneficiario",vm.servicioLocal.datosPaciente.nombre);
       pl.add("urn:idEstatus","1"); // en base de datos  tabla estatus 1 = ACTIVO  ¿ Cual es la logica , puede aver otro estado?
       pl.add("urn:idTipoAtencion",idTipoAtencion);


       pl.add("urn:numeroCaja","1");
       pl.add("urn:idUsuario",vm.datosSesion.idUsuario);
       //pl.add("urn:idUsuario","1");       
       pl.add("urn:sexo",vm.servicioLocal.datosPaciente.sexo);
       pl.add("urn:fechaNacimiento",resultadoFechaPapciente);
     
       pl.add("urn:direccion",vm.servicioLocal.datosPaciente.direccionCalleBeneficiario);

       pl.add("urn:ciudad", vm.servicioLocal.datosPaciente.direccionCiudadBeneficiario);
       pl.add("urn:rutAcompaniante",vm.servicioLocal.datosPaciente.rutAcompanante);
       pl.add("urn:nombreAcompaniante",vm.servicioLocal.datosPaciente.nombreAcompanante);
       pl.add("urn:telefono","85596300"); // este dato biene de un campo de texto ,por mientras
       pl.add("urn:descripcionEstadoBeneficiarioIsapre","C");
       pl.add("urn:tratamientoMedico","NO"); //ok 
       pl.add("urn:codigoDiagnostico","?");  //???????????????
       pl.add("urn:urgencia","NO");// esta bien simepre es no
       pl.add("urn:codigoEstatusBeneficiarioSeguro","1");  //??????????   */  
        
        pl.add("urn:atencion",vm.atencion.datosEnvioPrestacionesInsert[0]); 
 

        console.log(vm.atencion.datosEnvioPrestacionesInsert[0]);

        SOAPClient.invoke(url, "insertarAtencion", pl, true,function(u){ 
                                                                          $.each(u,function(k,v){

                                                                            vm.atencion.datosIdAtencion[k] =  v["ns:idAtencion"];

                                                                          }) 

                                                                          if(vm.atencion.datosAtencion.tipoAtencion == "PARTICULAR"){ // si es atencionparticular se activa el boton imprimir
                                                                                                                                       // y no ocupa el servicio enviarBono 

                                                                            $("#id_imprimir_bono").attr("disabled",false);
                                                                            $("#id_enviar_mail_bono").attr("disabled",false);                                                                             
                                                                           // vm.servicioLocal.limpiaDatosAtencion();
                                                                            $("#imprimir_bono").css("display","block");
                                                                            $("#confirmar_envio_bono").css("display","none");


                                                                          }

                                                                         //   enviarBono();

                                                                        }); 





 

                    this.consultaAtencion();

//console.log(vm.servicioLocal.consultaVentas);
    };



vm.enviarBono = function(){

                                     
              console.log('------------------------------generaArrayEnvioBonoFinal()-------------------------------------------');

              console.log('datosFolio');
              console.log(vm.atencion.datosFolio);
              console.log('datosIdAtencion');
              console.log('------------------------------FIN eneraArrayEnvioBonoFinal()-------------------------------------------'); 
                         
                          var arrayLLenaParaEnvioBono = [];               
                          var incrementaBono = 0; 

                          angular.forEach(vm.atencion.datosCargaEnvioBono[0],function(v,k){
                              incrementaBono++
                              arrayLLenaParaEnvioBono.push(

                                                            {                             
                                                              "urn:idAtencion":vm.atencion.datosIdAtencion[k],
                                                              "urn:folioFinanciador":vm.atencion.datosFolio[k],
                                                              "urn:numeroOperacion":"1",
                                                              "urn:montoValorTotal":"13830",
                                                              "urn:montoAporteTotal":"9681",
                                                              "urn:montoCopagoTotal":"3657",
                                                            //  "urn:montoExcedente":vm.atencion.datosPago.totales.montoPagoExcedente,                                                             
                                                              "urn:montoExcedente":vm.servicioLocal.atencion.totalExedenteComprobante[k],
                                                              "urn:correlativoPrestacion":"1",
                                                              "urn:tipoSolicitud":"tipoSolicitudPrograma",    
                                                            },
                                         
                                                            angular.forEach(v,function(vv,kk){
                                                            
                                                              
                                                                 
                                                            })  
               
                                                        )
                                          })
               

                              var cargaDatosEnvioBono =[];            
                              var chunkEnvioBono;
                              var incrementaEnvioBono = 0;
                           


                              while (arrayLLenaParaEnvioBono.length > 0) {  //----while para modelar el array por cada 6 prestaciones

                                  chunkEnvioBono = arrayLLenaParaEnvioBono.splice(0,2);
                                  cargaDatosEnvioBono[incrementaEnvioBono] = chunkEnvioBono;
                                 
                                  incrementaEnvioBono++;
                              }    

                      var d = new Date();
                      var fecha = ""+("0" + d.getDate()).slice(-2)+("0" + d.getMonth()).slice(-2) + d.getFullYear()+""; 
                      //console.log(vm.servicioLocal.numeroConvenio+"-"+vm.servicioLocal.lugarConvenio+"-"+vm.servicioLocal.sucursalVenta+"-"+vm.servicioLocal.rutConvenio+"-"+vm.servicioLocal.rutMedico);
 
 
                      var ArrayfechaInicio =vm.datosSesion.fechaServidor.split("-");
                      var  fechaInicio =  ArrayfechaInicio[0]+ArrayfechaInicio[1]+ArrayfechaInicio[2];
         
                      var pl = new SOAPClientParameters();
   

                    if(!vm.datosSesion.rutAcompaniante){

                        vm.datosSesion.rutAcompaniante = "000000000-0"

                    }



                  
                      pl.add("urn:fechaEmision",fechaInicio);
                       // pl.add("urn:fechaEmision",fecha);
                      pl.add("urn:numeroConvenio",vm.servicioLocal.numeroConvenio);
                      pl.add("urn:lugarConvenio",vm.servicioLocal.lugarConvenio);
                      pl.add("urn:sucursalVenta",vm.servicioLocal.sucursalVenta);
                      pl.add("urn:rutConvenio",vm.servicioLocal.rutConvenio);
                      pl.add("urn:rutAsociado",vm.datosSesion.razonSocialRut); 
                      pl.add("urn:nombrePrestador",vm.datosSesion.nombreRazonSocialSucursal);

                      if(vm.servicioLocal.codigoEspecialidad == "GOB"){

                        pl.add("urn:rutTratante",vm.servicioLocal.rutMedico);    

                      }else{
                        
                        pl.add("urn:rutTratante",vm.servicioLocal.rutConvenio);

                      }

                      pl.add("urn:especialidad",vm.servicioLocal.codigoEspecialidad);
                      pl.add("urn:rutBeneficiario",vm.servicioLocal.datosPaciente.rut);      
                      pl.add("urn:rutCotizante",vm.servicioLocal.datosPaciente.rutCotizante);        
                      pl.add("urn:rutAcompaniante",vm.datosSesion.rutAcompaniante); 
                      pl.add("urn:rutEmisor","0084655500-5");    
                      pl.add("urn:rutCajero",vm.datosSesion.rutCajero);
                      pl.add("urn:codigoDiagnostico","?");
                      pl.add("urn:descuentoPorPlanilla","1");
                      pl.add("urn:nivelconvenio",vm.servicioLocal.numeroConvenio);
                      pl.add("urn:urgencia","1");
                      pl.add("urn:planGrupo",vm.atencion.datosIsapre.plan);
                      pl.add("urn:fechaInicio",fechaInicio); //vm.datosSesion.fechaHoraServidor 


                      
                      pl.add("urn:bonificaciones",cargaDatosEnvioBono);


                      SOAPClient.invoke(url,"enviarBono",pl, true,function(u){ 
 
                                                                          if(u[0]["ns:responseCode"] == "0"){

                                                                            $("#id_imprimir_bono").attr("disabled",false);
                                                                            $("#id_enviar_mail_bono").attr("disabled",false);                                                                             
                                                                             // vm.servicioLocal.limpiaDatosAtencion();
                                                                             $("#imprimir_bono").css("display","block");
                                                                             $("#confirmar_envio_bono").css("display","none");

                                                                              
                                                                          }



                                                                  }); 


              };
 
    function  consultaMedicoEspecialidadPrestacion()
      {
        var pl = new SOAPClientParameters(); 
        pl.add("urn:idLugarAtencion", vm.datosSesion.lugarAtencionId);   
        SOAPClient.invoke(url, "consultaMedicoEspecialidadPrestacion", pl, true,function(u){
          var medicos = [];
          var prestaciones = [];
          var codigoEspecialidad = [];         
          var todos = [];


         console.log(todos);
          $.each(u,function(key,v){

            if(v["ns:idMedico"]){

              var dataMedicos = {  
                            id : v["ns:idMedico"], 
                            apellidoMaternoMedico : v["ns:apellidoMaternoMedico"],
                            apellidoPaternoMedico : v["ns:apellidoPaternoMedico"], 
                            codigoEspecialidad : v["ns:codigoEspecialidad"],
                            codigoMedico : v["ns:codigoMedico"],
                            idEspecialidad :v["ns:idEspecialidad"],
                            idMedico :v["ns:idMedico"],
                            nombreEspecialidad : v["ns:nombreEspecialidad"],
                            nombreMedico : v["ns:nombreMedico"] +" "+ v["ns:apellidoPaternoMedico"],
                            rutMedico : v["ns:rutMedico"]["ns:numero"]+"-"+v["ns:rutMedico"]["ns:dv"],

                          };

              var dataEspecialidad = {  
                        
                          
                            codigoEspecialidad : v["ns:codigoEspecialidad"],
                            codigoMedico : v["ns:codigoMedico"],
                            idEspecialidad :v["ns:idEspecialidad"],
                            idMedico :v["ns:idMedico"],
                            nombreEspecialidad : v["ns:nombreEspecialidad"],
                          

                          };



              medicos[key]  = dataMedicos; 

              codigoEspecialidad[key]  = dataEspecialidad; 

            }   
          

          });
          
          vm.servicioLocal.medicos = medicos;
          vm.servicioLocal.ArraycodigoEspecialidad  = codigoEspecialidad;
 
         var rutConvenio;
          $.each(u,function(k,v){


              if(!v["ns:numeroConvenio"]){
        
                  rutConvenio = 0;

              }else{

                  rutConvenio = v["ns:rut-convenio"]["ns:numero"]+"-"+v["ns:rut-convenio"]["ns:dv"];

              }

            
               
              //var nombrePrestacionLimit = v["ns:nombrePrestacion"];   

              //nombrePrestacionLimit = nombrePrestacionLimit.substring(0,10);
 
              var dataPrestacion = {     


             
   
                id : v["ns:idPrestacion"],  
                codigoHomologo: v["ns:codigoHomologo"],
                codigoPrestacion: v["ns:codigoPrestacion"],
                idEntidad: v["ns:idEntidad"],
                idPrestacion: v["ns:idPrestacion"],
                lugaratencionHomologo: v["ns:lugaratencionHomologo"],
                nombrePrestacion: v["ns:nombrePrestacion"],
                numeroConvenio: v["ns:numeroConvenio"],
                precioBase: v["ns:precioBase"],
                precioLugarAtencion: v["ns:precioLugarAtencion"],
                precioPrestacion: v["ns:precioPrestacion"],
                recargoHoraDesde: v["ns:recargoHoraDesde"],
                recargoHoraHasta: v["ns:recargoHoraHasta"],
                recargoMonto: v["ns:recargoMonto"],
                recargoPorcentaje: v["ns:recargoPorcentaje"],
                rutConvenio: rutConvenio,
                sucursalHomologo: v["ns:sucursalHomologo"]


              } 

              prestaciones[k] =  dataPrestacion;

          });         

         // console.log( prestaciones);

              vm.servicioLocal.prestaciones = prestaciones;


        });

      };
      this.buscarEntidadesRutBeneficiario = function (rut){


            var pl = new SOAPClientParameters();

            var d = new Date();
            pl.add("urn:rutBeneficiario", rut); // nombre de variable debe ser igual a la del nodo del xml ("urn:rutBeneficiario" => <urn:rutBeneficiario>)
                                                          // el valor de  cualquier rut va completo la clase soapclient.js en el metodo this.toXml se encarga de 
                                                         // generar y  dividir el numero y el dijito verificador y crea la estructura de el nodo xml con el cual estamos trabajando : 
                                                         // <urn:rutBeneficiario>
                                                         //   <urn:numero>0010179892</urn:numero>
                                                         //   <urn:dv>5</urn:dv>
                                                         // </urn:rutBeneficiario>

         //   pl.add("urn:fechaActual",("0" + d.getDate()).slice(-2)+("0" + d.getMonth()).slice(-2) + d.getFullYear());
         //  pl.add("urn:fechaActual","04032016");
           // RUT BENEFICIARIO INVALIDO

            SOAPClient.invoke(url, "buscarEntidadesRutBeneficiario", pl, true,function (u)
            {
                  if(u == null){

                    alert("Sin respuesta de Servicio");
                                     
                  // $("#Modal1").modal('show');  
                  }else if(u["ns:responseDescription"] == "RUT BENEFICIARIO INVALIDO"){

 
                    $("#contenido_mensaje").html(vm.servicioLocal.datosMensaje.rut_invalido); 
                    $("#Modal1").modal('show'); 
   

                  }else if(u["ns:responseDescription"] == "BENEFICIARIO NO TIENE ISAPRE"){

                        $("#contenido_mensaje").html(""); 
                        $("#contenido_mensaje").html(vm.servicioLocal.datosMensaje.rut_no_afiliado); 
                        $("#alerta_mensajes").addClass("b_0");
                        $("#Modal1").modal('show'); 

                        if($("#id_rut_nuevoOantiguo").text() == "nuevo"){ // valor si el rut es nuevo 

                          $("#NombreBeneficiario").attr("disabled",false);

                          var apellidos = $("#apellido_login").text();
                          apellidos = apellidos.split(" ");

                          servicioLocal.pushDatosPaciente( { 

                            nombre: $("#nombre_login").text(),
                            apellidoPaterno: apellidos[0],
                            apellidoMaterno: apellidos[1],
                            rut: $("#campo_texto_rut-paciente").val(),
                            nombre: $("#nombre_login").text(),
                            bonificaion : false,

                          });

                        }

                        if($("#id_rut_nuevoOantiguo").text() == "antiguo"){ // valor si el rut es nuevo 

                          var apellidos = $("#apellido_login").text();
                          apellidos = apellidos.split(" ");

                          servicioLocal.pushDatosPaciente( { 

                            nombre: $("#apellido_login").text(),
                            apellidoPaterno: $("#apellido_login").text(),
                            apellidoMaterno: $("#apellido_login").text(),
                            rut: $("#campo_texto_rut-paciente").val(),
                            bonificaion : false,

                          });

                        }                        


                        return  vm.$state.go(vm.$stateParams.nombreOpcion); 

                        }else{ // trae datos del servicio ---------------------------------

                          var cargaDatos = {};
                            $.each(u,function(k,v){ 

                                var res = k.replace("-", "_");
                                var res = res.replace("-", "_");            
                                var res = res.replace("ns:", "");

                                cargaDatos[res] = v;
                            });
                            //formo los rut
           
                            var rutAcompanante;
                            var nombreAcompaniante;
           
                            if(cargaDatos.rutAcompanante["ns:numero"] == 0){ 
                             
                              rutAcompanante = "00000000-0";
                              nombreAcompaniante = "?";

                            }else{
                            
                              var rutAcompanante = cargaDatos.rutAcompanante["ns:numero"]+"-"+cargaDatos.rutAcompanante["ns:dv"]; 
                              nombreAcompaniante = cargaDatos.nombreAcompanante; 

                            } 


                            var rutCotizante = cargaDatos.rutCotizante["ns:numero"]+"-"+cargaDatos.rutCotizante["ns:dv"];

                            // Fin ------------formo los rut  

                            vm.servicioLocal.atencion.datosTitular.rut = rutCotizante;
                            
           
                            //Agrego variebles de paciente            
                              servicioLocal.pushDatosPaciente(
                              {  
                                nombre: cargaDatos.nombresBeneficiario,
                                apellidoPaterno: cargaDatos.apellidoPaternoBeneficiario ,
                                apellidoMaterno: cargaDatos.apellidoMaternoBeneficiario ,
                                rut: $("#campo_texto_rut-paciente").val(),
                               
                                codigoEstadoBeneficiario: cargaDatos.codigoEstadoBeneficiario,
                                codigoSeguro  : cargaDatos.codigoSeguro,
                                descuentoPorPlanilla : cargaDatos.descuentoPorPlanilla,
                                direccionCalleBeneficiario : cargaDatos.direccionCalleBeneficiario,              
                                direccionCiudadBeneficiario : cargaDatos.direccionCiudadBeneficiario,
                                direccionComunaBeneficiario : cargaDatos.direccionComunaBeneficiario,
                                fechaNacimientoBeneficiario : cargaDatos.fechaNacimientoBeneficiario,
                                isapre : cargaDatos.isapre,
                                montoExcedente : cargaDatos.montoExcedente,
                                nombreAcompanante : nombreAcompaniante,
                                
                                previsionBeneficiario : cargaDatos.previsionBeneficiario,
                                
                                rutAcompanante : rutAcompanante,
                                rutCotizante : rutCotizante,
                                nombreCotizante: cargaDatos.nombreCotizante,
                                
                                seguro : cargaDatos.seguro,
                                sexo : cargaDatos.sexo,
                                bonificaion : true,

                              });
                              if(vm.$stateParams.nombreOpcion == 'simulacion' ){

                                return  vm.$state.go("ramsimulacion"); 

                              }else{
                                return  vm.$state.go(vm.$stateParams.nombreOpcion);  
                              }
 

    
                        } // FIN  trae datos del servicio ---------------------------------------------
  
               
                

                           
            });

      };
      
    vm.segundosGloval;
    vm.minutosGloval;
    vm.horaGloval;

      function timedCount(segundo,minuto,hora) {

          segundo++;
 
          if(segundo == 60){

              segundo = 0;
              minuto++
              if(minuto == 60){

                  minuto = 0;
                  hora++;
                  if (hora==24){

                      hora = 0;
                  }
              }

          }
          setTimeout(function(){ timedCount(segundo,minuto,hora) }, 1000);

          vm.segundosGloval = segundo;
          vm.minutosGloval = minuto;
          vm.horaGloval = hora;

       
     // console.log(hora +":"+ minuto +":"+segundo);
         
      }


      this.validarSupervisor = function (rut){

        //    var mac = "94-65-9C-1C-FB-56";
            var pl = new SOAPClientParameters();
           // pl.add("urn:rutUsuario","25034824-K");
            pl.add("urn:rutUsuario",rut);             
            pl.add("urn:macEquipo",rut);
 
            SOAPClient.invoke(url, "validarUsuario", pl, true,function (u)
            {
                if(u == null){
                
                    alert("Sin respuesta de Servicio");
                }else if(u["ns:responseDescription"] == "RUT BENEFICIARIO INVALIDO"){

 
                    $("#contenido_mensaje").html(vm.servicioLocal.datosMensaje.rut_invalido); 
                    $("#Modal1").modal('show'); 
   

                }else{          

                var cargaDatos = {};
                $.each(u,function(k,v){ 

                    var res = k.replace("-", "_");
                    var res = res.replace("-", "_");            
                    var res = res.replace("ns:", "");

                    cargaDatos[res] = v;
                });

                    if(cargaDatos.idUsuario == 21){

                      var esSupervisor = true;

                    }else{

                      var esSupervisor = false;  

                    }
      
                    var datosSupervisor =  {

                        usuarioNroCaja :cargaDatos.numeroCaja,

                        lugarAtencionId: cargaDatos.idLugarDeAtencion,

                        lugarAtencionNombre: cargaDatos.nombreLugarDeAtencion,

                        razonSocialRut: cargaDatos.rutRazonSocialSucursal['ns:numero']+"-"+cargaDatos.rutRazonSocialSucursal["ns:dv"],

                        nombreRazonSocialSucursal : cargaDatos.nombreRazonSocialSucursal,

                        nombreSucursal : cargaDatos.nombreSucursal,                 

                        sucursalId: cargaDatos.idSucursal,

                        usuarioNombreCompleto: cargaDatos.nombreUsuario + " " +cargaDatos.apellidoPaternoUsuario + " " +cargaDatos.apellidoMaternoUsuario,

                        fechaHoraServidor : cargaDatos.fechaHoraServidor,

                        horaServidor : cargaDatos.fechaHoraServidor.substring(11,19), 

                        fechaServidor : cargaDatos.fechaHoraServidor.substring(0,10),
                        
                        horarioRecargoDesde : cargaDatos.hora_recargo_desde,

                        horarioRecargoHasta : cargaDatos.hora_recargo_hasta,

                        sucursalId : cargaDatos.idSucursal,

                        descripcionPerfilUsuario: cargaDatos.descripcionPerfilUsuario,

                        idPerfilUsuario:cargaDatos.idPerfilUsuario,

                        idRazonSocialSucursal: cargaDatos.idRazonSocialSucursal,

                        idUsuario : cargaDatos.idUsuario,

                        monto_recargo : cargaDatos.monto_recargo,

                        porcentaje_recargo : cargaDatos.porcentaje_recargo,
             
                        rolPerfilUsuario : cargaDatos.rolPerfilUsuario,
             
                        rutCajero : $("#campo_texto_rut_supervisor").val(),

                        esSupervisor : esSupervisor,
                      }

  
                    servicioLocal.datosSupervisor.push(datosSupervisor);


                        
                }
                
          
                           
            });

      };

      this.validarUsuario = function (rut){

        //    var mac = "94-65-9C-1C-FB-56";
            var pl = new SOAPClientParameters();
           // pl.add("urn:rutUsuario","25034824-K");
            pl.add("urn:rutUsuario",rut);             
            pl.add("urn:macEquipo",rut);
            consultaMensaje();
            SOAPClient.invoke(url, "validarUsuario", pl, true,function (u)
            {
                if(u == null){
                
                    alert("Sin respuesta de Servicio");
                }else if(u["ns:responseDescription"] == "RUT BENEFICIARIO INVALIDO"){

 
                    $("#contenido_mensaje").html(vm.servicioLocal.datosMensaje.rut_invalido); 
                    $("#Modal1").modal('show'); 
   

                }else{          

                var cargaDatos = {};
                $.each(u,function(k,v){ 

                    var res = k.replace("-", "_");
                    var res = res.replace("-", "_");            
                    var res = res.replace("ns:", "");

                    cargaDatos[res] = v;
                });

                var cargaRut = [];
   
      
                    var datosSesion =  {

                        usuarioNroCaja :cargaDatos.numeroCaja,

                        lugarAtencionId: cargaDatos.idLugarDeAtencion,

                        lugarAtencionNombre: cargaDatos.nombreLugarDeAtencion,

                        razonSocialRut: cargaDatos.rutRazonSocialSucursal['ns:numero']+"-"+cargaDatos.rutRazonSocialSucursal["ns:dv"],

                        nombreRazonSocialSucursal : cargaDatos.nombreRazonSocialSucursal,

                        nombreSucursal : cargaDatos.nombreSucursal,                 

                        sucursalId: cargaDatos.idSucursal,

                        usuarioNombreCompleto: cargaDatos.nombreUsuario + " " +cargaDatos.apellidoPaternoUsuario + " " +cargaDatos.apellidoMaternoUsuario,

                        fechaHoraServidor : cargaDatos.fechaHoraServidor,

                        horaServidor : cargaDatos.fechaHoraServidor.substring(11,19), 

                        fechaServidor : cargaDatos.fechaHoraServidor.substring(0,10),
                        
                        horarioRecargoDesde : cargaDatos.hora_recargo_desde,

                        horarioRecargoHasta : cargaDatos.hora_recargo_hasta,

                        sucursalId : cargaDatos.idSucursal,

                        descripcionPerfilUsuario: cargaDatos.descripcionPerfilUsuario,

                        idPerfilUsuario:cargaDatos.idPerfilUsuario,

                        idRazonSocialSucursal: cargaDatos.idRazonSocialSucursal,

                        idUsuario : cargaDatos.idUsuario,

                        monto_recargo : cargaDatos.monto_recargo,

                        porcentaje_recargo : cargaDatos.porcentaje_recargo,
             
                        rolPerfilUsuario : cargaDatos.rolPerfilUsuario,
             
                        rutCajero : $("#id_rut_apertura_caja").html(),
                      }



   
                    //  datosSesion.fechaServidor;
         
                    var segMinHor = datosSesion.horaServidor.split(":");

                    var segundo = segMinHor[2];
                    var minuto = segMinHor[1];
                    var hora = segMinHor[0];
                      
                    var fechaHora = new Date();
                    var horasDate = fechaHora.getHours();
                    var minutosDate = fechaHora.getMinutes();
                    var segundosDate = fechaHora.getSeconds();



                    //console.log("hora servidor " +hora +":"+ minuto +":"+segundo);

                  //  console.log("hora local " +horasDate +":"+ minutosDate +":"+segundosDate);

                    timedCount(segMinHor[2],segMinHor[1],segMinHor[0]);


                  //  console.log(datosSesion.fechaHoraServidor);
                    servicioLocal.pushDatosSesion(datosSesion);
                    consultaMedicoEspecialidadPrestacion(); 
         
                 //     localStorage.setItem("savedData", JSON.stringify(datosSesion)); 
                   

                      return    vm.$state.go('aperturaCaja');
                        
                }
                
          
                           
            });

      };


   
    this.valorizarPrestaciones = function () {
             console.log('vm.servicioLocal.datosPaciente         valorizarPrestaciones ');      
             console.log(vm.servicioLocal.datosPaciente);
 
    //      console.log("Hora relojito =>"+vm.horaGloval +":"+ vm.minutosGloval +":"+vm.segundosGloval);
 //console.log('vm.atencion.datosPrestacionesValorizar');
 

            var prestacionesTotales = [];


            var unixRelojito =  moment(vm.datosSesion.fechaServidor+vm.horaGloval +":"+ vm.minutosGloval +":"+vm.segundosGloval).unix();

            angular.forEach(vm.atencion.datosPrestacionesValorizar,function(v,k){

                if(v.unixDesde >= unixRelojito || v.unixHasta <= unixRelojito ){
      
                  var recargoFueraHorario = 1;

                 }else{

                  var recargoFueraHorario = 0;

                }

                var prestaciones = {
                  "urn:codigo":"0000"+v.codigo,
                  "urn:tipo":0,
                  "urn:codigoAdicional":"0"+v.codigo,
                  "urn:recargoFueraHorario":recargoFueraHorario,
                  "urn:cantidad":"0"+v.cantidad,
                  "urn:valor":"000000000000",
                }

                prestacionesTotales.push(prestaciones);


            });

            vm.horaGloval = 0;
            vm.minutosGloval = 0;
            vm.segundosGloval = 0;
 
        vm.cargaDatos = {};

        var pl = new SOAPClientParameters();

            pl.add("urn:isapre","isapreConsalud");
            pl.add("urn:seguro","0");
            pl.add("urn:caja","0");
        //    pl.add("urn:numeroConvenio",vm.form.prestacion.selected.numeroConvenio);
            pl.add("urn:numeroConvenio",vm.servicioLocal.numeroConvenio);
            pl.add("urn:lugarConvenio",vm.servicioLocal.lugarConvenio);
            pl.add("urn:sucursalVenta",vm.servicioLocal.sucursalVenta);
            pl.add("urn:rutConvenio",vm.servicioLocal.rutConvenio);   


            if(vm.servicioLocal.codigoEspecialidad == "GOB"){

              pl.add("urn:rutTratante",vm.servicioLocal.rutMedico);    

            }else{
              
              pl.add("urn:rutTratante",vm.servicioLocal.rutConvenio);

            }


         
         /*   pl.add("urn:rutTratante","0084655500-5");*/
            pl.add("urn:especialidadTratante",vm.servicioLocal.codigoEspecialidad);
            pl.add("urn:rutSolicitante",vm.servicioLocal.datosPaciente.rutCotizante);    //toc      
              
            pl.add("urn:rutBeneficiario",vm.servicioLocal.datosPaciente.rut);
           //  pl.add("urn:rutBeneficiario",vm.datosPaciente.rut);        
            pl.add("urn:tratamiento","N");
            pl.add("urn:codigoDiagnostico","");
            pl.add("urn:nivelConvenio","1");
            pl.add("urn:urgencia","0");



            pl.add("urn:prestaciones",prestacionesTotales);
  
       
            SOAPClient.invoke(url, "valorizarPrestacion", pl, true,function (u)
                {
                
                    if (/PRESTACION [0-9]* YA EMITIDA/.test(u[1])){

                        $("#alerta_mensajes").addClass("b_0");
                        $("#contenido_mensaje").html("");                         
                        $("#contenido_mensaje").html(u[1]); 
                        $("#Modal1").modal('show');

                        return

                    }   

                    if ("ERROR EN RESPUESTA CONSALUD" == u[1]){

                        $("#alerta_mensajes").addClass("b_0");
                        $("#contenido_mensaje").html("");                         
                        $("#contenido_mensaje").html(vm.servicioLocal.datosMensaje.no_ws_valorizar_prestacion); 
                        $("#Modal1").modal('show');

                        return

                    }   


                    if(u == null){

                        alert("Sin respuesta de Servicio");
                    
                    }else{   //-----------------------Si el servicio viene con respuesta ---------------------------          
 
               



                    u.splice(0,1); 
                    vm.atencion.datosIsapre.plan =  u[4]; 
                    u.splice(0,1);
                    u.splice(0,1); 
                    u.splice(0,1);     
                    u.splice(0,1); 
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

                    var internoIsapre = []
             
                    var cargaDatosPrestaciones =[];            
                    var chunk;
                    var incrementa2 = 0;
                    var incrementaInternoIsapre = 0;
                    while (cargaDatos.length > 0) {

                        chunk = cargaDatos.splice(0,Math.round(cantidad));
      
                        if(incrementa2 != 3){
                            
                            cargaDatosPrestaciones[incrementa2] = chunk;

                        }else{

                            internoIsapre[incrementaInternoIsapre] = chunk;
                            incrementaInternoIsapre++;
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
                                    
                                    totalPrestacion = parseInt(totalPrestacion) + parseInt(cargaDatosPrestaciones[i][k]);   

                                }

                                if(i == 1){
                                   
                                    vm.atencion.datosPrestaciones[k].aporteFinanciador = cargaDatosPrestaciones[i][k];
                                    vm.atencion.datosPrestacionesComprobante[k].aporteFinanciador = cargaDatosPrestaciones[i][k]; 
                                                              
                                    totalAporteFinanciador =parseInt(totalAporteFinanciador) + parseInt(cargaDatosPrestaciones[i][k]);  

                                }
                                 if(i === 2){
                              
                                    vm.atencion.datosPrestaciones[k].copago  = cargaDatosPrestaciones[i][k];
                                    vm.atencion.datosPrestacionesComprobante[k].copago = cargaDatosPrestaciones[i][k];
                                                                                     
                                    totalCopagos = parseInt(totalCopagos) + parseInt(cargaDatosPrestaciones[i][k]);

                                }                                                 
                         
                            }

                        }
                          
                    });

                    vm.atencion.datosPago.totales.copago = totalCopagos;   
                    vm.atencion.datosPago.totales.montoIsapre =  totalAporteFinanciador;  
                    vm.atencion.datosPago.totales.total =  totalPrestacion; 
                    vm.atencion.datosPago.totales.montoExcedenteAusar = totalCopagos;   
 
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
 
this.solicitarFolio = function (cantidad)
{
if(vm.atencion.datosAtencion.tipoAtencion == "PARTICULAR"){

  return

}
  var pl = new SOAPClientParameters();
  pl.add("urn:numeroFolios",cantidad); 

  SOAPClient.invoke(url, "solicitarFolio", pl, true, function(u)
                                                      {
                                                          u.splice(0,1);
                                                          u.splice(0,1);
                                                          $.each(u,function(k,v){
                                                                                                
                                                            vm.atencion.datosFolio[k] = v;

                                                        });
                                           
                                                   // traigo los folio  y cambio el avalor de "urn:numeroBono" de cada prestacion por cada bono 

                                                     /*   if(vm.atencion.datosAtencion.tipoAtencion !=  "PARTICULAR")// agrego el folio si es  Atencion Bonificada
                                                        { 

                                                          angular.forEach(vm.atencion.datosPrestacionesInsert[0],function(v,k){

                                                              angular.forEach(v,function(vv,kk){
                             
                                                                vv["urn:numeroBono"] = vm.atencion.datosFolio[k];
                                                                
                                                              })
                                                          
                                                          });

                                                        }*/  
           
                                                      // Fin traigo los folio  y cambio el avalor de "urn:numeroBono" de cada prestacion por cada bono    
                                                                                          
                                                      });
 


}


  function consultaMensaje()
  {
    
    var pl = new SOAPClientParameters();
    pl.add("urn:offset", "1");  
    pl.add("urn:length", "100");
    pl.add("urn:idEntidad", "4");
    pl.add("urn:idSistema", "1");   

    //alert(incremento++);

    SOAPClient.invoke(url, "consultaMensaje", pl, true,Mensajes_callBack);

  }
 
    function Mensajes_callBack(u)
    {
      var cargaDatos = [];
      var incrementa = 0;

      $.each(u,function(kk,vv){
     
        cargaDatos[vv["ns:codigoMensaje"]] = vv["ns:descripcionMensaje"];

      });
 
     vm.servicioLocal.datosMensaje = cargaDatos; 
  
            console.log(vm.servicioLocal.datosMensaje.rut_no_afiliado);  
    } 






      // AngularJS will instantiate a singleton by calling "new" on this function
});

      // .factory("testService", ['$soap',function($soap){
      //     var base_url = "http://tredsalud.consalud.cl/CatDMZsvcImed/CatsvcImed.asmx";
      //    // $soap.setCredentials({User:"mega", Token: "EE3E1BF7CF862B0C"});

      //     return {
      //         Conbencertif: function(codigoFinanciador, rutPaciente){
      //             return $soap.post(base_url,"Conbencertif",
      //              {pExtcodfinanciador: codigoFinanciador, pExtrutbeneficiario
      //               rutPaciente, pExtfechaactual:'20151217'});
      //         }
      //     };
      // }])
      // .factory("testServiceGetWeather", ['$soap',function($soap){
      //     var base_url = "http://www.webservicex.net/globalweather.asmx";

      //     return {
      //         GetWeather: function(CityName, CountryName){
      //             return $soap.post(base_url,"GetWeather", {CityName: CityName, CountryName: CountryName});
      //         }
      //     };
      // }])

      // .factory('messageService', [function() {
      //   var messages = [];
      //
      //   return {
      //     getMessages: function() {
      //       return messages;
      //     },
      //
      //     addMessage: function(message) {
      //       messages.push(message);
      //     },
      //   };
      // },])
      //
