<?php
ob_start();

require_once('../_config/rep_TCPDF.php');

class myPDF extends TCPDF {

    function __construct()
    {
        parent::__construct();
    }

    public function Footer() {
        $html = '<div align="center">
            <br>
            </div>';

        $this->writeHTML($html, true, false, true, false, '');
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
// $pdf->SetMargins(5, 2, 5);
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
$pdf->AddPage();
$total = 0;

$html = '<!doctype html>'.
'<head>'.

'<meta charset="UTF-8">'.
'<meta http-equiv="X-UA-Compatible" content="IE=edge">'.
'<meta name="viewport" content="width=device-width, initial-scale=1">'.
'<title>Recibo</title>'.

'</head>'.
'<body style="width: 100%"; >'.
'<center>'.
'<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">'.
'<tr>'.
'<td align="left" valign="top" id="bodyCell">'.

'<table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">'.
'<tr>'.
'<td valign="top" id="templateHeader"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">'.
'<tbody class="mcnCaptionBlockOuter">'.
'<tr>'.
'<td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">'.

'<table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightContentOuter" width="100%">'.
'<tbody><tr>'.
'<td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px ;">'.

'<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightImageContentContainer">'.
'<tbody><tr>'.
'<td class="mcnCaptionRightImageContent" valign="top">'.
'<br>'.

'<img src="https://gallery.mailchimp.com/236c3cf9c0e643d2694f51e4c/images/daa0fc73-6e22-4be3-8a43-807258016801.png" width="264" style="max-width:339px;" class="mcnImage">'.

'</td>'.
'</tr>'.
'</tbody></table>'.
'</td><td>'.  //DIVISOR
'<table class="mcnCaptionRightTextContentContainer" align="right" border="0" cellpadding="0" cellspacing="0" width="264"> '.
'<tbody><tr>'.
'<td valign="top" class="mcnTextContent" style="font-size: 13px;font-family: Helvetica;">'.
'<div style="text-align: left; color: #494949;">'.
'<strong>'.$miscelaneos[0].'</strong><br>';

if($miscelaneos[2] != '') 
  $html .= '<strong>'.$miscelaneos[2].'</strong><br>';

$html .= '<strong>Cédula:</strong> '.$miscelaneos[1].'<br>'.
'<strong>Teléfono:</strong> '.$miscelaneos[5].'<br>'.
'<strong>Correo:</strong> '.$miscelaneos[4].'<br>'.
'<strong>Dirección:</strong><br>'.
$miscelaneos[6].'</div></html>';
//<br>ESTA FACTURA DEVENGARA INTERES MORATORIA DEL 4% MENSUAL.
$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('../assets/pdf/Factura '.$id.'.pdf','I');

?>