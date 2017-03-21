<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Usuarios</title>
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-usuarios.css">
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>

<body>

{$NAV}
<div class="bdy">
<nav class="nav-extended  white-text" style="background-color:#0B3861">
<div class="nav-wrapper">
<a class="brand-logo center">Usuarios</a>
<br>
<ul class="tabs tabs-transparent">
<li class="tab menu2" id="m1"><a href="#">Mantenimiento</a></li>
<li class="tab menu2" id="m2"><a href="#">Permisos</a></li>
<li class="tab menu2" id="m3"><a href="#">Historial</a></li>
</ul>
</div>
</nav>
<div class="card card-content z-depth-5" id="cuerpo">
<form id="fusuarios">
<div class="row">
    <div class="input-field col s6 col m6 l4">
        <input id="vuser" type="text" class="validate">
        <input type="hidden" id="vid" value="0">
        <input type="hidden" id="vidusuario" value="">
        <label for="vuser">Usuario</label>
    </div>
    <div class="input-field col s6 m6 l4">
        <input id="vnombre" type="text" class="validate">
        <label for="vnombre">Nombre de Usuario</label>
    </div>

    <div class="input-field col s6 m6 l4">
        <input id="vcedula" type="text" class="validate">
        <label for="vcedula">Cédula del Usuario</label>
        
    </div>
    <div class="input-field col s6 m6 l4">
        <input id="vmail" type="text" class="validate">
        <label for="vmail">Correo de Usuario</label>
    </div>

    <div class="input-field col s6 m6 l4">
        <select id="vidTipoUsuario" type="select">
            <option value="0" selected disabled>Seleccione un Tipo de Usuario</option>
            {section name=LE loop=$TUSR}
            <option value="{$TUSR[LE][0]}">{$TUSR[LE][1]}</option>
            {/section}
        </select>
    </div>
    <div class="input-field col s6 m6 l4">
        <select id="vidsucursal" type="select">
            <option value="0" selected disabled>Seleccione una Sucursal</option>
            {section name=LE loop=$SUC}
            <option value="{$SUC[LE][0]}">{$SUC[LE][1]}</option>
            {/section}

        </select>
    </div>
</div>
<div class="row" id="dpass">
    <div class="input-field col s6 m6 l4">
        <input id="vclave" type="password" class="validate">
        <label for="vclave">Contraseña</label>
    </div>
    <div class="input-field col s6 m6 l4">
        <input id="clave" type="password" class="validate">
        <label for="clave">Repetir Contraseña</label>
    </div>

    <div class="input-field col s6 m6 l4">
        <label>Hora de Entrada</label>
        <input id="vlimite" type="time" class="validate">
    </div>
    <div class="input-field col s6 m6 l4">
        <label>Hora de Salida</label>
        <input id="vlimite2" type="time" class="validate">
    </div>
</div>
<a class="btn-floating waves-effect waves-light blue right add z-depth-5" id="userSubmit" title="Agregar Usuario" modulo="usuario"><i class="material-icons">add</i></a>
<br>
<input type="hidden" id="vbcambioPSSW" value="0">
<input type="hidden" id="vcodigo" value="">
</form>
</div>
<br>
<div class="card-footer">
<div class="table-responsive">
<table class="table bordered highlight responsive-table z-depth-3 centered" id="data-table-usuarios" cellspacing="0" width="100%">
<thead>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Usuario</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Cédula</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Correo</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Tipo de Usuario</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Hora Entrada</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Hora Salida</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Acciones</th>
</thead>
<tbody id="listausuarios">
{section name=LE loop=$USRS}
<tr>
<td>{$USRS[LE][1]}</td>
<td>{$USRS[LE][2]}</td>
<td>{$USRS[LE][3]}</td>
<td><a data-toggle="modal" class="correo" href='#modal-sendMail' id="e{$USRS[LE][0]}">{$USRS[LE][4]}</a></td>
<td>{$USRS[LE][5]}</td>
<td>{$USRS[LE][6]}</td>
<td>{$USRS[LE][7]}</td>
<td>
<a class="btn-floating waves-effect waves-light blue cargar load" modulo="usuario" title="Editar Usuario" id="m{$USRS[LE][0]}" {if $USRS[LE][1] eq 'admin' and $smarty.session.num neq 1} disabled {/if}><i class="fa fa-pencil-square-o"></i></a>
<a class="btn-floating waves-effect waves-light red delete eliminar" modulo="usuario" title="Eliminar Usuario" id="d{$USRS[LE][0]}" {if $USRS[LE][1] eq 'admin'} disabled {/if}><i class="fa fa-times"></i></a>
</td>
</tr>
{/section}
</tbody>
</table>
</div>
</div>

<!-- //modal-mail// -->

</div>
<script src="../assets/js/modulos/usuarios.js"></script>

</body>
</html>