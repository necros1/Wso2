(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name medipassBE.servicioLocal
     * @description
     * # servicioLocal
     * Service in the medipassBE.
     */
    angular.module('medipassBE')
        .service('servicioMensajes', servicioMensajes);




    function servicioMensajes() {


        /*this.getAllMensajes = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('http://localhost:8000/admin/servicios/obtener_mensajes',
            {
                header:
                {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }
        )

                    .success(function (data) {

                        defered.resolve(data);
                    })
                    .error(function (err) {
                        console.log(err);
                        defered.reject(err);
                    });

            return promise;
        };*/
        


    }    

})();
