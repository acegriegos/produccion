var invvar = getDatos('',909,'@@impresa',0,0)[0];
var ifila = 0;
// tipo = $("li.menu3 >a.active").parent().attr('id').substr(1)
$(function(){

	if (invvar[0][0] == '') 
		Materialize.toast('No hay Inventario de Variedades Seleccionado',3000,'')

    param = getParameterByName('accion');
    param = param == '' ? 0 : parseInt(param)
    
    switch(param){
    	case 1:
    		loadRecepcion();
    		break;
    	case 3:
    		loadAjustes();
        default:
            break;
    }
    console.clear();
    console.log(invvar[1][0]+' '+invvar[1][1])
    console.log(invvar[4][0]+' '+invvar[4][1])
    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '2%', // Starting top style attribute
        endingTop: '2%' // Ending top style attribute
    });
    $("select").material_select();
});

//fill data
$(document).on("change","[name=tipoclie]",function() {
    $("#fclientes .zelda").data('triforce')['vidtipocliente'] = $(this).attr('tipoclie');
});
$(document).on("keyup","#cedula",function() {
    $("#fclientes .zelda").data('triforce')['vcedula'] = $(this).val();
});
$(document).on("keyup","#nombre",function() {
    $("#fclientes .zelda").data('triforce')['vnombre'] = $(this).val();
});
$(document).on("keyup","#apellido1",function() {
    $("#fclientes .zelda").data('triforce')['vapellido1'] = $(this).val();
});
$(document).on("keyup","#apellido2",function() {
    $("#fclientes .zelda").data('triforce')['vapellido2'] = $(this).val();
});
$(document).on("change","#categoria",function() {
   $("#fclientes .zelda").data('triforce')['vidnivel'] = $(this).val();
});
$(document).on("keyup","#vcodigo",function() {
    $("#fservicios .zelda").data('triforce')['vcodigo'] = $(this).val();
});
$(document).on("keyup","#vnombre",function() {
    $("#fservicios .zelda").data('triforce')['vnombre'] = $(this).val();
});
$(document).on("keyup","#vdescripcion",function() {
    $("#fservicios .zelda").data('triforce')['vdescripcion'] = $(this).val();
});
$(document).on("keyup","#vpbase",function() {
    $("#fservicios .zelda").data('triforce')['vpbase'] = $(this).val();
});
$(document).on("change","#vidinventario",function(){
    $("#fservicios .zelda").data('triforce')['vidinventario'] = $(this).val();
});
// fill data //

$(document).on("click","#cancelact",function(){
    emptymedio();
    $("#addmedio").removeAttr('data-ifila');
    $("#actmedio").attr('id','addmedio');
    $("#addmedio").removeClass('mdi-cancel').addClass('mdi-plus');
    $(this).addClass('hide');
});

$(document).on("click",".labedit",function(){
    var id = $(this).attr('id').substr(2);
    var elem = $("#ifila"+id);
    var idproducto = elem.data('idproducto');
    var idunidad = elem.data('idunidad');
    var idinventario = elem.data('idinventario');
    var cantidad = elem.data('cantidad');
    if (idproducto.toString().substr(0,1) != '+') {
        var info = arr('login',4,'',14,idproducto+',0,"","0,1"',0,0,0)[0][0];
        var nombre = info[3]+' - '+info[39];
        var codigo = info[1]+' - '+info[39];
        $("#_vnombre").val(nombre);
        $("#_vcodigo").val(codigo);
        $("#_vcantidad").val(cantidad);
        $("#_vidunidad").val(idunidad);
        Materialize.updateTextFields();
        $("#_vidunidad").material_select();
        $("#addmedio").attr('id','actmedio');
        $("#actmedio").removeClass('mdi-plus').addClass('mdi-pencil');
        $("#actmedio").attr('data-ifila', id);
        $("#cancelact").removeClass('hide');
        $("#_vnombre").attr('readonly', true).removeClass('validate');
        $("#_vcodigo").attr('readonly', true).removeClass('validate');
    }
});

$(document).on("click",".labdel",function(){
    var id = $(this).attr('id').substr(2);
    var $toastContent = $('<span>Desea eliminar esta fila?</span>').add($('<button class="btn-flat toast-action green white-text" id="delcomp" idfila="'+id+'">Aceptar</button>'));
    Materialize.toast($toastContent, 6000);
});

$(document).on("click","#delcomp",function(){
    var id = $(this).attr('idfila');
    $("#ifila"+id).removeData();
    $("#ifila"+id).remove();
});

$(document).on("click","#addmedio",function(){
    addmedio(1,'');
});

$(document).on("click","#actmedio",function(){
    addmedio(2,$(this).data('ifila'));
});

function addmedio(tp,idfila) {
    var elemento = $("#_vnombre").val();
    var nombre = elemento.substr(0,elemento.lastIndexOf('-')-1) == '' ? $("#_vnombre").val() : elemento.substr(0,elemento.lastIndexOf('-')-1);
    var inventario = elemento.indexOf('-') < 0 ? '' : elemento.substr(elemento.lastIndexOf('-')+2);
    var comp = arr('login',4,'',920,'"'+nombre+'","'+inventario+'"',0,0,0);
    if (comp['succed'] == 1) {
        var idref = $("#_vidreferencia").val();
        var idciclo = $("#_vidciclo").val();
        var cantidad = $("#_vcantidad").val();
        var idunidad = $("#_vidunidad").val();
        var simbolo = arr('login',4,'UPPER(simbolo)',107,'id > 0 and id = '+idunidad,0,0,0)[0][0];

        if (tp == 1) {
            $("#listamedioscultivos").attr({
                'data-idreferencia': idref,
                'data-idciclo': idciclo
            });
            ifila++;
            //vaccion,vid,vidsolucion,vidproducto,vidunidad,vidinventario,vcantidad
            $("#listamedioscultivos").append(
                '<tr id="ifila'+ifila+'" class="detsolution">'+
                    '<td class="center" style="padding: 1% !important;">'+nombre+'</td>'+
                    '<td class="center" style="padding: 1% !important;">'+cantidad+' '+simbolo+'</td>'+
                    '<td class="center" style="padding: 1% !important;">'+
                        '<i class="pbtn mdi mdi-pencil mdi-24px labedit" id="le'+ifila+'"></i>'+
                        '<i class="pbtn mdi mdi-close mdi-24px cdel labdel" id="ld'+ifila+'"></i>'+
                    '</td>'+
                '</tr>');
            $("#ifila"+ifila).attr({
                'data-idproducto': comp[0][0][0],
                'data-idunidad': idunidad,
                'data-idinventario': comp[0][0][3],
                'data-cantidad': cantidad
            });
        }else{

            var cantidad = $("#_vcantidad").val();
            var idunidad = $("#_vidunidad").val();
            var simbolo = arr('login',4,'UPPER(simbolo)',107,'id > 0 and id = '+idunidad,0,0,0)[0][0];
            $("#ifila"+idfila+" > td:eq(1)").text(cantidad+' '+simbolo)
            $("#ifila"+idfila).data('idunidad',idunidad);
            $("#ifila"+idfila).data('cantidad',cantidad);

            $("#ifila"+idfila).attr({
                'data-cantidad': cantidad,
                'data-idunidad': idunidad
            });
            $("#_vnombre").attr('readonly',false).addClass('validate');
            $("#_vcodigo").attr('readonly',false).addClass('validate');
            $("#actmedio").attr('id', 'addmedio');
            $("#addmedio").removeAttr('data-ifila').removeClass('mdi-pencil').addClass('mdi-plus');
            $("#cancelact").addClass('hide');
        }
        emptymedio();
    }
    else{
        Materialize.toast(comp[0]['ERROR'], 4000, 'red');
        $("#_vnombre").select()
    }
}

$(document).on("keydown","#_vnombre",function(e) {
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    var inventario = invvar[1][0]+','+invvar[4][0];
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
         $("#_vnombre").autocomplete({
            limit: 10,
            data: arr('login',4,'',917,'1,"'+$(this).val()+charStr+'","'+inventario+'"',0,0,0,1)
        });
        // cargarunidades(vidproducto,vunidad);  
        $("#_vnombre").siblings($(".autocomplete-content")).css('width', '25%');
    }else if(charCode == 13 ) {
        $("#_vcantidad").focus();
    }
});

$(document).on("keydown","#_vcodigo",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    var inventario = invvar[1][0]+','+invvar[4][0];
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
        $("#_vcodigo").autocomplete({
            limit: 20,
            data: arr('login',4,'',917,'2,"'+$(this).val()+charStr+'","'+inventario+'"',0,0,0,1)
        });
        $("#_vcodigo").siblings($(".autocomplete-content")).css('width', '25%');
    }else if(charCode == 13 ) {
        $("#_vcantidad").focus();
    }
});

$(document).on("click","#savemedio",function(){
    //base: vaccion,vid,vidusuario,vidreferencia,vidsucursal,vidciclo
    var idreferencia = $("#listamedioscultivos").data('idreferencia');
    var idciclo = $("#listamedioscultivos").data('idciclo');
    var sig = 0;
    var antmedios = arr('login',4,'',921,idciclo+',@@impresa',0,0,0);
    var idsolucion = 0;
    if (antmedios[0].length == 0) {
        idsolucion = arr('login',4,'',918,'1,0,@@usr,'+idreferencia+',@@impresa,'+idciclo,0,0,0);
        if (idsolucion['succed'] == 1) {
        // detalle: vaccion,vid,vidsolucion,vidproducto,vidunidad,vidinventario,vcantidad
            $(".detsolution").each(function(){
                var id = $(this).attr('id').substr(5);
                var idproducto = $("#ifila"+id).data('idproducto');
                var idunidad = $("#ifila"+id).data('idunidad');
                var idinventario = $("#ifila"+id).data('idinventario');
                var cantidad = $("#ifila"+id).data('cantidad');
                var detalle = arr('login',4,'',919,'1,0,'+idsolucion[0][0]+','+idproducto+','+idunidad+','+idinventario+','+cantidad,0,0,0)
                if (detalle['succed'] == 0) {
                    Materialize.toast('ERROR', 4000, 'red');
                    return false;
                }else{
                    sig = 1;
                }
            });
            if (sig == 1) {
                Materialize.toast('Registro guardado correctamente', 4000, 'green');
            }
        }else{
            if ($("#listamedioscultivos .detsolution").length == 0) {
                Materialize.toast('Debe agregar componentes', 4000, 'red');
            }else{
                Materialize.toast(idsolucion[0]['ERROR'], 4000, 'green');
            }
        }
    }else{
        idsolucion = antmedios[0][0][0];
        arr('login',4,'',919,'3,0,'+idsolucion+',0,0,0,0',0,0,0)
        $(".detsolution").each(function(){
            var id = $(this).attr('id').substr(5);
            var idproducto = $("#ifila"+id).data('idproducto');
            var idunidad = $("#ifila"+id).data('idunidad');
            var idinventario = $("#ifila"+id).data('idinventario');
            var cantidad = $("#ifila"+id).data('cantidad');
            console.log(id+' '+cantidad+' '+idunidad)
            var detalle = arr('login',4,'',919,'1,0,'+idsolucion+','+idproducto+','+idunidad+','+idinventario+','+cantidad,0,0,0)
            if (detalle['succed'] == 0) {
                Materialize.toast('ERROR', 4000, 'red');
                return false;
            }else{
                sig = 1;
            }
        });
        if (sig == 1) {
            Materialize.toast('Registro guardado correctamente', 4000, 'green');
        }
    }

});

function emptymedio() {
    $("#_vnombre").val('');
    $("#_vcodigo").val('');
    $("#_vcantidad").val('');
    $("#_vidunidad").val(0);
    $("#_vidunidad").material_select();
    $(".validate").css('border-bottom', '1px solid #9e9e9e');
    $(".validate").css('box-shadow', 'none');
    $("#_vnombre").focus();
}

$(document).on("click",".modalmedios",function() {
    var tm = $(this).attr('tm');
    var referencias = arr('login',4,'',916,'0',0,0,0)[0];
    for (var i = 0, len = referencias.length; i < len; i++) {
        $("#_vidreferencia").append('<option value="'+referencias[i][0]+'">'+referencias[i][1]+'</option>')
    }
    arr('login',6,'id,concat(nombre,"(",simbolo,")")',107,'id > 0 order by nombre',15,1,$("#_vidunidad"))
    $("#_vidciclo").val(tm)
    $("#_vidreferencia").material_select();
    $("#_vidunidad").material_select();
    var comps = arr('login',4,'',921,tm+',@@impresa',0,0,0);
    ifila = comps[0].length;
    if (comps[0].length > 0) {
        $("#listamedioscultivos").attr({
            'data-idreferencia': $("#_vidreferencia").val(),
            'data-idciclo': tm
        });
        arr('login',6,'',921,tm+',@@impresa',0,1,$("#listamedioscultivos"));
    }else{
        $("#listamedioscultivos").removeAttr('data-idreferencia').removeAttr('data-idciclo');
    }
    $("#modal-medios").modal('open');
    
});

$(document).on('click','#addFin',function() {
	if ($("#flaboratorio-explantes .zelda").data('triforce')['vidcliente'] != 0) {
		$(".titadd").html("Agregar Finca");
		$(".cli").hide();
		$(".serv").hide();
		$(".prod").show();
		$("#ingresar").attr('codigo',"2");
		$("#addClie").modal('open');
        $("#vpais").val('Costa Rica');
        $("#vpais").blur();
        cargarProvincias();
        Materialize.updateTextFields();
	}else{
		Materialize.toast('Cliente Requerido',4000,'red');
		$("#ncli").focus();
	}
});

$(document).on("click","#registrar",function() {
    var id = $(this).attr('id').substr(1);
    arr('login',6,'id,nombre',913,'id > 0 and isActivo = 0',15,1,$("#vidrazon"))
    var activos = arr('login',4,'',917,id+',@@impresa',0,0,0)[0];
    $("#modal-registrar").modal('open');
    $("#vidrazon").material_select();
    $("#nomvar").val($("#vvariedad").val());
    $("#nomvar").attr('disabled',true);
    Materialize.updateTextFields();
});

$(document).on("click","#assbandeja",function() {
    $("#modal-bandeja").modal('open');
    arr('login',6,'',411,invvar[2][0],15,1,$("#cbandeja"));
    $("#cbandeja").material_select();
});

$(document).on("click","#chgbandeja",function() {
    var idbandeja = $("#cbandeja").val();
    $("#hidbandeja").val(idbandeja);
    Materialize.toast('Bandeja seleccionada', 4000, 'green');
});

$(document).on("click",".procmult",function() {
    var id = $(this).attr('id').substr(1);
    $("#domult").attr('idciclo',id);
    $("#modal-invstats").modal('open');
    $("#titinvstat").html('Procesar a multiplicación');
    arr('login',6,'id,nombre',913,'id > 0 and isactivo = 1',15,1,$("#srazon"));
    // arr('login',6,'id,nombre',913,'id > 0 and isActivo = 0',15,1,$("#vidrazon"));
    var svari = arr('login',4,'',924,id,0,0,0)[0][0][1];
    $("#svari").val(svari);
    $("#varfinal").text(svari);
    Materialize.updateTextFields();
    $("select").material_select();
});

$(document).on("click","#domult",function() {
    //multiplicacion
    var id = $(this).attr('idciclo');
    var idtipo = $("li.menu3 > a.active").parent().attr('id').substr(1);
    var idbandeja = $("#hidbandeja").val(),
    idmedio = $("#hidmediocultivo").val();
    var ciclo = arr('login',4,'',914,id+','+idtipo+','+idbandeja+','+idmedio,0,0,0);
    if (ciclo['succed'] == 1) {
        //investadisticas
        var idrazon = $("#srazon").val(),
        serv = $("#idserv").val(),
        prod = 0,
        cant = $("#cantact").val() == '' ? 0 : $("#cantact").val(),
        comen = $("#comentproc").val();
        arr('login',4,'',918,'1,0,'+id+','+idrazon+','+serv+','+prod+','+cant+',@@usr,"'+comen+'"',0,0,0);
        Materialize.toast('Registro guardado correctamente', 4000, 'green');
        arr('login',6,'',912,'0,0,"'+idtipo+',@@impresa","0,10"',0,1,$("#listaciclos"))
    }
});

$(document).on("click","#addchip",function() {
    // var idserv = $("#idsrv").val();
    // var serv = 
    // var cant = 
    // $("#srv1").text('Servicio1');
    // $("#cnt1").text('1')
});

$(document).on("click",".mcb",function() {
    var id = $(this).attr('id').substr(1);
    $("#modal-vmediocultivo").modal('open');
    var bdy = '';
    var mats = arr('login',4,'',916,id+',@@impresa',0,0,0)[0];

    for (var i = 0, len = mats.length; i < len;i++) {
        bdy += '<tr><td style="padding: 10px; color:black;">'+mats[i][1]+'</td><td style="padding: 10px; color:black;">'+mats[i][2]+'</td></tr>';
    }
    // Falta medios de cultivo
    $("#listamediocultivos").html(bdy)

});

// $(document).on("click",".procact",function(){
//     var id = $(this).attr('id').substr(1);
//     $("#vidciclo").val(id);
//     arr('login',6,'id,nombre',913,'id > 0 and isActivo = 1',15,1,$("#vidrazon"))
//     var activos = arr('login',4,'',917,id+',@@impresa',0,0,0)[0];
//     $("#modal-procActivos").modal('open');
//     $("#vidrazon").material_select();

//     $("#nomact").keydown(function(e) {
//         var charCode = e.which || e.keyCode;
//         var charStr = String.fromCharCode(charCode);
//         if (/[a-zA-Z0-9-_. ]/i.test(charStr)) {
//             $(".autocomplete-content").remove();
//             $("#nomact").autocomplete({
//                 limit: 20,
//                 data: arr('login',4,'',917,'"'+$("#nomact").val()+'",'+id+',@@impresa',0,0,0,1)
//             })
//             $("#nomact").siblings($(".autocomplete-content")).css('width','50%');
//         }
//     });
// });

$(document).on("click",".invstats",function(){
    var id = $(this).attr('id').substr(1);
    var tipo = $(this).attr('tipo');
    if (tipo == 1) {
        $("#titinvstat").html('Procesar Activos');
    }else{
        $("#titinvstat").html('Registrar Pérdidas');
    }
    $("#vidciclo").val(id);
    arr('login',6,'id,nombre',913,'id > 0 and isActivo = '+tipo,15,1,$("#vidrazon"))
    var activos = arr('login',4,'',917,id+',@@impresa',0,0,0)[0];
    $("#modal-invstats").modal('open');
    $("#vidrazon").material_select();

    $("#nomact").keydown(function(e) {
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        if (/[a-zA-Z0-9-_. ]/i.test(charStr)) {
            $(".autocomplete-content").remove();
            $("#nomact").autocomplete({
                limit: 20,
                data: arr('login',4,'',917,'"'+$("#nomact").val()+'",'+id+',@@impresa',0,0,0,1)
            })
            $("#nomact").siblings($(".autocomplete-content")).css('width','50%');
        }
    });
});

$(document).on("blur","#nomact",function(){
    var nombre = $(this).val();
    var prod = arr('login',4,'id',11,'nombre = "'+nombre+'"',0,0,0);
    if (prod[0][0] != undefined) {
        $("#hnomact").val(prod[0]);
    }else{
        $("#hnomact").val(0);
    }
});

$(document).on("click","#prcactivo",function(){
    // vaccion,vid,vidciclo,vidtipo,vidservicio,vidproducto,vcantidad,vidusuario,vcomentario
    var idciclo = $("#vidciclo").val(),
    idrazon = $("#vidrazon").val(),
    idproducto = $("#hnomact").val(),
    cantidad = $("#cantact").val(),
    comentario = $("#comentproc").val();
    var idinv = arr('login',4,'',918,'1,0,'+idciclo+','+idrazon+',0,'+idproducto+','+cantidad+',@@impresa,"'+comentario+'"',0,0,0);
    
});

$(document).on("click",".procenr",function(){
    var id = $(this).attr('id').substr(1);
    var $toastContent = $('<span>Proceder a enraizamiento?</span>').add($('<button class="btn-flat toast-action green white-text" id="doenr" idciclo="'+id+'">Aceptar</button>'));
    Materialize.toast($toastContent, 10000);
    
});

$(document).on("click","#doenr",function(){
    var id = $(this).attr('idciclo');
    var idtipo = parseInt($("li.menu3 >a.active").parent().attr('id').substr(1))+1;
    var ciclo = arr('login',4,'',914,id+','+idtipo,0,0,0);
    if (ciclo['succed'] == 1) {
        Materialize.toast('Registro guardado correctamente', 4000, 'green');
    }
});

$(document).on("click",".perdidas",function(){
    $("#modal-perdidas").modal('open');
});

$(document).on('click','.addVariedad',function(){
	$(".titadd").html("Agregar Variedad");
	$(".serv").show();
	$(".nserv").hide();
	$("#ingresar").attr('codigo',"3");
	$("#vnombre_serv").val($("#vvariedad").val());
	Materialize.updateTextFields();
	$("#addClie").modal('open');
	$("#vcodigo_serv").focus();

});

$(document).on("click","#mbandeja",function(){
    var id = $("#invactivlab").val();
    if (id != 0) {
        $(".zelda").data('triforce')['vidbandeja'] = id;
        var bandeja = $("#invactivlab option:selected").text();
        $("#bandeja").val(bandeja);
        Materialize.toast('Bandeja seleccionada', 4000, 'green');
    }else{
        $(".zelda").data('triforce')['vidbandeja'] = 0;
        $("#bandeja").val('');
    }
});

// $(document).on('click','.addClie',function(){
// 	$(".titadd").html("Agregar Cliente");
// 	$(".cli").show();
// 	$(".prod").hide();
// 	$(".serv").hide();
// 	$("#ingresar").attr('codigo',"1");
// 	$("#pais").val('Costa Rica');
// 	$("#pais").blur();

// 	var tmpname = $("#flaboratorio-explantes #ncli").val();

// 	$("#addClie #vnombre").val(tmpname.substring(0,tmpname.indexOf(' ')));
// 	tmpname = tmpname.substring(tmpname.indexOf(' ')+1);
	
// 	$("#addClie #vapellido1").val(tmpname.indexOf(' ') > 0 ? tmpname.substring(0,tmpname.indexOf(' ')) : tmpname);
// 	tmpname = tmpname.indexOf(' ') > 0 ? tmpname.substring(tmpname.indexOf(' ')+1) : '';

// 	$("#addClie #vapellido2").val(tmpname);
// 	Materialize.updateTextFields();
// 	$("#addClie").modal('open');
// 	$("#vcedula").focus();

// });

function loadAjustes(){

	$("#invVariedad").material_select('destroy');
    var opciones = $("#invVariedad").html();

	$.each(invvar[0][0].split("1,"), function(j,e){
        $("#invVariedad option[value='" + e + "']").attr("selected", true);
    });

    // $.each(invvar[1][0].split(","), function(j,e){
    //     $("#invactivos option[value='" + e + "']").attr("selected", true);
    // });

    $("#invreactivos").html(opciones);
    $.each(invvar[1][0].split(","), function(j,e){
        $("#invreactivos option[value='" + e + "']").attr("selected", true);
    });

    $("#invcomp").html(opciones);
    $.each(invvar[4][0].split(","), function(j,e){
        $("#invcomp option[value='" + e + "']").attr("selected", true);
    });

    $("#inv-bandejas").html(opciones);
    $("#inv-bandejas").val(invvar[2][0]);

    $("#inv-frascos").html(opciones);
    $("#inv-frascos").val(invvar[3][0]);

    $(document).on("change",".role_inv",function(){
        if($(this).attr('tp') != undefined){
            arr('login',7,2,907,'idinventario = "'+$(this).val()+'"','id='+$(this).attr('tp'));
        }
    });
    $("#invVariedad").material_select();

    $(document).on("click","#gomodalbandejas",function(){
        var relacion = arr('login',4,'count(id)',911,'id > 0',0,0,0)[0][0];
        var lastid = arr('login',4,'ifnull(max(id)+1,1)',911,'',0,0,0)[0][0][0];
        $("#autoinc").val(lastid);
        $("#curpos").val(lastid);
        if (relacion == 0) {
            arr('login',6,'',411,invvar[2][0],15,1,$("#bandejas1"))
            arr('login',6,'',411,invvar[3][0],15,1,$("#frascos1"))
            
        }else{
            var p = mantenimiento('laboratorio',9,{"invbandejas":invvar[2][0],"invfrascos":invvar[3][0]});
            $("#flaboratorio-relaciones").html(p);
            var relaciones = arr('login',4,'*',911,'id > 0',0,0,0)[0];
            $.each(relaciones,function(index,relation){
                $("#bandejas"+relation[0]).val(relation[1]);
                $("#frascos"+relation[0]).val(relation[2]);
            });
        }
        $(".zelda").data('triforce',{vid : 0,vidbandeja : 0,vidfrasco : 0,vcantidad : 1});
        $("#modal-bandejas").modal('open');
        $("select").material_select();
    });

    $(document).on("change","[id^=bandejas]",function(){
        var id = $(this).attr('id').substr(8);
        var idbandeja = $(this).val();
        $(".zelda").data('triforce')['vidbandeja'] = idbandeja;
        $("#caben"+id).select();
    });

    $(document).on("change","[id^=frascos]",function(){
        var id = $(this).attr('id').substr(7);
        var idfrasco = $(this).val();
        $(".zelda").data('triforce')['vidfrasco'] = idfrasco;
    });

    $(document).on("keyup","[id^=caben]",function(){
        var id = $(this).attr('id').substr(5);
        var cantidad = $(this).val();
        $(".zelda").data('triforce')['vcantidad'] = cantidad;
    });
};

$(document).on("click",".delline",function(){
    // var id = $(this).attr('id').substr(2);
    // if ($(".rowrel").length <= 1) {
    //     $("#bandejas"+id).val(0);
    //     $("#frascos"+id).val(0);
    //     $("#caben"+id).val(1);
    //     $("select").material_select();
    // }else{
    //     $("#rw"+id).remove();
    // }
});

function cargarArr(vid,velemento){
    arr('laboratorio',vid,'',0,'',0,1,velemento);

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

    var fecha = new Date();
    var dpick = $('#vfecha');
    dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);

    $('select').material_select();
    $(".comentario").characterCounter();
    $(".modal").modal();

    $(".mediocultivo").click(function(){
        var componentes = getDatos('',923,$("li.menu3 >a.active").parent().attr('id').substr(1),0,0,0);
        console.log(componentes);
        // mcul-lista
        $("#modal-formula").modal('open')
    });

    $("#mkbandeja").click(function(){
        arr('login',6,'',411,invvar[2][0],15,1,$("#invactivlab"))
        // $("#invactivlab").material_select();
        $("#modal-bandeja").modal('open');
        if ($("#bandeja").val() != '') {
            $("#invactivlab").val($(".zelda").data('triforce')['vidbandeja'])
        }
        $("#invactivlab").material_select();
    });

    Materialize.updateTextFields();
}

function loadRecepcion(){

    $(".menu3").click(function(){
    	var id = $(this).attr('id').substr(1);
    	switch(parseInt(id)){
    		case 0:
    			cargarArr(2,$("#labajax"));
    			cargarExplantes();
    			break;
            case 1:
                cargarArr(4,$("#labajax"));
                cargarIniciacion();
                break;
            case 2:
                cargarArr(5,$("#labajax"));
                cargarMultiplicacion();
                break;
            case 3:
                cargarArr(6,$("#labajax"));
                cargarEnraizamiento();
                break;
            case 4:
                cargarArr(7,$("#labajax"));
                cargarAclimatacion();
                break;
            case 5:
                cargarArr(8,$("#labajax"));
                cargarQoS();
                break;
    		default:
    			$("#labajax").html('Laboratorio sin Procesar')
    			break;
    	}
    	
    });

    $("#m0").click();
}

function cargarQoS(){
    $("#flaboratorio-ciclos .zelda").data('triforce',{vid:0,vidtipo:4,vidciclo:'',vidmediocultivo:0,vidbandeja:0,vguia:0});
}//cargar QOS

function cargarAclimatacion(){
    $("#flaboratorio-ciclos .zelda").data('triforce',{vaccion:0,vid:0,vidtipo:1,vidciclo:'',vidmediocultivo:0,videncargado:0,vidbandeja:0,vcomentario:'',vlote:''});
    arr('login',6,'',912,'0,0,"4,@@impresa","0,10"',0,1,$("#listaciclos"))
}//cargar Aclimatacion

function cargarEnraizamiento(){
    $("#flaboratorio-ciclos .zelda").data('triforce',{vaccion:0,vid:0,vidtipo:1,vidciclo:'',vidmediocultivo:0,videncargado:0,vidbandeja:0,vcomentario:'',vlote:''});
    arr('login',6,'',912,'0,0,"3,@@impresa","0,10"',0,1,$("#listaciclos"))
}//cargar Enraizamiento

function cargarMultiplicacion(){
    $("#flaboratorio-ciclos .zelda").data('triforce',{vaccion:0,vid:0,vidtipo:1,vidciclo:'',vidmediocultivo:0,videncargado:0,vidbandeja:0,vcomentario:'',vlote:''});
    arr('login',6,'',912,'0,0,"2,@@impresa","0,10"',0,1,$("#listaciclos"))
}//cargar Multiplicacion

function cargarIniciacion(){
    $("#flaboratorio-ciclos .zelda").data('triforce',{vaccion:0,vid:0,vidtipo:1,vidciclo:'',vidmediocultivo:0,videncargado:0,vidbandeja:0,vcomentario:'',vlote:''});
    $("#vvariedad").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#vvariedad").autocomplete({
                limit: 20,
                data: getVariedad_Down($(this).val())
            });
            $(".autocomplete-content").css('width','30%');
        }
    });

    $("#vvariedad").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13)
            $(this).blur();
    });

    $("#vvariedad").blur(function(){
        if($(this).val().length <= 3)
            $(this).val('');
        else
            iniciarVaridad();
    });

    $(document).on("change","#videncargado",function(){
        $("#flaboratorio-ciclos .zelda").data('triforce')['videncargado'] = $(this).val();
    });

    // $(document).on('click','[id^=_c]',function(){
    //     var id = $(this).attr('id').substr(2);
    //     var elemento = $("#c"+id);
    //     var num = parseFloat($('#_n'+id).val());
    //     var tot = parseFloat($("#tplt").html());

    //     if(elemento.is(":checked")){
    //         elemento.attr('checked',false);
    //         $("#tplt").html(tot-num);
    //     }else{
    //         elemento.attr('checked',true);
    //         $("#tplt").html(tot+num);
    //     }
    // });

    $(document).on("click","[id^=_c]",function(){
        var id = $(this).attr('id').substr(2);
        if ($("#c"+id).is(":checked")) {
            $("#c"+id).attr('checked',false);
        }else{
            $("#c"+id).attr('checked',true);
            $("#_n"+id).select();
        }
        sumavariedad(id,0);

    });

    $(document).on("keyup","[id^=_n]",function(e){
        var code = e.which || e.keyCode;
        if (code != 8) {
            var id = $(this).attr('id').substr(2);
            if ($("#c"+id).is(":checked")) {
                var cant = parseFloat($("#_n"+id).val());
                if (!isNaN(cant)) {
                    sumavariedad(id,cant);
                }else{
                    Materialize.toast('Valor no válido', 4000, 'green');
                }
            }
        }
    });

    function sumavariedad(id,cant) {
        var total = 0;
        var servs = '';
        $("[name=serv]").each(function(){
            var vid = $(this).attr('id').substr(1);
            var cantidad = parseFloat($("#_n"+vid).val());
            if ($(this).is(":checked")) {
                servs += $(this).attr('id').substr(1)+',';
                total += cantidad;
                $("#tplt").text(total);
            }else if ($("[name=serv]:checked").length == 0) {
                $("#vidsrvs").val("");
                $("#tplt").text(0);
            }
        });
        $("#vidsrvs").val(servs);
    }

    // $(document).on('focus','[id^=_n]',function(){
    //     var elemento = $("#c"+$(this).attr('id').substr(2));
    //     elemento.change();
    // });

    // $(document).on('blur','[id^=_n]',function(){
    //     var id = $(this).attr('id').substr(2);
    //     // var elemento = $("#c"+id);
    //     var valor = $(this).val();
    //     if (isNaN(valor)) {
    //         $(this).focus().select();
    //         Materialize.toast('Valor no es Numérico',4000,'red');
    //         // elemento.attr('checked',false).change();
    //     }else{
    //         if (valor < 0 || valor > parseFloat($("#o"+id).data('cantidad')) ) {
    //             $(this).focus().select();
    //             Materialize.toast('Valor no es Válido',4000,'red');
    //             // elemento.attr('checked',false).change();
    //         }else{

    //         }
    //     }
    // });

    $(document).on("keyup","#vcomentario",function(){
        $(".zelda").data('triforce')['vcomentario'] = $(this).val();
    });

}//cargar Iniciacion

function cargarExplantes(){
    $("#flaboratorio-explantes .zelda").data('triforce',{vidcliente:0,vidfinca:0,vidregion:0,vid:0,vidservicio: 0,vexpectativa: 0,vcantidad: 0,vguia:0});

    getIDExplante();

    $('#vfecha').change(function(){
        getIDExplante();
    });

    $("#expectativa").blur(function(){
        var num = isNaN($(this).val().replace(/,/g,'')) ? 0 : $(this).val().replace(/,/g,'');
        $("#flaboratorio-explantes .zelda").data('triforce')['vexpectativa'] = num;
    });

    $("#cantidad").blur(function(){
        var num = isNaN($(this).val().replace(/,/g,'')) ? 0 : $(this).val().replace(/,/g,'');
        $("#flaboratorio-explantes .zelda").data('triforce')['vcantidad'] = num;
    });

    // $("#vvariedad").keydown(function(e){
    //     var charCode = e.which || e.keyCode;
    //     var charStr = String.fromCharCode(charCode);
        
    //     if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
    //         $(".autocomplete-content").remove();

    //         $("#vvariedad").autocomplete({
    //             limit: 20,
    //             data: getVariedad_Down($(this).val())
    //         });

    //         $(".autocomplete-content").css('width','30%');

    //     }
    // });

    // $("#vvariedad").keyup(function(e){
    // 	var code = e.which || e.keyCode;
    // 	if (code == 13)
    // 		$(this).blur();
    // });

    // $("#vvariedad").blur(function(){
    // 	if($(this).val().length <= 3)
    // 		$(this).val('');
    // 	else
    // 		cargarVaridad();
    // });

    // $("#ncli").keydown(function(e){
    //     var charCode = e.which || e.keyCode;
    //     var charStr = String.fromCharCode(charCode);
        
    //     if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
    //         $(".autocomplete-content").remove();

    //         $("#ncli").autocomplete({
    //             limit: 20,
    //             data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'!bisproveedor and id > 0 having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
    //         });

    //         $(".autocomplete-content").css('width','30%');

    //     }
    // });

    $("#finca").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#finca").autocomplete({
                limit: 20,
                data: arr('login',4,'nombre as nom,null',904,'id > 0 and idregion = '+$("#flaboratorio-explantes .zelda").data('triforce')['vidregion']+' having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
            });

            $(".autocomplete-content").css('width','25%');

        }
    });

    $("#finca").keyup(function(e){
    	var code = e.which || e.keyCode;
    	if (code == 13){
    		var idfinca = getDatos('id',904,'nombre = '+$(this).val()+' and idregion = '.$("#flaboratorio-explantes .zelda").data('triforce')['idregion'],0,0);
	    	if (idfinca['succed'] == 1) {
	    		$("#flaboratorio-explantes .zelda").data('triforce')['vidfinca'] = idfinca[0][0][0];
	    		$("#finca").focus();
	    	}else
	    		$("#flaboratorio-explantes .zelda").data('triforce')['vidfinca'] = 0;
    	}
    });

    $("#vregion").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();
            $("#vregion").autocomplete({
                limit: 20,
                data: arr('login',4,'nombre as nom,null',903,'id > 0 having nom like "%'+$(this).val()+'%" and idubicacion in(select id from developer.ubicaciones where iddistrito = '+$("#vdistrito option:selected").val()+' group by idubicacion) limit 20',0,0,0,1)
            });
            $(".autocomplete-content").css('width','25%');
        }
    });

    $("#vregion").keyup(function(e){
    	var code = e.which || e.keyCode;
    	if (code == 13){
    		var idregion = getDatos('id',903,'nombre = '+$(this).val()+' and idubicacion in(select id from developer.ubicaciones where iddistrito = '+$("#vdistrito option:selected").val()+' group by iddistrito)',0,0);

	    	if (idregion['succed'] == 1) {
	   //  		var $toastContent = $('<span>Región no Existente</span>').add($('<button class="btn-flat toast-action green white-text addRegion">Agregarla</button>'));
				// Materialize.toast($toastContent, 10000);
	    		$("#flaboratorio-explantes .zelda").data('triforce')['vidregion'] = idregion[0][0][0];
	    		$("#finca").focus();
	    	}else
	    		$("#flaboratorio-explantes .zelda").data('triforce')['vidregion'] = 0;
    	}
    });

    // $("#pais").keydown(function(e){
    //     var charCode = e.which || e.keyCode;
    //     var charStr = String.fromCharCode(charCode);
    //     if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
    //         $(".autocomplete-content").remove();
    //         $("#pais").autocomplete({
    //             limit: 20,
    //             data: arr('login',4,'nombre as nom,bandera',209,'id > 0 having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
    //         });
    //         $(".autocomplete-content").css('width','25%');
    //     }
    // });

    // $("#pais").keyup(function(e){
    // 	var code = e.which || e.keyCode;
    // 	if (code == 13)
    // 		$(this).blur();
    // });

    // $("#pais").blur(function(){
    // 	cargarProvincias();
    // });

    $("#provincia").change(function(){
    	cargarCantones($('option:selected',this).val());
    });

    $("#canton").change(function(){
    	cargarDistritos($('option:selected',this).val());
    });

    $("#ingresar").click(function(){
    	var validacion = validarCliente();
    	if(validacion)
    		Materialize.toast(validacion,4000,'red');
    	else{
    		switch(parseInt($(this).attr('codigo'))){
		    	case 2:
		    		var id = $("#flaboratorio-explantes .zelda").data('triforce')['vidcliente'];
		    		var _idubicacion = arr('login',7,1,239,'','null,'+$("#addClie #vdistrito").val()+',"'+$("#addClie #vdireccion").val()+'",'+$("#addClie #vlatitud").val()+','+$("#addClie #vlongitud").val()+',2,'+id,0,0)[0][0];
		    		var _idregion = getDatos('',905,'1,0,"'+$("#vregion").val()+'",'+_idubicacion,0,0)[0][0];
		    		var _idFinca = getDatos('',901,'1,0,"'+$("#finca").val()+'",'+_idregion,0,0);
		    		Materialize.toast('Finca Agregada Correctamente',4000,'green');
		    		cargarTblFincas();
                    endDetail(0,1,'finca');
		    		break;
		    	default: 
		    		break;
    		}
    		$("#addClie").modal('close');
    	}
    });

    $(document).on("click","[id^=r]",function(){
    	var id = $(this).attr('id').substr(1);
        if (!isNaN(id)) {
            $("#flaboratorio-explantes .zelda").data('triforce')['vidfinca'] = id;
            $("#s"+id).prop('checked',true);
        }
    });
    Materialize.updateTextFields();
} //END CARGAR EXPLANTES

function getIDExplante(){
    var fch = $("#vfecha").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd') == '' ? 'curdate()' : '"'+$("#vfecha").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd')+'"';

    var rs = getDatos('concat(date_format('+fch+',"%Y%m%d"),lpad(count(id)+1,2,0)) as id',900,'fecha = "'+fch.replace(/"/g,"")+' 00:00:00" group by date_format(fecha,"%Y%m%d")',0,0)[0];

    rs = rs.length > 0 ? rs[0][0] : fch.replace(/-/g,'').replace(/"/g,"")+'01';

    $("#flaboratorio-explantes #vnombre").val(rs);
}

function getVariedad_Down(variedad) {
	return getDatos('',906,'"'+variedad+'","'+invvar[0][0]+'"',0,0,1);
}

function cargarProvincias(){
	var provincias = arr('login',4,'id,nombre',8,'idpais = (select id from developer.paises where nombre = \"'+$("#vpais").val()+'\")',0,0,0);
	$("#addClie #provincia").html('');
	var lprov = '<option value="0" disabled>Seleccione una Opción</option>';
    if (provincias['succed']) {
    	for (var i = 0; i < provincias[0].length; i++) {
    		lprov += '<option value="'+provincias[0][i][0]+'">'+provincias[0][i][1]+'</option>';
    	}
    }
    $("#addClie #provincia").append(lprov);
    $("#addClie #provincia").val(0);
    $("#addClie #provincia").material_select('update');
};

function cargarCantones(vidprovincia){
	var cantones = arr('login',4,'id,nombre',9,'idprovincia = '+vidprovincia,'',0,'');
	
	$("#addClie #canton").html('');

	var lprov = '<option value="0" disabled>Seleccione una Opción</option>';

    if (cantones['succed']) {
    	for (var i = 0; i < cantones[0].length; i++) {
    		lprov += '<option value="'+cantones[0][i][0]+'">'+cantones[0][i][1]+'</option>';
    	}
    }

    $("#addClie #canton").append(lprov);
    $("#addClie #canton").val(0);
    $("#addClie #canton").material_select('update');
    
};

function cargarDistritos(vidcanton){
	var distritos = arr('login',4,'id,nombre',10,'idcanton = '+vidcanton,'',0,'');
	
	$("#addClie #vdistrito").html('');

	var lprov = '<option value="0" disabled>Seleccione una Opción</option>';

    if (distritos['succed']) {
    	for (var i = 0; i < distritos[0].length; i++) {
    		lprov += '<option value="'+distritos[0][i][0]+'">'+distritos[0][i][1]+'</option>';
    	}
    }

    $("#addClie #vdistrito").append(lprov);
    $("#addClie #vdistrito").val(0);
    $("#addClie #vdistrito").material_select('update');
    
};

function iniciarVaridad(){
    var servicio = arr('login',4,'',910,'"'+$("#vvariedad").val()+'"',0,0,0);
    if (servicio[0].length) {
        var obj;
        var str = '<div class="col s12 head1 padding1"><h6>Variedad: <b>'+servicio[0][0][1]+'</b></h6></div><table class="responsive-table striped highlight" id="resulti00"><thead class="tab2"><tr><th colspan="2" class="center">Cantidad</th> <th class="center">Procedencia</th> <th class="center">Fecha</th> </tr> </thead> <tbody vtabla="laboratorio-investadistica" id="flaboratorio-investadisticas" tp="4" rollback="">'; // id="bdyi00"

        for (var i = 0; i < servicio[0].length; i++) {
            obj = servicio[0][i];
            str += '<tr id="o'+obj[7]+'" idservicio="'+obj[2]+'" data-cantidad="'+obj[0]+'" class="ciclos"><td style="padding:0.5%; margin:0px" id="_c'+obj[7]+'"><input type="checkbox" id="c'+obj[7]+'" name="serv"/><label for="c'+obj[7]+'"></label></td><td style="padding:0.5px; margin:0px; padding-left: 20px;padding-right: 20px;width: 20%"><input type="text" id="_n'+obj[7]+'" value="'+obj[0]+'" style="padding:0.5px; margin:0px;height:1rem;width=80%" class="eder" /> <input type="hidden" id="hc'+obj[7]+'" value="'+obj[0]+'"/></td><td style="padding:0.5%; margin:0px">'+obj[4]+'</td><td style="padding:0.5%; margin:0px">'+obj[5]+' </td></tr>';
        }
        $("#vlote").val(servicio[0][0][6]);
        $("#flaboratorio-ciclos .zelda").data('triforce')['vlote'] = servicio[0][0][6];
        Materialize.updateTextFields();
        $("#result00").html(str+'</tbody></table>');
    }else{
        Materialize.toast("Variedad no Existente en Recepción", 4000,'red');
        $("#result00").html('No se ha Elegido la Variedad')
    }
}

function cargarVaridad(){
	var servicio = arr('login',4,'',43,'\"[SERV] '+$("#vvariedad").val()+'\",0,0,0','',0,'');

    if (servicio[0].length) {
        var vservicio = servicio[0][0];
        
        $("#flaboratorio-explantes .zelda").data('triforce')['vidservicio'] = parseInt(vservicio[0])*-1;

        $("#vvariedad").val(vservicio[2].substr(7));

    }else{
    	$("#flaboratorio-explantes .zelda").data('triforce')['vidservicio'] = 0;

	 	var $toastContent = $('<span>Variedad no Existente</span>').add($('<button class="btn-flat toast-action green white-text addVariedad">Agregarla</button>'));
		Materialize.toast($toastContent, 10000);
    }
}


// function cargarCliente(){
// 	var clie = arr('login',4,'',63,'\"'+$("#ncli").val()+'\",0','',0,'');

//     if (clie[0][0][0] != 0) {
//         var vclie = clie[0][0];
        
//         $(".zelda").data('triforce')['vidcliente'] = vclie[0];

//         $("#ncli").val(vclie[1]+' '+vclie[2]);
//         cargarTblFincas();
//     }else{
//     	$(".zelda").data('triforce')['vidcliente'] = 0;
//     	$(".zelda").data('triforce')['vidfinca'] = 0;
// 	 	var $toastContent = $('<span>Cliente no Existente</span>').add($('<button class="btn-flat toast-action green white-text addClie">Agregarlo</button>'));
// 		Materialize.toast($toastContent, 10000);
//     }
// }

function cargarTblFincas(){
	var fincas = getDatos('',902,$("#flaboratorio-explantes .zelda").data('triforce')['vidcliente'],0,0);

	$("#fincas").html('');
	var lista = '<tr><td colspan="3" class="center">No Hay Datos Registrados</td></tr>';
    var checked = '';
	if(fincas['succed']){
		lista = '';
		for (var i = 0; i < fincas[0].length; i++) {
            if (fincas[0].length == 1) {
                checked = 'checked';
            }
			lista += '<tr id="r'+fincas[0][i][3]+'"><td><input type="radio" name="selfinca" id="s'+fincas[0][i][3]+'" class="der with-gap" '+checked+'/>  <label for="s'+fincas[0][i][3]+'"></label></td><td>'+fincas[0][i][0]+'</td><td>'+fincas[0][i][1]+'</td><td>'+fincas[0][i][2]+' </td></tr>';
		}
	}

    $("#flaboratorio-explantes .zelda").data('triforce')['vidfinca'] = fincas[0][0][3];
	$("#fincas").append(lista);
}

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'laboratorio-explante':
			if (vmodulo['tip'] == '') {
				err = validarExplantes();
				if ( err ) {
					return err;
				}
			}
			break;
        case 'laboratorio-ciclo':
            if (vmodulo['tip'] == '') {
                err = validarCiclos();
                if ( err ) {
                    return err;
                }
            }
            break;
        case 'cliente':
            if (vmodulo['tip'] == '') {
                err = validarClientes(vmodulo['modulo']);
                if ( err ) {
                    return err;
                }else{
                    // if ($("#viddistrito").val() == null) {
                    //     $("#viddistrito").children('option').prop('disabled',false);
                    //     $("#viddistrito").val(0);
                    //     $("#viddistrito").material_select();
                    // }
                }
            }
            break;
        case 'servicio':
            if (vmodulo['tip'] == '') {
                err = validarServicios(vmodulo['modulo']);
                if ( err ) {
                    return err;
                }
            }
            break;
        case 'ubicacione':
            
            break;
        case 'laboratorio-relacione':

            break;
        case 'laboratorio-investadistica':

            break;
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarClientes(mod) {
    if ($("#f"+mod+"s #cedula").val() == '') {
        $("#f"+mod+"s #cedula").focus();
        return 'El campo Cédula es requerido';
    }

    if ($("#f"+mod+"s #nombre").val() == '') {
        $("#f"+mod+"s #nombre").focus();
        return 'El campo Nombre es requerido';
    }

}

function validarServicios(mod) {
    if ($("#f"+mod+"s #vcodigo").val() == '') {
        $("#f"+mod+"s #vcodigo").focus();
        return 'El campo Código es requerido';
    }

    if ($("#f"+mod+"s #vnombre").val() == '') {
        $("#f"+mod+"s #vnombre").focus();
        return 'El campo Nombre es requerido';
    }

}

function validarCiclos(){
     var idtipo = parseInt($(".zelda").data('triforce')['vidtipo']);

    switch(idtipo){
        case 1: //INICIACION

            var id  = 0;

            $("#flaboratorio-investadisticas tr").each(function(){
                id = $(this).attr('id').substr(1);
                if($("#c"+id).is(":checked")){
                    $("#flaboratorio-ciclos .zelda").data('triforce')['vidciclo'] += id+',';
                    // vid,vidciclo,vidtipo,vidservicio,vidproducto,vcantidad,vfecha datetime,vidusuario,vcomentario
                    $("#o"+id).data('triforce',{vaccion:0,vid:0,vidciclo:'?,'+id,vidtipo:$("li.menu3 >a.active").parent().attr('id').substr(1),vidservicio:$("#o"+id).attr('idservicio'),vidproducto:0,vcantidad:$("#_n"+id).val(),vidusuario:0,vcomentario:''});
                }
            })

            if ($("#flaboratorio-ciclos .zelda").data('triforce')['vidciclo'] == '' ) {
                return 'No se a Seleccionado una Recepción';
            }

            if ($("#videncargado option:selected").val() == 0 ) {
                $("#videncargado").focus();
                return 'No se a Seleccionado el Operario';
            }

            if ($("#vcomentario").val() == 0 ) {
                $("#vcomentario").focus();
                return 'Comentario Requerido';
            }

            break;
        default:
            break;
    }
    return false;
}

function validarExplantes() {

	return false;
}

function validarCliente(){

	switch(parseInt($("#ingresar").attr('codigo'))){
		case 1:
			if ($("#addClie #vnombre").val() == '') {
				$("#addClie #vnombre").focus();
				return 'Nombre de Cliente Requerido';
			}

			if ($("#addClie #vcedula").val() == '') {
				$("#addClie #vcedula").focus();
				return 'Cédula de Cliente Requerida';
			}

			if ($("#addClie #vdistrito option:selected").val() == 0) {
				$("#addClie #vdistrito").focus();
				return 'Distrito de Cliente Requerido';
			}
			break;
		case 2:
			if ($("#addClie #vdistrito option:selected").val() == 0) {
				$("#addClie #vdistrito").focus();
				return 'Distrito de Cliente Requerido';
			}
			break;
		default:
			break;

	}

	return false;
}

function endDetail(vid,vacc,modulo){
    if (vacc == 1) {
    	switch(modulo){
    		case 'laboratorio-explante':
    			$("#m0").click();
    			break;
            case 'laboratorio-ciclo':
                var idtipo = parseInt($(".zelda").data('triforce')['vidtipo']);
                switch(idtipo){
                    case 1: //INICIACION
                        //INGRESAR INV. ESTADISTICA
                        // vaccion,vid,vidciclo,vidtipo,vidservicio,vidproducto,vcantidad,vidusuario,vcomentario
                        var tipo = $("#vidrazon").val(),
                        serv = arr('login',4,'id',16,'nombre = "'+$("#nomvar").val()+'"',0,0,0)[0][0],
                        prod = 0,
                        cant = $("#cantact").val(),
                        comen = $("#comentproc").val();
                        arr('login',4,'',918,'1,0,'+vid+','+tipo+','+serv+','+prod+','+cant+',@@usr,"'+comen+'"',0,0,0);
                        $("#vidrazon").val(0);
                        $("#nomvar").val('');
                        $("#cantact").val(0);
                        $("#comentproc").val('');
                        $("#vidrazon").material_select();
                        $("#modal-registrar").modal('close');
                        break;
                    default:
                        break;
                }
                deadclear(modulo);
                $("#result00").html('No se ha Elegido la Variedad');
                $("#tplt").text(0);
                break;
            case 'cliente':
                deadclear('cliente');
                $("#ncli").val($("#fclientes .zelda").data('triforce')['vnombre']+" "+$("#fclientes .zelda").data('triforce')['vapellido1']+" "+$("#fclientes .zelda").data('triforce')['vapellido2']);
                $("#fclientes .zelda").removeData();
                $("#fclientes .zelda").data('triforce',{vid : 0,vapellido1 : '',vapellido2 : '',vnombre : '',vcedula : '',vidtipocliente : 1,videstado : 1,vbisproveedor : 0,vidnivel : 0,vcredito : 0,vplazo : 0,videstadocontable : 0,vbisnacional : 1,vweb : '',vdescuentom : 0,vcodigo : '',vidcuenta : 0,_sid : '@@@'});
                $("#flaboratorio-explantes .zelda").data('triforce')['vidcliente'] = vid[0][0];
                break;
            case 'finca':
                clearform('finca');
                break;
            case 'servicio':
                deadclear('servicio');
                $("#vvariedad").val($("#fservicios .zelda").data('triforce')['vnombre']);
                $("#fservicios .zelda").removeData();
                $("#fservicios .zelda").data('triforce',{vid : 0,vcodigo : '',vnombre : '',vdescripcion : '',vpbase : 0,vperiodo : 0,vdias : 0,vidproveedor : 0,vprecio : 0,vpganancia : 0,vidinventario : 0,vidmoneda : 1,vservprofesional : 0,vidsuc : -1});
                $("#flaboratorio-explantes .zelda").data('triforce')['vidservicio'] = vid[0][0];
                break;
            case 'laboratorio-relacione':
                var id = parseInt($("#autoinc").val());
                id++;
                $("#flaboratorio-relaciones").append('<tr id="rw'+id+'" class="rowrel zelda"><td style="padding: 10px; color:black;"><div class="input-field"><select type="select" id="bandejas'+id+'" class="invbandejas"></select></div></td><td style="padding: 10px; color:black;"><div class="input-field"><input type="number" id="caben'+id+'" class="caben" value="1" min="1"></div></td><td style="padding: 10px; color:black;"><div class="input-field"><select type="select" id="frascos'+id+'" class="invfrascos"></select></div></td><td style="padding: 10px; color:black;"><a class="waves-effect waves-light blue btn-floating addline add" modulo="laboratorio-relacione" id="a'+id+'" tp="5"><i class="mdi mdi-plus"></i></a><a class="waves-effect waves-light red btn-floating delline delete" modulo="laboratorio-relacione" id="d'+id+'" tp="5"><i class="mdi mdi-close"></i></a></td></tr>');
                setTimeout(function(){
                    arr('login',6,'',411,invvar[2][0],15,1,$("#bandejas"+id));
                    arr('login',6,'',411,invvar[3][0],15,1,$("#frascos"+id));
                    $("select").material_select();
                    $(".zelda").data('triforce',{vid : 0,vidbandeja : 0,vidfrasco : 0,vcantidad : 1})
                    // $(".zelda").data('triforce',{vid : 0,vidbandeja : 0,vidfrasco : 0,vcantidad : 1})
                },100);
                $("#autoinc").val(id)
                break;
            case 'mediocultivo':
                var idciclo = $("#_vidciclo").val();
                arr('login',6,'',921,idciclo+',@@impresa',0,1,$("#listamedioscultivos"));
                $("#_vnombre").val('');
                $("#_vcodigo").val('');
                $("#_vcantidad").val('');
                $("#_vidunidad").val('');
                $("#_vidreferencia").val(1);
                $("select").material_select();
                break;
            default:
                break;
    	}
    }else if (vacc == 3) {
        if ($(".rowrel").length <= 1) {
            $("#bandejas"+vid).val(0);
            $("#frascos"+vid).val(0);
            $("#caben"+vid).val(1);
            $("select").material_select();
        }else{
            $("#rw"+vid).remove();
        }
    }
    return false;
}

function cargarunidades(vidproducto,vunidad) {
    var uni = '';
    var unis = getDatos('',250,vidproducto,0,0,0)[0];

    $.each(unis, function(index, valor) {
        uni += '<option value="'+valor[0]+'">'+valor[1]+'</option>';
    });
    $("#uni").html(uni);
    $("#uni").val(vunidad);
    $("#uni").material_select('update');
}

function clearform(vform) {
    switch (vform) {
        case 'finca':
            $("#addClie #pais").val('');
            $("#addClie #provincia").val(0);
            $("#addClie #canton").val(0);
            $("#addClie #vdistrito").val(0);
            $("#addClie #vregion").val('');
            $("#addClie #finca").val('');
            $("#addClie #vdireccion").val('');
            $("#addClie #vlatitud").val(0);
            $("#addClie #vlongitud").val(0);
            break;
        $("select").material_select();
        Materialize.updateTextFields();
    }
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'laboratorio-explante':
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