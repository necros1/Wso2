(function () {

'use strict';

/**
 * @ngdoc function
 * @name medipassBE.controller:MenuController
 * @description
 * # MenuController
 * Controller of the medipassBE
 */
angular.module('medipassBE')
  .controller('MenuController', MenuController);
    MenuController.$inject = ['servicioLocal','$state','servicioMilliways'];

function MenuController(servicioLocal,$state,servicioMilliways) {

    var vm = this;

    vm.servicioMilliways = servicioMilliways;
  /*  window.onbeforeunload = function() {
      return "¿Estás seguro que deseas salir de la actual página?"
  	}*/
	//window.location.hash="no-back-button";
   // window.location.hash="Again-No-back-button" //chrome
//    window.onhashchange=function(){window.location.hash="no-back-button";}
    vm.cancelarRegitroAtencion = servicioLocal.cancelarRegitroAtencion;
 
 	vm.servicioMilliways.consultaAtencion();
 	      


 
    if(servicioLocal.cancelarRegitroAtencion.valor == true){

	   /* if(navigator.appName + " " +navigator.appVersion == "Netscape 5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; GWX:QUALIFIED; rv:11.0) like Gecko"){
			
			//IE
			window.location.hash="no-back-button";
	     
	    }else{

	   	console.log(history.forward(1));
	    	  location.replace( history.forward(1) );
	    }*/

 	 


 
		vm.cancelarRegitroAtencion  == false;
	 
	}
	 
 
    

}
})();
