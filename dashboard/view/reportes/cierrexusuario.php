<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link href="../assets/css/materialize.css" rel="stylesheet">
<link href="../assets/css/modulos/style-factura.css" rel="stylesheet">
<body class="grey darken-4" style="font-size: 1.1em;" >
  <div class="hoja grey lighten-3">
    <!-- HEADER -->
    <div class="row">
      <div class="col s6 m5 l3">
      <br>
        <img src="../assets/img/logo.png" class="img-responsive" width="100%">
      </div>
      <div class="col s6 m7 l9 right-align">
        <font size="3">
          <br>
          <b><?php echo $miscelaneos[0]; ?></b><br>
          <b>Cédula:</b> <?php echo $miscelaneos[1]; ?><br>
          <b>Teléfono:</b>  <?php echo $miscelaneos[5]; ?><br>
          <b>Correo:</b> <?php echo $miscelaneos[4]; ?><br>
          <b>Dirección:</b> <?php echo $miscelaneos[6]; ?><br>
          
        </font>
      </div>


    </div>
    <div class="row">
      <div class="col s6 left-align">
       <div class="row">
         <div class="col s12" id="infofact" >
            <b id="fact">Cierre N°</b>
            <span id="numfact"> <?php echo $cierre[0]; ?> </span>
          </div>
       </div>
     </div>
   </div>
   <!-- /HEADER -->
   <!-- INFO CONTACTO -->
   <div class="row">
    <div class="col s3 left-align">
      <div class="row">
        <div class="col s12">
          <span class=""><b>Facturas contado:</b></span>   
          <span class=""><?php echo $cierre[3]; ?></span>
        </div>
        <div class="col s12">
          <span class=""><b>Facturas crédito:</b></span>
          <span class=""><i><?php echo $cierre[2]; ?> </i></span>
        </div>
        <div class="col s12">
          <span class=""><b>Abonos:</b></span>
          <span class=""><?php echo $cierre[4]; ?> </span>
        </div>
        <div class="col s12">
          <span class=""><b>Notas crédito:</b></span>   
          <span class=""><?php echo $cierre[5]; ?></span>
        </div>
        <div class="col s12">
          <span class=""><b>Notas débito:</b></span>
          <span class=""><i><?php echo $cierre[6]; ?> </i></span>
        </div>
      </div>
    </div>
    <div class="col s3 left-align">
      <div class="row">
        <div class="col s12">
          <span class=""><b>Efectivo:</b></span>
          <span class=""><?php echo $cierre[7]; ?> </span>
        </div>
        <div class="col s12">
          <span class=""><b>Tarjetas:</b></span>   
          <span class=""><?php echo $cierre[8]; ?></span>
        </div>
        <div class="col s12">
          <span class=""><b>Depósito:</b></span>
          <span class=""><i><?php echo $cierre[9]; ?> </i></span>
        </div>
        <div class="col s12">
          <span class=""><b>Bancos:</b></span>
          <span class=""><i><?php echo $cierre[10]; ?> </i></span>
        </div>
      </div>
    </div>

 <div class="col s6">
  <div class="col s6 center-align">
  <div class="card blue-grey white-text imprimirSINBOR">
    <div class="card-content white-text imprimirSINBOR">
      <p>Fecha:
        <?php echo $cierre[1]; ?> </p>
      </div>
    </div>
  </div>

  </div>
  <!-- /INFO CONTACTO -->

  <!-- DETALLE FACT -->
  <table class="bordered" style="border: 0px; font-size: 1.1em;" id="detalle">
    <thead>
      <tr>
        <th class="center-align"></th>
        <th class="center-align"></th>
        <th class="center-align"></th>
        <th class="center-align">Facturas</th>
        <th class="center-align"></th>
        <th class="center-align"></th>
        <th class="center-align"></th>
      </tr>
    </thead>
    <thead class=" blue-grey white-text imprimirSINBOR margen">
      <tr>
        <th class="center-align sinborde" id="th1">Consecutivo</th>
        <th class="center-align sinborde" id="th2">Fecha</th>
        <th class="center-align sinborde" id="th3">Cliente</th>
        <th class="center-align sinborde" id="th6">Tipo</th>
        <th  class="center-align sinborde" id="th4">Tipo Pago</th>
        <th class="center-align sinborde" id="th5">Total</th>
        <th class="center-align sinborde" id="th6">Usuario</th>
      </tr>
    </thead>
    <tbody >
      <?php foreach ($facturas as $obj) {?>
     
       <tr class="tr" >
        <td class="td center-align"><span id="con"><?php echo $obj[1]; ?></span></td>
        <td class="td center-align"><span id="fec"><?php echo $obj[2]; ?></span></td>
        <td class="td center-align"><span id="cli"><?php echo $obj[3]; ?></span></td>
        <td class="td center-align"><span id="tip"><?php echo $obj[4]; ?></span></td>
        <td class="td center-align"><span id="pag"><?php echo $obj[5]; ?></span></td>
        <td class="td right-align" ><span id="tot"><?php echo $obj[6]; ?></span></td>
        <td class="td right-align" ><span id="usu"><?php echo $obj[7]; ?></span></td>
      </tr>

      <?php } ?>
    </tbody>
  </table>
  <!-- /DETALLE FACT -->
  <br>
  <!-- DETALLE FACT -->
  <table class="bordered" style="border: 0px; font-size: 1.1em;" id="detalle">
    <thead>
      <tr>
        <th class="center-align"></th>
        <th class="center-align"></th>
        <th class="center-align"></th>
        <th class="center-align">Notas y abonos</th>
        <th class="center-align"></th>
        <th class="center-align"></th>
        <th class="center-align"></th>
      </tr>
    </thead>
    <thead class=" blue-grey white-text imprimirSINBOR margen">
      <tr>
        <th class="center-align sinborde" id="th1">Consecutivo</th>
        <th class="center-align sinborde" id="th2">Nota/Abono</th>
        <th class="center-align sinborde" id="th3">Fecha</th>
        <th class="center-align sinborde" id="th6">Cliente</th>
        <th  class="center-align sinborde" id="th4">Tipo Pago</th>
        <th class="center-align sinborde" id="th5">Saldo</th>
        <th class="center-align sinborde" id="th6">Usuario</th>
      </tr>
    </thead>
    <tbody >
      <?php foreach ($estados as $obj) {?>
     
       <tr class="tr" >
        <td class="td center-align"><span id="con"><?php echo $obj[1]; ?></span></td>
        <td class="td center-align"><span id="fec"><?php echo $obj[2]; ?></span></td>
        <td class="td center-align"><span id="cli"><?php echo $obj[3]; ?></span></td>
        <td class="td center-align"><span id="tip"><?php echo $obj[4]; ?></span></td>
        <td class="td center-align"><span id="pag"><?php echo $obj[5]; ?></span></td>
        <td class="td right-align" ><span id="tot"><?php echo $obj[6]; ?></span></td>
        <td class="td right-align" ><span id="usu"><?php echo $obj[7]; ?></span></td>
      </tr>

      <?php } ?>
    </tbody>
  </table>
  <!-- /DETALLE FACT -->
  <br>
  <!-- INFO FACT -->

  <div class="row">
  <br>
    <div class="col s8 offset-s2">
    <br><br>
      <section id="sqre">
        <table id="infotot" width="100%">
          <tfoot>
            <th class="center-align">Firma Representante</th>
            <th class="infospace"></th>
            <th class="center-align">Firma de Cliente</th>
          </tfoot>
          <tbody>
            <tr class="ttdr">
              <td class="center-align"><hr size="10" style="  background-color: black;  height: 1px; width: 80%;" /></td>
              <td class=""></td>
              <td class="center-align"><hr size="10" style="  background-color: black;  height: 1px; width: 80%;" /></td>
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

  <script src="../assets/js/jquery.js"></script>
  <script src="../assets/js/materialize.js"></script>
</body>