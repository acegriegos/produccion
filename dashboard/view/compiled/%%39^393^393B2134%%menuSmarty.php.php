<?php /* Smarty version 2.6.17, created on 2017-12-16 03:09:51
         compiled from ../view/menuSmarty.php */ ?>
<ul id="slide" class="side-nav blue-text text-darken-2 " style="max-width: 400px !important; font-size: 2.4em !important">
    <li>
      <div class="userView">
        <div class="background">
          <!-- CSS -->          
        </div>
        <a href="#!user" class="center"><i class="medium mdi mdi-account-circle" style="color:#fff;padding-left: 25%;" aria-hidden="true"></i></a>
        <div class="input-field col s12 white-text selectusr">
          <select id="lgt">
            <option value="0" class="logout" id="x1" disabled selected><?php echo $_SESSION['NOM']; ?>
 </option>
            <option value="1" class="logout" id="x2">Información</option>
            <option value="2" class="logout" id="x3">Notificaciones</option>
            <option value="3" class="logout" id="x4">Cierre de Caja</option>
          </select>
          
        </div>
        <a href="#!name" class="center"><span class="white-text name"></span></a>
        <a href="#!email" class="center"><span class="white-text email"><?php echo $_SESSION['MAIL']; ?>
</span></a>
      </div>
    </li>
    <div class="row transac-menu">
    <div class="input-field col s10">
      <input id="numtrans" type="text" class="validate let" placeholder="Transaccion">
    </div>
    </div>
  <div class="options" style="padding-bottom: 20%">
    <li class="per1"><a href="dashboard" class="black-text"><i class="mdi mdi-home-variant mdi-24px right" aria-hidden="true" style="color: #000000 "></i><span style="font-size: 1.2em !important" >Inicio</span></a></li>

    <li class="per2"><a href="clientes"><i class="mdi mdi-account mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Clientes</span></a></li>

    <li class="per2"><a href="historial"><i class="mdi mdi-account-card-details mdi-24px right" aria-hidden="true" style="color: #000000"></i><span style="font-size: 1.2em !important">Historial Clientes</span></a></li>

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