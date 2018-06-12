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
    Materialize.updateTextFields();

});

$(document).on("click",".print_inv",function(){
    var idruta = $("#seachruteros").val();
    window.open('rutas?accion=3&idruta='+vid);
});

$(document).on("click",".cargar",function(){
    var invprev = $("#vidinventario").val();
    var nextinv = $("#invname").attr('idinv');
    var idruta = $("#seachruteros").val();

    if ($(".prodcuto").length == 0) {
        Materialize.toast('Productos requeridos', 4000, 'red');
        return false;
    }
    var mover = '';
    var cont = 0;

    $(".prodcuto").each(function(){
        var idprod = $(this).attr('idprod');
        var cant = $(this).attr('cantidad');
        mover = arr('login',4,'',512,invprev+','+nextinv+','+idprod+','+cant+','+idruta,0,0,0);
        if (mover['succed'] == 1) {
            cont = 1;
        }else{
            cont = 0;
        }
    });

    if (cont == 1) {
        Materialize.toast('Registro guardado correctamente', 4000, 'green');
        // $("#m2").click();

    }else{
        Materialize.toast(mover[0]['ERROR'], 4000, 'green');
    }
});
// 4743 y 4761 super los amigos

$(document).on("click","#assgninvtoruta",function(){
    var idprod = $("#descp").attr('idprod');
    var prod = $("#descp").val();
    var cant = parseFloat($("#cantp").val());
    cargarProducto(idprod,prod,cant);
});

// $(document).on("keyup","#cantp",function(e){
//     var code = e.which || e.keyCode;
//     if (code == 13) {
//         cargarProducto();
//     }
// });

function cargarProducto(idprod,prod,cant) {
    if (cant > 0) {
        var invprev = $("#vidinventario").val();
        var nextinv = $("#invname").attr('idinv');
        $("#coll1").append('<a class="collection-item prodcuto" idprod="'+idprod+'" cantidad="'+cant+'">'+prod+'<span class="new badge" data-badge-caption="unidades">'+cant+'</span></a>');
        // <span class="badge mdi mdi-close mdi-24px cdel pbtn dprod" id="dp'+idprod+'" idprod="'+idprod+'" cant="'+cant+'" invprev="'+invprev+'" nextinv="'+nextinv+'"></span>
        $("#codp").val('');
        $("#descp").val('');
        $("#cantp").val(1);
        $("#codp").focus();
    }else{
        Materialize.toast('Cantidad debe ser mayor a 0', 4000, 'red');
        $("#cantp").select();
    }
}
$(document).on("click",".dprod",function(){
    var id = $(this).attr('id').substr(2);
    var idprod = $(this).attr('idprod');
    var cant = $(this).attr('cant');
    var invprev = $(this).attr('invprev');
    var nextinv = $(this).attr('nextinv');
    var idruta = $("#seachruteros").val();

    var undo = arr('login',4,'',512,nextinv+','+invprev+','+idprod+','+cant+','+idruta,0,0,0);
    $("[idprod="+id+"]").remove();
});

$(document).on("keydown","#descp",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = keysight(e)
   
    if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;
        var idinventario = $("#vidinventario").val();
        $(".autocomplete-content").remove();
        
        $("#descp").autocomplete({
            limit: 20,
            data: arr('login',4,'',510,'"'+busqueda+'","",'+idinventario+',@@impresa',0,0,0,1)
        })

        $("#descp").siblings($(".autocomplete-content")).css('width','50%');
    }else if(charCode == 13) {
        var prod = arr('login',4,'',14,'0,0,"'+$(this).val()+',@@impresa","0,1"')[0];
        
        if (prod[0][0] != undefined) {
            $("#descp").attr('idprod',prod[0][0]);
            $("#descp").val(prod[0][3]);
            $("#codp").val(prod[0][1]);
        }
        $("#cantp").select();
        Materialize.updateTextFields();
    }
});


$(document).on("keydown","#codp",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = keysight(e)
    if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;
        var idinventario = $("#vidinventario").val();
        $(".autocomplete-content").remove();
        arr('login',4,'',510,'"","'+busqueda+'",'+idinventario+',@@impresa',0,0,0,0)
        
        $(this).autocomplete({
            limit: 20,
            data: arr('login',4,'',510,'"","'+busqueda+'",'+idinventario+',@@impresa',0,0,0,1)
        })

        $(this).siblings($(".autocomplete-content")).css('width','50%');
    }else if(charCode == 13) {
        var prod = arr('login',4,'',14,'0,0,"'+$(this).val()+',@@impresa","0,1"')[0];
        
        if (prod[0][0] != undefined) {
            $("#descp").attr('idprod',prod[0][0]);
            $("#descp").val(prod[0][3]);
            $("#codp").val(prod[0][1]);
        }
        $("#cantp").select();
        Materialize.updateTextFields();
    }
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
    var id = $(this).prop('id').substr(1);
    $(".a").show();
    deadclear('detalleruta');
    $("#lruteros").html('');
    $(".edd").hide();
    var p = arr('login',4,'',218,id+','+'-1',0,0,0)[0];
    $(".titr").html($("#rn"+id).html());
    
    $("#vidruta").val(id); 
    for (var i = 0; i < p.length; i++) {
       $("#lruteros").append('<a href="#!" class="collection-item load cdetaller" modulo="detalleruta" id="z'+p[i][0]+'">'+p[i][1]+'</a>');
   }
   $("#vidtabla_enc").change();
   $("select").material_select();
});

$(document).on("click",".cdetaller",function(){
    $(".a").hide();
    var id = $(this).prop('id').substr(1);
    $(".edd").show();
    $("#detalleruta").hide();
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
        $(".ff").addClass('hide');
    }
    else
        $(".f1").removeClass('hide');

    if ($(this).val() == 1) {
        $(".cargar").show();
        $(".descargar").hide();
    }else{
        $(".cargar").hide();
        $(".descargar").show();
    }

    var tipo = $('option:selected',this).val();
    var p = arr('login',4,'',218,'-1'+','+tipo,0,0,0)[0];
    var str = '';
    $("#seachruteros").html('<option value="" disabled selected>Seleccione una Ruta</option>');
    for (var i = 0; i < p.length; i++) {
        // str += '<option value="'+p[i][0]+'" tp="'+tipo+'">'+p[i][2]+' - '+p[i][1]+'</option>';
        str += '<option value="'+p[i][0]+'" tp="'+tipo+'">'+p[i][1]+'</option>';
    }
    $("#seachruteros").append(str);
    $("#seachruteros").material_select('update');  
});

$(document).on("change","#seachruteros",function(){
    $(".f2").removeClass('hide');
    // $(".sd").hide();
    $(".ld").show();
    $(".ff").removeClass('hide');
    $(".select-dropdown").css("margin-bottom",'0px');
    var idtiporuta = $("#seachcliente").val();
    var idruta = $("#seachruteros").val();
    //inventario x default
    $("#vidbodega").val(1).change();
    $("#vidinventario").val(6);
    $("select").material_select();
    // var pinv = $("#seachpinvrut").val() == undefined ? '' : $("#seachpinvrut").val();
    // var p = arr('login',4,'',223,iddetrut+',0,"'+pinv+'"',0,0,0);
    var inv = arr('login',4,'',511,'4,'+idruta,0,0,0)[0][0];
    var productos = arr('login',4,'',511,'1,'+idruta,0,0,0)[0];
    $.each(productos,function(index,valor) {
        $("#coll1").append('<a class="collection-item prodcuto" idprod="'+valor[0]+'" cantidad="'+valor[2]+'">'+valor[1]+'<span class="new badge" data-badge-caption="unidades">'+valor[2]+'</span></a>');
        // <span class="badge mdi mdi-close mdi-24px cdel pbtn dprod" id="dp'+valor[0]+'" idprod="'+valor[0]+'" cant="'+valor[2]+'" invprev="'+0+'" nextinv="'+0+'"></span>
    });
    
    $("#invname").html(inv[1]);
    $("#invname").attr('idinv',inv[0]);
    $("#codp").focus();
    // var str = '';

    // if (p[0][1] != null){
    //     for (var i = 0; i < p.length; i++) {
    //         str += '<a class="collection-item prodcuto" idprod="'+p[i][0]+'" cantidad="'+p[i][2]+'">'+p[i][1]+'<span class="new badge" data-badge-caption="unidades">'+p[i][2]+'</span></a>';
    //     }
    // }

    // $("#coll1").html(str);   
    
    // if ($(this).prop('tp') != 0){
    //     $(".descargar").hide();
    //     $(".cargar").show();
    // }
    // else{
    //     $(".cargar").hide();
    //     $(".descargar").show();
    // }
    Materialize.updateTextFields();
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
   var p = arr('login',4,'id,nombre',111,'id > 0 and find_in_set(idsucursal,concat(-1,",",0)) and idbodega = '+$('option:selected',this).val())[0];
   var str = '';
   for (var i = 0; i < p.length; i++) {
        str += '<option value="'+p[i][0]+'">'+p[i][1]+'</option>';
    }
    $("#vidinventario").html('<option value="" selected disabled class="truncate">Seleccione un Inventario</option>');
    $("#vidinventario").append(str);
    $("#vidinventario").material_select('update');
    $(".select-dropdown").css("margin-bottom",'0px'); 
});

// $(document).on("click",".xty",function(){
//    var nv = $(this).prop('nv');
//    var rd = $(this).prop('rd');
//    var id = $(this).prop('id').substr(1);
//    var cant0 = parseFloat($(this).find('.badge').html());
   
//     if($("#coll1 [id='f"+id+"']").length == 0)
//         $("#coll1").append('<a href="#!" class="collection-item" id="f'+id+'" nv="'+nv+'" rd="'+rd+'"><span class="new badge" data-badge-caption="">1</span>'+$(this).find('.nom'+id).html()+' ('+$('#vidinventario option:selected').html()+')</a>');
//     else{
//         var cant1 = parseFloat($("#coll1 [id='f"+id+"'] .badge").html());
//         $("#coll1 [id='f"+id+"'] .badge").html(cant0 == 0 ? cant1 : (cant1+1).formatMoney(2,',','.'));
//     }

//     $(this).find('.badge').html(cant0 == 0 ? 0 : (cant0-1).formatMoney(2,',','.') );
// });

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
            var p = arr('login',4,'',218,vid+','+'-1',0,0,0)[0];
            setTimeout(function(){ deadclear('detalleruta'); }, 500);
            $("#lruteros").html('');
            for (var i = 0; i < p.length; i++) {
               $("#lruteros").append('<a href="#!" class="collection-item load cdetaller" modulo="detalleruta" id="z'+p[i][0]+'">'+p[i][1]+'</a>');
            }
            if (vacc == 1)
                $("#detalleruta").show();
            else if (vacc == 3) {
                $("#detalleruta").show();
                $(".edd").hide();
            }
            
            break;
        default:
            break;
    }

    return false;
}

function postload(vmodulo) {
    switch (vmodulo){
        case 'detalleruta':
            $("#vidinventario").val($("#hinventario").val());
            $("#vidinventario").material_select();
            $(".delete[modulo=detalleruta]").attr('id','f'+$("#fdetallerutas #vid").val());
            break;
    }
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
            vmodulo['where'] = vid;
            break;
		default:
			return 'Módulo sin Cargar '+vmodulo['modulo'];
			break;
	}
	
	return vmodulo;
}

function cargarSintax(modulo){
    switch (modulo){
        case 'rutas':
        	var arr = {}
        	arr['sel'] = '*';
        	arr['tbl'] = 208;
        	arr['where'] = 'id > 0';
            break;
        case 'detallerutas':
            break;
    }
	return arr;
}