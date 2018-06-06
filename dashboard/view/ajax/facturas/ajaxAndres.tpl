<section id="ffacturas">


<nav class="nav-extended head1">
    <div class="nav-wrapper">
      <div class="center head1 white-text">
        <p class="brand-logo" style="margin-top: 0%;"><span id="titfact"></span> {$smarty.session.EMPRESA|upper}</p>
      </div>
        <div class="nav-content">
          <ul class="tabs tabs-transparent">
            <li class="tab"><a href="#test1">Cliente</a></li>
            <li class="tab"><a class="active" href="#test2">Detalle</a></li>
            <li class="tab"><a href="#test3">Desgloce</a></li>
          </ul>
        </div>
    </div>
  </nav>


  <div id="test1" class="col s12">
  
  <div class="card z-depth-3 pequeño">
  <br>
<!-- <div class="card-header center head1 white-text">
  <p class="flow-text" style="margin-top: 0%;"><span id="titfact"></span> {$smarty.session.EMPRESA|upper}</p>
</div> -->
  <input type="hidden" class="zelda">

  <div class="row pequeño">
    <div class="col s12 m3 l3 concre" align="center">
      <div class="switch">

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
    
    <div class="input-field col s12 m6 show_cliente" style="position: relative;">
      <i class="mdi mdi-face mdi-24px prefix"></i>
      <input type="text" id="ncli" value="" class="autocomplete validate sclie" maxlength="64" />
      <i class="mdi mdi-16px mdi-plus text-green pbtn tooltipped hide" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 8px; z-index: 180" ata-position="bottom" data-tooltip="Agregar Cliente"></i>
      <i class="mdi mdi-16px mdi-email pbtn tooltipped hide" style="position:absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 22px;z-index: 170" data-position="bottom" data-tooltip="Correos del Cliente"></i>
      <i class="mdi mdi-16px mdi-file-document-box pbtn tooltipped hide" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 38px; z-index: 160" ata-position="bottom" data-tooltip="Ventas del Cliente"></i>
      
    </div> 
    
  </div>
  </div>

  </div>
  <div id="test2" class="col s12">

    <div class="card center z-depth-3">
  <div class="card-header head2 center" style="padding: 0.5%"><b>DETALLE DE FACTURA</b></div>

  <div class="row">
    <div class="s12 m12 l12 col hide-on-med-and-down">
    <section class="right isfast">
        <input class="with-gap" name="modselected" type="radio" value="2" id="barras" checked/>
        <label for="barras"><i class="mdi mdi-barcode mdi-18px" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de un Lector de Código de Barras" aria-hidden="true" style="font-size: 1.4em"></i></label>

        <input class="with-gap" name="modselected" type="radio" value="1" id="teclado" />
        <label for="teclado"><i class="mdi mdi-keyboard mdi-18px" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de Teclado" aria-hidden="true" style="font-size: 1.4em"></i></label>
    </section>
    </div>
    
    <div class="s12 m12 l12 col">
    <table class="table detalle" id="data-table-detalle" cellspacing="0">
      <thead>

        <tr class="hide trVenta">
          <!-- <th style="width:  5%; padding: 0 !important;"><i class="mdi mdi-delete pbtn" aria-hidden="true" title="Elimina varias filas"></i></th> -->
          <th style="width: 18%; padding: 0 !important;" class="center-align">Código</th>
          <th style="width: 30%; padding: 0 !important;" class="center-align"><span class="truncate">Descripción</span></th>
          <th style="width: 14%; padding: 0 !important;" class="center-align"><span class="truncate">Prec.Unit</span></th>
          <th style="width:  5%; padding: 0 !important;" class="center-align"><span class="truncate">Unidad</span></th>
          <th style="width: 10%; padding: 0 !important;" class="center-align">Cantidad</th>
          <th style="width: 14%; padding: 0 !important;" class="center-align">Total</th>
          <th style="width: 9%; padding: 0 !important;" class="center-align"></th>
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
<tr>
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
              <input type="checkbox" name="hasimpuesto" id="iva" hclk="0">
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

  </div>

<div id="test3" class="col s12">
  
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
            <td><input type="text" id="ajuste" class="eder _txtaside" value="0" style="height: 0.5% !important" placeholder="AJUSTE" maxlength="4"></td>
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

          <div class="col s12 m6 l6 _odt">
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

</div>

</section>

<script src="../assets/js/modulos/ventas.js?v=10.0.0.4"></script>