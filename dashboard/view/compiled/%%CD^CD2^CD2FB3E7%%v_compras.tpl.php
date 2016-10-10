<?php /* Smarty version 2.6.17, created on 2016-10-07 20:14:25
         compiled from v_compras.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Facturación</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu1.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-compras.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/bv2_toggle.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/easy-autocomplete.min.css">

</head>
<body>
<br>
<?php echo $this->_tpl_vars['NAV']; ?>

<div class="bdy">
    <div id="fcompras">
    <h3 class="card-header card-primary" style="color: #fff">
    <div class="row">
      <div class="col-md-10 col-lg-10">
        <b id="tptit">VENTAS</b>
      </div>
      <div class="col-md-2 col-lg-2">
        <span style="font-size: 0.5em">Ir a:</span>&nbsp;<input type="checkbox" checked data-toggle="toggle" data-off="<span id='comp'>Compras</span>" data-on="<span id='fact'>Ventas</span>" data-size="small" data-width="100" data-onstyle="primary active" data-offstyle="primary active">
        <!-- data-onstyle="primary" data-offstyle="primary" -->
      </div>
    </div>
    </h3>

    <div class="card-block card-footer">
      <br>
      <!-- <label class="der asterisco ncompra"><b>N° Compra: <?php echo $this->_tpl_vars['NFACT']; ?>
</b></label> -->
      <input type="hidden" id="vid" value="0">
      <input type="hidden" id="vidempresa" value="<?php echo $_SESSION['IMPRESA']; ?>
">

      <br>
      <div id="mfacturacion">
      
      </div> <!-- mfacturacion -->
    </div> <!-- card footer -->
    </div> <!-- fcompras -->
</div> <!-- bdy -->

<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js"></script> -->
<script src="../assets/js/bootstrap.min.js"></script>
<script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
<script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
<script src="../assets/js/jquery.auto-complete.min.js"></script>
<script src="../assets/js/bv2_toggle.js"></script>
<script src="../assets/js/asgard.js"></script>
<script src="../assets/js/modulos/compras.js"></script>

</body>
</html>