<!-- hacer 2 div en donde cada uno tenga como encabezado creacion de procesos y edicion de procesos para futura version, esto para hacer que el sistema permita agregar varias procesos a las vez mientras que tambien pueda editar procesos mientras agrega procesos -->
<div class="row">
    <div class="col s12 m12 l8">
        <div class="row raddproceso">
            <div class="input-field col s12 m5 l5">
                <input id="vnombre" type="text" autocomplete="off">
                <label for="vnombre">Nombre del Proceso</label>
                <input type="hidden" id="count" value="0">
                <input type="hidden" id="spot" value="0">
            </div>
            <div class="input-field col s12 m5 l5">
                <input id="vcodigo" type="text" autocomplete="off">
                <label for="vcodigo">Codigo del Proceso</label>
            </div>
            <div class="col s2 m2 l2">
                <button type="button" class="btn-floating waves-effect waves-light blue hide" id="edtitcod" title="Editar nombre y codigo del proceso"><i class="material-icons" style="padding-top: 3px">save</i></button>
                <button type="button" class="btn-floating waves-effect waves-light blue z-depth-5" id="addrecipe"><i class="material-icons">add</i></button>
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
    <div class="col s12 l4 ">
        <table class="table responsive-table striped bordered highlight z-depth-3" id="data-table-procesos" cellspacing="0" >
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
                    <th  class="white-text blue" style="border: 0; border-radius: 0px !important;">Total</th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Acciones</th>
                </tr>
            </thead>
            <tbody id="listaprocesos">
                {section name=LE loop=$REC}
                <tr>
                    <td style=" padding: 10px;">{$REC[LE][1]}</td>
                    <td style=" padding: 10px;">{$REC[LE][2]}</td>
                    <td style=" padding: 10px;">
                        <a class="btn-color pbtn instoproduct material-icons modal-trigger" href="#modal-addtoproducts" id="i{$REC[LE][0]}" title="Ingresar proceso a Inventario Producto Final">system_update_alt</a>
                        <a class="btn-color pbtn editproceso material-icons" id="m{$REC[LE][0]}">edit</a>
                        <a class="btn-color pbtn cdel delproceso material-icons" id="d{$REC[LE][0]}">close</a>
                    </td>
                </tr>
                {/section}
            </tbody>
        </table>
    </div>
</div>