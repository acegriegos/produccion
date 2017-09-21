<ul id="slide" class="side-nav blue-text text-darken-2 " style="max-width: 400px !important; font-size: 2.4em !important">
    <li>
      <div class="userView">
        <div class="background">
          <!-- CSS -->          
        </div>
        <a href="#!user" class="center"><i class="medium material-icons" style="color:#fff" aria-hidden="true">person_pin</i></a>
        <div class="input-field col s12 white-text selectusr">
          <select id="lgt">
            <option value="0" class="logout" id="x1" disabled selected>{$smarty.session.NOM} </option>
            <option value="1" class="logout" id="x2">Información</option>
            <option value="2" class="logout" id="x2">Notificaciones</option>
            <option value="3" class="logout" id="x2">Cierre de Caja</option>
          </select>
          <!-- <span class="new badge" data-badge-caption="Notificacion(es) sin Leer" id="newnot"></span> -->
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

    <li class="per8"><a href="medicina"><i class="mdi mdi-medical-bag right" aria-hidden="true" style="color: #000000; font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Medicina</span></a></li>

    <li class="per9"><a href="laboratorio"><i class="mdi mdi-test-tube right" aria-hidden="true" style="color: #000000; font-size: 2em !important"></i><span style="font-size: 1.2em !important">Área Laboratorios</span></a></li>

    <li class="per2"><a href="comercial"><i class="mdi mdi-cash-multiple mdi-24px right" aria-hidden="true" style="color: #000000 "></i><span style="font-size: 1.2em !important">Área Comercial</span></a></li>

    <li class="per3"><a href="proveedor"><i class="mdi mdi-store mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Área de Operaciones</span></a></li>

    <li class="per4"><a href="financiero"><i class="mdi mdi-credit-card mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Área Financiera</span></a></li>

    <li class="per5"><a href="inventario"><i class="mdi mdi-basket mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Área de Inventarios</span></a></li>

    <li class="per6"><a href="produccion"><i class="mdi mdi-quality-high mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Área de Producción</span></a></li>

    <li class="per7"><a href="administracion"><i class="mdi mdi-settings mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Área Administrativa</span></a></li>

    <li class="hide"><a href="reportes"><i class="mdi-google-analythics mdi-24px right" aria-hidden="true" style="color: #000000;"></i><span style="font-size: 1.2em !important">Reportes</span></a></li>

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
      Información del Usuario
    </ul>
  </div>

  <div class="modal-content " style="padding: 0px;">
  </div>

  <div class="modal-footer">

    <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button><!-- 
    <button type="button" class="waves-effect waves-green btn-flat add" id="agClie" codigo="1" modulo="cliente" varias="1" >Guardar</button> -->
  </div>

 </div>