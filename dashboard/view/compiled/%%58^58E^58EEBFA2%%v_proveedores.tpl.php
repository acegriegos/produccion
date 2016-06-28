<?php /* Smarty version 2.6.17, created on 2016-04-26 23:45:04
         compiled from v_proveedores.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Proveedores</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-proveedores.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <?php echo $this->_tpl_vars['NAV']; ?>

    <div class="bdy">
        <h2 align="center">MANTENIMIENTO DE PROVEEDORES</h2><hr><br>
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <button type="button" class="btn btn-primary" data-toggle="modal" href="#modal-buscar" style="margin-left: 15px;">Buscar</button>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <a class="btn btn-primary der" data-toggle="modal" href='#modal-Proveedor' id="IaddProv" style="margin-right: 15px;">Agregar Proveedor <i class="fa fa-plus"></i></a>
            </div>
        </div><br><br>
        <div class="alert alert-danger err_" id="err2" style="display:none">
            <strong id="errm2"></strong>
        </div>

        <div class="alert alert-success suc_" id="suc2" style="display:none">
            <strong id="sucm2"></strong>
        </div>

        <div class="table-responsive">
            <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-proveedores">
                <thead>
                    <tr>
                        <th>Cedula Juridica</th>
                        <th style="width: 50%">Razon Social</th>
                        <th style="width: 20%">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listaproveedores">
                    <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['PROV']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['LE']['show'] = true;
$this->_sections['LE']['max'] = $this->_sections['LE']['loop'];
$this->_sections['LE']['step'] = 1;
$this->_sections['LE']['start'] = $this->_sections['LE']['step'] > 0 ? 0 : $this->_sections['LE']['loop']-1;
if ($this->_sections['LE']['show']) {
    $this->_sections['LE']['total'] = $this->_sections['LE']['loop'];
    if ($this->_sections['LE']['total'] == 0)
        $this->_sections['LE']['show'] = false;
} else
    $this->_sections['LE']['total'] = 0;
if ($this->_sections['LE']['show']):

            for ($this->_sections['LE']['index'] = $this->_sections['LE']['start'], $this->_sections['LE']['iteration'] = 1;
                 $this->_sections['LE']['iteration'] <= $this->_sections['LE']['total'];
                 $this->_sections['LE']['index'] += $this->_sections['LE']['step'], $this->_sections['LE']['iteration']++):
$this->_sections['LE']['rownum'] = $this->_sections['LE']['iteration'];
$this->_sections['LE']['index_prev'] = $this->_sections['LE']['index'] - $this->_sections['LE']['step'];
$this->_sections['LE']['index_next'] = $this->_sections['LE']['index'] + $this->_sections['LE']['step'];
$this->_sections['LE']['first']      = ($this->_sections['LE']['iteration'] == 1);
$this->_sections['LE']['last']       = ($this->_sections['LE']['iteration'] == $this->_sections['LE']['total']);
?>
                    <tr>
                        <td><?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][1]; ?>
</td>
                        <td><?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][2]; ?>
</td>
                        <td>
                        <i class="fa fa-book fa-lg btn state" id="s<?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][0]; ?>
" title="Ver Estado de Cuenta" data-toggle="modal" href="#modal-estadoCuenta"></i>
                        <i class="fa fa-check-square fa-lg btn pagovarios" id="sp<?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href='#modal-pagoVariosP' title="Realizar Varios Pagos"></i>
                        <i class="fa fa-pencil-square-o fa-lg btn load" modulo="proveedore" title="Modificar Proveedor" id="m<?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href='#modal-Proveedor'></i>
                        <i class="fa fa-times btn fa-lg delete" title="Eliminar Proveedor" codigo="2" modulo="proveedore" id="d<?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][0]; ?>
"></i>
                        </td>
                    </tr>
                    <?php endfor; endif; ?>
                </tbody>
            </table>
        </div>
        </div>


    </div>

    <div class="modal fade" id="modal-Proveedor">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title accmodal">AGREGAR PROVEEDOR</h4>
                </div>
                <div class="modal-body">
                <form id="fproveedores">
                    <div class="panel-body">
                        <div class="row">
                            <label>Cédula Jurídica</label>
                            <input type="text" id="vcedula" class="form-control" value="" required="required" placeholder="Cédula Jurídica" data-mask="9-999-999999">
                            <label>Razón Social</label>
                            <input type="text" id="vnombre" class="form-control" value="" required="required" placeholder="Razón Social del Proveedor">
                            <input type="hidden" id="vid" class="form-control" value="0">
                        </div>
                    </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                    <button type="sumbit" class="btn btn-primary add" id="sprov" codigo="1" modulo="proveedore">Agregar</button>
                    <button type="submit" class="btn btn-primary edit" id="aprov" codigo="1" modulo="proveedore">Aceptar</button>
                        <br><br>
                        <div class="alert alert-danger err_" id="err1">
                            <!-- <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> -->
                            <strong id="errm1"></strong>
                        </div>
                        <div class="alert alert-success suc_" id="suc1">
                            <!-- <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> -->
                            <strong id="sucm1"></strong>
                        </div>
                    
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-buscar">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Filtro Proveedores</h4>
                </div>
                <div class="modal-body">
                    <label>Cédula Jurídica</label>
                    <input type="text" id="cedula" class="form-control" value="" required="required" placeholder="Cédula Jurídica del Proveedor" data-mask="9-999-999999">
                    <label>Razón Social</label>
                    <input type="text" id="nombre" class="form-control" value="" required="required" placeholder="Razón Social del Proveedor">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                    <button type="button" class="btn btn-primary" id="buscar" data-dismiss="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/mask/jquery.mask.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
    <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
    <script src="../assets/js/asgard.js"></script>
    <script src="../assets/js/modulos/proveedores.js"></script>
  </body>
</html>