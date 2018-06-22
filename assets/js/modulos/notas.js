var config;

$(function(){
	config = getDatos('if(p12 is null,0,1) as FE,isinventariado as INV,idtipofactura as FAC,fastshow as FS,printSale',39,'id = @@impresa',0,0)[0][0];

	$("#fnotass").submit(function(){return false});
	$("[id^=ftr]").hide();
	$(".chg_tipo").change(function(){
		var id=$(this).prop('value')
		if ($(this).is(':checked')){
			$("#ftr"+id).removeClass("hide");
			$("#ftr"+id).show();
		}
		else
			$("#ftr"+id).addClass("hide");

	})

	$("#ncli").keydown(function(e){
		var charCode = e.which || e.keyCode;
		var charStr = String.fromCharCode(charCode);

		if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
			$(".autocomplete-content").remove();

			$("#ncli").autocomplete({
				limit: 20,
				data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",replace(cedula,"-",""),"*")) as nom,null',2,'!bisproveedor having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1)
			});

			$("#ncli").siblings($(".autocomplete-content")).css('width','25%');
		}
	});

	$(".sclie").blur(function(){
		var bisclie = 0;
		var nombre = $("#ncli").val()
		if (!$("#cp").is(":checked")) {
			bisclie=1
			nombre = $("#nprov").val()
		}
		var id = arr('login',4,'id',2,'bisproveedor = '+bisclie+' where nombre = "%'+nombre+'%" limit 20',0,0,0)[0][0];
		if (id != undefined) {
			$(".sclie").attr('idc',id);	
		}else{
			$(".sclie").attr('idc',0);
		}
		

	})

	$("#cp").change(function(){
		if ($(this).is(':checked')) {
			$("#nprov").val('')
			$(".tipoclie").text('Proveedor')
			$(".sclie").attr('id','nprov')
			$("label[for=ncli]").attr('for','nprov')
			$("#nprov").keydown(function(e){
				var charCode = e.which || e.keyCode;
				var charStr = String.fromCharCode(charCode);

				if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
					$(".autocomplete-content").remove();

					$("#nprov").autocomplete({
						limit: 20,
						data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",replace(cedula,"-",""),"*")) as nom,null',2,'bisproveedor having nom like "%'+$("#nprov").val()+'%" limit 20',0,0,0,1)
					});

					$("#nprov").siblings($(".autocomplete-content")).css('width','25%');
				}
			});

		}else{
			$(".tipoclie").text('Cliente')
			$(".sclie").attr('id','ncli')
			$("label[for=nprov]").attr('for','ncli')
			$("#ncli").keydown(function(e){
				var charCode = e.which || e.keyCode;
				var charStr = String.fromCharCode(charCode);

				if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
					$(".autocomplete-content").remove();

					$("#ncli").autocomplete({
						limit: 20,
						data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",replace(cedula,"-",""),"*")) as nom,null',2,'!bisproveedor having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1)
					});

					$("#ncli").siblings($(".autocomplete-content")).css('width','25%');
				}
			});
		}
	})

	$("#ftr0").show();
	$("#busnota").click(function(){
		var cliente = factura = num1 = num2 = 0;
		var desde = hasta = "";
		if ($("#cp").is(":checked")) {
			if ($("#nprov").val() != '') {
				cliente= $("#nprov").attr("idc"); 
			}
		}else{
			if ($("#ncli").val() != '') {
				cliente= $("#ncli").attr("idc"); 
			}
		}
		if ($("#vfac").val() != '') {
			factura= $("#vfac").val() == '' ?0: $("#vfac").val();
		}
		if ($("#vnum1").val() != '') {
			num1= $("#vnum1").val() == '' ?0: $("#vnum1").val();
			num2= $("#vnum2").val() == ''?0: $("#vnum2").val();

		}
		if ($("#desde").val() != '') {
			desde= $("#desde").val();
			hasta= $("#hasta").val();

		}
		$("#data-table-Notas").DataTable().destroy();

		var p = arr('login', 4, "" , 302, $("#cp").is(":checked")+','+ factura+','+ cliente +',"'+ desde +'","'+ hasta +'",'+ num1 +','+ num2+',@@impresa', 0,0,0   )[0];
		$("#listaclientes").html('');
		$.each(p,function(i){
			$("#listaclientes").append('<tr class="button-collapse detalle" data-activates="acciones" id="a'+p[i][4]+'""><td style=" padding: 10px;">'+p[i][0]+'</td><td style=" padding: 10px;">'+p[i][1]+'</td><td style=" padding: 10px;">'+p[i][2]+'</td><td style=" padding: 10px;">'+p[i][3]+'</td></tr>');
		});

		$("#data-table-Notas").dataTable({

			bFilter: false,
			order : [],
			"bLengthChange": false
		}); 



	});

	




});

$(document).on("click",".detalle",function(){
	$(this).sideNav({
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
        );
	$(this).sideNav('show');
	var id = $(this).attr('id').substr(1);
	
	var tabla= $("#data-table-cuentas-detalle").DataTable();
	tabla.destroy();
	var  datos=  arr('login',6,'',303,id,0,1,$("#listaCuentasNotaDetalle"));


	$('select').material_select();
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
			$(".divabono").show();
			$(".divabono").attr('visible',1);
		}else{
			$(".divabono").hide();
			$(".divabono").attr('visible',0);
		}
	});
});

$('.datepicker').pickadate({
	selectMonths: true, // Creates a dropdown to control month
	selectYears: 15, // Creates a dropdown of 15 years to control year
	format: 'yyyy-mm-dd'
});

fecha = new Date();
$('.vfecha').pickadate();
$('select').material_select();

$("#data-table-Notas").DataTable({
	bFilter: false,
	order : [],
	"bLengthChange": false
});


function validar (varreglo,vmodulo) {
	
	var salida = {}
	
	/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'estadoscuenta':
		if (vmodulo['tip'] == '') {
			err = validarnotas();
			if ( err ) {
				return err;
			}
		}

		break;

		default:
		return 'Módulo no Existente '  ;
		break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarnotas() {

	if($('#vvalor').val()==0 || isNaN($('#vvalor').val())){
		$('#vvalor').focus().select();
		return 'El Valor no es Correcto' ;
	}
	if ($('#vcomentario').val() == '') {
		$('#vcomentario').focus().select();
		return 'Comentario Requerido';
	}
	$("#vidtipo").val( $("#ncd").is(":checked") ? 5 : 6 );

	return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'notas':
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
		$("#isaldo").html(parseFloat($("#isaldo").html()) + parseFloat($("#vvalor").val()) );
		var factura = getDatos('consecutivo',301,'id = '+vid[0][0],0,0)[0][0][0];
    	var clave = vid[0][0];

		$("#vvalor").val(0.00);
		$('#vcomentario').val('');
		arr('login',4,'',304,'1,0,3,'+$("#tipoimpresion").val(),0,0,0);
		arr('login',6,'',303,$("#vidfactura").val(),0,1,$("#listaCuentasNotaDetalle"));

		var $toastContent = $('<span style="width: 500px">Generado Nota Electronica:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
        Materialize.toast($toastContent);
        sendFE(clave,factura);

		$("#data-table-cuentas-detalle").dataTable({

			bFilter: false,
			order : [],
			"bLengthChange": false
		});


		$("#btn-div").click();
	}
}


function sendFE(clave,factura){
    $.ajax({
        async: true,
        url: "../wsdlClient.php",
        type: 'POST',
        data: {id: "-"+clave, accion : 1}
    })
      .done(function( data ) {
        var p;
        var continuar = 1;
        try {
            p = JSON.parse(data);
            var vfactura = p['num'];
            var vclave = p['clave'];
            p = p['rs'];
        }
        catch(err){
            //GENERAR NOTA DE CREDITO
            $(".expect").removeClass('progress')
            $(".expect").html("<i class='mdi mdi-24px mdi-close red-text'></i>");
            Materialize.toast(data,3000,'red');
            //arr('login',7,2,64,'feestado=7','id='+clave,0,0);
            setTimeout(function(){$(".toast").remove();},3000);
            continuar = 0;
        }

        if (continuar) {
            setTimeout(function(){
                $.ajax({
                async: true,
                url: "../wsdlClient.php",
                type: 'POST',
                data: {id: clave, accion : 4}
            })
              .done(function( data ) {
                var q;
                q = JSON.parse(data);
                switch(q['estado']){
                    case 'rechazado':
                        //GENERAR NOTA DE CREDITO
                        //arr('login',7,2,64,'feestado=3','id='+clave,0,0);
                        $(".expect").removeClass('progress')
                        $(".expect").html("<i class='mdi mdi-24px mdi-close red-text'></i>")
                        Materialize.toast(q['rs'],3000,'red');
                        setTimeout(function(){$(".toast").remove();},3000);
                        break;
                    case 'procesando':
                        $(".expect").removeClass('progress')
                        $(".expect").html("<i class='mdi mdi-24px mdi-close yellow-text'></i>")
                        Materialize.toast('Verificar Estado',3000,'green');
                        //arr('login',7,2,64,'feestado=2','id='+clave,0,0);
                        setTimeout(function(){$(".toast").remove();},3000);
                        break;
                    default:
                        $(".expect").removeClass('progress')
                        $(".expect").html("<i class='mdi mdi-24px mdi-check green-text'></i>");
                        sendVMail(vfactura,vclave,clave);
                        break;
                }
              });
            },3000);

        }
        
      });
}


function sendVMail(factura,clave,vid){
    //var archivos = '';

    // if(config[3] == 1){ //ENVIO RAPIDO DE FACTURA
    //     var str_correos = '';
        
        // if ($(".zelda").data('triforce')['vidcliente'] != 0) {
        //     var correos = getDatos("correo",17,"idcorreo>0 and idtabla=2 and idfila="+$(".zelda").data('triforce')['vidcliente'],0,0,0)[0][0];
        //     if (correos == undefined) {
        //         Materialize.toast('Correos Inválidos',4000,'red');
        //         arr('login',7,2,64,'feestado=4','id='+clave,0,0);
        //     }else{
        //         for (var i = 0; i < correos.length; i++) {
        //             str_correos += correos[0];
        //         }
        //     }
        // }
        
   //      if (config[4] == 1) {
   //          var tp = $("#p_v").is(":checked") == true ? 1 : 2;
			// window.open('cuentas?accion=4&id='+vid+'&tn='+$(".add[modulo=estadoscuenta]").attr('tipo')+'&tp='+tp);
   //          w.print();
   //          w.close();
   //          window.focus();
   //      }

   //      if (str_correos != '') {
   //          var vbody = getDatos('',73,vid,0,0)[0][0];
   //          archivos = makeArchivos(factura,clave,vid,vbody[1]);
   //          enviarCorreo(3,str_correos,"Factura N° "+factura,vbody[0],archivos);
   //      }
        
   //  }else{
        
   //      if (config[4] == 1){
   //          var tp = $("#p_v").is(":checked") == true ? 1 : 2;
			// window.open('cuentas?accion=4&id='+vid+'&tn='+$(".add[modulo=estadoscuenta]").attr('tipo')+'&tp='+tp);
   //      }
   //  }

   	var tp = $("#p_v").is(":checked") == true ? 1 : 2;
    window.open('cuentas?accion=4&id='+vid+'&tn='+$(".add[modulo=estadoscuenta]").attr('tipo')+'&tp='+tp);
    setTimeout(function(){$(".toast").remove();},5000);
}