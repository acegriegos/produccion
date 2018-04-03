<div class="card card-block z-depth-3 pequeño">

        <h5 class="head1 padding1 center">Agregar Bodegas</h5>

    <div class="row pequeño">
        <div id="fbodegas">
            <div class="input-field col s12 l5 pequeño">
            <br>
                <input id="vbodega" type="text" class="validate">
                <label for="vbodega">Agregar Bodega</label>
                <input type="hidden" id="vidbodega" value="0">
                <input type="hidden" id="vidsucursal" value="">
            </div>
            <div class="col s12 m1 l1 ">
            <br>
                <button type="button" class="btn-floating waves-effect waves-light btn2 add material-icons z-depth-3" modulo="bodega" id="addbod"><i class="mdi mdi-plus mdi-24px"></i></button>
            </div>
        </div>
        <div class="col s12 l6 pequeño">
        <br> 
            <table class="table pequeño highlight centered responsive-table striped z-depth-3" id="data-table-bodegas" cellspacing="0" width="100%">
                <thead class="tab2">
                    <tr>
                        <th style="border: 0px;  border-radius: 0px !important">Nombre</th>
                        <th style="border: 0px;  border-radius: 0px !important">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listabodegas">
                    {section name=LE loop=$BOD}
                    <tr>
                        <td>{$BOD[LE][1]}</td>
                        <td>
                            <i class="pbtn btn-color  load mdi mdi-pencil  mdi-24px" id="m{$BOD[LE][0]}" modulo="bodega"></i>
                            <i class="pbtn btn-color cdel mdi mdi-close delete  mdi-24px" id="d{$BOD[LE][0]}" modulo="bodega" tip="vidbodega"></i>
                        </td>
                    </tr>
                    {/section}
                </tbody>
            </table>
        </div>
    </div>
</div>
<div class="card card-block z-depth-3 pequeño">
    <h5 class="head1 padding1 center">Agregar Inventarios</h5>
    <div class="row pequeño">
        <div class="col s12 l6 pequeño" id="finventarios">
        <div class="row">
            <div class="input-field col s12 m6">
                <select id="vidbodega" type="select">
                    <option value="0">Seleccione una Bodega</option>
                    {section name=LE loop=$BOD}
                    <option value="{$BOD[LE][0]}">{$BOD[LE][1]}</option>
                    {/section}
                </select>
                <label for="vidbodega">Bodega</label>
            </div>
            <div class="input-field col s12 m6">
                <input id="vinventario" type="text" class="validate">
                <label for="vinventario">Nombre Inventario</label>
                <input type="hidden" id="vid" value="0">
            </div>
        </div>
        <div class="row pequeño">
            <div class="input-field col s12 m6 marginzero">
                <select id="vidcuenta" type="select">
                    <option value="0">Cuenta Por Defecto</option>
                    {section name=LE loop=$CDEF}
                    <option value="{$CDEF[LE][0]}">{$CDEF[LE][1]}</option>
                    {/section}
                </select>
                <label for="vidcuenta">Cuenta</label>
            </div>
            <div class="col s12 m1">
                <button type="button" class="btn-floating waves-effect waves-light btn2 add material-icons z-depth-3" modulo="inventario" id="addinv" title="Agregar Inventario"><i class="mdi mdi-plus"></i></button>
            </div>
        </div>

        </div>

        <div class="col s12 l6 pequeño">
        <br>
            <table class="table pequeño highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
                <thead class="tab2">
                    <tr>
                        <th style="border: 0px;  border-radius: 0px !important; width:70% !important">Nombre</th>
                        <th style="border: 0px;  border-radius: 0px !important; width:30% !important">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listainventarios"></tbody>
            </table>
        </div>
    </div>
</div>