<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Clientes</title>
{$STY}
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-clientes.css">
</head>
<!-- #0B3861 -->
<body>
{$NAV}
<div class="bdy">
    <div class="row">
        <div class="col s12 m12 l12">
            <nav class="blue">
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo"><i class="mdi mdi-account mdi-36px"></i>Clientes</a>
                    <ul class="right hide-on-med-and-down">
                        <li><a id="search" tp="0" style="font-size: 1.5em"><i class="mdi mdi-magnify mdi-36px left"></i>Buscar cliente</a></li>
                    </ul>
                    <ul class="right hide-on-med-and-down waves-effect waves-light">
                        <li><a href="#modal-client" class="modal-trigger" id="addcli" modulo="clientes" acc="1" style="font-size: 1.5em"><i class="mdi mdi-plus mdi-36px left"></i>Agregar cliente</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    <div class="card z-depth-5">
        <div class="card-content">
            <div class="row hide" id="scli">
                <div class="col s8 m8 l8"></div>
                <div class="col s4 m4 l4">
                    <div class="input-field col s12 m12 l12">
                        <input type="text" id="search_clientes" num="v4" var="0,1">
                        <label for="search_clientes">Buscar por nombre o cédula</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <table class="table responsive-table centered striped bordered highlight z-depth-5 pequeño" id="data-table-clientes" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Cédula</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Crédito</th>
                            <!-- <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Saldo</th> -->
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 18%;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaclientes">
                    {section name=LE loop=$CLI}
                        <tr>
                            <td style="padding: 10px; color:black;">{$CLI[LE][1]}</td>
                            <td style="padding: 10px; color:black;">{$CLI[LE][2]}</td>
                            <td style="padding: 10px; color:black;">{$CLI[LE][3]}</td>
                            <!-- <td style="padding: 10px; color:black;">{$CLI[LE][4]}</td> -->
                            <td>
                                <a class="btn-color pbtn borrow mdi mdi-database-plus mdi-24px per4108 modal-trigger" href="#modal-borrow" id="p{$CLI[LE][0]}" title="Pedir prestamo" style="color:black;"></a>
                                <a class="btn-color pbtn contacto mdi mdi-account-card-details mdi-24px per4108 modal-trigger" href="#modal-contacto" id="c{$CLI[LE][0]}" title="Datos de contacto" style="color:black;"></a>
                                <a class="btn-color pbtn load mdi mdi-pencil mdi-24px per4108 modal-trigger" modulo="cliente" id="m{$CLI[LE][0]}" href="#modal-client" title="Editar cliente" style="color:black;"></a>
                                <a class="btn-color pbtn delete mdi mdi-close mdi-24px per4109" modulo="cliente" id="d{$CLI[LE][0]}" title="Eliminar cliente" style="color:black;"></a>
                            </td>
                        </tr>
                    {/section}
                    </tbody>
                </table>
                <ul class="pagination right" vtbl="4" modulo="clientes"></ul>
            </div>
        </div>
    </div>

    <!-- modal-structure -->
    <div id="modal-client" class="modal modal-fixed-footer">
        <div class="modal-header">
            <ul class="tabs tabs-fixed-width blue">
                <ul class="tabs tabs-fixed-width blue">
                <li class="tab col s3"><a class="white-text" id="titcli"></a></li>
            </ul>
        </div>
        <div class="modal-content" id="fclientes">
            <div class="row">
                <div class="input-field col s6 m6 l6">
                    <i class="mdi mdi-account prefix"></i>
                    <input type="text" id="vnombre">
                    <label for="vnombre">Nombre cliente</label>
                    <input type="hidden" id="vid" value="0">
                    <input type="hidden" id="vidsucursal" value="0">
                </div>
                <div class="input-field col s6 m6 l6">
                    <input type="text" id="vcedula">
                    <label for="vcedula">Cédula cliente</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6 m6 l6">
                    <i class="mdi mdi-phone prefix"></i>
                    <input type="text" id="vtelefono1">
                    <label for="vtelefono1">Teléfono1</label>
                </div>
                <div class="input-field col s6 m6 l6">
                    <i class="mdi mdi-phone prefix"></i>
                    <input type="text" id="vtelefono2">
                    <label for="vtelefono2">Teléfono2</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12 m12 l12">
                    <i class="mdi mdi-directions prefix"></i>
                    <input type="text" class="validate" id="vdireccion1">
                    <label for="vdireccion1">Dirección cobro</label>
                </div>
                <div class="input-field col s12 m12 l12">
                    <i class="mdi mdi-directions prefix"></i>
                    <input type="text" class="validate" id="vdireccion2">
                    <label for="vdireccion2">Dirección casa</label>
                </div>
                <div class="input-field col s12 m12 l12">
                    <i class="mdi mdi-directions prefix"></i>
                    <input type="text" class="validate" id="vdireccion3">
                    <label for="vdireccion3">Dirección trabajo</label>
                </div>
            </div>
        </div>
        <div class="modal-footer grey lighten-3">
            <button type="button" class="waves-effect waves-green btn-flat add" id="btncli" modulo="cliente">Guardar</button>
            <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        </div>
    </div>

    <div id="modal-borrow" class="modal modal-fixed-footer">
        <div class="modal-header">
            <ul class="tabs tabs-fixed-width blue">
                <ul class="tabs tabs-fixed-width blue">
                <li class="tab col s3"><a class="white-text">Pedir prestamo</a></li>
            </ul>
        </div>
        <div class="modal-content" id="fprestamoclientes">
            <div class="row">
                <div class="input-field col s6 m6 l6">
                    <i class="mdi prefix">{$MONEDA}</i>
                    <input type="number" id="vcredito" class="validate">
                    <label for="vcredito">Crédito</label>
                    <input type="hidden" id="vidp" value="0">
                    <input type="hidden" id="vidmoneda" value="1">
                    <input type="hidden" id="vidcliente" value="">
                    <input type="hidden" id="vidsucursal" value="">
                </div>
                <div class="input-field col s6 m6 l6">
                    <button class="waves-effect waves-light btn blue add" modulo="prestamocliente">Aceptar</button>
                </div>
            </div>
        </div>
        <div class="modal-footer grey lighten-3">
            <!-- <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
            <button type="button" class="waves-effect waves-green btn-flat add" id="addloan" modulo="prestamocliente">Guardar</button> -->
        </div>
    </div>

    <div id="modal-contacto" class="modal modal-fixed-footer">
        <div class="modal-header">
            <ul class="tabs tabs-fixed-width blue">
                <ul class="tabs tabs-fixed-width blue">
                <li class="tab col s3"><a class="white-text">Datos de contacto <span id="ncli"></span></a></li>
            </ul>
        </div>
        <div class="modal-content">
            <div class="row">
                <div class="input-field col s6 m6 l6">
                    <i class="mdi mdi-phone prefix"></i>
                    <input type="text" id="tel1" readonly>
                    <label for="tel1">Teléfono 1</label>
                </div>
                <div class="input-field col s6 m6 l6">
                    <i class="mdi mdi-phone prefix"></i>
                    <input type="text" id="tel2" readonly>
                    <label for="tel2">Teléfono 2</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12 m12 l12">
                    <i class="mdi mdi-directions prefix"></i>
                    <input type="text" class="validate" id="direccion1" readonly>
                    <label for="direccion1">Dirección cobro</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12 m12 l12">
                    <i class="mdi mdi-directions prefix"></i>
                    <input type="text" class="validate" id="direccion2" readonly>
                    <label for="direccion2">Dirección casa</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12 m12 l12">
                    <i class="mdi mdi-directions prefix"></i>
                    <input type="text" class="validate" id="direccion3" readonly>
                    <label for="direccion3">Dirección trabajo</label>
                </div>
            </div>
        </div>
        <div class="modal-footer grey lighten-3">
            <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        </div>
    </div>

</div>
{$SCR}
<script src="../assets/js/modulos/clientes.js"></script>

</body>
</html>