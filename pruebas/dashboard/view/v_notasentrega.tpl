<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Notas de Entrega</title>
  {$STY}
  <link rel="stylesheet" href="../assets/css/modulos/style-notasentrega.css?v=2">
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
          <label>Desde <input id="ne-f-desde" type="date"></label>
          <label>Hasta <input id="ne-f-hasta" type="date"></label>
          <label>ID de usuario responsable <input id="ne-f-usuario" type="number" min="1" step="1" placeholder="Todos"></label>
          <button type="submit" class="btn">Buscar</button>
        </form>
      </div>
      <div class="ne-card">
        <div class="ne-table-wrap">
          <table class="striped">
            <thead><tr><th>Número</th><th>Fecha</th><th>Cliente</th><th>Responsable</th><th>Estado</th><th>Factura</th><th></th></tr></thead>
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
    </section>
  </main>
  {$SCR}
  <script src="../assets/js/modulos/notasentrega.js?v=3"></script>
</body>
</html>
