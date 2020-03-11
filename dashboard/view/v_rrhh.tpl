<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Área Recurso Humano</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-comercial.css?v=10.2.0.63">

    </head>
    <body>
      {$NAV}
      <div class="bdy pequeño">
        <div class="card z-depth-5">
          <div class="card-header center  pequeño hide-on-small-only head1"><p class="flow-text">Área Comercial</p></div>
          <div class="card-content  pequeño">
            <div class="row">

              <div class="col s12 m12 l6 pequeño">
                <div class="card z-depth-5">
                  <div class="card-title center head2">&nbsp;Opciones</div>

                  <div class="card-panel pequeño">

                    <div class="row">
                     <div class="col s12 m6 l6 per1000 hide">
                      <a href="empleados" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Clientes">Empleados</a>
                    </div>
                    <div class="col s12 m6 l6 per1100 hide">
                      <a href="facturacion?tf=1" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Ventas">Ventas</a>
                    </div>
                    <div class="col s12 m6 l6 hide">
                      <a href="#" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="CRM">CRM</a>
                    </div>
                    <div class="col s12 m6 l6 per1200 hide">
                    <a href="rutas" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Rutas">Rutas</a>
                    </div>
                     <div class="col s12 m6 l6 per1300 hide">
                    <a href="facturacion?tf=4" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Cotizaciones">Proforma</a>
                    </div>
                    <div class="col s12 m6 l6 per1400 hide">
                      <a href="facturacion?tf=5" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Pedidos">Pedidos</a>
                    </div>
                    <div class="col s12 m6 l6 per1600 hide">
                      <a href="facturacion?tf=6" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Pre Ventas">Pre Venta</a>
                    </div>
                    <div class="col s12 m6 l6 per1500 hide">
                      <a href="reportes?tr=1" class="waves-effect waves-light btn-large btn1 z-depth-3" style="margin-top:4%; width: 100%;" title="Reportes">Reportes</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col s12 m12 l6 pequeño">
              <div class="card z-depth-5 per1500 pequeño">
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
    <script src="../assets/js/modulos/comercial.js?v=10.2.0.63"></script>
  </body>
</html>