
<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
       <tr>
        <td class="white-text blue sinborde " style="text-align: center"><b>Artículo</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Existencia</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Unidad</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Costo</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Factor</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>UTIL1</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>VENTA</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>UTIL2</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>VENTA</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Notas</b></td>
      </tr>
    </thead>
    <tbody>
    <?php 
        $cant = $costo = $venta = $ventaiva = 0;

        foreach ($transaccion as $obj) {
            $cant += $obj[6] > 0 ? $obj[6] : 0;
            $costo += $obj[6] > 0 ? $obj[6]*$obj[12] : 0;
    ?>

    <tr id="<?php echo $obj[13]; ?>" metrica="<?php echo $obj[14]; ?>">
        <td style=" padding: 1px;text-align: left;"><?php echo $obj[2] ?></td>
        <td style=" padding: 1px;text-align: right;"><input type="number" class="eder browser-default focus" style="border: 0px" value="<?php echo number_format($obj[6],2,'.','') ?>" rval="<?php echo $obj[6] ?>"></td> 
        <td style=" padding: 1px;">
            <select class="browser-default um" style="border: 0px;">
                <?php if($obj[20]){
                    echo '<option value="'.$obj[19].'" selected cnt="'.$obj[21].'">'.$obj[22].'</option>
                          <option value="-1" cnt="1">'.$obj[23].'</option>';
                }else{
                    echo '<option value="'.$obj[19].'" selected cnt="'.$obj[21].'">'.$obj[22].'</option>';
                } ?> 
                 
            </select>
        </td> 
        <td style=" padding: 1px;text-align: right;"><input type="number" class="eder browser-default focus1" style="border: 0px" value="<?php echo number_format($obj[12],2,'.','') ?>"/></td>
        <td style=" padding: 1px;text-align: right;"><input type="number" class="eder browser-default focus2" style="border: 0px" value="<?php echo number_format($obj[14],2,'.','') ?>"/></td>
        <td style=" padding: 1px;text-align: right;"><input type="number" class="eder browser-default focus3" style="border: 0px" value="<?php echo number_format($obj[16],2,'.','') ?>"/></td>
        <td style=" padding: 1px;text-align: right;"><?php echo number_format($obj[24],2,'.',',') ?></td>
        <td style=" padding: 1px;text-align: right;"><input type="number" class="eder browser-default focus4" style="border: 0px" value="<?php echo number_format($obj[17],2,'.','') ?>"/></td>
        <td style=" padding: 1px;text-align: right;"><?php echo number_format($obj[15],2,'.',',') ?></td>
        <td style=" padding: 1px;text-align: right;"> <!-- <input type="text" class="eder browser-default focus5" style="border: 0px" value="<?php echo $obj[18]; ?>"/> --> <span class="notasprod" name="<?php echo $obj[2] ?>" tbl="11" row="<?php echo $obj[13]; ?>" style="cursor: pointer;"><?php echo $obj[18] ? $obj[18] : '---'; ?></span> </td>
       
    </tr>

    <?php }
     ?>
     <tr>
         <td colspan="1">
             <b>Totales:</b>
         </td>
         <td style="text-align: right;">
             <?php echo number_format($cant,2); ?>
         </td>
         <td colspan="2" style="text-align: right;">
             <?php echo number_format($costo,2); ?>
         </td>
     </tr>
</tbody>
</table>

<script type="text/javascript">

    $(function(){
        if($("#tuser").val() != '1'){
            $(".detrep input").attr('readonly',true);
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
                insertar(298,'','null,2,'+resta+',now(),'+tr.attr('id')+',"",@@impresa,@@usr,'+ml);
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
            //actualizar(11,'costo = '+ml,'id = '+tr.attr('id'));
            console.log(getDatos('',335,tr.attr('id')+','+ml));
            console.log(tr.attr('id')+','+ml)
            $(this).next('.focus1').focus().select();
            Materialize.toast('Costo Cambiado Correctamente',4000,'green');
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
</script>