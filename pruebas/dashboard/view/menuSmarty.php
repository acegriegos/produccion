<div class="navbar-fixed hide-on-large-only">
  <nav>
    <div class="center nav-wrapper blue-grey darken-2">
      {if $smarty.session.BUSS eq 5}
        {$smarty.session.NOM|upper}
        <a href="#" id="movil" class="der"><i class="mdi mdi-dots-vertical mdi-16px"></i></a>
        <a class="der mdi mdi-16px mdi-plus tooltipped" id="gingclie" data-position="bottom" data-tooltip="Agregar Cliente"></a>
        <a href="#" class="der tooltipped mdi-
        " id="flujo" data-position="bottom" data-tooltip="Gastos" style="margin-right: 5px"><i class="mdi mdi-24px mdi-recycle"></i></a>
        <a href="#" class="der tooltipped mdi-
        " id="shrutas" data-position="bottom" data-tooltip="Ruta" style="margin-right: 5px"><i class="mdi mdi-24px mdi-motorbike"></i></a>
      {else}
        {$smarty.session.EMPRESA|upper}
        <a href="#" id="movil" class="der"><i class="mdi mdi-dots-vertical mdi-16px"></i></a>
      {/if}
      
    </div>
  </nav>
</div>

<div class="fixed-action-btn horizontal hide">
  <a class="btn-floating btn-large red sse_cnt tooltipped button-collapse" id="bsse1" data-tooltip="Notificaciones" data-position="top" data-activates="gnotificaciones">
  </a>
</div>

<a href="#" data-activates="slide" class="hide-on-med-and-down button-collapses z-depth-5 menu-btn" id="cpu" xyz="{$smarty.session.BUSS}">

  <p class="white-text menu-txt">MENU</p></a>
  <a href="#" data-activates="detfacturag" class="button-collapses hide" id="btndetfact">DetalleFacturas</a>
<!-- hide-on-med-and-down  -->

<ul id="detfacturag" class="side-nav side-nav-cuentas asd"  style="width: 60%">
  <div id="listaCuentasNotaDetalle"></div>
</ul>

<ul id="slide" class="side-nav" style="max-width: 400px !important; font-size: 1.2em !important">
  <li>
    <div class="userView">
      <div class="background"><!-- CSS --></div>
        <div class="col s12 center">
         <p class="white-text" style="margin: 0px;font-size: 12px;max-width: 100%;word-break: break-all;white-space: normal;overflow-x: auto;max-height: 55px;overflow-y: hidden;" id="_user_name">{$smarty.session.NOM}</p>
         <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header white-text"><i class="mdi mdi-menu-down white-text"></i>Opciones</i></a>
            <div class="collapsible-body" style="z-index: 100; position: absolute; width: 94%;">
              <ul class="head2">
                <li class="hide"><a href="#!" value="2" class="otpmenu white-text" id="x2">Notificaciones</a></li>
                <li class="hide per100"><a href="usuarios" class="white-text"><i class="mdi mdi-account mdi-24px right white-text" aria-hidden="true"></i> Usuario</a></li>
                <li class="hide per101"><a href="../bancos" value="6" class="otpmenu white-text" id="x6"><i class="mdi mdi-bank mdi-24px right white-text" aria-hidden="true"></i>Bancos</a></li>
                <li class="hide per102"><a href="../calc" value="6" class="otpmenu white-text" id="x6"><i class="mdi mdi-calculator mdi-24px right white-text" aria-hidden="true"></i>Calculadora</a></li>
                <li class="hide per103"><a href="#!" value="5" class="otpmenu white-text" id="x5"><i class="mdi mdi-repeat mdi-24px right white-text" aria-hidden="true"></i>Flujo de Efectivo</a></li>
                <li class="hide per104"><a href="#!" value="3" class="otpmenu white-text" id="x3"><i class="mdi mdi-cash mdi-24px right white-text" aria-hidden="true"></i>Cierre de Caja</a></li>
                <li class="hide per105"><a href="ajustes" class="otpmenu white-text"><i class="mdi mdi-cog mdi-24px right white-text" aria-hidden="true"></i>Ajustes</a></li>
                <li><a href="#!" value="4" class="otpmenu white-text" id="x4"><i class="mdi mdi-information mdi-24px right white-text" aria-hidden="true"></i>Info Sistema</a></li>
              </ul>
            </div>
          </li>
        </ul>
        </div>
      </div>
    </li>
  <div class="row container {if $smarty.session.BUSS neq 0} hide {/if}" style="padding: 0; margin-bottom: 0">
    <div class="col s10" style="padding: 0">
      <input id="numtrans" type="text" class="validate let" placeholder="Transaccion">
    </div>
    <div class="col s2" style="padding: 0">
      <i class="mdi mdi-numeric-0-box-multiple-outline gtext" style="font-size: 1em"></i>
    </div>
  </div>

  <div class="options" tyle="overflow-y:hidden !important">

  <li class="per27 hide"><a href="bmi"><i class="mdi mdi-chart-bubble right gtext" aria-hidden="true"; style="font-size: 2em !important "></i><span style="font-size: 1.2em !important">Administración</span></a></li>
  
  <li class="hide per26"><a href="contabilidad"><i class="mdi mdi-rename-box mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important">Contabilidad</span></a></li>

  <li class="hide per25"><a href="restaurante"><i class="mdi mdi-silverware-variant right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Restaurante</span></a></li>

  <li class="hide per24"><a href="taller"><i class="mdi mdi-wrench right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Taller</span></a></li>

  <li class="hide per23"><a href="medicina"><i class="mdi mdi-hospital-marker right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Salud</span></a></li>

  <li class="hide per22"><a href="parquimetro"><i class="mdi mdi-car-brake-parking right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Parquímetro</span></a></li>

  <li class="hide per21"><a href="rrhh"><i class="mdi mdi-human-greeting right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">RRHH</span></a></li>

  <li class="gtext">
      <a class="collapsible-header dropdown-button hide per1" style="padding: 0px 32px 0px 32px;" data-alignment="right" data-activates='dropfact'><i class="mdi mdi-cash-multiple mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important">Facturación</span></a>
      <ul id='dropfact' class='dropdown-content'>
        <li class="hide per2"><a href="facturacion?tf=1">Ventas</a></li>
        <li class="hide per3"><a href="facturacion?tf=4">Proformas</a></li>
        <li class="hide per4"><a href="facturacion?tf=2">Compras</a></li>
        <li class="hide per5"><a href="facturacion?tf=3">Orden de Compra</a></li>
        <li class="hide per6"><a href="facturacion?tf=10">Exportaciones</a></li>
        <li class="hide per7"><a href="ahorros">  </a></li>
        <li class="divider"></li>
        <li class="hide per8"><a href="facturacion?accion=8&tf=1">Ver Facturas</a></li>
        <li class="hide per9"><a id="rastreo">Rastrear Factura</a></li>
      </ul>

    </li>
    <li class="gtext hide per10">
      <a class="collapsible-header dropdown-button" style="padding: 0px 32px 0px 32px;" data-alignment="right" data-activates='dropfact_0'><i class="mdi mdi-account mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important">Clientes</span></a>
      <ul id='dropfact_0' class='dropdown-content'>
        <li class="hide per10"><a href="clientes?is=0">Mantenimiento</a></li>
        <li class="hide per11"><a href="cuentas?tf=1">Cuentas por Cobrar</a></li>
      </ul>

    </li>
    <li class="gtext hide per12">
      <a class="collapsible-header dropdown-button" style="padding: 0px 32px 0px 32px;" data-alignment="right" data-activates='dropfact_1'><i class="mdi mdi-cash-multiple mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important">Proveedores</span></a>
      <ul id='dropfact_1' class='dropdown-content'>
        <li class="hide per12"><a href="clientes?is=1">Mantenimiento</a></li>
        <li class="hide per13"><a href="cuentas?tf=2">Cuentas por Pagar</a></li>
      </ul>

    </li>
    <li class="gtext hide per14"><a href="productos"><i class="mdi mdi-basket mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important">Productos</span></a></li>
    <li class="gtext hide per15"><a href="productos?raiz=1"><i class="mdi mdi-feather mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important">Servicios</span></a></li>

    <li class="gtext hide per16"><a href="notas"><i class="mdi mdi-credit-card mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important">Notas de Crédito y Débito</span></a></li>
    <li class="gtext hide per17"><a href="vistanotaspagos?tf=5"><i class="mdi mdi-credit-card-multiple mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important">Ver Notas</span></a></li>

    <li class="gtext hide per18"><a href="reportes" target="_new"><i class="mdi mdi-chart-areaspline mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important">Reportes</span></a></li>

    <li class="gtext hide per19"><a href="documentos"><i class="mdi mdi-file-document mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important">Documentos Electrónicos</span></a></li>

    <li class="gtext hide per20" id="help"><a href="#" class="black-text"><i class="mdi mdi-lifebuoy mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important" >Centro de Ayuda</span></a></li>
  
  <li><a href="logout"><i class="mdi mdi-close mdi-24px right gtext" aria-hidden="true"></i><span style="font-size: 1.2em !important">Cerrar Sesión</span></a></li>
  </div>
</ul>

<div class="modal modal-fixed-footer" style="width:80% !important; height:99%;padding: 0px;" id="modal-system">
  <div class="modal-header head1 center">
      APSY
  </div>
  
  <div class="modal-content" style="padding: 0px;">
    <ul id="tabs-swipe-demo" class="tabs head2 center">
    <li class="tab col s6"><a class="white-text active" href="#isistema">Sistema</a></li>
    <li class="tab col s6"><a class="white-text" href="#isoporte">Soporte</a></li>
  </ul>
  <section id="isistema" class="col s12">
    <div class="row">
      <div class="col s12">
        <table>
          <tbody>
            <tr><td colspan="2" class="center"><b>Información del Sistema</b></td></tr>
            <tr style="border-bottom: 1px solid" class="gtext"> <td><b>Plan:</b></td> <td id="psystem" align="right"></td></tr>
            <tr style="border-bottom: 1px solid" class="gtext"> <td><b>Modalidad de Sistema:</b></td> <td id="msystem" align="right"></td> </tr>
            <tr style="border-bottom: 1px solid" class="gtext"> <td><b>Tipo de Pago:</b></td> <td id="tsystem" align="right"></td> </tr>
            <tr style="border-bottom: 1px solid" class="gtext"> <td><b>Fecha Siguiente Pago:</b></td> <td id="fsystem" align="right"></td> </tr>
            <tr style="border-bottom: 1px solid" class="gtext"> <td><b>Días de Pago:</b></td> <td id="dsystem" align="right"></td> </tr>
          </tbody>
        </table>
      </div>
      </div>
      </section>

      <section id="isoporte" class="col s12">
        <div class="row">
          <div class="col s12">
            <table>
              <tbody>
                <tr><td colspan="2" class="center"><b>Información del Soporte</b></td></tr>
                <tr style="border-bottom: 1px solid" class="gtext"> <td><b>Plan:</b></td> <td id="psoport" align="right"></td></tr>
                <tr style="border-bottom: 1px solid" class="gtext"> <td><b>Modalidad de Soporte:</b></td> <td id="msoport" align="right"></td> </tr>
                <tr style="border-bottom: 1px solid" class="gtext"> <td><b>Tipo de Pago:</b></td> <td id="tsoport" align="right"></td> </tr>
                <tr style="border-bottom: 1px solid" class="gtext"> <td><b>Fecha Siguiente Pago:</b></td> <td id="fsoport" align="right"></td> </tr>
                <tr style="border-bottom: 1px solid" class="gtext"> <td><b>Días de Pago:</b></td> <td id="dsoport" align="right"></td> </tr>
              </tbody>
            </table>
          </div>
        </div>
          
      </section>
      <div class="row">
      <div class="col s4 input-field">
        <select id="vopcion">
          <option selected disabled>Tipo</option>
          <option value="1">Transferencia</option>
          <option value="2">Depósito</option>
        </select>
      </div>
      <div class="col s8 input-field">
        <label for="vnumref">Guía Bancaria</label>
        <input type="text" id="vnumref">
      </div>
      </div>

      <div class="row">
        <div class="col s8 input-field">
          <label for="vresponse">Enviar Información a:</label>
          <input type="text" id="vresponse" value="{$smarty.session.CRR}">
        </div>
        <div class="col s4">
          <a href="#" id="vvalidar" class="waves-effect btn btn2"><i class="mdi mdi-send"></i>&nbsp;Enviar</a>
        </div>
      </div>

      <div class="row">
          <div class="col s8 input-field"  style="margin-top: 15px">
            <label for="vcodigoIn">Código de Aceptación</label>
            <input type="text" id="vcodigoIn">
          </div>
          <div class="col s4">
            <a href="#" id="vvalidar" class="btn btn2 eder">Validar Código</a>
          </div>
        </div>
    <!-- <span>Consula o duda favor comunicarse a <span class="blue-text">info@logintechcr.com</span></span><br> -->
    <!-- <img src="../../assets/img/login/logo_azulG.png" width="100px" height="100px" style="margin-left: 48%"> -->    
  </div>

  <div class="modal-footer">
    <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
  </div>
</div>

<div class="modal modal-fixed-footer grandemodal" id="modal-notasprod">
  <div class="modal-header head2 center" style="font-size: 22px;">Notas Producto</div>
  <div class="modal-content">

      <div class="row">
        <div class="col s4">
          <b><span class="_proname"></span></b>
        </div>

        <div class="col s4">
          Cantidad(UN): <span id="npcant">0</span>
        </div>

        <div class="col s4">
          Precio(CRC): <span id="npprec">0</span>
        </div>

      </div>

      <div class="row">
        <div class="col s8 input-field">
          <textarea id="_vnota" class="materialize-textarea" data-length="100"></textarea>
          <label for="_vnota">Nota</label>
        </div>

        <div class="col s4">
          <label for="_vtiponota">Tipo Nota</label>
          <select id="_vtiponota" class="browser-default">
            <option value="1" selected>Informativa</option>
            <option value="2">Mostrar en Facturacion</option>
          </select>
          <br>
          <a class="btn" tp="1" id="mntNotas">Guardar</a>
        </div>  
      </div>
      
      <table class="table bordered">
        <thead>
          <th>Fecha</th>
          <th>Nota</th>
          <th>Mostrar en</th>
          <th>Usuario</th>
          <th></th>
        </thead>
        <tbody id="_listanotas"></tbody>
      </table>
  </div>
  <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
  </div>
</div>

  <div class="modal modal-fixed-footer" id="modal-flujo" style="height: 75%; width: 50%">
    <div class="modal-header head3 center" style="font-size: 22px;">Entradas y Salidas de Efectivo <i style="float: right;cursor: pointer;" class="mdi mdi-magnify button-collapse" id="shflujo" title="Ver Entradas y Salidas" data-activates="gextra"></i></div>
    <div class="modal-content">
      <div class="row">

        <div class="col s6">
          <div class="switch" align="center">
            <label>
              Salida
              <input type="checkbox" id="tiporubro">
              <span class="lever"></span>
              Entrada
            </label>
          </div>

        </div>

        <div class="col s6">
          <label for="listrubros" class="active">Rubro</label>
          <select id="listrubros" class="browser-default">
          </select>
        </div>

        </div>

        <div class="row">

        <div class="col s6 input-field">
          <input type="text" id="gvalor" class="eder numeric" value="0.00" autocomplete="off">
          <label for="gvalor">Monto</label>  
        </div>

         <div class="col s6">
          <label for="monrubros" class="active">Moneda</label>
          <select id="monrubros" class="browser-default">
          </select>
        </div>

        </div>

        <div class="row">

        <div class="col s12 input-field hide gres po" tr="1">
          <input type="text" id="gproveedor" value="" autocomplete="off">
          <label for="gproveedor">Proveedor</label>  
        </div>

        <div class="col s12 input-field hide gres us" tr="2">
          <input type="text" id="guser" value="" autocomplete="off">
          <label for="guser">Usuario</label>  
        </div>

        <div class="col s12 input-field hide gres vo" tr="3">
          <input type="text" id="gvoucher" value="" autocomplete="off">
          <label for="gvoucher">Voucher</label>  
        </div>

        <div class="col s12 input-field">
          <input type="text" id="gcomentario" value="" autocomplete="off">
          <label for="gcomentario">Comentario</label>  
        </div>

        </div>

    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
        <a class="modal-action waves-effect waves-green btn-flat" id="doflujo">Aceptar</a>
    </div>
  </div>

<div id="modal-mensajes" class="modal modal-fixed-footer mymodal">
  <div class="modal-content" >
    <h4 class="center">Mensaje del Sistema</h4> 
    <p id="msistem"></p>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action waves-effect waves-green btn-flat" id="acptmsj">Aceptar</a>
  </div>
</div>

 <div id="modal-help" class="modal modal-fixed-footer" style="border-bottom: 1px solid #e3e3ee;">
   <div class="modal-header head3"> <h4 class="center">Centro de Ayuda APSY</h4>  </div>
  <div class="modal-content">
    <a href="#" class="btn">Estado de las Incidencias <i class="mdi mdi-24px mdi-magnify"></i></a>
  </div>
  <div class="modal-footer" style="padding-bottom: 55px;">
    <a href="#!" class="modal-action waves-effect waves-green btn-flat">Salir</a>
  </div>
</div>

<ul id="gextra" class="side-nav side-nav-flujo" style="z-index: 2500 !important;">
  <div class="card-header blue white-text center">
    <i class="mdi mdi-keyboard-backspace _ret" target="shflujo"></i>  <h5 style="margin: 0px;">Lista Entradas y Salidas</h5>
  </div>

  <div class="row" style="margin: 0px;margin-top: 2%;">
    <div class="col s4 input-field">
      <label for="gldesde" class="active">Desde</label>
      <input type="date" id="gldesde" class="browser-default glchange" style="border: 0;outline: none;">
    </div>

    <div class="col s4 input-field">
      <label for="glhasta" class="active">Hasta</label>
      <input type="date" id="glhasta" class="browser-default glchange" style="border: 0;outline:none;">
    </div>

    <div class="col s4">
      <label for="glsuc" class="active">Sucursal</label>
      <select id="glsuc" class="browser-default glchange">
      </select>
    </div>
  </div>

  <table class="tbl hovered">
    <thead>
      <th>Fecha</th>
      <th>Valor</th>
      <th>Comentario</th>
      <th>Rubro</th>
      <th></th>
    </thead>
    <tbody id="listaflujo"></tbody>
  </table>

</ul>

<ul id="slide-movprod" class="side-nav" style="width:65%">
  <div class="row">
    <div class="col s12 center">
      <i class="mdi mdi-arrow-left salir-slide" slide-n="slide-movprod" style="float: left;"></i>
      <span><b>Movimiento de Producto</b></span> <br>
      <small id="movprod_name"></small>
      <hr>
      <br>
    </div>

    <div class="row s12">
      <div class="col s4 input-field">
        <input type="text" value="0" class="eder" id="movprod_cnt">
        <label for="movprod_cnt">Unidades</label>
      </div>

      <div class="col s4 input-field hide">
        <input type="text" value="0" class="eder" id="movprod_cnt_mts">
        <label for="movprod_cnt_mts">Metros</label>
      </div>
      
      <div class="col s4">
        <a class="btn" id="movprod_update" vid="0" razon="1">Actualizar inventario</a>
      </div>
    </div>

    <div class="col s12">
      <table class="tbl bordered striped">
        <thead>
          <tr>
            <th>Movimiento</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Inicial</th>
            <th>Cantidad</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody id="movprod_bdy"></tbody>
      </table>
    </div>
  </div>
</ul>

<ul id="extra" class="side-nav side-nav-conta1" >
  <i class="mdi mdi-refresh mdi-spin loader" style="font-size:65px;margin-left: 50%;"></i>
  <iframe src="" id="extra-i" style="width: 100%;height: 100vh;" class="hide"></iframe>
</ul>

<ul id="gnotificaciones" class="side-nav side-nav-flujo" style="z-index: 2500 !important;">
  <div class="card-header blue white-text center">
    <i class="mdi mdi-keyboard-backspace _ret" target="shflujo"></i>  <h5 style="margin: 0px;">Notificaciones</h5>
  </div>

  <div class="row" style="margin: 0px;margin-top: 2%;">
    <div class="col s4 input-field">
      <label for="gndesde" class="active">Desde</label>
      <input type="date" id="gndesde" class="browser-default gnchange" style="border: 0;outline: none;">
    </div>

    <div class="col s4 input-field">
      <label for="gnhasta" class="active">Hasta</label>
      <input type="date" id="gnhasta" class="browser-default gnchange" style="border: 0;outline:none;">
    </div>
  </div>

  <table class="tbl">
    <thead>
      <tr>
        <th>Fecha Creación</th>
        <th>Usuario</th>
        <th>Tipo</th>
        <th>Acciones</th>
      </tr>  
    </thead>
    <tbody id="listanotificaciones"></tbody>
  </table>
  </div>
</ul>

<div id="modal-rastreo" class="modal modal-fixed-footer grandemodal">
  <div class="modal-content" style="padding-top: 0px; padding-bottom: 0px;">
    <h4 class="center">Rastreo de Factura</h4>
    <hr>

    <section id="r_pone">
      <div class="center">
        <input type="radio" name="rastreo" id="rfct" vid="1" checked>
        <label for="rfct">Factura</label>

        <input type="radio" name="rastreo" id="rtkt" vid="7">
        <label for="rtkt">Tiquete</label>

        <input type="radio" name="rastreo" id="rspc" vid="8">
        <label for="rspc">Especial</label>

        <input type="radio" name="rastreo" id="rcmp" vid="2">
        <label for="rcmp">Compra</label>

        <input type="radio" name="rastreo" id="rocm" vid="3">
        <label for="rocm">Orden Compra</label>
      </div>

      <br>

      <div class="row">
        <div class="col s8 input-field">
          <input type="text" id="r_cons" style="text-align: center;" autocomplete="off">
          <label for="r_cons" class="active">Consecutivo</label>
        </div>
        <div class="col s4" id="rastreo-estados" style="display: flex;flex-direction: column;">

          <div style="display: flex;align-items: center;margin-bottom: 5px;">
            <input type="checkbox" id="estado1">
            <label for="estado1"></label>
          </div>
          
        </div>
      </div>
    </section>

    <section id="r_ptwo">
    </section>
   
  </div>
  <div class="modal-footer" id="info-not">
    <a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Salir</a>
  </div>
</div>

<div id="modal-referencias" class="modal modal-fixed-footer">
  <div class="modal-content" style="padding-top: 0px; padding-bottom: 0px;">
    <h4 class="center" id="ref_prodname"></h4>
    <h6 class="center">Referencia de Precios</h6>
    <div class="row">
      <div class="col s6 input-field">
        <input type="text" class="fastClient" bisprov="1" idelem="1" id="ref_search" autocomplete="off">
        <label for="ref_search">Buscar Proveedor</label>
      </div>

      <div class="col s4 input-field">
        <input type="text" id="ref_precio" value="0.00" class="numeric eder">
        <label for="ref_precio">Precio</label>
      </div> 

      <div class="col s2">
        <a class="btn-floating" title="Agregar Referencia" id="agRef"> <i class="mdi mdi-plus "></i> </a>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <td>Proveedor</td>
          <td>Costo</td>
          <td>Fecha</td>
          <td>Usuario</td>
          <td>OC</td>
          <td></td>
        </tr>
      </thead>
      <tbody id="listaref">
        
      </tbody> 
    </table>

  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action waves-effect waves-green btn-flat" id="ref_ing">Aceptar</a>
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
  </div>
</div>

<div id="modal-rastreo" class="modal modal-fixed-footer">
  <div class="modal-content" style="padding-top: 0px; padding-bottom: 0px;">
    <h4 class="center">Rastreo de Factura</h4>
    <hr>

    <section id="r_pone">
      <div class="center">
        <input type="radio" name="rastreo" id="rfct" vid="1" checked>
        <label for="rfct">Factura</label>

        <input type="radio" name="rastreo" id="rtkt" vid="7">
        <label for="rtkt">Tiquete</label>

        <input type="radio" name="rastreo" id="rspc" vid="8">
        <label for="rspc">Especial</label>

        <input type="radio" name="rastreo" id="rcmp" vid="2">
        <label for="rcmp">Compra</label>
      </div>

      <br>

      <div class="input-field container">
        <input type="text" id="r_cons" style="text-align: center;" autocomplete="off">
        <label for="r_cons" class="active">Consecutivo</label>
      </div>
    </section>

    <section id="r_ptwo">
    </section>
   
  </div>
  <div class="modal-footer" id="info-not">
    <a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Salir</a>
  </div>
</div>

<div id="modal-display-not" class="modal modal-fixed-footer" style="height: 40%">
  <div class="modal-content" style="padding-top: 0px; padding-bottom: 0px;" id="cuerpo-not">
    

  </div>
  <div class="modal-footer" id="info-not">
    <a href="#!" acc="1" class="modal-action waves-effect waves-blue btn-flat modal-close acc-not blue white-text">Aceptar</a>
    <a href="#!" acc="2" class="modal-action waves-effect waves-red btn-flat modal-close acc-not red white-text">Denegar</a>
    <a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Salir</a>
  </div>
</div>