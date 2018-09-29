<?php $config = $kakaroto->kamehameha('',42,'@@impresa');?>
<!DOCTYPE html>
<html>
<head>
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
  <title>Factura</title>  
<style>
  *{font-size: 1em}

<?php if ($config[0][8] == 2) { ?>
@media print {
  .print{
    display: none;
  }

  *{
    font-family:'Helvetica';
    /*font-size: 12px;*/
  }

  *{
        margin: 0% !important;
        font-size: 20px;

  }

  @page {
    margin: 0;
  }
}
<?php }else{ ?>
@media print {
  .print{
    display: none;
  }

  *{
    font-family:'Helvetica';
    font-size: 12px;
  }

  .container{
    margin: 1px !important;
  }

<?php if ($config[0][9] == 0) { ?>
  body{
    margin-left: 0% !important;
    margin-right: 0% !important;
  }
<?php }else{ ?>
  body{
    margin-left: 9% !important;
    margin-right: 9% !important;
  }
<?php } ?>
}

<?php } ?>
</style>
</head>

<body style="margin-left: 35%; margin-right: 35%;">
  <input type="hidden" id="ttipo" value="<?php echo $datos[35]; ?>">
  <input type="hidden" id="config0" value="<?php echo $config[0][0]; ?>">
  <input type="hidden" id="config9" value="<?php echo $config[0][9]; ?>">
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
        <div align="center">';
if(strlen(trim($miscelaneos[2])))
    echo '<b> '.$miscelaneos[2].' </b> <br>'.$miscelaneos[0];
else
  echo '<b> '.$miscelaneos[0].' </b>';

echo '<br>Ced. '.$miscelaneos[1];
if(strlen(trim($miscelaneos[5])))
    echo '<br> Telf. '.$miscelaneos[5];

echo '<br> '.$miscelaneos[6].'
        </div>
     </td>
  </tr>
</table>
<table style="width: 100% !important;">
  <tr class="hide" style="display:none">
    <td align="left" colspan="4">Factura Electrónica, Clave N°</td>
  </tr>
  <tr class="hide" style="display:none">
    <td align="left" colspan="4" style="font-size:13px">'.$transaccion[0][32].'</td>
  </tr>
  <tr style="display:none"><td colspan="4"><br></td></tr>
  <tr>
    <td align="center">Factura de '.$datos[1].' N°</td>
  </tr>
  <tr>
    <td align="center"><span class="fe hide"> '.$datos[0].' </span></td>
  </tr>
</table>
<br>
<table>
  <tr>
    <td>Fecha: '.$fecha[0].'-'.$fecha[1].'-'.$fecha[2].'</td>
  </tr>
  <tr '.$ocultar.'>
    <td colspan="2">Cliente:</td>
  </tr>
  <tr>
    <td align="center" colspan="2">'.$datos[4].'</td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%">Vendedor: </td>
    <td width="50%">'.$datos[16].'</td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%">T. Pago:</td>
    <td width="50%">'.$datos[2].'</td>
  </tr>
</table>
  <br>
<hr>';

if ($config[0][10] == 1) {
  $colspan1 = 4;
  $colspan2 = 3;

 echo '<table  style="width: 100% !important;">
  <tr>
    <td align="center" width="15%">CANT</td>
    <td align="center" width="45%">ARTICULO</td>
    <td align="center" width="20%">P.UNIT</td>
    <td align="center" width="20%">PRECIO</td>
  </tr>
  <tr>
    <td colspan="4"></td>
  </tr>';

  foreach ($transaccion as $obj) {

    echo '<tr>
      <td align="center" width="15%">'.$obj[29].$obj[18].'</td>
      <td align="center" width="45%">'.$obj[19].'</td>
      <td align="center" width="20%">'.$obj[20].'</td>
      <td align="center" width="20%">'.number_format(str_replace(',', '', $obj[20])*str_replace(',', '', $obj[18]),2).'</td></tr>';
    }

}else{
  $colspan1 = 3;
  $colspan2 = 2;
echo '<table  style="width: 100% !important;">
  <tr>
    <td align="center" width="20%">CANT</td>
    <td align="center" width="50%">ARTICULO</td>
    <td align="center" width="30%">PRECIO</td>
  </tr>
  <tr>
    <td colspan="3"></td>
  </tr>';
  

    foreach ($transaccion as $obj) {

    echo '<tr>
      <td align="center" width="20%">'.$obj[29].$obj[18].'</td>
      <td align="center" width="50%">'.$obj[19].'</td>
      <td align="center" width="30%">'.$obj[20].'</td>';
    }
  }
  
echo '<tr>
    <td colspan="'.$colspan1.'" style="border-bottom: 1px dashed #A0A0A0;"></td>
  </tr>
<!-- <tr>
    <td colspan="'.$colspan1.'" align="right"> TOTAL </td>
     <td align="right"> 10000 </td>
  </tr> -->
  <tr '.$ocultar.'>
    <td colspan="'.$colspan1.'" style="border-bottom: 1px dashed white;"></td>
  </tr>
  <tr '.$ocultar.'>
    <td colspan="'.$colspan1.'"></td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="'.$colspan2.'">Sub-Total:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[9].' </td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%" colspan="'.$colspan2.'">13% IV:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[5].' </td>
  </tr>';
  
  if ($obj[6] > 0) {
    echo '<tr '.$ocultar.'>
      <td width="50%" colspan="'.$colspan2.'">Descuento:</td>
      <td width="50%" align="right"> '.$obj[15].$obj[6].' </td>
    </tr>';
  } 

  if ($obj[7] > 0) {
    echo  '<tr '.$ocultar.'>
    <td width="50%" colspan="'.$colspan2.'">Flete:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[7].' </td>
  </tr>';
  }
 
  if ($obj[8] > 0) {
    echo '<tr '.$ocultar.'>
    <td width="50%" colspan="'.$colspan2.'">Ajuste:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[8].' </td>
  </tr>';
  }

  echo '<tr '.$ocultar.'>
    <td width="50%" colspan="'.$colspan2.'">TOTAL GENERAL:  </td>
    <td width="50%" align="right"> '.$obj[15].$obj[10].' </td>
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
<div style="text-align: center;'.$oc.'" id="resolucion"></div><br><br><br>
<div class="recibo" style="display:none"><hr>
<span style="text-align: center; margin-left:36%">Recibo Conforme</span>
<br><br><br>
<hr>
<span style="text-align: center; margin-left:36%">Número de Cédula</span>

</div></div>';

 ?>
 <script src="../assets/js/jquery.js?v=10.0.0.62"></script>
 <script src="../assets/js/materialize.js?v=10.0.0.62"></script>
 <script src="../assets/js/asgard.js?v=10.0.0.62"></script>
 <script type="text/javascript">
   $(function(){
      var config0 = $("#config0").val()
      var config9 = parseInt($("#config9").val());
      var resol = "AUTORIZADO MEDIANTE RESOLUCION No. 11-97 del la D.G.T.D";
      if (parseInt(config0)){
        $(".fe").removeClass('hide');
        resol = "ESTE DOCUMENTO NO TIENE VALIDEZ TRIBUTARIA";
      }

      $("#resolucion").html('<span class="ncontado" style="display:none">Renuncio mi domicilio y los trámites de juicio ejectivo. Al mismo tiempo doy por aceptadas las condiciones del codigo del comercio según artículo 460. Todo reclamo debe hacerse antes de 5 días hábiles. Acepto ser incluído en la red nacional de créditos</span>'+resol);

      if ($("#ttipo").val() != 1) {
        $(".ncontado").show();
      }

      if (config9) {
        $(".recibo").show();
      }

      param = getParameterByName('fp');
      param = param == '' ? 0 : parseInt(param) ;
      
      window.onafterprint = function(){
       window.close();
     }

      if(parseInt(param)){
        window.print();
      }
   })
 </script>
 </body>
 </html>