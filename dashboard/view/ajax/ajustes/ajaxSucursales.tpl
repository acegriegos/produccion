<div class="row">
    <div class="col s12">
      <div class="card z-depth-5">
        <div class="row">


            <div class="col s12 m12 l6">
                <br>
                
                <form id="fsucursales">
                    <div class="row">
                       <br>
                       <div class="col s12 m6">

                        <div class="input-group">
                            <div class="input-group-addon"><b>Nombre</b></div>
                            <input type="text" class="form-control" id="vnombre" placeholder="Nombre Sucursal">
                            <input type="hidden" id="vidusuario" value="">
                            <input type="hidden" id="vidsucursal" value="">
                            <input type="hidden" id="vfactura" value="AB">
                            <input type="hidden" id="vconsecutivo" value="1">
                            <input type="hidden" id="vid" value="0">
                        </div>
                    </div>
                    <div class="col s12 m6">
                        <div class="input-group">
                            <div class="input-group-addon"><b>Teléfono</b></div>
                            <input type="text" class="form-control" id="vtelefono" placeholder="Teléfono Sucursal">
                        </div>
                    </div>
                </div><br>
                <div class="row">
                    <div class="col s6 m7 l7">
                        <h4>Ubicación:</h4>
                    </div>
                    <div class="col s12 m6">
                        <div class="input-group">
                            <div class="input-group-addon"><b>Provincia</b></div>
                            <select type="text" id="vidprovincia" class="form-control" required="required" cambio="1">
                                <option value="0">Seleccione una Provincia</option>
                                {section name=LE loop=$PROV}
                                <option value="{$PROV[LE][0]}">{$PROV[LE][1]}</option>
                                {/section}
                            </select>
                        </div>
                    </div>
                    <div class="col s12 m6">
                        <div class="input-group">
                            <div class="input-group-addon"><b>Cantón</b></div>
                            <select type="text" id="vidcanton" class="form-control" required="required">
                                <option value="0">Seleccione un Cantón</option>
                            </select>
                        </div>
                    </div>
                </div><br>
                <div class="row">    
                    <div class="col m12">
                        <button type="button" class="btn btn-primary der add z-depth-5" id="accsuc" codigo="1" modulo="sucursale">Agregar</button>
                    </div>
                </div>
            </form>

        </div>

        <div class="col s12 m12 l6">
        <br>

            <div class="table-responsive">
            <br>
                <table class="table centered highlight bordered responsive-table z-depth-3" id="data-table-sucursales" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Nombre</th>
                            <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Telefono</th>
                            <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listasucursales">
                        {section name=LE loop=$SUC}
                        <tr>
                            <td>{$SUC[LE][1]}</td>
                            <td>{$SUC[LE][2]}</td>
                            <td>
                                <i class="fa fa-pencil btn load" id="e{$SUC[LE][0]}" codigo="1" modulo="sucursale"></i>
                                <i class="fa fa-times btn delete" id="d{$SUC[LE][0]}" codigo="1" modulo="sucursale"></i>
                            </td>
                        </tr>
                        {/section}
                    </tbody>
                </table>
                <br>
            </div>


        </div>




    </div>









</div>
</div>
</div>