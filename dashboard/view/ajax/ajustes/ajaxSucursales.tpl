<div class="row pequeño">
    <div class="col s12 pequeño">
      <div class="card z-depth-5 pequeño ">
        <div class="row pequeño">


            <div class="col s12 m12 l6 pequeño">
                <div class="col s12 ">
                     <h4> Datos :</h4>
                 </div>
                
                <form id="fsucursales">
                    <div class="row">
                       <br>
                       <div class="col s12 m6">

                        <div class="input-field">
                            <label for="vnombre">Nombre</label>
                            <input type="text" class="validate" id="vnombre">
                            <input type="hidden" id="vidusuario" value="">
                            <input type="hidden" id="vidsucursal" value="">
                            <input type="hidden" id="vconsecutivo" value="1">
                            <input type="hidden" id="vconsecutivo1" value="1">
                            <input type="hidden" id="vconsecutivo2" value="1">
                            <input type="hidden" id="vconsecutivo3" value="1">
                            <input type="hidden" id="vconsecutivo4" value="1">
                            <input type="hidden" id="vid" value="0">
                        </div>
                    </div>
                    <div class="col s12 m6">
                        <div class="input-field">
                            <label for="vcedula">Cédula</label>
                            <input type="text" class="validate" id="vcedula">
                        </div>
                    </div>
                    <div class="col s12 m6" id="ftelefonos" vtabla="telefonoS" hasTabla="1">
                        <div class="input-field">
                            <label for="vtelefono">Teléfono</label>
                            <input type="text" class="validate" id="vtelefono">
                        </div>
                    </div>
                    <div class="col s12 m6" id="fcorreos" vtabla="correos" hasTabla="1">
                        <div class="input-field">
                            <label for="vcorreo">Correo</label>
                            <input type="text" class="validate" id="vcorreo">
                        </div>
                    </div>

                    <div class="col s12 m6">
                        <div class="input-field">
                            <label for="vencabezado">Encabezado de Factura</label>
                            <input type="text" class="validate" id="vencabezado" maxlength="2">
                        </div>
                    </div>
                    <div class="col s12 m6">
                        <p>
                            <input type="radio" id="juridico" name="isfisico" value="0" class="with-gap" checked>
                            <label for="juridico">Jurídico</label>
                        </p>
                    </div>
                    <div class="col s12 m6">
                        <p>
                            <input type="radio" id="fisico" name="isfisico" value="1" class="with-gap">
                            <label for="fisico">Físico</label>
                        </p>
                    </div>
                    <div class="col s12 m6 hide" id="pfisico">
                        <div class="input-field">
                            <label for="vfactura">Correo</label>
                            <input type="text" class="validate" id="vfactura">
                        </div>
                    </div>
                    <div class="col s12 m6">
                        <form class="dropzone" id="registro-upload">
                            <input type="file" name="file"  />
                        </form>
                    </div>

                </div><br>
                <div class="row">
                    <div class="col s6 m7 l7">
                        <h4>Ubicación:</h4>
                    </div>
                    <div class="col s12 m6">
                        <div class="input-field">
                            
                            <select type="select" id="vidprovincia" cambio="1">
                                <option value="0">Seleccione una Provincia</option>
                                {section name=LE loop=$PROV}
                                <option value="{$PROV[LE][0]}">{$PROV[LE][1]}</option>
                                {/section}
                            </select>

                            <label for="vidprovincia">Provincia</label>
                        </div>
                    </div>
                    <div class="col s12 m6">
                        <div class="input-field">
                            
                            <select type="select" id="vidcanton">
                                <option value="0">Seleccione un Cantón</option>
                            </select>

                            <label for="vidcanton">Cantón</label>
                        </div>
                    </div>
                </div><br>
                <div class="row">
                  <div class="col s12 ">
                     <h4> Impresión :</h4>
                 </div>
                 <div class="col s12 m4 ">
                    <div class="input-field">
                        
                        <select type="select" id="vidtipofactura">
                            {section name=LE loop=$IMPR}
                            <option value="{$IMPR[LE][0]}">{$IMPR[LE][1]}</option>
                            {/section}
                        </select>

                        <label for="vidtipofactura">Factura</label>
                    </div>
                </div>
                <div class="col s12 m4 ">
                    <div class="input-field">
                        
                        <select type="select" id="vidtipoabono">
                            {section name=LE loop=$IMPR}
                            <option value="{$IMPR[LE][0]}">{$IMPR[LE][1]}</option>
                            {/section}                            
                        </select>
                        <label for="vidtipoabono">Recibo de Abonos</label>
                    </div>

                    </div>
                    <div class="col s12 m4 ">
                        <div class="input-field">
                            
                            <select type="select" id="vidtiponota">
                            {section name=LE loop=$IMPR}
                                <option value="{$IMPR[LE][0]}">{$IMPR[LE][1]}</option>
                                {/section}                            
                            </select>
                            <label for="vidtiponota">Notas</label>
                        </div>
                    </div>


                    </div><br>

                    <div class="row">    
                        <div class="col m12">
                            <button type="button" class="btn btn-primary der add z-depth-5 blue" id="accsuc" modulo="sucursale" varias="1">Agregar</button>
                        </div>
                    </div>
                    <br>
                </form>

            </div>

            <div class="col s12 m12 l6 pequeño">
                <br>
                <div class="table-responsive pequeño " >
                    <br>
                    <table class="table centered highlight pequeño bordered responsive-table z-depth-3" id="data-table-sucursales" cellspacing="0" width="100%" >
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
                                    <i class="mdi mdi-24px mdi-pencil btn-color pbtn load " id="e{$SUC[LE][0]}" codigo="1" modulo="sucursale"></i>
                                    <i class="mdi mdi-24px mdi-close btn-color pbtn delete" id="d{$SUC[LE][0]}" codigo="1" modulo="sucursale"></i>
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