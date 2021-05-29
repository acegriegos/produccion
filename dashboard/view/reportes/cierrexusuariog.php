<!DOCTYPE html>
<html>
<head>
  <title>Cierres</title>
  <meta charset="utf-8">
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
  <link rel="stylesheet" type="text/css" href="../assets/css/materialize.min.css?v=10.3.0.9">
  <style type="text/css">
    tr td{
      padding: 0;
    }
  </style>
</head>
<body>

  <div class="row">

    <div class="col s12" style="background-color: #0080C6; color: white;padding-top: 3%; padding-bottom: 3%;">
      <b align="center"><?php echo $miscelaneos[0];?></b> <br>
      <b>Cierre N°: </b>
      <span > <?php echo $cierre[0]; ?> </span><br>
      <b>Usuario: </b>
      <span > <?php echo $cierre[11]; ?> </span><br>
      <b>Fecha y Hora: </b>
      <span > <?php echo $cierre[1]; ?> </span>
    </div>

    <div class="col s6">
       <?php if($cierre[7] > 0) echo 'Ventas en Efectivo: <span style="float: right;">'.$cierre[7].'</span><br>'; ?>
      <?php if($cierre[8] > 0) echo 'Ventas con Tárjetas: <span style="float: right;">'.$cierre[8].'</span><br>'; ?>
      <?php if($cierre[9] > 0) echo 'Ventas con Depósitos: <span style="float: right;">'.$cierre[9].'</span><br>'; ?>
      <?php if($cierre[3] > 0) echo 'Total Ventas a Contado: <span style="float: right;">'.$cierre[3].'</span><br>'; ?>
      <?php if($cierre[2] > 0) echo 'Total Ventas a Crédito: <span style="float: right;">'.$cierre[2].'</span><br>'; ?>
      <!-- <?php echo $gravado.$exento.$descuento; ?>
      Ventas Totales: <span style="float: right;"><?php echo $cierre[15]; ?></span><br> -->
      <?php if($cierre[5] > 0) echo 'Notas Crédito Clientes: <span style="float: right;">'.$cierre[5].'</span><br>'; ?>
      <?php if($cierre[6] > 0) echo 'Notas Débito Clientes: <span style="float: right;">'.$cierre[6].'</span><br>'; ?>
      <?php if($cierre[21] > 0) echo 'Abonos Proveedores: <span style="float: right;">'.$cierre[21].'</span><br>'; ?>  
      <?php if($cierre[19] > 0) echo 'Entradas de Efectivo: <span style="float: right;">'.$cierre[19].'</span><br>'; ?>
      <?php if($cierre[20] > 0) echo 'Salidas de Efectivo: <span style="float: right;">'.$cierre[20].'</span><br>'; ?>
      <?php if($cierre[23] > 0) echo 'Abonos Líquidos Proveedores: <span style="float: right;">'.$cierre[23].'</span><br>'; ?> <br>
      Caja Inicial:<span style="float: right;"><?php echo number_format($cierre[14],2); ?></span><br>
      <?php if($cierre[27] > 0) echo 'Caja Inicial $: <span style="float: right;">'.number_format($cierre[27],2).'</span><br>'; ?>
      Caja Reportada: <span style="float: right;"><?php echo number_format($cierre[12],2); ?></span><br>
      <?php if($cierre[28] > 0) echo 'Caja Reportada $: <span style="float: right;">'.number_format($cierre[28],2).'</span><br>'; ?>
      <!-- Caja Reportada-Inicial: <span style="float: right;"><?php $rep = $cierre[12]-$cierre[14]/* > 0 ? $cierre[12]-$cierre[14] : $cierre[12]*/; echo number_format($rep,2); ?></span><br> -->
      Caja del Sistema: <span style="float: right;"><?php echo number_format($cierre[13],2); ?></span><br>
      Diferencia: <span style="float: right;"><?php echo number_format($cierre[12]-$cierre[13]-$cierre[14]+$cierre[28]*$cierre[29],2); ?></span><br>
      <br>
      <?php if($cierre[28] > 0) echo 'Tipo Cambio $: <span style="float: right;">'.number_format($cierre[29],2).'</span><br>'; ?>
    </div>

    <div class="col s6">
      <span>Monedas Cierre Final</span><br>
      <table class="tbl">
        <thead>
          <th>Rubro</th>
          <th>Cantidad</th>
          <th>Total</th>
        </thead>
        <tbody>
      <?php $monedas = $kakaroto->kamehameha('(select nombre from tipomonedas where id = tipomoneda) as nombre,cantidad,cantidad*(select valor from tipomonedas where id = tipomoneda) as tot',340,'idcierre = '.$_REQUEST['id'].' and idcajainicial = 0');
        $tot = 0;
        foreach ($monedas as $obj) {
          $tot += $obj[2];
          echo '<tr> <td>'.$obj[0].'</td> <td>'.$obj[1].'</td> <td style="text-align: right;">'.number_format($obj[2],2).'</td> </tr>';
        }
      ?>
    </tbody>
    <tfoot>
      <tr>
        <td>TOTAL</td>
        <td colspan="2" style="text-align: right;"> <?php echo number_format($tot,2); ?> </td>
      </tr>
    </tfoot>
    </table> 
     
    </div>


  </div>

  <script src="../assets/js/jquery.js?v=10.3.0.9"></script>
  <script src="../assets/js/materialize.min.js?v=10.3.0.9"></script>

</body>
</html>