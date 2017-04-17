<nav class="nav-extended  white-text z-depth-5" style="background-color:#0B3861">
  <div class="nav-wrapper">
<h4 align="center">Cuentas por Pagar</h4>
    
</div>
</nav>
        
<div id="mantCxP">
<div class="card z-depth-5">
        
        <div class="row">
        <br><br>

                    <div class="input-field col s10 m6 l6">

                        <a class="prefix dropdown-button tooltipped "  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="small material-icons">search</i></a>
                        <ul id='filtr_1' class='dropdown-content'>
                            <li><a href="#!" fltr="1">Nombre</a></li>
                            <li><a href="#!" fltr="2">Cédula</a></li>
                            <li><a href="#!" fltr="3">Teléfono</a></li>
                        </ul>
                        <input type="text" id="search_clientes" maxlength="100" num="v29" var="nombre">
                        <label class="truncate" for="search_clientes">Buscar Cliente por Nombre o Cédula</label>

                    </div>
                    <div class="col s5">
                        <div class="col s4">
                            <input name="ctas" class="with-gap" type="radio" id="all" checked value="1" />
                            <label for="all">Todo</label>
                        </div>
                        <div class="col s4">
                            <input name="ctas" class="with-gap" type="radio" id="vencidas" value="2" />
                            <label for="vencidas">Vencidas</label>
                        </div>
                        <div class="col s4">
                            <input name="ctas" class="with-gap" type="radio" id="porvencer" value="3" />
                            <label for="porvencer">Por Vencer</label>
                        </div>
                    </div>
                    

                </div>
        <br>

        <div class="card-block">
            <div class="row">
                <div class="col s12">
                    <table class="table centered highlight bordered responsive-table z-depth-5 ">
                        <thead>
                            <tr>
                                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Factura</th>
                                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Refencia</th>
                                <th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 10%">Proveedor</th>
                                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Fecha</th>
                                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Saldo</th>
                                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Plazo</th>
                                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Días</th>
                                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Sucursal</th>

                                
                            </tr>
                        </thead>
                        <tbody id="listaCuentasxP">
                         { section name= LE loop = $PRO }
                         <tr id="f{$PRO[LE][0]}" class="detalle" tp="{if $PRO[LE][7] lt 0}1{else}0{/if}">
                            <td>{$PRO[LE][3]}</td>
                             <td>{$PRO[LE][4]}</td>
                            <td>{$PRO[LE][1]}</td>
                            <td>{$PRO[LE][5]}</td>
                            <td>{$PRO[LE][6]}</td>
                            <td>{$PRO[LE][8]}</td>
                            <td style="{if $PRO[LE][7] lt 0}color:red;{else}color:green{/if}">{math equation='abs(x)' x=$PRO[LE][7] }</td>
                            <td>{$PRO[LE][9]}</td>
                            
                        </tr>
                        {/section}
                    </tbody>
                </table>
                <br>

            </div>
        </div>
    </div>
</div>











<div class="modal fade" id="modal-desgloce">
    <div class="modal-dialog" style="width: 70%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <div class="col-md-6 col-lg-6" align="left" style="margin-top: 2%">
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <h4 class="modal-title form-horizontal" id="titmCxP"><small>Detalle Desglosado: </small></h4>
                            <h5 class="form-horizontal"><b>Factura-<span id="numFCxP">5489</span></b></h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-6" align="center">
                        <button type="button" id="expExcel" class="btn btn-success der" style="margin-right: 15px; padding: 3px 9px; border-radius: 42px;" title="Exportar a Excel"><i class="fa fa-file-excel-o" aria-hidden="true" style="font-size: 0.9em"></i></button>
                        <button type="button" id="expExcel" class="btn der" style="background: #D9534F; color: #fff; margin-right: 15px; padding: 3px 9px; border-radius: 42px;" title="Exportar a PDF"><i class="fa fa-file-pdf-o" aria-hidden="true" style="font-size: 0.9em"></i></button>
                </div>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="input-group">
                        <span class="input-group-addon">Proveedor</span>
                        <input type="text" class="form-control" id="nomProvCxP" value="Logintech S.A" readonly>
                    </div>
                </div>
                </div>
                <div class="row eder" style="margin-top: 0.5%">
                <div class="col-md-3 col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Plazo</span>
                        <input type="text" class="form-control form-control-sm" value="60" readonly>
                        <span class="input-group-addon">días</span>
                    </div>
                </div>
                <div class="col-md-3 col-lg-3">
                    <div class="input-group">
                        <span class="input-group-addon">Restantes</span>
                        <input type="text" class="form-control form-control-sm" value="-30" readonly>
                        <span class="input-group-addon">días</span>
                    </div>                        
                </div>
                </div>
                <hr>
                <!-- Fecha del Rubro Usuario Tipo    Saldo   Monto   Debe    Haber -->
                <table class="table table-sm" align="center">
                    <thead align="center">
                        <tr>
                            <th>Fecha de Rubro</th>
                            <th>Usuario</th>
                            <th>Tipo</th>
                            <th>Saldo</th>
                            <th>Monto</th>
                            <th>Debe</th>
                            <th>Haber</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>21 de abril del 2016, 13:03:32</td>
                            <td>ESTEBAN VARGAS</td>
                            <td>Ingreso</td>
                            <td>142,764.45</td>
                            <td>142764.45</td>
                            <td>0.00</td>
                            <td>142,764.45</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
            </div>
        </div>
    </div>
</div>
<!--  -->
<div class="modal fade" id="modal-pago">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <div class="row">
                    <div class="col-md-6 col-lg-6">
                        <h4 class="modal-title form-horizontal" id="titmCxP"><small>Realizar Pago a: </small></h4>
                        <h5 class="form-horizontal"><b>Factura-<span id="numFCxP">5489</span></b></h5>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-7 col-lg-7">
                    <div class="input-group">
                        <span class="input-group-addon">Saldo adeudado</span>    
                        <input type="text" class="form-control" value="0" id="totSaldoAdeud" readonly>
                    </div>
                    </div>
                    <div class="col-md-5 col-lg-5">
                        <div class="input-group">
                            <span class="input-group-addon"><b>Saldo</b></span>    
                            <input type="text" class="form-control" value="0" id="totSaldoVig" readonly style="font-weight: 800">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-10 col-lg-10">
                        <div class="input-group" id="inpG">
                            <span class="input-group-addon">Monto</span>    
                            <input type="text" class="form-control" value="0.00" id="totAbonoF" placeholder="Valor a Pagar" data-mask="999999999.99">
                            <span class="input-group-addon">¢</span>
                        </div>
                        <span id="errF" class="text-muted" style="color: #D9534F; margin-left: 19%"></span>
                    </div>
                    <div class="col-md-2 col-lg-2">
                        <button type="button" id="realPagoCxP" class="btn btn-primary der" style="margin-right: 15px; padding: 12px 13px; border-radius: 42px;" title="Realizar Pago"><i class="fa fa-money fa-lg" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
            </div>
        </div>
    </div>
</div>
<!--  -->
<div class="modal fade" id="modal-nota">
    <div class="modal-dialog" style="width: 50%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <div class="row">
                    <div class="col-md-6 col-lg-6">
                        <h4 class="modal-title form-horizontal" id="titmCxP"><small>Nota de Crédito para: </small></h4>
                        <h5 class="form-horizontal"><b>Factura-<span id="numFCxP">5489</span></b></h5>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon">Total de Factura</span>    
                        <input type="text" class="form-control" value="0" id="totSaldoFact" readonly>
                    </div>
                    </div>
                    <div class="col-md-6 col-lg-6">
                        <div class="input-group">
                            <span class="input-group-addon"><b>Saldo a Favor</b></span>    
                            <input type="text" class="form-control" value="0" id="totSaldoVig" aria-label="Amount (rounded to the nearest dollar)" readonly style="font-weight: 800">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-10 col-lg-10">
                        <div class="input-group" id="inpG">
                            <span class="input-group-addon">Monto</span>    
                            <input type="text" class="form-control" value="0.00" id="totAbonoN" aria-label="Amount (rounded to the nearest dollar)" placeholder="Valor de la Nota" data-mask="999999999.99">
                            <span class="input-group-addon">¢</span>
                        </div>
                        <span id="errN" class="text-muted" style="color: #D9534F; margin-left: 19%"></span>
                    </div>
                </div>
                <div class="row">
                <div class="card-header"><h6>Detalle de Nota</h6></div><br>
                    <div class="col-md-5 col-lg-5">
                        <div class="input-group">
                            <span class="input-group-addon">Referencia</span>
                            <input type="text" class="form-control" id="numRefN" placeholder="Num. Referencia" data-mask="999999999">
                        </div>
                    </div>
                    <div class="col-md-7 col-lg-7">
                    <div class="input-group">
                        <span class="input-group-addon">Comentario</span>
                        <textarea name="" id="comentN" class="form-control" rows="2" required="required" placeholder="Detalle..."></textarea>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                <button type="button" class="btn btn-primary">Crear</button>
            </div>
        </div>
    </div>
</div>
<!--  -->
<div class="modal fade" id="modal-devolucion">
    <div class="modal-dialog" style="width: 50%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <div class="row">
                    <div class="col-md-6 col-lg-6">
                        <h4 class="modal-title form-horizontal" id="titmCxP"><small>Devolución de: </small></h4>
                        <h5 class="form-horizontal"><b>Factura-<span id="numFCxP">5489</span></b></h5>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <td style="width: 10%"></td>
                            <th>Producto</th>
                            <th>Precio Unit</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="width: 10%">
                                <label class="c-input c-checkbox">
                                    <input type="checkbox" id="elemet">
                                    <span class="c-indicator"></span>
                                </label>
                            </td>
                            <td>Producto 1</td>
                            <td>¢12,050.00</td>
                            <td style="width: 20%">
                                <div class="row">
                                    <span>3</span>
                                    <div class="col-md-10 col-lg-10" hidden>
                                        <input type="number" class="form-control" min="0">
                                    </div>
                                </div>
                            </td>
                            <td>¢36,150.00</td>
                        </tr>
                    </tbody>
                </table>
                <hr>

            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="input-group">
                        <span class="input-group-addon">Comentario</span>
                        <textarea id="comentD" class="form-control" rows="2" placeholder="Detalle..."></textarea>
                    </div>
                </div>
            </div><br>
            <div class="row">
                <div class="col-md-5 col-lg-5"></div>
                <div class="col-md-7 col-lg-7">
                    <div class="input-group">
                        <span class="input-group-addon">Total Devolución</span>    
                        <input type="text" class="form-control" id="totDevo" value="0" readonly>
                    </div>    
                </div>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                <button type="button" class="btn btn-primary">Crear</button>
            </div>
        </div>
    </div>
</div>

</div> <!-- CxP -->

<script src="../assets/js/jquery.mask.min.js"></script>