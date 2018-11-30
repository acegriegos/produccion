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
$pdf->setPrintFooter(false);
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

$html .= '</td> <td></td> <td><div style="text-align: left; color: #494949;">'.
'<strong>'.$miscelaneos[0].'</strong><br>';

if($miscelaneos[2] != '') 
  $html .= '<strong>'.$miscelaneos[2].'</strong><br>';

$html .= '<strong>Cédula:</strong> '.$miscelaneos[1].'<br>'.
'<strong>Teléfono:</strong> '.$miscelaneos[5].'<br>'.
'<strong>Correo:</strong> '.$miscelaneos[4].'<br>'.
'<strong>Dirección:</strong><br>'.
$miscelaneos[6].'</div>';
$html .= '</td></tr></table>';

$html .= '<br><br><b>Documento Electrónico N°</b>'.$datos[0][14].
         '<br><b>Consecutivo N°</b>'.$datos[0][1].
         '<br><b>Factura N°</b>'.$datos[0][13].'<br><br><br><br>'.
         '<table><tr><td>'.
         '<b>Cliente: </b>'.$datos[0][4].'<br>'.
         '<b>Usuario: </b>'.$datos[0][10].
         '</td><td>'.
         '<table><tr>';
        if($datos[0][8])
          $html .= '<td align="center" style="width: 40%; margin-left:5%; max-heigth: 30px;"><div style="background-color: #3960A7;color: white;width:20px;heigth:20px;padding:0px"><p>Tipo de Pago: '.$datos[0][8].'</p></div></td>';
        else
          $html .= '<td></td>';
         $html .= '<td align="center" style="width: 40%; margin-left:5%; max-heigth: 30px;"><div style="background-color: #3960A7;color: white;width:15px;"><p>Fecha: '.$datos[0][3].'</p></div>'.
         '</td></tr></table>'.
         '</td></tr></table>';

         $html .= ' <table style="font-size: 1.1em;">
          <tr style="background-color: #3960A7; border: 0px;color: white;heigth">
            <th align="center">Tipo de movimiento</th>
            <th align="center">Fecha</th>
            <th align="center">Saldo anterior</th>
            <th align="center">Monto </th>
            <th align="center">Saldo actual</th>
          </tr>
    </table>';


$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('../assets/pdf/Factura '.$id.'.pdf','I');

?>