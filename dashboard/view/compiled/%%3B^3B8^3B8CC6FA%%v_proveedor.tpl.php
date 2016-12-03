<?php /* Smarty version 2.6.17, created on 2016-12-01 23:27:09
         compiled from v_proveedor.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Área Proveedor</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-proveedor.css">

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

    <div class="card">
      <div class="card-block">
        <h4 class="card-title">Área Proveedor</h4>
      </div>
      <div class="card-block">
        
        <div class="row">
          <div class="col-md-7 col-lg-7">

          <a href="proveedores" class="myah">
            <button type="button" class="btn btn-default mybtn" title="Proveedores">
              <i class="fa fa-user"></i>
              <br>Proveedores
            </button>
          </a>

          <a href="compras?ch=1" class="myah">
            <button type="button" class="btn btn-default mybtn" title="Compras">
              <i class="fa fa-usd"></i>
              <br>Compras
            </button>

          <a href="cuentas" class="myah">
            <button type="button" class="btn btn-default mybtn" title="Cuentas por Pagar">
              <i class="fa fa-folder-o"></i>
              <br>CxP
            </button>
          </a>

          <a href="reportes?ch=1" class="myah">
            <button type="button" class="btn btn-default mybtn" title="Reportes">
              <i class="fa fa-folder-o"></i>
              <br>Reportes
            </button>
          </a>
            
          </div>
          <div class="col-md-5 col-lg-5 mycol">
            OPCIONES

            <hr style="border: 1px dashed #e2e2e2">

            GRAFICA

            <canvas class="charts" id="chartG1" width="100%" height="50"></canvas>

            <hr style="border: 1px dashed #e2e2e2">

            DETALLE

            <hr style="border: 1px dashed #e2e2e2">

          </div>
        </div>

      </div>
    </div>

    </div>
    <script src="../assets/libs/charts/dist/Chart.bundle.min.js"></script>
    <script src="../assets/js/modulos/proveedor.js"></script>
  </body>
</html>