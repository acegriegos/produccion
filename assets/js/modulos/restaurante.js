var param = 6;
var mesa;

$(function(){
	$("#ffacturas .zelda").data()['idmesa'] = 0;

    $("#ffacturas .zelda").data('triforce',{vidtipo:1, vidtipoventa:6, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : 0,vidusuario:'',vidtipopago:0,vidodt:0,vajuste:0, idline:0,  saldo : 0, notific : 0,tmpcorreo:'',videxoneracion:'',vexento:0,vflete:0,vplazo:0,vcomentario:'',vfecha:''});

	$("#descp").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)

        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            $(".autocomplete-content").remove();
            
            $("#descp").autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+busqueda+'",7,@@impresa',0,0,0,1)
            })

            $("#descp").siblings($(".autocomplete-content")).css('width','100%').css('position','absolute !important').css('bottom','100px');
        }
    });

    $("#codp").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)

        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            $(".autocomplete-content").remove();
            
            $(this).autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+busqueda+'",8,@@impresa',0,0,0,1)
            })

            $(this).siblings($(".autocomplete-content")).css('width','50%');
        }
    });

    $("#addline").click(function(){

        var cantidad = parseFloat($("#cantp").val());

        if ($("#cantp").attr('fila') != undefined) {
            var idproducto = $("#cantp").attr('fila');
            $("#fd"+idproducto).data('triforce')['vcantidad'] = cantidad;
            $("#fd"+idproducto+" #fcant").html(cantidad)
            $("#cantp").removeAttr('fila').val(1).blur();
            return false;
        }

        if($("#valores").data('elemento') != undefined){
            var existe = 0;
            var idproducto = $("#valores").data('elemento')['idp'];

            $("#fdetallefacturas .ciclos").each(function(){
                if ($(this).data('triforce')['videntrada'] == idproducto)
                    existe = 1;
            });

            if (cantidad > parseFloat($("#valores").data('elemento')['cantidad'])) {
                Materialize.toast('Cantidad Insuficiente en Inventario',4000,'red')
                $("#cantp").select().focus();
                return false;
            }

            if (!existe) {
                $("#detfactmsj").hide();
                var imp = parseFloat($("#valores").data('elemento')['imv']);
                var precio = parseFloat($("#valores").data('elemento')['hprec']);
                var hinv = $("#valores").data('elemento')['hinv'];
                var cimp = precio*(imp/100)
                var total = precio*cantidad;

                $("#fdetallefacturas").prepend('<a href="#!" class="collection-item col12 row ciclos" id="fd'+idproducto+'" style="padding: 0px"><small id="fnom" class="col s6" style="font: bold">'+$("#descp").val()+'</small> <small id="funit" class="col s6">'+(precio*(1+(imp/100))).formatMoney(2,'.',',')+'</small> <small id="fcant" class="col s6"> '+cantidad+'</small> <small id="ftot" class="col s6">'+(total*(1+(imp/100))).formatMoney(2,'.',',')+'</small></a>');

                $("#fd"+idproducto).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : idproducto,vcantidad : cantidad,vprecio : precio.formatMoney(5,'.',''),vdesc : 0,vtotal : total.formatMoney(5,'.',''),vidinventario : hinv,vidodt : 0,vimv : cimp.formatMoney(5,'.',''),vcomodin : $("#valores").data('elemento')['hcomodin'],vidunidad : 1,vidimpuestos:imp,viddescuentos:'',exoneracion:0,vdescuento : 0});
            }else{
                cantidad = cantidad + parseFloat($("#fd"+idproducto).data('triforce')['vcantidad'])
                $("#fd"+idproducto).data('triforce')['vcantidad'] = cantidad;
                $("#fd"+idproducto+" #fcant").html(cantidad)
            }

            $("#cantp").val(1)
            $("#valores").removeData('elemento');

            if ($(".prod").is(":visible"))
                $(".prod").css('border','0px');            
        }else{
            if($("#fdetallefacturas .ciclos").length == 0)
                $("#detfactmsj").show();
            Materialize.toast('No hay Producto Seleccionado',4000,'red');
        }

        $("#cantp").blur();
    });

    $("#cantp").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $("#addline").click();
        }
    });

    $("#codp").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $(this).blur();
        }
    });

    $("#codp").blur(function(){
       cargarProducto($(this).val(),$(this));
    });

    $("#descp").blur(function(){
        cargarProducto($(this).val(),$(this));
    });

    $("#descp").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $(this).blur();
        }
    });

    $("#showprod").click(function(){
    	if($(".sprod").is(":visible")){
    		$(".sprod").addClass('hide')
            $("#descp").val('');
            $("#codp").val('');

        }
    	else{
    		$(".sprod").removeClass('hide')
    		$("#descp").focus();
    	}
    });

	$(".mesa").click(function(){
		var estado = parseInt($(this).attr('estado'));
        var id = $(this).attr('id').substr(1);
        $("#saveOrder").removeClass('add');
        $("#saveOrder").removeClass('saveOrder');

        mesa = id;
		switch(estado){
			case 1:
                var fecha = new Date();
				
                $(".zelda").data('triforce')['vidcliente'] = mesa;
                $(".zelda").data('triforce')['vreferencia'] = 'MESA '+$(this).attr('nmesa');

				$("#modal-mesa").modal('open');
				$("#tipos").html('').hide();
				$("#productos").html('').hide();
				$("#ffacturas .zelda").data()['idmesa'] = id;
				$("#tit").html('MESA '+$(this).attr('nmesa'));
                $("#fdetallefacturas .ciclos").remove();
                $("#detfactmsj").show();
                $(".showprod").hide();
                $("#saveOrder").addClass('add');
				actualizar(800,'idtipoocupado=5','id='+id);
				break;
            case 2:
                var detalle = getDatos('',803,mesa,0,0,0);
                var mstr = '';
                $("#fdetallefacturas .ciclos").remove();
                $(".zelda").data('triforce')['vidcliente'] = mesa;
                $(".zelda").data('triforce')['vreferencia'] = 'MESA '+$(this).attr('nmesa');

                for (var i = 0; i < detalle[0].length; i++){
                    
                    var imp = detalle[0][i][7];
                    var precio = parseFloat(detalle[0][i][2]);
                    var cantidad = detalle[0][i][1];
                    var idproducto = detalle[0][i][6];
                    var hinv = detalle[0][i][5];
                    var cimp = parseFloat(detalle[0][i][4])
                    var total = parseFloat(detalle[0][i][3]);

                    mstr += '<a href="#!" class="collection-item col12 row ciclos" id="fd'+idproducto+'" style="padding: 0px"><small id="fnom" class="col s6" style="font: bold">'+detalle[0][i][0]+'</small> <small id="funit" class="col s6">'+(precio*(1+(imp/100))).formatMoney(2,'.',',')+'</small> <small id="fcant" class="col s6"> '+cantidad+'</small> <small id="ftot" class="col s6">'+(total*(1+(imp/100))).formatMoney(2,'.',',')+'</small></a>';
                    
                    $("#fdetallefacturas").prepend(mstr);

                    $("#fd"+idproducto).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : idproducto,vcantidad : cantidad,vprecio : precio.formatMoney(5,'.',''),vdesc : 0,vtotal : total.formatMoney(5,'.',''),vidinventario : hinv,vidodt : 0,vimv : cimp.formatMoney(5,'.',''),vcomodin : detalle[0][i][0],vidunidad : 1,vidimpuestos:imp,viddescuentos:'',exoneracion:0,vdescuento : 0,ocantidad: cantidad});
                };

                $("#modal-mesa").modal('open');
                $("#tipos").html('').hide();
                $("#productos").html('').hide();
                $("#ffacturas .zelda").data()['idmesa'] = id;
                $("#tit").html('MESA '+$(this).attr('nmesa'));
                $("#detfactmsj").hide();
                $(".showprod").hide();
                $("#saveOrder").addClass('saveOrder');
                break;
            case 5:
                Materialize.toast('Tomando Pedido en Mesa',4000,'red');
                break;
			default:
				break;
		}
		
	});

	$("#modal-mesa").modal({
		dismissible:false,
		complete: function(){
			var id = $("#ffacturas .zelda").data('idmesa');
			actualizar(800,'idtipoocupado=case idtipoocupado when 5 then 1 else idtipoocupado end','id='+id);
		}
	});

	$("#bmesas").keyup(function(e){
		var valor = $(this).val().trim().length ? $(this).val() : 0;
		var haslines = valor ? $("[nmesa*="+valor+"]").length : 0;
		if (haslines) {
			$("[nmesa]").hide();
			$("[nmesa*="+valor+"]").show();
		}else
			$("[nmesa]").show();
	});

	$(".fam").click(function(){
		var id = $(this).attr('id').substr(1);
		$("#tipos").html('').slideUp();
		$("#productos").html('').slideUp();

		if (id==='salir') {
			$(".fam").css('text-align','center').removeClass('active');
			return false;
		}
		$(".fam").css('text-align','left').removeClass('active');
		$(this).addClass('active');
		
		var tipos = getDatos('id,nombre',21,'idfamilia = '+id,0,0,0);
		var tstr = '';
		for (var i = 0; i < tipos[0].length; i++) {
			tstr += '<a id="t'+tipos[0][i][0]+'" class="btn cyan darken-4 s12 tip" style="width: 100%"><small>'+tipos[0][i][1]+'</small></a>';
		}

		$("#tipos").append(tstr).slideDown();

        $(".sprod").addClass('hide')
        $("#descp").val('');
        $("#codp").val('');
	});

	SSE_SERVER('login',4,{sel:'id,idtipoocupado',tbl:800,where:'id > 0 and !bisbarra'},3);

    setInterval(function(){
        SSE_SERVER('login',4,{sel:'id,idtipoocupado',tbl:800,where:'id > 0 and !bisbarra'},3);
    },3000);

});


$(document).on("click",".ciclos",function(){
    $("#cantp").val($(this).data('triforce')['vcantidad']).select().focus();
    $("#cantp").attr('fila',$(this).attr('id').substr(2))
});

$(document).on("click",".tip",function(){
		var id = $(this).attr('id').substr(1);
		$(".tip").css('text-align','left').removeClass('active');
		$(this).addClass('active');
		$("#productos").html('').hide();
		var productos = getDatos('',802,id,0,0,0);
		var tstr = '';

		for (var i = 0; i < productos[0].length; i++) {
			tstr += '<a id="p'+productos[0][i][0]+'" class="btn white black-text s12 prod" style="width: 100%"><small>'+productos[0][i][1]+'</small></a>';
		}
        $(".sprod").addClass('hide')
        $("#descp").val('');
        $("#codp").val('');

		$("#productos").append(tstr).slideDown();
});

$(document).on("click",".prod",function(){
		var id = $(this).attr('id').substr(1);
		$(".prod").css('border','');
		$(this).css('border','1px solid #26a69a');
		

        $(".sprod").addClass('hide')
        $("#descp").val($('small',this).html()).blur();
        $("#codp").val('');
        $("#cantp").select().focus();
});

function cargarProducto(kbrota,elemento) {
    var cantidad = 1;
    var iscomodin = 0;

    $("#precp").attr('base',"0.00");
    $("#totp").attr('base',"0.00");

    var cod = arr('login',4,'',43,'"R-'+ kbrota +'",@@impresa,'+$(".zelda").data('triforce')['vidcliente']+','+$(".zelda").data('triforce')['vidtipoventa'],0,0,0);
    if (cod[0][0] != undefined) {

        cod = cod[0][0];
        var char1 = cod[0].substring(0,1);
        var tabla = char1 == '+' ? 58 : char1 == '-' ? 16 : 11;
        var dvalor = iscomodin ? {descuento:0,iddescuento:0} : cargarDescuentos(cod[0].substr(1)+',0',tabla,2);

        $("#valores").data("elemento",{idp : cod[0],hcodp : cod[1],hprec : cod[3],hdesc : dvalor,hdescm : cod[12], hinv : cod[13], hbod:cod[14], hunidad: cod[15], hcomodin: cod[16],isdesgloce: cod[17],exo: cod[9],ncomodin : iscomodin,idheredado : cod[18],imv: cod[8],cantidad: cod[4]}) //,imp: cod[6]
        $("#codp").val(cod[1]);
        $("#descp").val(cod[2]);
        // $("#precp").val(parseFloat(cod[3]/parseFloat($("#monedas option:selected").attr('dv'))).formatMoney(2,'.',','));
        // $("#totp").val((parseFloat(cod[3]/parseFloat($("#monedas option:selected").attr('dv')))*cantidad).formatMoney(2,'.',','))
        
        var strimp = cargarImpuestos(cod[0].substr(1)+',0',tabla);

        $("#valores").data("elemento")['strimp'] = strimp;
        // cargarunidades(cod[0],cod[15]);
        $("#cantp").val(cantidad);

        // if(param != 2){ //PRODUCTO DE VALOR VARIABLE
        //     if(!cod[19])
        //         $("#precp").prop("readonly",true);
        //     else
        //         $("#precp").removeAttr("readonly");
        // }

        if (iscomodin) {
            switch(iscomodin){
                case 4:
                    $("#codp").select().focus();
                    break;
                default:
                    $("#precp").prop("readonly",false);
                    $("#descp").select().focus();
                    break;
            }
        }else{
            endCargarProducto(cod[9]);   
        }

        Materialize.updateTextFields()
    }else{
        switch(param) {
            case 2:
                var $toastContent = $('<span>Producto no Existente</span>').add($('<button class="btn-flat toast-action green white-text addProduct">Agregarlo</button>'));
                Materialize.toast($toastContent, 10000);

                $(".addProduct").focus();
                break;
            default:
                Materialize.toast('Producto no Existente',4000,'red');
                //elemento.select()
                break;
        }
        
    }
}

	
function cargarDescuentos(vfila,vtabla,vtipo,vcarga,vidfila){
    
    var desc = getDatos('',115,'@@impresa,"'+vfila+'","'+vtabla+'"',0,0);
    var strDesc = '<option value="" valor="0">No Aplica - 0%</option>';
    var valor;

    if (desc['succed']) {
        var mdesc = mdescid =  0;
        var smdesc;
        for (var i = 0; i < desc[0].length; i++) {
            smdesc = '';
            if (parseFloat(desc[0][i][1]) > mdesc && desc[0][i][3] == 0)  {
                mdesc = desc[0][i][1];
                smdesc = 'selected';
                mdescid = desc[0][i][0];
            }
            strDesc += '<option value="'+desc[0][i][0]+'" valor="'+desc[0][i][1]+'" '+smdesc+'>'+desc[0][i][2]+"</option>"
        }
    }else
        console.log('ERROR con Descuentos: '+desc)

    if ($(".per1103.hide").length == 0 || vcarga == 1)
        strDesc += '<option value="0" class="per1103" valor="0">Por Vendedor</option>';

    switch(vtipo){
        case undefined:
            $("#tdescuento").html(strDesc);
            $("#tdescuento").material_select('update');
            $("#vdescuentop").val(mdesc);
            break;
        case 1:
            // if (parseInt($("#fd"+vidfila).data("triforce")['iddesc']) == 1) {

            // }
            $("#tdescuentol").html(strDesc)
            $("#tdescuentol").material_select('update');
            $("#edescuento").val(mdesc);
            break;
        case 2:
            break;
        default:
            break;
    }   

    // totalizar();
    return {'descuento':mdesc,'iddescuento': mdescid};
}

function cargarImpuestos(vfila,vtabla){

    var imp = getDatos('',109,'@@impresa,"'+vfila+'","'+vtabla+'"',0,0)[0];
    var textImpuestos = '';
    var exo = 0;
    var sMoneda = $(".moneda").html();
    var aexo = 0;
    var noBorrar = vtabla = '11,2' ? 'noBorrar' : '';
    var impuestoStr = '';
 
    for (var i = 0; i < imp.length; i++) {
        impuestoStr += ","+imp[i][0]+",";

        if (!$("#imp_"+imp[i][0]).length) {
            exo = (parseFloat(imp[i][3])*(1-(parseFloat(imp[i][4])/100))).toFixed(2);
            textImpuestos = '<tr id="imp_'+imp[i][0]+'" class="dimpuesto" '+noBorrar+'><td id="imp_v'+imp[i][0]+'">'+imp[i][2]+' ['+exo+'%]:</td><td style="float: right;"><span class="moneda">'+sMoneda+'</span><span id="imv_'+imp[i][0]+'" type="html">0.00</span></td></tr>';
            
            $("#sh_imp").append(textImpuestos);

            $("#imp_"+imp[i][0]).data('valores',{vid:imp[i][0],vmonto:imp[i][3],exoneracion:imp[i][4]});
        }else{
            if (vtabla == 2){
                $("#imp_"+imp[i][0]).data('valores')['exoneracion'] = imp[i][4];
            }
        }
        
    }
    return impuestoStr;
}


function endCargarProducto(exo){
    var modselec = 1;//$("input[name='modselected']:checked").val();

    if (modselec == 1) {
        if (($("#precp").prop("readonly") == undefined || !$("#precp").prop("readonly")) && param != 6){
            $("#precp").focus().select();
            if (exo < 100) {
                var impuestos = 0;
                $(".dimpuesto").each(function(){
                    if ($("#valores").data("elemento")['strimp'].indexOf(','+$(this).data('valores')['vid']+',') >= 0)
                        impuestos += parseFloat($(this).data('valores')['vmonto'])
                });

                $("#precp").val( (parseFloat($("#valores").data("elemento")['hprec'].replace(/,/g,''))*(1+(impuestos/100))).formatMoney(2,'.',',') ) 
                $("#precp").blur();
                $("#precp").select().focus();
                $("[for=iva]").removeClass('hide');
                $("#iva").attr('checked',true);
            }
        }else{
            $("#cantp").focus().select();
        }
        
    }else{
        var e = jQuery.Event("keyup");
        e.which = 13;
        $("#cantp").trigger(e);
    }     
}

function validar (varreglo,vmodulo) {
    
    var salida = {}
    
        /*VALIDACION FRONT END*/
    
    switch(vmodulo['modulo']) {
        case 'factura':
            if (vmodulo['tip'] == '') {
                
                err = validarFactura();
                if ( err ) {
                    return err;
                }
            }
            break;
        case 'detallefactura':
            if (vmodulo['tip'] == '') {
                err = validarDetalleFactura();
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

function validarFactura() {

    if ($("#fdetallefacturas .ciclos").length == 0) {
        $("#codp").focus()
        return "No se Han Ingresado Productos en Detalle";
    }

    return false;
}


function validarDetalleFactura(){
    // var ciclos = $("#fdetallefacturas .ciclos");
    // var fila;
    // var cantidad = ciclos.length;

    // ciclos.each(function(index){
    //     var fila = $(this);
    //     var i = $(this).attr('id').substr(2)
    //     if (fila.data() != undefined) {
    //         if(fila.data('triforce')['vcomodin'] == "1")
    //         fila.data('triforce')['vcomodin'] = $("#desc"+i).html();    
    //     }
    // });

    return false;
}

function endDetail(vid,vacc,vmodulo) {
    console.log(vid)
    actualizar(800,'idtipoocupado=2','id='+mesa);
};