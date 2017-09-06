<div class="panel-body pequeño" >

  <form id="fusuarios">
    <div class="row">
      <div class="input-field col s12  m6 l4" style="margin-bottom: 0 !important">
        <input id="vuser" type="text" class="validate">
        <input type="hidden" id="vid" value="0">
        <input type="hidden" id="vidusuario" value="">
        <input type="hidden" id="vidsucursal" value="">
        <label for="vuser">Usuario</label>
      </div>
      <div class="input-field col s12 m6 l4" style="margin-bottom: 0 !important">
        <input id="vnombre" type="text" class="validate">
        <label for="vnombre">Nombre de Usuario</label>
      </div>

      <div class="input-field col s12 m6 l4" style="margin-bottom: 0 !important">
        <input id="vcedula" type="text" class="validate">
        <label for="vcedula">Cédula del Usuario</label>
        
      </div>
      <div class="input-field col s12 m6 l4" style="margin-bottom: 0 !important">
        <input id="vmail" type="text" class="validate">
        <label for="vmail">Correo de Usuario</label>
      </div>

      <div class="input-field col s12 m6 l4">
        <select id="vidTipoUsuario" type="select" style="margin-bottom: 0 !important">
          <option value="0" selected disabled>Seleccione un Tipo de Usuario</option>
          <?php  foreach ($tusr as $obj) { ?>
          <option value="<?php echo $obj[0]; ?>"><?php echo $obj[1]; ?></option>
          <?php } ?>
        </select>
      </div>
      <div class="input-field col s12 m6 l4" >
        <select id="vidsuc" type="select" style="margin-bottom: 0 !important" multiple>
          <option value="0" selected disabled>Seleccione una Sucursal</option>
          <?php  foreach ($suc as $obj) { ?>
          <option value="<?php echo $obj[0]; ?>"><?php echo $obj[1]; ?></option>
          <?php } ?>

        </select>
      </div>
      <div class="input-field col s12 m6 l4">
        <input id="vclave" type="password" class="validate">
        <label for="vclave">Contraseña</label>
      </div>
      <div class="input-field col s12 m6 l4">
        <input id="clave" type="password" class="validate">
        <label for="clave">Repetir Contraseña</label>
      </div>

      <div class="col s12 m6 l2 pequeño" style="margin-bottom: 20px;">
        <label>Hora de Entrada</label>
        <input id="vlimite" type="time" class="validate">
      </div>
      <div class=" col s12 m6 l2 pequeño" style="margin-bottom: 20px;">
        <label>Hora de Salida</label>
        <input id="vlimite2" type="time" class="validate">
      </div>
    </div>

    <a class="btn-floating waves-effect waves-green blue right add z-depth-5" id="userSubmit" title="Agregar Usuario" modulo="usuario"><i class="material-icons">add</i></a>
    <br>
    <input type="hidden" id="vbcambioPSSW" value="0">
    <input type="hidden" id="vcodigo" value="">
  </form>



</div>
<div class="row pequeño" >
  <div class="col s12 m12 l12 pequeño">
    <br>
    <div class="table-responsive pequeño">
      <table class="table bordered highlight pequeño responsive-table z-depth-5 centered" id="data-table-usuarios" cellspacing="0" width="100%">
        <thead>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Usuario</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Cédula</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Correo</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Tipo de Usuario</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Hora Entrada</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Hora Salida</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Acciones</th>
        </thead>
        <tbody id="listausuarios">
          <?php foreach ($usr as $obj) { ?><tr>
          <td style=" padding: 10px;"><?php echo $obj[1]; ?></td>
          <td style=" padding: 10px;"><?php echo $obj[2]; ?></td>
          <td style=" padding: 10px;"><?php echo $obj[3]; ?></td>
          <td style=" padding: 10px;"><a data-toggle="modal" class="correo" href='#modal-sendMail' id="e<?php echo $obj[0]; ?>"><?php echo $obj[4]; ?></a></td>
          <td style=" padding: 10px;"><?php echo $obj[5]; ?></td>
          <td style=" padding: 10px;"><?php echo $obj[6]; ?></td>
          <td style=" padding: 10px;"><?php echo $obj[7]; ?></td>
          <td style=" padding: 10px;">
            <a class="btn-floating waves-effect waves-light blue cargar load z-depth-5" modulo="usuario" title="Editar Usuario" id="m<?php echo $obj[0]; ?>" <?php if($obj[1] == 'admin' && $_SESSION['NUM'] != 0) echo "disabled"; ?> ><i class="fa fa-pencil-square-o"></i></a>
            <a class="btn-floating waves-effect waves-light red delete eliminar z-depth-5" modulo="usuario" title="Eliminar Usuario" id="d<?php echo $obj[0]; ?>" <?php if($obj[1] == 'admin') echo "disabled"; ?>><i class="fa fa-times"></i></a>
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