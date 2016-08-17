<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Contabilidad</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-contabilidad.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu.css">
	<link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    {$NAV}
    <br>
    <div class="bdy">

        <nav class="navbar navbar-dark bg-primary" style="border-radius: 0px 0px 5px 5px;">
        <!-- Brand -->
            <a class="navbar-brand" href="#"><b>Contabilidad</b></a>
            <!-- Links -->
            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <a class="nav-link menu3 active" id="m1" href="#">Cuentas</a>
                </li>
                <li class="nav-item menu3" id="m2">
                    <a class="nav-link" href="#">Asientos</a>
                </li>
                <li class="nav-item menu3" id="m3">
                    <a class="nav-link" href="#">Paquetes</a>
                </li>
            </ul>
        </nav>
    <br><br>
    <div id="mcontabilidad">
        <div class="row">
            <div class="col-md-5 col-lg-5">
                <div class="input-group" modulo="scontabilidad">
                    <div class="input-group-addon slide" cod="1"><b>Genero</b></div>
                    <select class="form-control slide" cod="1" id="vgenero">
                        <option value="0">Seleccione una Opción</option>
                        {section name=LE loop=$TCUE}
                            <option value="{$TCUE[LE][0]}">{$TCUE[LE][1]}</option>
                        {/section}
                    </select>

                    <div class="input-group-addon slide" cod="2" style="display:none"><b>Subgenero</b></div>
                    <select class="form-control slide" cod="2" style="display:none" id="vsubgenero">

                    </select>

                    <div class="input-group-addon slide" cod="3" style="display:none"><b>Descripción</b></div>
                    <input type="text" class="form-control slide" cod="3" style="display:none" id="vnombre" placeholder="">
                    <div class="input-group-addon slidel btn" style="display:none"><i class="fa fa-arrow-left"></i></div>
                    <div class="input-group-addon slider btn" style="display:none"><i class="fa fa-arrow-right"></i></div>
                </div><br>
                <div class="alert alert-danger err_" id="err1" style="display: none">
                    <strong id="errm1"></strong>
                </div>
            </div>
            <div class="col-md-1 col-lg-1"></div>
            <div class="col-md-6 col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h3>Cuentas</h3>
                    </div>
                    <div class="card-block">
                        <div class="row">
                            {section name=LE loop=$CUE}
                            <div class="col-md-6 col-lg-6">
                                {$CUE[LE][0]}
                            </div>
                            <div class="col-md-6 col-lg-6">
                                {$CUE[LE][1]}
                            </div>
                            {/section}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

    </div>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/mask/jquery.mask.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
    <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
    <script src="../assets/js/asgard.js"></script>
    <script src="../assets/js/modulos/contabilidad.js"></script>
  </body>
</html>