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
$pdf->SetMargins(0, 0, 0);
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

$width = 95;  
$height = 200; 
$pageLayout = array($width, $height);
$pdf->AddPage('P',$pageLayout);
$total = 0;

$html = '<div style="text-align: center;"><b>'.$transaccion[0][0].'</b> <br> '.$transaccion[0][1].' <br> Atiente: '.$transaccion[0][2].' <br>
'.date('d/m/Y H:m:s').' </div> <table>';

$val = '';
$marr = [0=>'COCINA',1=>'ENTRADAS',2=>'PLATOS FUERTES',3=>'POSTRES',4=>'BEBIDAS'];
foreach ($transaccion as $obj) {
    if($obj[3] != $val){
        $html .= '<tr><td colspan="2"></td></tr> <tr><td colspan="2" style="border-bottom: 1px solid black;">'.$marr[$obj[3]].'</td></tr>';
        $val = $obj[3];
    }

    if($obj[6] <> ''){
        $cantt = strlen($obj[6]) - strlen( str_replace('^','',$obj[6])); 
        $residuo = '';
        $totalr = $obj[6];

        for ($i=0; $i < $obj[4]; $i++) { 
            $residuo = substr($totalr,1,strpos($totalr, '!'));
            $totalr = substr($totalr,strlen($residuo)+1);
            $html .= '<tr> <td>1</td> <td>'.$obj[5].'</td> </tr> <tr> <td></td> <td>->'.str_replace('^','',str_replace('!','',$residuo)).'</td> </tr>';
        }
    }
    else
        $html .= '<tr> <td>'.$obj[4].'</td> <td>'.$obj[5].'</td> </tr>';
}

$html .= '</table>
<br><br><br>';
//<br>ESTA FACTURA DEVENGARA INTERES MORATORIA DEL 4% MENSUAL.
$pdf->writeHTML($html, true, false, true, false, '');

//----------------------------------------------------------
$pdf->lastPage();
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('../assets/pdf/C-'.$nom.'.pdf','F');

?>