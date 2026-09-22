<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Administración de Negocio</title>
   {$STY}
   {$SCR}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-bmi.css?v=10.4.1.1">
  </head>
  <body>

    {$NAV}
    <div class="bdy">

    <header>
      <h1>Panel Administrativo</h1>
    </header>

    <div>
      <!-- KPIs -->
      <div class="cards">
        <div class="card">
          <h3>Ventas Netas</h3>
          <div class="value">₡ <span id="ventas_mes">---</span></div>
          <div class="sub">Brutas ₡<span id="ventas_brutas_mes">---</span> · NC ₡<span id="nc_mes">---</span></div>
        </div>
        <div class="card">
          <h3>Utilidad Neta</h3>
          <div class="value">₡ <span id="utilidad_mes">---</span></div>
          <div class="sub">Después de costos y ajustes</div>
        </div>
        <div class="card">
          <h3>Valor de Inventario</h3>
          <div class="value">₡ <span id="stock_mes">---</span></div>
          <div class="sub">Costo total en stock</div>
        </div>
        <div class="card">
          <h3>Productos Críticos</h3>
          <div class="value"><span id="bmin_mes">---</span></div>
          <div class="sub">Bajo stock mínimo</div>
        </div>
      </div>

       <div class="section">
        <div class="tabs">
          <button class="active" onclick="showTab('ventas')">Ventas</button>
          <button onclick="showTab('compras')">Compras</button>
          <button onclick="showTab('inventario')">Inventario</button>
          <button onclick="showTab('rentabilidad')">Rentabilidad Anual</button>
          <button onclick="showTab('movimientos')">Movimientos Anual</button>
        </div>

        <!-- VENTAS -->
        <div id="ventas" class="grid">
          <div>
            <p class="hint">Ventas semanales (Costo / Utilidad / Notas de crédito)</p>
            <canvas id="ventasChart"></canvas>
          </div>
          <div>
            <table>
              <thead><tr><th>Documento</th><th>Cliente</th><th>Costo</th><th>Utilidad</th><th>Total</th></tr></thead>
              <tbody id="ventasTabla"><tr><td colspan="5">Seleccione una semana</td></tr></tbody>
            </table>
          </div>
        </div>

        <!-- COMPRAS -->
        <div id="compras" class="grid" style="display:none;">
          <div>
            <p class="hint">Compras semanales</p>
            <canvas id="comprasChart"></canvas>
          </div>
          <div>
            <table>
              <thead><tr><th>Documento</th><th>Proveedor</th><th>Monto</th></tr></thead>
              <tbody><tr><td colspan="3">Seleccione una semana</td></tr></tbody>
            </table>
          </div>
        </div>

        <!-- INVENTARIO -->
        <div id="inventario" class="grid" style="display:none;">
          <div>
            <p class="hint">Stock actual vs mínimo por producto</p>
            <canvas id="inventarioChart"></canvas>
          </div>
          <div>
            <table>
              <thead><tr><th>Producto</th><th>Stock</th><th>Mínimo</th><th>Estado</th></tr></thead>
              <tbody id="inventarioTabla"><tr><td colspan="4">Seleccione un producto</td></tr></tbody>
            </table>
          </div>
        </div>

        <!-- RENTABILIDAD ANUAL -->
        <div id="rentabilidad" class="grid" style="display:none;">
          <div>
            <p class="hint">Rentabilidad mensual del año</p>
            <canvas id="rentabilidadChart"></canvas>
          </div>
          <div>
            <table>
              <thead><tr><th>Mes</th><th>Ventas</th><th>Costos</th><th>Utilidad</th><th>Margen %</th></tr></thead>
              <tbody><tr><td colspan="5">Seleccione un mes</td></tr></tbody>
            </table>
          </div>
        </div>

        <!-- MOVIMIENTOS ANUAL -->
        <div id="movimientos" class="grid" style="display:none;">
          <div>
            <p class="hint">Ventas anuales por producto</p>
            <canvas id="movimientosChart"></canvas>
          </div>
          <div>
            <table>
              <thead><tr><th>Producto</th><th>Mes</th><th>Unidades</th><th>Total</th></tr></thead>
              <tbody><tr><td colspan="4">Seleccione un punto del gráfico</td></tr></tbody>
            </table>
          </div>
        </div>
       </div> 
    </div>

    </div>
    <script src="../assets/libs/charts/chart.js?v=10.4.1.1"></script>  
    <script src="../assets/js/modulos/bmi.js?v=10.4.1.1"></script>
  </body>
</html>