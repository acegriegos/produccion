<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link rel="stylesheet" href="../assets/css/materialize.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu.css">
<link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css">
<link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">

<ul id="slide" class="side-nav blue-text text-darken-2 " style="max-width: 400px !important;">
    <li>
      <div class="userView">
        <div class="background">
          <img src="../assets/img/bckground.jpg">
        </div>
        <a href="#!user" class="center"><i class="medium material-icons" style="color:#fff" aria-hidden="true">person_pin</i></a>
        <div class="input-field col s12 white-text">
          <select id="lgt">
            <option value="0" class="logout" id="x1" disabled selected>{$smarty.session.NOM}</option>
            <option value="1" class="logout" id="x2">Cerrar Sesion</option>
          </select>
        </div>
        <a href="#!name" class="center"><span class="white-text name"></span></a>
        <a href="#!email" class="center"><span class="white-text email">{$smarty.session.MAIL}</span></a>
      </div>
    </li>
    <div class="row">
    <div class="input-field col s10">
      <input id="numtrans" type="text" class="validate">
      <label for="numtrans"># Transacción</label>
    </div>
    </div>
    <li><a href="dashboard" class="black-text"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">dashboard</i><b>Inicio</b></a></li>
    <li><a href="comercial"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">business</i><b>Comercial</b></a></li>
    <li><a href="proveedor"><i class="material-icons right" aria-hidden="true" style="color: #000000">store</i><b>Proveedor</b></a></li>
    <li><a href="inventarios"><i class="material-icons right" aria-hidden="true" style="color: #000000">shopping_basket</i><b>Inventarios</b></a></li>
    <li><a href="productos"><i class="material-icons right" aria-hidden="true" style="color: #000000">list</i><b>Productos</b></a></li>
    <li><a href="produccion"><i class="material-icons right" aria-hidden="true" style="color: #000000">high_quality</i><b>Producción</b></a></li>
    <li><a href="proyectos"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">verified_user</i><b>Proyectos</b></a></li>
    <li><a href="contabilidad"><i class="material-icons right" aria-hidden="true" style="color: #000000">credit_card</i><b>Contabilidad</b></a></li>
    <li><a href="usuarios"><i class="material-icons right" aria-hidden="true" style="color: #000000">perm_identity</i><b>Usuarios</b></a></li>
    <li><a href="reportes"><i class="material-icons right" aria-hidden="true" style="color: #000000">trending_up</i><b>Reportes</b></a></li>
    <li><a href="ajustes"><i class="material-icons right" aria-hidden="true" style="color: #000000">settings</i><b>Configuración</b></a></li>
    <!-- <li><div class="divider"></div></li> -->
    <!-- <li><a class="waves-effect" href="logout"><i class="material-icons right" aria-hidden="true">input</i>Cerrar Sessión</a></li> -->
  </ul>
  <!-- menu pequeño -->
<ul id="out" class="side-nav" style="max-width: 400px !important;">
    <li>
      <div class="userView">
        <div class="background">
          <img src="../assets/img/bckground.jpg">
        </div>
        <a href="#!user" class="center"><i class="medium material-icons" style="color:#fff" aria-hidden="true">person_pin</i></a>
        <div class="input-field col s12 white-text">
          <select id="lgt">
            <option value="0" class="logout" id="x1" disabled selected>{$smarty.session.NOM}</option>
            <option value="1" class="logout" id="x2">Cerrar Sesion</option>
          </select>
        </div>
        <a href="#!name" class="center"><span class="white-text name"></span></a>
        <a href="#!email" class="center"><span class="white-text email">{$smarty.session.MAIL}</span></a>
      </div>
    </li>
    <div class="row">
    <div class="input-field col s10">
      <input id="numtrans" type="text" class="validate">
      <label for="numtrans"># Transacción</label>
    </div>
    </div>
   <li><a href="dashboard" class="black-text"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">dashboard</i><b>Inicio</b></a></li>
    <li><a href="comercial"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">business</i><b>Comercial</b></a></li>
    <li><a href="proveedor"><i class="material-icons right" aria-hidden="true" style="color: #000000">store</i><b>Proveedor</b></a></li>
    <li><a href="inventarios"><i class="material-icons right" aria-hidden="true" style="color: #000000">shopping_basket</i><b>Inventarios</b></a></li>
    <li><a href="productos"><i class="material-icons right" aria-hidden="true" style="color: #000000">list</i><b>Productos</b></a></li>
    <li><a href="produccion"><i class="material-icons right" aria-hidden="true" style="color: #000000">high_quality</i><b>Producción</b></a></li>
    <li><a href="proyectos"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">verified_user</i><b>Proyectos</b></a></li>
    <li><a href="contabilidad"><i class="material-icons right" aria-hidden="true" style="color: #000000">credit_card</i><b>Contabilidad</b></a></li>
    <li><a href="usuarios"><i class="material-icons right" aria-hidden="true" style="color: #000000">perm_identity</i><b>Usuarios</b></a></li>
    <li><a href="reportes"><i class="material-icons right" aria-hidden="true" style="color: #000000">trending_up</i><b>Reportes</b></a></li>
    <li><a href="ajustes"><i class="material-icons right" aria-hidden="true" style="color: #000000">settings</i><b>Configuración</b></a></li>
    <!-- <li><div class="divider"></div></li> -->
    <!-- <li><a class="waves-effect" href="logout"><i class="material-icons right" aria-hidden="true">input</i>Cerrar Sessión</a></li> -->
  </ul>
  <!-- fin -->
  <div class="navbar-fixed hide-on-large-only">
  <nav>
   <div class="nav-wrapper blue-grey darken-2">
      <a href="#" data-activates="out" class="button-collapse"><i class="samll material-icons">menu</i></a>
      </div>
      </nav>
      </div>

  <a style="background-color:#0B3861 " href="#" data-activates="slide" class="hide-on-med-and-down button-collapse  z-depth-5 menu-btn" ><p class="white-text menu-txt" >MENU</p></a>
  <!-- hide-on-med-and-down  -->
  
<script src="../assets/js/jquery.js"></script>
<script src="../assets/js/mask/jquery.mask.js"></script>
<script src="../assets/js/materialize.js?v=1.8"></script>
<script src="../assets/js/modulos/menu.js?v=1.1"></script>
<script src="../assets/libs/charts/chart.js"></script>
<script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
<script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
<script src="../assets/js/asgard.js?v=1.10"></script>

