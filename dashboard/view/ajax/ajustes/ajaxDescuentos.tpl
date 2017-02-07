<div class="card">
    
    <div class="card-block">
        <h3>Descuentos del Sistema</h3>
        <div class="row">
            <div class="col s4">
            <div class="row">
                <div class="col s8">
                    <p>Descuento en Factura de Venta:</p>
                </div>
                <div class="col s2">
                    <p class="der">
                        <input type="radio" class="descfactc with-gap" name="descfact" tp="1" id="sum" {if $DESCF eq 1} checked {/if} />
                        <label for="sum">Suma</label>
                    </p>
                </div>
                <div class="col s2">
                    <p class="der">
                        <input type="radio" class="descfactc with-gap" name="descfact" tp="2" id="may" {if $DESCF eq 2} checked {/if}>
                        <label for="may">Mayor</label>
                    </p>
                </div>
            </div>
            </div>
        </div>

        <a href="#modal-descuentos" class="btn" style="margin: 1%;">Generar Descuento</a> 

        <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-descuentos">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Realizado(Veces)</th>
                <th>Usuario</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="listadescuentos">
            
        </tbody>
        </table>

    </div>

    <div class="modal modal-fixed-footer" id="modal-descuentos">
            <div class="modal-header">
                <h4 class="modal-title">Crear Descuento</h4>
            </div>

            <div class="modal-content" >
                
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" id="vnombre">
                        <label for="vnombre">Nombre del Descuento</label>
                    </div>

                    <div class="input-field col s6">
                
                        <select type="select" id="vidciclo" noClear="1">
                            {section name=LE loop=$CICLOS}
                            <option value="{$CICLOS[LE][0]}">{$CICLOS[LE][1]}</option>
                            {/section}
                        </select>
                        <label for="vidciclo">Opciones del Descuento</label>
                    </div>
                </div>
                
                <label>Tipo de Descuento</label>
                <label class="radio-inline tipodes">
                    <input type="radio" name="tipodesc" id="td1" value="1" checked> Producto
                </label>
                <label class="radio-inline tipodes">
                    <input type="radio" name="tipodesc" id="td2" value="2"> Tipo de Producto
                </label>
                <label class="radio-inline tipodes">
                    <input type="radio" name="tipodesc" id="td3" value="3"> Familia de Producto
                </label>
                <label class="radio-inline tipodes">
                    <input type="radio" name="tipodesc" id="td4" value="4"> Marca de Producto
                </label>
                 <label class="radio-inline tipodes">
                    <input type="radio" name="tipodesc" id="td5" value="5"> Modelo de Producto
                </label><br>
                <label class="radio-inline tipodes">
                    <input type="radio" name="tipodesc" id="td6" value="6"> Cliente
                </label>
                <label class="radio-inline tipodes">
                    <input type="radio" name="tipodesc" id="td7" value="7"> Estado de Cliente
                </label>
                <label class="radio-inline tipodes">
                    <input type="radio" name="tipodesc" id="td8" value="8"> Categoría de Cliente
                </label>
                <label class="radio-inline tipodes">
                    <input type="radio" name="tipodesc" id="td9" value="9"> Producto por Cliente
                </label>
                <label class="radio-inline tipodes">
                    <input type="radio" name="tipodesc" id="td10" value="10"> Ubicación de Cliente
                </label>

                <div class="filtro0">
                    <label><b>Filtrar:</b> </label>
                    <label class="radio-inline">
                        <input type="radio" name="filr0" id="tf1" value="1" checked> Unidad
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="filr0" id="tf2" value="2"> Estadística
                    </label>
                </div>

            </div><!-- /.modal-content -->

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Salir</button>
                <button type="button" class="btn btn-primary">Agregar</button>
            </div>
        </div><!-- /.modal -->
</div>