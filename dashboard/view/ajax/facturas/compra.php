<?php

require_once('../../../_config/rep_TCPDF.php');

// $factura = $transaccion[0][0];
$miscelaneos = $transaccion[1];

class myPDF extends TCPDF {

   function __construct($miscelaneos)
    {
      $this->datos = $miscelaneos;
      parent::__construct();
    }
  public function Header() {
         $html = '<table>
          <tr>
            <td width="30%">
              <img src="" >
            </td>
            <td align="center" width="36%">
              <font size="10"><b></b></font>
              <i>Cédula <br>
              Teléfono: <br>
              E-mail: </i><br>
              Dirección: 
              <br>
              <br>
              <b>Compra de  </b>
            </td>
            <td align="center">
              Compra N° <span style="color: red"> </span> <br>
              
              
            </td>
          </tr>
        </table>
        <br>';
  
      // print a block of text using Write()
      $this->writeHTML($html, true, false, true, false, '');
      }
}

// create new PDF document
$pdf = new myPDF($miscelaneos,PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

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
$pdf->SetMargins(5, 33, 5);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(0);
$pdf->setPrintFooter(false);
// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, 0);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
  require_once(dirname(__FILE__).'/lang/eng.php');
  $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set default font subsetting mode
$pdf->setFontSubsetting(true);

// Set font
// dejavusans is a UTF-8 Unicode font, if you only need to
// print standard ASCII chars, you can use core fonts like
// helvetica or times to reduce file size.
$pdf->SetFont('dejavusans', '', 10, '', true);

// Add a page
// This method has several options, check the source code documentation for more information.
$pdf->AddPage();

$html = '
<table>
  <tr>
    <td>Fecha: </td>
    <td></td>
  </tr>
  <tr>
    <td>Proveedor: </td>
    <td></td>
  </tr>
  <tr>
    <td>Orden de Compra: </td>
    <td></td>
  </tr>
  <tr>
    <td>Tipo de Pago: </td>
    <td></td>
  </tr>
</table>
<br><br><br><br>
<table>
  <tr>
    <td style="border: 1px solid black;" align="center" width="10%">Código</td>
    <td style="border: 1px solid black;" align="center" width="48%">Descripción</td>
    <td style="border: 1px solid black;" align="center" width="15%">Cantidad</td>
    <td style="border: 1px solid black;" align="center" width="10%">Costo Bruto</td>
    <td style="border: 1px solid black;" align="center" width="17%">Costo Neto</td>
    <td style="border: 1px solid black;" align="center" width="17%">Sub Bruto</td>
    <td style="border: 1px solid black;" align="center" width="17%">Precio Venta</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;" align="center" height="550px"><br></td>
    <td style="border: 1px solid black;"><br></td>
    <td style="border: 1px solid black;" align="center"><br></td>
    <td style="border: 1px solid black;" align="center"><br></td>
    <td style="border: 1px solid black;" align="right"><br></td>
  </tr></table><br><br>';
$html.= '<table>
  <tr>
    <td width="83%" align="rigth">Sub-Total:  </td>
    <td style="border: 1px solid black;" width="17%" align="rigth"> </td>
  </tr>
  <tr>
    <td align="rigth">13% IV:  </td>
    <td style="border: 1px solid black;" align="rigth"> </td>
  </tr>
  <tr>
    <td align="rigth">Descuento:  </td>
    <td style="border: 1px solid black;" align="rigth"> </td>
  </tr>
  <tr>
    <td align="rigth">Flete:  </td>
    <td style="border: 1px solid black;" align="rigth"> </td>
  </tr>
  <tr>
    <td align="rigth"><b>TOTAL GENERAL:</b>  </td>
    <td style="border: 1px solid black;" align="rigth"> </td>
  </tr>
</table>
<br><br><br><br>
<br><br>
';

$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('Factura '.$factura[0][0].'.pdf', 'I');

?>