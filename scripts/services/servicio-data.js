(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name medipassBE.servicioData
     * @description
     * # servicioData
     * Service in the medipassBE.
     */

    angular.module('medipassBE')
        .service('servicioData', servicioData);

    function servicioData($http, $q) {
        var api = 'http://bem.openpartner.cl/prestador/admin/servicios/';
        this.getAllPrestaciones = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(api + 'obtener_prestaciones',
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
                        defered.reject(err);
                    });

            return promise;
        };

        this.save = function (atencion) {
            console.log("guardando");
            return $http({
                    method: 'POST',
                    dataType: 'json',
                    url: api + 'insert_atenciones',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: atencion,
                });
        };

        this.envioEmail = function (atencion) {
       
            return $http({
                    method: 'POST',
                    dataType: 'json',
                    url: 'http://bem.openpartner.cl/prestador/admin/servicios/envio_email',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: atencion,
                });
        };


        

        this.getAllMedicos = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(api + 'obtener_especialidad_medica',
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
        };


 


    }
})();
