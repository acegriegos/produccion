<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title class="cghs"> </title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-clientes.css?v=10.4.1.0">
  </head>
  <!-- #0B3861 -->
  <body>
    {$NAV}

    <div class="bdy pequeño">
      <div class="card z-depth-5 pequeño">
        <div class="card-header center white-text head1">
          <p class="flow-text" style="font-size: 1.9em;"> <span class="cghs"></span> <span class="hide-on-med-and-down" id="loadMyBussiness" impresa="{$smarty.session.IMPRESA}"></span></p>
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
              <a id="ingClie" class="der per1001_ btn-floating btn2 tooltipped modal-trigger z-depth-2" data-position="left" data-tooltip="Ingresar" href="#modal-clientes"><i class="mdi mdi-plus mdi-24px "></i></a>
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
                  <th class="sinborde white-text tab1">Saldo</th>
                  <th class="sinborde white-text tab1">Acciones</th>
                </tr>
              </thead>
              <tbody id="listaclientes">
              </tbody>
            </table>
            <ul class="left showing" modulo="76"><small></small></ul>
            <ul class="pagination right" vtbl="76" modulo="clientes" cambio="29"></ul>
          <br>
          <br>
        </div>
<section id="fclientes">
        <div class="modal modal-fixed-footer grandemodal" id="modal-clientes" style="height: 90%; width: 75%">
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
                        <div class="col s6 m3 l2">
                          <p>
                            <input class="with-gap" name="tipoclie" type="radio" id="cextranjero" tipoClie="0" />
                            <label for="cextranjero">Extranjero</label>
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

                        <div class="input-field col s12 m6 l4 vapellido1">
                          
                          <select id="vapellido1" type="select">
                            <option value="1">Compra</option>
                            <option value="2">Gasto</option>
                          </select>
                          <label for="vapellido1">Tipo Proveedor</label>
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

                        <div class="input-field ncliente col s12 m6 l4 hide">
                          <select type="select" id="vidnivel">
                            <option value="0">Seleccione una Categoría</option>
                            {section name=LE loop=$NVLCLIE}
                            <option value="{$NVLCLIE[LE][0]}">{$NVLCLIE[LE][1]}</option>
                            {/section}
                          </select>
                          <label for="vidnivel">Categoría del Cliente</label>
                        </div>

                        <div class="input-field ncliente col s12 m6 l4 hide">
                          <select type="select" id="videstado">
                            <option value="0">Seleccione un Estado</option>
                            {section name=LE loop=$ESTCLIE}
                            <option value="{$ESTCLIE[LE][0]}" {if $ESTCLIE[LE][0] eq 1} selected {/if}>{$ESTCLIE[LE][1]}</option>
                            {/section}
                          </select>
                          <label for="videstado">Estado del Cliente</label>
                        </div>

                        <div class="input-field col s12 ncliente hide">
                          <input type="text" id="vmensaje">
                          <label for="vmensaje">Mensaje Adicional</label>
                        </div>

                        <div class="chips chips-autocomplete col s12 chips-hassh hide"></div>

                      </div>

                      <h6><b>Más Opciones</b></h6>
                      <div class="row center">


                        <a href="#" data-activates="slide-tc" data-num="1" class="col s3 m2 mdi mdi-phone tooltipped mdi-24px button-collapse tc-show  black-text" data-tooltip="Administrar Teléfonos" data-position="bottom" id="slideTelefono" hasTabla="1" tp="6" vtabla="telefono" slide-id="0" style="text-align: left;" slide-tbl="2" asave="0">Teléfonos</a>
                        <input type="hidden" id="vtelefono">
                        
                        <a href="#" data-activates="slide-tc" data-num="2" id="slideCorreo" class="col s3 m2 button-collapse tc-show tooltipped black-text" data-tooltip="Administrar Correos" data-position="bottom" hasTabla="1" tp="6" vtabla="correo" slide-id="0" style="text-align: left;" slide-tbl="2" asave="0"><i class="mdi mdi-email  mdi-24px" style="margin-right: 3px;"></i>Correos</a>

                        <a href="#" data-activates="slide-tc" id="slideDireccion" data-num="3" class="col s3 m2 button-collapse tooltipped tc-show black-text" data-tooltip="Administrar Ubicacion" data-position="bottom" hasTabla="1" tp="6" vtabla="ubicacione" slide-id="0" style="text-align: left;" slide-tbl="2" asave="0"><i class="mdi mdi-map-marker  mdi-24px" style="margin-right: 3px;"></i>Ubicaciones</a>

                        <a href="#" data-activates="slide-cliente" class="col s3 m21 button-collapse tooltipped black-text s-cliente" data-tooltip="Administrar Parámetros" slide-id="0" style="text-align: left;" data-position="bottom" num="1"><i class="mdi mdi-currency-usd mdi-24px" style="margin-right: 3px;"></i>Financiero</a>

                        <a href="#" data-activates="slide-cliente" class="col s3 m2 ncliente button-collapse tooltipped black-text s-cliente" slide-id="0" style="text-align: left;" data-tooltip="Administrar Exoneración" data-position="bottom" num="2"><i class="mdi mdi-clipboard-text mdi-24px" style="margin-right: 3px;"></i>Exoneraciones</a>

                        <a href="#" data-activates="slide-cliente" class="col s3 m2 ncliente button-collapse tooltipped black-text s-cliente" slide-id="0" style="text-align: left;" data-tooltip="Administrar XML Otros" data-position="bottom" num="3"><i class="mdi mdi-xml mdi-24px" style="margin-right: 3px;"></i>XML Otros</a>

                        <a href="#" data-activates="slide-cliente" class="col s3 m2 button-collapse tooltipped black-text s-cliente" slide-id="0" style="text-align: left;" data-tooltip="Administrar Contactos" data-position="bottom" num="4"><i class="mdi mdi-account-multiple mdi-24px" style="margin-right: 3px"></i>Contactos</a>

                        <a href="#" data-activates="slide-cliente" class="hide per1004 col s3 m2 button-collapse tooltipped black-text s-cliente" slide-id="0" style="text-align: left;" data-tooltip="Administrar Servicios" data-position="bottom" num="5"><i class="mdi mdi-account-details mdi-24px" style="margin-right: 3px;"></i>Servicios</a>

                      </div>
                </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        <button type="button" class="waves-effect waves-green btn-flat add" id="agClie" modulo="cliente" varias="1" >Guardar</button>
      </div>
   
  </div>

    <ul id="slide-cliente" class="side-nav" style="z-index:1500;"><li><div class="user-view center"><span class="ntitc"></span></a></div></li><li><div class="divider"></div></li><li>

          <div class="subclie row" id="financiero">
            <div class="col s12 per1005 hide">
                <div class="switch" align="center">
                  <label>
                    Contado
                    <input type="checkbox" tp="1" name="tipocliente" id="tipocliente">
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
           
            <div class="input-field col s12 ncliente">
              <div class="prefix"><img src="../assets/img/icon/percent.svg"></div>
              <input type="number" class="eder center" id="vdescuentom" value="0" autocomplete="off">
              <label for="vdescuentom">Descuento Máximo</label>
            </div>

            <div class="col s12 input-field">
              <div class="prefix"><img src="../assets/img/icon/percent.svg"></div>
              <label for="vprima">Prima Apartado</label>
              <input type="text" class="validate eder" id="vprima" autocomplete="off">
            </div>

            <div class="input-field col s12 cre hide">
              <div class="prefix"><i class="mdi-calendar-question mdi mdi-24px"></i></div>
              <label for="vplazo">Plazo en Días</label>
              <input type="number" class="eder" id="vplazo" value="0" autocomplete="off">
            </div>
            <div class="input-field col s12 cre hide">
              <div class="prefix"><i class="mdi mdi-24px mdi-credit-card-plus"></i></div>
              <label for="vcredito">Máximo Crédito</label>
              <input type="number" class="eder " id="vcredito" value="0" autocomplete="off">
            </div>

          </div>

          <div class="subclie row" id="xmlotros">
            <div class="input-field col s6">
              <input type="text" id="xo-etiqueta">
              <label for="xo-etiqueta">Etiqueta</label>
            </div>

            <div class="input-field col s6">
              <input type="text" id="xo-valor">
              <label for="xo-valor">Valor</label>
            </div>

            <div class="col s12">
              <input type="checkbox" id="xo-factura">
              <label for="xo-factura">Solicitar en Factura</label>
              
              <i class="mdi mdi-plus mdi-24px der" accion="1" style="cursor: pointer;" id="addxo"></i>
            </div>

            <table>
              <thead>
                <tr>
                  <th style="padding: 0px">ETIQUETA</th>
                  <th style="padding: 0px">VALOR</th>
                  <th style="padding: 0px"></td>
                </tr>
              </thead>
              <tbody id="xo-lista"></tbody>
            </table>

          </div>

          <div class="subclie" id="exoneracion">
            <i class="mdi mdi-plus der pbtn" id="addnexo" title="Agregar Exoneración" ></i> <br>
            <table cellspacing="0" cellpadding="0" class="tbl striped">
              <thead>
                <tr style="border-bottom: 1px solid black;"><th style="padding: 0px;">Documento</th><th style="padding: 0px;">Porcentaje</th><th style="padding: 0px;">Fecha Fin</th></tr>
              </thead>
              <tbody id="exolist"></tbody>
            </table>
          </div>

          <div class="subclie row" id="contactos">
            <i class="mdi mdi-plus der pbtn" id="addncont" title="Agregar Contacto" ></i> <br>

            <section id="cntlist">
              <div class="row">
                <div class="col s12 blue-grey darken-1 white-text">
                  <span class="myfont">CARLOS ANDRES MIRANDA CASTRO</span> <i class="der red-text mdi mdi-24px mdi-delete"></i> <i class="der mdi mdi-24px mdi-pencil"></i>
                  <i class="prefix mdi mdi-24px mdi-email"></i>
                  <label style="color: #F58345 !important;">a.miranda8911@gmail.com</label>
                  <br>
                  <i class="prefix mdi mdi-24px mdi-phone"></i>
                  <label style="color: #F58345 !important;">6105-6852</label>
                </div>
              </div>
            </section>

          </div>

          <div class="subclie row" id="servicios">
            <i class="mdi mdi-plus der pbtn" id="addnserv" title="Agregar Servicio" ></i> <br>
            <table cellspacing="0" cellpadding="0" class="tbl striped" style="font-size: 12px;line-height: 15px;">
              <thead>
                <tr>
                  <th style="padding: 0px;" colspan="100%">Servicio</th>
                </tr>
                <tr style="border-bottom: 1px solid black;">
                  <th style="padding: 0px;">Monto</th>
                  <th style="padding: 0px;">Tipo</th>
                  <th style="padding: 0px;">Pago</th>
                  <th style="padding: 0px;">Corte</th>
                </tr>
              </thead>
              <tbody id="servlist"></tbody>
            </table>
          </div>

          <a class="btn btn-default" id="eslidec" style="bottom:0px;position:absolute;margin:0px;margin-bottom: 50px;">Salir</a></li></ul>
</section>
</div>
</div>
        
        <div class="modal modal-fixed-footer grandemodal" id="modal-addcnt" style="z-index: 2000 !important;">
          <div class="modal-header">
            <ul class="tabs tabs-fixed-width head3 center">
              <h5 class="center">Contacto</h5>
            </ul>
            </div>
            <div class="modal-content row" style="margin:0px;">
                
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
                <button type="button" class="waves-effect waves-green btn-flat" id="addcnt">Guardar</button>
            </div>
        </div>

        <div class="modal modal-fixed-footer grandemodal" id="modal-addexo" style="z-index: 2000 !important;">
          <div class="modal-header">
            <ul class="tabs tabs-fixed-width head3 center">
              <h5 class="center">Exoneración</h5>
            </ul>
            </div>
            <div class="modal-content row" style="margin:0px;">
                <div class="col s6 input-field">
                  <input type="hidden" id="videxoneracion" value="0">
                  <select id="vtipodoc" class="tooltiped" type="select">
                    <option value="0">Tipo de Documento</option>
                    <!-- <option value="-1">Disminución por Ley</option> -->
                    {section name=LE loop=$EXOS}
                    <option value="{$EXOS[LE][0]}">{$EXOS[LE][1]}</option>
                    {/section}
                  </select>
                </div>

                <div class="col s6 input-field">
                  <input type="text" id="vnumdoc" maxlength="40" data-position="bottom" data-tooltip="Número de documento de exoneración o autorización" class=" tooltiped" autocomplete="off">
                  <label for="vnumdoc">Número de Documento</label>
                </div>

                <div class="col s12 input-field">
                  <select type="select" id="ventidad"></select>
                  <label for="ventidad">Nombre Institución que Emitió la Exoneración</label>
                </div>

                  <label class="col s12">Fecha y Hora de Emisión</label>

                  <div class="col s6">
                    <input type="date" id="vfechaDoc" class="tooltiped">
                  </div>

                  <div class="col s6 input-field">
                    <input type="time" id="vtimeDoc" class="tooltiped" step="1">
                  </div>

                  <div class="col s6 carti input-field">
                    <input type="number" id="varticulo" maxlength="6" data-position="bottom" data-tooltip="Número de artículo que establece la exoneración o autorización" class="tooltiped eder" value="0" autocomplete="off">
                    <label for="varticulo">Número de artículo</label>
                  </div>

                  <div class="col s6 carti input-field">
                    <input type="number" id="vinciso" maxlength="6" data-position="bottom" data-tooltip="Número de inciso que establece la exoneración o autorización" class="tooltiped eder" value="0" autocomplete="off">
                    <label for="vinciso">Número de inciso</label>
                  </div>

                <div class="col s6 input-field">
                  <input type="text" id="vporcompra" maxlength="3" data-position="bottom" data-tooltip="Porcentaje de la compra autorizada o exonerada" class=" tooltiped eder" isnumeric="1" value="0" autocomplete="off" maxlength="3">
                  <label for="vporcompra">Porcentaje de Exoneración</label>
                </div>                

                <div class="col s6 input-field">
                  <label for="vfechafin" class="active">Fecha Fin</label>
                  <input type="date" id="vfechafin" class="tooltiped">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
                <button type="button" class="waves-effect waves-green btn-flat" id="addexo">Guardar</button>
            </div>
        </div>

         <div id="modal-addserv" class="modal modal-fixed-footer mymodal" style="z-index: 2000 !important;">
          <div class="modal-header"> <h4 class="center">Servicios</h4>  </div>
          <div class="modal-content row" id="f-servicios">
            
            <div class="col s6 input-field">
              <select id="s_list">
                {section name=LE loop=$SERV}
                  <option value="{$SERV[LE][0]}" valor="{$SERV[LE][2]}" moneda="{$SERV[LE][3]}">{$SERV[LE][1]}</option>
                {/section}
              </select>
              <label for="s_list">Servicio</label>
            </div>
            
            <div class="col s3 input-field">
              <select id="s_moneda">
                {section name=LE loop=$MON}
                  <option value="{$MON[LE][0]}" dv="{$MON[LE][2]}">{$MON[LE][1]}</option>
                {/section}
              </select>
              <label for="s_moneda">Monto</label>
            </div>

            <div class="col s3 input-field">
              <input type="text" class="numeric eder" id="s_monto" value="0.00">
              <label for="s_monto">Monto</label>
            </div>

            <div class="col s12 input-field">
              <input type="date" id="s_fecha" class="datepicker">
              <label for="s_fecha" class="active">Fecha Inicio de Servicio</label>
            </div>

            <div class="col s6 input-field">
              <select id="s_pago">{$LISTA_DIAS}</select>
              <label for="s_pago">Día de Pago</label>
            </div>

            <div class="col s6 input-field">
              <select id="s_corte">{$LISTA_DIAS}</select>
              <label for="s_corte">Día de Corte</label>
            </div>

            <div class="col s6 input-field">
              <select id="s_factura">
                <option value="1">Electrónica</option>
                <option value="8">Especial</option>
              </select>
              <label for="s_factura">Tipo Factura</label>
            </div>

            <div class="col s6 input-field">
              <select id="s_tipo">
                {section name=LE loop=$CICLOS}
                  <option value="{$CICLOS[LE][0]}">{$CICLOS[LE][1]}</option>
                {/section}
              </select>
              <label for="s_tipo">Ciclo</label>
            </div>

            <div class="col s6">
              <input type="checkbox" id="este_mes">
              <label for="este_mes">Cobrar este Mes</label>
            </div>

            <div class="col s3 input-field hide s_vf">
              <input type="date" id="s_desde">
              <label for="s_desde" class="active">Desde</label>
            </div>

            <div class="col s3 input-field hide s_vf">
              <input type="date" id="s_hasta">
              <label for="s_hasta" class="active">Hasta</label>
            </div>

          </div>
          <div class="modal-footer" style="padding-bottom: 55px;">
            <a class="waves-effect waves-blue btn-flat" id="getLegal">Descargar Contrato</a>
            <a href="#!" class="modal-action waves-effect waves-green btn-flat" id="addserv">Aceptar</a>
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
      <input type="text" id="vplaca" autocomplete="off">
      <input type="hidden" id="vid" value="0">
      <input type="hidden" id="vidcliente" value="0">
      <label for="vplaca">Placa</label>
    </div>
    <div class="input-field col s6 m6 l6">
      <input type="text" id="vvin" autocomplete="off">
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
    <input type="text" id="vyear" autocomplete="off">
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
<script src="../assets/js/modulos/clientes.js?v=10.4.1.0"></script>
</body>
</html>