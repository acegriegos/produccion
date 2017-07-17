<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Clientes</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-clientes.css">
</head>
<!-- #0B3861 -->
<body>
    {$NAV}
    <div class="bdy pequeño" style="font-size: 1.2em !important">
        <div class="card z-depth-5 pequeño">
        <div class="card-header center white-text" style="background-color:#0B3861">
                <p class="flow-text" style="font-size: 1.9em;">Clientes</p>
            </div>
            <div class="card-content pequeño">
                <div class="row">
                    <div class="input-field col s10 m6 l6">
                        <a class="prefix dropdown-button tooltipped"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="small material-icons">search</i></a>
                        <ul id='filtr_1' class='dropdown-content'>
                            <li><a class="optns" tipo="nombre,vcedula" href="#!" fltr="1">Nombre o Cédula</a></li>
                            <li><a class="optns" tipo="telefonos" href="#!" fltr="3">Teléfono</a></li>
                        </ul>
                        <input type="text" id="search_clientes" maxlength="100" num="v29" var="nombre,vcedula">
                        <label class="truncate" for="search_clientes">Buscar Cliente por Nombre o Cédula</label>
                    </div>
                    <div class="col s2 m6 per1001">
                        <a id="ingClie" class="der btn-floating tooltipped modal-trigger z-depth-5" data-position="left" data-tooltip="Ingresar Cliente" href="#modal-clientes"><i class="large material-icons ">add</i></a>
                    </div>
                </div>
                <div class="card-block">
                    <table  class="table tabladetalles centered highlight bordered responsive-table z-depth-3" id="data-table-clientes">
                        <thead>
                            <tr>
                                <th class="sinborde white-text blue" ><b>Cédula</b></th>
                                <th class="sinborde white-text blue" >Nombre</th>
                                <th class="sinborde white-text blue" >Teléfonos</th>
                                <th class="sinborde white-text blue" >Correo</th>
                                <th class="sinborde white-text blue" >Tipo</th>
                                <th class="sinborde white-text blue" >Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listaclientes">
                            {section name=LE loop=$CLIE}
                            <tr id="f{$CLIE[LE][0]}">
                                <td style=" padding: 10px;color:black">{$CLIE[LE][1]}</td>
                                <td style=" padding: 10px;color:black">{$CLIE[LE][2]}</td>
                                <td style=" padding: 10px;color:black">{$CLIE[LE][4]}</td>
                                <td style=" padding: 10px;color:black">{$CLIE[LE][5]}</td>
                                <td style=" padding: 10px;color:black">{$CLIE[LE][6]}</td>
                                <td>
                                     {if $CLIE[LE][13] neq 1}
                                    <a href="modal-contactos" style="color:black" title="Contactos"><i class="contact material-icons pbtn" id="c{$CLIE[LE][0]}">contact_phone</i></a>
                                    {/if}

                                    <a href="#modal-clientes" class="load material-icons pbtn per1002" id="m{$CLIE[LE][0]}" modulo="cliente" style="color:black">edit</a>
                                    
                                    <a href="#" class="delete material-icons pbtn per1003" modulo="cliente" id="d{$CLIE[LE][0]}" style="color:black">delete</a>
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
                            <li class="tab col s3"><a href="#exo" class="white-text" id="ln4">Impuestos</a></li>
                        </ul>
                    </div>
                    <div class="modal-content " style="padding: 0px;">
                        <div id="fclientes">
                            <input type="hidden" id="zelda">
                            <div class="row">
                                <br>
                                <div class="col s12 m12 l12">
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
                              <input type="hidden" id="vidtipocliente" value="1">
                          </div>
                          <br>
                          <div class="card-title pequeño" id="titInfo" align="center"><b>Datos Personales</b></div>

                          <div class="row ">
                            <div class="input-field col s12 m6 l4 pequeño">
                                <label id="nomClie" for="vnombre">Nombre</label>
                                <input type="text" class="validate" id="vnombre">
                                <input type="hidden" id="vid" value="0">
                                <input type="hidden" id="vbisproveedor" value="0">
                            </div>

                            <div class="input-field col s12 m6 l4 hid">
                                <label for="vapellido1">Primer Apellido</label>
                                <input type="text" class="form-control" id="vapellido1">
                            </div>

                            <div class="input-field col s12 m6 l4 hid">
                                <label for="vapellido2">Segundo Apellido</label>
                                <input type="text" class="form-control" id="vapellido2">
                            </div>
                            
                            <div class="input-field col s12 m6 l4">
                                <label for="vcedula">Cédula del Cliente</label>
                                <input type="text" class="validate" id="vcedula">
                            </div>

                            <div class="input-field col s12 m6 col l4 hide vweb">
                                <label for="vweb">Web</label>
                                <input type="text" class="form-control" id="vweb" placeholder="www.webempresa.com">
                            </div>

                            <div class="input-field col s12 m6 l4">
                                <select id="videstado" type="select">
                                    <option value="" disabled selected>Seleccione un Estado</option>
                                    {section name=LE loop=$ESTCLIE}
                                    <option value="{$ESTCLIE[LE][0]}">{$ESTCLIE[LE][1]}</option>
                                    {/section}
                                </select>
                                <label for="videstado">Estado</label>
                            </div>
                            
                            </div>
                            <div class="row">

                            <div class="input-field col s12 m12 l4 ciclos" vtabla="correo" id="fcorreos" hasTabla="1" tp="3">
                                <div class="ciclos">
                                    <div class="prefix"><i class="material-icons">email</i></div>
                                    <input type="email" class="validate tooltipped" id="correo_in" data-position="top" data-tooltip="Ingresar Correo con la Tecla [right]">
                                    <input type="hidden" id="vcorreo" fill="18">
                                    <label for="correo_in">Ingresar Correo</label>
                                    <ul class="collection" id="shcorreos"></ul>
                                </div>
                            </div>
                            
                            <div class="col s12 m12 l8 ciclos" vtabla="telefono" id="ftelefonos" hasTabla="1" tp="3">
                                <div class="ciclos">
                                    <div class="row">

                                        <div class="input-field col s12 m6">
                                            <select type="select" id="tptel">
                                                <option value="" disabled selected>Seleccione Tipo de Tel.</option>
                                                {section name=LE loop=$TPTEL}
                                                <option value="{$TPTEL[LE][0]}">{$TPTEL[LE][1]}</option>
                                                {/section}
                                            </select>
                                            <label for="tptel">Tipo Teléfono</label>
                                        </div>

                                        <div class="input-field col s12 m6">
                                            <div class="prefix"><i class="fa fa-phone"></i></div>
                                            <input type="text" class="validate tooltipped" id="telefono_in" data-mask="9999-9999" data-position="top" data-tooltip="Ingresar Teléfono con la Tecla [right]">
                                            <input type="hidden" id="vtelefono" fill="19">
                                            <label class="truncate" for="telefono_in">Ingresar Teléfono</label>
                                            
                                            <ul class="collection" id="shtelefonos"></ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="fina" class="col s12">
                        <div class="row"><br>
                            <div class="input-field col s12 m6 l6">
                                <select type="select" id="vidnivel">
                                    <option value="0">Seleccione una Categoría</option>
                                    {section name=LE loop=$NVLCLIE}
                                    <option value="{$NVLCLIE[LE][0]}">{$NVLCLIE[LE][1]}</option>
                                    {/section}
                                </select>
                                <label for="vidnivel">Categoría del Cliente</label>
                            </div>

                            <div class="col s12 m6 l6">

                              <div class="switch" align="center">
                                <label>
                                   Contado
                                  <input type="checkbox" tp="1" name="tipocliente" id="tipocliente">
                                  <span class="lever"></span>
                                   Crédito
                              </label>
                          </div>

                      </div>
                  </div> 

                  <div class="row">

                    <div class="input-field col s12 m6 l6">
                        <div class="prefix"><img src="../assets/img/icon/percent.svg"></div>
                        <input type="number" class="eder center" id="vdescuentom">
                        <label for="vdescuentom">Descuento Máximo</label>
                    </div>

                </div>

                <div class="row cre" style="display: none;"> 

                    <div class="input-field col s12 m6 l6">
                        <div class="prefix"><i class="material-icons">today</i></div>
                        <label for="vplazo">Plazo en Días</label>
                        <input type="number" class="eder" id="vplazo">
                    </div>

                    <div class="input-field col s12 m6 l6">
                        <div class="prefix"><i class="material-icons">money_off</i></div>
                        <label for="vcredito">Crédito del Cliente</label>
                        <input type="number" class="eder" id="vcredito">
                    </div>

                </div>



                <div vtabla="defectocuenta" id="fdefectocuentas" hasTabla="1" tp="3">
                    <div class="ciclos">
                        <input type="hidden" id="videstadocontable" value="1">
                        <input type="hidden" id="vidcuenta" value="">

                        <div class="row">
                            <div class="col s12 m6 l6 pequeño">
                                <div class="card-title"><b> Cuentas Contado </b></div>
                                
                                <div class="pequeño" id="ctacontado">

                                </div>
                            </div>

                            <div class="col s12 m6 cre pequeño" style="display: none;">
                                <div class="card-title pequeño"><b> Cuentas Crédito </b></div>
                                <div class="pequeño" id="ctacredito">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="logis" class="col s12">
                <div class="row">

                    <div vtabla="ubicacione" id="fubicaciones" hasTabla="1" tp="3" class="ciclos">
                        <div class="ciclos">
                            <div class="card-title" align="center"><b>Direcciones</b></div>

                            <input type="hidden" id="vbisnacional" value="1">

                            <div class="row"><br>
                                <div class=" col s12 m12 l4">
                                 <div class="provincia input-field">
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

                            <div class="col s12 m12 l4">
                             
                             <div class="canton input-field">

                                <a class="prefix btn-floating blue tooltipped" data-position="button" data-tooltip="Ingresar Cantón" href="#!" style="width: 2.5rem" det="canton" d-b="9" prev="vidprovincia" sig="viddistrito"><i class="material-icons">add</i></a>


                                <select id="vidcanton" type="select" class="_det">
                                    <option value="">Seleccione un Cantón</option>
                                </select>
                                <label for="vidcanton">Cantón</label>
                            </div>

                        </div>

                        <div class="col s12 m12 l4">

                         <div class="distrito input-field ">
                            <a class="prefix btn-floating blue tooltipped" data-position="button" data-tooltip="Ingresar Distrito" href="#!" style="width: 2.5rem" det="distrito" d-b="10" prev="vidcanton" sig=""><i class="material-icons">add</i></a>

                            <select id="viddistrito" type="select" class="_det">
                                <option value="">Seleccione un Distrito</option>
                            </select>
                            <label for="viddistrito">Distrito</label>
                        </div>

                    </div>
                    <div class="input-field col s12 m12 l6">
                        <label for="vdireccion">Dirección Exacta</label>
                        <textarea type="textarea" id="vdireccion" class="materialize-textarea" length="100"></textarea>
                    </div>

                </div>

                <div class="row">



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

<div id="exo" class="col s12">
    <div class="row">

        <div class="card-title" align="center"><b>Impuestos</b></div>

        
        <div class="input-field col s12 m12 l6">
            <select id="sel_impuestos" type="select">
                <option value="" disabled selected>Ingrese un Impuesto</option>
                {section name=LE loop=$IMP}
                <option value="{$IMP[LE][0]}" tmp="{$IMP[LE][2]}">{$IMP[LE][1]} - {$IMP[LE][3]}%</option>
                {/section}
            </select>
            
        </div>
        <div class="col s12 m12 l6">

            <div>
                <ul class="collection" id="showimpuestos">

                </ul>
            </div>
        </div>
    </div>
</div>

</div>
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
<script src="../assets/js/modulos/clientes.js?v=0.8"></script>

</body>
</html>