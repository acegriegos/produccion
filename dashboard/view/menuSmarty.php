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
  <div class="options">
    <li class="per1"><a href="dashboard" class="black-text"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">dashboard</i><span style="font-size: 1.2em !important" >Inicio</span></a></li>

    <li class="per8"><a href="medicina"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">colorize</i><span style="font-size: 1.2em !important">Área Medicina</span></a></li>

    <li class="per9"><a href="laboratorio"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">colorize</i><span style="font-size: 1.2em !important">Área Laboratorios</span></a></li>

    <li class="per2"><a href="comercial"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">business</i><span style="font-size: 1.2em !important">Área Comercial</span></a></li>

    <li class="per3"><a href="proveedor"><i class="material-icons right" aria-hidden="true" style="color: #000000">store</i><span style="font-size: 1.2em !important">Área de Operaciones</span></a></li>

    <li class="per4"><a href="financiero"><i class="material-icons right" aria-hidden="true" style="color: #000000">credit_card</i><span style="font-size: 1.2em !important">Área Financiera</span></a></li>

    <li class="per5"><a href="inventario"><i class="material-icons right" aria-hidden="true" style="color: #000000">shopping_basket</i><span style="font-size: 1.2em !important">Área de Inventarios</span></a></li>

    <li class="per6"><a href="produccion"><i class="material-icons right" aria-hidden="true" style="color: #000000">high_quality</i><span style="font-size: 1.2em !important">Área de Producción</span></a></li>

    <li class="per7"><a href="administracion"><i class="material-icons right" aria-hidden="true" style="color: #000000">settings</i><span style="font-size: 1.2em !important">Área Administrativa</span></a></li>

    <li class="hide"><a href="reportes"><i class="material-icons right" aria-hidden="true" style="color: #000000;">trending_up</i><span style="font-size: 1.2em !important">Reportes</span></a></li>

    <li><a href="logout"><i class="material-icons right" aria-hidden="true" style="color: #000000">flight_takeoff</i><span style="font-size: 1.2em !important">Cerrar Sesión</span></a></li>
    <br>
    <!-- <li><div class="divider"></div></li> -->
    <!-- <li><a class="waves-effect" href="logout"><i class="material-icons right" aria-hidden="true">input</i>Cerrar Sessión</a></li> -->
    </div>
  </ul>
  <!-- menu pequeño -->
<ul id="out" class="side-nav" style="max-width: 400px !important; font-size: 2.4em !important;">
    <li>
      <div class="userView">
        <div class="background">
        <!-- CSS -->
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
  <div class="options">
    <li><a href="dashboard" class="black-text"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">dashboard</i><span>Inicio</span></a></li>

    <li><a href="comercial"><i class="material-icons right" aria-hidden="true" style="color: #000000 ">business</i><span>Área Comercial</span></a></li>

    <li><a href="proveedor"><i class="material-icons right" aria-hidden="true" style="color: #000000">store</i><span>Área de Operaciones</span></a></li>

    <li><a href="financiero"><i class="material-icons right" aria-hidden="true" style="color: #000000">credit_card</i><span>Área Financiera</span></a></li>

    <li><a href="inventario"><i class="material-icons right" aria-hidden="true" style="color: #000000">shopping_basket</i><span>Área de Inventarios</span></a></li>

    <li><a href="produccion"><i class="material-icons right" aria-hidden="true" style="color: #000000">high_quality</i><span>Área de Producción</span></a></li>

    <li><a href="administracion"><i class="material-icons right" aria-hidden="true" style="color: #000000">settings</i><span>Área Administrativa</span></a></li>

    <li class="hide"><a href="reportes"><i class="material-icons right" aria-hidden="true" style="color: #000000;">trending_up</i><span>Reportes</span></a></li>

    <li><a href="logout"><i class="material-icons right" aria-hidden="true" style="color: #000000">flight_takeoff</i><span>Cerrar Sesión</span></a></li>
    <br>
    <!-- <li><div class="divider"></div></li> -->
    <!-- <li><a class="waves-effect" href="logout"><i class="material-icons right" aria-hidden="true">input</i>Cerrar Sessión</a></li> -->
  </div>
  </ul>
  <!-- fin -->
  <div class="navbar-fixed hide-on-large-only">
  <nav>
   <div class="nav-wrapper blue-grey darken-2">
      <a href="#" data-activates="out" class="button-collapse"><i class="samll material-icons">menu</i></a>
      </div>
      </nav>
      </div>

  <a style="background-color:#0B3861;" href="#" data-activates="slide" class="hide-on-med-and-down button-collapses  z-depth-5 menu-btn" ><p class="white-text menu-txt" >MENU</p></a>
  <!-- hide-on-med-and-down  -->

