$(function(){
        var allow = getDatos('tipo',248,'idusuario=@@usr and idpermiso = (select id from permisos where codigo = 9999)')[0][0][0];
        if(allow != '1'){
            $(".detrep input").attr('readonly',true);
            $(".focus6").attr('readonly',false)
            $(".notasprod").attr('no-pass',1)
        }
    });

    $(".focus").click(function(){
        $(this).select()
    });

    $(".focus").keyup(function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            var tr = $(this).parent().parent();
            var ml = tr.find('.um').val() != -1 ? parseFloat($(this).val())*parseFloat(tr.attr('metrica'))*parseFloat(tr.find('.um option:selected').attr('cnt')) : $(this).val();
            
            var cactual = getDatos('cantidad',97,'idproducto = '+tr.attr('id'),0,0,0)[0][0][0]
            actualizar(97,'cantidad = '+ml,'idproducto = '+tr.attr('id'));
            var resta = parseFloat(ml) - parseFloat(cactual);
            if(resta){
                insertar(298,'','null,2,'+resta+',now(),'+tr.attr('id')+',"",@@impresa,@@usr,'+ml+',0,0,""');
            }
            $(this).next('.focus').focus().select();
            var nml = tr.find('.um').val() == 1 ? $(this).val() : parseFloat($(this).val())/parseFloat(tr.attr('metrica'));
            $(this).attr('rval',nml)
            Materialize.toast('Cantidad Cambiada Correctamente',4000,'green');
        }
    });

     $(".focus1").keyup(function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            var tr = $(this).parent().parent();
            var ml = $(this).val();
            var datosprod = getDatos('',335,tr.attr('id')+','+ml);
            console.log(datosprod)
            $(this).next('.focus1').focus().select();
            Materialize.toast('Costo Cambiado Correctamente',4000,'green');
            $(this).parent().parent().find('.venta').html(datosprod[0][0][0]);
            $(this).parent().parent().find('.seg').html(datosprod[0][0][1]);
        }
    });

     $(".focus2").keyup(function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            var tr = $(this).parent().parent();
            var costo = parseFloat(tr.find('.focus1').val());
            var ln = parseFloat(tr.find('.focus2').val()) 
            var ml = $(this).val();
            var mid = getDatos('id',283,'codigo = 1 and idproducto = '+tr.attr('id'),0,0,0)
            if(mid[0].length){
                actualizar(283,'valor = '+ml,'codigo = 1 and idproducto = '+tr.attr('id'));
                ml = ((costo/ln)*parseFloat(tr.find('.focus4').val())/100)
                actualizar(105,'ganancia = '+ml+', venta = '+(costo/ln+ml)*1.13,'idtipoentrada =2 and identrada = '+tr.attr('id'));
            }
            else
                insertar(283,'','null,'+tr.attr('id')+',8,"",1,'+ml);
            tr.find('.focus').attr('metrica',ml);
            $(this).next('.focus2').focus().select();
            Materialize.toast('Factor Longitud Cambiado Correctamente',4000,'green');
        }
    });

    $(".focus3").keyup(function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            var tr = $(this).parent().parent();
            var costo = parseFloat(tr.find('.focus1').val()); 
            var ml = (costo*(parseFloat($(this).val())/100));
            actualizar(11,'ganancia = '+ml+', venta='+(costo+ml)*1.13,'id = '+tr.attr('id'));
            $(this).next('.focus3').focus().select();
            Materialize.toast('Utilidad Unitaria Cambiada Correctamente',4000,'green');
        }
    });

    $(".focus4").keyup(function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            var tr = $(this).parent().parent();
            var costo = parseFloat(tr.find('.focus1').val());
            var ln = parseFloat(tr.find('.focus2').val()) 
            var ml = ((costo/ln)*(parseInt($(this).val())/100));
            var mid = getDatos('id',105,'idtipoentrada =2 and identrada = '+tr.attr('id'),0,0,0)

            if(mid[0].length)
                actualizar(105,'ganancia = '+ml+', venta = '+(costo/ln+ml)*1.13,'idtipoentrada =2 and identrada = '+tr.attr('id'));
            else
                insertar(105,'','null,2,'+tr.attr('id')+',8,'+ml+',13,'+(costo/ln+ml)*1.13);
            $(this).next('.focus4').focus().select();
            Materialize.toast('Utilidad en Metros Cambiada Correctamente',4000,'green');
        }
    });

    $(".focus5").keyup(function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            var tr = $(this).parent().parent();
            var ml = $(this).val();
            console.log(actualizar(11,'codigointerno = "'+ml+'"','id = '+tr.attr('id')));
            $(this).next('.focus5').focus().select();
            Materialize.toast('Nota Cambiada Correctamente',4000,'green');
        }
    });

    $(".focus6").keyup(function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            var tr = $(this).parent().parent();
            var ml = $(this).val();
            if(ml.length != 13){
                Materialize.toast('Código CABYS Inválido',4000,'red');    
                return false
            }
            var ce = getDatos('vid',337,'codigo="'+ml+'" and numero = 8');
            if(ce[0][0] == undefined){
                Materialize.toast('Código CABYS Inválido',4000,'red');    
                return false   
            }

            actualizar(299,'cabys = "'+ml+'"','idproducto = '+tr.attr('id'));
            $(this).next('.focus').focus().select();
            Materialize.toast('Código CABYS Cambiado Correctamente',4000,'green');
        }
    });

    $(".focus7").keyup(function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            var tr = $(this).parent().parent();
            var ml = $(this).val();
            actualizar(11,'nombre="'+ml+'"','id='+tr.attr('id'));
            Materialize.toast('Nombre Cambiado Correctamente',4000,'green');
        }
    });

    $(".um").change(function(){
        var tr = $(this).parent().parent();
        var mobj = tr.find('.focus');
        var ln = tr.attr('metrica');
        var nval = $('option:selected',this).val() == 2 ? parseFloat(mobj.attr('rval'))*parseFloat(ln) : parseFloat(mobj.val())/parseFloat(ln);
        mobj.val(parseFloat(nval).formatMoney(2,'.',''))
        mobj.focus().select();
    });

    $(function(){
        $(".principal").css('margin-left','0px').css('margin-right','0px');
    });

    function actualizarDatos(idproducto){
        var prod = getDatos('costo+ganancia,venta',11,'id='+idproducto);
    }