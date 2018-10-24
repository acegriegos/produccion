<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Usuarios</title>
{$STY}
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-usuarios.css?v=10.0.0.68">

</head>

<body>

{$NAV}

<div class="bdy pequeño">
<div class="center head1 padding1"><h5>Usuarios</h5></div>
    <div class="row">
        <div class="col s12">
            <ul class="tabs head2">
            <li class="tab menu2" id="m1"><a class="white-text" href="#">Mantenimiento</a></li>
            <li class="tab menu2" id="m2"><a class="white-text {if $smarty.session.BUSS eq 1} hide {/if}" href="#">Permisos</a></li>
           
            <li class="tab menu2" id="m3"><a class="white-text {if $smarty.session.BUSS eq 1} hide {/if}" href="#">Historial</a></li>
            </ul>
        </div>
    </div>
<div class="card card-content z-depth-5" id="cuerpo">

</div>

</div>
{$SCR}
<script src="../assets/js/modulos/usuarios.js?v=10.0.0.68"></script>

</body>
</html>