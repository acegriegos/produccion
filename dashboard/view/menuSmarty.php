<ul id="slide" class="side-nav blue-text text-darken-2 " style="max-width: 400px !important; font-size: 2.4em !important">
    <li>
      <div class="userView">
        <div class="background">
          <!-- CSS -->          
        </div>
        <a href="#!user" class="center"><i class="medium mdi mdi-account-circle" style="color:#fff;padding-left: 25%;" aria-hidden="true"></i></a>
        <div class="input-field col s12 white-text selectusr">
          <select id="lgt">
            <option value="0" class="logout " id="x1" disabled selected>{$smarty.session.NOM} </option>
            <option value="1" class="logout" id="x2">Información</option>
            <option value="2" class="logout" id="x2">Notificaciones</option>
            <option value="3" class="logout" id="x2">Cierre de Caja</option>
            <option value="4" class="logout" id="x2">Info Sistema</option>
          </select>
          
        </div>
        <a href="#!name" class="center"><span class="white-text name"></span></a>
        <a href="#!email" class="center"><span class="white-text email">{$smarty.session.MAIL}</span></a>
      </div>
    </li>
    <div class="row transac-menu">
    <div class="input-field col s10">
      <input id="numtrans" type="text" class="validate let" placeholder="Transaccion">
    </div>
    </div>
  <div class="options" style="padding-bottom: 20%">
    <li class="per1"><a href="dashboard" class="black-text"><i class="mdi mdi-home-variant mdi-24px right" aria-hidden="true" style="color: #000000 "></i><span style="font-size: 1.2em !important" >Inicio</span></a></li>

    <li class="per8 hide"><a href="medicina"><i class="mdi mdi-medical-bag right" aria-hidden="true" style="color: #000000; font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Medicina</span></a></li>

    <li class="per9 hide"><a href="laboratorio"><i class="mdi mdi-test-tube right" aria-hidden="true" style="color: #000000; font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Laboratorios</span></a></li>

    <li class="per10 hide"><a href="taller"><i class="mdi mdi-wrench right" aria-hidden="true" style="color: #000000; font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Taller</span></a></li>

    <li class="per2"><a href="comercial"><i class="mdi mdi-cash-multiple mdi-24px right" aria-hidden="true" style="color: #000000 "></i><span style="font-size: 1.2em !important">Área Comercial</span></a></li>

    <li class="per3"><a href="proveedor"><i class="mdi mdi-store mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Área de Operaciones</span></a></li>

    <li class="per4"><a href="financiero"><i class="mdi mdi-credit-card mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Área Financiera</span></a></li>

    <li class="per5"><a href="inventario"><i class="mdi mdi-basket mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Área de Inventarios</span></a></li>

    <li class="per6"><a href="produccion"><i class="mdi mdi-quality-high mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Área de Producción</span></a></li>

    <li class="per7"><a href="administracion"><i class="mdi mdi-settings mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Área Administrativa</span></a></li>

    <li class="hide"><a href="reportes"><i class="mdi-google-analythics mdi-24px right" aria-hidden="true" style="color: #000000;"></i><span style="font-size: 1.2em !important">Reportes</span></a></li>

    <li><a href="logout"><i class="mdi mdi-airplane-takeoff mdi-24px right" aria-hidden="true" style="color: #000000;"></i><span style="font-size: 1.2em !important">Cerrar Sesión</span></a></li>

    </div>
  </ul>

<div class="navbar-fixed hide-on-large-only">
  <nav>
    <div class="nav-wrapper blue-grey darken-2">
      <a href="#" data-activates="slide" class="button-collapse"><i class="samll material-icons">menu</i></a>
    </div>
  </nav>
</div>

  <a style="background-color:#0B3861;" href="#" data-activates="slide" class="hide-on-med-and-down button-collapses  z-depth-5 menu-btn" ><span class="new badge sse_cnt hide" id="bsse1" data-badge-caption="" style="top: -15%;margin-left: 0px;"></span><br class="sse_cnt hide"> <p class="white-text menu-txt" >MENU</p></a>
  <!-- hide-on-med-and-down  -->

 <div class="modal modal-fixed-footer grandemodal" id="modal-info" style="height: 80%; width: 75%">

  <div class="modal-header">
    <ul class="tabs tabs-fixed-width blue">
      <li class="tab col s3 white-text">Información del Usuario</li>
    </ul>
  </div>

  <div class="modal-content " style="padding: 0px;">
  </div>

  <div class="modal-footer">

    <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
  </div>

 </div>

  <div class="modal modal-fixed-footer grandemodal" id="modal-system" style="height: 85%; width: 90%">

  <div class="modal-header">
    <ul class="tabs tabs-fixed-width blue">
      <li class="tab col s3 white-text">LOGINTECH S.A.</li>
    </ul>
  </div>

  <div class="modal-content " style="padding: 0px;">
    <div class="row">
      <div class="col s6">
        <table>
        <tbody>
          <tr><td colspan="2" class="center"><b>Información del Sistema</b></td></tr>
          <tr style="border-bottom: 1px solid black"> <td><b>Plan:</b></td> <td id="psystem" align="right"></td></tr>
          <tr style="border-bottom: 1px solid black"> <td><b>Modalidad de Sistema:</b></td> <td id="msystem" align="right"></td> </tr>
          <tr style="border-bottom: 1px solid black"> <td><b>Tipo de Pago:</b></td> <td id="tsystem" align="right"></td> </tr>
          <tr style="border-bottom: 1px solid black"> <td><b>Fecha Siguiente Pago:</b></td> <td id="fsystem" align="right"></td> </tr>
          <tr style="border-bottom: 1px solid black"> <td><b>Días de Pago:</b></td> <td id="dsystem" align="right"></td> </tr>
        </tbody>
      </table>
      </div>

      <div class="col s6">
        <table>
        <tbody>
          <tr><td colspan="2" class="center"><b>Información del Soporte</b></td></tr>
          <tr style="border-bottom: 1px solid black"> <td><b>Plan:</b></td> <td id="psoport" align="right"></td></tr>
          <tr style="border-bottom: 1px solid black"> <td><b>Modalidad de Soporte:</b></td> <td id="msoport" align="right"></td> </tr>
          <tr style="border-bottom: 1px solid black"> <td><b>Tipo de Pago:</b></td> <td id="tsoport" align="right"></td> </tr>
          <tr style="border-bottom: 1px solid black"> <td><b>Fecha Siguiente Pago:</b></td> <td id="fsoport" align="right"></td> </tr>
          <tr style="border-bottom: 1px solid black"> <td><b>Días de Pago:</b></td> <td id="dsoport" align="right"></td> </tr>
        </tbody>
      </table>
      </div>

      <div class="col s6" >
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

          <div class="col s12">
            <div class="row">
              <div class="col s8 input-field">
                <label for="vresponse">Responer Correo a</label>
                <input type="text" id="vresponse" value="{$smarty.session.CRR}">
              </div>

              <div class="col s4">
                <a href="#" id="vvalidar" class="btn green"><i class="mdi mdi-send"></i> Enviar</a>
              </div>
            </div>
            
            
          </div>
        
        </div>
      </div>
      
      <div class="col s6 input-field"  style="margin-top: 15px">
        <label for="vcodigoIn">Código de Aceptación</label>
        <input type="text" id="vcodigoIn">
      </div>

      <div class="col s6">
        <a href="#" id="vvalidar" class="btn blue der">Validar Código</a>
      </div>

    </div>
    
    
    <!-- <span>Consula o duda favor comunicarse a <span class="blue-text">info@logintechcr.com</span></span><br> -->
    <!-- <img src="../../assets/img/login/logo_azulG.png" width="100px" height="100px" style="margin-left: 48%"> -->

  </div>

  <div class="modal-footer">

    <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
  </div>

 </div>
