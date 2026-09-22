<?php 

    $lista = '<option value="1">Compra</option> <option value="2">Gasto</option> <option value="3">Gasto No Diferido</option> <option value="4">Bien de Capital</option> <option value="5">Proporcionalidad</option>';
    $color = $titulo = $hide = $lfact = $lnc = '';
    
    foreach ($transaccion as $obj) {
        
        switch ($obj[5]) {
            case 1:
            case 2:
                $color = 'yellow';
                break;
            case 3:
                 $color = 'green';
                break;
            default:
                $color = 'red';
                //$hide = 'hide';
                break;
        }

        if($obj[11] != '03' )
            $lfact .= "<tr id='cp".$obj[4]."' tot='".$obj[3]."' imv='".$obj[7]."' gs='".$obj[6]."' idcliente='".$obj[15]."' cxp='".$obj[9]."' class='_compras'> <td title='Dias Plazo (0 Contado)' class='hide _cxp' style='width: 2%;'><input type='text' value='".$obj[9]."' class='cxp eder' style='max-width: 20px;'></td> <td title='".$obj[0]."'>".substr($obj[0],0,20)."</td> <td>".$obj[1]."</td>  <td clave='".$obj[10]."' class='clip' style='cursor:pointer;'>".$obj[2]."</td> <td class='eder'>".$obj[8].number_format($obj[3],2)."</td> <td><select class='browser-default tcompra'>".$lista."</select></td> <td class='eder'>".$obj[8]."<span class='gs'>".number_format($obj[6],2)." </span></td> <td class='eder'>".$obj[8]."<span class='imv'>".number_format($obj[7],2)." </span></td> <td style='width: 15%'> <a class='mdi mdi-file-pdf pbtn btn btn-floating opdf' title='Descargar PDF Original' clave='".$obj[10]."'></a> <a class='mdi mdi-eye shcompra btn btn-floating ".$color."' style='cursor:pointer;' title='Ver Comprobante'></a> <a href='#' title='Aceptar' class='btn-floating msjh center ".$hide."' tipo='5'>A</a> <a href='#' title='Aceptar Parcial' class='btn-floating msjh center ".$hide."' tipo='6'>AP</a> <a href='#' title='Rechazar' class='btn-floating msjh center' tipo='7'>R</a> <i class='mdi mdi-settings hide' style='cursor:pointer;' title='Opciones Avanzadas'></i> <i style='cursor:pointer'></i> </td> </tr>";
        else
            $lnc .= "<tr id='cp".$obj[4]."' tot='".$obj[3]."' imv='".$obj[7]."' gs='".$obj[6]."' idcliente='".$obj[15]."' cxp='".$obj[9]."' class='_notas'> <td colspan='2' class='input-field'><a class='prefix btn searchFacts mdi mdi-magnify' idcliente='".$obj[15]."' inref='".$obj[4]."'></a> <input type='text' value='".$obj[12]."' class='cxp eder inref findfact' readonly referencia='".$obj[13]."' >  </td> <td title='".$obj[0]."' colspan='2'>".substr($obj[0],0,20)."</td> <td>".$obj[1]."</td>  <td clave='".$obj[10]."' class='clip' style='cursor:pointer;'>".$obj[2]."</td> <td class='eder'>".$obj[8].number_format($obj[3],2)."</td> <td class='eder'>".$obj[8]."<span class='imv'>".number_format($obj[7],2)." </span></td>> <td style='width: 15%'> <a class='mdi mdi-eye shcompra btn btn-floating ".$color."' style='cursor:pointer;' title='Ver Comprobante'></a> <a href='#' title='Aceptar' class='btn-floating msjh center ".$hide."' tipo='5'>A</a> <a href='#' title='Aceptar Parcial' class='btn-floating msjh center ".$hide."' tipo='6'>AP</a> <a href='#' title='Rechazar' class='btn-floating msjh center' tipo='7'>R</a> <i class='mdi mdi-settings hide' style='cursor:pointer;' title='Opciones Avanzadas'></i> <i style='cursor:pointer'></i> </td> </tr>";

    }

 ?>

    <thead>
        <tr>
            <th title="Generar Cuenta por Pagar" class="hide _cxp">CxP</th>
            <th>Proveedor</th>
            <th>Fecha</th>
            <th>Consecutivo</th>
            <th>Total</th>
            <th>Tipo</th>
            <th>Gasto</th>
            <th>IVA</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody> <?php echo $lfact ?> </tbody>

     <thead>
        <tr>
            <th colspan="2">Factura</th>
            <th colspan="2">Proveedor</th>
            <th>Fecha</th>
            <th>Consecutivo</th>
            <th>Total</th>
            <th>IVA</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody> <?php echo $lnc ?> </tbody>

 <script type="text/javascript">
    $(function(){
        if(!$("#dropfact_1 .per2000.hide").length)
            $("._cxp").removeClass('hide')
    })

    $(document).on('click','.selcompra',function(){
        let ref = getDatos('referencia',64,'id='+$(this).attr('vid'))[0][0][0]
        let e = $("a[inref="+$("#modal-lookup").attr('inref')+']').parent().find('.inref')
        console.log(e)
        e.val($(this).parent().parent().find('td:first').html())
        e.attr('referencia',ref)
        $("#modal-lookup").modal('close')
    })

    $(document).on('click','.searchFacts',function(){
        
        let cliente = $(this).attr('idcliente') == undefined ? 0 : $(this).attr('idcliente');
        let compras = getDatos('',397,cliente+',""')[0]
        let lista = ''

        $.each(compras,function(i){
            lista += '<tr> <td>'+compras[i][1]+'</td> <td> <a class="btn selcompra" vid="'+compras[i][0]+'"><i class="mdi mdi-check"></i> </a> </td> </tr>'
        })

        $("#lista_compras").html(lista)
        $("#modal-lookup").attr('inref',$(this).attr('inref'))
        $("#modal-lookup").modal('open')
        $("#modal-lookup").css('z-index','3000')
    })

    $(document).on('keydown','.findfact_',function(e){
        var charCode    = e.which || e.keyCode;
        var charStr     = String.fromCharCode(charCode);
        var idcliente   = $(this).attr('idcliente') == undefined ? 0 : $(this).attr('idcliente');
        var element_g   = $(this).attr('guardar') == undefined ? $(this) : $("#"+$(this).attr('guardar'));
        let elem = $(this)
        let busqueda = elem.attr('referencia') == '' ? elem.val()+charStr : charStr  
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            element_g.attr('vid',0)
            element_g.attr('referencia','')
            $(".autocomplete-content").remove();
            
            elem.autocomplete({
                limit: 20,
                data:getNAutocomplete('',397,idcliente+',"'+$(this).val()+'"'),
                onAutocomplete: function(e){
                    element_g.attr('vid',$(this).attr('vid'))
                    let ref = getDatos('referencia',64,'id='+$(this).attr('vid'))[0][0][0]
                    element_g.val(ref.substr(31,10))
                    element_g.attr('referencia',ref)
                }
            });
            $(".autocomplete-content").css('position', 'absolute')
        }
    });
 </script>