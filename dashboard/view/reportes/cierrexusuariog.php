<!DOCTYPE html>
<html>
<head>
  <title>Cierres</title>
  <meta charset="utf-8">
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
  <link rel="stylesheet" type="text/css" href="../assets/css/materialize.min.css?v=10.4.1.0">
  <style type="text/css">
    tr td{
      padding: 0;
    }

    .row{
      margin: 0;
    }

    @media print {
      @page {
        size: landscape;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 10%;
      }

      *{
        font-size: 14px !important;
      }

      .salto {
        clear: both;
        page-break-before: always;
      }
    }
  </style>
</head>
<body>
      <?php 
          $param = isset($_REQUEST['tp']) ? $_REQUEST['tp'] :0;
          $cant_facts = 0;

          $tot_efe_fact = $tot_efe_abc = $tot_efe_abp = $tot_efe_nc = 0;
          $tot_tar_fact = $tot_tar_abc = $tot_tar_abp = $tot_tar_nc = 0;
          $tot_dep_fact = $tot_dep_abc = $tot_dep_abp = $tot_dep_nc = 0;
          $tot_che_fact = $tot_che_abp = $tot_che_abc = $tot_che_nc = 0;
          $tot_efe_spe  = $tot_tar_spe = $tot_dep_spe = $tot_che_spe = 0;
          $tot_cre = $tot_cre_nc = $tot_cre_spe = 0;
          $tot_saf_fact = $tot_saf_spe = $tot_saf_abc = 0;

          $str_tabla = '';
          $expr = '/(?<=\s|^)[A-Z]/';

          foreach ($detalle as $key => $value) {
            switch($value[7]){
              case 0:
                $cant_facts++;
                switch($value[8]){
                  case 0:
                    $tot_cre += $value[5];
                    break;
                  case 1:
                    $tot_efe_fact += $value[5];
                    break;
                  case 2:
                    $tot_tar_fact += $value[5];
                    break;
                  case 3:
                    $tot_dep_fact += $value[5];
                    break;
                  case 4:
                    $tot_che_fact += $value[5];
                    break;
                  case 6:
                    $tot_saf_fact += $value[5];
                    break;
                  default:
                    break;
                }
                break;
              case 3:
              case 7:
                switch($value[8]){
                  case 1:
                    $tot_efe_abc += $value[5];
                    break;
                  case 2:
                    $tot_tar_abc += $value[5];
                    break;
                  case 3:
                    $tot_dep_abc += $value[5];
                    break;
                  case 4:
                    $tot_che_abc += $value[5];
                    break;
                  case 6:
                    $tot_saf_abc += $value[5];
                    break;
                  default:
                    break;
                }
                break;
              case 4:
              case 8:
                switch($value[8]){
                  case 1:
                    $tot_efe_abp += $value[5];
                    break;
                  case 2:
                    $tot_tar_abp += $value[5];
                    break;
                  case 3:
                    $tot_dep_abp += $value[5];
                    break;
                  default:
                    break;
                }
                break;
              case 5:
                switch($value[8]){
                  case 0:
                    $tot_cre_nc += $value[5];
                    break;
                  case 1:
                    $tot_efe_nc += $value[5];
                    break;
                  case 2:
                    $tot_tar_nc += $value[5];
                    break;
                  case 3:
                    $tot_dep_nc += $value[5];
                    break;
                  case 4:
                    $tot_che_nc += $value[5];
                    break;
                  default:
                    break;
                }
                break;
              case 9:
                switch($value[8]){
                  case 0:
                    $tot_cre_spe += $value[5];
                    break;
                  case 1:
                    $tot_efe_spe += $value[5];
                    break;
                  case 2:
                    $tot_tar_spe += $value[5];
                    break;
                  case 3:
                    $tot_spe_nc += $value[5];
                    break;
                  case 4:
                    $tot_che_spe += $value[5];
                    break;
                  case 6:
                    $tot_saf_spe += $value[5];
                    break;
                  default:
                    break;
                }
                break;
              default:
                break;
            }

            //$value[1] = preg_match_all($expr, $value[1], $matches);
            $_hidec = $value[8] == 1 || $value[8] == 2 ? '' : 'hide';
            $_hidec = $param == 1 ? $_hidec : '';

            $str_tabla .= ' <tr class="'.$_hidec.'"> <td>'.$value[0].'</td> <td>'.$value[1].'</td> <td>'.$value[6].'</td> <td>'.$value[2].'</td> <td>'.$value[3].'</td> <td>'.$value[4].'</td> <td style="text-align: right">'.number_format($value[5],2).'</td> </tr> ';
          }

          $totfact = $tot_efe_fact+$tot_tar_fact+$tot_dep_fact+$tot_cre+$tot_che_fact+$tot_saf_fact;
          $totspe  = $tot_efe_spe+$tot_tar_spe+$tot_dep_spe+$tot_cre_spe+$tot_che_spe+$tot_saf_spe;
          $totabc = $tot_efe_abc+$tot_tar_abc+$tot_dep_abc+$tot_che_abc+$tot_saf_abc;
          $totnc = $tot_efe_nc+$tot_tar_nc+$tot_dep_nc+$tot_cre_nc+$tot_cre_spe+$tot_che_nc;
          $totabp = $tot_efe_abp+$tot_tar_abp+$tot_dep_abp+$tot_che_abp;
          $totefe = $tot_efe_fact+$tot_efe_abc-$tot_efe_abp-$tot_efe_nc+$tot_efe_spe;
          $tottar = $tot_tar_fact+$tot_tar_abc-$tot_tar_abp-$tot_tar_nc+$tot_tar_spe;
          $totdep = $tot_dep_fact+$tot_dep_abc-$tot_dep_abp-$tot_dep_nc+$tot_dep_spe;
          $totche = $tot_che_fact+$tot_che_abc-$tot_che_abp-$tot_che_nc+$tot_che_spe;
          $totsaf = $tot_saf_fact+$tot_saf_abc+$tot_dep_spe;
          $gtot = $totfact+$totabc-$totabp-$totnc+$totspe+$totche+$totsaf; 

         ?>
  <div class="row" style="padding-top: 1%;">

    <div class="col s6" style="color: black;padding-left: 0px;">
      <b align="center"><?php echo $miscelaneos[2]==''?$miscelaneos[0]:$miscelaneos[2] ?></b> <br>
      <b>Cierre N°: </b>
      <span > <?php echo $datos[0]; ?> </span><br>
      <b>Usuario: </b>
      <span > <?php echo $datos[2]; ?> </span><br>
      <b>Fecha y Hora: </b>
      <span > <?php echo $datos[1]; ?> </span>
    </div>

    <div class="col s6">
      <table class="tbl striped">
        <tr>
          <td>CAJA INICIAL</td>
          <td style="text-align:right;"><?php echo number_format($datos[5],2); ?></td>
        </tr>
        <tr>
          <td>ENTRADAS</td>
          <td style="text-align:right;"><?php echo number_format($datos[3],2); ?></td>
        </tr>
        <tr>
          <td>SALIDAS</td>
          <td style="text-align:right;"><?php echo number_format($datos[4],2); ?></td>
        </tr>
        <tr>
          <td>CAJA FINAL</td>
          <td style="text-align:right;"><?php echo number_format($datos[6],2); ?></td>
        </tr>
        <!-- <tr>
          <td>CAJA SISTEMA</td>
          <td style="text-align:right;"><?php echo number_format($totefe,2); ?></td>
        </tr> -->
        <tr>
          <td>DIFERENCIA</td>
          <td style="text-align:right;"><?php echo number_format($datos[6]-$datos[5]+$datos[3]-$datos[4],2); ?></td>
        </tr>
      </table>
    </div>

    <table class="tbl striped" id="cuadrog">
      <thead>
        <tr>
          <th></th>
          <th class="column_efectivo" style="text-align: center;">Efectivo</th>
          <th class="column_tarjeta" style="text-align: center;">Tarjeta</th>
          <th class="column_deposito" style="text-align: center;">Depósito</th>
          <th class="column_cheque" style="text-align: center;">Cheque</th>
          <th class="column_credito" style="text-align: center;">Créditos</th>
          <th class="column_saf" style="text-align: center;">Saldo a Favor</th>
          <th class="column_total" style="text-align: center;">Total</th>
        </tr>
        <tbody>
          <tr>
            <td>(+)<b>Facturas</b></td>
            <td class="column_efectivo" style="text-align: right;"><?php echo number_format($tot_efe_fact,2); ?></td>
            <td class="column_tarjeta" style="text-align: right;"><?php echo number_format($tot_tar_fact,2); ?></td>
            <td class="column_deposito" style="text-align: right;"><?php echo number_format($tot_dep_fact,2); ?></td>
            <td class="column_cheque" style="text-align: right;"><?php echo number_format($tot_che_fact,2); ?></td>
            <td class="column_credito" style="text-align: right;"><?php echo number_format($tot_cre,2) ?></td>
            <td class="column_saf" style="text-align: right;"><?php echo number_format($tot_saf_fact,2); ?></td>
            <td class="column_total" style="text-align: right;"><?php echo number_format($totfact,2) ?></td>
          </tr>
          <tr>
            <td>(+)<b>Especiales</b></td>
            <td class="column_efectivo" style="text-align: right;"><?php echo number_format($tot_efe_spe,2); ?></td>
            <td class="column_tarjeta" style="text-align: right;"><?php echo number_format($tot_tar_spe,2); ?></td>
            <td class="column_deposito" style="text-align: right;"><?php echo number_format($tot_dep_spe,2); ?></td>
            <td class="column_cheque" style="text-align: right;"><?php echo number_format($tot_che_spe,2); ?></td>
            <td class="column_credito" style="text-align: right;"><?php echo number_format($tot_cre_spe,2) ?></td>
            <td class="column_saf" style="text-align: right;"><?php echo number_format($tot_saf_spe,2); ?></td>
            <td class="column_total" style="text-align: right;"><?php echo number_format($totspe,2) ?></td>
          </tr>
          <tr>
            <td>(+)<b>Abonos Clientes</b></td>
            <td class="column_efectivo" style="text-align: right;"><?php echo number_format($tot_efe_abc,2); ?></td>
            <td class="column_tarjeta" style="text-align: right;"><?php echo number_format($tot_tar_abc,2); ?></td>
            <td class="column_deposito" style="text-align: right;"><?php echo number_format($tot_dep_abc,2); ?></td>
            <td class="column_cheque" style="text-align: right;"><?php echo number_format($tot_che_abc,2); ?></td>
            <td class="column_credito" style="text-align: right;">0.00</td>
            <td class="column_saf" style="text-align: right;"><?php echo number_format($tot_saf_abc,2); ?></td>
            <td class="column_total" style="text-align: right;"><?php echo number_format($totabc,2) ?></td>
          </tr>
          <tr>
            <td>(-)<b>Abonos Proveedor</b></td>
            <td class="column_efectivo" style="text-align: right;"><?php echo number_format($tot_efe_abp,2); ?></td>
            <td class="column_tarjeta" style="text-align: right;"><?php echo number_format($tot_tar_abp,2); ?></td>
            <td class="column_deposito" style="text-align: right;"><?php echo number_format($tot_dep_abp,2); ?></td>
            <td class="column_cheque" style="text-align: right;"><?php echo number_format($tot_che_abp,2); ?></td>
            <td class="column_credito" style="text-align: right;">0.00</td>
            <td class="column_saf" style="text-align: right;">0.00</td>
            <td class="column_total" style="text-align: right;"><?php echo number_format($totabp,2) ?></td>
          </tr>
          <tr>
            <td>(-)<b>Notas Crédito</b></td>
            <td class="column_efectivo" style="text-align: right;"><?php echo number_format($tot_efe_nc,2); ?></td>
            <td class="column_tarjeta" style="text-align: right;"><?php echo number_format($tot_tar_nc,2); ?></td>
            <td class="column_deposito" style="text-align: right;"><?php echo number_format($tot_dep_nc,2); ?></td>
            <td class="column_cheque" style="text-align: right;"><?php echo number_format($tot_che_nc,2); ?></td>
            <td class="column_credito" style="text-align: right;"><?php echo number_format($tot_cre_nc,2); ?></td>
            <td class="column_saf" style="text-align: right;">0.00</td>
            <td class="column_total" style="text-align: right;"><?php echo number_format($totnc,2) ?></td>
          </tr>
          <tr>
            <td><b>Total</b></td>
            <td class="column_efectivo" style="text-align: right;"><?php echo number_format($totefe,2) ?></td>
            <td class="column_tarjeta" style="text-align: right;"><?php echo number_format($tottar,2) ?></td>
            <td class="column_deposito" style="text-align: right;"><?php echo number_format($totdep,2) ?></td>
            <td class="column_cheque" style="text-align: right;"><?php echo number_format($totche,2) ?></td>
            <td class="column_credito" style="text-align: right;"><?php echo number_format($tot_cre-$tot_cre_nc,2); ?></td>
            <td class="column_saf" style="text-align: right;"><?php echo number_format($totsaf,2) ?></td>
            <td class="column_total" style="text-align: right;"><?php echo number_format($gtot,2) ?></td>
          </tr>
        </tbody>
      </thead>
    </table>

    <table class="tbl striped" id="listafacturas">
      <thead>
        <tr>
          <th>Consecutivo</th>
          <th>Tipo</th>
          <th>Pago</th>
          <th>Hora</th>
          <th>Usuario</th>
          <th style="width: 35%">Cliente</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <?php echo $str_tabla; ?>
      </tbody>
      <tfoot style="border-top: 1px solid #e2e2e2;">
       
      </tfoot>
    </table>

  </div>

  <script src="../assets/js/jquery.js?v=10.4.1.0"></script>
  <script type="text/javascript">
    
    $(function(){
      let tp = getParameterByName('tp');
      console.log(tp)
      let tuser = <?php  echo $tp_usuario;  ?>;
      tp = tuser == 1 ? 0: tp;
      switch(tp){
        case '1': //cajas
          $(".column_credito").hide()
          $(".column_deposito").hide()
          $(".column_total").hide()
          $("#listafacturas").hide()
          break;
        default:
          break;
      }
    });

    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),results = regex.exec(location.search);
      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
  </script>
</body>
</html>
