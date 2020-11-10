<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Cache-Control" content="max-age=86400"/>
        <title>Taller</title>
        {$STY}
        <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-taller.css?v=mesero">
    </head>
    
    <body>
        {$NAV}
        <div class="bdy">
            <div class="card z-depth-5">
                <div class="card-header center head1">
                    <p class="flow-text">Taller {$smarty.session.EMPRESA}</p>
                </div>

                <div class="row">
                    <div class="input-field col s10 m6 l6">
                      <a class="prefix dropdown-button tooltipped pbtn"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="mdi mdi-magnify mdi-24px"></i></a>
                      <ul id='filtr_1' class='dropdown-content'>
                        <li><a class="optns" tipo="nombre,vcedula" href="#!" fltr="1">Nombre o Cédula</a></li>
                        <li><a class="optns" tipo="telefonos" href="#!" fltr="3">Número de Boleta</a></li>
                      </ul>
                      <input type="text" id="search_clientes" maxlength="100" num="506" var="0,1" autocomplete="off">
                      <label class="truncate" for="search_clientes">Buscar por <span class="cgh">Nombre o Cédula</span></label>

                     
                    </div>
                    <div class="col s2 m6 ">
                      <a id="ingBol" class="der btn-floating btn2 tooltipped modal-trigger z-depth-2 pluskey" data-position="left" data-tooltip="Boleta de Ingreso" href="#modal-boleta"><i class="mdi mdi-plus mdi-24px "></i></a>
                    </div>
                  </div>
                
                <table  class="table centered striped bordered highlight z-depth-3 pequeño dt-responsive nowrap" id="data-table-boletas" cellspacing="0" width="100%" style="width: 100%">
              <thead>
                <tr>
                  <th class="sinborde white-text tab1"><b>Boleta</b></th>
                  <th class="sinborde white-text tab1">Cliente</th>
                  <th class="sinborde white-text tab1">Teléfonos</th>
                  <th class="sinborde white-text tab1">Fecha</th>
                  <th class="sinborde white-text tab1">Duración Días</th>
                  <th class="sinborde white-text tab1">Acciones</th>
                </tr>
              </thead>
              <tbody id="listaboletas">
                
              </tbody>
            </table>
            <ul class="left showing" modulo="506"><small></small></ul>
            <ul class="pagination right" vtbl="506" modulo="taller.boletas"></ul>

                    <div class="modal modal-fixed-footer grandemodal" id="modal-boleta" style="width: 85% !important;">
                      <div class="modal-header center">
                        <ul class="tabs head3">
                          <h5 id="tit"></h5>
                        </ul>
                        </div>
                        <div class="modal-content">
                            <div class="row" style="padding: 0px;margin: 0px;">
                                <div class="col s4 bcliente input-field" style="position: relative;">
                                </div>

                                <div class="col s6 row" style="margin: 0;">
                                  <div class="col s6 input-field">
                                    <label for="vcomentario">Observaciones</label>
                                    <input type="text" id="vcomentario" maxlength="150" autocomplete="off">
                                  </div>

                                  <div class="col s6 input-field">
                                    <label for="vffin" class="active">Fecha Entrega</label>
                                    <input type="date" id="vffin" class="browser-default" style="border: 0;">
                                  </div>
                                </div>

                                <div class="col s2 eder">
                                    <b>BOLETA #</b><span style="color: red" id="cons"></span>
                                </div>
                            </div>
                            <br>
                            
                            <div class="row head2" style="padding: 0px;margin: 0px;">
                              <div class="col s3 center">
                                <span><b>ELEMENTO</b></span>
                              </div>

                              <div class="col s3 center">
                                <span><b>REPARACIONES</b></span>
                              </div>

                              <div class="col s3 center">
                                <span><b>DAÑOS EXTERNOS</b></span>
                              </div>

                              <div class="col s3 center">
                                <span><b>RUBROS</b></span>
                              </div>

                            </div>

                            <div class="row" style="padding: 0px;margin: 0px;border-left: 1px solid #e2e2e2;border-right: 1px solid #e2e2e2; border-bottom: 1px solid #e2e2e2">
                              <div class="col s3 center" style="position: relative;">
                                <a class="mdi mdi-16px mdi-plus text-green pbtn" id="ingElem" style="position: absolute;top:0px;right: 0px;border-radius: 100%;outline: none;padding-right: 15px; z-index: 180;cursor: pointer;max-width: 0px;" title="Agregar Elemento"></a>
                                <select id="belem" class="browser-default">
                                  
                                </select>
                                <ul id="listelm">
                                  
                                </ul>
                              </div>

                              <div class="col s3 center" style="border-left: 1px solid #e2e2e2;">
                                <input type="text" id="brep" maxlength="100" placeholder="---">
                                <ul id="listrep">
                                  
                                </ul>
                              </div>

                              <div class="col s3 center" style="border-left: 1px solid #e2e2e2;">
                                <input type="text" id="bext" maxlength="100" placeholder="---">
                                <ul id="listext">
                                  
                                </ul>
                              </div>

                              <div class="col s3 center" style="border-left: 1px solid #e2e2e2;">
                                <input type="text" id="brub" maxlength="100" placeholder="---">
                                <ul id="listrub">
                                  
                                </ul>
                              </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
                            <button type="button" class="waves-effect waves-green btn-flat" accion="1" id="addBol">Guardar</button>
                        </div>
                    </div>

                        <div class="modal modal-fixed-footer" id="modal-descr" style="width: 90%;">
                          <div class="modal-header center">
                          <ul class="tabs head3">
                            <h5>Agregar Descripción del Elemento</h5>
                          </ul>
                          </div>

                            <div class="modal-content" style="margin:0px;">

                              <div class="row">
                                <div class="col s4" style="margin-top: 1rem;">
                                  <div class="input-field" style="margin-top: 0;">
                                    <input type="text" id="det-elem-placa" maxlength="60" class="eder" tp="1">
                                    <label for="det-elem-placa">Placa</label>
                                  </div>

                                  <div class="input-field" style="margin-top: 0;">
                                    <input type="text" id="det-elem-cilindraje" maxlength="60" class="eder" tp="2">
                                    <label for="det-elem-cilindraje">Cilindraje</label>
                                  </div>

                                  <div class="input-field" style="margin-top: 0;">
                                    <input type="number" min="1690" max="2050" id="det-elem-ano" class="eder" tp="3">
                                    <label for="det-elem-ano">Año</label>
                                  </div>
                                </div>

                                <div class="col s4">

                                  <div class="input-field">
                                    <label for="det-elem-tipodemotor" tp="4" class="active">Tipo de Motor</label>
                                    <select id="det-elem-tipodemotor">
                                      <option value="5">Manual</option>
                                      <option value="6">Automatico</option>
                                    </select>
                                  </div>

                                  <div class="input-field-">
                                    <label for="det-elem-depuno" class="active">Marca</label>
                                    <select tp="7" id="det-elem-depuno" class="browser-default"></select>
                                  </div>

                                  <div class="input-field">
                                    <label for="det-elem-depdos" class="active">Modelo</label>
                                    <select tp="8" id="det-elem-depdos"></select>
                                  </div>
                                </div>

                                <div class="col s4"></div>
                          </div>


                              <div class="input-field center">
                                <label for="descrip">Descripción</label>
                                <input type="text" id="descrip" maxlength="100">
                              </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="waves-effect waves-green btn-flat" id="addDescr">Guardar</button>
                            </div>
                        </div>

            </div>
        </div> <!-- END BDY -->

  <div class="modal modal-fixed-footer" id="modal-clientes" style="height: 400px;">
   <div class="modal-header head3 center" id="titagcli" style="font-size: 22px;">Agregar Cliente</div>
  <div class="modal-content">

    <div class="row">

      <div class="input-field col s6">
      </div>

      <div class="input-field col s6">
        <a href="#" data-activates="slide-tc" id="slideDireccion" data-num="3"  data-direccion="" data-idbarrio="0" class="button-collapse der tooltipped tc-show black-text" data-tooltip="Ubicacion del Cliente" data-position="bottom" id="tc-u" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"><i class="mdi mdi-map-marker  mdi-24px"></i></a>
        <input type="hidden" id="vdireccion" readonly>

        <a href="#" data-activates="slide-tc" data-num="1" id="slideTelefono" class="mdi mdi-phone tooltipped mdi-24px button-collapse der tc-show  black-text" data-tooltip="Teléfonos del Cliente" data-position="bottom" id="tc-t" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"></a>
        <input type="hidden" id="vtelefono" readonly>

        <a href="#" data-activates="slide-tc" data-num="2" id="slideCorreo" class="button-collapse der tc-show tooltipped black-text" data-tooltip="Correos del Cliente" data-position="bottom" id="tc-c" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"><i class="mdi mdi-email  mdi-24px"></i></a>
        <input type="hidden" id="vcorreo" readonly>

      </div>
    </div>
    
    <div class="row">
      <div class="input-field col s6">
        <input type="text" id="c-ced" maxlength="12" class="buscarNom" autocomplete="new-password">
        <label for="c-ced">Cédula</label>
      </div>

      <div class="input-field col s6 hide c-stp1 c-stp2 c-st">
        <input type="text" id="c-nom" readonly>
        <label for="c-nom"></label>
        <input type="hidden" id="c-tp">
      </div>

       <div class="switch der">
          <label>
            <span class="hide-on-small">Contado</span>
            <input type="checkbox" id="ccr">
            <span class="lever"></span>
            Crédito
          </label>
        </div>
      </div>

      <div class="row hide" id="idcc">
      
      <div class="col s6 input-field">
        <input type="text" id="c-dias" value="0" class="eder">
        <label for="c-dias">Plazo en Días</label>
      </div>

      <div class="col s6 input-field">
        <input type="text" id="c-max" value="0" class="eder">
        <label for="c-max">Max Crédito</label>
      </div>

    </div>
    
  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
      <a class="modal-action waves-effect waves-green btn-flat" id="addclie">Agregar</a>
  </div>
</div>

      <div class="modal modal-fixed-footer" id="modal-addElem" style="height: 50%;">
          <div class="modal-header">
            <ul class="tabs tabs-fixed-width head3 center">
              <h5 class="center">Agregar Elemento</h5>
            </ul>
            </div>
            <div class="modal-content row" style="padding: 0px;margin:0px;">
                <div class="col s12 input-field">
                  <label for="addelem">Elemento</label>
                  <input type="text" id="addelem" placeholder="Nombre">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
                <button type="button" class="waves-effect waves-green btn-flat" id="agElem" >Guardar</button>
            </div>
        </div>

        <div class="modal modal-fixed-footer" id="modal-gprod" style="height: 80%;">
          <div class="modal-header">
            <ul class="tabs tabs-fixed-width head3 center">
              <h5 class="center">Agregar Producto o Servicio</h5>
            </ul>
            </div>
            <div class="modal-content row" style="padding: 0px;margin:0px;">
                <div class="input-field col s5">
                  <input type="text" id="gdescp" vid="0" placeholder="Código o Artículo" autocomplete="new-password" class="autocomplete">
                  <label for="gdescp" style="font-size: 20px" class="active center"><b>Artículo</b></label>
                </div>

                <div class="input-field col s1">
                  <input type="number" id="gcant" class="eder" value="1">
                  <label for="gcant" style="font-size: 20px" class="active center"><b>Cant.</b></label>
                </div>

                <div class="input-field col s3">
                  <input type="text" id="gprec" value="0.00" class="eder numeric">
                  <label for="gprec" style="font-size: 20px" class="active center"><b>Precio</b></label>
                </div>

                <div class="input-field col s3">
                  <input type="text" id="gtot" value="0.00" class="eder" readonly>
                  <label for="gtot" style="font-size: 20px" class="active center"><b>Total</b></label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
                <button type="button" class="waves-effect waves-green btn-flat" id="agbProd" >Guardar</button>
            </div>
        </div>

        {$SCR}
        <script src="../assets/js/modulos/taller.js?v=mesero"></script>
    </body>
</html>                                         