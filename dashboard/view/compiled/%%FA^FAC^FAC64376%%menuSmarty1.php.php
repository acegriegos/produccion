<?php /* Smarty version 2.6.17, created on 2016-10-29 13:34:05
         compiled from ../view/menuSmarty1.php */ ?>
<link rel="stylesheet" href="../assets/css/modulos/style-login.css">
<!-- <link rel="stylesheet" href="../assets/fonts/tipografia.css"> -->

<nav class="navbar navbar-light bg-faded" style="margin-top: -2%; padding: 0% 0% 0% 0%; width: 98%">
<a class="navbar-brand" href="#"></a>
<ul class="nav navbar-nav">
<li class="nav-item active">
<a class="nav-link" href="#">&nbsp;&nbsp;</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#">&nbsp;</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#">&nbsp;</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#">&nbsp;</a>
</li>
</ul>
<!-- <form class="form-inline navbar-form pull-right">
<input class="form-control" type="text" placeholder="Search">
<button class="btn btn-success-outline" type="submit">Search</button>
</form> -->
<div class="row">
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
<div class="col-md-2"><img src="../assets/img/user.png" alt="Foto de Usuario" class="profPicNoti"></div>
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
<small><?php echo $_SESSION['NOM']; ?>
</small>
<img src="../assets/img/user.png" alt="Foto de Usuario" id="profPic">
</div>
<a href="logout"><div class="col-lg-2" id="cerrarS">CERRAR SESION</div></a>
</div>

</nav>

<nav id="primary_nav">
<a href="#" id="mobile_nav" class="display" value="0"><i class="fa fa-bars"></i></a>
<ul>
<li style="padding: 5%""><input type="text" id="menut" class="form-control form-control-sm" title="Transacción" placeholder="# de Transacción" style="display:none"></li><br>
<li><a href="dashboard">Inicio</a></li>
<li><a href="comercial">Comercial</a></li>
<li><a href="proveedor">Proveedor</a></li>
<li><a href="inventarios">Proveduría</a></li>
<li><a href="productos">Productos</a></li>
<li><a href="produccion">Producción</a></li>
<li><a href="proyectos">Proyectos</a></li>
<li><a href="contabilidad">Contabilidad</a></li>
<li><a href="usuarios">Usuarios</a></li>
<li><a href="reportes">Reportes</a></li>
<li><a href="ajustes">Ajustes</a></li>
</ul>
</nav>

<script src="../assets/js/jquery.js"></script>
<script src="../assets/js/modulos/menu.js"></script>