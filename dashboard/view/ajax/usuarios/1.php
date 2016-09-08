<div class="panel-body" >

            <form id="fusuarios">

           <div class="row">

               <div class="col-xs-6 col-sm-6">
                    <div class="input-group">
                        <span class="input-group-addon"><b>Usuario</b></span>
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

               </div>

               <div class="col-xs-6 col-sm-6">
                    <div class="input-group">
                        <span class="input-group-addon"><b>Tipo Usuario</b></span>
                        <select id="vidTipoUsuario" class="form-control" tabindex="2" type="select">
                            <option value="0">Seleccione un Tipo de Usuario</option>
                             <?php foreach ($tusr as $obj) { ?>
                                <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
                            <?php } ?>
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
               </div>

           </div>
           <hr>
           <div class="row">
               <div class="col-xs-6 col-sm-6">

                    <div class="input-group">
                        <span class="input-group-addon"><b>Contraseña</b></span>
                        <input type="password" id="vclave" class="form-control" value="" tabindex="5">
                        <span class="input-group-addon btn" id="spas"><b><i class="fa fa-eye"></i></b></span>
                        <span class="input-group-addon asterisco"><b>*</b></span>
                    </div>
                    <br>

                    <div class="input-group">
                        <span class="input-group-addon"><b>Hora Entrada</b></span>
                        <input type="time" id="vlimite" class="form-control" value="08:00" tabindex="7">
                        <span class="input-group-addon asterisco"><b>*</b></span>
                    </div>

                    <br>

               </div>

               <div class="col-xs-6 col-sm-6">

                    <div class="input-group">
                        <span class="input-group-addon"><b>Repita Contraseña</b></span>
                        <input type="password" id="clave" class="form-control" value="" tabindex="6">
                        <span class="input-group-addon asterisco"><b>*</b></span>
                    </div>
                    <br>

                    <div class="input-group">
                        <span class="input-group-addon"><b>Hora Salida</b></span>
                        <input type="time" id="vlimite2" class="form-control" value="17:00" tabindex="8">
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
               <button type="submit" class="btn btn-success der add" id="userSubmit" title="Agregar Usuario" modulo="usuario" codigo="1" style="margin-left: 2%;"><i class="fa fa-plus"></i></button>
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
                    <?php foreach ($usr as $obj) {
                      
                    ?>
                        <tr>
                          <td><?php echo $obj[1] ?></td>
                          <td><?php echo $obj[2] ?></td>
                          <td><?php echo $obj[3] ?></td>
                          <td><a data-toggle="modal" href='#modal-sendMail' class="correo" id="e<?php echo $obj[0] ?>"><?php echo $obj[4] ?></a></td>
                          <td><?php echo $obj[5] ?></td>
                          <td><?php echo $obj[6] ?></td>
                          <td><?php echo $obj[7] ?></td>
                         <td>
                            <i class="fa fa-pencil-square-o load cargar btn" modulo="usuario" title="Cargar Usuario" id="m<?php echo $obj[0] ?>"></i>
                            <i class="fa fa-times delete eliminar btn" modulo="usuario" title="Eliminar Usuario" id="d<?php echo $obj[0] ?>"></i>
                          </td>
                        </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>

          </div>
          
       </div>

       <script type="text/javascript">
  $(function(){
    permisos(310,311);
  })
 </script>