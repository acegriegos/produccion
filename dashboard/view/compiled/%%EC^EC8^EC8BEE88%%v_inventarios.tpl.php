<?php /* Smarty version 2.6.17, created on 2016-10-29 16:53:35
         compiled from v_inventarios.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title></title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-inventarios.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu1.css">
	<link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  <br>
    <?php echo $this->_tpl_vars['NAV']; ?>

    <div class="bdy">
    <nav class="navbar navbar-dark bg-primary" style="border-radius: 0px 0px 5px 5px;">
        <!-- Brand -->
        <a class="navbar-brand" href="#"><b>Inventarios</b></a>
        <!-- Links -->
        <ul class="nav navbar-nav">
            <li class="nav-item menu5 active" id="m2">
                <a class="nav-link" href="#" title="Insumos">Insumos</a>
            </li>
            <li class="nav-item menu5" id="m3">
                <a class="nav-link" href="#" title="Gastos">Gastos</a>
            </li>
            <li class="nav-item menu5" id="m6">
                <a class="nav-link" href="#" title="Producción">Producción</a>
            </li>
            <li class="nav-item menu5" id="m4">
                <a class="nav-link" href="#" title="En Ruta">Rutas</a>
            </li>
            <li class="nav-item menu5" id="m1">
                <a class="nav-link" href="#" title="Devoluciones">Devoluciones</a>
            </li>
            <li class="nav-item menu5" id="m5">
                <a class="nav-link" href="#" title="Mal Estado">Mal Estado</a>
            </li>
        </ul>
    </nav>
    <br>

    <div class="formInventarios" id="finventarios">
        <div id="bdymantInvGeneral"></div>
    </div>

    </div>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/mask/jquery.mask.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
    <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
    <script src="../assets/js/asgard.js"></script>
    <script src="../assets/js/modulos/inventarios.js"></script>
  </body>
</html>