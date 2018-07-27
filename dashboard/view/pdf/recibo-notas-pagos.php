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
            <p class="center-align" style="font-size: 0.8em;">Autorizado mediante la resolución DGT-R-48-2016 de la Dirección General de Tributación Directa, 07-10-2016.
              <br> 
              <span class="leyfooter" style="font-size: 0.8em;">Esta factura constituye Título Ejecutivo de acuerdo al art. 460 del Código de Comercio. <?php echo $msj; ?></span></p><br>
            </div>';

        $this->writeHTML($html, true, false, true, false, '');
    }
}

// create new PDF document
$pdf = new myPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

$pdf->SetTitle($tit);
$pdf->SetSubject($tit);
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

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
$pdf->SetFont('helvetica', '', 10, '', true);
$pdf->AddPage('L');
$total = 0;
$html = '<table><tr><td>';
if ($miscelaneos[3]) {
   $html .= '<img src="'.$miscelaneos[3].'" width="264" style="max-width:339px;" class="mcnImage">';
}

$html .= '</td> <td></td> </td><td><div style="text-align: left; color: #494949;">'.
'<strong>'.$miscelaneos[0].'</strong><br>';

if($miscelaneos[2] != '') 
  $html .= '<strong>'.$miscelaneos[2].'</strong><br>';

$html .= '<strong>Cédula:</strong> '.$miscelaneos[1].'<br>'.
'<strong>Teléfono:</strong> '.$miscelaneos[5].'<br>'.
'<strong>Correo:</strong> '.$miscelaneos[4].'<br>'.
'<strong>Dirección:</strong><br>'.
$miscelaneos[6].'</div>';
$html .= '<tr></table>';
//<br>ESTA FACTURA DEVENGARA INTERES MORATORIA DEL 4% MENSUAL.
$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('../assets/pdf/Factura '.$id.'.pdf','I');

?>