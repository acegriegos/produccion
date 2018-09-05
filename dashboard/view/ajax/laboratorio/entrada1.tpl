<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Laboratorio de Cortesia Flavipes</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-laboratorio.css?v=10.0.0.48">
  </head>
<body>
  {$NAV}
    <div class="bdy pequeño">
      <div class="card z-depth-5 pequeño">

        <nav class="nav-extended">
          <div class="nav-wrapper head1">
            <a href="#!" class="brand-logo center"><h5 class="truncate">Laboratorio de Cortesia Flavipes</h5></a>
            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="mdi mdi-menu"></i></a>
          </div>
          <div class="nav-content head2">
            <ul class="side-nav" id="mobile-demo">
              <li class="menu3 tab" id="m0"><a class="active">Crisálidas</a></li>
              <li class="menu3 tab" id="m11"><a>Copulación</a></li>
              <li class="menu3 tab" id="m12"><a>Recolección de Posturas</a></li>
              <li class="menu3 tab" id="m13"><a>Inoculación</a></li>
              <li class="menu3 tab" id="m14"><a>Parasitación</a></li>
              <li class="menu3 tab" id="m15"><a>Revisión</a></li>
              <li class="menu3 tab" id="m16"><a>Puparios</a></li>
              <li class="menu3 tab" id="m17"><a>Empaque</a></li>
              <li class="menu3 tab" id="m5"><a>QoS</a></li>
              <li class="menu3 tab" id="m6"><a>Reporte</a></li>
            </ul>
            <ul class="tabs tabs-transparent hide-on-small-only">
              <li class="menu3" id="m0"><a class="white-text" class="active">Crisálidas</a></li>
              <li class="menu3" id="m11"><a class="white-text">Copulación</a></li>
              <li class="menu3" id="m12"><a class="white-text">Recolección de Posturas</a></li>
              <li class="menu3" id="m13"><a class="white-text">Inoculación</a></li>
              <li class="menu3" id="m14"><a class="white-text">Parasitación</a></li>
              <li class="menu3" id="m15"><a class="white-text">Revisión</a></li>
              <li class="menu3" id="m16"><a class="white-text">Puparios</a></li>
              <li class="menu3" id="m17"><a class="white-text">Empaque</a></li>
              <li class="menu3" id="m5"><a class="white-text">QoS</a></li>
              <li class="menu3" id="m6"><a class="white-text">Reporte</a></li>
            </ul>
          </div>
        </nav>

<!--         <div class="card-header center head1 z-depth-1">
          <h5>Laboratorio de Cortesia Flavipes</h5>
            <ul class="tabs tabs-fixed-width head2" style="cursor: pointer;">
              <li class="menu3 tab" id="m0"><a class="white-text tamLetra" class="active">Crisálidas</a></li>
              <li class="menu3 tab" id="m11"><a class="white-text tamLetra">Copulación</a></li>
              <li class="menu3 tab" id="m12"><a class="white-text tamLetra">Recolección de Posturas</a></li>
              <li class="menu3 tab" id="m13"><a class="white-text tamLetra">Inoculación</a></li>
              <li class="menu3 tab" id="m14"><a class="white-text tamLetra">Parasitación</a></li>
              <li class="menu3 tab" id="m15"><a class="white-text tamLetra">Revisión</a></li>
              <li class="menu3 tab" id="m16"><a class="white-text tamLetra">Puparios</a></li>
              <li class="menu3 tab" id="m17"><a class="white-text tamLetra">Empaque</a></li>
              <li class="menu3 tab" id="m5"><a class="white-text tamLetra">QoS</a></li>
              <li class="menu3 tab" id="m6"><a class="white-text tamLetra">Reporte</a></li>
            </ul>
        </div> -->
          <div class="card-panel pequeño" id="labajax"><!-- AJAX --></div>
        </div>
      </div>

      <div id="modal-formula" class="modal modal-fixed-footer grandemodal">
      <div class="modal-header head2" style="margin: 0px; padding: 10px">
        <h5 class="modal-title center-align">Agregar Medio de Cultivo</h5>
      </div>
      <div class="modal-content" style="padding-top:2px">
        <div class="row">
          
          <div class="col s10">
            <table class="responsive-table highlight z-depth-3">
              <thead class="tab1">
                <th></th>
                <th>Componente</th>
                <th>Cantidad</th>
              </thead>
              <tbody id="mcul-lista"></tbody>
            </table>
          </div>

          <div class="col s2 input-field">
            <select id="mc-cantidad" style="width: 50%">
              {section name=LE loop=$CANT}
                <option value="{$CANT[LE][0]}" mul="{$CANT[LE][1]}">{$CANT[LE][1]} {$CANT[LE][2]}</option>
              {/section}
            </select>
            <label for="mc-cantidad">Cantidad</label>
          </div>

        </div>
      </div>
      <div class="modal-footer ">
        <a class="modal-action waves-effect waves-green btn-flat z-depth-3" id="gcultivo" save="0">Asignar</a>
        <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
      </div>
    </div>

    <div id="modal-bandeja" class="modal modal-fixed-footer grandemodal">
      <div class="modal-header head2 padding1">
        <h5 class="modal-title center-align">Agregar bandeja</h5>
      </div>
      <div class="modal-content row">
        <div class="col s6 m6 l6">
        <select type="select" id="invactivlab"></select>
      </div>
      </div>
      <div class="modal-footer">
        <a class="modal-action waves-effect waves-green btn-flat z-depth-5" id="mbandeja">Guardar</a>
        <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
      </div>
    </div>
    
    {$SCR}
    <script src="../assets/js/modulos/laboratorio.js?v=10.0.0.48"></script>
  </body>
</html>