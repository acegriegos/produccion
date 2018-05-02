<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Laboratorio de Cultivo de Tejidos</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-laboratorio.css">
  </head>
<body>
  {$NAV}
    <div class="bdy pequeño">
      <div class="card z-depth-5 pequeño">
        <div class="card-header center head1 z-depth-1">
          <h5>Laboratorio de Cultivo de Tejidos</h5>
            <ul class="tabs tabs-fixed-width head2" style="cursor: pointer;">
              <li class="menu3 tab" id="m0"><a class="white-text tamLetra" class="active">Recepción de Explantes</a></li>
              <li class="menu3 tab" id="m1"><a class="white-text tamLetra">Iniciación</a></li>
              <li class="menu3 tab" id="m2"><a class="white-text tamLetra">Multiplicación</a></li>
              <li class="menu3 tab" id="m3"><a class="white-text tamLetra">Enraizamiento</a></li>
              <li class="menu3 tab" id="m4"><a class="white-text tamLetra">Aclimatación</a></li>
              <li class="menu3 tab" id="m5"><a class="white-text tamLetra">QoS</a></li>
              <li class="menu3 tab" id="m6"><a class="white-text tamLetra">Reporte</a></li>
            </ul>
        </div>
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
            <table class="responsive-table striped highlight ">
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
    <script src="../assets/js/modulos/laboratorio.js?v=0.1"></script>
  </body>
</html>