<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Laboratorio</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-laboratorio.css">
  </head>
<body>
  {$NAV}
    <div class="bdy pequeño">
        <div class="card-header center  white-text hide-on-small-only" style="background-color:#0B3861 "><p class="flow-text">Área Laboratorio</p></div>
          <div class="card-content pequeño">
            <div class="row">

              <div class="col s12 m12 l6 pequeño">
                <div class="card z-depth-5">
                  <div class="card-title blue-grey white-text center ">&nbsp;Opciones</div>

                  <div class="card-panel pequeño ">

                    <div class="row">

                      <div class="col s12 m6 l6 per6000">
                        <a href="laboratorio?accion=1" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" >Lab. Tejidos</a>
                      </div>

                      <div class="col s12 m6 l6 per6100">
                        <a href="laboratorio?accion=2" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;">Seguimiento</a>
                      </div>

                      <div class="col s12 m6 l6 per6100">
                        <a href="laboratorio?accion=3" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;">Ajustes</a>
                      </div>

                  </div>
                </div>

                
              </div>
            </div>

            <div class="col s12 m12 l6 pequeño">
              <div class="card z-depth-5 per6300">
                <div class="card-title blue-grey white-text center">&nbsp;Gráficos</div>
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
    <script src="../assets/js/modulos/laboratorio.js?v=0.1"></script>
  </body>
</html>