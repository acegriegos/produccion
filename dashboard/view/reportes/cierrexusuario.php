<?php $config = $kakaroto->kamehameha('',42,'@@impresa')[0];?>
<!DOCTYPE html>
<html>
<head>
<title>Cierres</title>
<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link href="../assets/css/materialize.css?v=10.2.0.17">
<style>
  @media print {
    .print{
      display: none;
    }

      @page {
    margin: 0;
  }

  body{
    margin-left: 0% !important;
    margin-right: 0% !important;

    font-weight: normal !important; 

  } 
  }


</style>
</head>
<body style="margin-left: 35%;margin-right: 35%" >

  <button class="print" style="cursor: pointer;left:100px;position:fixed;padding: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
    background-color: #1883ba;
    border-radius: 6px;
    border: 2px solid #0016b0">Imprimir</button>

  <div>
    <?php if($_SESSION['BUSS'] == 0){ ?>
    <div class="row">
     <div class="row" style="display: none"> 
        <div class="col s6 m5 l3">
          <br>
          <img src="../assets/img/logo.png" class="img-responsive" width="40%">
        </div>
    </div>
    <div class="center">
      <b>Cierre N°</b>
      <span id="numfact" > <?php echo $cierre[0]; ?> </span><br>
      <b>Usuario: </b>
      <span > <?php echo $cierre[17]; ?> </span><br>
      <b>Fecha: </b>
      <span > <?php echo $cierre[1]; ?> </span>
    </div>
    <div>
        <b><?php echo $miscelaneos[0]; ?></b><br>
        <b >Cédula:</b> <?php echo $miscelaneos[1]; ?><br>
        <b >Teléfono:</b>  <?php echo $miscelaneos[5]; ?><br>
        <b >Correo:</b> <?php echo $miscelaneos[4]; ?><br>
        <b >Dirección:</b> <?php echo $miscelaneos[6]; ?><br>
      </div>
     </div>
    <?php }else{ ?>
      <b>Usuario: </b>
      <span > <?php echo $cierre[17]; ?> </span><br>
      <b>Fecha: </b>
      <span > <?php echo $cierre[1]; ?> </span>
    <?php } ?>
    <!-- /HEADER -->
    <!-- INFO CONTACTO -->
    <div>
      <br>
      Facturas Contado: <span style="float: right;"><?php echo $cierre[3]; ?></span><br>
      Facturas Crédito:<span style="float: right;"><?php echo $cierre[2]; ?></span> <br>
      Abonos: <span style="float: right;"><?php echo $cierre[4]; ?> </span> <br>
      Notas Crédito:<span style="float: right;"><?php echo $cierre[5]; ?> </span> <br>
      Notas Débito:<span style="float: right;"><?php echo $cierre[6]; ?> </span> <br>
    </div>
    <hr>
    <div>
      Ventas en Efectivo: <span style="float: right;"><?php echo $cierre[7]; ?></span><br>
      Ventas con Tarjetas:<span style="float: right;"><?php echo $cierre[8]; ?></span><br>
      Ventas en Crédito:<span style="float: right;"><?php echo $cierre[2]; ?></span><br>
      Ventas con Depósito:<span style="float: right;"><?php echo $cierre[9]; ?></span><br>
      Excento:<span style="float: right;"><?php echo $cierre[22]; ?></span><br>
      IVA:<span style="float: right;"><?php echo $cierre[23]; ?></span><br>
      <b>Ventas Totales:</b> <span style="float: right;"><?php echo $cierre[21]; ?></span><br>
      <br>
      Caja Inicial:<span style="float: right;"><?php echo $cierre[20]; ?></span><br>
      Caja Reportada: <span style="float: right;"><?php echo $cierre[18]; ?></span><br>
    </div>
      <div class="col s6 m6 l4"  style="padding: 0;display: none">
          <div class="col s12 m12"  style="padding: 0">
            <table style=" width: 70%" >
              <tbody >
              <tr>
                  <th  >Caja inicial:<span><?php echo $cierre[20]; ?><br>
                </tr>
               <tr>
                  <th  >Caja del sistema:<span><?php echo number_format((str_replace(',', '', $cierre[7])+str_replace(',', '', $cierre[4])+str_replace(',', '', $cierre[6])+str_replace(',', '', $cierre[20])),2); ?><br>
                <span>Caja reportada:<span><?php echo $cierre[18]; ?> <br>
                </tr>
                                <tr class="sinborde">
                  <th  >Diferencia entre cajas:</th>
                  <td class="td right-align sinborde" ><span  style="font-size: 1.2em;  "><?php echo number_format((str_replace(',', '', $cierre[18])-str_replace(',', '', $cierre[7])-str_replace(',', '', $cierre[20])),2); ?> <br>
                </tr>
                <tr class="card blue-grey sinborde">
                  <th  style="background-color: #3960A7; padding: 2%,0%,0%,1%; font-size: 1.2em; color: white">Efectivo a entregar:</th>
                  <td class="td right-align sinborde" style="background-color: #3960A7; padding: 2%,0%,0%,0% ; margin: 0%;"><span  style="font-size: 1.2em;  color: white"><?php echo number_format((str_replace(',', '', $cierre[18])-str_replace(',', '', $cierre[20])),2); ?> <br>
                </tr>
                
              </tbody>
            </table>
        </div>
      </div>

     
      <!-- /INFO CONTACTO -->
      <!-- DETALLE FACT -->
      <?php switch($config[13]){ case 1: ?>
      <table style="border: 0px; font-size: 1em; width: 100%" id="detalle">
        <thead>
          <tr>
            <th colspan="3" align="center">Facturas</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th >Consecutivo</th>
            <th >T.Pago</th>
            <th >Total</th>
          </tr>
        </thead>
        <tbody >
          <?php foreach ($cierreg as $obj) {?>
          <tr class="tr" >
            <td ><span id="con" ><?php echo $obj[11]; ?></span></td>
            <td ><span id="pag" ><?php echo $obj[15]; ?></span></td>
            <td align="right"><span  ><?php echo number_format($obj[16],2); ?></span></td>
          </tr>
          <?php } ?>
        </tbody>
      </table>
      <br>
      <!-- DETALLE FACT -->
      <table style="border: 0px; font-size: 1em;width: 100%;">
        <thead>
          <tr>
            <th colspan="3" align="center">Notas y abonos</th>
          </tr>
        </thead>
        <thead class=" blue-grey white-text imprimirSINBOR margen">
          <tr>
            <th >Factura</th>
            <th >Nota/Abono</th>
            <th align="right">Valor</th>
          </tr>
        </thead>
        <tbody >
          <?php foreach ($estados as $obj) {?>
          <tr class="tr" >
            <td ><span id="con"><?php echo $obj[0]; ?></span></td>
            <td ><span id="fec"><?php echo $obj[1]; ?></span></td>
            <td ><span id="pag"><?php echo number_format($obj[4],2); ?></span></td>
          </tr>
          <?php } ?>
        </tbody>
      </table>
      <?php break;
            case 2:
      ?>
      <table style="border: 0px; font-size: 1em; width: 100%" id="detalle">
        <thead>
          <tr>
            <th colspan="2" align="center">Productos</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th >Producto</th>
            <th >Total</th>
          </tr>
        </thead>
        <tbody >
          <?php foreach ($cierreg as $obj) {?>
          <tr class="tr" >
            <td align="left"><?php echo $obj[24]; ?></td>
            <td ><span><?php echo $obj[11]; ?></span></td>
            <td align="right"><span><?php echo number_format($obj[16],2); ?></span></td>
          </tr>
          <?php } ?>
        </tbody>
      </table>
      <br>
      <?php default:
            break;
            } ?>
      <br>
      <!-- INFO FACT -->
      <div class="row">
        <div class="col s8 offset-s2">
          <br><br>
          <section id="sqre">
            <table id="infotot" width="100%">
              <tfoot>
              <th class="center-align">Firma Representante</th>
              <th class="infospace"></th>
              </tfoot>
              <tbody>
                <tr class="ttdr">
                  <td class="center-align"><hr size="10" style="  background-color: black;  height: 1px; width: 80%;" /></td>
                  <td ></td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
        <!-- <div class="col s7">
          <div class="totalpha">
            <?php
            $decimales =  substr($cierre[10], strpos($cierre[10], '.'));
            $entero = str_replace(',', '', substr($cierre[10],0,strpos($cierre[10], '.')));
            $nombres = array(1=>'Uno',2=>'Dos',3=>'Tres',4=>'Cuatro',5=>'Cinco',6=>'Seis',7=>'Siete',8=>'Ocho',9=>'Nueve',0=>'Cero',10=>'Diez',11=>'Once',12=>'Doce',13=>'Trece',14=>'Catorce',15=>'Quince','10+'=>'Dieci',20=>'Veinte','20+'=>'Veinti',30=>'Treinta y',40=>'Cuarenta y',50=>'Cincuenta y',60=>'Sesenta y',70=>'Setenta',80=>'Ochenta y',90=>'Noventa y',100=>'Cien','100+'=>'Ciento',200=>'Doscientos',300=>'Trescientos',400=>'Cuatrocientos',500=>'Quinientos',600=>'Seiscientos',700=>'Sietecientos',800=>'Ochocientos',900=>'Novecientos',1000=>'Mil',100000=>'Millón');
            $diviciones = round(strlen($entero) / 3,0)-1;
            $salida = '';
            /*for ($i=1; $i <= $diviciones; $i++) {
            $pos = pow(1000, $i);
            $base = round($entero/$pos,0);
            $centena = round($base/100,0);
            $decena = abs(round(($centena*100-$base)/10,0));
            $unidad = abs(round(($centena*100+$decena*10-$base),0));
            $centena = $centena != 0 ? $nombres[$centena*100] : '';
            $decena = $decena != 0 ? $unidad == 0 ? $nombres[$decena*10] : $nombres[($decena*10).'+'] : '';
            $unidad = $unidad == 0 ? '' : $nombres[$unidad];
            $salida .= $centena.' '.$decena.' '.$unidad.' '.$nombres[$pos];
            }
            $base = substr($entero, -3);
            $centena = round($base/100,0);
            $decena = abs(round(($centena*100-$base)/10,0));
            $unidad = abs(round(($centena*100+$decena*10-$base),0));
            $centena = $centena != 0 ? $nombres[$centena*100] : '';
            $decena = $decena != 0 ? $unidad == 0 ? $nombres[$decena*10] : $nombres[($decena*10).'+'] : '';
            $unidad = $unidad == 0 ? '' : $nombres[$unidad];
            $salida .= ' '.$centena.' '.$decena.' '.$unidad.' '.$cierre[14];
            */
            ?>
            <span class="labelalpha"><?php echo $salida; ?></span>
          </div>
        </div> -->
      </div>
      <!-- /INFO FACT -->
      <!-- FOOTER -->
      <!-- /FOOTER -->
    </div>
    <script src="../assets/js/jquery.js?v=10.2.0.17"></script>
    <script src="../assets/js/materialize.js?v=10.2.0.17"></script>

     <script type="text/javascript">
   $(function(){
      window.onafterprint = function(){
        //$("#resolucion").html(navigator.userAgent)
        if( navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         )
            return true;
        else
          window.close();
      }

      $(".print").click(function(){
        window.print();
      });
   })
 </script>
  </body>
</html>