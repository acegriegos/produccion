<?php 

echo '<pre>';
print_r($detalle);
echo '</pre>';

$html = '<meta charset="utf-8">
 <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
 <link href="../assets/css/bootstrap.css" rel="stylesheet">
 <link href="../assets/css/modulos/style-reportes.css" rel="stylesheet">
 <body>';
 // <div id="pageFooter"></div>

//HEADER
$html .= '<div class="hoja">';

$day = date("d");
$month = date("m");
$year = date("Y");
$html .= '
<table width="100%">
  <tr>
    <td width="25%" id="header">
        <img src="'.$miscelaneos[5][0].'" style="width:200px">
    </td>
    <td align="center" width="50%">
      <font size="5">
        <b>'.$miscelaneos[0][0].'<br>
      </font>
      <font size="3">
        <b>Cédula: '.$miscelaneos[1][0].'</b><br>
        <b>Teléfono: '.$miscelaneos[2][0].'</b><br>
        <b>Correo: '.$miscelaneos[3][0].'</b><br>
        <b>Dirección: '.$miscelaneos[4][0].'</b><br><br>
        <b>Factura de: '.$factura[1].'</b>
      </font>
    </td>
    <td align="right">
      <b style="text-align:right">Factura N° <span style="color: red"> '.$factura[0].'</span></b>
    </td>
    <td align="right" width="20%">
      <table style="border: 1px solid black;" width="80%">
        <tr align="center">
          <td style="border: 1px solid black;" width="36%">Día</td>
          <td style="border: 1px solid black;" width="36%">Mes</td>
          <td style="border: 1px solid black;" width="36%">Año</td>
        </tr>
        <tr align="center">
          <td style="border: 1px solid black;">{day}</td>
          <td style="border: 1px solid black;">{month}</td>
          <td style="border: 1px solid black;">{year}</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<br>';
$html = str_replace('{day}',$day, $html);
$html = str_replace('{month}',$month, $html);
$html = str_replace('{year}',$year, $html);

$html .= '<br>
<table>
  <tr>
    <td colspan="4"></td>
  </tr>
  <tr>
    <td width="13%"><b>Cliente:</b></td>
    <td width="37%">'.$factura[4].'</td>
    <td width="9%"><b>Usuario: </b></td>
    <td width="37%"><i>'.$factura[15].'</i></td>
  </tr>
  <tr>
    <td><b>Tipo de Pago:</b></td>
     <td>'.$factura[1].'</td>
    <td colspan="2"></td>
  </tr>
  <tr>
    <td colspan="4"></td>
  </tr>
  <tr>
    <td><b>Comentario:</b></td>
    <td colspan="2"> '.$factura[12].' </td>
    <td></td>
  </tr>
</table>

<br><br><table width="100%">
        <tr>
          <td align="center"><b>Código</b></td>
          <td align="center"><b>Descricpión</b></td>
          <td align="center"><b>Cantidad</b></td>
          <td align="center"><b>Precio</b></td>
          <td align="center"><b>Descuento</b></td>
          <td align="center"><b>Total</b></td>
        </tr>';


foreach ($detalle as $obj) {
  $cl = 'class="salto"'; 
  $tbl = '</table>';
  
  $html .= '<tr>
          <td align="center">'.$obj[3].'</td>
          <td align="center">'.$obj[2].'</td>
          <td align="center">'.$obj[5].'</td>
          <td align="center">'.$obj[4].'</td>
          <td align="center">'.$obj[6].'</td>
          <td align="center">'.$obj[8].'</td>
        </tr>';
  }
  $html .= $tbl;

  $html .= '<br><br><br><table style="border-spacing:  3px;">
  <tr>
    <td width="80%" align="rigth"><b>SUBTOTAL:  </b></td>
    <td width="20%" align="rigth"> ¢ '.$factura[5].'</td>
  </tr>
  <tr>
    <td align="rigth"><b>DESCUENTO:</b>  </td>
    <td align="rigth"> ¢ '.$factura[7].'</td>
  </tr>
  <tr>
    <td align="rigth"><b>FLETE:</b>  </td>
    <td align="rigth"> ¢ '.$factura[8].'</td>
  </tr>
  <tr>
    <td align="rigth"><b>AJUSTE:</b>  </td>
    <td align="rigth"> ¢ '.$factura[9].'</td>
  </tr>
  <tr>
    <td align="rigth"><b>TOTAL:</b>  </td>
    <td align="rigth"> ¢ '.$factura[10].'</td>
  </tr>
</table>';


$html .= '</div>
<script src="../assets/js/jquery.js"></script>
<script src="../assets/js/bootstrap.min.js"></script>
</body>';
print_r($html);

 ?>