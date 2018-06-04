$(function(){
	$(".menu").click(function(){
		var id = $(this).attr('id').substr(1);
		var bdy = $("#mainbdy");
		var p;
		bdy.html('');
		arr('rutas',id,'','','',0,1,bdy);
		$(".menu").removeClass('active');
		$("#m"+id).addClass('active');
        switch(parseInt(id)) {
        	case 1:
			    $("#data-table-rutas").dataTable({
					bFilter: false,
					order : [],
					"bLengthChange": false
				});

                 $("#ncli").keydown(function(e){
                    var charCode = e.which || e.keyCode;
                    var charStr = String.fromCharCode(charCode);
 
                    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
                        $(".autocomplete-content").remove();
                      
                        $("#ncli").autocomplete({
                            limit: 20,
                            data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'!bisproveedor and id > 0 and id not in(select idcliente from rutaclientes) having nom like "%'+$("#ncli").val()+'%"  limit 20',0,0,0,1)
                        });

                        $("#ncli").siblings($(".autocomplete-content")).css('width','25%');
                    }
                });

                $("#ncli").blur(function(){
                    searchClient($(this).val())
                });

                $("#ncli").keyup(function(e){
                    var code =  e.which || e.keyCode;
                    if (code == 13)
                        $(this).blur();
                });
        		break;
        	case 2:
            $(".ld").hide();
        		break;
        	case 3:
        		break;
        	default:
        	 	break;
        }

        $('.modal').modal();
        $('select').material_select(); 
        $('.tooltipped').tooltip();
        $(".autocomplete").blur(function(){ 
            $(".autocomplete-content").hide('500'); 
        });
	});

	$("#m1").click();

});

$(document).on("click","#ingRut",function(){
	deadclear('ruta');
	$("#vnombre").focus();
	$("#titrut").html('Ingresar Ruta');
	$("#garuta").removeClass('edit');
	$("#garuta").addClass('add');
});

$(document).on("click",".crut",function(){
    $("#vnombre").select().focus();
    $("#titrut").html('Actualizar Ruta');
    $("#garuta").removeClass('add');
    $("#garuta").addClass('edit');
});

$(document).on("click",".luser",function(){
    $(".a").show();
    deadclear('detalleruta');
   $("#lruteros").html('');
   $(".edd").hide();
   var id = $(this).prop('id').substr(1);
   $(".titr").html($("#rn"+id).html());
   var p = arr('login',4,'',218,id+','+'-1',0,0,0)[0];
   $("#vidruta").val(id); 
   for (var i = 0; i < p.length; i++) {
       $("#lruteros").append('<a href="#!" class="collection-item load cdetaller" modulo="detalleruta" id="z'+p[i][0]+'"><span class="badge">'+p[i][2]+'</span> '+p[i][1]+'</a>');
   }

});

$(document).on("click",".cdetaller",function(){
    $(".a").hide();
    var id = $(this).prop('id').substr(1);
    $(".edd").show(); 

});

$(document).on("click","#goback",function(){
    $(".edd").hide();
    deadclear('detalleruta'); 
});

$(document).on("click",".lcliente",function(){
   var id  = $(this).prop('id').substr(1);
   $("#cidruta").val(id);
   $(".titr").html($("#rn"+id).html());
   inicializarClientes(id,'');
});

$(document).on("keyup","#seachcliente",function(e){
    var code = e.which || e.keyCode
    if (code == 13) {
        inicializarClientes($("#cidruta").val(),$(this).val());
    }    
});

$(document).on("change","#seachcliente",function(){
    if ($(".f2").is(":visible")){
        $(".f2").addClass('hide');
        $(".ld").hide();
        $(".sd").show();
    }
    else
        $(".f1").removeClass('hide');

    var tipo = $('option:selected',this).val();
    var p = arr('login',4,'',218,'-1'+','+tipo,0,0,0)[0];
    var str = '';
    $("#seachruteros").html('<option value="" disabled selected>Seleccione una Ruta</option>');
    for (var i = 0; i < p.length; i++) {
        str += '<option value="'+p[i][0]+'" tp="'+tipo+'">'+p[i][2]+' - '+p[i][1]+'</option>';
    }
    $("#seachruteros").append(str);
    $("#seachruteros").material_select('update');  
});

$(document).on("change","#seachruteros",function(){
    $(".f2").removeClass('hide');
    $(".sd").hide();
    $(".ld").show();
    $(".select-dropdown").css("margin-bottom",'0px');
    var iddetrut = $('option:selected',this).val();
    var p = arr('login',4,'',223,iddetrut+',0,"'+$("#seachpinvrut").val()+'"',0,0,0)[0];
 
    $("#invname").html(p[0][0].toUpperCase());
    $("#invname").prop('nv',p[0][2]);
    var str = '';

    if (p[0][1] != null){
        for (var i = 0; i < p.length; i++) {
            str += '<a href="#!" class="collection-item" id="f'+p[i][1]+'" nv="'+p[i][2]+'" rd="'+p[i][3]+'"><span class="new badge" data-badge-caption="">'+p[i][4]+'</span>'+p[i][5]+'</a>';
        }
    }

    $("#coll1").html(str);   
    
    if ($(this).prop('tp') != 0){
        $(".descargar").hide();
        $(".cargar").show();
    }
    else{
        $(".cargar").hide();
        $(".descargar").show();
    }
});

$(document).on("change","#vidinventario",function(){
    var str = '';
    var p = arr('login',4,'',223,'0,'+$('option:selected',this).val()+',"'+$("#seachpinv").val()+'"',0,0,0)[0];

    for (var i = 0; i < p.length; i++) {
        str += '<a href="#!" class="collection-item xty" id="f'+p[i][1]+'" nv="'+p[i][2]+'" rd="'+p[i][3]+'"><span class="new badge pbtn" data-badge-caption="">'+p[i][4]+'</span><span class="nom'+p[i][1]+'">'+p[i][5]+'</span></a>';
    }

    $("#coll0").html(str); 
});

$(document).on("change","#vidbodega",function(){
   var p = arr('login',4,'id,nombre',111,'id > 0 and idbodega = '+$('option:selected',this).val())[0];
   var str = '';
   for (var i = 0; i < p.length; i++) {
        str += '<option value="'+p[i][0]+'">'+p[i][1]+'</option>';
    }
    $("#vidinventario").html('<option value="" selected disabled class="truncate">Seleccione un Inventario</option>');
    $("#vidinventario").append(str);
    $("#vidinventario").material_select('update');
    $(".select-dropdown").css("margin-bottom",'0px'); 
});

$(document).on("click",".xty",function(){
   var nv = $(this).prop('nv');
   var rd = $(this).prop('rd');
   var id = $(this).prop('id').substr(1);
   var cant0 = parseFloat($(this).find('.badge').html());
   
    if($("#coll1 [id='f"+id+"']").length == 0)
        $("#coll1").append('<a href="#!" class="collection-item" id="f'+id+'" nv="'+nv+'" rd="'+rd+'"><span class="new badge" data-badge-caption="">1</span>'+$(this).find('.nom'+id).html()+' ('+$('#vidinventario option:selected').html()+')</a>');
    else{
        var cant1 = parseFloat($("#coll1 [id='f"+id+"'] .badge").html());
        $("#coll1 [id='f"+id+"'] .badge").html(cant0 == 0 ? cant1 : (cant1+1).formatMoney(2,',','.'));
    }

    $(this).find('.badge').html(cant0 == 0 ? 0 : (cant0-1).formatMoney(2,',','.') );
});

function searchClient(vvariable){
    
    var clie = arr('login',4,'',63,'\"'+vvariable+'\",0,@@impresa','',0,'');
    if (clie[0][0][0] != 0) {
        var vclie = clie[0][0];

        var idcli   = vclie[0];
        var idrut   = $("#cidruta").val();
        $("#ncli").val('');

        var p = arr('login',7,1,219,'idcliente,idruta',idcli+','+idrut,0,0);
        inicializarClientes(idrut,'');
    }

    Materialize.updateTextFields();

}

function inicializarClientes(vid,vnom){
    var tabla = $("#data-table-rutaclientes");
    tabla.DataTable().destroy()

    arr('login',6,'',220,vid+',"'+vnom+'"',0,1,$('#listarutaclientes'));

    tabla.dataTable({
        bFilter: false,
        order : [],
        "bLengthChange": false
    });
}

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'ruta':
			if (vmodulo['tip'] == '') {
				err = validarrutas();
				if ( err ) {
					return err;
				}
			}
			break;
        case 'detalleruta':
            if (vmodulo['tip'] == '') {
                err = validarDetalleRuta("#f"+vmodulo['modulo']+"s");
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

function validarrutas() {

	if ($("#vnombre").val() == '') {
		$("#vnombre").focus();
		return 'Nombre de Ruta Requerido';
	}

	return false;
}

function validarDetalleRuta(modulo){
    
    if ($(modulo+" #vidfila_enc option:selected").val() == '') {
        $(modulo+" #vidfila_enc").focus();
        return 'Usuario Requerido';
    }

    if ($(modulo+" #vidinventario option:selected").val() == '') {
        $(modulo+" #vidinventario").focus();
        return 'Inventario Requerido';
    }

    return false;
}

function endDetail(vid,vacc,modulo){

    switch(modulo){
        case 'ruta':
            if (vacc == 1) {
                setTimeout(function(){ deadclear('ruta'); }, 500);
            }
            thorload('ruta');
            break;
        case 'detalleruta':
            setTimeout(function(){ deadclear('detalleruta'); }, 500);
            break;
        default:
            break;
    }

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'ruta':
			vmodulo['sel'] = 'id as vid,nombre as vnombre,codigoruta as vcodigoruta';
			vmodulo['tbl'] = 208;
			vmodulo['where'] ='id = '+vid;
			break;
        case 'detalleruta':
            vmodulo['sel'] = '';
            vmodulo['tbl'] = 222;
            vmodulo['where'] =vid;
            break;
		default:
			return 'Módulo sin Cargar '+vmodulo['modulo'];
			break;
	}
	
	return vmodulo;
}

function cargarSintax(){
	var arr = {}

	arr['sel'] = '*';
	arr['tbl'] = 208;
	arr['where'] = 'id > 0';

	return arr;
}