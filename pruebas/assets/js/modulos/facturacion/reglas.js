$(function(){
	console.log('Mod Reglas Cargado')

	$(".add_regla").click(function(){
		let base = $(this).attr('base')
        let num_regla = $("#"+base+" .regla_rifa").length+1

        $("#"+base).append(getreglarow(num_regla))

        $("#"+base+" .regla_rifa[num="+num_regla+"] .dropdown-button").dropdown();
        $("#"+base+" .regla_rifa[num="+num_regla+"] select").material_select()
        $("#"+base+" .regla_rifa[num="+num_regla+"] .dropdown-button").tooltip();
    })
})

export function addReglas(base,vtabla,vfila){
	let rf_cantidad = 0
    let rf_base = 0
    let rf_pago = 0
    let rf_tipo = 0
    let rf_descuento = 0;
    let rf_desde = ''
    let rf_hasta = ''
    
	$("#"+base+" .regla_rifa").each(function(){ 

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
            insertar(457,'idtabla,idfila,cantidad,tipocantidad,idtipo,desde,hasta,tipoppago,aplicadescuento',vtabla+','+vfila+','+rf_cantidad+','+rf_base+','+rf_tipo+',"'+rf_desde+'","'+rf_hasta+'","'+rf_pago+'",'+rf_descuento)
        } 
    })
}

export function getreglarow(num_regla,vid=0){
    return '<section class="row col s12 regla_rifa" vid="'+vid+'" num="'+num_regla+'" style="padding:0">'+
              '<div class="input-field">'+
                '<select class="prefix base_regla"> <option value="1">X</option> <option value="2">+</option> </select>'+
                '<input type="number" value="1" min="1" class="cnt_cupones col s2 eder">'+
              '</div>'+
              '<select class="col s2 tipo_cupones">'+
                '<option value="1">Rango</option>'+
                '<option value="2">Por Cada</option>'+
                '<option value="3">Cantidad</option>'+
              '</select>'+
              '<input type="text" value="0" class="numeric col s1 eder monto_cupones_desde">'+
              '<input type="text" value="0" class="numeric col s1 eder monto_cupones_hasta">'+
              '<select class="col s3 tp_cupones" multiple>'+
                '<option value="1" selected>Efectivo</option>'+
                '<option value="2">Tarjeta</option>'+
                '<option value="3">Depósito</option>'+
              '</select>'+
              '<div class="col s3">'+
                '<small>'+
                  '<input type="checkbox" id="rf_desc_'+num_regla+'" class="rf_desc"> <label for="rf_desc_'+num_regla+'">Descuentos</label>'+
                '</small>'+
                '<i class="mdi mdi-close pbtn red-text del_regla mdi-24px"></i>'+
                '<small>'+
                  '<input type="radio" name="productos_seleccionados" id="rf_psel_'+num_regla+'"> <label for="rf_psel_'+num_regla+'"></label>'+
                '</small>'+
              '</div>'+
            '</section>'
}