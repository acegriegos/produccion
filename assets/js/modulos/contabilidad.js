var ftr = 1;
var gop = '<option value="0">N/A</option>';
var intervarl1 = null;
var op1 = 0;
var op2 = 2;
var vdate1 = ''
vdate2 = '';

$(function(){
	$(".menu3").click(function(){
		var id = parseInt($(this).attr('id').substr(1));
		$(".menu3").removeClass('active');
		$(this).addClass('active')
		
		$("#mcontabilidad").html(mantenimiento("contabilidad",id,''));

		switch(id){
			case 1:			
				$("[modulo=scontabilidad]").attr('max',$("[cod]").length / 2);
				break;
			case 2:
				cargarTransacciones();
				$('#fn1').click();
				break;
		}

		$('select').material_select();
		$('.modal').modal();
		$('.dropdown-button').dropdown();

	});
	
	$('select').material_select();

	var cuentas = getParameterByName("cuentas") //accesos
	var realizar = getParameterByName("realizar")
	var ver = getParameterByName("ver")

	if (cuentas) {
		$("#m1").click();
	}else if (realizar) {
		$("#m2").click();
	}else if (ver) {
		$("#mcontabilidad").html(mantenimiento("contabilidad",2,''));
		$('#fn2').click();
		$('#ftransacciones').hide();
	}else
		$("#m1").click(); 

});

$(document).on('change','#continuo',function(){
	if ($(this).is(':checked'))
		$('#vispadre').val(1)
	else
		$('#vispadre').val(0)
});

$(document).on("click",".view-cuenta",function(){
	var id = $(this).attr('id').substr(1);
	arr('login',6,'',71,op1+","+id+","+op2+',"'+vdate1+'","'+vdate2+'"',71,1,$(".colDetalle"));
	
	var titulo = "Movimiento ";
	switch(op2){
		case 1:
		titulo += "Diario ";
		break;
		case 2:
		titulo += "Mensual ";
		break;
		case 3:
		titulo += "Semanal ";
		break;
		case 4:
		titulo += "Período Fiscal ";
		break;
		case 5:
		titulo += "Fecha "+vdate1+" ";
		break;
		case 6:
		titulo += "Desde: "+vdate1+" - Hasta: "+vdate2+" ";
		break;
	}
	titulo += " en la Cuenta "+$("#n"+id).html();
	$(".cta-sh-tit").html(titulo);

});

$(document).on("click",".numTransacc",function(){
	/*arr('login',4,'',53,"'',1",33,1,$("#vcuentas"));
	clearInterval(interval1); */
});

$(document).on("click","#refresh",function(){
	arr('login',6,'',53,"'',1",33,1,$("#vcuentas"));
	clearInterval(interval1); 
});

$(document).on("click","#refresh4ever",function(){
	interval1 = setInterval(function(){ arr('login',6,'',53,"'',1",33,1,$("#vcuentas")); }, 1500);
});

$(document).on("click",".vfiltros",function(){
	var id = parseInt($(this).attr('filtro').substr(1))
	var elemento = $("#vbusqueda");
	switch(id){
		case 1:
		elemento.attr("placeholder","Número / Descripción");
		elemento.focus();
		break;
		default:
		elemento.attr("placeholder",$(this).html());
		elemento.focus();
		break;
	}
	ftr = id;
});

$(document).on("keyup","#vdescripcion",function(e){
	var code = e.which || e.keyCode;
	if(code == 13){
		$('#fdetalletransacciones tr td input[type=text]').first().focus()
	}
});

$(document).on("click","#addnline",function(e){
	var id = parseInt($('#fdetalletransacciones tr').last().attr('id').substr(1))+1;

	$('#fdetalletransacciones').append(getFila(id));

	$("#f"+id).data('triforce',{vaccion:0,vid:0, vidtransaccion:'?',vdebe:0, vhaber:0, vfila:0, vtabla:0,vidcuenta : 0});
});

$(document).on("keyup",".tdtext",function(e){
	var code = e.which || e.keyCode;

	if(code == 13){
		
		if(!$(this).val().length && $(this).attr('id').substr(0,1) == 'c')
			$("#d"+$(this).attr('id').substr(1)).focus();
		var id = parseInt($(this).attr('id').substr(1));
		var spec = $(this).attr('id').substring(0,3);
		
		switch(spec){
			case 'vsd':
			id = parseInt($(this).attr('id').substr(6));
			if($(this).val() == '0.00' || isNaN($(this).val().replace(/,/g,'')) ){
				$(this).val('');
				$('#vshaber'+id).val('0.00');
				$('#vshaber'+id).focus().select();
			}else{
				$('#vshaber'+id).val('0.00');
				$('#c'+(id+1)).focus();
				$("#f"+id).data('triforce')['vdebe'] = $(this).val().replace(/,/g,'')
			}
			totalizar();
			if($(".tdtext").length/4 == parseInt(id))
				$("#addnline").click()
			break;
			case 'vsh':
			id = parseInt($(this).attr('id').substr(7));

			if($(this).val() == '0.00' || isNaN($(this).val().replace(/,/g,'')) ){
				$(this).val('');
				$('#vsdebe'+id).val('0.00');
				$('#vsdebe'+id).select();
				$('#vsdebe'+id).focus();
			}else{
				$('#vsdebe'+id).val('0.00');
				$('#c'+(id+1)).focus();
				$("#f"+id).data('triforce')['vhaber'] = $(this).val().replace(/,/g,'')
			}
			totalizar();
			if($(".tdtext").length/4 == parseInt(id))
				$("#addnline").click()
			break;
			default:
				var rs = arr('login',4,'',53,'"'+$(this).val()+'",1','',0,'')

				rs = rs[0][0];
				if(rs != undefined && $(this).val() != ''){
					var repetido = 0;

					$("#f"+id).data('triforce')['vidcuenta'] = rs[3]
					$('#fdetalletransacciones tr').each(function(){
						if($(this).attr('st') == 1 && rs[0] == $('#c'+id).val())
							repetido = 1;
					});

					if(!repetido){
						$('#c'+id).val(rs[0])
						$('#d'+id).val(rs[1])
						if(!$('#vsdebe'+id).val().length)
							$('#vsdebe'+id).val('0.00');
						$('#f'+id).attr('st',1)
					}

					$('#vsdebe'+id).focus().select();
				}else{
					$(this).focus().select();
					$('#vsdebe'+id).val('');
					$('#vshaber'+id).val('');
					$('#f'+id).attr('st',0)
					$('#vidcuenta'+id).val(0)
					Materialize.toast('Cuenta no Válida',4000,'red');
				}
			break;
		}
	}        
});



$(document).on("click",".func",function(){
	var id = parseInt($(this).attr('fn').substr(1))
	$(".sub-tran").hide();
	$("#t"+id).show();

	switch(id){
		case 1:
		$('#fdetalletransacciones').html('');
		var rs = arr('login',4,'id,nombre',55,"",'',0,'')[0];

		for (var i = 0; i < rs.length; i++) {
			gop += '<option value="'+rs[i][0]+'">'+rs[i][1]+'</option>';
		}

		for (var i = 1; i < 7; i++) {
			$('#fdetalletransacciones').append(getFila(i))

			$("#f"+i).data('triforce',{vaccion:0,vid:0, vidtransaccion:'?',vdebe:0, vhaber:0, vfila:0, vtabla:0,vidcuenta : 0});
		}

		$('#suc1').hide();
		$('#totDebe').html('');
		$('#totHber').html('');
		$('#ftransacciones').find('#vdescripcion').val('')
		$('#ftransacciones').find('#vdescripcion').focus()
		break;

		default:
		break;
	}	
});

$(document).on("click",".dettran",function(){
	var num = parseInt($(this).html());
	var dtran = arr('login',4,'',207,num,0,0,0)[0];
	$("#dtranN").html(' '+dtran[0][0]);
	$("#dtranF").html(' '+dtran[0][1]);
	refbtn = '';
	if(parseFloat(dtran[0][7]) != 0)
		refbtn = '<a class="btn button-collapse detextra truncate white-text col s4" data-activates="extra" fila="'+dtran[0][7]+'" tabla="'+dtran[0][10]+'" style="max-width:30%; margin-left:1%;">VER RECIBO</a>';
	$("#dtranD").html(dtran[0][2]+' <section>'+refbtn+' <a class="btn col s4 easiento" style="max-width:30%; margin-left:1%;">EDITAR</a> <a class="btn col s4 eout" style="max-width:30%; margin-left:1%;">SALIR</a></section>');
	$("#dtranE").html(' '+dtran[0][9]);
	$("#dtranU").html(' '+dtran[0][8]);

	var tdebe = thaber = debe = haber = 0;
	$("#dtranDet").html('');
	$.each(dtran,function(e,val){
		debe = parseFloat(val[5]);
		haber = parseFloat(val[6]);
		$("#dtranDet").append('<div class="row"><div class="col s2 m3 truncate" align="center" style="border-bottom: 1px solid #DEDEDE; font-size: 1em; margin: 0; height: 1.9em;text-align: left;" title="'+val[3]+'">'+val[3]+'</div><div class="col s4 m3 truncate" align="center" style="border-bottom: 1px solid #DEDEDE; font-size: 1em; margin: 0; height: 1.9em;text-align: right">'+val[4]+'</div><div class="col s3 truncate" align="center" style="border-bottom: 1px solid #DEDEDE; font-size: 1em; margin: 0; height: 1.9em; text-align: right">'+debe.formatMoney(2,'.',',')+'</div><div class="col s3 truncate" align="center" style="border-bottom: 1px solid #DEDEDE;text-align: right; font-size: 1em; margin: 0;  height: 1.9em;">'+haber.formatMoney(2,'.',',')+'</div></div>');
		tdebe += debe;
		thaber += haber;
	});

	$("#tdebe").html(tdebe.formatMoney(2,'.',','));
	$("#thaber").html(thaber.formatMoney(2,'.',','));

	if(tdebe == thaber)
		$(".tdettran").css('color','green');
	else
		$(".tdettran").css('color','red');

	$(this).sideNav({
			menuWidth: 500,
            edge: 'left', // Choose the horizontal origin
            closeOnClick: false// Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
    );
    $(this).sideNav('show');
});

$(document).on("click",".eout",function(){
	$("#transacciones").sideNav('hide')
});

$(document).on("click",".ecuenta",function(){
	
});


$(document).on("keyup","#vbusqueda",function(e){
	var code = e.which || e.keyCode
	if (code == 13) {
		arr('login',6,'',53,"'"+$(this).val()+"',"+ftr,33,1,$("#vcuentas"));
	}
});


function cargarTransacciones(){

	$(".zelda").data('triforce',{vid:0,vidfila:0,vidtabla:0,vidusuario:'',vidsucursal:''})

	var fecha = new Date();
	$('#vfecha').val(fecha.getFullYear()+'-'+("0"+(fecha.getMonth()+1)).slice(-2)+'-'+("0"+fecha.getDate()).slice(-2));

	 $(document).on('keydown','.autocomplete',function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        var obj = $(this);

        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $(this).autocomplete({
                limit: 20,
                data: getDatos('nombre,null',36,'id > 0 and !ispadre having nombre like "%'+$(this).val()+'%" limit 10',0,0,1)/*,
                onAutocomplete:function(val){
            		var e = jQuery.Event("keyup");
            		e.which = 13;
            		obj.trigger(e);
            		//$('#vsdebe'+obj.attr('id').substr(1)).select().focus();
                }*/
            });

            $(".autocomplete-content").css('width','30%');
            $(".autocomplete-content").css('position','absolute');

        }
	});
}

function totalizar(){
	var vdebe = vhaber = 0;

	$('#fdetalletransacciones tr').each(function(){
		if($(this).attr('st') == 1){
			var id = $(this).attr('id').substr(1);
			vdebe += isNaN($('#vsdebe'+id).val().replace(/,/g,'')) ? 0 : parseFloat($('#vsdebe'+id).val().replace(/,/g,''));
			vhaber += isNaN($('#vshaber'+id).val().replace(/,/g,'')) ? 0 : parseFloat($('#vshaber'+id).val().replace(/,/g,''));
		}
	});

	$('#totDebe').html(vdebe.formatMoney(2,'.',','));
	$('#totHber').html(vhaber.formatMoney(2,'.',','));
}

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
	/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'transaccione':
		if (vmodulo['tip'] == '') {
			err = validartransacciones();
			if ( err ) {
				return err;
			}
		}

		break;
		case 'detalletransaccione':
		if (vmodulo['tip'] == '') {
			err = validardetalletransacciones();
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

function endDetail(vid,acc,mod) {
	window.open('contabilidad?accion=3&tp=0&id='+vid[0][0]);
	setTimeout(function(){ $('#fn1').click(); }, 2000);
	return false;
}

function validardetalletransacciones() {
	$('#fdetalletransacciones tr').each(function(){
		if($(this).data('triforce')['vidcuenta'] != ''){
			var id = $(this).attr('id').substr(1);
			$(this).data('triforce')['vidodt'] = 0;
			$(this).data('triforce')['vcomentario'] = $("#vcomentario"+id).val();
			$(this).addClass('ciclos');
		}
	});
	return false;
};

function validartransacciones() {

	if ($('#ftransacciones').find('#vdescripcion').val() == '') {
		$('#ftransacciones').find('#vdescripcion').focus();
		return 'Descripción Requerida';
	}

	// if ($('#ftransacciones #vidmoneda option:selected').val() == '') {
	// 	$('#ftransacciones #vidmoneda').focus();
	// 	return 'Moneda Requerida';
	// }

	if (parseFloat($('#ftransacciones').find('#totDebe').html()) == 0.00 && parseFloat($('#ftransacciones').find('#totHber').html()) == 0.00) 
		return 'No Existe Movimiento Contable';
	else if(parseFloat($('#totDebe').html().replace(/,/g,'')) !=  parseFloat($('#totHber').html().replace(/,/g,'')))
		return 'Asientos no Cierran Adecuadamente';

	$('#ftransacciones .zelda').data('triforce')['vdivisa'] = $("#vidmoneda option:selected").attr('tp');

	return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'transaccione':
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

function cargarSintax(vtabla){
	
	return false;


}

function getFila(i) {

	return '<tr id="f'+i+'" st="0"><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" class="tdtext" id="c'+i+'" autocomplete="off" style="margin:0px"></td><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" autocomplete="off" class="tdtext autocomplete" id="d'+i+'" style="margin:0px"></td>  <td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" autocomplete="off" style="text-align:right;margin:0px;" class="tdtext numeric" id="vsdebe'+i+'" value="0.00"></td><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" autocomplete="off" style="text-align:right;margin:0px" class="tdtext numeric" id="vshaber'+i+'" value="0.00"></td> <td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;" class="hide"> <select type="select" id="vidodt'+i+'" style="margin:0px">'+gop+'</select> </td> <td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"> <input type="text" style="width:90%;margin:0px" id="vcomentario'+i+'"> <i class="mdi mdi-close red-text delete-row" id="r'+i+'" style="float:right;cursor:pointer;" title="Eliminar Fila"></i> </td></tr>';

}

function deleterow(elem){
	elem.parent().parent().remove();
	totalizar();
}