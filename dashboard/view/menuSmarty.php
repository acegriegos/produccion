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

<a href="#" data-activates="slide" class="hide-on-med-and-down button-collapses z-depth-5 menu-btn" id="cpu" xyz="{$smarty.session.BUSS}">
  <span class="new badge sse_cnt hide" id="bsse1" data-badge-caption="" style="top: -15%;margin-left: 0px;"></span>
  <br class="sse_cnt hide"><p class="white-text menu-txt">MENU</p></a>
  <a href="#" data-activates="detfacturag" class="button-collapses hide" id="btndetfact">DetalleFacturas</a>
<!-- hide-on-med-and-down  -->
<div class="modal modal-fixed-footer grandemodal" id="modal-info" style="height: 80%; width: 75%">
  <div class="modal-header">
    <ul class="tabs tabs-fixed-width blue">
      <li class="tab col s3 white-text"><a>Información del Usuario</a></li>
    </ul>
  </div>
  <div class="modal-content " style="padding: 0px;"></div>
  <div class="modal-footer">
    <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
  </div>
</div>

<ul id="detfacturag" class="side-nav side-nav-cuentas asd"  style="width: 60%">
  <div id="listaCuentasNotaDetalle"></div>
</ul>

<ul id="slide" class="side-nav" style="max-width: 400px !important; font-size: 1.2em !important">
  <li>
    <div class="userView">
      <div class="background"><!-- CSS --></div>
        <div class="col s12 center">
         <p class="white-text">{$smarty.session.NOM}</p>
         <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header white-text"><i class="mdi mdi-menu-down white-text"></i>Opciones</a>
            <div class="collapsible-body" style="z-index: 100; position: absolute; width: 94%;">
              <ul class="head2">
                <li><a href="#!" value="0" class="otpmenu white-text {if $smarty.session.BUSS neq 0} hide {/if}" id="x1">Información</a></li>
                <li><a href="#!" value="1" class="otpmenu white-text {if $smarty.session.BUSS neq 0} hide {/if}" id="x2">Notificaciones</a></li>
                <li class="per7100"><a href="usuarios" class="white-text {if $smarty.session.BUSS eq 0} hide {/if}"><i class="mdi mdi-account mdi-24px right white-text" aria-hidden="true""></i> Usuario</a></li>
                <li><a href="#!" value="3" class="otpmenu white-text" id="x3"><i class="mdi mdi-cash mdi-24px right white-text" aria-hidden="true""></i>Cierre de Caja</a></li>
                <li class="per7200"><a href="ajustes" class="otpmenu white-text"><i class="mdi mdi-settings mdi-24px right white-text" aria-hidden="true""></i>Ajustes</a></li>
                <li><a href="#!" value="4" class="otpmenu white-text" id="x4"><i class="mdi mdi-information mdi-24px right white-text" aria-hidden="true""></i>Info Sistema</a></li>

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

  <div class="options">
  {php}
    $muser = $_SESSION['BUSS'];
    switch($muser){
    case 0:
  {/php}

    <li class="per1 gtext"><a href="dashboard" class="black-text"><i class="mdi mdi-home-variant mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important" >Inicio</span></a></li>
    <li class="per8 hide gtext"><a href="medicina"><i class="mdi mdi-medical-bag right" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Medicina</span></a></li>
    <li class="per9 gtext hide"><a href="laboratorio"><i class="mdi mdi-test-tube right" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Laboratorios</span></a></li>
    <li class="per10 hide"><a href="taller"><i class="mdi mdi-wrench right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Taller</span></a></li>
    <li class="per11 hide"><a href="restaurante"><i class="mdi mdi-silverware-variant right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Restaurante</span></a></li>
    <li class="per2 gtext"><a href="comercial"><i class="mdi mdi-cash-multiple mdi-24px right" aria-hidden="true" "></i><span style="font-size: 1.2em !important">Área Comercial</span></a></li>
    <li class="per3 gtext"><a href="proveedor"><i class="mdi mdi-store mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de Operaciones</span></a></li>
    <li class="per4 gtext"><a href="financiero"><i class="mdi mdi-credit-card mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área Financiera</span></a></li>
    <li class="per5 gtext"><a href="inventario"><i class="mdi mdi-basket mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de Inventarios</span></a></li>
    <li class="per6 gtext hide"><a href="produccion"><i class="mdi mdi-quality-high mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de Producción</span></a></li>
    <li class="per13 gtext hide"><a href="rrhh
      "><i class="mdi mdi-quality-high mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de RRHH</span></a></li>
    <li class="per7 gtext"><a href="administracion"><i class="mdi mdi-settings mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área Administrativa</span></a></li>
    <li class="hide gtext"><a href="reportes"><i class="mdi-google-analythics mdi-24px right" aria-hidden="true";"></i><span style="font-size: 1.2em !important">Reportes</span></a></li>
{php} break; case 3: {/php}
  <li class="per11 hide"><a href="restaurante"><i class="mdi mdi-silverware-variant right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Restaurante</span></a></li>
  <li class="gtext">
      <a class="collapsible-header dropdown-button" style="padding: 0px 32px 0px 32px;" data-alignment="right" data-activates='dropfact'><i class="mdi mdi-cash-multiple mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Facturación</span></a>
      <ul id='dropfact' class='dropdown-content'>
        <li class="per1100"><a href="facturacion?tf=1">Ventas</a></li>
        <li class="per1600"><a href="facturacion?tf=4">Proformas</a></li>
        <li class="per2100"><a href="facturacion?tf=2">Compras</a></li>
      </ul>

    </li>
    <li class="gtext">
      <a class="collapsible-header dropdown-button" style="padding: 0px 32px 0px 32px;" data-alignment="right" data-activates='dropfact_0'><i class="mdi mdi-account mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Clientes</span></a>
      <ul id='dropfact_0' class='dropdown-content'>
        <li class="per1000"><a href="clientes">Mantenimiento</a></li>
        <li class="per3200"><a href="cuentas?tf=1">Cuentas por Cobrar</a></li>
      </ul>

    </li>
    <li class="gtext">
      <a class="collapsible-header dropdown-button per2000" style="padding: 0px 32px 0px 32px;" data-alignment="right" data-activates='dropfact_1'><i class="mdi mdi-cash-multiple mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Proveedores</span></a>
      <ul id='dropfact_1' class='dropdown-content'>
        <li class="per2000"><a href="proveedores">Mantenimiento</a></li>
        <li class="per3300"><a href="cuentas?tf=2">Cuentas por Pagar</a></li>
      </ul>

    </li>
    <li class="gtext per4100"><a href="productos"><i class="mdi mdi-basket mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Productos y Servicios</span></a></li>
    <li class="gtext per3400"><a href="notas"><i class="mdi mdi-credit-card mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Notas de Crédito y Débito</span></a></li>
    
    <li class="gtext per1500"><a href="reportes" target="_new"><i class="mdi mdi-chart-areaspline mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Reportes</span></a></li>
    {literal}
      <script type="text/javascript">
        window.addEventListener('load', function () {
          permisos(1100,1100);
          permisos(1600,1600);
          permisos(2100,2100);
          permisos(1000,1000);
          permisos(3200,3200);
          permisos(2000,2000);
          permisos(3300,3300);
          permisos(4100,4100);
          permisos(3400,3400);
          permisos(1500,1500);
          permisos(6100,6100);
          permisos(7100,7100);
          permisos(7200,7200);
        }, false);
      </script>
      {/literal}
{php} break; case 1: {/php}
    <li class="gtext">
      <a class="collapsible-header dropdown-button" style="padding: 0px 32px 0px 32px;" data-alignment="right" data-activates='dropfact'><i class="mdi mdi-cash-multiple mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Facturación</span></a>
      <ul id='dropfact' class='dropdown-content'>
        <li><a href="facturacion?tf=1">Ventas</a></li>
        <li><a href="facturacion?tf=4">Proformas</a></li>
      </ul>
    </li>
    <li class="gtext"><a href="clientes"><i class="mdi mdi-account mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Clientes</span></a></li>
    <li class="gtext"><a href="productos"><i class="mdi mdi-basket mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Productos y Servicios</span></a></li>
    <li class="gtext"><a href="cuentas?tf=1"><i class="mdi mdi-checkbox-multiple-blank-outline mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Cuentas por Cobrar</span></a></li>
    <li class="gtext"><a href="notas"><i class="mdi mdi-credit-card mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Notas de Crédito y Débito</span></a></li>
    <li class="gtext"><a href="reportes" target="_new"><i class="mdi mdi-chart-areaspline mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Reportes</span></a></li>
    
{php} break; case 4: {/php}
  <li class="per1 gtext"><a href="dashboard" class="black-text"><i class="mdi mdi-home-variant mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important" >Inicio</span></a></li>
    <li class="per8 hide gtext"><a href="medicina"><i class="mdi mdi-medical-bag right" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Medicina</span></a></li>
    <li class="per9 gtext hide"><a href="laboratorio"><i class="mdi mdi-test-tube right" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Laboratorios</span></a></li>
    <li class="per10 hide"><a href="taller"><i class="mdi mdi-wrench right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Taller</span></a></li>
    <li class="per11 hide"><a href="restaurante"><i class="mdi mdi-silverware-variant right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Restaurante</span></a></li>
    <li class="per2 gtext"><a href="comercial"><i class="mdi mdi-cash-multiple mdi-24px right" aria-hidden="true" "></i><span style="font-size: 1.2em !important">Área Comercial</span></a></li>
    <li class="per3 gtext"><a href="proveedor"><i class="mdi mdi-store mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de Operaciones</span></a></li>
    <li class="per4 gtext"><a href="financiero"><i class="mdi mdi-credit-card mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área Financiera</span></a></li>
    <li class="per5 gtext"><a href="inventario"><i class="mdi mdi-basket mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de Inventarios</span></a></li>
    <li class="per6 gtext hide"><a href="produccion"><i class="mdi mdi-quality-high mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de Producción</span></a></li>
    <li class="per13 gtext hide"><a href="rrhh
      "><i class="mdi mdi-quality-high mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de RRHH</span></a></li>
    <li class="per7 gtext"><a href="administracion"><i class="mdi mdi-settings mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área Administrativa</span></a></li>
    <li class="hide gtext"><a href="reportes"><i class="mdi-google-analythics mdi-24px right" aria-hidden="true";"></i><span style="font-size: 1.2em !important">Reportes</span></a></li>
{php} break; case 5: {/php}
  <li class=""><a href="arrendamiento"><i class="mdi mdi-cash-usd right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Préstamos</span></a></li>

    <li class="gtext">
      <a class="collapsible-header dropdown-button" style="padding: 0px 32px 0px 32px;" data-alignment="right" data-activates='dropfact_0'><i class="mdi mdi-account mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Clientes</span></a>
      <ul id='dropfact_0' class='dropdown-content'>
        <li class="per1000"><a href="clientes">Mantenimiento</a></li>
        <li class="per3200"><a href="cuentas?tf=1">Cuentas por Cobrar</a></li>
      </ul>

    </li>

    <li class="gtext"><a href="rutas"><i class="mdi mdi-car-sports mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Rutas</span></a></li>
    
    <li class="gtext per1500"><a href="reportes?tr=5" target="_new"><i class="mdi mdi-chart-areaspline mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Reportes</span></a></li>

    {literal}
      <script type="text/javascript">
        window.addEventListener('load', function () {
          permisos(1500,1500);
        }, false);
      </script>
      {/literal}
{php} break; defualt: break;} {/php}
  <li class="gtext per12"><a href="documentos"><i class="mdi mdi-file-document mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Documentos Electrónicos</span></a></li>
    <li><a href="logout"><i class="mdi mdi-close mdi-24px right gtext" aria-hidden="true";"></i><span style="font-size: 1.2em !important">Cerrar Sesión</span></a></li>
  </div>
</ul>

<div class="modal modal-fixed-footer" style="width:80% !important; height:99%;padding: 0px;" id="modal-system">
  <div class="modal-header head1 center">
      LOGINTECH S.A.
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
          <label for="vresponse">Enviar Informacion a:</label>
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
<div id="modalMainGeneral"></div>

{if $smarty.session.BUSS eq 5}
    <div class="modal modal-fixed-footer" id="modal-clientesg" style="height: 400px;">
   <div class="modal-header head3 center" id="titagcli" style="font-size: 22px;">Agregar Cliente</div>
  <div class="modal-content">

    <div class="row">

      <div class="input-field col s6">
      </div>

      <div class="input-field col s6">
        <a href="#" data-activates="slide-tc" id="slideDireccion" data-num="3"  data-direccion="" data-idbarrio="0" class="button-collapse der tooltipped tc-show black-text" data-tooltip="Ubicacion del Cliente" data-position="bottom" id="tc-u" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"><i class="mdi mdi-24px mdi-map-marker  mdi-24px"></i></a>
        <input type="hidden" id="vdireccion" readonly>

        <a href="#" data-activates="slide-tc" data-num="1" id="slideTelefono" class="mdi mdi-24px mdi-phone tooltipped mdi-24px button-collapse der tc-show  black-text" data-tooltip="Teléfonos del Cliente" data-position="bottom" id="tc-t" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"></a>
        <input type="hidden" id="vtelefono" readonly>

        <a href="#" data-activates="slide-tc" data-num="2" id="slideCorreo" class="button-collapse der tc-show tooltipped black-text" data-tooltip="Correos del Cliente" data-position="bottom" id="tc-c" slide-id="0" slide-tbl="2" asave="0" style="padding-right: 20px"><i class="mdi mdi-24px mdi-email  mdi-24px"></i></a>
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
{/if}

<div class="modal modal-fixed-footer" id="modal-rutasg" style="height: 50%; width: 50%">
    <div class="modal-header head3 center" style="font-size: 22px;">Rutas</div>
    <div class="modal-content">
        <div class="row">
          <label for="chruta" class="col s4"><b>Cambiar Ruta</b></label>
          <select id="chruta" class="col s8">
          </select>
        </div>

        <div class="row">
          <label for="chreg" class="col s4"><b>Cambiar Región</b></label>
          <select id="chreg" class="col s8">
          </select>
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
    </div>
  </div>

  <div class="modal modal-fixed-footer" id="modal-flujo" style="height: 50%; width: 50%">
    <div class="modal-header head3 center" style="font-size: 22px;">Gastos</div>
    <div class="modal-content row">

        <div class="col s6">
          <select id="listrubros" class="browser-default">
            <option>gg</option>
          </select>
        </div>

        <div class="col s6 input-field">
          <input type="text" id="gvalor" class="eder" value="0">
          <label for="gvalor">Monto</label>  
        </div>

        <div class="col s12 input-field">
          <input type="text" id="gcomentario" value="">
          <label for="gcomentario">Comentario</label>  
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
        <a class="modal-action doflujo waves-effect waves-green btn-flat">Aceptar</a>
    </div>
  </div>