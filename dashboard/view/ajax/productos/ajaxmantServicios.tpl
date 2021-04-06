<div id="mantServ">
    <div class="row">
        <div class="col s12 m6">
           <div class="input-field col s2 m2 l1">
            <a class="prefix dropdown-button tooltipped small mdi mdi-magnify pbtn" data-activates="fserv" data-position="button" data-tooltip="Cambiar Filtro"></a>
        </div>
        <div class="input-field col s9 m9">
            <input id="search_servicios" type="text" maxlength="100" num="v13" var="0,1" style="margin-left: 1% !important;">
            <label for="search_servicios" style="margin-left: 1% !important;">Buscar por Código o Nombre</label>
        </div>          
    </div>
    <div class="col s12 m6">
        <a id="addservice" class="btn-floating waves-effect waves-light right btn2 z-depth-3 per4111 modal-trigger" href="#modal-servicios"><i class="mdi mdi-plus"></i></a>
    </div>
</div>
<div class="row">
    <div class="col s12 m12 pequeño">
        <div class="table">
            <table class="table centered striped bordered highlight z-depth-3 pequeño dt-responsive nowrap" id="data-table-servicios" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Código</th>
                        <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Nombre</th>
                        <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Precio</th>
                        <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Período</th>
                        <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Outsourcing</th>
                        <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listaservicios">
                    {section name=LE loop=$SERV}
                    <tr>
                        <td style="padding: 10px;">{$SERV[LE][1]}</td>
                        <td style="padding: 10px;">{$SERV[LE][2]}</td>
                        <td style="padding: 10px;">{$SERV[LE][3]}</td>
                        <td style="padding: 10px;">{$SERV[LE][4]}</td>
                        <td style="padding: 10px;">{$SERV[LE][5]}</td>
                        <td style="padding: 10px;">
                            <a class="btn-color pbtn loadserv per4112 modal-trigger" id="m{$SERV[LE][0]}" href="#modal-servicios" title="Editar Servicio"><i class="mdi mdi-pencil mdi-24px"></i></a>
                            <a class="btn-color pbtn cdel delete 4113" modulo="servicio" id="d{$SERV[LE][0]}" title="Eliminar Producto"><i class="mdi mdi-close mdi-24px"></i></a>
                        </td>
                    </tr>
                    {/section}
                </tbody>
            </table>
            <ul class="left showing" modulo="13"><small></small></ul>
            <ul class="pagination right" vtbl="13" modulo="servicios"></ul>
        </div>
    </div>
</div><br><br>
<div id="modal-servicios" class="modal modal-fixed-footer grandemodal" style="width:70%;height:90%">
    <div class="modal-header">
        <ul class="tabs head3 center">
            <li class="tab col s3"><a class="white-text menuS active" id="ms1" href="#">Datos Servicio</a></li>
        </ul>
    </div>
    <div class="modal-content" style="padding: 0px;">
        <div id="fservicios">
            <input type="hidden" class="zelda">
            <div id="datosservicios" style="padding: 25px 10px 0 10px">
                <input type="hidden" id="vid" value="0">
                <input type="hidden" id="vidproveedor" value="0">
                <input type="hidden" id="vidsucursal" value="">
                <input type="hidden" id="vidsuc" value="{$smarty.session.IMPRESA}">

                <div class="row">
                    <div class="input-field col s12 m6 l6" style="margin: 0">
                        <input id="vcodigo" type="text" class="validate" autocomplete="off">
                        <label for="vcodigo">Código de Servicio</label>
                    </div>
                    <div class="input-field col s12  m6 l6" style="margin: 0">
                        <a class="prefix modal-trigger" href="#hextra"><i class="mdi mdi-help pbtn"></i></a>
                        <input id="vnombre" type="text" class="validate" autocomplete="off" maxlength="150">
                        <label for="vnombre">Nombre de Servicio</label>
                    </div>
                    <div class="input-field col s12 m6 hide">
                        <textarea id="vdescripcion" type="textarea" class="materialize-textarea" length="150" style="margin: 0;padding: 0px"></textarea>
                        <label for="vdescripcion">Descripción del Servicio</label>
                    </div>
                    {if $smarty.session.BUSS eq 0}
                    <div class="col s6 m6 l6 input-field" id="dinvent">
                        <select id="vidinventario" type="select"></select>
                        <label for="vidinventario">Inventario</label>
                    </div>
                    {else}
                        
                    <input type="hidden" id="vidinventario" value="0">

                    {/if}
                </div>
                <div class="row">
                    <div class="col s6 m4 hide">
                        <a class="btn btn-success" href="#modal-servcliente" id="btn-servclie">Por Período</a>
                    </div>

                    <div class="col s6 m4">
                       <label class="col s3 red-text"><b>IVA:</b></label>
                        <select id="vimpiva" class="col s9" style="margin: 0px" num="4">
                            <option selected value="1" num="0">Exento 0%</option>
                            <option selected value="2" num="1">Reducido 1%</option>
                            <option selected value="3" num="2">Reducido 2%</option>
                            <option selected value="4" num="4">Reducido 4%</option>
                            <option selected value="5" num="0">Transitorio 0%</option>
                            <option selected value="6" num="4">Transitorio 4%</option>
                            <option selected value="7" num="8">Transitorio 8%</option>
                            <option selected value="8" num="13">General 13%</option>
                        </select>
                    </div>

                    <div class="col s6 m4 hide">
                        <input type="checkbox" class="noextra" id="servpro">
                        <label for="servpro">Servicio Profesional</label>
                        <input type="hidden" id="vservprofesional">
                    </div>

                    <div class="col s6 m4">
                        <input type="checkbox" id="porfact">
                        <label for="porfact">Retención de Pago</label>
                    </div>
                    <div class="input-field col s6 m4 hide vpfactura">
                            <i class="prefix mdi-percent mdi pbtn por-num" tipo="1"></i>
                            <input type="text" id="vpfactura" noClear="1" value="0.00" class="eder" autocomplete="off">
                            <label for="vpfactura">Valor</label>
                    </div>
                </div>
               
                <div class="row">
                    <div class="col s12 m3 hide">
                        <input type="checkbox" id="outsourcing" value="0">
                        <label for="outsourcing">Outsourcing</label>
                        <input type="hidden" id="boutsrc" value="0">
                    </div>
                    <!-- </div> -->
                    <!-- <div class="row"> -->
                    <div class="input-field col s12 m6 hide">
                        <select id="prov" disabled>
                            <br><option value="0" disabled selected>Seleccione un Proveedor</option>
                            {section name=LE loop=$CLI}
                            <option value="{$CLI[LE][0]}">{$CLI[LE][1]}</option>
                            {/section}
                        </select>
                    </div>


                </div>
                <div class="row hide">

                    <div class="input-field col s6 m6">
                        <select id="vsucursales" type="select"></select>
                        <label for="vsucursales">Sucursales</label>
                    </div>
                </div>

                <div class="row" style="margin: 0;padding: 0">
                    <div class="col s12 m4">
                        <div class="input-field">
                            <i class="mdi mdi-24px mdi-magnify prefix"></i>
                            <input type="text" id="scabys" autocomplete="off">
                            <label for="scabys">Buscar Código CABYS</label>
                        </div>

                        <div style="border: 1px solid #e2e2e2;max-height: 150px; overflow: auto;font-size: 16px" id="lcabys"></div>

                        <div class="input-field">
                            <input type="text" id="vcabys" maxlength="13" class="eder" autocomplete="off">
                            <label for="vcabys">Codigo Cabys</label>
                        </div>

                        <label id="ncabys"></label>
                    </div>

                    <div class="input-field col s12 m5 precio" >

                        <span class="prefix moneda"></span>
                        <input id="vprecio" type="text" class="eder" value="0" autocomplete="off">
                        <label for="vprecio">Precio</label>

                    </div>
                    <div class="col s12 m3 input-field">
                        <select id="vidmoneda" type="select" style="margin: 0;padding: 0" noClear="1">
                          {section name="LE" loop=$MON}
                            <option value="{$MON[LE][0]}" dv="{$MON[LE][2]}">{$MON[LE][1]} {if $smarty.section.LE.index neq 0} ({$MON[0][3]} {$MON[LE][2]}) {/if}</option>
                          {/section}
                        </select>
                        <label for="vidmoneda">Moneda</label>
                    </div>
                </div>
                <br>
            </div>
            
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action waves-effect waves-green btn-flat add" id="addserv" modulo="servicio">Agregar</a>
        <a class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
    </div>
</div>

<div id="modal-servcliente" class="modal">
    <div class="modal-header center head4" style="padding: 1%">
        Clientes por Servicio
    </div>
    <div class="modal-content grandemodal center">
       <div class="row" style="margin: 0; padding: 0;">
                    <div class="col s12 m12">
                        <div class="row" style="margin: 0">
                            <div class="col s12 m12 l3">
                                <input type="checkbox" id="isPeriodo" value="0">
                                <label for="isPeriodo">Por Periodo</label>

                                <input type="hidden" id="vperiodo" value="0">
                            </div>

                            <div class="col s6 l2 opPeriodo">
                                <br>
                                <input type="radio" class="with-gap cper" id="diario" valor="1" name="speriodo" disabled>
                                <label for="diario">Diario</label>
                            </div>
                            <div class="col s6 l2 opPeriodo">
                                <br>
                                <input type="radio" class="with-gap cper" id="mensual" valor="2" name="speriodo" disabled>
                                <label for="mensual">Mensual</label>
                            </div>
                            <div class="col s6 l2 opPeriodo">
                                <br>
                                <input type="radio" class="with-gap cper" id="anual" valor="3" name="speriodo" disabled>
                                <label for="anual">Anual</label>
                            </div>
                            <div class="col s6 l2 opPeriodo" id="dotros">
                                <br>
                                <input type="radio" class="with-gap cper" id="otros" valor="4" name="speriodo" disabled>
                                <label for="otros">Otros:</label>
                                <input type="hidden" id="botro" value="0">
                            </div>
                            <div class="input-field col s6 m3 hide" id="dhotro">
                                <input id="vdias" type="number" class="validate" min="1" value="0">
                                <label for="vdias">Período en Días</label>
                            </div>
                        </div><br>
                    </div>
                </div>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
    </div>
  </div>

<div id="hextra" class="modal">
    <div class="modal-header center head4" style="padding: 1%">
        Extra en el Nombre del Servicio
    </div>
    <div class="modal-content grandemodal center">
      <p>Se Utiliza para asignar variables cuando el servicio es facturado: </p>
      <table class="striped" align="center">
            <thead>
                <tr>
                    <th>Variable</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>%HOY%</b></td>
                    <td>Despliega la Fecha del Día en Formato dd-mm-yyyy</td>
                </tr>
                <tr>
                    <td><b>%ANO%</b></td>
                    <td>Despliega el Año</td>
                </tr>
                <tr>
                    <td><b>%MES%</b></td>
                    <td>Despliega el Mes</td>
                </tr>
                <tr>
                    <td><b>%DIA%</b></td>
                    <td>Despliega el Día</td>
                </tr>
            </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
    </div>
  </div>