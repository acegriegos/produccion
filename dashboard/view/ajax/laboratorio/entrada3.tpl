<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Laboratorio de Biología Molecular</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-laboratorio.css?v=10.0.0.77">
  </head>
<body>
  {$NAV}
    <div class="bdy pequeño">
      <div class="card z-depth-5 pequeño">

        <nav class="nav-extended">
          <div class="nav-wrapper head1">
            <a href="#!" class="brand-logo center"><h5 class="truncate">Laboratorio de Biología Molecular</h5></a>
            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="mdi mdi-menu"></i></a>
          </div>
          <div class="nav-content head2">
            <ul class="side-nav" id="mobile-demo">
              <li class="menu3 tab" id="m0"> <a class="active">Recepción de Muestras</a></li>
              <li class="menu3 tab" id="m36"><a>Preparación de Muestra</a></li>
              <li class="menu3 tab" id="m37"><a>Extracción de Ácidos Nucleicos</a></li>
              <li class="menu3 tab" id="m38"><a>Ampificación de AND Por Punto Final</a></li>
              <li class="menu3 tab" id="m39"><a>Electroforesi 5 de Agarosa</a></li>
              <li class="menu3 tab" id="m40"><a>Electroforesi 5 de Acrilamida</a></li>
              <li class="menu3 tab" id="m43"><a>Ampificación ADN Por Tiempo Real</a></li>
              <li class="menu3 tab" id="m5"> <a>QoS</a></li>
              <li class="menu3 tab" id="m6"> <a>Reporte</a></li>
            </ul>
            <ul class="tabs tabs-transparent hide-on-small-only">
              <li class="menu3" id="m0"> <a class="white-text">Recepción de Muestras</a></li>
              <li class="menu3" id="m36"><a class="white-text">Preparación de Muestra</a></li>
              <li class="menu3" id="m37"><a class="white-text">Extracción de Ácidos Nucleicos</a></li>
              <li class="menu3" id="m38"><a class="white-text">Ampificación de AND Por Punto Final</a></li>
              <li class="menu3" id="m39"><a class="white-text">Electroforesi 5 de Agarosa</a></li>
              <li class="menu3" id="m40"><a class="white-text">Electroforesi 5 de Acrilamida</a></li>
              <li class="menu3" id="m43"><a class="white-text">Ampificación ADN Por Tiempo Real</a></li>
              <li class="menu3" id="m5"> <a class="white-text">QoS</a></li>
              <li class="menu3" id="m6"> <a class="white-text">Reporte</a></li>
            </ul>
          </div>
        </nav>

<!--         <div class="card-header center head1 z-depth-1">
          <h5>Laboratorio de Biología Molecular</h5>
            <ul class="tabs tabs-fixed-width head2" style="cursor: pointer;">
              <li class="menu3 tab" id="m0"><a class="white-text tamLetra" class="active">Recepción de Muestras</a></li>
              <li class="menu3 tab" id="m36"><a class="white-text tamLetra">Preparación de Muestra</a></li>
              <li class="menu3 tab" id="m37"><a class="white-text tamLetra">Extracción de Ácidos Nucleicos</a></li>
              <li class="menu3 tab" id="m38"><a class="white-text tamLetra">Ampificación de AND Por Punto Final</a></li>
              <li class="menu3 tab" id="m39"><a class="white-text tamLetra">Electroforesi 5 de Agarosa</a></li>
              <li class="menu3 tab" id="m40"><a class="white-text tamLetra">Electroforesi 5 de Acrilamida</a></li>
              <li class="menu3 tab" id="m43"><a class="white-text tamLetra">Ampificación ADN Por Tiempo Real</a></li>
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
    <script src="../assets/js/modulos/laboratorio.js?v=10.0.0.77"></script>
  </body>
</html>