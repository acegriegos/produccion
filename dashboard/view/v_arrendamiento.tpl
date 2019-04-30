<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Boletas</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-arrendamiento.css?v=10.1.19">
  </head>
  <body>
    {$NAV}
    <div class="bdy" style="padding: 0px;margin-top: 0">

        <dic class="card">
          <ul class="collection">
    <li class="collection-item avatar">
      <!-- <img src="images/yuna.jpg" alt="" class="circle"> -->
       <i class="mdi mdi-24px mdi-account circle"></i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="mdi mdi-24px mdi-star"></i></a>
    </li>
    <li class="collection-item avatar">
      <i class="mdi mdi-24px mdi-account circle"></i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="mdi mdi-24px mdi-star"></i></a>
    </li>
    <li class="collection-item avatar">
      <i class="mdi mdi-24px mdi-account circle green"></i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="mdi mdi-24px mdi-star"></i></a>
    </li>
    <li class="collection-item avatar">
      <i class="mdi mdi-24px mdi-account circle red"></i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="mdi mdi-24px mdi-star"></i></a>
    </li>
  </ul>
        </dic>

        <div class="card hide">
          <h4 class="center" style="margin: 0px;">Boleta de Recibo</h4>
          <div class="row" style="margin: 0px">
            <div class="input-field col s8 m6 show_cliente hide" style="position: relative;">
                <!-- <i class="mdi mdi-24px mdi-face mdi-24px prefix"></i> -->
                <input type="text" id="ncli" value="" class="autocomplete validate sclie" style="margin:0px" maxlength="64" autocomplete="off" idclie="0"/>
                <label for="ncli">Cliente</label>

                <a class="mdi mdi-24px mdi-16px mdi-plus text-green pbtn tooltipped clieBTN" id="ingclie" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 8px; z-index: 180;cursor: pointer;" data-position="bottom" data-tooltip="Agregar Cliente"></a>              
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
                   <option value="0" selected disabled>Boletas</option> 
                </select>
              </div>

              <div class="col s12">
                <a href="#" class="btn-floating tooltipped der hide abon" id="dellast" data-position="bottom" data-tooltip="Borrar Útimo" style="margin-left: 5px;"><i class="mdi mdi-24px mdi-24px mdi-close"></i></a>  

                  <a href="#" class="btn-floating tooltipped der hide abon" id="abonar" data-position="bottom" data-tooltip="Abonar" style="margin-left: 5px;"><i class="mdi mdi-24px mdi-24px mdi-upload"></i></a>

                <a href="#" class="btn-floating der tooltipped hide" id="addboleta" data-position="bottom" data-tooltip="Agregar Boleta" style="margin-left: 5px;"><i class="mdi mdi-24px mdi-plus"></i></a>

                <a href="#" class="btn-floating der tooltipped" id="flujo" data-position="bottom" data-tooltip="Flujo de Caja" style="margin-left: 5px;"><i class="mdi mdi-24px mdi-recycle"></i></a>

                <a href="#" class="btn-floating der tooltipped hide show_cliente" id="shrutas" data-position="bottom" data-tooltip="Ruta" style="margin-left: 5px;"><i class="mdi mdi-24px mdi-motorbike"></i></a>

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

    <div class="modal modal-fixed-footer" id="modal-clientes" style="height: 400px;">
   <div class="modal-header head3 center" id="titagcli" style="font-size: 22px;">Agregar Cliente</div>
  <div class="modal-content">

    <div class="row">

      <div class="input-field col s6">
      </div>

      <div class="input-field col s6">
        <a href="#" data-activates="slide-tc" id="slideDireccion" data-num="3"  data-direccion="" data-idbarrio="0" class="button-collapse der tooltipped tc-show black-text" data-tooltip="Ubicacion del Cliente" data-position="bottom" id="tc-u" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"><i class="mdi mdi-24px mdi-map-marker  mdi-24px"></i></a>
        <input type="hidden" id="vdireccion" readonly>

        <a href="#" data-activates="slide-tc" data-num="1" id="slideTelefono" class="mdi mdi-24px mdi-phone tooltipped mdi-24px button-collapse der tc-show  black-text" data-tooltip="Teléfonos del Cliente" data-position="bottom" id="tc-t" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"></a>
        <input type="hidden" id="vtelefono" readonly>

        <a href="#" data-activates="slide-tc" data-num="2" id="slideCorreo" class="button-collapse der tc-show tooltipped black-text" data-tooltip="Correos del Cliente" data-position="bottom" id="tc-c" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"><i class="mdi mdi-24px mdi-email  mdi-24px"></i></a>
        <input type="hidden" id="vcorreo" readonly>

      </div>
    </div>
    
    <div class="row">
      <div class="input-field col s6">
        <input type="text" id="c-ced" maxlength="12" class="buscarNom" autocomplete="off">
        <label for="c-ced">Cédula</label>
      </div>

      <div class="input-field col s6 hide c-stp1 c-stp2 c-st">
        <input type="text" id="c-nom" readonly>
        <label for="c-nom"></label>
        <input type="hidden" id="c-tp">
      </div>

      <div class="input-field col s6 hide c-stp1 c-st">
        <input type="text" id="c-ap1" readonly>
        <label for="c-ap1">Apellido 1</label>
      </div>

      <div class="input-field col s6 hide c-stp1 c-st">
        <input type="text" id="c-ap2" readonly>
        <label for="c-ap2">Apellido 2</label>
      </div>
    </div>
    
  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
      <a class="modal-action waves-effect waves-green btn-flat" id="addclie">Agregar</a>
  </div>
</div>

  <div class="modal modal-fixed-footer grandemodal" id="modal-boleta" style="height: 100%; width: 75%">
    <div class="modal-header head3 center" style="font-size: 22px;">Crear Boleta</div>
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
        <input type="number" id="btime" min="0" value="20" class="eder cprecio" autocomplete="off">
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

    <div class="modal modal-fixed-footer" id="modal-rutas" style="height: 50%; width: 50%">
    <div class="modal-header head3 center" style="font-size: 22px;">Rutas</div>
    <div class="modal-content row">
        <label for="chruta" class="col s4"><b>Cambiar Ruta</b></label>
        <select id="chruta" class="col s8">
          {section name=LE loop=$RUT}
           <option value="{$RUT[LE][0]}">{$RUT[LE][1]}</option>
          {/section}
        </select>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
    </div>
  </div>

  <div class="modal modal-fixed-footer" id="modal-flujo" style="height: 50%; width: 50%">
    <div class="modal-header head3 center" style="font-size: 22px;">Flujo de Efectivo</div>
    <div class="modal-content row">

        <div class="col s6 input-field">
          <input type="text" id="grubro" class="autocomplete" idrubro="0" autocomplete="off">
          <label for="grubro">Rubro</label>  
        </div>

        <div class="col s6 input-field">
          <input type="text" id="gvalor" class="eder" value="0">
          <label for="gvalor">Monto</label>  
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
    </div>
  </div>

    {$SCR}
    <script src="../assets/js/modulos/arrendamiento.js?v=10.1.19"></script>
  </body>
</html>