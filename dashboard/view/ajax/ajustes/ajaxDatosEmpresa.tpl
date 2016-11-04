<div class="card">
    <h3 class="card-header">Datos de la Empresa</h3>
    <div class="card-block">
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Nombre</b></div>
                    <input type="text" class="form-control infoempresa" id="vnombre" placeholder="Nombre de la Empresa" field="empresa">
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Cédula Jurídica</b></div>
                    <input type="text" class="form-control infoempresa" id="vcedula" placeholder="Cédula Jurídica" field="CJuridica">
                </div>
            </div>
        </div><br>
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Teléfono</b></div>
                    <input type="text" class="form-control infoempresa" id="vtelefono" placeholder="Teléfono de la Empresa" field="telefonos">
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Correo</b></div>
                    <input type="text" class="form-control infoempresa" id="vcorreo" placeholder="Correo Contacto de la Empresa" field="correo">
                </div>
            </div>
        </div><br>
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Dirección</b></div>
                    <input type="text" class="form-control infoempresa" id="vdireccion" placeholder="DIrección de la Empresa" field="direccion">
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <button type="button" class="btn btn-primary der" id="actinfo">Actualizar</button>
            </div>
        </div><br>
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <input type="file" id="archivo" name="imagen" multiple="false" class="file-loading">
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

<div class="card">
    <h3 class="card-header">Período Fiscal</h3>
    <div class="card-block">
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Fecha Inicio</b></div>
                    <input type="date" id="vfechainicio" class="form-control" value="">
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Fecha Cierre</b></div>
                    <input type="date" id="vfechafinal" class="form-control" value="">
                </div>
            </div>
        </div><br>
        <div class="row">
            <div class="col-md-12 col-lg-12">
                <button type="button" class="btn btn-primary der" id="sfechafiscal">Guardar</button>
            </div>
        </div>
    </div>
</div><br><br>