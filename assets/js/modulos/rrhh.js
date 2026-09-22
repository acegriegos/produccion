$(function(){
	$('select').material_select();
	$(".modal").modal();
	$('.tooltipped').tooltip({delay: 50});
	$(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });

	asgard.core_init()

    //LLENAR KPIS
    let fecha = new Date()

    getDatos_async('',478,'1,@@impresa,0,0').then((rs)=>{
    	const ctx = document.getElementById('chart_empleados_tipo');

		const dataEmpleados = {
		  labels: ['Semanal', 'Quincenal', 'Mensual'],
		  datasets: [{
		    data: rs[0][0], // ← valores dinámicos
		    backgroundColor: [
		      '#42a5f5', // azul
		      '#66bb6a', // verde
		      '#ffa726'  // naranja
		    ],
		    borderWidth: 1
		  }]
		};

		const totalEmpleados = dataEmpleados.datasets[0].data.reduce((a, b) => parseInt(a) + parseInt(b), 0);

		new Chart(ctx, {
		  type: 'doughnut',
		  data: dataEmpleados,
		  options: {
		    responsive: true,
		    maintainAspectRatio: false,
		    cutout: '65%',
		    plugins: {
		      legend: {
		        position: 'bottom',
		        labels: {
		          boxWidth: 12
		        }
		      },
		      tooltip: {
		        callbacks: {
		          label: function(context) {
		            const value = context.raw;
		            const pct = ((value / totalEmpleados) * 100).toFixed(1);
		            return `${context.label}: ${value} (${pct}%)`;
		          }
		        }
		      }
		    }
		  },
		  plugins: [{
		    id: 'centerText',
		    beforeDraw(chart) {
		      const { width, height, ctx } = chart;
		      ctx.restore();
		      const fontSize = (height / 140).toFixed(2);
		      ctx.font = `bold ${fontSize}em sans-serif`;
		      ctx.textBaseline = 'middle';

		      const text = totalEmpleados;
		      const textX = Math.round((width - ctx.measureText(text).width) / 2);
		      const textY = height*0.43;

		      ctx.fillText(text, textX, textY);
		      ctx.save();
		    }
		  }]
		});

    })

    //ASISTENCIA % EMPLEADOS_QUE_MARCARON/EMPLEADOS_ESPERADOS =>  EMPLEADOS_ESPERADOS = CANTIDAD_EMPLEADOS-EMPLEADOS_VACACIONES-EMPLEADOS_INCAPACITADOS-DIAS_LIBRES 
    getDatos_async('',478,'2,@@impresa,0,0').then((rs)=>{
    	$("#kpis_asis_porcentaje").html(rs[0][0][0])
    })

    getDatos_async('',478,'4,@@impresa,0,0',1).then((rs)=>{
	    let d = rs[0][0];
	    $('#kpi_vacaciones').text(d.vacaciones);

	    let alertas = parseInt(d.marcas) + parseInt(d.incapacidades) + parseInt(d.vac_criticas);
	    $('#kpi_alertas').text(alertas);

	    $('#a_marcas').text(d.marcas);
	    $('#a_incap').text(d.incapacidades);
	    $('#a_vac').text(d.vac_criticas);
	});

	getDatos_async('',478,'5,@@impresa,0,0',1).then((rs)=>{

	    let labels = [];
	    let trabajadas = [];
	    let tardias = [];
	    let ausencias = [];
	    let vacaciones = [];
	    let incapacidades = [];

	    rs[0].forEach(r=>{
	        labels.push(r.dia);
	        trabajadas.push(r.trabajadas);
	        tardias.push(r.tardias);
	        ausencias.push(r.ausencias);
	        vacaciones.push(r.vacaciones);
	        incapacidades.push(r.incapacidades);
	    });

	    new Chart(document.getElementById('chart_asistencia'), {
		    type: 'bar',
		    data: {
		        labels: labels,
		        datasets: [
		            {
		                label: 'Trabajadas',
		                data: trabajadas,
		                backgroundColor: '#66bb6a' // verde
		            },
		            {
		                label: 'Tardías',
		                data: tardias,
		                backgroundColor: '#ffa726' // naranja
		            },
		            {
		                label: 'Ausencias',
		                data: ausencias,
		                backgroundColor: '#ef5350' // rojo
		            },
		            {
		                label: 'Vacaciones',
		                data: vacaciones,
		                backgroundColor: '#42a5f5' // azul
		            },
		            {
		                label: 'Incapacidades',
		                data: incapacidades,
		                backgroundColor: '#ab47bc' // morado
		            }
		        ]
		    },
		    options: {
		        responsive: true,
		        scales: {
		            x: { stacked: true },
		            y: { stacked: true }
		        },
		        plugins: {
		            legend: {
		                position: 'bottom'
		            }
		        }
		    }
		});

	});

	getDatos_async('',478,'6,@@impresa,0,0',1).then((rs)=>{
	    let d = rs[0][0];
	    $('#kpi_costo').text(parseFloat(d.costo_real).formatMoney(2,'.',','));

	    let eficiencia = parseFloat(d.eficiencia);

		let color = 'red lighten-4';
		if (eficiencia >= 90) color = 'green lighten-4';
		else if (eficiencia >= 75) color = 'amber lighten-4';

		$('#kpi_eficiencia').closest('.card-panel').removeClass().addClass('card-panel center ' + color);
		$('#kpi_eficiencia').text(d.eficiencia + '%');
	});

	//FIN KPIS

	let deducciones_ley = getDatos('id,base,valor',424)[0];
	let array_deducciones = {}
	$.each(deducciones_ley,function(i,e){
		array_deducciones[i] = {
			id 		: 	e[0],
			base 	: 	e[1],
			valor 	: 	e[2],
		}
	})
	$("#doplanilla").data('ley',{deducciones:array_deducciones})

    let marcas_sin_salida = getDatos('count(id)',448,'idmarca=-1')[0]
    if(marcas_sin_salida.length){
    	marcas_sin_salida = marcas_sin_salida[0][0]
    	$("#marcas_sin_salida").html(marcas_sin_salida)
    	if(marcas_sin_salida == '0')
	    	$("#marcas_sin_salida").parent().css('background-color','lightblue')
	    else
	    	$("#marcas_sin_salida").parent().css('background-color','#FF5756')
    }

    let ajustes = getDatos('day(desde_quincena),day(hasta_quincena),upper(date_format(corte_quincenal,"%W %d de %M, %Y")) as hasta,weekofyear(concat(date_format(curdate(),"%Y-%m-"),desde_quincena)) as sem_inicio,weekofyear(concat(date_format(curdate(),"%Y-%m-"),hasta_quincena)) as sem_final,desde_quincena,hasta_quincena,creloj,corte_quincenal,desde_semanal,hasta_semanal,upper(date_format(corte_semanal,"%W %d de %M, %Y")) as hasta_semana,corte_semanal',446,'idsucursal=@@impresa')[0][0]

    if(ajustes[2] != ''){
    	$("#dquin").removeClass('hide')
    	$("#dquin").html(ajustes[2])
    }

    if(ajustes[11] != ''){
    	$("#dsem").removeClass('hide')
    	$("#dsem").html(ajustes[11])
    }

    $("#doplanilla").data('valores',{ 
    	1 : { desde: ajustes[9], hasta: ajustes[10], corte: ajustes[12]},
    	2 : { desde: ajustes[5], hasta: ajustes[6],  corte: ajustes[8]},
    	creloj:ajustes[7]})

	$("#usr_name").focus()

	$('.usr_name').keydown(function(e){
	    var charCode = e.which || e.keyCode;
	    var charStr     = String.fromCharCode(charCode);
	    let _elemt = $(this);
	    $(this).attr('vid',0)

	    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
	        $(".autocomplete-content").remove();
	        
	        $(this).autocomplete({
	            limit: 20,
	            data: getNAutocomplete('id,concat(nombre," ",cedula) as nom,null',413,'idsucursal = @@impresa and id > 0 having nom like "%'+_elemt.val()+'%" limit 20'),
	            onAutocomplete: function(e){
	                _elemt.attr('vid',$(this).attr('vid'))
	            }
	        })

	        $(".autocomplete-content").css('width','90%');
	    }
	})

	$(".det_libres").click(function(){
		if(!$("#hor_getMarca option").length){
			let marcas = getDatos('id,label',450,'!idtipo and idsucursal = @@impresa and issecundario')[0]
			if(marcas.length){
				let str_salida = ''
				$.each(marcas,function(i,e){
					str_salida += '<option value="'+e[0]+'">'+e[1]+'</option>'
				})
				$("#hor_getMarca").html(str_salida).material_select('update')
			}
		}

		$("#modal-marcas").modal('open')
	})

	$("#hor_setMarca").click(function(){
		let vid = $("#hor_getMarca option:selected").val()
		if(vid != '0')
			if(!$("#listaMarcas tr[vid="+vid+"]").length)
				$("#listaMarcas").append('<tr vid="'+vid+'"> <td>'+$("#hor_getMarca option:selected").html()+'</td> <td> <input type="time" class="hor_lib_in eder"/> </td>  <td> <input type="time" class="hor_lib_out eder"/> </td> <td> <label style="cursor:pointer"> <input type="checkbox" class="hor_lib_mon"  style="position: static; opacity:1;"> </label> </td> <td> <label style="cursor:pointer"> <input type="checkbox" class="hor_lib_tue" style="position: static;opacity:1;"> </label> </td> <td> <label style="cursor:pointer"> <input type="checkbox" class="hor_lib_wed" style="position: static; opacity:1;"> </label> </td> <td> <label style="cursor:pointer"> <input type="checkbox" class="hor_lib_thu" style="position: static; opacity:1;"> </label> </td> <td> <label style="cursor:pointer"> <input type="checkbox" class="hor_lib_fri" style="position: static; opacity:1;"> </label> </td> <td> <label style="cursor:pointer"> <input type="checkbox" class="hor_lib_sat" style="position: static; opacity:1;"> </label> </td> <td> <label style="cursor:pointer"> <input type="checkbox" class="hor_lib_dom" style="position: static; opacity:1;"> </label> </td> </tr>')
	})

	$("[name=tipopago]").change(function(){
		$("#t_esalario").blur()
	})

	$("#t_esalario").keyup(function(e){
		let code = e.wich || e.keyCode
		if(code == 13)
			$(this).blur()
	})

	$("#t_esalario").blur(function(){
		let valor = parseFloat($(this).val().replace(/,/g,''))
		let tipo = $("[name=tipopago]:checked").attr('vid')
		switch(tipo){
		case '1':
			valor = valor/48
			break
		case '2':
			valor = valor/120
			break;
		default:
			valor = valor/parseFloat($("#t_edxm").val())/parseFloat($("#t_ehxdia").val())
			break
		}
		$("#t_valxhora").val(valor.formatMoney(2,'.',','))
	})

	$("#t_valxhora").keyup(function(e){
		let code = e.wich || e.keyCode
		if(code == 13)
			$(this).blur()
	})

	$("#t_valxhora").blur(function(){
		let valor = parseFloat($(this).val().replace(/,/g,''))
		let tipo = $("[name=tipopago]:checked").attr('vid')
		switch(tipo){
		case '1':
			valor = valor*48
			break
		case '2':
			valor = valor*120
			break;
		default:
			valor = valor*parseFloat($("#t_edxm").val())*parseFloat($("#t_ehxdia").val())
			break
		}
		$("#t_esalario").val(valor.formatMoney(2,'.',','))
	})

	$(".mn2").click(function(){ //MENU_GENERAL
		var num = $(this).attr('num')
		$(".sectbase").addClass('hide')
		$(".mn2").removeClass('active')

		switch(num){
		case "5":
			cargarMarcasEmpleado();

			$("[name='_tipoMarca']").click(function(){
				cargarMarcasEmpleado();
			})

			$("#edit_marca_acept").click(function(){
				let idlinea 	= '';
				let idtipo 		= '';
				let hentrada	= '';
				let hsalida 	= '';
				let idnew		= 0;
				let idempleado 	= $("#edit_marca_empleado").attr('vid');
				let _fecha 		= $("#edit_marca_empleado").attr('vfecha');
				let comentario	= $("#edit_marca_comentario").val()

				$.each($(".marca_edit:visible").find('tr'),function(){ 
					//VALIDAR
					hentrada = $(this).find('.editentradas').val()
					hsalida  = $(this).find('.editsalidas').val()

					if(parseInt(hentrada.replace(/:/g,'')) >= parseInt(hsalida.replace(/:/g,''))){
						Materialize.toast('La Salida debe ser Mayor que la Entrada',4000,'red')
						$(this).find('.editsalidas').focus().select()
						return false;
					}

					if(hentrada == '')
						return false

					idtipo = $(this).parent().attr('tipo')
					idlinea = parseInt($(this).attr('vid'))
					if(idlinea == 0){
						idnew = insertar(448,'idsucursal,idempleado,idtipo,fecha,entrada,salida,idusuario','@@impresa,'+idempleado+','+idtipo+',"'+_fecha+'","'+hentrada+'","'+hsalida+'",@@usr')[0][0][0]
						$(this).attr('vid',idlinea)
						$(this).find('.delete_marca').removeClass('hide')
					}
					else if(idlinea > 0)
						console.log(actualizar(448,'entrada="'+hentrada+'",salida="'+hsalida+'"','id='+idlinea))
					else
						console.log(actualizar(448,'idempleado=idempleado*-1','id='+idlinea))
				})

				Materialize.toast('Marcas Actualizadas Correctamente',4000,'green')
				cargarMarcasEmpleado()
			})
			break;
		case "1":
			fillSel("s_ehor",'id,nombre',414,'id>0 and idsucursal=@@impresa')
			cargarEmpleados();

			if($(".mn2[num=1]").attr('loaded') == undefined){

				$('#btn_add_regla').click(function(){
				  const tiposMarca = {
				   1: 'Trabajo',
				   5: 'Almuerzo',
				   3: 'Café'
				  };

				  let fila = `
				    <tr>

				      <td>
				        <select class="dia browser-default">
				          <option value="1">Dom</option>
				          <option value="2">Lun</option>
				          <option value="3">Mar</option>
				          <option value="4">Mie</option>
				          <option value="5">Jue</option>
				          <option value="6">Vie</option>
				          <option value="7">Sab</option>
				        </select>
				      </td>

				      <td>
				        <select class="tipo browser-default">
				          ${Object.entries(tiposMarca).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}
				        </select>
				      </td>

				      <td class="center">
				        <label>
				          <input type="checkbox" class="trabaja" checked />
				          <span></span>
				        </label>
				      </td>

				      <td>
				        <input type="time" class="entrada browser-default">
				      </td>

				      <td>
				        <input type="time" class="salida browser-default">
				      </td>

				      <td>
				        <a class="btn-flat red-text btn_delete">✖</a>
				      </td>

				    </tr>
				  `;

				  $('#rotacion_detalle').append(fila);

				});

				$(document).on('change','.trabaja',function(){

				  let fila = $(this).closest('tr');
				  let activo = $(this).prop('checked');

				  fila.find('.entrada, .salida').prop('disabled', !activo);

				});

				$(document).on('click','.btn_delete',function(){
				  $(this).closest('tr').remove();
				});

				$(document).on('change', '#he_rotacion', function(){

				  let val = $(this).val();

				  if(val === "0"){
				    // 👉 crear nueva
				    $('#panel_rotacion').removeClass('hide');

				    // limpiar
				    $('#rot_nombre').val('');
				    $('#rot_ciclo').val(2);
				    $('#rot_semana_inicio').val('');

				    $('#rotacion_detalle').html('');

				    Materialize.updateTextFields();

				  }else{
				    $('#panel_rotacion').addClass('hide');

				    if(val){
				      cargarRotaciones(val);
				    }
				  }

				});

				$('#save_horario_empleado').click(function(){

				  let errores = [];
				  let cambios = [];
				  let idempleado = $("#modal-horario-empleado").attr('idempleado')

				  $('#horario_x_empleado .hora-edit').each(function(){

				    let cont = $(this);

				    let inputIn = cont.find('.hora-in');
				    let inputOut = cont.find('.hora-out');

				    let valIn = inputIn.val() || '';
				    let valOut = inputOut.val() || '';

				    let origIn = inputIn.data('orig') || '';
				    let origOut = inputOut.data('orig') || '';
				    
				    let vid 	= cont.data('vid') || 0;
				    let vfecha 	= cont.data('fecha') || '';
				    // =========================
				    // 🔴 VALIDACIONES
				    // =========================

				    if(valIn && !valOut){
				      errores.push('Salida vacía con entrada definida');
				      inputOut.focus()
				      return;
				    }

				    if(valIn && valOut && valOut <= valIn){
				      errores.push(`Salida menor que entrada (${valIn} - ${valOut})`);
				      return;
				    }

				    // =========================
				    // 🟡 DETECTAR CAMBIOS
				    // =========================

				    if(valIn !== origIn || valOut !== origOut){

				      let td = cont.closest('td');

				      cambios.push({
				        id: vid,
				        dia: td.data('dia'),
				        fecha: vfecha,
				        tipo: td.data('tipo'),
				        entrada: valIn,
				        salida: valOut,
				        origIn,
				        origOut
				      });

				    }

				  });

				  // =========================
				  // 🔴 MOSTRAR ERRORES
				  // =========================

				  if(errores.length > 0){
				    Materialize.toast(errores[0],4000,'red');
				    return;
				  }

				  // =========================
				  // 🟢 PROCESAR CAMBIOS
				  // =========================

				  if(cambios.length === 0){
				    Materialize.toast('Sin cambios',4000,'green');
				    return;
				  }

				  $.each(cambios,(i,e)=>{
				  	console.log(e)
				  	actualizar(452,'idestado=3',`id=${e['id']} and idestado=2`)
				  	insertar(498,'idempleado,dia,fecha,entrada,salida,tipo,fuente,idestado',`${idempleado},"${e['dia']}","${e['fecha']}","${e['entrada']}","${e['salida']}",${e['tipo']},"MANUAL",2`)
				  });
				  Materialize.toast('Horario Guardado Correctamente',4000,'green');
				  // 👉 aquí llamas tu SP
				  // getDatos_async('', XXX, JSON.stringify(cambios))

				});

				$('.modo').click(function(){
				  let modo = $(this).data('modo');

				  $('.modo').removeClass('active');
				  $(this).addClass('active');

				  $('.seccion').addClass('hide');
				  $('#sec_' + modo).removeClass('hide');
				});

				$(".mn2[num=1]").attr('loaded',1)

				async function cargarRotaciones(){
				  let rs = await getDatos_async('id, nombre', 495, 'id > 0 and idsucursal = @@impresa',1); // SP rotaciones

				  let html = '<option value="">Sin rotación</option>';
				  html += '<option value="0">➕ Crear Rotación</option>';

				  rs[0].forEach(r=>{
				    html += `<option value="${r.id}">${r.nombre}</option>`;
				  });

				  $('#he_rotacion').html(html);
				  $('select').formSelect();
				}

				async function cargarDetalleRotacion(id){

				  let rs = await getDatos_async('', 496, id);

				  $('#rot_ciclo').val(rs.ciclo);
				  cargarRotaciones();

				  rs.detalle.forEach(d=>{
				    $(`.rot_chk[data-semana="${d.semana_ciclo}"][data-dia="${d.dia}"]`)
				      .prop('checked', d.trabaja == 1);
				  });

				}		

				$('#btn_guardar_rotacion').click(function(){

				  let rotacion = {
				    nombre: $('#rot_nombre').val(),
				    ciclo: $('#rot_ciclo').val(),
				    semana_inicio: $('#rot_semana_inicio').val(),
				    reglas: []
				  };

				  $('#rotacion_detalle tr').each(function(){

				    let fila = $(this);

				    let regla = {
				      dia: fila.find('.dia').val(),
				      tipo: fila.find('.tipo').val(),
				      trabaja: fila.find('.trabaja').prop('checked') ? 1 : 0,
				      entrada: fila.find('.entrada').val(),
				      salida: fila.find('.salida').val()
				    };

				    rotacion.reglas.push(regla);

				  });

				  console.log(rotacion);

				  // 👉 enviar a SP
				  // getDatos_async('', XXX, JSON.stringify(rotacion));

				});

				$('#btn_asignar_rotacion').click(async function(){

				  let idrot = $('#he_rotacion').val();
				  let idemp = $('#modal-horario-empleado').data('idempleado');

				  if(!idrot) return;

				  //await getDatos_async('', 503, `${idemp},${idrot}`);
				  insertar(497,'idrotacion,idempleado',idrot+','+idemp)

				  Materialize.toast({html:'Rotación asignada'});
				});

				async function cargarEventos(idempleado){

				  let rs = await getDatos_async('', 504, idempleado);

				  let html = '';

				  rs[0].forEach(e=>{
				    html += `
				      <li class="collection-item">
				        ${e.fecha} → ${e.entrada} - ${e.salida}
				      </li>`;
				  });

				  $('#lista_eventos').html(html);
				}
			}
			
			break;
		case "3":
			cargarPlanilla()
			/* $("#doplanilla").data('valores',{ 
    	1 : { desde: ajustes[9], hasta: ajustes[10], corte: ajustes[12]},
    	2 : { desde: ajustes[5], hasta: ajustes[6],  corte: ajustes[8]},
    	creloj:ajustes[7]})*/

			$("#doplanilla").click(function(e){
				e.preventDefault()
				$(this).attr('disabled',true)
				var $toastContent = $('<span style="width: 500px" id="vplanilla">Generando Planilla:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
        		Materialize.toast($toastContent);

        		ciclos_planilla()
				$(this).attr('disabled',false)
			})

			$("#saveDiasLaborados").click(function(){
				console.log(123)
				if($(".editTime").length){
					$.each($(".editTime"),function(i,e){  
						if($(this).attr('tp') == 0){ 
							console.log(actualizar(448,'entrada="'+$(this).find('.editentradas').val()+'",salida="'+$(this).next('tr').find('.editsalidas').val()+'",comentario="'+$("#vcomentario").val()+'"','id='+$(this).attr('vid')) )
						} 
					})

					//$(".diaslaborados[vid="+$("#modal-diaslaborados").attr('vid')+"]").click()

					$("#marcas_empleado").addClass('hide')
					$("#vcomentario").val('')

					Materialize.toast('Marcas Editadas Correctamente',4000,'green')
					setTimeout(function(){
						cargarPlanilla()
					;},1000);
				}
				//console.log(actualizar(448,'entrada="'+hentrada+'",salida="'+hsalida+'"','id='+idlinea))
			})

			break;
		case "4":
			//VACACIONES
			core_grid_init('gridVacaciones')
			break;
		case "7":
			//INCAPACIDADES
			core_grid_init('gridIncapacidades')
			break;
		case "8":
			//OTRAS DEDUCCIONES
			break;
		default:
			break;
		}

		$("#sect"+num).removeClass('hide')

		$(this).addClass('active')
	});

	$("#submenu .collection-item").click(function(){
		var num = $(this).attr('num')
		$(".coldiv").addClass('hide')
		$(".collection-item").removeClass('active')
		$("#cldiv"+num).removeClass('hide')
		$(this).addClass('active')
		switch(num){
			case '1':
				$("#t_adpt").focus();
				cargarOrganigrama();
				break;
			case '2':
				cargarDeptSel('pseldept');
				$("#pseldept").val(0).change()
				break;
			case '3':
				cargarCantHorarios()
				break;
			case '4':
				cargarDeducciones();
				break;
			case '6':
				cargarFeriados();
				break;
			default:
				break;
		}
	});

	$("#mnt-empleado").click(function(){
		
		let fecha = new Date();
        let fechastr = fecha.getFullYear()+'-'+(fecha.getMonth()+1).toString().padStart(2,'0')+'-'+(fecha.getDate()).toString().padStart(2,'0');
		//$("#t_efe").pickadate().pickadate('picker').set('select', fechastr)
		$("#t_efe").val(fechastr)
		let hora =  fecha.getHours().toString().padStart(2,'0')+':'+fecha.getMinutes().toString().padStart(2,'0')+':'+fecha.getSeconds().toString().padStart(2,'0')
		$("#t_edat").val(hora)
		$("#t_eiduser").attr('vid',0)
		$("#s_epuesto").attr('vid',0)

		$("#metit").html('Agregar Empleado')

		$("#t_eced").val('')
		$("#t_eiduser").val('')
		$("#t_enom").val('')
		$("#t_evacas").val(12)
		$("#t_ehoras").val(0)
		$("#t_edxm").val(0)
		$("#t_ehxdia").val(0)
		$("#t_esalario").val('')
		$("#t_valxhora").val(0)
		$("#s_ehor").val(0).material_select('update')
		$("#s_epuesto").val('')
		$("#s_epuesto").attr('vid',0)
		$("#t_efe").val('')
		$("#t_edat").val('')

		$("#modal-empleado").modal('open')
		$("#modal-empleado").css('max-height','none')
		$("#modal-empleado").css('height','95vh')
		$("#b_aempleado").attr('save',0)
		$("#b_aempleado").attr('vid',0)
	});

	$("#s_ehor").change(function(e){
		let idhorario = $('option:selected',this).val()
		if(idhorario != '0'){
			let horario_values = getDatos('thoras',414,'id='+idhorario)[0][0];
			$("#e_ajust_h").removeClass('hide')
			$("#e_ajust_h").attr('vid',idhorario)
			$("#t_ehoras").val(horario_values[0])
		}else{
			$("#e_ajust_h").addClass('hide')
			$("#e_ajust_h").attr('vid',0)
			$("#t_ehoras").val(0)
		}
	})

	$("#rfh").click(function(){
		$("#t_efe").val('')
		$("#t_edat").val('')
	})

	$("#b_aempleado").click(function(){
		let ced = validarById('t_eced',1,20);
		if(!ced) return false;

		let nom = validarById('t_enom',1,250);
		if(!nom) return false;

		let hxs = validarById('t_ehoras',1,11);
		if(!hxs) return false;

		let salario = validarById('t_esalario',1,20);
		if(!salario) return false;

		let correo = $("#t_email").val()
		if(correo.length)
			if(!validarCorreo(correo))
				return false;

		let finic = $("#t_efe").val() == '' ? '' : $("#t_efe").val()+' '+$("#t_edat").val() 

		if($("#b_aempleado").attr('save') == '0'){
			let idempleado = insertar(413,'','null,"'+nom+'","'+ced+'",@@usr,@@impresa,"'+finic+'",'+$("#tipoPuesto option:selected").val()+','+$("#t_diastemp").val()+','+$("#t_eiduser").attr('vid')+','+$("[name=tipopago]:checked").attr('vid')+',"",0,"'+correo)[0][0][0]

			let det = insertar(416,'','null,'+idempleado+','+$("#s_ehor option:selected").val()+','+$("#s_epuesto").attr('vid')+','+$("#t_esalario").val().replace(/,/g,'')+','+$("#t_ehoras").val().replace(/,/g,'')+','+$("#t_evacas").val().replace(/,/g,'')+',0,'+$("#t_edxm").val().replace(/,/g,'')+','+$("#t_ehxdia").val().replace(/,/g,''))

			if(det.succed){
				cargarEmpleados()
				Materialize.toast('Empleado Ingresado Correctamente',4000,'green')
				$("#modal-empleado").modal('close')
			}
			else{
				Materialize.toast('Error Ingresando',4000,'red')
				console.log(idempleado,det)

			}
		}else{
			actualizar(413,'cedula="'+$("#t_eced").val()+'",finicio="'+finic+'",iduser='+$("#t_eiduser").attr('vid')+',tipopago='+$("[name=tipopago]:checked").attr('vid'),'id='+$("#b_aempleado").attr('vid'))
			actualizar(416,'idhorario='+$("#s_ehor option:selected").val()+',idpuesto='+$("#s_epuesto").attr('vid')+',salario='+$("#t_esalario").val().replace(/,/g,'')+',thoras='+$("#t_ehoras").val().replace(/,/g,'')+',vacaciones='+$("#t_evacas").val().replace(/,/g,'')+',diasxmes='+$("#t_edxm").val().replace(/,/g,'')+',horasxdia='+$("#t_ehxdia").val().replace(/,/g,''),'idempleado='+$("#b_aempleado").attr('vid'))
			cargarEmpleados()
				Materialize.toast('Empleado Actualizado Correctamente',4000,'green')
				
		}
		
	})

	$("#s_epuesto").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)
       
        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            $(".autocomplete-content").remove();
            
            $("#s_epuesto").autocomplete({
                limit: 20,
                data: getNAutocomplete('id,concat(nombre,ifnull((select concat(" ,",nombre) from departamentos where id = puestos.iddept),"")) as nom,null',415,'idsucursal = @@impresa and id > 0 having nom like "%'+busqueda+'%" limit 20'),
                onAutocomplete: function(e){
                	$("#s_epuesto").attr('vid',$(this).attr('vid'))
                	let valpst = getDatos('salario,idmoneda',415,'id='+$(this).attr('vid'))[0][0]
                	let valor = parseFloat(valpst[0])
                	$("#t_esalario").val(valor.formatMoney(2,'.',','));
                	let tipo = $("[name=tipopago]:checked").attr('vid')
					switch(tipo){
					case '1':
						valor = valor/48
						break
					case '2':
						valor = valor/120
						break;
					default:
						valor = valor/parseFloat($("#t_edxm").val())/parseFloat($("#t_ehxdia").val())
						break
					}
					$("#t_valxhora").val(valor.formatMoney(2,'.',','))
	                Materialize.updateTextFields()
                }
            })

            $(".autocomplete-content").css('width','50%');
        }
    });

	$("#t_eced").keyup(function(e){
		var code = e.wich || e.keyCode;
		if(code == 13){
			let cedula = $(this).val().trim().replace(/,/g,'')
		    $.get('https://api.hacienda.go.cr/fe/ae?identificacion='+cedula)
		        .done(function(data){
		            $("#t_eced").val(cedula);
	                $("#t_enom").val(data.nombre);
	                let usuario = getDatos('id,concat(nombre,", ",cedula)',1,'cedula = "'+cedula+'" and id not in(select idusuario from empleados where idsucursal = @@impresa and id > 0)')
	                if(usuario[0].length){
	                	$("#t_eiduser").val(usuario[0][0][1])
	                	$("#t_eiduser").attr('vid',usuario[0][0][1])
	                }
	                Materialize.updateTextFields()
		        })
		        .fail(function(){ Materialize.toast('Cédula no Existente',4000,'red'); });
		}
	});

	$("#b_adpt").click(function(){
		let dept = validarById('t_adpt',1,64);
		if(!dept) return false;
		
		let ins = insertar(422,'','null,"'+dept+'",'+$("#t_sdpt").attr('vid')+',@@impresa');
	
		if(ins['succed'] == 1){
			vaciar('departamentos')
			cargarOrganigrama();
		}else
			Materialize.toast(ins[0]['ERROR'],4000,'red')
	});

	$(".nav-horarios").sideNav();
	$(".nav-horarios").click(function(){
		//let istemp = 
		cargarHorarios($(this).attr('vid'),$(this).attr('idempleado'),$(this).attr('fecha'));
	})

	$("#t_eiduser").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)
       
        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            $(".autocomplete-content").remove();
            $("#t_eiduser").attr('vid',0)
            
            $("#t_eiduser").autocomplete({
                limit: 20,
                data: getNAutocomplete('id,concat(nombre,", ",cedula) as nom,null',1,'idsucursal = @@impresa and id > 0 having nom like "%'+busqueda+'%" and id not in(select idusuario from empleados where idsucursal = @@impresa) limit 20'),
                onAutocomplete: function(e){
                	$("#t_eiduser").attr('vid',$(this).attr('vid'))
                	let valusr = getDatos('nombre,cedula',1,'id='+$(this).attr('vid'))[0][0]
                	if(!$("#t_eced").val().trim().length)
                		$("#t_eced").val(valusr[1]);
                	if(!$("#t_enom").val().trim().length)
	                	$("#t_enom").val(valusr[0]);
	                Materialize.updateTextFields()
                }
            })

            $(".autocomplete-content").css('width','50%');
        }
    });

    /*$("#de_valor").keyup(function(e){
    	let code = e.wich || e.keyCode
    	if(code==13){
    		$("#de_add").focus()
    	}
    })*/

    $("#de_add").click(function(){
    	$("#de_lista").prepend('<div class="row _deline" accion="1" vid="0"> <div class="col s6 de_descr">'+$("#de_name").val()+'</div> <div class="col s4 de_monto">'+$("#de_valor").val()+'</div> <div class="col s2"> <i class="mdi mdi-minus red-text de_delline"></i> </div> </div>')

    	$("#de_name").val('').focus()
    	$("#de_valor").val('')
    })

    $("#saveDeduc").click(function(){
    	$.each($("._deline[accion=1]"),function(){ 
    		console.log(insertar(442,'','null,'+$("#modal-deducciones").attr('vid')+',"'+$(this).find('.de_descr').html()+'",'+$(this).find('.de_monto').html().replace(/,/g,'')+',1,now(),'+$("#de_saldo").val().replace(/,/g,'')+','+$("#de_inicial").val().replace(/,/g,''))) 
    	})
    	
    	Materialize.toast('Deducciones Guardas Correctamente',4000,'green')
    	setTimeout(function(){
    		$(".mn2[num=3]").click()
		;},1000);
    })

	$("#t_sdpt").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)
       
        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            $(".autocomplete-content").remove();
            
            $("#t_sdpt").autocomplete({
                limit: 20,
                data: getNAutocomplete('id,nombre,null',422,'nombre like "%'+busqueda+'%" and idsucursal = @@impresa limit 20'),
                onAutocomplete: function(e){
                	$("#t_sdpt").attr('vid',$(this).attr('vid'))
                }
            })

            $(".autocomplete-content").css('width','50%');
        }
    });

	$("#t_spst").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)
       
        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            let dep = $("#pseldept option:selected").val()
			dep = dep == undefined ? 0 : dep
            $(".autocomplete-content").remove();
            
            $("#t_spst").autocomplete({
                limit: 20,
                data: getNAutocomplete('id,nombre,null',415,'nombre like "%'+busqueda+'%" and idsucursal = @@impresa and iddept = '+dep+' limit 20'),
                onAutocomplete: function(e){
                	$("#t_spst").attr('vid',$(this).attr('vid'))
                }
            })

            $(".autocomplete-content").css('width','50%');
        }
    });

    $("#pseldept").change(function(){
    	cargarPuestos();
    	$("#t_adpst").focus()
    })

    $("#b_adpst").click(function(){
    	let puest = validarById('t_adpst',1,32);
		if(!puest) return false;

		let isneto = $("#aplicarDeducciones").is(":checked") ? 1 : 0
		let salario = $("#t_salary").val().replace(/,/g,'');

		let dep = $("#pseldept option:selected").val()
		dep = dep == undefined ? 0 : dep

		let ins = insertar(415,'','null,"'+puest+'",if('+isneto+','+salario+',f_getdeducciones('+salario+',@@impresa,1)),'+$("#t_spst").attr('vid')+',@@impresa,'+dep+','+$("#s_mpst option:selected").val());
	
		if(ins['succed'] == 1){
			vaciar('puestos')
			$("#t_adpst").focus()
			cargarPuestos();
		}else
			Materialize.toast(ins[0]['ERROR'],4000,'red')

    });

    $("#b_adec").click(function(){
    	let dname = validarById('t_adec',1,64);
		if(!dname) return false;

		let valor = validarById('t_adv',1,32);
		if(!valor) return false;

		let sobrede = $("#s_dedsobre option:selected").val()
		let tipoded = $("#s_dedtipo option:selected").val()

		let ins = insertar(424,'','null,@@impresa,"'+dname+'",'+valor.replace(/,/g,'')+','+tipoded+','+sobrede)

		if(ins['succed'] == 1){
			Materialize.toast('Deducción Registrada Correctamente',4000,'green')
			vaciar('deducciones')
			cargarDeducciones()
		}else
			Materialize.toast(ins[0]['ERROR'],4000,'red')
    })

    $("#searchMarcas").click(function(){
    	cargarMarcasEmpleado()
    })

    $("#b_adhor").click(function(){
    	let hname = validarById('t_nhor',1,32);
		if(!hname) return false;

		let horas_tot = parseFloat($("#t_thhor").val().replace(/,/,''))
		if(!horas_tot){
			Materialize.toast('Cantidad de Horas deben ser mayores a Cero',4000,'red')
			return false
		}

		let ins = insertar(414,'','null,"'+hname+'",'+$("[name=thorario]:checked").attr('vl')+',@@impresa,'+horas_tot+','+$("[name=tjornada]:checked").attr('vid')+',1');

		if(ins['succed'] == 1){
			let entrada;
			let salida;

			$.each($(".semana"),function(){
				entrada = $(this).find('.entrada').val() == '' ? 'null' : '"'+$(this).find('.entrada').val()+'"'
				entrada = $(this).find('.salida').val() == '' ? 'null' : '"'+$(this).find('.salida').val()+'"'
				insertar(452,'idhorario,dia,entrada,salida,almuerzo',ins[0][0][0]+','+$(this).attr('vid')+','+entrada+','+salida+','+$(this).find('.almuerzo_horas').val()+',0,null')	
			})

			Materialize.toast('Horario Registrado Correctamente',4000,'green')
			vaciar('horarios')
			cargarCantHorarios()
		}else
			Materialize.toast(ins[0]['ERROR'],4000,'red')
    });

    let monedas = getDatos('id,concat(simbolo," ",nombre)',54,'id>0')
    let strmonedas = '';
    for (var i = 0; i < monedas[0].length; i++) {
    	strmonedas += '<option value="'+monedas[0][i][0]+'">'+monedas[0][i][1]+'</option>';
    }
    $(".moneda").html(strmonedas);
    $(".mn2[num=0]").click()
	//loadmybussiness();

});

function getHorasStyle(entradas,salidas){
	let earr = []
	let sarr = []
	let vstring = ''
	entradas =  entradas.reverse()
	salidas  =  salidas.reverse()

	$.each(entradas,function(i,e){
		vstring += entradas[i]+' - '+salidas[i]+'<br>'
	})

	return vstring;
}

async function ciclos_planilla(){
	$.each($('.linea_planilla'),function(){
		let idplanilla = insertar(420,'','null,'+$(this).attr('vid')+','+$(this).find('._bruto').html().replace(/,/g,'')+','+$(this).find('._neto').html().replace(/,/g,'')+',1,1,@@impresa,"'+$("#doplanilla").data('valores')[2]['desde']+'","'+$("#doplanilla").data('valores')[2]['hasta']+'",'+$(this).find('.hora').val()+','+$(this).find('.hextra').val()+',now(),'+$(this).find('._vacaciones').html()+',0,'+$(this).find('._incapacidades').attr('vpago')+',0,0')
		if(idplanilla.succed){
			insertar(421,'','null,'+idplanilla[0][0][0]+',1,'+$("#ded_val").html()+',"","CCSS",'+$(this).find('.dley').html().replace(/,/g,'')+',0,0,0')
			//CARGAR OTRAS DEDUCCIONES
			let planilla_odecc = getDatos('nombre,valor,id',442,'idempleado='+$(this).attr('vid')+' and fecha >= "'+$("#doplanilla").data('valores')[2]['desde']+'" and fecha < date_add("'+$("#doplanilla").data('valores')[2]['hasta']+'",interval 1 day)')

			$.each(planilla_odecc[0],function(i,e){
				console.log(insertar(421,'','null,'+idplanilla[0][0][0]+',0,0,"","'+e[0]+'",'+e[1]+',0,0,'+e[2]))
			})

		 	/*$.each($(this).data('detalle_planilla'),function(i,e){
		 		switch(e['tipo']){
		 			case 'carga_social':
		 				insertar(421,'','null,'+idplanilla[0][0][0]+','+e['idcargasocial']+','+e['valor']+',"","'+e['deduccion']+'",'+e['valor_deduccion']+',0,0,0')
		 				break;
		 		}
		 		//insertar(421,'','null,'+idplanilla[0][0][0]+','+e['idcargasocial']+','+e['valor']+',"","'+e['deduccion']+'",'+e['valor_deduccion']+','+e['idvacacion']+','+e['idincapacidad']+','+e['iddeduccion'])

		 	})*/
			let info = mantenimiento('login',8,{arch:'colilla',id:idplanilla[0][0][0],tit:'Colilla de Pago',sel:'',tbl:436,where:idplanilla[0][0][0]},1);
			/*gerencia@acerosgriegos.cr*/
		 	enviarCorreo(3,'gerencia@acerosgriegos.cr','Colilla de Pago '+info['empleado']+' '+info['fecha'],'Se Adjunta la colilla de pago','pdf/COLILLA '+info['empleado']+' '+info['consecutivo']+'.pdf' ,0,idplanilla[0][0][0],0,undefined,1);
		 	
		}else{
			console.log(idplanilla)
			Materialize.toast('No se Pudo Generar la Planilla',4000,'red')
			$("#vplanilla").parent().remove()
		}
	})

	Materialize.toast('Planilla Realizada Correctamente',4000,'green')
	$("#vplanilla").parent().remove()
}

function cargarMarcasEmpleado(){

	let vidempleado = $("#usr_name").attr('vid')
	let tipo_marca = $("[name='_tipoMarca']:checked").attr('vid')

	let _marcas = getDatos('',459,'@@impresa,'+vidempleado+',"'+$("#marca_desde").val()+'","'+$("#marca_hasta").val()+'",'+tipo_marca)
	if(!_marcas[0].length)
		return false

	let str_salida =''

	switch(tipo_marca){
	case '1':
		let _cafe = ''
		let _almuerzo = ''
		let _trabajo = ''

		$("#header_mtr").html('<th>Empleado</th>'+
                  '<th>Fecha</th>'+
                  '<th colspan="2">Trabajo</th>'+
                  '<th colspan="2">Café</th>'+
                  '<th colspan="2">Almuerzo</th>')

		$.each(_marcas[0],function(i,e){
			_cafe = e[9]+' - '+e[10]
			_almuerzo = e[6]+' - '+e[7]
			_trabajo = e[3]+' - '+e[4]

			if(e[3].indexOf(',') >= 0)
				_trabajo = getHorasStyle(e[3].split(','),e[4].split(','))

			if(e[6].indexOf(',') >= 0)
				_almuerzo = getHorasStyle(e[6].split(','),e[7].split(','))

			if(e[9].indexOf(',') >= 0)
				_cafe = getHorasStyle(e[9].split(','),e[10].split(','))	
				
			str_salida += '<tr fecha="'+e[14]+'" vid="'+e[13]+'"> <td style="text-align: left">'+e[0]+'</td> <td class="editMark pbtn" vtipo="0">'+e[1]+'</td> <td  colspan="2" style="text-align:left" class="pbtn editMark" vtipo="1">'+_trabajo+'</td> <td colspan="2" class="pbtn editMark" style="text-align:left" vtipo=3">'+_almuerzo+'</td> <td colspan="2" class="pbtn editMark" style="text-align:left" vtipo="5">'+_cafe+'</td> </tr>';
		})

		$("#marcas_desde").html(_marcas[0][0][11])
		if(_marcas[0][0][12] != '')
			$("#marcas_hasta").html(' - '+_marcas[0][0][12])

		$("#listaEmpleadoMarcas").html(str_salida)
		break;
	case '2':
		let suma_horas = 0;

		$("#header_mtr").html('<tr><th colspan="100%" style="padding:0">Empleado</th></tr>'+
                  '<tr><th style="padding:0">LUN</th>'+
                  '<th style="padding:0">MAR</th>'+
                  '<th style="padding:0">MIE</th>'+
                  '<th style="padding:0">JUE</th>'+
                  '<th style="padding:0">VIE</th>'+
                  '<th style="padding:0">SAB</th>'+
                  '<th style="padding:0">DOM</th>'+
                  '<th style="padding:0">TOTAL</th></tr')
		console.log(_marcas)
		
		$.each(_marcas[0],function(i,e){
            let str_mon = '<table class="td_vs">'
            let str_tue = '<table class="td_vs">'
            let str_wed = '<table class="td_vs">'
            let str_thu = '<table class="td_vs">'
            let str_fri = '<table class="td_vs">'
            let str_sat = '<table class="td_vs">'
            let str_sun = '<table class="td_vs">'
			//suma_horas = parseFloat(e[3])+parseFloat(e[6])+parseFloat(e[9])+parseFloat(e[12])+parseFloat(e[15])+parseFloat(e[18])+parseFloat(e[21])
			let lunes 		= []
            let martes 		= []
            let miercoles 	= []
            let jueves		= []
            let viernes		= []
            let sabado		= []
            let domingo		= []
            
			//str_salida += '<tr> <td style=">'+e[0]+'</td> <td>'+e[2]+'</td> <td>'+e[5]+'</td> <td>'+e[8]+'</td> <td>'+e[11]+'</td>  <td>'+e[14]+'</td> <td>'+e[17]+'</td> <td>'+e[20]+'</td> <td>'+suma_horas.formatMoney(2,'.')+'</td> </tr*/>';
			try{
				lunes = JSON.parse(e[2])
            }
            catch(e){
              console.warn('ERROR lunes JSON') ?? []
            }
            lunes.forEach(json=>{
              str_mon += '<tr> <td>'+json.tipo+'</td> <td>'+json.hora+'</td> <td>'+json.total+' </td> </tr>'
            })
            str_mon += '</table>'
             
          	try{
            	martes = JSON.parse(e[3])	?? []
            }catch(e){
              console.warn('ERROR martes JSON')
            }
            martes.forEach(json=>{
              str_tue += '<tr> <td>'+json.tipo+'</td> <td>'+json.hora+'</td> <td>'+json.total+' </td> </tr>'
            })
          
            str_tue += '</table>'	
              
            try{
              miercoles = JSON.parse(e[4])	?? []
            }catch(e){
              console.warn('ERROR miercoles JSON')
            }
            miercoles.forEach(json=>{
              str_wed += '<tr> <td>'+json.tipo+'</td> <td>'+json.hora+'</td> <td>'+json.total+' </td> </tr>'
            })
            str_wed += '</table>'
              
            try{
              jueves = JSON.parse(e[5])	?? []
            }catch(e){
              console.warn('ERROR jueves JSON')
            }
            jueves.forEach(json=>{
              str_thu += '<tr> <td>'+json.tipo+'</td> <td>'+json.hora+'</td> <td>'+json.total+' </td> </tr>'
            })
            str_thu += '</table>'
              
            try{
              viernes = JSON.parse(e[6]) ?? []
            }catch(e){
              console.warn('ERROR viernes JSON')
            }
            viernes.forEach(json=>{
              str_fri += '<tr> <td>'+json.tipo+'</td> <td>'+json.hora+'</td> <td>'+json.total+' </td> </tr>'
            })
            str_fri += '</table>'
              
            try{
              sabado = JSON.parse(e[7])	?? []
            }catch(e){
              console.warn('ERROR sabado JSON')
            }
            sabado.forEach(json=>{
              str_sat += '<tr> <td>'+json.tipo+'</td> <td>'+json.hora+'</td> <td>'+json.total+' </td> </tr>'
            })
            str_sat += '</table>'
              
            try{
              domingo = JSON.parse(e[8]) ?? []	
            }catch(e){
              console.warn('ERROR domingo JSON')
            }
            domingo.forEach(json=>{
              str_sun += '<tr> <td>'+json.tipo+'</td> <td>'+json.hora+'</td> <td>'+json.total+' </td> </tr>'
            })
            str_sun += '</table>'
              
			str_salida += '<tr><td colspan="100%">'+e[1]+'</td></tr>'+
          		'<tr style="border-bottom: 3px solid black">'+
				'<td style="vertical-align:sub">'+str_mon+'</td>'+
              	'<td style="vertical-align:sub">'+str_tue+'</td>'+
              	'<td style="vertical-align:sub">'+str_wed+'</td>'+
              	'<td style="vertical-align:sub">'+str_thu+'</td>'+
              	'<td style="vertical-align:sub">'+str_fri+'</td>'+
              	'<td style="vertical-align:sub">'+str_sat+'</td>'+
              	'<td style="vertical-align:sub">'+str_sun+'</td>'+
			'<tr>';
		})

		$("#marcas_desde").html('')
		$("#marcas_hasta").html('')
		$("#listaEmpleadoMarcas").html(str_salida)
		break;
	default:
		break;
	}

}

function cargarFeriados(){
	let datos = getDatos('upper(date_format(concat(year(curdate()),"-",mes,"-",dia),"%W %d de %M")) as dia,if(pago_obligatorio,"Pago Obligatorio","Pago no Obligatorio") as obligatorio',449,"idsucursal=@@impresa")
	$("#lista_feriados").html('')
	let str_lista = '';
	$.each(datos[0],function(i,e){
		str_lista += '<li class="collection-item"><div>'+e[0]+'<a href="#!" class="secondary-content">'+$(this)[1]+'</a></div></li>'
	})
	$("#lista_feriados").html(str_lista)
}

function vaciar(mod){
	$("[mod='"+mod+"'] input[type='text']").val('')
	$("[mod='"+mod+"'] input[type='text'][vid]").attr('vid',0)
	$("[mod='"+mod+"'] input[type=time]").val('')
}

function cargarPlanilla(){
	let str = ''
	let planilla = getDatos('',435,'@@impresa')[0]

	if(!planilla.length){
		$("#listaplanilla").html('<tr> <td>Sin Empleados</td> </tr>')
		return false;
	}

	let tdeducciones =  tneto = tpatrono = 0;
	let ldeduccion = lneto = lpatrono = 0;
	let horas_totales = planilla_horas =  planilla_extras = 0;

	for (var i = 0; i < planilla.length; i++) {
		ldeduccion = parseFloat(planilla[i][5]);
		lneto      = parseFloat(planilla[i][4]);
		lpatrono   = parseFloat(planilla[i][8]);

		horas_totales = parseFloat(planilla[i][6])

		planilla_max =parseFloat(planilla[i][10])
		planilla_horas = horas_totales > planilla_max ? planilla_max : horas_totales
		planilla_extras = horas_totales > planilla_max ? horas_totales-planilla_max : 0
		
		str +=  '<tr vid="'+planilla[i][0]+'" class="linea_planilla" tpago="'+planilla[i][14]+'" bruto="'+planilla[i][2]+'">'+	
				  '<td style="text-align:left"><span><b class="ename">'+planilla[i][1]+'</b></span> <i class="der pbtn mdi mdi-eye colilla hide" title="Ver Colilla" vid="'+planilla[i][0]+'"></i> <i class="der pbtn mdi mdi-clipboard-list hide listadeducciones" title="Lista Deducciones" vid="'+planilla[i][0]+'"></i> <i title="Días Laborados" vid="'+planilla[i][0]+'" class="mdi mdi-calendar der pbtn diaslaborados"></i></td>'+
                  '<td class="_horas"><input type="text" class="calc_neto default-browser eder hora" value="'+planilla_horas+'" max="'+planilla[i][10]+'" vid="'+planilla[i][0]+'" style="width:50px;margin: 0;height: 1rem"> </td>'+
                  '<td class="_permisos pbtn"> 0 </td>'+
                  '<td class="_tardias pbtn"> 0</td>'+
                  '<td class="_ausencia pbtn"> 0 </td>'+
                  '<td class="_extra">  <input type="text" class="calc_neto default-browser eder hextra" value="'+planilla_extras+'" vid="'+planilla[i][0]+'" style="width:50px;margin: 0;height: 1rem"> </td>'+
                  '<td class="_vacaciones pbtn" title="Administrar Vacaciones" vid="'+planilla[i][0]+'"> '+planilla[i][12]+' </td>'+
                  '<td class="_incapacidades pbtn" title="Administrar Inpacacidades" vpago="'+planilla[i][15]+'" vid="'+planilla[i][0]+'" style="text-align:right"> '+parseFloat(planilla[i][15]).formatMoney(2,'.',',')+' </td>'+
                  '<td class="_bruto" style="text-align: right;">'+parseFloat(planilla[i][2]).formatMoney(2,'.',',')+'</td>'+
                  '<td style="text-align: right" class="_deducciones listadeducciones pbtn" vid="'+planilla[i][0]+'">  <span class="dley"> '+ldeduccion.formatMoney(2,'.',',')+' </span>  <br> <div class="row hide"> <div class="col s6"> Otras: </div> <input type="text" vid="'+planilla[i][0]+'" class="calc_neto default-browser eder col s6 odeducc" value="'+planilla[i][9]+'" style="margin: 0;height: 1rem"> </div></td>'+
                  '<td class="_neto" style="text-align: right;">'+lneto.formatMoney(2,'.',',')+'</td>'+
                  '<td class="_patrono" style="text-align: right;">'+lpatrono.formatMoney(2,'.',',')+'</td>'+
                '</tr>';

	}

	$("#ded_val").html(planilla[0][3])
	$("#pat_val").html(planilla[0][7])
	$("#listaplanilla").html(str)
	$(".hora").each(function(){ actualizar_neto($(this).attr('vid')) })
	totalizarPlanilla()
}

$(document).on("blur",".choras",function(){
	let padre = $(this).parent().parent();
	
	let hentrada = padre.find('.entrada').val().split(':')
	let hsalida = padre.find('.salida').val().split(':')
	let almuerzo = parseInt(padre.find('.almuerzo_horas').val())

	let tot = parseInt(hsalida[0])+(parseInt(hsalida[1])/60)-(parseInt(hentrada[0])+(parseInt(hentrada[1])/60))-almuerzo
	tot =  isNaN(tot) ? 0 : tot
	let thoras = 0;

	padre.attr('thoras',tot)
	padre.find('.total_horas').val(tot)
	
	$('.semana').each(function(){
		thoras += parseFloat($(this).attr('thoras'));
	})

	$("#t_thhor").val(thoras.formatMoney(2,'.',''))

});

$(document).on('click','.add_marca',function(){
	let padre = $(this).closest('tr').parent()
	padre.append('<tr vid="0"> <td></td> <td> <input type="time" class="eder editentradas" style="margin:0"></input> </td> <td> <input type="time" class="eder editsalidas" style="margin:0"></input> </td>  <td> <i class="mdi mdi-close red-text pbtn delete_marca hide" title="Eliminar Marca"></i> </td> </tr>')
})

$(document).on('click','.delete_marca',function(){
	let padre 	= $(this).parent().parent()
	let idmarca = padre.attr('vid')
	if(idmarca != 0)  
		padre.attr('vid','-'+idmarca)
	padre.find('.editsalidas').addClass('hide')
	padre.find('.editentradas').addClass('hide')
	$(this).addClass('hide')
})

$(document).on('click','.editMark',function(){
	
	let idtipo = parseInt($(this).attr('vtipo'))
	let padre = $(this).parent()
	let fecha = padre.attr('fecha')
	let idempleado = padre.attr('vid')
	let empleado = padre.find('td').eq(0).html()
	let fechae = padre.find('td').eq(1).html()
	let str_tipo = idtipo == 0 ? '' : 'and idtipo in('+idtipo+')'
	let marcas_str = ''

	$(".marca_edit").addClass('hide')
	$(".marca_edit").html('')

	let marcas = getDatos('id,entrada,salida,idtipo',448,'idempleado='+idempleado+' '+str_tipo+' and fecha="'+fecha+'" and idmarca = 0 group by id order by fecha')

	$.each(marcas[0],function(i,e){

		marcas_str = '<tr vid="'+e[0]+'"> <td></td> <td> <input type="time" class="eder editentradas" style="margin:0" value="'+e[1]+'"></input> </td> <td> <input type="time" class="eder editsalidas" style="margin:0" value="'+e[2]+'"></input> </td> <td> <i class="mdi mdi-close red-text pbtn delete_marca" title="Eliminar Marca"></i> </td> </tr>'
		switch(e[3]){
			case '1':
				$("#edit_marca_trabajo").append(marcas_str)
			break;
			case '3':
				$("#edit_marca_cafe").append(marcas_str)
			break;
			case '5':
				$("#edit_marca_almuerzo").append(marcas_str)
			break;
		}
	})
	
	marcas_str = '<tr vid="0"> <td></td> <td> <input type="time" class="eder editentradas" style="margin:0"></input> </td> <td> <input type="time" class="eder editsalidas" style="margin:0"></input> </td>  <td> <i class="mdi mdi-close red-text pbtn delete_marca hide" title="Eliminar Marca"></i> </td> </tr>'

	if(!$("#edit_marca_trabajo").html().length)
		$("#edit_marca_trabajo").append(marcas_str)

	if(!$("#edit_marca_cafe").html().length)
		$("#edit_marca_cafe").append(marcas_str)

	if(!$("#edit_marca_almuerzo").html().length)
		$("#edit_marca_almuerzo").append(marcas_str)

	switch(idtipo){
		case 1:
			$("#edit_marca_trabajo").removeClass('hide')
			$("#edit_marca_trabajo").find('tr').eq(0).find('td').eq(0).html('<b>Trabajo</b><i class="mdi mdi-plus blue-text add_marca pbtn" title="Agregar Marca"></i>')
			break;
		case 3:
			$("#edit_marca_cafe").removeClass('hide')
			$("#edit_marca_cafe").find('tr').eq(0).find('td').eq(0).html('<b>Café</b> <i class="mdi mdi-plus blue-text add_marca pbtn" title="Agregar Marca"></i>')
			break;
		case 5:
			$("#edit_marca_almuerzo").removeClass('hide')
			$("#edit_marca_almuerzo").find('tr').eq(0).find('td').eq(0).html('<b>Almuerzo</b> <i class="mdi mdi-plus blue-text add_marca pbtn" title="Agregar Marca"></i>')
			break;
		case 0:
			$(".marca_edit").removeClass('hide')
			$("#edit_marca_trabajo").find('tr').eq(0).find('td').eq(0).html('<b>Trabajo</b> <i class="mdi mdi-plus blue-text add_marca pbtn" title="Agregar Marca"></i>')
			$("#edit_marca_cafe").find('tr').eq(0).find('td').eq(0).html('<b>Café</b> <i class="mdi mdi-plus blue-text add_marca pbtn" title="Agregar Marca"></i>')
			$("#edit_marca_almuerzo").find('tr').eq(0).find('td').eq(0).html('<b>Almuerzo</b> <i class="mdi mdi-plus blue-text add_marca pbtn" title="Agregar Marca"></i>')
			break;
	}

	$("#edit_marca_empleado").html(empleado)
	$("#edit_marca_empleado").attr('vid',idempleado)
	$("#edit_marca_empleado").attr('vfecha',fecha)

	$("#edit_marca_fecha").html(fechae)

	$("#modal-emarcas").modal('open')
})

$(document).on('click','.cl-day',function(e){
	let getHoraDia = getDatos('',454,'"'+$(this).attr('vfecha')+'",'+$(this).attr('vidempleado')+',@@impresa')[0]

	$("#_day").html(getHoraDia[0][0])

	getHoraDia.shift()

	if(getHoraDia.length){
		$("#vcomentario").val(getHoraDia[0][5])
		Materialize.updateTextFields()

		$("#rastreo_marcas").html('')

		let str_marcas = '<tr> <td><b>Marca</b></td> <td><b>Hora</b></td> <td><b>Tiempo</b></td></tr>'
		$.each(getHoraDia,function(i,e){
			/*SI LA MARCA ES ENTRADA == 0*/
			let entrada = parseInt(e[4]) == 0 ? 'entrada' : ''
			let tipoinput = parseInt(e[4]) == 0 ? 'editentradas' : 'editsalidas'

			str_marcas += '<tr vid="'+e[3]+'" tp="'+e[4]+'" class="editTime '+entrada+'"> <td style="padding:0px">'+e[0]+'</td> <td style="padding:0px"><input type="time" style="margin:0px" value="'+e[1]+'" class="'+tipoinput+'"></td> <td style="padding:0px">'+e[2]+'</td> </tr>'
		})

		$("#rastreo_marcas").html(str_marcas)
	}else{
		$("#rastreo_marcas").html('No Hay Marcas')
	}


	$("#marcas_empleado").removeClass('hide')

})

$(document).on('click','.diaslaborados',function(e){
	/*MEJORA*/
	$("#marcas_empleado").addClass('hide')
	$(".de_ename").html($(this).parent().parent().find('.ename').html())
	let idempleado = $(this).attr('vid')
	
	let tipo_horario = getDatos('tipopago',413,'id='+idempleado)[0][0][0]

	let dias_ley = 14;
	let fecha_desde = new Date($("#doplanilla").data('valores')[tipo_horario]['desde'])
	let fecha_hasta = new Date($("#doplanilla").data('valores')[tipo_horario]['hasta'])
	let fecha_corte = new Date($("#doplanilla").data('valores')[tipo_horario]['corte'])

	let str_fecha_desde = $("#doplanilla").data('valores')[tipo_horario]['desde']
	let str_fecha_hasta = $("#doplanilla").data('valores')[tipo_horario]['hasta']
	let str_fecha_corte = $("#doplanilla").data('valores')[tipo_horario]['corte']

	let fecha_hoy   = new Date()

	let str_dias = ''
	let suma_xsemana = []
	let feriados = getDatos('concat(year(curdate()),"-",lpad(mes,2,0),"-",lpad(dia,2,0)) as feriado',449,'concat(lpad(mes,2,0),lpad(dia,2,0)) between date_format("'+str_fecha_desde+'","%m%d") and date_format("'+str_fecha_hasta+'","%m%d")')[0]
	let fecha_str = color_horas = ''
	let color_day = 'blue'
	let cont = dia = horas = weekyear = 0;
	let h_tot = h_aju = 0;
	let repetir = 0;

	let horaslaboradas = getDatos('',453,idempleado+',"'+str_fecha_desde+'","'+str_fecha_hasta+'",@@impresa,2')[0]

	let tmp_arr = []
	$.each(horaslaboradas,function(i,e){
		tmp_arr[e[0]] = e[1]
	})
	horaslaboradas = tmp_arr

	fecha_corte.setDate(fecha_corte.getDate()+1)
	fecha_desde.setDate(fecha_desde.getDate()+1)
	fecha_hasta.setDate(fecha_hasta.getDate()+2)

	while(fecha_desde.valueOf() != fecha_hasta.valueOf()){

		dia = (fecha_desde.getDate()).toString().padStart(2,'0')
		fecha_str= fecha_desde.getFullYear()+'-'+(fecha_desde.getMonth()+1).toString().padStart(2,'0')+'-'+dia
		
		if(cont == 0){
			weekyear = getDatos('weekofyear("'+fecha_str+'")',1,'1')[0][0][0];
			suma_xsemana[weekyear] = 0;

			str_dias += '<tr> <td style="text-align: center;">#'+weekyear+' <hr> <span id="sem'+weekyear+'"></span> </td>';
			if(fecha_desde.getDay() != 1){
				repetir = fecha_desde.getDay() == 0 ? 6 : fecha_desde.getDay()-1;
				str_dias += '<td></td>'.repeat(repetir)
				cont = fecha_desde.getDay()-1
			}
		}

		color_day = 'blue'

		if(fecha_desde.getDay() == 0){
			color_day = 'red'
		}

		if(fecha_str == feriados[0]){
			feriados.shift()
			color_day = 'red'
		}

		horas = horaslaboradas[fecha_desde.getDate()] == undefined ? 0 : horaslaboradas[fecha_desde.getDate()]

		color_horas = 'background-color: lightcoral'
		if(fecha_hoy.getDate() == fecha_desde.getDate()){
			color_horas = 'background-color: grey'
		}

		if(fecha_desde.getDate() == fecha_corte.getDate()){

			color_horas = 'background-color: yellow;color: black'
		}

		str_dias += '<td> <div class="cl-day" vfecha="'+fecha_str+'" vidempleado="'+idempleado+'"> <span class="cl-num" style="color: '+color_day+'">'+dia+'</span> <span class="cl-label" style="'+color_horas+'">'+horas+'</span> </div> </td>';
		suma_xsemana[weekyear] += parseFloat(horas)
		h_tot += parseFloat(horas)
		if(dias_ley <= 0)
			h_aju += parseFloat(horas)

		if(cont == 6){
			cont = 0
			str_dias += '</tr>'
		}
		else
			cont++;
		fecha_desde.setDate(fecha_desde.getDate()+1)
		dias_ley--
	}

	if(cont != 7){
		repetir = 7-cont
		str_dias += '<td></td>'.repeat(repetir)
	}

	$("#listaDiaLaborado").html(str_dias)

	$.each(suma_xsemana,function(i,e){
		if(e != undefined)
			$("#sem"+i).html(parseFloat(e).formatMoney(1))
	})

	$("#thoras_ajuste").val(h_aju)
	$("#thoras_laboradas").val(h_tot)

	$("#modal-diaslaborados").attr('vid',idempleado)
	$("#modal-diaslaborados").modal('open')
	
})

$(document).on('click','.listadeducciones',function(e){
	let idempleado = $(this).attr('vid')
	$("#modal-deducciones").attr('vid',idempleado)
	$(".de_ename").html($(this).parent().find('.ename').html())

	let listadeducciones =  getDatos('id,nombre,valor',442,'tipo <> 0 and idempleado='+$(this).attr('vid'))[0]

	$("#de_lista").html('')
	$.each(listadeducciones,function(){
		$("#de_lista").prepend('<div class="row _deline" accion="2" vid="'+$(this)[0]+'"> <div class="col s6 de_descr">'+$(this)[1]+'</div> <div class="col s4 de_monto">'+parseFloat($(this)[2]).formatMoney(2,'.',',')+'</div> <div class="col s2"> <i class="pbtn mdi mdi-minus red-text de_delline" ></i> </div> </div>')
	})

	$("#modal-deducciones").modal('open')
	$("#de_name").focus()
})

$(document).on('keyup','.calc_neto',function(e){
	let code = e.wich || e.which
	if(code == 13){
		let valor = $(this).val().replace(/,/g,'')
		if(isNaN(valor)){
			Materialize.toast('Debe ser Numérico',4000,'red')
			$(this).focus().select()
		}
		let idfila = $(this).attr('vid')
		actualizar_neto(idfila)
	}
});

$(document).on('click','.colilla',function(e){
	window.open('login?accion=8&arreglo[arch]=colilla&arreglo[sel]=&arreglo[tbl]=436&arreglo[where]=&arreglo[tit]=Colilla de Pago&arreglo[show]=1')
});

function totalizarPlanilla(){
	let thoras 	= 0;
	let textras	= 0;
	let tvacas	= 0;
	let tincap 	= 0;
	let tbruto 	= 0;
	let tdeduc 	= 0;
	let tneto 	= 0;
	let tpat 	= 0;

	$.each($(".linea_planilla"),function(){
		thoras  += parseFloat($(this).find('.hora').val())
		textras += parseFloat($(this).find('.hextra').val())
		tvacas	+= parseFloat($(this).find('._vacaciones').html())
		tincap 	+= parseFloat($(this).find('._incapacidades').html().replace(/,/g,''))
		tbruto 	+= parseFloat($(this).find('._bruto').html().replace(/,/g,''))
		tdeduc 	+= parseFloat($(this).find('.dley').html().replace(/,/g,''))
		tneto 	+= parseFloat($(this).find('._neto').html().replace(/,/g,''))
		tpat 	+= parseFloat($(this).find('._patrono').html().replace(/,/g,''))
	})

	$("#thoras").html(thoras)
	$("#textras").html(textras)
	$("#tvacas").html(tvacas)
	$("#tincap").html(tincap.formatMoney(2,'.',','))
	$("#tbruto").html(tbruto.formatMoney(2,'.',','))
	$("#tdeduc").html(tdeduc.formatMoney(2,'.',','))
	$("#tneto").html(tneto.formatMoney(2,'.',','))
	$("#tpat").html(tpat.formatMoney(2,'.',','))
	
}

function actualizar_neto(vid){
	if(vid != 0){
		let horas 	 = parseFloat($(".linea_planilla[vid="+vid+"] ._horas").find('.hora').val())
		let max  	 = parseFloat($(".linea_planilla[vid="+vid+"] ._horas").find('.hora').attr('max'))
		let extra 	 = parseFloat($(".linea_planilla[vid="+vid+"] ._extra").find('.hextra').val())
		let bruto 	 = parseFloat($(".linea_planilla[vid="+vid+"]").attr('bruto'))
		let odeduc 	 = parseFloat($(".linea_planilla[vid="+vid+"] ._deducciones").find('.odeducc').val().replace(/,/,''))
		let utlde    = parseFloat($("#ded_val").html())
		let utlpat   = parseFloat($("#pat_val").html())
		let tipopago = parseFloat($(".linea_planilla[vid="+vid+"]").attr('tpago'))

		let incap 	= parseFloat($(".linea_planilla[vid="+vid+"] ._incapacidades").attr('vpago'))

		/*horas = extra > 0 && horas < max ? horas+extra : horas;
		extra = extra > 0 && horas < max ? 0 : extra;

		extra = horas>max ? extra+horas-max : extra;
		horas = horas>max ? max : horas;*/

		if(horas > max){
			extra = horas-max
			horas = max

			$(".linea_planilla[vid="+vid+"] .hora").val(horas)
			$(".linea_planilla[vid="+vid+"] .hextra").val(extra)
		}

		let valor_hora = 0
		if(tipopago == 1){ //SEMANAL
			valor_hora = bruto/48
		}else{
			horas = horas+(120-max)
			valor_hora = bruto/120
		}

		let nbruto 	= incap+(valor_hora*horas+valor_hora*extra*1.5)
		let ndeducc = nbruto*(utlde/100)
		let nneto   = nbruto-ndeducc-odeduc;
		let npat    = nbruto*(utlpat/100);
		
		$(".linea_planilla[vid="+vid+"] ._bruto").html(nbruto.formatMoney(2,'.',','))
		$(".linea_planilla[vid="+vid+"] ._deducciones").find('.dley').html(ndeducc.formatMoney(2,'.',','))
		$(".linea_planilla[vid="+vid+"] ._neto").html(nneto.formatMoney(2,'.',','))
		$(".linea_planilla[vid="+vid+"] ._patrono").html(npat.formatMoney(2,'.',','))
	}
}

function cargarEmpleados(){
	let elista = getDatos('',426,'@@impresa')
	if(elista.succed){
		let str = ''
		$.each(elista[0],function(){
			str += '<tr vid="'+$(this)[0]+'"> <td>'+$(this)[1]+'</td> <td class="ename">'+$(this)[2]+'</td> <td>'+$(this)[3]+'</td> <td>'+$(this)[4]+'</td> <td>'+$(this)[5]+'</td> <td>'+$(this)[6]+'</td> <td>'+$(this)[7]+'</td> <td> <span class="horarioEmpleado pbtn" title="Ver Horario de Empleado">🗓️</span> <i class="pbtn mdi mdi-lock hide" title="Métodos de Autenticación"></i> <i class="pbtn mdi mdi-pencil editEmpleado"></i> <i class="pbtn mdi mdi-close red-text removeEmpleado"></i> </td> </tr>'
		})

		$("#listaempleados").html(str)
	}

}

function renderHeaderSemana(semanaObj, numSemana){

  let tr = `<tr class="grey lighten-3">
    <td><b>Semana ${numSemana}</b></td>`;

  // lunes=2 ... domingo=1 (orden visual)
  const orden = [2,3,4,5,6,7,1];

  orden.forEach(d => {

    let diaInfo = semanaObj.dias[d];

    if(diaInfo){
      tr += `<td class="center"><b>${diaInfo.fecha}</b></td>`;
    } else {
      tr += `<td></td>`; // 🔥 vacío si no existe
    }

  });

  tr += `</tr>`;

  return tr;
}

$(document).on('click','.horarioEmpleado',function(){
	$(".de_ename").html($(this).parent().parent().find('.ename').html())
	$("#horario_x_empleado").html('')

	let idempleado 	= $(this).parent().parent().attr('vid')
	let horario_empleado = getDatos('',453,idempleado+',"","",@@impresa,1')

	if(horario_empleado.succed == '1'){

		let semanas = {};

		horario_empleado = horario_empleado[0];

		horario_empleado.forEach(e => {

		  let semana = e[7];
		  let dia = e[6]; // 1=DOM ... 7=SAB

		  if(!semanas[semana]){
		    semanas[semana] = {
		      dias: {},   // 🔥 clave
		      registros: []
		    };
		  }

		  // guardar por día
		  if(!semanas[semana].dias[dia]){
		    semanas[semana].dias[dia] = {
		      fecha: e[1], // día del mes 🔥
		      registros: []
		    };
		  }

		  semanas[semana].dias[dia].registros.push(e);

		});

		const tipos = {
		  1: 'Trabajo',
		  5: 'Almuerzo',
		};

		let contenedor = $("#horario_x_empleado");
		contenedor.html('');

		const ordenDias = [2,3,4,5,6,7,1];

		Object.keys(semanas)
		  .sort((a,b)=>a-b)
		  .forEach(semana => {

		    let semanaObj = semanas[semana];

		    // 🔥 HEADER CON DÍAS
		    contenedor.append(renderHeaderSemana(semanaObj, semana));

		    // 🔁 tipos
		    Object.keys(tipos).forEach(tipo => {

		      let fila = document.createElement("tr");

		      let tdTitulo = document.createElement("td");
		      tdTitulo.textContent = tipos[tipo];
		      fila.appendChild(tdTitulo);

		      ordenDias.forEach(d => {

		        let td = document.createElement("td");

		        let diaInfo = semanaObj.dias[d];

		        let hoy = new Date().getDate();

				if(diaInfo && diaInfo.fecha == hoy){
				  td.classList.add('blue')
				  td.classList.add('lighten-4');
				}

		        if(diaInfo){

		          let registro = diaInfo.registros.find(x => x[2] == tipo);

		          if(registro){

		            td.classList.add('celda-hora');
		            td.dataset.id = registro[0];
		            td.dataset.dia = d;
		            td.dataset.tipo = tipo;

		            td.innerHTML = `
		              <span class="hora-texto">${registro[5]}</span>
		              <div class="hora-edit hide" data-vid="${registro[0]}" data-fecha="${registro[8]}">
		                <input type="time" class="hora-in browser-default" value="${registro[3] || ''}" data-orig="${registro[3] || ''}" >
		                <input type="time" class="hora-out browser-default" value="${registro[4] || ''}" data-orig="${registro[4] || ''}" >
		              </div>
		            `;

		          } else {
		            td.innerHTML = `<span class="hora-texto">--:--</span>`;
		          }

		        } else {
		          // 🔥 día fuera del rango
		          td.classList.add('grey')
		          td.classList.add('lighten-4');
		          td.innerHTML = '';
		        }

		        fila.appendChild(td);

		      });

		      contenedor.append(fila);

		    });

		});

	}else{
		$("#horario_x_empleado").html('<tr> <td colspan="100%" style="text-align: center !important">No Hay Información</td> </tr>')
	}

	$("#modal-horario-empleado").attr('idempleado',idempleado)
	$("#modal-horario-empleado").modal('open')
})

function format12h(time){

  if(!time) return '--:--';

  let [h, m] = time.split(':');

  h = parseInt(h);

  let ampm = h >= 12 ? 'PM' : 'AM';
  let h12 = h % 12;

  if(h12 === 0) h12 = 12;

  return `${h12}:${m} ${ampm}`;
}

function cerrarEdiciones(){

  $('.celda-hora').each(function(){

    let celda = $(this);

    let inputIn = celda.find('.hora-in').val();
    let inputOut = celda.find('.hora-out').val();

    let texto = '--:-- - --:--';

    if(inputIn && inputOut){
      texto = `${format12h(inputIn)} - ${format12h(inputOut)}`;
    }

    if(inputIn && !inputOut){
	  celda.find('.hora-texto').text(format12h(inputIn) + ' - ...');
	}

    celda.find('.hora-texto').text(texto).show();
    celda.find('.hora-edit').addClass('hide');

  });

}

$(document).on('click', function(e){

  if(!$(e.target).closest('.celda-hora').length){
    cerrarEdiciones();
  }

});

$(document).on('keydown', '.hora-in, .hora-out', function(e){

  if(e.key === 'Enter'){
    cerrarEdiciones();
  }

});

$(document).on('click','.celda-hora',function(e){

   // evitar conflicto con inputs
  if($(e.target).is('input')) return;

  // cerrar otros
  cerrarEdiciones();

  let celda = $(this);

  celda.find('.hora-texto').hide();
  celda.find('.hora-edit').removeClass('hide');

  // focus automático
  celda.find('.hora-in').focus();

});

$(document).on('change', '.hora-in, .hora-out', function(){

  let celda = $(this).closest('.celda-hora');

  let inputIn = celda.find('.hora-in').val();
  let inputOut = celda.find('.hora-out').val();

  if(inputIn && inputOut){
    cerrarEdiciones();
  }

});

$(document).on('click','.removeEmpleado',function(){
    
    if ($(this).attr('cnt') == undefined) {
        if(!$("#_DEL").length){
            let id = $(this).parent().parent().attr('vid')
            let msjdel = 'Desea Eliminar Este Empleado?';
            
            $(this).attr('mbg',$(this).parent().parent().css('background-color'));
            var $toastContent = $('<span id="_DEL" class="black-text">'+msjdel+'</span>').add($('<a class="btn red" style="margin:2px" id="del_nid" inid="listaempleados tr[vid='+id+'] .removeEmpleado">Eliminar</a> <a class="btn btn-default" id="can_nid" inid="listaempleados tr[vid='+id+'] .removeEmpleado">Cancelar</a>'));
            Materialize.toast($toastContent,10000,'orange',function(){if($("#"+id) != undefined) $("#"+id).parent().parent().css('background-color',$("#"+id).attr('mbg'))});
            $(this).parent().parent().css('background-color','#ed5249');

            $("#txt-justify").focus()
        }
    }else{
        deleterow($(this))
    }
})

$(document).on("click","#del_nid",function(){
    var id = $(this).attr("inid");    
    $(this).attr('disabled',true)
    $(this).parent().remove();
    $("#"+id).attr('cnt',1);
    $("#"+id).click();
});

$(document).on("click","#can_nid",function(){
    var id = $(this).attr("inid");
    $("#"+id).parent().parent().css('background-color',$("#"+id).attr('mbg'));
    $(this).parent().remove();
});

$(document).on('click','.editEmpleado',function(){
	$("#metit").html('Editar Empleado')
	let id = $(this).parent().parent().attr('vid')
	let infoempleado = getDatos('',437,id)[0][0]
	
    infoempleado[2] = infoempleado[2] == null ? 0 : infoempleado[2]
    
	$('#t_enom').val(infoempleado[0])
	$('#t_eced').val(infoempleado[1])
	$("#t_eiduser").attr('vid',infoempleado[2])
	$("#t_eiduser").val(infoempleado[3])
	$("#t_efe").val(infoempleado[4])
	$("#t_edat").val(infoempleado[5])
	$("#s_ehor").val(infoempleado[6]).material_select('update')
	$("#t_ehoras").val(infoempleado[8])
	$("#t_ehxdia").val(infoempleado[9])
	$("#t_edxm").val(infoempleado[10])
	$("#s_epuesto").attr('vid',infoempleado[11])
	$("#s_epuesto").val(infoempleado[12])
	$("#t_esalario").val(parseFloat(infoempleado[13]).formatMoney(2,'.',','))
	$("[name=tipopago][vid="+infoempleado[14]+"]").click()
	$("#t_evacas").val(infoempleado[15])

	switch(infoempleado[14]){
		case '1':
			$("#t_valxhora").val((parseFloat(infoempleado[13])/48).formatMoney(2,'.',','))
			break;
		default:
		break;
	}

	Materialize.updateTextFields()

	$("#modal-empleado").modal('open')
	$("#modal-empleado").css('max-height','none')
	$("#modal-empleado").css('height','95vh')
	$("#b_aempleado").attr('save',1)
	$("#b_aempleado").attr('vid',id)
})


function cargarDeducciones(){
	let dlista = getDatos('id,nombre,if(tipo=3,"Rangos",concat(valor,case tipo when 1 then "%" else "¢" end)),case base when 1 then "Salario Bruto" when 2 then "Salario Sin Cargos" else "Patrono" end,tipo',424,'id>0 and idsucursal = @@impresa order by base')
	let str =  isrange = ''
	if(dlista.succed)
		$.each(dlista[0],function(){
			isrange = $(this)[2]
			if($(this)[4] == '3'){
				isrange = '<a class="openRangos btn" vid="'+$(this)[0]+'">Rangos</a>'
				console.log(isrange)
			}
			str+= '<tr> <td>'+$(this)[1]+'</td> <td>'+isrange+'</td> <td>'+$(this)[3]+'</td> <td> <i class="mdi mdi-pencil pbtn" vid="'+$(this)[0]+'" title="Editar Deducción"></i> <i class="mdi mdi-close pbtn red-text" vid="'+$(this)[0]+'" title="Eliminar Deducción"></i> </td> </tr>'
		})

	$("#listadeducciones").html(str)
}

function cargarCantHorarios(){
	$("#defult_horario").html(cargarTabla_Horarios(0))
	let hlista = getDatos('count(id)',414,'id>0 and idsucursal = @@impresa')[0][0][0]
	$("#clistah").html(hlista)
}

function cargarTabla_Horarios(id){
	let horas_horario = {
		0:{'entrada':'','salida':'','cantidad':0,'almuerzo':0},
		1:{'entrada':'','salida':'','cantidad':0,'almuerzo':0},
		2:{'entrada':'','salida':'','cantidad':0,'almuerzo':0},
		3:{'entrada':'','salida':'','cantidad':0,'almuerzo':0},
		4:{'entrada':'','salida':'','cantidad':0,'almuerzo':0},
		5:{'entrada':'','salida':'','cantidad':0,'almuerzo':0},
		6:{'entrada':'','salida':'','cantidad':0,'almuerzo':0},
		7:{'entrada':'','salida':'','cantidad':0,'almuerzo':0}
	}
	if(id > 0){
		console.log('traer de la base')
	}
	return '<tr>'+
    	'<th>Día</th>'+
    	'<th>Entrada</th>'+
    	'<th>Salida</th>'+
    	'<th>Tiempo de Almuerzo</th>'+
    	'<th>Horas</th>'+
    '</tr>'+
    '<tr class="semana" thoras="'+horas_horario[2]['cantidad']+'" vid="2">'+
    '  <td>Lunes</td>'+
    '  <td><input type="time" style="margin: 0" class="entrada choras eder" value="'+horas_horario[2]['entrada']+'"></td>'+
    '  <td><input type="time" style="margin: 0" class="salida choras eder" value="'+horas_horario[2]['salida']+'"></td>'+
    '  <td><input type="text" class="almuerzo_horas choras eder" style="margin: 0;" value="'+horas_horario[2]['almuerzo']+'"></td>'+
    '  <td><input type="text" class="total_horas eder" style="margin: 0;" readonly value="'+horas_horario[2]['cantidad']+'"></td>'+
    '</tr>'+
    '<tr class="semana" thoras="'+horas_horario[3]['cantidad']+'" vid="3">'+
    '  <td>Martes</td>'+
    '  <td><input type="time" style="margin: 0" class="entrada choras eder" value="'+horas_horario[3]['entrada']+'"></td>'+
    '  <td><input type="time" style="margin: 0" class="salida choras eder" value="'+horas_horario[3]['salida']+'"></td>'+
    '  <td><input type="text" class="almuerzo_horas choras eder" style="margin: 0;" value="'+horas_horario[3]['almuerzo']+'"></td>'+
    '  <td><input type="text" class="total_horas eder" style="margin: 0;" readonly value="'+horas_horario[3]['cantidad']+'"></td>'+
    '</tr>'+
    '<tr class="semana" thoras="'+horas_horario[4]['cantidad']+'" vid="4">'+
    '  <td>Miércoles</td>'+
    '  <td><input type="time" style="margin: 0" class="entrada choras eder" value="'+horas_horario[4]['entrada']+'"></td>'+
    '  <td><input type="time" style="margin: 0" class="salida choras eder" value="'+horas_horario[4]['salida']+'"></td>'+
    '  <td><input type="text" class="almuerzo_horas choras eder" style="margin: 0;" value="'+horas_horario[4]['almuerzo']+'"></td>'+
    '  <td><input type="text" class="total_horas eder" style="margin: 0;" readonly value="'+horas_horario[4]['cantidad']+'"></td>'+
    '</tr>'+
    '<tr class="semana" thoras="'+horas_horario[5]['cantidad']+'" vid="5">'+
    '  <td>Jueves</td>'+
    '  <td><input type="time" style="margin: 0" class="entrada choras eder" value="'+horas_horario[5]['entrada']+'"></td>'+
    '  <td><input type="time" style="margin: 0" class="salida choras eder" value="'+horas_horario[5]['salida']+'"></td>'+
    '  <td><input type="text" class="almuerzo_horas choras eder" style="margin: 0;" value="'+horas_horario[5]['almuerzo']+'"></td>'+
    '  <td><input type="text" class="total_horas eder" style="margin: 0;" readonly value="'+horas_horario[5]['cantidad']+'"></td>'+
    '</tr>'+
    '<tr class="semana" thoras="'+horas_horario[6]['cantidad']+'" vid="6">'+
    '  <td>Viernes</td>'+
    '  <td><input type="time" style="margin: 0" class="entrada choras eder" value="'+horas_horario[6]['entrada']+'"></td>'+
    '  <td><input type="time" style="margin: 0" class="salida choras eder" value="'+horas_horario[6]['salida']+'"></td>'+
    '  <td><input type="text" class="almuerzo_horas choras eder" style="margin: 0;" value="'+horas_horario[6]['almuerzo']+'"></td>'+
    '  <td><input type="text" class="total_horas eder" style="margin: 0;" readonly value="'+horas_horario[6]['cantidad']+'"></td>'+
    '</tr>'+
    '<tr class="semana" thoras="'+horas_horario[7]['cantidad']+'" vid="7">'+
    '  <td>Sábado</td>'+
    '  <td><input type="time" style="margin: 0" class="entrada choras eder" value="'+horas_horario[7]['entrada']+'"></td>'+
    '  <td><input type="time" style="margin: 0" class="salida choras eder" value="'+horas_horario[7]['salida']+'"></td>'+
    '  <td><input type="text" class="almuerzo_horas choras eder" style="margin: 0;" value="'+horas_horario[7]['almuerzo']+'"></td>'+
    '  <td><input type="text" class="total_horas eder" style="margin: 0;" readonly value="'+horas_horario[7]['cantidad']+'"></td>'+
    '</tr>'+
    '<tr class="semana" thoras="'+horas_horario[1]['cantidad']+'" vid="1">'+
    '  <td>Domingo</td>'+
    '  <td><input type="time" style="margin: 0" class="entrada choras eder" value="'+horas_horario[1]['entrada']+'"></td>'+
    '  <td><input type="time" style="margin: 0" class="salida choras eder" value="'+horas_horario[1]['salida']+'"></td>'+
    '  <td><input type="text" class="almuerzo_horas choras eder" style="margin: 0;" value="'+horas_horario[1]['almuerzo']+'"></td>'+
    '  <td><input type="text" class="total_horas eder" style="margin: 0;" readonly value="'+horas_horario[1]['cantidad']+'"></td>'+
    '</tr>'+
    '<tr> <td></td> <td></td> <td></td> <td></td> <td><input type="text" class="eder" id="t_thhor" style="margin: 0;" readonly value="0.0"></td> </tr>';
}

function cargarHorarios(id=0,idempleado=0,fecha='',istemporal=0){
	$("#t_nhor").focus();

	let hlista = getDatos('',473,id+',@@impresa,'+idempleado+',"'+fecha+'"');
	console.log(hlista)
	if(hlista[0].length){
		hlista = hlista[0];
		var strhorario = '';

		for (var i = 0; i < hlista.length; i++) {
			strhorario += '<tr> <td colspan="2">'+hlista[i][1]+'</td> <td colspan="2">'+hlista[i][17]+' Horas</td> <td colspan="3">'+hlista[i][2]+' <span style="text-align:right"> <i class="mdi mdi-account pbtn">(0)</i> <i class="mdi mdi-pencil pbtn"></i> <i class="mdi mdi-close pbtn red-text"></i> </span>  </td>'+ 
			'<tr>'+
            '    <td style="text-align:center;padding:0px"><b>Lunes</b></td>'+
            '    <td style="text-align:center;padding:0px"><b>Martes</b></td>'+
            '    <td style="text-align:center;padding:0px"><b>Miércoles</b></td>'+
            '    <td style="text-align:center;padding:0px"><b>Jueves</b></td>'+
            '    <td style="text-align:center;padding:0px"><b>Viernes</b></td>'+
            '    <td style="text-align:center;padding:0px"><b>Sábado</b></td>'+
            '    <td style="text-align:center;padding:0px"><b>Domingo</b></td>'+
            '</tr>'+
			'<tr> <td style="text-align:center">'+hlista[i][3]+'</td> <td style="text-align:center">'+hlista[i][4]+'</td>  <td style="text-align:center">'+hlista[i][5]+'</td> <td style="text-align:center">'+hlista[i][6]+'</td> <td style="text-align:center">'+hlista[i][7]+'</td> <td style="text-align:center">'+hlista[i][8]+'</td> <td style="text-align:center">'+hlista[i][9]+'</td> </tr>'+
			'<tr> <td style="text-align:center">'+hlista[i][10]+'</td> <td style="text-align:center">'+hlista[i][11]+'</td>  <td style="text-align:center">'+hlista[i][12]+'</td> <td style="text-align:center">'+hlista[i][13]+'</td> <td style="text-align:center">'+hlista[i][14]+'</td> <td style="text-align:center">'+hlista[i][15]+'</td> <td style="text-align:center">'+hlista[i][16]+'</td> </tr>'
		}

		$("#listahorarios").html(strhorario)
	}else{
		console.log(hlista)
	}
	
}

function cargarPuestos(){
	let dep = $("#pseldept option:selected").val()
	dep = dep == undefined ? 0 : dep
	let lista = getDatos('',423,dep+',@@impresa');
	$("#lpuestos").html('<tr> <td colspan="100%"><b>No Hay Puestos Disponibles</b></td> </tr>')
	if(lista[0].length){
		lista = lista[0];
		let strpuestos = ""
		for (var i = 0; i < lista.length; i++) {
			strpuestos += '<tr> <td>'+lista[i][1]+'</td> <td style="text-align: right">'+lista[i][2]+'</td> <td style="text-align: right">'+lista[i][5]+'</td>  <td>'+lista[i][3]+'</td> <td style="text-align: right;"> <i class="mdi mdi-account pbtn shempleados" vid="'+lista[0]+'" title="Lista Empleados"></i>('+lista[i][4]+') <i class="puestoEdit mdi mdi-pencil pbtn" title="Editar Puesto" vid="'+lista[0]+'"></i> <i class="puestoDel mdi mdi-close red-text pbtn" title="Eliminar Puesto vid="'+lista[0]+'""></i></td> </tr>';
		}

		$("#lpuestos").html(strpuestos)
	}
}

function cargarOrganigrama(){
	let org = getDatos('id,nombre,iddept',422,'id>0 and idsucursal = @@impresa order by iddept');
	if(org['succed']){
		org = org[0];
		$("#organigrama").html('');

		for (var i = 0; i < org.length; i++) {
			if(org[i][2]=='0')
				$("#organigrama").append('<li lid="'+org[i][0]+'"><a>'+org[i][1]+'</a> <i class="pbtn mdi mdi-pencil editOrg"></i> <i class="pbtn delOrg mdi mdi-close red-text"></i></li>');
			else{
				if(!$("[lid='"+org[i][2]+"'] ul").length)
					$("[lid='"+org[i][2]+"']").append('<ul></ul>')

				$("[lid='"+org[i][2]+"'] ul").append('<li lid="'+org[i][0]+'"><a>'+org[i][1]+'</a> <i class="pbtn mdi mdi-pencil editOrg"></i> <i class="pbtn delOrg mdi mdi-close red-text"></i> </li>')
			}
		}
	}
}

function cargarDeptSel(elem){
	let depts = getDatos('id,nombre',422,'id>0 and idsucursal = @@impresa order by iddept');
	if(depts[0].length){
		let sopt = '<option value="0">N/A</option>';
		for (var i = 0; i < depts[0].length; i++) {
			sopt += '<option value="'+depts[0][i][0]+'">'+depts[0][i][1]+'</option>'
		}
		$("#"+elem).html(sopt).material_select('update')
	}
}

function deleterow(elem){
   
   var id = elem.parent().parent().attr('vid');
   
   actualizar(413,'id=id*-1','id='+id)
   actualizar(416,'idempleado=id*-1','idempleado='+id)
   actualizar(448,'idempleado=id*-1','idempleado='+id)
   getDatos('',467,413)

   $("#listaempleados tr[vid="+id+"]").remove()
}

function post_core_init(fn, modal) {
	switch(fn){
		case 419:
			asgard.schema[fn]['idempleado']['hide_vid'] = 'empleado_vacaciones'
		break;
		case 492:
			asgard.schema[fn]['idempleado']['hide_vid'] = 'empleado_incapacidad'
		break;
		case 442:
			asgard.schema[fn]['idempleado']['hide_vid'] = 'empleado_deduccion'
		break;
		default:
			console.warn('FN No Configurado: '+fn)
		break	
	}
}

function post_core_save(fn, r, _id) {
    if (fn === 419){
    	let subtipo = $("#vafecta_planilla_vacaciones").is(':checked') ? 'Con Goce' : 'Sin Goce'
    	if(r == 1){ //INSERTAR
    		getDatos('',494,'1,0,'+$("#empleado_vacaciones").attr('vid')+',"VACACION","'+subtipo+'","'+$("#desde_vacaciones").val()+'","'+$("#hasta_vacaciones").val()+'",null,null,'+$("#vafecta_planilla_vacaciones").is(':checked')+',"'+$("#comentario_vacaciones").val()+'",@@usr,@@impresa')
    	}

    	Materialize.toast('Vacaciones guardadas correctamente', 4000, 'green')
    	asgard.core_reset(fn)
    	asgard.core_grid_build(487,2)
    }

    if(fn === 492){
    	Materialize.toast('Incapacidad guardada correctamente', 4000, 'green')
    	actualizar(448,'idempleado=idempleado*-1','idempleado='+$("#empleado_incapacidad").attr('vid')+' and fecha between "'+$("#desde_incapacidad").val()+'" and "'+$("#hasta_incapacidad").val()+'"')
    	asgard.core_reset(fn)
    	asgard.core_grid_build(493,2)
    }
}