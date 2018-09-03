<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Área Comercial</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-comercial.css?v=10.0.0.43">

    </head>
    <body>
      {$NAV}
      <div class="bdy pequeño">
        <div class="card z-depth-5">
          <div class="card-header center  pequeño hide-on-small-only head1"><p class="flow-text">Área Comercial</p></div>
          <div class="card-content  pequeño">
            <div class="row">

              <div class="col s12 m12 l6 pequeño">
                <div class="card z-depth-5">
                  <div class="card-title center head2">&nbsp;Opciones</div>

                  <div class="card-panel pequeño">

                    <div class="row">
                     <div class="col s12 m6 l6 per1000">
                      <a href="clientes" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Clientes">Clientes</a>
                    </div>
                    <div class="col s12 m6 l6 per1100">
                      <a href="facturacion?tf=1" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Ventas">Ventas</a>
                    </div>
                    <div class="col s12 m6 l6 hide">
                      <a href="#" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="CRM">CRM</a>
                    </div>
                    <div class="col s12 m6 l6 per1200 hide">
                    <a href="rutas" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Rutas">Rutas</a>
                    </div>
                     <div class="col s12 m6 l6 per1300">
                    <a href="facturacion?tf=4" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Cotizaciones">Cotizaciones</a>
                    </div>
                    <div class="col s12 m6 l6 per1400">
                      <a href="facturacion?tf=5" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Pedidos">Pedidos</a>
                    </div>
                    <div class="col s12 m6 l6 per1400">
                      <a href="reportes?tr=1" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Reportes">Reportes</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col s12 m12 l6 pequeño">
              <div class="card z-depth-5 per1500 pequeño">
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
    <script src="../assets/js/modulos/comercial.js?v=10.0.0.43"></script>
  </body>
</html>