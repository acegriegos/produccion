<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link rel="stylesheet" href="../assets/css/materialize.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu.css">
<link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css">
<link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">

<ul id="slide-out" class="side-nav">
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
    <li style="margin-top:-20px;"><a href="dashboard"><i class="material-icons right" aria-hidden="true">dashboard</i>Inicio</a></li>
    <li><a href="comercial"><i class="material-icons right" aria-hidden="true">business</i>Comercial</a></li>
    <li><a href="proveedor"><i class="material-icons right" aria-hidden="true">store</i>Proveedor</a></li>
    <li><a href="inventarios"><i class="material-icons right" aria-hidden="true">shopping_basket</i>Proveduría</a></li>
    <li><a href="productos"><i class="material-icons right" aria-hidden="true">list</i>Productos</a></li>
    <li><a href="produccion"><i class="material-icons right" aria-hidden="true">high_quality</i>Producción</a></li>
    <li><a href="proyectos"><i class="material-icons right" aria-hidden="true">verified_user</i>Proyectos</a></li>
    <li><a href="contabilidad"><i class="material-icons right" aria-hidden="true">credit_card</i>Contabilidad</a></li>
    <li><a href="usuarios"><i class="material-icons right" aria-hidden="true">perm_identity</i>Usuarios</a></li>
    <li><a href="reportes"><i class="material-icons right" aria-hidden="true">trending_up</i>Reportes</a></li>
    <li><a href="ajustes"><i class="material-icons right" aria-hidden="true">settings</i>Configuración</a></li>
    <!-- <li><div class="divider"></div></li> -->
    <!-- <li><a class="waves-effect" href="logout"><i class="material-icons right" aria-hidden="true">input</i>Cerrar Sessión</a></li> -->
  </ul>

  <a href="#" data-activates="slide-out" class="button-collapse blue-grey menu-btn"><p class="white-text menu-txt">MENU</p></a>
  
<script src="../assets/js/jquery.js"></script>
<script src="../assets/js/mask/jquery.mask.js"></script>
<script src="../assets/js/materialize.js"></script>
<!-- <script src="../assets/js/materialize_autocomplete.min.js"></script> -->
<script src="../assets/js/modulos/menu.js"></script>
<script src="../assets/libs/charts/chart.js"></script>
<script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
<script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
<script src="../assets/js/asgard.js"></script>

