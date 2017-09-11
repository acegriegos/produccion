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

			id['where'] = "0,0,'',''";
		}

		$("#cuerpo").html(mantenimiento("usuarios",2,id));

		$('.datepicker').pickadate({
		    	selectMonths: true, // Creates a dropdown to control month
		    	selectYears: 15, // Creates a dropdown of 15 years to control year
		    	format: 'yyyy-mm-dd'
		    });
		
		// $('.timepicker').pickatime({
		//     default: 'now', // Set default time: 'now', '1:30AM', '16:30'
		//     fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
		//     twelvehour: false, // Use AM/PM or 24-hour format
		//     donetext: 'OK', // text for done-button
		//     cleartext: 'Clear', // text for clear-button
		//     canceltext: 'Cancel', // Text for cancel-button
		//     autoclose: false, // automatic close timepicker
		//     ampmclickable: true, // make AM PM clickable
		//     aftershow: function(){} //Function for after opening timepicker
		//   });

		$("#hist").click(function(){

			var vdesde = $("#desde").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd') == '' ?  '' : $("#desde").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd');
			var vhasta = $("#hasta").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd') == '' ?  '' : $("#hasta").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd');

			$("#data-table-usuariosHistorial").DataTable().destroy();

			var p = arr('login', 6, "" , 304, $("#selectper option:selected").val()+','+ $("#selectAcc option:selected").val()+',"'+ vdesde +'","'+ vhasta+'"', 0,1,$("#lista") );
			
			$("#data-table-usuariosHistorial").dataTable({

				bFilter: false,
				order : [],
				"bLengthChange": false
			}); 




		})

		if (id == 1){
			$("#data-table-usuarios").dataTable({
				bFilter :  false,
				bLengthChange : false
			});
			$("select").material_select('update');
		}else if (id == 2) {
			$("#data-table-usuariosPermisos").dataTable({
				bFilter :  false,
				bLengthChange : false
			});
			$("select").material_select();

		}else
		$("#data-table-usuariosHistorial").dataTable({
			bFilter :  false,
			bLengthChange : false,
			order : [],
		});


		$('select').material_select();
		$("select").material_select('update');
		$('.modal').modal();
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


$(document).on("blur","#vmail",function(){
	if ($(this).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)) {
		$(this).css('border-bottom','1px solid #4CAF50');
		$(this).css('box-shadow','0 1px 0 0 #4CAF50');
	}else{
		Materialize.toast('Correo no Válido',4000,'red');
		$(this).css('border-bottom','1px solid #F44336');
		$(this).css('box-shadow','0 1px 0 0 #F44336');
	}
});

$(document).on("keyup","#vmail",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		if ($(this).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)) {
			$(this).css('border-bottom','1px solid #4CAF50');
			$(this).css('box-shadow','0 1px 0 0 #4CAF50');
		}else{
			Materialize.toast('Correo no Válido',4000,'red');
			$(this).css('border-bottom','1px solid #F44336');
			$(this).css('box-shadow','0 1px 0 0 #F44336');
		}
	}
});

$(document).on("blur","#vclave",function(){
	if ($(this).val().length != 0) {
		if ($(this).val().length < 8) {
			Materialize.toast('Tamaño de Contraseña debe ser mayor a 8 dígitos', 4000, 'red');
			$(this).css('border-bottom','1px solid #F44336');
			$(this).css('box-shadow','0 1px 0 0 #F44336');
		}else{
			$(this).css('border-bottom','1px solid #4CAF50');
			$(this).css('box-shadow','0 1px 0 0 #4CAF50');
		}
	}else{
		$(this).css('border-bottom','1px solid #9e9e9e');
		$(this).css('box-shadow','none');
	}
});

$(document).on("keyup","#vclave",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		if ($(this).val().length != 0) {
			if ($(this).val().length < 8) {
				Materialize.toast('Tamaño de Contraseña debe ser mayor a 8 dígitos', 4000, 'red');
				$(this).css('border-bottom','1px solid #F44336');
				$(this).css('box-shadow','0 1px 0 0 #F44336');
			}else{
				$(this).css('border-bottom','1px solid #4CAF50');
				$(this).css('box-shadow','0 1px 0 0 #4CAF50');
			}
		}else{
			$(this).css('border-bottom','1px solid #9e9e9e');
			$(this).css('box-shadow','none');
		}
	}
});

$(document).on("blur","#clave",function(){
	if ($(this).val().length != 0) {
		if ($(this).val().length < 8) {
			Materialize.toast('Tamaño de Contraseña debe ser mayor a 8 dígitos', 4000, 'red');
			$(this).css('border-bottom','1px solid #F44336');
			$(this).css('box-shadow','0 1px 0 0 #F44336');
		}else{
			$(this).css('border-bottom','1px solid #4CAF50');
			$(this).css('box-shadow','0 1px 0 0 #4CAF50');
		}

		if ($(this).val() != $("#vclave").val()) {
			Materialize.toast('Contraseñas Deben ser Iguales', 4000, 'red');
			$(this).css('border-bottom','1px solid #F44336');
			$(this).css('box-shadow','0 1px 0 0 #F44336');
		}else{
			$(this).css('border-bottom','1px solid #4CAF50');
			$(this).css('box-shadow','0 1px 0 0 #4CAF50');
		}
	}else{
		$(this).css('border-bottom','1px solid #9e9e9e');
		$(this).css('box-shadow','none');
	}
	
});

$(document).on("keyup","#clave",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		if ($(this).val().length != 0) {
			if ($(this).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)) {
				$(this).css('border-bottom','1px solid #4CAF50');
				$(this).css('box-shadow','0 1px 0 0 #4CAF50');
			}else{
				Materialize.toast('Tamaño de Contraseña debe ser mayor a 8 dígitos',4000,'red');
				$(this).css('border-bottom','1px solid #F44336');
				$(this).css('box-shadow','0 1px 0 0 #F44336');
			}

			if ($(this).val() != $("#vclave").val()) {
				Materialize.toast('Contraseñas Deben ser Iguales', 4000, 'red');
				$(this).css('border-bottom','1px solid #F44336');
				$(this).css('box-shadow','0 1px 0 0 #F44336');
			}else{
				$(this).css('border-bottom','1px solid #4CAF50');
				$(this).css('box-shadow','0 1px 0 0 #4CAF50');
			}
		}else{
			$(this).css('border-bottom','1px solid #9e9e9e');
			$(this).css('box-shadow','none');
		}
	}
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
		$("#hist").click();
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
	console.log(salida);
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
	if ($("#vcorreo").val() == '') {
		$("#vcorreo").focus();
		return 'Correo Requerido';
	}
	if ($('#vidTipoUsuario option:selected').val() == 0) {
		$('#vidTipoUsuario').focus();
		return 'Tipo de Usuario Requerido';
	}
	if ($('#vidsuc').val() == 0) {
		$('#vidsuc').focus();
		return 'Seleccione una Sucursal';
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
		vmodulo['sel'] = 'id as vid,user as vuser,cedula as vcedula,nombre as vnombre,idTipoUsuario as vidTipoUsuario,mail as vmail,limite1 as vlimite,limite2 as vlimite2,aes_decrypt(clave,"lt2016") as vclave,aes_decrypt(clave,"lt2016") as clave,idsucursal as vidsuc';
		vmodulo['tbl'] = 1;
		vmodulo['where'] = 'id = "'+vid+'"';
		$("#vuser").focus();
		$("#vuser").select();
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

	function endDetail(id,acc,modulo) {

		switch(modulo){
			case 'usuario':
			var msj = '<div align="center"><b>Bienvenido al Sistema BMS de Logintech S.A</b></div><hr><b>Nombre del Usuario: </b>'+$("#vnombre").val()+'<br><b>Usuario: </b>'+$("#vuser").val()+'<br><b>Contraseña del Usuario: </b>'+$("#vclave").val()+' <br><small style="font-style: italic; bottom:0px;">Mensaje AutoGenerado por el Sistema Favor no Responder"</small>';
			if (acc == 1)			
				enviarCorreo(1,$("#vmail").val(),'Bienvenido '+$("#vnombre").val(),msj,'');
			
			deadclear(modulo);
			thorload(modulo);
			break
		}

	}

	function postload(modulo) {

	}