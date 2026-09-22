$(function(){
	let fecha = new Date()
	init_bmi(fecha)
})

async function init_bmi(fecha){

	// === FILTROS BMI === 

	$("#filtro_mes").val(fecha.getMonth()+1).material_select('update')
	$("#filtro_year").val(fecha.getFullYear())

	/*rs = await asgard.fetch({

		fn:'bmi.getSucursal'

	})*/

	// === FILTROS BMI === 

	// === KPIS BMI === 

	// === VENTAS NETAS-BRUTAS-NC ===
	getDatos_async('',474,'1,@@impresa,'+(fecha.getMonth()+1)+","+fecha.getFullYear()).then((rs)=>{
		rs = rs[0][0]
		$("#ventas_brutas_mes").html(parseFloat(rs[0]).formatMoney(2,'.',','))
		$("#nc_mes").html(parseFloat(rs[1]).formatMoney(2,'.',','))
		$("#ventas_mes").html(parseFloat(rs[2]).formatMoney(2,'.',','))
		/*
		$("#stock_mes").html(parseFloat(rs[6]).formatMoney(2,'.',','))
		$("#bmin_mes").html(parseFloat(rs[7]).formatMoney(0,'.',','))*/
	})

	// === UTILIDAD ===
	getDatos_async('',474,'2,@@impresa,'+(fecha.getMonth()+1)+","+fecha.getFullYear()).then((rs)=>{
		rs = rs[0][0]
		$("#utilidad_mes").html(parseFloat(rs[0]).formatMoney(2,'.',','))
	})

	// === MINIMOS ===
	getDatos_async('',474,'3,@@impresa,'+(fecha.getMonth()+1)+","+fecha.getFullYear()).then((rs)=>{
		rs = rs[0][0]
		$("#bmin_mes").html(parseFloat(rs[0]).formatMoney(0,'.',','))
	})

	// === VENTAS STACKED ===
	getDatos_async('',475,'@@impresa,'+(fecha.getMonth()+1)+","+fecha.getFullYear()).then((rs)=>{
		let alabels = []
		let autils  = []
		let acosto  = []
		let anc  	= []
		$.each(rs[0],function(i,e){
			alabels.push(e[0])
			autils.push(e[1])
			acosto.push(e[2])
			anc.push(e[3])
		})
		new Chart(document.getElementById('ventasChart'), {
			type: 'bar',
			data: {
			  labels: alabels,
			  datasets: [
			    { label: 'Costo', data: acosto },
			    { label: 'Utilidad', data: autils },
			    { label: 'Notas Crédito', data: anc }
			  ]
			},
			options: {
			  scales: { x: { stacked:true }, y: { stacked:true } },
			  onClick: (_, e) => {
			    if(!e.length) return;
			    document.getElementById('ventasTabla').innerHTML =
			      `<tr><td>#F-10${e[0].index}</td><td>Cliente X</td><td>₡200,000</td><td>₡120,000</td><td>₡320,000</td></tr>`;
			  }
			}
		});
	})

	// === RENTABILIDAD ANUAL ===
	getDatos_async('',476,'@@impresa,'+fecha.getFullYear()).then((rs)=>{
		let aventas = []
		let acostos  = []
		rs = rs[0][0]

		for (var i = 0; i <= 12; i++) {
			aventas.push(rs[i*2])
			acostos.push(rs[i*2+1])
		}

		new Chart(document.getElementById('rentabilidadChart'), {
			type: 'bar',
			data: {
			  labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
			  datasets: [
			    { label: 'Ventas', data: aventas },
			    { label: 'Costos', data: acostos }
			  ]
			}
		});
	})
}

function showTab(tab) {
    ['ventas','compras','inventario','rentabilidad','movimientos','articulos'].forEach(t => {
      document.getElementById(t).style.display = (t === tab) ? 'grid' : 'none';
    });
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
  }

let analisisGrafico = null;
let analisisGraficoData = [];


function cargarGrafico(data) {

    analisisGraficoData = data;

    const canvas = document.getElementById('analisis-grafico-producto');

    if (!canvas) return;

    if (analisisGrafico) {
        analisisGrafico.destroy();
    }

    const labels = data.map(i => i.etiqueta);

    const ventas = data.map(i => Number(i.ventas || 0));
    const compras = data.map(i => Number(i.compras || 0));
    const utilidad = data.map(i => Number(i.utilidad || 0));

    analisisGrafico = new Chart(canvas, {

        type: 'line',

        data: {

            labels: labels,

            datasets: [

                {
                    label: 'Ventas',
                    data: ventas,

                    borderWidth: 2,
                    tension: 0.35,

                    pointRadius: 4,
                    pointHoverRadius: 7
                },

                {
                    label: 'Compras',
                    data: compras,

                    borderWidth: 2,
                    tension: 0.35,

                    pointRadius: 4,
                    pointHoverRadius: 7
                },

                {
                    label: 'Utilidad',
                    data: utilidad,

                    borderWidth: 2,
                    tension: 0.35,

                    pointRadius: 4,
                    pointHoverRadius: 7
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                mode: 'index',
                intersect: false
            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            const valor =
                                Number(context.raw || 0);

                            return `${context.dataset.label}: ${formatoDinero(valor)}`;
                        }

                    }

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        callback: function(value) {
                            return formatoCompacto(value);
                        }

                    }

                },

                x: {

                    grid: {
                        display: false
                    }

                }

            },

            onClick: function(event, elements) {

                if (!elements.length) return;

                const index =
                    elements[0].index;

                const periodo =
                    analisisGraficoData[index];

                if (!periodo) return;

                consultarDetalleMes(periodo);

            }

        }

    });
}

function formatoDinero(valor) {

    return new Intl.NumberFormat('es-CR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

function formatoNumero(valor) {

    return new Intl.NumberFormat('es-CR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Number(valor || 0));

}


function formatoCompacto(valor) {

    valor = Number(valor || 0);

    if (Math.abs(valor) >= 1000000) {
        return `${(valor / 1000000).toFixed(1)} M`;
    }

    if (Math.abs(valor) >= 1000) {
        return `${(valor / 1000).toFixed(0)} K`;
    }

    return valor.toString();
}

function consultarDetalleMes(periodo) {

    cargarDetalleProducto(
        periodo.desde,
        periodo.hasta
    );

}

function cargarDetalleProducto(desde, hasta) {

		let id = $("#analisis_producto").attr('vid')

   	getDatos_async('',606,`2,"",${id},"${desde}","${hasta}"`,1).then((data) => {

   		if (!data || !data.succed) {
		        console.error('No se pudo cargar el análisis del producto');
		        return;
		  }

		  data = data[0]
	    // ==========================================
	    // CALCULAR RESUMEN
	    // ==========================================

	    const ventas = data.reduce(
	        (total, i) => total + Number(i.ventas || 0),
	        0
	    );

	    const compras = data.reduce(
	        (total, i) => total + Number(i.compras || 0),
	        0
	    );

	    const utilidad = data.reduce(
	        (total, i) => total + Number(i.utilidad || 0),
	        0
	    );

	    const cantidad = data.reduce(
	        (total, i) => total + Number(i.cantidad || 0),
	        0
	    );


	    // ==========================================
	    // ENCABEZADO
	    // ==========================================

	    const fechaDesde = new Date(`${desde}T00:00:00`);
	    const fechaHasta = new Date(`${hasta}T00:00:00`);

	    const opciones = {
	        day: '2-digit',
	        month: 'short',
	        year: 'numeric'
	    };

	    document.getElementById('detalle-titulo').textContent =
	        'Agosto 2026';

	    document.getElementById('detalle-periodo').textContent =
	        `${fechaDesde.toLocaleDateString('es-CR', opciones)}
	         → 
	         ${fechaHasta.toLocaleDateString('es-CR', opciones)}`;


	    // ==========================================
	    // RESUMEN
	    // ==========================================

	    document.getElementById('detalle-ventas').textContent =
	        formatoDinero(ventas);

	    document.getElementById('detalle-compras').textContent =
	        formatoDinero(compras);

	    document.getElementById('detalle-utilidad').textContent =
	        formatoDinero(utilidad);

	    document.getElementById('detalle-cantidad').textContent =
	        formatoNumero(cantidad);


	    // ==========================================
	    // DÍAS
	    // ==========================================

	    const contenedor =
	        document.querySelector('.detalle-dias');

	    contenedor.innerHTML = '';


	    data.forEach(dia => {

	        const div = document.createElement('div');

	        div.className = 'detalle-dia';

	        div.innerHTML = `

	            <div class="dia-fecha">
	                <strong>${dia.etiqueta.split(' ')[0]}</strong>
	                <span>${dia.etiqueta.split(' ')[1]}</span>
	            </div>

	            <div class="dia-datos">

	                <div>
	                    <span>Ventas</span>
	                    <strong>${formatoDinero(dia.ventas)}</strong>
	                </div>

	                <div>
	                    <span>Compras</span>
	                    <strong>${formatoDinero(dia.compras)}</strong>
	                </div>

	                <div>
	                    <span>Utilidad</span>
	                    <strong>${formatoDinero(dia.utilidad)}</strong>
	                </div>

	            </div>

	            <button
	                class="dia-detalle"
	                onclick="cargarDetalleDia('${dia.fecha}')">

	                →

	            </button>

	        `;

	        contenedor.appendChild(div);

	    });
	  })

}

function cargarDetalleDia(fecha) {

    const data = dumpDetalleDia[fecha];

    if (!data) {

        console.warn(
            'No existen datos para el día:',
            fecha
        );

        return;
    }


    // ==========================================
    // FECHA
    // ==========================================

    const fechaObj =
        new Date(`${fecha}T00:00:00`);

    const fechaTexto =
        fechaObj.toLocaleDateString(
            'es-CR',
            {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }
        );


    document.getElementById(
        'documentos-titulo'
    ).textContent =
        `Movimientos del ${fechaTexto}`;


    document.getElementById(
        'documentos-subtitulo'
    ).textContent =
        'Documentos relacionados con el producto';


    // ==========================================
    // RESUMEN
    // ==========================================

    document.getElementById(
        'documentos-ventas'
    ).textContent =
        formatoDinero(data.ventas);


    document.getElementById(
        'documentos-compras'
    ).textContent =
        formatoDinero(data.compras);


    document.getElementById(
        'documentos-devoluciones'
    ).textContent =
        formatoDinero(data.devoluciones);


    document.getElementById(
        'documentos-cantidad'
    ).textContent =
        formatoNumero(data.cantidad);


    // ==========================================
    // LISTA
    // ==========================================

    const contenedor =
        document.getElementById(
            'documentos-lista'
        );

    contenedor.innerHTML = '';


    data.documentos.forEach(doc => {

        const elemento =
            document.createElement('div');

        elemento.className =
            'documento-movimiento';

        /*${iconoDocumento(doc.tipo)}*/
        elemento.innerHTML = `

            <div class="documento-icono
                ${doc.tipo.toLowerCase()}">

                

            </div>


            <div class="documento-info">

                <strong>
                    ${doc.documento}
                </strong>

                <span>
                    ${doc.tercero}
                </span>

            </div>


            <div class="documento-cantidad">

                <span>Cantidad</span>

                <strong>
                    ${formatoNumero(doc.cantidad)}
                </strong>

            </div>


            <div class="documento-monto">

                <span>
                    ${doc.tipo === 'DEVOLUCION'
                        ? 'Devolución'
                        : 'Monto'}
                </span>

                <strong>
                    ${formatoDinero(doc.monto)}
                </strong>

            </div>


            <div class="documento-utilidad">

                ${
                    doc.utilidad !== null
                    ?
                    `
                    <span>Utilidad</span>

                    <strong>
                        ${formatoDinero(doc.utilidad)}
                    </strong>
                    `
                    :
                    `
                    <span>—</span>
                    `
                }

            </div>


            <button
                class="documento-abrir"
                onclick="
                    abrirDocumento(
                        '${doc.tipo}',
                        '${doc.documento}'
                    )
                ">

                →

            </button>

        `;


        contenedor.appendChild(elemento);

    });


    // ==========================================
    // MOSTRAR NIVEL 2
    // ==========================================

    const panel =
        document.getElementById(
            'detalle-documentos'
        );

    panel.style.display = 'block';


    // Scroll suave hacia el detalle

    panel.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });

}

function cerrarDetalleDia() {

    const panel =
        document.getElementById(
            'detalle-documentos'
        );

    panel.style.display = 'none';

}

function iconoDocumento(revisar){
	console.log(revisar)
	Materialize.toast('En Construccion',4000,'red')
}

function postFProd(accion,id,elem){

		switch(accion){
		case "1":
			let periodo = $("#analisis_periodo option:selected").val();

			getDatos_async('',606,`1,"${periodo}",${id},"",""`,1).then((rs) => {

				if (!rs || !rs.succed) {
		        console.error('No se pudo cargar el análisis del producto');
		        return;
		    }

		    cargarGrafico(rs[0]);
			})

			getDatos_async(
    	'',
    	605,
    	`"${periodo}",${id}`,
    	1
).then((rs) => {
    const data = rs[0][0];

    if (!data) return;

    const moneda = data.moneda || '';

    const dinero = (valor) => {
        return new Intl.NumberFormat('es-CR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(Number(valor || 0));
    };

    const numero = (valor) => {
        return new Intl.NumberFormat('es-CR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(Number(valor || 0));
    };

    const variacion = (valor) => {

        if (valor === null || valor === undefined) {
            return '—';
        }

        const n = Number(valor);

        return `${n >= 0 ? '▲' : '▼'} ${Math.abs(n).toFixed(1)}% vs período anterior`;
    };


    // ==========================================
    // VENTAS
    // ==========================================

    document.getElementById('analisis-ventas').textContent =
        `${moneda} ${dinero(data.ventas)}`;

    const ventasExtra =
        document.getElementById('analisis-ventas-extra');

    ventasExtra.textContent =
        variacion(data.ventas_variacion);

    ventasExtra.className =
        `kpi-extra ${
            Number(data.ventas_variacion) >= 0
                ? 'positivo'
                : 'negativo'
        }`;


    // ==========================================
    // UNIDADES
    // ==========================================

    document.getElementById('analisis-cantidad').textContent =
        `${numero(data.cantidad)} ${data.medida || ''}`;

    document.getElementById('analisis-cantidad-extra').textContent =
        `${numero(data.promedio_mensual)} ${data.medida || ''} promedio / mes`;


    // ==========================================
    // COSTO
    // ==========================================

    document.getElementById('analisis-costo').textContent =
        `${moneda} ${dinero(data.costo)}`;

    const costoPromedio =
        data.cantidad > 0
            ? Number(data.costo) / Number(data.cantidad)
            : 0;

    document.getElementById('analisis-costo-extra').textContent =
        `Costo promedio ${moneda} ${dinero(costoPromedio)}`;


    // ==========================================
    // UTILIDAD
    // ==========================================

    document.getElementById('analisis-utilidad').textContent =
        `${moneda} ${dinero(data.utilidad)}`;

    document.getElementById('analisis-utilidad-extra').textContent =
        `Margen ${Number(data.margen || 0).toFixed(1)}%`;

    document.getElementById('analisis-utilidad-extra')
        .classList.add('positivo');


    // ==========================================
    // INVENTARIO
    // ==========================================

    document.getElementById('analisis-stock').textContent =
        `${numero(data.stock)} ${data.medida || ''}`;

    const cobertura =
        document.getElementById('analisis-stock-extra');

    if (data.cobertura === null) {

        cobertura.textContent = 'Sin cobertura';

        cobertura.className =
            'kpi-extra advertencia';

    } else {

        cobertura.textContent =
            `Cobertura ${Number(data.cobertura).toFixed(1)} meses`;

        cobertura.className =
            'kpi-extra';

        // Menos de 1 mes → advertencia
        if (Number(data.cobertura) < 1) {
            cobertura.classList.add('advertencia');
        }
    }

});

			break;
		default:
			break;
		}

}