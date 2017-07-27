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
        <a href="#modal-descuentos" class="btn z-depth-5 right" style="margin: 1%;" id="gendesc">Generar Descuento</a><br><br>
        <table class="table responsive-table z-depth-5 highlight centered" id="data-table-descuentos"><br><br>
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0px;  border-radius: 0px !important;">Nombre</th>
                    <th class="white-text blue" style="border: 0px;  border-radius: 0px !important;">Estado</th>
                    <th class="white-text blue" style="border: 0px;  border-radius: 0px !important;">Realizado(Veces)</th>
                    <th class="white-text blue" style="border: 0px;  border-radius: 0px !important;">Usuario</th>
                    <th class="white-text blue" style="border: 0px;  border-radius: 0px !important; width: 20%">Acciones</th>
                </tr>
            </thead>
            <tbody id="listadescuentos"></tbody>
        </table>
    </div>

    <div class="modal modal-fixed-footer" id="modal-descuentos" style="overflow-y: inherit !important;">
        <div class="modal-header">
            <h4 class="modal-title" style="background-color:#0B3861">Crear Descuento</h4>
        </div>
        <div class="modal-content" id="fdescuentos">
            <div class="row">
                <div class="input-field col s12 m6">
                    <input type="text" id="vnombre">
                    <label for="vnombre">Nombre del Descuento</label>
                    <input type="hidden" id="vid" value="0">
                    <input type="hidden" id="vidusuario" value="">
                    <input type="hidden" id="vidsucursal" value="">
                </div>
                <div class="input-field col s12 m6">
                    <select type="select" id="videstado"></select>
                </div>
            </div>
            <div class="row">
                <div class="col s6 m6 l6">
                    <span style="font-size: 1em">Cuenta: </span>
                    <select type="select" id="vidcuenta"></select>
                </div> 
            </div>
        </div><!-- /.modal-content -->
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" style="margin-left: 2%; ">Salir</button>
            <button type="button" class="btn btn-primary add" modulo="descuento">Agregar</button>
        </div>
    </div><!-- /.modal -->

    <div id="modal-assgndsct" class="modal modal-fixed-footer">
        <div class="modal-header">
            <h4 class="modal-title" style="background-color:#0B3861">Asignar Descuento</h4>
        </div>
        <div class="modal-content" style="padding-top: 0">
            <div class="row">
                <div class="col s6 m4 l4">
                    <label style="font-size: 1em">Nombre de Descuento: <span id="namedesc"></span></label>
                </div>
                <div class="input-field col s6 m4 l4 hide" style="margin-top: 0">
                    <select type="select" id="isporcent">
                        <option value="1">Porcentual</option>
                    </select>
                </div>
                <div class="input-field col s6 m4 l4">
                    <select type="select" id="vidciclo" noClear="1">
                        {section name=LE loop=$CICLOS}
                        <option value="{$CICLOS[LE][0]}">{$CICLOS[LE][1]}</option>
                        {/section}
                    </select>
                    <label for="vidciclo">Opciones del Descuento</label>
                </div>
            </div>
            <div class="row">
                
                <div class="col s6 m4 l4 hide" vfecha="1">
                    <input type="date" class="datepicker" id="vf1">
                </div>
                <div class="col s6 m4 l4 hide" vfecha="1">
                    <input type="date" class="datepicker" id="vf2">
                </div>
                <div class="col s6 m4 l4 hide" vfecha="2">
                    <select type="select" id="vmonths"></select>
                </div>
                <div class="col s6 m4 l4 hide" vfecha="3">
                    <select multiple type="select" id="vdays"></select>
                </div>
            </div>
            <div class="row">
                <div class="col s6 m6 l6">
                    <p>
                        <input name="tipodesc" type="radio" id="td1" class="with-gap" value="1" tbl="11" text="1" checked/>
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
                    <input name="tipodesc" type="radio" id="td5" class="with-gap" value="5" tbl="2" text="1"/>
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
                <!-- <p>
                    <input name="tipodesc" type="radio" id="td8" class="with-gap" value="8" />
                    <label for="td8">Ubicación de Cliente</label>
                </p> -->
            </div>
            </div>
            <div class="row optns hide">
                <div class="input-field col s6 m6 l6">
                    <select id="voptns" class="hide"></select>
                    <input type="text" id="vproducto" class="validate autocomplete hide" placeholder="Producto" autocomplete="off">
                    <input type="text" id="vcliente" class="validate autocomplete hide" placeholder="Cliente" autocomplete="off">
                    <input type="hidden" id="vidfila" value="0">
                </div>
                <div class="input-field col s6 m6 l6">
                    <i class="prefix">%</i>
                    <input type="text" id="vvalor" class="validate" autocomplete="off">
                    <label for="vvalor">Valor</label>
                </div>
            </div><br><br>
            <div class="filtro0 hide">
                <label><b>Filtrar:</b> </label>
                <input name="filr0" type="radio" id="tf1" class="with-gap" value="1" checked/>
                <label for="td9">Unidad</label>
                <input name="filr0" type="radio" id="tf2" class="with-gap" value="2" />
                <label for="td9">Estadística</label>
            </div>
        </div>
        <div class="modal-footer">
            <a class="modal-action waves-effect waves-light btn-flat white-text blue z-depth-5" id="adddesc">Guardar</a>
            <a class="modal-action modal-close waves-effect waves-light btn-flat white-text blue z-depth-5" style="margin-right: 2%">Salir</a>
        </div>
    </div>
    <div id="modal-editdesc" class="modal modal-fixed-footer">
        <div class="modal-header">
            <h4 class="modal-title" style="background-color:#0B3861">Editar Descuento</h4>
        </div>
        <div class="modal-content" style="padding-top: 0">
        <input type="hidden" id="iddescuento">
            <div class="row">
                <div class="input-field col s6 m4 l4" style="padding-top: 0">
                    <select id="tpdsc">
                        <option value="0">Seleccione una Opción</option>
                        <option value="1" tabla="11">Producto</option>
                        <option value="2" tabla="20">Familia Producto</option>
                        <option value="3" tabla="21">Tipo Producto</option>
                        <option value="4" tabla="22">Marca Producto</option>
                        <option value="5" tabla="2">Cliente</option>
                        <option value="6" tabla="68">Estado Cliente</option>
                        <option value="7" tabla="69">Categoria Cliente</option>
                    </select>
                </div>
                <div class="input-field col s6 m6 l6">
                    <select id="descue">
                        <option value="0">Seleccione una Opción</option>
                    </select>
                </div>
            </div>
            <div class="row hide options">
                <div class="input-field col s6 m4 l4">
                    <select type="select" id="optdesc">
                        {section name=LE loop=$CICLOS}
                        <option value="{$CICLOS[LE][0]}">{$CICLOS[LE][1]}</option>
                        {/section}
                    </select>
                    <label for="optdesc">Opciones del Descuento</label>
                </div>
                <div class="col s6 m8 l8">
                    <div class="row">
                        <div class="col s6 m4 l4 hide" vfecha="1">
                            <input type="date" class="datepicker" id="f1">
                        </div>
                        <div class="col s6 m4 l4 hide" vfecha="1">
                            <input type="date" class="datepicker" id="f2">
                        </div>
                        <div class="col s6 m4 l4 hide" vfecha="2">
                            <select type="select" id="months"></select>
                        </div>
                        <div class="col s6 m4 l4 hide" vfecha="3">
                            <select multiple type="select" id="days"></select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row hide options">
                <div class="input-field col s6 m4 l4">
                    <input type="text" id="valor" class="validate" autocomplete="off">
                    <label for="valor">Valor</label>
                </div>
            </div>
            
        </div>
        <div class="modal-footer">
            <a class="modal-action waves-effect waves-light btn-flat white-text blue z-depth-5" id="editdesc">Guardar</a>
            <a class="modal-action modal-close waves-effect waves-light btn-flat white-text blue z-depth-5" style="margin-right: 2%">Salir</a>
        </div>
  </div>
</div>