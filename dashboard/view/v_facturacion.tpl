<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Facturación</title>

</head>
<body>
{$NAV}
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-facturacion.css">
<script src="../assets/js/modulos/facturacion.js"></script>
<div class="bdy">

    <div class="card-block card-footer">

      <input type="hidden" id="vid" value="0">
      <input type="hidden" id="vidempresa" value="{$smarty.session.IMPRESA}">

      <br>
      <div id="mfacturacion" style="background-color: white;">
      
      </div> <!-- mfacturacion -->
    </div> <!-- card footer -->

</div> <!-- bdy -->

</body>
</html>