<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Ver Facturas</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-verfacturas.css?v=10.0.1.14">
  </head>
  <body>
  
    {$NAV}
    <div class="bdy">

        <div class="card z-depth-3 ">
            <div class="card-header center"> 
            <p class="flow-text head1">
            Vista de Facturas <span class="hide-on-med-and-down">{$smarty.session.EMPRESA|upper}</span></p>
            </div>

            <div class="row">
            <div class="col s12  m2">
                <input name="tventa" class="with-gap" type="radio" id="tf1" {if $TF eq 1}checked{/if}/>
                <label for="tf1">Ventas</label>
            </div>
            
            <div class="col s12  m2">
                <input name="tventa" class="with-gap" type="radio" id="tf2" {if $TF eq 2}checked{/if}/>
                <label for="tf2">Compras</label>
            </div>
            {if $smarty.session.BUSS neq 1}
            <div class="col s12  m2">
                <input name="tventa" class="with-gap" type="radio" id="tf3" {if $TF eq 3}checked{/if}/>
                <label for="tf3">Ordenes de Compras</label>
            </div>

            <div class="col s12 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf5" {if $TF eq 5}checked{/if}/>
                <label for="tf5">Orden de Pedidos</label>
            </div>  
            {/if}
            <div class="col s12 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf7" {if $TF eq 7}checked{/if}/>
                <label for="tf7">Tiquetes</label>
            </div> 

             <div class="col s12  m2">
                <input name="tventa" class="with-gap" type="radio" id="tf4" {if $TF eq 4}checked{/if}/>
                <label for="tf4">Proformas</label>
            </div>     
                
            </div>

            <hr>
            <div class="row">
                <div class="col s9 m7 input-field">
                  <a class="prefix dropdown-button tooltipped"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="mdi mdi-magnify mdi-24px"></i></a>
                  <ul id='filtr_1' class='dropdown-content'>
                    <li><a class="optns" href="#!" fltr="1">Número</a></li>
                    <li><a class="optns" href="#!" fltr="2">Razón Social o Cédula</a></li>
                    <li><a class="optns" href="#!" fltr="3">Fecha</a></li>
                  </ul>
                  <input type="text" id="search_facturas" maxlength="100" num="v158" var="0,1" filtro="1">
                  <label class="truncate" for="search_facturas">Buscar Factura por <span>Número</span></label>
                </div>
                <div class="col m2 hide-on-small"></div>
                <div class="col s3 der">

                     <div class="switch der">
                        <label>
                          Punto Venta
                          <input type="checkbox" id="tps">
                          <span class="lever"></span>
                          Carta
                        </label>
                      </div>
                </div>
                <div class="col s12" id="vfacturas">
                     <table class="table tablatitulos dt-responsive nowrap centered striped bordered highlight z-depth-3" id="data-table-facturas" cellspacing="0" width="100%" >
                        <thead class="tab1">
                            <tr>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">N° Factura</th>
                                <th class="white-text" rm="1" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Referencia</th>
                                <th class="white-text" rm="2" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Tipo</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Fecha</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Cliente</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Total</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Comentario</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listafacturas" class="tpag">
                            {section name=LE loop=$FACT}
                            <tr>
                                <td style="width: 10%">{$FACT[LE][1]}</td>
                                <td style="width: 10%" rm="1">{$FACT[LE][2]}</td>
                                <td style="width: 10%" rm="2">{$FACT[LE][4]}</td>
                                <td style="width: 10%">{$FACT[LE][5]}</td>
                                <td style="width: 10%">{$FACT[LE][6]}</td>
                                <td style="width: 10%">{$FACT[LE][7]}</td>
                                <td style="width: 10%">{$FACT[LE][8]}</td>
                                <td style="width: 10%">
                                    <a class="btn-color pbtn mdi mdi-24px mdi-printer print blueh tooltipped" id="a{$FACT[LE][0]}" tv="{$FACT[LE][9]}" data-tooltip="Visualizar Factura" data-position="bottom"></a>

                                    <a class="btn-color pbtn mdi mdi-24px mdi-settings process blueh hide modal-trigger waves-effect waves-light" id="b{$FACT[LE][0]}" href="#modal-process" data-position="bottom" data-tooltip="Procesar Factura" rm="3"></a>
                                </td>
                            </tr>
                            {/section}
                        </tbody>
                        <!-- <tbody id="loadbody"><tr><td colspan="100"><i class="mdi mdi-spin mdi-refresh mdi-48px center"></i></td><tr></tbody> -->
                    </table>
                    <ul class="left showing" modulo="158"><small></small></ul>
                    <ul class="pagination right" vtbl="158" modulo="facturas" filtro_sp="{$TF},0,@@impresa,^,?"></ul>
                </div>
            </div>
            <br><br>
        </div>
    </div>

    <div id="modal-process" class="modal modal-fixed-footer grandemodal" style="width:90% !important;">
    <div class="modal-header">
        <div class="card-header center blue-grey white-text z-depth-1">
            <p class="flow-text marginzero"  style="background-color:#0B3861;" >Procesar <span id="nomproc"></span></p>
        </div>
    </div>
    <div class="modal-content">
        <table class="table responsive-table centered striped bordered highlight z-depth-3" id="data-table-productos" cellspacing="0" width="100%" >
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Nombre</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Código</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Código Interno</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Cantidad</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Cantidad Inventario</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Inventario</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Acciones</th>
                </tr>
            </thead>
            <tbody id="listaproductos">
                
            </tbody>
        </table>
    </div>
    <div class="modal-footer">
        <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        <button type="button" class="waves-effect waves-green btn-flat" id="process">Procesar</button>
    </div>
  </div>

    {$SCR}
    
    <script src="../assets/js/modulos/verfacturas.js?v=10.0.1.14"></script>
  </body>
</html>