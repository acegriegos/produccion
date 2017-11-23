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
            <p class="center-align" style="font-size: 0.8em;">Autorizado mediante la resolución # 11--97 de la Dirección General de Tributación Directa, publicado en el diario La Gaceta #171 el 5 de Setiembre de 1997.
              <br> 
              <span class="leyfooter" style="font-size: 0.8em;">Esta factura constituye Título Ejecutivo de acuerdo al art. 460 del Código de Comercio. <?php echo $msj; ?></span></p><br>
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
'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">'.
'<head>'.

'<meta charset="UTF-8">'.
'<meta http-equiv="X-UA-Compatible" content="IE=edge">'.
'<meta name="viewport" content="width=device-width, initial-scale=1">'.
'<title>FACTURA</title>'.

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
'<br>';

if ($miscelaneos[3]) {
   $html .= '<img src="https://gallery.mailchimp.com/236c3cf9c0e643d2694f51e4c/images/daa0fc73-6e22-4be3-8a43-807258016801.png" width="264" style="max-width:339px;" class="mcnImage">';
}

$html .= '</td>'.
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
$miscelaneos[6].'</div>'.

'</td>'.
'</tr>'.
'</tbody></table>'.

'</td>'.
'</tr>'.
'</tbody></table>'.

'</td>'.
'</tr>'.
'</tbody></table>'.

'<br>'.

// // DIVIISOR TABLA
// '<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">'.
// '<tbody class="mcnDividerBlockOuter">'.
// '<tr>'.
// '<td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">'.
// '<table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">'.
// '<tbody><tr>'.
// '<td>'.
// '<span></span>'.
// '</td>'.
// '</tr>'.
// '</tbody></table>'.
// '</td>'.
// '</tr>'.
// '</tbody>'.
// '</table>'.
// // DIVIISOR TABLA

'<br>'.



'</td>'.
'</tr>'.
'<tr>'.
'<td valign="top" id="templateBody"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">'.

'<tbody class="mcnBoxedTextBlockOuter">'.
'<tr>'.
'<td valign="top" class="mcnBoxedTextBlockInner">'.

'<table align="left" border="0" cellpadding="0" cellspacing="0" width="390" class="mcnBoxedTextContentContainer">'.
'<tbody><tr>'.

'<td class="mcnBoxedTextContentColumn" style="padding-top:9px; padding-right:18px; padding-bottom:9px; padding-left:18px;">'.

'<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="min-width:100% !important;">'.
'<tbody><tr>'.
'<td valign="top" class="mcnTextContent" style="color: #494949;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;">'.
'<div style="text-align: left;"><span style="font-size:18px">Factura Original</span><br>'.
'<br>'.
'<strong>Venta N°</strong> '.$datos[0][0].'<br>'.
'<strong>Factura de: </strong> '.$datos[0][1].'<br>'.
'<strong>Cliente:</strong><br>'.
'<br>'.
$datos[0][4].'<br>'.
'<br>'.
'<strong>Vende:</strong> '.$datos[0][16].'<br>'.
'<strong>Comentario:</strong><br>'.
$datos[0][12].'</div>'.

'</td>'.
'</tr>'.
'</tbody></table>'.
'</td>'.
'</tr>'.
'</tbody></table>'.
'</td><td>'.  //DIVISOR
'<table align="left" border="0" cellpadding="0" cellspacing="0" width="210" class="mcnBoxedTextContentContainer">'.
'<tbody><tr>'.

'<td class="mcnBoxedTextContentColumn" style="padding-top:9px; padding-right:18px; padding-bottom:9px; padding-left:18px;">'.

'<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="min-width:100% !important;">'.
'<tbody><tr>'.
'<td valign="top" class="mcnTextContent" style="color: #494949;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;">'.
'<div style="text-align: center;"><br>'.
'<br>';

if ($datos[0][2] === 'N/A') 
    $html .= '<strong>Plazo en Días: </strong><br>'.$datos[0][11].'<br>';
else
     $html .= '<strong>Tipo de Pago: </strong><br>'.$datos[0][2].'<br>';

$html .= '<br>'.
'<strong>Fecha:</strong>&nbsp;<br>'.
$datos[0][3].'</div>'.
'</td>'.
'</tr>'.
'</tbody></table>'.
'</td>'.
'</tr>'.
'</tbody></table>'.

'</td>'.
'</tr>'.
'</tbody>'.
'</table></td>'.
'</tr>'.
'<tr>'.
'<td valign="top" id="templateFooter"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">'.
'<tbody class="mcnTextBlockOuter">'.
'<tr>'.
'<td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">'.

'<br><br>'.


'<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%;" class="mcnTextContentContainer">'.
'<tbody><tr>'.

'<td valign="top" class="mcnTextContent" style="<<font-size: 14px;text-align: center; padding: 1%;color: #494949;font-family: Helvetica;font-family: Helvetica;" align="center">'.
'<strong>Cantidad</strong>'.
'</td>'.
'<td valign="top" class="mcnTextContent" style="<font-size: 14px;text-align: center; padding: 1%;color: #494949;font-family: Helvetica;" align="center">'.
'<strong>Descripcion</strong>'.
'</td>'.
'<td valign="top" class="mcnTextContent" style="<font-size: 14px;text-align: center; padding: 1%;color: #494949;font-family: Helvetica;" align="center">'.
'<strong>P. Unitario</strong>'.
'</td>'.
'<td valign="top" class="mcnTextContent" style="<font-size: 14px;text-align: center; padding: 1%;color: #494949;font-family: Helvetica;" align="center">'.
'<strong>Tipo</strong>'.
'</td>'.
'<td valign="top" class="mcnTextContent" style="<font-size: 14px;text-align: center; padding: 1%;color: #494949;font-family: Helvetica;" align="center">'.
'<strong>Descuento</strong>'.
'</td>'.
'<td valign="top" class="mcnTextContent" style="<font-size: 14px;text-align: center; padding: 1%;color: #494949;font-family: Helvetica;" align="center">'.
'<strong>Importe</strong>'.
'</td>'.
'</tr>'.
'</tbody></table>'.

'<!-- DETALLE FACTURA -->'.
'<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer"><tbody>';

$grabado = $exento = 0;

foreach ($datos as $obj) {

  if ($obj[28] > 0) 
    $grabado += str_replace(',', '', $obj[22]);
  else
    $exento += str_replace(',', '', $obj[22]);
  
  $html .= '<tr><td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;font-family: Helvetica;font-family: Helvetica;">'.
$obj[29].$obj[18].
'</td>'.
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;font-family: Helvetica;font-family: Helvetica;">'.
$obj[19].
'</td>'.
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;font-family: Helvetica;font-family: Helvetica;">'.
$obj[20].
'</td>'.
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;font-family: Helvetica;font-family: Helvetica;">'.
$obj[23].
'</td>'.

'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;font-family: Helvetica;font-family: Helvetica;">'.
$obj[21].'%'.
'</td>'.
'<td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #494949;font-size: 14px;text-align: center;font-family: Helvetica;font-family: Helvetica;">'.
$obj[22].
'</td>'.
'</tr>';
}


$html .= '</tbody>'.
'</table>'.

'<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">'.
'<tbody class="mcnDividerBlockOuter">'.
'<tr>'.
'<td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">'.
'<table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #EAEAEA;">'.
'<tbody><tr>'.
'<td>'.
'<span></span>'.
'</td>'.
'</tr>'.
'</tbody></table>'.

'</td>'.
'</tr>'.
'</tbody>'.
'</table>'.

'*Producto Exento <table style="width: 100%">';

if ($grabado > 0){

  $html .= '<tr>
    <td></td>
    <td align="right">Grabado:</td>
    <td align="right">'.$datos[15].number_format($grabado+str_replace(',', '', $obj[6]),2).'</td>
  </tr>
  <tr>
    <td></td>
    <td align="right">Impuesto:</td>
    <td align="right">'.$datos[15].$datos[0][5].'</td>
  </tr>';
}

if ($exento > 0) {
  $html .= '<tr>
    <td></td>
    <td align="right">Exento:</td>
    <td align="right">'.$datos[15].number_format($exento,2).'</td>
  </tr>';
}

if (str_replace(',', '', $datos[0][6]) > 0){
  $html .= '<tr>
    <td></td>
    <td align="right">Descuento:</td>
    <td align="right">'.$datos[15].$datos[0][6].'</td>
  </tr>';
} 

if ($datos[0][7] > 0){
  $html .= '<tr>
    <td></td>
    <td align="right">Flete:</td>
    <td align="right">'.$datos[15].number_format($datos[0][7],2).'</td>
  </tr>';
}

if ($datos[0][8] > 0){
  $html .= '<tr>
    <td></td>
    <td align="right">Ajuste:</td>
    <td align="right">'.$datos[15].number_format($datos[0][8],2).'</td>
  </tr>';
} 


$html .= '<tr>
    <td></td>
    <td align="right" style="color: #494949;font-family: Helvetica;"><strong>TOTAL:</strong></td>
    <td align="right" style="color: #494949;font-family: Helvetica;"><strong>'.$datos[15].$datos[0][10].'</strong></td>
  </tr></table>'.



'<!-- /DETALLE FACTURA -->'.

'</td>'.
'</tr>'.
'</tbody>'.
'</table>'.
'</td>'.
'</tr>'.
'</table>'.

'</td>'.
'</tr>'.
'</table>'.
'</center>'.
'</body></html>';
//<br>ESTA FACTURA DEVENGARA INTERES MORATORIA DEL 4% MENSUAL.
$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('../assets/pdf/Factura '.$id.'.pdf','F');

?>