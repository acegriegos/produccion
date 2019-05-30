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

echo '<tr align="center" >
     <td>
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
    <td colspan="3">'.$datos[9].'</td>
  </tr>
  <tr class="fe hide">
    <td align="left" colspan="4">'.$datos[1].'</td>
  </tr>
  <tr><td colspan="4"><br></td></tr>
  <tr>
    <td align="left">Factura N°</td>
    <td width="13%" align="center">Día</td>
    <td width="13%" align="center">Mes</td>
    <td width="13%" align="center">Año</td>
  </tr>
  <tr>
    <td align="left"><span class="fe hide"> '.$datos[13].' </span></td>
    <td width="13%" align="center">'.$fecha[2].'</td>
    <td width="13%" align="center">'.$fecha[1].'</td>
    <td width="13%" align="center">'.$fecha[0].'</td>
  </tr>
</table>
<br>
<table>
  <tr >
    <td colspan="2">CLIENTE:<br>'.$datos[4].'</td>
  </tr>
  <tr >
    <td width="50%">USUARIO: </td>
    <td width="50%">'.$datos[10].'</td>
  </tr>
  <tr >
    <td width="50%">T. PAGO:</td>
    <td width="50%">'.$datos[8].'</td>
  </tr>
</table>
  <br>
<hr>
<table  style="width: 100% !important;">
  <tr>
    <td align="center" width="30%">SALDO ANT.</td>
    <td align="center" width="40%">MONTO</td>
    <td align="center" width="30%">SALDO ACTUAL</td>
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
</table><br>
<b>SALDO DEL CLIENTE: </b>'.$datos[11].number_format($datos[20],2);

echo '<hr>
<div style="text-align: center;" id="resolucion"></div><br><br><br>
<hr>
<span style="text-align: center; margin-left:36%">Recibo Conforme</span>
<br><br><br>
<hr>
<span style="text-align: center; margin-left:36%">Número de Cédula</span>';

 ?>
 <script src="../assets/js/jquery.js?v=10.1.0.24"></script>
 <script src="../assets/js/materialize.js?v=10.1.0.24"></script>
 <script src="../assets/js/asgard.js?v=10.1.0.24"></script>
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