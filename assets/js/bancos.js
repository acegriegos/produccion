$(function(){
	let fecha = now();
	$(".fch").val(fecha);

	if(getParameterByName('dev') == '1'){
		$(".filtros_old").addClass('hide')
		$(".filtros_new").removeClass('hide')
	}

	getLista();
	getConciliadas();

	$(".fch").change(function(){
		getConciliadas();
	});

	$("#doact").click(function(){
		let banco = $('#idbanco option:selected').val();
		let fechat = $('#ftrans').val();
		let data = $('#ebancos').val();

		if(banco == '0'){
			Materialize.toast('Banco Requerido',4000,'red')
			$('#idbanco').focus()
			return false;
		}

		if(data == ''){
			Materialize.toast('Transferencia Requerida',4000,'red')
			$('#ebancos').focus()
			return false;
		}

		if(fechat == ''){
			Materialize.toast('Fecha Requerida',4000,'red')
			$('#ftrans').focus()
			return false;
		}

		let idmixto = 0;
		let _monto = 0;
		if($("#tmsj").html() == ''){
			console.log(actualizar(64,'idestado=4,idtipopago = if(idtipopago=5,5,3),extra="'+data+'"','id='+$("#modal-datos").attr('vid')));
			_monto = $("#ttrans").val().replace(/,/g,'');
		}

		//console.log(insertar(267,'','null,"'+fechat+'",@@usr,@@impresa,'+$("#modal-datos").attr('vid')+','+banco+','+idmixto+',now(),'+_monto))
		insertar(336,'','null,'+$("#modal-datos").attr('vid')+',3,"'+data+'",+'+$("#ttrans").val().replace(/,/g,'')+',0,0,now(),'+banco+',"'+fechat+'",@@usr,@@impresa,0,null,0')

		$("#modal-datos").attr('vid',0)
		$("#modal-datos").modal('close');
		Materialize.toast('Datos Ingresados Correctamente',4000,'green')
		getLista()
		getConciliadas()
	});

	$("#ttrans").blur(function(){
		$("#tmsj").html('')
		let valor = parseFloat($(this).val().replace(/,/g,''))
		let monto = parseFloat($("#modal-datos").attr('monto'))

		if(valor < monto){
			$("#tmsj").html('Se Guardará Como Abono')
		}else if(valor > monto){
			$(this).val(monto.formatMoney(2,'.',','))
			Materialize.toast("Valor no Puede ser Superior al Monto de Factura",4000,'red');
		}
	});

	$("#tfecha").change(function(){
		getConciliadas()
	});

	$("#drefresh").click(function(){
		getConciliadas()
	})
	
});

$(document).on('click','.shinfo',function(){
	$("#doact").addClass('hide')
	$("#modal-datos").modal('open')
	let _vid = $(this).parent().attr('idp');
	
	$.post('bancos.php',{accion:3,vid:_vid }).done(function(res){
		try{
			res = JSON.parse(res);
		}
		catch(e){
			console.log(e)
			return false;
		}
		console.log(res)
		$('#idbanco').val(res[0][0]).material_select('update');
		$('#ftrans').val(res[0][2]);
		$('#ebancos').val(res[0][1]);
		$("#ttrans").val(parseFloat(res[0][3]).formatMoney(2,'.',','))
	});
});

$(document).on('click','.deltrans',function(){

	if ($(this).attr('cnt') == undefined) {
	if(!$("#_DEL").length){
	    var id = $(this).parent().parent().attr('idp')
	    $(this).attr('mbg',$(this).parent().parent().css('background-color'));
	    var $toastContent = $('<span id="_DEL" >Desea Eliminar Este Registro? </span>').add($('<a class="btn red" style="margin:2px" id="deldef_pago" inid="'+id+'">Elminar</a> <a class="btn btn-default" id="delcan_pago" inid="'+id+'">Cancelar</a>'));
	    Materialize.toast($toastContent,10000,'',function(){if($("#"+id) != undefined) $("#"+id).parent().parent().css('background-color',$("#"+id).attr('mbg'))});
	    $(this).parent().parent().css('background-color','#ed5249');
	}
	}else{
	   	actualizar(336,'anulada=now(),idusuario_anular=@@usr','id='+$(this).parent().parent().attr('idp'));
	   	actualizar(64,'idestado=1,idtipopago=1','id='+$(this).parent().parent().attr('vid'))
	   	getLista()
	}
	//
})

$(document).on("click","#deldef_pago",function(){
    var id = $(this).attr("inid");
    $(this).attr('disabled',true)
    $(this).parent().remove();
    $('tr[idp='+id+']').find('.deltrans').attr('cnt',1);
    $('tr[idp='+id+']').find('.deltrans').click();
});

$(document).on("click","#delcan_pago",function(){
    var id = $(this).attr("inid");
    $('tr[idp='+id+']').parent().parent().css('background-color',$("#"+id).attr('mbg'));
    $(this).parent().remove();
});

$(document).on('click','._open',function(){
	let padre = $(this).parent();
	let id = padre.attr('vid');
	let monto = padre.find('.monto').html();
	$("#doact").removeClass('hide')
	$("#modal-datos").modal('open')
	$("#modal-datos").attr('vid',id);
	$("#modal-datos").attr('monto',monto.replace(/,/g,''));
	$("#ttrans").val(monto)
	$("#numfact").html($(this).html())
	$("#tmsj").html('')
})

function getLista(){
	$.post('bancos.php',{accion:1}).done(function(res){
		let lista_str = ''
		try{
			res = JSON.parse(res);
		}
		catch(e){
			console.log(e)
			return false;
		}

		let cont =0;
		$.each(res,function(i,e){
			lista_str += '<tr vid="'+e[0]+'"> <td style="cursor:pointer;" class="_open">'+e[3]+'</td> <td>'+e[2]+'</td> <td>'+e[5]+'</td> <td style="text-align:right" class="monto">'+parseFloat(e[6]).formatMoney(2,'.',',')+'</td> </td> </tr>';
			cont++;
		});
		$("#csc").html(cont)

		if(lista_str == '')
			lista_str = '<tr> <td colspan="100%">No Hay Datos</td> </tr>';

		$("#listafacturas").html(lista_str)
	})
}

function getConciliadas(){
	let _tfecha = $("#tfecha").is(':checked') ? 1 : 0;
	$.post('bancos.php',{accion:2,desde:$("#fch").val(),hasta:$("#fch1").val(),tfecha:_tfecha}).done(function(res){
		let lista_str = '';
		let lista_spe = '';
		let lista_u = '';

		try{
			res = JSON.parse(res);
		}
		catch(e){
			console.log(e)
			return false;
		}

		$.each(res,function(i,e){
			lista_u = '<tr vid="'+e[0]+'" idp="'+e[5]+'" idm="'+e[6]+'">    <td style="margin-bottom: 0;padding-bottom: 0;cursor:pointer;" class="shinfo">'+e[1]+'</td>  <td style="margin-bottom: 0;padding-bottom: 0;text-align:right">'+parseFloat(e[2]).formatMoney(2,'.',',')+' <i class="mdi pbtn mdi-close red-text deltrans pbtn"></i></td> </tr> <tr> <td colspan="2" style="padding: 0;margin: 0">'+e[3]+'</td> </tr>';

			if(e[4] == '8')
				lista_spe += lista_u;
			else
				lista_str += lista_u;
		});

		if(lista_str == '')
			lista_str = '<tr> <td colspan="100%">No Hay Datos</td> </tr>';

		if(lista_spe == '')
			lista_spe = '<tr> <td colspan="100%">No Hay Datos</td> </tr>';

		$("#listaconciliadas").html(lista_str)
		$("#listaconciliadas1").html(lista_spe)
	})

}