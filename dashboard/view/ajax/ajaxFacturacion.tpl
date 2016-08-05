<div id="fcompras">
  <div class="panel-heading">
    <input type="hidden" id="vid" value="0">
    <input type="hidden" id="vidusuario" value="">
    <input type="hidden" id="vidempresa" value="{$smarty.session.IMPRESA}">
    <div class="row">
      <div class="col-sm-2 col-xs-4">
        <label class="c-input c-radio">
          <input name="radio" type="radio" id="vidtipofactura" name="vidtipofactura" value="1" checked="checked">
          <span class="c-indicator"></span>
          Contado
        </label>
      </div>
      <div class="col-sm-2 col-xs-4">
        <label class="c-input c-radio">
          <input name="radio" type="radio" id="cred" name="vidtipofactura" value="2">
          <span class="c-indicator"></span>
          Crédito
        </label>
      </div>
      <div class="col-md-2 col-lg-2"></div>
      <div class="col-sm-4 col-xs-4">
        <div class="input-group con">
          <div class="input-group-addon"><b>Forma de Pago</b></div>
          <select id="vtipopago" class="form-control" type="select">
            {section name=LE loop=$TPAGO}
              <option value="{$TPAGO[LE][0]}">{$TPAGO[LE][1]}</option>
            {/section}
          </select>
        </div>
        <div class="input-group cre" style="display: none;">
          <div class="input-group-addon"><b>Plazo en Días</b></div>
          <input type="text" id="vplazo" class="form-control" value="0" data-mask="999">
        </div>
      </div>
      <div class="col-md-2 col-lg-2"></div>
    </div>
    <br>
      <div class="row">
        <div class="col-md-6 col-lg-6">
          <div class="input-group">
            <div class="input-group-addon"><b>Cédula</b></div>
            <input type="text" class="form-control" id="idprv" placeholder="Cédula del Proveedor">
            <input type="hidden" id="vidproveedor" class="form-control" value="0">
          </div>
        </div> 
        <div class="col-md-6 col-lg-6">
          <div class="input-group">
            <div class="input-group-addon"><b>Nombre</b></div>
            <input type="text" class="form-control" id="nprv" placeholder="Nombre del Proveedor">
          </div><br>
        </div>
        <div class="alert alert-warning" align="center" id="alert-prov" style="display:none">
          <strong >Proveedor no Existente,</strong>
          Desea Agregarlo?<br> <button type="button" class="btn btn-info" id="includprov">Aceptar</button> <button type="button" class="btn btn-success" id="ninuncludprov">Declinar</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-lg-4">    
          <div class="input-group">
              <div class="input-group-addon"><b>Número Referencia</b></div>
              <input type="text" class="form-control eder" id="vreferencia" placeholder="Numero de Referencia">
          </div><br>
        </div>
        <div class="col-md-4 col-lg-4">  
          <div class="input-group">
              <div class="input-group-addon"><b>Fecha Inclusión</b></div>
              <input type="date" id="vfecha_inclucion" class="form-control" value="{$smarty.now|date_format:'%Y-%m-%d'}" >
          </div><br>
        </div>
        <div class="col-md-4 col-lg-4">
          <div class="input-group">
              <div class="input-group-addon"><b>Fecha Entrega</b></div>
              <input type="date" id="vfecha_entrega" class="form-control" value="">
          </div>
          <input type="hidden" id="tipopago" class="form-control" value="1">    
        </div>
      </div>
      <div class="alert alert-warning reference" align="center" id="alert-ref" style="display:none">
        <strong >Esta Referencia  ya se Encuentra Asociada a un Numero de Factura</strong>
      </div>
  </div>
  <div class="panel-heading panel-footer" style="border-top: 1px solid rgb(245,245,245);">
    <h3 class="panel-title"><b id="det">INGRESAR PRODUCTOS</b></h3><br>
    <div class="row">
      <div class="col-md-3 col-lg-3">
        <div class="input-group">
          <div class="input-group-addon"><b>Código</b></div>
          <input type="text" id="cod" class="form-control" value="">
        </div>
      </div>
      <div class="col-md-6 col-lg-6">
        <div class="input-group">
          <div class="input-group-addon"><b>Descripción</b></div>
          <input type="text" id="descr" class="form-control" value="">
        </div><br>
      </div>
      <div class="col-md-3 col-lg-3">
        <div class="checkbox">
          <label>
            <input type="checkbox" id="prodprov">
            Cargar Productos del Proveedor
          </label>
        </div>
      </div>
    </div>
    <div class="alert alert-warning" align="center" style="display: none" id="alert-prod">
      <strong >Producto no Existente,</strong>
        Desea Agregarlo?<br> <button type="button" class="btn btn-info" id="includ">Aceptar</button> <button type="button" class="btn btn-success" id="ninunclud">Declinar</button>
    </div>
  </div>
  <div class="panel-body">
    <div class="row">
      <h3 class="panel-title" align="center"><b>DETALLE COMPRA</b></h3><br>
      <button type="button" class="btn btn-info der" id="del1">Eliminar Filas</button>
      <br><br>
    </div>
    <div class="row">
      <div class="table-responsive">
        <!-- <table class="table table-striped table-bordered nowrap" id="data-table-detalle" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Descripción</th>
              <th style="width: 13%">Cantidad</th>
              <th style="width: 13%">Costo</th>
              <th style="width: 13%">Precio</th>
              <th style="width: 13%">Margen</th>
              <th style="width: 13%">Total Margen</th>
              <th style="width: 8%" align="center">%</th>
              <th style="width: 2%">Acciones</th>
            </tr>
          </thead>
          <tbody id="detallecompra">
            <tr id="f1">
              <td>  <span class="checkbox" id="prod1"></span><input type="hidden" id="vidproducto1" class="constante1" value=""><input type="hidden" id="vidfactura1" value="?"></td>
              <td><input type="number" id="vcantidad1" idx=1 class="form-control xort" value="1"  min="1"></td>
              <td><input type="text" id="vcosto1" idx=1 class="form-control xort eder" value="0.00"  data-mask="99999999.99"></td>
              <td><input type="text" id="vprecio1" idx=1 class="form-control xort eder" value="0.00"  data-mask="99999999.99"></td>
              <td align="right"><div class="checkbox"> <span class="valores" id="margen1">0.00</span></div></td>
              <td align="right"><div class="checkbox"> <span class="valores" id="totm1">0.00</span></div></td>
              <td align="left">
                <div class="checkbox "><span id="prcent1" value="0">0.00</span>  </div>
              </td>
              <td><div class="checkbox "> <input type="checkbox" class="delf" name="eliminarf" value="1" style="float: right;"> <i class="fa fa-random btn" id="pr1" title="Ver Otros Precios" data-toggle="modal" href='#modal-precios'></i> </div></td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </div>
  </div>
  <div class="panel-heading">
    <h3 class="panel-title"><b>OPCIONES DE COMPRA</b></h3><br>
    <div class="row">
      <div class="col-md-6 col-lg-6">
        <strong>
        <table class="table table-striped table-hover" style="border: 1px solid #e2e2e2;">
          <thead>
            <tr>
              <td>TOTAL:</td>
              <td align="right"><span><b>¢</b></span> <span id="tot" type="html">0.00</span>
              <input type="hidden" id="vtsubtotal" value="0">
              </td>
            </tr>
            </thead>
          <tbody>
            <tr>
              <td>TOTAL MARGEN:</td>
              <td align="right"><span><b>¢</b></span> <span id="tmargen" type="html">0.00</span><input type="hidden" id="vtmargen" value="0"> </td>
            </tr>
          </tbody>
        </table>
        </strong>
      </div>
      <div class="col-md-6 col-lg-6">
        <textarea id="vcomentario" class="form-control" cols="25" placeholder="Comentario de la Compra" type="textarea"></textarea><br>
        <div class="row">
          <div class="col-md-6 col-lg-6"></div>
          <div class="col-md-6 col-lg-6">
            <button class="btn btn-primary der add" modulo="compra" codigo="1" id="comprar" detalle=1>Ingresar Factura</button>
            <button type="button" class="btn btn-primary der edit per105" codigo="1" modulo="compra" detalle="1" id="actualizar">Actualizar</button>
            <input type="hidden" class="load" value="" codigo="1" modulo="compra" detalle="1">
            <div class="checkbox">
              <label>
                <input type="checkbox" value="1" id="t_p">
                Punto Venta
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
</div>
<div class="modal fade" id="modal-precios">
  <div class="modal-dialog" style="width: 75%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Productos en Otros Proveedores</h4>
      </div>
      <div class="modal-body" id="prodprovsh">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
      </div>
    </div>
  </div>
</div>

<!-- <script src="../assets/js/mask/jquery.mask.js"></script> -->