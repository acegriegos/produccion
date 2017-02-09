<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Área Comercial</title>
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-comercial.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>
    <body>
      {$NAV}
      <div class="bdy">
        <div class="card">
          <div class="card-header center blue-grey white-text"><p class="flow-text">Área Comercial</p></div>
          <div class="card-content ">
            <div class="row">

              <div class="col s12 m12 l6">
                <div class="card">
                  <div class="card-title grey white-text center">&nbsp;Opciones</div>

                  <div class="card-panel ">

                    <div class="row">
                     <div class="col s12 m6 l6">
                      <a href="clientes" class="waves-effect waves-light btn-large blue" style="margin-top:4%; width: 100%;" title="Clientes">Clientes</a>
                    </div>
                    <div class="col s12 m6 l6">
                      <a href="facturacion?tf=1" class="waves-effect waves-light btn-large blue" style="margin-top:4%; width: 100%;" title="Ventas">Ventas</a>
                    </div>
                    <div class="col s12 m6 l6">
                      <a href="#" class="waves-effect waves-light btn-large blue" style="margin-top:4%; width: 100%;" title="Clientes">CRM</a>
                    </div>
                    <div class="col s12 m6 l6">
                    <a href="cuentas" class="waves-effect waves-light btn-large blue" style="margin-top:4%; width: 100%;" title="Clientes">CxC</a>
                    </div>
                    <div class="col s12 m6 l6">
                      <a href="reportes" class="waves-effect waves-light btn-large blue" style="margin-top:4%; width: 100%;" title="Clientes">Reportes</a>
                    </div>


                  </div>
                </div>

                
              </div>
            </div>

            <div class="col s12 m12 l6">
              <div class="card">
                <div class="card-title grey white-text center">&nbsp;Gráfico</div>
                <div class="card-content">
                  <canvas class="charts" id="chartG1" width="100%" height="50"></canvas>
                </div>
              </div>
            </div>

          </div>
 
        </div>
      </div>


    </div>
    <script src="../assets/js/modulos/comercial.js"></script>
  </body>
  </html>