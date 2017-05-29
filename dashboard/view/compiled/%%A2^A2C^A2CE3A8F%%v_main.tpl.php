<?php /* Smarty version 2.6.17, created on 2017-05-19 17:28:59
         compiled from v_main.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Sistema BMS</title>
    <?php echo $this->_tpl_vars['STY']; ?>

    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu.css">

  </head>
  <body>
    <?php echo $this->_tpl_vars['NAV']; ?>

    <div class="bdy">

    <div class="row" style="border-bottom: 1px solid #e2e2e2">
    <?php if ($_SESSION['TIPO'] == 1): ?>
        
            <div class="input-field col s12 m6 l3">

                <select>
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
                <label>Seleccione una Sucursal</label>
            </div>
    <?php endif; ?>
    <a href="#" class="btn-floating der per100"><i class="material-icons">add</i></a>
    </div>

    <!-- <form id="checkout-form" action="main" method="post">
      <div id="error-message"></div>

      <label for="card-number">Card Number</label>
      <div class="hosted-field" id="card-number"></div>

      <label for="cvv">CVV</label>
      <div class="hosted-field" id="cvv"></div>

      <label for="expiration-date">Expiration Date</label>
      <div class="hosted-field" id="expiration-date"></div>

      <input type="hidden" name="payment_method_nonce">
      <input type="hidden" name="accion" value="1">

      <input type="submit" value="Pay $10" disabled>
    </form>

    <script src="https://js.braintreegateway.com/web/3.11.1/js/client.js"></script>
    <script src="https://js.braintreegateway.com/web/3.11.1/js/hosted-fields.js "></script> -->
    <?php echo $this->_tpl_vars['SCR']; ?>

    <script src="../assets/js/main.js?v=1.0"></script>


  </body>
</html>