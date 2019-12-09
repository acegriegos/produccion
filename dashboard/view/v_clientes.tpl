<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title class="cghs"> </title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-clientes.css?v=10.2.0.43">
  </head>
  <!-- #0B3861 -->
  <body>
    {$NAV}

    <div class="bdy pequeño">
      <div class="card z-depth-5 pequeño">
        <div class="card-header center white-text head1">
          <p class="flow-text cghs" style="font-size: 1.9em;"></p>
        </div>
        <div class="card-content pequeño">
          <div class="row">
            <div class="input-field col s10 m6 l6">
              <a class="prefix dropdown-button tooltipped pbtn"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="mdi mdi-magnify mdi-24px"></i></a>
              <ul id='filtr_1' class='dropdown-content'>
                <li><a class="optns" tipo="nombre,vcedula" href="#!" fltr="1">Nombre o Cédula</a></li>
                <li><a class="optns" tipo="telefonos" href="#!" fltr="3">Teléfono</a></li>
              </ul>
              <input type="text" id="search_clientes" maxlength="100" num="v76" var="0,1" cambio="29" autocomplete="off">
              <label class="truncate" for="search_clientes">Buscar <span class="cgh"></span> por Nombre o Cédula</label>

             
            </div>
            <div class="col s2 m6 ">
              <a id="ingClie" class="der per1001 btn-floating btn2 tooltipped modal-trigger z-depth-2" data-position="left" data-tooltip="Ingresar" href="#modal-clientes"><i class="mdi mdi-plus mdi-24px "></i></a>
            </div>
          </div>
          <div class="card-block">
            <table  class="table centered striped bordered highlight z-depth-3 pequeño dt-responsive nowrap" id="data-table-clientes" cellspacing="0" width="100%" style="width: 100%">
              <thead>
                <tr>
                  <th class="sinborde white-text tab1"><b>Cédula</b></th>
                  <th class="sinborde white-text tab1">Nombre</th>
                  <th class="sinborde white-text tab1">Teléfonos</th>
                  <th class="sinborde white-text tab1">Correo</th>
                  <th class="sinborde white-text tab1">Tipo</th>
                  <th class="sinborde white-text tab1">Acciones</th>
                </tr>
              </thead>
              <tbody id="listaclientes">
                {section name=LE loop=$CLIE}
                <tr id="f{$CLIE[LE][0]}">
                  <td style=" padding: 0px !important;color:black">{$CLIE[LE][1]}</td>
                  <td style=" padding: 0px !important;color:black">{$CLIE[LE][2]}</td>
                  <!-- <td style=" padding: 10px;color:black">{$CLIE[LE][18]}</td> -->
                  <td style=" padding: 0px !important;color:black">{$CLIE[LE][4]}</td>
                  <td style=" padding: 0px !important;color:black">{$CLIE[LE][5]}</td>
                  <td style=" padding: 0px !important;color:black">{$CLIE[LE][6]}</td>
                  <td>
                    <a href="#modal-addvehiculos" class="modal-trigger hide" style="color:black" title="Vehículos"><i class="car mdi mdi-car pbtn mdi-24px" id="v{$CLIE[LE][0]}"></i></a>
                    {if $CLIE[LE][13] neq 1}
                    <a href="modal-contactos" class="hide modal-trigger" style="color:black" title="Contactos"><i class="contact mdi-contacts pbtn" id="c{$CLIE[LE][0]}"></i></a>
                    {/if}
                    <a href="#modal-clientes" class="load mdi mdi-pencil mdi-24px pbtn per1002 modal-trigger" id="m{$CLIE[LE][0]}" modulo="cliente" style="color:black"></a>
                    <a href="#" class="delete mdi mdi-close mdi-24px pbtn per1003" modulo="cliente" id="d{$CLIE[LE][0]}" style="color:black"></a>
                  </td>
                </tr>
                {/section}
              </tbody>
            </table>
            <ul class="left showing" modulo="76"><small></small></ul>
            <ul class="pagination right" vtbl="76" modulo="clientes" cambio="29"></ul>
          <br>
          <br>
        </div>
<section id="fclientes">
        <div class="modal modal-fixed-footer grandemodal" id="modal-clientes" style="height: 100%; width: 75%">
          <div class="modal-header">
            <ul class="tabs tabs-fixed-width head3 center">
              <h5 class="center">Datos Informativos</h5>
            </ul>
            </div>
            <div class="modal-content " style="padding: 0px;">
                <input type="hidden" class="zelda">
                <div class="row">
                  <br>
                  <div class="col s12">
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
                      <div class="row ">
                        <div class="input-field col s12 m6 l6 pequeño">
                          <label id="nomClie" for="vnombre">Razón Social</label>
                          <input type="text" class="validate onblur" id="vnombre" autocomplete="off">
                          <input type="hidden" id="vid" value="0">
                          <input type="hidden" id="vidsucursal" value="">
                        </div>
                        <div class="input-field col s12 m6 l4">
                          <label for="vcedula">Cédula del <span class="cgh">Cliente</span></label>
                          <input type="text" class="validate onblur" id="vcedula" autocomplete="off">
                        </div>
                        <div class="input-field col s12 m6 l4">
                          <label for="vcodigo">Código del <span class="cgh">Cliente</span></label>
                          <input type="text" class="validate onblur" id="vcodigo" autocomplete="off">
                        </div>
                        <div class="input-field col s12 m6 l4">
                          <label for="vweb">Nombre Fantasía</label>
                          <input type="text" class="validate onblur" id="vweb" autocomplete="off">
                        </div>

                        <div class="input-field col s12 m6 l4 ncliente">

                          <select type="select" id="vidmoneda" noClear="1">
                            {section name=LE loop=$MON}
                              <option value="{$MON[LE][0]}">{$MON[LE][1]}</option>
                            {/section}
                          </select>
                          <label for="vidmoneda">Moneda</label>
                        </div>
                          
                        <div class="input-field col s12 m6 l4 ncliente">
                          <select type="select" id="vidagente"> 
                          <option value="0">Seleccione un Agente</option>
                          {section name=LE loop=$AGE}
                            <option value="{$AGE[LE][0]}">{$AGE[LE][1]}</option>
                          {/section}                   
                          </select>
                          <label for="vidagente">Agente</label>
                        </div>

                        <div class="input-field ncliente col s12 m6 l4 {if $smarty.session.BUSS eq 1} hide {/if}">
                          <select type="select" id="vidnivel">
                            <option value="0">Seleccione una Categoría</option>
                            {section name=LE loop=$NVLCLIE}
                            <option value="{$NVLCLIE[LE][0]}">{$NVLCLIE[LE][1]}</option>
                            {/section}
                          </select>
                          <label for="vidnivel">Categoría del Cliente</label>
                        </div>

                        <div class="input-field col s12 ncliente">
                          <input type="text" id="vmensaje">
                          <label for="vmensaje">Mensaje Adicional</label>
                        </div>

                      </div>

                      <h6><b>Más Opciones</b></h6>
                      <div class="row center">


                        <a href="#" data-activates="slide-tc" data-num="1" class="col s1 mdi mdi-phone tooltipped mdi-24px button-collapse tc-show  black-text" data-tooltip="Administrar Teléfonos" data-position="bottom" id="slideTelefono" hasTabla="1" tp="6" vtabla="telefono" slide-id="0" slide-tbl="2" asave="0"></a>
                        <input type="hidden" id="vtelefono">
                        
                        <a href="#" data-activates="slide-tc" data-num="2" id="slideCorreo" class="col s1 button-collapse tc-show tooltipped black-text" data-tooltip="Administrar Correos" data-position="bottom" hasTabla="1" tp="6" vtabla="correo" slide-id="0" slide-tbl="2" asave="0"><i class="mdi mdi-email  mdi-24px"></i></a>

                        <a href="#" data-activates="slide-tc" id="slideDireccion" data-num="3" class="col s1 button-collapse tooltipped tc-show black-text" data-tooltip="Administrar Ubicacion" data-position="bottom" hasTabla="1" tp="6" vtabla="ubicacione" slide-id="0" slide-tbl="2" asave="0"><i class="mdi mdi-map-marker  mdi-24px"></i></a>

                        <a href="#" data-activates="slide-cliente" class="col s1 button-collapse tooltipped black-text s-cliente" data-tooltip="Administrar Parámetros" slide-id="0" data-position="bottom" num="1"><i class="mdi mdi-square-inc-cash mdi-24px"></i></a>

                        <a href="#" data-activates="slide-cliente" class="col s1 ncliente button-collapse tooltipped black-text s-cliente" slide-id="0" data-tooltip="Administrar Exoneración" data-position="bottom" num="2"><i class="mdi mdi-clipboard-text mdi-24px"></i></a>

                        <a href="#" data-activates="slide-cliente" class="col s1 ncliente button-collapse tooltipped black-text s-cliente" slide-id="0" data-tooltip="Administrar XML Otros" data-position="bottom" num="3"><i class="mdi mdi-file-xml mdi-24px"></i></a>

                        <a href="#" data-activates="slide-cliente" class="col s1 button-collapse tooltipped black-text s-cliente" slide-id="0" data-tooltip="Administrar Contactos" data-position="bottom" num="4"><i class="mdi mdi-account-multiple mdi-24px"></i></a>

                      </div>
                </div>
          </div>
        </div>
      <div class="modal-footer">
        <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        <button type="button" class="waves-effect waves-green btn-flat add" id="agClie" modulo="cliente" varias="1" >Guardar</button>
      </div>
    </div>
  </div>

    <ul id="slide-cliente" class="side-nav" style="z-index:1500;"><li><div class="user-view center"><span class="ntitc"></span></a></div></li><li><div class="divider"></div></li><li>

          <div class="subclie row" id="financiero">
            <div class="col s12">
                <div class="switch" align="center">
                  <label>
                    Contado
                    <input type="checkbox" tp="1" name="tipocliente" id="tipocliente" class="per1004">
                    <span class="lever"></span>
                    Crédito
                  </label>
                </div>
            </div>

            <div class="input-field col s12 ncliente">
              <div class="prefix"><i class="mdi-calendar mdi mdi-24px"></i></div>
              <input type="number" class="eder center" id="vdproforma" value="0" autocomplete="off">
              <label for="vdproforma">Días Validez Proforma</label>
            </div>
           
            <div class="input-field col s12 ncliente {if $smarty.session.BUSS eq 1} hide {/if}">
              <div class="prefix"><img src="../assets/img/icon/percent.svg"></div>
              <input type="number" class="eder center" id="vdescuentom" value="0" autocomplete="off">
              <label for="vdescuentom">Descuento Máximo</label>
            </div>

            <div class="input-field col s12 cre hide">
              <div class="prefix"><i class="mdi-calendar-question mdi mdi-24px"></i></div>
              <label for="vplazo">Plazo en Días</label>
              <input type="number" class="eder per1004" id="vplazo" value="0" autocomplete="off">
            </div>
            <div class="input-field col s12 cre hide">
              <div class="prefix"><i class="mdi mdi-24px mdi-credit-card-plus"></i></div>
              <label for="vcredito">Máximo Crédito</label>
              <input type="number" class="eder per1004" id="vcredito" value="0" autocomplete="off">
            </div>

          </div>

          <div class="subclie row" id="xmlotros">
            <div class="input-field col s5">
              <input type="text" class="eder" id="xo-etiqueta">
              <label for="xo-etiqueta">Etiqueta</label>
            </div>

            <div class="input-field col s5">
              <input type="text" class="eder" id="xo-valor">
              <label for="xo-valor">Valor</label>
            </div>

            <div class="col s2">
              <i class="mdi mdi-plus mdi-24px" id="addxo"></i>
            </div>
            

            <table>
              <thead>
                <tr>
                  <td>ETIQUETA</td>
                  <td>VALOR</td>
                  <td></td>
                </tr>
              </thead>
              <tbody id="xo-lista"></tbody>
            </table>

          </div>

          <div class="subclie row" id="exoneracion">
            <div class="col s12 input-field">
                  <input type="hidden" id="videxoneracion" value="0">
                  <select id="vtipodoc" class="validate tooltiped" type="select">
                    <option value="0" class="disabled">Tipo de Documento</option>
                    {section name=LE loop=$EXOS}
                    <option value="{$EXOS[LE][0]}">{$EXOS[LE][1]}</option>
                    {/section}
                  </select>
                </div>

                <div class="col s12 input-field">
                  <input type="text" id="vnumdoc" maxlength="40" data-position="bottom" data-tooltip="Número de documento de exoneración o autorización" class="validate tooltiped" autocomplete="off">
                  <label for="vnumdoc">Número de Documento</label>
                </div>

                <div class="col s12 input-field">
                  <input type="text" id="ventidad" maxlength="160" data-position="bottom" data-tooltip="Nombre de la institución o dependencia que emitió la exoneración" class="validate tooltiped" autocomplete="off">
                  <label for="ventidad">Nombre Institución que Emitió la Exoneración</label>
                </div>

                  <label class="col s12">Fecha y Hora de Emisión</label>

                  <div class="col s8">
                    <input type="date" id="vfechaDoc" class="validate tooltiped">
                  </div>

                  <div class="col s4 input-field">
                    <input type="time" id="vtimeDoc" class="validate tooltiped" step="1">
                  </div>

                <div class="col s12 input-field">
                  <input type="text" id="vporcompra" maxlength="3" data-position="bottom" data-tooltip="Porcentaje de la compra autorizada o exonerada" class="validate tooltiped eder" isnumeric="1" value="0" autocomplete="off" maxlength="3">
                  <label for="vporcompra">Porcentaje de Exoneración</label>
                </div>

                <label class="col s12">Fecha Fin</label>

                  <div class="col s8">
                    <input type="date" id="vfechafin" class="validate tooltiped">
                  </div>

          </div>

          <div class="subclie row" id="contactos">
          </div>

          <a class="btn btn-default" id="eslidec" style="bottom:42px;position:absolute;">Salir</a></li></ul>
</section>
</div>
</div>
<div id="modal-addvehiculos" class="modal modal-fixed-footer">
<div class="modal-header">
  <ul class="tabs white-text bgcardhead">
    <li class="tab col s3"><a class="white-text">Agregar Vehículo</a></li>
  </ul>
</div>
<div class="modal-content" id="ftaller-vehiculos">
  <div class="row">
    <div class="input-field col s6 m6 l6">
      <input type="text" id="vplaca" class="validate" autocomplete="off">
      <input type="hidden" id="vid" value="0">
      <input type="hidden" id="vidcliente" value="0">
      <label for="vplaca">Placa</label>
    </div>
    <div class="input-field col s6 m6 l6">
      <input type="text" id="vvin" class="validate" autocomplete="off">
      <label for="vvin">VIN</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s6 m6 l6">
      <select type="select" id="vidmarca">
        <option value="">Seleccione una marca</option>
      </select>
    </div>
    <div class="input-field col s6 m6 l6">
      <select type="select" id="vidmodelo">
        <option value="">Seleccione un modelo</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="col s6 m6 l6">
    <select type="select" id="vidtipo"></select>
  </div>
  <div class="input-field col s6 m6 l6">
    <input type="text" id="vyear" class="validate" autocomplete="off">
    <label for="vyear">Año</label>
  </div>
</div>
<div class="row">
  <div class="col s12 m12 l12">
    <a class="btn waves-effect waves-light blue add right" modulo="taller-vehiculo">Agregar</a>
  </div>
</div>
<hr>
<div class="row">
  <div class="col s12 m12 l12">
    <table class="table dt-responsive nowrap centered striped bordered highlight z-depth-5 pequeño" id="data-table-vehiculos" cellspacing="0" width="100%" >
      <thead>
        <tr>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Placa</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">VIN</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Tipo</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 18%;">Acciones</th>
        </tr>
      </thead>
      <tbody id="listavehiculos">
      </tbody>
    </table><br>
  </div>
</div>
</div>
<div class="modal-footer ">
<!-- <a class="modal-action waves-effect waves-green btn-flat z-depth-5 edit">Agregar</a>
<a class="modal-action waves-effect waves-green btn-flat z-depth-5 add hide">Guardar</a> -->
<a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
</div>
</div>

{$SCR}
<script src="../assets/js/modulos/clientes.js?v=10.2.0.43"></script>
</body>
</html>