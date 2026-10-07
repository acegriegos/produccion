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

  function el(id) { return document.getElementById(id); }
  function valor(id) { return el(id).value.trim(); }
  function texto(id, value) { el(id).textContent = value == null || value === '' ? '—' : String(value); }
  function estadoNombre(id) {
    return ({1: 'Pendiente de factura', 2: 'Facturada', 3: 'Anulada'})[id] || 'Desconocido';
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
    cliente = null;
    el('ne-buscar-cliente').value = '';
    texto('ne-cliente-elegido', 'Ningún cliente seleccionado');
    el('ne-resultados-cliente').replaceChildren();
  }
  function unidadesPermitidas(producto) {
    var base = Number(producto.idunidad);
    var dimension = Number(producto.tiene_dimension) === 1;
    if (base === 1) return dimension ? [1, 8, 9] : [1];
    if (base === 8) return dimension ? [1, 8, 9] : [8, 9];
    if (base === 2) return [2, 3, 4];
    return [base];
  }
  function nuevaLinea() {
    var lista = el('ne-lineas');
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
      '<div class="ne-search"><label>Proveedor<input class="ne-proveedor" type="search" placeholder="Nombre o cédula"></label><div class="ne-resultados ne-proveedores"></div><p class="ne-seleccion ne-proveedor-elegido">Ningún proveedor seleccionado</p></div>' +
      '<label>Unidad<select class="ne-unidad browser-default" required><option value="">Seleccione artículo</option></select></label>' +
      '<label>Cantidad<input class="ne-cantidad" type="number" min="0.01" step="0.01" required></label>' +
      '<label class="ne-linea-notas">Indicación, medida o corte (opcional)<input class="ne-linea-observaciones" type="text" maxlength="255"></label>' +
      '</div>';
    fila.producto = null;
    fila.proveedor = null;
    lista.appendChild(fila);
    renumerar();
    var buscarProducto = fila.querySelector('.ne-producto');
    var buscarProveedor = fila.querySelector('.ne-proveedor');
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
    conectarBusqueda(buscarProveedor, fila.querySelector('.ne-proveedores'), 'proveedores', function (elegido) {
      fila.proveedor = elegido;
      fila.querySelector('.ne-proveedor-elegido').textContent = 'Proveedor #' + elegido.id;
    }, function () {
      fila.proveedor = null;
      fila.querySelector('.ne-proveedor-elegido').textContent = 'Ningún proveedor seleccionado';
    });
    fila.querySelector('.ne-cantidad').addEventListener('input', function () { actualizarStock(fila); });
    fila.querySelector('.ne-unidad').addEventListener('change', function () { actualizarStock(fila); });
    fila.querySelector('.ne-quitar').addEventListener('click', function () {
      if (lista.children.length === 1) return aviso('La nota necesita al menos un artículo.', true);
      fila.remove();
      renumerar();
    });
  }
  function renumerar() {
    Array.prototype.forEach.call(el('ne-lineas').children, function (fila, indice) {
      fila.querySelector('.ne-renglon').textContent = 'Artículo ' + (indice + 1);
    });
  }
  function actualizarStock(fila) {
    if (!fila.producto) return;
    var p = fila.producto;
    var stock = fila.querySelector('.ne-stock');
    if (Number(p.saldos) !== 1) {
      stock.textContent = 'No hay un saldo único en el inventario 6; no se puede emitir este artículo.';
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
      if (!fila.producto || !fila.proveedor) {
        throw new Error('Seleccione artículo y proveedor en la línea ' + (indice + 1) + '.');
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
        idproveedor: Number(fila.proveedor.id),
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
  function filtros() {
    var tipo = valor('ne-f-tipo-cliente');
    if (tipo === 'registrado' && !clienteFiltro) throw new Error('Seleccione el cliente del filtro.');
    return {
      estado: valor('ne-f-estado'),
      idcliente: tipo === 'registrado' ? clienteFiltro.id : tipo,
      fecha_desde: valor('ne-f-desde'),
      fecha_hasta: valor('ne-f-hasta'),
      idusuario: valor('ne-f-usuario') || '0',
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
        renderizarEnlaceFactura(celdaFactura, nota.idfactura);
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
      renderizarEnlaceFactura(el('ne-d-factura'), nota.idfactura);
      texto('ne-d-observaciones', nota.observaciones);
      var tbody = el('ne-d-lineas');
      tbody.replaceChildren();
      nota.lineas.forEach(function (linea) {
        var fila = document.createElement('tr');
        agregarCelda(fila, linea.renglon);
        agregarCelda(fila, (linea.producto_codigo || '') + ' · ' + linea.producto_descripcion);
        agregarCelda(fila, linea.proveedor_nombre || linea.idproveedor);
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
    var sePuedeDevolver = Number(nota.idestado) === 1 && nota.idfactura == null;
    var panel = el('ne-devolucion-panel');
    var cuerpo = el('ne-devolucion-lineas');
    var boton = el('ne-devolver-boton');
    panel.hidden = !sePuedeDevolver;
    cuerpo.replaceChildren();
    var haySaldo = false;
    nota.lineas.forEach(function (linea) {
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
      entrada.setAttribute('aria-label', 'Cantidad a devolver de ' + linea.producto_descripcion);
      entrada.disabled = !sePuedeDevolver || pendiente <= 0;
      if (pendiente > 0) haySaldo = true;
      celdaCantidad.appendChild(entrada);
      fila.appendChild(celdaCantidad);
      cuerpo.appendChild(fila);
    });
    boton.disabled = !sePuedeDevolver || !haySaldo;

    var historial = el('ne-d-historial');
    historial.replaceChildren();
    if (!nota.devoluciones || !nota.devoluciones.length) {
      var vacio = document.createElement('p');
      vacio.textContent = 'Todavía no se han registrado devoluciones.';
      historial.appendChild(vacio);
      return;
    }
    nota.devoluciones.forEach(function (evento) {
      var bloque = document.createElement('article');
      bloque.className = 'ne-dev-evento';
      var titulo = document.createElement('h3');
      titulo.textContent = 'Devolución #' + evento.id + ' · ' + evento.fecha;
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
  function prepararDevolucion() {
    if (!notaVisible || Number(notaVisible.idestado) !== 1 || notaVisible.idfactura != null) {
      throw new Error('Esta nota ya no admite devoluciones.');
    }
    var lineas = [];
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
    if (!lineas.length) throw new Error('Indica al menos una cantidad para devolver.');
    return {
      motivo: el('ne-devolucion-motivo').value.trim() || null,
      lineas: lineas
    };
  }
  function registrarDevolucion(evento) {
    evento.preventDefault();
    var devolucion;
    try { devolucion = prepararDevolucion(); } catch (error) { aviso(error.message, true, 'detalle'); return; }
    var huella = JSON.stringify({idnota: Number(notaVisible.id), devolucion: devolucion});
    if (huella !== huellaDevolucionPendiente) {
      claveDevolucionPendiente = uuid();
      huellaDevolucionPendiente = huella;
    }
    devolucion.clave_operacion = claveDevolucionPendiente;
    var idNota = Number(notaVisible.id);
    var boton = el('ne-devolver-boton');
    boton.disabled = true;
    aviso('Registrando la devolución…', false, 'detalle');
    api('devolver', {id: idNota}, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken},
      body: JSON.stringify(devolucion)
    }).then(function (respuesta) {
      claveDevolucionPendiente = huellaDevolucionPendiente = null;
      el('ne-devolucion-motivo').value = '';
      return cargarDetalle(idNota).then(function () {
        aviso('Devolución #' + respuesta.iddevolucion + (respuesta.repetida ? ' recuperada tras el reintento.' : ' registrada.'), false, 'detalle');
      }).catch(function (error) {
        aviso('La devolución #' + respuesta.iddevolucion + ' fue registrada, pero no se pudo recargar la nota: ' + error.message, true, 'detalle');
      });
    }, function (error) {
      aviso(error.message, true, 'detalle');
    }).finally(function () { boton.disabled = false; });
  }
  function iniciar() {
    conectarBusqueda(el('ne-buscar-cliente'), el('ne-resultados-cliente'), 'clientes', function (item) {
      cliente = item;
      texto('ne-cliente-elegido', 'Cliente #' + item.id);
    }, function () { cliente = null; texto('ne-cliente-elegido', 'Ningún cliente seleccionado'); });
    conectarBusqueda(el('ne-f-cliente-texto'), el('ne-f-resultados-cliente'), 'clientes', function (item) {
      clienteFiltro = item;
      texto('ne-f-cliente-elegido', 'Cliente #' + item.id);
    }, function () { clienteFiltro = null; texto('ne-f-cliente-elegido', 'Ningún cliente seleccionado'); });
    el('ne-tipo-cliente').addEventListener('change', cambiarTipoCliente);
    el('ne-f-tipo-cliente').addEventListener('change', function () {
      el('ne-f-busqueda-cliente').hidden = this.value !== 'registrado';
      clienteFiltro = null;
      el('ne-f-cliente-texto').value = '';
      texto('ne-f-cliente-elegido', 'Ningún cliente seleccionado');
    });
    el('ne-agregar-linea').addEventListener('click', nuevaLinea);
    el('ne-preparar-factura').addEventListener('click', prepararFacturacion);
    el('ne-facturar-form').addEventListener('submit', facturarNotas);
    el('ne-cancelar-factura').addEventListener('click', cancelarPreparacionFactura);
    el('ne-form').addEventListener('submit', emitir);
    el('ne-devolucion-form').addEventListener('submit', registrarDevolucion);
    el('ne-filtros').addEventListener('submit', function (evento) {
      evento.preventDefault();
      offset = 0;
      cargarLista();
    });
    el('ne-anterior').addEventListener('click', function () {
      offset = Math.max(0, offset - limite);
      cargarLista();
    });
    el('ne-siguiente').addEventListener('click', function () {
      offset += limite;
      cargarLista();
    });
    el('ne-volver').addEventListener('click', function () { cambiarTab('listado'); });
    el('ne-imprimir').addEventListener('click', function () {
      if (notaVisible) window.print();
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
      api('opciones-factura').then(cargarOpcionesFactura).catch(function (error) {
        opcionesFactura = null;
        actualizarBotonPrepararFactura();
        aviso('No se pudo cargar la configuración de facturación: ' + error.message, true, 'listado');
      });
    }).catch(function (error) { aviso(error.message, true); });
  }
  el('ne-emitir-boton').disabled = true;
  el('ne-preparar-factura').disabled = true;
  el('ne-facturar-boton').disabled = true;
  iniciar();
}());
