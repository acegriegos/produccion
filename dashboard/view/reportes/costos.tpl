<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Utilidades</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.4.1.0">
</head>
<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" elem="2" sp="277" modulo="reporteCosto"></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3]}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s4 m4 l4" align="center">
         <h2 align="center" style="margin-top: 0px" id="titrep">Utilidades</h2>
        <font size="3">
          <b>{$MIS[0]}</b><br>
          {if $MIS[2]}<b>{$MIS[2]}</b><br>{/if}
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
         
      </div>
      <div class="col s4 m4 l4" align="center">
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" title="Mostrar Filtros" style="display:none;"></i>
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
      </div>
    </div>
    <small id="leyenda"></small>
    
    <table class="table responsive-table centered bordered z-depth-3" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
      <thead>
      <tr>
        <td class="white-text blue sinborde" style="text-align: center"><b>Usuario</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Número de Factura</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Cliente</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Código</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Producto</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Cantidad</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Costo</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Venta</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Utilidad</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>%</b></td>
      </tr>
      </thead>
      <tbody class="detrep"></tbody>
    </table>
  <br><br>
  </div>

  <ul id="extra" class="side-nav side-nav-conta1" style="overflow-y: hidden;">
    <span id="retfact" class="pbtn"><i class="mdi mdi-keyboard-backspace mdi-24px" title="Salir"></i></span>
    <i class="mdi mdi-refresh mdi-spin loader" style="font-size:65px;margin-left: 50%;"></i>
    <iframe src="" id="extra-i" style="width: 100%;height: 100vh;" class="hide"></iframe>
  </ul>
  {$SCR}
  {literal}
  <script type="text/javascript">
    $(function(){

      $(".filtros").data('filtros',{
        "vidusuario":{
          "tipo": 6,
          "texto": "Usuarios",
          "attr" : "multiple",
          "pre":{
            "tipo":6,
            "default":"",
            "sel":"id,nombre",
            "tbl":1,
            "whr":"id>0 and idsucursal in(-1,@@impresa)"
          }
        },
        "entrefechas":{
          "tipo":4,
          "texto": "Entre Fechas",
          "sub": 5,
          "values": {
            "vdesde":"1",
            "vhasta":""
          }
        },
        "vidtipo1":{
          "tipo":6,
          "texto": "Agrupado",
          "pre":{
            "tipo":6,
            "default":"0",
            "opciones":[
              {"nombre":"N/A","id":0},
              {"nombre":"Factura","id":1},
              {"nombre":"Cliente","id":2},
              {"nombre":"Producto","id":3},
              {"nombre":"Usuario","id":4}
            ]
          }
        }
      })
  })
  </script>
  {/literal}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.4.1.0"></script>
  <script src="../assets/js/modulos/reportes/costos.js?v=10.4.1.0"></script>
</body>
</html>