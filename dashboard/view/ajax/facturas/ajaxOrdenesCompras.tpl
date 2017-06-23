<div id="ffacturas">
<div class="card z-depth-5">
<div class="card-header center blue-grey white-text"><p class="flow-text" style="margin-top: 0%; background-color:#0B3861">Ordenes de Compra {$smarty.session.EMPRESA|upper}</p></div>
<input type="hidden" class="zelda">
<div class="row">
<div class="col s12">
<label class="right black-text" style="font-size: 18px;"><b>N° Orden: </b> <span class="red-text" id="idfact">{$CONS}</span></label>
</div>
</div><br>
<div class="row">
<div class="input-field col s3 m3 l3">
<i class="fa fa-calendar-o prefix"></i>
<input type="date" class="datepicker" id="vfecha" value="" />
</div>
<div class="col s3 m3 l3"></div>
<div class="input-field col s6 m6 l6">
<i class="fa fa-user prefix"></i>
<label class="truncate" for="ncli">Nombre o Cédula del Proveedor</label>
<input type="text" id="ncli" value="" class="autocomplete validate sclie" maxlength="64" />
</div> 
</div>
<div class="row">
<div class="card-header center"><p class="white-text" style="background-color:#0B3861">DETALLE DE FACTURA</p></div>
<table class="table" id="data-table-detalle" cellspacing="0">
<thead>
<tr>
<!-- <th style="width: 5%;"><i class="fa fa-trash pbtn" aria-hidden="true" title="Elimina varias filas"></i></th> -->
<th style="width: 10%;" class="center-align">Código</th>
<th style="width: 20%;" class="center-align"><span class="truncate">Descripción</span></th>
<!-- <th style="width: 10%;" class="center-align"><span class="truncate">Costo.Unit</span></th> -->
<!-- <th style="width: 9%;" class="center-align"><span class="truncate">Descuento</span></th> -->
<th style="width: 7%;" class="center-align">Cantidad</th>
<!-- <th style="width: 12%;" class="center-align">Total</th> -->
<th style="width: 17%;" class="center-align">
<div class="hide-on-small-only">
<input class="with-gap" name="modselected" type="radio" value="2" id="barras" checked/>
<label for="barras"><i class="fa fa-barcode" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de un Lector de Código de Barras" aria-hidden="true" style="font-size: 1.4em"></i></label>
<input class="with-gap" name="modselected" type="radio" value="1" id="teclado" checked/>
<label for="teclado"><i class="fa fa-keyboard-o" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de Teclado" aria-hidden="true" style="font-size: 1.4em"></i></label>
</div>  
</th>
</tr>
<tr>
<!-- <td style="width: 5%">
</td> -->
<td style="width: 10%;" class="input-field">
<input type="text" id="codp" class="f prod center" placeholder="Código">
<input type="hidden" id="valores">
</td>
<td style="width: 20%;" class="input-field">
<input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción">
</td>
<!-- <td style="width: 10%;" class="input-field">
<input type="text" id="precp" class="f center" value="0.00">
</td> -->
<!-- <td style="width: 9%;" class="input-field">
<input type="number" class="f center" id="descup" min="0" data-mask="999999999.99" placeholder="Descuento">
</td> -->
<td style="width: 7%;" class="input-field">
<input type="number" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
</td>
<!-- <td style="width: 12%;" class="input-field">
<input type="text" id="totp" class="f center" value="0.00" readonly placeholder="Total">
</td> -->
<td class="center" style="font-size: 1em; width: 17%; ">
<div class="col s12 m4 l4">
<!-- <a href="#modal-inventario" id="sinv"><i class="fa fa-archive" ></i>
<a class="hide-on-small-only">:</a><span class="hide-on-small-only" id="cantI" title="Cantidad en Inventario">0</span>
</a> -->
</div>
<div class="col s12 m8 l5">
<a title="Limpiar Campos" class="pbtn" id="limpiar"><img class="responsive-img" src="../assets/img/icon/broom.svg"></a>
</div>
<!-- <div class="col s12 m8 l5">
<input type="number" >
</div> -->
</td>
</tr>
</thead>
<tbody vtabla="detallefactura" id="fdetallefacturas" tp="4" style="max-height: 10%; overflow: auto; font-size: 1.1em; ">
<!-- <tr id="fd1" class="ciclos"><td class="center" id="codprod1">P01</td><td class="center" id="desc1">Producto1</td><td class="center" id="prec1">2,250.00</td><td class="center"><div id="divcnt" class="form-group"><span id="cant1">1</span><input type="number" id="vcantidad1" value="1" min="1" style=" display:none;width: 70px"></div></td><td class="center"><span id="descu1">5</span> %</td><td class="center totp" id="tota1">2,250.00</td><td id="desctd1" align="left"><input type="checkbox" class="filled-in chkivi" id="aivi1" checked="checked"><label for="aivi1">I.V.I</label><input type="text" id="ivi1" value="{$IVI}" placeholder="0" style="width: 50px"><a id="edit1" visible="0" class="material-icons pbtn black-text fedit faccion">edit</a><a id="del1" style="color: #D9534F" title="Eliminar Fila" class="material-icons pbtn black-text delf faccion">close</a></td></tr> -->
</tbody>
</table>
</div>
<div class="card z-depth-5" style="max-height:20%;overflow-y:auto;border-top:1px solid rgba(0,0,0,0.1);bottom:0px;display: block;">
<p class="white-text card-header center" style="margin-top: 0px; background-color:#0B3861">DESGLOCE DE FACTURA</p>
<div class="row">
<div class="col s12 m12 l6">
<textarea id="vcomentario" cols="25" placeholder="Comentario de Orden" type="textarea" style="max-height: 100px; height: 60px; max-width:100%; width: 100%; "></textarea><br>
<div class="row">
<br>
<!-- <div class="col s12 m4 input-field">
<div class="prefix"><img src="../assets/img/icon/percent.svg"/></div>
<input type="text" id="vdescuentop" class="eder" value="0" placeholder="0.00">
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
</div> -->
</div>
</div>
<div class="col s12 m12 l6">
<table class="table table-striped table-hover" style="border: 1px solid #e2e2e2;">
<!-- <thead style="border: 0px">
<tr>
<td>SUBTOTAL:</td>
<td style="float: right;">
<span><b>¢</b></span><span id="subtot" type="html" value="0">0.00</span>
</td>
</tr>
</thead> -->
<tbody id="sh_imp">
</tbody>  
<tfoot>  
<!-- <tr>
<td>DESCUENTO:</td>
<td style="float: right;"><span><b>¢</b></span><span id="descuento_v" type="html" value="0">0.00</span></td>
</tr>
<tr>
<td>FLETE:</td>
<td style="float: right;"><span><b>¢</b></span><span id="flete" type="html" value="0">0.00</span></td>
</tr> -->
<!-- <tr style="border-top:1px solid black">
<td>TOTAL:</td>
<td style="float: right;"><span><b>¢</b></span><span id="tot" type="html" value="0">0.00</span>
</td>
</tr> -->
</tfoot>
</table>
<br>
<div class="row">
<div class="col s12 m4">
<!--  <p>
<input type="checkbox" id="p_v" title="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'"/>
<label for="p_v">Punto Venta</label>
</p> -->
</div>
<div class="col s12 m4">
<!-- <select id="vidodt" type="select">
<option value="0">Selecione una ODT</option>
</select>
<label>ODT</label> -->
</div>
<div class="col s12 m4">
<button class="btn btn-primary-outline der add" modulo="factura" varias="1" id="facturar" style="margin-bottom: 3%;">Realizar Compra</button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

<script src="../assets/js/modulos/ordencompras.js?v=0.3"></script>