<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viwport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Inventario</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-inventario.css">

  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
      <div class="card z-depth-5">
          <div class="card-header center  white-text" style="background-color:#0B3861 "><p class="flow-text">Área Inventarios</p></div>
          <div class="card-content ">
            <div class="row">

              <div class="col s12 m12 l6">
                <div class="card z-depth-5">
                  <div class="card-title blue-grey white-text center ">&nbsp;Opciones</div>

                  <div class="card-panel ">

                    <div class="row">
                     <div class="col s12 m6 l6">
                      <a href="inventarios" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Inventarios">Inventarios</a>
                    </div>
                    <div class="col s12 m6 l6">
                      <a href="productos" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Productos">Productos</a>
                    </div>
                    <div class="col s12 m6 l6">
                      <a href="reportes" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Clientes">Reportes</a>
                    </div>


                  </div>
                </div>

                
              </div>
            </div>

            <div class="col s12 m12 l6">
              <div class="card z-depth-5">
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
    <script src="../assets/js/modulos/inventario.js?v=0.1"></script>
  </body>
</html>