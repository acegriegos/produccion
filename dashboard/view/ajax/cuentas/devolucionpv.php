<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link rel="stylesheet" type="text/css" href="../assets/css/materialize.css?v=10.2.0.55">
<link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css?v=10.2.0.55">
<!-- <link href="../assets/fonts/materialdesignicons/materialdesignicons.css?v=10.2.0.55"> -->
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-devolucion.css?v=10.2.0.55">
<title>Recibo de Dinero</title>
<!-- <?php $hide = $datos[24] > 2 ? 'hide':'' ?> -->
<body class="grey darken-4" style="font-size: 1.1em;" >
<!-- HEADER -->
<div class="row" style="padding-top: 8%">
<div class="col s12 m9 l9 fac"> 
<div class="hoja grey lighten-3" >
<div class="row">
<div class="col s6 m5 l3">
<br>
<?php if ($miscelaneos[3]) {
echo '<img src='.$miscelaneos[3].' id="imglogo" class="img-responsive" width="90%">';
} ?>
</div>
<div class="col s6 m7 l9 right-align">
<font size="3">
<br>
<b><span id="fnombre"><?php echo $miscelaneos[0]; ?></span></b><br>
<?php if ($miscelaneos[2]) 
echo '<b><span id="fnombre">'.$miscelaneos[2].'</span></b><br>';
?>
<b>Cédula:</b> <span id="fcedula"><?php echo $miscelaneos[1]; ?></span><br>
<b>Teléfono:</b> <span id="ftelefono"><?php echo $miscelaneos[2]; ?></span><br>
<b>Correo:</b> <span id="fcorreo"><?php echo $miscelaneos[4]; ?></span><br>
<b>Dirección:</b><br> <span id="fdireccion"><?php echo $miscelaneos[6]; ?></span><br>
</font>
</div>
</div>
<div class="row">
<div class="col s6 left-align">
<div class="row">
<div class="col s12" id="infofact" >
<b id="fact">Devolución N°</b>
<span id="numfact"> <?php echo $datos[0]; ?> </span>
</div>
</div>
</div>
</div>
<!-- /HEADER -->
<!-- INFO CONTACTO -->
<div class="row">
<div class="col s6 left-align">
<div class="row">
<div class="col s12">
<span class=""><b>Cliente:</b></span>   
<span  id="fcliente" class=""><?php echo $datos[1]; ?></span>
</div>
<div  class="col s12">
<span class=""><b>Usuario:</b></span>
<span id="fvendedor" class=""><i><?php echo $datos[4]; ?> </i></span>
</div>
</div>   
</div>
<div class="col s6">
<div class="col s6 center-align ">
<div class="card   white-text imprimirSINBOR <?php echo $hide ?>"  style="background-color: #3960A7;" style="background-color: #3960A7;">
<!-- <div class=" card-content ">
<p>Tipo de Pago:
<?php echo $datos[8]; ?> 
</p>
</div> -->
</div>
</div>
<div class="col s6 center-align">
<div class="card  white-text imprimirSINBOR" style="background-color: #3960A7;">
<div class=" card-content white-text imprimirSINBOR">
<p>Fecha:
<?php echo $datos[6]; ?> </p>
</div>
</div>
</div>
</div>
<!-- /INFO CONTACTO -->
<input type="hidden" id="fcomentario" value="<?php echo $datos[3]; ?>">
<!-- DETALLE FACT -->
<table class=" bordered  " style="border: 0px; font-size: 1.1em;">
<thead class="white-text imprimirSINBOR margen" style="background-color: #3960A7;">
<tr>
<th class="center-align sinborde" id="th1">Producto</th>
<th class="center-align sinborde" id="th2">Cantidad</th>
<th class="center-align sinborde" id="th3">Motivo</th>
</tr>
</thead>
<tbody id="ftbody">
<tr class="tr" >
<td class="td flista1 center-align"><span id="cant"><?php echo $datos[7]; ?></span></td>
<td class="td flista2 center-align"><span id="ffecha"><?php echo $datos[8]; ?></span></td>
<td class="td flista3 center-align"><span id="punit"><?php echo $datos[9]; ?></span></td>
</tr>
</tbody>
<!-- <tfoot>
<tr>
<td class="margen" colspan="3">&nbsp;</td>
<tr></tr>
<td class="margen" colspan="3">&nbsp;</td>
<td  style="background-color: #3960A7;" class=" white-text sinborde imprimirSINBOR center-align"><b>TOTAL</b></td>
<td style="background-color: #3960A7;"  class="white-text sinborde imprimirSINBOR center-align"><b><?php echo $datos[11]; ?><?php echo $datos[6]; ?></b></td>
</tr>
</tfoot> -->
</table>
<!-- /DETALLE FACT -->
<br>
<!-- INFO FACT -->
<div class="row">
<br>
</div>
</div>
</div>
</div>
<!-- <section class="hideonprint">
<div class="col s12 m3 l3 white-text">
<br>
<div id="correosclie">
<input type="hidden" id="vid" value="<?php echo $datos[27]; ?>">
</div>
<label class="white-text">Enviar factura por correo a:</label>
<div class="row">
<div class="s10 col">
<div class="chips chips-initial white-text" id="listcorreos" style="color: white;"></div>
</div>
<div class="s2 col">
<a href="#" id="lcorreos" class="right"><i class="small white-text material-icons">send</i></a>
</div>
</div>
<div class="row">
<div class="s12 col" align="center">
<span id="smail"></span>
</div>
</div>
</div>
</section> -->
</div>
<script src="../assets/js/jquery.js?v=10.2.0.55"></script>
<script src="../assets/js/materialize.js?v=10.2.0.55"></script>
<script src="../assets/js/asgard.js?v=10.2.0.55"></script>
<script src="../assets/js/modulos/recibos-notas-pagos.js?v=10.2.0.55"></script>
  <script type="text/javascript">
       $(function(){
          param = getParameterByName('fp');
          param = param == '' ? 0 : parseInt(param) ;
          
          window.onafterprint = function(){
           window.close();
         }

          if(parseInt(param)){
            window.print();
          }

       })
     </script>
</body>