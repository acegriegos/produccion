<div class="card card-block">
    <span class="accmodulo">Agregar Bodegas</span><hr>
    <div class="row">
        <div id="fbodegas">
            <div class="input-field col s5 m5 l5">
                <input id="vbodega" type="text" class="validate">
                <label for="vbodega">Agregar Bodega</label>
                <input type="hidden" id="vidbodega" value="0">
            </div>
            <div class="col s1 m1 l1 mrgn">
                <button type="button" class="btn-floating waves-effect waves-light blue add material-icons" modulo="bodega" id="addbod">add</button>
            </div>
        </div>
        <div class="col s6 m6 l6">
            <table class="table responsive-table striped bordered highlight" id="data-table-bodegas" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th style="width: 20%">Acciones</th>
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
<div class="card card-block">
    <span class="accmodulo">Agregar Inventarios</span><hr>
    <div class="row">
        <div class="col s6 m6 l6" id="finventarios">
            <div class="input-field col s12 m12 l12">
                <select id="vidbode" type="select">
                    <option value="0">Seleccione una Bodega</option>
                    {section name=LE loop=$BOD}
                    <option value="{$BOD[LE][0]}">{$BOD[LE][1]}</option>
                    {/section}
                </select>
                <label for="vidbode">Bodega</label>
            </div>
            <div class="col s12 m12 l12" style="padding-left: 0;">
                <div class="input-field marginzero col s6 m6 l6">
                    <input id="vinventario" type="text" class="validate">
                    <label for="vinventario">Inventario</label>
                    <input type="hidden" id="vidinventario" value="0">
                </div>
                <div class="input-field col s5 m5 l5 marginzero">
                    <select id="vidcuenta" type="select">
                        <option value="0">Cuenta Por Defecto</option>
                        {section name=LE loop=$CDEF}
                        <option value="{$CDEF[LE][0]}">{$CDEF[LE][1]}</option>
                        {/section}
                    </select>
                    <label for="vidcuenta">Cuenta</label>
                </div>
                <div class="col s1 m1 l1">
                    <button type="button" class="btn-floating waves-effect waves-light blue add material-icons" modulo="inventario" id="addinv">add</button>
                </div>
            </div>
        </div>
        <div class="col s6 m6 l6">
            <table class="table responsive-table striped bordered highlight" id="data-table-inventarios" cellspacing="0" width="100%" >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th style="width: 20%">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listainventarios"></tbody>
            </table>
        </div>
    </div>
</div>