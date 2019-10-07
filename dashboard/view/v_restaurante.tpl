<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>{$smarty.session.EMPRESA}</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-restaurante.css?v=10.2.0.18">
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
      <div class="row ">
        <h6 class="col s6 m2 center head3" style="margin-top: 0;padding-top: 0.8%;padding-bottom: 0.8%;background-color: #0277bd ">BARRAS</h6>
      </div>
     
      <div class="row" id="barras">
      
        {section name=LE loop=$BARRAS}
        <!-- <div class="col s12 m6" >
          {$BARRAS[LE][1]}
        </div> -->
        <div class="col s12 m6 center barra" style="cursor:pointer;height: 135px;background: url('../assets/img/barra.png');background-repeat: no-repeat;" id="r{$BARRAS[LE][0]}">
          <strong style="font-style: italic;"><b>{$BARRAS[LE][1]}</b></strong>
        </div>
        
        {/section}
        
      </div>

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
  
        {section name=LE loop=$MESAS}
        <!-- <div class="center col s2 btn black-text mesa" style="border: 1px solid #e2e2e2; background-color: white;padding: 0.5%;margin: 0.5%;" nmesa="{$MESAS[LE][1]}" id="m{$MESAS[LE][0]}" estado="1"> {$MESAS[LE][1]} <span id="sm{$MESAS[LE][0]}"></span>
        </div> -->
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
          <div class="col s4 input-field">
            <i class="mdi mdi-24px mdi-magnify prefix"></i>
            <input type="text" id="sbarra">
            <label for="sbarra">Buscar Cliente</label>
          </div>

          <div class="col s4"></div>

          <div class="col s4 input-field">
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
      <div class="modal-header head3" style="height: 36px;padding-left: 1%;padding-right: 1%"><section id="clientes" style=" float: left;"> <span id="tit">Mesa</span> </section> <i class="mdi mdi-account-plus mdi-24px pbtn der" id="agcliente" title="Agregar Persona"></i> </div>

      <div class="modal-content" style="padding: 0px" id="ffacturas">
        <input type="hidden" class="zelda">
          <div class="row">
            <div class="col l3 hide-on-small-only" style="overflow: auto;" vtabla="detallefactura" id="fdetallefacturas" tp="4" rollback="" >
              <section id="lentradas"></section>
              <section id="lpfuertes"></section>
              <section id="lpostres"></section>
              <section id="lgeneral"></section>
              <section id="lbebidas"></section>
            </div>
          <div class="col s12 l9" style="border-left: 1px solid black;height: 80vh;">
            <div class="row col s12" style="margin: 0px;">
              <select class="browser-default col s4" id="lfam"> 
                {section name=LE loop=$FAM}
                  <option value="{$FAM[LE][0]}">{$FAM[LE][1]}</option>
                {/section}
              </select>
              <input type="text" placeholder="Buscar Producto" class="der" style="width: 30%" id="sprod">
            </div>
            
            <ul>
              {section name=LE loop=$FAM}
              <li class="tab col s1"><a href="#test1">{$FAM[0][LE][1]}</a></li>
              {/section}
            </ul>
          <div id="test1" class="col s12" style="max-height: -webkit-fill-available;overflow-y: auto;margin-bottom: 10%">

          </div>
        </div>

      </div>
    
      <div class="modal-footer row" style="z-index: 1014;margin: 0px">
        <section style="float: left;font-size: 16px;padding-top: 2px;" class="col l3"><span style="float: left;"><b>TOTAL:</b></span> <span id="total_mesa">0.00</span> CRC <br> <span id="total_mesa_d">0.00</span> USD </section>
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat hide mdi mdi-table-row-remove mdi-24px"  title="Cancelar Orden" id="cancOrder" style="float: left"></a>
        
        <i data-activates="shcomanda" class="mdi mdi-eye mdi-24px pbtn button-collapses-com hide" title="Ver Comanda" id="mcomanda" style="padding-right: 2%"></i>

        Cocina General <i class="mdi mdi-flag-variant pbtn"></i> Entrada <i class="mdi mdi-flag-variant green-text"></i> Plato Fuerte <i class="mdi mdi-flag-variant" style="color: #C32B1B"></i> Postre <i class="mdi mdi-flag-variant blue-text"></i>

        <a href="#!" class="modal-action waves-effect waves-green btn-flat add mdi mdi-table-edit mdi-24px" id="saveOrder" modulo="factura" varias="1" title="Guardar Orden"></a>
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat mdi mdi-24px mdi-exit-to-app" title="Salir" id="orderout"></a>
      </div>
    </div>

    {$SCR}
    <script src="../assets/js/modulos/restaurante.js?v=10.2.0.18"></script>
  </body>
</html>