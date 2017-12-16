<div class="card z-depth-5">
    <div class="row">
        <br>
        <div class="row">
            <div class="col s10 offset-s2 m4 l3" style="margin-top:2%; ">
              <li class="btn waves-effect waves-light func z-depth-5" fn="f1" id="fn1">Realizar Transacción</li>

          </div>

          <div class="col s10 offset-s2 m4 l3" style="margin-top:2%; "><li class="btn waves-effect waves-light func z-depth-5" fn="f2">Ver Transacciones</li></div>

      </div>


      <div class="row">

      <div class="col s12 " id="show_transac" >

        <!-- Funcion 1 -->

        <div id='ftransacciones'>  
            <div  class="sub-tran" id="t1">
                <input type="hidden" class="zelda">
                <div class="row">
                   <div class="input-field col s12 m6 l4">
                  <input  id="vdescripcion" type="text" class="validate" >
                  <label for="descripcion">Descripcion de la Transacción</label>
              </div>

              <div class="input-field col s12 m6 l4">
                  <i class="fa fa-calendar-o prefix"></i>
                  <input type="date" class="datepicker eder" id="vfecha" value="" placeholder="Fecha de la Transacción" />

              </div>
              <div class="input-field col s12 m12 l4" >
            <select id="vidmoneda" type="select">
              <option value="" disabled selected>Monedas</option>
              {section name=LE loop=$MON}
            <option value="{$MON[LE][0]}">{$MON[LE][1]} {$MON[LE][2]}</option>
            {/section}
          </select>
          <label>Seleccione la Monedas</label>
      </div>
          </div>

        </div>

    </div>

    </div>

    <!-- /Funcion 1 -->

</div>
</div>
<div class="row">
<div class="col s12">
<table class="table centered highlight responsive-table z-depth-5">
    <thead>
        <tr>
            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Cuenta</th>
            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Descripción</th>
            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Debe</th>
            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Haber</th>
            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">ODT</th>
            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Comentario</th>
        </tr>
    </thead>
    <tbody id="detalletransaccione">

    </tbody>
    <tfoot>
        <tr>
            <td colspan="2" align="center">
                <b>TOTAL</b>
            </td>
            <td id="totDebe" align="right">0.00</td>
            <td id="totHber" align="right">0.00</td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <td colspan="6">
                <button type="button" class="btn z-depth-5 btn-primary add der" codigo="1" modulo="transaccione" detalle="1">Aceptar</button>
                <div class="alert alert-danger" align="center" style="height: 38px; padding: 6px;display: none" id="err1">
                    <small><strong id="errm1"></strong></small>
                </div>
                <div class="alert alert-success" align="center" style="height: 38px; padding: 6px;display: none" id="suc1">
                    <small><strong id="sucm1"></strong></small>
                </div>
            </td>
        </tr>
    </tfoot>
</table>
<br><br>
</div>
</div>
</div>
