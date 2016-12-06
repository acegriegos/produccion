<div id="ffacturas">

<input type="hidden" id="vidtipo" class="form-control" value="1">
<input type="hidden" id="vid" value="0">
<input type="hidden" id="vidtipoventa" value="1">
<input type="hidden" id="vidusuario" value="">
<input type="hidden" id="vidsucursal" value="">
<input type="hidden" id="vidempresa" value="{$smarty.session.IMPRESA}">
<input type="hidden" id="videstado" value="1">
<input type="hidden" id="visregistrada" value="0">
<input type="hidden" id="vreferencia" value="0">
<input type="hidden" id="vidmoneda" value="1">

<div class="row">

<div class="col s6">
  <div class="switch">
    <label>
      Contado
      <input type="checkbox" id="chg_tipo" value="1">
      <span class="lever"></span>
      Crédito
    </label>
  </div>
</div>

  <div class="col s6">
    <label class="der black-text" ><b>N° Factura: </b> <span class="red-text" id="idfact">000001</span></label>
  </div>

</div>
<br>
<div class="row">
  <div class="input-field col s6 m3 l3">
    <i class="fa fa-calendar-o prefix"></i>
    <label for="vfecha">Fecha</label>
    <input type="date" class="datepicker" id="vfecha" value="">
  </div>

  <div class="col s6 m3 l3">

    <div class="input-field con">
    <select id="vidtipopago" type="select" class="con">
      {section name=LE loop=$TPAGO}
      <option value="{$TPAGO[LE][0]}">{$TPAGO[LE][1]}</option>
      {/section}
    </select>
    <label>Forma de Pago</label>
    </div>

    <div class="input-field cre" style="display: none;">
    <label for="vplazo">Plazo en Días<label>
    <input type="text" id="vplazo" value="0" disabled>
    </div>

  </div>

  <div class="input-field col s6 m3 l3">
    <i class="fa fa-user prefix"></i>
    <label for="ncli">Nombre de Cliente</label>
    <input type="text" id="ncli" value="" class="autocomplete validate">
    <input type="hidden" id="vidcliente" value="">
  </div>

  <div class="input-field col s6 m3 l3">
    <label for="ced">Cédula del Cliente</label>
    <input type="text" id="ced" data-mask="9-9999-9999" class="validate">
    <input type="hidden" id="vbisproveedor" value="0">
  </div> 

  <div class="alert alert-warning" align="center" id="alert-prov" style="display:none">
  <strong >Cliente no Existente,</strong>
  Desea Agregarlo?<br> <button type="button" class="btn btn-info" id="includprov">Aceptar</button> <button type="button" class="btn btn-success" id="ninuncludprov">Declinar</button>
  </div>
</div>

  <div class="alert alert-warning reference" align="center" id="alert-ref" style="display:none">
  <strong >Esta Referencia  ya se Encuentra Asociada a un Numero de Factura</strong>
  </div>

<div class="row">

<div class="col s12">
 <nav>
    <div class="nav-wrapper">
      <div class="col s12">
        <a href="#!" class="breadcrumb"></a>
        <a href="#!" class="breadcrumb">DETALLE DE FACTURA</a>
      </div>
    </div>
  </nav>
<!-- <h3 class="card-title" align="center"><b>DETALLE DE FACTURA</b></h3><br> -->
<input type="hidden" id="idline" value="0">

<div class="eder">
<label class="c-input c-radio">
  <input id="modo1" name="modo" type="radio">
  <span class="c-indicator"></span>
  <i class="fa fa-keyboard-o" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de Teclado" aria-hidden="true" style="font-size: 1.4em"></i>
</label>
<label class="c-input c-radio">
  <input id="modo2" name="modo" type="radio">
  <span class="c-indicator"></span>
  <i class="fa fa-barcode" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de un Lector de Código de Barras" aria-hidden="true" style="font-size: 1.4em"></i>
</label>
<input type="hidden" id="modselected" value="0">
</div>

</div>

<table class="table table-striped table-bordered nowrap" id="table-detalle" cellspacing="0">
  <tbody>
    <tr id="f1">

      <td class="input-field">
        <label for="codp">Código Producto</label>
        <input type="text" id="codp" value="" class="f">

        <input type="hidden" id="idp" value="">
        <input type="hidden" id="hcodp" value="">

        <div id="noprod" class="form-control-feedback" align="center" style="display:none"><small class="asterisco">Producto no Existente</small></div>
      </td>

      <td class="input-field">
        <label for="descp">Descripción</label>
        <input type="text" id="descp" class="fd" value="">
      </td>

      <td class="input-field">
        <label for="cantp">Cantidad</label>
        <input type="number" class="f" id="cantp" min="1" value="1" data-mask="999999999.99">
        <div id="err" class="form-control-feedback" align="center" style="display:none"><small id="smerr">Cantidad insuficiente</small></div>
      </td>
      <td class="input-field">
        <label for="precp">Total</label>
        <input type="text" id="precp" class="f" value="0.00" readonly>
        <input type="hidden" id="hprec" class="form-control" value="">
      </td>
      <td style="font-size: 0.9em">
      <span style="background: rgba(219,219,219,0.3); padding: 2%; border-radius: 0.2em;" title="Cantidad en Inventario"><i class="fa fa-archive" style="font-size: 0.8em"></i>:<span id="cantI">0</span></span>
      <i class="fa fa-eraser btn del" id="del" style="color: #D9534F" title="Eliminar Fila"></i>
      </td>
    </tr>
  </tbody>
</table>

<!-- <div class="alert alert-warning" align="center" id="alert-prod" style="display:none">
<strong >Producto no Existente,</strong>
Desea Agregarlo?<br> <button type="button" class="btn btn-info" id="includprod">Aceptar</button> <button type="button" class="btn btn-success" id="nincludprod">Declinar</button>
</div> -->

<!-- </div> -->

<div class="card-block">
<div class="row">
  <div class="col-md-2 col-lg-2"></div>
  <div class="col-md-8 col-lg-8">
    <!-- <div class="card-header" align="center"><h6>DETALLE DE FACTURA</h6></div> -->
  </div>
  <div class="col-md-2 col-lg-2">
  <button type="button" class="btn btn-info-outline der" id="del1">Eliminar Filas</button>
  <br><br>
  </div>
</div>
<table class="table table-bordered">
<thead>
  <tr  align="center">
    <th style="width: 5%"><i class="fa fa-trash" aria-hidden="true" title="Elimina varias filas seleccionadas presionando sobre el botón 'Eliminar Filas'"></i></th>
    <th style="width: 10%">Código</th>
    <th style="width: 27%">Descripción</th>
    <th style="width: 10%">Cantidad</th>
    <th style="width: 14%">Precio</th>
    <th style="width: 14%">Total</th>
    <th id="descth1" style="width: 6%">%</th>
    <th style="width: 15%">Acciones</th> 
  </tr>
</thead>
</table>
<div style="max-height: 200px; overflow: auto;">
  <table class="table table-hover table-striped table-bordered">
    <tbody id="detallefactura">
       
    </tbody>
  </table>
  </div>
</div>

<div class="card-footer">
<h3 class="card-title"><b>DESGLOCE DE FACTURA</b></h3><br>

<div class="row">
<div class="col-md-6 col-lg-6">
<strong>
<table class="table table-striped table-hover" style="border: 1px solid #e2e2e2;">
<thead>
<tr>
<tr>
<td>SUBTOTAL:</td>
<td align="right">
<span><b>¢</b></span><span id="subtot" type="html" value="0">0.00</span>
<input type="hidden" id="hsubtot" value="0">
</td>
</tr>
<tr>
<td>I.M.V:</td>
<td align="right"><span><b>¢</b></span><span id="imv" type="html" value="0">0.00</span>
<input type="hidden" id="vimv" value=""></td>
</tr>
<tr>
<td>DESCUENTO:</td>
<td align="right"><span><b>¢</b></span><span id="descuento" type="html" value="0">0.00</span></td>
</tr>
<tr>
<td>FLETE:</td>
<td align="right"><span><b>¢</b></span><span id="flete" type="html" value="0">0.00</span></td>
</tr>
<tr>
<td>TOTAL:</td>
<td align="right"><span><b>¢</b></span><span id="tot" type="html" value="0">0.00</span>
<input type="hidden" id="vsubtotal" value="0">
<input type="hidden" id="tdesc" value="">
</td>
</tr>
</tr>
</thead>
<tbody>
</tbody>
</table>
<!--  -->
<div class="col-md-12 col-lg-12">
<div class="row">
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><small><b>DESC</b></small></div>
<input type="text" id="vdescuento" class="form-control form-control-sm" value="0" placeholder="0.00" data-mask="999999999.99" disabled>
<div class="input-group-addon"><small><b>%</b></small></div>
</div>
</div>
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><small><b>FLETE</b></small></div>
<input type="text" id="vflete" class="form-control form-control-sm" value="0" placeholder="0.00" data-mask="999999999.99">
<div class="input-group-addon"><small><b>¢</b></small></div>
</div>
</div>
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><small><b>AJUSTE</b></small></div>
<input type="text" id="vajuste" class="form-control form-control-sm" value="0" placeholder="0.00" data-mask="999999999.99">
<div class="input-group-btn">
<button type="button" class="btn btn-sm" id="btnAjuste" accion="1">+</button>
</div>
<!-- <div class="input-group-addon"><small><b>+</b></small></div> -->
</div>
</div>
</div>
</div>
<!--  -->
</strong>
</div>
<div class="col-md-6 col-lg-6">
<textarea id="vcomentario" class="form-control" cols="25" placeholder="Comentario de Factura" type="textarea" style="max-height: 100px"></textarea><br>
<div class="row">
<div class="col-md-12 col-lg-12">
<button class="btn btn-primary-outline der add" modulo="factura" codigo="1" detalle="1" id="facturar">Facturar</button>  <!--  data-toggle="modal" href='#modal-cambio' -->
<button type="button" class="btn btn-primary der edit per105 inv" codigo="1" modulo="factura" detalle="1" id="actualizar">Actualizar</button>
<input type="hidden" class="load" value="" codigo="1" modulo="factura" detalle="1">
<div class="checkbox" title="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'">
<label class="c-input c-checkbox">
<input type="checkbox" id="p_v" value="0">
<span class="c-indicator"></span>
Punto Venta
</label>
</div>
<br>
<!-- <div class="card-footer"><br>
<span class="card-title" style="font-size: 3.8em"><h4>TOTAL:</h4><strong><span>¢</span><span id="total" type="html">0.00</span></strong></span>
<input type="hidden" id="htotal" class="form-control" value="">
</div> -->
</div>
</div>
</div>
</div>
<br><br>
<div class="row">
  <div class="col-md-12 col-lg-12">
    <div class="alert alert-danger err_" id="err1" style="display: none">
      <strong id="errm1"></strong>
    </div>
    <div class="alert alert-success suc_" id="suc1" style="display: none">
      <strong id="sucm1"></strong>
    </div>
  </div>
</div>
</div>

</div>

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
        <!-- <button type="button" class="btn btn-primary">Aceptar</button> -->
      </div>
    </div>
  </div>
</div>

<script src="../assets/js/mask/jquery.mask.js"></script>
<script src="../assets/js/modulos/ventas.js"></script>