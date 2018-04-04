<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Ajustes Laboratorio</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-laboratorio.css">
  </head>
  <body>
    {$NAV}
    <div class="bdy pequeño">
      <div class="card pequeño">
        <div class="card center mbotcero pequeño">
          <h4 class="center-align white-text mbotcero head1">Ajustes de Laboratorio</h4>
        </div>
        <div class="card-panel pequeño">
          <label>Inventarios</label>
          <div class="row">
            <div class="col s4 input-field">
              <select multiple id="invVariedad" class="role_inv" tp="1">
                <option disabled selected value="0">Seleccione una Opción</option>
                {section name=LE loop=$INV}
                <option value="{$INV[LE][0]}">{$INV[LE][1]}</option>
                {/section}
              </select>
              <label for="invVariedad">Inventarios Variedades</label>
            </div>
            <div class="col s4 input-field">
              <select multiple id="invreactivos" class="role_inv" tp="2">
              </select>
              <label for="invreactivos">Inventarios Reactivos</label>
            </div>
            <div class="col s4 input-field">
              <select multiple id="invcomp" class="role_inv" tp="4">
              </select>
              <label for="invcomp">Inventarios Componentes</label>
            </div>
          </div>
          <label>Medios de Cultivo por Ciclo</label>
          <div class="row">
            <div class="col s12 m4">
              <a class="btn btn1 modalmedios" tm="1">Medio Multiplicación</a>
            </div>
            <div class="col s12 m4">
              <a class="btn btn1 modalmedios" tm="2">Medio Enraizamiento</a>
            </div>
            <div class="col s12 m4">
              <a class="btn btn1 modalmedios" tm="3">Medio Ápice Líquido</a>
            </div>
          </div>
          <label>Bandejas-Frascos</label>
          <div class="row">
            <div class="col s4 input-field">
              <select id="inv-bandejas" class="role_inv" tp="3">
              </select>
              <label for="inv-bandejas">Inventarios Bandejas</label>
            </div>
            <div class="col s4 input-field">
              <select id="inv-frascos" class="role_inv" tp="3">
              </select>
              <label for="inv-frascos">Inventarios Frascos</label>
            </div>
            <div class="col s4">
              <a href="#modal-bandejas" class="btn btn2" id="gomodalbandejas" tp="3">Relación</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div id="modal-medios" class="modal modal-fixed-footer grandemodal">
      <div class="modal-header head2 padding1">
        <div class="card-header center white-text">
            <p class="flow-text marginzero">Medios de cultivos</p>
        </div>
      </div>
      <div class="modal-content" style="padding: 0px;">
        <div class="row">
          <div class="input-field col s12 m4 l4">
            <input type="text" id="_vnombre" class="validate autocomplete">
            <label for="_vnombre">Nombre del producto o paquete</label>
          </div>
          <div class="input-field col s12 m3 l3">
            <input type="text" id="_vcodigo" class="validate autocomplete">
            <label for="_vcodigo">Código del producto o paquete</label>
          </div>
          <div class="input-field col s12 m2 l2">
            <input type="number" id="_vcantidad" class="validate">
            <label for="_vcantidad">Cantidad</label>
          </div>
          <div class="input-field col s12 m2 l2">
            <select type="select" id="_vidreferencia"></select>
            <label for="_vreferencia">Referencia</label>
          </div>
          <div class="input-field col s12 m1 l1">
            <a class="btn btn1 btn-floating mdi mdi-plus"></a>
          </div>
        </div>
      </div>
      <div class="modal-footer ">
        <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
        <a class="modal-action waves-effect waves-green btn-flat z-depth-5" id="">Agregar</a>
      </div>
    </div>

    <div id="modal-bandejas" class="modal modal-fixed-footer grandemodal">
      <div class="modal-header">
        <div class="card-header center white-text" style="background-color:#0B3861">
          <p class="flow-text marginzero">Relacion bandejas-frascos</p>
        </div>
      </div>
      <div class="modal-content" style="padding: 20px;">
        <div class="row">
          <table class="table responsive-table centered striped bordered highlight z-depth-5 pequeño" id="data-table-relaciones" cellspacing="0" width="100%" >
            <thead>
              <tr>
                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Bandejas</th>
                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Caben</th>
                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Frascos</th>
                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Acciones</th>
              </tr>
            </thead>
            <tbody id="flaboratorio-relaciones">
              <input type="hidden" id="autoinc" value="1">
              <input type="hidden" id="curpos" value="0">
              <tr id="rw1" class="rowrel zelda">
                <td style="padding: 10px; color : black;">
                  <div class="input-field">
                  <select type="select" id="bandejas1" class="invbandejas"></select>
                </div>
              </td>
              <td style="padding: 10px; color : black;">
                <div class="input-field">
                  <input type="number" id="caben1" class="caben" value="1" min="1">
                </div>
              </td>
              <td style="padding: 10px; color : black;">
                <div class="input-field">
                <select type="select" id="frascos1" class="invfrascos"></select>
              </div>
            </td>
            <td style="padding: 10px; color : black;">
              <a class="waves-effect waves-light blue btn-floating addline add" modulo="laboratorio-relacione" id="al1" tp="5"><i class="mdi mdi-plus"></i></a>
              <a class="waves-effect waves-light red btn-floating delline delete" modulo="laboratorio-relacione" id="dl1" tp="5"><i class="mdi mdi-close"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
  </div>
</div>
{$SCR}
<script src="../assets/js/modulos/laboratorio.js?v=0.1"></script>
</body>
</html>