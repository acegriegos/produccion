<?php /* Smarty version 2.6.17, created on 2017-05-23 17:18:31
         compiled from v_ajustes.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Configuración</title>
    <?php echo $this->_tpl_vars['STY']; ?>

    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-ajustes.css?v=0.1">
  </head>
  <body>
    <?php echo $this->_tpl_vars['NAV']; ?>

    
    <div class="bdy tamLetra">
    
     <nav class="nav-extended z-depth-5 " style="background-color:#0B3861">
      <div class="nav-wrapper ">
        <ul class="tabs tabs-transparent">
          <li class="tab col s3 menu3" id="m1"><a class="tamLetra" class="active">Empresa</a></li>
          <li class="tab col s3 menu3" id="m2"><a class="tamLetra">Descuentos</a></li>
          <li class="tab col s3 menu3" id="m3"><a class="tamLetra">Impuestos</a></li>
          <li class="tab col s3 menu3" id="m4"><a class="tamLetra">Cuentas Contables</a></li>
          <li class="tab col s3 menu3" id="m5"><a class="tamLetra">Sucursales</a></li>
          <li class="tab col s3 menu3" id="m6"><a class="tamLetra">Bodegas</a></li>
        </ul>
      </div>
    </nav>
    
    <div id="majustes"></div>
        
    </div>
    <?php echo $this->_tpl_vars['SCR']; ?>

    <script src="../assets/js/modulos/ajustes.js?v=0.9"></script>

    
  </body>

</html>