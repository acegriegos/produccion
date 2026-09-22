$(function(){
	let fecha = new Date()
	getDatos_async('',474,'@@impresa,'+(fecha.getMonth()+1)+","+fecha.getFullYear()).then((rs)=>{
		rs = rs[0][0]
		$("#ventas_brutas_mes").html(parseFloat(rs[0]).formatMoney(2,'.',','))
		$("#nc_mes").html(parseFloat(rs[1]).formatMoney(2,'.',','))
		$("#ventas_mes").html(parseFloat(rs[2]).formatMoney(2,'.',','))
		$("#utilidad_mes").html(parseFloat(rs[4]).formatMoney(2,'.',','))
		$("#stock_mes").html(parseFloat(rs[6]).formatMoney(2,'.',','))
		$("#bmin_mes").html(parseFloat(rs[7]).formatMoney(0,'.',','))
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
})

function showTab(tab) {
    ['ventas','compras','inventario','rentabilidad','movimientos'].forEach(t => {
      document.getElementById(t).style.display = (t === tab) ? 'grid' : 'none';
    });
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
  }