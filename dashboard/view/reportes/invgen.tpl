<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Inventarios</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.4.0.1">
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
      <div class="filtros row" elem="6" sp="254" porCliente bisprov="1" modulo="reporteinventario" tbltipos="11,0,0,0,0,0,0,11" tipos="Producto,Variable,Inventariado,Gravado,Existencia,Negativo,CABYS,Código" types="0,3,3,3,3,3,3,0" portipo="varios" vids="vproducto,vvariable,visinventariado,vgravado,vexistencia,vnegativo,vcabys,vcodigo"></div>
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
        <div class="col s4">
          <b><span class="_proname"></span></b>
        </div>

        <div class="col s4">
          Cantidad(UN): <span id="npcant">0</span>
        </div>

        <div class="col s4">
          Precio(CRC): <span id="npprec">0</span>
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

  <script src="../assets/js/modulos/reportes/reportes.js?v=10.4.0.1"></script>
  <script src="../assets/js/modulos/reportes/inventarios.js?v=10.4.0.1"></script>
</body>
</html>