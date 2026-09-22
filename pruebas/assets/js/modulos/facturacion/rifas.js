$(function(){
	console.log('Mod Rifas Cargado')

	$("#addRifa").click(function(){
        vaciarFormulario('modal-rifas')
        $("#rifa_title").html('Agregar Rifa')
        $("#lista_reglas_rifa").html('')
        $("#modal-rifas").modal('open')
        $("#rifa_name").focus()
    })

    $("#agRifa").click(function(){
        if(!validarById('rifa_name',1,64))
            return false
        
        if(!validarById('rifa_hasta',1,20))
            return false

        if(!$(".regla_rifa").length){
            Materialize.toast('Debe Incluir Reglas',4000,'red')
            return false
        }

        let idrifa = insertar(456,'idsucursal,idusuario,nombre,isfisico,inicio,fin','@@impresa,@@usr,"'+$("#rifa_name").val().trim()+'",'+$("#rifa_tipo").is(':checked')+',"'+$("#rifa_desde").val()+'","'+$("#rifa_hasta").val()+'"')[0][0][0]

        let rf_cantidad = 0
        let rf_base = 0
        let rf_pago = 0
        let rf_tipo = 0
        let rf_descuento = 0;
        let rf_desde = ''
        let rf_hasta = ''

        $(".regla_rifa").each(function(){ 

            rf_cantidad     = $(this).find('.cnt_cupones').val()
            rf_base         = $(this).find('.base_regla option:selected').val()
            rf_tipo         = $(this).find('.tipo_cupones option:selected').val()
            rf_pago         = $(this).find('select.tp_cupones').val()
            rf_desde        = $(this).find('.monto_cupones_desde').val()
            rf_hasta        = $(this).find('.monto_cupones_hasta').val()
            rf_descuento    = $(this).find('.rf_desc').is(':checked')

            if(rf_cantidad == 0)
                return

            if($(this).attr('vid') == '0'){//NEW
                insertar(457,'idtabla,idfila,cantidad,tipocantidad,idtipo,desde,hasta,tipoppago,aplicadescuento','456,'+idrifa+','+rf_cantidad+','+rf_base+','+rf_tipo+',"'+rf_desde+'","'+rf_hasta+'","'+rf_pago+'",'+rf_descuento)
            } 
        })

        Materialize.toast('Rifa Agregada Correctamente',4000,'green')
        cargarRifas()
        $("#modal-rifas").modal('close')
    })

	$(".mn_rifa").click(function(){
        $(".mn_rifa").removeClass('active')
        $(this).addClass('active')
        cargarRifas($(this).attr('vid'))
    })

    cargarRifas()
	loadModule('/assets/js/modulos/facturacion/','reglas')
})

$(document).on('click','.edtRifa',function(){
    let vid = $(this).parent().parent().attr('vid')
    let info_rifa = getDatos('nombre,inicio,fin,isfisico',456,'id='+vid)[0][0]
    $('#modal-rifas').attr('vid',vid)
    $("#rifa_name").val(info_rifa[0])
    $("#rifa_desde").val(info_rifa[1])
    $("#rifa_hasta").val(info_rifa[2])
    $("#rifa_tipo").prop('checked',info_rifa[3])

    $("#rifa_title").html('Editar Rifa')
    $('#modal-rifas').modal('open')
    Materialize.updateTextFields()
})

export function eliminarRifa(elem){
	let vid = elem.parent().parent().attr('vid')
    actualizar(456,'activo=0','id='+vid)
    insertar(279,'idtabla,idaccion,descripcion,usuario,fecha,idsucursal,idfila','456,3,"Rifa Eliminada",@@usr,now(),@@impresa,'+vid)
    cargarRifas()
}

export function cargarRifas(vestado=0){
    vestado = vestado == 0 ? $(".mn_rifa.active").attr('vid') : vestado

    let strLista = getDatos('id,nombre,date_format(inicio,"%d-%m-%Y"),date_format(fin,"%d-%m-%Y"),if(fin < curdate(),1,if(inicio > curdate(),3,0)) as estado',456,'idsucursal = @@impresa and id > 0 and activo = 1')
    let strsalida = ''
    let tfin = 0 
    let tini = 0
    let tact = 0
    $("#listaRifas").html('')

    $.each(strLista[0],function(i,e){
        switch(e[4]){
            case '0': //activa
                tact++
                break;
            case '1': //finish
                tfin++
                break;
            default:
                tini++
                break; 
        }
        if(e[4] != vestado)
            return

        strsalida += '<tr vid="'+e[0]+'"> <td>'+e[1]+'</td> <td>'+e[2]+'</td> <td>'+e[3]+'</td> <td> <i class="der mdi mdi-close red-text delete-row pbtn" tbl="456" id="del_rifa_'+e[0]+'" title="Eliminar Rifa"></i> <i class="der mdi mdi-pencil edtRifa pbtn" title="Editar Rifa"></i> <i class="der mdi mdi-chart-timeline-variant statsRifa pbtn" title="Estadística de Rifa"></i> </td> </tr>'
    })

    $("#listaRifas").html(strsalida)
    $("#cnt_rifas_act").html(tact)
    $("#cnt_rifas_ini").html(tini)
    $("#cnt_rifas_fin").html(tfin)
}