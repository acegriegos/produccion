<?php /* Smarty version 2.6.17, created on 2016-09-07 17:31:24
         compiled from v_productos.tpl */ ?>
<DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Productos</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link rel="stylesheet" type="text/css" href="../assets/css/animate.css">
   <!--  <link href="../assets/libs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <link href="../assets/css/system.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu1.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/easy-autocomplete.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-productos.css">
    <link href='https://fonts.googleapis.com/css?family=Roboto:500' rel='stylesheet' type='text/css'>
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
        <a class="navbar-brand" href="#"><b>Inventario</b></a>
        <!-- Links -->
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <a class="nav-link menu3 active" id="m1" href="#">Productos</a>
            </li>
            <li class="nav-item menu3" id="m2">
                <a class="nav-link" href="#">Servicios</a>
            </li>
            <li class="nav-item menu3" id="m3">
                <a class="nav-link" href="#">Paquetes</a>
            </li>
        </ul>
    </nav>
    <br>
    <div class="formServ" id="fservicios">
        <div id="bdymantInventario"></div>
    </div>

</div>
   <!--  <script src="../assets/js/tether.min.js"></script>
    <script src="../assets/libs/bootstrap/dist/js/bootstrap.min.js"></script> -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
    <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
    <script src="../assets/js/alertModal.js"></script>
    <script src="../assets/js/notify.js"></script>
    <script src="../assets/js/jquery.auto-complete.min.js"></script>
    <script src="../assets/js/asgard.js"></script>
    <script src="../assets/js/modulos/productos.js"></script>
    <script src="../assets/js/bootstrap-tokenfield.js"></script>


  </body>
</html>