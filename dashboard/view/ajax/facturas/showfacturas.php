<?php
ob_start();

require_once('../_config/rep_TCPDF.php');

class myPDF extends TCPDF {

    var $tfactura;
    var $fe;
    var $credito;

    function __construct()
    {
        parent::__construct();
    }

    public function setData($arrData){
      $this->tfactura = $arrData['tfactura'];
      $this->credito = $arrData['credito'];
      $this->fe = $arrData['fe'];
    }

    public function Footer() {
        switch($this->tfactura){
          case 1:
          $msj = $this->credito == 2 ? 'Renuncio mi domicilio y los trámites de juicio ejectivo. Al mismo tiempo doy por aceptadas las condiciones del codigo del comercio según artículo 460. Todo reclamo debe hacerse antes de 5 días hábiles. Acepto ser incluído en la red nacional de créditos' : 'Esta factura constituye Título Ejecutivo de acuerdo al art. 460 del Código de Comercio.';
          break;
          case 4:
          $msj = 'La presente Cotización tiene una durabilidad de OCHO días.';
          break;
          default:
          $msj = '';
          break;
        } 

        $html = '<div align="center">';
          if ($this->fe != '') {
           $html .= '<p class="center-align" style="font-size: 0.8em;">AUTORIZADO MEDIANTE RESOLUCION No DGT-R-033-2019 del 20 DE JUNIO 2019
              <br>Versión API Hacienda: 4.3<br> 
              <span class="leyfooter" style="font-size: 0.8em;">'.$msj.'</span></p><br>
            </div>';
          }else{
            $html .= '<p class="center-align" style="font-size: 0.8em;">'.$msj.'</p>';
          }

        $this->writeHTML($html, true, false, true, false, '');
    }
}

// create new PDF document
$pdf = new myPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
// set document information
// $pdf->SetCreator(PDF_CREATOR);
// $pdf->SetAuthor(PDF_AUTHOR);
$pdf->SetTitle('pv');
$pdf->SetSubject('pv');
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
$pdf->SetFont('dejavusans', '', 10, '', true);

$width = 76;  
$height = 50; 
$pageLayout = array($width, $height);
$pdf->AddPage('P',$pageLayout);
$total = 0;

$html = 'hola';
//<br>ESTA FACTURA DEVENGARA INTERES MORATORIA DEL 4% MENSUAL.
$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('../assets/pdf/printme.pdf','I');

?>