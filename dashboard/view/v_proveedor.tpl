<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Área Proveedor</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-proveedor.css?v=10.0.1.20">
    
    </head>
    <body >
      {$NAV}
      <div class="bdy pequeño">
        <div class="card z-depth-5 pequeño">
          <div class="card-header hide-on-small-only center head1"><p class="flow-text">Área de Operaciones</p></div>
          <div class="card-content pequeño">
            <div class="row">
              <div class="col s12 m12 l6 pequeño">
                <div class="card  z-depth-5">
                  <div class="card-title center pequeño head2">&nbsp;Opciones</div>
                  <div class="card-panel pequeño ">
                    <div class="row ">
                      <div class="col s12 m6 l6 per2000 " >
                        <a href="proveedores" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Proveedores">Proveedores</a>
                      </div>
                      <div class="col s12 m6 l6 per2100">
                        <a href="facturacion?tf=2" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Compras">Compras</a>
                      </div>
                      <div class="col s12 m6 l6 per2200">
                        <a href="facturacion?tf=3" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Orden de Compra">Orden de Compra</a>
                      </div>
                      <div class="col s12 m6 l6 per2300">
                        <a href="reportes?tr=2" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Reportes">Reportes</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col s12 m12 l6 pequeño">
                <div class="card z-depth-5 per2400 pequeño">
                  <div class="card-title center head2">&nbsp;Gráfico</div>
                  <div class="card-content pequeño">
                    <canvas class="charts" id="chartG1" width="100%" height="50"></canvas>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      {$SCR}
      <!-- <script src="../assets/libs/charts/dist/Chart.bundle.min.js?v=10.0.1.20"></scrsipt> -->
      <script src="../assets/js/modulos/proveedor.js?v=10.0.1.20"></script>
    </body>
    </html>