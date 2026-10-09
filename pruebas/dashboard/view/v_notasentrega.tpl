<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Notas de Entrega</title>
  {$STY}
  <link rel="stylesheet" href="../assets/css/modulos/style-notasentrega.css?v=8">
</head>
<body>
  {$NAV}
  <main class="bdy ne-app" id="ne-app">
    <header class="ne-title">
      <div>
        <h1>Notas de Entrega</h1>
        <p>Emisión y consulta de materiales entregados pendientes de facturación.</p>
      </div>
      <div class="ne-contexto" id="ne-contexto"></div>
    </header>

    <nav class="ne-tabs" aria-label="Secciones de notas de entrega">
      <button type="button" class="ne-tab active" data-ne-tab="emitir">Emitir nota</button>
      <button type="button" class="ne-tab" data-ne-tab="listado">Consultar notas</button>
      <button type="button" class="ne-tab" data-ne-tab="facturar" id="ne-tab-facturar" hidden>Facturar notas</button>
      <button type="button" class="ne-tab" data-ne-tab="detalle" id="ne-tab-detalle" hidden>Detalle</button>
    </nav>
    <div class="ne-aviso" id="ne-aviso" role="status" aria-live="polite" hidden></div>

    <section class="ne-panel" id="ne-emitir">
      <form id="ne-form" autocomplete="off">
        <div class="ne-card">
          <h2>Cliente</h2>
          <div class="ne-grid">
            <label>Tipo de cliente
              <select id="ne-tipo-cliente" class="browser-default">
                <option value="registrado">Registrado</option>
                <option value="contado">Contado / nombre libre</option>
              </select>
            </label>
            <div id="ne-cliente-registrado" class="ne-search">
              <label for="ne-buscar-cliente">Buscar cliente por nombre o cédula</label>
              <input id="ne-buscar-cliente" type="search" placeholder="Escriba al menos 2 caracteres">
              <div class="ne-resultados" id="ne-resultados-cliente"></div>
              <p class="ne-seleccion" id="ne-cliente-elegido">Ningún cliente seleccionado</p>
            </div>
            <label id="ne-cliente-libre" hidden>Nombre del cliente contado
              <input id="ne-nombre-cliente" type="text" maxlength="64">
            </label>
            <label id="ne-cedula-libre" hidden>Identificación del cliente, opcional
              <input id="ne-cedula-cliente" type="text" maxlength="45">
            </label>
            <label>Referencia, opcional
              <input id="ne-referencia" type="text" maxlength="55">
            </label>
            <label>Observaciones generales, opcional
              <textarea id="ne-observaciones" maxlength="512" rows="2"></textarea>
            </label>
          </div>
        </div>

        <div class="ne-card">
          <div class="ne-card-head">
            <div><h2>Materiales</h2><p>El proveedor se selecciona para cada artículo. El saldo mostrado corresponde al inventario 6.</p></div>
            <button type="button" class="btn ne-secondary" id="ne-agregar-linea">Agregar artículo</button>
          </div>
          <div id="ne-lineas"></div>
        </div>
        <div class="ne-actions">
          <button type="submit" class="btn" id="ne-emitir-boton">Emitir y descontar inventario</button>
          <span>Después de emitir, los datos de la nota ya no se editan.</span>
        </div>
      </form>
    </section>

    <section class="ne-panel" id="ne-listado" hidden>
      <div class="ne-card">
        <h2>Buscar notas</h2>
        <form id="ne-filtros" class="ne-grid ne-filtros">
          <label>Estado
            <select id="ne-f-estado" class="browser-default">
              <option value="1">Pendiente</option>
              <option value="0">Todos</option>
              <option value="2">Facturada</option>
              <option value="3">Anulada</option>
            </select>
          </label>
          <label>Cliente
            <select id="ne-f-tipo-cliente" class="browser-default">
              <option value="-1">Todos</option>
              <option value="0">Contado</option>
              <option value="registrado">Cliente registrado</option>
            </select>
          </label>
          <div class="ne-search" id="ne-f-busqueda-cliente" hidden>
            <label for="ne-f-cliente-texto">Buscar cliente</label>
            <input id="ne-f-cliente-texto" type="search" placeholder="Nombre o cédula">
            <div class="ne-resultados" id="ne-f-resultados-cliente"></div>
            <p class="ne-seleccion" id="ne-f-cliente-elegido">Ningún cliente seleccionado</p>
          </div>
          <div class="ne-f-fechas">
            <label for="ne-f-desde">Desde <input id="ne-f-desde" type="date"></label>
            <label for="ne-f-hasta">Hasta <input id="ne-f-hasta" type="date"></label>
            <button type="button" class="btn ne-secondary" id="ne-limpiar-fechas">Quitar fechas</button>
          </div>
          <div class="ne-search">
            <label for="ne-f-usuario">Responsable</label>
            <input id="ne-f-usuario" type="search" placeholder="Buscar por nombre">
            <div class="ne-resultados" id="ne-f-resultados-usuario"></div>
            <p class="ne-seleccion" id="ne-f-usuario-elegido">Todos los responsables</p>
          </div>
          <button type="submit" class="btn">Buscar</button>
        </form>
      </div>
      <div class="ne-card">
        <div class="ne-card-head ne-seleccion-factura">
          <p>Selecciona notas pendientes del mismo cliente para preparar una factura.</p>
          <button type="button" class="btn" id="ne-preparar-factura" disabled>Preparar factura (0)</button>
        </div>
        <div class="ne-table-wrap">
          <table class="striped">
            <thead><tr><th>Facturar</th><th>Número</th><th>Fecha</th><th>Cliente</th><th>Responsable</th><th>Estado</th><th>Factura</th><th></th></tr></thead>
            <tbody id="ne-lista"></tbody>
          </table>
        </div>
        <div class="ne-paginacion">
          <button type="button" class="btn ne-secondary" id="ne-anterior">Anterior</button>
          <span id="ne-pagina"></span>
          <button type="button" class="btn ne-secondary" id="ne-siguiente">Siguiente</button>
        </div>
      </div>
    </section>

    <section class="ne-panel" id="ne-facturar" hidden>
      <div class="ne-card">
        <h2>Preparar factura</h2>
        <p id="ne-facturar-resumen"></p>
        <p>Define el precio por unidad y el descuento total de cada línea; las cantidades consideran las devoluciones previas. La factura queda pendiente de registro fiscal y conserva el vínculo con las notas, sin descontar existencias otra vez.</p>
        <form id="ne-facturar-form" autocomplete="off">
          <div class="ne-grid ne-factura-cabecera">
            <label>Comprobante
              <select id="ne-fa-documento" class="browser-default" required>
                <option value="1">Factura electrónica</option>
                <option value="7">Tiquete electrónico</option>
                <option value="8">Factura simplificada (S)</option>
                <option value="10">Factura de exportación (E)</option>
              </select>
            </label>
            <label>Tipo de factura
              <select id="ne-fa-tipo" class="browser-default" required></select>
            </label>
            <label>Forma de pago
              <select id="ne-fa-pago" class="browser-default" required></select>
            </label>
            <label>Moneda
              <select id="ne-fa-moneda" class="browser-default" required></select>
            </label>
            <label>Tipo de cambio
              <input id="ne-fa-divisa" type="number" min="0.01" step="0.01" required>
            </label>
            <label>Plazo (días)
              <input id="ne-fa-plazo" type="number" min="0" max="9999" step="1" value="0">
            </label>
            <label>Orden de compra, opcional
              <input id="ne-fa-oc" type="text" maxlength="45">
            </label>
            <label>Referencia, opcional
              <input id="ne-fa-referencia" type="text" maxlength="55">
            </label>
            <label class="ne-factura-comentario">Comentario, opcional
              <textarea id="ne-fa-comentario" maxlength="512" rows="2"></textarea>
            </label>
          </div>
          <div class="ne-table-wrap">
            <table class="striped ne-tabla-factura">
              <thead><tr><th>Nota</th><th>Material</th><th>Cantidad neta</th><th>Precio unitario</th><th>Descuento (monto)</th><th>IVA</th><th>Total línea</th></tr></thead>
              <tbody id="ne-facturar-lineas"></tbody>
            </table>
          </div>
          <div class="ne-total-factura" aria-live="polite">
            <span>Subtotal gravado <strong id="ne-fa-subtotal">₡0.00</strong></span>
            <span>Exento <strong id="ne-fa-exento">₡0.00</strong></span>
            <span>Descuento <strong id="ne-fa-descuento">₡0.00</strong></span>
            <span>IVA <strong id="ne-fa-impuesto">₡0.00</strong></span>
            <span>Total <strong id="ne-fa-total">₡0.00</strong></span>
          </div>
          <div class="ne-actions">
            <button type="button" class="btn ne-secondary" id="ne-cancelar-factura">Volver a consultar</button>
            <button type="submit" class="btn" id="ne-facturar-boton">Crear factura</button>
          </div>
        </form>
      </div>
    </section>

    <section class="ne-panel" id="ne-detalle" hidden>
      <div class="ne-actions ne-no-print">
        <button type="button" class="btn ne-secondary" id="ne-volver">Volver al listado</button>
        <button type="button" class="btn" id="ne-imprimir">Imprimir boleta</button>
      </div>
      <article class="ne-boleta" id="ne-boleta" aria-label="Boleta de entrega">
        <div class="ne-boleta-head">
          <div><strong>ACEROS GRIEGOS</strong><span>Nota de Entrega</span></div>
          <div class="ne-boleta-numero" id="ne-d-numero"></div>
        </div>
        <div class="ne-boleta-datos">
          <p><strong>Cliente:</strong> <span id="ne-d-cliente"></span></p>
          <p><strong>Identificación:</strong> <span id="ne-d-cedula"></span></p>
          <p><strong>Emisión:</strong> <span id="ne-d-fecha"></span></p>
          <p><strong>Responsable:</strong> <span id="ne-d-usuario"></span></p>
          <p><strong>Sucursal:</strong> <span id="ne-d-sucursal"></span></p>
          <p><strong>Estado:</strong> <span id="ne-d-estado"></span></p>
          <p><strong>Referencia:</strong> <span id="ne-d-referencia"></span></p>
          <p><strong>Factura:</strong> <span id="ne-d-factura"></span></p>
        </div>
        <div class="ne-table-wrap">
          <table>
            <thead><tr><th>#</th><th>Código y material</th><th>Proveedor</th><th>Unidad</th><th>Cantidad</th><th>Indicación</th></tr></thead>
            <tbody id="ne-d-lineas"></tbody>
          </table>
        </div>
        <p class="ne-boleta-notas" id="ne-d-observaciones"></p>
        <div class="ne-firmas"><span>Entregado por</span><span>Recibido por</span></div>
        <p class="ne-boleta-pie">Comprobante de entrega física. Los precios e impuestos se definen al facturar.</p>
      </article>

      <section class="ne-card ne-no-print" id="ne-devolucion-panel" hidden>
        <h2>Registrar devolución</h2>
        <p>Indica las cantidades recibidas. La nota se anulará automáticamente cuando se devuelva todo el material.</p>
        <form id="ne-devolucion-form" autocomplete="off">
          <label>Motivo, opcional
            <textarea id="ne-devolucion-motivo" maxlength="255"></textarea>
          </label>
          <div class="ne-table-wrap">
            <table>
              <thead><tr><th>Material</th><th>Entregada</th><th>Devuelta</th><th>Pendiente</th><th>Recibir ahora</th></tr></thead>
              <tbody id="ne-devolucion-lineas"></tbody>
            </table>
          </div>
          <div class="ne-actions">
            <button type="submit" class="btn" id="ne-devolver-boton">Registrar devolución</button>
          </div>
        </form>
      </section>

      <section class="ne-card ne-no-print" aria-labelledby="ne-historial-titulo">
        <h2 id="ne-historial-titulo">Historial de devoluciones</h2>
        <div id="ne-d-historial"></div>
      </section>
    </section>
  </main>
  {$SCR}
  <script src="../assets/js/modulos/notasentrega.js?v=8"></script>
</body>
</html>
