<?php $config = $kakaroto->kamehameha('',42,'@@impresa');?>
<!DOCTYPE html>
<html>
<head>
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
  <title>Orden</title>  
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
<?php 
$pvuelto = isset($_REQUEST['pvuelto']) ? $_REQUEST['pvuelto'] : 0;
$vuelto = isset($_REQUEST['vuelto']) ? $_REQUEST['vuelto'] : 0;
// $transaccion;
// $miscelaneos;
// $datos;  padding: 0% 37.5% 0% 37.5%
$fecha = explode('/', $transaccion[0][0]);
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

echo '<tr align="center">
     <td align="center">
        <div align="center">';
if(strlen(trim($miscelaneos[2])))
    echo $miscelaneos[2].' <br>'.$miscelaneos[0];
else
  echo $miscelaneos[0];

echo '<br>Ced. '.$miscelaneos[1];
if(strlen(trim($miscelaneos[5])))
    echo '<br> Telf. '.$miscelaneos[5];

echo '<br> '.$miscelaneos[4].' <br> '.$miscelaneos[6].' <br> <span>PRE-FACTURA</span>
        </div>
     </td>
  </tr>
</table>

<table>
  <tr>
    <td>Fecha: '.$fecha[0].'-'.$fecha[1].'-'.$fecha[2].'</td>
    <td>Hora: '.$transaccion[0][1].'</td>
  </tr>';
  
  echo '<tr >
    <td width="50%">Atiende: </td>
    <td width="50%">'.$transaccion[0][2].'</td>
  </tr>
</table>

<hr>';

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
  
    $sr = $grav = $iva = $tot = 0;
    foreach ($detalle as $obj) {
      /*if( strpos($obj[19], 'Servicios Restaurante') == ''){*/
          echo '<tr>
            <td align="center" width="20%">'.$obj[0].'</td>
            <td align="center" width="50%">'.$obj[2].'</td>
            <td align="right" width="30%">'.number_format($obj[1],2).'</td>';
        $grav += $obj[1];
        //$sr += ($obj[1]/1.23)*0.1;
      /*}else
        $sr += str_replace(',', '', $obj[20]);*/
    }
  $tot = $grav+$iva+$sr;
  
echo '<tr>
    <td colspan="'.$colspan1.'"></td>
  </tr>
  <tr >
    <td colspan="'.$colspan1.'" style="border-bottom: 1px dashed white;"></td>
  </tr>
  <tr>
    <td colspan="'.$colspan1.'"></td>
  </tr>
  <tr >
    <td width="50%" colspan="'.$colspan2.'">Gravado:</td>
    <td width="50%" align="right"> '.$transaccion[0][4].number_format($grav,2).' </td>
  </tr>';

if($_REQUEST['has']){
    $sr = $grav*0.1;
      echo '<tr >
      <td width="50%" colspan="'.$colspan2.'">10% Serv. Rest.:</td>
      <td width="50%" align="right"> '.$transaccion[0][4].number_format($sr,2).' </td>
    </tr>';
    }else{
      $sr = 0;
    }

  $imv = $grav*0.13;
  echo '<tr >
    <td width="50%" colspan="'.$colspan2.'">IVA:</td>
    <td width="50%" align="right"> '.$transaccion[0][4].number_format($imv,2).' </td>
  </tr>';

  echo '<tr >
    <td width="50%" colspan="'.$colspan2.'">TOTAL GENERAL:  </td>
    <td width="50%" align="right"> '.$transaccion[0][4].number_format($grav+$sr+$imv,2).' </td>
  </tr>
</table>';

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
<div style="text-align: center;font-size:10px" id="resolucion" class="salto"></div><br><br><br>
<div class="recibo" style="display:none"><hr>
<span style="text-align: center; margin-left:36%">Recibo Conforme</span>
<br><br><br>
<hr>
<span style="text-align: center; margin-left:36%">Número de Cédula</span>

</div></div>';

 ?>
 <script src="../assets/js/jquery.js?v=10.2.0.62"></script>
 <script src="../assets/js/materialize.min.js?v=10.2.0.62"></script>
 <script src="../assets/js/asgard.js?v=10.2.0.62"></script>
 <script type="text/javascript">
  var salir = 0;
   $(function(){
      var config0 = $("#config0").val()
      var config9 = parseInt($("#config9").val());
      var resol = "ESTE DOCUMENTO NO REPRESENTA UNA FACTURA VALIDA"

      $("#resolucion").html(resol);
      
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