<?php /* Smarty version 2.6.17, created on 2016-07-28 10:21:57
         compiled from ajax/ajaxmantInvContable.tpl */ ?>
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
</div>