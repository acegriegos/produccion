<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Financiera</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-financiero.css">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
      <div class="card z-depth-5">
          <div class="card-header center  white-text" style="background-color:#0B3861 "><p class="flow-text">Área Financiera</p></div>
          <div class="card-content ">
            <div class="row">

              <div class="col s12 m12 l6">
                <div class="card z-depth-5">
                  <div class="card-title blue-grey white-text center ">&nbsp;Opciones</div>

                  <div class="card-panel ">

                    <div class="row">
                     <div class="col s12 m6 l6 per3000">
                      <a href="contabilidad" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Contabilidad
                      ">Contabilidad</a>
                    </div>
                    <div class="col s12 m6 l6 per3100">
                      <a href="presupuesto" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Presupuesto">Presupuesto</a>
                    </div>
                    <div class="col s12 m6 l6 per3200">
                      <a href="cuentas?tf=2" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Cuentas por Cobrar">Cuentas por Cobrar</a>
                    </div>
                    <div class="col s12 m6 l6 per3300">
                      <a href="cuentas?tf=1" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Cuentas por Pagar">Cuentas por Pagar</a>
                    </div>
                     <div class="col s12 m6 l6 per3400">

                      <a href="notas" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Notas de Crédito y Débito">Notas de Crédito y Débito</a>

                    </div>
                      <div class="col s12 m6 l6 per3500">
                      <a href="cuentas?tf=1" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Devoluciones">Devoluciones</a>
                    </div>
                    <div class="col s12 m6 l6 per3600">
                      <a href="reportes" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Reportes">Reportes</a>
                    </div>
                     <div class="col s12 m6 l6 per3600">
                      <a href="notas" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Regalias">Regalias</a>
                    </div>


                  </div>
                </div>

                
              </div>
            </div>

            <div class="col s12 m12 l6">
              <div class="card z-depth-5 per3700">
                <div class="card-title blue-grey white-text center">&nbsp;Gráfico</div>
                <div class="card-content">
                  <canvas class="charts" id="chartG1" width="100%" height="50"></canvas>
                </div>
              </div>
            </div>

          </div>
 
        </div>
      </div>
    </div>
    {$SCR}
    <script src="../assets/js/modulos/financiero.js?v=0.1"></script>
  </body>
</html>