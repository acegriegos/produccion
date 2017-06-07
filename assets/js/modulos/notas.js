$(function(){
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
	$("#ftr0").show();
	$("#busnota").click(function(){
		var cliente = factura = num1 = num2 = 0;
		var desde = hasta = "";

		if ($("#ncli").val() != '') {
			cliente= $("#ncli").prop("idc"); 
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

		var p = arr('login', 4, "" , 302, $("#cp").is(":checked")+','+ factura+','+ cliente +',"'+ desde +'","'+ hasta +'",'+ num1 +','+ num2, 0,0,0   )[0]
		$("#listaclientes").html('');
		$.each(p,function(i){
			$("#listaclientes").append('<tr class="button-collapse detalle" data-activates="acciones" id="a'+p[i][4]+'""><td style=" padding: 10px;">'+p[i][0]+'</td><td style=" padding: 10px;">'+p[i][1]+'</td><td style=" padding: 10px;">'+p[i][2]+'</td><td style=" padding: 10px;">'+p[i][3]+'</td></tr>');
		});

		$("#data-table-Notas").dataTable({

			bFilter: false,
			order : [],
			"bLengthChange": false
		}); 



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
$(document).on("click","#Iadd",function(){
	deadclear('notas')

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

function endDetail(vid){

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

function endDetail(vid) {
	setTimeout(function(){ console.log('Registro Ingresado') }, 2000);
	return false;
}