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
        <select <?php if ($_SESSION['BUSS'] == 1) echo 'disabled'; ?> id="vidTipoUsuario" type="select" style="margin-bottom: 0 !important">
          <option value="0" selected disabled>Seleccione un Tipo de Usuario</option>
          <?php  foreach ($tusr as $obj) { ?>
          <option value="<?php echo $obj[0]; ?>"><?php echo $obj[1]; ?></option>
          <?php } ?>
        </select>
      </div>
      <div class="input-field col s12 m6 l4" >
        <select id="vidsuc" <?php if ($_SESSION['BUSS'] == 1) echo 'disabled'; ?> type="select" style="margin-bottom: 0 !important" class="suc" multiple>
          <option value="" selected disabled>Seleccione una Sucursal</option>
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

      <div class="input-field col s12 m6 l2 pequeño <?php if ($_SESSION['BUSS'] == 1) echo 'hide'; ?>" style="margin-bottom: 20px;">
        <label for="vlimite">Hora de Entrada</label>
        <input id="vlimite" type="text" class="timepicker">
      </div>
      <div class="input-field col s12 m6 l2 pequeño <?php if ($_SESSION['BUSS'] == 1) echo 'hide'; ?>" style="margin-bottom: 20px;">
        <label for="vlimite2">Hora de Salida</label>
        <input id="vlimite2" type="text" class="timepicker">
      </div>
    </div>

    <a class="btn-floating waves-effect waves-green btn2 right add z-depth-3 <?php if($_SESSION['BUSS'] == 1) echo 'hide'; ?>" id="userSubmit" title="Agregar Usuario" modulo="usuario"><i class="mdi mdi-plus mdi-24px"></i></a>
    <br>
    <input type="hidden" id="vbcambioPSSW" value="0">
    <input type="hidden" id="vcodigo" value="">
  </form>



</div>
<div class="row pequeño" >
  <div class="col s12 m12 l12 pequeño">
    <br>
    <div class="table-responsive pequeño">
      <table class="table bordered highlight pequeño responsive-table striped centered" id="data-table-usuarios" cellspacing="0" width="100%">
        <thead class="tab1">
          <th style="border: 0; border-radius: 0px !important;">Usuario</th>
          <th style="border: 0; border-radius: 0px !important;">Nombre</th>
          <th style="border: 0; border-radius: 0px !important;">Cédula</th>
          <th style="border: 0; border-radius: 0px !important;">Correo</th>
          <th style="border: 0; border-radius: 0px !important;">Tipo de Usuario</th>
          <th style="border: 0; border-radius: 0px !important;">Hora Entrada</th>
          <th style="border: 0; border-radius: 0px !important;">Hora Salida</th>
          <th style="border: 0; border-radius: 0px !important;">Acciones</th>
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
            <a class="cargar load gtext pbtn" modulo="usuario" title="Editar Usuario" id="m<?php echo $obj[0]; ?>" <?php if($obj[1] == 'admin' && $_SESSION['NUM'] != 0) echo "disabled"; ?> ><i class="mdi mdi-pencil mdi-24px"></i></a>
            <a class="delete eliminar gtext pbtn" modulo="usuario" title="Eliminar Usuario" id="d<?php echo $obj[0]; ?>" <?php if($obj[1] == 'admin') echo "disabled"; ?>><i class="mdi mdi-close mdi-24px"></i></a>
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