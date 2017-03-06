<div class="fixed-action-btn vertical">
        <a class="btn-floating btn-large blue">
            <i class="large material-icons">mode_edit</i>
        </a>
        <ul>
            <li><a class="btn-floating green" title="Exportar Receta a Excel"><i class="material-icons">insert_chart</i></a></li>
            <li><a class="btn-floating red" title="Exportar Receta a PDF"><i class="material-icons">picture_as_pdf</i></a></li>
        </ul>
    </div>
<div class="row">
    <div class="col s8 m8 l8">
        <div class="row raddreceta">
            <div class="input-field col s5 m5 l5">
                <input id="vnombre" type="text">
                <label for="vnombre">Nombre de la Receta</label>
                <input type="hidden" id="count" value="0">
                <input type="hidden" id="spot" value="">
            </div>
            <div class="input-field col s5 m5 l5">
                <input id="vcodigo" type="text" class="validate">
                <label for="vcodigo">Codigo de la Receta</label>
            </div>
            <div class="col s2 m2 l2">
                <button type="button" class="btn-floating waves-effect waves-light blue hide" id="edtitcod" title="Editar nombre y codigo de la receta"><i class="material-icons" style="padding-top: 3px">save</i></button>
                <button type="button" class="btn-floating waves-effect waves-light blue" id="addrecipe"><i class="material-icons">add</i></button>
            </div>
        </div>
        <div class="row hide" id="daddprod">
            <div class="input-field col s4 m4">
                <input id="vproducto" type="text" class="autocomplete">
                <label for="vproducto">Insumo</label>
            </div>
            <div class="input-field col s3 m3">
                <input id="vcantidad" type="number" min="0">
                <label for="vcantidad">Cantidad</label>
            </div>
            <div class="input-field col s4 m4">
                <select id="vidunidad">
                    {section name=LE loop=$UNIP}
                    <option value="{$UNIP[LE][0]}" unidad="{$UNIP[LE][2]}">{$UNIP[LE][1]}</option>
                    {/section}
                </select>
                <label for="vidunidad">Seleccione una Unidad</label>
            </div>
            <div class="col s1 m1">
                <button type="button" class="btn-floating waves-effect waves-light blue" id="addproduct"><i class="material-icons">add</i></button>
            </div>
        </div>
        <div class="row" id="makerecipe">
            
        </div>
    </div>
    <div class="col s4 m4 l4 border-left">
        <table class="table responsive-table striped bordered highlight" id="data-table-recetas" cellspacing="0" width="100%" >
            <thead>
                <tr>
                    <th style="width: 30%">Nombre</th>
                    <th>Total</th>
                    <th style="width: 40%">Acciones</th>
                </tr>
            </thead>
            <tbody id="listarecetas">
                {section name=LE loop=$REC}
                <tr>
                    <td>{$REC[LE][1]}</td>
                    <td>{$REC[LE][2]}</td>
                    <td>
                        <a class="btn-color pbtn instoproduct material-icons modal-trigger" href="#modal-addtoproducts" id="i{$REC[LE][0]}" title="Ingresar Receta a Inventario Producto Final">system_update_alt</a>
                        <a class="btn-color pbtn editreceta material-icons" id="m{$REC[LE][0]}">edit</a>
                        <a class="btn-color pbtn cdel delreceta material-icons" id="d{$REC[LE][0]}">close</a>
                    </td>
                </tr>
                {/section}
            </tbody>
        </table>
    </div>
</div>