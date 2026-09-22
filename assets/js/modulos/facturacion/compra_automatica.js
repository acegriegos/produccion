$(function(){
	console.log('Mod Compra Automatica Cargada')
})

$(document).on("keyup",".fcompra",function(e){
    var code = e.wich || e.keyCode;
    if(code == 13){
        var fct = getDatos('ifnull((select id from rfacturas where substring(referencia,32,10) = '+$(this).val()+'),0),ifnull((select id from tmpcompras where substring(referencia,32,10) = '+$(this).val()+'),0),ifnull((select id from facturas where substring(referencia,32,10) = '+$(this).val()+'),0)',0,'');

        if(fct[0][0][0] != "0"){
            if(fct[0][0][1] != "0" && fct[0][0][2] == "0"){
                Materialize.toast('Factura sin Procesar',4000,'red');
                $(this).focus().select()
            }
        }else{
            Materialize.toast('Factura No Existente',4000,'red');
            $(this).focus().select()
        }
    }
});

$(document).on("keydown",".fcompra",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = keysight(e)

    if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
        var tipo = getParameterByName('tf');
        var id = $(this).parent().parent().attr('id')
        $(".autocomplete-content").remove();

        $(this).autocomplete({
            limit: 20,
            data: arr('login',4,'concat(truncate(substring(referencia,32,10),0),"-",(select nombre from clientes where id = facturas.idcliente and apellido1 not in(2))) as nombre,null',64,'idtipoventa = 2 and idsucursal = @@impresa and referencia and id not in(select idfactura from msfacturas where compraprocesada) and datediff(fecha,curdate()) > -370 having nombre like "%'+busqueda+'%"',0,0,0,1),
            onAutocomplete: function(val){
                
                var ref = val.substr(0,val.indexOf('-'));
                var client = val.substr(val.indexOf('-')+1);

                $("#ncli").val(client);
                $("#vreferencia").val(ref);

                var datos = getDatos('id,idcliente,truncate(substring(referencia,32,10),0) as ref,(select nombre from clientes where id = facturas.idcliente) as client',64,'truncate(substring(referencia,32,10),0) = '+ref+' having client = "'+client+'"');
                var vidfact = datos[0][0][0];
                $("#ffacturas .zelda").data('triforce')['vidcliente'] = datos[0][0][1];
                
                $("#fdetallefacturas").html(mantenimiento('facturacion',11,{idfact:vidfact,idtp:1}));
                $("#fdetallefacturas").css('font-size','12px')
                $(".autocomplete").autocomplete();
            }
        })

        $(".autocomplete-content").css('min-width','700px').css('margin-top','5%');
    }
});

export function mdocompra(){ 
  if(!$("#fdetallefacturas .ciclos").length){
        Materialize.toast('No hay Artículos',4000,'red');
        return false;
    }

    let cnt = 1;
    let costo = 0;
    let cant = 0;
    let ppro = 0;
    let idprod = 0
    let idcompra = 0;
    let utilidad = 0;

    $("#fdetallefacturas .ciclos").each(function(){

        if($(this).data('triforce')['videntrada'] == 0 && parseInt($(this).find('.int_cnt').val().replace(/,/g,'')) > 0){
            Materialize.toast('Artículo no Incluido',4000,'red')
            $(this).find('.eqprod').focus();
            cnt = 0;
            return false;
        }

    });

    if(!cnt)
        return false;

    $("#docompra").attr('disabled',true);

    $("#fdetallefacturas .ciclos").each(function(){
        costo = $(this).find('.int_costo').html().replace(/,/g,'')
        idprod = $(this).data('triforce')['videntrada']
        idcompra = $(this).attr('vid')

        if(costo != ''){

            $(this).data('triforce')['exoneracion'] = parseFloat($(this).data('triforce')['exoneracion']).formatMoney(2,'.','');

            if($(this).find(".dim_row").length){//DIMENSIONES
                cant = parseFloat($(this).find(".dim_row[unidad=8] .dim_cant input").val())
                //ACTUALIZAR NIVEL PRODUCTOS
                //checkear entradas y corregir
                // actualizar(105,'ganancia=,venta=','identrada='+idprod)
            }else
                cant = parseFloat($(this).find('.int_cnt').val().replace(/,/g,''));

            /*PROVEEDOR PRODUCTOS*/
            ppro = getDatos('id',104,'idproveedor = '+$("#ffacturas .zelda").data('triforce')['vidcliente']+' and idproducto = '+idprod,0,0,0);

            var cpp = $(this).data('triforce')['vcodigo'].length ? $(this).data('triforce')['vcodigo'] : $("#desc"+$(this).attr('id').substr(2)).html();
            let intrel = $(this).find('.int_rel').val().replace(/,/g,'')
            intrel = intrel.includes('*') ? 1 : intrel
            console.log(insertar(104,'','null,'+idprod+','+$("#ffacturas .zelda").data('triforce')['vidcliente']+',"'+cpp+'",'+costo+',0,now(),1,0,'+intrel+',@@usr,'+idcompra));

            /*SUBIR INVENTARIO*/
            console.log(actualizar(97,'cantidad = cantidad+'+cant,'idproducto = '+idprod));

            /*BOLETA DE COMPRA*/
            var cante = getDatos('cantidad',97,'idproducto =  '+idprod,0,0,0);

            console.log(insertar(298,'','null,1,'+cant+',now(),'+idprod+',"",@@impresa,@@usr,'+cante[0][0][0]+',64,'+idcompra+',""'));

            /*ACTUALIZAR PRODUCTO*/
            utilidad = parseFloat($(this).find('.int_venta').val().replace(/,/g,''))-costo;

            if(parseFloat(costo) >= 0)
                console.log(actualizar(11,'costo='+costo+',ganancia='+utilidad+',venta='+$(this).find('.int_ventaiva').val().replace(/,/g,''),'id='+idprod))
            console.log(insertar(445,'',idprod+',@@usr,1,'+$(this).find('.int_venta').val().replace(/,/g,'')+','+$(this).data('triforce')['timv']+','+utilidad+','+idcompra
            +',now()' ) )
            console.log(actualizar(299,'cabys="'+$(this).data('triforce')['cabys']+'"','idproducto='+idprod))

            let dim_costo = dim_venta = dim_venta = 0;
            $.each($(this).find('.dim_row'),function(){
                dim_costo = parseFloat($(this).find('.dim_costo').val().replace(/,/g,''));
                dim_venta = parseFloat($(this).find('.int_venta').val().replace(/,/g,''));
                dim_ventaiva = parseFloat($(this).find('.int_ventaiva').val().replace(/,/g,''));
                console.log( actualizar(105,'ganancia = '+dim_venta-dim_costo+',venta = '+dim_ventaiva,'id = '+$(this).attr('vid')) )
            })
        }

    });

    insertar(291,'idfactura,compraprocesada',$("#fd1").data('triforce')['vidfactura']+',1');


    if(cnt){
        Materialize.toast('Artículos Incluidos',4000,'green');

        setTimeout(function(){
            location.reload();
        },4000);
    }
};

$(document).on('focus','#fdetallefacturas .ciclos [type=text]',function(){
    $(this).select()
})

$(document).on('click','.segm_cnt',function(){
    let id = $(this).parent().parent().attr('id')
    $("#modal-segm_cnt").attr('vid',id)
    $("#modal-segm_cnt").modal('open')
})

$(document).on("click",".segProducto",function(){
    const id = $(this).parent().parent().attr('id')
    if(id != undefined){
         
        let idnum       = id.substr(2)
        let idfactura   = $("#"+id).data('triforce')['vidfactura']
        let _iva        = $("#"+id).data('triforce')['iva']
        let _timv       = $("#"+id).data('triforce')['timv']
        let _cabys      = $("#"+id).data('triforce')['cabys']
        let _exo        = $("#"+id).data('triforce')['exoneracion']
        let id_seg      = $("[id^=sg"+idnum+"]").length+1

        $("#"+id).after('<div class="seg_row row col s12 ciclos" style="padding:0px" id="sg'+idnum+'_'+id_seg+'" vid="0">'+
            '<div style="padding: 0 !important;" class="col s2"> <i class="mdi mdi-subdirectory-arrow-right"></i> </div>'+ 
            '<div style="padding: 0 !important;position: relative;" class="col s1 center-align"> '+
                '<input class="browser-default autocomplete eqprod" style="margin:0px;height: auto !important;font-size: 12px" value="" /> '+
                '<i class="mdi mdi-plus der pbtn addProducto" style="position: absolute;" title="Agregar Articulo"></i> <i class="mdi mdi-pencil der hide pbtn editProducto" vid="0" style="position: absolute;" title="Editar Producto"></i> </div>'+
            '<div style="padding: 0 !important;" class="col s1 hide"></div>'+
            '<div style="padding: 0 !important;" class="col s1 center"><small tipo="1" class="apl_costo hide" style="cursor: pointer; border: 1px solid green; border-radius: 50px; color:white; background-color:  green;position: absolute;"> APL </small> ---</div>'+
            '<div class="center hide"> <i class="mdi mdi-24px mdi-clipboard-flow pbtn costo" iscambiado="0" title="Cambiar Márgenes"></i> </div>'+
            '<div class="col s1 center">---</div>'+
            '<div class="col s1 center"> <input type="text" class="browser-default int_exi numeric eder" style="width:100%; height: auto !important; border: none;" value="0"> </div>'+
            '<div class="col s1"> <input type="text" class="browser-default int_cnt numeric eder" style="width:100%; height: auto !important; border: none;" value="0"></div>'+
            '<div class="col s1 info_costo tooltipped" data-position="button" data-tooltip="" style="text-align: right">'+
                '<small> <a tipo="0" class="preponderado" style="cursor: pointer; border: 1px solid #e2e2e2; border-radius: 50px; color:grey;">PRE</a> </small>'+
                '<span class="int_variable"></span>'+
                '<span class="int_costo"></span> </div>'+
            '<div class="col s1"> <input type="text" class="browser-default int_adic eder" style="width:100%; height: auto !important; border: none;" value="0"> </div>'+
            '<div class="col s1"><input type="text" class="browser-default int_utl numeric eder" style="width:100%; height: auto !important; border: none;" value="0"></div>'+
            '<div class="col s1"><input type="text" class="browser-default int_venta numeric eder" style="width:100%; height: auto !important; border: none;" value="0"></div>'+
            '<div class="col s1"> <input type="text" class="browser-default int_ventaiva numeric eder" style="width:100%; height: auto !important; border: none;" value="0"> </div> </div>')

        $("#sg"+idnum+"_"+id_seg).data('triforce',{vaccion:0,vid : 0,vidfactura : idfactura,videntrada : 0,vcantidad : 0,vprecio : 0, original : 0, vdesc : "",vtotal : 0, vidinventario : 6, timv : _timv, vidodt : 0,vterminal : 0,vimv : 0, vcomodin : "",vidunidad : 1,vidimpuestos:"",videxoneracion: "",viddescuentos:"",strimp : "",exoneracion:_exo,vcomision:0,max: 0, iddesc: 0,vdescuento : "",iva:_iva,isinventariado : 0, vcodigo : "",teu : 1,tcu : 1,rcant : 0,requiv:0,cabys : _cabys,ocant : ""})
    }
})

$(document).on('change','.int_utl_dim',function(){
    let id = $(this).parent().parent().parent().attr('id').substr(2)
    let utilidad = parseFloat($(this).val().replace(/,/g,''))
    let costo = parseFloat($("#fd"+id).find('.dim_costo').html().replace(/,/g,''))
    let iva = parseFloat($("#fd"+id).data('triforce')['iva'])
    
    let venta = costo*(1+(utilidad/100))
    $("#fd"+id).find('.int_venta_dim').val(venta.formatMoney(2,'.',','))
    $("#fd"+id).find('.int_ventaiva_dim').val((venta*(1+(iva/100))).formatMoney(2,'.',','))
})

$(document).on('change','.int_venta_dim',function(){
    let id = $(this).parent().parent().parent().attr('id').substr(2)
    let venta = parseFloat($(this).val().replace(/,/g,''))
    let costo = parseFloat($("#fd"+id).find('.dim_costo').html().replace(/,/g,''))
    let iva = parseFloat($("#fd"+id).data('triforce')['iva'])
 
    let utilidad = venta-costo
    utilidad = utilidad*100/costo
    $("#fd"+id).find('.int_utl_dim').val(utilidad.formatMoney(2,'.',','))
    $("#fd"+id).find('.int_ventaiva_dim').val((venta*(1+(iva/100))).formatMoney(2,'.',','))
})

$(document).on('change','.int_ventaiva_dim',function(){
    let id = $(this).parent().parent().parent().attr('id').substr(2)
    let ventaiva = parseFloat($(this).val().replace(/,/g,''))
    let costo = parseFloat($("#fd"+id).find('.dim_costo').html().replace(/,/g,''))
    let iva = parseFloat($("#fd"+id).data('triforce')['iva'])
    let venta = ventaiva/(1+(iva/100))

    let utilidad = venta-costo
    utilidad = utilidad*100/costo
    $("#fd"+id).find('.int_utl_dim').val(utilidad.formatMoney(2,'.',','))
    $("#fd"+id).find('.int_venta_dim').val(venta.formatMoney(2,'.',','))
})

$(document).on('change','.int_utl',function(){
    let id = $(this).parent().parent().attr('id')

    let utilidad = parseFloat($(this).val().replace(/,/g,''))
    let costo = parseFloat($("#"+id).find('.int_costo').html().replace(/,/g,''))
    let iva = parseFloat($("#"+id).data('triforce')['iva'])
    
    let venta = costo*(1+(utilidad/100))
    $("#"+id).find('.int_venta').val(venta.formatMoney(2,'.',','))
    $("#"+id).find('.int_ventaiva').val((venta*(1+(iva/100))).formatMoney(2,'.',','))
})

$(document).on('change','.int_venta',function(){
    let id = $(this).parent().parent()
    id = id.hasClass('seg_row') ? id.attr('id') : id.attr('id').substr(2)

    let venta = parseFloat($(this).val().replace(/,/g,''))
    let costo = parseFloat($("#"+id).find('.int_costo').html().replace(/,/g,''))
    let iva = parseFloat($("#"+id).data('triforce')['iva'])
 
    let utilidad = venta-costo
    utilidad = utilidad*100/costo
    $("#"+id).find('.int_utl').val(utilidad.formatMoney(2,'.',','))
    $("#"+id).find('.int_ventaiva').val((venta*(1+(iva/100))).formatMoney(2,'.',','))
})

$(document).on('change','.int_ventaiva',function(){
    let id = $(this).parent().parent()
    id = id.hasClass('seg_row') ? id.attr('id') : id.attr('id').substr(2)

    let ventaiva = parseFloat($(this).val().replace(/,/g,''))
    let costo = parseFloat($("#"+id).find('.int_costo').html().replace(/,/g,''))
    let iva = parseFloat($("#"+id).data('triforce')['iva'])
    let venta = ventaiva/(1+(iva/100))

    let utilidad = venta-costo
    utilidad = utilidad*100/costo
    $("#"+id).find('.int_utl').val(utilidad.formatMoney(2,'.',','))
    $("#"+id).find('.int_venta').val(venta.formatMoney(2,'.',','))
})

$(document).on('change','.int_rel',function(){
    let id = $(this).parent().parent().attr('id')
    cargarNCosto(id)
    if($("[id^=sg"+id.substr(2)+"]").length){
        let segmentados = $("[id^=sg"+id.substr(2)+"]")
        $.each(segmentados,function(){
            if(parseFloat($(this).find('.int_cnt').val()))
                cargarNCosto($(this).attr('id'))
        })
    }
})

$(document).on('change','.int_cnt',function(){
    let totprod = 0;
    $('.int_cnt').each(function(){
        totprod += parseFloat($(this).val().replace(/,/g,''))
    })

    $("#tprods").html(totprod)
})

$(document).on('click','.preponderado',function(){
    let tipo = $(this).attr('tipo')
    if(tipo == '0'){//HABILITAR PREPONDERADO
        $(this).attr('tipo',1)
        $(this).css('color','white')
        $(this).css('background-color','green')
        $(this).css('border','1px solid green')
    }else{
        $(this).attr('tipo',0)
        $(this).css('color','grey')
        $(this).css('background-color','white')
        $(this).css('border','1px solid #e2e2e2')
    }
    cargarNCosto($(this).parent().parent().parent().attr('id')) 
})

$(document).on('click','.apl_costo',function(){
    let tipo = $(this).attr('tipo')
    if(tipo == '0'){//HABILITAR CAMBIO DE COSTO
        $(this).attr('tipo',1)
        $(this).css('color','white')
        $(this).css('background-color','green')
        $(this).css('border','1px solid green')
    }else{
        $(this).attr('tipo',0)
        $(this).css('color','grey')
        $(this).css('background-color','white')
        $(this).css('border','1px solid #e2e2e2')
    }

    cargarNCosto($(this).parent().parent().attr('id')) 
})

$(document).on('keyup','.int_adic',function(e){
    let code = e.which||e.keyCode
    if(code == 13)
        $(this).blur()
})

$(document).on('blur','.int_adic',function(){
    cargarNCosto($(this).parent().parent().attr('id'))
})

export function cargarNCosto(id){
    if($("#"+id).data('triforce') == undefined)
        return false
    let is_seg = $("#"+id).hasClass('seg_row')
    let row_id = id
    if(is_seg)
        row_id = id.substring(0,id.indexOf('_')).replace('sg','fd')

    let rid = $("#"+id).data('triforce')['videntrada']

    let info_costo = getDatos('costo,venta as ventaiva,ganancia*100/if(costo=0,1,costo) as utilidad',11,'id='+rid)[0][0]

    let costo = parseFloat(info_costo[0])
    let costo_compra = parseFloat($("#"+row_id).find('.int_total').html().replace(/,/g,''))
    let preponderado = $("#"+id).find('.preponderado').attr('tipo')
    let uni_compra = parseFloat($("#"+row_id).find('.divcnt').html().replace(/,/g,''))
    let relacion = $("#"+row_id).find('.int_rel').val()
    let uni_real = 0;
    let adicional = parseFloat($("#"+id).find('.int_adic').val())
    let aplicar_costo = $("#"+id).find('.apl_costo').attr('tipo')
    let divicion_segmentos = $("[id^=sg"+row_id.replace('fd','')+"]").length;

    let inventarios = getDatos('idinventario,(select nombre from inventarios where id = detalleinventarios.idinventario) as nombre,truncate(cantidad,2) as cantidad,(select valor from dimensioproductos where idproducto = detalleinventarios.idproducto and codigo = 1)',97,'idproducto = '+rid)
    let cantidad_inv_venta = 0;
    if(inventarios['succed'] == '1'){
        $.each(inventarios[0],function(){
            cantidad_inv_venta = $(this)[0] == '6' ? $(this)[2] : cantidad_inv_venta;
        })
        cantidad_inv_venta = parseFloat(cantidad_inv_venta)
    }else{
        $("#"+id).find('.int_exi').val('0.00')
    }

    if(relacion.toString().includes('*')){
        uni_real = (uni_compra/6).formatMoney(2,'.',',')
        costo_compra = costo_compra*6
        relacion = 1
    }else{
        relacion = parseFloat(relacion)
        uni_compra = uni_compra < 1 && relacion > 1 ? 1 : uni_compra

        divicion_segmentos = divicion_segmentos ? divicion_segmentos+1 : 1
        uni_real = aplicar_costo == '1' ? parseFloat(uni_compra*relacion/divicion_segmentos) : uni_compra
        
        if(relacion > 1 && aplicar_costo == '1'){
            costo_compra = costo_compra/uni_real;    
        }
    }

    if(preponderado == '1'){
        let prep = (cantidad_inv_venta/parseFloat(inventarios[0][0][3]))+uni_real
        costo_compra = ((cantidad_inv_venta/parseFloat(inventarios[0][0][3]))*costo+costo_compra*uni_real)/prep
    }

    $("#"+id).find('.int_cnt').val(uni_real).change()

    if(uni_real <= 0){
        Materialize.toast('Cantidad debe ser Mayor a Cero',4000,'red')
        $("#"+id).find('.int_cnt').focus().select()
        return false
    }

    $("#"+id).find('.int_rel').attr('max',uni_real)
    
    let color = 'green-text';
    $("#"+id).find('.int_costo').removeClass(color);
    $("#"+id).find('.int_costo').removeClass('red-text');
    if(costo < costo_compra){
        color = 'red-text'
        $("#"+id).find('.int_variable').html('<i class="mdi mdi-arrow-up '+color+'"></i>');
    }else if(costo > costo_compra){
        $("#"+id).find('.int_variable').html('<i class="mdi mdi-arrow-down '+color+'"></i>');
    }else
        $("#"+id).find('.int_variable').html('<i class="mdi mdi-equal '+color+'"></i>');

    $("#"+id).find('.int_costo').html(costo_compra.formatMoney(2,'.',','));
    $("#"+id).find('.int_costo').addClass(color);

    let imv = parseFloat($("#"+id).data('triforce')['iva']);
    let cambiar_utilidad = getDatos('cambiarcostocompras',440,'idsucursal=@@impresa')[0][0][0];
    let ventaiva = 0;
    let venta = 0;
    let utilidad = 0;

    if(cambiar_utilidad == '1'){
        ventaiva = parseFloat(info_costo[1])
        venta = ventaiva/(1+(imv/100))
        utilidad = venta-costo_compra //parseFloat(info_costo[2])
        utilidad = (utilidad*100)/costo_compra
    }else{
        utilidad = parseFloat(info_costo[2])
        venta = costo_compra*(1+utilidad/100);
        ventaiva = venta*(1+imv/100)
    }
    
    $("#"+id).find('.int_utl').val(utilidad.formatMoney(2,'.',','));
    $("#"+id).find('.int_venta').val(venta.formatMoney(2,'.',','));
    $("#"+id).find('.int_ventaiva').val(ventaiva.formatMoney(2,'.',','));

    $("#"+id).find('.info_costo').attr('data-tooltip','Costo Anterior: '+costo.formatMoney(2,'.',',')).tooltip({delay: 50,duration:1000});
    //$("#"+id).find('.info_costo').attr('title','Costo Anterior: '+costo.formatMoney(2,'.',','))

    /*OBTENER OTRAS UTILIDADES*/
    let dimensiones = getDatos('valor,idunidad,id',283,'codigo = 1 and idproducto='+rid)

    if($("#"+id+" .dim_row").length > 0){
        //CAMBIAR UTILIDADES POR DIMENSION
        let dim_cant = dim_costo = dim_utl = dim_venta = dim_ventaiva = idu = dim_exi =  0;
        let rcant = aplicar_costo == '1' ? parseFloat($("#"+id).find('.int_cnt').val()) : parseFloat($("#"+id).find('.int_cnt').val())*relacion;
        let imv = parseFloat($("#"+id).data('triforce')['exoneracion'])
        dim_costo = parseFloat($("#"+id).find('.dim_costo').val().replace(/,/g,''))

        if(cambiar_utilidad == '1'){
            dim_ventaiva = parseFloat($("#"+id).find('.int_ventaiva_dim').val().replace(/,/g,''))
            dim_venta = parseFloat($("#"+id).find('.int_venta_dim').val().replace(/,/g,''))
            dim_utl =  ((dim_venta*100)/dim_costo)-100
        }else{
            dim_utl = parseFloat($("#"+id).find('.int_utl_dim').val().replace(/,/g,''))
            dim_venta = dim_costo*(1+dim_utl/100);
            dim_ventaiva = dim_venta*(1+imv/100)
        }

        $("#"+id).find('.int_venta_dim').val(dim_venta)
        $("#"+id).find('.int_utl_dim').val(dim_utl)
        $("#"+id).find('.int_ventaiva').val(dim_ventaiva)

    }else{
        $("#"+id+" .dim_row").remove()

        if(dimensiones[0].length){
            let utilidades;
            let dim_name = '';
            let dim_cant = 0;
            let dim_costo = 0; 
            let dim_utl = 0;
            let dim_venta = 0;
            let dim_ventaiva = 0;
            let idu = 0;
            let dim_exi =  0;
            let rcant = aplicar_costo == '1' ? parseFloat($("#"+id).find('.int_cnt').val()) : parseFloat($("#"+id).find('.int_cnt').val())*relacion;
            let imv = parseFloat($("#"+id).data('triforce')['exoneracion'])

            $.each(dimensiones[0],function(){
                utilidades = getDatos('venta as ventaiva, venta/(1+('+imv+'/100)) as venta,id,ganancia*100/(select if(costo=0,1,costo)/'+$(this)[0]+' from productos where id = nivelproductos.identrada)',105,'idnivel='+$(this)[1]+' and idtipoentrada = 2 and identrada = '+rid);
                dim_name = getDatos('nombre',107,'id='+$(this)[1])[0][0][0]
                dim_cant = rcant*parseFloat($(this)[0])
                dim_costo = costo_compra/parseFloat($(this)[0])
                if(utilidades[0].length){
                    if(cambiar_utilidad == '1'){
                        dim_ventaiva = parseFloat(utilidades[0][0][0])
                        dim_venta = parseFloat(utilidades[0][0][1])
                        dim_utl =  ((dim_venta*100)/dim_costo)-100
                    }else{
                        dim_utl = parseFloat(utilidades[0][0][3])
                        dim_venta = dim_costo*(1+dim_utl/100);
                        dim_ventaiva = dim_venta*(1+imv/100)
                    }
                    idu = utilidades[2]
                    dim_exi = cantidad_inv_venta
                }
                cantidad_inv_venta = cantidad_inv_venta/parseFloat($(this)[0])
                
                $("#"+id).append('<div class="col s12 row dim_row" vid="'+$(this)[2]+'" idu="'+idu+'" unidad="'+$(this)[1]+'"> <div class="col s2"></div> <div class="col s1"></div> <div class="col s1">'+dim_name+'</div> <div class="col s1 dim_rel"><input type="text" class="browser-default numeric eder" style="width:100%; height: auto !important; border: none;" value="'+$(this)[0]+'"> </div> <div class="col s1 dim_exi"> <input type="text" class="browser-default numeric eder" style="width:100%; height: auto !important; border: none;" value="'+dim_exi+'"> </div> <div class="col s1 dim_cant"> <input type="text" class="browser-default numeric eder" style="width:100%; height: auto !important; border: none;" value="'+dim_cant.formatMoney(2,'.',',')+'"> </div>  <div class="col s1 dim_costo" style="text-align:right">'+dim_costo.formatMoney(2,'.',',')+'</div> <div class="col s1"></div> <div class="col s1"><input type="text" class="browser-default int_utl_dim numeric eder" style="width:100%; height: auto !important; border: none;" value="'+dim_utl.formatMoney(2,'.',',')+'"></div> <div class="col s1 dim_venta"><input type="text" class="browser-default int_venta_dim numeric eder" style="width:100%; height: auto !important; border: none;" value="'+dim_venta.formatMoney(2,'.',',')+'"></div> <div class="col s1 dim_ventaiva"><input type="text" class="browser-default int_ventaiva_dim numeric eder" style="width:100%; height: auto !important; border: none;" value="'+dim_ventaiva.formatMoney(2,'.',',')+'"></div> </div>')
                
            })
        }
    }

     $("#"+id).find('.int_exi').val(cantidad_inv_venta.formatMoney(2,'.',','))
}

$(document).on("keydown",".eqprod",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = keysight(e)
   
    if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
        var tipo = getParameterByName('tf');
        var id = $(this).parent().parent().attr('id')
        $(".autocomplete-content").remove();

        $(this).autocomplete({
            limit: 20,
            data: arr('login',4,'',6,'"'+busqueda+'",1,@@impresa',0,0,0,1),
            onAutocomplete: function(val){
               
                var cod = arr('login',4,'',43,'"'+ val.replace(/"/g,"\\\"") +'",@@impresa,'+$("#ffacturas .zelda").data('triforce')['vidcliente']+','+$("#ffacturas .zelda").data('triforce')['vidtipoventa']+','+$("#invgeneral").val(),0,0,0);
                if (cod[0][0] != undefined) {
                     $(this).blur()
                }else{
                    $("#"+id).data('triforce')['videntrada'] = 0;
                    $("#"+id).find('.mdi-plus').removeClass('hide');
                    Materialize.toast('Producto no Existente',4000,'red');
                }
            }
        })

        $(".autocomplete-content").css('min-width','700px').css('margin-top','5%');
    }
});

$(document).on("keyup",".eqprod",function(e){
    var code = e.which || e.keyCode;
    if(code == 13){
        $(this).blur();
    }
})

$(document).on("blur",".eqprod",function(e){
    let id = $(this).parent().parent().attr('id')
    let cod = arr('login',4,'',43,'"'+ $(this).val().replace(/"/g,"\\\"") +'",@@impresa,'+$("#ffacturas .zelda").data('triforce')['vidcliente']+','+$("#ffacturas .zelda").data('triforce')['vidtipoventa']+','+$("#invgeneral").val(),0,0,0);
    
    if (cod[0][0] != undefined) {
        cod = cod[0][0]
        $("#"+id).data('triforce')['videntrada'] = cod[0];
        $("#"+id).find('.mdi-plus').addClass('hide');
        $("#"+id).find('.cargarReferencias').removeClass('hide');
        $("#"+id).find('.cargarReferencias').attr('vid',cod[0]);
        $("#"+id).find('.editProducto').removeClass('hide');
        $("#"+id).find('.editProducto').attr('vid',cod[0])
        $("#"+id).find('.vgan').focus().select()
        cargarNCosto(id)
    }else{  
        $("#"+id).data('triforce')['videntrada'] = 0;
        $("#"+id).find('.mdi-plus').removeClass('hide');
        $("#"+id).find('.editProducto').addClass('hide');
        Materialize.toast('Producto no Existente',4000,'red')
        $("#"+id).find('.cargarReferencias').addClass('hide');
        $("#"+id).find('.cargarReferencias').attr('vid',0);
    }
});