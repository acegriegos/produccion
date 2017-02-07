<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Producción</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-produccion.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="bdy">
{$NAV}
    <div class="card-header center blue-grey white-text">
        <p class="flow-text">Producción</p>
    </div><br>
    <div class="fixed-action-btn vertical">
    <a class="btn-floating btn-large blue">
        <i class="large material-icons">mode_edit</i>
    </a>
    <ul>
        <li><a class="btn-floating green" title="Exportar Receta a Excel"><i class="material-icons">insert_chart</i></a></li>
        <li><a class="btn-floating red" title="Exportar Receta a PDF"><i class="material-icons">picture_as_pdf</i></a></li>
    </ul>
</div>
<div class="row">
    <div class="col s8 m8 l8">
        <div class="row raddreceta">
            <div class="input-field col s5 m5 l5">
                <input id="vnombre" type="text">
                <label for="vnombre">Nombre de la Receta</label>
                <input type="hidden" id="count" value="0">
                <input type="hidden" id="spot" value="">
            </div>
            <div class="input-field col s5 m5 l5">
                <input id="vcodigo" type="text" class="validate">
                <label for="vcodigo">Codigo de la Receta</label>
            </div>
            <div class="col s2 m2 l2">
                <button type="button" class="btn-floating waves-effect waves-light blue hide" id="edtitcod" title="Editar nombre y codigo de la receta"><i class="material-icons" style="padding-top: 3px">save</i></button>
                <button type="button" class="btn-floating waves-effect waves-light blue" id="addrecipe"><i class="material-icons">add</i></button>
            </div>
        </div>
        <div class="row hide" id="daddprod">
            <div class="input-field col s4 m4">
                <input id="vproducto" type="text" class="autocomplete">
                <label for="vproducto">Insumo</label>
            </div>
            <div class="input-field col s3 m3">
                <input id="vcantidad" type="number" min="0">
                <label for="vcantidad">Cantidad</label>
            </div>
            <div class="input-field col s4 m4">
                <select id="vidunidad">
                    {section name=LE loop=$UNI}
                    <option value="{$UNI[LE][0]}" unidad="{$UNI[LE][2]}">{$UNI[LE][1]}</option>
                    {/section}
                </select>
                <label for="vidunidad">Seleccione una Unidad</label>
            </div>
            <div class="col s1 m1">
                <button type="button" class="btn-floating waves-effect waves-light blue" id="addproduct"><i class="material-icons">add</i></button>
            </div>
        </div>
        <div class="row" id="makerecipe">
            
        </div>
    </div>
    <div class="col s4 m4 l4 border-left">
        <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover dt-responsive nowrap hide" id="data-table-recetas" cellspacing="0" width="100%" >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Total</th>
                        <th style="width: 20%">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listarecetas">
                    {section name=LE loop=$REC}
                    <tr>
                        <td>{$REC[LE][1]}</td>
                        <td>{$REC[LE][2]}</td>
                        <td>
                            <a class="btn-color pbtn instoproduct material-icons modal-trigger" href="#modal-addtoproducts" id="m{$REC[LE][0]}" title="Ingresar Receta a Inventario {$DEF}">system_update_alt</a>
                            <a class="btn-color pbtn editreceta material-icons" id="m{$REC[LE][0]}">edit</a>
                            <a class="btn-color pbtn cdel delreceta material-icons" id="d{$REC[LE][0]}">close</a>

                        </td>
                    </tr>
                    {/section}
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="modal-addtoproducts" class="modal modal-fixed-footer" style="width:70%;height:90%">
    <div class="modal-header">
        <div class="card-header center blue-grey white-text">
            <p class="flow-text marginzero">Agregar Receta a Inventario de {$DEF}</span></p>
        </div>
    </div>
    <div class="modal-content">
        <div class="modal-bdy row">
            <div id="alrdyisprdct" class="orange lighten-2 center">
                <span id="isinprod">Esta receta ha sido agregada anteriormente a productos</span>
            </div>
            <div id="noisprdct">
                <div class="input-field col s6 m6 l6">
                    <div class="familia">
                        <a class="prefix btn-floating blue btn-small tooltipped" data-position="button" data-tooltip="Ingresar Familia" style="width: 2.5rem" det="familia" d-b="20" prev="" sig="vidtipo"><i class="fa fa-plus"></i></a>

                        <select type="select" id="vidfamilia" class="_det" primary="1">
                            <option value="0">Seleccione una Familia</option>
                            {section name=LE loop=$FAM}
                            <option value="{$FAM[LE][0]}">{$FAM[LE][1]}</option>
                            {/section}
                        </select>
                        <label for="vidfamilia">Familia</label>
                    </div>
                    <div class="input-field">
                        <div class="tipo">
                            <a class="prefix btn-floating blue btn-small tooltipped" data-position="button" data-tooltip="Ingresar Tipo" style="width: 2.5rem" det="tipo" d-b="21" prev="vidfamilia" sig="vidmarca"><i class="fa fa-plus"></i></a>
                            <select type="select" id="vidtipo" class="_det">
                            <option value="0">Seleccione un Tipo</option>
                            </select>
                            <label for="vidtipo">Tipo</label>
                        </div>
                    </div>
                    <div class="input-field">
                        <div class="marca">
                            <a class="prefix btn-floating blue btn-small tooltipped" data-position="button" data-tooltip="Ingresar Marca" style="width: 2.5rem" det="marca" d-b="22" prev="vidtipo" sig=""><i class="fa fa-plus"></i></a>
                            <select type="select" id="vidmarca" class="_det">
                            <option value="0">Seleccione un Marca</option>
                            </select>
                            <label for="vidmarca">Marca</label>
                        </div>
                    </div>
                </div>
                <div class="input-field col s6 m6 l6">
                    <input id="vminimo" type="number" class="validate">
                    <label for="vminimo">Minimo en Inventario</label>
                </div>
                <div class="input-field col s6 m6 l6">
                    <input id="vmaximo" type="number" class="validate">
                    <label for="vmaximo">Maximo en Inventario</label>
                </div>
                <div class="input-field col s6 m6 l6">
                    <input id="vmaxdesc" type="number" class="validate">
                    <label for="vmaxdesc">Descuento Máximo</label>
                </div>
                <div class="input-field col s6 m6 l6">
                    <input id="vganancia" type="number" class="validate">
                    <label for="vganancia">Ganancia</label>
                </div>
            </div>
            
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text blue" id="savetoprod">Agregar</a>
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
    </div>
</div>
</div>

<script src="../assets/js/modulos/produccion.js"></script>
</body>
</html>