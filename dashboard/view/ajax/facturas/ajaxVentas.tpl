<section id="ffacturas">

<div class="row">
  <div class="l9 m9 s12 col">

<div class="card z-depth-3 pequeño">
<div class="card-header center head1 white-text">
  <p class="flow-text" style="margin-top: 0%;"><span id="titfact"></span> {$smarty.session.EMPRESA|upper}</p>
</div>
  <input type="hidden" class="zelda">

  <div class="row pequeño">
    <div class="col s12 m3 l3 concre" align="center">
      <div class="switch">
        
        <!-- <input class="with-gap chg_tipo" name="tfact" type="radio" id="chg_tipocont" val="1" checked/>
        <label for="chg_tipo"><b>Contado</b></label>
        <br>
        <input class="with-gap chg_tipo" name="tfact" type="radio" id="chg_tipocred" val="0"/>
        <label for="chg_tipocred"><b>Crédito</b></label> -->

        <label>
          <b>Contado</b>
          <input type="checkbox" id="chg_tipo" val="1" disabled>
          <span class="lever"></span>
          <b>Crédito</b>
        </label>
      </div>
    </div>

    <div class="col s12 m3 l3" align="center">
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
    
    <div class="input-field col s12 m6 show_cliente">
      <i class="mdi mdi-face mdi-24px prefix"></i>
      <input type="text" id="ncli" value="" class="autocomplete validate sclie" maxlength="64" />
    </div> 
    
  </div>
  </div>


<!-- DETALLE FACTURA -->
  <div class="card center z-depth-3">
  <div class="card-header head1 center"><b class="head1">DETALLE DE FACTURA</b></div>

  <div class="row">
    <div class="s12 m12 l12 col hide-on-med-and-down">
    <section class="right isfast">
        <input class="with-gap" name="modselected" type="radio" value="2" id="barras" checked/>
        <label for="barras"><i class="mdi mdi-barcode mdi-18px" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de un Lector de Código de Barras" aria-hidden="true" style="font-size: 1.4em"></i></label>

        <input class="with-gap" name="modselected" type="radio" value="1" id="teclado" checked/>
        <label for="teclado"><i class="mdi mdi-keyboard mdi-18px" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de Teclado" aria-hidden="true" style="font-size: 1.4em"></i></label>
    </section>
    </div>
    
    <div class="s12 m12 l12 col">
    <table class="table detalle" id="data-table-detalle" cellspacing="0">
      <thead>

        <tr class="hide trVenta">
          <!-- <th style="width:  5%; padding: 0 !important;"><i class="mdi mdi-delete pbtn" aria-hidden="true" title="Elimina varias filas"></i></th> -->
          <th style="width: 10%; padding: 0 !important;" class="center-align">Código</th>
          <th style="width: 30%; padding: 0 !important;" class="center-align"><span class="truncate">Descripción</span></th>
          <th style="width: 14%; padding: 0 !important;" class="center-align"><span class="truncate">Prec.Unit</span></th>
          <th style="width:  5%; padding: 0 !important;" class="center-align"><span class="truncate">Unidad</span></th>
          <th style="width: 10%; padding: 0 !important;" class="center-align">Cantidad</th>
          <th style="width: 14%; padding: 0 !important;" class="center-align">Total</th>
          <th style="width: 17%; padding: 0 !important;" class="center-align"></th>
        </tr>

        <tr class="hide trCompra">
          <!-- <th style="width:  5%; padding: 0 !important;"><i class="mdi mdi-delete pbtn" aria-hidden="true" title="Elimina varias filas"></i></th> -->
          <th style="width: 10%; padding: 0 !important;" class="center-align">Código</th>
          <th style="width: 20%; padding: 0 !important;" class="center-align"><span class="truncate">Descripción</span></th>
          <th style="width: 10%; padding: 0 !important;" class="center-align"><span class="truncate">Cantidad</span></th>
          <th style="width: 14%; padding: 0 !important;" class="center-align">Prec.Unit</th>
          <th style="width:  5%; padding: 0 !important;" class="center-align"><span class="truncate">Unidad</span></th>
          <th style="width: 10%; padding: 0 !important;" class="center-align"><span class="truncate">Descuento</span></th>
          <th style="width: 14%; padding: 0 !important;" class="center-align">Total</th>
          <th style="width: 17%; padding: 0 !important;" class="center-align"></th>
        </tr>

        <tr class="hide trOCompra">
          <!-- <th style="width:  5%; padding: 0 !important;"><i class="mdi mdi-delete pbtn" aria-hidden="true" title="Elimina varias filas"></i></th> -->
          <th style="width: 20%; padding: 0 !important;" class="center-align">Código</th>
          <th style="width: 45%; padding: 0 !important;" class="center-align"><span class="truncate">Descripción</span></th>
          <th style="width: 10%; padding: 0 !important;" class="center-align"><span class="truncate">Cantidad</span></th>
          <th style="width:  5%; padding: 0 !important;" class="center-align"><span class="truncate">Unidad</span></th>
          <th style="width: 25%; padding: 0 !important;" class="center-align"></th>
        </tr>

        <tr class="trVenta hide trsec">

          <!-- <td style="width: 5%; padding: 0 !important"></td> -->

          <td style="width: 10%; padding: 0 !important" class="input-field">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código">
            <input type="hidden" id="valores">
          </td>

          <td style="width: 30%; padding: 0 !important" class="input-field">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción">
          </td>
          <td style="width: 14%; padding: 0 !important" class="input-field">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly>
          </td>
          <td style="width: 5%; padding: 0 !important" class="input-field">
            <select id="uni" readonly >
              <option>UN</option>
            </select>
          </td>
          <td style="width: 10%; padding: 0 !important" class="input-field">
            <input type="text" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
          </td>
          <td style="width: 14%; padding: 0 !important" class="input-field">
            <input type="text" id="totp" class="f center divisa" value="0.00" readonly placeholder="Total">
          </td>
          <td class="center" style="font-size: 1em; width: 17%; padding: 0 !important;">

          <div class="col s12">
            <a href="#modal-inventario" title="Cantidad en Inventario" id="sinv"><i class="mdi mdi-archive" ></i>
              <a class="hide-on-small-only">:</a><span class="hide-on-small-only" id="cantI">0</span>
            </a>
          </div>
          <div class="col s12">
             <a href="#!" title="Limpiar Campos" class="hide"><img class="responsive-img" src="../assets/img/icon/broom.svg" ></a>
          </div>
  
          </td>
        </tr>

        <tr class="trOCompra hide trsec">

          <!-- <td style="padding: 0 !important"></td> -->

          <td style="padding: 0 !important" class="input-field">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código">
            <input type="hidden" id="valores">
          </td>

          <td style="padding: 0 !important" class="input-field">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción">
          </td>

          <td style="padding: 0 !important" class="input-field hide">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly>
          </td>

          <td style="padding: 0 !important" class="input-field">
            <input type="text" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
          </td>

          <td style="padding: 0 !important" class="input-field">
            <select id="uni" readonly >
              <option>UN</option>
            </select>
          </td>
          
          <td style="padding: 0 !important" class="input-field hide">
            <input type="text" id="totp" class="f center divisa hide" value="0.00" readonly placeholder="Total">
          </td>
          <td class="center" style="font-size: 1em; width: 17%; padding: 0 !important;">

          <div class="col s12 hide">
            <a href="#modal-inventario" title="Cantidad en Inventario" id="sinv"><i class="mdi mdi-archive" ></i>
              <a class="hide-on-small-only">:</a><span class="hide-on-small-only" id="cantI">0</span>
            </a>
          </div>
          <div class="col s12">
             <a href="#!" title="Limpiar Campos" class="hide"><img class="responsive-img" src="../assets/img/icon/broom.svg" ></a>
          </div>
  
          </td>
        </tr>

        <tr class="trCompra hide trsec">

          <!-- <td style="width: 5%; padding: 0 !important"></td> -->

          <td style="width: 10%; padding: 0 !important" class="input-field">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código">
            <input type="hidden" id="valores">
          </td>

          <td style="width: 20%; padding: 0 !important" class="input-field">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción">
          </td>

          <td style="width: 10%; padding: 0 !important" class="input-field">
            <input type="text" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
          </td>

          <td style="width: 14%; padding: 0 !important" class="input-field">
            <input type="text" id="precp" class="f center divisa numeric" value="0.00" readonly>
          </td>

          <td style="width: 5%; padding: 0 !important" class="input-field">
            <select id="uni" readonly >
              <option>UN</option>
            </select>
          </td>

          <td style="width: 9%;" class="input-field">
            <input type="text" class="f center" id="descup" min="0" value="0" data-mask="999999999.99" placeholder="Descuento" value="0.00">
          </td>
          
          <td style="width: 14%; padding: 0 !important" class="input-field">
            <input type="text" id="totp" class="f center divisa" value="0.00" readonly placeholder="Total">
          </td>
          <td class="center" style="font-size: 1em; width: 17%; padding: 0 !important;">

          <div class="col s12">
              <input type="checkbox" name="hasimpuesto" id="iva">
              <label for="iva">IVA</label>
              <!-- <a href="#!" title="Limpiar Campos" class="hide"><img class="responsive-img" src="../assets/img/icon/broom.svg" ></a> -->
          </div>

          <div class="col s12">
            <a href="#modal-inventario" title="Cantidad en Inventario" id="sinv"><i class="mdi mdi-archive" ></i>
              <a class="hide-on-small-only">:</a><span class="hide-on-small-only" id="cantI">0</span>
            </a>
          </div>
          </td>
        </tr>
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

<div class="l3 m3 s12 col">

<div class="card z-depth-3">
  <div class="white-text head1 card-header center" style="margin-top: 0px;"><b class="head1">DESGLOCE DE FACTURA</b></div>
  
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
            <td><input type="text" id="vajuste" class="eder _txtaside" value="0" style="height: 0.5% !important" placeholder="AJUSTE"></td>
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
              <input type="checkbox" id="p_v" title="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'"/>
              <label for="p_v" style="color: black; padding-left: 20px;">Punto Venta</label>
          </div>

          <div class="col s12 m6 l6 _odt">
            <select id="idodt" type="select">
              <option value="0" style="color: black"><b>ODT</b></option>
            </select>
          </div>

          <div class="col s12 m12 l12" align="center">
            <a {if $smarty.session.TMPT neq 2} href="#modal-tpagos" id="facturar" {/if} class="btn btn1 alv"  style="margin-bottom: 3%;">Facturar</a>
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


<div id="modal-tpagos" class="modal modal-fixed-footer" align="center" style="margin-top: -3% !important; width: 70%; height: 85% !important;">
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

      <i class="material-icons prefix icono" style="font-size: 2em !important"></i>
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
          <i class="material-icons prefix icono" style="font-size: 2em !important">credit_card</i>
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
    <a href="#!" class="add modal-action modal-close waves-effect waves-green btn-flat" id="factreal" modulo="factura" varias="1">ACEPTAR</a>
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

<script src="../assets/js/modulos/ventas.js?v=0.26"></script>