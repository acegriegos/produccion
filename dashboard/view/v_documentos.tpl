<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Documentos Electrónicos</title>
   {$STY}
   <link rel="stylesheet" type="text/css" href="../assets/css/dropzone.css?v=10.2.0.51">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-documentos.css?v=10.2.0.51">
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
            <div class="col s4 l2">
                <input name="tventa" class="with-gap" type="radio" id="tf1" checked />
                <label for="tf1">Facturas</label>
            </div>
           
            <div class="col s4 l2">
                <input name="tventa" class="with-gap" type="radio" id="tf4"/>
                <label for="tf4">Tiquetes</label>
            </div>

            <div class="col s4 l2">
                <input name="tventa" class="with-gap" type="radio" id="tf2"/>
                <label for="tf2">Notas de Débito</label>
            </div>
            <div class="col s4 l2">
                <input name="tventa" class="with-gap" type="radio" id="tf3"/>
                <label for="tf3">Notas de Crédito</label>
            </div>

            <div class="col s4 l2">
                <input name="tventa" class="with-gap" type="radio" id="tf5"/>
                <label for="tf5">Aceptaciones</label>
            </div>  

            <div class="col s4 l2">
                <input name="tventa" class="with-gap" type="radio" id="tf6"/>
                <label for="tf6">Acept. Parciales</label>
            </div>

            <div class="col s4 l2">
                <input name="tventa" class="with-gap" type="radio" id="tf7"/>
                <label for="tf7">Rechazo</label>
            </div> 

            <div class="col s4 l2">
                <input name="tventa" class="with-gap" type="radio" id="tf8"/>
                <label for="tf8">Compras Elect.</label>
            </div> 

            <div class="col s4 l2">
                <input name="tventa" class="with-gap" type="radio" id="tf9"/>
                <label for="tf9">Exportaciones</label>
            </div>
        </div>        
            <hr>
        <div class="row">
            <div class="col s12">
              <span class="tpf active pbtn" tpf="0">Estados de Documentos:</span> <span class="tpf pbtn" tpf="1"><div style="height: 15px;width: 15px;display: inline-block;" class="lime"></div> Aceptado </span> <span class="tpf active pbtn" tpf="6"><div style="height: 15px;width: 15px;display: inline-block;" class="light-green"></div> Recibido </span> <span class="tpf active pbtn" tpf="2"><div style="height: 15px;width: 15px;display: inline-block;" class="yellow"></div> Procesando </span> <span class="tpf active pbtn" tpf="3"> <div style="height: 15px;width: 15px;display: inline-block;" class="red"></div> Rechazado </span> <span class="tpf active pbtn" tpf="7"> <div style="height: 15px;width: 15px;display: inline-block;" class="blue"></div> Sin Subir </span>
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
                <a href="#modal-irobot" class="btn btn1 tooltipped col s12 m3" data-position="bottom" data-tooltip="Recepciones Automáticas" style="margin-left: 5px">Ver XML</a>
                <a href="#modal-getxml" class="btn btn2 tooltipped hide-on-small" data-position="bottom" data-tooltip="Recepciones Manuales" style="margin-left: 5px">Subir XML</a>
                <a id="actAuto" class="btn btn3 tooltipped hide-on-small hide" data-position="bottom" data-tooltip="Actualizar Estados" style="margin-bottom: 5px;margin-right: 5px">Actualizar Estados</a>
            </div>
        </div>

          <table class="table tablatitulos dt-responsive nowrap centered striped bordered highlight z-depth-3" id="data-table-facturas" cellspacing="0" width="100%" >
                        <thead class="tab1">
                            <tr>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">N° Documento</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Fecha</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Cliente</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">Total</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%">IVA</th>
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
                <input type="hidden" id="msjreceptor">
                <input type="hidden" id="continuar" value="0">
                <input type="hidden" id="gasto" value="0">
                <input type="hidden" id="credito" value="0">
                <input type="hidden" id="tipo" value="0">

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
            
            <section class="upxml hide" xml="2">
                <div class="center iloop" style="margin-top: 15%"><i class="mdi mdi-spin mdi-refresh mdi-48px green-text"></i></div>
                <div>
                    <div class="shxml_head"></div>
                    <table style="margin-bottom: 3%">
                        <thead>
                            <tr>
                                <th class="hide">Tipo</th>
                                <th>Cantidad</th>
                                <th>Unidad</th>
                                <th>Descripción</th>
                                <th>Descuento</th>
                                <th>Exonerado</th>
                                <th>IVA(%)</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody vtabla="detallefactura" id="fdetallefacturas" tp="4" class="shxml_body"></tbody>
                        <tfoot class="shxml_foot" style="border-top: 1px solid #e2e2e2"></tfoot>
                    </table>
                </div>
            </section>
        </div>
        <div class="modal-footer" id="faapr" idcompra="0">
            <a href="#!" class="modal-action waves-effect waves-green btn-flat hide msjh" xml="3" tipo="5">Aceptar</a>
            <a href="#!" class="modal-action waves-effect waves-green btn-flat hide msjh" xml="3" tipo="6">Aceptar Parcial</a>
            <a href="#!" class="modal-action waves-effect waves-green btn-flat hide msjh" xml="3" tipo="7">Rechazar</a>
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" id="ret-xml">Cancelar</a>
        </div>
    </div>

    <div id="modal-irobot" class="modal modal-fixed-footer grandemodal" style="width: 100%">
        <div class="modal-header">
        <div class="card-header center blue-grey white-text z-depth-1">
            <p class="flow-text marginzero"  style="background-color:#0B3861;" >Cargar Documentos</p>
        </div>
        </div>
        <div class="modal-content">
           
            <div class="center iloop hide actin" style="margin-top: 15%"><i class="mdi mdi-spin mdi-refresh mdi-48px green-text"></i></div>
            <table class="table bordered highlight responsive-table z-depth-3 centered act" id="data-table-compras" style="width: 100%">
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Fecha</th>
                        <th>Consecutivo</th>
                        <th>Total</th>
                        <th>Tipo</th>
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

    <div id="modal-shcompra" class="modal modal-fixed-footer grandemodal" style="width: 80%">
        <div class="modal-content">
            <table class="table bordered highlight responsive-table z-depth-3 centered act" id="data-table-dtcompras" style="width: 100%">
                <thead>
                    <tr>
                        <th class="hide">Tipo</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                        <th>Descripción</th>
                        <th>Descuento</th>
                        <th>Exonerado</th>
                        <th>IVA(%)</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody id="bdtompras"></tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" id="ret-xml">Salir</a>
        </div>
    </div>
    
    <script src="../assets/js/dropzone.js?v=10.2.0.51"></script>
    <script src="../assets/js/modulos/documentos.js?v=10.2.0.51"></script>
  </body>
</html>