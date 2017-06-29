<div class="tamLetra"><div class="card card-block z-depth-5">
    <span class="accmodulo">Agregar Bodegas</span><hr>
    <div class="row">
        <div id="fbodegas">
            <div class="input-field col s11 l5">
            <br>
                <input id="vbodega" type="text" class="validate">
                <label for="vbodega">Agregar Bodega</label>
                <input type="hidden" id="vidbodega" value="0">
                <input type="hidden" id="vidsucursal" value="">
            </div>
            <div class="col s1 m1 l1 mrgn">
            <br>
                <button type="button" class="btn-floating waves-effect waves-light blue add material-icons z-depth-5" modulo="bodega" id="addbod">add</button>
            </div>
        </div>
        <div class="col s12 l6">
        <br>
            <table class="table highlight centered responsive-table striped z-depth-3" id="data-table-bodegas" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Nombre</th>
                        <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listabodegas">
                    {section name=LE loop=$BOD}
                    <tr>
                        <td>{$BOD[LE][1]}</td>
                        <td>
                            <i class="pbtn btn-color material-icons load" id="m{$BOD[LE][0]}" modulo="bodega">edit</i>
                            <i class="pbtn btn-color cdel material-icons delete" id="d{$BOD[LE][0]}" modulo="bodega" tip="vidbodega">close</i>
                        </td>
                    </tr>
                    {/section}
                </tbody>
            </table>
        </div>
    </div>
</div>
<div class="card card-block z-depth-5">
    <span class="accmodulo">Agregar Inventarios</span><hr>
    <div class="row">
        <div class="col s12 l6" id="finventarios">
        <div class="row">
            <div class="input-field col s6">
                <select id="vidbode" type="select">
                    <option value="0">Seleccione una Bodega</option>
                    {section name=LE loop=$BOD}
                    <option value="{$BOD[LE][0]}">{$BOD[LE][1]}</option>
                    {/section}
                </select>
                <label for="vidbode">Bodega</label>
            </div>
            <div class="input-field col s6">
                <input id="vinventario" type="text" class="validate">
                <label for="vinventario">Nombre Inventario</label>
                <input type="hidden" id="vidinventario" value="0">
            </div>
        </div>
        <div class="row">
            <div class="input-field col s6 marginzero">
                <select id="vidcuenta" type="select">
                    <option value="0">Cuenta Por Defecto</option>
                    {section name=LE loop=$CDEF}
                    <option value="{$CDEF[LE][0]}">{$CDEF[LE][1]}</option>
                    {/section}
                </select>
                <label for="vidcuenta">Cuenta</label>
            </div>
            <div class="col s1">
                <button type="button" class="btn-floating waves-effect waves-light blue add material-icons z-depth-5" modulo="inventario" id="addinv" title="Agregar Inventario">add</button>
            </div>
        </div>

        </div>

        <div class="col s12 l6">
            <table class="table highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
                <thead>
                    <tr>
                        <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Nombre</th>
                        <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listainventarios"></tbody>
            </table>
        </div>
    </div>
</div>
</div>