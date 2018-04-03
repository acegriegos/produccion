<div class="row pequeño">
    <div class="col s12 pequeño">
        <div class="card z-depth-3 pequeño ">
            <div class="row pequeño">
                <div class="col s12 m12 l6 pequeño">
                    <div class="col s12 ">
                        <h5 class="modal-title center-align head1 padding1">Datos de Sucursal</h5>
                    </div>
                    <div id="fsucursales">
                        <div class="row">
                            <div class="col s12 m6">
                                <div class="input-field">
                                    <label for="vnombre">Nombre Sucursal</label>
                                    <input type="text" class="validate" id="vnombre">
                                    <input type="hidden" id="vidusuario" value="">
                                    <input type="hidden" id="vidsucursal" value="">
                                    <input type="hidden" id="vconsecutivo" value="0">
                                    <input type="hidden" id="vconsecutivo1" value="0">
                                    <input type="hidden" id="vconsecutivo2" value="0">
                                    <input type="hidden" id="vconsecutivo3" value="0">
                                    <input type="hidden" id="vconsecutivo4" value="0">
                                    <input type="hidden" id="vconsecutivo5" value="0">
                                    <input type="hidden" id="vid" value="0">
                                    <input type="hidden" id="vlogo" value="../assets/img/logo.png">
                                    <input type="hidden" id="vidtipocliente" value="2">
                                </div>
                            </div>
                        <div class="input-field col s12 m6">
                            <label for="vcedula">Cédula</label>
                            <input type="text" class="validate" id="vcedula">
                        </div>
                        <div class="input-field col s12 m6" id="ftelefonos" vtabla="telefono" hasTabla="1" tp="3">
                            <div class="ciclos">
                                <label for="vtelefono">Teléfono</label>
                                <input type="text" class="validate" id="vtelefono">
                                <input type="hidden" id="vidtelefono" value="0">
                                <input type="hidden" id="vidpais" value="52">
                                <input type="hidden" id="vidtipotel" value="2">
                            </div>
                            
                        </div>
                        <div class="input-field col s12 m6" id="fcorreos" vtabla="correo" hasTabla="1" tp="3">
                            <div class="ciclos">
                                <input type="hidden" id="vidcorreo" value="0">
                                <label for="vcorreo">Correo</label>
                                <input type="text" class="validate" id="vcorreo">
                            </div>
                        </div>
                        <div class="input-field col s12 m6">
                            <label for="vencabezado">Encabezado de Factura</label>
                            <input type="text" class="validate" id="vencabezado" maxlength="2">
                        </div>
                        <div class="col s12 m6">
                                <input type="radio" id="juridico" name="isfisico" value="2" class="with-gap" checked>
                                <label for="juridico">Jurídico</label>
                        </div>
                        <div class="col s12 m6">
                                <input type="radio" id="fisico" name="isfisico" value="1" class="with-gap">
                                <label for="fisico">Físico</label>
                        </div>
                        <div class="input-field col s12 m6 hide" id="pfisico">
                            <label for="vfactura">Nombre Persona Física</label>
                            <input type="text" class="validate" id="vfactura">
                        </div>
                        <div class="col s12 m12"><br>
                            <form class="dropzone needsclick dz-clickable dz-started center" id="registro-upload" style="padding: 5% !important">
                                <input type="hidden" name="idsucursal" />
                                <span class="dz-message needsclick text-center ico-reg" >
                                    <!-- <img id="fotosvg" src="../assets/img/foto.svg" style="margin-top: 25px; width: 80px;" /> -->
                                    <i class="mdi mdi-image-area mdi-48px"></i>
                                </span>
                            </form>
                            <label for="registro-upload" class="right">LOGO DE EMPRESA</label>
                        </div>
                        </div><br>
                        <div class="row">
                            <div class="col s6 m12 l12">
                               <h5 class="modal-title center-align head1 padding1">Ubicación</h5>
                            </div>
                        <div class="input-field col s12 m6">
                            <select type="select" id="vidprovincia" cambio="1">
                                <option value="0">Seleccione una Provincia</option>
                                {section name=LE loop=$PROV}
                                <option value="{$PROV[LE][0]}">{$PROV[LE][1]}</option>
                                {/section}
                            </select>
                            <label for="vidprovincia">Provincia</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <select type="select" id="vidcanton">
                                <option value="0">Seleccione un Cantón</option>
                            </select>
                            <label for="vidcanton">Cantón</label>
                        </div>
                        </div><br>
                        <div class="row">
                            <div class="col s12 ">
                                <h5 class="modal-title center-align head1 padding1">Impresión</h5>
                            </div>
                        <div class="input-field col s12 m4">
                            <select type="select" id="vidtipofactura">
                                {section name=LE loop=$IMPR}
                                <option value="{$IMPR[LE][0]}">{$IMPR[LE][1]}</option>
                                {/section}
                            </select>
                            <label for="vidtipofactura">Factura</label>
                        </div>
                        <div class="input-field col s12 m4 ">
                            <select type="select" id="vidtipoabono">
                                {section name=LE loop=$IMPR}
                                <option value="{$IMPR[LE][0]}">{$IMPR[LE][1]}</option>
                                {/section}
                            </select>
                            <label for="vidtipoabono">Recibo de Abonos</label>
                        </div>
                        <div class="input-field col s12 m4 ">
                            <select type="select" id="vidtiponota">
                                {section name=LE loop=$IMPR}
                                <option value="{$IMPR[LE][0]}">{$IMPR[LE][1]}</option>
                                {/section}                            
                            </select>
                            <label for="vidtiponota">Notas</label>
                        </div>
                        </div>
                        <br>
                        <div class="row">    
                            <div class="col m12">
                                <button class="btn btn1 der add z-depth-3" id="accsuc" modulo="sucursale" varias="1">Agregar</button>
                            </div>
                        </div><br>
                    </div>
                </div>
                <div class="col s12 m12 l6 pequeño"><br>
                    <div class="table-responsive pequeño">
                        <table class="table centered highlight pequeño bordered responsive-table z-depth-3" id="data-table-sucursales" cellspacing="0" width="100%" >
                            <thead>
                                <tr class="tab1">
                                    <th style="border: 0px;  border-radius: 0px !important">Nombre</th>
                                    <th style="border: 0px;  border-radius: 0px !important">Telefono</th>
                                    <th style="border: 0px;  border-radius: 0px !important">Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="listasucursales">
                                {section name=LE loop=$SUC}
                                <tr>
                                    <td>{$SUC[LE][0]}</td>
                                    <td>{$SUC[LE][5]}</td>
                                    <td>
                                        <i class="mdi mdi-24px mdi-pencil btn-color pbtn load " id="e{$SUC[LE][0]}" codigo="1" modulo="sucursale"></i>
                                        <i class="mdi mdi-24px mdi-close btn-color pbtn delete" id="d{$SUC[LE][0]}" codigo="1" modulo="sucursale"></i>
                                    </td>
                                </tr>
                                {/section}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>