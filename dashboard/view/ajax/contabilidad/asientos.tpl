<div class="row">
    <div class="col-md-2 col-lg-2">
        <ul class="list-group">
          <li class="list-group-item btn func" fn="f1" id="fn1">Realizar Transacción</li>
          <li class="list-group-item btn func" fn="f2">Ver Transacciones</li>
        </ul>
    </div>

    <div class="col-md-9 col-lg-9" id="show_transac">
        
        <!-- Funcion 1 -->
        <div id='ftransacciones'>  
        <div style="display: none" class="sub-tran" id="t1">
            <div class="input-group">
                <div class="input-group-addon"><b>Descripción</b></div>
                <input type="text" class="form-control" id="vdescripcion" placeholder="Descripcion de la Transacción" maxlength="100">
            </div>
            <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                <input type="date" class="form-control" id="vfecha" style="height: 38px;" value="{$smarty.now|date_format:'%Y-%m-%d'}">
                <div class="input-group-addon">Moneda</div>
                <select type="select" id="vidmoneda" class="form-control" required="required">
                    {section name=LE loop=$MON}
                        <option value="{$MON[LE][0]}">{$MON[LE][1]}</option>
                    {/section}
                </select>
            </div>
           
           <!-- <div class="form-group">
                <div class='input-group date' id='datetimepicker2'>
                    <input type='text' class="form-control" value="{$smarty.now|date_format:'%d/%m/%Y'}" />
                    <span class="input-group-addon btn">
                        <span><i class="fa fa-calendar"></i></span>
                    </span>
                </div>
            </div> -->
           
            <br>
            <table class="table trtable">
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
        <!-- /Funcion 1 -->

    </div>
</div>