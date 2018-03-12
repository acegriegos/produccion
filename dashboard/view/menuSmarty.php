<link rel="stylesheet" href="../assets/scss/modulos/style-menu.css">


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
                <li><a href="#!" value="0" class="otpmenu white-text" id="x1">Información</a></li>
                <li><a href="#!" value="1" class="otpmenu white-text" id="x2">Notificaciones</a></li>
                <li><a href="#!" value="2" class="otpmenu white-text" id="x2">Cierre de Caja</a></li>
                <li><a href="#!" value="4" class="otpmenu white-text" id="x2">Info Sistema</a></li>
              </ul>
            </div>
          </li>
        </ul>
        </div>
      </div>
    </li>
  <div class="row container" style="padding: 0; margin-bottom: 0">
    <div class="col s10" style="padding: 0">
      <input id="numtrans" type="text" class="validate let" placeholder="Transaccion">
    </div>
    <div class="col s2" style="padding: 0">
      <i class="mdi mdi-numeric-0-box-multiple-outline gtext" style="font-size: 1em"></i>
    </div>
  </div>
  <div class="options" style="padding-bottom: 20%">
    <li class="per1 gtext"><a href="dashboard" class="black-text"><i class="mdi mdi-home-variant mdi-24px right" aria-hidden="true"></i><span style="font-size: 1.2em !important" >Inicio</span></a></li>
    <li class="per8 hide gtext"><a href="medicina"><i class="mdi mdi-medical-bag right" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Medicina</span></a></li>
    <li class="per900 hide gtext"><a href="laboratorio"><i class="mdi mdi-test-tube right" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Laboratorios</span></a></li>
    <li class="per10 hide"><a href="taller"><i class="mdi mdi-wrench right gtext" aria-hidden="true"; style="font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Taller</span></a></li>
    <li class="per2 gtext"><a href="comercial"><i class="mdi mdi-cash-multiple mdi-24px right" aria-hidden="true" "></i><span style="font-size: 1.2em !important">Área Comercial</span></a></li>
    <li class="per3 gtext"><a href="proveedor"><i class="mdi mdi-store mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de Operaciones</span></a></li>
    <li class="per4 gtext"><a href="financiero"><i class="mdi mdi-credit-card mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área Financiera</span></a></li>
    <li class="per5 gtext"><a href="inventario"><i class="mdi mdi-basket mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de Inventarios</span></a></li>
    <li class="per6 gtext"><a href="produccion"><i class="mdi mdi-quality-high mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área de Producción</span></a></li>
    <li class="per7 gtext"><a href="administracion"><i class="mdi mdi-settings mdi-24px right" aria-hidden="true""></i><span style="font-size: 1.2em !important">Área Administrativa</span></a></li>
    <li class="hide gtext"><a href="reportes"><i class="mdi-google-analythics mdi-24px right" aria-hidden="true";"></i><span style="font-size: 1.2em !important">Reportes</span></a></li>
    <li><a href="logout"><i class="mdi mdi-close mdi-24px right gtext" aria-hidden="true";"></i><span style="font-size: 1.2em !important">Cerrar Sesión</span></a></li>
  </div>
</ul>
<div class="navbar-fixed hide-on-large-only">
  <nav>
    <div class="nav-wrapper blue-grey darken-2">
      <a href="#" data-activates="slide" class="button-collapse"><i class="mdi mdi-menu mdi-16px"></i></a>
    </div>
  </nav>
</div>

  <a style="background-color:#0B3861;" href="#" data-activates="slide" class="hide-on-med-and-down button-collapses  z-depth-5 menu-btn" ><span class="new badge sse_cnt hide" id="bsse1" data-badge-caption="" style="top: -15%;margin-left: 0px;"></span><br class="sse_cnt hide"> <p class="white-text menu-txt" >MENU</p></a>
  <!-- hide-on-med-and-down  -->

 
  <div class="modal modal-fixed-footer grandemodal" id="modal-system" style="height: 85%; width: 90%">

  <div class="modal-header">
    <ul class="tabs tabs-fixed-width blue">
      <li class="tab col s3 white-text"><a>LOGINTECH S.A.</a></li>
    </ul>

  </div>
  <ul id="tabs-swipe-demo" class="tabs head2 center">
    <li class="tab col s6"><a class="white-text active" href="#isistema">Sistema</a></li>
    <li class="tab col s6"><a class="white-text " href="#isoporte">Soporte</a></li>
  </ul>
  <div class="modal-content">
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
          <label for="vresponse">Responer Correo a</label>
          <input type="text" id="vresponse" value="{$smarty.session.CRR}">
        </div>
        <div class="col s4">
          <a href="#" id="vvalidar"><i class="mdi mdi-send btn2"></i></a>
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
         <div class="row">
          <div class="col s6 input-field"  style="margin-top: 15px">
            <label for="vcodigoIn">Código de Aceptación</label>
            <input type="text" id="vcodigoIn">
          </div>
          <div class="col s6">
            <a href="#" id="vvalidar" class="btn blue der">Validar Código</a>
          </div>
        </div> 
      </section>
    <!-- <span>Consula o duda favor comunicarse a <span class="blue-text">info@logintechcr.com</span></span><br> -->
    <!-- <img src="../../assets/img/login/logo_azulG.png" width="100px" height="100px" style="margin-left: 48%"> -->    
  </div>

  <div class="modal-footer">
    <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
  </div>
</div>
<div id="modalMainGeneral"></div>
