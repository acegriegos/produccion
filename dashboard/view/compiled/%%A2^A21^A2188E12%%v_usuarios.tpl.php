<?php /* Smarty version 2.6.17, created on 2016-08-30 10:48:37
         compiled from v_usuarios.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Usuarios</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu1.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-usuarios.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

<br>

    <?php echo $this->_tpl_vars['NAV']; ?>

<div class="bdy">
  <nav class="navbar navbar-dark bg-primary">
        <!-- Brand -->
        <a class="navbar-brand" href="#"><b>Usuarios</b></a>
        <!-- Links -->
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <a class="nav-link menu2 active" id="m1" href="#">Mantenimiento</a>
            </li>
            <li class="nav-item menu2" id="m2">
                <a class="nav-link" href="#">Permisos</a>
            </li>
            <li class="nav-item menu2" id="m3">
                <a class="nav-link" href="#">Historial</a>
            </li>
        </ul>
    </nav>
<br>       
<div class="panel panel-default" id="cuerpo"> 

           <div class="panel-body" >

            <form id="fusuarios">

           <div class="row">

               <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon"><b>Usuario</b></span>
                        <input type="hidden" id="vid" value="0">
                        <input type="hidden" id="vidusuario" value="">
                        <input type="text" id="vuser" class="form-control" placeholder="Ingrese el Usuario" tabindex="1">
                        <span class="input-group-addon asterisco"><b>*</b></span>
                    </div>
                    <br>

                    <div class="input-group">
                        <span class="input-group-addon"><b>Nombre del Usuario</b></span>
                        <input type="text" id="vnombre" class="form-control" placeholder="Ingrese el Nombre del Usuario" tabindex="3">
                        <span class="input-group-addon asterisco"><b>*</b></span>
                    </div>
                    <br>

                    <div class="input-group">
                        <span class="input-group-addon"><b>Correo del Usuario</b></span>
                        <input type="mail" id="vmail" class="form-control" placeholder="Ingrese el Correo del Usuario" tabindex="5">
                    </div>
                    <br>
               </div>
               
               <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon"><b>Tipo Usuario</b></span>
                        <select id="vidTipoUsuario" class="form-control" tabindex="2" type="select">
                            <option value="0">Seleccione un Tipo de Usuario</option>
                            <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['TUSR']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                                <option value="<?php echo $this->_tpl_vars['TUSR'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['TUSR'][$this->_sections['LE']['index']][1]; ?>
</option>
                            <?php endfor; endif; ?>
                        </select>
                        <span class="input-group-addon asterisco"><b>*</b></span>
                    </div>
                    <br>
                    <div class="input-group">
                        <span class="input-group-addon"><b>Cédula del Usuario</b></span>
                        <input type="text" id="vcedula" data-mask="9-9999-9999-9999" class="form-control" placeholder="Ingrese la Cédula del Usuario" tabindex="4">
                        <span class="input-group-addon asterisco"><b>*</b></span>
                      </div>
                    <br>
                    <div class="input-group">
                      <div class="input-group-addon"><b>Sucursal</b></div>
                      <select type="select" id="vidsucursal" class="form-control" required="required" tabindex="6">
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
           <hr>
           <div class="row">
               <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon"><b>Contraseña</b></span>
                        <input type="password" id="vclave" class="form-control" value="" tabindex="7">
                        <span class="input-group-addon btn" id="spas"><b><i class="fa fa-eye"></i></b></span>
                        <span class="input-group-addon asterisco"><b>*</b></span>
                    </div>
                    <br>
                    <div class="input-group">
                        <span class="input-group-addon"><b>Hora Entrada</b></span>
                        <input type="time" id="vlimite" class="form-control" value="08:00" tabindex="9">
                        <span class="input-group-addon asterisco"><b>*</b></span>
                    </div>
                    <br>
               </div>

               <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon"><b>Repita Contraseña</b></span>
                        <input type="password" id="clave" class="form-control" value="" tabindex="8">
                        <span class="input-group-addon asterisco"><b>*</b></span>
                    </div>
                    <br>
                    <div class="input-group">
                        <span class="input-group-addon"><b>Hora Salida</b></span>
                        <input type="time" id="vlimite2" class="form-control" value="17:00" tabindex="10">
                        <span class="input-group-addon asterisco"><b>*</b></span>
                    </div>
                    <br>
               </div>
           </div>

              <input type="hidden" id="vbcambioPSSW" class="form-control" value="0">
              <input type="hidden" id="vcodigo" class="form-control" value="">
              <small style="float: left;" class="asterisco">* Campo Requerido</small>
              
              <div class="alert alert-danger err_" id="err1" style="display: none">
                <strong id="errm1"></strong>
              </div>
              <div class="alert alert-success suc_" id="suc1" style="display: none">
                  <strong id="sucm1"></strong>
              </div>
              <!-- <button type="submit" class="btn btn-primary der" id="back" title="Agregar Usuario" style="margin-right: 15px; padding: 12px 18px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i> -->

              <button type="submit" class="btn btn-primary der fa fa-plus add per500" id="userSubmit" title="Agregar Usuario" codigo="1" modulo="usuario" style="margin-right: 15px; padding: 12px 18px; border-radius: 42px;">

              <!-- <button type="submit" class="btn btn-success der add per500" id="userSubmit" title="Agregar Usuario" modulo="usuario" codigo="1" style="margin-left: 2%;"><i class="fa fa-plus"></i></button> -->
              <button type="submit" class="btn btn-default der" id="back" title="Agregar Usuario" style="display: none"><i class="fa fa-chevron-circle-right" ></i></button>
              
              </form>
           </div>
           
          <div class="panel-footer">
            <div class="table-responsive">
                <table class="table table-striped table-bordered dt-responsive nowrap" id="data-table-usuarios" cellspacing="0" width="100%">
                    <thead>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Correo</th>
                        <th>Tipo de Usuario</th>
                        <th>Hora Entrada</th>
                        <th>Hora Salida</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody id="listausuarios">
                    <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['USRS']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                          <td><?php echo $this->_tpl_vars['USRS'][$this->_sections['LE']['index']][1]; ?>
</td>
                          <td><?php echo $this->_tpl_vars['USRS'][$this->_sections['LE']['index']][2]; ?>
</td>
                          <td><?php echo $this->_tpl_vars['USRS'][$this->_sections['LE']['index']][3]; ?>
</td>
                          <td><a data-toggle="modal" class="correo" href='#modal-sendMail' id="e<?php echo $this->_tpl_vars['USRS'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['USRS'][$this->_sections['LE']['index']][4]; ?>
</a></td>
                          <td><?php echo $this->_tpl_vars['USRS'][$this->_sections['LE']['index']][5]; ?>
</td>
                          <td><?php echo $this->_tpl_vars['USRS'][$this->_sections['LE']['index']][6]; ?>
</td>
                          <td><?php echo $this->_tpl_vars['USRS'][$this->_sections['LE']['index']][7]; ?>
</td>
                          <td>
                            <i class="fa fa-pencil-square-o load cargar btn per501" modulo="usuario" title="Cargar Usuario" id="m<?php echo $this->_tpl_vars['USRS'][$this->_sections['LE']['index']][0]; ?>
" <?php if ($this->_tpl_vars['USRS'][$this->_sections['LE']['index']][1] == 'admin' && $_SESSION['NUM'] != 1): ?> disabled <?php endif; ?>></i>
                            <i class="fa fa-times delete eliminar btn per502" codigo="1" modulo="usuario" title="Eliminar Usuario" id="d<?php echo $this->_tpl_vars['USRS'][$this->_sections['LE']['index']][0]; ?>
" <?php if ($this->_tpl_vars['USRS'][$this->_sections['LE']['index']][1] == 'admin'): ?> disabled <?php endif; ?>></i>
                          </td>
                        </tr>
                    <?php endfor; endif; ?>
                    </tbody>
                </table>
            </div>

          </div>
          
       </div>
   
   <div class="modal fade" id="modal-sendMail">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
           <h4 class="modal-title" id="corTit"></h4>
         </div>

         <form id="sendMail">

         <div class="modal-body">
        
        <div class="input-group">
             <span class="input-group-addon"><b>Asunto</b></span>
             <input type="text" id="subject" class="form-control" value="" required>
         </div>
         
         <br>
         
         <div class="input-group">
             <span class="input-group-addon"><b>Para</b></span>
             <input type="mail" id="to" class="form-control" value="" required>
         </div>

         <br>

         <div class="input-group">
             <span class="input-group-addon"><b>Mensaje</b></span>
             <textarea id="content" class="form-control" required></textarea>
         </div>

         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
           <button type="submit" class="btn btn-primary"><i class="fa fa-envelope-o"></i></button>
         </div>
         
         </form>
       </div>
     </div>
   </div>
</div>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/mask/jquery.mask.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
    <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
    <script src="../assets/js/asgard.js"></script>
    <script src="../assets/js/modulos/usuarios.js"></script>

  </body>
</html>