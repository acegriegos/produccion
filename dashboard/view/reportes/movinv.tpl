<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Movimientos de Inventario</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.4.1.0">
</head>
<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" elem="" sp="284" modulo="reportemovinv"></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3] neq ''}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s4 m4 l4" align="center">
        <font size="3">
           <b>{$MIS[2]}</b><br>
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" id="ofiltr" title="Mostrar Filtros"></i>
      </div>
    </div>
    <h2 align="center">Movimientos de Inventario</h2>
    <small id="leyenda"></small>
    <div class="detrep"></div>
  <br><br>

  <ul id="extra" class="side-nav side-nav-conta1" >
    <span id="retfact" class="pbtn"><i class="mdi mdi-keyboard-backspace mdi-24px" title="Salir"></i></span>
    <i class="mdi mdi-refresh mdi-spin loader" style="font-size:65px;margin-left: 50%;"></i>
    <iframe src="" id="extra-i" style="width: 100%;height: 100vh;" class="hide"></iframe>
  </ul>
  </div>
  {$SCR}
  {literal}
    <script type="text/javascript">
      $(function(){
        $(".filtros").data('filtros',{
          /*porproducto tbltipos="256,-1,20,-1" tipos="Movimiento,Agrupado,Por Familia,Comodin" types="1,3,1,0" portipo="varios"*/
          "entrefechas":{
            "tipo":4,
            "texto": "Entre Fechas",
            "sub": 5,
            "values": {
              "vdesde":"1",
              "vhasta":""
            }
          },
          "nproducto":{
            "tipo":1,
            "texto":"Producto",
            "class":"producto",
            "autocomplete":{
              "id":"vidproducto"
            }
          },
          "vtipomovimiento":{
            "tipo":6,
            "texto":"Tipo Movimiento",
            "pre":{
              "tipo":6,
              "default":"0",
              "sel":"id,nombre",
              "tbl":"256",
              "whr":"id>0"
            }
          },
          "vagrupado":{
            "tipo":3,
            "indeterminate" : 0,
            "texto":"Agrupado"
          },
          "vcomodin":{
            "tipo":1,
            "texto":"Comodín"
          }
        })
      })
    </script>
  {/literal}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.4.1.0-1"></script>
  <script src="../assets/js/modulos/reportes/inventarios.js?v=10.4.1.0-2"></script>
</body>
</html>