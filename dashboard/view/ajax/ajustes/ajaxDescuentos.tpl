<div class="card">
    <div class="card-block">
        <h3>Descuentos del Sistema</h3>
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="col s12">
                        <p>Descuento en Factura de Venta:</p>
                    </div>
                    <div class="col s6 m2">
                        <p class="der">
                        <input type="radio" class="descfactc with-gap z-depth-5" name="descfact" tp="1" id="sum" {if $DESCF eq 1} checked {/if} />
                        <label for="sum">Suma</label>
                        </p>
                    </div>
                        <div class="col s6 m2">
                        <p class="der">
                        <input type="radio" class="descfactc with-gap z-depth-5" name="descfact" tp="2" id="may" {if $DESCF eq 2} checked {/if}>
                        <label for="may">Mayor</label>
                        </p><br>
                    </div>
                </div>
            </div>
        </div>
        <a href="#modal-descuentos" class="btn z-depth-5 right" style="margin: 1%;">Generar Descuento</a><br><br>
        <table class="table responsive-table z-depth-5 highlight centered" id="data-table-descuentos"><br><br>
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Nombre</th>
                    <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Estado</th>
                    <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Realizado(Veces)</th>
                    <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Usuario</th>
                    <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Acciones</th>
                </tr>
            </thead>
            <tbody id="listadescuentos"></tbody>
        </table>
    </div>

    <div class="modal modal-fixed-footer" id="modal-descuentos">
        <div class="modal-header">
            <h4 class="modal-title" style="background-color:#0B3861">Crear Descuento</h4>
        </div>
        <div class="modal-content">
            <div class="row">
                <div class="input-field col s12 m6">
                    <input type="text" id="vnombre">
                    <label for="vnombre">Nombre del Descuento</label>
                </div>
                <div class="input-field col s12 m6">
                    <select type="select" id="vidciclo" noClear="1">
                        {section name=LE loop=$CICLOS}
                        <option value="{$CICLOS[LE][0]}">{$CICLOS[LE][1]}</option>
                        {/section}
                    </select>
                <label for="vidciclo">Opciones del Descuento</label>
                </div>
            </div>
            <div class="row">
                <div class="col s6 m6 l6">
                    <p>
                        <input name="tipodesc" type="radio" id="td1" class="with-gap" value="1" checked/>
                        <label for="td1">Producto</label>
                    </p>
                    <p>
                        <input name="tipodesc" type="radio" id="td2" class="with-gap" value="2" tbl="20"/>
                        <label for="td2">Familia de Producto</label>
                    </p>
                    <p>
                        <input name="tipodesc" type="radio" id="td3" class="with-gap" value="3" tbl="21"/>
                        <label for="td3">Tipo de Producto</label>
                    </p>
                    <p>
                        <input name="tipodesc" type="radio" id="td4" class="with-gap" value="4" tbl="22"/>
                        <label for="td4">Marca de Producto</label>
                    </p>
                </div>
            <div class="col s6 m6 l6">
                <p>
                    <input name="tipodesc" type="radio" id="td5" class="with-gap" value="5" />
                    <label for="td5">Cliente</label>
                </p>
                <p>
                    <input name="tipodesc" type="radio" id="td6" class="with-gap" value="6" tbl="68"/>
                    <label for="td6">Estado de Cliente</label>
                </p>
                <p>
                    <input name="tipodesc" type="radio" id="td7" class="with-gap" value="7" tbl="69"/>
                    <label for="td7">Categoría de Cliente</label>
                </p>
                <p>
                    <input name="tipodesc" type="radio" id="td8" class="with-gap" value="8" />
                    <label for="td8">Producto por Cliente</label>
                </p>
                <p>
                    <input name="tipodesc" type="radio" id="td9" class="with-gap" value="9" />
                    <label for="td9">Ubicación de Cliente</label>
                </p>
            </div>
            </div>
            <div class="row optns hide">
                <div class="col s6 m6 l6">
                    <select id="voptns"></select>
                </div>
            </div>
            <div class="filtro0 hide">
                <label><b>Filtrar:</b> </label>
                <input name="filr0" type="radio" id="tf1" class="with-gap" value="1" checked/>
                <label for="td9">Unidad</label>
                <input name="filr0" type="radio" id="tf2" class="with-gap" value="2" />
                <label for="td9">Estadística</label>
            </div>
        </div><!-- /.modal-content -->
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" style="margin-left: 2%; ">Salir</button>
            <button type="button" class="btn btn-primary">Agregar</button>
        </div>
    </div><!-- /.modal -->
</div>