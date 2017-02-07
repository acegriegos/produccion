<div id="ffacturas">

<div class="card">
<div class="card-header center blue-grey white-text"><p class="flow-text" style="margin-top: 0%;">VENTAS</p></div>
  <input type="hidden" id="zelda">
  <input type="hidden" id="vidusuario" value="">

  <div class="row">

    <div class="col s6">
      <div class="switch">
        <label>
          Contado
          <input type="checkbox" id="chg_tipo" value="1" disabled>
          <span class="lever"></span>
          Crédito
        </label>
      </div>
    </div>

    <div class="col s6">
      <label class="der black-text" style="font-size: 18px;"><b>N° Factura: </b> <span class="red-text" id="idfact">000001</span></label>
    </div>

  </div>
<br>
  <div class="row">

   <div class="input-field col s6 m3 l3">
      <i class="fa fa-calendar-o prefix"></i>
      <input type="date" class="datepicker" id="vfecha" value="" />
    </div>

    <div class="input-field con col s6 m3 l3" >
      <select id="vidtipopago" type="select">
        {section name=LE loop=$TPAGO}
        <option value="{$TPAGO[LE][0]}">{$TPAGO[LE][1]}</option>
        {/section}
      </select>
      <label>Forma de Pago</label>
    </div>
   
    <div class="input-field cre col s6 m3 l3" style="display: none;">
      <input type="text" id="vplazo" value="0" class="eder" readonly />
      <label for="vplazo">Plazo en Días</label>
    </div>

    <div class="input-field col s6 m3 l3">
      <i class="fa fa-user prefix"></i>
      <label for="ncli">Nombre de Cliente</label>
      <input type="text" id="ncli" value="" class="autocomplete validate sclie" maxlength="64" />
    </div>

    <div class="input-field col s6 m3 l3">
      <label for="ced">Cédula del Cliente</label>
      <input type="text" id="ced" class="validate sclie" />
    </div> 
    
  </div>

  <div class="row">

    <div class="card-header blue-grey center"><p class="white-text">DETALLE DE FACTURA</p></div>

    <table class="table">
      <thead>
        <tr>
          <th style="width: 5%"><i class="fa fa-trash pbtn" aria-hidden="true" title="Elimina varias filas"></i></th>
          <th style="width: 10%" class="center">Código</th>
          <th style="width: 33%" class="center">Descripción</th>
          <th style="width: 14%" class="eder">Prec.Unit</th>
          <th style="width: 10%" class="center">Cantidad</th>
          <th style="width: 14%" class="eder">Total</th>
          <th style="width: 14%" class="eder">
            <input class="with-gap" name="modselected" type="radio" value="2" checked/>
            <label for="test5"><i class="fa fa-barcode" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de un Lector de Código de Barras" aria-hidden="true" style="font-size: 1.4em"></i></label>

            <input class="with-gap" name="modselected" type="radio" value="1" checked/>
            <label for="test5"><i class="fa fa-keyboard-o" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de Teclado" aria-hidden="true" style="font-size: 1.4em"></i></label>
          </th>
        </tr>
      </thead>
    </table>

    <table class="table" id="table-detalle" cellspacing="0">
      <tbody>
        <tr>
          <td style="width: 5%">
          </td>

          <td style="width: 10%" class="input-field">
            <input type="text" id="codp" class="f prod center" placeholder="Código">
            <input type="hidden" id="valores">
          </td>

          <td style="width: 33%" class="input-field">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción">
          </td>
          <td style="width: 14%" class="input-field">
            <input type="text" id="precp" class="f eder" value="0.00" readonly>
          </td>
          <td style="width: 10%" class="input-field">
            <input type="number" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
          </td>
          <td style="width: 14%" class="input-field">
            <input type="text" id="precp" class="f eder" value="0.00" readonly placeholder="Total">
          </td>
          <td class="center" style="font-size: 1em; width: 16%">
            <div class="row" style="padding: 0">
              <div class="col s12 m6 l6 eder">
                <span style="background: rgba(219,219,219,0.3); padding: 5%; border-radius: 0.2em;" title="Cantidad en Inventario"><i class="fa fa-archive" style="font-size: 0.8em"></i>:<span id="cantI">0</span></span>
              </div>
              <div class="col s12 m6 l6">
                <a href="#!" title="Limpiar Campos" class="left"><img id="cleanspace" src="../assets/img/icon/broom.svg"></a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="max-height: 20%; overflow: auto;">
      <table class="table striped highlight">
        <tbody id="detallefactura" tp="4">
          
        </tbody>
      </table>
    </div>
  </div>
</div> <!-- card footer -->

<div class="card" style="max-height:20%;overflow-y:auto;border-top:1px solid rgba(0,0,0,0.1);bottom:0px;display: block;">
  <p class="white-text card-header blue-grey center" style="margin-top: 0px;">DESGLOCE DE FACTURA</p>
  <div class="row">
    <div class="col s12 m6 l6">
      <table class="table table-striped table-hover" style="border: 1px solid #e2e2e2;">
        <thead style="border: 0px">
          <tr>
            <td>SUBTOTAL:</td>
            <td style="float: right;">
              <span><b>¢</b></span><span id="subtot" type="html" value="0">0.00</span>
            </td>
          </tr>
        </thead>

        <tbody id="sh_imp">
          
        </tbody>  

        <tfoot>  
          <tr>
            <td>DESCUENTO:</td>
            <td style="float: right;"><span><b>¢</b></span><span id="descuento_v" type="html" value="0">0.00</span></td>
          </tr>

          <tr>
            <td>FLETE:</td>
            <td style="float: right;"><span><b>¢</b></span><span id="flete" type="html" value="0">0.00</span></td>
          </tr>

          <tr style="border-top:1px solid black">
            <td>TOTAL:</td>
            <td style="float: right;"><span><b>¢</b></span><span id="tot" type="html" value="0">0.00</span>
            </td>
          </tr>
       
        </tfoot>
          
      </table>
      <br>
      <div class="row">

        <div class="col s12 m4 input-field">
          <div class="prefix"><img src="../assets/img/icon/percent.svg"/></div>
          <input type="text" id="vdescuentop" class="eder" value="0" placeholder="0.00" disabled>
          <label>DESCUENTO</label>
        </div>

        <div class="col s12 m4 input-field">
          <div class="prefix">¢</div>
          <label for="vflete">FLETE</label>
          <input type="text" id="vflete" class="eder" value="0">
        </div>

        <div class="col s12 m4 input-field">
          <div class="prefix" id="btnAjuste" accion="1">+</div>
          <label for="vajuste">AJUSTE</label>
          <input type="text" id="vajuste" class="eder" value="0">
        </div>

      </div>

    </div>

    <div class="col s12 m6 l6">
      <textarea id="vcomentario" cols="25" placeholder="Comentario de Factura" type="textarea" style="max-height: 100px; height: 60px; max-width:100%; width: 100%; "></textarea><br>
      <div class="row">
        <div class="col-md-12 col-lg-12">
          <button class="btn btn-primary-outline der add" modulo="factura" varias="1" id="facturar">Facturar</button>
          
          <p>
            <input type="checkbox" id="p_v" title="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'"/>
            <label for="p_v">Punto Venta</label>
          </p>

        </div>
      </div>
    </div>

  </div>
</div>


</div> <!-- ffacturas -->

</div> <!-- bdy --> 


<div class="modal fade" id="modal-cambio">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style="background: #4098CB">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" style="color: #fff">CÁLCULO DE CAMBIO</h4>
      </div>
      <div class="modal-body" align="center">
        <div class="input-group input-group" style="width: 60%">
          <span class="input-group-addon">PAGA CON:</span>
          <input type="text" class="form-control form-control-lg" id="pcon" placeholder="0.00" value="">
        </div><br>
        <div class="input-group input-group" style="width: 60%">
          <span class="input-group-addon">CAMBIO DE:</span>
          <input type="text" class="form-control form-control-lg" id="pcam" placeholder="0.00" value="0.00" readonly>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
      </div>
    </div>
  </div>
</div>

<script src="../assets/js/modulos/ventas.js?v=1.6"></script>