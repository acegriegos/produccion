<div class="row">
    <div class="input-field col s4 m4 l4 grandemodal">
        <input id="proceso" type="text" class="validate autocomplete">
        <input type="hidden" id="idproceso" value="0">
        <input type="hidden" id="count" value="0">
        <input type="hidden" id="idlinea" value="0">
        <label for="proceso">Proceso</label>
    </div>
    <div class="input-field col s3 m2 l2 grandemodal">
        <input id="cantidad" type="number" class="autocomplete">
        <label for="cantidad">Cantidad</label>
    </div>
    <div class="input-field col s5 m6 l6">
        <table class="table responsive-table centered striped bordered highlight z-depth-5 pequeño" id="data-table-tareaxprocesos" cellspacing="0" width="100%" style="display: none;">
        <thead>
        <tr>
        <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Tarea</th>
        <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Hombre</th>
        <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Maquina</th>
        <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Bandejas</th>
        <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Orden</th>
        </tr>
        </thead>
        <tbody id="listatareaxprocesos">

        </tbody>
        </table>
    </div>
</div>
<div class="hide" id="inicio">

</div>

<div id="modal-searchprodline" class="modal bottom-sheet">
    <div class="modal-content">
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
        <a class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
</div>