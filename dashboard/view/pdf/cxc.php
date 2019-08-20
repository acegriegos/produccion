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
/*if ($miscelaneos[3]) {
  $logo = isset($url2) ? str_replace('../', '', $miscelaneos[3]) : $miscelaneos[3];
  $html .= '<img src="'.$logo.'" width="264" style="max-width:339px;">';
}*/
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

'</td><td> <strong>Fecha del Reporte: </strong>'.date('d-m-Y H:i a').'</td>'.
'</tr>
<tr>
  <td align="center" colspan="3"><br><br><b>'.$tit.'</b><br>'.$filtros.'</td></tr>
  <tr><td colspan="3"><br><br>
    <table style="border: 1px solid #e2e2e2">';

$rsocial = '';
$svm30 = $sv30 = $sv15 = $sv8 = $sv1 = $sv0 = $ssv = 0;
$spvm30 = $spv30 = $spv15 = $spv8 = $spv1 = $sv = 0;

for($i = 0; $i<sizeof($datos);$i++){
  if($rsocial != $datos[$i][7]){
    $rsocial = $datos[$i][7];
    $suma = 0;
    $html .= '<tr><td colspan="7" align="left"><br><br><b>'.$rsocial.'</b></td> <td colspan="3" align="left"><br><br>TEL: '.$datos[$i][12].'</td></tr><tr style="font-size: 13px;font-family: Helvetica;">
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
          <td style="border:1px solid #e2e2e2">'.$datos[$i][13].number_format($suma,2).'</td>
      </tr>';

 if($datos[$i][11] <= 0){
  $sv += $datos[$i][6];

  if($datos[$i][11] == 0)
    $sv0 += $datos[$i][6];
  elseif($datos[$i][11] == -1)
    $sv1 += $datos[$i][6];
  elseif($datos[$i][11] < -1 && $datos[$i][11] >= -8)
    $sv8 += $datos[$i][6];
  elseif($datos[$i][11] < -8 && $datos[$i][11] >= -15)
    $sv15 += $datos[$i][6];
  elseif($datos[$i][11] < -15 && $datos[$i][11] >= -30)
    $sv30 += $datos[$i][6];
  else
    $svm30 += $datos[$i][6];
 }else
  $ssv += $datos[$i][6];

  if($datos[$i][11] == 1)
    $spv1 += $datos[$i][6];
  elseif($datos[$i][11] > 1 && $datos[$i][11] <= 8)
    $spv8 += $datos[$i][6];
  elseif($datos[$i][11] > 8 && $datos[$i][11] <= 15)
    $spv15 += $datos[$i][6];
  elseif($datos[$i][11] > 15 && $datos[$i][11] <= 30)
    $spv30 += $datos[$i][6];
  else
    $spvm30 += $datos[$i][6];
}

$html .= '<tr> <td colspan="2" align="left"><br><br><br><br> <br> <b>Saldo por Vencer 1 Dia:</b> <br> <b>Saldo por Vencer 8 Dias</b> <br> <b>Saldo por Vencer 15 Dias</b> <br> <b>Saldo por Vencer 30 Dias</b> <br> <b>Saldo por Vencer +30 Dias</b> <br> <b>Saldo sin Vencer:</b> </td> <td colspan="2" align="right"><br><br><br><br> <br>'.number_format($spv1,2).' <br>'.number_format($spv8,2).' <br>'.number_format($spv15,2).' <br>'.number_format($spv30,2).' <br>'.number_format($spvm30,2).' <br> '.number_format($ssv,2).'</td> <td></td> <td colspan="2" align="left"><br><br><br><br> <b>Saldo Vencido Hoy:</b> <br> <b>Saldo Vencido 1 Dia:</b> <br> <b>Saldo Vencido 8 Dias</b> <br> <b>Saldo Vencido 15 Dias</b> <br> <b>Saldo Vencido 30 Dias</b> <br> <b>Saldo Vencido +30 Dias</b> <br> <b>Saldo Vencido:</b></td> <td colspan="2" align="right"><br><br><br><br>'.number_format($sv0,2).' <br>'.number_format($sv1,2).' <br>'.number_format($sv8,2).' <br>'.number_format($sv15,2).' <br>'.number_format($sv30,2).' <br>'.number_format($svm30,2).' <br> '.number_format($sv,2).'</td> </tr></table></td></tr></table>';


//<br>ESTA FACTURA DEVENGARA INTERES MORATORIA DEL 4% MENSUAL.
$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output($ubic.'assets/pdf/Estado Cuenta_'.$fact.'_'.date('YmdHis').'.pdf','F');

echo json_encode('Estado Cuenta_'.$fact.'_'.date('YmdHis').'.pdf');

?>