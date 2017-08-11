var gtipo;
var paramTemp;

$(function(){
	param = parseInt(getParameterByName('tf'));
	paramTemp = param;
	switch(param){
		case 1:
		arr("cuentas",param,'1',-1,'',0,1,$("#bdymantCuentas"));
		arr('login',6,'',214,2+',0,0',0,1,$("#listaCuentasx"));
		break;
		case 2:
		arr("cuentas",param,'1',-1,'',0,1,$("#bdymantCuentas"));
		arr('login',6,'',214,1+',0,0',0,1,$("#listaCuentasx"));
		break;	
		default:
		$("#bdymantCuentas").html("Valor no Valido")
		break; 
	};
	    $("#ncli").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);//$(this).val().substr(-1);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        // if (charStr.search(/[a-zA-Z0-9-_. ]/i) >= 0 || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#ncli").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'!bisproveedor having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1)
            });

        }
    });
	        $("#ncli").blur(function(e){
	        	var sql = "id > 0 and concat(nombre,' ', apellido1,' ',apellido2,' *',replace(cedula, '-',''),'*') = '"+$(this).val()+"'";
        var id = arr('login',4,'id','2',sql,0,0,0);
        
        if(id[0].length == 0) {
        	Materialize.toast('Cliente no existente', 4000, 'red');
        } else {
            var pr = paramTemp == 2?1:2;

        	var p = arr('login',4,'',214,pr+',0,'+id[0][0][0],0,0,0);
            console.log(p);
 
           var tabla = $("#listaCuentasPm");	
           for (var i = 0; i <= p[0].length; i++) {
           
           var q = p[0][i];
         
           var tdFecha = '<td>'+q[5]+'</td>';

           var tdSaldo = '<td>'+q[6]+'</td>';
             var trIdFactura = '<tr><td>'+q[3]+'</td>'+tdFecha+tdSaldo+'</tr>';
             console.log(trIdFactura);    
           tabla.append(trIdFactura);
           
           }

        }
 console.log(p);
    });
	            $("#ncli").keyup(function(e){
        var charCode = e.which || e.keyCode;
        
        
        if (charCode == 13) {
        $(this).blur();
        }
    });
	$("#data-table-cuentas").dataTable({
		bFilter: false,
		order : [],
		"bLengthChange": false
	});

	$("#data-table-cuentas-xP").dataTable({
		bFilter: false,
		order : [],
		"bLengthChange": false
	});

	$("#data-table-cuentas-detalle").dataTable({
		bFilter: false,
		order : [],
		"bLengthChange": false
	});
});

$(document).on("change","[name='ctas']",function(){
	$(".detalle").show();
	switch(parseInt($(this).attr('value'))){
		case 2:
		$(".detalle[tp=0]").hide()
		break;
		case 3:
		$(".detalle[tp=1]").hide()
		break;
		default:
		break;
	}
})


$(document).on("change","#cobInteres",function(){
	var totInt = parseFloat($("#totInt").val());
	var totSaldoVig = parseFloat($("#totSaldoVig").val());
	var totSaldo = 0;

	if ($("#cobInteres").is(':checked')) {
		$("#interes").show('slow');
		totSaldo = totSaldoVig + totInt;
		$("#totSaldoVig").val(totSaldo);

	}else{
		$("#interes").hide('slow');
		totSaldo = totSaldoVig - totInt;
		$("#totSaldoVig").val(totSaldo);
	}
});
$(document).on("click",".pagomu",function(){
	$(this).sideNav({
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
        );
	});

$(document).on("click",".detalle",function(){
	$(this).sideNav({
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
        );
	$(this).sideNav('show');
	var id = $(this).attr('id').substr(1);
	gtipo = $(this).attr('tipo');
	var datos =  arr('login',4,'',214,gtipo+','+id+',0',0,0,0)[0][0];
	var tabla= $("#data-table-cuentas-detalle").DataTable();
	tabla.destroy();
	arr('login',6,'',213,gtipo+','+id,0,1,$("#listaCuentasxCDetalle"));
	var dias = parseInt(datos[7]);

	$('select').material_select();
	$("#ifac").text(datos[3]);
	$("#vidfactura").val(datos[12]);
	$("#isaldo").text(datos[6]);
	$("#isaldovista").text(datos[6]);
	if (dias < 0) {
		$("#idias").css('color','red');
	}
	$("#inombr").text(datos[1]);
	$("#ifecha").text(datos[5]);
	$("#iplazo").text(datos[8]);
	$("#idias").text(Math.abs(dias));
	$("#data-table-cuentas-detalle").dataTable({

		bFilter: false,
		order : [],
		"bLengthChange": false
	});
	$("#btn-navsalir").click(function(){
	
		$('.side-nav-cuentas').sideNav('hide');
		 $('.button-collapse').sideNav('destroy');

	});

	$("#btn-divsalir").click(function(){

		$(".divabono").hide();
		$(".divabono").attr('visible',0);

	});

	$("#btn-div").click(function(){
		var vi = $(".divabono").attr('visible');

		if (vi == 0) {
			var tp = arr('login',4,'idtipoabono',39,'id = @@impresa',0,0,0)[0][0];
			$(".divabono").show();
			$(".divabono").attr('visible',1);
			if (tp == 1)
				$("#p_v").prop('checked',true);
			else
				$("#p_v").prop('checked',false);
			
			$("#vvalor").val(0.00).focus().select();
		}else{
			$(".divabono").hide();
			$(".divabono").attr('visible',0);
		}
	});

});


$(document).on("keyup","#vvalor",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		console.log($("#p_v").is(":checked") == true ? 1 : 2)
	}
});

$(document).on("click","#Iadd",function(){
	deadclear('cuentas');
});

$(document).on("click","#p",function(){

	deadclear('cuenta');

	var debe = parseFloat($("#totSaldoAdeud").val());
	$("#totSaldoVig").val(debe).toFixed(2);
});


$(document).on("keyup","#totAbonoF",function(e){

	var rs = kpress($(this).val());

	$("#errF").html('');

	if (isNaN(rs)) {
		$("#errF").html(rs);
		$("#inpG").addClass('has-danger');
		$("#totAbonoF").addClass('form-control-danger');
	}else{
		$("#totSaldoVig").val(rs);
		$("#inpG").removeClass('has-danger');
		$("#totAbonoF").removeClass('form-control-danger');
	}

});

function kpress(valor) {

	valor = isNaN(valor) || valor == '' ? -1 : parseFloat(valor);
	var saldo = $("#totSaldoAdeud").val().replace(/,/g,"");

	switch( parseInt(valor) ){
		case -1:
		$("#totAbonoF").val('0');
		$("#totAbonoF").select();
		$("#totSaldoVig").val($("#totSaldoAdeud").val());
		return 'El valor ingresado debe ser un valor numérico';
		break;

		default:
		saldo = saldo - valor;
		if (saldo < 0) {
			return 'El valor excede el monto del saldo adeudado';
		}
				// INGRESAR ABONO

				return saldo;
				break;
			}
		}

		function validar (varreglo,vmodulo) {

			var salida = {}

			/*VALIDACION FRONT END*/

			switch(vmodulo['modulo']) {
				case 'cuentas':
				if (vmodulo['tip'] == '') {
					err = validarcuentas();
					if ( err ) {
						return err;
					}
				}

				break;
				case 'estadoscuenta':
				if (vmodulo['tip'] == '') {
					err = validarestadocuenta();
					if ( err ) {
						return err;
					}
				}
				break;
				default:
				return 'Módulo no Existente '+ vmodulo['modulo'];
				break;
			}

			salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
			return salida;

		}

		function validarcuentas() {



			return false;
		}

		function validarestadocuenta(){

			if (isNaN($("#vvalor").val())) {
				$("#vvalor").select().focus(); 
				return "El Valor No es Numérico";
			}

			if ($('#vvalor').val() <=0) {
				$("#vvalor").select().focus(); 
				return "El Valor No puede ser 0";

			}

			if ($('#vidtipopago option:selected').val() == '') {
				$("#vidtipopago").focus(); 
				return "Tipo de Pago Requerido";

			}

			return false;

		}

		function cargar(vmodulo,vid) {


			switch(vmodulo['modulo']) {
				case 'cuentas':
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

		function endDetail(vid,vacc,modulo){

			if (vacc == 1) {
				$("#isaldo").html(parseFloat($("#isaldo").html()) - parseFloat($("#vvalor").val()) );

				$("#vidtipopago").val('');
				$("#vvalor").val(0.00);
				arr('login',6,'',213,gtipo+','+$("#vidfactura").val(),0,1,$("#listaCuentasxCDetalle"));
				arr('login',6,'',214,gtipo+',0,0',0,1,$("#listaCuentasx"));

				$("#btn-div").click();
				var tp = $("#p_v").is(":checked") == true ? 1 : 2;
				window.open('cuentas?accion=4&id='+vid+'&tn='+$(".add[modulo=estadoscuenta]").attr('tipo')+'&tp='+tp);
			}
		}