<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Inventarios</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.4.1.0">
  {literal}
  <style type="text/css">
    .detrep input{
      width: 100px;
    }
  </style>
  {/literal}
</head>

<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" elem="6" sp="254"  modulo="reporteinventario"></div>
      <input type="hidden" id="tuser" value="{$smarty.session.TIPO}">
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3] neq ''}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <input type="hidden" id="vidinventario" value="6">  
      <div class="col s4 m4 l4" align="center">
        <h2 align="center" style="margin-top: 0px" id="titrep">Inventario</h2>
        <font size="3">
           <b>{$MIS[2]}</b>
        </font>
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" id="ofiltr" title="Mostrar Filtros"></i>
      </div>
    </div>
    <small id="leyenda"></small>
    
    <div class="detrep"></div>
  <br><br>
  </div>

  <div class="modal modal-fixed-footer grandemodal" id="modal-notasprod">
  <div class="modal-header head2 center" style="font-size: 22px;">Notas Producto</div>
  <div class="modal-content">

      <div class="row">
        <div class="col s6">
          <b><span class="_proname"></span></b>
        </div>

        <div class="col s3">
          Cantidad(UN): <span id="npcant">0</span>
        </div>

        <div class="col s3">
          Costo(CRC): <span id="npprec">0</span>
        </div>

      </div>

      <div class="row">

        <div class="col s6"></div>

        <div class="col s6">
          <div class="col s6">
            Utilidad: <span id="nputil">0</span>%
          </div>

          <div class="col s6">
            Precio(CRC): <span id="npven">0</span>
          </div>

          <div class="col s6 segundo">
            Utilidad mts: <span id="nputil2">0</span>%
          </div>

          <div class="col s6 segundo">
            Precio(CRC): <span id="npven2">0</span>
          </div>
        </div>


      </div>

      <div class="row">
        <div class="col s8 input-field">
          <textarea id="_vnota" class="materialize-textarea" data-length="100"></textarea>
          <label for="_vnota">Nota</label>
        </div>

        <div class="col s4">
          <label for="_vtiponota">Tipo Nota</label>
          <select id="_vtiponota" class="browser-default">
            <option value="1" selected>Informativa</option>
            <option value="2">Mostrar en Facturacion</option>
          </select>
          <br>
          <a class="btn" tp="1" id="mntNotas">Guardar</a>
        </div>  
      </div>
      
      <table class="table bordered">
        <thead>
          <th>Fecha</th>
          <th>Nota</th>
          <th>Mostrar en</th>
          <th>Usuario</th>
          <th></th>
        </thead>
        <tbody id="_listanotas"></tbody>
      </table>
  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
  </div>
</div>

  {$SCR}

  {literal}
  <script type="text/javascript">
    $(function(){

      /*porCliente bisprov="1" tbltipos="11,-1,0,0,0,0,11"  tipos="Producto,Existencia,Variable,Inventariado,Gravado,CABYS,Código" types="0,7,3,3,3,3,0" portipo="varios" vids="vproducto,vexistencia,vvariable,visinventariado,vgravado,vcabys,vcodigo"*/

      $(".filtros").data('filtros',{
      "vvariable":{
        "tipo":3,
        "indeterminate" : -1,
        "texto":"Variable"
      },
      "visinventariado":{
        "tipo":3,
        "indeterminate" : -1,
        "texto":"Inventariado"
      },
      "vgravado":{
        "tipo":3,
        "indeterminate" : -1,
        "texto":"Gravado"
      },
      "vcabys":{
        "tipo":3,
        "indeterminate" : -1,
        "texto":"Cabys"
      },
      "ncliente":{
        "tipo":1,
        "texto":"Proveedor",
        "class" : "cliente",
        "attr" : "bisprov",
        "autocomplete" : {
          "id" : "vidcliente"
        }
      },
      "vproducto":{
        "tipo":1,
        "texto":"Producto"
      },
      "vinventario":{
        "tipo":6,
        "texto": "Inventario",
        "pre":{
          "tipo":6,
          "default":"0",
          "selected":6,
          "sel":"id,nombre",
          "tbl":111,
          "whr":"id>0 and idsucursal in(-1,@@impresa)"
        }
      },
      "vexistencia":{
        "tipo":2,
        "texto": "Existencia",
        "pre":{
          "tipo":1,
          "id" : "vcodigo",
          "default" : "<i class=\"mdi mdi-equal mdi-24px\" vl=\"1\" id=\"vcodigo\" val=\"1\"></i>",
          "value" : 1,
          "opciones": {
            0 :{
              "id":1,
              "name":"<a class=\"optnsflt\" tipo=\"mdi-equal\" fltr=\"1\">Igual</a>"
            },
            1 :{
              "id":2,
              "name":"<a class=\"optnsflt\" tipo=\"mdi-greater-than-or-equal\" fltr=\"2\">Mayor o Igual</a>"
            },
            2 :{
              "id":3,
              "name":"<a class=\"optnsflt\" tipo=\"mdi-greater-than\" fltr=\"3\">Mayor</a>"
            },
            3 :{
              "id":4,
              "name":"<a class=\"optnsflt\" tipo=\"mdi-less-than-or-equal\" fltr=\"4\">Menor o Igual</a>"
            },
            4 :{
              "id":5,
              "name":"<a class=\"optnsflt\" tipo=\"mdi-less-than\" fltr=\"5\">Menor</a>"
            }
          }
        }
      },
      "vcosto":{
        "tipo":2,
        "texto": "Costo",
        "change_type": 4
      }
    }
    )
    }) 
  </script>
  {/literal}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.4.1.0"></script>
  <script src="../assets/js/modulos/reportes/inventarios.js?v=10.4.1.0"></script>
</body>
</html>