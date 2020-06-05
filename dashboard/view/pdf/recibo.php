<?php
ob_start();
$ubic = '../';
if (isset($url2)) 
  $ubic = '';

require_once($ubic.'_config/rep_TCPDF.php');
include_once '../assets/libs/qr/barcode.php'; 
$generator = new barcode_generator();

class myPDF extends TCPDF {

    var $tfactura;
    var $fe;
    var $credito;
    var $generator;
    var $m1;
    var $m2;

    function __construct()
    {
        parent::__construct();
    }

    public function setGen(&$gen){
      $this->generator = $gen;
    }

    public function setData($arrData){
      $this->tfactura = $arrData['tfactura'];
      $this->credito = $arrData['credito'];
      $this->fe = $arrData['fe'];
      $this->m1 = $arrData['m1'];
      $this->m2 = $arrData['m2'];
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

        $html = '<hr><div align="center">';

        $params = $this->serializeTCPDFtagParameters(array('CODE 128', 'C128', '', '', 80, 30, 0.4, array('position'=>'S', 'border'=>true, 'padding'=>4, 'fgcolor'=>array(0,0,0), 'bgcolor'=>array(255,255,255), 'text'=>true, 'font'=>'helvetica', 'fontsize'=>8, 'stretchtext'=>4), 'N'));
          $html .= '<tcpdf method="write1DBarcode" params="'.$params.'" />';

          if ($this->m1 != '')  
            $html .= '<span style="font-size: 12px;"><b>'.$this->m1.'</b></span>';

          if ($this->m2 != '')
            $html .= '<p style="font-size: 12px;"><b>'.$this->m2.'</b></p>';

          if ($this->fe != '') {
           $html .= '<p class="center-align" style="font-size: 0.8em;">AUTORIZADO MEDIANTE RESOLUCION No DGT-R-033-2019 del 20 DE JUNIO 2019
              <br>Versión API Hacienda: 4.3<br> 
              <span class="leyfooter" style="font-size: 0.8em;">'.$msj.'</span>';
              
              $html .= '
              </p>
            </div>';
          }else{
            $html .= '<p class="center-align" style="font-size: 0.8em;">'.$msj.'</p>';
          }

        $this->writeHTML($html, true, false, true, false, '');
    }
}

// create new PDF document
$pdf = new myPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false,$transaccion[0][32]);
$pdf->setData(['tfactura'=>$datos[0][24],'credito'=>$datos[0][26],'fe'=>$datos[0][32],'m1'=>$transaccion[0][57],'m2'=>$transaccion[0][58]]);
$pdf->setGen($generator);
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
$pdf->SetFooterMargin(32);
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
'<meta name="viewport" content="width=device-width, initial-scale=1">';
if ($datos[0][32] != '') {
  $html .= '<title>FACTURA ELECTRONICA</title>';
}else{
  $html .= '<title>'.strtoupper($datos[0][1]).'</title>';
}

$html .= '</head>'.
'<body style="width: 100%"; > <center>'.
'<table align="center" border="0" cellpadding="5" cellspacing="0" height="100%" width="100%">'.
'<tr>'.
'<td align="left" valign="top" style="width:20%">';
if ($miscelaneos[3]) {
  $logo = isset($url2) ? str_replace('../', '', $miscelaneos[3]) : $miscelaneos[3];
  $html .= '<img src="'.$logo.'" style="width=300px;height=300px;min-height=300px" >';
}

$html .= '</td>'.
'<td valign="top"  style="font-size: 13px;font-family: Helvetica;text-align: left; color: #494949; width:60%;margin-left:50px;" >';
$fact = $miscelaneos[2] != '' ? $miscelaneos[2] : $miscelaneos[0];
   if ($miscelaneos[2] != ''){
      $html .= '<strong>'.$miscelaneos[2].'</strong><br>'.$miscelaneos[0].'<br>';
   }
   else
      $html .= '<strong>'.$miscelaneos[0].'</strong><br>';

$html .= '<strong>Cédula:</strong> '.$miscelaneos[1].'<br>'.
'<strong>Teléfono:</strong> '.$miscelaneos[5].'<br>'.
'<strong>Correo:</strong> '.$miscelaneos[4].'<br>'.
'<table><tr><td><b>Provincia:</b> '.$miscelaneos[12].'</td> <td><b>Cantón:</b> '.$miscelaneos[13].'</td></tr> <tr> <td><b>Distrito:</b> '.$miscelaneos[14].'</td>'; 
  if( $miscelaneos[15] != 'N/A')
    $html .= '<td><b>Barrio:</b> '.$miscelaneos[15].'</td>';
  $html .= '</tr> </table> <br><strong>Dirección:</strong>'.
$miscelaneos[23].'</td> <td style="width:20%">';

if($transaccion[0][32]){
  $svg = $generator->render_svg('qr-l', $transaccion[0][32],'');
  $pdf->ImageSVG('@' . $svg, $x=150, $y=0, $w='45', $h='45', $link='', $align='', $palign='', $border=0, $fitonpage=false);                
  $html .= '</td> </tr> </table> <table style="color: #494949;font-family: Helvetica;font-size: 12px;font-weight: normal;" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
  <tr><br> <td><b>'.$datos[0][25].' Electrónica N°</b>'.$datos[0][0].' </td>';
}else{
  $html .= '</td> </tr> </table> <table style="color: #494949;font-family: Helvetica;font-size: 12px;font-weight: normal;" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"> <tr> <td><b>'.$datos[0][25].' N°</b>'.$datos[0][0].' </td>';
}

$html .= '<td></td></tr> </table> <table style="color: #494949;font-family: Helvetica;font-size: 12px;font-weight: normal;" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">';

$clave = '';
if ($datos[0][32] != '') {
  $clave = '<strong>Clave: </strong>'.$datos[0][32].'<br>';
}
$tipo = '';
if ($datos[0][1] != '') {
  $tipo .= '<strong>'.$datos[0][25].' de: </strong> '.$datos[0][1].'<br>';
}

$cliente = '';
if ($datos[0][4] != '') {
$prov = '';
if($datos[0][50])
  $prov = '<b>Provincia:</b> '.$datos[0][50];
$cant = '';
if($datos[0][51])
  $cant = '<b>Cantón:</b> '.$datos[0][51];
$dist = '';
if($datos[0][52])
  $dist = '<b>Distrito:</b> '.$datos[0][52];
$barrio = '';

$dir = '';
if($datos[0][53]){
  $barrio = '<b>Barrio:</b> '.$datos[0][53];
  $dir = '<table border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%;"> <tr><td>'.$prov.'</td> <td>'.$cant.'</td></tr> <tr> <td>'.$dist.'</td> <td>'.$barrio.'</td></tr> </table>';
}

  $cliente = '<b>'.$datos[0][30].':</b> <span>'.$datos[0][4].'</span>  <br><b>Cédula:</b> '.$datos[0][34].' <br><b>Correo:</b> '.$datos[0][41].' <br>'.$dir;

  if($datos[0][54])
    $cliente .= '<b>Dirección:</b> '.$datos[0][54].' <br>';
}

$user = '';
if($datos[0][16] != '')
  $user = '<strong>Usuario:</strong> '.$datos[0][16].'<br>';

$orden = '';
if($datos[0][48] != '')
  $orden = '<strong>Orden N:</strong> '.$datos[0][48].'<br>';

$comentario = '';
if ($datos[0][12] != '') {
$comentario = '<strong>Comentario:</strong><br>'.$datos[0][12].'<br>';
}

$plazo = '<div style="text-align: center; background-color:#3960A7;color:white;">'.
'<strong>Fecha y Hora:</strong>&nbsp;<br>'.$datos[0][3].' '.$datos[0][37].'<br></div>';
if ($datos[0][32] != '') {
  $plazo .= '<br><div style="text-align: center; background-color:#3960A7;color:white;">';
  if ($datos[0][2] === ''){ 
      $plazo .= '<strong>Plazo en Días: </strong>'.$datos[0][11].'<br> <strong>Fecha Vencimiento: </strong>'.$datos[0][55].'<br>';
    }
  else
       $plazo .= '<strong>Tipo de Pago: </strong><br>'.$datos[0][2].'<br>';

     $plazo .= '</div>';
 }

$exon = '';
if(strlen($datos[0][33])){
  $exoneracion = explode('^', $datos[0][33]);
  $time = strtotime($exoneracion[3]);
  $fexo = date('d/m/Y \a \l\a\s H:i:s',$time);

  $exon .= '<span style="font-size: 12px;text-align:justify;color: #494949;font-family: Helvetica;"><br>Factura exenta del pago del impuestos. Exoneracion emitida por '.$exoneracion[2].' mediante el documento '.$exoneracion[1].',con fecha '.$fexo.'</span><br><br>';
} 

$html .= '<tr> <td width="65%">'.$clave.$tipo.$cliente.$user.$orden.$comentario.$exon.'</td> <td width="5%"></td> <td width="30%">'.$plazo.'</td> </tr> </table>';


$html .= '* Línea Exenta<br>'.
'<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%;">'.
'<tr style="background-color:#3960A7;">'.
'<td valign="top" style="font-size: 12px;text-align: center; color: white;font-family: Helvetica;" align="center" width="9%">'.
'<strong>Cantidad</strong>'.
'</td>'.
'<td valign="top" style="font-size: 12px;text-align: center; color: white;font-family: Helvetica;" align="center" width="10%">'.
'<strong>Código</strong>'.
'</td>'.
'<td valign="top" style="<font-size: 12px;text-align: center; color: white;font-family: Helvetica;" align="center" width="26%">'.
'<strong>Descripción</strong>'.
'</td>'.
'<td valign="top" style="<font-size: 12px;text-align: center; color: white;font-family: Helvetica;" align="center" width="15%">'.
'<strong>P. Unitario</strong>'.
'</td>'.
'<td valign="top" style="<font-size: 12px;text-align: center;color: white;font-family: Helvetica;" align="center" width="6%">'.
'<strong>Unidad</strong>'.
'</td>'.
'<td valign="top" style="<font-size: 12px;text-align: center; color: white;font-family: Helvetica;" align="center" width="9%">'.
'<strong>Descuento</strong>'.
'</td>'.
'<td valign="top"  style="<font-size: 12px;text-align: center; color: white;font-family: Helvetica;" align="center" width="5%">'.
'<strong>IVA</strong>'.
'</td>'.
'<td valign="top"  style="<font-size: 12px;text-align: center; color: white;font-family: Helvetica;" align="center" width="5%">'.
'<strong>EXO</strong>'.
'</td>'.
'<td valign="top"  style="<font-size: 12px;text-align: center; color: white;font-family: Helvetica;" align="center" width="15%">'.
'<strong>Importe</strong>'.
'</td>'.
'</tr>'.
'</tbody></table>';

//DETALLE FACTURA

$html .= '<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer"><tbody>';

$grabado = $exento = 0;

foreach ($datos as $obj) {

  if ($obj[28] > 0) 
    $grabado += str_replace(',', '', $obj[22]);
  else
    $exento += str_replace(',', '', $obj[22]);
  
  $html .= '<tr><td valign="top"  style="color: #494949;font-size: 10px;text-align: center;font-family: Helvetica;" width="9%">'.
$obj[29].$obj[18].
'</td>'.
'<td valign="top"  style="color: #494949;font-size: 10px;text-align: center;font-family: Helvetica;" width="10%">'.
$obj[36].
'</td>'.
'<td valign="top"  style="color: #494949;font-size: 10px;text-align: center;font-family: Helvetica;" width="26%">'.
$obj[19].
'</td>'.
'<td valign="top"  style="color: #494949;font-size: 10px;text-align: center;font-family: Helvetica;" width="15%">'.
$obj[20].
'</td>'.
'<td valign="top"  style="color: #494949;font-size: 10px;text-align: center;font-family: Helvetica;" width="6%">'.
$obj[23].
'</td>'.

'<td valign="top"  style="color: #494949;font-size: 10px;text-align: right;font-family: Helvetica;" width="9%">'.
$obj[21].
'</td>'.
'<td valign="top"  style="color: #494949;font-size: 10px;text-align: center;font-family: Helvetica;" width="5%">'.
number_format($obj[47],0,'','').
'</td>'.
'<td valign="top"  style="color: #494949;font-size: 10px;text-align: center;font-family: Helvetica;" width="5%">'.
$obj[46].
'</td>'.
'<td valign="top"  style="color: #494949;font-size: 10px;text-align: right;font-family: Helvetica;" width="14%">'.
$obj[22].
'</td>'.
'</tr>';
}


$html .= '</tbody>'.
'</table> <br><br>';

$html .= '<table style="width: 100%" style="font-size:9px">';

  $html .= '<tr>
    <td></td>
    <td align="right">Gravado:</td>
    <td align="right">'.$datos[0][15].$datos[0][9].'</td>
  </tr>';

  $html .= '<tr>
    <td></td>
    <td align="right">Exento:</td>
    <td align="right">'.$datos[0][15].$datos[0][8].'</td>
  </tr>';

  $html .= '<tr>
    <td></td>
    <td align="right">Exonerado:</td>
    <td align="right">'.$datos[0][15].$datos[0][7].'</td>
  </tr>';

  $html .= '<tr>
    <td></td>
    <td align="right">Descuento:</td>
    <td align="right">'.$datos[0][15].$datos[0][6].'</td>
  </tr>';

  $html .= '<tr>
    <td></td>
    <td align="right">Impuesto:</td>
    <td align="right">'.$datos[0][15].$datos[0][5].'</td>
  </tr>';

  $html .= '<tr>
    <td></td>
    <td align="right"><strong>TOTAL:</strong></td>
    <td align="right"><b>'.$datos[0][15].$datos[0][10].'</b></td>
  </tr></table>';

$html .= '</body></html>';

//<br>ESTA FACTURA DEVENGARA INTERES MORATORIA DEL 4% MENSUAL.
$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$sld = $datos[0][25] == 'Venta' ?  'Factura' : $datos[0][25];

$ver = isset($_REQUEST['arreglo']['show']) ? 'I' : 'F';
$pdf->Output($ubic.'assets/pdf/'.$sld.' No'.$datos[0][0].', '.strtoupper($fact).'.pdf',$ver);
?>