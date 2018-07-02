<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="../assets/img/favicon.ico">
  <title>Factura</title>  
<style>
  *{font-size: 1em}

@media print {
  .print{
    display: none;
  }

  .container{
    margin: 1px !important;
  }

}
</style>
</head>

<body style="margin-left: 35%; margin-right: 35%;">
<?php 

// $transaccion;
// $miscelaneos;
// $datos;  padding: 0% 37.5% 0% 37.5%
$fecha = explode('/', $transaccion[0][3]);
$logo = '<tr align="center">
    <td>
      <img src="'.$miscelaneos[3].'" alt="LOGO" width="80%">
    </td>
    </tr>';

echo '<button class="print" onclick="print()" style="cursor: pointer;left:5px;position:fixed;">Imprimir</button>';

  echo '<div class="container"  >
  <br><br>
<table>';

if($miscelaneos[3] != '')
  echo $logo;

echo '<tr align="center"><td style="padding: 6px 5px !important">';

require_once('../assets/libs/phpqrcode/qrlib.php'); 

      $codeContents = $miscelaneos[11]; 
       
      $text = QRcode::text($codeContents); 
      $raw = join("<br/>", $text); 
       
      $raw = strtr($raw, array( 
          '0' => '<span style="color:white;width=15%">&#9608;&#9608;</span>', 
          '1' => '&#9608;&#9608;' 
      )); 
       
      echo '<tt>'.$raw.'</tt>';

echo '</td></tr>';

echo '<tr align="center" '.$ocultar.'>
     <td>
        <h3 align="center"> '.$miscelaneos[0].' <br>'.$miscelaneos[1].'</h3>
     </td>
  </tr>
</table>
<table style="width: 100%;">
  <tr>
    <td align="left"><b>Factura N°</b></td>
    <td width="13%" align="center"><b>DD</b></td>
    <td width="13%" align="center"><b>MM</b></td>
    <td width="13%" align="center"><b>AAAA</b></td>
  </tr>
  <tr>
    <td align="left"><span style="color: #628EF1"> '.$datos[0].' </span></td>
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
    <td width="50%"><b>T. PAGO:</b></td>
    <td width="50%">Efectivo</td>
  </tr>
</table>
  <br>
<hr>
<table>
  <tr>
    <td align="center" width="10%"><b>CANT</b></td>
    <td align="center" width="55%"><b>DESCRIPCION</b></td>
    <td align="center" width="35%" '.$ocultar.'><b>TOTAL</b></td>
  </tr>
  <tr>
    <td colspan="3"></td>
  </tr>';
  

    foreach ($transaccion as $obj) {
    echo '<tr>
      <td align="center" width="10%">'.$obj[18].'</td>
      <td align="center" width="55%">'.$obj[19].'</td>
      <td align="center" width="35%" '.$ocultar.'>'.$obj[22].'</td>
    </tr>';
    }
  
  
echo '<tr>
    <td colspan="3" style="border-bottom: 1px dashed #A0A0A0;"></td>
  </tr>
<!-- <tr>
    <td colspan="2" align="right"> <b>TOTAL</b> </td>
     <td align="right"> <b>10000</b> </td>
  </tr> -->
  <tr '.$ocultar.'>
    <td colspan="3" style="border-bottom: 1px dashed white;"></td>
  </tr>
  <tr '.$ocultar.'>
    <td style="border-top: 2px solid black;" colspan="3"></td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="2">Sub-Total:</td>
    <td width="50%" align="right"> '.$obj[9].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="2">13% IV:</td>
    <td width="50%" align="right"> '.$obj[5].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="2">Descuento:</td>
    <td width="50%" align="right"> '.$obj[6].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="2">Flete:</td>
    <td width="50%" align="right"> '.$obj[7].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="2">Ajuste:</td>
    <td width="50%" align="right"> '.$obj[8].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="2"><b>TOTAL GENERAL:</b>  </td>
    <td width="50%" align="right"> <b>'.$obj[10].'</b> </td>
  </tr>
</table>
<br>
<div '.$ocultar.'>*=EXCENTO</div>
<hr '.$ocultar.'>
<div style="text-align: center; font-size: 0.8em;'.$oc.'" id="resolucion">AUTORIZADO MEDIANTE RESOLUCION No. 11-97 del la D.G.T.D<br>
</div>
</div>';

 ?>
 <script src="../assets/js/jquery.js?v=10.0.0.14"></script>
 </body>
 </html>