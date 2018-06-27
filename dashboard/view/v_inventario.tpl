<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viwport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Inventario</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-inventario.css?v=10.0.0.12">

  </head>
  <body>
 
    {$NAV}
    <div class="bdy pequeño">
      <div class="card z-depth-5 pequeño">
          <div class="card-header center pequeño hide-on-small-only head1"><p class="flow-text">Área Inventarios</p></div>
          <div class="card-content pequeño">
            <div class="row">

              <div class="col s12 m12 l6 pequeño">
                <div class="card z-depth-5 pequeño">
                  <div class="card-title center head2">&nbsp;Opciones</div>

                  <div class="card-panel pequeño">

                    <div class="row">
                     <div class="col s12 m6 l6 per4000 ">
                      <a href="inventarios" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Inventarios">Inventarios</a>
                    </div>
                    <div class="col s12 m6 l6 per4100">
                      <a href="productos" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Productos">Productos</a>
                    </div>
                    <div class="col s12 m6 l6 per4200">
                      <a href="reportes" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Clientes">Reportes</a>
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
    <script src="../assets/js/modulos/inventario.js?v=10.0.0.12"></script>
  </body>
</html>