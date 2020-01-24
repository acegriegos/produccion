var isprov = 0;
var ntext = 'Cliente';

$(function(){
	$('ul.tabs').tabs();
	$('select').material_select();
	$("#fclientes").submit(function(){return false});

	var param = getParameterByName('is');
	if(param == "1"){
		$(".ncliente").addClass('hide');
		$(".cgh").html('Proveedor');
		$(".cghs").html('Proveedores');
		isprov = 1;
		ntext = 'Proveedor';
	}else {
		$(".cgh").html('Cliente');
		$(".cghs").html('Clientes');
	}

	$("#data-table-clientes").dataTable({
		bFilter: false,
		bScrollInfinite: true,
		bSort: false,
		bLengthChange: false,
		order: [],
		bPaginate: false,
		info: false
	});

	$("#vcedula").keyup(function(e){
		var code = e.wich || e.keyCode;
		if(code == 13){
			$.get('../sic.php?',{ced:$(this).val()})
        	.done(function(data){
        		var p = JSON.parse(data);
            	if (p['succed']) {
            		$("#vcedula").val(p['ced']);
                	$("#vnombre").val(p['nom']);
                	$("[name='tipoclie'][tipoClie="+p['tip']+"]").click();
            	}else{
            		 Materialize.toast(p['error'],4000,'red');
            	}
        	})
		}
	})

	$("#vnumdoc").keyup(function(e){
		var code = e.wich || e.keyCode;
		if(code == 13){
			$("#vnumdoc").prop('readonly',true)
			$.get('../exo.php?',{exo:$(this).val(),ced:$("#vcedula").val().replace(/-/g,'')})
        	.done(function(data){
        		var p = JSON.parse(data);
            	if (p['succed']) {
            		console.log(p)
            	}else{
            		 Materialize.toast(p['error'],4000,'red');
            	}

            	$("#vnumdoc").prop('readonly',false)
        	})
		}
	})

	$(document).on("click",".s-cliente",function(){   

		if ($("#slide-tc").length == 1)
			$(".tc-show").sideNav('destroy');

		var code = parseInt($(this).attr('num'));

		$("#slide-cliente").attr('num',code);
		$("#slide-cliente").attr('el',$(this).attr('id'));

		$(".s-cliente").sideNav('destroy');

		$(this).sideNav({
		    menuWidth: 300,
		    edge: 'right',
		    closeOnClick: true,
		    draggable: true,
		    onOpen: function(){
		        var titulo = cuerpo = '';
		        $(".subclie").addClass('hide');
		        switch(code){
		            case 1: 
		                titulo = 'Financiero';
		                $("#financiero").removeClass('hide');
		                break;
		            case 2: 
		                titulo = 'Exoneraciones';
		                $(".exoneracion .select-wrapper").css('border','0px');
		                $("#exolist").html('')
		                var exos = getDatos('id,lpad(tdoc,2,0),ndoc,inst,date_format(femision,"%Y-%m-%d"),date_format(femision,"%H:%i:%s"),exoneracion,ifnull(ffin,"N/A")',285,'idcliente = '+$("#vid").val())
		                if(exos[0].length){
		                	for (var i = 0; i < exos[0].length; i++) {
		                		$("#exolist").append('<li class="collection-item lstexo" style="cursor: pointer;">'+exos[0][i][2]+', Exo: '+exos[0][i][6]+'%, Fin: '+exos[0][i][7]+'</li>')
		                	}
		                }
		                $("#exoneracion").removeClass('hide');
		                break;
		            case 3: 
		                titulo = 'XML Otros';
		                $("#xmlotros").removeClass('hide');
		                break;
		            case 4: 
		                titulo = 'Contactos';
		                $("#contactos").removeClass('hide');
		                break;
		            default:
		                break;
		        }

		        $(".ntitc").html('<b>'+titulo+'</b>');
		        
		        Materialize.updateTextFields();
		    }
		});

		$(this).sideNav('show');

		});

	$("#addnexo").click(function(){
		$("#modal-addexo").modal('open').css('z-index',2000);
		$("#vnumdoc").focus()
	})

    $("#eslidec").click(function(e){
    	e.preventDefault();
    	if(validares()){
    		$("#slide-cliente").sideNav('hide');
    	}
    });

	$("#ingClie").click(function(){
		$("#titModal").html('Agregar '+ntext);
		$("#agClie").html('Agregar');
		$("#agClie").removeClass('edit');
		$("#agClie").addClass('add');

		deadclear('cliente');
		$("[slide-id]").attr('slide-id',0);
		$("#tipocliente").prop('checked',false).change();

	});

	$("#tipocliente").change(function(){
		if($(this).is(":checked")){
			$(".cre").removeClass('hide');
		}else{
			$(".cre").addClass('hide');
		}
	});

	$("[name='tipoclie']").click(function(){
		$("#vidtipocliente").val($(this).attr('tipoClie'));
	});


	// $("#vidpais").change(function(){
	// 	$("#prefijo").html('('+$('option:selected',this).attr('cod')+')')
	// });
	

	$(".btn-expand").click(function(){
		var estado = $(this).attr('estado');

		if (estado == 1) {
			$(".expand-2").removeClass('animated fadeOutRight');
			$(".expand-2").addClass('animated fadeInRight');
			$(".expand-2").removeClass('hide');
			$(".expand-2").addClass('col s12 m4 l3');
			$(".expand-1").removeClass('col s12 m12 l12');
			$(".expand-1").addClass('col s12 m8 l9');
			$(".btn-expand").attr('estado',0);
		}else{	
			$(".expand-2").removeClass('animated fadeInRight');
			$(".expand-2").addClass('animated fadeOutRight');
			$(".expand-2").removeClass('col s12 m4 l3');
			$(".expand-2").addClass('hide');
			$(".expand-1").removeClass('col s12 m8 l9');
			$(".expand-1").addClass('col s12 m12 l12');
			$(".btn-expand").attr('estado',1);
		}
	});

	$("#tptel").change(function(){
		var tipo = $(this).val();
		$("#htipo").val(tipo);
	});

	$("#idcanton").change(function(){
		change_load('viddistrito',10,'id,nombre','id > 0 and idcanton = '+$('option:selected',this).val());
	});

	$(".zelda").data('triforce',{vid:0,vapellido1:'',vapellido2:'',videstado:1,vidcuenta:0,vbisnacional:1,vbisproveedor:isprov,vidusuario:'',vidsucursal:'',_sid:'@@@',vcomision:0});

	var add = getParameterByName("add") //accesos
	if (add) {
		$("#ingClie").click()
	}
	
	paginate($("ul.pagination").attr('vtbl'),undefined,','+isprov+',@@impresa')
	$(".pagination").attr('filtro_sp','?,'+isprov+',@@impresa');
    permisos(1001,1010);

});

function validares(){ return false };

$(document).on("click",".lstexo",function(){
	/*$("#videxoneracion").val(exoneraciones[0][0][7])
	$("#vtipodoc").val(exoneraciones[0][0][0])
	$("#vtipodoc").material_select('update');
	$("#vnumdoc").val(exoneraciones[0][0][1]);
	$("#ventidad").val(exoneraciones[0][0][2]);
	$("#vfechaDoc").val(exoneraciones[0][0][3]);
	$("#vtimeDoc").val(exoneraciones[0][0][4]);
	$("#vporcompra").val(exoneraciones[0][0][5]);
	$("#vfechafin").val(exoneraciones[0][0][6]);*/
	$("#modal-addexo").modal('open').css('z-index',2000);
	$("#vnumdoc").focus()
	return false;
})

$(document).on("blur",".onblur",function(){
	var id = $(this).attr('id');

	if (id == 'vnombre') /*{*/
		$("#infvnombre0").html($("#vnombre").val());

	 if (id == 'vapellido1') /*{*/
	 	$("#infvapellido0").html($("#vapellido1").val()); 

	 if (id == 'vapellido2') /*{*/
	 	$("#infvapellido1").html($("#vapellido2").val());

	 if (id == 'vcedula') /*{*/
	 	$("#infcedula1").html($("#vcedula").val());

	 if (id == 'vcodigo') /*{*/
	 	$("#infcodigo6").html($("#vcodigo").val()); 

	if (id == 'vweb') /*{*/
		$("#infweb7").html($("#vweb").val());
	});

$("#correo_in").focus(function(){
	$(".icorr").css({"height": "100px", "transition": "0.5s ease"});
});
$("#correo_in").blur(function(){
	$(".icorr").css({"height": "50px", "transition": "0.5s ease"});
});
$("#telefono_in").focus(function(){
	$(".iphone").css({"height": "100px", "transition": "0.5s ease"});
});
$("#telefono_in").blur(function(){
	$(".iphone").css({"height": "50px", "transition": "0.5s ease"});
});

$(document).on("click",".chpcrr",function(){
	var id = $(this).attr('id');

	$("#schp"+id).remove();
	$("#ichp"+id).remove();
});

$("#vidprovincia").change(function(){
	var prov = $("#vidprovincia option:selected").text();
	$("#infprovincia8").html(prov);
});
$("#vidcanton").change(function(){
	var prov = $("#vidcanton option:selected").text();
	$("#infcanton9").html(prov);
});
$("#viddistrito").change(function(){
	var prov = $("#viddistrito option:selected").text();
	$("#infdistrito10").html(prov);
});
$("#vidbarrio").change(function(){
	var prov = $("#vidbarrio option:selected").text();
	$("#infbarrio12").html(prov);
});
$("#vdireccion").keyup(function(){
	var dir = $(this).val();
	$("#infdireccion11").html(dir)
});

// $(document).on("click",".vcoo",function(){
// 	var id = $(this).attr('id').substr(3);
// 	$("#correo_in").val($(this).html()).select().focus();
// 	$("#correo_in").attr('idfila',$(this).attr('id'));
// 	Materialize.updateTextFields();
// });

$(document).on("click","._tel",function(){
	var id = $(this).attr('id').substr(3);
	$("#telefono_in").val($(this).html()).select().focus();
	$("#telefono_in").attr('idfila',$(this).attr('id'));
	$("#tptel").val($(this).attr('tp'));
	$("#tptel").material_select('update');
	Materialize.updateTextFields();
});

$(document).on("click",".delcta",function(){
	tp = $(this).attr('tp');
	$("#vidcuenta").val(1);
	$("#fl"+tp).remove();
});

$(document).on("change",".cta-array",function(){
	$("#vidcuenta").val(1);
});

$(document).on("click",".load",function(){
	$("#titModal").html('Editar '+ntext);
	$("#agClie").html('Editar');

	$("#agClie").removeClass('add');
	$("#agClie").addClass('edit');

	$("[slide-id]").attr('slide-id',$(this).attr('id').substr(1));
});

$(document).on("click","#Iadd",function(){
	deadclear('clientes')
});

$(document).on("change","#vidmarca",function(){
	var id = $(this).val();
	var modelos = arr('login',6,'id,nombre',501,'id > 0 and idmarca = '+id+' and nombre <> "" order by nombre');
	$("#vidmodelo").html(modelos);
	$("select").material_select();
});

$(document).on("click",".car",function(){
	var id = $(this).attr('id').substr(1);
	$("#vidcliente").val(id);
	arr('login',6,'id,nombre',500,'id > 0 and nombre <> "" order by nombre',0,1,$("#vidmarca"));
	arr('login',6,'id,nombre',502,'id > 0 and nombre <> "" order by nombre',0,1,$("#vidtipo"));
	var tabla = $("#data-table-vehiculos").DataTable();
    tabla.destroy();
	arr('login',6,'',504,id+',""',0,1,$("#listavehiculos"));
	$("select").material_select();
	$("#data-table-vehiculos").DataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });
});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
	/*VALIDACION FRONT END*/
	var vform = "f"+vmodulo['modulo']+"s";

	switch(vmodulo['modulo']) {
		case 'cliente':
		if (vmodulo['tip'] == '') {
			err = validarclientes();
			if ( err ) {
				return err;
			}
		}
		break;
		case 'taller-vehiculo':
			if (vmodulo['tip'] == '') {
				err = validarvehiculo();
				if ( err ) {
					return err;
				}
			}
			break;
		case 'telefono':
			vform = 'slideTelefono';
			break;
		case 'ubicacione':
			vform = 'slideDireccion';
			break;	
		case 'defectocuenta':
		break;
			case 'correo':
			vform = 'slideCorreo';
		break;	
		default:
		return 'Módulo no Existente';
		break;
	}

	salida = odin(varreglo,vform);

	return salida;

}

function validarvehiculo() {
	if ( $("#vplaca").val() == '' ) { $("#vplaca").focus() ; return 'Placa Requerida'}
}

function validarclientes() {

	if ($("#vnombre").val() == '') { $('#ln1').click(); $("#vnombre").focus(); return 'El campo Nombre es requerido';  };
	if ($("#vcedula").val() == '') {	$('#ln1').click(); $("#vcedula").focus(); return 'El campo Cédula es requerida';  };
		
	if ($("#videstado").val() == '' && !isprov) { $('#ln1').click(); $("#videstado").focus(); return 'Debe Seleccionar un Estado'; }
	if ($("#vcredito").val() == '') { $("#vcredito").val(0) };
	if ($("#vplazo").val() == '') {$("#vplazo").val(0) };
	if ($("#vdescuentom").val() == '') {$("#vdescuentom").val(0) };

	var fe = getDatos('isprueba',39,'id=@@impresa',0,0,0)[0][0][0];
	if(!parseInt(fe) || !isprov){
		if(!parseInt($("#vid").val())){
			if (!$("#fcorreos .ciclos").length) { $("#slideCorreo").click(); return 'Correo Requerido'; }
		}else{
			var correos = getDatos('count(idcorreo)',17,'idtabla = 2 and idfila = '+$("#vid").val(),0,0,0);
			if (!correos[0].length) { $("#slideCorreo").click(); return 'Correo Requerido'; }
		}
	}

	if(!$("#tipocliente").is(":checked")){
		$("#vcredito").val(0);
		$("#vplazo").val(0);
	}else{
		if (isNaN($("#vcredito").val())) {
			$("#vcredito").focus();
			return 'Credito Debe ser Numérico';
		}

		if (parseFloat($("#vcredito").val()) == 0) {
			$("#vcredito").focus();
			return 'Credito Debe ser Mayor a Cero';
		}
	}

	return false;
}

		function cargar(vmodulo,vid) {
			switch(vmodulo['modulo']) {
				case 'cliente':
				vmodulo['sel'] = '';
				vmodulo['tbl'] = 31;
				vmodulo['where'] = vid;
				break;
				default:
				return 'Módulo no Existente';
				break;
			}

			return vmodulo;
		}

		function cargarSintax(modulo){
			var arr = {}
			switch(modulo) {
				case 'clientes':
					arr['sel'] = '';
					arr['tbl'] = 76;
					arr['where'] = '0,0,",'+isprov+',@@impresa","0,10"';
					arr['cambio'] = 29;
					break;
				case 'vehiculos':
					arr['sel'] = '';
					arr['tbl'] = 504;
					arr['where'] = $("#vidcliente").val();
					break;
			}
			return arr;
		}



function endDetail(vid,vacc,modulo){
	switch (modulo) {
		case 'cliente':
			thorload('cliente');
			if (vacc == 1) {
				setTimeout(function(){ deadclear('cliente');$("#videstado").val(1);$("#videstado").material_select();}, 500);
			}

			if(!isprov){
				if(parseInt($("#videxoneracion").val())){
					var ffin  = $("#vfechafin").val() == '' ? 'null' : '"'+$("#vfechafin").val()+'"';
					var tiempo = $("#vtimeDoc").val().length == 5 ? $("#vtimeDoc").val()+':00' : $("#vtimeDoc").val();

					actualizar(285,'tdoc = '+$("#vtipodoc").val()+', ndoc = "'+$("#vnumdoc").val()+'",inst = "'+$("#ventidad").val()+'", femision = "'+$("#vfechaDoc").val()+' '+tiempo+'", exoneracion = '+$("#vporcompra").val()+',ffin = '+ffin+'','id = '+$("#videxoneracion").val());
				}else{
					if($("#vporcompra").val().trim().length > 0 || parseInt($("#vtipodoc").val())){
						var tiempo = $("#vtimeDoc").val().length == 5 ? $("#vtimeDoc").val()+':00' : $("#vtimeDoc").val();
						var ffin  = $("#vfechafin").val() == '' ? 'null' : '"'+$("#vfechafin").val()+'"';
						insertar(285,'','null,'+vid[0][0]+','+$("#vtipodoc").val()+',"'+$("#vnumdoc").val()+'","'+$("#ventidad").val()+'","'+$("#vfechaDoc").val()+' '+tiempo+'",'+$("#vporcompra").val()+','+ffin+'');
					}	
				}
			}
			
			break;
		case 'taller-vehiculo':
			deadclear('taller-vehiculo');
			thorload('vehiculo');
			break
	}
	paginate($("ul.pagination").attr('vtbl'));
	$(".validate").css('border-bottom', '1px solid #9e9e9e');
	$(".validate").css('box-shadow', 'none');
}


function postload(modulo) {
	switch(modulo) {
		case 'cliente':
			var idtipo = $("#vidtipocliente").val();
			$("[tipoclie = "+idtipo+"]").prop('checked', true);

			if (parseFloat($("#vcredito").val()) != 0){
				$("#tipocliente").prop('checked',true).change();
			}else{
				$("#tipocliente").prop('checked',false).change();
			}
			
			var num = 1;
            while($("#slideTelefono").data('fila'+num) != undefined){
				$("#slideTelefono").removeData('fila'+num);
			 num++;
            }

            num = 1;
            while($("#slideCorreo").data('fila'+num) != undefined){
				$("#slideCorreo").removeData('fila'+num);
			 num++;
            }
            
		break;
	}
}

$(document).on('click','[id^=dc]',function(){
	var id = $(this).attr('id').substr(2);
})