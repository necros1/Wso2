(function () {
'use strict';

/**
 * @ngdoc function
 * @name medipassBE.controller:BonoElectronicoController
 * @description
 * # BonoElectronicoController
 * Controller of the medipassBE
 */
angular.module('medipassBE')
  .controller('BonoElectronicoController', function ($scope, $uibModalInstance) {
 
      $scope.record = [{"id":"1891","fecha_bono_unix":"1469551859.999999999999999999999999999997","fecha_bono":"2016-07-26 16:50:31","plan_grupo":"0","numero_bono":"1","monto_isapres":"0","monto_seguro":"0","monto_caja":"0","total_bonif":"0","total_presta":"10180","total_copago":"10180","uso_exedente":"0","rut_benef":"13942219-8","ape_benef":"ApellidoPaterParticularApellidoMaterParticular","nom_benef":"Pepe Particular","cod_atenc":"1","estatus_id":"1","nom_estatus":"ACTIVO","tipo_atencion_id":"3","nom_tipo_aten":"PARTICULAR","atencion_id":"3171","item":"1","ges":null,"rh":"0","cantidad":"2","monto":"10180","bonif":"1","copago":"10180","especialidad_id":"21","razonsocial_id":"2","rut_razonsocial":"87975900-5","nom_fantasia":"CENTRO DE DIAGNOSTICO","nom_razonsocial":"CENTRO DE DIAGNOSTICO","prestacion_id":"200","cod_prestacion":"401002","nom_prestacion":"Partes blandas; laringe lateral; cavum rinofarngeo (rinofarinx). cu.(1 exp.) ","nombre_medico":"Rodrigo Ortiz","cod_medico":"21","nom_especialidad":"Laboratorio "}];

      $scope.selected = {
          records: $scope.record[0],
      };

      $scope.ok = function () {
          $uibModalInstance.close();
      };

      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      };
  });
})();
