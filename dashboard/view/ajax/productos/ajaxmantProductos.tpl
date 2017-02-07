
<div id="mantProd">
<div class="row">
<div class="col s8 m6 l6">
<div class="input-field col s8 m6 l6">
<input id="searchprod" type="text" class="validate">
<label for="searchprod" id="phs">Buscar por Código</label>
</div>
<a class="dropdown-button btn-floating waves-effect waves-light blue" data-activates="fgrande"><i class="material-icons">search</i></a>
<ul id="fgrande" class="dropdown-content" filter="1">
<li><a class="dropdown-item vfiltros" filtro="f1">Código</a></li>
<li><a class="dropdown-item filtros" filtro="f2">Nombre</a></li>
</ul>       
</div>
<div class="col s4 m6 l6">
    <a id="addproduct" class="btn-floating waves-effect waves-light right blue" href="#modal-productos"><i class="material-icons">add</i></a>
</div>
</div>

<div class="row">
<div class="col s12 m12 l12">
    <div class="table">
    <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-productos" cellspacing="0" width="100%" >
    <thead>
    <tr>
    <th style="width: 20%">Código</th>
    <th>Nombre</th>
    <th>Marca</th>
    <th>Precio Costo</th>
    <th>Precio Venta</th>
    <th>Ganancia</th>
    <th>Acciones</th>
    </tr>
    </thead>
    <tbody id="listaproductos">
    {section name=LE loop=$PROD}
    <tr>
    <td>{$PROD[LE][1]}</td>
    <td>{$PROD[LE][2]}</td>
    <td>{$PROD[LE][3]}</td>
    <td>{$PROD[LE][4]}</td>
    <td>{$PROD[LE][5]}</td>
    <td>{$PROD[LE][6]}</td>
    <td>
    <!-- <a class="btn-floating waves-effect waves-light amber darken-3 descuentos " id="desc{$PROD[LE][0]}" href="#modal-descuentos" title="Agregar Descuentos"><i class="material-icons">%</i></a> -->
    <a class="btn-floating waves-effect waves-light green salidainv" id="s{$PROD[LE][0]}" href="#modal-movinventario" title="Movimiento de Inventario"><i class=" fa fa-outdent"></i></a>
    <a class="btn-floating waves-effect waves-light blue editprod" id="m{$PROD[LE][0]}" href="#modal-productos" title="Editar Producto"><i class="fa fa-pencil-square-o"></i></a>
    <a class="btn-floating waves-effect waves-light red delprod" id="d{$PROD[LE][0]}" title="Eliminar Producto"><i class="fa fa-times"></i></a>
    </td>
    </tr>
    {/section}
    </tbody>
    </table>
    </div>
    <br><br><br>
</div>
</div>

<div id="modal-productos" class="modal modal-fixed-footer" style="width:70%;height:90%">
    <div class="modal-header">
        <ul class="tabs  blue-grey">
            <li class="tab col s3 menuP but" id="tb1"><a class="white-text">Datos Productos</a></li>
            <li class="tab col s3 menuP but" id="tb2"><a class="white-text">Financiero</a></li>
            <li class="tab col s3 menuP but" id="tb3"><a class="white-text">Impuestos</a></li>
        </ul>
    </div>
    <div class="modal-content" style="padding: 0px;">
        <div id="datosproductos" style="padding: 30px 10px 0 10px">
            <div class="row">
                <div class="col s12 m6 l6" id="col1">
                    <div class="input-field">
                        <div class="familia">
                            <a class="prefix btn-floating red btn-small tooltipped" data-position="button" data-tooltip="Ingresar Familia" style="width: 2.5rem" det="familia" d-b="20" prev="" sig="vidtipo"><i class="fa fa-plus"></i></a>

                            <select type="select" id="vidfamilia" class="_det" primary="1">
                                <option value="">Seleccione una Familia</option>
                                {section name=LE loop=$FAM}
                                <option value="{$FAM[LE][0]}">{$FAM[LE][1]}</option>
                                {/section}
                            </select>
                            <label for="vidfamilia">Familia</label>
                        </div>
                    </div>
                    <div class="input-field">
                        <div class="tipo">
                            <a class="prefix btn-floating red btn-small tooltipped" data-position="button" data-tooltip="Ingresar Tipo" style="width: 2.5rem" det="tipo" d-b="21" prev="vidfamilia" sig="vidmarca"><i class="fa fa-plus"></i></a>
                            <select type="select" id="vidtipo" class="_det">
                            <option value="">Seleccione un Tipo</option>
                            </select>
                            <label for="vidtipo">Tipo</label>
                        </div>
                    </div>
                    <div class="input-field">
                        <div class="marca">
                            <a class="prefix btn-floating red btn-small tooltipped" data-position="button" data-tooltip="Ingresar Marca" style="width: 2.5rem" det="marca" d-b="22" prev="vidtipo" sig=""><i class="fa fa-plus"></i></a>
                            <select type="select" id="vidmarca" class="_det">
                            <option value="">Seleccione un Marca</option>
                            </select>
                            <label for="vidmarca">Marca</label>
                        </div>
                    </div>
                    <div class="input-field">
                        <select type="select" id="vidunidad">
                        <option value="">Seleccione un Unidad</option>
                        {section name=LE loop=$UNI}
                        <option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>
                        {/section}
                        </select>
                        <label for="vidunidad">Unidad</label>
                    </div>
                    <div class="input-field" id="dinventario">
                        <select type="select" id="vidinventario">
                        <option value="">Seleccione un Inventario</option>
                        {section name=LE loop=$INV}
                        <option value="{$INV[LE][0]}">{$INV[LE][1]}</option>
                        {/section}
                        </select>
                        <label for="vidinventario">Inventario</label>
                    </div>
                </div>
                <div class="col s12 m6 l6" id="col2">
                    <div class="input-field">
                        <input type="text" id="vnombre" class="formprod validate" value="" focus="1vcodigo">
                        <label class="active" for="vnombre">Nombre</label>
                    </div>
                    <div class="input-field">
                        <input type="text" id="vcodigo" class="formprod validate" value="" focus="1vminimo">
                        <label class="active" for="vcodigo">Código</label>
                        <input type="hidden" id="vid" value="0">
                        <input type="hidden" id="vidusuario" value="">
                        <input type="hidden" id="vidsucursal" value="">
                        <input type="hidden" id="vimg" value="">
                    </div>
                    <div class="input-field">
                        <input type="number" id="vminimo" class="formprod validate" value="" min="0" focus="1vmaximo">
                        <label class="active" for="vminimo">Mínimo</label>
                    </div>
                    <div class="input-field">
                        <input type="number" id="vmaximo" class="formprod validate" value="" min="0" focus="2vmaxdescuento">
                        <label class="active" for="vmaximo">Máximo</label>
                    </div>
                    <div class="input-field">
                        <i class="material-icons prefix">%</i>
                        <input type="number" id="vmaxdescuento" class="formprod validate" value="" min="0" focus="2vcosto">
                        <label class="active" for="vmaxdescuento">Descuento Máximo</label>
                    </div>
                </div>
            </div>
        </div>
        <div id="financiero" class="row hide" style="padding: 20px 10px 0 10px">
        <label><b>Precio General</b></label><br><br>
            <div class="row">
                <div class="col s3">
                    <label>Precio Costo</label>
                    <div class="input-field">
                        <i class="material-icons prefix">¢</i>
                        <input type="text" id="vcosto" class="validate calcvv eder" value="0.00" data-mask="9999999999.99" focus="vganancia">
                        <input type="hidden" id="hvcosto" value="">
                        
                    </div>
                </div>
                <div class="col s3">
                    <label>Ganancia</label>
                    <div class="input-field">
                        <i class="material-icons prefix">%</i>
                        <input type="text" id="vganancia" class="validate calcvv eder" value="0.00" data-mask="9999999999.99" focus="vventa">
                        
                    </div>
                </div>
                <div class="col s3">
                    <label>Precio Venta</label>
                    <div class="input-field">
                        <i class="material-icons prefix">¢</i>
                        <input type="text" id="vventa" class="validate calcvv eder" value="0.00" data-mask="9999999999.99" focus="vexoneracion">
                        <input type="hidden" id="hventa" value="">
                        
                    </div>
                </div>
                <div class="col s3">
                    <label>Exoneración</label>
                    <div class="input-field">
                        <i class="material-icons prefix">%</i>
                        <input type="text" id="vexoneracion" class="validate calcvv eder" value="0.00" data-mask="9999999999.99">
                    </div>
                </div>
            </div>
            {section name=LE loop=$NIV}
                
            <div class="row precionivel" id="f{$NIV[LE][0]}">
                <div class="col s3">
                    <label><b>Precio para Categoria: {$NIV[LE][1]}</b></label>
                </div>
                <div class="col s3">
                    <div class="input-field">
                        <i class="material-icons prefix">%</i>
                        <input type="text" id="vganancia{$NIV[LE][0]}" class="validate calcvv eder" value="0.00" data-mask="9999999999.99">
                        
                    </div>
                </div>
                <div class="col s3">
                    <div class="input-field">
                        <i class="material-icons prefix">¢</i>
                        <input type="text" id="vventa{$NIV[LE][0]}" class="validate calcvv eder" value="0.00" data-mask="9999999999.99">
                        <input type="hidden" id="hventa{$NIV[LE][0]}" value="">
                        
                    </div>
                </div>
                <div class="col s3">
                    <div class="input-field">
                        <i class="material-icons prefix">%</i>
                        <input type="text" id="vexoneracion{$NIV[LE][0]}" class="validate calcvv eder" value="0.00" data-mask="9999999999.99">
                    </div>
                </div>

            </div>
            {/section}
        </div>
        <div id="dimpuestos" class="row hide" style="padding: 50px 10px 0 10px">
            <div class="col s12">
                <div class="input-field col s10">
                    <select id="imp"></select>
                    <label>Impuestos</label>
                </div>
                <div class="col s2">
                    <button type="button" class="btn-floating btn-large waves-effect waves-light blue" id="addimp"><i class="material-icons">add</i></button>
                </div>
                <div class="row">
                    <div class="col s12">
                        <ul class="collection hide" id="impuestos">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action waves-effect waves-light btn-flat white-text blue" id="addprod">Agregar</a>
        <a class="modal-action waves-effect waves-light btn-flat white-text blue" id="editprod">Guardar</a>
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
    </div>
</div>

<div id="modal-movinventario" class="modal modal-fixed-footer" style="width:70%;height:90%">
    <div class="modal-content" style="padding: 0px;">
        <ul class="tabs blue-grey">
            <li class="tab col s3 minvent but" id="mv1"><a class="white-text">Entrada Inventario</a></li>
            <li class="tab col s3 minvent but" id="mv2"><a class="white-text">Salida Inventario</a></li>
            <li class="tab col s3 minvent but" id="mv3"><a class="white-text">Movimiento Inventario</a></li>
        </ul>
        <ul class="tabs blue">
            <li class="tab col s3" style="width: 100%">
                <div class="row">
                    <div class="col s6 m6 l6">
                        <a class="white-text">Producto:
                            <span id="nomprod"></span>
                            <input type="hidden" id="idprd" value="">
                            <input type="hidden" id="oldinvent" value="">
                        </a>
                    </div>
                    <div class="col s6 m6 l6">
                        <a class="white-text">Cantidad:
                            <span id="prodcant"></span>
                        </a>
                    </div>
                </div>
            </li>
        </ul>
        <input type="hidden" id="spot" value="0">
        <div id="ininvent" class="movsinvent" style="padding: 15px 10px 0 10px">
            <div class="row">
                <div class="input-field col s6 m6 l6">
                    <select type="select" id="inidbodega">
                        <option value="0">Seleccione una Bodega</option>
                    </select>
                    <label for="inidbodega">Bodega</label>
                </div>
                <div class="input-field col s6 m6 l6">
                    <select type="select" id="inidinventario">
                        <option value="0">Seleccione un Inventario</option>
                    </select>
                    <label for="inidinventario">Inventario</label>
                </div>
                <div class="input-field col s4 m4 l4">
                    <input id="vincantidad" type="text" class="validate">
                    <label for="vincantidad">Cantidad Entrante</label>
                </div>
                <div class="input-field col s8 m8 l8">
                    <input type="text" id="vincomentario" class="materialize-textarea" length="150">
                    <label for="vincomentario">Comentario</label>
                </div>
            </div>
        </div>
        <div id="outinvent" class="movsinvent hide">
            <div class="row">
                <div class="input-field col s6 m6 l6">
                    <select type="select" id="outidbodega">
                        <option value="0">Seleccione una Bodega</option>
                    </select>
                    <label for="outidbodega">Bodega Origen</label>
                </div>
                <div class="input-field col s6 m6 l6">
                    <select type="select" id="outidinventario">
                        <option value="0">Seleccione un Inventario</option>
                    </select>
                    <label for="outidinventario">Inventario Origen</label>
                </div>
                <div class="input-field col s6 m6 l6">
                    <select type="select" id="destidbodega">
                        <option value="0">Seleccione una Bodega</option>
                    </select>
                    <label for="destidbodega">Bodega Destino</label>
                </div>
                <div class="input-field col s6 m6 l6">
                    <select type="select" id="destidinventario">
                        <option value="0">Seleccione un Inventario</option>
                    </select>
                    <label for="destidinventario">Inventario Destino</label>
                </div>
                <div class="input-field col s4 m4 l4">
                    <input id="voutcantidad" type="text" class="validate">
                    <label for="voutcantidad">Cantidad Saliente</label>
                </div>
                <div class="input-field col s8 m8 l8">
                    <input type="text" id="voutcomentario" class="materialize-textarea" length="150">
                    <label for="voutcomentario">Comentario</label>
                </div>
            </div>
        </div>
        <div id="movinvent" class="movsinvent hide">
            <div class="row">
                <div class="input-field col s6 m6 l6">
                    <select type="select" id="movidbodega">
                        <option value="0">Seleccione una Bodega</option>
                    </select>
                    <label for="movidbodega">Bodega</label>
                </div>
                <div class="input-field col s6 m6 l6">
                    <select type="select" id="movidinventario">
                        <option value="0">Seleccione un Inventario</option>
                    </select>
                    <label for="movidinventario">Inventario</label>
                </div>
                <div class="input-field col s4 m4 l4">
                    <input id="vmovcantidad" type="text" class="validate">
                    <label for="vmovcantidad">Cantidad Entrante</label>
                </div>
                <div class="input-field col s8 m8 l8">
                    <input type="text" id="vmovcomentario" class="materialize-textarea" length="150">
                    <label for="vmovcomentario">Comentario</label>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action waves-effect waves-light btn-flat white-text blue" id="actinv">Guardar</a>
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
    </div>
</div>

<!-- <div id="modal-descuentos" class="modal modal-fixed-footer" style="width:70%">
    <div class="modal-content">
        <h4>Agregar Descuentos a <span id="dprod"></span></h4><hr><br>
        <div class="row">
            <div class="col s6">
                <div class="input-field col s10">
                    <select id="dscts"></select>
                    <label>Seleccione un Descuento</label>
                    <input type="hidden" id="idproducto" class="form-control" value="">
                </div>
                <div class="col s2">
                    <button type="button" class="btn-floating btn-large waves-effect waves-light blue" id="adddsct"><i class="material-icons">add</i></button>
                </div>
            </div>
            <div class="col s6" id="tbldesc">
                <h5>Descuentos</h5>
                <ul class="collection " id="listadescuentos">
                
                </ul>
            </div>
        </div>
            
    </div>
    <div class="modal-footer">
        <a class="modal-action waves-effect waves-light btn-flat white-text blue" id="gdesc">Guardar</a>
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
    </div>
</div> -->

</div> <!-- End mantProductos -->

<script src="../assets/js/jquery.mask.min.js"></script>
