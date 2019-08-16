<?php
ob_start();
$ubic = '../';
if (isset($url2)) 
  $ubic = '';

require_once($ubic.'_config/rep_TCPDF.php');

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
$pdf->SetFooterMargin(25);
$pdf->setPrintFooter(true);
$pdf->setPrintHeader(false);
// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, 0);
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
  require_once(dirname(__FILE__).'/lang/eng.php');
  $pdf->setLanguageArray($l);
}

$pdf->setFontSubsetting(true);
$pdf->SetFont('dejavusans', '', 10, '', true);
$pdf->AddPage('L');
$total = 0;

$html = '<!doctype html>'.
'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">'.
'<head>'.

'<meta charset="UTF-8">'.
'<meta http-equiv="X-UA-Compatible" content="IE=edge">'.
'<meta name="viewport" content="width=device-width, initial-scale=1"></head>';

$html .= '<table align="right" boridder="0" cellpadding="0" cellspacing="0"> '.
'<tr><td>';
if ($miscelaneos[3]) {
  $logo = isset($url2) ? str_replace('../', '', $miscelaneos[3]) : $miscelaneos[3];
  $html .= '<img src="'.$logo.'" width="264" style="max-width:339px;">';
}
$html .=  '</td><td valign="top" style="font-size: 13px;font-family: Helvetica;">'.
'<div style="text-align: center; color: #494949;">';
$fact = $miscelaneos[2] != '' ? $miscelaneos[2] : $miscelaneos[0];
   if ($miscelaneos[2] != ''){
      $html .= '<strong>'.$miscelaneos[2].'</strong><br>'.$miscelaneos[0].'<br>';
   }
   else
      $html .= '<strong>'.$miscelaneos[0].'</strong><br>';

$html .= '<strong>Cédula:</strong> '.$miscelaneos[1].'<br>'.
'<strong>Teléfono:</strong> '.$miscelaneos[5].'<br>'.
'<strong>Correo:</strong> '.$miscelaneos[4].'<br>'.
'<strong>Dirección:</strong>'.
$miscelaneos[6].'</div>'.

'</td><td></td>'.
'</tr>
<tr>
  <td align="center" colspan="3"><br><br><b>'.$tit.'</b><br>'.$filtros.'</td></tr>
  <tr><td colspan="3"><br><br>
    <table style="border: 1px solid #e2e2e2">';

$rsocial = '';

for($i = 0; $i<sizeof($datos);$i++){
  if($rsocial != $datos[$i][7]){
    $rsocial = $datos[$i][7];
    $suma = 0;
    $html .= '<tr><td colspan="4" align="left"><b>'.$rsocial.'</b></td></tr><tr style="font-size: 13px;font-family: Helvetica;">
          <td align="center" width="10%" style="border: 1px solid #e2e2e2;"><b>Factura</b></td>
          <td align="center" width="10%" style="border: 1px solid #e2e2e2;"><b>Fecha</b></td>
          <td align="center" width="10%" style="border: 1px solid #e2e2e2;"><b>Vence</b></td>
          <td align="center" width="10%" style="border: 1px solid #e2e2e2;"><b>Días</b></td>
          <td align="center" width="10%" style="border: 1px solid #e2e2e2;"><b>Monto</b></td>
          <td align="center" width="10%" style="border: 1px solid #e2e2e2;"><b>Abonos</b></td>
          <td align="center" width="10%" style="border: 1px solid #e2e2e2;"><b>NC</b></td>
          <td align="center" width="10%" style="border: 1px solid #e2e2e2;"><b>ND</b></td>
          <td align="center" width="10%" style="border: 1px solid #e2e2e2;"><b>Saldo</b></td>
          <td align="center" width="10%" style="border: 1px solid #e2e2e2;"><b>Total</b></td>
      </tr>';
  }

  $suma += $datos[$i][6];
  $html .= '
      <tr>
          <td align="center" style="border:1px solid #e2e2e2">'.$datos[$i][0].'</td>
          <td align="center" style="border:1px solid #e2e2e2">'.$datos[$i][1].'</td>
          <td align="center" style="border:1px solid #e2e2e2">'.$datos[$i][10].'</td>
          <td align="center" style="border:1px solid #e2e2e2">'.$datos[$i][11].'</td>
          <td style="border:1px solid #e2e2e2">'.number_format($datos[$i][2],2).'</td>
          <td style="border:1px solid #e2e2e2">'.number_format($datos[$i][3],2).'</td>
          <td style="border:1px solid #e2e2e2">'.number_format($datos[$i][4],2).'</td>
          <td style="border:1px solid #e2e2e2">'.number_format($datos[$i][5],2).'</td>
          <td style="border:1px solid #e2e2e2">'.number_format($datos[$i][6],2).'</td>
          <td style="border:1px solid #e2e2e2">'.number_format($suma,2).'</td>
      </tr>';

}

$html .= '</table></td></tr></table>';


//<br>ESTA FACTURA DEVENGARA INTERES MORATORIA DEL 4% MENSUAL.
$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output($ubic.'assets/pdf/Estado Cuenta.pdf','I');

?>