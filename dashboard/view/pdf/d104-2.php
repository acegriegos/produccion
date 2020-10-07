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
$pdf->SetFont('dejavusans', '', 10, '', true);
$pdf->AddPage('L');
$total = 0;

$html = '<!doctype html>'.
'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">'.
'<head>'.

'<meta charset="UTF-8">'.
'<meta http-equiv="X-UA-Compatible" content="IE=edge">'.
'<meta name="viewport" content="width=device-width, initial-scale=1"></head>';

$html .= '<table boridder="0" cellpadding="0" cellspacing="0"> '.
'<tr><td>';
 if ($miscelaneos[3]) {
   $logo = isset($url2) ? str_replace('../', '', $miscelaneos[3]) : $miscelaneos[3];
   $html .= '<img src="'.$logo.'" style="width:150px;height:150px;min-height:150px;float:left">';
 }
$html .= '</td> <td><div style="text-align: center; color: #494949;">';
$fact = $miscelaneos[2] != '' ? $miscelaneos[2] : $miscelaneos[0];
if ($miscelaneos[2] != ''){
  $html .= '<strong>'.$miscelaneos[2].'</strong><br>'.$miscelaneos[0];
}
else
  $html .= '<strong>'.$miscelaneos[0].'</strong>';

$html .= $miscelaneos[1].'</div></td> <td></td> </tr></table> <h4 align="center">Declaración Informativa D104-2 Período '.$datos[0][0].'</h4> <br> ACTIVIDAD: '.$datos[0][10].'-'.$datos[0][11].' <hr> <table><tr><td></td></tr></table> VENTAS <hr> <table cellpadding="0" cellspacing="0" style="width:100%"><tr><td></td><td align="center">Subtotal</td> <td align="center">IVA</td> <td align="center">Total</td> <td align="center">Proporción</td><td align="center">IVA Deducible</td></tr>';

$tprop = $tivad = $tsubt = $tivat = $totcompra = $totgastos = $tsubtc = $tivatc = $totc = $tgastos = $tivac = $tsubtg = $tivatg = $totg = 0;
$listav = $listac = $listag = $totcompra = $totgastos = '';

foreach ($datos as $index=>$obj) {
  
  $tp = $obj[13].' al';//'Gravada al ';

   switch($obj[7]){ //VENTAS
     case 1:
    if($obj[6] == 2){
      $tp = '- NC al ';
      $factor = 0;

      $tsubt += -$obj[4];
      $tivat += -$obj[5];
    }else{
      if(isset($datos[$index+1][0])){
        if($datos[$index+1][6] == 2){
          $tp = '+ '.$obj[13].' al';
          $factor = 0;
          $ants =   number_format($obj[4],2,'.','');
          $antiva = number_format($obj[5],2,'.','');
          $antt =   number_format($obj[3],2,'.','');
        }else
          $factor = $obj[3] /$obj[1];
      }else{
        $factor = $obj[3]/$obj[1];
      }

      $tsubt += $obj[4];
      $tivat += $obj[5];
    }
      
    $ltpro = $factor*100;
    $ldiva = $obj[2]*$factor;

    $tprop += $ltpro;
    $tivad += $ldiva;

    $listav .=  '<tr> <td>'.$tp.' '.$obj[2].'%</td> <td align="right">'.number_format($obj[4],2).' </td> <td align="right">'.number_format($obj[5],2).' </td> <td align="right">'.number_format($obj[3],2).'</td> <td align="right">'.number_format($ltpro,2).'%</td> <td align="right">'.number_format($ldiva,2).'%</td> </tr>';

    if($obj[6] == 2){
      $factor = ($antt-$obj[3])/$obj[1];
      $ltpro = $factor*100;
      $ldiva = $obj[2]*$factor;

      $tprop += $ltpro;
      $tivad += $ldiva;

      $listav .=  '<tr> <td>: '.$obj[2].'%</td> <td align="right">'.number_format($ants-$obj[4],2).' </td> <td align="right">'.number_format($antiva-$obj[5],2).' </td> <td align="right">'.number_format($antt-$obj[3],2).'</td> <td align="right">'.number_format($ltpro,2).'%</td> <td align="right">'.number_format($ldiva,2).'%</td> </tr>';    
    }
    break;
  case 2: //COMPRAS
    if($obj[6] == 2)
      $tp = '- NC al ';

    $livacr = $obj[4]*(round($tivad,2)/100);
    $livacr = $obj[2] ? /*$livacr*/ $obj[2] < $tivad ? $obj[5] : $livacr : 0;
    $listac .=  '<tr> <td>'.$tp.' '.$obj[2].'%</td> <td align="right">'.number_format($obj[4],2).' </td> <td align="right">'.number_format($obj[5],2).' </td> <td align="right">'.number_format($obj[3],2).'</td> <td align="right"></td> <td align="right">'.number_format(round($livacr,0),2).'</td> </tr>';

    $tsubtc += $obj[4];
    $tivatc += $obj[5];
    $totc   += $obj[3];
    $tivac  += $livacr;
    
    break;
  case 3: //GASTOS
    if($obj[6] == 2)
      $tp = '- NC al ';

    //$listag .=  '<tr> <td></td> <td align="right">'.number_format($obj[4],2).' </td> <td align="right">'.number_format($obj[5],2).' </td> <td align="right">'.number_format($obj[3],2).'</td> </tr>';

    $tsubtg     += $obj[4];
    $tivatg     += $obj[5];
    $tgastos  += $obj[3];

    break;
  }
}

$html .= $listav.'<tr> <td colspan="6"></td> </tr> <tr> <td><b>TOTAL (CRC)</b></td> <td align="right">'.number_format($tsubt,2).'</td> <td align="right">'.number_format($tivat,2).'</td>  <td align="right">'.number_format($datos[0][1],2).'</td> <td align="right">'.number_format($tprop,2).'%</td> <td align="right"><b>'.number_format($tivad,2).'</b>%</td> </tr> ';


$html .= '<br> COMPRAS <hr> <table cellpadding="0" cellspacing="0" style="width:100%"><tr><td></td><td align="center">Subtotal</td> <td align="center">IVA</td> <td align="center">Total</td> <td align="center"></td> <td align="center">IVA Acreditable</td> </tr>'.$listac.'<tr> <td colspan="6"></td> </tr> <tr> <td><b>TOTAL (CRC)</b></td> <td align="right">'.number_format($tsubtc,2).'</td> <td align="right">'.number_format($tivatc,2).'</td>  <td align="right">'.number_format($totc,2).'</td> <td align="right"></td> <td align="right">'.number_format(round($tivac,0),2).'</td> </tr></table> <table><tr><td></td></tr></table> GASTOS <hr> <table cellpadding="0" cellspacing="0" style="width:100%"><tr><td></td><td align="center">Subtotal</td> <td align="center">IVA</td> <td align="center">Gasto Aplicable</td> </tr>'.$listag.' <tr> <td colspan="6"></td> </tr> <tr> <td><b>TOTAL (CRC)</b></td> <td align="right">'.number_format($tsubtg,2).'</td> <td align="right">'.number_format($tivatg,2).'</td> <td align="right">'.number_format($tgastos,2).'</td> </tr> </table>';
$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('../assets/pdf/D104-2_'.$fact.'_'.date('Y-m').'.pdf','I');

?>