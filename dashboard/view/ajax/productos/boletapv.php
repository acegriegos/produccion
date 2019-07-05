<?php $config = $kakaroto->kamehameha('',42,'@@impresa');?>
<!DOCTYPE html>
<html>
<head>
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
  <title>Boletas</title>  
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
// $transaccion;
// $miscelaneos;
// $datos;  padding: 0% 37.5% 0% 37.5%
$fecha = explode('/', $transaccion[0][1]);
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

echo '<br> '.$miscelaneos[6].'
        </div>
     </td>
  </tr>
</table>
<table style="width: 100% !important;">
  <tr>
    <td align="left" colspan="4">Boleta de '.$transaccion[0][3].'</td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="2">Fecha: '.$fecha[0].'-'.$fecha[1].'-'.$fecha[2].'</td>
  </tr>';
  
  echo '<tr>
    <td width="50%">N°:</td>
    <td width="50%">'.$transaccion[0][0].'</td>
  </tr>
  <tr >
    <td width="50%">Usuario:</td>
    <td width="50%"> '.$transaccion[0][2].'</td>
  </tr>';

  if($transaccion[0][10] == '') {
    echo '<tr>
      <td width="50%">Bodega</td>
      <td width="50%">'. $transaccion[0][8].'</td>
    </tr>
    <tr>
      <td width="50%">Inventario</td>
      <td width="50%">'. $transaccion[0][9].'</td>
    </tr>';
    }else{
      echo ' <tr>
      <td colspan="2">DESDE</td>
    </tr>
    <tr>
      <td width="50%">Bodega</td>
      <td width="50%">'. $transaccion[0][8].'</td>
    </tr>
    <tr>
      <td width="50%">Inventario</td>
      <td width="50%">'. $transaccion[0][9].'</td>
    </tr>
    <tr>
      <td colspan="2">PARA</td>
    </tr>
     <tr>
      <td width="50%">Bodega</td>
      <td width="50%">'. $transaccion[0][10].'</td>
    </tr>
    <tr>
      <td width="50%">Inventario</td>
      <td width="50%">'. $transaccion[0][11].'</td>
    </tr>';
  }

  echo '<tr>
      <td width="50%">Comentario</td>
      <td width="50%">'. $transaccion[0][12].'</td>
    </tr>
</table>

<hr>';

 echo '<table  style="width: 100% !important;">
  <tr>
    <td align="center" width="46%">ARTICULO</td>
    <td align="center" width="18%">CANT</td>
    <td align="center" width="18%">ANT</td>
    <td align="center" width="18%">FIN</td>
  </tr>
  <tr>
    <td colspan="4"></td>
  </tr>';

  foreach ($transaccion as $obj) {

    echo '<tr>
      <td align="center" width="46%">'.$obj[4].'</td>
      <td align="center" width="18%">'.$obj[5].'</td>
      <td align="center" width="18%">'.$obj[6].'</td>
      <td align="center" width="18%">'.$obj[13].'</td>';
    }
  

echo '</table><div style="text-align: center;font-size:10px;" id="resolucion"></div><br><br><br>
<div class="recibo"><b><br> <hr>
<span style="text-align: center; margin-left:36%">Recibo Conforme</span>
<br><br><br>
<hr>
<span style="text-align: center; margin-left:36%">Número de Cédula</span>

</div></div>';

 ?>
 <script src="../assets/js/jquery.js?v=10.1.0.42"></script>
 <script src="../assets/js/materialize.js?v=10.1.0.42"></script>
 <script src="../assets/js/asgard.js?v=10.1.0.42"></script>
 <script type="text/javascript">
   $(function(){
      var config0 = $("#config0").val()
      var config9 = parseInt($("#config9").val());


      $("#resolucion").html('');

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