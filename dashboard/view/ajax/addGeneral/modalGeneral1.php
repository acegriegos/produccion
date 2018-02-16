<?php trim('asd asd asd asd ');?>
<div class="modal modal-fixed-footer grandemodal" id="modal-generalCliente" style="height: 80%; width: 75%">
  <div class="modal-header">
    <ul class="tabs tabs-fixed-width blue">
      <li class="tab"><a class="active white-text titadd" href="#!" style="cursor: default;"></a></li>
    </ul>
  </div>
  <div class="modal-content" id="fclientes">
    <input type="hidden" class="zelda">
    <div class="row cli" style="margin: 0px">
      <div class="col s6 m3 l2">
        <p>
          <input class="with-gap" name="tipoclie" type="radio" id="cfisico" tipoClie="1" checked="checked" principal="1"/>
          <label for="cfisico">Físico</label>
        </p>
      </div>
      <div class="col s6 m3 l2">
        <p>
          <input class="with-gap" name="tipoclie" type="radio" id="cjuridico" tipoClie="2" />
          <label for="cjuridico">Jurídico</label>
        </p>
      </div>
      <div class="col s6 m3 l2">
        <p>
          <input class="with-gap" name="tipoclie" type="radio" id="cnite" tipoClie="3" />
          <label for="cnite">NITE</label>
        </p>
      </div>
      <div class="col s6 m3 l2">
        <p>
          <input class="with-gap" name="tipoclie" type="radio" id="cdimex" tipoClie="4" />
          <label for="cdimex">DIMEX</label>
        </p>
      </div>
      <div class="col s6 m3 l4 input-field">
        <input type="text" id="cedula" />
        <label for="cedula">Cédula</label>
      </div>
    </div>
    <div class="row cli">
      <div class="col s6 m4 input-field">
        <input type="text" id="nombre" />
        <label for="nombre">Nombre</label>
      </div>
      <div class="col s6 m4 input-field">
        <input type="text" id="apellido1" />
        <label for="apellido1">Apellido 1</label>
      </div>
      <div class="col s6 m4 input-field">
        <input type="text" id="apellido2" />
        <label for="apellido2">Apellido 2</label>
      </div>
    </div>
    <div class="row">
      <div class="col s6 m3 input-field">
        <input type="text" id="pais" class="autocomplete">
        <label for="pais">País</label>
      </div>
      
      <div class="col s6 m3 input-field">
        <select id="provincia">
          <option value="0">Seleccione una Opción</option>
          <?php foreach ($transaccion as $obj) { ?>
            <option value="<?php $obj[0];?>"><?php $obj[1];?></option>
          <?php } ?>
        </select>
        <label for="provincia">Provincia</label>
      </div>
      
      <div class="col s6 m3 input-field">
        <select id="canton"> <option value="0" disabled>Seleccione una Opción</option></select>
        <label for="canton">Cantón</label>
      </div>
      
      <div class="col s6 m3 input-field">
        <select id="distrito"><option value="0" disabled>Seleccione una Opción</option></select>
        <label for="distrito">Distrito</label>
      </div>
    </div>
    <div class="row cli">
      <div class="col s6 m4 input-field">
        <select id="categoria">
          <option selected value="0" disabled>Seleccione una Opción</option>
        </select>
        <label for="categoria">Categoría</label>
      </div>
      <div class="col s6 m4 input-field">
        <input type="text" id="correo">
        <label for="correo">Correo</label>
      </div>
      <div class="col s6 m4 input-field">
        <input type="text" id="telefono">
        <label for="telefono">Teléfono</label>
      </div>
    </div>
    
    <div class="row">
      <div class="col s12 input-field">
        <textarea id="direccion" class="materialize-textarea"></textarea>
        <label for="direccion">Otras Señas</label>
      </div>
      
      <div class="col s6 m3 prod input-field">
        <input type="text" id="latitud" value="0">
        <label for="latitud">Latitud</label>
      </div>
      <div class="col s6 m3 prod input-field">
        <input type="text" id="longitud" value="0">
        <label for="longitud">Longitud</label>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
    <button type="button" class="waves-effect waves-green btn-flat" id="ingresar" >Guardar</button>
  </div>
</div>