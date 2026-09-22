<?php
ob_start();

require_once('../_config/rep_TCPDF.php');

class myPDF extends TCPDF {

    function __construct()
    {
        parent::__construct();
    }
}

// create new PDF document
$pdf = new myPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
// set document information
// $pdf->SetCreator(PDF_CREATOR);
// $pdf->SetAuthor(PDF_AUTHOR);
$pdf->SetTitle($tit);
$pdf->SetSubject($tit);
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING, array(0,0,0), array(0,0,0));


// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));


// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(5, 5, 5);
$pdf->SetHeaderMargin(10);
$pdf->SetFooterMargin(5);
$pdf->setPrintFooter(true);
$pdf->setPrintHeader(false);
// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, 5);
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
  require_once(dirname(__FILE__).'/lang/eng.php');
  $pdf->setLanguageArray($l);
}

$pdf->setFontSubsetting(true);
$pdf->SetFont('dejavusans', '', 8, '', true);
$pdf->AddPage('P');
$total = 0;

$datos = $transaccion[0];

$_cabeza = '<!doctype html>'.
'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">'.
'<head>'.
'<meta charset="UTF-8">'.
'<meta http-equiv="X-UA-Compatible" content="IE=edge">'.
'<meta name="viewport" content="width=device-width, initial-scale=1"></head>';

$_header = '<body> <table align="right" boridder="0" cellpadding="0" cellspacing="0"> '.
'<tr><td align="left" style="width:30%">';
if ($miscelaneos[3]) {
  $logo = isset($url2) ? str_replace('../', '', $miscelaneos[3]) : $miscelaneos[3];
  $_header .= '<img src="'.$logo.'" style="width:100px;height:100px;min-height:150px">';
}
$_header .=  '</td><td valign="top" style="font-size: 12px;font-family: Helvetica;width: 40%">'.
'<div style="text-align: center; color: #494949;">';
$fact = $miscelaneos[2] != '' ? $miscelaneos[2] : $miscelaneos[0];
if ($miscelaneos[2] != ''){
  $_header .= '<strong>'.$miscelaneos[2].'</strong><br>'.$miscelaneos[0].'<br>';
}
else
  $_header .= '<strong>'.$miscelaneos[0].'</strong><br>';

$_header .= '</div>'.
'</td> <td style="width:30%"> <div style="border-radius: 30px;width: 50%;text-align:center;background-color:#698FCD; color:white"><br>Detalle de boleta de pago # '.$datos[0].' <br></div> </td>'.
'</tr> </table> <hr> <table> <tr> <td colspan="2"> <div> Empleado: '.$datos[1].'  <br> Cédula: '.$datos[2].' <br> '.$datos[13].'</div> </td> <td>  <div style="text-align: center"> '.$datos[4].' <br> Fecha de Pago: '.$datos[3].' <br>  Desde '.$datos[11].' hasta '.$datos[12].'</div> </td> </tr> </table> <br> <hr> <br>';

$total_deduccion = 0;
$str_deduccion   = '';
$ciclos          = 0;

foreach ($transaccion as $key => $obj) {
  if($obj[8] != 'CCSS'){
    $str_deduccion .= '<tr> 
      <td style="border: 1px solid #e2e2e2">'.$obj[8].'</td> 
      <td style="border: 1px solid #e2e2e2; text-align: right">'.number_format($obj[9],2).'</td>
      <td style="border: 1px solid #e2e2e2; text-align: right">'.number_format($obj[10],2).'</td> 
    </tr>';
    $ciclos++;
  }

  $total_deduccion += $obj[10];
}
$mostrar_deduccion = $ciclos > 0 ? '' : 'style="display:none"';


$_cuerpo = '<div style="text-align:center; display: none">Su Salario fue depositado en el número de cuenta: 12345678910, del banco: BANCO NACIONAL, se desglosa a continuación </div>
  <table style="display:none"> 

    <tr>
      <td style="width:20%"></td>
      <td style="width:60%">
        <div style="background-color:#BBCBED;"><br>
          <table>
            <tr>
              <td>CANTIDAD HORAS LABORADAS:</td>
              <td style="text-align: right">'.$datos[5].'</td>
            </tr>
            <tr>
              <td>CANTIDAD HORAS EXTRAS:</td>
              <td style="text-align: right">'.$datos[6].'</td>
            </tr>
            <tr>
              <td>CANTIDAD DÍAS VACACIONES:</td>
              <td style="text-align: right">'.$datos[14].'</td>
            </tr>
            <tr>
              <td>CANTIDAD DÍAS INCAPACIDAD:</td>
              <td style="text-align: right">'.$datos[15].'</td>
            </tr>
          </table></div>
      </td>
      <td style="width:20%"></td>
    </tr>
  </table>

  <br><br> 
  <table> 
    <tr> 
      <td style="width:10%"></td>
      <td style="width:80%"> 
        <table style="display:none"> 
          <tr> 
            <td style="color: #494949;font-size:16px">INGRESOS</td> 
            <td></td> 
          </tr> 
          <tr style="background-color:#BBCBED"> 
            <td style="border: 1px solid #e2e2e2;text-align:center"><b>RUBRO</b></td>  
            <td style="border: 1px solid #e2e2e2;text-align:center"><b>VALOR</b></td> 
          </tr> 
          <tr> 
            <td style="border: 1px solid #e2e2e2">SALARIO BASE</td>  
            <td style="border: 1px solid #e2e2e2; text-align: right">'.number_format($datos[7],2).'</td> 
          </tr> 
          <tr style="background-color:#BBCBED; display: none"> 
            <td style="border: 1px solid #e2e2e2">HORAS LABORADAS</td>  
            <td style="border: 1px solid #e2e2e2; text-align: right">0.00</td> 
          </tr> 
          <tr style="background-color:#BBCBED"> 
            <td>EXTRAS</td>  
            <td style="border: 1px solid #e2e2e2; text-align: right">0.00</td> 
          </tr>  
       </table>
     </td> 
     <td style="width:20%"></td> 
    </tr> 
  </table>
 <br><br>
  <table '.$mostrar_deduccion.'> 
    <tr>
      <td style="width:10%"></td> 
      <td style="width:80%"> 
        <table>
          <tr>
            <td style="color: #494949;font-size:16px">DEDUCCIONES</td>
            <td></td> 
            <td></td>
          </tr> 
          <tr style="background-color:#BBCBED"> 
            <td style="border: 1px solid #e2e2e2;text-align:center"><b>RUBRO</b></td>
            <td style="border: 1px solid #e2e2e2;text-align:center"><b>PORCENTAJE</b></td>  
            <td style="border: 1px solid #e2e2e2;text-align:center"><b>TOTAL</b></td> 
          </tr>'; 

       $_cuerpo .= $str_deduccion.'</table>
      </td> 
      <td></td> 
    </tr> 
  </table>
  <br><br><br>
  <table>
    <tr>
      <td style="width: 30%; display: none">
        <table style="border:1px solid #e2e2e2">
          <tr>
            <td style="color::#BBCBED;text-align:center">DEVENGADO TOTAL</td>
          </tr>
          <tr>
            <td style="text-align:center">¢ '.number_format($datos[7],2).'</td>
          </tr>
        </table>
      </td>
      <td style="width: 30%">
        <table style="border:1px solid #e2e2e2; ; display: none">
          <tr>
            <td style="color::#BBCBED;text-align:center">DEDUCCIONES TOTALES</td>
          </tr>
          <tr>
            <td style="text-align:center;color:red">¢ -'.number_format($total_deduccion,2).'</td>
          </tr>
        </table>
      </td>
      <td style="width: 30%">
        <table style="border:1px solid #e2e2e2">
          <tr>
            <td style="color::#BBCBED;text-align:center">TOTAL NETO</td>
          </tr>
          <tr>
            <td style="text-align:center">¢ '.number_format($datos[7]-$total_deduccion,2).'</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>';

 $_cuerpo .= '</tbody> 
</table>';

$html = $_cabeza.$_header.$_filtros.$_cuerpo;
$pdf->writeHTML($html.'</body></html>', true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$ver = isset($_REQUEST['arreglo']['show']) ? 'I' : 'F';
$pdf->Output('../assets/pdf/COLILLA '.$datos[1].' '.$datos[0].'.pdf',$ver);

if($ver == 'F')
  echo json_encode([
    'empleado' => $datos[1],
    'consecutivo' => $datos[0],
    'fecha' => $datos[3]
  ]) ;

?>