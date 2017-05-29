<?php /* Smarty version 2.6.17, created on 2017-05-19 17:29:12
         compiled from v_verFacturas.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'upper', 'v_verFacturas.tpl', 20, false),)), $this); ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Facturas</title>
    <?php echo $this->_tpl_vars['STY']; ?>

    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-verfacturas.css">
  </head>
  <body>
  <br>
    <?php echo $this->_tpl_vars['NAV']; ?>

    <div class="bdy">

        <div class="card z-depth-5 ">
            <div class="card-header center blue-grey white-text"> 
            <p class="flow-text" style="margin-top: 0%; background-color:#0B3861">
            Vista de Facturas <?php echo ((is_array($_tmp=$_SESSION['EMPRESA'])) ? $this->_run_mod_handler('upper', true, $_tmp) : smarty_modifier_upper($_tmp)); ?>
</p>
            </div>

            <div class="row">
            <div class="col s6 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf1" <?php if ($this->_tpl_vars['TF'] == 1): ?>checked<?php endif; ?>/>
                <label for="tf1">Ventas</label>
            </div>
            <div class="col s6 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf2" <?php if ($this->_tpl_vars['TF'] == 2): ?>checked<?php endif; ?>/>
                <label for="tf2">Compras</label>
            </div>

            <div class="col s6 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf3" <?php if ($this->_tpl_vars['TF'] == 3): ?>checked<?php endif; ?>/>
                <label for="tf3">Ordenes de Compras</label>
            </div>
            <div class="col s6 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf4" <?php if ($this->_tpl_vars['TF'] == 4): ?>checked<?php endif; ?>/>
                <label for="tf4">Cotizaciones</label>
            </div>

            <div class="col s6 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf5" <?php if ($this->_tpl_vars['TF'] == 5): ?>checked<?php endif; ?>/>
                <label for="tf5">Orden de Pedidos</label>
            </div>      
                
            </div>

            <hr>
            <div class="row">
                <div class="col s12">
                    <span>Filtros</span>
                </div>
                <div class="col s12" id="vfacturas">
                     <table class="table responsive-table centered striped bordered highlight z-depth-5" id="data-table-facturas" cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">N° Factura</th>
                                <th class="white-text blue" rm="1" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Referencia</th>
                                <th class="white-text blue" rm="2" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Tipo</th>
                                <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Fecha</th>
                                <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Cliente</th>
                                <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Total</th>
                                <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Comentario</th>
                                <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listafacturas">
                            <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['FACT']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                                <td style="width: 10%"><?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][1]; ?>
</td>
                                <td style="width: 10%" rm="1"><?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][2]; ?>
</td>
                                <td style="width: 10%" rm="2"><?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][4]; ?>
</td>
                                <td style="width: 10%"><?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][5]; ?>
</td>
                                <td style="width: 10%"><?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][6]; ?>
</td>
                                <td style="width: 10%"><?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][7]; ?>
</td>
                                <td style="width: 10%"><?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][8]; ?>
</td>
                                <td style="width: 10%">
                                    <a class="btn-color pbtn material-icons print blueh" id="a<?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][0]; ?>
" tv="<?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][9]; ?>
" tp="<?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][10]; ?>
" title="Visualizar Factura">local_printshop</a>
                                    <a class="btn-color pbtn material-icons process blueh modal-trigger waves-effect waves-light" id="b<?php echo $this->_tpl_vars['FACT'][$this->_sections['LE']['index']][0]; ?>
" href="#modal-process" title="Procesar Factura" rm="3">settings</a>
                                </td>
                            </tr>
                            <?php endfor; endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <br><br>
        </div>
    </div>

    <div id="modal-process" class="modal modal-fixed-footer" style="width:70%;height:90%">
    <div class="modal-header">
        <div class="card-header center blue-grey white-text z-depth-1">
            <p class="flow-text marginzero"  style="background-color:#0B3861;" >Procesar <span id="nomproc"></span></p>
        </div>
    </div>
    <div class="modal-content">
        <table class="table responsive-table centered striped bordered highlight z-depth-5" id="data-table-productos" cellspacing="0" width="100%" >
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Nombre</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Código</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Código Interno</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Cantidad</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Acciones</th>
                </tr>
            </thead>
            <tbody id="listaproductos">
                
            </tbody>
        </table>
    </div>
    <div class="modal-footer">
        <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        <button type="button" class="waves-effect waves-green btn-flat" id="process">Comprar</button>
    </div>
  </div>

    <?php echo $this->_tpl_vars['SCR']; ?>

    <script src="../assets/js/modulos/verfacturas.js?v=0.8"></script>
  </body>
</html>