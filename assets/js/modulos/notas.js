var config;
var factura;
var clave;
var str_correos = '';

$(function(){
	config =getDatos('',42,'@@impresa',0,0)[0][0];
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

		var p = arr('login', 4, "" , 302,'0,0,"'+$("#cp").is(":checked")+','+ factura+','+ cliente +','+ desde +','+ hasta +','+ num1 +','+ num2+',@@impresa'+'","0,10"', 0,0,0)[0];
		$("#listaclientes").html('');

		$.each(p,function(i){
			$("#listaclientes").append('<tr class="button-collapse detalle" data-activates="acciones" id="a'+p[i][4]+'""><td style=" padding: 10px;">'+p[i][0]+'</td><td style=" padding: 10px;">'+p[i][1]+'</td><td style=" padding: 10px;">'+p[i][2]+'</td><td style=" padding: 10px;">'+p[i][3]+'</td></tr>');
		});

		$("#data-table-Notas").dataTable({
			bFilter: false,
            bScrollInfinite: true,
            bSort: false,
            bLengthChange: false,
            order: [],
            bPaginate: false,
            info: false
		}); 

        paginate($("ul.pagination").attr('vtbl'),undefined,$("#cp").is(":checked")+','+ factura+','+ cliente +','+ desde +','+ hasta +','+ num1 +','+ num2+',@@impresa');
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
	var datos=  arr('login',6,'',303,id,0,1,$("#listaCuentasNotaDetalle"));

    if (config[5] == 1){
        $("#tipoimpresion").attr('checked',true);
    }else{
        $("#tipoimpresion").attr('checked',false);
    }

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

    $("#btn-anular").click(function(){
        var saldo = $("#isaldo").html().replace(/,/g,'');
        $("#vvalor").val(saldo);
        $("#vcomentario").val('Factura anulada debido a: ').focus();     
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

function manualPaginate(limit){
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

        var p = arr('login', 4, "" , 302,'0,0,"'+$("#cp").is(":checked")+','+ factura+','+ cliente +','+ desde +','+ hasta +','+ num1 +','+ num2+',@@impresa'+'","'+limit+'"', 0,0,0)[0];
        $("#listaclientes").html('');

        $.each(p,function(i){
            $("#listaclientes").append('<tr class="button-collapse detalle" data-activates="acciones" id="a'+p[i][4]+'""><td style=" padding: 10px;">'+p[i][0]+'</td><td style=" padding: 10px;">'+p[i][1]+'</td><td style=" padding: 10px;">'+p[i][2]+'</td><td style=" padding: 10px;">'+p[i][3]+'</td></tr>');
        });

        $("#data-table-Notas").dataTable({
            bFilter: false,
            bScrollInfinite: true,
            bSort: false,
            bLengthChange: false,
            order: [],
            bPaginate: false,
            info: false
        }); 
};

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
		factura = getDatos('consecutivo,idfactura',301,'id = '+vid[0][0],0,0,0);
        var idfact = factura[0][0][1];
        var estado = parseInt(getDatos('feestado',64,'id = '+idfact,0,0,0)[0][0][0]);
        factura = factura[0][0][0];
        clave = vid[0][0];

		$("#vvalor").val(0.00);
		$('#vcomentario').val('');
		arr('login',4,'',304,'1,0,3,'+$("#tipoimpresion").val(),0,0,0);
		arr('login',6,'',303,$("#vidfactura").val(),0,1,$("#listaCuentasNotaDetalle"));

        arr('login',4,'',276,$("#vidfactura").val(),0,0,0);
        window.open("cuentas?accion=4&id="+clave+"&tp=0")
        if (estado == 0 || estado == 7 || estado == 9) {
            $.get('../wsdlClient.php',{accion:4,id:idfact})
            .done(function(data){
                var ex;
                var p;
                var color = msj = '';
                var state = 0;
                try{
                    p = JSON.parse(data);
                    switch(p['estado']){
                        // case 'rechazado':
                        // case 'recibido':
                        // case 'procesando':
                        // case 'aceptado':

                        //     break;
                        case 'Sin Subir':
                            color = '';
                            msj = 'Documento Electrónico Original sin Subir'
                            break;
                        case 'Sin Internet':
                            color = 'red';
                            msj = p['rs'];
                            break;
                        case 'error':
                            color = 'red'
                            msj = 'Error en Documento Electrónico Original';
                            break;
                        default:
                            var $toastContent = $('<span style="width: 500px">Generando Nota Electronica:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
                            Materialize.toast($toastContent,5000);
                            sendFE(clave,idfact);
                            msj = ""
                            break;
                    }
                    if (p['estado'] != 'aceptado') 
                        Materialize.toast(msj,6000,color);

                    $("#data-table-cuentas-detalle").dataTable({
                        bFilter: false,
                        order : [],
                        "bLengthChange": false
                    });


                    $("#btn-div").click();
                }catch(ex){
                    console.log(ex)
                    console.log(data)
                    Materialize.toast('Error Obteniendo Estado',6000,'red')
                }
            });

        }else{
            var $toastContent = $('<span style="width: 500px">Generando Nota Electronica:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
            Materialize.toast($toastContent,5000);
            sendFE(clave,idfact);

            $("#data-table-cuentas-detalle").dataTable({
                bFilter: false,
                order : [],
                "bLengthChange": false
            });


            $("#btn-div").click();
        }
    }
}


function sendFE(clave,factura){

    var festado = getDatos('feestado',64,'id='+clave,0,0,0)
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
            var vclave = p['num'];
            p = p['rs'];
            $(".expect").removeClass('progress')
            $(".expect").html("<i class='mdi mdi-24px mdi-check green-text'></i>");
            arr('login',7,2,301,'feestado=2','id='+clave,0,0);
            sendVMail(factura,clave,vclave);
        }
        catch(err){
            console.log(data)
            console.log(err)
            $(".expect").removeClass('progress')
            $(".expect").html("<i class='mdi mdi-24px mdi-close red-text'></i>");
            Materialize.toast(data,3000,'red');
            arr('login',7,2,301,'feestado=7','id='+clave,0,0);
            setTimeout(function(){$(".toast").remove();},3000);
            continuar = 0;
        }
        
      });
}


function sendVMail(idfact,idnota,cnota){
    var archivos = '';
    var idcliente = getDatos('idcliente,fe_getnumeracion(id),fe_getclave(id)',64,'id='+idfact,0,0);
    var factura = idcliente[0][0][1];
    var clave = idcliente[0][0][2];
    idcliente = parseInt(idcliente[0][0][0]);

    if(config[3] == 1){ //ENVIO RAPIDO DE FACTURA
        str_correos = '';

        if (idcliente != 0) {
            var correos = getDatos("",18,idcliente+",2",0,0);
            if (correos == undefined) {
                Materialize.toast('Correos Inválidos',4000,'red');
                arr('login',7,2,301,'feestado=2','id='+idnota,0,0);
            }else{
                for (var i = 0; i < correos[0].length; i++) {
                    str_correos += correos[0][i][3]+",";
                }

                str_correos = str_correos.substr(0,str_correos.length-1);
            }
        }
        
        if (config[4] == 1) {
            var tp = $("#p_v").is(":checked") == true ? 1 : 2;
            window.open('cuentas?accion=4&id='+idnota+'&tn='+$(".add[modulo=estadoscuenta]").attr('tipo')+'&tp='+tp);
        }

        if (str_correos != '') {
            var vbody = getDatos('',73,'-'+idnota,0,0)[0][0];
            var vestado = $("#ncd").is(":checked") ? 'Nota Crédito' : 'Nota Débito';
            archivos = makeArchivos(cnota,factura,idfact,idnota,vbody[1],vestado);
            enviarCorreo(3,str_correos,"Nota Crédito N° "+cnota,vbody[0],archivos,0,idnota,301);
        }
    
		//
    }else{
        if (config[4] == 1){
           	var tp = $("#p_v").is(":checked") == true ? 1 : 2;
            window.open('cuentas?accion=4&id='+idnota+'&tn='+$(".add[modulo=estadoscuenta]").attr('tipo')+'&tp='+tp);
            setTimeout(function(){$(".toast").remove();},5000);
        }
    }
}

function makeArchivos(vnota,vfactura,vidfactura,vidnota,vsucursal,vestado){
    var archivos = '';
    mantenimiento_async('login',8,{arch:'recibo',id:vidfactura,mic:1,tit:'Factura Electrónica',sel:'',tbl:72,where:vidfactura},1);

    archivos = {0:'xml/'+vestado+' N°'+vnota+', '+vsucursal+'.xml',1:'pdf/Factura N°'+vfactura+', '+vsucursal+'.pdf'}
    mantenimiento_async('login',9,{id:vidnota,factura:vnota,sucursal:vsucursal,restado:vestado},1);

    return archivos;
}

function postExcecute(vid,p){

    switch(parseInt(vid)){
        default:
            break;
    }
}

function postSendmail() {
    setTimeout(function(){$(".toast").remove();},3000);
}