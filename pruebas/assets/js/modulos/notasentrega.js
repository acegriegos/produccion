(function () {
  'use strict';

  var root = document.getElementById('ne-app');
  if (!root) return;
  var endpoint = window.location.pathname;
  var csrfToken = null;
  var maxLineas = 100;
  var unidades = [];
  var cliente = null;
  var clienteFiltro = null;
  var usuarioFiltro = null;
  var offset = 0;
  var limite = 25;
  var clavePendiente = null;
  var huellaPendiente = null;
  var notaVisible = null;
  var tabActual = 'emitir';
  var avisos = {emitir: null, listado: null, detalle: null};
  var claveDevolucionPendiente = null;
  var huellaDevolucionPendiente = null;
  var notasSeleccionadas = {};
  var opcionesFactura = null;
  var notasEnFactura = [];
  var lineasEnFactura = [];
  var modoEmision = 'regular';
  var facturaOrigen = null;
  var ordenOrigen = null;
  var claveFacturaPendiente = null;
  var huellaFacturaPendiente = null;
  var claveOrdenPendiente = null;
  var huellaOrdenPendiente = null;
  var temporizadorFactura = null;
  var solicitudFactura = null;
  var temporizadorOrden = null;
  var solicitudOrden = null;

  function el(id) { return document.getElementById(id); }
  function valor(id) { return el(id).value.trim(); }
  function texto(id, value) { el(id).textContent = value == null || value === '' ? '—' : String(value); }
  function estadoNombre(id) {
    return ({1: 'Pendiente de factura', 2: 'Facturada', 3: 'Anulada', 4: 'Cerrada desde factura'})[id] || 'Desconocido';
  }
  function pintarAviso() {
    var caja = el('ne-aviso');
    var actual = avisos[tabActual];
    caja.textContent = actual ? actual.mensaje : '';
    caja.classList.toggle('error', !!actual && actual.esError);
    caja.hidden = !actual;
    if (actual && actual.esError) caja.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }
  function aviso(mensaje, esError, seccion) {
    seccion = seccion || tabActual;
    avisos[seccion] = mensaje ? {mensaje: mensaje, esError: !!esError} : null;
    if (seccion === tabActual) pintarAviso();
  }
  function api(accion, params, opciones) {
    var query = new URLSearchParams(params || {});
    query.set('accion', accion);
    return fetch(endpoint + '?' + query.toString(), Object.assign({
      credentials: 'same-origin',
      cache: 'no-store',
      headers: {'Accept': 'application/json'}
    }, opciones || {})).then(function (respuesta) {
      return respuesta.json().then(function (cuerpo) {
        if (!respuesta.ok || !cuerpo.succed) {
          throw new Error(cuerpo.error && cuerpo.error.mensaje || 'No se pudo completar la operación.');
        }
        return cuerpo.data;
      });
    });
  }
  function cambiarTab(nombre) {
    tabActual = nombre;
    ['emitir', 'listado', 'facturar', 'detalle'].forEach(function (tab) {
      el('ne-' + tab).hidden = tab !== nombre;
      var boton = document.querySelector('[data-ne-tab="' + tab + '"]');
      boton.classList.toggle('active', tab === nombre);
    });
    pintarAviso();
    if (nombre === 'listado') cargarLista();
    if (nombre === 'facturar') el('ne-tab-facturar').hidden = false;
    else if (!notasEnFactura.length) el('ne-tab-facturar').hidden = true;
    if (nombre === 'detalle') el('ne-tab-detalle').hidden = false;
  }
  function cambiarModoEmision(modo) {
    if (modo !== 'regular' && modo !== 'factura' && modo !== 'orden') return;
    modoEmision = modo;
    el('ne-form').hidden = modo !== 'regular';
    el('ne-factura-formulario').hidden = modo !== 'factura';
    el('ne-orden-formulario').hidden = modo !== 'orden';
    Array.prototype.forEach.call(document.querySelectorAll('[data-ne-origen]'), function (boton) {
      var activo = boton.getAttribute('data-ne-origen') === modo;
      boton.classList.toggle('active', activo);
      boton.setAttribute('aria-pressed', activo ? 'true' : 'false');
    });
    aviso('', false, 'emitir');
  }
  function agregarCelda(fila, value) {
    var celda = document.createElement('td');
    celda.textContent = value == null || value === '' ? '—' : String(value);
    fila.appendChild(celda);
    return celda;
  }
  function renderizarEnlaceFactura(contenedor, idFactura) {
    contenedor.replaceChildren();
    if (idFactura == null || !Number.isInteger(Number(idFactura)) || Number(idFactura) < 1) {
      contenedor.textContent = '—';
      return;
    }
    var id = Number(idFactura);
    var acciones = document.createElement('div');
    acciones.className = 'ne-acciones-factura';
    [false, true].forEach(function (imprimir) {
      var url = 'facturacion?accion=6&id=' + encodeURIComponent(id) + '&tp=false'
        + (imprimir ? '&fp=1' : '');
      if (imprimir) {
        var botonImprimir = document.createElement('button');
        botonImprimir.type = 'button';
        botonImprimir.className = 'ne-link-factura ne-link-imprimir';
        botonImprimir.textContent = 'Imprimir';
        botonImprimir.setAttribute('aria-label', 'Imprimir factura interna ' + id);
        botonImprimir.addEventListener('click', function (evento) {
          evento.preventDefault();
          evento.stopPropagation();
          var ventana = window.open(url, '_blank');
          if (ventana) ventana.opener = null;
          else aviso('Permite las ventanas emergentes para imprimir la factura.', true);
        });
        acciones.appendChild(botonImprimir);
        return;
      }
      var enlace = document.createElement('a');
      enlace.className = 'ne-link-factura';
      enlace.href = url;
      enlace.target = '_blank';
      enlace.rel = 'noopener';
      enlace.title = 'Ver factura interna #' + id;
      enlace.textContent = 'Ver';
      acciones.appendChild(enlace);
    });
    contenedor.appendChild(acciones);
  }
  function agregarEnlaceOrigen(contenedor, idDocumento, numero, tipo) {
    var id = Number(idDocumento);
    var etiqueta = numero || idDocumento;
    if (!Number.isInteger(id) || id < 1) {
      contenedor.appendChild(document.createTextNode(String(etiqueta)));
      return;
    }
    var enlace = document.createElement('a');
    enlace.className = 'ne-link-factura';
    enlace.href = 'facturacion?accion=6&id=' + encodeURIComponent(id) + '&tp=false';
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    enlace.title = 'Ver ' + tipo + ' ' + etiqueta;
    enlace.textContent = etiqueta;
    contenedor.appendChild(enlace);
  }
  function botonResultado(etiqueta, objeto, seleccionar) {
    var boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = etiqueta;
    boton.addEventListener('click', function () { seleccionar(objeto); });
    return boton;
  }
  function conectarBusqueda(input, contenedor, tipo, seleccionar, limpiar) {
    var seccion = input.closest('.ne-panel').id.slice(3);
    var secuencia = 0;
    var temporizador = null;
    var solicitud = null;
    input.addEventListener('input', function () {
      limpiar();
      contenedor.replaceChildren();
      var q = input.value.trim();
      secuencia += 1;
      var actual = secuencia;
      clearTimeout(temporizador);
      if (solicitud) solicitud.abort();
      if (q.length < 2) return;
      temporizador = setTimeout(function () {
        solicitud = window.AbortController ? new AbortController() : null;
        api('buscar', {tipo: tipo, q: q}, solicitud ? {signal: solicitud.signal} : {}).then(function (datos) {
          if (actual !== secuencia) return;
          contenedor.replaceChildren();
          if (!datos.resultados.length) {
            var vacio = document.createElement('p');
            vacio.textContent = 'Sin resultados';
            contenedor.appendChild(vacio);
          }
          datos.resultados.forEach(function (item) {
            var etiqueta = tipo === 'productos'
              ? item.codigo + ' · ' + item.nombre
              : item.nombre + (item.cedula ? ' · ' + item.cedula : '');
            contenedor.appendChild(botonResultado(etiqueta, item, function (elegido) {
              secuencia += 1;
              input.value = etiqueta;
              contenedor.replaceChildren();
              seleccionar(elegido);
            }));
          });
        }).catch(function (error) {
          if (error.name !== 'AbortError' && actual === secuencia) aviso(error.message, true, seccion);
        });
      }, tipo === 'productos' ? 100 : 0);
    });
  }
  function cambiarTipoCliente() {
    var contado = valor('ne-tipo-cliente') === 'contado';
    el('ne-cliente-registrado').hidden = contado;
    el('ne-cliente-libre').hidden = !contado;
    el('ne-cedula-libre').hidden = !contado;
    cerrarFormularioCrearCliente(true);
    cliente = null;
    el('ne-buscar-cliente').value = '';
    texto('ne-cliente-elegido', 'Ningún cliente seleccionado');
    el('ne-resultados-cliente').replaceChildren();
  }
  function cerrarFormularioCrearCliente(limpiar) {
    el('ne-crear-cliente-panel').hidden = true;
    Array.prototype.forEach.call(
      el('ne-crear-cliente-campos').querySelectorAll('input, select, button'),
      function (control) { control.disabled = true; }
    );
    if (limpiar) {
      el('ne-nuevo-cliente-nombre').value = '';
      el('ne-nuevo-cliente-cedula').value = '';
      el('ne-nuevo-cliente-tipo').value = '1';
      el('ne-nuevo-cliente-correo').value = '';
    }
  }
  function crearCliente(evento) {
    evento.preventDefault();
    var nombre = el('ne-nuevo-cliente-nombre');
    var cedula = el('ne-nuevo-cliente-cedula');
    var correo = el('ne-nuevo-cliente-correo');
    if (!nombre.reportValidity() || !cedula.reportValidity() || !correo.reportValidity()) return;
    var boton = el('ne-guardar-cliente');
    boton.disabled = true;
    api('crear-cliente', {}, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken},
      body: JSON.stringify({
        nombre: valor('ne-nuevo-cliente-nombre'),
        cedula: valor('ne-nuevo-cliente-cedula'),
        idtipocliente: el('ne-nuevo-cliente-tipo').value,
        correo: valor('ne-nuevo-cliente-correo') || null
      })
    }).then(function (respuesta) {
      cliente = respuesta.cliente;
      el('ne-buscar-cliente').value = cliente.nombre + ' · ' + cliente.cedula;
      el('ne-resultados-cliente').replaceChildren();
      texto('ne-cliente-elegido', 'Cliente #' + cliente.id);
      cerrarFormularioCrearCliente(true);
      aviso('Cliente creado y seleccionado.', false, 'emitir');
    }).catch(function (error) {
      aviso(error.message, true, 'emitir');
    }).finally(function () {
      boton.disabled = el('ne-crear-cliente-panel').hidden;
    });
  }
  function unidadesPermitidas(producto) {
    var base = Number(producto.idunidad);
    var dimension = Number(producto.tiene_dimension) === 1;
    if (base === 1) return dimension ? [1, 8, 9] : [1];
    if (base === 8) return dimension ? [1, 8, 9] : [8, 9];
    if (base === 2) return [2, 3, 4];
    return [base];
  }
  function nuevaLinea(idLista) {
    idLista = idLista || 'ne-lineas';
    var mostrarIndicacion = idLista !== 'ne-orden-extras';
    var lista = el(idLista);
    if (lista.children.length >= maxLineas) {
      aviso('La nota admite como máximo ' + maxLineas + ' artículos.', true);
      return;
    }
    var fila = document.createElement('div');
    fila.className = 'ne-linea';
    fila.innerHTML =
      '<div class="ne-linea-head"><strong class="ne-renglon"></strong><button type="button" class="btn ne-secondary ne-quitar">Quitar</button></div>' +
      '<div class="ne-linea-grid">' +
      '<div class="ne-search"><label>Artículo<input class="ne-producto" type="search" placeholder="Código o descripción"></label><div class="ne-resultados ne-productos"></div><p class="ne-stock">Seleccione un artículo</p></div>' +
      '<div class="ne-search"><label>Destinatario<select class="ne-destinatario browser-default" required><option value="">Seleccione destinatario</option><option value="CURUBANDE">CURUBANDE</option><option value="ZAGRA">ZAGRA</option><option value="METALMECANICA GRECIA">METALMECANICA GRECIA</option><option value="NELSON">NELSON</option><option value="__otro">Otro</option></select></label><label class="ne-destinatario-libre-contenedor" hidden>Nombre del destinatario<input class="ne-destinatario-libre" type="text" maxlength="150"></label></div>' +
      '<label>Unidad<select class="ne-unidad browser-default" required><option value="">Seleccione artículo</option></select></label>' +
      '<label>Cantidad<input class="ne-cantidad" type="number" min="0.01" step="0.01" required></label>' +
      (mostrarIndicacion ? '<label class="ne-linea-notas">Indicación, medida o corte (opcional)<input class="ne-linea-observaciones" type="text" maxlength="255"></label>' : '') +
      '</div>';
    fila.producto = null;
    lista.appendChild(fila);
    renumerar(idLista);
    var buscarProducto = fila.querySelector('.ne-producto');
    var selectorDestinatario = fila.querySelector('.ne-destinatario');
    var destinatarioLibre = fila.querySelector('.ne-destinatario-libre');
    var contenedorDestinatarioLibre = fila.querySelector('.ne-destinatario-libre-contenedor');
    conectarBusqueda(buscarProducto, fila.querySelector('.ne-productos'), 'productos', function (elegido) {
      fila.producto = elegido;
      var select = fila.querySelector('.ne-unidad');
      select.replaceChildren();
      unidadesPermitidas(elegido).forEach(function (id) {
        var unidad = unidades.find(function (u) { return Number(u.id) === id; });
        if (!unidad) return;
        var opcion = document.createElement('option');
        opcion.value = id;
        opcion.textContent = unidad.nombre + (unidad.simbolo ? ' (' + unidad.simbolo + ')' : '');
        select.appendChild(opcion);
      });
      select.value = String(elegido.idunidad);
      actualizarStock(fila);
    }, function () {
      fila.producto = null;
      fila.querySelector('.ne-unidad').replaceChildren();
      fila.querySelector('.ne-stock').textContent = 'Seleccione un artículo';
    });
    selectorDestinatario.addEventListener('change', function () {
      var esLibre = selectorDestinatario.value === '__otro';
      contenedorDestinatarioLibre.hidden = !esLibre;
      destinatarioLibre.required = esLibre;
      if (!esLibre) destinatarioLibre.value = '';
    });
    fila.querySelector('.ne-cantidad').addEventListener('input', function () { actualizarStock(fila); });
    fila.querySelector('.ne-unidad').addEventListener('change', function () { actualizarStock(fila); });
    fila.querySelector('.ne-quitar').addEventListener('click', function () {
      if (lista.children.length === 1 && idLista === 'ne-lineas') return aviso('La nota necesita al menos un artículo.', true);
      fila.remove();
      renumerar(idLista);
    });
  }
  function renumerar(idLista) {
    Array.prototype.forEach.call(el(idLista || 'ne-lineas').children, function (fila, indice) {
      fila.querySelector('.ne-renglon').textContent = 'Artículo ' + (indice + 1);
    });
  }
  function actualizarStock(fila) {
    if (!fila.producto) return;
    var p = fila.producto;
    var stock = fila.querySelector('.ne-stock');
    if (Number(p.saldos) !== 1) {
      stock.textContent = 'No hay un saldo único en el inventario 6, no se puede emitir este artículo.';
      return;
    }
    // El saldo visible es orientativo; la conversión y el bloqueo final son del SP.
    stock.textContent = 'Disponible: ' + p.saldo + ' en unidad de inventario.';
    var cantidad = Number(fila.querySelector('.ne-cantidad').value);
    if (Number(fila.querySelector('.ne-unidad').value) === Number(p.idunidad)
        && cantidad > Number(p.saldo)) {
      stock.textContent += ' La cantidad supera el saldo visible.';
    }
  }
  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    var b = new Uint8Array(16);
    window.crypto.getRandomValues(b);
    b[6] = (b[6] & 15) | 64;
    b[8] = (b[8] & 63) | 128;
    return Array.prototype.map.call(b, function (n) { return ('0' + n.toString(16)).slice(-2); })
      .join('').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
  }
  function prepararNota() {
    var contado = valor('ne-tipo-cliente') === 'contado';
    if (!contado && !cliente) throw new Error('Seleccione un cliente de la búsqueda.');
    if (contado && !valor('ne-nombre-cliente')) throw new Error('Ingrese el nombre del cliente contado.');
    var lineas = Array.prototype.map.call(el('ne-lineas').children, function (fila, indice) {
      var selectorDestinatario = fila.querySelector('.ne-destinatario');
      var destinatario = selectorDestinatario.value === '__otro'
        ? fila.querySelector('.ne-destinatario-libre').value.trim()
        : selectorDestinatario.value;
      if (!fila.producto || !destinatario) {
        throw new Error('Seleccione artículo y destinatario en la línea ' + (indice + 1) + '.');
      }
      if (Number(fila.producto.saldos) !== 1) {
        throw new Error('El artículo de la línea ' + (indice + 1) + ' no tiene saldo único en inventario 6.');
      }
      var cantidad = fila.querySelector('.ne-cantidad').value.trim();
      if (!/^[0-9]{1,12}(\.[0-9]{1,2})?$/.test(cantidad) || Number(cantidad) <= 0) {
        throw new Error('La cantidad de la línea ' + (indice + 1) + ' debe ser positiva y tener hasta dos decimales.');
      }
      var idunidad = Number(fila.querySelector('.ne-unidad').value);
      if (!idunidad) throw new Error('Seleccione la unidad de la línea ' + (indice + 1) + '.');
      return {
        idproducto: Number(fila.producto.id),
        destinatario: destinatario,
        idunidad: idunidad,
        cantidad: cantidad,
        observaciones: fila.querySelector('.ne-linea-observaciones').value.trim() || null
      };
    });
    return {
      idcliente: contado ? null : Number(cliente.id),
      nombre_cliente: contado ? valor('ne-nombre-cliente') : cliente.nombre,
      cliente_cedula: contado ? (valor('ne-cedula-cliente') || null) : (cliente.cedula || null),
      referencia: valor('ne-referencia') || null,
      observaciones: valor('ne-observaciones') || null,
      lineas: lineas
    };
  }
  function emitir(evento) {
    evento.preventDefault();
    var nota;
    try { nota = prepararNota(); } catch (error) { aviso(error.message, true); return; }
    var huella = JSON.stringify(nota);
    // Un reintento idéntico conserva la clave para que el servidor no descuente dos veces.
    if (huella !== huellaPendiente) {
      clavePendiente = uuid();
      huellaPendiente = huella;
    }
    nota.clave_operacion = clavePendiente;
    var boton = el('ne-emitir-boton');
    boton.disabled = true;
    aviso('Emitiendo la nota…', false);
    api('emitir', null, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken},
      body: JSON.stringify(nota)
    }).then(function (respuesta) {
      aviso('', false, 'emitir');
      el('ne-form').reset();
      el('ne-lineas').replaceChildren();
      nuevaLinea();
      cambiarTipoCliente();
      clavePendiente = huellaPendiente = null;
      cargarDetalle(respuesta.idnota).then(function () {
        aviso('Nota #' + respuesta.idnota + (respuesta.repetida ? ' recuperada tras el reintento.' : ' emitida correctamente.'), false, 'detalle');
      }).catch(function (error) {
        aviso('La nota #' + respuesta.idnota + ' fue emitida, pero no se pudo abrir el detalle: ' + error.message, true, 'emitir');
      });
    }, function (error) {
      var mensaje = error.message;
      if (error.name === 'TypeError') mensaje += ' Si el envío se interrumpió, vuelva a intentar sin modificar la nota.';
      aviso(mensaje, true, 'emitir');
    }).finally(function () { boton.disabled = false; });
  }
  function actualizarBotonEmitirFactura() {
    var filas = Array.prototype.slice.call(
      el('ne-factura-origen-lineas').querySelectorAll('.ne-linea-factura-origen')
    );
    var seleccionadas = filas.filter(function (fila) {
      return fila.querySelector('.ne-incluir-factura').checked;
    }).length;
    var selectorTodas = el('ne-factura-seleccionar-todas');
    selectorTodas.checked = filas.length > 0 && seleccionadas === filas.length;
    selectorTodas.indeterminate = seleccionadas > 0 && seleccionadas < filas.length;
    selectorTodas.disabled = filas.length === 0;
    var haySeleccion = seleccionadas > 0;
    el('ne-emitir-factura-boton').disabled = !facturaOrigen || !haySeleccion;
  }
  function crearOpcion(select, valorOpcion, etiqueta) {
    var opcion = document.createElement('option');
    opcion.value = valorOpcion;
    opcion.textContent = etiqueta;
    select.appendChild(opcion);
  }
  function renderizarLineasFacturaOrigen(lineas) {
    var tbody = el('ne-factura-origen-lineas');
    tbody.replaceChildren();
    if (!lineas.length) {
      var filaVacia = document.createElement('tr');
      var celdaVacia = agregarCelda(filaVacia, 'La factura no contiene artículos disponibles para entregar.');
      celdaVacia.colSpan = 6;
      tbody.appendChild(filaVacia);
      actualizarBotonEmitirFactura();
      return;
    }
    lineas.forEach(function (linea, indice) {
      var fila = document.createElement('tr');
      fila.className = 'ne-linea-factura-origen';
      fila.dataset.iddetallefactura = String(linea.iddetallefactura);
      fila.dataset.cantidadFacturada = String(linea.cantidad_facturada);

      var celdaIncluir = document.createElement('td');
      var incluir = document.createElement('input');
      incluir.type = 'checkbox';
      incluir.className = 'ne-incluir-factura';
      incluir.checked = false;
      incluir.setAttribute('aria-label', 'Incluir artículo ' + (indice + 1));
      celdaIncluir.appendChild(incluir);
      fila.appendChild(celdaIncluir);

      agregarCelda(fila, (linea.producto_codigo || '') + ' · ' + linea.producto_descripcion);
      agregarCelda(fila, Number(linea.cantidad_facturada).toFixed(2) + ' ' + (linea.unidad_nombre || ''));

      var celdaCantidad = document.createElement('td');
      var cantidad = document.createElement('input');
      cantidad.type = 'number';
      cantidad.className = 'ne-cantidad-origen';
      cantidad.min = '0.01';
      cantidad.step = '0.01';
      cantidad.max = Number(linea.cantidad_facturada).toFixed(2);
      cantidad.value = Number(linea.cantidad_facturada).toFixed(2);
      cantidad.setAttribute('aria-label', 'Cantidad para la nota del artículo ' + (indice + 1));
      celdaCantidad.appendChild(cantidad);
      fila.appendChild(celdaCantidad);

      var celdaDestinatario = document.createElement('td');
      var destinatario = document.createElement('select');
      destinatario.className = 'browser-default ne-destinatario-origen';
      crearOpcion(destinatario, '', 'Seleccione destinatario');
      crearOpcion(destinatario, 'CURUBANDE', 'CURUBANDE');
      crearOpcion(destinatario, 'ZAGRA', 'ZAGRA');
      crearOpcion(destinatario, 'METALMECANICA GRECIA', 'METALMECANICA GRECIA');
      crearOpcion(destinatario, 'NELSON', 'NELSON');
      crearOpcion(destinatario, '__otro', 'Otro');
      celdaDestinatario.appendChild(destinatario);
      var otro = document.createElement('input');
      otro.type = 'text';
      otro.className = 'ne-destinatario-libre';
      otro.maxLength = 150;
      otro.placeholder = 'Nombre del destinatario';
      otro.hidden = true;
      celdaDestinatario.appendChild(otro);
      var destinatarioGuardado = String(linea.destinatario || '').trim();
      var opcionGuardada = Array.prototype.some.call(destinatario.options, function (opcion) {
        return opcion.value === destinatarioGuardado && opcion.value !== '';
      });
      if (opcionGuardada) {
        destinatario.value = destinatarioGuardado;
      } else if (destinatarioGuardado) {
        destinatario.value = '__otro';
        otro.value = destinatarioGuardado;
        otro.hidden = false;
        otro.required = true;
      }
      destinatario.required = !destinatarioGuardado;
      destinatario.addEventListener('change', function () {
        otro.hidden = destinatario.value !== '__otro';
        otro.required = destinatario.value === '__otro';
        if (otro.hidden) otro.value = '';
      });
      fila.appendChild(celdaDestinatario);
      var celdaIndicacion = document.createElement('td');
      var indicacion = document.createElement('input');
      indicacion.type = 'text';
      indicacion.className = 'ne-observacion-origen';
      indicacion.maxLength = 255;
      indicacion.setAttribute('aria-label', 'Indicación para el artículo ' + (indice + 1));
      celdaIndicacion.appendChild(indicacion);
      fila.appendChild(celdaIndicacion);
      incluir.addEventListener('change', actualizarBotonEmitirFactura);
      tbody.appendChild(fila);
    });
    actualizarBotonEmitirFactura();
  }
  function elegirFacturaOrigen(item) {
    facturaOrigen = null;
    el('ne-resultados-factura-origen').replaceChildren();
    el('ne-factura-lineas-card').hidden = true;
    el('ne-factura-origen-elegida').hidden = true;
    el('ne-emitir-factura-boton').disabled = true;
    aviso('Cargando artículos de la factura…', false, 'emitir');
    api('ver-factura-origen', {id: item.id}).then(function (datos) {
      facturaOrigen = datos.factura;
      texto('ne-factura-origen-numero', facturaOrigen.numero);
      texto('ne-factura-origen-cliente', facturaOrigen.cliente_nombre);
      texto('ne-factura-origen-fecha', facturaOrigen.fecha);
      el('ne-factura-origen-elegida').hidden = false;
      el('ne-factura-lineas-card').hidden = false;
      renderizarLineasFacturaOrigen(facturaOrigen.lineas || []);
      aviso('', false, 'emitir');
    }).catch(function (error) {
      facturaOrigen = null;
      aviso(error.message, true, 'emitir');
    });
  }
  function conectarBusquedaFacturaOrigen() {
    var input = el('ne-buscar-factura-origen');
    var contenedor = el('ne-resultados-factura-origen');
    input.addEventListener('input', function () {
      var q = input.value.trim();
      facturaOrigen = null;
      el('ne-factura-lineas-card').hidden = true;
      el('ne-factura-origen-elegida').hidden = true;
      el('ne-factura-origen-lineas').replaceChildren();
      actualizarBotonEmitirFactura();
      contenedor.replaceChildren();
      if (temporizadorFactura) clearTimeout(temporizadorFactura);
      if (solicitudFactura) solicitudFactura.abort();
      if (q.length < 2) return;
      temporizadorFactura = setTimeout(function () {
        solicitudFactura = typeof AbortController === 'function' ? new AbortController() : null;
        api('buscar-facturas', {q: q}, solicitudFactura ? {signal: solicitudFactura.signal} : {})
          .then(function (datos) {
            if (input.value.trim() !== q) return;
            contenedor.replaceChildren();
            if (!datos.resultados.length) {
              var vacio = document.createElement('p');
              vacio.className = 'ne-seleccion';
              vacio.textContent = 'No se encontraron facturas de venta.';
              contenedor.appendChild(vacio);
              return;
            }
            datos.resultados.forEach(function (factura) {
              var etiqueta = factura.numero + ' · ' + factura.cliente_nombre + ' · ' + factura.fecha;
              contenedor.appendChild(botonResultado(etiqueta, factura, elegirFacturaOrigen));
            });
          }).catch(function (error) {
            if (error.name !== 'AbortError') aviso(error.message, true, 'emitir');
          });
      }, 250);
    });
  }
  function prepararNotaDesdeFactura() {
    if (!facturaOrigen) throw new Error('Busca y selecciona una factura de venta.');
    var lineas = [];
    Array.prototype.forEach.call(
      el('ne-factura-origen-lineas').querySelectorAll('.ne-linea-factura-origen'),
      function (fila, indice) {
        if (!fila.querySelector('.ne-incluir-factura').checked) return;
        var cantidad = fila.querySelector('.ne-cantidad-origen').value.trim();
        var limiteCantidad = Number(fila.dataset.cantidadFacturada);
        if (!/^[0-9]{1,12}(\.[0-9]{1,2})?$/.test(cantidad) || Number(cantidad) <= 0
            || Number(cantidad) > limiteCantidad) {
          throw new Error('La cantidad de la línea ' + (indice + 1)
            + ' debe ser positiva y no superar la cantidad de su factura.');
        }
        var selector = fila.querySelector('.ne-destinatario-origen');
        var destinatario = selector.value === '__otro'
          ? fila.querySelector('.ne-destinatario-libre').value.trim() : selector.value;
        if (!destinatario) throw new Error('Selecciona el destinatario de la línea ' + (indice + 1) + '.');
        lineas.push({
          iddetallefactura: Number(fila.dataset.iddetallefactura),
          cantidad: cantidad,
          destinatario: destinatario,
          observaciones: fila.querySelector('.ne-observacion-origen').value.trim() || null
        });
      }
    );
    if (!lineas.length) throw new Error('Selecciona al menos una línea de factura.');
    return {
      idfactura_origen: Number(facturaOrigen.id),
      referencia: valor('ne-factura-referencia') || null,
      observaciones: valor('ne-factura-observaciones') || null,
      lineas: lineas
    };
  }
  function emitirDesdeFactura() {
    var nota;
    try { nota = prepararNotaDesdeFactura(); } catch (error) { aviso(error.message, true, 'emitir'); return; }
    var huella = JSON.stringify(nota);
    if (huella !== huellaFacturaPendiente) {
      claveFacturaPendiente = uuid();
      huellaFacturaPendiente = huella;
    }
    nota.clave_operacion = claveFacturaPendiente;
    var boton = el('ne-emitir-factura-boton');
    boton.disabled = true;
    aviso('Emitiendo la nota desde factura…', false, 'emitir');
    api('emitir-desde-factura', null, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken},
      body: JSON.stringify(nota)
    }).then(function (respuesta) {
      claveFacturaPendiente = huellaFacturaPendiente = null;
      facturaOrigen = null;
      el('ne-buscar-factura-origen').value = '';
      el('ne-factura-origen-elegida').hidden = true;
      el('ne-factura-lineas-card').hidden = true;
      el('ne-factura-origen-lineas').replaceChildren();
      el('ne-factura-referencia').value = '';
      el('ne-factura-observaciones').value = '';
      cargarDetalle(respuesta.idnota).then(function () {
        aviso('Nota #' + respuesta.idnota
          + (respuesta.repetida ? ' recuperada tras el reintento.' : ' emitida desde factura y cerrada correctamente.'), false, 'detalle');
      }).catch(function (error) {
        aviso('La nota #' + respuesta.idnota + ' fue emitida, pero no se pudo abrir el detalle: '
          + error.message, true, 'emitir');
      });
    }).catch(function (error) {
      var mensaje = error.message;
      if (error.name === 'TypeError') mensaje += ' Si el envío se interrumpió, vuelva a intentar sin modificar la nota.';
      aviso(mensaje, true, 'emitir');
    }).finally(function () { actualizarBotonEmitirFactura(); });
  }
  function actualizarBotonEmitirOrden() {
    var filas = Array.prototype.slice.call(
      el('ne-orden-origen-lineas').querySelectorAll('.ne-linea-orden-origen')
    );
    var seleccionadas = filas.filter(function (fila) {
      return fila.querySelector('.ne-incluir-orden').checked;
    }).length;
    var selectorTodas = el('ne-orden-seleccionar-todas');
    selectorTodas.checked = filas.length > 0 && seleccionadas === filas.length;
    selectorTodas.indeterminate = seleccionadas > 0 && seleccionadas < filas.length;
    selectorTodas.disabled = filas.length === 0;
    el('ne-emitir-orden-boton').disabled = !ordenOrigen || seleccionadas === 0;
  }
  function renderizarLineasOrdenOrigen(lineas) {
    var tbody = el('ne-orden-origen-lineas');
    tbody.replaceChildren();
    if (!lineas.length) {
      var vacia = document.createElement('tr');
      var celda = agregarCelda(vacia, 'La orden no tiene cantidades pendientes.');
      celda.colSpan = 4;
      tbody.appendChild(vacia);
      actualizarBotonEmitirOrden();
      return;
    }
    lineas.forEach(function (linea, indice) {
      var fila = document.createElement('tr');
      fila.className = 'ne-linea-orden-origen';
      fila.dataset.iddetalleorden = String(linea.iddetalleorden);
      fila.dataset.idproducto = String(linea.idproducto);
      fila.dataset.idunidad = String(linea.idunidad);
      fila.dataset.cantidadPendiente = String(linea.cantidad_pendiente);

      var celdaIncluir = document.createElement('td');
      var incluir = document.createElement('input');
      incluir.type = 'checkbox';
      incluir.className = 'ne-incluir-orden';
      incluir.setAttribute('aria-label', 'Incluir artículo de orden ' + (indice + 1));
      celdaIncluir.appendChild(incluir);
      fila.appendChild(celdaIncluir);
      agregarCelda(fila, (linea.producto_codigo || '') + ' · ' + linea.producto_descripcion);
      agregarCelda(fila, Number(linea.cantidad_pendiente).toFixed(2) + ' ' + (linea.unidad_nombre || ''));

      var celdaDestinatario = document.createElement('td');
      var destinatario = document.createElement('select');
      destinatario.className = 'browser-default ne-destinatario-orden';
      destinatario.required = true;
      crearOpcion(destinatario, '', 'Seleccione destinatario');
      crearOpcion(destinatario, 'CURUBANDE', 'CURUBANDE');
      crearOpcion(destinatario, 'ZAGRA', 'ZAGRA');
      crearOpcion(destinatario, 'METALMECANICA GRECIA', 'METALMECANICA GRECIA');
      crearOpcion(destinatario, 'NELSON', 'NELSON');
      crearOpcion(destinatario, '__otro', 'Otro');
      var otro = document.createElement('input');
      otro.type = 'text';
      otro.className = 'ne-destinatario-libre';
      otro.maxLength = 150;
      otro.placeholder = 'Nombre del destinatario';
      otro.hidden = true;
      destinatario.addEventListener('change', function () {
        otro.hidden = destinatario.value !== '__otro';
        otro.required = destinatario.value === '__otro';
        if (otro.hidden) otro.value = '';
      });
      celdaDestinatario.appendChild(destinatario);
      celdaDestinatario.appendChild(otro);
      fila.appendChild(celdaDestinatario);

      incluir.addEventListener('change', actualizarBotonEmitirOrden);
      tbody.appendChild(fila);
    });
    actualizarBotonEmitirOrden();
  }
  function elegirOrdenOrigen(item) {
    ordenOrigen = null;
    el('ne-resultados-orden-origen').replaceChildren();
    el('ne-orden-lineas-card').hidden = true;
    el('ne-orden-extras-card').hidden = true;
    el('ne-orden-origen-elegida').hidden = true;
    el('ne-emitir-orden-boton').disabled = true;
    aviso('Cargando materiales de la orden…', false, 'emitir');
    api('ver-orden-origen', {id: item.id}).then(function (datos) {
      ordenOrigen = datos.orden;
      texto('ne-orden-origen-numero', ordenOrigen.numero);
      texto('ne-orden-origen-cliente', ordenOrigen.cliente_nombre);
      texto('ne-orden-origen-fecha', ordenOrigen.fecha);
      el('ne-orden-origen-elegida').hidden = false;
      el('ne-orden-lineas-card').hidden = false;
      el('ne-orden-extras-card').hidden = false;
      renderizarLineasOrdenOrigen(ordenOrigen.lineas || []);
      aviso('', false, 'emitir');
    }).catch(function (error) {
      ordenOrigen = null;
      aviso(error.message, true, 'emitir');
    });
  }
  function conectarBusquedaOrdenOrigen() {
    var input = el('ne-buscar-orden-origen');
    var contenedor = el('ne-resultados-orden-origen');
    input.addEventListener('input', function () {
      var q = input.value.trim();
      ordenOrigen = null;
      el('ne-orden-lineas-card').hidden = true;
      el('ne-orden-extras-card').hidden = true;
      el('ne-orden-origen-elegida').hidden = true;
      el('ne-orden-origen-lineas').replaceChildren();
      el('ne-orden-extras').replaceChildren();
      actualizarBotonEmitirOrden();
      contenedor.replaceChildren();
      if (temporizadorOrden) clearTimeout(temporizadorOrden);
      if (solicitudOrden) solicitudOrden.abort();
      if (q.length < 2) return;
      temporizadorOrden = setTimeout(function () {
        solicitudOrden = typeof AbortController === 'function' ? new AbortController() : null;
        api('buscar-ordenes', {q: q}, solicitudOrden ? {signal: solicitudOrden.signal} : {})
          .then(function (datos) {
            if (input.value.trim() !== q) return;
            contenedor.replaceChildren();
            if (!datos.resultados.length) {
              var vacio = document.createElement('p');
              vacio.className = 'ne-seleccion';
              vacio.textContent = 'No se encontraron órdenes de compra disponibles.';
              contenedor.appendChild(vacio);
              return;
            }
            datos.resultados.forEach(function (orden) {
              var etiqueta = orden.numero + ' · ' + orden.cliente_nombre + ' · ' + orden.fecha;
              contenedor.appendChild(botonResultado(etiqueta, orden, elegirOrdenOrigen));
            });
          }).catch(function (error) {
            if (error.name !== 'AbortError') aviso(error.message, true, 'emitir');
          });
      }, 250);
    });
  }
  function prepararNotaDesdeOrden() {
    if (!ordenOrigen) throw new Error('Busca y selecciona una orden de compra.');
    var lineas = [];
    Array.prototype.forEach.call(
      el('ne-orden-origen-lineas').querySelectorAll('.ne-linea-orden-origen'),
      function (fila, indice) {
        if (!fila.querySelector('.ne-incluir-orden').checked) return;
        var selector = fila.querySelector('.ne-destinatario-orden');
        var destinatario = selector.value === '__otro'
          ? fila.querySelector('.ne-destinatario-libre').value.trim() : selector.value;
        if (!destinatario) throw new Error('Selecciona el destinatario de la línea ' + (indice + 1) + '.');
        lineas.push({
          iddetalleorden: Number(fila.dataset.iddetalleorden),
          idproducto: Number(fila.dataset.idproducto),
          idunidad: Number(fila.dataset.idunidad),
          cantidad: Number(fila.dataset.cantidadPendiente).toFixed(2),
          destinatario: destinatario,
          observaciones: null
        });
      }
    );
    Array.prototype.forEach.call(el('ne-orden-extras').children, function (fila, indice) {
      var selectorDestinatario = fila.querySelector('.ne-destinatario');
      var destinatario = selectorDestinatario.value === '__otro'
        ? fila.querySelector('.ne-destinatario-libre').value.trim() : selectorDestinatario.value;
      var cantidad = fila.querySelector('.ne-cantidad').value.trim();
      if (!fila.producto) throw new Error('Selecciona un artículo adicional ' + (indice + 1) + '.');
      if (!destinatario) throw new Error('Selecciona el destinatario del artículo adicional ' + (indice + 1) + '.');
      if (!/^[0-9]{1,12}(\.[0-9]{1,2})?$/.test(cantidad) || Number(cantidad) <= 0) {
        throw new Error('Ingresa una cantidad válida para el artículo adicional ' + (indice + 1) + '.');
      }
      lineas.push({
        iddetalleorden: null,
        idproducto: Number(fila.producto.id),
        idunidad: Number(fila.querySelector('.ne-unidad').value),
        cantidad: cantidad,
        destinatario: destinatario,
        observaciones: null
      });
    });
    if (!lineas.some(function (linea) { return linea.iddetalleorden !== null; })) {
      throw new Error('Selecciona al menos una línea pendiente de la orden.');
    }
    if (lineas.length > maxLineas) throw new Error('La nota admite como máximo ' + maxLineas + ' líneas.');
    return {
      idordencompra_origen: Number(ordenOrigen.id),
      referencia: valor('ne-orden-referencia') || null,
      observaciones: valor('ne-orden-observaciones') || null,
      lineas: lineas
    };
  }
  function emitirDesdeOrden() {
    var nota;
    try { nota = prepararNotaDesdeOrden(); } catch (error) { aviso(error.message, true, 'emitir'); return; }
    var huella = JSON.stringify(nota);
    if (huella !== huellaOrdenPendiente) {
      claveOrdenPendiente = uuid();
      huellaOrdenPendiente = huella;
    }
    nota.clave_operacion = claveOrdenPendiente;
    var boton = el('ne-emitir-orden-boton');
    boton.disabled = true;
    aviso('Emitiendo la nota desde orden de compra…', false, 'emitir');
    api('emitir-desde-orden', null, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken},
      body: JSON.stringify(nota)
    }).then(function (respuesta) {
      claveOrdenPendiente = huellaOrdenPendiente = null;
      ordenOrigen = null;
      el('ne-buscar-orden-origen').value = '';
      el('ne-orden-origen-elegida').hidden = true;
      el('ne-orden-lineas-card').hidden = true;
      el('ne-orden-extras-card').hidden = true;
      el('ne-orden-origen-lineas').replaceChildren();
      el('ne-orden-extras').replaceChildren();
      el('ne-orden-referencia').value = '';
      el('ne-orden-observaciones').value = '';
      cargarDetalle(respuesta.idnota).then(function () {
        aviso('Nota #' + respuesta.idnota
          + (respuesta.repetida ? ' recuperada tras el reintento.' : ' emitida desde orden de compra.'), false, 'detalle');
      }).catch(function (error) {
        aviso('La nota #' + respuesta.idnota + ' fue emitida, pero no se pudo abrir el detalle: '
          + error.message, true, 'emitir');
      });
    }).catch(function (error) {
      var mensaje = error.message;
      if (error.name === 'TypeError') mensaje += ' Si el envío se interrumpió, vuelva a intentar sin modificar la nota.';
      aviso(mensaje, true, 'emitir');
    }).finally(function () { actualizarBotonEmitirOrden(); });
  }
  function filtros() {
    var tipo = valor('ne-f-tipo-cliente');
    if (tipo === 'registrado' && !clienteFiltro) throw new Error('Seleccione el cliente del filtro.');
    if (valor('ne-f-usuario') && !usuarioFiltro) throw new Error('Seleccione el responsable en los resultados.');
    return {
      estado: valor('ne-f-estado'),
      idcliente: tipo === 'registrado' ? clienteFiltro.id : tipo,
      fecha_desde: valor('ne-f-desde'),
      fecha_hasta: valor('ne-f-hasta'),
      idusuario: usuarioFiltro ? usuarioFiltro.id : '0',
      limite: limite,
      offset: offset
    };
  }
  function actualizarBotonPrepararFactura() {
    var ids = Object.keys(notasSeleccionadas);
    var boton = el('ne-preparar-factura');
    boton.textContent = 'Preparar factura (' + ids.length + ')';
    boton.disabled = ids.length < 1 || ids.length > 100 || !opcionesFactura;
  }
  function cargarLista() {
    var params;
    aviso('', false, 'listado');
    try { params = filtros(); } catch (error) { aviso(error.message, true, 'listado'); return; }
    api('listar', params).then(function (datos) {
      var tbody = el('ne-lista');
      tbody.replaceChildren();
      datos.notas.forEach(function (nota) {
        var fila = document.createElement('tr');
        var celdaSeleccion = document.createElement('td');
        var puedeFacturar = Number(nota.idestado) === 1 && nota.idfactura == null;
        if (puedeFacturar) {
          var check = document.createElement('input');
          check.type = 'checkbox';
          check.className = 'ne-checkbox-nota';
          check.checked = !!notasSeleccionadas[String(nota.id)];
          check.setAttribute('aria-label', 'Seleccionar nota ' + nota.id + ' para facturar');
          check.addEventListener('change', function () {
            if (check.checked) notasSeleccionadas[String(nota.id)] = true;
            else delete notasSeleccionadas[String(nota.id)];
            actualizarBotonPrepararFactura();
          });
          celdaSeleccion.appendChild(check);
        } else {
          celdaSeleccion.textContent = '—';
        }
        fila.appendChild(celdaSeleccion);
        agregarCelda(fila, nota.id);
        agregarCelda(fila, nota.fecha_emision);
        agregarCelda(fila, nota.nombre_cliente);
        agregarCelda(fila, nota.usuario_nombre || nota.idusuario);
        agregarCelda(fila, estadoNombre(nota.idestado));
        var celdaFactura = document.createElement('td');
        if (nota.idordencompra_origen != null) {
          var ordenTexto = document.createElement('div');
          ordenTexto.appendChild(document.createTextNode('Orden: '));
          agregarEnlaceOrigen(ordenTexto, nota.idordencompra_origen,
            nota.orden_origen_numero, 'orden de compra');
          celdaFactura.appendChild(ordenTexto);
          if (nota.idfactura != null) {
            var enlaceFacturaOrden = document.createElement('div');
            renderizarEnlaceFactura(enlaceFacturaOrden, nota.idfactura);
            celdaFactura.appendChild(enlaceFacturaOrden);
          }
        } else if (nota.idfactura_origen != null) {
          celdaFactura.appendChild(document.createTextNode('Origen: '));
          agregarEnlaceOrigen(celdaFactura, nota.idfactura_origen,
            nota.factura_origen_numero, 'factura de origen');
        } else {
          renderizarEnlaceFactura(celdaFactura, nota.idfactura);
        }
        fila.appendChild(celdaFactura);
        var celda = document.createElement('td');
        var boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'btn ne-secondary';
        boton.textContent = 'Ver';
        boton.addEventListener('click', function () {
          cargarDetalle(nota.id).catch(function (error) { aviso(error.message, true, 'listado'); });
        });
        celda.appendChild(boton);
        fila.appendChild(celda);
        tbody.appendChild(fila);
      });
      if (!datos.notas.length) {
        var vacio = document.createElement('tr');
        var celda = agregarCelda(vacio, 'No se encontraron notas.');
        celda.colSpan = 8;
        tbody.appendChild(vacio);
      }
      actualizarBotonPrepararFactura();
      el('ne-anterior').disabled = offset === 0;
      el('ne-siguiente').disabled = datos.notas.length < limite;
      texto('ne-pagina', 'Mostrando ' + (offset + 1) + '–' + (offset + datos.notas.length));
    }).catch(function (error) { aviso(error.message, true, 'listado'); });
  }
  function simboloMoneda() {
    var select = el('ne-fa-moneda');
    var opcion = select.options[select.selectedIndex];
    return opcion && opcion.getAttribute('data-simbolo') || '₡';
  }
  function formatoMonto(monto) {
    var valorMonto = Number(monto);
    return simboloMoneda() + (Number.isFinite(valorMonto) ? valorMonto : 0)
      .toLocaleString('es-CR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }
  function simboloConfigurado(item) {
    var simbolo = String(item.simbolo || '').trim();
    if (/^\?+$/.test(simbolo) && Number(item.id) === 1) return '₡';
    return simbolo;
  }
  function cargarOpcionesFactura(datos) {
    opcionesFactura = datos;
    var tipo = el('ne-fa-tipo');
    var pago = el('ne-fa-pago');
    var moneda = el('ne-fa-moneda');
    tipo.replaceChildren();
    pago.replaceChildren();
    moneda.replaceChildren();
    (datos.tipos_factura || []).forEach(function (item) {
      var opcion = document.createElement('option');
      opcion.value = item.id;
      opcion.textContent = item.nombre;
      tipo.appendChild(opcion);
    });
    (datos.formas_pago || []).forEach(function (item) {
      var opcion = document.createElement('option');
      opcion.value = item.id;
      opcion.textContent = item.nombre;
      pago.appendChild(opcion);
    });
    (datos.monedas || []).forEach(function (item) {
      var opcion = document.createElement('option');
      opcion.value = item.id;
      var simbolo = simboloConfigurado(item);
      opcion.textContent = item.nombre + (simbolo ? ' (' + simbolo + ')' : '');
      opcion.setAttribute('data-divisa', item.divisa);
      opcion.setAttribute('data-simbolo', simbolo);
      moneda.appendChild(opcion);
    });
    if (!tipo.options.length || !pago.options.length || !moneda.options.length) {
      opcionesFactura = null;
      throw new Error('Faltan tipos de factura, formas de pago o monedas configuradas.');
    }
    tipo.value = Array.prototype.some.call(tipo.options, function (item) { return item.value === '1'; })
      ? '1' : tipo.options[0].value;
    pago.value = Array.prototype.some.call(pago.options, function (item) { return item.value === '1'; })
      ? '1' : pago.options[0].value;
    moneda.value = Array.prototype.some.call(moneda.options, function (item) { return item.value === '1'; })
      ? '1' : moneda.options[0].value;
    moneda.addEventListener('change', function () {
      var opcion = moneda.options[moneda.selectedIndex];
      el('ne-fa-divisa').value = Number(opcion.getAttribute('data-divisa') || 1).toFixed(2);
      recalcularFactura();
    });
    el('ne-fa-divisa').value = Number(moneda.options[moneda.selectedIndex].getAttribute('data-divisa') || 1).toFixed(2);
    el('ne-facturar-boton').disabled = false;
    actualizarBotonPrepararFactura();
  }
  function cargarTasa(impuesto) {
    return ({
      1: {porcentaje: 0, etiqueta: 'Exento 0%'},
      2: {porcentaje: 1, etiqueta: 'Reducido 1%'},
      3: {porcentaje: 2, etiqueta: 'Reducido 2%'},
      4: {porcentaje: 4, etiqueta: 'Reducido 4%'},
      5: {porcentaje: 0, etiqueta: 'Transitorio 0%'},
      6: {porcentaje: 4, etiqueta: 'Transitorio 4%'},
      7: {porcentaje: 8, etiqueta: 'Transitorio 8%'},
      8: {porcentaje: 13, etiqueta: 'General 13%'}
    })[Number(impuesto)];
  }
  function actualizarLineaFactura(fila) {
    var cantidad = Number(fila.dataset.cantidad || 0);
    var precio = Number(fila.querySelector('.ne-fa-precio').value);
    var descuento = Number(fila.querySelector('.ne-fa-descuento').value || 0);
    var tasa = cargarTasa(fila.querySelector('.ne-fa-iva').value);
    var valido = !!tasa && Number.isFinite(precio) && precio > 0 && Number.isFinite(descuento)
      && descuento >= 0 && descuento <= precio * cantidad;
    var baseBruta = valido ? precio * cantidad : 0;
    var base = valido ? precio * cantidad - descuento : 0;
    var impuesto = valido ? Math.round((base * tasa.porcentaje / 100 + Number.EPSILON) * 100000) / 100000 : 0;
    var total = base + impuesto;
    fila.facturaLinea = {
      iddetallenota: Number(fila.dataset.idDetalle),
      precio: precio,
      descuento: descuento,
      costo: 0,
      imv: impuesto.toFixed(5),
      exento: Number(fila.querySelector('.ne-fa-iva').value) === 1 ? baseBruta.toFixed(5) : '0',
      exonerado: '0',
      comision: '0',
      idexoneracion: null,
      comodin: null,
      idimpuestos: !tasa || Number(fila.querySelector('.ne-fa-iva').value) === 1
        ? null
        : '1,' + tasa.porcentaje + ',' + impuesto.toFixed(5) + ',' + fila.querySelector('.ne-fa-iva').value,
      iddescuentos: null
    };
    fila.querySelector('.ne-linea-total').textContent = valido ? formatoMonto(total) : 'Revise precio y descuento';
    fila.classList.toggle('ne-error-linea', !valido);
    return valido ? {
      baseGravada: Number(fila.querySelector('.ne-fa-iva').value) === 1 ? 0 : baseBruta,
      exento: Number(fila.querySelector('.ne-fa-iva').value) === 1 ? baseBruta : 0,
      descuento: descuento,
      impuesto: impuesto,
      total: total
    } : null;
  }
  function recalcularFactura() {
    var subtotalGravado = 0;
    var subtotalExento = 0;
    var descuentoTotal = 0;
    var impuestoTotal = 0;
    Array.prototype.forEach.call(el('ne-facturar-lineas').querySelectorAll('.ne-fa-linea'), function (fila) {
      var montos = actualizarLineaFactura(fila);
      if (!montos) return;
      subtotalGravado += montos.baseGravada;
      subtotalExento += montos.exento;
      descuentoTotal += montos.descuento;
      impuestoTotal += montos.impuesto;
    });
    texto('ne-fa-subtotal', formatoMonto(subtotalGravado));
    texto('ne-fa-exento', formatoMonto(subtotalExento));
    texto('ne-fa-descuento', formatoMonto(descuentoTotal));
    texto('ne-fa-impuesto', formatoMonto(impuestoTotal));
    texto('ne-fa-total', formatoMonto(subtotalGravado - descuentoTotal + impuestoTotal + subtotalExento));
  }
  function renderizarLineasFactura() {
    var cuerpo = el('ne-facturar-lineas');
    cuerpo.replaceChildren();
    lineasEnFactura = [];
    notasEnFactura.forEach(function (nota) {
      var grupo = document.createElement('tr');
      grupo.className = 'ne-factura-fila-nota';
      var titulo = agregarCelda(grupo, 'Nota #' + nota.id + ' · ' + nota.nombre_cliente);
      titulo.colSpan = 7;
      cuerpo.appendChild(grupo);
      nota.lineas.forEach(function (linea) {
        var cantidad = Math.max(0, Number(linea.cantidad_pendiente || 0));
        if (cantidad <= 0) return;
        var fila = document.createElement('tr');
        fila.className = 'ne-fa-linea';
        fila.dataset.idDetalle = linea.id;
        fila.dataset.cantidad = String(cantidad);
        agregarCelda(fila, '#' + nota.id);
        agregarCelda(fila, (linea.producto_codigo || '') + ' · ' + linea.producto_descripcion);
        agregarCelda(fila, cantidad.toFixed(2) + ' ' + (linea.unidad_nombre || ''));
        var celdaPrecio = document.createElement('td');
        var precio = document.createElement('input');
        precio.type = 'number';
        precio.className = 'ne-fa-precio';
        precio.min = '0.00001';
        precio.step = '0.00001';
        precio.placeholder = 'Precio por unidad';
        precio.setAttribute('aria-label', 'Precio unitario de ' + linea.producto_descripcion);
        celdaPrecio.appendChild(precio);
        fila.appendChild(celdaPrecio);
        var celdaDescuento = document.createElement('td');
        var descuento = document.createElement('input');
        descuento.type = 'number';
        descuento.className = 'ne-fa-descuento';
        descuento.min = '0';
        descuento.step = '0.00001';
        descuento.value = '0';
        descuento.setAttribute('aria-label', 'Descuento total de ' + linea.producto_descripcion);
        celdaDescuento.appendChild(descuento);
        fila.appendChild(celdaDescuento);
        var celdaIva = document.createElement('td');
        var iva = document.createElement('select');
        iva.className = 'ne-fa-iva browser-default';
        var opcionImpuesto = document.createElement('option');
        opcionImpuesto.value = '';
        opcionImpuesto.textContent = 'Seleccione IVA';
        iva.appendChild(opcionImpuesto);
        [1, 2, 3, 4, 5, 6, 7, 8].forEach(function (id) {
          var opcion = document.createElement('option');
          opcion.value = id;
          opcion.textContent = cargarTasa(id).etiqueta;
          iva.appendChild(opcion);
        });
        iva.value = '';
        celdaIva.appendChild(iva);
        fila.appendChild(celdaIva);
        var celdaTotal = document.createElement('td');
        celdaTotal.className = 'ne-linea-total';
        celdaTotal.textContent = '—';
        fila.appendChild(celdaTotal);
        [precio, descuento, iva].forEach(function (entrada) {
          entrada.addEventListener('input', recalcularFactura);
          entrada.addEventListener('change', recalcularFactura);
        });
        cuerpo.appendChild(fila);
        lineasEnFactura.push(fila);
      });
    });
    recalcularFactura();
  }
  function prepararFacturacion() {
    var ids = Object.keys(notasSeleccionadas).map(Number);
    if (!ids.length) return aviso('Selecciona al menos una nota pendiente.', true, 'listado');
    if (ids.length > 100) return aviso('Puedes preparar hasta 100 notas en una factura.', true, 'listado');
    var boton = el('ne-preparar-factura');
    boton.disabled = true;
    aviso('Cargando notas seleccionadas…', false, 'listado');
    Promise.all(ids.map(function (id) { return api('ver', {id: id}); }))
      .then(function (respuestas) {
        var clienteBase = null;
        notasEnFactura = respuestas.map(function (respuesta) { return respuesta.nota; });
        notasEnFactura.forEach(function (nota) {
          if (Number(nota.idestado) !== 1 || nota.idfactura != null) {
            throw new Error('La nota #' + nota.id + ' dejó de estar pendiente. Actualiza el listado.');
          }
          var clienteNota = nota.idcliente == null
            ? 'contado:' + String(nota.nombre_cliente || '').trim()
            : 'cliente:' + String(nota.idcliente);
          if (clienteBase !== null && clienteBase !== clienteNota) {
            throw new Error('Las notas seleccionadas deben pertenecer al mismo cliente.');
          }
          clienteBase = clienteNota;
        });
        lineasEnFactura = [];
        el('ne-facturar-resumen').textContent = notasEnFactura.length + ' nota(s) · '
          + notasEnFactura[0].nombre_cliente + ' · Sucursal ' + notasEnFactura[0].idsucursal;
        renderizarLineasFactura();
        aviso('', false, 'listado');
        cambiarTab('facturar');
      })
      .catch(function (error) { aviso(error.message, true, 'listado'); })
      .finally(actualizarBotonPrepararFactura);
  }
  function prepararDatosFactura() {
    if (!notasEnFactura.length) throw new Error('Selecciona nuevamente las notas que vas a facturar.');
    var lineas = [];
    lineasEnFactura.forEach(function (fila, indice) {
      if (!actualizarLineaFactura(fila)) {
        throw new Error('Completa el precio, el descuento válido y el IVA de la línea ' + (indice + 1) + '.');
      }
      var precioTexto = fila.querySelector('.ne-fa-precio').value.trim();
      var descuentoTexto = fila.querySelector('.ne-fa-descuento').value.trim() || '0';
      if (!/^(0|[1-9][0-9]{0,17})(\.[0-9]{1,5})?$/.test(precioTexto)
          || !/^(0|[1-9][0-9]{0,17})(\.[0-9]{1,5})?$/.test(descuentoTexto)) {
        throw new Error('El precio y el descuento deben tener hasta cinco decimales.');
      }
      fila.facturaLinea.precio = precioTexto;
      fila.facturaLinea.descuento = descuentoTexto;
      lineas.push(fila.facturaLinea);
    });
    if (!lineas.length) throw new Error('Las notas seleccionadas no tienen cantidades pendientes.');
    var tipoVenta = Number(el('ne-fa-documento').value);
    var tipoFactura = Number(el('ne-fa-tipo').value);
    var tipoPago = Number(el('ne-fa-pago').value);
    var moneda = Number(el('ne-fa-moneda').value);
    var cambio = el('ne-fa-divisa').value.trim();
    var plazo = el('ne-fa-plazo').value.trim() || '0';
    if ([1, 7, 8, 10].indexOf(tipoVenta) < 0) throw new Error('Selecciona un comprobante disponible.');
    if (!tipoFactura || !tipoPago || !moneda) throw new Error('Completa los datos de la factura.');
    if (!/^(0|[1-9][0-9]{0,7})(\.[0-9]{1,2})?$/.test(cambio) || Number(cambio) <= 0) {
      throw new Error('El tipo de cambio debe ser mayor que cero y tener hasta dos decimales.');
    }
    if (!/^(0|[1-9][0-9]{0,3})$/.test(plazo)) throw new Error('El plazo debe ser un número entero.');
    return {
      idnotas: notasEnFactura.map(function (nota) { return Number(nota.id); }),
      factura: {
        idtipoventa: tipoVenta,
        idtipo: tipoFactura,
        idtipopago: tipoPago,
        plazo: Number(plazo),
        idmoneda: moneda,
        divisa: cambio,
        oc: el('ne-fa-oc').value.trim() || null,
        comentario: el('ne-fa-comentario').value.trim() || null,
        referencia: el('ne-fa-referencia').value.trim() || null,
        extra: null,
        terminal: 1,
        actividadreceptor: null
      },
      lineas: lineas
    };
  }
  function facturarNotas(evento) {
    evento.preventDefault();
    var datos;
    try { datos = prepararDatosFactura(); } catch (error) { aviso(error.message, true, 'facturar'); return; }
    var boton = el('ne-facturar-boton');
    boton.disabled = true;
    aviso('Creando la factura…', false, 'facturar');
    api('facturar', null, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken},
      body: JSON.stringify(datos)
    }).then(function (respuesta) {
      var mensaje = 'Factura ' + respuesta.consecutivo + ' creada para '
        + respuesta.notas_facturadas + ' nota(s).';
      if (respuesta.repetida) mensaje = 'Se recuperó la factura ' + respuesta.consecutivo + ' tras el reintento.';
      notasSeleccionadas = {};
      notasEnFactura = [];
      lineasEnFactura = [];
      el('ne-facturar-form').reset();
      var monedaSeleccionada = el('ne-fa-moneda').options[el('ne-fa-moneda').selectedIndex];
      el('ne-fa-divisa').value = Number(monedaSeleccionada.getAttribute('data-divisa') || 1).toFixed(2);
      cambiarTab('listado');
      aviso(mensaje, false, 'listado');
    }).catch(function (error) {
      var mensaje = error.message;
      if (error.name === 'TypeError') mensaje += ' Si el envío se interrumpió, vuelva a intentar sin cambiar los datos.';
      aviso(mensaje, true, 'facturar');
    }).finally(function () { boton.disabled = false; actualizarBotonPrepararFactura(); });
  }
  function cancelarPreparacionFactura() {
    notasEnFactura = [];
    lineasEnFactura = [];
    avisos.facturar = null;
    cambiarTab('listado');
  }
  function cargarDetalle(id) {
    aviso('', false, 'detalle');
    return api('ver', {id: id}).then(function (datos) {
      var nota = datos.nota;
      notaVisible = nota;
      texto('ne-d-numero', 'N.º\u00a0' + nota.id);
      texto('ne-d-cliente', nota.nombre_cliente);
      texto('ne-d-cedula', nota.cliente_cedula);
      texto('ne-d-fecha', nota.fecha_emision);
      texto('ne-d-usuario', nota.usuario_nombre || nota.idusuario);
      texto('ne-d-sucursal', nota.idsucursal);
      texto('ne-d-estado', estadoNombre(nota.idestado));
      texto('ne-d-referencia', nota.referencia);
      if (Number(nota.origen) === 3 && nota.idordencompra_origen != null) {
        texto('ne-d-factura-label', 'Origen:');
        var celdaOrigen = el('ne-d-factura');
        celdaOrigen.replaceChildren();
        var ordenOrigenTexto = document.createElement('div');
        ordenOrigenTexto.appendChild(document.createTextNode('Orden de compra: '));
        agregarEnlaceOrigen(ordenOrigenTexto, nota.idordencompra_origen,
          nota.orden_origen_numero, 'orden de compra');
        celdaOrigen.appendChild(ordenOrigenTexto);
        if (nota.idfactura != null) {
          var facturaCreada = document.createElement('div');
          facturaCreada.textContent = 'Factura: ';
          var enlaceFacturaCreada = document.createElement('div');
          renderizarEnlaceFactura(enlaceFacturaCreada, nota.idfactura);
          facturaCreada.appendChild(enlaceFacturaCreada);
          celdaOrigen.appendChild(facturaCreada);
        }
      } else if (Number(nota.origen) === 2 && nota.idfactura_origen != null) {
        texto('ne-d-factura-label', 'Factura de origen:');
        var facturaOrigenDetalle = el('ne-d-factura');
        facturaOrigenDetalle.replaceChildren();
        agregarEnlaceOrigen(facturaOrigenDetalle, nota.idfactura_origen,
          nota.factura_origen_numero, 'factura de origen');
      } else {
        texto('ne-d-factura-label', 'Factura:');
        renderizarEnlaceFactura(el('ne-d-factura'), nota.idfactura);
      }
      texto('ne-d-observaciones', nota.observaciones);
      var tbody = el('ne-d-lineas');
      tbody.replaceChildren();
      nota.lineas.forEach(function (linea) {
        var fila = document.createElement('tr');
        agregarCelda(fila, linea.renglon);
        var celdaMaterial = agregarCelda(fila,
          (linea.producto_codigo || '') + ' · ' + linea.producto_descripcion);
        if (Number(nota.origen) === 3) {
          var origenMaterial = document.createElement('small');
          origenMaterial.className = 'ne-origen-material';
          origenMaterial.textContent = linea.iddetallefactura_origen != null
            ? 'Orden de compra' : 'Inventario local';
          celdaMaterial.appendChild(document.createElement('br'));
          celdaMaterial.appendChild(origenMaterial);
        }
        agregarCelda(fila, linea.destinatario);
        agregarCelda(fila, linea.unidad_nombre || linea.idunidad);
        agregarCelda(fila, linea.cantidad);
        agregarCelda(fila, linea.observaciones);
        tbody.appendChild(fila);
      });
      renderizarDevoluciones(nota);
      cambiarTab('detalle');
    });
  }
  function renderizarDevoluciones(nota) {
    var lineasAnulables = nota.lineas.filter(function (linea) {
      return linea.iddetallefactura_origen == null;
    });
    var sePuedeDevolver = Number(nota.idestado) === 1 && nota.idfactura == null
      && lineasAnulables.some(function (linea) { return Number(linea.cantidad_pendiente || 0) > 0; });
    var panel = el('ne-devolucion-panel');
    var cuerpo = el('ne-devolucion-lineas');
    var boton = el('ne-devolver-boton');
    var botonTotal = el('ne-anular-todo-boton');
    panel.hidden = !sePuedeDevolver;
    cuerpo.replaceChildren();
    var haySaldo = false;
    lineasAnulables.forEach(function (linea) {
      var pendiente = Math.max(0, Number(linea.cantidad_pendiente || 0));
      var fila = document.createElement('tr');
      agregarCelda(fila, (linea.producto_codigo || '') + ' · ' + linea.producto_descripcion);
      agregarCelda(fila, linea.cantidad + ' ' + (linea.unidad_nombre || ''));
      agregarCelda(fila, linea.cantidad_devuelta + ' ' + (linea.unidad_nombre || ''));
      var celdaPendiente = agregarCelda(fila, pendiente.toFixed(2) + ' ' + (linea.unidad_nombre || ''));
      if (pendiente <= 0) celdaPendiente.className = 'ne-dev-sin-saldo';
      var celdaCantidad = document.createElement('td');
      var entrada = document.createElement('input');
      entrada.type = 'number';
      entrada.className = 'ne-dev-cantidad';
      entrada.min = '0.01';
      entrada.step = '0.01';
      entrada.max = pendiente.toFixed(2);
      entrada.setAttribute('data-id-detalle', linea.id);
      entrada.setAttribute('aria-label', 'Cantidad a anular de ' + linea.producto_descripcion);
      entrada.disabled = !sePuedeDevolver || pendiente <= 0;
      if (pendiente > 0) haySaldo = true;
      celdaCantidad.appendChild(entrada);
      fila.appendChild(celdaCantidad);
      cuerpo.appendChild(fila);
    });
    boton.disabled = !sePuedeDevolver || !haySaldo;
    botonTotal.disabled = !sePuedeDevolver || !haySaldo;

    var historial = el('ne-d-historial');
    historial.replaceChildren();
    if (!nota.devoluciones || !nota.devoluciones.length) {
      var vacio = document.createElement('p');
      vacio.textContent = 'Todavía no se han registrado anulaciones.';
      historial.appendChild(vacio);
      return;
    }
    nota.devoluciones.forEach(function (evento) {
      var bloque = document.createElement('article');
      bloque.className = 'ne-dev-evento';
      var titulo = document.createElement('h3');
      titulo.textContent = 'Anulación #' + evento.id + ' · ' + evento.fecha;
      bloque.appendChild(titulo);
      var responsable = document.createElement('p');
      responsable.textContent = 'Responsable: ' + (evento.usuario_nombre || evento.idusuario);
      bloque.appendChild(responsable);
      if (evento.motivo) {
        var motivo = document.createElement('p');
        motivo.textContent = 'Motivo: ' + evento.motivo;
        bloque.appendChild(motivo);
      }
      var lista = document.createElement('ul');
      (evento.lineas || []).forEach(function (linea) {
        var item = document.createElement('li');
        item.textContent = (linea.producto_codigo || '') + ' · ' + linea.producto_descripcion
          + ': ' + linea.cantidad_devuelta + ' ' + (linea.unidad_nombre || '');
        lista.appendChild(item);
      });
      bloque.appendChild(lista);
      historial.appendChild(bloque);
    });
  }
  function prepararDevolucion(anulacionTotal) {
    if (!notaVisible || Number(notaVisible.idestado) !== 1 || notaVisible.idfactura != null) {
      throw new Error('Esta nota ya no admite anulaciones.');
    }
    var lineas = [];
    if (anulacionTotal) {
      notaVisible.lineas.forEach(function (linea) {
        if (linea.iddetallefactura_origen != null) return;
        var pendiente = Number(linea.cantidad_pendiente || 0);
        if (pendiente <= 0) return;
        lineas.push({
          iddetallenota: Number(linea.id),
          cantidad_devuelta: pendiente.toFixed(2)
        });
      });
    } else {
      Array.prototype.forEach.call(el('ne-devolucion-lineas').querySelectorAll('input[data-id-detalle]'), function (entrada) {
        var cantidad = entrada.value.trim();
        if (!cantidad) return;
        var original = notaVisible.lineas.find(function (linea) {
          return String(linea.id) === entrada.getAttribute('data-id-detalle');
        });
        if (!/^[0-9]{1,12}(\.[0-9]{1,2})?$/.test(cantidad) || Number(cantidad) <= 0) {
          throw new Error('Ingresa una cantidad positiva con máximo dos decimales.');
        }
        if (!original || Number(cantidad) > Number(original.cantidad_pendiente)) {
          throw new Error('La cantidad supera el saldo pendiente de una línea.');
        }
        lineas.push({iddetallenota: Number(entrada.getAttribute('data-id-detalle')), cantidad_devuelta: cantidad});
      });
    }
    if (!lineas.length) {
      throw new Error(anulacionTotal ? 'No hay material pendiente para anular.' : 'Indica al menos una cantidad para anular.');
    }
    return {
      motivo: el('ne-devolucion-motivo').value.trim() || null,
      lineas: lineas
    };
  }
  function registrarDevolucion(evento, anulacionTotal) {
    if (evento) evento.preventDefault();
    var devolucion;
    try { devolucion = prepararDevolucion(anulacionTotal); } catch (error) { aviso(error.message, true, 'detalle'); return; }
    var huella = JSON.stringify({idnota: Number(notaVisible.id), devolucion: devolucion});
    if (huella !== huellaDevolucionPendiente) {
      claveDevolucionPendiente = uuid();
      huellaDevolucionPendiente = huella;
    }
    devolucion.clave_operacion = claveDevolucionPendiente;
    var idNota = Number(notaVisible.id);
    var boton = el('ne-devolver-boton');
    var botonTotal = el('ne-anular-todo-boton');
    boton.disabled = true;
    botonTotal.disabled = true;
    aviso('Registrando la anulación…', false, 'detalle');
    api('devolver', {id: idNota}, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken},
      body: JSON.stringify(devolucion)
    }).then(function (respuesta) {
      claveDevolucionPendiente = huellaDevolucionPendiente = null;
      el('ne-devolucion-motivo').value = '';
      return cargarDetalle(idNota).then(function () {
        aviso((anulacionTotal ? 'Anulación total #' : 'Anulación #') + respuesta.iddevolucion
          + (respuesta.repetida ? ' recuperada tras el reintento.' : ' registrada.'), false, 'detalle');
      }).catch(function (error) {
        aviso('La anulación #' + respuesta.iddevolucion + ' fue registrada, pero no se pudo recargar la nota: ' + error.message, true, 'detalle');
      });
    }, function (error) {
      aviso(error.message, true, 'detalle');
    }).finally(function () {
      var puedeAnular = notaVisible && Number(notaVisible.idestado) === 1 && notaVisible.idfactura == null
        && notaVisible.lineas.some(function (linea) {
          return linea.iddetallefactura_origen == null && Number(linea.cantidad_pendiente || 0) > 0;
        });
      boton.disabled = !puedeAnular;
      botonTotal.disabled = !puedeAnular;
    });
  }
  function iniciar() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-ne-origen]'), function (boton) {
      boton.addEventListener('click', function () {
        cambiarModoEmision(boton.getAttribute('data-ne-origen'));
      });
    });
    conectarBusquedaFacturaOrigen();
    conectarBusquedaOrdenOrigen();
    el('ne-cambiar-orden-origen').addEventListener('click', function () {
      el('ne-buscar-orden-origen').value = '';
      el('ne-resultados-orden-origen').replaceChildren();
      el('ne-orden-origen-elegida').hidden = true;
      el('ne-orden-lineas-card').hidden = true;
      el('ne-orden-extras-card').hidden = true;
      el('ne-orden-origen-lineas').replaceChildren();
      el('ne-orden-extras').replaceChildren();
      ordenOrigen = null;
      actualizarBotonEmitirOrden();
      el('ne-buscar-orden-origen').focus();
    });
    el('ne-orden-seleccionar-todas').addEventListener('change', function () {
      var incluirTodas = this.checked;
      Array.prototype.forEach.call(
        el('ne-orden-origen-lineas').querySelectorAll('.ne-incluir-orden'),
        function (incluir) { incluir.checked = incluirTodas; }
      );
      actualizarBotonEmitirOrden();
    });
    el('ne-emitir-orden-boton').addEventListener('click', emitirDesdeOrden);
    el('ne-orden-agregar-extra').addEventListener('click', function () {
      if (el('ne-orden-origen-lineas').querySelectorAll('.ne-incluir-orden:checked').length
          + el('ne-orden-extras').children.length >= maxLineas) {
        aviso('La nota admite como máximo ' + maxLineas + ' líneas.', true, 'emitir');
        return;
      }
      nuevaLinea('ne-orden-extras');
    });
    el('ne-cambiar-factura-origen').addEventListener('click', function () {
      el('ne-buscar-factura-origen').value = '';
      el('ne-resultados-factura-origen').replaceChildren();
      el('ne-factura-origen-elegida').hidden = true;
      el('ne-factura-lineas-card').hidden = true;
      el('ne-factura-origen-lineas').replaceChildren();
      facturaOrigen = null;
      actualizarBotonEmitirFactura();
      el('ne-buscar-factura-origen').focus();
    });
    el('ne-emitir-factura-boton').addEventListener('click', emitirDesdeFactura);
    el('ne-factura-seleccionar-todas').addEventListener('change', function () {
      var incluirTodas = this.checked;
      Array.prototype.forEach.call(
        el('ne-factura-origen-lineas').querySelectorAll('.ne-incluir-factura'),
        function (incluir) { incluir.checked = incluirTodas; }
      );
      actualizarBotonEmitirFactura();
    });
    conectarBusqueda(el('ne-buscar-cliente'), el('ne-resultados-cliente'), 'clientes', function (item) {
      cliente = item;
      texto('ne-cliente-elegido', 'Cliente #' + item.id);
      cerrarFormularioCrearCliente(true);
    }, function () { cliente = null; texto('ne-cliente-elegido', 'Ningún cliente seleccionado'); });
    conectarBusqueda(el('ne-f-cliente-texto'), el('ne-f-resultados-cliente'), 'clientes', function (item) {
      clienteFiltro = item;
      texto('ne-f-cliente-elegido', 'Cliente #' + item.id);
    }, function () { clienteFiltro = null; texto('ne-f-cliente-elegido', 'Ningún cliente seleccionado'); });
    conectarBusqueda(el('ne-f-usuario'), el('ne-f-resultados-usuario'), 'usuarios', function (item) {
      usuarioFiltro = item;
      texto('ne-f-usuario-elegido', 'Responsable: ' + item.nombre);
    }, function () { usuarioFiltro = null; texto('ne-f-usuario-elegido', 'Todos los responsables'); });
    el('ne-tipo-cliente').addEventListener('change', cambiarTipoCliente);
    el('ne-abrir-crear-cliente').addEventListener('click', function () {
      var panel = el('ne-crear-cliente-panel');
      if (panel.hidden) {
        panel.hidden = false;
        Array.prototype.forEach.call(
          el('ne-crear-cliente-campos').querySelectorAll('input, select, button'),
          function (control) { control.disabled = false; }
        );
        el('ne-nuevo-cliente-nombre').focus();
      } else {
        cerrarFormularioCrearCliente(true);
      }
    });
    el('ne-cancelar-cliente').addEventListener('click', function () {
      cerrarFormularioCrearCliente(true);
    });
    el('ne-guardar-cliente').addEventListener('click', crearCliente);
    el('ne-f-tipo-cliente').addEventListener('change', function () {
      el('ne-f-busqueda-cliente').hidden = this.value !== 'registrado';
      clienteFiltro = null;
      el('ne-f-cliente-texto').value = '';
      texto('ne-f-cliente-elegido', 'Ningún cliente seleccionado');
    });
    el('ne-agregar-linea').addEventListener('click', function () { nuevaLinea(); });
    el('ne-preparar-factura').addEventListener('click', prepararFacturacion);
    el('ne-facturar-form').addEventListener('submit', facturarNotas);
    el('ne-cancelar-factura').addEventListener('click', cancelarPreparacionFactura);
    el('ne-form').addEventListener('submit', emitir);
    el('ne-devolucion-form').addEventListener('submit', registrarDevolucion);
    el('ne-anular-todo-boton').addEventListener('click', function () { registrarDevolucion(null, true); });
    el('ne-filtros').addEventListener('submit', function (evento) {
      evento.preventDefault();
      offset = 0;
      cargarLista();
    });
    function sincronizarBotonQuitarFechas() {
      el('ne-limpiar-fechas').disabled = !valor('ne-f-desde') && !valor('ne-f-hasta');
    }
    el('ne-f-desde').addEventListener('change', sincronizarBotonQuitarFechas);
    el('ne-f-hasta').addEventListener('change', sincronizarBotonQuitarFechas);
    el('ne-limpiar-fechas').addEventListener('click', function () {
      el('ne-f-desde').value = '';
      el('ne-f-hasta').value = '';
      sincronizarBotonQuitarFechas();
      offset = 0;
      aviso('', false, 'listado');
      cargarLista();
    });
    sincronizarBotonQuitarFechas();
    el('ne-anterior').addEventListener('click', function () {
      offset = Math.max(0, offset - limite);
      cargarLista();
    });
    el('ne-siguiente').addEventListener('click', function () {
      offset += limite;
      cargarLista();
    });
    el('ne-volver').addEventListener('click', function () { cambiarTab('listado'); });
    el('ne-formato-a4').addEventListener('change', function () {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    });
    el('ne-imprimir').addEventListener('click', function () {
      if (!notaVisible) return;
      var formatoA4 = el('ne-formato-a4').checked;
      el('ne-app').classList.toggle('ne-formato-a4', formatoA4);
      el('ne-app').classList.toggle('ne-formato-pv', !formatoA4);
      window.print();
    });
    window.addEventListener('afterprint', function () {
      el('ne-app').classList.remove('ne-formato-a4', 'ne-formato-pv');
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-ne-tab]'), function (boton) {
      boton.addEventListener('click', function () { cambiarTab(boton.getAttribute('data-ne-tab')); });
    });
    Promise.all([api('contexto'), api('unidades')]).then(function (respuestas) {
      csrfToken = respuestas[0].csrf_token;
      maxLineas = respuestas[0].max_lineas;
      unidades = respuestas[1].unidades;
      texto('ne-contexto', 'Sucursal ' + respuestas[0].idsucursal + ' · Usuario ' + respuestas[0].idusuario);
      nuevaLinea();
      el('ne-emitir-boton').disabled = false;
      el('ne-abrir-crear-cliente').disabled = false;
      api('opciones-factura').then(cargarOpcionesFactura).catch(function (error) {
        opcionesFactura = null;
        actualizarBotonPrepararFactura();
        aviso('No se pudo cargar la configuración de facturación: ' + error.message, true, 'listado');
      });
    }).catch(function (error) { aviso(error.message, true); });
  }
  el('ne-emitir-boton').disabled = true;
  el('ne-emitir-factura-boton').disabled = true;
  el('ne-preparar-factura').disabled = true;
  el('ne-facturar-boton').disabled = true;
  iniciar();
}());
