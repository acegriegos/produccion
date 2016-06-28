<div id="mantServ">
<h2 align="center">Mantenimiento Servicios</h2>
<hr>
<div class="row">
        <div class="col-md-6 col-lg-6">
            <button type="button" class="btn btn-primary">Buscar</button>            
        </div>
        <div class="col-md-6 col-lg-6">
            <button type="button" id="ingInvServ" class="btn btn-primary der" data-toggle="modal" href="#modal-servicios" style="margin-right: 15px;">Agregar</button>
        </div>
    </div><br><br>
    
    <div class="row">
        <div class="col-md-12 col-lg-12">
            <div class="table-responsive">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-servicios" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th style="width: 20%">Código</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Período</th>
                                <th>Outsourcing</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listaservicios">
                            {section name=LE loop=$SERV}
                            <tr>
                                <td>{$SERV[LE][0]}</td>
                                <td>{$SERV[LE][1]}</td>
                                <td>{$SERV[LE][2]}</td>
                                <td>{$SERV[LE][3]}</td>
                                <td>{$SERV[LE][4]}</td>
                                <td>
                                <i class="fa fa-pencil-square-o btn load" id="m{$SERV[LE][0]}" data-toggle="modal" href="#modal-servicios" modulo="servicio"></i>
                                <i class="fa fa-times btn delete" codigo="1" modulo="servicio" id="d{$SERV[LE][0]}"></i></td>
                            </tr>
                            {/section}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="modal-servicios">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title accmodalServ">Agregar Servicio</h4>
                </div>
                <div class="modal-body">
                <form id="fservicios">
                    <input type="hidden" id="vid" value="0">
<input type="hidden" id="vidmoneda" value="1">
<div class="input-group">
        <div class="input-group-addon"><b>Nombre</b></div>
        <input type="text" class="form-control" id="vnombre" placeholder="Nombre de Servicio">
    </div><br>
    <div class="row">
        <div class="col-md-12 col-lg-12">
            <div class="input-group">
                <div class="input-group-addon"><b>Descripción</b></div>
                <textarea class="form-control" rows="2" id="vdescripcion" placeholder="Descripción de Servicio" type="textarea"></textarea>
            </div><br>
        </div>
    </div>

    <div class="input-group">
        <div class="input-group-addon"><b>Precio Base</b></div>
        <input type="text" class="form-control eder pout" id="vpbase" placeholder="Precio de Servicio" data-mask="999999999.99" value="0.00">
        <div class="input-group-addon"><b>¢</b></div>
    </div><br>
    <input type="hidden" id="vfcreacion" value="1990-01-01 00:00:00">
    <div class="row">
    <div class="form-control" style="margin-left: 1.2%; width: 570px; height: 50px;">
        <div class="col-md-3 col-lg-3">
            <div class="checkbox">
                <label>
                    <input type="checkbox" value="0" id="isPeriodo">
                    <b>Por período</b><small type="checkbox" style="color: #A3A3A3" title="Seleccione esta opción si el servicio que desea agregar se va a repetir periódicamente">      ?</small>
                </label>
            </div>
        </div>
        <div class="col-md-3 col-lg-3 opPeriodo">
            <div class="radio">
                <label>
                    <input type="radio" name="sPeriodo" class="inpSPeriodo" value="30" id="mensual" disabled>
                    <input type="hidden" id="vperiodo" value="0">
                    Mensual
                </label>
            </div>
        </div>
        <div class="col-md-3 col-lg-3 opPeriodo">
            <div class="radio">
                <label>
                    <input type="radio" name="sPeriodo" class="inpSPeriodo" value="365" id="anual" disabled>
                    Anual
                </label>
            </div>
        </div>
        <div class="col-md-3 col-lg-3">
            <div class="radio">
                <label>
                    <input type="radio" name="sPeriodo" id="otros" class="inpSPeriodo" value="0" disabled>
                    Otros
                </label>
            </div>
        </div>
        <div class="col-md-6 col-lg-6" id="opOtro" hidden>
            <div class="input-group">
                <div class="input-group-addon"><b>Otros:</b></div>
                <input type="text" class="form-control eder" id="voptServ" placeholder="en Días" data-mask="999999999">
            </div>
        </div>
        </div>
        </div><br>

        <div class="row">
        <div class="col-md-12 col-lg-12">
        <div class="checkbox">
        <input type="hidden" id="idServ" value="0">
            <label>
                <input type="checkbox" id="outsourcing" value="0">
                <b>Outsourcing</b> <small>- Seleccione esta opción si es necesario <i>sub-contratar</i> el servicio de un tercero para el préstamo de éste servcio</small>
            </label>
        </div>
        </div>
            <div class="col-md-12 col-lg-12" id="prove" hidden>
                <div class="input-group">
                    <div class="input-group-addon"><b>Proveedor</b></div>
                    <select id="vidprovee" class="form-control" type="select" value="0">
                        <option value="0">Seleccione un proveedor</option>
                        {section name=LE loop=$CLI}
                        <option value="{$CLI[LE][0]}">{$CLI[LE][1]}</option>;
                        {/section}
                        
                    </select>
                    <input type="hidden" id="vidproveedor" value="0">
                </div>
            </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-lg-6 ganServ" hidden>
                    <br><div class="input-group">
                    <div class="input-group-addon"><b>Compra</b></div>
                    <input type="text" class="form-control eder pout" id="vpcompra" placeholder="Precio de Compra" data-mask="999999999.99" value="0.00">
                    <div class="input-group-addon"><b>¢</b></div>
                </div><br>
                </div>
                <div class="col-md-6 col-lg-6 ganServ" hidden>
                    <br><div class="input-group">
                    <div class="input-group-addon"><b>Ganancia</b></div>
                    <input type="text" class="form-control eder pout" id="vpganancia" placeholder="Local" data-mask="999999999" value="0.00">
                    <div class="input-group-addon"><b>%</b></div>
                    </div><br>
                </div>
            </div>                 

                    <div class="alert alert-danger err_" id="err1" style="display: none">
                        <strong id="errm1"></strong>
                    </div>
                    <div class="alert alert-success suc_" id="suc1" style="display: none">
                        <strong id="sucm1"></strong>
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                    <button type="button" class="btn btn-primary add" id="addV" codigo="1" modulo="servicio">Agregar</button>
                </div>
            </div>
        </div>
    </div> <!-- End mantProductos -->

<script src="../assets/js/alertModal.js"></script>