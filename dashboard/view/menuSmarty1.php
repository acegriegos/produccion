<link rel="stylesheet" href="../assets/css/modulos/style_login.css">
<link rel="stylesheet" href="../assets/fonts/tipografia.css">

<div class="pos-f-t">
  <div class="collapse" id="navbar-header">
    <div class="container-fluid p-a-1">
      <div class="row custom-controls-stacked" style="width: 30%; background: #686868">
      <ul>
        <li style="padding: 0.8%"><a href=""><div class="checkbox" icono="i01">Dashboard</div></a></li>
        <li style="padding: 0.8%"><a href=""><div class="checkbox" icono="i02">Compras</div></a></li>
        <li style="padding: 0.8%"><a href=""><div class="checkbox" icono="i03">Facturacion</div></a></li>
      </ul>
        <!-- <a href="dashboard"><div class="col-sm-1 ico" icono="i01"><i class="btn fa fa-dashboard" align="center"></i></div></a>
        <a href="compras"><div class="col-sm-1 ico per1" icono="i02"><i class="btn fa fa-shopping-cart" align="center"></i></div></a>
        <a href="inventarios"><div class="col-sm-1 ico per2" icono="i03"><i class="btn fa fa-list" align="center"></i></div></a>
        <a href="productos"><div class="col-sm-1 ico per3" icono="i04"><i class="btn fa fa-th" align="center"></i></div></a>
        <a href="clientes"><div class="col-sm-1 ico per4" icono="i05"><i class="btn fa fa-male" align="center"></i></div></a>
        <a href="proveedores"><div class="col-sm-1 ico per5" icono="i06"><i class="btn fa fa-truck" align="center"></i></div></a>
        <a href="cuentas"><div class="col-sm-1 ico per6" icono="i07"><i class="btn fa fa-check-square" align="center"></i></div></a>
        <a href="contabilidad"><div class="col-sm-1 ico per10" icono="i08"><i class="btn fa fa-clipboard" align="center"></i></div></a>
        <a href="usuarios"><div class="col-sm-1 ico per7" icono="i09"><i class="btn fa fa-user" align="center"></i></div></a>
        <a href="reportes"><div class="col-sm-1 ico per8" icono="i10"><i class="btn fa fa-line-chart" align="center"></i></div></a>
        <a href="#"><div class="col-sm-1 ico" icono="i11"><i class="btn fa fa-meh-o" align="center"></i></div></a>
        <a href="ajustes"><div class="col-sm-1 ico per9" icono="i12"><i class="btn fa fa-cog" align="center"></i></div></a> -->
      </div>
      <!-- <div class="row">
        <div class="col-sm-1 titIcon" id="ico01" icono="i01">Dashboard</div>
        <div class="col-sm-1 titIcon" id="ico02" icono="i02">Facturación</div>
        <div class="col-sm-1 titIcon" id="ico03" icono="i03">Inventarios</div>
        <div class="col-sm-1 titIcon" id="ico04" icono="i04">Productos</div>
        <div class="col-sm-1 titIcon" id="ico05" icono="i05">Clientes</div>
        <div class="col-sm-1 titIcon" id="ico06" icono="i06">Proveedores</div>
        <div class="col-sm-1 titIcon" id="ico07" icono="i07">Cuentas</div>
        <div class="col-sm-1 titIcon" id="ico08" icono="i08">Contabilidad</div>
        <div class="col-sm-1 titIcon" id="ico09" icono="i09">Usuarios</div>
        <div class="col-sm-1 titIcon" id="ico10" icono="i10">Reportes</div>
        <div class="col-sm-1 titIcon" id="ico11" icono="i11"><small>{$smarty.session.NOM}</small></div>
        <div class="col-sm-1 titIcon" id="ico12" icono="i12">Ajustes</div>
      </div> -->
  </div>
 </div>
    
  <div class="navbar navbar-light bg-faded navbar-static-top m-b-1" style="padding: 0%;">
    <div class="row">
    <div class="col-md-1" id="toggMenu">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-header">
        &#9776;
      </button>
    </div>
    <div class="col-md-6"></div>
    <div class="col-xs-1" id="smallNotify" title="Notificaciones">
      <div class="dropdown">
      <button class="btn btn-default dropdown-toggle" style="background:transparent" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bell-o"><span class="badge btn" id="numNot">3</span></i></button>
        <div class="dropdown-menu" aria-labelledby="about-us" style="margin-top:8%">
        <h6 class="dropdown-header">Notificaciones&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">Marcar como leídas</a></h6>
          <hr>
          <div class="dropdown-item">
            <div class="row">
              <div class="col-md-2"><img src="../assets/img/user.png" alt="foto" class="profPicNoti"></div>
              <div class="col-md-8">Andrés Miranda<br><small>Lorem ipsum dolor sit amet.</small></div>
              <div class="col-md-2">
                <div class="c-inputs-stacked">
                  <label class="c-input c-radio">
                  <input id="boots" name="radio" type="radio">
                  <span class="c-indicator" style="background: rgba(192,226,179,0.5)"></span>
                  </label>

                  <label class="c-input c-radio">
                  <input id="shoes" name="radio" type="radio">
                  <span class="c-indicator" style="background: rgba(217,83,79,0.5)"></span>
                  </label>
                  </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="dropdown-item">
            <div class="row">
              <div class="col-md-2"><img src="../assets/img/user.png" alt="Foto de Usuario" class="profPicNoti"></div>
              <div class="col-md-8">Rolando Alfaro<br><small>Lorem ipsum dolor sit amet.</small></div>
              <div class="col-md-2">
                <div class="c-inputs-stacked">
                  <label class="c-input c-radio">
                  <input id="boots" name="radio" type="radio">
                  <span class="c-indicator" style="background: rgba(192,226,179,0.5)"></span>
                  </label>

                  <label class="c-input c-radio">
                  <input id="shoes" name="radio" type="radio">
                  <span class="c-indicator" style="background: rgba(217,83,79,0.5)"></span>
                  </label>
                  </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="dropdown-item">
            <div class="row">
              <div class="col-md-2"><img src="../assets/img/user.png" alt="Foto de Usuario" class="profPicNoti" style="padding-top: 0%;"></div>
              <div class="col-md-8">Bryan Rojas<br><small>Lorem ipsum dolor sit amet.</small></div>
              <div class="col-md-2">
                <div class="c-inputs-stacked">
                  <label class="c-input c-radio">
                  <input id="boots" name="radio" type="radio" class="primary">
                  <span class="c-indicator" style="background: rgba(192,226,179,0.5)"></span>
                  </label>

                  <label class="c-input c-radio">
                  <input id="shoes" name="radio" type="radio">
                  <span class="c-indicator" style="background: rgba(217,83,79,0.5)"></span>
                  </label>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-2" align="right" id="userLog">
      <small>{$smarty.session.NOM}</small>
      <img src="../assets/img/user.png" alt="Foto de Usuario" id="profPic">
    </div>
    <a href="logout"><div class="col-lg-2" id="cerrarS">CERRAR SESION</div></a>
  </div>
  </div>
</div><!-- pos-f-t -->


<script src="../assets/js/jquery.js"></script>
<script src="../assets/js/main.js"></script>