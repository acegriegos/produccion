<div class="row">
    <div class="col-md-2 col-lg-2">
        <ul class="list-group">
          <li class="list-group-item btn func" fn="f1">Realizar Transacción</li>
        </ul>
    </div>

    <div class="col-md-9 col-lg-9" id="show_transac">
        
        <!-- Funcion 1 -->

        <div style="display: none" class="sub-tran" id="t1">
            <div class="input-group">
                <div class="input-group-addon"><b>Descripción</b></div>
                <input type="text" class="form-control" id="vdescripcion" placeholder="Descripcion de la Transacción" maxlength="100">
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
                        <th>haber</th>
                    </tr>
                </thead>
                <tbody id="detalletransacciones">
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" align="center">
                            <b>TOTAL</b>
                        </td>
                        <td id="totDebe" align="right">0.00</td>
                        <td id="totHber" align="right">0.00</td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <button type="button" class="btn btn-primary">Aceptar</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- /Funcion 1 -->

    </div>
</div>