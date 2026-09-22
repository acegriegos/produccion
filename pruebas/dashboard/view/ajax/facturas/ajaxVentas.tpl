<section id="ffacturas">

<div class="row">
   <div class="hide-on-large-only row mstatic" style="background-color: #e2e2e2">
      <div class="col s4 center" style="cursor: pointer;">
        <input type="radio" name="ubfactura" val="1" id="ubfact1" checked>
        <label for="ubfact1" >Info</label>
      </div>
      <div class="col s4 center" style="cursor: pointer;">
        <input type="radio" name="ubfactura" val="2" id="ubfact2">
        <label for="ubfact2" >Detallepor</label>
      </div>
      <div class="col s4 center" style="cursor: pointer;">
        <input type="radio" name="ubfactura" val="3" id="ubfact3">
        <label for="ubfact3" >Desgloce</label>
      </div>
  </div>

  <div class="l9 m12 s12 col movil" id="cuerpo">
 
<div class="card z-depth-3 movil p1 ps" style="margin-bottom: 0px;">
<div class="card-header center head1 white-text">
  <a href="#!" class="green btn per1111 hide"  title="Realizar Factura en Espera" style="float: left;" id="prefact" vid="0">PRE-FACTURA</a>
  <p class="flow-text" style="margin: 0%;" id="previews"><span id="titfact"></span> <span id="loadMyBussiness" impresa="{$smarty.session.IMPRESA}"></span> <span class="hide"> [0 de 50 Documentos]</span>
    <a class="mdi mdi-magnify pbtn mdi-24px tooltipped der white-text" data-position="bottom" data-tooltip="Ver Facturas" onclick="verfacturas();"></a>
  {if $smarty.session.CAJA gt 0}
  <a class="trVenta hide btn btn3 tooltipped der white-text" data-position="bottom" data-tooltip="Cargar Facturas" id="cargarfact" idcaja="{$smarty.session.CAJA}"><span class="white-text" id="cantFact"></span></a>
  {/if}
</p>
  
</div>
  <input type="hidden" class="zelda" tipo="{$smarty.session.TIPO}">
  <a id="fe" class="hide"></a>
  
  <div class="row pequeño">      
      <div class="col s12 m3 l3 numfact" align="center">
        <label class="black-text" style="font-size: 18px;"><b>N° Factura: </b> <span class="red-text" id="idfact"></span></label>
      </div>

      {assign var="column" value="6"}
      <div class="col s12 m{$column} l{$column} concre movil hide trVenta" align="center" id="tpagos">
        <input type="radio" name="tipofactura" class="chg_tipo with-gap per1104" val="1" id="chg_tipo1" checked>
        <label for="chg_tipo1" >Contado</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap" disabled val="2" id="chg_tipo2">
        <label for="chg_tipo2" class="per1105-">Crédito</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap" val="3" id="chg_tipo3" disabled>
        <label for="chg_tipo3" class="per1106 hide">Consignación</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap" val="4" id="chg_tipo4" disabled>
        <label for="chg_tipo4" class="per1107 hide">Apartado</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap" val="5" id="chg_tipo5" disabled>
        <label for="chg_tipo5" class="tooltipped per1108 hide" data-tooltip="Arrendamiento con Opción de Compra">Leasing</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap" val="6" id="chg_tipo6" disabled>
        <label for="chg_tipo6" class="tooltipped per1109 hide" data-tooltip="Arrendamiento en Función Financiera">Financiero</label>
        <input type="radio" name="tipofactura" class="chg_tipo with-gap" val="98" id="chg_tipo98">
        <label for="chg_tipo98" class="tooltipped per1112 hide" data-tooltip="Venta por Subsidio">Subsidio</label>
      </div>
    <div class="col s12 m3 l3 cre gen hide" align="center">
      <label><b>Saldo Actual: </b><span class="moneda"></span> <label id="msaldo" class="divisa"></label> </label> 
    </div>

    <div class="input-field col s12 m3 trCompra hide per1116" style="position: relative;">
      <label for="vreferencia"></label>
      <input type="text" id="vreferencia" class="validate eder" placeholder="Número de Referencia" style="padding: 0px;margin: 0px" autocomplete="off" />
      <i class="mdi mdi-eye detextra pbtn hide" id="show_in_ref" data-activates="extra" fila="10" tabla="64" style="position: absolute;top: 10px; left: 0;"></i>
    </div>

    <div class="input-field col s12 m3 hide" id="buscarCOC">
      <label for="vcompra"></label>
      <input type="text" id="vcompra" class="validate eder" placeholder="Número de Referencia" style="padding: 0px;margin: 0px" readonly autocomplete="off" vid="0" />
    </div>

  </div>
  <hr style="border: 1px solid #F9F9F9; width: 90%">
  <div class="row padd">

   <div class="hide input-field col s12 m3 l3">
      <i class="mdi mdi-calendar mdi-24px prefix"></i>
      <input type="date" class="datepicker" id="vfecha" value="" />
    </div>
   
    <!-- 4.4 -->
    <div class="input-field cre gen col s12 m2 hide">
      <i class="mdi mdi-calendar-clock mdi-24px prefix"></i>
      <input type="text" id="vplazo" value="0" class="eder" autocomplete="off" />
      <label style="color: black"><b>Plazo en Días</b></label>
    </div>
    
    <div class="input-field col s12 m6 show_cliente" style="position: relative;">
      <i class="mdi mdi-face mdi-24px prefix"></i>
      <input type="text" id="ncli" value="" class="autocomplete sclie" maxlength="64" autocomplete="off"/>

      <a class="mdi mdi-16px mdi-plus text-green pbtn tooltipped clieBTN" id="ingclie" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 8px; z-index: 180;cursor: pointer;" data-position="bottom" data-tooltip="Agregar Cliente"></a>

      <!-- <a class="mdi mdi-16px mdi-plus text-green pbtn tooltipped clieBTN hide trCompra trOCompra" id="ingclie" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 8px; z-index: 180;cursor: pointer;" data-position="bottom" data-tooltip="Agregar Proveedor"></a> -->

      <i class="mdi mdi-16px mdi-email pbtn tooltipped hide clieBTN" href="#modal-correos" id="crrclie" style="position:absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 22px;z-index: 170" data-position="bottom" data-tooltip="Correos del Cliente"></i>
      <i class="mdi mdi-16px mdi-file-document-box pbtn tooltipped hide clieBTN" id="hisclie" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 38px; z-index: 160" data-position="bottom" data-tooltip="Ventas del Cliente"></i>
      
    </div> 

    <!-- 4.4 -->
    <div class="col s12 m4 hide trVenta row">
      <div class="input-field_ col s6">
        <select id="codact" class="browser-default"></select>
        
      </div>
      <div class="col s6 hide clieBTN" id="cod_act_cliente" style="position: relative;">
        <i class="prefix mdi mdi-refresh pbtn" style="position: absolute;left: 0;" onclick="getActividades()" title="Refrescar Actividades"></i>
        <select id="actividad_cliente" class="browser-default"></select>
        <label for="actividad_cliente" style="font-size:8px;position: absolute; top: 0;">Actividad Receptor</label>
      </div>
      
    </div>

    <small id="msj_small" class="hide trVenta col s12" style="color: #621313"></small>

    <section class="col s6 hide trCompra">
      <input type="radio" name="tipocompra" value="1" id="cmanual">
      <label for="cmanual">Manual</label>

      <input type="radio" name="tipocompra" value="2" id="cauto" checked>
      <label for="cauto">Automática</label>

      <input type="radio" id="celectronica" name="tipocompra" value="3">
      <label for="celectronica">Compra Electrónica</label>

      <input type="radio" id="xcoc" name="tipocompra" value="4">
      <label for="xcoc">Por OC</label>
    </section>
<!-- gen aff afc cre -->
  <div class="row">
    <div class="col s2 der hide">
      <a href="#" class="btn dropdown-button" data-activates='filtr_fin'>Financiamiento</a>
      <ul id='filtr_fin' class='dropdown-content'>
        <li><a class="optns" href="#!" fltr="0">Manual</a></li>
      </ul>
    </div>
  </div>

  <div class="row finmanual geni hide">
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
      <i class="prefix mdi-percent mdi pbtn por-num" tipo="1"></i>
      <input type="text" id="vcuotainicial" class="eder calpres" value="0">
      <label for="vcuotainicial">Cuota Inicial (Prima)</label>
    </div>

     <div class="col s12 l3 input-field">
      <i class="prefix mdi-percent mdi pbtn por-num" tipo="1"></i>
      <input type="text" id="vcomisioning" class="eder calpres" value="0">
      <label for="vcomisioning">Comisión Ingreso</label>
    </div>

     <div class="col s12 l3 input-field">
      <i class="prefix mdi-percent mdi pbtn por-num" tipo="1"></i>
      <input type="text" id="vcomisionmes" class="eder calpres" value="0">
      <label for="vcomisionmes">Comisión Mes</label>
    </div>

    <div class="col s12 l3 input-field">
      <i class="prefix mdi-percent mdi pbtn por-num" tipo="1"></i>
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
</div>

<!-- DETALLE FACTURA -->
  <div class="card z-depth-3 p2 ps hide-on-med-and-down" style="margin: 0px" id="detalle">
  <div class="card-header head2 hide-on-med-and-down row">
    <div class="col s4"></div>
    <div class="col s4 center" style="line-height:2">
      <b>DETALLE DE FACTURA </b>
    </div>
    <div class="col s4 eder">

      <a href="#modal-libreta" class="mdi mdi-book-open-variant tooltipped mdi-24px hide" data-tooltip="Libreta de Créditos" data-position="bottom" id="libreta"></a>

      <a href="#modal-pesaje" class="mdi mdi-scale tooltipped mdi-24px hide" data-tooltip="Productos de Pesaje" data-position="bottom" id="pesaje"></a>

      <a href="#modal-autoOC" class="mdi mdi-home-automation tooltipped mdi-24px hide trOCompra" data-tooltip="Ordenes Automáticas" data-position="bottom" id="aoc"></a>

      <a href="#" class="mdi mdi-24px mdi-upload tooltipped hide clieBTN" id="coc" data-tooltip="Cargar Orden de Compra" data-position="bottom"></a>

      <a href="#" class="hide tooltipped" data-tooltip="Generar Factura Electrónica" data-position="bottom" id="dofe" act="0">FE</a>

      <a class="mdi mdi-xml tooltipped mdi-24px hide pbtn" data-tooltip="Ver XML-Otos" id="xo-sh"></a>
      
      <a href="#" class="mdi mdi-briefcase-upload hide tooltipped mdi-24px per1115" data-tooltip="Cargar Item Variable" data-position="bottom" id="locompras"></a>

      <a href="#" class="mdi mdi-account-cash hide tooltipped mdi-24px" data-tooltip="Saldos a Favor" data-position="bottom" id="saldos"></a>

      <a href="#" class="mdi mdi-account-alert hide tooltipped mdi-24px per1110" data-tooltip="Factura Especial" data-position="bottom" id="special"></a>

      <a href="#modal-devoluciones" class="mdi mdi-arrow-collapse tooltipped mdi-24px" data-tooltip="Devolución de Productos" data-position="bottom" id="ldevolucion"></a>

      <a href="#" data-activates="slide-factura" class="button-collapse hide" id="dfact"></a>
      
      <a href="#modal-productos" class="mdi mdi-search-web tooltipped mdi-24px" data-tooltip="Lista de Productos" data-position="bottom" id="lproductos"></a>

    </div>
 </div>

  <div class="row">
    <div class="col s12" style="padding-right: 0px;margin-bottom: 1.5%;" id="addliner">

      <select class="col s3 hide" id="invgeneral" style="margin: 0px;width: 150px;padding: 0px;float: left;">
        <option value="6">NARANJO</option>
        <option value="10">SAN CARLOS</option>
      </select>
          <input type="radio" name="tcompra" id="tc1" value="1" class="with-gap" checked>
          <label for="tc1"  class="hide" style="float: left;margin-right: 5px">Costo</label>
          <input type="radio" name="tcompra" id="tc2" value="2" class="with-gap">
          <label for="tc2"  class="hide" style="float: left;margin-right: 5px">Gasto Diferido</label>
          <input type="radio" name="tcompra" id="tc3" value="3" class="with-gap">
          <label for="tc3"  class="hide" style="float: left;margin-right: 5px">Gasto no Diferido</label>
    <section class="right hide-on-small-only">
          <input type="checkbox" name="hasimpuesto" id="iva" hclk="0">
          <label for="iva" class="hide" style="float: left;margin-right: 5px">IVI</label>
      {if $smarty.session.BUSS neq 1}
        <a href="#" data-tooltip="Cantidad en Inventario" id="sinv" class="tooltipped" data-position="bottom"><i class="mdi mdi-archive" ></i><a class="hide-on-small-only">:</a><span class="hide-on-small-only" id="cantI">0</span> <span id="tuni"></span></a>
      {/if}
        <input class="with-gap" name="modselected" type="radio" value="2" id="barras" checked/>
        <label for="barras" class="isfast"><i class="mdi mdi-barcode mdi-18px tooltipped" data-tooltip="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de un Lector de Código de Barras" data-position="bottom" style="font-size: 1.4em"></i></label>

        <input class="with-gap" name="modselected" type="radio" value="1" id="teclado"/>
        <label for="teclado" class="isfast"><i class="mdi mdi-keyboard mdi-18px tooltipped" data-tooltip="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de Teclado" data-position="bottom" style="font-size: 1.4em"></i></label>


        <input type="checkbox" id="cxp" hclk="0">
        <label for="cxp" class="hide trCompra" style="float: left;margin-right: 5px">CXP</label>
        <a class="btn btn-floating btn2 tooltipped der addline" tr="1" data-position="bottom" data-tooltip="Ingresar Línea" style="margin-left: 5px;"><i class="mdi mdi-plus mdi-16px"></i></a>
            
    </section>

    </div>
    <div class="trsec col s12 hide-on-med-and-down">
<!--     <table class="table detalle" id="data-table-detalle" cellspacing="0">
      <thead> -->
        <section class="trVenta hide trsec">

          <div class="row"> 
            <div class="input-field col s2">
              <input type="hidden" id="valores">
              <input type="text" placeholder="Código" id="codp" autocomplete="off" class="autocomplete">
              <label for="codp" style="font-size: 20px" class="active"><b>Código</b></label>
            </div>

            <div class="input-field col s3">
              <input type="text" id="descp" placeholder="Artículo" autocomplete="off" class="autocomplete">
              <label for="descp" style="font-size: 20px" class="active center"><b>Artículo</b></label>
            </div>

           <div class="input-field col s2">
              <input type="text" id="precp" class="divisa numeric eder" value="0.00" readonly autocomplete="off">
              <label for="precp" style="font-size: 20px" class="active"><b>P.Unit</b></label>
            </div> 

            <div class="input-field col s1">
               <input type="text" id="cantp" min="1" value="1" autocomplete="off" placeholder="Cantidad" class="center">
              <label for="c4" style="font-size: 20px" class="active"><b>Cantidad</b></label>
            </div> 

            <div class="col s1 input-field">
              <label for="uni" class="active" style="font-size: 20px;"><b>Unidad</b></label>
              <select id="uni" readonly >
                <option value="1">Unid</option>
              </select>
            </div>

            <div class="col s1 input-field">
              <input type="text" id="descuento_" class="eder" value="0" placeholder="Descuento">
              <label for="descuento_" style="font-size: 20px" class="active"><b>Descuento</b></label>
            </div>

            <div class="input-field col s2">
              <input type="text" id="totp" class="divisa eder" value="0.00" readonly placeholder="Total">
              <label for="totp" style="font-size: 20px" class="active"><b>Total</b></label>
            </div> 

          </div>
        </section>

        <section class="trCompra hide v104">
          <div class="hide-on-med-and-down">
            <div style="padding: 0 !important;" class="col s2 center-align"><b>Código Barras</b></div>
            <div style="padding: 0 !important;" class="col s3 center-align"><span class="truncate"><b>Descripción</b></span></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><span class="truncate"><b>Unidad</b></span></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><span class="truncate"><b>Cantidad</b></span></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><b>Costo</b></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><span class="truncate"><b>Descuento</b></span></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><b>Total</b></div>
            <div style="padding: 0 !important;" class="col s1 center-align"><b>IVA</b></div>
            <div style="padding: 0 !important;" class="col s1 center-align"></div>

          </div>
         
        </section>

        <div class="trOCompra hide trsec hide-on-med-and-down row" id="encabezadoOCompra">
          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="codp" class="f prod center truncate" autocomplete="off" placeholder="000">
            <input type="hidden" id="valores">
            <label for="codp" class="_active" style="font-size: 20px"> <b>Código</b></label>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m3">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Item" autocomplete="off">
            <label for="descp" class="_active" style="font-size: 20px"><b>Descripción</b></label>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" class="f center divisa numeric" id="precp" value="0.00">
            <label for="precp" class="_active" style="font-size: 20px"><b>Precio</b></label>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" class="f center" id="cantp" min="1" value="1" autocomplete="off"  autocomplete="off">
            <label for="cantp" class="_active" style="font-size: 20px"><b>Cantidad</b></label>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <label for="uni" class="_active" style="font-size: 20px"><b>Unidad</b></label>
            <select id="uni" readonly >
              <option value="1">Unid</option>
            </select>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" class="numeric eder" id="factor" value="1" readonly>
            <label for="factor" class="_active" style="font-size: 20px"><b>Factor</b></label>
          </div>
          
          <div style="padding: 0px 5px !important" class="input-field col s12 m2 hide">
            <input type="text" id="totp" class="f center hide divisa" value="0.00" readonly placeholder="Total">
          </div>
        </div>

        <div class="trCompra hide trsec hide-on-med-and-down row v104">
          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código" autocomplete="off">
            <input type="hidden" id="valores">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m3">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción" autocomplete="off">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1 _uni">
            <select id="uni" readonly >
              <option value="1">Unid</option>
            </select>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" class="f center" id="cantp" min="1" value="1" autocomplete="off" placeholder="Cantidad" autocomplete="off">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly autocomplete="off">
          </div>

          <div class="input-field col s12 m1">
            <input type="text" class="f center" id="descup" min="0" value="0" placeholder="Descuento" value="0.00" autocomplete="off">
          </div>
          
          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" id="totp" class="f center divisa" value="0.00" readonly placeholder="Total">
          </div>

         <div class="center col s12 m2 row" style="font-size: 1em;  padding: 0px 5px !important;">
            <div style="padding: 0 !important;" class="col s8 input-field valor_grabado">
                <select id="vimpiva" style="margin: 0px" num="4">
                    <option value="1" num="0">Exento 0%</option>
                    <option value="2" num="1">Reducido 1%</option>
                    <option value="3" num="2">Reducido 2%</option>
                    <option value="4" num="4">Reducido 4%</option>
                    <option value="5" num="0">Transitorio 0%</option>
                    <option value="6" num="4">Transitorio 4%</option>
                    <option value="7" num="8">Transitorio 8%</option>
                    <option selected value="8" num="13">General 13%</option>
                </select>
            </div>
            <div class="col s4" style="padding: 0px">
          
            </div>

          </div>
        </div>

      </div>
      
      <!-- ULTIMAS_REFERENCIAS -->

          <div class="col s12 hide" id="show_last_ref" style="min-height: 50px;background-color: white;position: absolute;
    top: 135px;width: 98%;">
            <table>
              <tr style="border-bottom: 1px solid black;">
                <td>Proveedor</td>
                <td class="fast_ref_costp">Último Costo</td>
                <td>Última Compra</td>
                <td>Cantidad Solicitada</td>
                <td>Cantidad Recibida</td>
                <td>OC</td>
                <td>Compra</td>
              </tr>
              <tbody id="fast_refs"></tbody>
            </table>
          </div>

      {if $smarty.session.BUSS neq 1}
      <div class="trCompra hide trsec hide-on-med-and-down row v104" style="font-size: 12px" id="precioscat">
        <table style="border: 1px solid #e2e2e2">
          <thead>
            <tr>
              <th align="center">Tipo Precio</th>
              <th>Margen</th>
              <th>Venta+IVA</th>
              <th></th>
          </tr>
          </thead>
          
          <tr id="n0">
            <td>Publico</td>

            <td><span class="gan1">0.00</span> -> <input type="number" class="gan2 browser-default" value="0.00" style="border:0px;height: auto !important;"></td>
            <td><span class="ven1">0.00</span> -> <input type="number" class="ven2 browser-default" value="0.00" style="border:0px;height: auto !important;"></td>
            <td rowspan="3">
              <b>Costo:</b> <span id="cos1">0.00</span> -> <span id="cos2">0.00</span> <br>
              <input type="checkbox" id="chgvalor">
              <label for="chgvalor">Por Venta</label>
              <input type="checkbox" id="byprepo">
              <label for="byprepo">Preponderar</label> <br>
              <button class="browser-default hide" id="changemar">Aceptar</button>
            </td>
          </tr>

          {section name=LE loop=$NVLCLIE}
            <tr id="n{$NVLCLIE[LE][0]}">
            <td>{$NVLCLIE[LE][1]}</td>
            <td><span class="gan1">0.00</span> -> <input type="number" class="gan2 browser-default" value="0.00" style="border:0px;height: auto !important;"></td>
            <td><span class="ven1">0.00</span> -> <input type="number" class="ven2 browser-default" value="0.00" style="border:0px;height: auto !important;"></td>
            <td>
            </td>
          </tr>
          {/section}

        </table>
      </div>
      {/if}
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
      <div vtabla="detallefactura" id="fdetallefacturas" tp="4" rollback="" class="col s12" style="margin-bottom: 5px;">
      </div>
      <div class="row">
        <div class="col s6 hide trCompra">
          <b>Total Líneas:</b> <span id="tlines">0</span> <br>
          <b>Total Productos:</b> <span id="tprods">0</span>
        </div>
        <div class="col s6">
          <a class="btn hide der" id="docompra">Aceptar</a>  
          <a class="btn green der hide" id="savecompra_" style="margin-right: 1%;">Guardar</a>
        </div>
             
      </div>
    </div>
</div>
<!-- /DETALLE FACTURA -->

</div>

<!-- DIVISOR -->

<div class="l3 m12 s12 col p3 ps movil hide-on-med-and-down mfact" id="desgloce">

<div class="card center z-depth-3">
  <div class="card-header center head2 center hide-on-med-and-down" style="padding: 1%"><b>DESGLOCE DE FACTURA</b></div>

  <div class="row">
    
    <div class="col s12 m12 l12" style="margin-top: -20px">
    <br>
      <!-- <label for="monedas">Divisa</label> -->

      <section class="hide">
        <span class="truncate"><b>Usuario:</b> <span id="username">{$smarty.session.NOM|upper}</span></span>
      </section>

      <div class="input-field">
        <select id="monedas">
          {section name="LE" loop=$MON}
            <option value="{$MON[LE][0]}" dv="{$MON[LE][2]}">{$MON[LE][1]} {if $smarty.section.LE.index neq 0} ({$MON[0][3]} {$MON[LE][2]}) {/if}</option>
          {/section}
        </select>
      </div>

      {if $AG}
      <div class="input-field hide trVenta">
        <select id="vidagente" type="select">
            <option value="0">Agente</option>
          {section name="LE" loop=$AG}
            <option value="{$AG[LE][0]}">{$AG[LE][1]}</option>
          {/section}
        </select>
      </div>
      {/if}
    </div>


    <div class="col s12 m12 l12">

        <div class="col s12 input-field">
          <textarea id="vcomentario" cols="25" class="materialize-textarea" type="textarea" style="min-height: 40px; max-height: 60px; height: 60px; min-width: 100%; max-width:100%; width: 100%;border: 1px solid #e2e2e2;margin: 0px;" data-length="180"></textarea>
          <label for="vcomentario">Comentario de Factura</label>
        </div>
        <div class="col s12 input-field hide" id="_razon">
          <span style="text-align: left;"><b class="pbtn">Productos con Margen Inferior</b> <br> <b>Justifique Venta</b> </span>
          <textarea id="razonventa" cols="25" class="materialize-textarea" type="textarea" style="min-height: 40px; max-height: 60px; height: 60px; min-width: 100%; max-width:100%; width: 100%;border: 1px solid #e2e2e2;margin: 0px;" data-length="180"> </textarea>
        </div>
        <table style="margin-top: 100px">
          <tr class="hide trCompra trVenta">
            <td style="padding-top: 0px;padding-bottom: 0px;"><label for="vdescuentop">Descuento</label></td>
            <td>
              <select id="tdescuento" class="eder tdesc trVenta hide" tp="1" style="margin: 0px; height: 0.5%% !important">
              </select>
              <input type="text" id="vdescuentop" class="eder _txtaside hide trCompra" value="0" tdesc="1"
              style="margin:0px;height: 0.5% !important" placeholder="DESCUENTO" autocomplete="off">
            </td>
          </tr>
          <tr class="hide clieBTN" id="norden">
            <td><label for="oc">N° Orden</label></td>
            <td><input type="text" id="oc" class="eder _txtaside" value="" autocomplete="off" style="margin:0px;height: 0.5% !important"></td>
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
            <td>GRAVADO:</td>
            <td style="float: right;">
              <span class="moneda"></span><span id="subtot" type="html" value="0" style="color: black">0.00</span>
            </td>
          </tr>
          <tr>
            <td>EXENTO:</td>
            <td style="float: right;">
              <span class="moneda"></span><span id="exent" type="html" value="0" style="color: black">0.00</span>
            </td>
          </tr>
          <tr class="">
            <td>EXONERADO:</td>
            <td style="float: right;"><span class="moneda"></span><span id="exonerado" type="html" value="0">0.00</span></td>
          </tr>
          <tr class="_desc">
            <td>DESCUENTO:</td>
            <td style="float: right;"><span class="moneda"></span><span id="descuento_v" type="html" value="0">0.00</span></td>
          </tr>
          <tr class="hide rest">
            <td>10% SERV.:</td>
            <td style="float: right;"><span class="moneda"></span><span id="serv" type="html" value="0" class="otroscargos" porcentaje="10">0.00</span></td>
          </tr>
        </thead>

        <tbody id="sh_imp">
          
        </tbody>  

        <tfoot> 

           <tr style="border-top:1px solid #E9E9E9;">
            <td colspan="2" class="center"><b>TOTAL</b></td>
          </tr>
          <tr style="font-size:35px">
            <td colspan="2" class="center"><b><span class="moneda"></span><span id="tot" type="html" value="0">0.00</span></b></td>
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

          <div class="col s12 m6 l6 rest hide">
              <input type="checkbox" id="impm"/>
              <label for="impm" style="color: black; padding-left: 20px;" class="tooltipped" data-tooltip="Seleccione esta opción para Acreditar el Impuesto de Mesero" data-position="left">Imp. Mesero</label>
          </div>

          <div class="col s12 m6 l6 _odt hide">
            <select id="idodt" type="select">
              <option value="0" style="color: black">ODT</option>
            </select>
          </div>

          <div class="col s12" style="padding: 0px;">
            <div class="row" style="padding: 0px;">
              <a href="#modal-exo" class="btn doexo modal-trigger hide clieBTN col s6" title="Exonerar" style="border-radius: 50px 50px;" id="exobtn">Exonerar</a>
              <a {if $smarty.session.TMPT neq 2} href="#modal-tpagos" id="facturar" {/if} class="btn btn1 col s6"  style="margin-bottom: 3%;border-radius: 50px 50px;">Facturar</a>
              <div class="col s12 order hide">
                <a href="#!" class="green btn"  title="Imprimir Orden" id="printOrder" style="border-radius: 50px 50px;">Imprimir Orden</a>
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
 
 <div class="modal modal-fixed-footer" id="modal-pedidos" style="width: 75%;">
  <div class="modal-header head2 center" style="font-size: 22px;">Pedidos</div>
  <div class="modal-content">
    <div class="row">
      <div class="col s4">
        <b>Producto:</b> <span id="pedido_producto" vid="0"></span> <br>
      </div>

      <div class="col s4 input-field">
        <input type="text" class="fastClient" vid="0" id="pedido_cliente">
        <label for="pedido_cliente">Cliente</label>
      </div>

      <div class="col s4 row">

        <div class="col s4 input-field">
          <input type="number" id="pedido_cantidad" class="eder">
          <label for="pedido_cantidad">Cantidad</label>
        </div>

        <div class="col s4 input-field">
          <input type="number" id="pedido_venta" class="eder" value="0">
          <label for="pedido_venta">Venta</label>
        </div>
        
        <div class="col s4">

          <label class="chk">
            <input type="checkbox" id="pedido_to_stock">
            <span></span> Inventario
          </label>

          <a class="pbtn" title="Agregar a Pedidos en Curso" id="pedido_add"> <i class="mdi mdi-plus"></i> </a>
        </div>
      </div>
    </div>
    
    <table>
      <tr>
        <td colspan="100%" class="center">
          <b>Pedidos en Curso</b>
        </td>
      </tr>
      <tr>
        <td>Pedido</td>
        <td>Cliente</td>
        <td>Fecha</td>
        <td>Cantidad</td>
        <td>Venta</td>
        <td>Destino</td>
        <td>Usuario</td>
        <td>Acciones</td>
      </tr>
      <tbody id="ped_en_curso"></tbody>
    </table>
  </div>
  <div class="modal-footer">
      <a class="modal-action waves-effect waves-green btn-flat" id="save_pedidos">Aceptar</a>
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
  </div>
</div>

<div class="modal modal-fixed-footer per7302 hide" id="modal-docaja">
   <div class="modal-header head3 center" style="font-size: 22px;">Iniciar Caja</div>
  <div class="modal-content">
    <div class="input-field">
      <input type="text" id="_valor_caja" value="0.00" class="eder numeric">
      <label for="_valor_caja">Valor de Caja</label>
    </div>
  </div>
  <div class="modal-footer">
      <a class="modal-action waves-effect waves-green btn-flat" id="_docaja">Aceptar</a>
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
  </div>
</div>

<div class="modal modal-fixed-footer" id="modal-addline" style="height: 400px;">
  <div class="modal-content">
    <div class="trVenta hide trsec hide-on-large-only"> <!-- MOBIL -->
      <div style="padding: 0px 5px !important" class="input-field col s12 m2">

            <input type="text" id="codp" class="f prod center truncate" autocomplete="off">
            <label for="codp">Código</label>
            <input type="hidden" id="valores">
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m3">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" autocomplete="off">
            <label for="descp">Descripción</label>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m2">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly autocomplete="off">
            <label for="precp">Precio</label>
          </div>

          <div style="padding: 0 !important" class="input-field col s12 m1">
            <select id="uni" readonly >
              <option value="1">Unid</option>
            </select>
            <label for="uni">Unidad</label>
          </div>

          <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" class="f center" id="cantp" min="1" value="1" autocomplete="off">
            <label for="cantp">Cantidad</label>
          </div>

          <!-- <div style="padding: 0px 5px !important" class="input-field col s12 m1">
            <input type="text" id="totp" class="f center divisa" value="0.00" readonly placeholder="Total">
          </div> -->

          <div class="center col s12 m2" style="font-size: 1em; padding: 0px 5px !important;">
            <div class="col s8">
                <input type="checkbox" name="hasimpuesto" id="iva" hclk="0">
                <label for="iva" style="float: left;">IVI</label>
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
      <input type="text" id="bproductos" style="width: 70%" autocomplete="off">
      <label>Buscar por Código, Nombre, Marca, Tipo o Familia</label>
    </div>
    <table class="table centered bordered z-depth-1">
      <thead>
        <tr>
        <th></th>
        <th>Código</th>
        <th>Nombre</th>
        <th>Marca</th>
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

<div class="modal modal-fixed-footer" id="modal-xmlo">
  <div class="modal-header head3 center" style="font-size: 22px;">XML Otros</div>
  <div class="modal-content">

    <table>
      <thead class="tbl bordered">
        <th>Etiqueta</th>
        <th>Valor</th>
      </thead>
      <tbody id="xo-bdy"></tbody>
    </table>

  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
      <a class="modal-action modal-close waves-effect waves-green btn-flat" id="xo-cont">Continuar</a>
  </div>
</div>


<div class="modal modal-fixed-footer" id="modal-devoluciones">
   <div class="modal-header head3 center" style="font-size: 22px;">Buscar Factura</div>
  <div class="modal-content">
    <div class="row">
      <div class="col s6 input-field">
        <input type="text" id="byfact" class="autocomplete" autocomplete="off">
        <label for="byfact">Por Factura</label>
      </div>
       <div class="col s6 input-field">
        <input type="text" id="byclie" class="autocomplete" autocomplete="off" cid="0" >
        <label for="byclie">Por Cliente</label>
      </div>
    </div>
    <table class="highlight"> 
      <thead>
        <th></th>
        <th>Numero Factura</th>
        <th>Valor Factura</th>
        <th>Valor Actual</th>
        <th>Fecha</th>
      </thead>
      <tbody id="listafacturas"></tbody>
    </table>
  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
  </div>
</div>

<div class="modal modal-fixed-footer" id="modal-clientes" style="height: 400px;">
   <div class="modal-header head3 center" id="titagcli" style="font-size: 22px;">Agregar Cliente</div>
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

       <div class="switch der">
          <label>
            <span class="hide-on-small">Contado</span>
            <input type="checkbox" id="ccr">
            <span class="lever"></span>
            Crédito
          </label>
        </div>
      </div>

      <div class="row hide" id="idcc">
      
      <div class="col s6 input-field">
        <input type="text" id="c-dias" value="0" class="eder">
        <label for="c-dias">Plazo en Días</label>
      </div>

      <div class="col s6 input-field">
        <input type="text" id="c-max" value="0" class="eder">
        <label for="c-max">Max Crédito</label>
      </div>

    </div>
    
  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
      <a class="modal-action waves-effect waves-green btn-flat" id="addclie">Agregar</a>
  </div>
</div>

<div class="modal modal-fixed-footer" id="modal-load-ocompras" style="height: 400px;">

  <div class="modal-content">
    <div class="input-field">
      <input type="text" id="tocompra">
      <label for="tocompra">Digite el Número de Orden de Compra</label>
    </div>
    
    <div id="lista_"></div>

  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
      <a class="modal-action waves-effect waves-green btn-flat" id="load-in">Aceptar</a>
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


<div id="modal-tpagos" class="modal modal-fixed-footer grandemodal" gfort="0" align="center" style="width: 70%; height: 100vh !important;">

  <div class="row">
    {section name=LE loop=$TPAGO}
        <input type="radio" value="{if $TPAGO[LE][0] eq 5}5{else} {$TPAGO[LE][0]} {/if}" id="tpg{$TPAGO[LE][0]}" name="tipopago" class="with-gap" bancos="{$TPAGO[LE][2]}" extra="{$TPAGO[LE][3]}" regex="{$TPAGO[LE][4]}" {if $TPAGO[LE][0] neq 1} disabled {/if} icono="{$TPAGO[LE][5]}"/>
        <label for="tpg{$TPAGO[LE][0]}" class="col s4 l2">{$TPAGO[LE][1]}</label>
    {/section}
  </div>
<section id="m-efectivo" class="modal-tpago">
  <div class="modal-content" style="padding: 0px">
  <hr style="border: 1px solid #F0F0F0">
    <span>TOTAL:</span><br>
    <b><span class="totalfact" style="font-size: 2.6em !important;"></span></b>
    <div class="input-group" style="width: 80%; font-size: 2em !important;">
      <span>PAGA CON:</span>
      <input type="text" class="form-control form-control-sm center vextra" id="pcon" placeholder="0.00" value="0.00" style="font-size: 1.5em !important;" autocomplete="off">
      <select style="position: absolute;top:180px;outline: none; z-index: 180;width: 5%; border: 0;" class="browser-default" id="monedapago">
        <option selected value="1">¢</option>
        <option value="2">$</option>
      </select>

      <select style="position: absolute;top:360px;outline: none; z-index: 180;width: 5%; border: 0;" class="browser-default" id="monedavuelto">
        <option selected value="1">¢</option>
        <option value="2">$</option>
      </select>
    </div>
    <br>
    <span>SU CAMBIO ES DE:</span><br>
    <span type="text" id="pcam" class="cambio" style="font-size: 5em !important;">0.00</span>

  </div>

</section>

<section id="m-tarjeta" class="modal-tpago">
  <div class="modal-content">
  <hr style="border: 1px solid #F0F0F0">
  <span>TOTAL:</span><br>
  <b><span class="totalfact" style="font-size: 2.6em !important;"></span></b><br>

  <br>
  <div class="row center-align">
    <div class="input-field col s12">
      <input id="carddigito" type="text" class="validate center-align vextra" value="0000" style="width: 20%; font-size: 2em !important;">
    </div>
      <label for="carddigito" id="labeltarjeta"></label>
  </div>
  <br>
  </div>
</section>

<section id="m-deposito" class="modal-tpago">
  <div class="modal-content">
  <hr style="border: 1px solid #F0F0F0">
  <span>TOTAL:</span><br>
  <b><span class="totalfact" style="font-size: 2.6em !important;"></span></b><br>

  <br>
  <div class="row center-align">
    <div class="input-field col s12">
      <input id="ndeposito" type="text" class="validate center-align vextra" value="00000000" style="width: 20%; font-size: 2em !important;">
    </div>
      <label for="ndeposito" id="labeldeposito"></label>
  </div>
  <br>
  </div>
</section>

<section id="m-cheque" class="modal-tpago">
  <div class="modal-content">
  <hr style="border: 1px solid #F0F0F0">
  <span>TOTAL:</span><br>
  <b><span class="totalfact" style="font-size: 2.6em !important;"></span></b><br>

  <br>
  <div class="row center-align" align="center">
    <div class="input-field col s12">
      <input id="ncheque" type="text" class="validate center-align vextra" value="00000000" style="width: 20%; font-size: 2em !important;">
    </div>
      <label for="ncheque" id="labelcheque"></label>
  </div>
  <br>
  </div>
</section>

<section id="m-mixto" class="modal-tpago">
  <hr>
  <div class="row" style="margin:0px; padding: 0px;">
    <div class="col s4 center" style="cursor: pointer;">
      <input type="radio" name="mxt_tp" val="1" id="mxt_seg">
      <label for="mxt_seg" title="Parte Efectivo y Parte con Tarjeta">Segmentado</label>
    </div>
    <!-- <div class="col s4 center hide" style="cursor: pointer;">
      <input type="radio" name="mxt_tp" val="2" id="mxt_div" >
      <label for="mxt_div" title="Una Porte del Total">Dividio</label>
    </div>
    <div class="col s4 center hide" style="cursor: pointer;">
      <input type="radio" name="mxt_tp" val="3" id="mxt_det" >
      <label for="mxt_det" title="Por Líneas de la Factura">Desgloce</label>
    </div> -->
  </div>
   
  <div class="modal-content row">

    <div class="col s12 row hide" id="mxt_cliente">
      <div class="col s2 input-field">
        <input type="text" id="mxt_ced">
        <label for="mxt_ced">Cédula</label>
      </div>

      <div class="col s4 input-field">
        <input type="text" id="mxt_rz">
        <label for="mxt_rz">Razón Social</label>
      </div>

      <div class="col s4 input-field">
        <input type="text" id="mxt_mail">
        <label for="mxt_mail">Correo</label>
      </div>
    </div>

    <div class="col s4 row">
      
      <H5>FORMA DE PAGO</H5>
      
      <div class="row col s12" style="margin: 0px; padding: 0px;">
        <div class="col s6 input-field">
            <input type="text" id="montoefect" value="0.00" class="eder mxt_val_tot" tp="1" autocomplete="off">
            <label for="montoefect">Efectivo</label>
        </div>

        <div class="col s6 input-field">
            <input type="text" id="pconm" value="0.00" class="eder vextra numeric" tp="1" autocomplete="off">
            <label for="pconm">Paga Con</label>
        </div>
      </div>

      <div class="row col s12" style="margin: 0px; padding: 0px;">
        <div class="col s6 input-field">
          <input type="text" id="montotar" value="0.00" class="eder mxt_val_tot numeric" tp="2" autocomplete="off">
          <label for="montotar">Tarjeta</label>
        </div>

        <div class="col s6 input-field">
          <input type="text" id="ntarjmixto" maxlength="4" class="eder vextra" tp="2" placeholder="0000">
         <label for="ntarjmixto">Número de Tarjeta</label>
        </div>
      </div>

       <div class="row col s12" style="margin: 0px; padding: 0px;">
        <div class="col s6 input-field">
          <input type="text" id="montodep" value="0.00" class="eder mxt_val_tot numeric" tp="3" autocomplete="off">
          <label for="montodep">Depósito</label>
        </div>

        <div class="col s6 input-field">
          <input type="text" id="ndepmixto" maxlength="10" class="eder vextra" tp="3" placeholder="0000000000">
         <label for="ndepmixto">Transacción</label>
        </div>
      </div>

      <h3 align="center"><b>Vuelto:</b> <br> <span style="color: red;" id="pcons" class="cambio">0.00</span></h3>

      <hr style="border:1px dashed #e2e2e2">

      <div class="col s12 hide">
        <input type="checkbox" name="tmixto" id="newfact">
        <label for="newfact" style="float: left;">Con Factura</label>
      </div>
      <br>
      <div class="input-field col s6 hide">
        <input type="text" id="c0-ced" maxlength="12" class="buscarNombre" autocomplete="off" num="0">
        <label for="c0-ced">Cédula</label>
      </div>

      <div class="input-field col s6 hide c0-stp1 c0-stp2 c0-st">
        <input type="text" class="c-nom" readonly id="c0-nom">
        <label for="c0-nom"></label>
        <input type="hidden" id="c-tp">
      </div>

      <div class="input-field col s6 hide c0-stp1 c0-st">
        <input type="text" class="c-ap1" readonly id="c0-ap1">
        <label for="c0-ap1">Apellido 1</label>
      </div>

      <div class="input-field col s6 hide c0-stp1 c0-st">
        <input type="text" class="c-ap2" readonly id="c0-ap2">
        <label for="c0-ap2">Apellido 2</label>
      </div>

      <div class="input-field col s6 hide c0-st">
        <input type="text" id="c0-mail">
        <label for="c0-mail">Email</label>
      </div>

    </div>

    <div class="col s4 lmp">
      <label>LINEAS DE FACTURA</label>
      <div class="collection" id="lmp" style="height: 380px;overflow-y: auto;margin-bottom: 0px;">
      </div>
    </div>


    <div class="col s4 lmp" id="scnl">
      <label>TOTAL A CANCELAR</label>
      <div class="collection" id="lpc" style="height: 380px;overflow-y: auto;margin-bottom: 0px;">
      </div>
      <div class="input-field">
        <input type="text" id="mxcan" value="0.00" readonly class="eder" subtotal="0" exento="0" descuento="0" imv="0">
      </div>
    </div>

  </div>
</section>
<!--  -->
<!-- FOOTER -->
  <div class="modal-footer">
    <a href="#!" class="add modal-action waves-effect waves-green btn-flat" id="factrealp" modulo="factura" varias="1" style="cursor: pointer;">ACEPTAR IMPRIMIR</a>
    <a href="#!" class="add modal-action waves-effect waves-green btn-flat" id="factreal" modulo="factura" varias="1" style="cursor: pointer;">ACEPTAR</a>
  </div>
</div>


</section>

<div id="modal-producto" class="modal modal-fixed-footer grandemodal">
  <div class="modal-content" id="fproductos">
    <h4 id="aeprod"></h4>

    <div class="switch der">
      <label>
        <span class="hide-on-small">Servicio</span>
        <input type="checkbox" id="pvs" checked>
        <span class="lever"></span>
        Producto
      </label>
    </div>

    <br>

    <input type="hidden" class="zelda">
    <div class="row">

      <div class="input-field col s6">
        <input type="text" id="vcodigo" autocomplete="off">
        <label for="vcodigo">Código Barras</label>
      </div>

      <div class="input-field col s6">
        <input type="text" id="vcodigointerno" autocomplete="off">
        <label for="vcodigointerno">Código Interno</label>
      </div>

      <div class="input-field col s6">
        <input type="text" id="vpnombre" autocomplete="off" autosave="off">
        <label for="vpnombre">Nombre</label>
      </div>

      <div class="input-field col s6">
       <select id="pmoneda">
          {section name="LE" loop=$MON}
            <option value="{$MON[LE][0]}" dv="{$MON[LE][2]}">{$MON[LE][1]}</option>
          {/section}
        </select>
      </div>

      <div class="input-field col s6">
          <select type="select" id="vpidunidad">
              <option value="" disabled>Seleccione una Unidad</option>
              {section name=LE loop=$UNI}
              <option value="{$UNI[LE][0]}" tipo="{$UNI[LE][3]}" ml="{$UNI[LE][5]}">{$UNI[LE][1]}</option>
              {/section}
          </select>
          <label for="vpidunidad">Unidad</label>
      </div> 

      <div class="col s6 input-field">
         <select id="pimv" style="margin: 0px" >
              <option value="1" num="0">Exento 0%</option>
              <option value="2" num="1">Reducido 1%</option>
              <option value="3" num="2">Reducido 2%</option>
              <option value="4" num="4">Reducido 4%</option>
              <option value="5" num="0">Transitorio 0%</option>
              <option value="6" num="4">Transitorio 4%</option>
              <option value="7" num="8">Transitorio 8%</option>
              <option selected value="8" num="13">General 13%</option>
              <option  value="11" num="0">No Sujeto 0%</option>
          </select>
          <label for="pimv">IVA</label>
      </div>

      <div class="col s6 input-field hide">
        <div class="input-field">
            <i class="mdi mdi-24px mdi-magnify prefix scabys"></i>
            <input type="text" id="scabys" autocomplete="off">
            <label for="scabys">Buscar Código CABYS</label>
        </div>

        <div style="border: 1px solid #e2e2e2;max-height: 150px; overflow: auto;font-size: 16px" id="lcabys"></div>
      </div>

      <div class="col s16 input-field" style="margin-top: 20px;">
          <input type="text" id="vcabys" maxlength="13" class="eder" autocomplete="off">
          <label for="vcabys">Codigo Cabys</label>

          <label id="ncabys"></label>
      </div>

      <div class="row hide">
        <div class="input-field col s6">
          <input type="text" id="vpcosto" autocomplete="off" autosave="off">
          <label for="vpcosto">Costo</label>
        </div>


        <div class="input-field col s6 hide">
          <input type="text" id="vpventa" autocomplete="off" autosave="off">
          <label for="vpventa">Venta</label>
        </div>
      </div>

      <div class="row col s6">
        <div class="col s6 input-field">
          <input type="text" id="_plon" value="0" class="numeric eder">
          <label for="plon">Longitud (Metros)</label>
        </div>

        <div class="col s6 input-field">
          <input type="text" id="_ppes" value="0" class="numeric eder">
          <label for="_ppes">Peso (Kilos)</label>
        </div>
      </div>

      <div class="col s6 input-field">
        <input type="text" id="vpminimo" value="0" class="numeric eder">
        <label for="vpminimo">Mínimo</label>
      </div>

      <div class="col s6">
        <h6>Hashtags</h6>
        <div class="hashtag-container" style="display: flex; flex-wrap: wrap; gap: 5px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; min-height: 40px;" onclick="document.getElementById('input-hashtag').focus()">
            <input type="text" id="input-hashtag" class="input-hashtag" placeholder="Escribe y presiona Enter">
        </div>
      </div>

    </div>    

  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action waves-effect waves-green btn-flat add" modulo="producto" id="addps">Aceptar</a>
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
  </div>
</div>

<div class="modal modal-fixed-footer grandemodal" id="modal-limitcre">
          <div class="modal-header">
            <ul class="tabs tabs-fixed-width head3 center">
              <h5 class="center" id="tit-creli"></h5>
            </ul>
            </div>
            <div class="modal-content" style="padding:0;padding-top: 24px;">
                <div class="row">
                  <div class="col s6 input-field">
                    <input type="text" id="lmcre" readonly class="eder">
                    <label for="lmcre" class="active">Límite de Crédito</label>
                  </div>

                  <div class="col s6 input-field">
                    <input type="text" id="lmday" readonly class="eder">
                    <label for="lmday" class="active">Plazo Días</label>
                  </div>

                  <div class="col s4 input-field">
                    <input type="text" id="lmven" readonly class="eder">
                    <label for="lmven">Facturas Vencidas</label>
                  </div>

                  <div class="col s4 input-field">
                    <input type="text" id="lmmon" readonly class="eder">
                    <label for="lmmon" class="active">Monto Vencidos</label>
                  </div>

                  <div class="col s4 input-field">
                    <input type="text" id="lmtot" readonly class="eder">
                    <label for="lmtot" class="active">Total Crédito</label>
                  </div>

                  <div class="col s4" style="margin: 0px;"></div>
                  <div class="col s4" style="margin: 0px;"></div>
                  <div class="col s4 input-field" style="margin: 0px;">
                    <input type="text" id="lmrtot" readonly class="eder">
                    <label for="lmrtot" class="active">Total Crédito + Venta</label>
                  </div>

                </div>


                  <span><b> Lista Facturas Vencidas</b></span>

                  <table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" cellspacing="0" width="100%" style="padding-right: 1%;padding-left: 1%">
                      <thead>
                         <tr>
                          <td class="white-text blue sinborde " style="text-align: center"><b>Factura</b></td>
                          <td class="white-text blue sinborde " style="text-align: center"><b>Fecha</b></td>
                          <td class="white-text blue sinborde " style="text-align: center"><b>Vencimiento</b></td>
                          <td class="white-text blue sinborde " style="text-align: center"><b>Días</b></td>
                          <td class="white-text blue sinborde " style="text-align: center"><b>Valor</b></td>
                          <td class="white-text blue sinborde " style="text-align: center"><b>Moneda</b></td>
                        </tr>
                      </thead>
                      <tbody id="listvencidas">
                      </tbody>
                    </table>
            </div>
            <div class="modal-footer">
                <a class="btn lmgo">Ir a Cobros</a>
                <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
                <button type="button" class="waves-effect waves-green btn-flat" id="sg-limit">Continuar</button>
            </div>
        </div>

<ul id="slide-factura" class="side-nav" style="z-index:1500;width: 50%">
  <li class="hide">
    <div class="user-view center">
      <span class="ftit"></span>
    </div>
  </li>
  <li class="hide">
    <input type="checkbox" id="afactura">
    <label for="afactura">Anular Factura</label>
    <div class="divider"></div>
  </li>
  <li>
    Comentario: <input type="text" id="rdev" maxlength="180" style="width: 50%" autocomplete="off">
      <i class="mdi mdi-exit-to-app mdi-24px" id="fext" title="Salir" style="width: 5% !important; float: right;cursor: pointer;"></i>

      <i class="mdi mdi-plus mdi-24px" id="fdev" title="Realizar Devolución" dodev="1" style="width: 5% !important; float: right;cursor: pointer;"></i>
      
    <br>
      <input type="checkbox" id="dev_loadall">
      <label for="dev_loadall">Cargar Toda la Factura</label> 

      <input type="checkbox" id="dev_remplace">
      <label for="dev_remplace">Reemplazar por una Factura Nueva</label> 
      <br>
      <label class="blue-text dlcant hide">Factura Contiene <span id="dcantser">0</span> Servicio(s)</label>
      <div class="row"> 
        <b class="col s12">Devolución Financiero</b>
        <div class="row col s3 input-field">
          <input type="text" class="numeric eder" id="devby_efect" value="0.00">
          <label for="devby_efect">Efectivo</label>
        </div>
        <div class="row col s3 input-field">
          <input type="text" class="numeric eder" id="devby_tar" value="0.00">
          <label for="devby_tar">Transferencia</label>
        </div>
        <div class="row col s3 input-field">
          <input type="text" class="numeric eder" id="devby_caf" value="0.00">
          <label for="devby_caf">Crédito a Favor</label>
        </div>
        <div class="row col s3 input-field">
          <input type="text" class="numeric eder" id="devby_tot" value="0.00">
          <label for="devby_tot">Total</label>
        </div>
      </div>  
    <br>  
    <table>
      <thead>
        <tr>
          <th>CANT</th>
          <th>ITEM</th>
          <th>CANT. A DEVOLVER</th>
          <th>RAZON</th>
          <th>CAMBIO</th>
          <th title="Orden de Compra Asociada">OC</th>
        </tr>
      </thead>
      <tbody id="detfact"></tbody>
    </table>     
  </li>

</ul>

<script src="../assets/js/modulos/ventas.js?v=10.4.1.0-20"></script>