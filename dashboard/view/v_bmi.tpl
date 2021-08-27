<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Administración de Negocio</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-bmi.css?v=10.3.0.21">
  </head>
  <body>

    {$NAV}
    <div class="bdy">

      <ul id="slide-bmi" class="side-nav" style="z-index:1500;"><li><div class="user-view center"><span class="ntitc"></span></a></div></li><li><div class="divider"></div></li><li>

          <div class="subbmi row" id="opts4">
            <div class="col s12 center">                     
              <input type="radio" id="3most" checked name="plist">
              <label for="3most">3 Más Vendido</label>         

              <input type="radio" id="list" name="plist">
              <label for="list">Lista</label>
            </div>

            <div class="col s12 input-field">
              <label for="_desde">Desde</label>
              <input type="date" id="_desde" class="eder fch fo4">
            </div>

            <div class="col s12 input-field">
              <label for="_hasta">Hasta</label>
              <input type="date" id="_hasta" class="eder fch fo4">
            </div>

            <div class="col s12 hide" id="listc">
              <label>Lista de productos</label>
              <div class="chips chips-initial" id="cpl" list=""></div>
            </div>

            <input type="hidden" id="_extra">
            
          </div>

          <a class="btn btn-default" id="eslidec" style="bottom:0px;position:absolute;margin:0px;margin-bottom: 50px;">Salir</a>
        </li>
        </ul>

      <div class="row">
        <div class="col s6 input-field">
          <input type="date" id="vdesde0" value="" class="eder fch">
          <label for="vdesde0">Fecha Global Desde</label> 
        </div>
        <div class="col s6 input-field">
          <input type="date" id="vhasta0" value="" class="eder fch">
          <label for="vhasta0">Fecha Global Hasta</label> 
        </div>
      </div>

      <div class="row">
        <h6 class="mtit" sid="1" dsd="" hst="">Ventas x Hora</h6>
        <div class="col s3 mdiv">
          <div class="card">
            <canvas id="c0" height="240"></canvas>
          </div>
        </div>

        <div class="col s3 mdiv">
          <div class="card">
            <canvas id="c1" height="240"></canvas>
          </div>
        </div>

        <div class="col s3 mdiv">
          <div class="card">
            <canvas id="c2" height="240"></canvas>
          </div>
        </div>

        <div class="col s3 mdiv">
          <div class="card">
            <canvas id="c3" height="240"></canvas>
          </div>
        </div>

      </div>

        
        <div class="row">
          <div class="col s6 mdiv">
            <h6 class="mtit" sid="2" dsd="" hst="">Ventas Totales: <span id="tot"></span></h6>
          <div class="card">
            <canvas id="c4" height="120"></canvas>
          </div>
          </div>

        <div class="col s6">
          <h6 class="mtit" sid="3" dsd="" hst="">Flujo Efectivo: <span id="tefectivo">0.00</span></h6>
          <div style="background-color: white;height: 250px;">
            <table class="tbl bordered">
                <thead>
                    <tr>
                        <th>SUCURSAL</th> 
                        <th>VENTAS</th>
                        <th>SALIDAS</th>
                        <th>ENTRADAS</th>
                        <th>SALDO</th> 
                    </tr> 
                </thead>
                <tbody id="efectivo" scol="4"></tbody> 
            </table>
          </div>
        </div>

        </div>

        <div class="row">
          
        <div class="col s6">
          <h6 class="mtit" sid="4" dsd="" hst=""><span>5 Productos más Vendidos</span></h6>
          <div style="background-color: white;height: 250px;">
            <table class="tbl mtbl">
                <thead>
                    <tr>
                        <th>SUCURSAL</th> 
                        <th>PRODUCTO</th>
                        <th>CANTIDAD</th>
                    </tr> 
                </thead> 
                <tbody id="productos"></tbody>
            </table>
          </div>
        </div>

        </div>
      
    </div>   

    {$SCR}
    <script src="../assets/js/modulos/bmi.js?v=10.3.0.21"></script>
  </body>
</html>