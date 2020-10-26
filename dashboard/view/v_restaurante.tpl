<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>{$smarty.session.EMPRESA}</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-restaurante.css?v=10.2.0.98">
  </head>
  <body>
    {$NAV}
    <div class="bdy" style="margin-top: 0px">

      <div class="row hide" style="margin: 0px">
          <div class="input-field col s12 l4" style="margin: 0px">
              <span class="prefix"><i class="mdi mdi-magnify mdi-24px"></i></span>
              <input type="text" id="bbarras" maxlength="45">
              <label for="bbarras">Buscar Barra</label>
          </div>
          <div class="col s7 l8" style="margin: 0px">
            
          </div>
      </div>

      <div class="row center head1" style="margin-bottom: 0px;background-color: #01579b;">
        <p class="flow-text" style="margin: 0%;"><span id="titfact"></span> <span class="hide-on-med-and-down" id="loadMyBussiness" impresa="{$smarty.session.IMPRESA}"></span>
      </div>
      
     {if $BARRAS.length}
      <div class="row ">
        <h6 class="col s6 m2 center head3" style="margin-top: 0;padding-top: 0.8%;padding-bottom: 0.8%;background-color: #0277bd ">BARRAS</h6>
      </div>

      <div class="row" id="barras">
      
        {section name=LE loop=$BARRAS}
        <!-- <div class="col s12 m6" >
          {$BARRAS[LE][1]}
        </div> -->
        <div class="col s12 m6 center barra" style="cursor:pointer;height: 135px;background: url('../assets/img/mesa2.jpg');background-repeat: no-repeat;" id="r{$BARRAS[LE][0]}">
          <strong style="font-style: italic;"><b>{$BARRAS[LE][1]}</b></strong>
        </div>
        
        {/section}
        
      </div>

      {/if}

      <div class="row center head1" style="margin-bottom: 0px;height: 20px;background-color: #01579b;">
        
      </div>
      <div class="row ">
        <h6 class="col s6 m2 center head3" style="margin-top: 0;padding-top: 0.8%;padding-bottom: 0.8%;background-color: #0277bd ;">MESAS</h6>
        <div class="input-field col s6 m3 right" style="margin: 0px">
              <span class="prefix"><i class="mdi mdi-magnify mdi-24px"></i></span>
              <input type="number" id="bmesas" maxlength="45">
              <label for="bmesas">Buscar Mesa</label>
          </div>
      </div>


      <div class="row" id="mesas">

        <div class="col s6 m2 black-text barra center" style="background: url('../assets/img/espress2.png');padding: 0.5%;margin: 0.5%;background-repeat: no-repeat;background-size: 100%;border-radius: 50%;height: 125px;width: 125px;background-color: white;border: 3px solid black; cursor: pointer;" nmesa="99" id="m99" estado="0">
       <span id="sm99"><strong style="color: white;"><b></b></strong></span>
        </div> 
  
        {section name=LE loop=$MESAS}

        <div class="col s6 m2 black-text mesa center" style="background: url('../assets/img/mesa.png');padding: 0.5%;margin: 0.5%;background-repeat: no-repeat;background-size: 100%;border-radius: 50%;height: 125px;width: 125px;background-color: white;border: 3px solid black; cursor: pointer;" nmesa="{$MESAS[LE][1]}" id="m{$MESAS[LE][0]}" estado="1">
          {$MESAS[LE][1]} <span id="sm{$MESAS[LE][0]}"></span>
        </div>

        {/section}

  
      </div>

      <ul id="shcomanda" class="side-nav hide-on-small-only" style="max-width: 400px !important; font-size: 1.2em !important;z-index: 1016">
      <li>
        <div id="userView">
        </div>
      </li>
    </ul>

      <div class="fixed-action-btn hide">
        <a class="btn-floating btn-large red">
          <i class="large mdi mdi-settings"></i>
        </a>
        <ul>
          <li><a class="btn-floating green tooltipped" data-tooltip="Cocina" data-position="top"><i class="mdi mdi-silverware-spoon"></i></a></li>
          <li><a class="btn-floating blue tooltipped" data-tooltip="Caja" data-position="top"><i class="mdi mdi-square-inc-cash"></i></a></li>
        </ul>
      </div>
    </div>
     <div id="modal-comentario" class="modal modal-fixed-footer" style="z-index: 1600 !important">
          <div class="modal-content">
            <h4 id="pname"></h4>
            <div id="cbody"></div>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat" id="savecoment">Aceptar</a>
          </div>
        </div>

    <div id="modal-barra" class="modal modal-fixed-footer grandemodal" style="min-height: 100vh !important; min-width: 90% !important">
      <div class="modal-header head3 center" style="height: 36px;"><span id="btit">Barra</span> <i class="mdi mdi-magnify der pbtn mdi-24px hide" id="bcodigo"></i></div>

      <div class="modal-content" style="padding: 0px">
        <div class="row">
          <div class="col s5 input-field">
            <i class="mdi mdi-24px mdi-magnify prefix"></i>
            <input type="text" id="sbarra">
            <label for="sbarra">Buscar Cliente</label>
          </div>

          <div class="col s2"></div>

          <div class="col s5 input-field">
            <a class="btn-floating blue prefix" id="addclient"><i class="mdi mdi-24px mdi-plus"></i></a>
            <input type="text" id="abarra" maxlength="40"> 
            <label for="abarra">Agregar Cliente</label>
          </div>
        </div>

        <div class="row" id="listaclientes"></div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
      </div>
    </div>
    <div id="modal-mesa" class="modal modal-fixed-footer comanda">
      <div class="modal-header head3" style="height: 36px;padding-left: 1%;padding-right: 1%"><section id="clientes" style=" float: left;"> <span id="tit">Mesa</span> </section>  <input type="text" id="usr" value="00" class="browser-default usr"> <span class="center">Atiende: <span id="username"></span> </span>  <input type="text" id="cusr" value="00" class="browser-default usr"> <span class="center">Cajero: <span id="cusername"></span> </span> <i class="mdi mdi-account-plus mdi-24px pbtn der" id="agcliente" title="Agregar Persona"></i> </div>

      <div class="modal-content" style="padding: 0px; overflow: hidden;" id="ffacturas">
        <input type="hidden" class="zelda">
          <div class="row">
            <div class="col s12 l3" style="overflow-y: auto;max-height: 90vh;padding-bottom: 5%;" vtabla="detallefactura" id="fdetallefacturas" tp="4" rollback="" >
              <section id="lentradas"></section>
              <section id="lpfuertes"></section>
              <section id="lpostres"></section>
              <section id="lgeneral"></section>
              <section id="lbebidas"></section>
            </div>
          <div class="col s12 l9" style="border-left: 1px solid black;height: 80vh;" id="listgeneral">
            <div class="row col s12" style="margin: 0px;">
              <select class="col s4" id="lfam"> 
                <!-- {section name=LE loop=$FAM}
                  <option value="{$FAM[LE][0]}">{$FAM[LE][1]}</option>
                {/section} -->
                <option value="0">Todos</option>
                <option value="1">Entrada</option>
                <option value="2">Plato Fuerte</option>
                <option value="3">Postre</option>
                <option value="4">Bebida</option>
                <option value="5">Desayuno</option>
                <option value="4">Bebida</option>
                <option value="7">Extra</option>
              </select>
              <input type="text" placeholder="Buscar Producto" class="der col s8" style="width: 50%" id="sprod" autocomplete="off">

              <a href="#!" class="btn" id="dofact" style="float: right;">Facturar</a>
            </div>
            
            <!-- <ul>
              {section name=LE loop=$FAM}
              <li class="tab col s1"><a href="#test1">{$FAM[0][LE][1]}</a></li>
              {/section}
            </ul> -->
          <div id="test1" class="col s12" style="max-height: -webkit-fill-available;overflow-y: auto;">

          </div>
        </div>

      </div>
      </div>
      <div class="modal-footer row" style="z-index: 1014;margin: 0px" id="forder">
        <section style="float: left;font-size: 16px;padding-top: 2px;" class="col l3"><span style="float: left;"><b>TOTAL:</b></span> <span id="total_mesa">0.00</span> CRC <br> <span id="total_mesa_d">0.00</span> USD </section>
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat hide mdi mdi-table-row-remove mdi-24px"  title="Cancelar Orden" id="cancOrder" style="float: left;padding: 0%;"></a>
        
        <i data-activates="shcomanda" class="mdi mdi-eye mdi-24px pbtn button-collapses-com hide" title="Ver Comanda" id="mcomanda" style="padding-right: 0%"></i>
        <span class="hide-on-med-and-down">
        Cocina General <i class="mdi mdi-flag-variant pbtn"></i> Entrada <i class="mdi mdi-flag-variant green-text"></i> Plato Fuerte <i class="mdi mdi-flag-variant" style="color: #C32B1B"></i> Postre <i class="mdi mdi-flag-variant blue-text"></i>
        </span>
        <a href="#!" class="modal-action waves-effect waves-green btn-flat add mdi mdi-table-edit mdi-24px" id="saveOrder" modulo="factura" varias="1" title="Guardar Orden" style="padding: 0%;"></a>
        <a h%ref="#!" class="modal-action modal-close waves-effect waves-green btn-flat mdi mdi-24px mdi-exit-to-app" title="Salir" id="orderout" style="padding: 0;"></a>
      </div>
    </div>

            <div class="modal modal-fixed-footer" id="modal-inicmesa">
              <div class="modal-header">
                <ul class="tabs tabs-fixed-width head3 center">
                  <h5 class="center">Autenticar Usuario</h5>
                </ul>
                </div>
                <div class="modal-content row" style="padding: 0px;margin:0px;">
                    <div class="col s12 input-field">
                      <label for="restauth">Codigo de Usuario</label>
                      <input type="password" id="restauth">
                    </div>

                    <div class="col s6">
                      <label class="center active" for="children">Cantidad de Niños</label>
                      <input type="number" id="children">
                    </div>

                    <div class="col s6">
                      <label class="center active" for="older">Cantidad de Adultos</label>
                      <input type="number" id="older">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="waves-effect waves-green btn-flat" id="autentico" >Aceptar</button>
                </div>
            </div>

    {$SCR}
    <script src="../assets/js/modulos/restaurante.js?v=10.2.0.98"></script>
  </body>
</html>