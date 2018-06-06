<section id="ffacturas">

<div class="row">
  <div class="l9 m12 s12 col">

<div class="card z-depth-3 pequeño movil">
<div class="card-header center head1 white-text">
  <p class="flow-text" style="margin-top: 0%;"><span id="titfact"></span> {$smarty.session.EMPRESA|upper}</p>
</div>
  <input type="hidden" class="zelda">

  <div class="row pequeño">
    {if $TF eq 1}
      {assign var="column" value="4"}
      <div class="col s12 m{$column} l{$column} concre" align="center">
        <input type="radio" name="tipofactura" class="chg_tipo with-gap" val="1" id="chg_tipo1" checked>
        <label for="chg_tipo1" >Contado</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap" val="2" id="chg_tipo2" disabled>
        <label for="chg_tipo2">Crédito</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap" val="4" id="chg_tipo3" disabled>
        <label for="chg_tipo3">Apartado</label>
      </div>
    {else}
      {assign var="column" value="3"}
      <div class="col s12 m{$column} l{$column} concre" align="center">
        <div class="switch">
          <label>
            <b>Contado</b>
            <input type="checkbox" id="chg_tipo" val="1">
            <span class="lever"></span>
            <b>Crédito</b>
          </label>
        </div>
      </div>
    {/if}
<<<<<<< HEAD
    
=======
>>>>>>> 3cdc38e2969a399b7f288022d8f9f96fe25897cf

    <div class="col s12 m{$column} l{$column}" align="center">
      <label class="black-text" style="font-size: 18px;"><b>N° Factura: </b> <span class="red-text" id="idfact"></span></label>
    </div>

    <div class="input-field col s12 m3 l3 hide" id="reference">
      <label for="vreferencia">Número de Referencia</label>
      <input type="text" id="vreferencia" class="validate" />
    </div>

    <div class="col s12 m3 l3 " align="center">
      <label class="cre" style="display: none;"><b>Saldo Actual: </b><span class="moneda"></span> <label id="msaldo" class="divisa"></label> </label> 
    </div>

    <div class="show_facts col s12 m3">
      <a class="btn btn1" onclick="verfacturas();"> Ver Facturas</a>
    </div>

  </div>
  <hr style="border: 1px solid #F9F9F9; width: 90%">
  <br>
  <div class="row padd">

   <div class="input-field col s12 m3 l3">
      <i class="mdi mdi-calendar mdi-24px prefix"></i>
      <input type="date" class="datepicker" id="vfecha" value="" />
    </div>

    <div class="input-field con col s12 m3 l3 tp_all" >
    <i class="mdi mdi-coin mdi-24px prefix"></i>
      <select id="idtipopago" type="select">
        {section name=LE loop=$TPAGO}
        <option value="{$TPAGO[LE][0]}">{$TPAGO[LE][1]}</option>
        {/section}
      </select>
      <label style="color: black"><b>Forma de Pago</b></label>
    </div>
   
    <div class="input-field cre col s12 m3 l3" style="display: none;">
      <i class="mdi mdi-calendar-clock mdi-24px prefix"></i>
      <input type="text" id="vplazo" value="0" class="eder" disabled />
      <label style="color: black"><b>Plazo en Días</b></label>
    </div>
    
    <div class="input-field col s12 m6 show_cliente" style="position: relative;">
      <i class="mdi mdi-face mdi-24px prefix"></i>
      <input type="text" id="ncli" value="" class="autocomplete validate sclie" maxlength="64" autocomplete="off"/>
      <i class="mdi mdi-16px mdi-plus text-green pbtn tooltipped hide" id="fastClient" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 8px; z-index: 180" ata-position="bottom" data-tooltip="Agregar Cliente"></i>
      <i class="mdi mdi-16px mdi-email pbtn tooltipped hide" style="position:absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 22px;z-index: 170" data-position="bottom" data-tooltip="Correos del Cliente"></i>
      <i class="mdi mdi-16px mdi-file-document-box pbtn tooltipped hide" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 38px; z-index: 160" ata-position="bottom" data-tooltip="Ventas del Cliente"></i>
      
    </div> 
    
  </div>
  </div>


<!-- DETALLE FACTURA -->
  <div class="card center z-depth-3">
  <div class="card-header head2 center" style="padding: 0.5%"><b>DETALLE DE FACTURA</b></div>

  <div class="row">
    <div class="s12 m12 l12 col hide-on-med-and-down">
    <section class="right isfast">
        <input class="with-gap" name="modselected" type="radio" value="2" id="barras" checked/>
        <label for="barras"><i class="mdi mdi-barcode mdi-18px" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de un Lector de Código de Barras" aria-hidden="true" style="font-size: 1.4em"></i></label>

        <input class="with-gap" name="modselected" type="radio" value="1" id="teclado"/>
        <label for="teclado"><i class="mdi mdi-keyboard mdi-18px" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de Teclado" aria-hidden="true" style="font-size: 1.4em"></i></label>
    </section>
    </div>
    <div class="s12 m12 l12 col">
    <table class="table detalle" id="data-table-detalle" cellspacing="0">
      <thead>
        <section class="trVenta hide">
        <div class="hide-on-med-and-down">
          <div style="padding: 0 !important;" class="col s2 center-align"><b>Código</b></div>
          <div style="padding: 0 !important;" class="col s3 center-align"><span class="truncate"><b>Descripción</b></span></div>
          <div style="padding: 0 !important;" class="col s2 center-align"><span class="truncate"><b>Prec.Unit</b></span></div>
          <div style="padding: 0 !important;" class="col s1 center-align"><span class="truncate"><b>Unidad</b></span></div>
          <div style="padding: 0 !important;" class="col s1 center-align"><b>Cantidad</b></div>
          <div style="padding: 0 !important;" class="col s1 center-align"><b>Total</b></div>
          <div style="padding: 0 !important;" class="col s2 center-align">&nbsp;</div>
        </div>
        </section>

        <section class="trCompra hide">
          <div class="hide-on-med-and-down">
            <div style="padding: 0 !important;" class="col s2 center-align"><b>Código</b></div>
            <div style="padding: 0 !important;" class="col s3 center-align"><span class="truncate"><b>Descripción</b></span></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><span class="truncate"><b>Cantidad</b></span></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><b>Prec.Unit</b></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><span class="truncate"><b>Unidad</b></span></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><span class="truncate"><b>Descuento</b></span></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><b>Total</b></div>
            <div style="padding: 0 !important;" class="col s2 center-align">&nbsp;</div>
          </div>
        </section>

        <section class="trOCompra hide">
          <div class="hide-on-med-and-down">
            <div style="padding: 0 !important;" class="col s2 center-align"><b>Código</b></div>
            <div style="padding: 0 !important;" class="col s4 center-align"><span class="truncate"><b>Descripción</b></span></div>
            <div style="padding: 0 !important;" class="col s2 center-align"><span class="truncate"><b>Cantidad</b></span></div>
            <div style="padding: 0 !important;" class="col s2 center-align"><span class="truncate"><b>Unidad</b></span></div>
            <div style="padding: 0 !important;" class="col s2 center-align">&nbsp;</div>
          </div>
        </section>

        <div class="trVenta hide trsec">
          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código">
            <input type="hidden" id="valores">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m3">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly>
          </div>

          <div style=padding: 0 !important" class="input-field col s12 m1">
            <select id="uni" readonly >
              <option>UN</option>
            </select>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" id="totp" class="f center divisa" value="0.00" readonly placeholder="Total">
          </div>

          <div class="center col s12 m2" style="font-size: 1em; padding: 0px 5px !important;">
            <div class="col s12">
              <a href="#modal-inventario" title="Cantidad en Inventario" id="sinv"><i class="mdi mdi-archive" ></i>
                <a class="hide-on-small-only">:</a><span class="hide-on-small-only" id="cantI">0</span>
              </a>
            </div>
            <div class="col s12">
               <a href="#!" title="Limpiar Campos" class="hide"><img class="responsive-img" src="../assets/img/icon/broom.svg" ></a>
            </div>
          </div>
        </div>

        <div class="trOCompra hide trsec">
          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código">
            <input type="hidden" id="valores">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m4">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2 hide">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <select id="uni" readonly >
              <option>UN</option>
            </select>
          </div>
          
          <div style="padding: 0px 5px !important" class="input-field col s12 m2 hide">
            <input type="text" id="totp" class="f center divisa hide" value="0.00" readonly placeholder="Total">
          </div>

          <div class="center col s12 m2" style="font-size: 1em; padding: 0px 5px !important;">
            <div class="col s12 hide">
              <a href="#modal-inventario" title="Cantidad en Inventario" id="sinv"><i class="mdi mdi-archive" ></i>
                <a class="hide-on-small-only">:</a><span class="hide-on-small-only" id="cantI">0</span>
              </a>
            </div>
            <div class="col s12">
               <a href="#!" title="Limpiar Campos" class="hide"><img class="responsive-img" src="../assets/img/icon/broom.svg" ></a>
            </div>
          </div>
        </div>

        <div class="trCompra hide trsec">
          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código">
            <input type="hidden" id="valores">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m3">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <select id="uni" readonly >
              <option>UN</option>
            </select>
          </div>

          <div class="input-field col s12 m1">
            <input type="text" class="f center" id="descup" min="0" value="0" data-mask="999999999.99" placeholder="Descuento" value="0.00">
          </div>
          
          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" id="totp" class="f center divisa" value="0.00" readonly placeholder="Total">
          </div>

          <div class="center col s12 m2" style="font-size: 1em;  padding: 0px 5px !important;">
            <div class="col s12">
              <a href="#modal-inventario" title="Cantidad en Inventario" id="sinv"><i class="mdi mdi-archive" ></i>
                <a class="hide-on-small-only">:</a><span class="hide-on-small-only" id="cantI">0</span>
              </a>
            </div>
            <div class="col s12">
                <input type="checkbox" name="hasimpuesto" id="iva" hclk="0">
                <label for="iva" style="float: left;">IVA</label>
                <input type="checkbox" name="isexcento" id="exct" hclk="0">
                <label for="exct" style="float: left;">Excento</label>
                <!-- <a href="#!" title="Limpiar Campos" class="hide"><img class="responsive-img" src="../assets/img/icon/broom.svg" ></a> -->
            </div>
          </div>

        </div>
      </thead>
      <tbody vtabla="detallefactura" id="fdetallefacturas" tp="4" rollback="">
       
      </tbody>
      </table>
      </div>

    </div>
</div>
<!-- /DETALLE FACTURA -->

</div>

<!-- DIVISOR -->

<div class="l3 m12 s12 col">

<div class="card center z-depth-3">
  <div class="card-header center head2 center" style="padding: 1%"><b>DESGLOCE DE FACTURA</b></div>
  
  <div class="row">

    <div class="col s12 m12 l12" style="margin-top: -20px">
    <br>
      <!-- <label for="monedas">Divisa</label> -->
      <div class="input-field">
        <select id="monedas">
          {section name="LE" loop=$MON}
            <option value="{$MON[LE][0]}" dv="{$MON[LE][2]}">{$MON[LE][1]} {if $smarty.section.LE.index neq 0} ({$MON[0][3]} {$MON[LE][2]}) {/if}</option>
          {/section}
        </select>
      </div>
    </div>


    <div class="col s12 m12 l12">

        <div class="col s12 m12 l12">
          <textarea id="vcomentario" cols="25" placeholder="Comentario de Factura" type="textarea" style="min-height: 80px; max-height: 80px; height: 80px; min-width: 100%; max-width:100%; width: 100%; "></textarea>
          <br>
        </div><br><br>
        <table>
          <tr>
            <td><label for="vdescuentop">Descuento</label></td>
            <td><input type="text" id="vdescuentop" class="eder _txtaside" value="0" disabled style="height: 0.5% !important" placeholder="DESCUENTO"></td>
          </tr>
          <tr>
            <td><label for="vflete">Flete</label></td>
            <td><input type="text" id="vflete" class="eder _txtaside divisa" value="0" placeholder="FLETE" style="height: 0.5% !important"></td>
          </tr>
          <tr>
            <td><div class="prefix pbtn" id="btnAjuste" accion="1"><i class="mdi mdi-plus mdi-24px"></i></div></td>
            <td><input type="text" id="ajuste" class="eder _txtaside" value="" style="height: 0.5% !important" placeholder="Ajuste máximo: 10" maxlength="4"></td>
          </tr>
        </table>

      </div>


      <div class="col s12 m12 l12">
      <hr style="border: 1px solid #F9F9F9">
      <!-- style="border: 1px solid #e2e2e2;" -->
      <table class="table table-striped table-hover">
        <thead style="border: 0px">
          <tr>
            <td>SUBTOTAL:</td>
            <td style="float: right;">
              <span class="moneda"></span><span id="subtot" class="divisa" type="html" value="0" style="color: black">0.00</span>
            </td>
          </tr>
        </thead>

        <tbody id="sh_imp">
          
        </tbody>  

        <tfoot>  
          <tr class="_desc">
            <td>DESCUENTO:</td>
            <td style="float: right;"><span class="moneda"></span><span id="descuento_v" class="divisa" type="html" value="0">0.00</span></td>
          </tr>

          <tr class="_flete">
            <td>FLETE:</td>
            <td style="float: right;"><span class="moneda"></span><span id="flete" class="divisa" type="html" value="0">0.00</span></td>
          </tr>

          <tr style="border-top:1px solid #E9E9E9">
            <td><b>TOTAL:</b></td>
            <td style="float: right;"><b><span class="moneda"></span><span id="tot" class="divisa" type="html" value="0">0.00</span></b>
            </td>
          </tr>
        </tfoot>
      </table>
      </div>

      <div class="col s12 m12 l12"><br>
        <div class="row">
          <div class="col s12 m6 l6">
              <input type="checkbox" id="p_v" title="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'" checked />
              <label for="p_v" style="color: black; padding-left: 20px;">Punto Venta</label>
          </div>

          <div class="col s12 m6 l6 _odt hide">
            <select id="idodt" type="select">
              <option value="0" style="color: black"><b>ODT</b></option>
            </select>
          </div>

          <div class="col s12 m12 l12" align="center">
            <a {if $smarty.session.TMPT neq 2} href="#modal-tpagos" id="facturar" {/if} class="btn btn1"  style="margin-bottom: 3%;">Facturar</a>
          </div>

          </div>
        </div>

      </div>

  </div>


</div>

<!-- ffacturas -->
</div>
 <!-- bdy -->


<div class="modal modal-fixed-footer" id="modal-inventario" style="height: 400px;">

  <div class="modal-content">
      <div class="row">
          <div class="input-field col s6">
              <select type="select" id="xidbodega" class="_det" det="bodega" sig="xidinventario" prev="" d-b="41">
                  <option value="" disabled selected>Seleccione una Bodega</option>
                  {section name=LE loop=$BOD}
                  <option value="{$BOD[LE][0]}">{$BOD[LE][1]}</option>
                  {/section}
              </select>
              <label for="idbodega">Bodegas</label>
          </div>
          <div class="input-field col s6">
              <select type="select" id="xidinventario" det="inventario" d-b="111">
                  <option value="" disabled>Seleccione un Inventario</option>
              </select>
              <label for="idinventario">Inventarios</label>
          </div>
      </div>
      <p>Cantidad de Producto en el Inventario: <b><span id="bname-inv" type="html">0.00</span></b></p>
  </div>

  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
  </div>
</div>


<div id="modal-tpagos" class="modal modal-fixed-footer" gfort="0" align="center" style="width: 70%; height: 100% !important;">
<!--  -->
<section id="m-efectivo" class="modal-tpago">
  <div class="modal-content">
  <b><span style="color: #2196F3; font-size: 1.8em !important;">Efectivo</span></b><hr style="border: 1px solid #F0F0F0">
    <span>TOTAL:</span><br>
    <b><span class="totalfact" style="font-size: 2.6em !important;"></span></b>
    <div class="input-group input-group" style="width: 80%; font-size: 2em !important;">
      <span>PAGA CON:</span>
      <input type="text" class="form-control form-control-sm center numeric" id="pcon" placeholder="0.00" value="0.00" style="font-size: 1.5em !important;">
    </div>
    <br>
    <span>SU CAMBIO ES DE:</span><br>
    <span type="text" id="pcam" style="font-size: 5em !important;">0.00</span>
  </div>

</section>
<!--  -->
<section id="m-tarjeta" class="modal-tpago">
  <div class="modal-content">
  <b><span style="color: #2196F3; font-size: 1.8em !important;">Tarjeta</span></b><hr style="border: 1px solid #F0F0F0">
  <span>TOTAL:</span><br>
  <b><span class="totalfact" style="font-size: 2.6em !important;"></span></b><br>
  <!-- <p>Para realizar las compras con tarjeta digite por favor los últimos 4 dígitos para verificar la compra:</p> -->
  <br>
  <div class="row center-align">
    <div class="input-field col s12">

      <i class="mdi-24px mdi mdi-card prefix icono" style="font-size: 2em !important"></i>
      <input id="carddigito" type="text" class="validate center-align" value="0000" style="width: 20%; font-size: 2em !important;">
    </div>
      <label for="carddigito" id="labeltarjeta"></label>
  </div>
  <br>
  </div>
</section>
<!--  -->
<section id="m-deposito" class="modal-tpago">
  <div class="modal-content">
  <b><span style="color: #2196F3; font-size: 1.8em !important;">Depósito</span></b><hr style="border: 1px solid #F0F0F0">
  <span>TOTAL:</span><br>
  <b><span class="totalfact" style="font-size: 2.6em !important;"></span></b><br>
  <!-- <p>Para realizar las compras con tarjeta digite por favor los últimos 4 dígitos para verificar la compra:</p> -->
  <br>
  <div class="row center-align">
    <div class="input-field col s12">

      <i class="material-icons prefix icono" style="font-size: 2em !important"></i>
      <input id="ndeposito" type="text" class="validate center-align" value="00000000" style="width: 20%; font-size: 2em !important;">
    </div>
      <label for="ndeposito" id="labeldeposito"></label>
  </div>
  <br>
  </div>
</section>
<!--  -->
<section id="m-cheque" class="modal-tpago">
  <div class="modal-content">
  <b><span style="color: #2196F3; font-size: 1.8em !important;">Cheque</span></b><hr style="border: 1px solid #F0F0F0">
  <span>TOTAL:</span><br>
  <b><span class="totalfact" style="font-size: 2.6em !important;"></span></b><br>
  <!-- <p>Para realizar las compras con tarjeta digite por favor los últimos 4 dígitos para verificar la compra:</p> -->
  <br>
  <div class="row center-align" align="center">
    <div class="input-field col s12">

      <i class="material-icons prefix icono" style="font-size: 2em !important"></i>
      <input id="ncheque" type="text" class="validate center-align" value="00000000" style="width: 20%; font-size: 2em !important;">
    </div>
      <label for="ncheque" id="labelcheque"></label>
  </div>
  <br>
  </div>
</section>
<!--  -->
<section id="m-mixto" class="modal-tpago">
  <div class="modal-content">
  <b><span style="color: #2196F3; font-size: 1.8em !important;">Pago Mixto</span></b><hr style="border: 1px solid #F0F0F0">
  <span>TOTAL:</span><br>
  <b><span class="totalfact" style="font-size: 2.6em !important;"></span></b>
  <br>Saldo: <span class="totfact numeric" style="font-size: 1.4em;"></span><br>
  <!-- <p>Para realizar las compras con tarjeta digite por favor los últimos 4 dígitos para verificar la compra:</p> -->
  <br>
  <div class="row center-align" align="center">
    <div class="col s12">

    <p>Seleccione los metodos de pago:</p>
    <div class="col s12" id="mtpagos" align="center">
      
    </div>
    <br><br><br>
      <div class="col s12 row tp-Cheque hide">
        <div class="col s1">
          <i class="material-icons prefix icono" style="font-size: 2em !important">image_aspect_ratio</i>
        </div>
        <div class="col input-field s3">
          <input id="mCheque" type="text" class="validate center-align" value="00000000" style="font-size: 2em !important;">
          <label for="mCheque">Cheque</label>
        </div>
        <div class="col input-field s8">
          <input type="text" id="pconcheque" class="mcancelar" placeholder="monto a cancelar" value="0" style="font-size: 2em !important;">
        </div>
      </div>

      <div class="col s12 row tp-Deposito hide">
        <div class="col s1">
          <i class="material-icons prefix icono" style="font-size: 2em !important">description</i>
        </div>
        <div class="col input-field s3">
          <input id="mDeposito" type="text" class="validate center-align" value="00000000" style="font-size: 2em !important">
          <label for="mDeposito">Deposito</label>
        </div>
        <div class="col input-field s8">
          <input type="text" id="pcondeposito" class="mcancelar" placeholder="monto a cancelar" value="0" style="font-size: 2em !important;">
        </div>
      </div>

       <div class="col s12 row tp-Tarjeta hide">
        <div class="col s1">
          <i class="material-icons prefix icono" style="font-size: 2em !important"></i>
        </div>
        <div class="col input-field s3">
          <input id="mTarjeta" type="text" class="validate center-align" value="0000" style="font-size: 2em !important;">
          <label for="mTarjeta">Tarjeta</label>
        </div>
        <div class="col input-field s8">
          <input type="text" id="pcontarjeta" class="mcancelar" placeholder="monto a cancelar" value="0" style="font-size: 2em !important;">
        </div>
      </div>

      <div class="col s12 row tp-Efectivo hide">
        <div class="col s1">
          <i class="material-icons prefix icono" style="font-size: 2em !important">monetization_on</i>
        </div>
        <div class="col input-field s3">
          <input id="mEfectivo" type="text" class="validate center-align mcancelar" value="0.00" style="font-size: 2em !important;">
          <label for="mEfectivo">Efectivo</label>
        </div>
        <div class="col input-field s8">
          <!-- <input type="text" class="mcancelar" placeholder="monto a cancelar" style="font-size: 2em !important;"> -->
        </div>
      </div>
      
    </div>
  </div>
  <br>
  </div>
</section>
<!--  -->
<!-- FOOTER -->
  <div class="modal-footer">
    <a href="#!" class="add modal-action waves-effect waves-green btn-flat" id="factreal" modulo="factura" varias="1">ACEPTAR</a>
  </div>
</div>


</section>

<!-- <div id="modal-edit" class="modal modal-fixed-footer">
  <div class="modal-content">
    <h4 id="titmod">Modal Header</h4>
    
    <div class="row">

      <div class="input-field col s6 ecant">
        <input type="text" id="ecantidad">
        <label for="ecantidad">Cantidad</label>
      </div>

      <div class="input-field col s6 eunit">
        <input type="text" id="eunitario">
        <label for="eunitario">Precio Unitario</label>
      </div>

      <div class="input-field col s6 edescu">
        <input type="text" id="edescuento">
        <label for="edescuento">Descuento</label>
      </div>

      <div class="input-field col s6 eimp">
        <input type="text" id="eimpuesto">
        <label for="eimpuesto">Impuesto</label>
      </div>
      <input type="hidden" id="hdnprd" value="0">
    </div>

  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action waves-effect waves-green btn-flat" id="editprod">Aceptar</a>
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
  </div>
</div> -->

<div id="modal-producto" class="modal modal-fixed-footer">
  <div class="modal-content" id="fproductos">
    <h4>Agregar Producto</h4>
    <input type="hidden" class="zelda">
    <div class="row">

      <div class="input-field col s6 edescu">
        <input type="text" id="ecodprod">
        <label for="ecodprod">Código</label>
      </div>

      <div class="input-field col s6 eimp">
        <input type="text" id="enomprod">
        <label for="enomprod">Nombre</label>
      </div>

    </div>

  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Aceptar</a>
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
  </div>
</div>

<script src="../assets/js/modulos/ventas.js?v=10.0.0.4"></script>