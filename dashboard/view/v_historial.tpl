<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Clientes</title>
{$STY}
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-historial.css">
</head>
<!-- #0B3861 -->
<body>
{$NAV}
<div class="bdy">
    <div class="row">
        <div class="col s12 m12 l12">
            <nav class="blue">
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo" style="margin-left: 15px"><i class="mdi mdi-account-card-details mdi-36px"></i>Historial clientes</a>
                    <ul class="right hide-on-med-and-down">
                        <li><a id="search" tp="0" style="font-size: 1.5em"><i class="mdi mdi-magnify mdi-36px left"></i>Buscar cliente</a></li>
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
                <table class="table responsive-table centered striped bordered highlight z-depth-5" id="data-table-historiales" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Cédula</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Crédito</th>
                            <!-- <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Saldo</th> -->
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 18%;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listahistoriales">
                    {section name=LE loop=$HIS}
                        <tr>
                            <td style="padding: 10px; color:black;">{$HIS[LE][1]}</td>
                            <td style="padding: 10px; color:black;">{$HIS[LE][2]}</td>
                            <td style="padding: 10px; color:black;">{$HIS[LE][3]}</td>
                            <!-- <td style="padding: 10px; color:black;">{$HIS[LE][4]}</td> -->
                            <td>
                                <a class="btn-color pbtn historial mdi mdi-folder mdi-24px per4108 modal-trigger" id="h{$HIS[LE][0]}" href="#modal-historialcliente" title="Historial Cliente" style="color:black;"></a>
                                <a class="btn-color pbtn abonar mdi mdi-credit-card mdi-24px per4109 modal-trigger" id="p{$HIS[LE][0]}" title="Realizar abono" href="#modal-abonar" style="color:black;"></a>
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
    <div id="modal-historialcliente" class="modal modal-fixed-footer" style="width: 70%">
        <div class="modal-header">
            <ul class="tabs tabs-fixed-width blue">
                <ul class="tabs tabs-fixed-width blue">
                <li class="tab col s3 white-text">Estado de cuenta</li>
            </ul>
        </div>
        <div class="modal-content">
            <div class="row">
                <table class="table responsive-table centered striped bordered highlight z-depth-5 pequeño" id="data-table-estadocuentas" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Prestamo</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Cédula</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Tipo</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Monto</th>
                            <!-- <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Saldo</th> -->
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Comentario</th>
                        </tr>
                    </thead>
                    <tbody id="listaestadocuentas">
                    <!-- {section name=LE loop=$CLI}
                        <tr>
                            <td style="padding: 10px; color:black;">{$CLI[LE][1]}</td>
                            <td style="padding: 10px; color:black;">{$CLI[LE][2]}</td>
                            <td style="padding: 10px; color:black;">{$CLI[LE][3]}</td>
                            <td style="padding: 10px; color:black;">{$CLI[LE][4]}</td>
                            <td style="padding: 10px; color:black;">{$CLI[LE][5]}</td>
                            <td style="padding: 10px; color:black;">{$CLI[LE][6]}</td>
                            <td style="padding: 10px; color:black;">{$CLI[LE][1]}</td>
                        </tr>
                    {/section} -->
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal-footer grey lighten-3">
            <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        </div>
    </div>

    <div id="modal-abonar" class="modal modal-fixed-footer">
        <div class="modal-header">
            <ul class="tabs tabs-fixed-width blue">
                <ul class="tabs tabs-fixed-width blue">
                <li class="tab col s3 white-text">Abonar</li>
            </ul>
        </div>
        <div class="modal-content" id="prestamos">
            <table class="table responsive-table centered striped bordered highlight z-depth-5 pequeño" id="data-table-prestamos" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Cédula</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Fecha</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Credito</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Seleccionar</th>
                        </tr>
                    </thead>
                    <tbody id="listaprestamos"></tbody>
                </table>
        </div>
        <div class="modal-content hide" id="vistapago">
            <div class="row">
                <div class="col s6 m6 l6">
                    <h4>Cliente: <span id="ncli"></span></h4><br>
                    <!-- <h4>Saldo: <span id="tsaldo"></span></h4> -->
                </div>
                <div class="col s6 m6 l6">
                    <div class="input-field">
                        <input type="number" id="monto" class="validate">
                        <input type="hidden" id="saldo">
                        <input type="hidden" id="idmoneda" value="1">
                        <label for="isaldo">Monto a abonar</label>
                    </div>
                    <div class="input-field">
                        <input type="text" id="comentario" class="validate">
                        <label for="comentario">Comentario</label>
                    </div>
                    <div class="col s6 m6 l6 hide">
                        <p>
                            <input type="checkbox" id="interes" />
                            <label for="interes">Cobrar intereses</label>
                        </p>
                    </div>
                    <div class="col s6 m6 l6">
                        <button class="waves-effect waves-light blue btn right" id="dopay" tipo="2">Abonar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer grey lighten-3">
            <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        </div>
    </div>

</div>
{$SCR}
<script src="../assets/js/modulos/historial.js"></script>

</body>
</html>