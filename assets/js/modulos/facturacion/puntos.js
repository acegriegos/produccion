$(function(){
	console.log('Mod Puntos por Compra Cargado')

	$("#addPuntos").click(function(){
        $("#lista_reglas_puntos").html('')
        $("#modal-puntos").modal('open')
    })

    $("#agPuntos").click(function(){
    	let vid = $("#modal-puntos").attr('vid')
    	if(vid == '0'){//AGREGAR
    		let idpunto = insertar(441,'fecha_inicio,fecha_corte,idsucursal','"'+$("#puntos_desde").val()+'","'+$("#puntos_corte").val()+'",@@impresa')[0][0][0]
    		addReglas('lista_reglas_puntos',441,idpunto)
    		Materialize.toast('Puntos Agregados Correctamente',4000,'green')
    	}else{
    		Materialize.toast('Puntos Editados Correctamente',4000,'green')
    	}
    })

    loadModule('/assets/js/modulos/facturacion/','reglas')
})