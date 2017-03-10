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
                    </p>
                    <br>
                </div>
            </div>
            </div>
        </div>

        <a href="#modal-descuentos" class="btn z-depth-5 right" style="margin: 1%;">Generar Descuento</a> 
        <br>
        <br>

        <table class="table responsive-table z-depth-5 highlight centered" id="data-table-descuentos">
        <br>
        <br>
        <thead>
            <tr>
                <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Nombre</th>
                <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Estado</th>
                <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Realizado(Veces)</th>
                <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Usuario</th>
                <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Acciones</th>
            </tr>
        </thead>
        <tbody id="listadescuentos">
            
        </tbody>
        </table>

    </div>

    <div class="modal modal-fixed-footer" id="modal-descuentos">
            <div class="modal-header">
                <h4 class="modal-title" style="background-color:#0B3861">Crear Descuento</h4>
            </div>

            <div class="modal-content" >
                
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
                <button type="button" class="btn btn-secondary" data-dismiss="modal" style="margin-left: 2%; ">Salir</button>
                <button type="button" class="btn btn-primary">Agregar</button>
            </div>
        </div><!-- /.modal -->
</div>