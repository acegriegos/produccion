<div id="flaboratorio-explantes">
              <input type="hidden" class="zelda">
              <div class="row">

                <div class="col s6 input-field">
                  <input type="text" id="vnombre" class="eder">
                  <label for="vnombre">Explante</label>
                </div>

                <div class="col s6 input-field">
                  <input type="date" id="vfecha" class="datepicker eder">
                  
                </div>

              </div>

              <div class="row">
                
                <div class="col s6">

                  <div class="input-field">
                    <input type="text" id="ncli" placeholder="Nombre o Cédula del Cliente" class="eder autocomplete">
                    <label for="ncli">Procedencia</label>
                  </div>

                  <div class="input-field">
                    <input type="text" id="vvariedad" class="eder" placeholder="Nombre de la Variedad">
                    <label for="vvariedad">Variedad</label>
                  </div>

                  <div class="input-field">
                    <input type="text" id="vcantidad" class="eder" value="0.00">
                    <label for="vcantidad">Cantidad</label>
                  </div>

                  <div class="input-field">
                    <input type="text" id="vexpectativa" class="eder" value="0">
                    <label for="vexpectativa">Expectativa</label>
                  </div>
                  
                </div>

                <div class="col s6">

                   <table class="responsive-table highlight">
                    <thead>
                      <tr>
                          <th>Dirección</th>
                          <th>Región</th>
                          <th>Finca <a class="btn-floating blue z-depth-5 der" id="addFin" style="padding-right: 5% !important;height:30px; width: 30px"><i class="mdi mdi-plus mdi-10px"></i></a></th>
                      </tr>
                    </thead>

                    <tbody id="fincas">
                      <tr>
                        <td colspan="3" class="center">No Hay Datos Registrados</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

              <div class="row">

                <div class="col s3">
                  <div class="input-field">
                    <input type="text" id="vdesde" class="eder">
                    <label for="vdesde">Desde</label>
                  </div>
                </div>

                <div class="col s3">
                  <div class="input-field">
                    <input type="text" id="vhasta" class="eder">
                    <label for="vhasta">Hasta</label>
                  </div>
                </div>
                <a href="#!" class="btn add der" modulo="laboratorio-explante">Ingresar</a>
                <a href="#!" class="btn der" modulo="laboratorio-explante" style="margin-right: 10px;">Listado de Recepciones</a>
              </div>
</div> 

<div class="modal modal-fixed-footer grandemodal" id="addClie" style="height: 80%; width: 75%">

      <div class="modal-header">
        <ul class="tabs tabs-fixed-width blue">
            <li class="tab"><a class="active white-text titadd" href="#!" style="cursor: default;"></a></li>
        </ul>
      </div>

      <div class="modal-content">

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
            <input type="text" id="vcedula" />
            <label for="vcedula">Cédula</label>
        </div>

      </div>

      <div class="row cli">

         <div class="col s6 m4 input-field">
            <input type="text" id="vnombre" />
            <label for="vnombre">Nombre</label>
        </div>

        <div class="col s6 m4 input-field">
            <input type="text" id="vapellido1" />
            <label for="vapellido1">Apellido 1</label>
        </div>

        <div class="col s6 m4 input-field">
            <input type="text" id="vapellido2" />
            <label for="vapellido2">Apellido 2</label>
        </div>

      </div>

        <div class="row">
                <div class="col s6 m3 input-field">
                  <input type="text" id="pais" class="autocomplete">
                  <label for="pais">País</label>
                </div>
                
                <div class="col s6 m3 input-field">
                  <select id="provincia"> <option value="0" disabled>Seleccione una Opción</option></select>
                  <label for="provincia">Provincia</label>
                </div>
                
                <div class="col s6 m3 input-field">
                  <select id="canton"> <option value="0" disabled>Seleccione una Opción</option></select>
                  <label for="canton">Cantón</label>
                </div>
                
                <div class="col s6 m3 input-field">  
                  <select id="vdistrito"><option value="0" disabled>Seleccione una Opción</option></select>
                  <label for="vdistrito">Distrito</label>
                </div>
                
                <div class="col s6 m3 prod input-field">  
                  <input type="text" id="vregion" class="autocomplete">
                  <label for="vregion">Región</label>
                </div>
                
                <div class="col s6 m3 prod input-field">  
                  <input type="text" id="finca" class="autocomplete">
                  <label for="finca">Finca</label>
                </div>
                
              </div>

              <div class="row cli">

                <div class="col s6 m4 input-field">  
                  <select id="vcategoria">
                    <option selected value="0" disabled>Seleccione una Opción</option>
                    <?php foreach ($categorias as $key) {
                      echo '<option value="'.$key[0].'">'.$key[1].'</option>';
                    } ?>
                  </select>
                  <label for="vcategoria">Categoría</label>
                </div>

                <div class="col s6 m4 input-field">  
                  <input type="text" id="vcorreo">
                  <label for="vcorreo">Correo</label>
                </div>

                 <div class="col s6 m4 input-field">  
                  <input type="text" id="vtelefono">
                  <label for="vtelefono">Teléfono</label>
                </div>

              </div>
              
              <div class="row">  
                <div class="col s12 input-field">  
                  <textarea id="vdireccion" class="materialize-textarea"></textarea>
                  <label for="vdireccion">Otras Señas</label>
                </div>
                
                <div class="col s6 m3 prod input-field">  
                  <input type="text" id="vlatitud" value="0">
                  <label for="vlatitud">Latitud</label>
                </div>

                <div class="col s6 m3 prod input-field">  
                  <input type="text" id="vlongitud" value="0">
                  <label for="vlongitud">Longitud</label>
                </div>
        </div>
      </div>

      <div class="modal-footer">

        <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        <button type="button" class="waves-effect waves-green btn-flat" id="ingresar" >Guardar</button>
    </div>
    </div>