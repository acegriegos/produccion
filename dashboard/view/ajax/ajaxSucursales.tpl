<div class="card">
    <h3 class="card-header">Datos de la Empresa</h3>
    <div class="card-block">
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Nombre</b></div>
                    <input type="text" class="form-control" id="vnombre" placeholder="Nombre Sucursal">
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Teléfono</b></div>
                    <input type="text" class="form-control" id="vtelefono" placeholder="Teléfono Sucursal">
                </div>
            </div>
            <br><br><br>
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Localización</b></div>
                    <select id="vcanton" class="form-control" required="required">
                        <option value="0">Seleccione un Cantón</option>
                        {section name=LE loop=$CAN}
                            <option value="{$CAN[LE][0]}">{$CAN[LE][1]}</option>
                        {/section}
                    </select>
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <button type="button" class="btn btn-primary der">Guardar</button>
            </div>
        </div><br>
        <div class="alert alert-danger err_" id="err1" style="display: none">
            <strong id="errm1"></strong>
        </div>
        <div class="alert alert-success suc_" id="suc1" style="display: none">
            <strong id="sucm1"></strong>
        </div>
    </div>
</div>