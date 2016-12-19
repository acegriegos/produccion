<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Proveedores</title>
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-proveedores.css">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<body>
<br>
{$NAV}

<div class="bdy">
    <nav class="blue">
        <div class="nav-wrapper">
            <a href="#" class="brand-logo center">Proveedores</a>
        </div>
    </nav><br>
    <div class="row">
        <div class="col s6">
            <div class="input-field col s8">
                <input id="searchprod" type="text" class="validate">
                <label for="searchprod" id="phs">Buscar por Cédula Jurídica</label>
            </div>
            <a class="dropdown-button btn-floating btn-large waves-effect waves-light green" data-activates="fprov"><i class="material-icons">search</i></a>
            <ul id="fprov" class="dropdown-content" filter="1" style="width: 140px">
                <li><a class="dropdown-item fprov" filtro="f1">Cédula Jurídica</a></li>
                <li><a class="dropdown-item fprov" filtro="f2">Razón Social</a></li>
            </ul>
        </div>
        <div class="col s6">
            <a class="btn-floating btn-large waves-effect waves-light blue right" href="#modal-proveedores" id="ingProv"><i class="material-icons">add</i></a>
        </div>
        
<!-- <div class="col-md-8 col-lg-8">
<div class="input-group">
<span class="input-group-btn">
<button class="btn btn-primary" type="button"><i class="fa fa-search"></i><span style="color: transparent">.</span></button>
</span>
<input type="search" class="form-control" placeholder="Razón Social">
</div>
</div>
<div class="col-md-4 col-lg-4">
<button type="button" id="ingProv" class="btn btn-primary der" data-toggle="modal" href="#modal-proveedores" style="margin-right: 15px; padding: 12px 18px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button>
</div> -->
    </div>
<div class="card-block">
<table class="table table-striped table-bordered table-hover dt-responsive nowrap">
<thead>
<tr>
<th>Cédula Jurídica</th>
<th>Razón Social</th>
<th>Teléfonos</th>
<th>Correo</th>
<th>Web</th>
<th>Acciones</th>
</tr>
</thead>
<tbody id="listaclientes">
{section name=LE loop=$PROV}
<tr id="f1">
<td>{$PROV[LE][1]}</td>
<td>{$PROV[LE][2]}</td>
<td>{$PROV[LE][4]}</td>
<td style="font-size: 0.9em">{$PROV[LE][5]}</td>
<td>{$PROV[LE][6]}</td>
<td>
<i class="fa fa-pencil-square-o btn load" id="m{$PROV[LE][0]}" data-toggle="modal" href='#modal-proveedores' modulo="proveedore"></i>
<i class="fa fa-times btn delete" codigo="1" modulo="proveedore" id="d{$PROV[LE][0]}" style="color: #D9534F"></i>
</td>
</tr>
{/section}
</tbody>
</table>
</div>

<div id="modal-proveedores" class="modal modal-fixed-footer" style="width:70%;height:90%">
    <div class="modal-content">
        <h4 class="titmodal">Agregar Proveedores</h4><hr><br>
        <nav class="blue">
            <div class="nav-wrapper">
                <ul id="nav-mobile" class="left">
                    <li class="mnprov active" id="ln1"><a>Datos Proveedores</a></li>
                    <li class="mnprov" id="ln2"><a>Financiero</a></li>
                </ul>
            </div>
        </nav>
<div class="card card-content grey lighten-3 parte1 ptr" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
    <div class="row">
        <div class="input-field col s6 m6">
          <input id="vnombre" type="text" class="validate">
          <label for="vnombre">Razon Social</label>
        </div>
        <div class="input-field col s6 m6">
            <input id="vcedula" type="text" class="validate">
            <label for="vcedula">Cedula Juridica</label>
        </div>
    </div>
    
</div>
        

    </div>
    <div class="modal-footer">
        <a class="modal-action waves-effect waves-light btn-flat white-text blue" id="agProv">Agregar</a>
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
    </div>
</div>

</div> <!-- END BDY -->

</div>
<script src="../assets/js/modulos/proveedores.js"></script>
</body>
</html>