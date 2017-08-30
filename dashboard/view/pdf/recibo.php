<?php
ob_start();

require_once('../_config/rep_TCPDF.php');

class myPDF extends TCPDF {}

// create new PDF document
$pdf = new myPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor(PDF_AUTHOR);
$pdf->SetTitle('Factura Logintech');
$pdf->SetSubject('Factura Logintech');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING, array(0,0,0), array(0,0,0));


// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));


// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(5, 37, 5);
$pdf->SetHeaderMargin(10);
$pdf->SetFooterMargin(70);
$pdf->setPrintFooter(false);
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

$html = '<meta charset="UTF-8">'.
    '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">'.
    '<style type="text/css">'.'*{font-family: "Roboto", sans-serif; color: #303030; font-size: 14px; background: #FAFAFA}'.'</style>'.'<div style="width: 40%;>'.'<table border="0" cellpadding="0" cellspacing="0">'.'<tr>'.'<td colspan="3" align="center">'.'<img src="https://logintechcr.com/img/logo.png" width="200"></img>'.'</td>'.'<td colspan="3">'.'<b>Demostración</b><br><br>'.'<b>Cédula:</b> 3-1015-1444<br>'.'<b>Teléfono:</b> 2265-7354 / 2265-0524<br>'.'<b>Correo:</b> correos.logintechcr@gmail.com<br>'.'<b>Dirección:</b><br>'.'75 mtrs oeste del salón multiusos Barrio Santa Elena, San Joaquín de Flores'.'</td>'.'</tr>'.'<tr><td colspan="6">&nbsp;</td></tr>'.'<tr><td colspan="6">&nbsp;</td></tr>'.'<tr>'.'<td colspan="3">'.'<div style="margin-left: 15%">'.'<h2>Factura Original</h2><br>'.'<b>Venta N°</b> 000027<br>'.'<b>Cliente:</b><br>'.'<br>'.'JUAN DIEGO MIRANDA CASTRO<br>'.'<br>'.'<b>Vende:</b> Super Administradorbr<br>'.'<b>Comentario:</b><br>'.'N/A'.'</div>'.'</td>'.'<td colspan="3">'.'<div style="color: #fff; background: #3960A7; padding: 4.8%; width: 50%;" align="center"><b style="color:"#fff;">Factura de:</b> Contado</div><br>'.'<div style="color: #fff; background: #3960A7; padding: 4.8%; width: 50%;" align="center"><b style="color:"#fff;">Fecha:</b> 28/08/2017</div>'.'</td>'.'</tr>'.'<tr><td colspan="6">&nbsp;</td></tr>'.'<tr><td colspan="6">&nbsp;</td></tr>'.'<tr>'.'<th style="color: #fff; background: #3960A7; padding: 1.8%; width: 15%;">Cantidad</th>'.'<th style="color: #fff; background: #3960A7; padding: 1.8%; width: 25%;">Descricpión</th>'.'<th style="color: #fff; background: #3960A7; padding: 1.8%; width: 15%;">P. Unit</th>'.'<th style="color: #fff; background: #3960A7; padding: 1.8%; width: 15%;">Tipo</th>'.'<th style="color: #fff; background: #3960A7; padding: 1.8%; width: 15%;">Descuento</th>'.'<th style="color: #fff; background: #3960A7; padding: 1.8%; width: 15%;">Importe</th>'.'</tr>'.'<tr>'.'<td style="width: 15%; border-bottom: 1px solid #BCBCBC !important" align="center">3.00</td>'.'<td style="width: 25%; border-bottom: 1px solid #BCBCBC !important" align="center">ASUS VG248QE</td>'.'<td style="width: 15%; border-bottom: 1px solid #BCBCBC !important" align="center">117,614.19</td>'.'<td style="width: 15%; border-bottom: 1px solid #BCBCBC !important" align="center">Unidad</td>'.'<td style="width: 15%; border-bottom: 1px solid #BCBCBC !important" align="center">0.00%</td>'.'<td style="width: 15%; border-bottom: 1px solid #BCBCBC !important" align="center">352,842.57</td>'.'</tr>'.'</table>'.'</div>';
//<br>ESTA FACTURA DEVENGARA INTERES MORATORIA DEL 4% MENSUAL.
$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('../assets/pdf/Factura '.$id.'.pdf','F');

?>