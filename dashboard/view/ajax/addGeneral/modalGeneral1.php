<div class="modal modal-fixed-footer grandemodal" id="modal-generalCliente" style="height: 80%; width: 75%">
  <div id="fclientes">
    <div class="modal-header">
      <ul class="tabs tabs-fixed-width blue">
        <li class="tab"><a class="active white-text titadd" href="#!" style="cursor: default;"></a></li>
      </ul>
    </div>
    <div class="modal-content">
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
        <div class="col s6 m4 input-field ">
          <input type="text" id="nombre" />
          <label id="nomClie" for="nombre">Nombre</label>
        </div>
        <div class="col s6 m4 input-field hid">
          <input type="text" id="apellido1" />
          <label for="apellido1">Apellido 1</label>
        </div>
        <div class="col s6 m4 input-field hid">
          <input type="text" id="apellido2" />
          <label for="apellido2">Apellido 2</label>
        </div>
      </div>
      <div vtabla="ubicacione" id="fubicaciones" hasTabla="1" tp="3" class="ciclos">
        <div class="ciclos">
          <input type="hidden" id="vbisnacional" value="1">
          <input type="hidden" id="vidubicacion" value="0">
          <div class="row">
            <div class="col s6 m3 input-field">
              <input type="text" id="pais" class="autocomplete">
              <label for="pais">País</label>
            </div>
            <div class="col s6 m3 input-field">
              <select id="provincia" tipo="1" vtbl="9">
                <option value="0">Seleccione una Opción</option>
                {section name=LE loop=$PROV}
                <option value="{$PROV[LE][0]}">{$PROV[LE][1]}</option>
                {/section}
              </select>
              <label for="provincia">Provincia</label>
            </div>
            <div class="col s6 m3 input-field">
              <select id="canton" tipo="2" vtbl="10"> <option value="0" disabled>Seleccione una Opción</option></select>
              <label for="canton">Cantón</label>
            </div>
            <div class="col s6 m3 input-field">
              <select id="viddistrito" tipo="3" type="select"><option value="0" disabled>Seleccione una Opción</option></select>
              <label for="viddistrito">Distrito</label>
            </div>
          </div>
          <div class="row">
            <div class="col s12 m6 input-field">
              <input id="vdireccion" class="validate" type="text">
              <label for="vdireccion">Otras Señas</label>
            </div>
            <div class="col s6 m3 prod input-field">
              <input type="text" id="vlatitud" value="0" class="validate">
              <label for="vlatitud">Latitud</label>
            </div>
            <div class="col s6 m3 prod input-field">
              <input type="text" id="vlongitud" value="0" class="validate">
              <label for="vlongitud">Longitud</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row hid">
        <div class="col s6 m4 input-field">
          <select id="categoria">
            <option selected value="0">Seleccione una Opción</option>
            {section name=LE loop=$NIV}
            <option value="{$NIV[LE][0]}">{$NIV[LE][1]}</option>
            {/section}
          </select>
          <label for="categoria">Categoría</label>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="waves-effect waves-green btn-flat add" modulo="cliente" varias="1" tp="5">Guardar</button>
      <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
    </div>
  </div>
</div>