<?php /* Smarty version 2.6.17, created on 2016-11-02 20:24:19
         compiled from v_main.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Sistema de Compras</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu1.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">

  </head>
  <body>
    <br>
    <?php echo $this->_tpl_vars['NAV']; ?>

    <div class="bdy">
    <?php if ($_SESSION['TIPO'] == 1): ?>
        <div class="row">
            <div class="col-xs-12 col-md-12 der">
                <div class="input-group">
                    <div class="input-group-addon">Sucursal</div>
                    <select id="vidsucursal" class="form-control" required="required">
                        <option value="0">Seleccione una Sucursal</option>
                        <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['SUC']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                        <option value="<?php echo $this->_tpl_vars['SUC'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['SUC'][$this->_sections['LE']['index']][1]; ?>
</option>
                        <?php endfor; endif; ?>
                    </select>
            </div>
            </div>
        </div>

        <input type="hidden" id="idsuc" value="<?php echo $_SESSION['IDSUC']; ?>
">
    <?php endif; ?>

    <!-- <form id="fclientes">
    <div class="alert alert-danger err_" id="err1">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <strong id="errm1"></strong>
    </div>
    <small id="suc1" class="suc_"></small>
    <button type="button" class="btn btn-primary add" modulo="clientes" codigo="1">Agregar</button>
    </form>  -->

    </div>

    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/mask/jquery.mask.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
    <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
    <script src="../assets/js/asgard.js"></script>

  </body>
</html>