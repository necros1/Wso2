    	var hash = location.hash;

        $("#nombre_login").html("");
        $("#apellido_login").html("");

		var operadorOpaciente = " ";  

		//setTimeout(

        function errorIniciarTOC() {
        /*	if(document.myApplet){
        		        	console.log( "Estado inicio Applet: "+document.myApplet.getStatusInicioApplet()+
	"\nEstado Registro TOC: "+document.myApplet.getStatusRegistro()+
	"\nEstado carga vista TOC: "+document.myApplet.getStatusVista()
	);
        		
        	}*/

        }
        function errorInitSecuGen() {
            // Metodo que se invoca cuando ha ocurrido un error al iniciar el lector de huellas
            alert("Ha ocurrido un error al iniciar el lector de huellas");
        }
        function errorInitBarcodeReader() {
            // Metodo que se invoca cuando ha ocurrido un error al iniciar el lector de codigos de barras
            alert("Ha ocurrido un error al iniciar el lector de cedulas de identidad");
        }
        function nuevaVerificacion($run, $textoCabecera) 
        {
            document.myApplet.setDataNuevaVerificacion($run, $textoCabecera);
        }
        function cancelarTOC() {
            // Metodo que se invoca al momento de presionar el boton de cerrar
            alert("Se ha presionado el boton Cancelar TOC");
        }



		function cedulaLeida() {

			var hash = location.hash;


	        $("#nombre_login").html("");
	        $("#apellido_login").html("");


			if(hash == "#/identificacion-usuario"){
	        	operadorOpaciente = "OPERADOR";

	        }else{
	        	operadorOpaciente = "PACIENTE"; 
	     	}

	     	var rut = document.myApplet.getRut();
	     	var numero;
 	 	 
			if( rut.length == 9 ){

				numero = rut.substr(0,8);

			}else{

				numero = rut.substr(0,7);
			}

    		var dv = rut.slice(-1);  
    		var rut = numero+"-"+dv;

 			if(document.myApplet.isNewID()) {                  

            	$("#accionEnToc").text(operadorOpaciente + " : " + document.myApplet.getNombresNewCI() + " " + document.myApplet.getApellidosNewCI() + " , " + rut );

        
	/*		alert(	"Resultado Operacion: "+document.myApplet.getCodigoRespuestaNewCI()+
					"\nRun: "+document.myApplet.getRunNewCI()+
					"\nNombres: "+document.myApplet.getNombresNewCI()+
					"\nApellidos: "+document.myApplet.getApellidosNewCI()+
					"\nGenero: "+document.myApplet.getGeneroNewCI()+
					"\nNacionalidad: "+document.myApplet.getNacionalidadNewCI()+
					"\nFecha Nacimiento: "+document.myApplet.getFechaNacimientoNewCI()+
					"\nFecha Vencimiento CI: "+document.myApplet.getFechaVencimientoNewCI()+
					"\nNumero Serie CI: "+document.myApplet.getNSerieNewCI()+
					"\nNumero Transaccion TOC: "+document.myApplet.getNTransaccionNewCI()+
					"\nResultado Transaccion: "+document.myApplet.getResultadoVerificacionNewCI()+
					"\nCI Vencida: "+document.myApplet.getCIVencidaNewCI());


					*/

			   	$("#mensaje_exito").text("COLOCA EL DEDO INDICE DEL "+operadorOpaciente + " SOBRE EL TOC");
                                    
                         
                                        
			} else {
				/*alert(	"Resultado Operacion: "+document.myApplet.getCodigoRespuesta()+
						"\nRun: "+document.myApplet.getRut()+
						"\nApellido Paterno: "+document.myApplet.getApellidoPaterno()+
						"\nNombre Completo: "+document.myApplet.getNombreCompleto()+
						"\nNacionalidad: "+document.myApplet.getNacionalidad()+
						"\nFecha Vencimiento CI: "+document.myApplet.getFechaVence()+
						"\nNumero Serie CI: "+document.myApplet.getNumeroSerie()+
						"\nPuntaje TOC: "+document.myApplet.getResultadoTrx()+
						"\nNumero Transaccion TOC: "+document.myApplet.getNTransaccion()+
						"\nResultado Transaccion: "+document.myApplet.getResultadoTRX()+
						"\nCI Vencida: "+document.myApplet.getCIVencida());
				*/

				$("#accionEnToc").text(operadorOpaciente + " : " + document.myApplet.getNombreCompleto() + " " + document.myApplet.getApellidoPaterno() + " , " + rut );

                                    
               	$("#mensaje_exito").text("COLOCA EL DEDO PULGAR DEL "+operadorOpaciente + " SOBRE EL TOC");                
			}

				
		 
		}  
   
 

        function initVerificacionIdentidadTOC() {
		}

        function verificacionIdentidadTOC() 
        {
                var hash = location.hash; 

	            if (document.myApplet.isNewID()) 
	            {
     	             
	                if (document.myApplet.getResultadoVerificacionNewCI() === true) {

	                	$("#id_rut_nuevoOantiguo").text("nuevo");

	                    $("#mensaje_exito").text( operadorOpaciente+ " IDENTIFICADO CON EXITO");

	                    var  apeBene = document.myApplet.getApellidosNewCI();
	                    var  nombreBene = document.myApplet.getNombresNewCI();	

				     	var rut = document.myApplet.getRunNewCI();
				     	var numero;
		
						if( rut.length ==  9 ){

							numero = rut.substr(0,8);

						}else{

							numero = rut.substr(0,7);
						}

    					var dv = rut.slice(-1); 

			   			$("#id_rut_apertura_caja").html(numero+"-"+dv);	
			   			$("#campo_texto_rut-paciente").val(numero+"-"+dv);	
	                    $("#nombre_login").html(nombreBene);
	                    $("#apellido_login").html(apeBene);
	                    $("#app").css("display","none");

	                    if(hash == "#/identificacion-usuario"){
	                   

				        	$("#id_boton_login").click();

				        }else{

				        	$("#id_boton_login").removeAttr("disabled"); 
				        	  
				     	}



	                } else {

	                    $("#mensaje_exito").text("LA HUELLA NO COINCIDE CON LA CEDULA");
	    
	                }

	            }else{

	            	if (document.myApplet.getResultadoTRX()) {

	            		$("#id_rut_nuevoOantiguo").text("antiguo");
	                	
	                    $("#mensaje_exito").text( operadorOpaciente+ " IDENTIFICADO CON EXITO");

	                    var  apeBene = document.myApplet.getApellidoPaterno();
	            
				     	var rut = document.myApplet.getRut();
				     	var numero;


			 
						if( rut.length == 9 ){

							numero = rut.substr(0,8);

						}else{

							numero = rut.substr(0,7);
						}
						
						var dv = rut.slice(-1); 

			   			$("#id_rut_apertura_caja").html(numero+"-"+dv);	

			   			$("#campo_texto_rut-paciente").val(numero+"-"+dv);	

	                  //  $("#nombre_login").html(apeBene);
	                    $("#apellido_login").html(apeBene);
	                    $("#app").css("display","none");

	                    if(hash == "#/identificacion-usuario"){

				        	$("#id_boton_login").click();

				        }else{

				        	$("#id_boton_login").removeAttr("disabled"); 

				     	}



	                } else {

	                    $("#mensaje_exito").text("LA HUELLA NO COINCIDE CON LA CEDULA");
	
	                }


	            }


        	//}
    	}       
//}

