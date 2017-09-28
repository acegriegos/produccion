$(function(){

    param = getParameterByName('accion');
    param = param == '' ? 0 : parseInt(param)
    
    switch(param){
    	case 1:
    		loadRecepcion();
    		break;
        default:
            break;
    }

    $(".modal").modal();
    $("select").material_select();

    $('.datepicker').pickadate({
         labelMonthNext: 'Siguiente',
         labelMonthPrev: 'Anterior',
         labelMonthSelect: 'Seleccione un Mes',
         labelYearSelect: 'Seleccione un Año',
         monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre' ],
         monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
         weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
         weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
         weekdaysLetter: [ 'D', 'L', 'K', 'M', 'J', 'V', 'S' ],
         today: 'Hoy',
         clear: 'Limpiar',
         close: 'Cerrar'
    });

});

$(document).on('click','#addFin',function(){

	if ($(".zelda").data('triforce')['vidcliente'] != 0) {
		$(".titadd").html("Agregar Finca");
		$(".cli").hide();
		$(".prod").show();
		$("#ingresar").attr('codigo',"2");
		$("#addClie").modal('open');
	}else{
		Materialize.toast('Cliente Requerido',4000,'red');
		$("#ncli").focus();
	}
});

$(document).on('click','.addFinca',function(){
	vidFinca = getDatos('',901,'1,0,"'+$("#finca").val()+'",'+$(".zelda").data('triforce')['vidregion'],0,0);

	if (vidFinca['succed']) {
		Materialize.toast('Finca Ingresada Correctamente',4000,'green');
		$(".zelda").data('triforce')['vidFinca'] = vidFinca[0][0][0];
	}else{
		Materialize.toast(vidFinca['ERROR'],4000,'red');
		$("#finca").focus().select();
	}
});

$(document).on('click','.addRegion',function(){

	vidregion = getDatos('',905,'1,0,"'+$("#vregion").val()+'",-1*'+$("#vdistrito option:selected").val(),0,0);

	if (vidregion['succed']) {
		Materialize.toast('Región Ingresada Correctamente',4000,'green');
		$(".zelda").data('triforce')['vidFinca'] = vidregion[0][0][0];
	}else{
		Materialize.toast(vidregion['ERROR'],4000,'red');
		$("#vregion").focus().select();
	}
});

$(document).on('click','.addClie',function(){
	$(".titadd").html("Agregar Cliente");
	$(".cli").show();
	$(".prod").hide();
	$("#ingresar").attr('codigo',"1");
	$("#pais").val('Costa Rica');
	$("#pais").blur();

	var tmpname = $("#flaboratorio-explantes #ncli").val();

	$("#addClie #vnombre").val(tmpname.substring(0,tmpname.indexOf(' ')));
	tmpname = tmpname.substring(tmpname.indexOf(' ')+1);
	
	$("#addClie #vapellido1").val(tmpname.indexOf(' ') > 0 ? tmpname.substring(0,tmpname.indexOf(' ')) : tmpname);
	tmpname = tmpname.indexOf(' ') > 0 ? tmpname.substring(tmpname.indexOf(' ')+1) : '';

	$("#addClie #vapellido2").val(tmpname);
	Materialize.updateTextFields();
	$("#addClie").modal('open');
	$("#vcedula").focus();

});

function loadRecepcion(){

    $(".menu3").click(function(){
    	var id = $(this).attr('id').substr(1);
    	switch(parseInt(id)){
    		case 1:
    			arr('laboratorio',2,'',0,'',0,1,$("#labajax"));
    			cargarExplantes();
    			break;
    	}
    	
    });

    $("#m1").click();
}

function cargarExplantes(){

	var fecha = new Date();
	var dpick = $('#vfecha').pickadate()
    dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);

    $(".zelda").data('triforce',{vidcliente:0,vidfinca:0,vidregion:0,vid:0});

    $("#vnombre").val(getDatos('concat(date_format(curdate(),"%Y"),lpad(count(id)+1,4,0)) as id',900,'',0,0)[0][0][0]);

    $("#ncli").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#ncli").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'!bisproveedor and id > 0 having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
            });

            $(".autocomplete-content").css('width','25%');

        }
    });

    $("#ncli").keyup(function(e){
    	var code = e.which || e.keyCode;
    	if (code == 13)
    		$(this).blur();
    });

    $("#ncli").blur(function(){
    	if($(this).val().length <= 3)
    		$(this).val().val('');
    	else
    		cargarCliente();
    });

    $("#finca").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#finca").autocomplete({
                limit: 20,
                data: arr('login',4,'nombre as nom,null',904,'id > 0 having nom like "%'+$(this).val()+'%" and idregion = '+$(".zelda").data('triforce')['vidregion']+' limit 20',0,0,0,1)
            });

            $(".autocomplete-content").css('width','25%');

        }
    });

    $("#finca").keyup(function(e){
    	var code = e.which || e.keyCode;
    	if (code == 13){
    		$("#vdireccion").();
    	}
    });

    $("#vregion").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#vregion").autocomplete({
                limit: 20,
                data: arr('login',4,'nombre as nom,null',903,'id > 0 having nom like "%'+$(this).val()+'%" and idubicacion in(select id from developer.ubicaciones where iddistrito = '+$("#vdistrito option:selected").val()+' group by idubicacion) limit 20',0,0,0,1)
            });

            $(".autocomplete-content").css('width','25%');

        }
    });

    $("#vregion").keyup(function(e){
    	var code = e.which || e.keyCode;
    	if (code == 13){
    		var idregion = getDatos('id',903,'nombre = '+$(this).val()+' and idubicacion in(select id from developer.ubicaciones where iddistrito = '+$("#vdistrito option:selected").val()+' group by iddistrito)',0,0);

	    	if (idregion['succed'] == 0) {
	    		var $toastContent = $('<span>Región no Existente</span>').add($('<button class="btn-flat toast-action green white-text addRegion">Agregarla</button>'));
				Materialize.toast($toastContent, 10000);
	    	}else{
	    		$(".zelda").data('triforce')['vidregion'] = idregion[0][0][0];
	    		$("#finca").focus();
	    	}
    		// $(this).blur();
    	}
    });

    $("#vregion").blur(function(){
    	
    });

    $("#pais").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#pais").autocomplete({
                limit: 20,
                data: arr('login',4,'nombre as nom,bandera',209,'id > 0 having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
            });

            $(".autocomplete-content").css('width','25%');

        }
    });

    $("#pais").keyup(function(e){
    	var code = e.which || e.keyCode;
    	if (code == 13)
    		$(this).blur();
    });

    $("#pais").blur(function(){
    	cargarProvincias();
    });

    $("#provincia").change(function(){
    	cargarCantones($('option:selected',this).val());
    });

    $("#canton").change(function(){
    	cargarDistritos($('option:selected',this).val());
    });

    $("#ingresar").click(function(){
    	var validacion = validarCliente();
    	if(validacion)
    		Materialize.toast(validacion,4000,'red');
    	else{

    		switch(parseInt($(this).attr('codigo'))){
    			case 1:
    				var id  = arr('login',7,1,2,'','null,"'+$("#addClie #vapellido1").val()+'","'+$("#addClie #vapellido2").val()+'","'+$("#addClie #vnombre").val()+'","'+$("#addClie #vcedula").val()+'",'+$('[name="tipoclie"]:checked').attr('tipoclie')+',1,0,'+$("#addClie #vcategoria option:selected").val()+',0,0,1,1,"",now(),@@usr,0,""',0,0)[0][0][0];
    		
		    		arr('login',7,1,239,'','null,'+$("#addClie #vdistrito option:selected").val()+',"'+$("#addClie #vdireccion").val()+'",'+$("#addClie #vlatitud").val()+','+$("#addClie #vlongitud").val()+',2,'+id,0,0);

		    		arr('login',7,1,238,'','null,2,"'+$("#addClie #vtelefono").val()+'",2,'+id,0,0);

		    		arr('login',7,1,17,'','null,'+id+',2,"'+$("#addClie #vcorreo").val()+'"',0,0);

		    		Materialize.toast('Cliente Aregado Correctamente',4000,'green');
		    		var ncompleto = trim($("#addClie #vnombre").val()+" "+$("#addClie #vapellido1").val()+" "+$("#addClie #vapellido2").val());
		    		$("#flaboratorio-explantes #ncli").val(ncompleto+" *"+$("#addClie #vcedula").val()+"*");
		    		$("#flaboratorio-explantes #ncli").blur();
		    		$("#addClie").modal('close');
		    		break;
		    	case 2:
		    		var id = $(".zelda").data('triforce')['vidcliente'];

		    		arr('login',7,1,239,'','null,'+$("#addClie #vdistrito option:selected").val()+',"'+$("#addClie #vdireccion").val()+'",'+$("#addClie #vlatitud").val()+','+$("#addClie #vlongitud").val()+',2,'+id,0,0);
		    		cargarTblFincas();
		    		$("#addClie").modal('close');
		    		break;
    		}
    		
    	}
    });

} //END CARGAR EXPLANTES

function cargarProvincias(){
	var provincias = arr('login',4,'id,nombre',8,'idpais = (select id from developer.paises where nombre = \"'+$("#pais").val()+'\")','',0,'');
	
	$("#provincia").html('');

	var lprov = '<option value="0" disabled>Seleccione una Opción</option>';

    if (provincias['succed']) {
    	for (var i = 0; i < provincias[0].length; i++) {
    		lprov += '<option value="'+provincias[0][i][0]+'">'+provincias[0][i][1]+'</option>';
    	}
    }

    $("#provincia").append(lprov);
    $("#provincia").val(0);
    $("#provincia").material_select('update');
    
};

function cargarCantones(vidprovincia){
	var cantones = arr('login',4,'id,nombre',9,'idprovincia = '+vidprovincia,'',0,'');
	
	$("#canton").html('');

	var lprov = '<option value="0" disabled>Seleccione una Opción</option>';

    if (cantones['succed']) {
    	for (var i = 0; i < cantones[0].length; i++) {
    		lprov += '<option value="'+cantones[0][i][0]+'">'+cantones[0][i][1]+'</option>';
    	}
    }

    $("#canton").append(lprov);
    $("#canton").val(0);
    $("#canton").material_select('update');
    
};

function cargarDistritos(vidcanton){
	var distritos = arr('login',4,'id,nombre',10,'idcanton = '+vidcanton,'',0,'');
	
	$("#vdistrito").html('');

	var lprov = '<option value="0" disabled>Seleccione una Opción</option>';

    if (distritos['succed']) {
    	for (var i = 0; i < distritos[0].length; i++) {
    		lprov += '<option value="'+distritos[0][i][0]+'">'+distritos[0][i][1]+'</option>';
    	}
    }

    $("#vdistrito").append(lprov);
    $("#vdistrito").val(0);
    $("#vdistrito").material_select('update');
    
};

function cargarCliente(){
	var clie = arr('login',4,'',63,'\"'+$("#ncli").val()+'\",0','',0,'');

    if (clie[0][0][0] != 0) {
        var vclie = clie[0][0];
        
        $(".zelda").data('triforce')['vidcliente'] = vclie[0];

        $("#ncli").val(vclie[1]+' '+vclie[2]);
        cargarTblFincas();
    }else{
    	$(".zelda").data('triforce')['vidcliente'] = 0;
    	$(".zelda").data('triforce')['vidfinca'] = 0;
	 	var $toastContent = $('<span>Cliente no Existente</span>').add($('<button class="btn-flat toast-action green white-text addClie">Agregarlo</button>'));
		Materialize.toast($toastContent, 10000);
    }
}


function cargarTblFincas(){
	var fincas = getDatos('',901,$(".zelda").data('triforce')['vidcliente'],0,0);
	$("#fincas").html('');

	var lista = '<tr><td colspan="3" class="center">No Hay Datos Registrados</td></tr>';

	if(fincas['succed']){
		lista = '';
		for (var i = 0; i < fincas[0].length; i++) {
			lista += '<tr><td>'+fincas[0][i][0]+'</td><td>'+fincas[0][i][1]+'</td><td>'+fincas[0][i][2]+'</td></tr>';
		}
	}
	
	$("#fincas").append(lista);
	
}

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'laboratorio-explante':
			if (vmodulo['tip'] == '') {
				err = validarExplantes();
				if ( err ) {
					return err;
				}
			}
			
			break;
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarExplantes() {

	return false;
}

function validarCliente(){

	if ($("#ingresar").attr('codigo') == 1) {

		if ($("#addClie #vnombre").val() == '') {
			$("#addClie #vnombre").focus();
			return 'Nombre de Cliente Requerido';
		}

		if ($("#addClie #vcedula").val() == '') {
			$("#addClie #vcedula").focus();
			return 'Cédula de Cliente Requerida';
		}
	}
	

	if ($("#addClie #vdistrito option:selected").val() == 0) {
		$("#addClie #vdistrito").focus();
		return 'Distrito de Cliente Requerido';
	}

	return false;
}

function endDetail(vid,vacc,modulo){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'laboratorio-explante':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 3;
			vmodulo['where'] ='';
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	
	return vmodulo;
}

function cargarSintax(){
	var arr = {}

	arr['sel'] = '';
	arr['tbl'] = 4;
	arr['where'] = '';

	return arr;
}