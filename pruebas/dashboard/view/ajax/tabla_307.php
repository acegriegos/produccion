<?php

switch ($transaccion[0][19]) {
    case 1:
    /*Ganancias detalladas por facturas desglosada por productos  
    */
    echo ' <thead>
    <tr>
    <td class="white-text blue sinborde " style="text-align: center"><b>Factura</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Fecha</b></td>
    <td class="white-text blue sinborde " style="text-align: center;width: 20%;"><b>Cliente</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Codigo de Producto</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Producto</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Cantidad</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Ganancia</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Descuento</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Total</b></td>


    </tr>
    </thead>
    <tbody >';
    $gan=$des=$tot=0;
    foreach ($transaccion as $obj) {
       $gan+=str_replace(',', '',$obj[0]);
       $des+=str_replace(',', '',$obj[18]);
       $tot+=str_replace(',', '',$obj[3]);
       echo '          
       <tr>
       <td style=" padding: 2px; text-align: center">'.$obj[2].'</td>
       <td style=" padding: 2px; text-align: center">'.$obj[6].'</td>
       <td style=" padding: 2px; text-align: center; width=20% !important">'.$obj[15].'</td>
       <td style=" padding: 2px; text-align: center">'.$obj[8].'</td>
       <td style=" padding: 2px; text-align: center">'.$obj[9].'</td>
       <td style=" padding: 2px; text-align: center">'.$obj[10].'</td>
      <td style="text-align: right">'.$obj[16].number_format($obj[0],2).'</td>
       <td style="text-align: right">'.$obj[16].number_format($obj[18],2). ' ( '.number_format($obj[17],0).'% )</td>
       <td style="text-align: right">'.$obj[16].number_format($obj[3],2).'</td>

       </tr>';
   } echo '<tr>
   <td colspan="6"  style=" padding: 2px; text-align: right">  <b> TOTAL </b>
   </td>
   <td   style=" padding: 2px; text-align: right"> <b>'.$obj[16].number_format($gan,2).'</b>
   </td>

   <td   style=" padding: 2px; text-align: right"> <b>'.$obj[16].number_format($des,2).'</b>
   </td>

   <td  style=" padding: 2px; text-align: right" > <b>'.$obj[16].number_format($tot,2).'</b>
   </td>
   ';
   break;

   case 2:
    /* Ganancias detalladas por productos */
    echo ' <thead>
    <tr>    
    <td class="white-text blue sinborde " style="text-align: center"><b>Nombre de Producto</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Marca</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Codigo de Producto</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Productos Vendidos</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Cantidad de Ventas</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Ganancia</b></td>
    <td class="white-text blue sinborde " style="text-align: center"><b>Total</b></td>


    </tr>
    </thead>
    <tbody >';
    $gan=$des=$tot=0;
    foreach ($transaccion as $obj) {
       $gan+=str_replace(',', '',$obj[0]);
       $des+=str_replace(',', '',$obj[18]);
       $tot+=str_replace(',', '',$obj[3]);     echo '          
       <tr>
       <td style="text-align: center">'.$obj[9].'</td>
       <td style="text-align: center">'.$obj[12].'</td>
       <td style="text-align: center">'.$obj[8].'</td>
       <td style="text-align: center">'.$obj[10].'</td>
       <td style="text-align: center">'.$obj[11].'</td>
        <td style="text-align: right">'.$obj[16].number_format($obj[0],2).'</td>
       <td style="text-align: right">'.$obj[16].number_format($obj[3],2).'</td>

       </tr>';
   }
   echo '<tr>
   <td colspan="5"  style=" padding: 2px; text-align: right">  <b> TOTAL </b>
   </td>
   

   <td   style=" padding: 2px; text-align: right"> <b>'.$obj[16].number_format($gan,2).'</b>
   </td>

   <td  style=" padding: 2px; text-align: right" > <b>'.$obj[16].number_format($tot,2).'</b>
   </td>
   ';
   break;

   case 3:
   /*Ganancias  por factura*/
   echo ' <thead>
   <tr>
   <td class="white-text blue sinborde " style="text-align: center"><b>Factura</b></td>
   <td class="white-text blue sinborde " style="text-align: center"><b>Fecha</b></td>
   <td class="white-text blue sinborde " style="text-align: center;width: 20%;"><b>Cliente</b></td>
   <td class="white-text blue sinborde " style="text-align: center"><b>Ganancia</b></td>
   <td class="white-text blue sinborde " style="text-align: center"><b>Descuento</b></td>
   <td class="white-text blue sinborde " style="text-align: center"><b>Total</b></td>
   </tr>
   </thead>
   <tbody >';
   $gan=$des=$tot=0;
   foreach ($transaccion as $obj) {
       $gan+=str_replace(',', '',$obj[0]);
       $des+=str_replace(',', '',$obj[18]);
       $tot+=str_replace(',', '',$obj[3]);
       echo '          
       <tr>
       <td style="text-align: center">'.$obj[2].'</td>
       <td style="text-align: center">'.$obj[6].'</td>
       <td style=" padding: 2px; text-align: center; width=20% !important">'.$obj[15].'</td>
       <td style="text-align: right">'.$obj[16].number_format($obj[0],2).'</td>
       <td style="text-align: right">'.$obj[16].number_format($obj[18],2). ' ( '.number_format($obj[17],0).'% )</td>
       <td style="text-align: right">'.$obj[16].number_format($obj[3],2).'</td>

       </tr>';
   }
   echo '<tr>
   <td colspan="3"  style=" padding: 2px; text-align: right">  <b> TOTAL </b>
   </td>
   <td   style=" padding: 2px; text-align: right"> <b>'.$obj[16].number_format($gan,2).'</b>
   </td>

   <td   style=" padding: 2px; text-align: right"> <b>'.$obj[16].number_format($des,2).'</b>
   </td>

   <td  style=" padding: 2px; text-align: right" > <b>'.$obj[16].number_format($tot,2).'</b>
   </td>
   ';
   break;

case 4:
   /*Ganancias  por Tipo-familia-marca*/
   echo ' <thead>
   <tr>
   <td class="white-text blue sinborde " style="text-align: center"><b>Factura</b></td>
   <td class="white-text blue sinborde " style="text-align: center"><b>Fecha</b></td>
   <td class="white-text blue sinborde " style="text-align: center"><b>Ganancia</b></td>
   <td class="white-text blue sinborde " style="text-align: center"><b>Descuento</b></td>
   <td class="white-text blue sinborde " style="text-align: center"><b>Total</b></td>
   </tr>
   </thead>
   <tbody >';
   $gan=$des=$tot=0;
   foreach ($transaccion as $obj) {
       $gan+=str_replace(',', '',$obj[0]);
       $des+=str_replace(',', '',$obj[18]);
       $tot+=str_replace(',', '',$obj[3]);
       echo '          
       <tr>
       <td style="text-align: center">'.$obj[2].'</td>
       <td style="text-align: center">'.$obj[6].'</td>
       <td style="text-align: right">'.$obj[16].number_format($obj[0],2).'</td>
       <td style="text-align: right">'.$obj[16].number_format($obj[18],2). ' ( '.number_format($obj[17],0).'% )</td>
       <td style="text-align: right">'.$obj[16].number_format($obj[3],2).'</td>

       </tr>';
   }
   echo '<tr>
   <td colspan="2"  style=" padding: 2px; text-align: right">  <b> TOTAL </b>
   </td>
   <td   style=" padding: 2px; text-align: right"> <b>'.$obj[16].number_format($gan,2).'</b>
   </td>

   <td   style=" padding: 2px; text-align: right"> <b>'.$obj[16].number_format($des,2).'</b>
   </td>

   <td  style=" padding: 2px; text-align: right" > <b>'.$obj[16].number_format($tot,2).'</b>
   </td>
   ';
   break;
   default:
         # code...
   break;


} ?>

</tbody>
<script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
</script>

