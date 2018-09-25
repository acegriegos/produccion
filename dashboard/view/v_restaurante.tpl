<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>{$smarty.session.EMPRESA}</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-restaurante.css?v=10.0.0.57">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy" style="margin-top: 0px">

      <div class="row" style="margin: 0px">
          <div class="input-field col s5 l4" style="margin: 0px">
              <span class="prefix"><i class="mdi mdi-magnify mdi-24px"></i></span>
              <input type="text" id="bbarras" maxlength="45">
              <label for="bbarras">Buscar Barra</label>
          </div>
          <div class="col s7 l8" style="margin: 0px">
            
          </div>
      </div>
     
      <div class="row" id="barras">
      
        {section name=LE loop=$BARRAS}
        <div class="col s6">
          <a class="center btn-success btn" style="width: 95%">{$BARRAS[LE][1]}</a>
        </div>
        {/section}
        
      </div>

      <div class="row" style="margin: 0px">
          <div class="input-field col s5 l4" style="margin: 0px">
              <span class="prefix"><i class="mdi mdi-magnify mdi-24px"></i></span>
              <input type="text" id="bmesas" maxlength="45">
              <label for="bmesas">Buscar Mesa</label>
          </div>
          <div class="col s7 l8" style="margin: 0px">
            
          </div>
      </div>

      <div class="row" id="mesas">
  
        {section name=LE loop=$MESAS}
        <a class="center col s2 btn black-text mesa" style="border: 1px solid #e2e2e2; background-color: white;height: 75px;padding: 0.5%;margin: 0.5%;" nmesa="{$MESAS[LE][1]}" id="m{$MESAS[LE][0]}" estado="1">{$MESAS[LE][1]} <span id="sm{$MESAS[LE][0]}"></span>
        </a>
        {/section}

  
      </div>

      <div class="fixed-action-btn">
        <a class="btn-floating btn-large red">
          <i class="large mdi mdi-settings"></i>
        </a>
        <ul>
          <li><a class="btn-floating green tooltipped" data-tooltip="Cocina" data-position="top"><i class="mdi mdi-silverware-spoon"></i></a></li>
          <li><a class="btn-floating blue tooltipped" data-tooltip="Caja" data-position="top"><i class="mdi mdi-square-inc-cash"></i></a></li>
        </ul>
      </div>
    </div>

    <div id="modal-mesa" class="modal modal-fixed-footer grandemodal" style="max-height: 100vh">
      <div class="modal-header head3 center" style="height: 36px;"><span id="tit">Mesa</span> <i class="mdi mdi-magnify der pbtn mdi-24px hide" id="scodigo"></i></div>

      <div class="modal-content" style="padding: 0px" id="ffacturas">
        <input type="hidden" class="zelda">
        <a class="mdi mdi-book hide tooltipped black-text mdi-24px pbtn" style="position: fixed;top:15px;right: 0px" data-tooltip="Menú" data-position="bottom"></a>        
        <div class="row" style="margin: 0px;padding: 0px;" >
          <div class="col s8 row">
            
            <div class="col s12 row" style="margin: 0px;position: relative;">
              {section name=LE loop=$FAM}
              <a id="f{$FAM[LE][0]}" class="btn btn-success s12 fam" style="width: 100%"><small>{$FAM[LE][1]}</small></a>
              {/section}
              <a id="fsalir" class="btn btn-success s12 fam" style="width: 100%"><small>Salir</small></a>

              <div id="tipos" style="position: absolute;margin-left: 15%;z-index: 90;top: 0;left: 0;display: none"></div>

              <div id="productos" style="position: absolute;margin-left: 30%;z-index: 100;top: 0;left: 0;display: none"> 
              </div>

            </div>

          </div>

          <div class="col s4 collection row" vtabla="detallefactura" id="fdetallefacturas" tp="4" rollback="" style="margin: 0px;padding: 0px">
                <a href="#!" class="collection-item black-text col12" id="detfactmsj">No hay Productos Ingresados</a>
              
          </div>
        </div>
      </div>
       <div class="row" style="margin: 0px;position: fixed; bottom: 7%; width: 100%">

          <div class="row col s8" style="margin: 0px;">
            <div class="input-field col s2">
             <span class="mdi mdi-magnify mdi-24px prefix pbtn tooltipped" data-tooltip="Buscar Producto Manual" data-position="top" id="showprod"></span>
            </div>

            <div class="input-field col s5">
              <input type="text" id="descp" class="sprod hide" autocomplete="off">
              <label for="descp" class="sprod hide">Descripción</label>
              <input type="hidden" id="valores">
            </div>

            <div class="input-field col s5">
              <input type="text" id="codp" class="sprod hide" autocomplete="off">
              <label for="codp" class="sprod hide">Código</label>
            </div>
          </div>

          <div class="input-field col s4">
            <i class="prefix mdi mdi-plus pbtn" id="addline"></i>
            <input type="text" id="cantp" class="eder" value="1" min="0" autocomplete="off">
            <label for="cantp">Cantidad</label>
          </div>
        </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action waves-effect waves-green btn-flat add" id="saveOrder" modulo="factura" varias="1">Guardar Orden</a>
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
      </div>
    </div>

    {$SCR}
    <script src="../assets/js/modulos/restaurante.js?v=10.0.0.57"></script>
  </body>
</html>