<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Laboratorio</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-laboratorio.css?v=10.0.1.5">
  </head>
<body>
  {$NAV}
    <div class="bdy pequeño">
        <div class="card-header center  white-text hide-on-small-only head1">
          <p class="flow-text">Área Laboratorio</p></div>
          <div class="card-content pequeño">
            <div class="row">
              <div class="col s12 m12 l6 pequeño">
                <div class="card z-depth-5">
                  <div class="card-title center head2">&nbsp;Opciones</div>
                  <div class="card-panel pequeño ">
                    <div class="row">
                      <div class="col s12 per6000">
                        <a href="laboratorio?accion=1" class="waves-effect waves-light btn-block btn btn1 z-depth-3 {if $smarty.session.IMPRESA neq 1 && $smarty.session.TMP_CIA neq -1 } hide {/if}" style="margin-top:4%; width: 100%;" >Laboratorio de Cultivo de Tejidos</a>
                      </div>
                      <div class="col s12 per6100">
                        <a href="laboratorio?accion=11" class="waves-effect waves-light btn-block btn btn1 z-depth-3 {if $smarty.session.IMPRESA neq 2 && $smarty.session.TMP_CIA neq -1} hide {/if}" style="margin-top:4%; width: 100%;" >Laboratorio de Cortesia Flavipes</a>
                      </div>
                      <div class="col s12 per6200">
                        <a href="laboratorio?accion=12" class="waves-effect waves-light btn-block btn btn1 z-depth-3 {if $smarty.session.IMPRESA neq 3 && $smarty.session.TMP_CIA neq -1} hide {/if}" style="margin-top:4%; width: 100%;" >Laboratorio de Hongos Entomopatógenos</a>
                      </div>
                      <div class="col s12 per6500">
                        <a href="laboratorio?accion=13" class="waves-effect waves-light btn-block btn btn1 z-depth-3 {if $smarty.session.IMPRESA neq 4 && $smarty.session.TMP_CIA neq -1} hide {/if}" style="margin-top:4%; width: 100%;" >Laboratorio de Biología Molecular</a>
                      </div>
                      <div class="col s12 per660  0">
                        <a href="laboratorio?accion=14" class="waves-effect waves-light btn-block btn btn1 z-depth-3 {if $smarty.session.IMPRESA neq 5 && $smarty.session.TMP_CIA neq -1} hide {/if}" style="margin-top:4%; width: 100%;" >Planta de Sustratos</a>
                      </div>
                      <div class="col s12 m6 l6 per6300">
                        <a href="laboratorio?accion=10" class="waves-effect waves-light btn-block btn btn1 z-depth-3" style="margin-top:4%; width: 100%;">Seguimiento</a>
                      </div>
                      <div class="col s12 m6 l6 per6400">
                        <a href="laboratorio?accion=3" class="waves-effect waves-light btn-block btn btn1 z-depth-3" style="margin-top:4%; width: 100%;">Ajustes</a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s12 m12 l6 pequeño">
              <div class="card z-depth-5 per6300">
                <div class="card-title center head2">&nbsp;Gráficos</div>
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
    <!-- <script src="../assets/js/modulos/laboratorio.js?v=10.0.1.5"></script> -->
  </body>
</html>