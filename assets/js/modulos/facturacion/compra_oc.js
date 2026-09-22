$(function(){
    console.log('Mod Compra por Orden de Compra Cargada')
    
    $(document).on('keyup',".oc_financiero",function(e){
        let code = e.wich||e.keyCode
        if(code == 13){
           $(this).blur()
        }
    })

    $(document).on('blur',".oc_financiero",function(){
        let valor = $(this).val()
        let fd = $(this).parent().parent().attr('id').substr(2)
        if(isNaN($(this).val().replace(/,/,''))){
            Materialize.toast('Número no Válido',4000,'red')
            valor = 0
        }
        let vtipo = parseInt($(this).attr('vtipo'))
        let vfin = parseInt($(this).attr('vfin'))
        cargarValoresOC(fd,vfin,vtipo);

    })

    $(document).on('keyup',".int_oc_adic",function(e){
        let code = e.wich||e.keyCode
        if(code == 13){
           $(this).blur()
        }
    })

    $(document).on('blur',".int_oc_adic",function(){
        let valor = $(this).val()
        let fd = $(this).parent().parent().attr('id').substr(2)
        if(isNaN($(this).val().replace(/,/,''))){
            Materialize.toast('Número no Válido',4000,'red')
            valor = 0
        }
        cargarValoresOC(fd,1,-1);

    })

    $("#vcompra").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)

        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8){
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;

        $(".autocomplete-content").remove();

        $(this).autocomplete({
            limit: 20,
            data: getNAutocomplete('id,concat(case substring(referencia,30,2) when "01" then "FE" when "02" then "ND" when "03" then "NC" when "04" then "TE"  end, "-",lpad(truncate(substring(referencia,32,10),0),10,0)) as nombre,null',64,'idtipoventa = 2 and idsucursal = @@impresa and referencia and id not in(select idfactura from msfacturas where compraprocesada) and idcliente = '+$("#ffacturas .zelda").data('triforce')['vidcliente']+' having nombre like "%'+busqueda+'%"'),
            onAutocomplete: function(val){
                $("#vcompra").attr('vid',($(this).attr('vid')))
            }
        })

        $(".autocomplete-content").css('min-width','700px').css('margin-top','5%'); 
        }
    })

    $("#change_move_stock").click(function(){
        let fila_fd = $("#"+$("#modal-cambio").attr('fd'))
        let idproducto = fila_fd.attr('idprod')
        let idcompra = $("#ffacturas .zelda").data('triforce')['vid']

        //SI ES PRODUCTO COMODIN CREAR PRODUCTO EN INVENTARIO VENTAS
        if(idproducto == 0 || idproducto == 3541 || idproducto == 3542){
            let pname = $("#change_prod_name").html().replace(/"/g,'\\"')
            
            let change_varios = getDatos(`substring_index(substring_index(idimpuestos,",",4),",",-1) as timv,(select cabys from msproductos where idproducto=${idproducto} limit 1) as cebys,id`,65,`idfactura = ${idcompra} and idproducto = ${idproducto} and if(comodin,comodin = "${pname}",1)`)[0][0]
            let change_iva = fila_fd.attr('iva')

            let change_idnew = getDatos('',78,`1,0,'','',"${pname}",0,0,
${change_iva},1,0,0,0,0,6,@@usr,1,@@impresa,0,0,1,0,0,0,0,${change_varios[0]},0`)[0][0][0]

            insertar(299,'idproducto,estante,fila,columna,cabys,adescuento,margenventa,ultima_venta',`${change_idnew},"","","",${change_varios[1]},1,0,null`)

            actualizar(65,`idproducto=${change_idnew}`,`id=${change_varios[2]}`)

            Materialize.toast('Producto Creado en Inventario Ventas',4000,'green')
            return false
        }
        //inventario actual
        let inv_actual = getDatos('idinventario',97,`idproducto=${idproducto}`)[0][0][0]
        //SI NO ESTA EN VENTAS PASARLO
        if(inv_actual == '6'){
            Materialize.toast('Producto Ya Existente en Inventario Ventas',4000,'red')
            return false
        }else{
            actualizar(97,'idinventario=6',`idproducto=${idproducto}`)
            Materialize.toast('Producto Migrado de Inventario a Ventas',4000,'green')
        }
    })

    $("#_changeprod").click(function(){
        let id_prodchange = $("#_prod_cambiar").attr('vid')
        let idfactura = $("#ffacturas .zelda").data('triforce')['vid']
        let comodin = $("#"+$("#modal-cambio").attr('fd')+" .cargarReferencias").html().trim().replace(/"/g,'\\"')
        console.log(id_prodchange)
        if(id_prodchange != 0){

            let id_prod_line = $("#"+$("#modal-cambio").attr('fd')).attr('idprod')
            actualizar(65,`idproducto = ${id_prodchange}`,`idfactura = ${idfactura} and idproducto = ${id_prod_line} and if(comodin <> "",comodin = "${comodin}",1)`)

            $("#"+$("#modal-cambio").attr('fd')).attr('idprod',id_prodchange)

            Materialize.toast('Producto Cambiado',4000,'green')
            $("#modal-cambio").modal('close')
        }
    
    })
})

$(document).on('click','.preponderado',function(){
    let tipo = $(this).attr('tipo')
    let preponderado = 1;
    if(tipo == '0'){//HABILITAR PREPONDERADO
        $(this).attr('tipo',1)
        $(this).css('color','white')
        $(this).css('background-color','green')
        $(this).css('border','1px solid green')
    }else{
        preponderado = 0;
        $(this).attr('tipo',0)
        $(this).css('color','grey')
        $(this).css('background-color','white')
        $(this).css('border','1px solid #e2e2e2')
    }

    let fd = $(this).parent().parent().parent();
    let costo = parseFloat(fd.find('.int_oc_costo').attr('vid').replace(/,/,''))
    
    if(preponderado == 1){
        let razon = fd.find('.int_oc_dim_costo').attr('valor') == undefined ? 1 : parseFloat(fd.find('.int_oc_dim_costo').attr('valor'))
        let unidad_oc = parseFloat(fd.find('.int_oc_cant').attr('idu'))
        let valor_multiplicacion = unidad_oc == 1 ? razon : 1;

        let cantidad_inv_venta  = parseFloat(fd.find('.int_oc_exi').attr('vid'))
        let cantidad_inv_compra = parseFloat(fd.find('.int_oc_cant').val().replace(/,/g,''))*valor_multiplicacion
        let adicional           = parseFloat(fd.find('.int_oc_adic').val().replace(/,/g,''))
        console.log(adicional)
        let costo_ant           = parseFloat(fd.find('.int_oc_costo_orig').attr('vid').replace(/,/g,''))
        adicional               = fd.find('.oc_adic_tipo').attr('vid') == '1' && adicional > 0 ? adicional-costo : adicional
        costo = costo+adicional

        costo = (cantidad_inv_venta*costo_ant+cantidad_inv_compra*costo)/(cantidad_inv_compra+cantidad_inv_venta)
    }

    fd.find('.int_oc_costo_orig').html(costo.formatMoney('2','.',','))
    variable_costos(fd.attr('id'))
    cargarValoresOC(fd.attr('id').substr(2),1,-1)
})

$(document).on("click",".cambiar_producto",function(){
    let padre = $(this).parent().parent()

    $("#modal-cambio").attr('fd',padre.attr('id'))
    $("#change_prod_name").html(padre.find('.cargarReferencias').html().trim())
    $("#_prod_cambiar").val('')
    $("#modal-cambio").modal('open')
});

$(document).on("blur", ".int_oc_cant ", function(){
    let padre = $(this).parent().parent()
    let razon = padre.find('.dim_row').attr('razon')
    razon = razon == undefined ? 1 : razon

    let actual = parseFloat($(this).val().replace(/,/g,''))
    let original = parseFloat(padre.find('.int_oc_exi').attr('vid'))

    if(padre.find('.dim_row').length){
        console.log('cambiar en dim')
    }

    if(actual != original){
        console.log('modal definir razon de cambio')
    }
})

$(document).on("keydown",".fcompraOC",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = keysight(e)

    if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
        var tipo = getParameterByName('tf');
        var id = $(this).parent().parent().attr('id')
        $(".autocomplete-content").remove();
        $("#show_in_ref").addClass('hide')

        $(this).autocomplete({
            limit: 20,
            data: arr('login',4,'concat(lpad(consecutivo,10,0),"-",(select nombre from clientes where id = facturas.idcliente)) as nombre,null',64,'idtipoventa = 3 and idsucursal = @@impresa and idestado in(1,2) having nombre like "%'+busqueda+'%"',0,0,0,1),
            onAutocomplete: function(val){
                
                var ref = val.substr(0,val.indexOf('-'));
                var client = val.substr(val.indexOf('-')+1);

                $("#ncli").val(client);
                $("#vreferencia").val(ref);

                var datos = getDatos('id,idcliente,lpad(consecutivo,10,0) as ref,(select nombre from clientes where id = facturas.idcliente) as client',64,'idtipoventa = 3 and consecutivo = '+ref+' and idsucursal = @@impresa');
                var vidfact = datos[0][0][0];
                $("#show_in_ref").removeClass('hide')
                $("#show_in_ref").attr('fila',datos[0][0][0])

                $("#ffacturas .zelda").data('triforce')['vidcliente'] = datos[0][0][1];
                $("#ffacturas .zelda").data('triforce')['vid'] = vidfact;
                
                $("#fdetallefacturas").html(mantenimiento('facturacion',11,{idfact:vidfact,idtp:2}));
                $("#fdetallefacturas").css('font-size','12px')
                $(".autocomplete").autocomplete();
                $('.info_costo').tooltip({delay: 50,duration:1000});

                $("#vcompra").attr('readonly',false).focus()
            }
        })

        $(".autocomplete-content").css('min-width','700px').css('margin-top','5%');
    }
});

export function variable_costos(fd){
    let color = 'green';
    let flecha = 'mdi-arrow-up';
    let actual = parseFloat($("#"+fd).find('.int_oc_costo_orig').attr('vid'))
    let compra = parseFloat($("#"+fd).find('.int_oc_costo_orig').html().replace(/,/g,''))

    if(actual > compra){
        flecha = 'mdi-arrow-down';
    }else if (actual < compra) {
        color = 'red';
    }else{
        flecha = 'mdi-equal';
    }

    let variable = '<i class="mdi '+flecha+' '+color+'-text "></i>';

    $("#"+fd).find('.int_oc_costo_orig').css('color',color)
    $("#"+fd).find('.int_oc_variable').html(variable)
}

export function cargarValoresOC(fila,tipo,dim){
    console.log(fila,tipo,dim)
    /*DIM:
        -1 GLOBAL
        0 SOLO LINEA PRINCIPAL
        1 SOLO LINEA DIM
    */
    let elem        = $("#fd"+fila)
    let iva         = parseFloat(elem.attr('iva'))
    let costo       = parseFloat(elem.find('.int_oc_costo_orig').html().replace(/,/g,''));
    let adicional   = parseFloat(elem.find('.int_oc_adic').val().replace(/,/g,''))
    adicional       = elem.find('.oc_adic_tipo').attr('vid') == '1' && costo > 0  && adicional > 0 ? adicional - costo : adicional
    console.log(adicional)
    let isdim       = dim == -1 ? elem.find('.dim_row').length : dim;
    let venta       = 0;
    let venta_iva   = 0;
    let utilidad    = 0;

    let cos_dim     = 0;
    let ult_dim     = 0;
    let ven_dim     = 0;
    let vmi_dim     = 0;
    let razon       = 1;

    if(dim < 1){
        utilidad    = parseFloat(elem.find('.int_oc_utl').val().replace(/,/,''))
        venta       = parseFloat(elem.find('.int_oc_venta').val().replace(/,/g,''))
        venta_iva   = parseFloat(elem.find('.int_oc_venta_iva').val().replace(/,/g,''))
    }

    if(isdim){
        razon       =   parseFloat(elem.find('.int_oc_dim_costo').attr('valor'))
        cos_dim     =   (costo+adicional)/razon 
        ult_dim     =   parseFloat(elem.find('.int_oc_dim_utl').val().replace(/,/,'')) 
        ven_dim     =   parseFloat(elem.find('.int_oc_dim_venta').val().replace(/,/g,''))
        vmi_dim     =   parseFloat(elem.find('.int_oc_venta_dim_iva').val().replace(/,/g,''))
    }

    switch(tipo){
        case 1: //adicional //utilidad
            if(dim < 1){
                venta = (costo+adicional)*(1+utilidad/100)
                venta_iva = venta*(1+iva/100)
                elem.find('.int_oc_venta').val(venta.formatMoney(2,'.',','))
                elem.find('.int_oc_venta_iva').val(venta_iva.formatMoney(2,'.',','))
                costo = parseFloat(elem.find('.int_oc_costo').attr('vid'))
                elem.find('.int_oc_costo').html((costo+adicional).formatMoney(2,'.',','))
            }
            if(isdim){
                ven_dim = (cos_dim)*(1+(ult_dim/100))
                vmi_dim = ven_dim*(1+(iva/100))
                elem.find('.int_oc_dim_venta').val(ven_dim.formatMoney(2,'.',','))
                elem.find('.int_oc_venta_dim_iva').val(vmi_dim.formatMoney(2,'.',','))
                elem.find('.int_oc_dim_rcosto').html(cos_dim.formatMoney(2,'.',','))
            }
            break;
        case 2: //VENTA
            if(dim < 1){
                venta_iva = venta*(1+iva/100)
                utilidad  = venta-(costo+adicional)
                utilidad  = (utilidad*100)/(costo+adicional) 
                elem.find('.int_oc_utl').val(utilidad.formatMoney(2,'.',','))
                elem.find('.int_oc_venta_iva').val(venta_iva.formatMoney(2,'.',','))
            }
            if(isdim){
                vmi_dim = ven_dim*(1+iva/100)
                ult_dim = ven_dim-cos_dim
                ult_dim = (ult_dim*100)/cos_dim
                elem.find('.int_oc_dim_utl').val(ult_dim.formatMoney(2,'.',','))
                elem.find('.int_oc_venta_dim_iva').val(vmi_dim.formatMoney(2,'.',','))
            }
            break
        case 3:
            if(dim < 1){
                venta = venta_iva/(1+iva/100)
                utilidad  = venta-(costo+adicional)
                utilidad  = (utilidad*100)/(costo+adicional) 
                elem.find('.int_oc_utl').val(utilidad.formatMoney(2,'.',','))
                elem.find('.int_oc_venta').val(venta.formatMoney(2,'.',','))
            }
            if(isdim){
                ven_dim = ven_dim/(1+iva/100)
                ult_dim = ven_dim-cos_dim
                ult_dim = (ult_dim*100)/cos_dim
                elem.find('.int_oc_dim_utl').val(ult_dim.formatMoney(2,'.',','))
                elem.find('.int_oc_dim_venta').val(ven_dim.formatMoney(2,'.',','))
            }
            break;
        default:
            break;
    }
}

export function ocdocompra(){

    if($("#ffacturas .zelda").data('triforce')['vid'] == '0'){
        Materialize.toast('Debe Incluir la Orden de Compra',4000,'red');
        $("#vreferencia").focus()
        return false;
    }

    if(!$("#fdetallefacturas .ciclos").length){
        Materialize.toast('No hay Artículos',4000,'red');
        return false;
    }

    if($("#vcompra").attr('vid') == '0'){
        Materialize.toast('Debe Incluir el Número de Compra',4000,'red');
        return false;
    }

    $("#docompra").attr('disabled',true);
    let isdim       = 0
    let cant        = 0
    let idprod      = 0
    let idcompra    = $("#vcompra").attr('vid')
    let costo       = 0;
    let utilidad    = 0;
    let adicional   = 0;
    let iva         = 0;
    let razon       = 0;
    let dim_costo   = 0;
    let dim_venta   = 0;
    let dim_ventaiva = 0;
    let idoc        = $("#show_in_ref").attr('fila')

    //validar lineas
    $.each($("#fdetallefacturas .ciclos"),function(){
        let util = parseFloat($(this).find('.int_oc_utl').val().replace(/,/g,''))
        if(util <= 0){
            //UTILIDADES
            $("#docompra").attr('disabled',false)
            Materialize.toast('Utilidad no Válida',4000,'red')
            $(this).find('.int_oc_utl').focus()
            return false;
        }
    })
    
    $.each($("#fdetallefacturas .ciclos"),function(){
        isdim       = $(this).find('.dim_row').length
        cant        = isdim ? $(this).find('.int_oc_dim_cant').val().replace(/,/g,'') : $(this).find('.int_oc_cant ').val().replace(/,/g,'')
        idprod      = $(this).attr('idprod');
        adicional   = parseFloat($(this).find('.int_oc_adic').val().replace(/,/g,''))

        costo       = parseFloat($(this).find('.int_oc_costo').html().replace(/,/g,'').trim());

        if(adicional > 0){
            let costo_raiz = parseFloat($(this).find('.int_oc_costo_orig').html().replace(/,/g,''))
            adicional = adicional - costo_raiz
            //costo = costo + adicional
        }

        iva         = parseFloat($(this).attr('iva'))
        
        /*SUBIR INVENTARIO*/
        console.log(actualizar(97,'cantidad = cantidad+'+cant,'idproducto = '+idprod+' and idinventario = 6'));
        /*RESTAR EN INVENTARIO OC*/
        console.log(actualizar(97,'cantidad = cantidad-'+cant,'idproducto = '+idprod+' and idinventario = 10'));
        console.log(eliminar(97,'cantidad = 0 and idinventario = 10'))

        /*PROVEEDOR PRODUCTOS*/
        console.log(insertar(104,'','null,'+idprod+','+$("#ffacturas .zelda").data('triforce')['vidcliente']+',"",'+(costo)+','+adicional+',now(),1,0,1,@@usr,'+idcompra));

        /*BOLETA DE COMPRA*/
        var cante = getDatos('cantidad',97,'idproducto =  '+idprod+' and idinventario = 6')[0][0][0];
        console.log(insertar(298,'','null,1,'+cant+',now(),'+idprod+',"",@@impresa,@@usr,'+cante+',64,'+idcompra+',""'));

        /*ACTUALIZAR PRODUCTO*/
        utilidad = parseFloat($(this).find('.int_oc_venta').val().replace(/,/g,''))-costo;

        console.log(actualizar(11,'costo='+costo+',ganancia='+utilidad+',venta='+$(this).find('.int_oc_venta_iva').val().replace(/,/g,''),'id='+idprod))
        console.log(insertar(445,'',idprod+',@@usr,1,'+$(this).find('.int_oc_venta').val().replace(/,/g,'')+','+iva+','+utilidad+','+idcompra+',now()' ) )

        var elem = $(this)
        $.each(elem.find('.dim_row'),function(){
            razon           = parseFloat(elem.find('.int_oc_dim_costo').attr('valor'))
            dim_costo       = costo/razon;
            dim_venta       = parseFloat($(this).find('.int_oc_dim_venta').val().replace(/,/g,''));
            dim_ventaiva    = parseFloat($(this).find('.int_oc_venta_dim_iva').val().replace(/,/g,''));

            console.log( actualizar(105,'ganancia = '+dim_venta-dim_costo+',venta = '+dim_ventaiva,'id = '+$(this).attr('vid')) )
        })

    })
  
  	/*CANTIDAD INICIAL VS CANTIDAD FINAL, DEFINIR RAZON Y CANTIDAD EN CASO QUE UNA LINEA NO RECIBA LA CANTIDAD, SI LA RESTA DA DIFERENTE IDESTADO = 2 PARCIAL, PRO:ADJUDICAR NC*/
	
  	actualizar(64,`idestado=10,extra=${idcompra}`,'id='+idoc)
  
    Materialize.toast('Artículos Incluidos',4000,'green');

    setTimeout(function(){
        location.reload();
    },4000);

}