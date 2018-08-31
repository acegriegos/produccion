<!DOCTYPE html>
<html>
<head>
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
  <title>Recibo</title>  
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
// $transaccion;
// $miscelaneos;
// $datos;  padding: 0% 37.5% 0% 37.5%
$fecha = explode('-', $datos[3]);
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

echo '<tr align="center" >
     <td>
        <h3 align="center"> '.$miscelaneos[0].' <br> Ced. '.$miscelaneos[1].'
         <br> Telf. '.$miscelaneos[5].'<br> '.$miscelaneos[6].'
        </h3>
     </td>
  </tr>
</table>
<table style="width: 100% !important;">
  <tr>
    <td align="left"><b>Recibo N°</b></td>
    <td colspan="3"><b>'.$datos[9].'</b></td>
  </tr>
  <tr class="fe hide">
    <td align="left" colspan="4">'.$datos[1].'</td>
  </tr>
  <tr><td colspan="4"><br></td></tr>
  <tr>
    <td align="left"><b>Factura N°</b></td>
    <td width="13%" align="center"><b>Día</b></td>
    <td width="13%" align="center"><b>Mes</b></td>
    <td width="13%" align="center"><b>Año</b></td>
  </tr>
  <tr>
    <td align="left"><span class="fe hide"> '.$datos[13].' </span></td>
    <td width="13%" align="center">'.$fecha[0].'</td>
    <td width="13%" align="center">'.$fecha[1].'</td>
    <td width="13%" align="center">'.$fecha[2].'</td>
  </tr>
</table>
<br>
<table>
  <tr >
    <td colspan="2"><b>CLIENTE:</b><br>'.$datos[4].'</td>
  </tr>
  <tr >
    <td width="50%"><b>USUARIO:</b> </td>
    <td width="50%">'.$datos[10].'</td>
  </tr>
  <tr >
    <td width="50%"><b>T. PAGO:</b></td>
    <td width="50%">'.$datos[8].'</td>
  </tr>
</table>
  <br>
<hr>
<table  style="width: 100% !important;">
  <tr>
    <td align="center" width="30%"><b>SALDO ANT.</b></td>
    <td align="center" width="40%"><b>MONTO</b></td>
    <td align="center" width="30%"><b>SALDO ACTUAL</b></td>
  </tr>
  <tr>
    <td colspan="3"></td>
  </tr>';
  
echo '<tr>
    <td colspan="3" style="border-bottom: 1px dashed #A0A0A0;"></td>
  </tr>
  <tr>
    <td align="center">'.$datos[11].$datos[12].'</td>
    <td align="center">'.$datos[11].$datos[5].'</td>
    <td align="center"> '.$datos[11].$datos[6].'</td>
  </tr>
</table>';

echo '<hr>
<div style="text-align: center; font-size: 0.8em" id="resolucion"><br>
</div>
</div>';

 ?>
 <script src="../assets/js/jquery.js?v=10.0.0.42"></script>
 <script src="../assets/js/materialize.js?v=10.0.0.42"></script>
 <script src="../assets/js/asgard.js?v=10.0.0.42"></script>
   <script type="text/javascript">
       $(function(){
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