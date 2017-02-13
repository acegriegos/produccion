<meta charset="utf-8">
 <link rel="icon" type="image/png" href="../../assets/img/favicon.ico">
 <link href="../assets/css/materialize.css" rel="stylesheet">
 <link href="../assets/css/modulos/style-reportes.css" rel="stylesheet">
 <body>
<div class="hoja">
  <!-- HEADER -->
<div class="row">
    <div class="col s4">
      <img src="../assets/img/logo.png" class="img-responsive" width="100%">
    </div>
    <div class="col s4 center">
      <font size="2">
      <br>
        <b><?php echo $miscelaneos[0][0]; ?></b><br>
        Cédula: <b><?php echo $miscelaneos[1][0]; ?></b><br>
        Teléfono:  <b><?php echo $miscelaneos[2][0]; ?></b><br>
        Correo: <b><?php echo $miscelaneos[3][0]; ?></b><br>
        Dirección: <b><?php echo $miscelaneos[4][0]; ?></b><br>
        <?php echo $datos[1] != '' ? $datos[17].'<br>' : '<br>'; ?>
      </font>
    </div>
    <div class="col s4">
     <br>
     <div id="infofact" align="right">
      <b id="fact">Factura N°
      <span id="numfact"> <?php echo $datos[0]; ?> </span></b>
    </div>
    </div>
</div>
<div class="center">Factura de: <b><?php echo $datos[1]; ?></b></div>
<!-- /HEADER -->
<br>
<!-- INFO CONTACTO -->
<div class="row">
  <div class="col s6">
    <table width="100%">
      <tr>
        <td class="tdtitc" width="20%"><span class="titcontact">&nbsp;Cliente</span></td>
        <td class="tdinfoc" width="80%">&nbsp;<span class="contcontact"><?php echo $datos[4]; ?></span></td>
      </tr>
    </table>
    <br>
    <table width="100%">
      <tr>
        <td class="tdtitc" width="20%"><span class="titcontact">&nbsp;Vende</span></td>
        <td class="tdinfoc" width="80%">&nbsp;<span class="contcontact"><i><?php echo $datos[16]; ?> </i></span></td>
      </tr>
    </table>
    <br>
    <table width="100%">
      <tr>
        <td class="tdtitc" width="20%"><span class="titcontact">&nbsp;Comentario</span></td>
        <td class="tdinfoc" width="80%">&nbsp;<span class="contcontact"><?php echo $datos[12]; ?> </span></td>
      </tr>
    </table>
  </div>
  <div class="col s6">
    <table width="96%">
      <tr>
        <td class="tdtitc" width="25%"><span class="titcontact">&nbsp;Tipo de Pago</span></td>
        <td class="tdinfoc" width="75%">&nbsp;<span class="contcontact"><?php echo $datos[2]; ?> </span></td>
      </tr>
    </table>
    <br>
    <table id="date" width="96%">
      <tr>
        <td id="titdate" width="25%">&nbsp;Fecha</td>
        <td><?php echo $datos[3]; ?></td>
      </tr>
    </table>
  </div>
</div>
<!-- /INFO CONTACTO -->

<!-- DETALLE FACT -->
<table id="detalle">
  <tr class="tr" align="center">
    <th class="th" id="th1">Cantidad</th>
    <th class="space"></th>
    <th class="th" id="th2">Descricpión</th>
    <th class="space"></th>
    <th class="th" id="th3">P. Unit</th>
    <th class="space"></th>
    <th class="th" id="th6">Tipo</th>
    <th class="space"></th>
    <th class="th" id="th4">Descuento</th>
    <th class="space"></th>
    <th class="th" id="th5">Importe</th>
  </tr>
  <?php foreach ($transaccion as $obj) {?>
  <tr class="tr" align="center">
    <td class="td"><span id="cant"><?php echo $obj[18]; ?></span></td>
    <td class="space"></td>
    <td class="td"><span id="desc"><?php echo $obj[19]; ?></span></td>
    <td class="space"></td>
    <td class="td">¢<span id="punit"><?php echo $obj[20]; ?></span></td>
    <td class="space"></td>
    <td class="td"><span id="desc"><?php echo $obj[23]; ?></span></td>
    <td class="space"></td>
    <td class="td"><span id="desc"><?php echo $obj[21]; ?></span>%</td>
    <td class="space"></td>
    <td class="td">¢<span id="import"><?php echo $obj[22]; ?></span></td>
  </tr>
  <?php } ?>
</table>
<!-- /DETALLE FACT -->
<br>
<!-- INFO FACT -->
<div class="row">
  <div class="col s5">
  <section id="sqre">
    <table id="infotot" width="100%">
      <tfoot>
        <th class="tittot">Firma Representante</th>
        <th class="infospace"></th>
        <th class="tittot">Firma de Cliente</th>
      </tfoot>
      <tbody>
        <tr class="ttdr">
          <td class="valtot ttdr"><br><br><span class="tisqre">_____________</span></td>
          <td class="infospace"></td>
          <td class="valtot ttdl"><br><br><span class="tisqre">_____________</span></td>
        </tr>
      </tbody>
    </table>
  </section>
  </div>
  <div class="col s7">
    <table id="infotot" width="93%">
      <tr>
        <th class="tittot thtiti">SubTotal</th>
        <th class="infospace"></th>
        <th class="tittot">imv</th>
        <th class="infospace"></th>
        <th class="tittot">Desc. Total</th>
        <th class="infospace"></th>
        <th class="tittot thtitf" style="width:25%">TOTAL</th>
      </tr>
      <tr>
        <td class="valtot"><?php echo $datos[15]; ?><span class="valtotc"><?php echo $datos[9]; ?></span></td>
        <td class="infospace"></td>
        <td class="valtot"><?php echo $datos[15]; ?><span class="valtotc"><?php echo $datos[5]; ?></span></td>
        <td class="infospace"></td>
        <td class="valtot"><?php echo $datos[15]; ?><span class="valtotc"><?php echo $datos[6]; ?></span></td>
        <td class="infospace"></td>
        <td class="valtot" style="width:40%"><?php echo $datos[15]; ?><b> <?php echo $datos[10]; ?></b></td>
      </tr>
    </table>
    <div class="totalpha">
      <?php 
        $decimales =  substr($datos[10], strpos($datos[10], '.'));
        $entero = str_replace(',', '', substr($datos[10],0,strpos($datos[10], '.')));
        $nombres = array(1=>'Uno',2=>'Dos',3=>'Tres',4=>'Cuatro',5=>'Cinco',6=>'Seis',7=>'Siete',8=>'Ocho',9=>'Nueve',0=>'Cero',10=>'Diez',11=>'Once',12=>'Doce',13=>'Trece',14=>'Catorce',15=>'Quince','10+'=>'Dieci',20=>'Veinte','20+'=>'Veinti',30=>'Treinta y',40=>'Cuarenta y',50=>'Cincuenta y',60=>'Sesenta y',70=>'Setenta',80=>'Ochenta y',90=>'Noventa y',100=>'Cien','100+'=>'Ciento',200=>'Doscientos',300=>'Trescientos',400=>'Cuatrocientos',500=>'Quinientos',600=>'Seiscientos',700=>'Sietecientos',800=>'Ochocientos',900=>'Novecientos',1000=>'Mil',100000=>'Millón');
        $diviciones = round(strlen($entero) / 3,0)-1;
        $salida = '';

        for ($i=1; $i <= $diviciones; $i++) { 
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
          $salida .= ' '.$centena.' '.$decena.' '.$unidad.' '.$datos[14];

        
      ?> 
       <span class="labelalpha"><?php echo $salida; ?></span>
    </div>
  </div>
</div>
<!-- /INFO FACT -->
<br><br>
<!-- FOOTER -->
<hr>
<footer>
  <p class="infooter">Cuentas Bancarias <b>BAC San José</b> <span class="moneda">$</span><i>727708000</i> - <span class="moneda">₡</span><i>727707002</i>   <b>|</b>   Autorizado mediante la resolución # 11--97 de la Dirección General de Tributación Directa, publicado en el diario La Gaceta #171 el 5 de Setiembre de 1997   <b>|</b>   <span class="leyfooter">Esta factura constituye Título Ejecutivo de acuerdo al art. 460 del Código de Comercio. La misma deberá ser cancelada en el plazo que indica, posteriormente al mismo devengará intereses del 5% mensual, no queriendo decir esto que el pago de los intereses sea una prórroga para su cancelación.</span></p>
</footer>
<!-- /FOOTER -->
</div>

<script src="../assets/js/jquery.js"></script>
<script src="../assets/js/materialize.js"></script>
</body>