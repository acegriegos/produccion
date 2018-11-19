<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Documentos Electrónicos</title>
   {$STY}
   <link rel="stylesheet" type="text/css" href="../assets/css/dropzone.css?v=10.0.0.77">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-documentos.css?v=10.0.0.77">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
      <div class="card z-depth-3 ">
          <div class="card-header center"> 
          <p class="flow-text head1">
          Documentos Electrónicos <span class="hide-on-med-and-down">{$smarty.session.EMPRESA|upper}</span></p>
          </div>
          
          <div class="row">
            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf1" checked />
                <label for="tf1">Facturas</label>
            </div>
           
            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf4"/>
                <label for="tf4">Tiquetes</label>
            </div>

            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf2"/>
                <label for="tf2">Notas de Débito</label>
            </div>
            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf3"/>
                <label for="tf3">Notas de Crédito</label>
            </div>

            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf5"/>
                <label for="tf5">Aceptaciones</label>
            </div>  

            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf6"/>
                <label for="tf6">Aceptaciones Parciales</label>
            </div>

            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf7"/>
                <label for="tf7">Rechazo</label>
            </div> 
        </div>        
            <hr>
        <div class="row">
            <div class="col s12">
              Estados de Documentos: <div style="height: 15px;width: 15px;display: inline-block;" class="green"></div> Aceptado  <div style="height: 15px;width: 15px;display: inline-block;" class="light-green"></div> Recibido  <div style="height: 15px;width: 15px;display: inline-block;" class="lime"></div> Procesando  <div style="height: 15px;width: 15px;display: inline-block;" class="red"></div> Rechazado  <div style="height: 15px;width: 15px;display: inline-block;" class="grey"></div> Sin Subir
            </div>

            <div class="col s9 m7 input-field">
                  <a class="prefix dropdown-button tooltipped"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="mdi mdi-magnify mdi-24px"></i></a>
                  <ul id='filtr_1' class='dropdown-content'>
                    <li><a class="optns" href="#!" fltr="1">Número</a></li>
                    <li><a class="optns" href="#!" fltr="2">Razón Social o Cédula</a></li>
                    <li><a class="optns" href="#!" fltr="3">Fecha</a></li>
                  </ul>
                  <input type="text" id="search_facturas" maxlength="100" num="v179" var="0,1" filtro="1">
                  <label class="truncate" for="search_facturas">Buscar Documento por <span>Número</span></label>
            </div>

            <div class="col s3 m5 row">
                <a href="#modal-irobot" class="btn btn1 tooltipped col s12 m3 hide" data-position="bottom" data-tooltip="Compras" style="margin-bottom: 5px">Compras</a>
                <a href="#modal-getxml" class="btn btn2 tooltipped hide-on-small" data-position="bottom" data-tooltip="Subir XML" style="margin-bottom: 5px">Subir XML</a>
                <a id="actAuto" class="btn btn3 tooltipped hide-on-small" data-position="bottom" data-tooltip="Actualizar Estados" style="margin-bottom: 5px;margin-right: 5px">Actualizar Estados</a>
            </div>
        </div>

          <table class="table tablatitulos dt-responsive nowrap centered striped bordered highlight z-depth-3" id="data-table-facturas" cellspacing="0" width="100%" >
                        <thead class="tab1">
                            <tr>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">N° Documento</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Fecha</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Cliente</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Total</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">IV</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Estado</th>
                            </tr>
                        </thead>
                        <tbody id="listafacturas" class="tpag">
                           
                        </tbody>
                    </table>
                    <ul class="left showing" modulo="179"><small></small></ul>
                    <ul class="pagination right" vtbl="179" modulo="facturas" filtro_sp="1,1,@@impresa,^,?"></ul>
           
    </div>
    {$SCR}
    <div id="modal-getxml" class="modal modal-fixed-footer grandemodal">
        <div class="modal-header">
        <div class="card-header center blue-grey white-text z-depth-1">
            <p class="flow-text marginzero"  style="background-color:#0B3861;" >Cargar XML <span id="nomproc"></span></p>
        </div>
        </div>
        <div class="modal-content">
            <div class="row">

                <section class="upxml col s12 l6" xml="4" style="margin-top: 8%">
                    <span>Subir Documento Electrónico: Mensaje Hacienda</span>
                    <form class="dropzone needsclick dz-clickable dz-started" id="hacienda-upload" style="padding-left: 44% !important">
                        <span class="dz-message needsclick text-center ico-reg"><i class="mdi mdi-xml mdi-48px imgDrop" style="margin-top: 25px;margin-bottom: 25px;"></i></span>
                    </form>
                    <span id="mha" class="green-text"></span>
                </section>

                <section class="upxml col s12 l6" xml="1" style="margin-top: 8%">
                    <span>Subir Documento Electrónico: Factura o Nota Crédito y Débito</span>
                    <form class="dropzone needsclick dz-clickable dz-started" id="registro-upload" style="padding-left: 44% !important">
                        <span class="dz-message needsclick text-center ico-reg"><i class="mdi mdi-xml mdi-48px imgDrop" style="margin-top: 25px;margin-bottom: 25px;"></i></span>
                        <input type="hidden" id="myclave">
                    </form>
                </section>

            </div>
            
            <input type="hidden" id="fclientes">
            <section class="upxml hide" xml="2" id="ffacturas">
                <input type="hidden" class="zelda">
                <div class="center iloop" style="margin-top: 15%"><i class="mdi mdi-spin mdi-refresh mdi-48px green-text"></i></div>
                <div class="upxml hide" xml="3">
                    <div class="shxml_head"></div>
                    <table style="margin-bottom: 3%">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Cantidad</th>
                                <th>Unidad</th>
                                <th>Descripción</th>
                                <th>Descuento</th>
                                <th>Impuesto</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody vtabla="detallefactura" id="fdetallefacturas" tp="4" class="shxml_body"></tbody>
                        <tfoot class="shxml_foot" style="border-top: 1px solid #e2e2e2"></tfoot>
                    </table>
                </div>
            </section>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action waves-effect waves-green btn-flat hide add mhacienda" modulo="factura" tp="3" varias="1" xml="3" dc="5">Aceptar</a>
            <a href="#!" class="modal-action waves-effect waves-green btn-flat hide add mhacienda" modulo="factura" tp="3" varias="1" xml="3" dc="6">Aceptar Parcial</a>
            <a href="#!" class="modal-action waves-effect waves-green btn-flat hide add mhacienda" modulo="factura" tp="3" varias="1" xml="3" dc="7">Rechazar</a>
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" id="ret-xml">Cancelar</a>
        </div>
    </div>

    <div id="modal-irobot" class="modal modal-fixed-footer grandemodal" style="width: 100%">
        <div class="modal-header">
        <div class="card-header center blue-grey white-text z-depth-1">
            <p class="flow-text marginzero"  style="background-color:#0B3861;" >Cargar Compras</p>
        </div>
        </div>
        <div class="modal-content">
            <a class="mdi mdi-24px mdi-refresh der act black-text tooltipped" data-tooltip="Refrescar" data-position="buttom" style="cursor: pointer;"></a>
            <div class="center iloop hide actin" style="margin-top: 15%"><i class="mdi mdi-spin mdi-refresh mdi-48px green-text"></i></div>
            <table class="table bordered highlight responsive-table z-depth-3 centered act" id="data-table-compras" style="width: 100%">
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Fecha</th>
                        <th>Clave</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="bcompras"></tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" id="ret-xml">Salir</a>
        </div>
    </div>

    <script src="../assets/js/dropzone.js?v=10.0.0.77"></script>
    <script src="../assets/js/modulos/documentos.js?v=10.0.0.77"></script>
  </body>
</html>