<title>Cierres</title>
<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link href="../assets/css/materialize.css?v=10.0.0.31">


<body class="grey darken-4" style="font-size: 1.1em;" >
  <div class="hoja grey lighten-5" style="padding: 0% 1% 1% 1%;">
    <div class="row">
     <div class="row"> 
        <div class="col s6 m5 l3">
          <br>
          <img src="../assets/img/logo.png" class="img-responsive" width="40%">
        </div>
    </div>
    <div class="col s6 left-align ">
        <div class="row">
          <div class="col s12" id="infofact" >
            <b id="fact" style="font-size: 1.2em" >Cierre N°</b>
            <span id="numfact" style="font-size: 1.2em"> <?php echo $cierre[0]; ?> </span><br>
            <b id="fact" style="font-size: 1.2em">Usuario: </b>
            <span style="font-size: 1.2em"> <?php echo $cierre[17]; ?> </span><br>
            <b id="fact" style="font-size: 1.2em">Fecha: </b>
            <span style="font-size: 1.2em"> <?php echo $cierre[1]; ?> </span>
          </div>
        </div>
      </div>
      <div class="col s6 m6 l6 right-align">
       <b ><?php echo $miscelaneos[0]; ?></b><br>
        <b >Cédula:</b> <?php echo $miscelaneos[1]; ?><br>
        <b >Teléfono:</b>  <?php echo $miscelaneos[5]; ?><br>
        <b >Correo:</b> <?php echo $miscelaneos[4]; ?><br>
        <b >Dirección:</b> <?php echo $miscelaneos[6]; ?><br>
      </div>
     </div>
    
    <!-- /HEADER -->
    <!-- INFO CONTACTO -->
    <div class="row">
    <br>
      <div class="col s6 m6 l4 left-align" style="padding: 0">
        <div class="col s12 m12" >
          <table style=" width: 60%" >
            <tbody >
              <tr>
                <th class="left-align " style="padding: 1%; font-size: 1.2em;">Facturas contado:</th>
                <td class="td right-align" style="padding: 1%; margin: 0%;"><span style="font-size: 1.2em"><?php echo $cierre[3]; ?></span></td>
              </tr>
              <tr>
                <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Facturas crédito:</th>
                <td class="td right-align" style="padding: 1%; margin: 0%;"><span class="" style="font-size: 1.2em"><?php echo $cierre[2]; ?> </span></td>
              </tr>
              <tr>
                <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Abonos</th>
                <td class="td right-align" style="padding: 1%; margin: 0%;"><span class="" style="font-size: 1.2em"><?php echo $cierre[4]; ?> </span></td>
              </tr>
              <tr >
                <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Notas crédito:</th>
                <td class="td right-align sinborde" style="padding: 1%; margin: 0%;"><span class="" style="font-size: 1.2em; "><?php echo $cierre[5]; ?> </span></td>
              </tr>
              <tr>
                <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Notas débito:</th>
                <td class="td right-align" style="padding: 1%; margin: 0%;"><span class="" style="font-size: 1.2em"><?php echo $cierre[6]; ?> </span></td>
              </tr>

            </tbody>
          </table>
          <br>
        </div>
      </div>
      <div class="col s6 m6 l4"  style="padding: 0">
          <div class="col s12 m12"  style="padding: 0">
            <table style=" width: 70%" >
              <tbody >
                <tr>
                  <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Ventas en efectivo:</th>
                  <td class="td right-align" style="padding: 1%; margin: 0%;"><span style="font-size: 1.2em"><?php echo $cierre[7]; ?></span></td>
                </tr>
                <tr>
                  <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Ventas con tarjetas:</th>
                  <td class="td right-align" style="padding: 1%; margin: 0%;"><span class="" style="font-size: 1.2em"><?php echo $cierre[8]; ?> </span></td>
                </tr>
                <tr>
                  <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Ventas en crédito:</th>
                  <td class="td right-align" style="padding: 1%; margin: 0%;"><span class="" style="font-size: 1.2em"><?php echo $cierre[2]; ?> </span></td>
                </tr>
                  <tr>
                  <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Ventas con deposito:</th>
                  <td class="td right-align" style="padding: 1%; margin: 0%;"><span style="font-size: 1.2em"><?php echo $cierre[9]; ?></span></td>
                </tr>
                <tr>
                  <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Excento:</th>
                  <td class="td right-align" style="padding: 1%; margin: 0%;"><span style="font-size: 1.2em"><?php echo $cierre[22]; ?></span></td>
                </tr>
                <tr>
                  <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">IMV:</th>
                  <td class="td right-align" style="padding: 1%; margin: 0%;"><span style="font-size: 1.2em"><?php echo $cierre[23]; ?></span></td>
                </tr>
                <tr class="card blue-grey sinborde">
                  <th class="left-align sinborde" style=" background-color: #3960A7; padding: 2%,0%,0%,1%; font-size: 1.2em; color: white">Ventas totales:</th>
                  <td class="td right-align sinborde" style=" background-color: #3960A7; padding: padding: 2%,0%,0%,0% ; margin: 0%;"><span class="" style="font-size: 1.2em; color: white"><?php echo $cierre[21]; ?> </span></td>
                </tr>
                
              </tbody>
            </table>
        </div>
      </div>
      <div class="col s6 m6 l4"  style="padding: 0">
          <div class="col s12 m12"  style="padding: 0">
            <table style=" width: 70%" >
              <tbody >
              <tr>
                  <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Caja inicial:</th>
                  <td class="td right-align" style="padding: 1%; margin: 0%;"><span style="font-size: 1.2em"><?php echo $cierre[20]; ?></span></td>
                </tr>
               <tr>
                  <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Caja del sistema:</th>
                  <td class="td right-align" style="padding: 1%; margin: 0%;"><span style="font-size: 1.2em"><?php echo number_format((str_replace(',', '', $cierre[7])+str_replace(',', '', $cierre[4])+str_replace(',', '', $cierre[6])+str_replace(',', '', $cierre[20])),2); ?></span></td>
                </tr>
                <tr>
                  <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Caja reportada:</th>
                  <td class="td right-align" style="padding: 1%; margin: 0%;"><span class="" style="font-size: 1.2em"><?php echo $cierre[18]; ?> </span></td>
                </tr>
                                <tr class="sinborde">
                  <th class="left-align sinborde" style="padding: 1%; font-size: 1.2em;">Diferencia entre cajas:</th>
                  <td class="td right-align sinborde" style="padding: 1%; margin: 0%;"><span class="" style="font-size: 1.2em;  "><?php echo number_format((str_replace(',', '', $cierre[18])-str_replace(',', '', $cierre[7])-str_replace(',', '', $cierre[20])),2); ?> </span></td>
                </tr>
                <tr class="card blue-grey sinborde">
                  <th class="left-align sinborde" style="background-color: #3960A7; padding: 2%,0%,0%,1%; font-size: 1.2em; color: white">Efectivo a entregar:</th>
                  <td class="td right-align sinborde" style="background-color: #3960A7; padding: 2%,0%,0%,0% ; margin: 0%;"><span class="" style="font-size: 1.2em;  color: white"><?php echo number_format((str_replace(',', '', $cierre[18])-str_replace(',', '', $cierre[20])),2); ?> </span></td>
                </tr>
                
              </tbody>
            </table>
        </div>
      </div>

     
      <!-- /INFO CONTACTO -->
      <!-- DETALLE FACT -->
      <table class="bordered" style="border: 0px; font-size: 1em;" id="detalle">
        <thead>
          <tr>
            <th class="center-align"></th>
            <th class="center-align"></th>
            <th class="center-align"style="font-size: 1.2em;">Facturas</th>
            <th class="center-align"> </th>
            <th class="center-align"></th>
            <th class="center-align"></th>
          </tr>
        </thead>
        <thead class=" blue-grey white-text imprimirSINBOR margen">
          <tr>
            <th class="center-align " id="th1" style=" background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Consecutivo</th>
            <th class="center-align sinborde" id="th2" style=" background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Fecha</th>
            <th class="center-align sinborde" id="th3" style=" background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Cliente</th>
            <th  class="center-align sinborde" id="th4" style=" background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Tipo Pago</th>
            <th class="center-align " id="th5" style=" background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Total</th>
          </tr>
        </thead>
        <tbody >
          <?php foreach ($cierreg as $obj) {?>
          <tr class="tr" >
            <td class="td center-align" style="padding: 0%; margin: 0%;"><span id="con" style="font-size: 1.1em;"><?php echo $obj[11]; ?></span></td>
            <td class="td center-align" style="padding: 0%; margin: 0%;"><span id="fec" style="font-size: 1.1em;"><?php echo $obj[12]; ?></span></td>
            <td class="td center-align" style="padding: 0%; margin: 0%;"><span id="cli" style="font-size: 1.1em;"><?php echo $obj[13]; ?></span></td>
            <td class="td center-align" style="padding: 0%; margin: 0%;"><span id="pag" style="font-size: 1.1em;"><?php echo $obj[15]; ?></span></td>
            <td class="td right-align"  style="padding: 0%; margin: 0%;"><span id="tot" style="font-size: 1.1em;"><?php echo number_format($obj[16],2); ?></span></td>
          </tr>
          <?php } ?>
        </tbody>
      </table>
      <!-- /DETALLE FACT -->
      <br>
      <!-- DETALLE FACT -->
      <table class="bordered" style="border: 0px; font-size: 1em;" id="detalle">
        <thead>
          <tr>
            <th class="center-align"></th>
            <th class="center-align"></th>
            <th class="center-align" style="font-size: 1.2em;">Notas y abonos</th>
            <th class="center-align"></th>
            <th class="center-align"></th>
            <th class="center-align"></th>
          </tr>
        </thead>
        <thead class=" blue-grey white-text imprimirSINBOR margen">
          <tr>
            <th class="center-align sinborde" id="th1" style="background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Factura</th>
            <th class="center-align sinborde" id="th3" style="background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Fecha</th>
            <th class="center-align sinborde" id="th6" style="background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Cliente</th>
            <th class="center-align sinborde" id="th2" style="background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Nota/Abono</th>
            <th class="center-align sinborde" id="th5" style="background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Valor</th>
            <th class="center-align sinborde" id="th6" style="background-color: #3960A7; padding: 0%; font-size: 1.2em; margin: 0%;">Comentario</th>
          </tr>
        </thead>
        <tbody >
          <?php foreach ($estados as $obj) {?>
          <tr class="tr" >
            <td class="td center-align" style="padding: 0%; margin: 0%;"><span id="con"><?php echo $obj[0]; ?></span></td>
            <td class="td center-align" style="padding: 0%; margin: 0%;"><span id="cli"><?php echo $obj[2]; ?></span></td>
            <td class="td center-align" style="padding: 0%; margin: 0%;"><span id="tip"><?php echo $obj[3]; ?></span></td>
            <td class="td center-align" style="padding: 0%; margin: 0%;"><span id="fec"><?php echo $obj[1]; ?></span></td>
            <td class="td center-align" style="padding: 0%; margin: 0%;"><span id="pag"><?php echo number_format($obj[4],2); ?></span></td>
            <td class="td center-align" style="padding: 0%; margin: 0%;" ><span id="tot"><?php echo $obj[5]; ?></span></td>
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
              </tfoot>
              <tbody>
                <tr class="ttdr">
                  <td class="center-align"><hr size="10" style="  background-color: black;  height: 1px; width: 80%;" /></td>
                  <td class=""></td>
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
    <script src="../assets/js/jquery.js?v=10.0.0.31"></script>
    <script src="../assets/js/materialize.js?v=10.0.0.31"></script>
  </body>