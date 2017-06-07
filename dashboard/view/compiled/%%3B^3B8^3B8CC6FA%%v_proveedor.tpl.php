<?php /* Smarty version 2.6.17, created on 2017-06-06 23:18:25
         compiled from v_proveedor.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Área Proveedor</title>
  <?php echo $this->_tpl_vars['STY']; ?>

  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-proveedor.css">
    
    </head>
    <body>
      <?php echo $this->_tpl_vars['NAV']; ?>

      <div class="bdy">
        <div class="card z-depth-5">
          <div class="card-header center white-text" style="background-color:#0B3861"><p class="flow-text">Área de Operaciones</p></div>
          <div class="card-content">
            <div class="row">
              <div class="col s12 m12 l6">
                <div class="card  z-depth-5">
                  <div class="card-title blue-grey white-text center">&nbsp;Opciones</div>
                  <div class="card-panel">
                    <div class="row ">
                      <div class="col s12 m6 l6 per2000">
                        <a href="proveedores" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Proveedores">Proveedores</a>
                      </div>
                      <div class="col s12 m6 l6 per2100">
                        <a href="facturacion?tf=2" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Compras">Compras</a>
                      </div>
                      <div class="col s12 m6 l6 per2200">
                        <a href="facturacion?tf=3" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Orden de Compra">Orden de Compra</a>
                      </div>
                      <div class="col s12 m6 l6 per2300">
                        <a href="reportes" class="waves-effect waves-light btn-large blue z-depth-3" style="margin-top:4%; width: 100%;" title="Reportes">Reportes</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col s12 m12 l6">
                <div class="card z-depth-5 per2400">
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

      <!-- <script src="../assets/libs/charts/dist/Chart.bundle.min.js"></scrsipt> -->
      <script src="../assets/js/modulos/proveedor.js?v=0.2"></script>
    </body>
    </html>