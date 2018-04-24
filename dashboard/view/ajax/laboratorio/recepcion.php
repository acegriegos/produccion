<div id="flaboratorio-explantes">
  <input type="hidden" class="zelda">
  <div class="row">
    <div class="col s6 input-field">
      <input type="text" id="vnombre" class="eder" disabled>
      <label for="vnombre">Identificación de explante</label>
    </div>
    <div class="col s6 input-field">
      <input type="date" id="vfecha" class="datepicker eder">
    </div>
  </div>
  <div class="row">
    <div class="col s5">
      <div class="input-field">
        <input type="text" id="ncli" placeholder="Nombre o Cédula del Cliente" class="eder autocomplete" addG="1" autocomplete="off">
        <label for="ncli">Procedencia</label>
      </div>
      <div class="input-field">
        <input type="text" id="vvariedad" class="eder autocomplete" placeholder="Nombre de la Variedad" addG="2" autocomplete="off">
        <label for="vvariedad">Variedad</label>
      </div>
      <div class="input-field">
        <input type="text" id="cantidad" class="eder numeric" value="0.00">
        <label for="cantidad">Cantidad</label>
      </div>
      <div class="input-field hide">
        <input type="text" id="expectativa hide" class="eder numeric" value="0">
        <label for="expectativa">Expectativa</label>
      </div>
      
    </div>
    <div class="col s6">
      <table class="responsive-table highlight striped">
        <thead class="tab1">
          <tr>
            <th></th>
            <th>Dirección</th>
            <th>Región</th>
            <th>Finca</th>
          </tr>
        </thead>
        <tbody id="fincas">
          <tr>
            <td colspan="3" class="center">No Hay Datos Registrados</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col s1">
      <a class="der btn-floating btn2 z-depth-2" id="addFin"><i class="mdi mdi-plus"></i></a>
    </div>
  </div>
  <div class="row">
    <input type="hidden" id="vresponsable">
    <div class="col s1">
      <span class="prefix hide">Rango:</span>
    </div>
    <div class="col s2">
      <div class="input-field hide">
        <input type="text" id="vrango1" class="eder" value="0">
        <label for="vrango1">Desde</label>
      </div>
    </div>
    <div class="col s2">
      <div class="input-field hide">
        <input type="text" id="vrango2" class="eder" value="0">
        <label for="vrango2">Hasta</label>
      </div>
    </div>
    <a class="btn btn3 der modal-trigger" href="#modal-listaRecepciones">Listado de Recepciones</a>
    <a class="btn btn1 add der" modulo="laboratorio-explante" style="margin-right: 10px;">Ingresar</a>
  </div>
</div>

<div class="modal modal-fixed-footer grandemodal" id="addClie" style="height: 80%; width: 75%">
  <div class="modal-header">
    <ul class="tabs tabs-fixed-width head3">
      <li class="tab"><a class="active white-text titadd" href="#!" style="cursor: default;"></a></li>
    </ul>
  </div>
  <div class="modal-content">
    <div class="row nserv">
      <div class="col s6 m3 input-field">
        <input type="text" id="vpais" class="autocomplete pais">
        <label for="vpais">País</label>
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

      <div class="col s6 m3 input-field">
        <select id="vidbarrio"><option value="0" disabled>Seleccione una Opción</option></select>
        <label for="vidbarrio">Distrito</label>
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
    <div class="row nserv">
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
    <button type="button" class="waves-effect waves-green btn-flat" id="ingresar">Guardar</button>
    <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
  </div>
</div>

<div id="modal-listaRecepciones" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
        <div class="card-header center head1 padding1">
            <p class="flow-text marginzero">Listado de Recepciones</p>
        </div>
    </div>
  <div class="modal-content">

    <table class="table responsive-table centered striped bordered highlight z-depth-3 pequeño" id="data-table-recepciones" cellspacing="0" width="100%" >

      <thead class="tab2">
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody id="listarecepciones">
      <!-- section -->
        <!-- <tr>
          <td style="padding: 10px; color:black;"></td>
          <td>
            <a class="btn-color pbtn mdi mdi- mdi-24px" id="" title="" style="color:black;"></a>
            <a class="btn-color pbtn cdel mdi mdi-close mdi-24px" id="" title="" style="color:black;"></a>
          </td>
        </tr> -->
      <!-- section -->
      </tbody>
    </table>
  </div>
  <div class="modal-footer ">

    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>

  </div>
</div>