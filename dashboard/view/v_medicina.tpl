<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title></title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-medicina.css?v=10.0.1.14">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js?v=10.0.1.14"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js?v=10.0.1.14"></script>
    <![endif]-->
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
    <div class="card z-depth-5">
          <div class="card-header center  pequeño hide-on-small-only hite-text" style="background-color:#0B3861; color: white !important "><p class="flow-text">Área Comercial</p></div>
          <div class="card-content  pequeño">
            <div class="row">

              <div class="col s12 m12 l6 pequeño">
                <div class="card z-depth-5">
                  <div class="card-title blue-grey white-text center ">&nbsp;Opciones</div>

                  <div class="card-panel  pequeño ">

                    <div class="row">
                     <div class="col s12 m6 l6 per1000">
                      <a href="clientes" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Clientes">Clientes</a>
                    </div>
                    <div class="col s12 m6 l6 per1100">
                      <a href="facturacion?tf=1" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Ventas">Ventas</a>
                    </div>
                    <div class="col s12 m6 l6 hide">
                      <a href="#" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="CRM">CRM</a>
                    </div>
                    <div class="col s12 m6 l6 per1200">
                    <a href="rutas" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Rutas">Rutas</a>
                    </div>
                     <div class="col s12 m6 l6 per1300">
                    <a href="facturacion?tf=4" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Cotizaciones">Cotizaciones</a>
                    </div>
                    <div class="col s12 m6 l6 per1400">
                      <a href="facturacion?tf=5" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Pedidos">Pedidos</a>
                    </div>
                    <div class="col s12 m6 l6 per1400">
                      <a href="reportes?tr=1" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Reportes">Reportes</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col s12 m12 l6 pequeño">
              <div class="card z-depth-5 per1500 pequeño">
                <div class="card-title blue-grey white-text center">&nbsp;Gráfico</div>
                <div class="card-content pequeño"><iframe class="chartjs-hidden-iframe" tabindex="-1" style="display: block; overflow: hidden; border: 0px; margin: 0px; top: 0px; left: 0px; bottom: 0px; right: 0px; height: 100%; width: 100%; position: absolute; pointer-events: none; z-index: -1;"></iframe>
                  <canvas class="charts" id="chartG1" width="798" height="398" style="display: block; height: 319px; width: 639px;"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    {$SRC}
    <script src="../assets/js/modulos/medicina.js?v=10.0.1.14"></script>
  </body>
</html>