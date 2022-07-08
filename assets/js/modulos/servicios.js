$(function(){
	
	$(".optns").click(function(){
		$("#logo").removeAttr('class')
		$("#logo").addClass('mdi '+$(this).attr('tipo')+' mdi-24px')
		$("#pormonto").focus().select()
	});

	doAjax('login',4,{sel:'',tbl:357,where:'6,0,0,0'},cargarLista,$('#init'));

});

function doAjax(vmodulo,vaccion,varreglo,vid,elem){

	if(elem != undefined){
		elem.html('<i class="mdi mdi-refresh mdi-48px center mdi-spin" style="color: green"></i><br><small>Cargando Datos</small>') 
	}

	setTimeout(function() {
	    $.ajax({
	        url: '../dashboard/'+vmodulo,
	        type: 'POST',
	        data: {accion: vaccion,arreglo : varreglo}
	    })
	    .done(function(data) {
	        let p;

	       	try {
	            p = JSON.parse(data);
	        }
	        catch(err){
	            p = data;
	        }
	        if(p.succed == '0')
	        	console.log('ERROR: '+p)
	        else{
	        	vid(p[0]);
	        }
	    })
	    .fail(function(x){
	        console.log('FALLO AJAX: '+x)
	    });
	},500)

}

function cath_error(vid, msj){
	$('#bservicios').html('<span class="re center">'+msj+'</span>')
}

function cargarLista(p){
	lista = '';
	
	if(p.length)
		p.forEach(function(v){
			lista += '<tr>'+
						'<td>'+v[1]+'</td>'+
						'<td>'+v[2]+'</td>'+
						'<td>'+v[3]+'</td>'+
						'<td>'+v[4]+'</td>'+
						'<td> <i class="mdi mdi-pencil mdi-24px eserv" rid="'+v[0]+'"></i></td>'+
					 '</tr>';
		})
	else
		lista = '<tr><td colspan="100%" class="center">No hay Datos</td></tr>';

	$("#bservicios").html(lista);
}

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'servicios':
			if (vmodulo['tip'] == '') {
				err = validarservicios();
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

function validarservicios() {


	return false;
}

function endDetail(vid,vacc,modulo){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'servicios':
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