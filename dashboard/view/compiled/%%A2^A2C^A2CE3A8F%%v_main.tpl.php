<?php /* Smarty version 2.6.17, created on 2016-12-02 18:06:55
         compiled from v_main.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Sistema BMS</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu.css">

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
                        <option value="0">Todas las Sucursales</option>
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
  </body>
</html>