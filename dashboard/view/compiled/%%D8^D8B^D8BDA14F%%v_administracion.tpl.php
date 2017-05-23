<?php /* Smarty version 2.6.17, created on 2017-05-23 17:18:20
         compiled from v_administracion.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title></title>
    <?php echo $this->_tpl_vars['STY']; ?>

    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-administracion.css?v=0.1">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="tamLetra">
  <br>
    <?php echo $this->_tpl_vars['NAV']; ?>

    <div class="bdy ">
      <div class="card z-depth-5">
          <div class="card-header center  white-text" style="background-color:#0B3861 "><p class="flow-text">Área Administrativa</p></div>
          <div class="card-content ">
            <div class="row">

              <div class="col s12 m12 l6">
                <div class="card z-depth-5">
                  <div class="card-title blue-grey white-text center ">&nbsp;Opciones</div>

                  <div class="card-panel ">

                    <div class="row">
                     <div class="col s12 m6 l6 per6000">
                      <a href="ajustes" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Configuración">Configuración</a>
                    </div>
                    <div class="col s12 m6 l6 per6100">
                      <a href="usuarios" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Usuarios">Usuarios</a>
                    </div>
                    
                    <div class="col s12 m6 l6 per6200">
                      <a href="reportes" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Clientes">Reportes</a>
                    </div>


                  </div>
                </div>

                
              </div>
            </div>

            <div class="col s12 m12 l6">
              <div class="card z-depth-5 per6300">
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
    <?php echo $this->_tpl_vars['SCR']; ?>

    <script src="../assets/js/modulos/administracion.js?v=0.1"></script>
  </body>
</html>