<div id="ffacturas">
<div class="card z-depth-5 ">
<div class="card-header center blue-grey white-text">
<p class="flow-text" style="margin-top: 0%; background-color:#0B3861">
<a class="btn" style="float: right;color: white;font-size: 14px;" onclick="verfacturas();"> Ver Facturas</a>
VENTAS {$smarty.session.EMPRESA|upper}</p></div>
  <input type="hidden" class="zelda">
  <input type="hidden" id="vidusuario" value="">

  <div class="row">

    <div class="col s12 m6 centro ">
      <div class="switch">
        <label style="color: black">
          <b>Contado</b>
          <input type="checkbox" id="chg_tipo" value="1" disabled>
          <span class="lever"></span>
          <b>Crédito</b>
        </label>
      </div>
    </div>

    <div class="col s12 m6 centro2">
      <label class="der black-text" style="font-size: 18px;"><b>N° Factura: </b> <span class="red-text" id="idfact">{$NFACT}</span></label>
    </div>

  </div>
<br>
  <div class="row padd">

   <div class="input-field col s12 m3 l3">
      <i class="fa fa-calendar-o prefix"></i>
      <input type="date" class="datepicker" id="vfecha" value="" />
    </div>

    <div class="input-field con col s12 m3 l3" >

    <i class="material-icons prefix">attach_money</i>
      <select id="vidtipopago" type="select">
        {section name=LE loop=$TPAGO}
        <option value="{$TPAGO[LE][0]}">{$TPAGO[LE][1]}</option>
        {/section}
      </select>
      <label style="color: black"><b>Forma de Pago</b></label>
    </div>
   
    <div class="input-field cre col s6 m3 l3" style="display: none;">
      <input type="text" id="vplazo" value="0" class="eder" readonly />
      <label for="vplazo">Plazo en Días</label>
    </div>

    <div class="input-field col s12 m4">
      <i class="fa fa-user prefix"></i>
      <label class="truncate" for="ncli" style="color: black"> <b>Nombre o Cédula del Cliente</b></label>
      <input type="text" id="ncli" value="" class="autocomplete validate sclie" maxlength="64" />
    </div> 

    <div class="col s2 cre" style="display: none;">
      <label>Saldo Actual: <label id="msaldo"></label> </label> 
    </div> 
    
  </div>

  <div class="row">

    <div class="card-header blue-grey center"><p class="white-text" style="background-color:#0B3861">DETALLE DE FACTURA</p></div>

    <table class="table detalle" id="data-table-detalle" cellspacing="0">
      <thead>
        <tr>
          <th style="width: 5%;"><i class="fa fa-trash pbtn" aria-hidden="true" title="Elimina varias filas"></i></th>
          <th style="width: 10%; " class="center-align">Código</th>
          <th style="width: 30%; " class="center-align"><span class="truncate">Descripción</span></th>
          <th style="width: 14%; " class="center-align"><span class="truncate">Prec.Unit</span></th>
          <th style="width: 10%; " class="center-align">Cantidad</th>
          <th style="width: 14%; " class="center-align">Total</th>
          <th style="width: 17%; " class="center-align">
          <div class="hide-on-small-only">
            <input class="with-gap" name="modselected" type="radio" value="2" id="barras" checked/>
            <label for="barras"><i class="fa fa-barcode" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de un Lector de Código de Barras" aria-hidden="true" style="font-size: 1.4em"></i></label>

            <input class="with-gap" name="modselected" type="radio" value="1" id="teclado" checked/>
            <label for="teclado"><i class="fa fa-keyboard-o" title="Ejecute esta opción si el ingreso de los productos va a realizarse por medio de Teclado" aria-hidden="true" style="font-size: 1.4em"></i></label>
            </div>  
          </th>
        </tr>

        <tr>
          <td style="width: 5%">
          </td>

          <td style="width: 10%; " class="input-field">
            <input type="text" id="codp" class="f prod center truncate" placeholder="Código">
            <input type="hidden" id="valores">
          </td>

          <td style="width: 30%; " class="input-field">
            <input type="text" id="descp" class="fd autocomplete center prod" value="" placeholder="Descripción">
          </td>
          <td style="width: 14%; " class="input-field">
            <input type="text" id="precp" class="f center" value="0.00" readonly>
          </td>
          <td style="width: 10%; " class="input-field">
            <input type="number" class="f center" id="cantp" min="1" value="1" data-mask="999999999.99" placeholder="Cantidad">
          </td>
          <td style="width: 14%; " class="input-field">
            <input type="text" id="totp" class="f center" value="0.00" readonly placeholder="Total">
          </td>
          <td class="center" style="font-size: 1em; width: 17%; ">
            
            <div class="col s12 m4 l4">
                <a href="#modal-inventario" title="Cantidad en Inventario" id="sinv"><i class="fa fa-archive" ></i>
                 <a class="hide-on-small-only">:</a><span class="hide-on-small-only" id="cantI">0</span>
                </a>
          </div>
          <div class="col s12 m8 l5"">
         
             <a href="#!" title="Limpiar Campos" ><img class="responsive-img" src="../assets/img/icon/broom.svg" ></a>
          </div>
  
          </td>
        </tr>
      </thead>

        <tbody vtabla="detallefactura" id="fdetallefacturas" tp="4" style="max-height: 20%; overflow: auto;">
         
        </tbody>
      </table>
    </div>
</div> <!-- card footer -->

<div class="card z-depth-5" style="max-height:20%;overflow-y:auto;border-top:1px solid rgba(0,0,0,0.1);bottom:0px;display: block;">
  <p class="white-text card-header center" style="margin-top: 0px; background-color:#0B3861">DESGLOCE DE FACTURA</p>
  <div class="row">



    

    <div class="col s12 m12 l6">
      <textarea id="vcomentario" cols="25" placeholder="Comentario de Factura" type="textarea" style="max-height: 100px; height: 60px; max-width:100%; width: 100%; "></textarea><br>
      <div class="row">
      <br>
        <div class="col s12 m4 input-field">
          <div class="prefix"><img src="../assets/img/icon/percent.svg"/></div>
                    <label style="color: black"><b>DESCUENTO</b></label>
<input type="text" id="vdescuentop" class="eder" value="0" placeholder="0.00" disabled style="color: black" >
        </div>

        <div class="col s12 m4 input-field">
          <div class="prefix">¢</div>
          <label for="vflete" style="color: black"><b>FLETE</b></label>
          <input type="text" id="vflete" class="eder" value="0">
        </div>

        <div class="col s12 m4 input-field">
          <div class="prefix" id="btnAjuste" accion="1">+</div>
          <label for="vajuste" style="color: black"><b>AJUSTE</b></label>
          <input type="text" id="vajuste" class="eder" value="0" style="color: black">
        </div>

      </div>
      </div>
      <div class="col s12 m12 l6">
      <table class="table table-striped table-hover" style="border: 1px solid #e2e2e2;">
        <thead style="border: 0px">
          <tr>
            <td>SUBTOTAL:</td>
            <td style="float: right;">
              <span><b>¢</b></span><span id="subtot" type="html" value="0" style="color: black">0.00</span>
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
        <div class="col s12 m4">
          <p>
            <input type="checkbox" id="p_v" title="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'"/>
            <label for="p_v" style="color: black">Punto Venta</label>
          </p>
        </div>

        <div class="col s12 m4">
          <select id="vidodt" type="select">
            <option value="0" style="color: black"><b>Selecione una ODT</b></option>
          </select>
          <label>ODT</label>
        </div>

        <div class="col s12 m4">
          <button class="btn btn-primary-outline der add" modulo="factura" varias="1" id="facturar" style="margin-bottom: 3%;">Facturar</button>
          <br>
        </div>

        </div>
      

    </div>

    </div>

 


</div> <!-- ffacturas -->

 <!-- bdy --> 


<div class="modal modal-fixed-footer" id="modal-cambio">
  
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
  </div>

  <div class="modal-footer">
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
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
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
  </div>

</div>
</div>

<script src="../assets/js/modulos/ventas.js?v=0.14"></script>