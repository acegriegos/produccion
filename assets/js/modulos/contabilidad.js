var ftr = 1;
var gop = '<option value="0">N/A</option>';
var intervarl1 = null;
var op1 = 0;
var op2 = 4;
var vdate1 = vdate2 = null;

$(function(){
	$(".menu3").click(function(){
		var id = parseInt($(this).attr('id').substr(1));
		$(".menu3").removeClass('active');
		$(this).addClass('active')
		
		$("#mcontabilidad").html(mantenimiento("contabilidad",id,''));

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
	arr('login',6,'',71,op1+","+id+","+op2+","+vdate1+","+vdate2,71,1,$(".colDetalle"));

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

	// $('.sh-cta-card .button-collapse').sideNav({
 //            edge: 'left', // Choose the horizontal origin
 //            closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
 //        }
 //    );

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
		$('#detalletransaccione tr td input[type=text]').first().focus()
	}
});

$(document).on("keyup","[id^=f]",function(e){
	var code = e.which || e.keyCode;
	if(code == 46){
		$(this).remove();
		var id = parseInt($('#detalletransaccione tr').last().attr('id').substr(1))+1
		$('#detalletransaccione').append(getFila(id));

		$("#f"+id).data('triforce',{vaccion:0,vid:0, vidtransaccion:'?',vdebe:0, vhaber:0, vfila:0, vtabla:0,vidcuenta : 0});
	}
});

$(document).on("keyup","[id^=c]",function(e){
	var code = e.which || e.keyCode;
	if(code != 13){
		$('#f'+$(this).attr('id').substr(1)).attr('st',0);
	}
});

$(document).on("keyup",".tdtext",function(e){
	var code = e.which || e.keyCode;

	if(code == 13){
		var id = parseInt($(this).attr('id').substr(1));
		var spec = $(this).attr('id').substring(0,3);
		
		switch(spec){
			case 'vsd':
			id = parseInt($(this).attr('id').substr(6));
			if($(this).val() == '0.00' || isNaN($(this).val().replace(/,/g,'')) ){
				$(this).val('');
				$('#vshaber'+id).val('0.00');
				$('#vshaber'+id).select();
				$('#vshaber'+id).focus();
			}else{
				$('#vshaber'+id).val('0.00');
				$('#c'+(id+1)).focus();
				$("#f"+id).data('triforce')['vdebe'] = $(this).val().replace(/,/g,'')
			}
			totalizar();
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
			break;
			default:
			var rs = arr('login',4,'',53,"'"+$(this).val()+"',1",'',0,'')[0][0];

			if(rs != undefined && $(this).val() != ''){
				var repetido = 0;

				$('#detalletransaccione tr').each(function(){
					if($(this).attr('st') == 1 && rs[0] == $('#c'+$(this).attr('id').substr(1)).val())
						repetido = 1;
				});

				if(!repetido){
					$('#c'+id).val(rs[0])
					$('#d'+id).val(rs[1])
					$('#vsdebe'+id).val('0.00');
					$('#vsdebe'+id).select();
					$('#vsdebe'+id).focus();
					$('#f'+id).attr('st',1)
					$('#vidcuenta'+id).val(rs[3])
				}else{
					$(this).focus();
					$(this).select();
					$('#vsdebe'+id).val('');
					$('#vshaber'+id).val('');
					$('#f'+id).attr('st',0)
					$('#vidcuenta'+id).val('')
				}
			}else{
				$(this).focus();
				$(this).select();
				$('#vsdebe'+id).val('');
				$('#vshaber'+id).val('');
				$('#f'+id).attr('st',0)
				$('#vidcuenta'+id).val('')
			}
			break;
		}
	}
});

$(document).on("blur",".tdtext",function(){
	
	var id = parseInt($(this).attr('id').substr(1));
	var spec = $(this).attr('id').substring(0,2);

	switch(spec){
		case 'vd':
		if($(this).val() == '0.00' || $(this).val() == ''){
			$(this).val('');
			$('#vshaber'+id).val('0.00');
			$('#vshaber'+id).select();
			$('#vshaber'+id).focus();
		}else{
			$('#vshaber'+id).val('0.00');
			$('#c'+(id+1)).focus()
		}
		break;
		case 'vh':
		if($(this).val() == '0.00' || $(this).val() == ''){
			$(this).val('');
			$('#vsdebe'+id).val('0.00');
			$('#vsdebe'+id).select();
			$('#vsdebe'+id).focus();
		}else{
			$('#vsdebe'+id).val('0.00');
			$('#c'+(id+1)).focus()
		}
		break;
		default:
		break;
	}
});

$(document).on("click",".func",function(){
	var id = parseInt($(this).attr('fn').substr(1))
	$(".sub-tran").hide();
	$("#t"+id).show();

	switch(id){
		case 1:
		$('#detalletransaccione').html('');
		var rs = arr('login',4,'id,nombre',55,"",'',0,'')[0];

		for (var i = 0; i < rs.length; i++) {
			gop += '<option value="'+rs[i][0]+'">'+rs[i][1]+'</option>';
		}

		for (var i = 1; i < 7; i++) {
			$('#detalletransaccione').append(getFila(i))

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
	$("#dtranN").html('<br>'+dtran[0][0]);
	$("#dtranF").html('<br>'+dtran[0][1]);
	$("#dtranD").html('<a href="#" class="button-collapse detextra truncate" data-activates="extra"><h6 style="font">'+dtran[0][2]+"</h6></a>");
	$("#dtranE").html('<br>'+dtran[0][9]);
	$("#dtranU").html('<br>'+dtran[0][8]);

	var tdebe = thaber = debe = haber = 0;
	$("#dtranDet").html('');
	$.each(dtran,function(e,val){
		debe = parseFloat(val[5]);
		haber = parseFloat(val[6]);
		$("#dtranDet").append('<div class="row"><div class="col s2 m3 truncate" align="center" style="border-bottom: 1px solid #DEDEDE; font-size: 1em; margin: 0; height: 1.9em;">'+val[3]+'</div><div class="col s4 m3 truncate" align="center" style="border-bottom: 1px solid #DEDEDE; font-size: 1em; margin: 0; height: 1.9em;">'+val[4]+'</div><div class="col s3 truncate" align="center" style="border-bottom: 1px solid #DEDEDE; font-size: 1em; margin: 0; height: 1.9em;">'+debe.formatMoney(2,'.',',')+'</div><div class="col s3 truncate" align="center" style="border-bottom: 1px solid #DEDEDE; font-size: 1em; margin: 0;  height: 1.9em;">'+haber.formatMoney(2,'.',',')+'</div></div>');
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
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
    );
    $(this).sideNav('show');
});

$(document).on("click",".detextra",function(){
    $(this).sideNav({
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
    );
    $(this).sideNav('show');
})


$(document).on("keyup","#vbusqueda",function(e){
	var code = e.which || e.keyCode
	if (code == 13) {
		arr('login',6,'',53,"'"+$(this).val()+"',"+ftr,33,1,$("#vcuentas"));
	}
});


function cargarTransacciones(){

	$(".zelda").data('triforce',{vid:0,vidfila:0,vidtabla:0})

	var fecha = new Date();
	var dpick = $('#vfecha');
	dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);

	 $(document).on('keydown','.autocomplete',function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $(this).autocomplete({
                limit: 20,
                data: getDatos('nombre,null',36,'id > 0 and !ispadre having nombre like "%'+$(this).val()+'%" limit 10',0,0,1)
            });

            $(".autocomplete-content").css('width','30%');
            $(".autocomplete-content").css('position','absolute');

        }
	});
}

function totalizar(){
	var vdebe = vhaber = 0;

	$('#detalletransaccione tr').each(function(){
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
		default:
		return 'Módulo no Existente';
		break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function endDetail(vid) {
	setTimeout(function(){ $('#fn1').click(); }, 2000);
	return false;
}

function validartransacciones() {

	if ($('#ftransacciones').find('#vdescripcion').val() == '') {
		$('#ftransacciones').find('#vdescripcion').focus();
		return 'Descripción Requerida';
	}

	if ($('#ftransacciones #vidmoneda option:selected').val() == '') {
		$('#ftransacciones #vidmoneda').focus();
		return 'Moneda Requerida';
	}

	if (parseFloat($('#ftransacciones').find('#totDebe').html()) == 0.00 && parseFloat($('#ftransacciones').find('#totHber').html()) == 0.00) 
		return 'No Existe Movimiento Contable';
	else if(parseFloat($('#totDebe').html().replace(/,/g,'')) !=  parseFloat($('#totHber').html().replace(/,/g,'')))
		return 'Asientos no Cierran Adecuadamente';

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

	return '<tr id="f'+i+'" st="0" class="ciclos"><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" class="tdtext" id="c'+i+'"></td><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" class="tdtext autocomplete" id="d'+i+'"></td>  <td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" style="text-align:right" class="tdtext numeric" id="vsdebe'+i+'"></td><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" style="text-align:right" class="tdtext numeric" id="vshaber'+i+'"></td> <td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"> <select class="tdtext" type="select" id="vidodt'+i+'">'+gop+'</select> </td> <td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"> <input type="text" class="tdtext" id="vcomentario'+i+'"> </td></tr>';

}