{if $smarty.session.BUSS neq 1}<div class="card z-depth-3 pequeño">
    <ul class="collapsible" data-collapsible="accordion">
        <li>
            <div class="collapsible-header "><i class="small mdi mdi-briefcase"></i><h5>Datos de la Empresa</h5></div>
            <div class="collapsible-body pequeño">{/if}<div class="card-block" {if $smarty.session.BUSS eq 1}style="background-color: white;"{/if}>
                <section id="fsucursales">
                <input type="hidden" class="zelda">
                <div class="row pequeño">
                    <div class="col s12 m12 l4 pequeño">
                        <label for="vnombre">Razón Social</label>
                        <input type="text" id="vnombre">
                    </div>
                    <div class="col s12 m12 l4 pequeño">
                        <label for="vcedula">Cédula Jurídica</label>
                        <input type="text" id="vcedula">
                    </div>
                    <div class="col s12 m12 l4 pequeño">
                        <label for="vpfisico">Nombre Comercial</label>
                        <input type="text" id="vpfisico">
                    </div>
                </div>

                <div class="row pequeño">
                    <div class="col s12 m12 l4 pequeño">
                        <a href="#" data-activates="slide-tc" data-num="1" class="mdi mdi-phone tooltipped mdi-24px button-collapse der tc-show  black-text" data-tooltip="Administrar Teléfonos de la Empresa" data-position="bottom" id="tc-t" slide-id="{$smarty.session.IMPRESA}" slide-tbl="39" asave="0"></a>
                        <label for="vtelefono">Teléfonos de la Empresa</label>
                        <input type="text"  id="vtelefono" readonly>
                        <div id="ftelefonos" hasTabla="1" tp="4" vtabla="telefono"></div>
                    </div>

                    <div class="col s12 m12 l4 pequeño">
                        <a href="#" data-activates="slide-tc" data-num="2" id="slideCorreo" class="button-collapse der tc-show tooltipped black-text" data-tooltip="Administrar Correos de la Empresa" data-position="bottom" id="tc-c" slide-id="{$smarty.session.IMPRESA}" slide-tbl="39" asave="0"><i class="mdi mdi-email  mdi-24px"></i></a>
                        <label for="vcorreo">Correos de la Empresa</label>
                        <input type="email"id="vcorreo" readonly>
                        <div id="fcorreos" hasTabla="1" tp="4" vtabla="correo"></div>
                    </div>
                    <div class="col s12 m12 l4 pequeño">
                        <a href="#" data-activates="slide-tc" id="slideDireccion" data-num="3" class="button-collapse der tooltipped tc-show black-text" data-tooltip="Administrar Ubicacion de la Empresa" data-position="bottom" id="tc-u" slide-id="{$smarty.session.IMPRESA}" slide-tbl="39" asave="0"><i class="mdi mdi-map-marker  mdi-24px"></i></a>
                        <label for="vdireccion">Dirección de la Empresa</label>
                        <input type="text" id="vdireccion" readonly>
                        <div id="fubicaciones" hasTabla="1" tp="4" vtabla="ubicacione"></div>
                    </div>
                </div>

                <div class="row col s12">

                    <div class="col s6 pequeño">
                        <form class="dropzone needsclick dz-clickable dz-started" id="registro-upload" style="padding-left: 44% !important">
                            <input type="hidden" name="idsucursal"/>
                            <span class="dz-message needsclick text-center ico-reg"><img src="../assets/img/foto.svg" class="imgDrop" style="margin-top: 25px; width: 80px;" /></span>
                        </form>
                       <label for="registro-upload" class="right">LOGO DE EMPRESA</label>
                    </div>

                    <div class="col s6 center">
                        <img src="#" class="responsive-img" alt="Image" id="vlogo">
                    </div>
 

                </div>

                <div class="row col s12">
                    
                     <div class="col s6 fe"><br>
                        <form class="dropzone needsclick dz-clickable dz-started center" id="p12-upload" style="padding: 5% !important" >
                            <span class="dz-message needsclick text-center ico-reg" >
                                <i class="mdi mdi-key mdi-48px imgDrop"></i>
                            </span>
                        </form>
                        <label for="p12-upload" class="right">LLAVE CRIPTOGRAFICA</label>
                    </div>

                    <div class="input-field col s3 fe">
                        <label for="vuser_atv">Usuario Comprobante Electrónico</label>
                        <input type="text" class="validate" id="vuser_atv">
                    </div>

                    <div class="input-field col s3 fe">
                        <label for="vpass_atv">Contraseña Comprobante Electrónico</label>
                        <input type="text" class="validate" id="vpass_atv">
                    </div>

                    <div class="input-field col s3 fe">
                        <label for="vpass_n">Clave Llave Criptografica</label>
                        <input type="text" class="validate" id="vpass_n" maxlength="4">
                    </div>
                    
                    <div class="input-field col s3 fe">
                        <label>Factura Electrónica <i class="mdi mdi-marker-check mdi-24px green-text"></i> </label>
                    </div>
                </div>

                <div class="row">
                    <div class="row col s4">
                        <div class="col s12">
                            <input type="checkbox" id="visinventariado" class="with-gap">
                            <label for="visinventariado">Control de Inventario</label>
                        </div>
                        <div class="col s12">
                            <input type="checkbox" id="isfe" checked>
                            <label for="isfe">Factura Electrónica</label>                                        
                        </div>
                        <div class="col s12">
                            <input type="checkbox" id="vfastshow">
                            <label for="vfastshow">Envío de Correo Automático</label>
                        </div>
                    </div>
                    
                    <div class="row col s4">
                        <div class="col s12">
                            <input type="checkbox" id="vprintSale" checked>
                            <label for="vprintSale">Imprimir Venta</label>
                        </div>
                        <div class="col s12">
                            <input type="checkbox" id="visPrueba" checked>
                            <label for="visPrueba">Período de Prueba</label>
                        </div>
                    </div>
                    
                    <div class="row col s4">
                        <div class="col s12 m12 pull-s2">
                            <button type="button" class="btn btn-primary edit der z-depth-3" modulo="sucursale" varias="1"><i class="small mdi mdi-refresh right  mdi-24px"></i>Actualizar</button>
                        </div>
                    </div>
                    
                </div>  
                </div>
            </div>
            </section>
            {if $smarty.session.BUSS neq 1}
                <!-- Datos de la empresa -->
            </li>
            <li>
                <div class="collapsible-header"><i class="mdi mdi-marker-check  mdi-24px"></i><h5>Monedas</h5></div>
                <div class="collapsible-body"><div class="class-block">
                    <div class="row pequeño">
                        <div class="col s12 m12 l6 pequeño">
                            <div class="row">
                                <div class="col s12 m4 l6 centrobot">
                                    <a href='#modal-wsdl' id="mantWsdl" class="btn btn2 tooltipped modal-trigger z-depth-3 truncate" data-position="left" data-tooltip="WSDL" style="margin-top: 5%; margin-bottom: 1%; margin-right: 1%;">Manenimiento WSDL</a>
                                </div>
                                <div class="col s12 m4 l6  offset-m1 pequeño centro">
                                    <a href='#modal-monedas' id="addMoneda" class="btn btn3  tooltipped modal-trigger z-depth-3 truncate" data-position="top" data-tooltip="Ingresar Moneda" style="margin-top: 5%; margin-bottom: 1%; margin-right: 1%;">Agregar Moneda</a>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m12 l6 pequeño">
                            <table class="table bordered pequeño highlight responsive-table z-depth-3 centered" id="data-table-monedas" style="margin: 1%;">
                                <thead>
                                    <tr>
                                        <th class="tab1" style="border: 0; border-radius: 0px !important;">Símbolo</th>
                                        <th class="tab1" style="border: 0; border-radius: 0px !important; width: 100%">Moneda</th>
                                        <th class="tab1" style="border: 0; border-radius: 0px !important; width: 100%">Valor</th>
                                        <th class="tab1" style="border: 0; border-radius: 0px !important; width: 100%">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="listamonedas">
                                    {section name=LE loop=$MON}
                                    <tr id="a_{$MON[LE][0]}">
                                        <td {if $MON[LE][3] neq ''} class="tooltipped" style="padding: 10px; color:black" data-position="top" data-tooltip="Moneda por Defecto"{/if}>{$MON[LE][4]}</td>
                                        <td class="gtext" style="padding: 10px;">{$MON[LE][1]}</td>
                                        <td class="gtext" style="padding: 10px;">{$MON[LE][2]}</td>
                                        <td class="gtext" style="padding: 10px;">
                                            <a class="waves-effect waves-light load modal-trigger gtext" id="a{$MON[LE][0]}" data-target="modal" href='#modal-monedas' modulo="moneda" title="Editar Moneda"><i class="mdi mdi-pencil left  mdi-24px"></i></a>
                                            <a class="waves-effect waves-light delete gtext" modulo="moneda" id="b{$MON[LE][0]}"  title="Eliminar Moneda"><i class="mdi mdi-close left mdi-24px"></i></a>
                                        </td>
                                    </tr>
                                    {/section}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div></div>
                <!-- Datos de las monedas -->
            </li>
            <li>
                <div class="collapsible-header"><i class="mdi mdi-account-multiple mdi-24px"></i><h5>Tipo de Usuarios</h5></div>
                <div class="collapsible-body">
                    <div class="class-block">
                    <div class="row pequeño">
                        <!-- --><div class="col s12 m12 l6 pequeño">
                            <div class="input-field col s11 m9 l11 pequeño">
                                <a class="prefix" style="margin-left: 5% !important;"><i class="small mdi mdi-magnify  mdi-24px gtext"></i></a>
                                <input type="text" id="search_tipousuarios" maxlength="45" num="+27" var="nombre" style="margin-left: 15% !important;">
                                <label for="search_tipousuarios" style="margin-left: 15% !important;">Buscar Tipo de Usuario</label>
                            </div>
                            <div id="ftipousuarios" class="col s11 m9 l11 pequeño">
                                <div class="row">
                                    <div class="input-field col s12 ">
                                        <a class="prefix btn-floating btn2 add tooltipped z-depth-3" modulo="tipousuario" data-position="top" data-tooltip="Ingresar Tipo de Usuario" style="padding-right: 5% !important;"><i class="small mdi mdi-plus mdi-24px"></i></a>
                                        <input type="hidden" id="vid_tusuario" value="0">
                                        <input type="hidden" id="vdefecto_tusuario" value="0">
                                        <input type="hidden" id="vbincierre_tusuario" value="0">
                                        <input type="text" id="vnombre_tusuario" value="" style="margin-left: 15% !important;">
                                        <label for="vnombre_tusuario" style="margin-left: 15% !important;">Ingresar Tipo Usuario</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- --> <div class="col s12 m12 l6 pequeño ">
                            <table class="table pequeño highlight responsive-table z-depth-3 centered" id="data-table-tipousuarios">
                                <thead>
                                    <tr class="tab1">
                                        <th class="white-text" style="border: 0px; border-radius: 0px !important; width: 35%">Tipo</th>
                                        <th class="white-text" style="border: 0px; border-radius: 0px !important;">Aut. Cierre</th>
                                        <th class="white-text" style="border: 0px; border-radius: 0px !important;">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="centered" id="listatipousuarios">
                                    {section name=LE loop=$TUSR}
                                    <tr id="b_{$TUSR[LE][0]}">
                                        <td style="margin:0;">
                                            <input type="text" value="{$TUSR[LE][1]}"  class="fast-edit center-align" style="border: 0px; margin: 0;">
                                        </td>
                                        <td style="margin:0;">
                                            <p>
                                                <input type="checkbox" class="vbincierre" id="tp{$TUSR[LE][0]}" value="{$TUSR[LE][3]}" {if $TUSR[LE][3] eq 1}checked{/if}>
                                                <label for="tp{$TUSR[LE][0]}">Aut. realizar cierre</label>
                                            </p>
                                        </td>
                                        <td style="margin:0;">
                                            {if $TUSR[LE][2] eq 0}
                                            <a href='#modal-tusuarios modal-trigger' id="c{$TUSR[LE][0]}" modulo="moneda" title="Valores en el Sistema">
                                            <i class="small mdi mdi-account-settings mdi-24px gtext"></i></a>
                                            <a class="delete gtext pbtn" modulo="tipousuario" id="d{$TUSR[LE][0]}" title="Eliminar Tipo Usuario"><i class="small mdi mdi-close mdi-24px"></i></a>
                                            {/if}
                                        </td>
                                    </tr>
                                    {/section}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
                    <!-- Datos de las Usuarios -->
                </li>
                <li>
                    <div class="collapsible-header"><i class="medium mdi mdi-credit-card mdi-24px"></i><h5>Tipo de Pagos</h5></div>
                    <div class="collapsible-body"><div class="class-block">
                        <div class="row  pequeño">
                            <div class="col s12 m12 l5 pequeño">
                                <div class="input-field col s11 m9 l11 pequeño">
                                    <a class="prefix" style="margin-left: 5% !important;"><i class="small mdi mdi-magnify mdi-24px gtext"></i></a>
                                    <input type="text" id="search_tipopagos" maxlength="100" num="+26" var="nombre" style="margin-left: 15% !important;">
                                    <label for="search_tipopagos" style="margin-left: 15% !important;">Buscar Tipo Pago</label>
                                </div>
                                <div id="ftipopagos" class="col s11 m9 l11 pequeño">
                                    <div class="row">
                                        <div class="input-field col s12 pequeño">
                                            <a class="prefix btn-floating btn2 add tooltipped z-depth-3" modulo="tipopago" data-position="top" data-tooltip="Ingresar Tipo de Pago" style="padding-right: 5% !important;"><i class="small mdi mdi-plus  mdi-24px"></i></a>
                                            <input type="text" id="vnombre_pago" style="margin-left: 15% !important;">
                                            <label for="vnombre_pago" style="margin-left: 15% !important;">Ingresar Tipo Pago</label>
                                        </div>
                                    </div>
                                    <div class="modal modal-fixed-footer grandemodal" id="modal-tipopagos">
                                        <div class="modal-header head2 padding1">
                                            <h5 class="modal-title center-align">Editar Tipo Pago <b><span id="pname-mod"></span></b></h5>
                                            <input type="hidden" id="vid" value="0">
                                        </div>
                                        <div class="modal-content pequeño">
                                            <div class="row">
                                                <div class="col s12 pequeño">
                                                    <div class="input-field">
                                                        <input type="text" id="tmp_pagos">
                                                        <label id="tmp_l_pagos" for="tmp_pagos">Nombre del Pago</label>
                                                    </div>
                                                </div>
                                                <div class="input-field col s12 pequeño" style="margin-top: 0px;">
                                                    <div class="row mix">
                                                        <div class="col s12 m6 pequeño">
                                                            <input class="with-gap" name="vbancos" type="radio" id="vbancos" value="0" checked />
                                                            <label for="vbancos">No Aplica Bancos</label>
                                                        </div>
                                                        <div class="col s12 m6 pequeño">
                                                            <input class="with-gap" name="vbancos" type="radio" id="acr" value="1" />
                                                            <label for="acr">Acredita Bancos</label>
                                                        </div>
                                                        <div class="col s12 m6 pequeño">
                                                            <input class="with-gap" name="vbancos" type="radio" id="dat" value="2" />
                                                            <label for="dat">Uso de Datáfono</label>
                                                        </div>
                                                        <div class="col s12 m6 pequeño">
                                                            <input class="with-gap" name="vbancos" type="radio" id="cons" value="3" />
                                                            <label for="cons">Consignacion</label>
                                                        </div>
                                                        <div class="col s12 m6 pequeño">
                                                            <input class="with-gap" name="vbancos" type="radio" id="efec" value="4" />
                                                            <label for="cons">Efectivo</label>
                                                        </div>
                                                        <div class="col s12 m6 pequeño">
                                                            <input class="with-gap" name="vbancos" type="radio" id="mxt" value="5" />
                                                            <label for="cons">Mixto</label>
                                                        </div>
                                                    </div>
                                                    <div class="row mix">
                                                        <div class="col s12 m4 pequeño">
                                                            <input type="checkbox" id="extra" />
                                                            <label for="extra">Tiene Extras</label>
                                                        </div>
                                                        <div class="input-field col s12 m4 pequeño extra hide">
                                                            <input type="text" id="vextra">
                                                            <label for="vextra">Nombre de la Extra</label>
                                                        </div>
                                                        <div class="input-field col s12 m4 pequeño extra hide">
                                                            <input type="text" id="vregex">
                                                            <label for="vregex">Expresión regular</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col s4">
                                                            <input type="checkbox" name="vprincipal" id="vprincipal" />
                                                            <label for="vprincipal">Pago Principal</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
                                            <button class="btn waves-effect waves-green btn-flat edit" modulo="tipopago">Guardar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12 m12 l5 pequeño">
                                <table class="table highlight centered pequeño responsive-table z-depth-3" id="data-table-tipopagos">
                                    <thead class="tab1">
                                        <tr>
                                            <th class="white-text" style="border: 0px;  border-radius: 0px !important">Tipo</th>
                                            <th class="white-text" style="border: 0px;  border-radius: 0px !important; width: 100%">Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody id="listatipopagos">
                                        {section name=LE loop=$TPAG}
                                        <tr id="c_{$TPAG[LE][0]}">
                                            <td {if $TPAG[LE][2] neq 0} class="tooltipped" data-position="top" data-tooltip="Tipo Pago Principal"{/if}><input class="center-align" type="text"  value="{$TPAG[LE][1]}" readonly style="border: 0px;margin: 0px; padding: 0px;"></td>
                                            <td>
                                                <a class="waves-effect waves-light load_x modal-trigger gtext" modulo="tipopago" id="e{$TPAG[LE][0]}" title="Editar Tipo Pago" href='#modal-tipopagos'><i class="mdi mdi-pencil left mdi-24px"></i></a>
                                                {if $TPAG[LE][0] neq 0}
                                                <a class="waves-effect waves-light gtext delete" modulo="tipopago" id="f{$TPAG[LE][0]}" title="Eliminar Tipo Pago"><i class="mdi mdi-close left mdi-24px"></i></a>
                                                {/if}
                                            </td>
                                        </tr>
                                        {/section}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Datos de Tipos de Pagos  -->
            </li>
            <li>
                <div class="collapsible-header"><i class="mdi mdi-bank  mdi-24px"></i><h5>Bancos</h5></div>
                <div class="collapsible-body"><div class="class-block">
                    <div class="row pequeño">
                        <div class="col s12 m12 l5 pequeño">
                            <div class="input-field col s11 m9 l11 pequeño">
                                <a class="prefix gtext" style="margin-left: 5% !important;"><i class="small mdi mdi-magnify mdi-24px"></i></a>
                                <input type="text" id="search_bancos" maxlength="100" num="+202" var="nombre" style="margin-left: 15% !important;">
                                <label for="search_bancos" style="margin-left: 15% !important;">Buscar Banco</label>
                            </div>
                            <div id="fbancos" class="col s11 m9 l11 pequeño">
                                <div class="row">
                                    <div class="input-field col s12 pequeño">
                                        <a class="prefix btn-floating btn2 add tooltipped z-depth-3" modulo="banco" varias="1" data-position="top" data-tooltip="Ingresar Banco" style="padding-right: 5% !important;"><i class="small mdi mdi-plus mdi-24px"></i></a>
                                        <input type="text" id="vnombre_banco" noClear="1" style="margin-left: 15% !important;">
                                        <label for="vnombre_banco" style="margin-left: 15% !important;">Ingresar Banco</label>
                                        <input type="hidden" id="vidusuario" value="">
                                        <input type="hidden" id="vidsucursal" value="">
                                    </div>
                                </div>
                                <div class="modal modal-fixed-footer grandemodal" id="modal-bancos">

                                    <div class="modal-header head2 padding1">
                                        <h5 class="modal-title center-align">Valores del Banco <b><span id="bname-mod" type="html"></span></b></h5>
                                        <input type="hidden" id="vid" value="0">
                                    </div>
                                    <div class="modal-content pequeño">
                                        <div class="row">
                                            <div class="col s12 m6 pequeño">
                                                <div vtabla="detallebanco" detalle="1" vnum="203">
                                                    <h4 class="center-align">Cuentas Bancarias</h4>
                                                    <div class="row">
                                                        <div class="input-field col s12 l6">
                                                            <input type="text" id="vdet_nom">
                                                            <label for="vdet_nom">Nombre de Cuenta</label>
                                                        </div>
                                                        <div class="input-field col s12 l6">
                                                            <input type="text" id="vdet_cta">
                                                            <label for="vdet_cta">Número de Cuenta</label>
                                                        </div>
                                                        <div class="input-field col s12 l6">
                                                            <select type="select" id="vdat_moneda">
                                                                <optgroup label="Porcentual">
                                                                    <option value="" selected>Porcentaje</option>
                                                                </optgroup>
                                                                <optgroup label="Valor Fijo">
                                                                    {section name=LE loop=$MON}
                                                                    <option value="{$MON[LE][0]}" simb="{$MON[LE][4]}">{$MON[LE][1]}</option>
                                                                    {/section}
                                                                </optgroup>
                                                            </select>
                                                            <label for="vdat-moneda">Tipo de Comisión</label>
                                                        </div>
                                                        <div class="input-field col s12 l6">
                                                            <select type="select" id="vctacom" defecto="1" noClear="1">
                                                                <option value="" disabled>Seleccione una Cuenta</option>
                                                                {section name=LE loop=$CUE}
                                                                <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                                                {/section}
                                                            </select>
                                                            <label for="vctacom">Cuenta Comisión de Datáfono</label>
                                                        </div>
                                                        <div class="input-field col s12">
                                                            <input type="number" id="vcomision_txt" class="eder" value="0" noClear="1">
                                                            <label for="vcomision_txt">Comisón pot Datáfono</label>
                                                        </div>
                                                        <div class="input-field col s12 l6">
                                                            <select type="select" id="vdet_moneda">
                                                                <option value="" disabled selected>Seleccione una Moneda</option>
                                                                {section name=LE loop=$MON}
                                                                <option value="{$MON[LE][0]}" simb="{$MON[LE][4]}">{$MON[LE][1]}</option>
                                                                {/section}
                                                            </select>
                                                            <label for="vdet-moneda">Moneda de la Cuenta</label>
                                                        </div>
                                                        <div class="input-field col s12 l6">
                                                            <select type="select" id="vctabnk">
                                                                <option value="" disabled selected>Seleccione una Cuenta</option>
                                                                {section name=LE loop=$CUE}
                                                                <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                                                {/section}http://dev.lt.loc/dashboard/ajustes#modal-bancos
                                                            </select>
                                                            <label for="vctabnk">Cuenta Contable Asociada</label>
                                                        </div>
                                                    </div>
                                                    <a class="btn-floating btn2 der z-depth-3" id="add_x"><i class="mdi mdi-plus mdi-24px"></i></a>
                                                </div>
                                            </div>
                                            <div class="col s6">
                                                <ul class="collection" id="fdetallebancos" tp="1">
                                                    <!-- JS -->
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
                                        <button class="btn waves-effect waves-green btn-flat edit" modulo="banco" varias="1">Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m12 l5 pequeño">
                            <table class="table pequeño responsive-table centered z-depth-3 bordered" id="data-table-bancos">
                                <thead>
                                    <tr class="tab1">
                                        <th style="border: 0px; border-radius: 0px !important ">Nombre</th>
                                        <th style="border: 0px; border-radius: 0px !important; width: 100% ">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="listabancos">
                                    {section name=LE loop=$BNK}
                                    <tr id="e_{$BNK[LE][0]}">
                                        <td><input type="text" value="{$BNK[LE][1]}" class="fast-edit center-align" style="border: 0px;margin: 0px; padding: 0px;"></td>
                                        <td>
                                            <a class="load modal-trigger" modulo="banco" varias="1" id="i{$BNK[LE][0]}" href='#modal-bancos' title="Valores del Banco" ><i class="mdi mdi-pencil left mdi-24px gtext"></i></a>
                                            <a class="waves-effect" modulo="banco" id="j{$BNK[LE][0]}"  title="Eliminar Banco"><i class="mdi mdi-close left mdi-24px gtext delete"></i></a>
                                        </td>
                                    </tr>
                                    {/section}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div></div>
                <!-- Datos de los Bancos  -->
            </li>
            <li>
                <div class="collapsible-header"><i class="mdi mdi-settings"></i><h5>Categorías</h5></div>
                <div class="collapsible-body"><div class="class-block">
                    <div class="row pequeño">
                        <div class="col s12 m12 l5 pequeño">
                            <div class="row">
                                <div class="input-field col s11 m9 l11 pequeño">
                                    <a class="prefix gtext" style="margin-left: 5% !important;"><i class="mdi mdi-magnify"></i></a>
                                    <input type="text" id="search_nivelesclientes" maxlength="100" num="+69" var="nombre" style="margin-left: 15% !important;">
                                    <label for="search_nivelesclientes" style="margin-left: 15% !important;">Buscar Categoría</label>
                                </div>
                                <div id="fnivelesclientes" class="col s11 m9 l11  pequeño">
                                    <div class="row pequeño">
                                        <div class="input-field col s12 pequeño">
                                            <a class="prefix btn-floating btn2 add tooltipped z-depth-3" modulo="nivelescliente" data-position="top" data-tooltip="Ingresar Categoría" style="padding-right: 5% !important;"><i class="mdi mdi-plus"></i></a>
                                            <input type="hidden" id="vid_nivel" value="0">
                                            <input type="text" id="vnombre_nivel" style="margin-left: 15% !important;">
                                            <input type="hidden" id="vbisproveedor" value="0">
                                            <label for="vnombre_nivel" style="margin-left: 15% !important;">Ingresar Categoría</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m12 l5 pequeño">
                            <table class="table pequeño centered highlight bordered responsive-table z-depth-3" id="data-table-nivelesclientes">
                                <thead>
                                    <tr class="tab1">
                                        <th class="white-text" style="border: 0; border-radius: 0px !important">Nombre</th>
                                        <th class="white-text" style="border: 0; border-radius: 0px !important;  width: 100%;">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="listanivelesclientes">
                                    {section name=LE loop=$CATC}
                                    <tr id="d_{$CATC[LE][0]} ">
                                        <td><input type="text" id="vnombre" class="fast-edit fast-edit-r center-align" value="{$CATC[LE][1]}" style="border: 0px;margin: 0px; padding: 0px;" maxlength="20"></td>
                                        <td style=" width: 50%;">
                                            <a class="waves-effect waves-light load_x modal-trigger" id="g{$CATC[LE][0]}" href='#modal-valorescat' title="Valores en el Sistema"><i class="mdi mdi-pencil mdi-24px left gtext"></i></a>
                                            <a class="waves-effect waves-light catcli modal-trigger" id="g{$CATC[LE][0]}" href='#modal-clientexcategoria' title="Valores en el Sistema"><i class="mdi mdi-account-multiple mdi-24px left gtext"></i></a>
                                            <a class="waves-effect waves-light load_x" modulo="nivelescliente" id="h{$CATC[LE][0]}" title="Eliminar Nivel de Cliente"><i class="mdi mdi-close mdi-24px left gtext delete"></i></a>
                                        </td>
                                    </tr>
                                    {/section}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div></div>
                <!-- Datos de las Categorías -->
            </li>
            <li>
                <div class="collapsible-header"><i class="mdi mdi-clock"></i><h5>Período Fiscal</h5></div>
                <div class="collapsible-body"><div class="card-block">
                    <div class="row pequeño">
                        <div class="col s12 m4 pequeño">
                            <div class="input-group">
                                <div class="input-group-addon"><b>Fecha Inicio</b></div>
                                <input type="date" class="datepicker" id="vfechainicio" value="">
                            </div>
                        </div>
                        <div class="col s12 m4 pequeño">
                            <div class="input-group">
                                <div class="input-group-addon"><b>Fecha Cierre</b></div>
                                <input type="date" class="datepicker" id="vfechafinal" value="">
                            </div>
                        </div>
                        <div class="col s12 m1 pequeño">
                            <button type="button" class="btn btn1 z-depth-3" id="sfechafiscal" style="margin-top: 5%;">Guardar</button>
                        </div>
                    </div>
                </div>
            </div></div>
            <!-- Datos del Período Fiscal -->
        </li>
    </ul>
    {/if}
    <div class="modal modal-fixed-footer grandemodal " id="modal-monedas">
        <div class="modal-header head2 padding1">
            <h5 class="modal-title center-align">Moneda</h5>
        </div>
        <div class="modal-content  pequeño ">
            <h4>Moneda</h4>
            <div id="fmonedas">
                <input type="hidden" id="vid" value="0">
                <div class="row">
                    <div class="input-field col s12 m6 pequeño ">
                        <label for="vnombremon" class="truncate">Nombre de Moneda</label>
                        <input type="text" id="vnombremon" maxlength="45">
                    </div>
                    <div class="input-field col s12 m6 pequeño ">
                        <label for="vsimbolo" class="truncate">Símbolo de Moneda</label>
                        <input type="text" id="vsimbolo" maxlength="1">
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6 pequeño">
                        <label for="vvalor" class="truncate">Valor de Moneda</label>
                        <input type="number" id="vvalor" value="0.00" class="eder">
                    </div>
                    <div class="input-field col s6 pequeño">
                        <label for="vsuma" class="truncate">Suma Adicional</label>
                        <input type="number" id="vsuma" value="0.00" class="eder">
                    </div>
                    <div class="input-field col s6 pequeño">
                        <label for="vcodigo" class="truncate">Código de la Moneda</label>
                        <input type="number" id="vcodigo" value=" " class="eder" maxlength="4" readonly="">
                    </div>
                </div>
                <label class="row">
                    
                    <div class="input-field col s12 m6 pequeño"><!-- stay="0" changed="1" -->
                        <input type="checkbox" id="iswsdl" name="iswsdl" />  
                        <label for="iswsdl">Valor por WSDL</label>
                    </div>
                </label>
                <div class="wsdl-op">
                    <div class="input-field" >
                        <select id="vwsdl" type="select" noClear="1">
                            <option value="0">Seleccione un WSDL</option>
                            {section name=LE loop=$WSDL}
                            <option value="{$WSDL[LE][0]}">{$WSDL[LE][1]}</option>
                            {/section}
                        </select>
                        <label>WSDL</label>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 m6">
                            <input type="text" id="vsuma" />
                            <label for="vsuma">Sumar al Valor del WSDL</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
            <button class="btn btn-flat waves-effect waves-light waves-green add" modulo="moneda" id="monbtn">Agregar</button>
        </div>
        </div><!-- /.modal -->
        <div class="modal grandemodal" id="modal-wsdl">
            <div class="modal-header head2 padding1">
                <h5 class="modal-title center-align">Mantenimiento WSDL</h5>
            </div>
            <div class="modal-content">
                <ul class="collection" id="showWSDL">
                    {section name=LE loop=$WSDL}
                    <li class="collection-item dismissable" style="cursor: pointer;" id="ws_{$WSDL[LE][0]}"><div><span class="wsdls" id="wsid_{$WSDL[LE][0]}">{$WSDL[LE][1]}</span><a class="secondary-content delws" id="delws{$WSDL[LE][0]}"><i class="mdi mdi-pencil gtext"></i></a></div></li>
                    {/section}
                </ul>
                <a href='#modal-wsdl-bt' id="mantWsdl-bt" class="btn-floating right btn2 btn-medium waves-effect waves-light modal-trigger z-depth-2" data-position="top" data-tooltip="Ingresar Moneda"><i class="mdi mdi-plus"></i></a>
            </div>
            </div><!-- /.modal -->
            <div class="modal bottom-sheet grandemodal" id="modal-wsdl-bt">
                <div class="modal-content">
                    <div class="add-wsdl" id="fwsdls">
                        <label>Dirección URL del WSDL</label>
                        <input type="text" id="vwsdlsnom" placeholder="http://" maxlength="255">
                        <label>Peticion XML</label>
                        <input type="text" id="vxmlsen" placeholder="SOAP" maxlength="255">
                        <label>Respuesta XML</label>
                        <input type="text" id="vxmlreq" placeholder="SOAP" maxlength="100">
                        <label>Respuesta Array</label>
                        <input type="text" id="vobtener" placeholder="VALOR_1,VALOR_2" maxlength="255">
                        <label>Parámetros</label>
                        <table>
                            <th>Campo</th>
                            <th>Valor</th>
                            <tbody id="detallewsdl">
                                <tr id="fl0">
                                    <td>
                                        <input type="hidden" id="vidwsdl" value="?">
                                        <input type="text" id="wsn1" class="constante" value="" placeholder="Nombre del Parámetro" maxlength="64"></td>
                                        <td><input type="text" id="wsv1" value="" placeholder="Valor del Parámetro" maxlength="64"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="fixed-action-btn">
                                <a class="btn-floating btn-large red" modulo="wsdl" detalle="1">
                                    <i class="large mdi mdi-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    </div><!-- /.modal -->
                    <div class="modal modal-fixed-footer grandemodal" id="modal-valorescat" >
                        <div class="modal-header head2 padding1">
                            <h5 class="modal-title center-align">Valores en el Sistema - <b>Categoría <span id="cname-mod"></span></b></h5>
                        </div>
                        <div class="modal-content pequeño" id="fdetallenivelesclientes">
                            <h5 class="modal-title center-align head3 padding1">Clientes</h5>
                            <input type="hidden" id="viddetalle">
                            <input type="hidden" id="vidnivel">
                            <div class="row">
                                <div class="input-field col s12 m6 l4 pequeño">
                                    <a class="prefix gtext">%</a>
                                    <input type="text" id="vclie_descuento_max" class="eder set0">
                                    <label for="vclie_descuento_max">Descuento Max.</label>
                                </div>
                                <div class="input-field col s12 m6 l4 pequeño">
                                    <a class="prefix gtext">%</a>
                                    <input type="text" id="vclie_descuento" class="eder set0">
                                    <label for="vclie_descuento">Descuento Base</label>
                                </div>
                                <div class="input-field col s12 m6 l4 pequeño">
                                    <input type="text" id="vclie_plazo" class="eder set0">
                                    <label for="vclie_plazo">Plazo en Días</label>
                                </div>
                                <div class="input-field col s12 m6 l4 pequeño">
                                    <input type="text" id="vclie_credito" class="eder set0">
                                    <label for="vclie_credito">Crédito</label>
                                </div>
                                <div class="input-field col s12 m6 l4 pequeño">
                                    <select id="vdcontado" type="select">
                                        <option value="" disabled selected defecto="">Seleccione una Cuenta</option>
                                        {section name=LE loop=$CUE}
                                        <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                        {/section}
                                    </select>
                                    <label for="vdcontado">Contado Debe</label>
                                </div>
                                <div class="input-field col s12 m6 l4 pequeño">
                                    <select id="vhcontado" type="select" defecto="">
                                        <option value="" disabled selected>Seleccione una Cuenta</option>
                                        {section name=LE loop=$CUE}
                                        <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                        {/section}
                                    </select>
                                    <label for="vhcontado">Contado Haber</label>
                                </div>
                                <div class="input-field col s12 m6 l6 pequeño">
                                    <select id="vdcredito" type="select" defecto="">
                                        <option value="" disabled selected>Seleccione una Cuenta</option>
                                        {section name=LE loop=$CUE}
                                        <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                        {/section}
                                    </select>
                                    <label for="vdcredito">Crédito Debe</label>
                                </div>
                                <div class="input-field col s12 m6 l6 pequeño">
                                    <select id="vhcredito" type="select" defecto="">
                                        <option value="" disabled selected>Seleccione una Cuenta</option>
                                        {section name=LE loop=$CUE}
                                        <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                        {/section}
                                    </select>
                                    <label for="vhcredito">Crédito Haber</label>
                                </div>
                            </div>
                            
                                <h5 class="modal-title center-align head3 padding1">Productos</h5>

                            <div class="row">
                                <div class="input-field col s12 m6 l4 pequeño">
                                    <a class="prefix gtext">%</a>
                                    <input type="text" id="vprod_descuento_max" class="eder set0">
                                    <label for="vprod_descuento_max">Descuento Max.</label>
                                </div>
                                <div class="input-field col s12 m6 l4 pequeño">
                                    <input type="text" id="vprod_descuento" class="eder set0">
                                    <label for="vprod_descuento">Descuento Base</label>
                                </div>
                                <div class="input-field col s12 m6 l4 pequeño">
                                    <select id="vprod_cuenta" type="select" defecto="">
                                        <option value="" disabled selected>Seleccione una Cuenta</option>
                                        {section name=LE loop=$CUE}
                                        <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                        {/section}
                                    </select>
                                    <label for="vprod_cuenta">Cuenta Inventario</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
                            <button class="edit waves-effect waves-green btn-flat" modulo="detallenivelescliente">Guardar</button>
                        </div>
                    </div>
                    <div class="modal modal-fixed-footer grandemodal" id="modal-clientexcategoria" >
                        <div class="modal-header head2 padding1">
                            <h5 class="modal-title center-align">Clientes de - <b>Categoría <span id="catego"></span></b></h5>
                        </div>
                        <div class="modal-content pequeño" >
                            <h5 class="modal-title center-align head3 padding1">Productos</h5>
                            <div>
                                <div class="card-block">
                                    <table  class="table tabladetalles bordered striped centered highlight bordered dt-responsive nowrap z-depth-3" id="data-table-clientes-Categoria" style="width: 100%">
                                        <thead class="tab1">
                                            <tr>
                                                <th class="sinborde" style="width: 50%; border: none;" >Nombre</th>
                                                <th class="sinborde" style="width: 50%; border: none;" >Cédula</th>
                                            </tr>
                                        </thead>
                                    <tbody id="listacategoriasclie">
                                        <!-- JS -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                            <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
                        </div>
                </div>