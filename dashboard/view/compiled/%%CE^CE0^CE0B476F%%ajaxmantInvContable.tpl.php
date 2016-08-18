<?php /* Smarty version 2.6.17, created on 2016-08-18 19:58:14
         compiled from ajax/ajaxmantInvContable.tpl */ ?>
<link rel="stylesheet" href="../assets/css/bv2_toggle.css">

<div id="mantcontable">
	<h2 align="center">Mantenimiento Contable</h2>
	<hr>
	<div class="row">
    <div class="col-md-12 col-lg-12">
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-inventarios" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th style="width: 12%">Código</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Tipo</th>
                            <th>Fecha</th>
                            <th style="width: 15%">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaContable">
                        <!-- [section name=LE loop=$PROD] -->
                        <tr>
                            <td>215<!-- ($PROD[LE][1]) --></td>
                            <td>Escritorio Vidrio - Tempered Glass<!-- ($PROD[LE][3]) --></td>
                            <td>5<!-- ($PROD[LE][4]) --></td>
                            <td>Pasivo - Corriente<!-- ($PROD[LE][5]) --></td>
                            <td>16-07-2016 03:25:00<!-- ($PROD[LE][6]) --></td>
                            <td>
                                <!-- <i class="fa fa-pencil-square-o btn load" id="m" data-toggle="modal" href="#modal-invDevo" modulo="inventario"></i> -->
                                <i class="fa fa-info-circle btn" id="c" data-toggle="modal" href="#modal-invContaComment" modulo="inventario" title="Detalle de Activo" style="color: #3C8FAD"></i>
                                <i class="fa fa-print btn" codigo="" id="p" data-toggle="modal" href="#modal-invConta" modulo="inventario"></i>
                                <i class="fa fa-times btn delete" codigo="1" modulo="inventario" id="d" style="color: #D9534F" title="Anular"></i>
                            </td>
                        </tr>
                        <!-- [/section] -->
                    </tbody>
                </table>
            </div>
    </div>
</div>

<div class="modal fade" id="modal-invContaComment">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Detalle Contable</h4>
                <h5 class="form-horizontal"><b>Codígo-<span id="numFDevo">215</span></b></h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-9 col-sm-9">
                        <div class="input-group">
                            <span class="input-group-addon">Realizado por</span>
                            <input type="text" class="form-control" id="nomUser" value="Rolando Rorrigo" readonly>
                        </div>
                    </div>
                    <div class="col-xs-3 col-sm-3 eder">
                        <input type="checkbox" checked data-toggle="toggle" data-off="<span id='editCannotCont'>Editable</span>" data-on="<span id='editCanCont'>Editar</span>" data-size="small" data-width="100" data-onstyle="warning-outline" data-offstyle="warning">
                <!-- <i class="fa fa-edit" id="editCan"></i> -->
                    </div>
                </div>
                <hr>
                <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="input-group">
                        <span class="input-group-addon">Descripción</span>
                        <input type="text" class="form-control" id="detalleGasto" value="" placeholder="" readonly>
                    </div>
                </div>
                </div><br>
                <div class="row">
                <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                    <div class="input-group-addon">Tipo</div>
                    <select id="vidunidad" class="form-control" type="select">
                    <!-- [section name=LE loop=$UNI]
                    <option value="[$UNI[LE][0]]">[$UNI[LE][1]]</option>';
                    [/section] -->
                    </select>
                    </div>
                </div>
                <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                        <div class="input-group-addon">Cantidad</div>
                        <input type="text" class="form-control" id="cantCont" placeholder="0.00">
                    </div>
                </div>
                </div>
                <br>
                <div class="input-group der" style="width: 50%">
                    <div class="input-group-addon">Total</div>
                    <input type="text" class="form-control" id="totDevo" placeholder="0.00" readonly>
                </div>
                <br>
                <legend><small>Comentario</small></legend>
                <textarea id="commentFDev" class="form-control" rows="4" required="required" style="max-height: 200px" readonly></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                <button type="button" class="btn btn-primary" id="editContable">Editar</button>
            </div>
        </div>
    </div>
</div>
</div>

<script src="../assets/js/bv2_toggle.js"></script>