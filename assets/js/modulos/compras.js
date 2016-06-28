var max = 1;

$(document).ready(function(){

    $("#vreferencia").focus();
        
    $('#nprv').autoComplete({
        minChars: 1,
        source: function(term, response){
            term = term.toLowerCase();
            var arr = {}
            arr['sel'] = 'nombre';
            arr['tbl'] = 3;
            arr['where'] = 'nombre like \"%'+term+'%\" and id > 0 order by nombre';
            msuggest = mantenimiento('login',4,arr)[0];              
            response(msuggest);
        }
    });

    $('#descr').autoComplete({
        minChars: 1,
        source: function(term, response){
            term = term.toLowerCase();
            var array = {}
            array['sel'] = $("#prodprov").is(":checked") ? 'Producto' :'nombre';
            array['tbl'] = $("#prodprov").is(":checked") ? 15 : 7;
            array['where'] = $("#prodprov").is(":checked") ? 'Producto like \"%'+term+'%\" and IDprod > 0 and IDprov = '+$("#vidproveedor").val()+' order by Producto' : 'nombre like \"%'+term+'%\" and id > 0 order by nombre';
            msuggest = mantenimiento('login',4,array)[0];              
            response(msuggest);
        }

    });

    $("#ninunclud").click(function(){
        $("#descr").focus();
        $("#descr").select();
        $("#alert-prod").hide();
    });

    $("#includ").click(function(){
        $("#alert-prod").hide();
        
        $("#prod"+max).html($("#descr").val());
        $("#vidproducto"+max).val(0);

        $("#vcantidad"+max).focus();
        $("#vcantidad"+max).select();
    });

    $(".delf").hide()

    $("#del1").click(function(){
        
        if ($(".delf").is(":visible")) {
            $('input[name="eliminarf"]:checked').each(function(){
                id = $(this).val();
                if($("#prod"+id).html() != '')
                    $("#f"+id).empty()
            });
            totalizar();
        }

        $(".delf").toggle()
    });

    $("#fcompras").submit(function(){
        return false;
    })

    $("#data-table-detalle").dataTable({
        bFilter : false,
        bScrollInfinite : true,
        bSort : false,
        bLengthChange : false,
        bPaginate :  false,
        bInfo : false
    });

    $(".xort").blur(function(){
        detallar($(this).attr('idx'))
    });

});


$(document).on('keyup','#vreferencia',function(e){
    var code = e.keyCode || e.which;
    focus = $("#vfecha_inclucion");
    k_p(code,focus);
});

$(document).on('keyup','#vfecha_inclucion',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#vfecha_entrega");
    k_p(code,focus);
});

$(document).on('keyup','#vfecha_entrega',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#vcedula");
    k_p(code,focus);
});

$(document).on('keyup','#idprv',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#descr");
    k_n(code,focus);
});

$(document).on('keyup','#nprv',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#descr");
    k_n(code,focus);
});

$(document).on('keyup','#descr',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#vcantidad"+max);
    if ($(this).val() != '')
        k_d(code,focus);
});

$(document).on('keyup','#cod',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#vcantidad"+max);
    if ($(this).val() != '')
        k_d(code,focus);
});

$(document).on('keyup','[id^=vcantidad]',function(e){
    var code = e.keyCode || e.which;
    var id = $(this).attr('id').substr(9)
    var focus = $("#vcosto"+id);
    k_p2(code,focus,id);
});

// $(document).on('blur','#cant'+max,function(){
    
//     if(isNaN($(this).val()))
//         $(this).val(1)
//     var focus = $("#costo"+max);
//     k_p(13,focus);
// });

$(document).on('keyup','[id^=vcosto]',function(e){
    var code = e.keyCode || e.which;
    var id = $(this).attr('id').substr(6)
    var focus = $("#vprecio"+id);
    k_p2(code,focus,id);
});

$(document).on('keyup','[id^=vprecio]',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#descr");

    if (code == 13) {
        var id = $(this).attr('id').substr(7)
        k_p2(code,focus,id)
        if($("vprecio"+(id+1)).val() != 'undefined');
            addline(id)
        focus.select();
    }

    
    
    
});

function k_p(code,focus) {
	if (code == '13') {
		focus.focus();
	}
}

function k_p2(code,focus,index) {
    if (code == '13') {
        focus.focus();
        detallar(index)
    }
}

function k_n(code,focus) {
    if (code == '13') {
        var nombre = $("#nprv").val();
        var cedula = $("#idprv").val();
        var arr = {}
        arr['sel'] = 'id,cedula,nombre';
        arr['tbl'] = 3;
        arr['where'] = 'nombre = \"'+nombre+'\" or cedula = \"'+cedula+'\" having id > 0';
        var p = mantenimiento('login',4,arr)[0][0];
        
        $("#vidproveedor").val(p[0]);
        $("#idprv").val(p[1]);
        $("#nprv").val(p[2]);
        focus.focus();
        focus.select()
    }
}

function k_d(code,focus)
{
	if (code == '13') {
		var prod = $("#descr").val();
        var codigo = $("#cod").val();
	    var arr = {};
	    arr['sel'] = 'id,nombre';
	    arr['tbl'] = 7;
	    arr['where'] = 'nombre = \"'+prod+'\" or id = \"'+codigo+'\" having id > 0';
	    var p = mantenimiento('login',4,arr);

        if(p[0].length == 0){
            $("#alert-prod").show()
            focus = $("#descr");
        }else{
            p = p[0][0];
             $("#alert-prod").hide()
    	    $("#prod"+max).html(p[1]);
    	    $("#vidproducto"+max).val(p[0]);
        }
	    focus.focus()
        focus.select()
	}
}



function totalizar() {

    var cantidad = 1;
    var precio = 1;
    var costo = 1;
    var tot = 0;
    var marg = 0;


   $("#tot").html('0.00');
   $("#tmargen").html('0.00');
   $("#vtsubtotal").val(0);
   $("#vtmargen").val(0);
    
   $("#detallecompra tr").each(function(index){
        
        id = $(this).attr('id').substr(1);

        cantidad = isNaN($("#vcantidad"+id).val()) ? 1 : parseFloat($("#vcantidad"+id).val());
        costo = isNaN($("#vcosto"+id).val()) ? 1 : parseFloat($("#vcosto"+id).val());

        tot += cantidad*(costo/2); 

        if($("#totm"+id).css('color') == 'rgb(255, 0, 0)')
            marg += parseFloat($("#totm"+id).text().replace(",",''))*-1;
        else
            marg += parseFloat($("#totm"+id).text().replace(",",''));
          
   })

   $("#tmargen").html( (parseFloat($("#tmargen").html()) + parseFloat(marg)).formatMoney(2,'.',',') );
   $("#tot").html( (parseFloat($("#tot").html()) + parseFloat(tot)).formatMoney(2,'.',',') );

   $("#vtmargen").val( (parseFloat($("#vtmargen").val()) + parseFloat(marg)).toFixed(2) );
   $("#vtsubtotal").val( (parseFloat($("#vtsubtotal").val()) + parseFloat(tot)).toFixed(2) );
}

function detallar(id) {
    var cantidad = isNaN($("#vcantidad"+id).val()) ? 1 : parseFloat($("#vcantidad"+id).val());
    var precio = isNaN($("#vprecio"+id).val()) ? 1 : parseFloat($("#vprecio"+id).val());
    var costo = isNaN($("#vcosto"+id).val()) ? 1 : parseFloat($("#vcosto"+id).val());

    var margen = (precio-costo)/2;

    if (margen < 0) {
        $("#totm"+id).css("color","red");
        $("#margen"+id).css("color","red");
    }else if (margen == 0) {
        $("#totm"+id).css("color","black");
        $("#margen"+id).css("color","black");
    }else {
        $("#totm"+id).css("color","green");
        $("#margen"+id).css("color","green");
    }
    
    $("#margen"+id).text( Math.abs(margen).formatMoney(2,'.',',') );
    $("#totm"+id).text( Math.abs(margen*cantidad).formatMoney(2,'.',',') );
    $("#prcent"+id).text( (((precio/costo)-1)*100).toFixed(2) );

    totalizar();

}

function addline(id) {
    if( ($("#prod"+id).html() == '') || ($("#prod"+max).html() == '') ){
        $("#descr").focus();
        return false;
    }
    else{
        max += 1;
        $("#detallecompra").append('<tr id="f'+max+'"><td>  <span class="checkbox" id="prod'+max+'"></span><input type="hidden" id="vidproducto'+max+'" class="constante'+max+'" value=""><input type="hidden" id="vidfactura'+max+'" value="?"></td><td><input type="number" id="vcantidad'+max+'" idx="'+max+'" class="form-control xort" value="1" required="required" min="1"></td><td><input type="text" id="vcosto'+max+'" idx="'+max+'" class="form-control xort eder" value="0.00" required="required" data-mas="99999999.99"></td><td><input type="text" id="vprecio'+max+'" idx="'+max+'" class="form-control xort eder" value="0.00" required="required" data-mas="99999999.99"></td><td align="right"><div class="checkbox"> <span class="valores" id="margen'+max+'">0.00</span></div></td><td align="right"><div class="checkbox"> <span class="valores" id="totm'+max+'">0.00</span></div><td align="left"><div class="checkbox"> <input type="checkbox" class="delf" value="'+max+'" name="eliminarf" style="float: right;display: none;"> <span id="prcent'+max+'" value="0">0.00</span>  </div></td></tr>');
    }
}

function validar (varreglo,vmodulo) {
    
    var salida = {}
    
        /*VALIDACION FRONT END*/
    
    switch(vmodulo['modulo']) {
        case 'compra':
            if (vmodulo['tip'] == '') {
                err = validarCompra();
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

function validarCompra() {

    if ($("#vfecha_inclucion").val() == '') {
        $("#vfecha_inclucion").focus();
        return "Fecha de Incluión Requerida";
    }

    if ($("#vidproveedor").val() == 0) {
        $("#nprv").focus()
        return "Proveedor Requerido";
    }

    if ($("#vtsubtotal").val() == '') {
        $("#descr").focus()
        return "No se Han Ingresado Productos";
    }

    if ($("#vcomentario").val() == '') {
        $("#vcomentario").focus();
        return "Comentario Requerido";
    }


    return false;
}

function cargar(vmodulo,vid) {


    switch(vmodulo['modulo']) {
        case 'compra':
            vmodulo['sel'] = 'id as vid,cedula as vcedula,nombre as vnombre';
            vmodulo['tbl'] = 3;
            vmodulo['where'] ='id ='+vid;
            break;
        default:
            return 'Módulo no Existente';
            break;
    }
    
    return vmodulo;
}

function cargarSintax(){
    var arr = {}

    arr['sel'] = '*';
    arr['tbl'] = 4;
    arr['where'] = '1 and Id > 0 order by `Razón Social`';

    return arr;
}