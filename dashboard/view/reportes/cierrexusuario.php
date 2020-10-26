<?php $config = $kakaroto->kamehameha('',42,'@@impresa')[0];
  $lista = '';

  $det = $kakaroto->kamehameha('',339,$cierre[0]);
  $gravado = '';
  $exento = '';
  $descuento = $cierre[25] > 0 ? 'Descuentos:<span style="float: right;">'.$cierre[25].' </span><br>' : '';
  foreach ($det as $dobj) {
    if($dobj[0] == 0)
      $exento .= 'Excento:<span style="float: right;">'.number_format($dobj[1],2).' </span><br>';
    else{
      $gravado .= 'Gravado al '.$dobj[0].'%:<span style="float: right;">'.number_format($dobj[1],2).' </span><br>';
      $gravado .= 'IVA al '.$dobj[0].'%:<span style="float: right;">'.number_format($dobj[2],2).' </span><br>';
    }
  }
  switch($config[13]){ 
    case 1:
      $lista = '<table style="border: 0px; font-size: 1em; width: 100%" id="detalle">
        <thead>
          <tr>
            <th colspan="3" align="center">Facturas</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th >Consecutivo</th>
            <th >T.Pago</th>
            <th >Total</th>
          </tr>
        </thead>
        <tbody>';
        foreach ($cierreg as $obj) {
          $lista .= ' <tr class="tr" >
            <td ><span id="con" >'.$obj[11].'</span></td>
            <td ><span id="pag" >'.$obj[15].'</span></td>
            <td align="right"><span  >'.number_format($obj[16],2).'</span></td>
          </tr>';
        }
        $lista .= '</tbody>
      </table>
      <br>
      
      <table style="border: 0px; font-size: 1em;width: 100%;">
        <thead>
          <tr>
            <th colspan="3" align="center">Notas y abonos</th>
          </tr>
        </thead>
        <thead class=" blue-grey white-text imprimirSINBOR margen">
          <tr>
            <th >Factura</th>
            <th >Nota/Abono</th>
            <th align="right">Valor</th>
          </tr>
        </thead>
        <tbody >Notas y Abonos';

        foreach ($estados as $obj) {
          $lista .= '<tr class="tr" >
            <td ><span id="con">'.$obj[0].'</span></td>
            <td ><span id="fec">'.$obj[1].'</span></td>
            <td ><span id="pag">'.number_format($obj[4],2).'></span></td>
          </tr>';
        }
        break;
      case 2:
        $lista = ' <table style="border: 0px; font-size: 1em; width: 100%" id="detalle">
        <thead>
          <tr>
            <th colspan="2" align="center">Productos</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th >Producto</th>
            <th >Total</th>
          </tr>
        </thead>
        <tbody >';
        foreach ($cierreg as $obj) {
          $lista .= '<tr class="tr" >
            <td align="left">'.$obj[24].'</td>
            <td ><span>'.$obj[11].'</span></td>
            <td align="right"><span>'.number_format($obj[16],2).'</span></td>
          </tr>';
        }
        $lista .= '</tbody>
        </table>
        <br>';
        break;
      case 3:
        $lista = '<br>
        <table style="border: 0px; font-size: 1em; width: 100%" id="detalle">
        <!-- <thead>
          <tr>
            <th colspan="3" align="center">Familias</th>
          </tr>
        </thead> -->
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Familia</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody >';

        if($config[13] == 3)
          foreach ($cierreg as $obj) {

            $lista .= '<tr class="tr" >
              <td align="left">'.$obj[37].'</td>
              <td ><span>'.$obj[36].'</span></td>
              <td align="right"><span>'.number_format($obj[38],2).'</span></td>
            </tr>';
          }

        $lista .= '</tbody>
      </table>';
        break; 
      default:
        break;
  }

?>
<!DOCTYPE html>
<html>
<head>
<title>Cierres</title>
<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link href="../assets/css/materialize.min.css?v=10.2.0.98">
<style>
  @media print {
    .print{
      display: none;
    }

      @page {
    margin: 0;
  }

  body{
    margin-left: 0% !important;
    margin-right: 0% !important;

    font-weight: normal !important; 

  } 
  }


</style>
</head>
<body style="margin-left: 35%;margin-right: 35%" >

  <button class="print" style="cursor: pointer;left:100px;position:fixed;padding: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
    background-color: #1883ba;
    border-radius: 6px;
    border: 2px solid #0016b0">Imprimir</button>

  <div>
      <b>Cierre N°: </b>
      <span > <?php echo $cierre[0]; ?> </span><br>
      <b>Usuario: </b>
      <span > <?php echo $cierre[11]; ?> </span><br>
      <b>Fecha y Hora: </b>
      <span > <?php echo $cierre[1]; ?> </span>
    
    <div>
      <br>
      <?php if($cierre[7] > 0) echo 'Ventas en Efectivo: <span style="float: right;">'.$cierre[7].'</span><br>'; ?>
      <?php if($cierre[8] > 0) echo 'Ventas con Tárjetas: <span style="float: right;">'.$cierre[8].'</span><br>'; ?>
      <?php if($cierre[9] > 0) echo 'Ventas con Depósitos: <span style="float: right;">'.$cierre[9].'</span><br>'; ?>
      <?php if($cierre[3] > 0) echo 'Total Ventas a Contado: <span style="float: right;">'.$cierre[3].'</span><br>'; ?>
      <?php if($cierre[2] > 0) echo 'Total Ventas a Crédito: <span style="float: right;">'.$cierre[2].'</span><br>'; ?>
      <!-- <?php echo $gravado.$exento.$descuento; ?>
      Ventas Totales: <span style="float: right;"><?php echo $cierre[15]; ?></span><br> -->
      <?php if($cierre[4] > 0) echo 'Abonos Clientes: <span style="float: right;">'.$cierre[4].'</span><br>'; ?>
      <?php if($cierre[5] > 0) echo 'Notas Crédito Clientes: <span style="float: right;">'.$cierre[5].'</span><br>'; ?>
      <?php if($cierre[6] > 0) echo 'Notas Débito Clientes: <span style="float: right;">'.$cierre[6].'</span><br>'; ?>
      <?php if($cierre[21] > 0) echo 'Abonos Proveedores: <span style="float: right;">'.$cierre[21].'</span><br>'; ?>  
      <?php if($cierre[19] > 0) echo 'Entradas de Efectivo: <span style="float: right;">'.$cierre[19].'</span><br>'; ?>
      <?php if($cierre[20] > 0) echo 'Salidas de Efectivo: <span style="float: right;">'.$cierre[20].'</span><br>'; ?>
      <?php if($cierre[22] > 0) echo 'Abonos Líquidos Cliente:<span style="float: right;">'.$cierre[22].'</span><br>'; ?>
      <?php if($cierre[23] > 0) echo 'Abonos Líquidos Proveedores: <span style="float: right;">'.$cierre[23].'</span><br>'; ?>
      Caja Inicial:<span style="float: right;"><?php echo $cierre[14]; ?></span><br>
      Caja Reportada: <span style="float: right;"><?php echo $cierre[12]; ?></span><br>
      Caja del Sistema: <span style="float: right;"><?php echo number_format(str_replace(',', '', $cierre[7])+str_replace(',', '', $cierre[22])-str_replace(',', '', $cierre[5])+str_replace(',', '', $cierre[6])+str_replace(',', '', $cierre[19])-str_replace(',', '', $cierre[20])+str_replace(',', '', $cierre[14]),2); ?></span><br>
      Diferencia: <span style="float: right;"><?php echo number_format(str_replace(',', '', $cierre[12])-str_replace(',', '', $cierre[7])+str_replace(',', '', $cierre[22])-str_replace(',', '', $cierre[5])+str_replace(',', '', $cierre[6])+str_replace(',', '', $cierre[19])-str_replace(',', '', $cierre[20])-str_replace(',', '', $cierre[14]),2); ?></span><br>
    </div>
     
      <!-- /INFO CONTACTO -->
      <!-- DETALLE FACT -->
      <?php echo $lista; ?>
      <br>
      <!-- INFO FACT -->
      <div class="row">
        <div class="col s8 offset-s2">
          <br><br>
          <section id="sqre">
            <table id="infotot" width="100%">
              <tfoot>
              <th class="center-align">Firma Representante</th>
              <th class="infospace"></th>
              </tfoot>
              <tbody>
                <tr class="ttdr">
                  <td class="center-align"><hr size="10" style="  background-color: black;  height: 1px; width: 80%;" /></td>
                  <td ></td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <!-- /INFO FACT -->
      <!-- FOOTER -->
      <!-- /FOOTER -->
    </div>
    <script src="../assets/js/jquery.js?v=10.2.0.98"></script>
    <script src="../assets/js/materialize.min.js?v=10.2.0.98"></script>

     <script type="text/javascript">
   $(function(){
      window.onafterprint = function(){
        //$("#resolucion").html(navigator.userAgent)
        if( navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         )
            return true;
        else
          window.close();
      }

      $(".print").click(function(){
        window.print();
      });
   })
 </script>
  </body>
</html>