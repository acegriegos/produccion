<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
    <title>Taller</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/staller.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/materialize.css">
  </head>
  <body>
    <br>
    <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s3 tabs-fixed-width"><a href="#test1" id="1">Boleta Ingreso</a></li>
          <li class="tab col s3 tabs-fixed-width"><a href="#test2" id="2">Buscar Boleta</a></li>
          <li class="tab col s3 tabs-fixed-width"><a href="#test3" id="3">Vehículos</a></li>
        </ul>
      </div>
      <div id="test1" class="col s12">
        <div class="row">
          <div class="col s12 m6">
            <div class="card white lighten-2">
              <div class="card-content black-text">
                <div class="card blue-grey darken-1">
                  <span class="center-align card-title">Buscar Vehículo</span>
                </div>
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="input-group">
                      <span class="input-group-addon"><b>Nombre o Cédula del Cliente</b></span>
                      <input type="text" class="form-control fsearch" id="bnomclie" placeholder="Digite el Nombre o Cédula" >
                    </div>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="input-group">
                      <span class="input-group-addon"><b>Placa o VIN</b></span>
                      <input type="text" class="form-control fsearch" id="bvinplaca" placeholder="Digite la Placa o VIN del Vehículo">
                    </div>
                    
                  </div>
                </div>
              </div>
          
        </div>
        
        <!--                      Ventana 2                                  -->
         <div class="col s12 m6" style="display:none">
          <strong>Cliente con Varios Vehículos</strong><br>
          <select id="vveh">
           <option value="">Seleccione un Vehículo</option>
          </select>
        </div>
      
    
    <div id="test2" class="col s12">Test 2
    </div>
    <div id="test3" class="col s12">Test 3
    </div>
  </div>
</div>
</div>
</body>
{$SCR}

<script src="../assets/js/modulos/taller.js"></script>
<script src="../resources/libs/DataTables-1.10.4/media/js/jquery.dataTables.min.js"></script>
<script src="../resources/libs/DataTables-1.10.4/media/js/dataTables.responsive.min.js"></script>
</html>