<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Financiera</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-financiero.css?v=10.1.0.82">
  </head>
  <body>
    {$NAV}
    <div class="bdy pequeño">
      <div class="card z-depth-5 pequeño">
          <div class="card-header pequeño center hide-on-small-only head1"><p class="flow-text">Área Financiera</p></div>
          <div class="card-content pequeño">
            <div class="row">

              <div class="col s12 m12 l6 pequeño">
                <div class="card z-depth-5 pequeño">
                  <div class="card-title pequeño center head2">&nbsp;Opciones</div>

                  <div class="card-panel pequeño">

                    <div class="row">
                     <div class="col s12 m6 l6 per3000 hide">
                      <a href="contabilidad" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Contabilidad
                      ">Contabilidad</a>
                    </div>
                   <!--  <div class="col s12 m6 l6 ">
                      <a href="presupuesto" class="waves-effect per3100 waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Presupuesto">Presupuesto</a>
                    </div> -->
                    <div class="col s12 m6 l6 ">
                      <a href="cuentas?tf=1" class="waves-effect per3200 waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Cuentas por Cobrar">Cuentas por Cobrar</a>
                    </div>
                    <div class="col s12 m6 l6 ">
                      <a href="cuentas?tf=2" class="waves-effect per3300 waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Cuentas por Pagar">Cuentas por Pagar</a>
                    </div>
                     <div class="col s12 m6 l6 ">

                      <a href="notas" class="waves-effect waves-light per3400 btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Notas de Crédito y Débito">Notas de Crédito y Débito</a>

                    </div>
                    <div class="col s12 m6 l6 ">
                      <a href="devoluciones" class="waves-effect per3500 waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Devoluciones">Devoluciones</a>
                    </div>

                    <div class="col s12 m6 l6 ">
                      <a href="flujocaja" class="waves-effect per3500 waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Flujo de Caja">Flujo de Caja</a>
                    </div>

                    <div class="col s12 m6 l6 ">
                      <a href="reportes?tr=3" class="waves-effect per3600 waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Reportes">Reportes</a>
                    </div>
                     <!-- <div class="col s12 m6 l6  hide">
                      <a href="notas" class="waves-effect waves-light per3600 btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Regalias">Regalias</a>
                    </div> -->


                  </div>
                </div>

                
              </div>
            </div>

            <div class="col s12 m12 l6 pequeño">
              <div class="card pequeño z-depth-5 per3700">
                <div class="card-title center head2">&nbsp;Gráfico</div>
                <div class="card-content pequeño">
                  <canvas class="charts" id="chartG1" width="100%" height="50"></canvas>
                </div>
              </div>
            </div>

          </div>
 
        </div>
      </div>
    </div>
    {$SCR}
    <script src="../assets/js/modulos/financiero.js?v=10.1.0.82"></script>
  </body>
</html>