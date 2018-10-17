<section id="ffacturas">

<div class="row">
   <div class="hide-on-large-only row mstatic" style="background-color: #e2e2e2">
      <div class="col s4 center">
        <input type="radio" name="ubfactura" val="1" id="ubfact1" checked>
        <label for="ubfact1" >Info</label>
      </div>
      <div class="col s4 center">
        <input type="radio" name="ubfactura" val="2" id="ubfact2">
        <label for="ubfact2" >Detalle</label>
      </div>
      <div class="col s4 center">
        <input type="radio" name="ubfactura" val="3" id="ubfact3">
        <label for="ubfact3" >Desgloce</label>
      </div>
  </div>

  <div class="l9 m12 s12 col movil">
 
<div class="card z-depth-3 movil p1 ps">
<div class="card-header center head1 white-text">
  <p class="flow-text" style="margin: 0%;"><span id="titfact"></span> <span class="hide-on-med-and-down" id="loadMyBussiness" impresa="{$smarty.session.IMPRESA}"></span> <span class="hide"> [0 de 50 Documentos]</span>
    <a class="mdi mdi-magnify pbtn mdi-24px tooltipped der white-text" data-position="bottom" data-tooltip="Ver Facturas" onclick="verfacturas();"></a>
  {if $smarty.session.CAJA eq 1}
  <a class="btn btn3 tooltipped der white-text" data-position="bottom" data-tooltip="Cargar Facturas" onclick="cargarFacturas();"><span class="white-text" id="cantFact"></span></a>
  {/if}
</p>
  
</div>
  <input type="hidden" class="zelda">

  <div class="row pequeño">      
      <div class="col s12 m3 l3 numfact" align="center">
        <label class="black-text" style="font-size: 18px;"><b>N° Factura: </b> <span class="red-text" id="idfact"></span></label>
      </div>

      {assign var="column" value="6"}
      <div class="col s12 m{$column} l{$column} concre movil" align="center">
        <input type="radio" name="tipofactura" class="chg_tipo with-gap per1003" val="1" id="chg_tipo1" checked>
        <label for="chg_tipo1" >Contado</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap per1004" val="2" id="chg_tipo2" disabled>
        <label for="chg_tipo2">Crédito</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap per1005" val="3" id="chg_tipo3" disabled>
        <label for="chg_tipo3">Consignación</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap per1006" val="4" id="chg_tipo4" disabled>
        <label for="chg_tipo4">Apartado</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap per1007" val="5" id="chg_tipo5" disabled>
        <label for="chg_tipo5" class="tooltipped" data-tooltip="Arrendamiento con Opción de Compra">Leasing</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap per1008" val="6" id="chg_tipo6" disabled>
        <label for="chg_tipo6" class="tooltipped" data-tooltip="Arrendamiento en Función Financiera">Financiero</label>
      </div>

    <div class="col s12 m3 l3 cre gen hide" align="center">
      <label><b>Saldo Actual: </b><span class="moneda"></span> <label id="msaldo" class="divisa"></label> </label> 
    </div>

    <div class="input-field col s12 m3 trCompra hide">
      <label for="vreferencia">Número de Referencia</label>
      <input type="text" id="vreferencia" class="validate" style="padding: 0px;margin: 0px" />
    </div>

  </div>
  <hr style="border: 1px solid #F9F9F9; width: 90%">
  <div class="row padd">

   <div class="input-field col s12 m3 l3">
      <i class="mdi mdi-calendar mdi-24px prefix"></i>
      <input type="date" class="datepicker" id="vfecha" value="" />
    </div>

    <div class="input-field con gen col s12 m3 l3 tp_all" >
    <i class="mdi mdi-coin mdi-24px prefix"></i>
      <select id="idtipopago" type="select">
        {section name=LE loop=$TPAGO}
        <option value="{$TPAGO[LE][0]}">{$TPAGO[LE][1]}</option>
        {/section}
      </select>
      <label style="color: black"><b>Forma de Pago</b></label>
    </div>
   
    <div class="input-field cre gen col s12 m3 l3 hide">
      <i class="mdi mdi-calendar-clock mdi-24px prefix"></i>
      <input type="text" id="vplazo" value="0" class="eder" disabled />
      <label style="color: black"><b>Plazo en Días</b></label>
    </div>
    
    <div class="input-field col s12 m6 show_cliente" style="position: relative;">
      <i class="mdi mdi-face mdi-24px prefix"></i>
      <input type="text" id="ncli" value="" class="autocomplete validate sclie" maxlength="64" autocomplete="off"/>
      <a class="mdi mdi-16px mdi-plus text-green pbtn tooltipped clieBTN" id="ingclie" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 8px; z-index: 180" data-position="bottom" data-tooltip="Agregar Cliente"></a>
      <i class="mdi mdi-16px mdi-email pbtn tooltipped hide clieBTN" href="#modal-correos" id="crrclie" style="position:absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 22px;z-index: 170" data-position="bottom" data-tooltip="Correos del Cliente"></i>
      <i class="mdi mdi-16px mdi-file-document-box pbtn tooltipped hide clieBTN" id="hisclie" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 38px; z-index: 160" data-position="bottom" data-tooltip="Ventas del Cliente"></i>
      
    </div> 
    
  </div>

  <div class="row">
    <div class="col s2 der gen aff afc cre hide">
      <a href="#" class="btn dropdown-button" data-activates='filtr_fin'>Financiamiento</a>
      <ul id='filtr_fin' class='dropdown-content'>
        <li><a class="optns" href="#!" fltr="0">Manual</a></li>
      </ul>
    </div>
  </div>

  <div class="row finmanual gen hide">
    <br>
    <div class="col s12 l3 input-field">
      <select id="vtipointeres">
        <option value="1">Tasa Interés Anual, %</option>
        <option value="2">Tasa Interés Efectiva, %</option>
        <option value="3">Tasa Zero, %</option>
      </select>
      <label for="vtipointeres">Tipo Interés</label>
    </div>
    
    <div class="col s12 l3 input-field">
      <input type="text" id="vinteres" class="eder calpres" value="58.8">
      <label for="vinteres">Valor Interés</label>
    </div>

    <div class="col s12 l3 input-field">
      <input type="text" id="vanos" class="eder calpres" value="0">
      <label for="vanos">Años</label>
    </div>

    <div class="col s12 l3 input-field">
      <input type="text" id="vmeses" class="eder calpres" value="0">
      <label for="vmeses">Meses</label>
    </div>

    <div class="col s12 l3 input-field">
      <i class="prefix mdi-percent mdi pbtn por-num" tipo="1""></i>
      <input type="text" id="vcuotainicial" class="eder calpres" value="0">
      <label for="vcuotainicial">Cuota Inicial (Prima)</label>
    </div>

     <div class="col s12 l3 input-field">
      <i class="prefix mdi-percent mdi pbtn por-num" tipo="1""></i>
      <input type="text" id="vcomisioning" class="eder calpres" value="0">
      <label for="vcomisioning">Comisión Ingreso</label>
    </div>

     <div class="col s12 l3 input-field">
      <i class="prefix mdi-percent mdi pbtn por-num" tipo="1""></i>
      <input type="text" id="vcomisionmes" class="eder calpres" value="0">
      <label for="vcomisionmes">Comisión Mes</label>
    </div>

    <div class="col s12 l3 input-field">
      <i class="prefix mdi-percent mdi pbtn por-num" tipo="1""></i>
      <input type="text" id="vpagresiadual" class="eder" value="0">
      <label for="vpagresiadual">Pago Residual</label>
    </div>

    <div class="col s12 l3 input-field">
      <input type="text" id="vmoratp" class="eder" value="0">
      <label for="vmoratp">Interés Moratorio En Plazo (TP)</label>
    </div>

    <div class="col s12 l3 input-field">
      <input type="text" id="vmoraimc" class="eder" value="0">
      <label for="vmoraimc">Interés Moratorio En Cuota (IMC)</label>
    </div>

    <div class="col s12 l3 input-field">
      <span>Cuota Mensual: </span> <span class="der" id="c-mes">0.00</span><br>
      <span>Tasa Efectiva(%): </span> <span class="der" id="t-efectiva">0.00</span><br>
      <span>Cuotas: </span> <span class="der" id="t-cuotas">0.00</span>
    </div>

    <div class="col s12 l3 input-field">
      <span>Total Intereses </span> <span class="der" id="t-interes">0.00</span><br>
      <span>Total Pagos: </span> <span class="der" id="t-pagos">0.00</span><br>
      <span>Prima: </span> <span class="der" id="t-prima">0.00</span>
    </div>

  </div>

  </div>


<!-- DETALLE FACTURA -->
  <div class="card z-depth-3 p2 ps hide-on-med-and-down">
  <div class="card-header head2 center hide-on-med-and-down" style="padding: 0.5%"><b>DETALLE DE FACTURA</b>
    
    <a href="#modal-productos" class="mdi mdi-search-web tooltipped mdi-24px white-text der" data-tooltip="Lista de Productos" data-position="bottom" id="lproductos" ></a>
    
    {if $smarty.session.BUSS eq 0}
    <a href="#modal-devoluciones" class="mdi mdi-arrow-collapse tooltipped mdi-24px white-text der" data-tooltip="Devolución de Productos" data-position="bottom" id="ldevolucion" style="margin-right: 10px"></a>
    {/if}
 </div>

  <div class="row">
    <div class="col s12 hide-on-med-and-down">
    
    <section class="right">

      {if $smarty.session.BUSS neq 1}
        <a href="#modal-inventario" data-tooltip="Cantidad en Inventario" id="sinv" class="tooltipped" data-position="bottom"><i class="mdi mdi-archive" ></i><a class="hide-on-small-only">:</a><span class="hide-on-small-only" id="cantI">0</span></a>
      {/if}
        <input class="with-gap" name="modselected" type="radio" value="2" id="barras" checked/>
        <label for="barras" class="isfast"><i class="mdi mdi-barcode mdi-18px tooltipped" data-tooltip="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de un Lector de Código de Barras" data-position="bottom" style="font-size: 1.4em"></i></label>

        <input class="with-gap" name="modselected" type="radio" value="1" id="teclado"/>
        <label for="teclado" class="isfast"><i class="mdi mdi-keyboard mdi-18px tooltipped" data-tooltip="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de Teclado" data-position="bottom" style="font-size: 1.4em"></i></label>
    </section>
    </div>
    <div class="col s12 hide-on-med-and-down">
<!--     <table class="table detalle" id="data-table-detalle" cellspacing="0">
      <thead> -->
        <section class="trVenta hide">
        <div class="hide-on-med-and-down">
          <div style="padding: 0 !important;" class="col s2 center-align"> <b>Código</b></div>
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
            <div style="padding: 0 !important;" class="col s1 center-align"><b>Costo</b></div>
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

        <div class="trVenta hide trsec hide-on-med-and-down">
          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código" autocomplete="off">
            <input type="hidden" id="valores">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m3">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción" autocomplete="off">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly autocomplete="off">
          </div>

          <div style=padding: 0 !important" class="input-field col s12 m1">
            <select id="uni" readonly >
              <option value="1">Unid</option>
            </select>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" id="totp" class="f center divisa" value="0.00" readonly placeholder="Total">
          </div>

          <div class="center col s12 m2" style="font-size: 1em; padding: 0px 5px !important;">
            <div class="col s8">
                <input type="checkbox" name="hasimpuesto" id="iva" hclk="0">
                <label for="iva" class="hide" style="float: left;">IVI</label>
            </div>
            <div class="col s4" style="padding: 0px">
             <a class="btn btn-floating btn2 tooltipped der addline" tr="1" data-position="bottom" data-tooltip="Ingresar Línea"><i class="mdi mdi-plus mdi-24px"></i></a>
            </div>
          </div>
        </div>

        <div class="trOCompra hide trsec hide-on-med-and-down">
          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código" autocomplete="off">
            <input type="hidden" id="valores">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m4">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción" autocomplete="off">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2 hide">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad" autocomplete="off">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <select id="uni" readonly >
              <option value="1">Unid</option>
            </select>
          </div>
          
          <div style="padding: 0px 5px !important" class="input-field col s12 m2 hide">
            <input type="text" id="totp" class="f center hide" value="0.00" readonly placeholder="Total">
          </div>

          <div class="center col s12 m2 row" style="font-size: 1em; padding: 0px 5px !important;">
            <div class="col s4" style="padding: 0px">
             <a class="btn btn-floating btn2 tooltipped der addline" tr="1" data-position="bottom" data-tooltip="Ingresar Línea"><i class="mdi mdi-plus mdi-24px"></i></a>
            </div>
          </div>
        </div>

        <div class="trCompra hide trsec hide-on-med-and-down row">
          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código" autocomplete="off">
            <input type="hidden" id="valores">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m3">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción" autocomplete="off">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad" autocomplete="off">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly autocomplete="off">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <select id="uni" readonly >
              <option value="1">Unid</option>
            </select>
          </div>

          <div class="input-field col s12 m1">
            <input type="text" class="f center" id="descup" min="0" value="0" data-mask="999999999.99" placeholder="Descuento" value="0.00" autocomplete="off">
          </div>
          
          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" id="totp" class="f center" value="0.00" readonly placeholder="Total">
          </div>

          <div class="center col s12 m2 row" style="font-size: 1em;  padding: 0px 5px !important;">
            
            <div class="col s8">
                <input type="checkbox" name="hasimpuesto" id="iva" hclk="0">
                <label for="iva" style="float: left;">IVI</label>
                <input type="checkbox" name="isexcento" id="exct" hclk="0">
                <label for="exct" style="float: left;">Excento</label>
            </div>

            <div class="col s4" style="padding: 0px">
              <a class="btn btn-floating btn2 tooltipped der addline" tr="1" data-position="bottom" data-tooltip="Ingresar Línea"><i class="mdi mdi-plus mdi-24px"></i></a>
            </div>

          </div>

        </div>

        <div class="trCompra hide trsec hide-on-med-and-down row">
          <div style="padding: 0 !important;" class="col s2 center-align"><b>Utilidad</b></div>
          <div style="padding: 0 !important;" class="col s3 center-align"><span class="truncate"><b>Precio Público</b></span></div>
        </div>

        <div class="trCompra hide trsec hide-on-med-and-down row">

          <div style="padding: 0px 5px !important" class="input-field col s2">
            <input type="text" class="f center" id="putil" min="1" value="0" placeholder="Utilidad" autocomplete="off">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s3">
            <input type="text" class="f center" id="pventa" min="1" value="0" placeholder="Precio Venta" autocomplete="off">
          </div>
        </div>

      </div>
      <div class="trcompra hide trsec hide-on-med-and-down">
          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="ventap" class="eder" autocomplete="off">
            <label for="ventap">Costo Original</label>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="ventap" class="eder" autocomplete="off">
            <label for="ventap">Precio Venta</label>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="gananciap" class="eder" autocomplete="off">
            <label for="gananciap">Utilidad</label>
          </div>
      </div>
      <div class="hide-on-large-only">
        <a class="btn-floating btn2 tooltipped modal-trigger" data-position="top" data-tooltip="Ingresar Línea" href="#modal-addline" style="position: fixed; bottom: 0;right: 0;margin-bottom: 10%;margin-right: 2%;z-index: 998"><i class="mdi mdi-plus mdi-24px"></i></a>
        <div class="edetalle center">No se Han Ingresado Productos</div>
      </div>
      <div vtabla="detallefactura" id="fdetallefacturas" tp="4" rollback="" class="col s12">
      </div>
    </div>
</div>
<!-- /DETALLE FACTURA -->

</div>

<!-- DIVISOR -->

<div class="l3 m12 s12 col p3 ps movil hide-on-med-and-down">

<div class="card center z-depth-3">
  <div class="card-header center head2 center hide-on-med-and-down" style="padding: 1%"><b>DESGLOCE DE FACTURA</b></div>

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

        <div class="col s12 m12 l12 input-field">
          <textarea id="vcomentario" cols="25" class="materialize-textarea" type="textarea" style="min-height: 80px; max-height: 80px; height: 80px; min-width: 100%; max-width:100%; width: 100%;border: 1px solid #e2e2e2;margin: 0px;" data-length="500"></textarea>
          <label for="vcomentario">Comentario de Factura</label>
        </div>
        <table style="margin-top: 150px">
          <tr>
            <td style="padding-top: 0px;padding-bottom: 0px;"><label for="vdescuentop">Descuento</label></td>
            <td>
              <select id="tdescuento" class="eder tdesc trVenta hide" tp="1" style="margin: 0px; height: 0.5%% !important">
              </select>
              <input type="text" id="vdescuentop" class="eder _txtaside hide trCompra" value="0" tdesc="1"
              style="margin:0px;height: 0.5% !important" placeholder="DESCUENTO" autocomplete="off">
            </td>
          </tr>
          <tr class="hide">
            <td><label for="vflete">Flete</label></td>
            <td><input type="text" id="vflete" class="eder _txtaside divisa" value="0" placeholder="FLETE" style="margin:0px;height: 0.5% !important"></td>
          </tr>
          <tr class="hide">
            <td><div class="prefix pbtn" id="btnAjuste" accion="1"><i class="mdi mdi-plus mdi-24px"></i></div></td>
            <td><input type="text" id="ajuste" class="eder _txtaside" value="" style="margin:0px;height: 0.5% !important" placeholder="Ajuste máximo: 10" maxlength="4"></td>
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
              <span class="moneda"></span><span id="subtot" type="html" value="0" style="color: black">0.00</span>
            </td>
          </tr>
        </thead>

        <tbody id="sh_imp">
          
        </tbody>  

        <tfoot>  
          <tr class="_desc">
            <td>DESCUENTO:</td>
            <td style="float: right;"><span class="moneda"></span><span id="descuento_v" type="html" value="0">0.00</span></td>
          </tr>

          <tr class="_flete hide">
            <td>FLETE:</td>
            <td style="float: right;"><span class="moneda"></span><span id="flete" type="html" value="0">0.00</span></td>
          </tr>

          <tr style="border-top:1px solid #E9E9E9">
            <td><b>TOTAL:</b></td>
            <td style="float: right;"><b><span class="moneda"></span><span id="tot" type="html" value="0">0.00</span></b>
            </td>
          </tr>
        </tfoot>
      </table>
      </div>

      <div class="col s12 m12 l12"><br>
        <div class="row">
          <div class="col s12 m6 l6">
              <input type="checkbox" id="p_v" checked />
              <label for="p_v" style="color: black; padding-left: 20px;" class="tooltipped" data-tooltip="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'" data-position="left">Punto Venta</label>
          </div>

          <div class="col s12 m6 l6 _odt hide">
            <select id="idodt" type="select">
              <option value="0" style="color: black"><b>ODT</b></option>
            </select>
          </div>

          <div class="col s12" style="padding: 0px;">
            <div class="row" style="padding: 0px;">
              <div class="col s6 hide clieBTN" id="exobtn" style="padding: 0px;">
                <a href="#modal-exo" class="btn doexo modal-trigger" style="width: 90%;padding-left: 19px; ">Exonerar</a>
              </div>
              <div class="col s6" style="padding: 0px;">
                <a {if $smarty.session.TMPT neq 2} href="#modal-tpagos" id="facturar" {/if} class="btn btn1"  style="margin-bottom: 3%;">Facturar</a>
              </div>
            </div>  
          </div>

          </div>
        </div>

      </div>

  </div>


</div>

<!-- ffacturas -->
</div>
 <!-- bdy -->

<div class="modal modal-fixed-footer" id="modal-addline" style="height: 400px;">
  <div class="modal-content">
    <div class="trVenta hide trsec hide-on-large-only">
      <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código" autocomplete="off">
            <input type="hidden" id="valores">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m3">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción" autocomplete="off">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly autocomplete="off">
          </div>

          <div style=padding: 0 !important" class="input-field col s12 m1">
            <select id="uni" readonly >
              <option value="1">Unid</option>
            </select>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
          </div>

          <!-- <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" id="totp" class="f center divisa" value="0.00" readonly placeholder="Total">
          </div> -->

          <div class="center col s12 m2" style="font-size: 1em; padding: 0px 5px !important;">
            <div class="col s8">
                <input type="checkbox" name="hasimpuesto" id="iva" hclk="0">
                <label for="iva" class="hide" style="float: left;">IVI</label>
            </div>
          </div>
    </div>
    <div class="trOCompra hide trsec hide-on-large-only">
      ALGO O
    </div>
    <div class="trCompra hide trsec hide-on-large-only">
      ALGO C
    </div>
  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat addline" tr="2">Agregar</a>
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
  </div>
</div>

<div class="modal modal-fixed-footer grandemodal" id="modal-productos" style="height: 100%; width: 75%">
  <div class="modal-header head3 center" style="font-size: 22px;">Listado de Productos</div>
  <div class="modal-content">
    <div class="input-field">
      <span class="prefix mdi mdi-magnify mdi-24px"></span>
      <input type="text" id="bproductos" style="width: 70%">
      <label>Buscar por Código, Nombre, Marca, Tipo o Familia</label>
    </div>
    <table class="table centered bordered z-depth-1">
      <thead>
        <tr>
        <th></th>
        <th>Código</th>
        <th>Nombre</th>
        <th>Marca</th>
        <th>Tipo</th>
        <th>Familia</th>
        <th>Venta</th>
        <th>Cantidad</th>
        </tr>
      </thead>
      <tbody id="bdylproductos"></tbody>
    </table>
  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
      <a class="modal-action modal-close waves-effect waves-green btn-flat" id="mstprod">Aceptar</a>
  </div>
</div>

<div class="modal modal-fixed-footer" id="modal-devoluciones">
   <div class="modal-header head3 center" style="font-size: 22px;">Buscar Factura</div>
  <div class="modal-content">
    
  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
  </div>
</div>

<div class="modal modal-fixed-footer" id="modal-clientes" style="height: 400px;">
   <div class="modal-header head3 center" style="font-size: 22px;">Agregar Cliente</div>
  <div class="modal-content">

    <div class="row">

      <div class="input-field col s6">
      </div>

      <div class="input-field col s6">
        <a href="#" data-activates="slide-tc" id="slideDireccion" data-num="3"  data-direccion="" data-idbarrio="0" class="button-collapse der tooltipped tc-show black-text" data-tooltip="Ubicacion del Cliente" data-position="bottom" id="tc-u" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"><i class="mdi mdi-map-marker  mdi-24px"></i></a>
        <input type="hidden" id="vdireccion" readonly>

        <a href="#" data-activates="slide-tc" data-num="1" id="slideTelefono" class="mdi mdi-phone tooltipped mdi-24px button-collapse der tc-show  black-text" data-tooltip="Teléfonos del Cliente" data-position="bottom" id="tc-t" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"></a>
        <input type="hidden" id="vtelefono" readonly>

        <a href="#" data-activates="slide-tc" data-num="2" id="slideCorreo" class="button-collapse der tc-show tooltipped black-text" data-tooltip="Correos del Cliente" data-position="bottom" id="tc-c" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"><i class="mdi mdi-email  mdi-24px"></i></a>
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

<div class="modal modal-fixed-footer" id="modal-correos" style="height: 400px;">
  <div class="modal-content" id="bdycrr">
    
  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
      <a class="modal-action modal-close waves-effect waves-green btn-flat" id="mstrcrr">Aceptar</a>
  </div>
</div>

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


<div id="modal-tpagos" class="modal modal-fixed-footer grandemodal" gfort="0" align="center" style="width: 70%; height: 100% !important;">
<!--  -->
<section id="m-efectivo" class="modal-tpago">
  <div class="modal-content">
  <b><span style="color: #2196F3; font-size: 1.8em !important;">Efectivo</span></b><hr style="border: 1px solid #F0F0F0">
    <span>TOTAL:</span><br>
    <b><span class="totalfact" style="font-size: 2.6em !important;"></span></b>
    <div class="input-group input-group" style="width: 80%; font-size: 2em !important;">
      <span>PAGA CON:</span>
      <input type="text" class="form-control form-control-sm center numeric" id="pcon" placeholder="0.00" value="0.00" style="font-size: 1.5em !important;" autocomplete="off">
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

<script src="../assets/js/modulos/ventas.js?v=10.0.0.63"></script>
