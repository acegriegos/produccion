$(function(){
	
	$(".optns").click(function(){
		$("#logo").removeAttr('class')
		$("#logo").addClass('mdi '+$(this).attr('tipo')+' mdi-24px')
		$("#pormonto").focus().select()
	});

	doAjax('login',4,{sel:'*',tbl:320,where:'idsucursal=@@impresa'});

});

function doAjax(vmodulo,vaccion,varreglo){

    $.ajax({
        url: '../dashboard/'+vmodulo,
        type: 'POST',
        data: {accion: vaccion,arreglo : varreglo}
    })
    .done(function(data) {
        
       /* try {
            p = JSON.parse(data);
        }
        catch(err){
            p = data;
            console.log(p)
        }
        
        postExcecute(vid,p,vmore);*/
        console.log(data)
    })
    .fail(function(x){
        console.log(x)
    });

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