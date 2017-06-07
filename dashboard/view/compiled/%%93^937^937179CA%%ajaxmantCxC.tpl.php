<?php /* Smarty version 2.6.17, created on 2017-06-01 19:17:50
         compiled from ajax/cuentas/ajaxmantCxC.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'math', 'ajax/cuentas/ajaxmantCxC.tpl', 76, false),)), $this); ?>
      <link rel="stylesheet" href="../assets/css/modulos/style-cuentas.css">

      <nav class="nav-extended  white-text z-depth-5" style="background-color:#0B3861">
          <div class="nav-wrapper">
            <h4 align="center">Cuentas por Cobrar</h4>

        </div>
    </nav>
    <div id="mantCxC" style="font-size: 1.2em !important">



        <div class="card z-depth-5">

            <div class="row">
                <br><br>

                <div class="input-field col s7">

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
                        <table id="data-table-cuentas" class="table centered highlight bordered responsive-table z-depth-5 ">
                            <thead>
                                <tr>
                                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Factura</th>
                                    <th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 13%">Nombre</th>
                                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Cédula</th>
                                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Fecha</th>
                                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Saldo</th>
                                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Plazo</th>
                                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Días</th>
                                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Sucursal</th>


                                </tr>
                            </thead>
                            <tbody id="listaCuentasx">
                             <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['CLI']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                             <tr class="button-collapse detalle" data-activates="acciones" id="f<?php echo $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][12]; ?>
"  tipo ='1' tp="<?php if ($this->_tpl_vars['CLI'][$this->_sections['LE']['index']][7] < 0): ?>1<?php else: ?>0<?php endif; ?>">
                                <td><?php echo $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][3]; ?>
</td>
                                <td><?php echo $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][1]; ?>
</td>
                                <td><?php echo $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][2]; ?>
</td>
                                <td><?php echo $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][5]; ?>
</td>
                                <td><?php echo $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][6]; ?>
</td>
                                <td><?php echo $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][8]; ?>
</td>
                                <td style="<?php if ($this->_tpl_vars['CLI'][$this->_sections['LE']['index']][7] < 0): ?>color:red;<?php else: ?>color:green<?php endif; ?>"><?php echo smarty_function_math(array('equation' => 'abs(x)','x' => $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][7]), $this);?>
</td>
                                <td><?php echo $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][9]; ?>
</td>

                            </tr>
                            <?php endfor; endif; ?>
                        </tbody>
                    </table>
                    <br>

                </div>
            </div>
        </div>
        

    </div>
    <ul id="acciones" class="side-nav side-nav-cuentas"  style="width: 60%">


        <div class="card-header center white-text" style="background-color:#0B3861; margin: 0 !important" >
            <p class="flow-text" style="font-size: 1.9em; margin: 0 !important">Detalle de la Cuenta</p>
        </div>
        <div class="row">
            <div class="col s12 m12">
              <div class="card blue z-depth-5">
                <div class="card-content white-text center-align" style="padding-top: 0.5% !important; padding-bottom: 0 !important">



                    <div class="col s12 m8 l8 right-align " style="padding-right: 10% !important; "><span class="card-title "><b>Factura: <span id="ifac"> </span></b></span> 
                    </div>
                    <div class="col s12 m4 l4 " style=" padding-top: 1% !important">
                       <!--      <br>
                       < id="btn-div">DIV</button> -->
                       <button href="#!" class="waves-effect waves-light btn rigth z-depth-5 "  id="btn-div" style="background-color:#0B3861;"><i class="material-icons left">credit_card</i>Abonar</button>
                   </div>
               </div>
               <br>
               <div class="card-content white-text  " style="padding: 0.1% !important">

                  <div class="row  ">
                      <br>
                      <div class="col s6 m4 l4">
                          <p>Nombre: <span id="inombr"> </span></p>
                      </div>
                      <div class="col s12 m4 l4">
                        <p>Fecha: <span id="ifecha"> </span></p>
                    </div>
                    <div class="col s12 m4 l4">
                        <p>Saldo: <span id="isaldo"> </span></p>
                    </div>
                    <div class="col s12 m4 l4">
                        <p>Plazo: <span id="iplazo"> </span></p>
                    </div>
                    <div class="col s12 m6 l4">
                        <p>Dias del credito : <span id="idias"> </span></p>
                    </div>



                </div>


            </div>

            <div id="festadoscuentas" class="divabono" visible="0">
                <input type="hidden" id="vid" value="0">
                <input type="hidden" id="vidtipo" value="3">
                <input type="hidden" id="videstado" value="1">
                <input type="hidden" id="vidfactura" value="">
                <input type="hidden" id="vdebe" value="0">
                <input type="hidden" id="vhaber" value="0">
                <input type="hidden" id="vconsecutivo" value="0">
                <input type="hidden" id="vcomentario" value="">
                <div class="row">
                    <div class="col s12 ">
                        <div class="card" style="background-color:#0B3861">
                            <div class="card-content white-text ">
                                <div class="center-align"><span class="card-title  ">Abonos</span>
                                </div>
                                <div class="row">
                                    <div class="col s12 ">
                                        <p>Saldo Actual: <span id="isaldovista"> </span></p>
                                        <br>
                                    </div>


                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">credit_card</i>
                                        <input id="vvalor" type="text"  class="validate eder" value="0.00">
                                        <label for="vvalor" style="font-size: 1.2em !important">Monto</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <select type="select" id="vidtipopago">
                                            <option value="" disabled selected style="font-size: 1.2em !important">Tipo de Pago</option>
                                            <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['TIPOPAGO']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                                            <option value="<?php echo $this->_tpl_vars['TIPOPAGO'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['TIPOPAGO'][$this->_sections['LE']['index']][1]; ?>
</option>
                                            <?php endfor; endif; ?>
                                        </select>
                                    </div>
                                    <div class="col s12 m8 offset-m4 ">
                                        <button href="#!" class="waves-effect btn waves-light  z-depth-5 add" modulo="estadoscuenta" >Realizar Pago</button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>  

            </div> <!-- end divabono -->

        </div>
    </div>


    <div class="card-block">
        <div class="row">
            <div class="col s12">

                <table id="data-table-cuentas-detalle" class="table centered highlight bordered responsive-table z-depth-5 ">
                    <thead>
                        <tr>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Movimientos</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Fecha</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Monto</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Saldo</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Usuario</th>


                        </tr>
                    </thead>
                    <tbody id="listaCuentasxCDetalle">

                    </tbody>
                </table>
                <br>

            </div>
        </div>
    </div>


</ul>









</div> <!-- mantCxC -->