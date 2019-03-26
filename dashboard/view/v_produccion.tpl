<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Producción</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-produccion.css?v=10.0.1.12">

</head>
<body>
{$NAV}
<div class="bdy pequeño">

    <div class="card-header z-depth-5 head1">
        <p class="flow-text center-align">Producción</p>
    </div>
    <nav class="navbar navbar-dark head2 z-depth-5">
        <ul class="nav navbar-nav">
            <li class="nav-item menu active per5000" id="m1">
                <a class="nav-link" href="#" title="Recetas">Procesos</a>
            </li>
            <li class="nav-item menu per5100" id="m2">
                <a class="nav-link" href="#" title="Linea Producción">Linea Producción</a>
            </li>
            <li class="nav-item menu per5200" id="m3">
                <a class="nav-link" href="#" title="Inicio Produccion">Inicio Produccion</a>
            </li>
            <li class="nav-item menu per5300" id="m4">
                <a class="nav-link" href="#" title="Seguimiento">Seguimiento</a>
            </li>
        </ul>
    </nav>
    <div class="card z-depth-5" id="mantproduccion"></div>
    <div id="modal-addtoproducts" class="modal modal-fixed-footer grandemodal" style="width:70%;height:90%">
        <div class="modal-header">
            <div class="card-header center white-text" style="background-color:#0B3861">
                <p class="flow-text marginzero">Agregar Receta a Inventario de <span id="inventdefault"></span></p>
            </div>
        </div>
        <div class="modal-content">
            <div class="modal-bdy row">
                <div id="alrdyisprdct" class=" center">
                    <span id="isinprod">Esta receta ha sido agregada anteriormente a productos</span>
                </div>
                <div id="noisprdct">
                    <div class="input-field col s12 m12 l6">
                        <div class="familia">
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
                                <select type="select" id="vidtipo" class="_det">
                                <option value="0">Seleccione un Tipo</option>
                                </select>
                                <label for="vidtipo">Tipo</label>
                            </div>
                        </div>
                        <div class="input-field">
                            <div class="marca">
                                <select type="select" id="vidmarca" class="_det">
                                <option value="0">Seleccione un Marca</option>
                                </select>
                                <label for="vidmarca">Marca</label>
                            </div>
                        </div>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input id="vminimo" type="number" class="validate">
                        <label for="vminimo">Minimo en Inventario</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input id="vmaximo" type="number" class="validate">
                        <label for="vmaximo">Maximo en Inventario</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input id="vmaxdesc" type="number" class="validate">
                        <label for="vmaxdesc">Descuento Máximo</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input id="vganancia" type="number" class="validate">
                        <label for="vganancia">Ganancia</label>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-light btn-flat white-text blue z-depth-5" id="savetoprod">Agregar</a>
            <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1 z-depth-5" style="margin-right: 2%;">Salir</a>
        </div>
    </div>
</div>
{$SCR}
<script src="../assets/js/modulos/produccion.js?v=10.0.1.12"></script>
</body>
</html>