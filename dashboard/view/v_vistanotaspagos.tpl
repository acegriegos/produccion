<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Movimientos Estados</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-vistanotaspagos.css?v=10.3.0.3">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
      <div class="card z-depth-3 ">
          <div class="card-header center"> 
          <p class="flow-text head1">
          <span id="titg"></span> <span class="hide-on-med-and-down">{$smarty.session.EMPRESA|upper}</span></p>
          </div>

          <div class="row">
            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf3" checked />
                <label for="tf3">Abonos</label>
            </div>
            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf7"/>
                <label for="tf7">Abonos Multiples</label>
            </div>
            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf9"/>
                <label for="tf9">Anulacion de Abonos</label>
            </div>

            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf6"/>
                <label for="tf6">Notas de Débito</label>
            </div>
            <div class="col s4 l3">
                <input name="tventa" class="with-gap" type="radio" id="tf5"/>
                <label for="tf5">Notas de Crédito</label>
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
                  <input type="text" id="search_facturas" maxlength="100" num="v187" var="0,1" filtro="1">
                  <label class="truncate" for="search_facturas">Buscar Documento por <span>Número</span></label>
            </div>

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

        </div>

          <table class="table tablatitulos dt-responsive nowrap centered striped bordered highlight z-depth-3" id="data-table-facturas" cellspacing="0" width="100%" >
                        <thead class="tab1">
                            <tr>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">N° Documento</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; ">Fecha</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; ">N° Factura</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; ">Cliente</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; ">Total</th>
                                 <!-- <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; ">Comentario</th> -->
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important; ">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listafacturas" class="tpag">
                           
                        </tbody>
                    </table>
                    <ul class="left showing" modulo="187"><small></small></ul>
                    <ul class="pagination right" vtbl="187" modulo="facturas" filtro_sp="1,@@impresa"></ul>
           
    </div>
    {$SCR}
    <script src="../assets/js/modulos/vistanotaspagos.js?v=10.3.0.3"></script>
  </body>
</html>