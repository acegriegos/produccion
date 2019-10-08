
<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
       <tr>
        <td class="white-text blue sinborde " style="text-align: center"><b>Artículo</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Existencia</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Unidad</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Costo</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Factor</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>UTIL1</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>UTIL2</b></td>
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
        <td style=" padding: 1px;"><select class="browser-default um" style="border: 0px;"> <option value="1" selected>UN</option> <option value="2">M</option> </select></td> 
        <td style=" padding: 1px;text-align: right;"><?php echo number_format($obj[12],2) ?></td>
         <td style=" padding: 1px;text-align: right;"><?php echo number_format($obj[14],0) ?></td>
          <td style=" padding: 1px;text-align: right;"><?php echo number_format($obj[16],0) ?></td>
           <td style=" padding: 1px;text-align: right;"><?php echo number_format($obj[17],0) ?></td>
       
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
    $(".focus").click(function(){
        $(this).select()
    });

    $(".focus").keyup(function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            var tr = $(this).parent().parent();
            var ml = tr.find('.um').val() == 1 ? parseFloat($(this).val())*parseFloat(tr.attr('metrica')) : $(this).val();
            console.log('cantidad = '+ml,'idproducto = '+tr.attr('id'));
            actualizar(97,'cantidad = '+ml,'idproducto = '+tr.attr('id'));
            $(this).next('.focus').focus().select();
        }
    });

    $(".um").change(function(){
        var tr = $(this).parent().parent();
        var mobj = tr.find('.focus');
        var ln = tr.attr('metrica');
        var nval = $('option:selected',this).val() == 2 ? parseFloat(mobj.attr('rval'))*parseFloat(ln) : parseFloat(mobj.val())/parseFloat(ln);
        mobj.val(parseFloat(nval).formatMoney(2,'.',''))
        mobj.fous().select();
    });
</script>