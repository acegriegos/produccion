<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Proveedores</title>
    {$STY}
</head>

<body>
        {$NAV}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-proveedores.css">
    <div class="bdy pequeño" >
        <div class="card">
            <div class="card-header center white-text" style="background-color:#0B3861"><p class="flow-text" style="font-size: 1.9em;">Proveedores</p>
            </div>
            <div class="card-content pequeño">
                <div class="row">
                    <div class="input-field col s10 m6">
                        <a class="prefix dropdown-button tooltipped" data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="small material-icons">search</i></a>
                        <ul id='filtr_1' class='dropdown-content'>
                            <li><a href="#!" fltr="1">Nombre</a></li>
                            <li><a href="#!" fltr="2">Cédula</a></li>
                            <li><a href="#!" fltr="3">Teléfono</a></li>
                        </ul>
                        <input type="text" id="search_clientes" maxlength="100" num="v30" var="nombre">
                        <label class="truncate" for="search_clientes">Buscar Proveedor por Nombre o Cédula</label>
                    </div>
                    <div class="col s2 m6 per2001">
                        <a id="ingClie" class="der btn-floating tooltipped modal-trigger z-depth-5 " data-position="left" data-tooltip="Ingresar Proveedor" href="#modal-clientes"><i class="large material-icons">add</i></a>
                    </div>
                </div>
                <div class="card-block">
                    <table class="dt-responsive nowrap tabladetalles centered highlight bordered z-depth-2" id="data-table-clientes" style="width: 100%">
                        <thead>
                            <tr>
                                <th class="sinborde white-text blue" style="  padding: 10px;color:black; border-radius: 0px!important;" >Cédula</th>
                                <th class="sinborde white-text blue"  style=" padding: 10px;color:black; border-radius: 0px!important;">Nombre</th>
                                <th class="sinborde white-text blue"  style=" padding: 10px;color:black; border-radius: 0px!important;">Código</th>
                                <th class="sinborde white-text blue"  style=" padding: 10px;color:black; border-radius: 0px!important;">Teléfonos</th>
                                <th class="sinborde white-text blue"  style=" padding: 10px;color:black; border-radius: 0px!important;">Correo</th>
                                <th class="sinborde white-text blue"  style=" padding: 10px;color:black; border-radius: 0px!important;">Tipo</th>
                                <th class="sinborde white-text blue"  style=" padding: 10px;color:black; border-radius: 0px!important;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listaclientes">
                            {section name=LE loop=$PROV}
                            <tr id="f{$PROV[LE][0]}" class="pbtn">
                                <td  style="padding: 10px;">{$PROV[LE][1]}</td>
                                <td  style="padding: 10px;">{$PROV[LE][2]}</td>
                                <td  style="padding: 10px;">{$PROV[LE][15]}</td>
                                <td  style="padding: 10px;">{$PROV[LE][4]}</td>
                                <td  style="padding: 10px;">{$PROV[LE][5]}</td>
                                <td  style="padding: 10px;">{$PROV[LE][6]}</td>
                                <td>
                                    {if $PROV[LE][13] neq 1}
                                    <a href="modal-contactos" class="hide" style="color:black" title="Contactos"><i class="contact material-icons pbtn" id="c{$PROV[LE][0]}">contact_phone</i></a>
                                    {/if}

                                    <a href="#modal-clientes" style="color:black"><i class="load material-icons pbtn per2002" id="m{$PROV[LE][0]}" modulo="cliente">edit</i></a>

                                    <a href="#" style="color:black"><i class="delete material-icons pbtn per2003" modulo="cliente" id="d{$PROV[LE][0]}">delete</i></a>
                                </td>
                            </tr>
                            {/section}
                        </tbody>
                    </table>
                </div>
                <div class="modal modal-fixed-footer grandemodal" id="modal-clientes" style="height: 80%; width: 75%">
                    <div class="modal-header">
                        <ul class="tabs tabs-fixed-width blue">
                            <li class="tab col s3"><a class="active white-text" href="#info" id="ln1">Información</a></li>
                            <li class="tab col s3"><a href="#fina" class="white-text" id="ln2">Financiero</a></li>
                            <li class="tab col s3"><a href="#logis" class="white-text" id="ln3">Logística</a></li>
                        </ul>
                    </div>
                    <div class="modal-content" style="padding: 0px;">
                        <div id="fclientes">
                            <input type="hidden" class="zelda">
                            <div class="row">
<!--  -->
                                <div class="col s12 m9 l9"><br><br>
                                    <div class="row parte1 col s12" id="info">
                                        <div class="row" style="margin: 0px">
                                            <div class="col s6 m3 l2">
                                                <p>
                                                  <input class="with-gap" name="tipoclie" type="radio" id="cfisico" tipoClie="1" checked="checked" principal="1"/>
                                                  <label for="cfisico">Físico</label>
                                              </p>
                                          </div>
                                          <div class="col s6 m3 l2">
                                            <p>
                                              <input class="with-gap" name="tipoclie" type="radio" id="cjuridico" tipoClie="2" />
                                              <label for="cjuridico">Jurídico</label>
                                          </p>
                                      </div>
                                      <div class="col s6 m3 l2">
                                        <p>
                                          <input class="with-gap" name="tipoclie" type="radio" id="cnite" tipoClie="3" />
                                          <label for="cnite">NITE</label>
                                      </p>
                                  </div>
                                  <div class="col s6 m3 l2">
                                        <p>
                                          <input class="with-gap" name="tipoclie" type="radio" id="cdimex" tipoClie="4" />
                                          <label for="cdimex">DIMEX</label>
                                      </p>
                                  </div>
                                  <div class="input-field col s6 m4 hide">
                                    <select class="icons" type="select" id="vidpais">
                                    {section name=LE loop=$PAISES}
                                        <option value="{$PAISES[LE][0]}" cod="{$PAISES[LE][1]}" data-icon="{$PAISES[LE][2]}" class="circle">{$PAISES[LE][3]}</option>
                                    {/section}
                                    </select>
                                    <label>País</label>
                                  </div>
                              <input type="hidden" id="vidtipocliente" value="1">
                          </div>
                          <br>
                          <div class="card-title pequeño" id="titInfo"  align="center"><b>Datos Personales</b></div>
                          <br>
                          <div class="row">
                            <div class="input-field col s12 m6 l4">
                                <label id="nomClie" for="vnombre">Nombre</label>
                                <input type="text" class="validate onblur" id="vnombre">
                                <input type="hidden" id="vid" value="0">
                                <input type="hidden" id="vidsucursal" value="">
                                <input type="hidden" id="vbisproveedor" value="1">

                            </div>

                            <div class="input-field col s12 m6 col l4 hid">
                                <label for="vapellido1">Primer Apellido</label>
                                <input type="text" class="form-control onblur" id="vapellido1">
                            </div>

                            <div class="input-field col s12 m6 l4 hid">
                                <label for="vapellido2">Segundo Apellido</label>
                                <input type="text" class="form-control onblur" id="vapellido2">
                            </div>
                            
                            <div class="input-field col s12 m6 l4">
                                <label for="vcedula">Cédula del Proveedor</label>
                                <input type="text" class="validate onblur" id="vcedula">
                            </div>

                            <div class="input-field col s12 m6 l4">
                                <label for="vcodigo">Código Interno de Cliente</label>
                                <input type="text" class="validate onblur" id="vcodigo">
                            </div>

                            <div class="input-field col s12 m6 col l4">
                                <label for="vweb">Web</label>
                                <input type="text" class="form-control onblur" id="vweb" placeholder="www.webempresa.com">
                            </div>

                            </div>
                            <div class="row" style="background: transparent;">
                            <div class="input-field col s12 m5 l5 ciclos" vtabla="correo" id="fcorreos" hasTabla="1" tp="3">
                                <div class="ciclos">
                                <div class="row">
                                    <div class="l10 m10 s12 col">
                                        <i class="material-icons prefix">email</i>
                                        <input id="correo_in" type="text" class="validate tooltipped onblur" data-position="top" data-tooltip="Ingresar Correo con la Tecla [right]">
                                        <label for="correo_in">Ingresar Correo</label>
                                    </div>
                                    <div class="l2 m2 s12 col">
                                        <a href="#!" id="btnaddcorreo"><i class="material-icons">add_box</i></a>    
                                    </div>
                                </div>
                                    <input type="hidden" id="vcorreo" fill="18">
                                    <!-- class="collapsible" data-collapsible="accordion" es un ul -->
                                    
                                </div>
                            </div>
                            <div class="col s12 m7 l7 ciclos" vtabla="telefono" id="ftelefonos" hasTabla="1" tp="3" style="background: transparent;">
                                <div class="ciclos">
                                    <div class="row">
                                        <div class="input-field col s4 m4">
                                            <!-- <div class="prefix"><i class="fa fa-phone"></i></div> -->
                                            <select type="select" id="tptel">
                                                <option value="" disabled selected>Seleccione Tipo de Tel.</option>
                                                {section name=LE loop=$TPTEL}
                                                <option value="{$TPTEL[LE][0]}">{$TPTEL[LE][1]}</option>
                                                {/section}
                                            </select>
                                            <label for="tptel">Tipo Teléfono</label>
                                            <input type="hidden" id="htipo">
                                        </div>
                                            
                                        <div class="input-field col s8 m8">
                                            <div class="l10 m10 s10 col">
                                                <i class="material-icons prefix">phone</i>
                                                <input type="tel" class="validate tooltipped onblur" id="telefono_in" data-mask="9999-9999" data-position="top" data-tooltip="Ingresar Teléfono con la Tecla [right]">
                                                <label for="telefono_in">Teléfono</label>
                                            </div>
                                            <div id="btnaddphone" class="l2 m2 s2 col">
                                                <a href="#!"><i class="material-icons">add_box</i></a>    
                                            </div>
                                            
                                            <input type="hidden" id="vtelefono" fill="19">
                                            <!-- <label class="truncate" for="telefono_in">Ingresar Teléfono</label> -->
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="l4 m4 s6 col">
                            <div id="shcorreos"></div>
                            <!-- <div style="background: red" id="shtelefonos"></div> -->
                        </div>
                        <div class="l4 m4 s6 col">&nbsp;</div>
                        <div class="l4 m4 s6 col">
                            <!-- <div style="background: blue" id="shcorreos"></div> -->
                            <div id="shtelefonos"></div>
                        </div>
                    </div>

                    <div id="fina" class="col s12">
                        <div vtabla="defectocuenta" id="fdefectocuentas" hasTabla="1" tp="3">
                            <div class="ciclos">
                                <input type="hidden" id="videstadocontable" value="1">
                                <input type="hidden" id="vidcuenta" value="">
                                <div class="row">
                                    <div class="col s12 m6">
                                        <div class="card-title"><b> Cuentas Contado </b></div>
                                        <div id="ctacontado">

                                        </div>
                                    </div>
                                    <div class="col s12 m6">
                                        <div class="card-title"><b> Cuentas Crédito </b></div>
                                        <div id="ctacredito">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="logis" class="col s12">
                        <div vtabla="ubicacione" id="fubicaciones" hasTabla="1" tp="3" class="ciclos">
                            <div class="ciclos">
                                <div class="card-title" align="center"><b>Direcciones</b><br></div>
                                <input type="hidden" id="vbisnacional" value="1">
                                <div class="row"><br>
                                    <div class="input-field col s12 m6 l4">
                                        <div class="provincia">
                                            <a class="prefix btn-floating blue tooltipped" data-position="button" data-tooltip="Ingresar Provincia" href="#!" style="width: 2.5rem" det="provincia" d-b="8" prev="" sig="vidcanton"><i class="material-icons">add</i></a>

                                            <select id="vidprovincia" type="select" class="_det" primary="1">
                                                <option value="0">Seleccione una Provincia</option>
                                                {section name=LE loop=$PRO}
                                                <option value="{$PRO[LE][0]}">{$PRO[LE][1]}</option>
                                                {/section}
                                            </select>
                                            <label for="vidprovincia">Provincia</label>
                                        </div>
                                    </div>
                                    <div class="input-field col s12 m6 l4">
                                        <div class="canton">
                                            <a class="prefix btn-floating blue tooltipped" data-position="button" data-tooltip="Ingresar Cantón" href="#!" style="width: 2.5rem" det="canton" d-b="9" prev="vidprovincia" sig="viddistrito"><i class="material-icons">add</i></a>
                                            <select id="vidcanton" type="select" class="_det">
                                                <option value="">Seleccione un Cantón</option>
                                            </select>
                                            <label for="vidcanton">Cantón</label>
                                        </div>
                                    </div>
                                    <div class="input-field col s12 m6 l4">
                                        <div class="distrito">
                                            <a class="prefix btn-floating blue tooltipped" data-position="button" data-tooltip="Ingresar Distrito" href="#!" style="width: 2.5rem" det="distrito" d-b="10" prev="vidcanton" sig=""><i class="material-icons">add</i></a>

                                            <select id="viddistrito" type="select" class="_det">
                                                <option value="">Seleccione un Distrito</option>
                                            </select>
                                            <label for="viddistrito">Distrito</label>
                                        </div><br>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <label for="vdireccion">Dirección Exacta</label>
                                        <textarea type="textarea" id="vdireccion" class="materialize-textarea" length="100"></textarea>
                                    </div>

                                    <div class="input-field col s12 hide-on-med-and-up">
                                        <div class="prefix"><i class="material-icons">location_on</i></div>
                                        <label for="vlatitud">Latitud</label>
                                        <input type="text" class="eder" id="vlatitud">
                                    </div>
                                    
                                    <div class="input-field col s12 hide-on-med-and-up">
                                        <div class="prefix"><i class="material-icons">location_on</i></div>
                                        <label for="vlongitud">Longitud</label>
                                        <input type="text" class="eder" id="vlongitud">
                                    </div>

                                </div>
                            </div>    
                        </div>
                    </div>

                </div>
            <!-- CARD -->
                <div class="col s12 m3 l3">
                    <div class="row" style="background: #DEDEDE"><br>
                        <div class="s1 m1 l1 col pbtn"><i class="material-icons">chevron_left</i></div>
                        <div class="s10 m10 l10 col" align="center">&nbsp;</div>
                        <div class="s1 m1 l1 col pbtn"><i class="material-icons">chevron_right</i></div>
                        
                        <div class="s12 m12 l12 col" align="center">
                            <h5><b><span id="infvnombre0"><span class="placeh">Nombre Cliente</span></span> <span id="infvapellido0">&nbsp;</span> <span id="infvapellido1">&nbsp;</span></b></h5>
                        </div>
                        <div class="s4 m4 l4 col" align="center">
                            <table>
                                <tr><td style="font-size: 0.8em"><b>Cédula</b></td></tr>
                                <tr class="icorr"><td style="font-size: 0.8em"><b>Correo</b></td></tr>
                                <tr class="iphone"><td style="font-size: 0.8em"><b>Teléfono</b></td></tr>
                                <tr><td style="font-size: 0.8em"><b>Código</b></td></tr>
                                <tr><td style="font-size: 0.8em"><b>Web</b></td></tr>
                                <tr><td style="font-size: 0.8em"><b>Provincia</b></td></tr>
                                <tr><td style="font-size: 0.8em"><b>Cantón</b></td></tr>
                                <tr><td style="font-size: 0.8em"><b>Distrito</b></td></tr>
                                <tr><td style="font-size: 0.8em"><b>Direccion</b></td></tr>
                            </table>
                        </div>
                        <div class="s8 m8 l8 col" align="center">
                            <table>
                                <tr><td style="font-size: 0.8em"><span id="infcedula1"><span class="placeh">8088800888</span></span></td></tr>
                                <tr class="icorr"><td style="padding: 0 !important; font-size: 0.8em"><div id="infcorreo2"><div class="placeh chip chpcr">mail@example.com</div></div></td></tr>
                                <tr class="iphone"><td style="padding: 0 !important; font-size: 0.8em"><div id="inftelefono4"><div class="placeh chip chpph">88888888</div></div></td></tr>
                                <tr><td style="font-size: 0.8em"><span id="infcodigo6"><span class="placeh">COD01</span></span></td></tr>
                                <tr><td style="font-size: 0.8em"><span id="infweb7"><span class="placeh">www.example.com</span></span></td></tr>
                                <tr><td style="font-size: 0.8em"><span id="infprovincia8"><span class="placeh">Provincia</span></span></td></tr>
                                <tr><td style="font-size: 0.8em"><span id="infcanton9"><span class="placeh">Cantón</span></span></td></tr>
                                <tr><td style="font-size: 0.8em"><span id="infdistrito10"><span class="placeh">Distrito</span></span></td></tr>
                                <tr><td style="font-size: 0.8em"><span id="infdireccion11"><span class="placeh">Dirección</span></span></td></tr>
                            </table>
                        </div>
                        <div class="s12 m12 l12 col" align="center">
                        <ul>
                            <li style="font-size: 0.8em">
                            <label><b>Estado de Cliente</b></label>
                            <div class="switch">
                                <label>
                                  Inactivo
                                  <input type="checkbox" id="videstado" value="">
                                  <span class="lever"></span>
                                  Activo
                                </label>
                              </div>
                            </li>
                        </ul><br>
                        </div>
                    </div>
                    </div>
            <!-- END CARD -->
            </div>
        </div>
    </div>

    <div class="modal-footer">

        <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        <button type="button" class="waves-effect waves-green btn-flat add" id="agClie" codigo="1" modulo="cliente" varias="1" >Guardar</button>
    </div>

</div>

</div>
</div>
</div>
{$SCR}
<script src="../assets/js/modulos/proveedores.js?v=0.4"></script>
<script src="../assets/js/jquery.mask.min.js"></script>

</body>
</html>