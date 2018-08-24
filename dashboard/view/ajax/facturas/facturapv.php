<!DOCTYPE html>
<html>
<head>
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
  <title>Factura</title>  
<style>
  *{font-size: 1em}

@media print {
  .print{
    display: none;
  }
  *{font-size: 1.1em}

  .container{
    margin: 1px !important;
  }

  body{
    font-size: 0.7em;
    margin: 1px !important;
  }

}
</style>
</head>

<body style="margin-left: 35%; margin-right: 35%;">
<?php 
$pvuelto = isset($_REQUEST['pvuelto']) ? $_REQUEST['pvuelto'] : 0;
$vuelto = isset($_REQUEST['vuelto']) ? $_REQUEST['vuelto'] : 0;
// $transaccion;
// $miscelaneos;
// $datos;  padding: 0% 37.5% 0% 37.5%
$fecha = explode('/', $transaccion[0][3]);
$logo = '<tr align="center">
    <td>
      <img src="'.$miscelaneos[3].'" alt="LOGO" width="60%">
    </td>
    </tr><br><br>';

echo '<button class="print" onclick="print()" style="cursor: pointer;left:100px;position:fixed;padding: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
    background-color: #1883ba;
    border-radius: 6px;
    border: 2px solid #0016b0">Imprimir</button>';

  echo '<div class="container"  >
  <br><br>
<table>';

if($miscelaneos[3] != '')
  echo $logo;

/*echo '<tr align="center" ><td style="padding: 6px 5px !important">';

require_once('../assets/libs/phpqrcode/qrlib.php'); 

      $codeContents = $miscelaneos[11]; 
       
      $text = QRcode::text($codeContents); 
      $raw = join("<br/>", $text); 
       
      $raw = strtr($raw, array( 
          '0' => '<span style="color:white;width=5%">&#9608;&#9608;</span>', 
          '1' => '&#9608;&#9608;' 
      )); 
       
      echo '<div style:"width=10%;  font-size:16px !important"><tt>'.$raw.'</tt></div>';

echo '</td></tr>';*/

echo '<tr align="center" '.$ocultar.'>
     <td>
        <h3 align="center"> '.$miscelaneos[0].' <br> Ced. '.$miscelaneos[1].'
         <br> Telf. '.$miscelaneos[5].'<br> '.$miscelaneos[6].'
        </h3>
     </td>
  </tr>
</table>
<table style="width: 100% !important;">
  <tr class="fe hide">
    <td align="left" colspan="4"><b>Factura Electrónica N°</b></td>
  </tr>
  <tr class="fe hide">
    <td align="left" colspan="4" style="font-size:13px">'.$transaccion[0][32].'</td>
  </tr>
  <tr><td colspan="4"><br></td></tr>
  <tr>
    <td align="left"><b>Consecutivo N°</b></td>
    <td width="13%" align="center"><b>Día</b></td>
    <td width="13%" align="center"><b>Mes</b></td>
    <td width="13%" align="center"><b>Año</b></td>
  </tr>
  <tr>
    <td align="left"><span class="fe hide"> '.$datos[0].' </span></td>
    <td width="13%" align="center">'.$fecha[0].'</td>
    <td width="13%" align="center">'.$fecha[1].'</td>
    <td width="13%" align="center">'.$fecha[2].'</td>
  </tr>
</table>
<br>
<table>
  <tr '.$ocultar.'>
    <td colspan="2"><b>CLIENTE:</b><br>'.$datos[4].'</td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%"><b>USUARIO:</b> </td>
    <td width="50%">'.$datos[16].'</td>
  </tr>
   <tr '.$ocultar.'>
    <td width="50%"><b>TIPO FACTURA:</b> </td>
    <td width="50%">'.$datos[1].'</td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%"><b>T. PAGO:</b></td>
    <td width="50%">Efectivo</td>
  </tr>
</table>
  <br>
<hr>
<table  style="width: 100% !important;">
  <tr>
    <td align="center" width="20%"><b>CANT</b></td>
    <td align="center" width="60%"><b>DESCRIPCION</b></td>
    <td align="center" width="60%"><b>P.Uni</b></td>
    <td align="center" width="20%" '.$ocultar.'><b>TOTAL</b></td>
  </tr>
  <tr>
    <td colspan="3"></td>
  </tr>';
  

    foreach ($transaccion as $obj) {

    echo '<tr>
      <td align="center" width="10%">'.$obj[29].$obj[18].'</td>
      <td align="center" width="55%">'.$obj[19].'</td>
      <td align="center" width="15%">'.$obj[20].'</td>
      <td align="right" width="20%" '.$ocultar.'>'.$obj[22].'</td>
    </tr>';
    }
  
  
echo '<tr>
    <td colspan="4" style="border-bottom: 1px dashed #A0A0A0;"></td>
  </tr>
<!-- <tr>
    <td colspan="3" align="right"> <b>TOTAL</b> </td>
     <td align="right"> <b>10000</b> </td>
  </tr> -->
  <tr '.$ocultar.'>
    <td colspan="4" style="border-bottom: 1px dashed white;"></td>
  </tr>
  <tr '.$ocultar.'>
    <td style="border-top: 2px solid black;" colspan="4"></td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="3">Sub-Total:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[9].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="3">13% IV:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[5].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="3">Descuento:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[6].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="3">Flete:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[7].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="3">Ajuste:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[8].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="3"><b>TOTAL GENERAL:</b>  </td>
    <td width="50%" align="right"> <b>'.$obj[15].$obj[10].'</b> </td>
  </tr>
</table>
<div '.$ocultar.'>*=EXCENTO</div>
<div '.$ocultar.'>**=I.V.I</div>';

if ($pvuelto > 0 && $vuelto >= 0) {
  echo '<table width="100%">
  <tr>
    <td align="center">Paga con: '.$pvuelto.'</td>
  </tr>
  <tr>
    <td align="center">Vuelto: '.$vuelto.'</td>
  </tr>
</table>';
}

echo '<hr>
<div style="text-align: center; font-size: 0.8em;'.$oc.'" id="resolucion"><br>
</div>
</div>';

 ?>
 <script src="../assets/js/jquery.js?v=10.0.0.37"></script>
 <script src="../assets/js/materialize.js?v=10.0.0.37"></script>
 <script src="../assets/js/asgard.js?v=10.0.0.37"></script>
 <script type="text/javascript">
   $(function(){
      var config = getDatos('if(p12 is null,0,1) as FE,isinventariado as INV,idtipofactura as FAC,fastshow as FS,printSale',39,'id = @@impresa',0,0)[0][0];
      if (parseInt(config[0])){
        $(".fe").removeClass('hide');
        $("#resolucion").html('Este Documento no Tiene Validéz Tributaria');
      }
      else{
        $("#resolucion").html('AUTORIZADO MEDIANTE RESOLUCION No. 11-97 del la D.G.T.D');
      }
   })
 </script>
 </body>
 </html>