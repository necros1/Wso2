// Generated by CoffeeScript 1.12.2
var CalendarioCtrl, CalendarioVerCtrl;

CalendarioCtrl = function($scope, $state, $stateParams, Calendario) {
  $scope.errorAniosEscolares = false;
  $scope.dataSelected = {};
  return $scope.go = function(state, obj) {
    if (obj == null) {
      obj = null;
    }
    return $state.go(state, obj);
  };
};

CalendarioVerCtrl = function($scope, $state, $stateParams, $filter, Calendario, Periodos) {
  var loadAsignaturas, loadCursos;
  Periodos.get(function(r) {
    var k, ref, v;
    $scope.anios = r.data.anios;
    if (r.data.anios[0]) {
      $scope.displayAniosEscolares = true;
      $scope.AnioOptions = [];
      ref = r.data.anios;
      for (k in ref) {
        v = ref[k];
        $scope.AnioOptions.push({
          name: v.ano_escolar,
          value: v.id
        });
      }
      if ($stateParams.anoEscolar) {
        $scope.dataSelected.id_ano_escolar = String($stateParams.anoEscolar);
      } else {
        $scope.dataSelected.id_ano_escolar = $scope.AnioOptions[0].value;
      }
      return loadAsignaturas();
    } else {
      return $scope.errorAniosEscolares = true;
    }
  });
  loadCursos = function(id_asignatura, anio) {
    $scope.displayCursos = false;
    $scope.errorCursos = false;
    return Calendario.listado({
      accion: 2,
      id_asignatura: id_asignatura,
      anio: anio
    }, function(r) {
      if ((Object.keys(r.tipo_ensenanzas).length)) {
        $scope.displayCursos = true;
        $scope.tipo_ensenanzas = r.tipo_ensenanzas;
        return $scope.dias = r.dias;
      } else {
        return $scope.errorCursos = true;
      }
    });
  };
  loadAsignaturas = function() {
    $scope.displayAsignaturas = false;
    $scope.errorAsignaturas = false;
    return Calendario.listado({
      accion: 1,
      anio: $scope.dataSelected.id_ano_escolar
    }, function(r) {
      var id_asignatura;
      if ((Object.keys(r.asignaturas).length)) {
        $scope.displayAsignaturas = true;
        $scope.asignaturas = r.asignaturas;
        if ($stateParams.idAsignatura) {
          $scope.dataSelected.idAsignatura = $stateParams.idAsignatura;
          id_asignatura = r.asignaturas[$stateParams.idAsignatura].id_asignatura;
        } else {
          $scope.dataSelected.idAsignatura = Object.keys(r.asignaturas)[0];
          id_asignatura = r.asignaturas[0].id_asignatura;
        }
        return loadCursos(id_asignatura, $scope.dataSelected.id_ano_escolar);
      } else {
        return $scope.errorAsignaturas = true;
      }
    });
  };
  $scope.selectAsignatura = function(id) {
    var id_asignatura;
    $scope.dataSelected.idAsignatura = id;
    id_asignatura = $scope.asignaturas[id].id_asignatura;
    return loadCursos(id_asignatura, $scope.dataSelected.id_ano_escolar);
  };
  $scope.changeAnioEscolar = function() {
    return loadAsignaturas();
  };
  return $scope.guardarCalendario = function(cursos) {
    return Calendario.guardar({
      accion: 3,
      cursos: cursos
    }, function(r) {
      if (r.success === true) {
        return toastr.success($filter('translate')("ACCION_OK"));
      } else {
        return toastr.error($filter('translate')("ACCION_ERROR"));
      }
    });
  };
};