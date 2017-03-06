<div class="card">
    <div class="row">
        <br>
        <div class="row">
            <div class="col s10 offset-s2 m4 l3" style="margin-top:2%; ">
              <li class="btn waves-effect waves-light func" fn="f1" id="fn1">Realizar Transacción</li>

          </div>

          <div class="col s10 offset-s2 m4 l3" style="margin-top:2%; "><li class="btn waves-effect waves-light func" fn="f2">Ver Transacciones</li></div>

      </div>


      <div class="row">

      <div class="col s12" id="show_transac">

        <!-- Funcion 1 -->

        <div id='ftransacciones'>  
            <div  class="sub-tran" id="t1">

                <div class="row">
                   <div class="input-field col s12 m6 l4">
                  <input  id="vdescripcion" type="text" class="validate" >
                  <label for="descripcion">Descripcion de la Transacción</label>
              </div>

              <div class="input-field col s12 m6 l4">
                  <i class="fa fa-calendar-o prefix"></i>
                  <input type="date" class="datepicker" id="vfecha" value="" placeholder="Fecha de la Transacción" />

              </div>
              <div class="input-field col s12 m12 l4" id="vidmoneda">
            <select>
              <option value="" disabled selected>Monedas</option>
              {section name=LE loop=$MON}
            <option value="{$MON[LE][0]}">{$MON[LE][1]}</option>
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
<table class="table responsive-table">
    <thead>
        <tr>
            <th>Cuenta</th>
            <th>Descripción</th>
            <th>Debe</th>
            <th>Haber</th>
            <th>ODT</th>
            <th>Comentario</th>
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
                <input type="hidden" id="vidempresa" value="{$smarty.session.IMPRESA}">
                <input type="hidden" id="vidtabla" value="0">
                <input type="hidden" id="idfila" value="0">
                <button type="button" class="btn btn-primary add der" codigo="1" modulo="transaccione" detalle="1">Aceptar</button>
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
</div>
</div>
</div>
