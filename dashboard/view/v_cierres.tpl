<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Cierre Caja</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-cierres.css?v=10.0.0.76">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js?v=10.0.0.76"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js?v=10.0.0.76"></script>
    <![endif]-->
  </head>
  <body> 
  <br>
    {$NAV}
    <div class="bdy">
      <input type="hidden" id="BUSS" value="{$smarty.session.BUSS}">
    <div class="row">
      <div class="col s12 m12 l12">
        <a class="btn waves-effect waves-light blue right" id="refresh" style="margin-left: 15px;"><i class="mdi mdi-refresh mdi-24px"></i>Actualizar</a>
        <a class="waves-effect waves-light btn blue right" href="#modal-tipomonedas" data-position="bottom" data-delay="50" id="chkcierre">Realizar Cierre</a>
        <a class="waves-effect waves-light btn blue right modal-trigger" style="margin-right:10px" href="#modal-cierres" data-position="bottom" data-delay="50" id="shcierre">Ver Cierres</a>
        <input type="hidden" class="zelda">
      </div>
      <div class="row">
        <div class="col s3 m3 l3">
          <ul class="collection with-header" id="listacierrespendientes"></ul>
        </div>
        <div class="col s9 m9 l9">
          <h4>Facturas</h4>
          <table class="table responsive-table centered striped bordered highlight z-depth-5" id="data-table-facturas" cellspacing="0" width="100%" >
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Consecutivo</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Fecha</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Cliente</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Tipo</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Tipo Pago</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Total</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Usuario</th>
                </tr>
            </thead>
            <tbody id="listafacturas"></tbody>
        </table>
        <div class="row marginzero">
          <div class="col s3 m3 l3">
            Total Contado: <span id="tcontado"></span>
          </div>
          <div class="col s3 m3 l3">
            Total Crédito: <span id="tcredito"></span>
          </div>
          <div class="col s3 m3 l3">
            Total Efectivo: <span id="tefectivo"></span>
          </div>
          <div class="col s3 m3 l3">
            Total Tarjeta: <span id="ttarjeta"></span>
          </div>
        </div>
        <h4 class="hide">Notas y abonos</h4>
          <table class="table responsive-table centered striped bordered highlight z-depth-5 hide" id="data-table-estadocuenta" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Consecutivo</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Nota/Abono</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Fecha</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Cliente</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Tipo Pago</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Saldo</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Usuario</th>
                    
                </tr>
            </thead>
            <tbody id="listanotasabonos"></tbody>
          </table>
          <div class="row marginzero hide">
            <div class="col s4 m4 l4">
              Total Abonos Cliente: <span id="tabono"></span>
            </div>
            <div class="col s4 m4 l4">
              Total Notas Crédito Cliente: <span id="tnotcre"></span>
            </div>
            <div class="col s4 m4 l4 ">
              Total Notas Débito Cliente: <span id="tnotdeb"></span> 
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    

    
    <!-- Modal Structure -->
    <div id="modal-cierres" class="modal modal-fixed-footer">
        <div class="modal-content" style="padding: 0px;" id="lista-cierres">
          

        </div>
        <div class="modal-footer">
          <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
      </div>
    </div>

    <!-- Modal Structure -->
    <div id="modal-tipomonedas" class="modal modal-fixed-footer grandemodal" style="height: 85%; width: 90%">
        <div class="modal-content" style="padding: 0px;">
          <ul class="tabs white-text" style="background-color:#0B3861">
          <li class="tab col s6"><a class="white-text">Caja inicial <span id="totcashier">0.00</span></a></li>
          </ul>
          <div class="row">
            <input type="hidden" id="stot" value="0">
            {section name=LE loop=$TMON}
            <div class="input-field col s4 m4 l4">
              <input type="number" id="m{$TMON[LE][0]}" class="mnd" value="" placeholder="0.00" autofocus vl="{$TMON[LE][3]}">
              <label for="m{$TMON[LE][0]}">{$TMON[LE][1]}</label>
            </div>
            {/section}
            <div class="row">
                <div class="col s12 m6">
                  <h2>Dinero en caja:</h2>
                </div>
                <div class="col s12 m6">
                  <span id="tcaja" style="font-size: 44px;;color: black">0.00</span>
                </div>
            </div>
           
            <!-- <div class="row">
              <div class="col s12 m6">
                <h2>Diferencia de caja: </h2>
              </div>
              <div class="col s12 m6">
                <span id="sobrante" style="font-size: 44px;color: green">0.00</span>
              </div>
               
             </div> -->
            <br>
            
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="waves-effect waves-green btn-flat" id="totalizar">Guardar</button>
          <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
      </div>
    </div>

    <div id="modal-usuario" class="modal modal-fixed-footer mymodal">
  <div class="modal-content" >
    <h4 class="center">Autenticar Usuario</h4>
   
    <div class="input-field col s6 edescu container" style="width: 50%">
        <input type="password" id="ecouser" autocomplete="off" maxlength="64" autosave="off">
        <label for="ecouser">Código</label>
    </div>

  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action waves-effect waves-green btn-flat" id="accecouser">Aceptar</a>
    <a href="#!" class="modal-action waves-effect waves-green btn-flat" id="exitcouser">Salir</a>
  </div>
</div>


    {$SRC}
    <script src="../assets/js/modulos/cierres.js?v=10.0.0.76"></script>
  </body>
</html>