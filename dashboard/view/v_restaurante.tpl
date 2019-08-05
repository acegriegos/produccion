<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>{$smarty.session.EMPRESA}</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-restaurante.css?v=10.1.0.86">
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

    <div id="modal-barra" class="modal modal-fixed-footer grandemodal" style="max-height: 100vh">
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

    <div id="modal-mesa" class="modal modal-fixed-footer">
      <div class="modal-header head3 center" style="height: 36px;"><span id="tit">Mesa</span> <i class="mdi mdi-magnify der pbtn mdi-24px hide" id="scodigo"></i></div>

      <div class="modal-content" style="padding: 0px" id="ffacturas">
        <input type="hidden" class="zelda">
        <a class="mdi mdi-book hide tooltipped black-text mdi-24px pbtn" style="position: fixed;top:15px;right: 0px" data-tooltip="Menú" data-position="bottom"></a>        
        <div class="row" style="margin: 0px;padding: 0px;" >
          <div class="col s8 row">

            <div class="col s6">
              <select class="browser-default" id="fam">
                <option value="0" selected disabled>Seleccione una Opción</option>
                {section name=LE loop=$FAM}
                <option value="{$FAM[LE][0]}">{$FAM[LE][1]}</option>
                {/section}
              </select>
            </div>

            <div class="col s6">
              <select class="browser-default" id="tip">
                <option value="0" selected disabled>----</option>
              </select>
            </div>

            <div style="padding: 0; margin: 0;" class="col s12 row" id="productos">
              
            </div>

          </div>

          <ul class="col s4 collapsible row" vtabla="detallefactura" id="fdetallefacturas" tp="4" rollback="" style="margin: 0px;padding: 0px">
                <li><a href="#!" class="collection-item black-text col12" id="detfactmsj">No hay Productos Ingresados</a><li>
              
          </ul>
        </div>
      </div>
       <div class="row" style="margin: 0px;position: fixed; bottom: 7%; width: 100%">

          <div class="row col s8" style="margin: 0px;">
            <div class="input-field col s2">
             <span class="mdi mdi-magnify mdi-24px prefix pbtn tooltipped" data-tooltip="Buscar Producto Manual" data-position="top" id="showprod"></span>
            </div>

            <div class="input-field col s10">
              <input type="text" id="descp" autocomplete="off">
              <label for="descp" class="sprod hide">Descripción</label>
              <input type="hidden" id="valores">
            </div>

            <div class="input-field col s5 hide">
              <input type="text" id="codp" class="hide" autocomplete="off">
              <label for="codp" class="sprod hide">Código</label>
            </div>
          </div>

          <div class="input-field col s4">
            <i class="prefix mdi mdi-plus pbtn hide" id="addline"></i>
            <input type="text" id="cantp" class="eder" value="1" min="0" autocomplete="off">
            <label for="cantp">Cantidad</label>
          </div>
        </div>
      <div class="modal-footer">
        <section style="float: left;font-size: 22px;padding-top: 2px;">Total: <span id="total_mesa">0.00</span> </section>
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat hide mdi mdi-table-row-remove mdi-24px"  title="Cancelar Orden" id="cancOrder"></a>
        <a href="#!" class="modal-action waves-effect waves-green btn-flat add mdi mdi-table-edit mdi-24px" id="saveOrder" modulo="factura" varias="1" title="Guardar Orden"></a>
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat mdi mdi-24px mdi-exit-to-app" title="Salir" id="orderout"></a>
      </div>
    </div>

    {$SCR}
    <script src="../assets/js/modulos/restaurante.js?v=10.1.0.86"></script>
  </body>
</html>