$(function(){
	$('select').material_select();
		
	$("#fusuarios").submit(function(){
		return false;
	});

	$("#data-table-usuarios").dataTable({
		bFilter :  false,
        bLengthChange : false
	});

	$("#spas").mousedown(function(){
		$("#vclave").attr('type',"text")
		$("#clave").attr('type',"text")
	});

	$("#spas").mouseup(function(){
		$("#vclave").attr('type',"password")
		$("#clave").attr('type',"password")
	});

	$(".menu2").click(function(){
		var id = $(this).attr('id').substr(1);
		$(".menu2").removeClass("active");
		$("#m"+id).addClass("active");

		if (id == 3){
			id = {}
			id['id'] = 1;
			id['where'] = "f1 = curdate()"
		}
		$("#cuerpo").html(mantenimiento("usuarios",2,id));
		if (id == 1){
			$("#data-table-usuarios").dataTable({
				bFilter :  false,
        		bLengthChange : false
			});
			$("select").material_select('update');
		}
		else if (id == 2)
			$("#data-table-usuariosPermisos").dataTable({
				bFilter :  false,
				bLengthChange : false
			});
		else
			$("#data-table-usuariosHistorial").dataTable({
				bFilter :  false,
				bLengthChange : false
			});
	});

	$("#back").click(function(){
		$("#userSubmit").removeClass('btn-info');
		$("#userSubmit").removeClass('edit');
		$("#userSubmit").addClass('btn-success');
		$("#userSubmit").addClass('add');
		$("#userSubmit").attr('title','Agregar Usuario');
		$(this).hide();
		deadclear('usuario');
		$("#vnombre").focus();
	});

	$("#sendMail").submit(function(){
		var arr = {}
		arr['sel'] = 'nombre';
		arr['tbl'] = 2;
		arr['where'] = 'id = \"@@usr\"';
		
		p = mantenimiento('login',4,arr);
		var msj = $("#content").val()+' <br><small style="font-style: italic;">Mensaje Enviado Por '+p[0][0][0]+"</small>";
		
		enviarCorreo(1,$("#to").val(),$("#subject").val(),msj,'');

		return false;
	});

	$("#m1").click();

});

$(document).on('change','#selectUser',function(){
		var opcion = $(this).val();
        if(opcion != 0){
           ajaxUsuarios(opcion,0)
        }

        $('#selectType').val(0)
});

$(document).on('blur',"#inUsuer",function(){
	name = $(this).val().toString().toLowerCase();
	apellido = name.substr(name.indexOf(' ')+1);
	$("#coUsuer").val( name.substr(0,1)+apellido.substr(0,apellido.indexOf(" ")))
});

$(document).on('change','#selectUserH',function(){
	var opcion = $(this).val();
	var tabla = $("#data-table-usuariosHistorial").DataTable();
    tabla.destroy();

	$("#lista").html('')
	if(opcion != 0){
		var arr = {}
		
		arr['id'] = 2;
		arr['where'] = 'id_user = \"'+opcion+'\"';
	   $("#lista").html(mantenimiento("usuarios",2,arr));
	}else{
		var arr = {}
		
		arr['id'] = 2;
		arr['where'] = 'f1 = curdate()';
	   $("#lista").html(mantenimiento("usuarios",2,arr));
	}

	$("#data-table-usuariosHistorial").dataTable()
});

$(document).on('change','#selectType',function(){
	var opcion = $(this).val();
    if(opcion != 0){
        ajaxUsuarios(opcion,1)
    }
    $('#selectUser').val(0)
 });

// $(document).on('change','#selectUserH',function(){
// 	var opcion = $(this).val();
// 	$("#lista").html('')

// 	if(opcion == 0)
// 		$("#lista").html('')
// });

$(document).on('click','.correo',function(){
	var id = $(this).attr('id').substr(1)
	var arr = {}
	
	arr['sel'] = 'nombre,mail';
	arr['tbl'] = 2;
	arr['where'] = 'id = \"'+id+'\"';

	p = mantenimiento('login',4,arr);

	$("#corTit").html("Enviar Correo a "+p[0][0][0]);
	$("#to").val(p[0][0][1]);

	var arr = {}
	$("#subject").val('');
	$('#content').val('');
	
 });

$(document).on('click','.cargar',function(){
	$("#userSubmit").removeClass('add');
	$("#userSubmit").addClass('edit');
	$("#userSubmit").removeClass('blue');
	$("#userSubmit").addClass('green');
	$("#userSubmit").attr('title','Actualizar Usuario');
});

function validar (varreglo,vmodulo) {
	var salida = {}

	/*VALIDACION FRONT END*/

	// if (vmodulo['tip'] == '') {
	// 			err = validarformularios();
	// 			if ( err ) {
	// 				return err;
	// 			}
	// 		}

	switch(vmodulo['modulo']) {
		case 'usuario':
			if (vmodulo['tip'] == '') {
				err = validarusuarios();
				if ( err ) {
					return err;
				}
			}else{
				$("#vlimite").val('08:00');
				$("#vlimite2").val('15:00')
			}
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	
	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	
	return salida;

}

function validarusuarios() {

	if ($('#vuser').val() == '') {
		$('#vuser').focus();
		return 'Nombre de Usuario Requerido';
	}
	if ($('#vnombre').val() == '') {
		$('#vnombre').focus();
		return 'Nombre Requerido';
	}
	if ($('#vcedula').val() == '') {
		$('#vcedula').focus();
		return 'Cédula Requerida';
	}
	if ($('#vidTipoUsuario option:selected').val() == 0) {
		$('#vidTipoUsuario').focus();
		return 'Tipo de Usuario Requerido';
	}
	if ($('#vclave').val() == '') {
		$('#vclave').focus();
		return 'Contraseña Requerida';
	}else if($('#vclave').val().length < 8){
		$('#vclave').focus();
		return 'Tamaño de Contraseña no Válido';
	}

	if ($('#clave').val() == '') {
		$('#clave').focus();
		return 'Contraseña Requerida';
	}else if($('#clave').val().length < 8){
		$('#clave').focus();
		return 'Tamaño de Contraseña no Válido';
	}else if($('#clave').val() != $('#vclave').val()){
		$('#clave').focus();
		return 'Contraseñas Deben ser Iguales';
	}
	if ($('#vidTipoUsuario option:selected').val() != 1) {
		if ($('#vlimite').val() == '') {
			$('#vlimite').focus();
			return 'Hora de Entrada Requerida';
		}

		if ($('#vlimite2').val() == '') {
			$('#vlimite2').focus();
			return 'Hora de Salida Requerida';
		}
	}else{
		$('#vlimite').val('00:00')
		$('#vlimite2').val('00:00')
	}
}

function cargar(vmodulo,vid) {

	switch(vmodulo['modulo']) {
		case 'usuario':
			vmodulo['sel'] = 'id as vid,user as vuser,cedula as vcedula,nombre as vnombre,idTipoUsuario as vidTipoUsuario,mail as vmail,limite1 as vlimite,limite2 as vlimite2,aes_decrypt(clave,"lt2016") as vclave, aes_decrypt(clave,"lt2016") as clave,idsucursal as vidsucursal';
			vmodulo['tbl'] = 1;
			vmodulo['where'] = 'id = "'+vid+'"';
			$("#vid").focus();
			break;
		default:
			return 'Módulo no Existente'//.vmodulo['modulo'];
			break;
	}
	
	return vmodulo;
}

function cargarSintax(){
	var arr = {}

	arr['sel'] = 'Id,Usuario,Nombre,Cedula,Correo,`Tipo Usuario`,`Hora Entrada`,`Hora Salida`';
	arr['tbl'] = 7;
	arr['where'] = 'Id > 0';

	return arr;
}

function ajaxUsuarios(opcion,tipo){
    	
		var arr = {}
    	if (tipo != 1){
    		arr['tbl'] = 9;
    		arr['where'] = 'id_user = \"'+opcion+'\"';
    	}
    	else{
    		arr['tbl'] = 10;
    		arr['where'] = 'id_tipo = '+opcion;
    	}
    		
		arr['sel'] = '*';

		p = mantenimiento("login",4,arr);	
    	
    	var pg = '';
    	

        $('#data-table-usuariosPermisos').dataTable().fnDestroy();
        $('#lista').html('');
        
        for (var i = 0; i < p[0].length; i++) {
        	pg +=
	        '<tr>'+
	        	'<td> '+p[0][i][2]+' </td>'+
	        	'<td align="center">'+
					'<div class="radio">'+
						'<label>'+
						'<input type="radio" name="row'+i+'"';

			if (p[0][i][3] == 1)
				pg += ' checked="checked"';
							
			pg += ' onclick="cambiar('+p[0][i][5]+',1,'+tipo+')"></label>'+
						'</div>'+
					'</td>'+
					'<td align="center">'+
					'<div class="radio">'+
						'<label>'+
						'<input type="radio" name="row'+i+'"';

			if (p[0][i][3] == 2)
				pg += ' checked="checked"';
							
			pg += ' onclick="cambiar('+p[0][i][5]+',2,'+tipo+')"></label>'+
						'</div>'+
					'</td>'+
					'<td align="center">'+
					'<div class="radio">'+
						'<label>'+
						'<input type="radio" name="row'+i+'"';

			if (p[0][i][3] == 3)
				pg += ' checked="checked"';
							
			pg += ' onclick="cambiar('+p[0][i][5]+',3,'+tipo+')"></label>'+
						'</div>'+
					'</td>'+		
		        '</tr>';
		}

		$('#lista').html($('#lista').html() + pg);

        $('#data-table-usuariosPermisos').dataTable();
}

function cambiar(x1,x2,x3){
	var arr = {}
	arr['id'] = x1;
	arr['tipo'] = x3;
	arr['permiso'] = x2;
	mantenimiento("usuarios",3,arr);
}