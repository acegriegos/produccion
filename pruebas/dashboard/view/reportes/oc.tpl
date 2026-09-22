<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Ordenes de Compra Totales</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.4.1.1">
</head>
<body class="black">
  <div class="principal contenedor">
      <div class="filtros row" elem="" sp="470" modulo="reporteoc"></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3]}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s4 m4 l4" align="center">
        <font size="3">
          <b>{$MIS[2]}</b><br>
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" title="Mostrar Filtros" style="display:none;"></i>
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
      </div>
    </div>
    <h2 align="center">Ordenes de Compra</h2>
    <small id="leyenda"></small>
    
    <table class="table responsive-table centered bordered z-depth-3" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
      <thead>
      <tr>
        <td style="text-align: center"><b>Proveedor</b></td>
        <td style="text-align: center"><b>Consecutivo</b></td>
        <td style="text-align: center"><b>Estado</b></td>
        <td style="text-align: center"><b>Fecha</b></td>
        <td style="text-align: center"><b>Usuario</b></td>
        <td style="text-align: center"><b>Adjudicacion</b></td>
      </tr>
      </thead>
      <tbody class="detrep"></tbody>
    </table>
  <br><br>
  </div>
  <ul id="extra" class="side-nav side-nav-conta1" >
    <span id="retfact" class="pbtn"><i class="mdi mdi-keyboard-backspace mdi-24px" title="Salir"></i></span>
    <i class="mdi mdi-refresh mdi-spin loader" style="font-size:65px;margin-left: 50%;"></i>
    <iframe src="" id="extra-i" style="width: 100%;height: 100vh;" class="hide"></iframe>
  </ul>
  {$SCR}
  {literal}
  <script type="text/javascript">
    var param;

    $(function(){
      param = getParameterByName('tf');

      $(".filtros").data('filtros',{
      	"entrefechas":{
          "tipo":4,
          "texto": "Entre Fechas",
          "sub": 5,
          "values": {
            "vdesde":"1",
            "vhasta":""
          }
        },
        "proveedor":{
          "tipo":1,
          "texto":"Razón Social",
          "class" : "cliente",
          "attr"  : 'bisprov',
          "autocomplete" : {
            "id" : "vidproveedor"
          }
        },
        "viduser":{
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
        "voc":{
        	"tipo":1,
            "texto":"Consecutivo"
        },
        "cliente":{
          "tipo":1,
          "texto":"Cliente",
          "class" : "cliente",
          "autocomplete" : {
            "id" : "vidcliente"
          },
          "change_type" : 6
        },
        "producto":{
          "tipo":1,
          "texto":"Producto",
          "class" : "producto",
          "autocomplete" : {
            "id" : "vidproducto"
          },
          "change_type" : 6
        },
        "videstado":{
          "tipo":6,
          "texto": "Estado",
          "change_type" : 0,
          "pre":{
            "tipo":6,
            "default":"0",
            "opciones":[
              {"nombre":"N/A","id":0},
              {"nombre":"Generada","id":1},
              {"nombre":"Editada","id":2},
              {"nombre":"Anulada","id":3},
              {"nombre":"Procesada","id":10}
            ]
          }
        },
        "vcomodin":{
          "tipo" : 1,
          "texto" : "Comodin",
          "change_type" : 0
        }
       
      })

      $(".filtros").data('filtros')['cliente']['attr'] = 'bisprov'
    })
  </script>
  {/literal}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.4.1.1"></script>
  {literal}
  <script type="text/javascript">
    $(function(){
      arr('login',6,'',470,'@@impresa,"","","",0,0,0,0,0,0,0',0,1,$(".detrep"));
    })
  </script>
  {/literal}
</body>
</html>