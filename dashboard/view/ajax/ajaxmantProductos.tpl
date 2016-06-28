<div id="mantProd">
<h2 align="center">Mantenimiento Productos</h2>
<hr>
<div class="row">
        <div class="col-md-6 col-lg-6">
            <button type="button" class="btn btn-primary">Buscar</button>            
        </div>
        <div class="col-md-6 col-lg-6">
            <button type="button" id="ingInvProd" class="btn btn-primary der" data-toggle="modal" href="#modal-productos" style="margin-right: 15px;">Agregar</button>
        </div>
    </div><br><br>
    
    <div class="row">
        <div class="col-md-12 col-lg-12">
            <div class="table-responsive">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-productos" cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <th style="width: 20%">Código</th>
                                <th>Nombre</th>
                                <th>Precio Costo</th>
                                <th>Margen de Ganancia</th>
                                <th>Precio Venta</th>
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
                                <td>
                                    <i class="fa fa-pencil-square-o btn load" id="m{$PROD[LE][0]}" data-toggle="modal" href="#modal-productos" modulo="producto"></i>
                                    <i class="fa fa-times btn delete" codigo="1" modulo="producto" id="d{$PROD[LE][0]}"></i>
                                </td>
                            </tr>
                            {/section}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="modal-productos">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title accmodalProd">Agregar Producto</h4>
                </div>
                <div class="modal-body">
                <form id="fproductos">
                <input type="hidden" id="vidmoneda" value="1">
<div class="input-group">
    <div class="input-group-addon"><b>Nombre</b></div>
    <input type="text" class="form-control eder" id="vnombre" placeholder="Nombre de Producto">
</div><br>
<div class="input-group">
    <div class="input-group-addon"><b>Código</b></div>
    <input type="text" class="form-control eder" id="vcodigo" placeholder="Código de Producto">
    <input type="hidden" id="vid" value="0">
</div><br>
    <div class="input-group">
        <div class="input-group-addon"><b>Precio Costo</b></div>
        <input type="text" class="form-control eder calcvv" id="vcosto" placeholder="Precio Costo" data-mask="999999999.99" value="0.00">
        <div class="input-group-addon"><b>¢</b></div>
    </div><br>
    <div class="input-group">
        <div class="input-group-addon"><b>Ganancia</b></div>
        <input type="text" class="form-control eder calcvv" id="vganancia" placeholder="Ganancia de Producto" data-mask="999999999.99" value="0.00">
        <div class="input-group-addon"><b>%</b></div>
    </div><br>

    <div class="input-group">
        <div class="input-group-addon"><b>IMV</b></div>
        <input type="text" class="form-control eder calcvv" id="vimv" placeholder="Impuesto de Venta" data-mask="999999999.99"  value="0.00">
        <div class="input-group-addon"><b>%</b></div>
    </div><br>
    <div class="input-group">
        <div class="input-group-addon"><b>Precio Venta</b></div>
        <input type="text" class="form-control eder" id="vventa" placeholder="Precio Venta" data-mask="999999999.99" readonly  value="0.00">
        <div class="input-group-addon"><b>¢</b></div>
    </div><br>  

<div class="row">
    <div class="col-md-8 col-lg-8">
        <div class="input-group">
            <div class="input-group-addon"><b>Unidad</b></div>
            <select id="vidunidad" class="form-control" type="select">
                {section name=LE loop=$UNI}
                <option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>';
                {/section}
            </select>
        </div>
    </div>
</div><br>

 <div class="row">
 <div class="form-control" style="margin-left: 1.2%; width: 570px; height: 50px;">
        <div class="col-md-4 col-lg-4">
        <div class="radio">
                <label>
                    <b>Tipo de producto:</b>
                </label>
            </div>
        </div>
        <div class="col-md-1 col-lg-1"></div>
        <div class="col-md-3 col-lg-3">
            <div class="radio">
                <label>
                    <input name="visgravado" type="radio" id="inputGrav" value="0" checked>
                    <input type="hidden" id="visgravado" value="1">
                    Gravado
                </label>
            </div>
        </div>
        <div class="col-md-3 col-lg-3">
            <div class="radio">
                <label>
                    <input name="visgravado" type="radio" id="inputExc" value="1">
                    Excento
                </label>
            </div>
        </div>
        <div class="col-md-1 col-lg-1"></div>
        </div>
        </form>
    </div>
                    <div class="alert alert-danger err_" id="err1" style="display: none">
                        <strong id="errm1"></strong>
                    </div>
                    <div class="alert alert-success suc_" id="suc1" style="display: none">
                        <strong id="sucm1"></strong>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                    <button type="button" class="btn btn-primary add" id="addV" codigo="1" modulo="producto">Agregar</button>
                </div>
            </div>
        </div>
    </div> <!-- End mantProductos -->

<script src="../assets/js/alertModal.js"></script>