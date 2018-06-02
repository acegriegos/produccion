<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Facturas</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-verfacturas.css?v=10.0.0.2">
  </head>
  <body>
  
    {$NAV}
    <div class="bdy">

        <div class="card z-depth-3 ">
            <div class="card-header center"> 
            <p class="flow-text head1">
            Vista de Facturas {$smarty.session.EMPRESA|upper}</p>
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

            <div class="col s12  m2">
                <input name="tventa" class="with-gap" type="radio" id="tf3" {if $TF eq 3}checked{/if}/>
                <label for="tf3">Ordenes de Compras</label>
            </div>
            <div class="col s12  m2">
                <input name="tventa" class="with-gap" type="radio" id="tf4" {if $TF eq 4}checked{/if}/>
                <label for="tf4">Cotizaciones</label>
            </div>

            <div class="col s12 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf5" {if $TF eq 5}checked{/if}/>
                <label for="tf5">Orden de Pedidos</label>
            </div>      
                
            </div>

            <hr>
            <div class="row">
                <div class="col s12">
                    <span>Filtros</span>
                </div>
                <div class="col s12" id="vfacturas">
                     <table class="table tablatitulos responsive-table centered striped bordered highlight z-depth-3" id="data-table-facturas" cellspacing="0" width="100%" >
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
                        <tbody id="listafacturas">
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
                                    <a class="btn-color pbtn mdi mdi-24px mdi-printer print blueh" id="a{$FACT[LE][0]}" tv="{$FACT[LE][9]}" tp="{$FACT[LE][10]}" title="Visualizar Factura"></a>
                                    <a class="btn-color pbtn mdi mdi-24px mdi-format-page-break print-x blueh" id="a{$FACT[LE][0]}"  title="PV"></a>

                                    <a class="btn-color pbtn mdi mdi-24px mdi-settings process blueh modal-trigger waves-effect waves-light" id="b{$FACT[LE][0]}" href="#modal-process" title="Procesar Factura" rm="3"></a>
                                </td>
                            </tr>
                            {/section}
                        </tbody>
                    </table>
                </div>
            </div>
            <br><br>
        </div>
    </div>

    <div id="modal-process" class="modal modal-fixed-footer" style="width:80% !important; height:90%;">
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
    <script src="../assets/js/modulos/verfacturas.js?v=10.0.0.2"></script>
  </body>
</html>