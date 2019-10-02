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
    </tr>';

echo '<button class="print" style="cursor: pointer;left:100px;position:fixed;padding: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
    background-color: #1883ba;
    border-radius: 6px;
    border: 2px solid #0016b0">Imprimir</button>';

  echo '<div class="container"  >
<table>';

/*if($miscelaneos[3] != '')
  echo $logo;*/

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
     <td align="center">
        <div align="center">';
if(strlen(trim($miscelaneos[2])))
    echo $miscelaneos[2].' <br>'.$miscelaneos[0];
else
  echo $miscelaneos[0];

echo '<br>Ced. '.$miscelaneos[1];
if(strlen(trim($miscelaneos[5])))
    echo '<br> Telf. '.$miscelaneos[5];

echo '<br> '.$miscelaneos[4].' <br> '.$miscelaneos[6].'
        </div>
     </td>
  </tr>
</table>
<table style="width: 100% !important;">
  <tr>
    <td align="left" colspan="4">Documento Electrónico, Clave N°</td>
  </tr>
  <tr>
    <td align="left" colspan="4" style="font-size:11px">'.$transaccion[0][32].'</td>
  </tr>
  <tr style="display:none"><td colspan="4"><br></td></tr>
  <tr>
    <td align="center">'.$datos[25].' de '.$datos[1].' N°</td>
  </tr>
  <tr>
    <td align="center"><span class="fe hide"> '.$datos[0].' </span></td>
  </tr>
</table>

<table>
  <tr>
    <td>Fecha: '.$fecha[0].'-'.$fecha[1].'-'.$fecha[2].'</td>
    <td>Hora: '.$datos[37].'</td>
  </tr>';
  if ($datos[4] != '') {
    echo '<tr '.$ocultar.'>
    <td colspan="2">Cliente:</td>
  </tr>
  <tr>
    <td align="center" colspan="2">'.$datos[4].'</td>
  </tr>';
  }
  
  echo '<tr '.$ocultar.'>
    <td width="50%">Vendedor: </td>
    <td width="50%">'.$datos[16].'</td>
  </tr>
  <tr '.$ocultar.'>
    <td width="50%">T. Pago:</td>
    <td width="50%">'.$datos[2].'</td>
  </tr>
</table>

<hr>';

switch($config[0][10]) {
  case 1:
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
  $sr = 0;
  foreach ($transaccion as $obj) {
    if( strpos($obj[19], 'Servicios Restaurante') == ''){
      echo '<tr>
        <td align="center" width="15%">'.$obj[29].$obj[18].'</td>
        <td align="center" width="45%">'.$obj[19].'</td>
        <td align="center" width="20%">'.$obj[20].'</td>
        <td align="center" width="20%">'.number_format(str_replace(',', '', $obj[20])*str_replace(',', '', $obj[18]),2).'</td></tr>';
      }else
        $sr += str_replace(',', '', $obj[20]);
    }

break;
case 2:
  $colspan1 = 4;
  $colspan2 = 3;

 echo '<table  style="width: 100% !important;">
 <tr>
  <td colspan="4">ARTICULO</td>
 </tr>
 <tr>
  <td>CANT</td>
  <td align="center">COD</td>
  <td>P.UNIT</td>
  <td>P.TOTAL</td>
 </tr>
  <tr>
    <td colspan="4"></td>
  </tr>';
  $sr = 0;
  foreach ($transaccion as $obj) {
    if( strpos($obj[19], 'Servicios Restaurante') == ''){
      echo ' <tr> <td style="border-top: 1px dashed black" colspan="4">'.$obj[19].'</td></tr>
      <tr>
        <td align="center" width="15%">'.$obj[29].$obj[18].'</td>
        <td align="center" width="45%">'.$obj[36].'</td>
        <td align="right" width="20%">'.$obj[20].'</td>
        <td align="right" width="20%">'.number_format(str_replace(',', '', $obj[20])*str_replace(',', '', $obj[18]),2).'</td></tr>';
      }else
        $sr += str_replace(',', '', $obj[20]);
    }
break;
default:
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
  

    $sr = 0;
    foreach ($transaccion as $obj) {
      if( strpos($obj[19], 'Servicios Restaurante') == ''){
          echo '<tr>
            <td align="center" width="20%">'.$obj[29].$obj[18].'</td>
            <td align="center" width="50%">'.$obj[19].'</td>
            <td align="right" width="30%">'.number_format(str_replace(',','',$obj[20])*str_replace(',', '', $obj[18]),2).'</td>';
      }else
        $sr += str_replace(',', '', $obj[20]);
    }
    break;
  }
  
echo '<tr>
    <td colspan="'.$colspan1.'"></td>
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
    <td width="50%" colspan="'.$colspan2.'">Gravado:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[9].' </td>
  </tr>';

    if ($obj[8] > 0) {
      echo '<tr '.$ocultar.'>
      <td width="50%" colspan="'.$colspan2.'">Exento:</td>
      <td width="50%" align="right"> '.$obj[15].$obj[8].' </td>
    </tr>';
    }

    if ($sr > 0) {
      echo '<tr '.$ocultar.'>
      <td width="50%" colspan="'.$colspan2.'">10% Serv. Rest.:</td>
      <td width="50%" align="right"> '.$obj[15].number_format($sr,2).' </td>
    </tr>';
    }
  
  if ($obj[6] > 0) {
    echo '<tr '.$ocultar.'>
      <td width="50%" colspan="'.$colspan2.'">Descuento:</td>
      <td width="50%" align="right"> '.$obj[15].$obj[6].' </td>
    </tr>';
  } 

  if ($obj[7] > 0) {
    echo  '<tr '.$ocultar.'>
    <td width="50%" colspan="'.$colspan2.'">Exonerado:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[7].' </td>
  </tr>';
  }

  echo '<tr '.$ocultar.'>
    <td width="50%" colspan="'.$colspan2.'">IVA:</td>
    <td width="50%" align="right"> '.$obj[15].$obj[5].' </td>
  </tr>';

  echo '<tr '.$ocultar.'>
    <td width="50%" colspan="'.$colspan2.'">TOTAL GENERAL:  </td>
    <td width="50%" align="right"> '.$obj[15].$obj[10].' </td>
  </tr>
</table>
<div '.$ocultar.'>*=EXENTO</div>';

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

echo '
<div style="text-align: center;font-size:10px;'.$oc.'" id="resolucion"></div><br><br><br>
<div class="recibo" style="display:none"><hr>
<span style="text-align: center; margin-left:36%">Recibo Conforme</span>
<br><br><br>
<hr>
<span style="text-align: center; margin-left:36%">Número de Cédula</span>

</div></div>';

 ?>
 <script src="../assets/js/jquery.js?v=10.2.0.17"></script>
 <script src="../assets/js/materialize.js?v=10.2.0.17"></script>
 <script src="../assets/js/asgard.js?v=10.2.0.17"></script>
 <script type="text/javascript">
   $(function(){
      var config0 = $("#config0").val()
      var config9 = parseInt($("#config9").val());
      var resol = "AUTORIZADO MEDIANTE RESOLUCION No. 11-97 de la D.G.T.D";
      if (parseInt(config0)){
        $(".fe").removeClass('hide');
        resol = "AUTORIZADO MEDIANTE RESOLUCION No DGT-R-033-2019 del 20 DE JUNIO 2019";//"ESTE DOCUMENTO NO TIENE VALIDEZ TRIBUTARIA";
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

      if(parseInt(param)){
        window.print();
      }
   })
 </script>
 </body>
 </html>