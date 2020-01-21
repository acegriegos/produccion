<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title></title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-administracion.css?v=10.2.0.53">

  </head>
  <body class="tamLetra pequeño">
    {$NAV}
    <div class="bdy pequeño ">
      <div class="card z-depth-5 pequeño">
          <div class="card-header center white-text hide-on-small-only head1"><p class="flow-text">Área Administrativa</p></div>
          <div class="card-content pequeño">
            <div class="row">

              <div class="col s12 m12 l6 pequeño">
                <div class="card z-depth-5">
                  <div class="card-title center head2">&nbsp;Opciones</div>

                  <div class="card-panel pequeño ">

                    <div class="row">
                     <div class="col s12 m6 l6 per6000">
                      <a href="ajustes" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Configuración">Configuración</a>
                    </div>
                    <div class="col s12 m6 l6 per6100">
                      <a href="usuarios" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Usuarios">Usuarios</a>
                    </div>
                    
                    <div class="col s12 m6 l6 per6200">
                      <a href="reportes" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Clientes">Reportes</a>
                    </div>


                  </div>
                </div>

                
              </div>
            </div>

            <div class="col s12 m12 l6 pequeño">
              <div class="card z-depth-5 per6300">
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
    <script src="../assets/js/modulos/administracion.js?v=10.2.0.53"></script>
  </body>
</html>