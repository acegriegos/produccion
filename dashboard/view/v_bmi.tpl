<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Administración de Negocio</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-bmi.css?v=10.4.1.1">
  </head>
  <body>

    {$NAV}
    <div class="bdy">

    <div class="header-bar">

      <h1>Panel Administrativo</h1>

      <div class="toolbar">

          <div class="filter-group">
              <label>Mes</label>
              <select id="filtro_mes">
                <option value="0">Todo el Año</option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
          </div>

          <div class="filter-group">
              <label>Año</label>
              <input type="number" id="filtro_year" name="year" min="1900" max="2099" step="1" value="2024">
          </div>

          <div class="filter-group">
              <label>Sucursal</label>
              <select id="filtro_sucursal"></select>
          </div>

          <div class="filter-group">
              <label>Actividad</label>
              <select id="filtro_actividad"></select>
          </div>

          <button id="btnActualizar">
              Actualizar
          </button>

      </div>

    </div>

    <div>
      <!-- KPIs -->
      <div class="cards">
        <div class="card">
          <h3>Ventas Netas</h3>
          <div class="value">₡ <span id="ventas_mes">---</span></div>
          <div class="sub">Brutas ₡<span id="ventas_brutas_mes">---</span> · NC ₡<span id="nc_mes">---</span></div>

          <div class="sub">
              <span id="ventas_cantidad">0</span> documentos
          </div>
        </div>

        <div class="card">
          <h3>Compras Totales</h3>

          <div class="value">
              ₡ <span id="compras_mes">---</span>
          </div>

          <div class="sub">
              <span id="compras_cantidad">0</span> documentos
          </div>
      </div>

        <div class="card">
          <h3>Utilidad Neta</h3>
          <div class="value">₡ <span id="utilidad_mes">---</span></div>
          <div class="sub">Después de costos y ajustes</div>
        </div>

        <div class="card warning">
          <h3>IVA por Pagar</h3>

          <div class="value">
              ₡ <span id="iva_pagar">---</span>
          </div>

          <div class="sub">
              Débito - Crédito fiscal
          </div>
      </div>

        <div class="card">
          <h3>Productos Críticos</h3>
          <div class="value"><span id="bmin_mes">---</span></div>
          <div class="sub">Bajo stock mínimo</div>
        </div>
        <div class="card">
          <h3>Valor de Inventario</h3>
          <div class="value">₡ <span id="stock_mes">---</span></div>
          <div class="sub">Costo total en stock</div>
        </div>

        <div class="card">
            <h3>CxC</h3>

            <div class="value">
                ₡ <span id="cxc_mes">---</span>
            </div>

            <div class="sub">
                <span id="cxc_vencidas">0</span> vencidas
            </div>
        </div>

        <div class="card">
            <h3>CxP</h3>

            <div class="value">
                ₡ <span id="cxp_mes">---</span>
            </div>

            <div class="sub">
                Próximos vencimientos
            </div>
        </div>

      </div>

       <div class="section">
        <div class="tabs">
          <button class="active" onclick="showTab('ventas')">Ventas</button>
          <button onclick="showTab('compras')">Compras</button>
          <button onclick="showTab('inventario')">Inventario</button>
          <button onclick="showTab('rentabilidad')">Rentabilidad Anual</button>
          <button onclick="showTab('movimientos')">Movimientos Anual</button>
          <button onclick="showTab('articulos')">Artículos</button>
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

        <!-- ARTICULOS -->
        <div id="articulos" style="display:none;">

<section class="analisis-producto">

    <!-- =========================================================
         HEADER
    ========================================================== -->
    <div class="analisis-header">

        <div>

            <h2>Análisis de Producto</h2>

            <div class="producto-identificacion hide">
                <strong>Tubo Hierro Negro 2" x 2" x 1.5mm</strong>
                <span class="producto-codigo">COD: HN-2X2-15</span>
            </div>

            <div class="producto-buscador">

    <label>Producto</label>

    <input
        type="text"
        id="analisis_producto"
        placeholder="Buscar producto..."
        class="fastProduct autocomplete"
        vacc="1"
        vid="0"
        autocomplete="off"
    >

</div>
        </div>

        <div class="analisis-filtros">

            <select id="analisis_periodo">
                <option value="mes">Mes Actual</option>
                <option value="3meses">Últimos 3 meses</option>
                <option value="6meses">Últimos 6 meses</option>
                <option value="12meses">Últimos 12 meses</option>
                <option value="actual" selected>Año actual</option>
                <option value="pasado">2025</option>
            </select>

            <select id="analisis_unidad">
                <option value="monto">Montos</option>
                <option value="cantidad">Unidades</option>
            </select>

        </div>

    </div>


    <!-- =========================================================
         INDICADORES PRINCIPALES
    ========================================================== -->
    <div class="analisis-kpis">

    <div class="analisis-kpi">
        <div class="kpi-label">Ventas</div>
        <div class="kpi-value" id="analisis-ventas">—</div>
        <div class="kpi-extra" id="analisis-ventas-extra">—</div>
    </div>

    <div class="analisis-kpi">
        <div class="kpi-label">Unidades vendidas</div>
        <div class="kpi-value" id="analisis-cantidad">—</div>
        <div class="kpi-extra" id="analisis-cantidad-extra">—</div>
    </div>

    <div class="analisis-kpi">
        <div class="kpi-label">Costo de ventas</div>
        <div class="kpi-value" id="analisis-costo">—</div>
        <div class="kpi-extra" id="analisis-costo-extra">—</div>
    </div>

    <div class="analisis-kpi">
        <div class="kpi-label">Utilidad</div>
        <div class="kpi-value" id="analisis-utilidad">—</div>
        <div class="kpi-extra" id="analisis-utilidad-extra">—</div>
    </div>

    <div class="analisis-kpi">
        <div class="kpi-label">Inventario actual</div>
        <div class="kpi-value" id="analisis-stock">—</div>
        <div class="kpi-extra" id="analisis-stock-extra">—</div>
    </div>

</div>


    <!-- =========================================================
         GRAFICO PRINCIPAL
    ========================================================== -->
    <div class="analisis-grid-principal">

    <!-- GRÁFICO -->

    <div class="analisis-card grafico-card">

        <div class="card-header">

            <div>
                <h3>Comportamiento del producto</h3>
                <span>Ventas, compras y utilidad por mes</span>
            </div>

            <div class="grafico-leyenda">

                <span>
                    <i class="leyenda ventas"></i>
                    Ventas
                </span>

                <span>
                    <i class="leyenda compras"></i>
                    Compras
                </span>

                <span>
                    <i class="leyenda utilidad"></i>
                    Utilidad
                </span>

            </div>

        </div>

        <div class="grafico">
            <canvas id="analisis-grafico-producto"></canvas>
        </div>

        <div class="grafico-ayuda">
            <span>●</span>
            Seleccione un mes para consultar el detalle diario
        </div>

    </div>


    <!-- INDICADORES -->

    <div class="analisis-card">

        <div class="card-header">

            <div>
                <h3>Indicadores</h3>
                <span>Comportamiento de la demanda</span>
            </div>

        </div>

        <div class="indicadores">

            <div class="indicador">
                <span>Venta promedio mensual</span>
                <strong id="indicador-promedio">—</strong>
            </div>

            <div class="indicador">
                <span>Venta máxima mensual</span>
                <strong id="indicador-maximo">—</strong>
            </div>

            <div class="indicador">
                <span>Venta mínima mensual</span>
                <strong id="indicador-minimo">—</strong>
            </div>

            <div class="indicador">
                <span>Rotación anual</span>
                <strong id="indicador-rotacion">—</strong>
            </div>

            <div class="indicador">
                <span>Tendencia últimos 3 meses</span>
                <strong
                    id="indicador-tendencia"
                    class="positivo">
                    —
                </strong>
            </div>

            <div class="indicador">
                <span>Última venta</span>
                <strong id="indicador-ultima-venta">—</strong>
            </div>

        </div>


        <div class="recomendacion">

            <div class="recomendacion-titulo">
                RECOMENDACIÓN DE COMPRA
            </div>

            <div class="recomendacion-contenido">

                <strong id="indicador-recomendacion">
                    —
                </strong>

                <span id="indicador-recomendacion-texto">
                    —
                </span>

            </div>

        </div>

    </div>

</div>


<!-- ============================================= -->
<!-- DRILL DOWN NIVEL 1                            -->
<!-- ============================================= -->

<div
    class="analisis-card detalle-card"
    id="analisis-detalle">

    <div class="card-header">

        <div>

            <h3 id="detalle-titulo">
                Detalle del período
            </h3>

            <span id="detalle-periodo">
                Seleccione un mes en el gráfico
            </span>

        </div>

        <button
            type="button"
            class="detalle-volver"
            id="detalle-volver"
            onclick="cerrarDetalleProducto()">

            ← Gráfico

        </button>

    </div>


    <!-- RESUMEN -->

    <div class="detalle-resumen">

        <div class="detalle-resumen-item">
            <span>Ventas</span>
            <strong id="detalle-ventas">—</strong>
        </div>

        <div class="detalle-resumen-item">
            <span>Compras</span>
            <strong id="detalle-compras">—</strong>
        </div>

        <div class="detalle-resumen-item">
            <span>Utilidad</span>
            <strong id="detalle-utilidad">—</strong>
        </div>

        <div class="detalle-resumen-item">
            <span>Unidades</span>
            <strong id="detalle-cantidad">—</strong>
        </div>

    </div>


    <!-- MOVIMIENTO DIARIO -->

    <div class="detalle-seccion">

        <div class="detalle-seccion-header">

            <div>
                <strong>Movimiento diario</strong>

                <span>
                    Seleccione un día para consultar
                    los documentos
                </span>
            </div>

        </div>


        <div
            class="detalle-dias"
            id="detalle-dias">
        </div>

    </div>

    <!-- =============================================
     DRILL DOWN NIVEL 2
============================================= -->

<div
    class="detalle-documentos"
    id="detalle-documentos"
    style="display:none;">

    <div class="detalle-documentos-header">

        <div>
            <strong id="documentos-titulo">
                Movimientos del día
            </strong>

            <span id="documentos-subtitulo">
                Documentos relacionados con el producto
            </span>
        </div>

        <button
            type="button"
            class="documentos-cerrar"
            onclick="cerrarDetalleDia()">

            Cerrar

        </button>

    </div>


    <!-- RESUMEN DEL DÍA -->

    <div class="documentos-resumen">

        <div>
            <span>Ventas</span>
            <strong id="documentos-ventas">—</strong>
        </div>

        <div>
            <span>Compras</span>
            <strong id="documentos-compras">—</strong>
        </div>

        <div>
            <span>Devoluciones</span>
            <strong id="documentos-devoluciones">—</strong>
        </div>

        <div>
            <span>Unidades</span>
            <strong id="documentos-cantidad">—</strong>
        </div>

    </div>


    <!-- DOCUMENTOS -->

    <div class="documentos-lista" id="documentos-lista">
    </div>

</div>

</div>


    <!-- =========================================================
         DETALLE DEL MES
    ========================================================== -->
    <div class="analisis-card">

        <div class="card-header">

            <div>
                <h3>Detalle de ventas</h3>
                <span>Agosto 2026</span>
            </div>

            <button class="btn-secundario">
                Ver compras
            </button>

        </div>

        <div class="detalle-mes">

            <div class="detalle-resumen">

                <div>
                    <span>Ventas</span>
                    <strong>₡1.42 M</strong>
                </div>

                <div>
                    <span>Unidades</span>
                    <strong>580</strong>
                </div>

                <div>
                    <span>Clientes</span>
                    <strong>18</strong>
                </div>

                <div>
                    <span>Utilidad</span>
                    <strong>₡385 K</strong>
                </div>

            </div>


            <!-- MINI GRÁFICO DIARIO -->
            <div class="grafico-diario">

                <div class="dia activo">
                    <span>01</span>
                    <i style="height:35%"></i>
                </div>

                <div class="dia">
                    <span>02</span>
                    <i style="height:52%"></i>
                </div>

                <div class="dia">
                    <span>03</span>
                    <i style="height:28%"></i>
                </div>

                <div class="dia">
                    <span>04</span>
                    <i style="height:65%"></i>
                </div>

                <div class="dia">
                    <span>05</span>
                    <i style="height:42%"></i>
                </div>

                <div class="dia">
                    <span>06</span>
                    <i style="height:78%"></i>
                </div>

                <div class="dia">
                    <span>07</span>
                    <i style="height:55%"></i>
                </div>

                <div class="dia">
                    <span>08</span>
                    <i style="height:85%"></i>
                </div>

                <div class="dia">
                    <span>09</span>
                    <i style="height:40%"></i>
                </div>

                <div class="dia">
                    <span>10</span>
                    <i style="height:70%"></i>
                </div>

                <div class="dia">
                    <span>11</span>
                    <i style="height:58%"></i>
                </div>

                <div class="dia">
                    <span>12</span>
                    <i style="height:92%"></i>
                </div>

            </div>

        </div>

    </div>


    <!-- =========================================================
         CLIENTES / PROVEEDORES
    ========================================================== -->
    <div class="analisis-grid-2">

        <!-- TOP CLIENTES -->
        <div class="analisis-card">

            <div class="card-header">
                <div>
                    <h3>Top clientes</h3>
                    <span>Ventas del período</span>
                </div>
            </div>

            <table class="tabla-analisis">

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Unidades</th>
                        <th>Ventas</th>
                        <th>%</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>1</td>
                        <td>Construcciones ABC</td>
                        <td>1,250</td>
                        <td>₡3.85 M</td>
                        <td>31%</td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>Metalúrgica CR</td>
                        <td>840</td>
                        <td>₡2.72 M</td>
                        <td>22%</td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>Inversiones XYZ</td>
                        <td>620</td>
                        <td>₡1.94 M</td>
                        <td>16%</td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>Constructora Norte</td>
                        <td>430</td>
                        <td>₡1.31 M</td>
                        <td>11%</td>
                    </tr>

                    <tr>
                        <td>5</td>
                        <td>Hierros del Valle</td>
                        <td>315</td>
                        <td>₡980 K</td>
                        <td>8%</td>
                    </tr>

                </tbody>

            </table>

            <div class="card-footer">
                37 clientes han comprado este producto
            </div>

        </div>


        <!-- TOP PROVEEDORES -->
        <div class="analisis-card">

            <div class="card-header">
                <div>
                    <h3>Top proveedores</h3>
                    <span>Compras del período</span>
                </div>
            </div>

            <table class="tabla-analisis">

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Proveedor</th>
                        <th>Unidades</th>
                        <th>Compras</th>
                        <th>Costo prom.</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>1</td>
                        <td>Aceros Nacionales</td>
                        <td>4,500</td>
                        <td>₡12.5 M</td>
                        <td>₡2,777</td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>Distribuidora Central</td>
                        <td>2,100</td>
                        <td>₡6.1 M</td>
                        <td>₡2,904</td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>Metalúrgica Internacional</td>
                        <td>1,350</td>
                        <td>₡4.0 M</td>
                        <td>₡2,963</td>
                    </tr>

                </tbody>

            </table>

            <div class="card-footer">
                Último costo registrado: <strong>₡2,950</strong>
            </div>

        </div>

    </div>


    <!-- =========================================================
         EVOLUCIÓN DE COSTO
    ========================================================== -->
    <div class="analisis-card">

        <div class="card-header">

            <div>
                <h3>Evolución del costo</h3>
                <span>Costo promedio de compra por mes</span>
            </div>

        </div>

        <div class="costo-evolucion">

            <div>
                <span>Ene</span>
                <strong>₡2,710</strong>
            </div>

            <div>
                <span>Feb</span>
                <strong>₡2,735</strong>
            </div>

            <div>
                <span>Mar</span>
                <strong>₡2,780</strong>
            </div>

            <div>
                <span>Abr</span>
                <strong>₡2,810</strong>
            </div>

            <div>
                <span>May</span>
                <strong>₡2,850</strong>
            </div>

            <div>
                <span>Jun</span>
                <strong>₡2,875</strong>
            </div>

            <div>
                <span>Jul</span>
                <strong>₡2,910</strong>
            </div>

            <div>
                <span>Ago</span>
                <strong>₡2,950</strong>
            </div>

        </div>

    </div>

</section>
          
        </div>

       </div> 
    </div>

    </div>
    {$SCR}
    <script src="../assets/libs/charts/chart.js?v=10.4.1.1"></script>  
    <script src="../assets/js/modulos/bmi.js?v=10.4.1.1"></script>
  </body>
</html>