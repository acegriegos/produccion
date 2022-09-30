<?php $config = $kakaroto->kamehameha('',42,'@@impresa');?>
<!DOCTYPE html>
<html>
<head>
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
  <title>Recibo</title>  
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
<?php 
// $transaccion;
// $miscelaneos;
// $transaccion[0];  padding: 0% 37.5% 0% 37.5%
$fecha = explode('-', $transaccion[0][0]);
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
<table style="width:100%">';

if($miscelaneos[3] != '')
  echo $logo;

echo '<tr>
     <td align="center">
        <div align="center"> <b>'.$miscelaneos[0].'</b> <br> Ced. '.$miscelaneos[1].'
         <br> Telf. '.$miscelaneos[5].'<br> '.$miscelaneos[6].'
        </div>
     </td>
  </tr>
</table>
<br>
<table style="width: 100% !important;">
  <tr>
    <td align="left">Recibo N°</td>
    <td colspan="3">'.$transaccion[0][1].'</td>
  </tr>
  <tr><td colspan="4"><br></td></tr>
  <tr>
    <td align="left">Abono Múltiple </td>
    <td width="13%" align="center">Día</td>
    <td width="13%" align="center">Mes</td>
    <td width="13%" align="center">Año</td>
  </tr>
  <tr>
    <td align="left"><span class="fe hide"></span></td>
    <td width="13%" align="center">'.$fecha[2].'</td>
    <td width="13%" align="center">'.$fecha[1].'</td>
    <td width="13%" align="center">'.$fecha[0].'</td>
  </tr>
</table>
<br>
<table style="width: 100% !important;">
  <tr >
    <td colspan="2">'.$transaccion[0][12].':</td>
  </tr>
  <tr>
    <td align="center" colspan="2">'.$transaccion[0][2].'</td>
  </tr>
  <tr >
    <td width="50%">USUARIO: </td>
    <td width="50%">'.$transaccion[0][3].'</td>
  </tr>
  <tr >
    <td width="50%">T. PAGO:</td>
    <td width="50%">'.$transaccion[0][4].'</td>
  </tr>
   <tr>
    <td width="50%">MONTO DE ABONO:</td>
    <td width="50%">'.$transaccion[sizeof($transaccion)-1][10].'</td>
  </tr>';
  if($transaccion[0][14])
   echo '<tr><td></td><td></td></tr><tr>
    <td width="50%">COMENTARIO:</td>
    <td width="50%">'.$transaccion[0][14].'</td>
  </tr>';
echo '</table>
  <br>
<table  style="width: 100% !important;">
  <tr>
    <td colspan="3" align="center">DESGLOCE DE ABONO</td>
  </tr>
  <tr>
    <td align="center" width="30%">FACTURA</td>
    <td align="center" width="40%">SALDO ANT.</td>
    <td align="center" width="30%">SALDO ACTUAL</td>
  </tr>
  <tr>
    <td colspan="3"></td>
  </tr>';
  
echo '<tr>
    <td colspan="3" style="border-bottom: 1px dashed #A0A0A0;"></td>
  </tr>';

  foreach ($transaccion as $obj) {
      echo '<tr><td align="center">'.$obj[5].'</td>
    <td align="right">'.$obj[6].$obj[7].'</td>
    <td align="right"> '.$obj[6].$obj[8].'</td></tr>';
  }  
  echo '
</table>';

echo '<hr><b>SALDO '.$transaccion[0][12].':</b> '.$obj[6].$obj[11].'
<br><br><br>
<hr>
<span style="text-align: center; margin-left:36%">Recibo Conforme</span>
<br><br><br>
<hr>
<span style="text-align: center; margin-left:36%">Número de Cédula</span>';

 ?>
 <script src="../assets/js/jquery.js?v=10.4.0.3"></script>
 <script src="../assets/js/materialize.min.js?v=10.4.0.3"></script>
 <script src="../assets/js/asgard.js?v=10.4.0.3"></script>
   <script type="text/javascript">
       $(function(){
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

          if(parseInt(param)){
            window.print();
          }

       })
     </script>
 </body>
 </html>