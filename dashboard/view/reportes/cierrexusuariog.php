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

    @media print {
      *{
        font-size: 12px !important;
      }

      .salto {
        clear: both;
        page-break-before: always;
      }
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
      <span > <?php echo $cierre[1]; ?> </span><br>
      <b>Fecha y Hora: </b>
      <span > <?php echo $cierre[2]; ?> </span>
    </div>

    <div class="col s12">
       
       <center><b>ELECTRONICAS</b></center>
  <table class="tbl hovered stripped borderded">
    <tr>
      <td style="width:10%;"><b>CONSECUTIVO</b></td>
      <td style="width:60%;"><b>RAZÓN SOCIAL</b></td>
      <td style="width:15%;"><b>TIPO PAGO</b></td>
      <td style="width:15%;"><b>TOTAL</b></td>
    </tr>
    <tbody id="listafacturas"></tbody>
    <tfoot style="border-top: 1px dashed black;">
      <tr>
        <td colspan="2"><b>LINEAS:</b> <span id="listafacturas_count">0</span></td>
        <td><b>EFECTIVO:</b></td>
        <td style="text-align: right;"><span id="listafacturas_efectivo">0.00</span></td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><b>TARJETAS:</b></td>
        <td style="text-align: right;"><span id="listafacturas_tarjeta">0.00</span></td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><b>BANCOS:</b></td>
        <td style="text-align: right;"><span id="listafacturas_bancos">0.00</span></td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><b>TOTAL CONTADO:</b></td>
        <td style="text-align: right;"><span id="listafacturas_total_c">0.00</span></td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><b>TOTAL CREDITO:</b></td>
        <td style="text-align: right;"><span id="listafacturas_total_r">0.00</span></td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><b>TOTAL:</b></td>
        <td style="text-align: right;"><span id="listafacturas_total">0.00</span></td>
      </tr>

    </tfoot>
  </table>
  <hr>
  <center class="salto"><b>01</b></center>
  <table class="tbl hovered stripped borderded">
    <tr>
      <td style="width:10%;"><b>CONSECUTIVO</b></td>
      <td style="width:60%;"><b>RAZÓN SOCIAL</b></td>
      <td style="width:15%;"><b>TIPO PAGO</b></td>
      <td style="width:15%;"><b>TOTAL</b></td>
    </tr>
    <tbody id="_listafacturas"></tbody>
    <tfoot style="border-top: 1px dashed black;">
      <tr>
        <td colspan="2"><b>LINEAS:</b> <span id="_listafacturas_count">0</span></td>
        <td><b>EFECTIVO:</b></td>
        <td style="text-align: right;"><span id="_listafacturas_efectivo">0.00</span></td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><b>TARJETAS:</b></td>
        <td style="text-align: right;"><span id="_listafacturas_tarjeta">0.00</span></td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><b>BANCOS:</b></td>
        <td style="text-align: right;"><span id="_listafacturas_bancos">0.00</span></td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><b>TOTAL CONTADO:</b></td>
        <td style="text-align: right;"><span id="_listafacturas_total_c">0.00</span></td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><b>TOTAL CREDITO:</b></td>
        <td style="text-align: right;"><span id="_listafacturas_total_r">0.00</span></td>
      </tr>
      <tr>
        <td colspan="2"></td>
        <td><b>TOTAL:</b></td>
        <td style="text-align: right;"><span id="_listafacturas_total">0.00</span></td>
      </tr>

    </tfoot>
  </table>

  <hr>

  <table class="tbl hovered stripped borderded">
    <tr>
      <td style="width:10%;"><b>TOTALES</b>(<span id="cntt">0</span>)</td>
      <td style="width:60%"></td>
      <td style="width:15%;"></td>
      <td style="width:15%;"></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><b>EFECTIVO:</b></td>
      <td style="text-align: right;" id="ttot_efe">0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><b>TARJETAS:</b></td>
      <td style="text-align: right;" id="ttot_tar">0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><b>BANCOS:</b></td>
      <td style="text-align: right;" id="ttot_bnk">0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><b>TOTAL CONTADO:</b></td>
      <td style="text-align: right;" id="ttot_tot_c">0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><b>TOTAL CREDITO:</b></td>
      <td style="text-align: right;" id="ttot_tot_r">0.00</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><b>TOTAL:</b></td>
      <td style="text-align: right;" id="ttot_tot">0.00</td>
    </tr>
  </table>

    <br class="salto">
    <center><b>PENDIENTES</b></center>

    </div>


  </div>

  <script src="../assets/js/jquery.js?v=10.3.0.9"></script>
  <script src="../assets/js/materialize.min.js?v=10.3.0.9"></script>
  <script src="../assets/js/asgard.js?v=10.3.0.20-4"></script>
  <script src="../assets/js/main.js?v=10.3.0.20"></script>
  <script type="text/javascript">
    $(function(){
      cargarCierre('');
    });

    function cargarCierre(vfecha){
      var vfecha = vfecha == '' ? 'curdate()' : '"'+vfecha+'"';
      var str = _str = '';
      var cnt = scnt = 0;
      var total_c = total_e = total_efe = total_tar = total_bnk = total_cr = 0;
      var total_sc = total_s = total_sefe = total_star = total_sbnk = total_scr = 0;
      var id = getParameterByName('id');
      var filas = getDatos('',905,id); /*"2022-07-25"*/
      
      var cache = scache = 0;

      $.each(filas[0],function(i,e){
        e[2] = parseFloat(e[2]);
        var border = '';

        if(e[4] == 8){
          if(parseInt(e[5]) != scache){
            scache = e[5];
            border = 'border-top: 1px solid black';
          }
          _str += '<tr style="'+border+'"> <td>'+e[0]+'</td> <td>'+e[1]+'</td> <td>'+e[3]+'</td> <td style="text-align: right;">'+e[2].formatMoney(2,'.',',')+'</td> </tr>';

          switch(parseInt(e[5])){
            case 1:
              total_sefe += e[2];
              break;
            case 2:
              total_star += e[2];
              break;
            case 3:
              total_scr += e[2];
              break;
            default:
              total_sbnk += e[2];
              break;
          }

          scnt ++;  
        }else{
          if(parseInt(e[5]) != scache){
            scache = e[5];
            border = 'border-top: 1px solid black';
          }

          str += '<tr style="'+border+'"> <td>'+e[0]+'</td> <td>'+e[1]+'</td> <td>'+e[3]+'</td> <td style="text-align: right;">'+e[2].formatMoney(2,'.',',')+'</td> </tr>';

          switch(parseInt(e[5])){
            case 1:
              total_efe += e[2];
              break;
            case 2:
              total_tar += e[2];
              break;
            case 3:
              total_cr += e[2];
              break;
            default:
              total_bnk += e[2];
              break;
          }

          cnt ++;
        }

      });

      $("#cntt").html(cnt+scnt);
      total_c = total_efe+total_tar+total_bnk;
      total_sc = total_sefe+total_star+total_sbnk;

      $("#listafacturas").html(str)
      $("#listafacturas_count").html(cnt)
      $("#listafacturas_efectivo").html(total_efe.formatMoney(2,'.',','))
      $("#listafacturas_tarjeta").html(total_tar.formatMoney(2,'.',','))
      $("#listafacturas_bancos").html(total_bnk.formatMoney(2,'.',','))
      $("#listafacturas_total_c").html((total_c).formatMoney(2,'.',','))
      $("#listafacturas_total_r").html((total_cr).formatMoney(2,'.',','))
      $("#listafacturas_total").html((total_c+total_cr).formatMoney(2,'.',','))

      $("#_listafacturas").html(_str)
      $("#_listafacturas_count").html(scnt)
      $("#_listafacturas_efectivo").html(total_sefe.formatMoney(2,'.',','))
      $("#_listafacturas_tarjeta").html(total_star.formatMoney(2,'.',','))
      $("#_listafacturas_bancos").html(total_sbnk.formatMoney(2,'.',','))
      $("#_listafacturas_total_c").html((total_sc).formatMoney(2,'.',','))
      $("#_listafacturas_total_r").html((total_scr).formatMoney(2,'.',','))
      $("#_listafacturas_total").html((total_sc+total_scr).formatMoney(2,'.',','))

      $("#ttot_efe").html((total_sefe+total_efe).formatMoney(2,'.','.'))
      $("#ttot_tar").html((total_star+total_tar).formatMoney(2,'.','.'))
      $("#ttot_bnk").html((total_sbnk+total_bnk).formatMoney(2,'.','.'))
      $("#ttot_tot_c").html((total_c+total_sc).formatMoney(2,'.','.'))
      $("#ttot_tot_r").html((total_cr+total_scr).formatMoney(2,'.','.'))
      $("#ttot_tot").html((total_c+total_sc+total_cr+total_scr).formatMoney(2,'.','.'))
    }

  </script>
</body>
</html>