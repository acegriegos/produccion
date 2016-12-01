<div class="card">
    
    <div class="card-block">
        <h3>Descuentos del Sistema</h3>
        <label class="radio-inline">
            <b>Descuento en Factura de Venta:</b>
        </label>
        <label class="radio-inline">
            <input type="radio" class="descfactc" name="descfact" tp="1" {if $DESCF eq 1} checked {/if}> Suma
        </label>
        <label class="radio-inline">
            <input type="radio" class="descfactc" name="descfact" tp="2" {if $DESCF eq 2} checked {/if}> Mayor
        </label>
        <hr>
        <a href="#modal-descuentos" class="btn btn-success" data-toggle="modal">Generar Descuento</a>      
    </div>

    <div class="modal fade" id="modal-descuentos">
            <div class="modal-dialog" role="document" style="width: 75%">
                <div class="modal-content" >
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title">Crear Descuento</h4>
                    </div>
                    <div class="modal-body">
                        <div class="input-group">
                            <div class="input-group-addon"><b>Nombre del Descuento</b></div>
                            <input type="text" id="vnombre" class="form-control" value="" placeholder="Opcional">
                        </div>
                        <b><label>Tipo de Descuento</label></b><br>
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

                        <div class="filtro1">
                            <label><b>Opciones del Descuento</b></label>
                            <div class="input-group">
                            <div class="input-group-addon"><b>Período</b></div>
                            <select type="select" id="vidciclo" class="form-control">
                                 {section name=LE loop=$CICLOS}
                                    <option value="{$CICLOS[LE][0]}">{$CICLOS[LE][1]}</option>
                                 {/section}
                            </select>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Salir</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
</div>