<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Tarjetas</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-arrendamiento.css?v=10.2.0.79">
  </head>
  <body>
    {$NAV}
    <div class="bdy" style="padding: 0px;margin-top: 0">

        <div class="card" id="base">
          <ul class="collection" id="lclientes">
          </ul>
        </div>

        <div class="card hide" id="tarjeta">
          <h5 class="center" style="margin: 0px;">Tarjeta de Recibo</h5>
          <div class="row" style="margin: 0px">
            <div class="col s12 m6 show_cliente hide">
                <!-- <i class="mdi mdi-24px mdi-face mdi-24px prefix"></i> -->
                <!-- <input type="text" id="ncli" value="" class="autocomplete validate sclie" style="margin:0px" maxlength="64" autocomplete="off" idclie="0"/>
                <label for="ncli">Cliente</label>     --> 
                <label><b id="cliename"></b></label>        
            </div>

              <div class="col s6 m3">
                <select id="idruta" class="browser-default" style="margin: 0px;">
                   <option value="0" selected="true" disabled>Ruta</option> 
                   {section name=LE loop=$RUT}
                   <option value="{$RUT[LE][0]}">{$RUT[LE][1]}</option>
                   {/section}
                </select>
              </div>

              <div class="col s4 m3 ">
                <select id="idboletas" class="browser-default" style="margin: 0px;">
                   <option value="0" selected disabled>Tarjetas</option> 
                </select>
              </div>

              <div class="col s8 m9">
                <a href="#" class="btn-floating tooltipped der hide abon" id="dellast" data-position="bottom" data-tooltip="Borrar Útimo" style="margin-left: 5px;"><i class="mdi mdi-24px mdi-24px mdi-close"></i></a>  

                  <a href="#" class="btn-floating tooltipped der hide abon" id="abonar" data-position="bottom" data-tooltip="Abonar" style="margin-left: 5px;"><i class="mdi mdi-24px mdi-24px mdi-upload"></i></a>

                <a href="#" class="btn-floating der tooltipped hide" id="addboleta" data-position="bottom" data-tooltip="Agregar Tarjeta" style="margin-left: 5px;"><i class="mdi mdi-24px mdi-plus"></i></a>


              </div>
              

            </div> 

            <div class="row" style="margin: 0;margin-top: 1%">
              <div class="col s6">
                  <b>Préstamo:</b> <span id="prestamo">--</span>                
              </div>
              <div class="col s6">
                  <b>Cuota:</b> <span id="cuota">--</span>                
              </div>
              <div class="col s6">
                  <b>Fecha Inic.:</b> <span id="finic">--</span>                
              </div>
              <div class="col s6">
                  <b>Fecha Venc.:</b> <span id="ffin">--</span>                
              </div>
              <div class="col s6">
                  <b>Saldo:</b> <span id="saldo">--</span>                
              </div>
              <div class="col s6">
                  <b>A Favor:</b> <span id="positivo">--</span>                
              </div>
              <div class="col s12 center">
                  <b>Cantidad de Cuotas:</b> <span id="ccuota">--</span>                
              </div>
            </div>

            <div id="pagos"></div>
              
        </div>
    </div>

  <div class="modal modal-fixed-footer grandemodal" id="modal-boleta" style="height: 100%; width: 75%">
    <div class="modal-header head3 center" style="font-size: 22px;">Crear Tarjeta</div>
    <div class="modal-content row">
      <div class="input-field col s6">
        <input type="text" id="bvalor" class="eder cprecio" value="0" autocomplete="off">
        <label>Cantidad a Prestar</label>
      </div>
      <div class="input-field col s6">
        <input type="number" id="bporcenntaje" min="20" value="20" class="eder cprecio" autocomplete="off">
        <label>Valor Interes</label>
      </div>
      <div class="input-field col s6">
        <input type="number" id="btime" min="0" value="24" class="eder cprecio" autocomplete="off">
        <label>Días</label>
      </div>
      <div class="col s6">
        <label for="btipo">Tipo Pago</label>
        <select id="btipo" class="browser-default">
           <option value="0" disabled>Tipo Pago</option> 
           <option value="1" selected="true">Diario</option> 
           <option value="2">Semanal</option> 
           <option value="3">Quincenal</option> 
           <option value="4">C/2 Días</option> 
        </select>
      </div>
      <div class="col s12"></div>

      <div class="input-field col s6">
        <input type="text" id="btotal" value="0" class="eder" readonly>
        <label>Total</label>
      </div>
      <div class="input-field col s6">
        <input type="text" id="bcuota" value="0" class="eder" readonly>
        <label>Cuota</label>
      </div>
      
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
        <a class="modal-action modal-close waves-effect waves-green btn-flat" id="saveboleta">Aceptar</a>
    </div>
  </div>

  <div class="modal modal-fixed-footer" id="modal-abono" style="height: 50%; width: 50%">
    <div class="modal-header head3 center" style="font-size: 22px;">Abonar</div>
    <div class="modal-content row">
      <div class="col s12 input-field">
        <input type="text" id="vabono" value="0" class="eder">
        <label for="vabono">Monto Abonar</label>
      </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
        <a class="modal-action modal-close waves-effect waves-green btn-flat" id="doabono">Aceptar</a>
    </div>
  </div>

    {$SCR}
    <script src="../assets/js/modulos/arrendamiento.js?v=10.2.0.79"></script>
  </body>
</html>