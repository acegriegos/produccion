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
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-compras.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/jquery.auto-complete.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/bv2_toggle.css">

</head>
<body>
    
{$NAV}
<br><br>
<div class="bdy">

    <div id="fcompras">
    <h3 class="card-header card-primary" style="color: #fff"><b id="tptit">FACTURACION</b></h3>
    
    <div class="card-block card-footer">
      <div class="row">
        <div class="col-lg-6">
          <input type="checkbox" checked data-toggle="toggle" data-off="<span id='comp'>Comprar</span>" data-on="<span id='fact'>Facturar</span>" data-size="small" data-width="100" data-onstyle="primary-outline" data-offstyle="primary">
        </div>
        <div class="col-lg-3 der">
          <div class="input-group input-group">
            <span class="input-group-addon" id="nfact">N° Factura</span>
            <input type="text" class="form-control" aria-label="Código" placeholder="Código" value="{$NFACT}" disabled>
          </div>
        </div>
      </div>
      
      <br>
      <!-- <label class="der asterisco ncompra"><b>N° Compra: {$NFACT}</b></label> -->
      <input type="hidden" id="vid" value="0">
      <input type="hidden" id="vidempresa" value="{$smarty.session.IMPRESA}">

      <br>
      <div id="mfacturacion">
      
      </div> <!-- mfacturacion -->
    </div> <!-- card footer -->
    </div> <!-- fcompras -->
</div> <!-- bdy -->

<script src="../assets/js/bootstrap.min.js"></script>
<script src="../assets/js/mask/jquery.mask.js"></script>
<script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
<script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
<script src="../assets/js/auto-complete.min.js"></script>
<script src="../assets/js/bv2_toggle.js"></script>
<script src="../assets/js/asgard.js"></script>
<script src="../assets/js/modulos/compras.js"></script>

</body>
</html>



