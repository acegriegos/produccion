<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Clientes</title>

</head>
<body>
{$NAV}
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-clientes.css">
<div class="bdy">
<div class="card">

<div class="card-header center blue-grey white-text">
    <p class="flow-text">Clientes</p>
</div>
<div class="card-content">
<div class="row">

<div class="input-field col s12 m8 l8">

    <a href="#" class="prefix dropdown-button tooltipped" data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="small material-icons">search</i></a>
    <ul id='filtr_1' class='dropdown-content'>
        <li><a href="#!" fltr="1">Nombre</a></li>
        <li><a href="#!" fltr="2">Cédula</a></li>
        <li><a href="#!" fltr="3">Teléfono</a></li>
    </ul>
    <input type="text" id="searh_clie" maxlength="100" class="searchclientes">
    <label for="searh_clie">Buscar Cliente por Nombre o Cédula</label>

</div>
<div class="col m4">
    <a id="ingClie" class="der btn-floating tooltipped modal-trigger" data-position="left" data-tooltip="Ingresar Cliente" href="#modal-clientes"><i class="large material-icons">add</i></a>
</div>

</div>

<div class="card-block">
<table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-clientes">
<thead>
<tr>
<th>Cédula</th>
<th>Nombre</th>
<th>Teléfonos</th>
<th>Correo</th>
<th>Tipo</th>
<th>Acciones</th>
</tr>
</thead>
<tbody id="listaclientes">
{section name=LE loop=$CLIE}
<tr id="f{$CLIE[LE][0]}">
<td>{$CLIE[LE][1]}</td>
<td>{$CLIE[LE][2]}</td>
<td>{$CLIE[LE][4]}</td>
<td>{$CLIE[LE][5]}</td>
<td>{$CLIE[LE][6]}</td>
<td>
<a href="#modal-clientes" class="btn-floating load modal-trigger" id="m{$CLIE[LE][0]}" modulo="cliente"><i class="fa fa-pencil-square-o"></i></a>
<a href="#!" class="btn-floating delete" modulo="cliente" id="d{$CLIE[LE][0]}" style="color: #D9534F"><i class="fa fa-times"></i></a>
</td>
</tr>
{/section}
</tbody>
</table>
</div>

<div class="modal modal-fixed-footer" id="modal-clientes" style="height: 80%; width: 75%">

<div class="modal-header">
    <ul class="tabs tabs-fixed-width blue">
        <li class="tab col s3"><a class="active white-text" href="#info" id="ln1">Información</a></li>
        <li class="tab col s3"><a href="#fina" class="white-text" id="ln2">Financiero</a></li>
        <li class="tab col s3"><a href="#logis" class="white-text" id="ln3">Logística</a></li>
        <li class="tab col s3"><a href="#exo" class="white-text" id="ln4">Impuestos</a></li>
      </ul>
</div>

<div class="modal-content" style="padding: 0px;">
    <div id="fclientes">

    <div class="row">
    <br>
        <div class="col s12">
        <div class="row parte1 col s12" id="info">
            <div class="row" style="margin: 0px">
                <div class="col s2">
                    <p>
                      <input class="with-gap" name="tipoclie" type="radio" id="cfisico" tipoClie="1" checked="checked" principal="1"/>
                      <label for="cfisico">Físico</label>
                    </p>
                </div>
                <div class="col s2">
                    <p>
                      <input class="with-gap" name="tipoclie" type="radio" id="cjuridico" tipoClie="2" />
                      <label for="cjuridico">Jurídico</label>
                    </p>
                </div>
                <input type="hidden" id="vidtipocliente" value="1">
            </div>
            <div class="card-title"><b>Datos Personales</b></div>
            <div class="row">
                <div class="input-field col s12 m4 l4" id="colMod">
                <label id="nomClie" for="vnombre">Nombre</label>
                <input type="text" class="validate" id="vnombre">

                <input type="hidden" id="vid" value="0">
                <input type="hidden" id="vbisproveedor" value="0">
                </div>

                <div class="input-field col s12 m4 l4 hid">
                <label for="vapellido1">Primer Apellido</label>
                <input type="text" class="validate" id="vapellido1">
                </div>

                <div class="input-field col s12 m4 l4 hid">
                <label for="vapellido2">Segundo Apellido</label>
                <input type="text" class="validate" id="vapellido2">
                </div>
            </div>

            <div class="row">

                <div class="input-field col s12 m4 l4" id="colMod">
                <label for="vcedula">Cédula del Cliente</label>
                <input type="text" class="validate" id="vcedula" data-mask="9-9999-9999">
                </div>

                <div class="input-field col s12 m4 col l4">
                <label for="vweb">Web</label>
                <input type="text" class="form-control" id="vweb" placeholder="www.webempresa.com">
                </div>

                <div class="input-field col s6 m4 l4">
                <select id="videstado" type="select">
                    <option value="" disabled selected>Seleccione un Estado</option>
                    {section name=LE loop=$ESTCLIE}
                    <option value="{$ESTCLIE[LE][0]}">{$ESTCLIE[LE][1]}</option>
                    {/section}
                </select>
                <label for="videstado">Estado</label>
                </div>

            </div>

            <div class="row">

                <div class="input-field col s12 m4 l4" vtabla="correo" id="fcorreos">
                <div class="prefix">@</div>
                <input type="email" class="validate tooltipped" id="correo_in" data-position="top" data-tooltip="Ingresar Correo con la Tecla [right]">
                <input type="hidden" id="vcorreo" fill="18">
                <label for="correo_in">Ingresar Correo</label>
                </div>

                <div class="col s12 m8 l8" vtabla="telefono" id="ftelefonos">
                
                <div class="row">

                    <div class="input-field col s4">
                    <select type="select" id="tptel">
                        <option value="" disabled selected>Seleccione Tipo de Tel.</option>
                        {section name=LE loop=$TPTEL}
                        <option value="{$TPTEL[LE][0]}">{$TPTEL[LE][1]}</option>
                        {/section}
                    </select>
                    <label for="tptel">Tipo Teléfono</label>
                    </div>

                    <div class="input-field col s8">
                        <div class="prefix"><i class="fa fa-phone"></i></div>
                        <input type="text" class="validate tooltipped" id="telefono_in" data-mask="9999-9999" data-position="top" data-tooltip="Ingresar Teléfono con la Tecla [right]">
                        <input type="hidden" id="vtelefono" fill="19">
                        <label for="telefono_in">Ingresar Teléfono</label>

                    </div>
                </div>

                </div>
            </div>

        </div>

        <div id="fina" class="col s12">

            <div class="row">
            <br>
                <div class="input-field col s12 m6 l6">
                    <select type="select" id="vidnivel" noClear="1">
                        <option value="0" selected>Seleccione una Categoría</option>
                        {section name=LE loop=$NVLCLIE}
                        <option value="{$NVLCLIE[LE][0]}">{$NVLCLIE[LE][1]}</option>
                        {/section}
                    </select>
                     <label for="vidnivel">Categoría del Cliente</label>
                </div>

                <div class="col s12 m6 l6">

                      <div class="switch">
                        <label>
                          Cliente Contado
                          <input type="checkbox" tp="1" id="tipocliente">
                          <span class="lever"></span>
                          Cliente Crédito
                        </label>
                      </div>
            
                </div>
            </div> 

            <div class="row">

                <div class="input-field col s12 m6 l6">
                    <div class="prefix">%</div>
                    <input type="number" class="eder" id="vdescuentop">
                    <label for="vdescuentop">Descuento del Cliente</label>
                </div>

                <div class="input-field col s12 m6 l6">
                    <div class="prefix">%</div>
                    <input type="number" class="eder" id="vdescuentom">
                    <label for="vdescuentom">Descuento Máximo</label>
                </div>

            </div>

            <div class="row cre" style="display: none;"> 

                <div class="input-field col s12 m6 l6">
                    <label for="vplazo">Plazo en Días</label>
                    <input type="number" class="eder" id="vplazo">
                </div>

                <div class="input-field col s12 m6 l6">
                    <label for="vcredito">Crédito del Cliente</label>
                    <input type="number" class="eder" id="vcredito">
                </div>

            </div>



            <div vtabla="defectocuenta" id="fdefectocuentas">
            <input type="hidden" id="videstadocontable" value="1">
            <input type="hidden" id="vidcuenta" value="">

            <div class="row">
                <div class="col s12 m6 l6">
                    <div class="card-title"><b> Cuentas Contado </b></div>
                    <div id="ctacontado">
                        
                    </div>
                </div>

                <div class="col s6 cre" style="display: none;">
                    <div class="card-title"><b> Cuentas Crédito </b></div>
                    <div id="ctacredito">
                        
                    </div>
                </div>
            </div>

            </div>
        </div>

        <div id="logis" class="col s12">

            <div vtabla="ubicacione" id="fubicaciones">
                <div class="card-title"><b>Direcciones</b></div>

                <input type="hidden" id="vbisnacional" value="1">

                <div class="row">

                    <div class="input-field col s4">

                    <div class="provincia">
                    <a class="prefix btn-floating blue tooltipped" data-position="button" data-tooltip="Ingresar Provincia" href="#!" style="width: 2.5rem" det="provincia" d-b="8" prev=""><i class="material-icons">add</i></a>

                    <select id="vidprovincia" type="select">
                    <option value="">Seleccione una Provincia</option>
                    {section name=LE loop=$PRO}
                    <option value="{$PRO[LE][0]}">{$PRO[LE][1]}</option>
                    {/section}
                    </select>
                    <label for="vidprovincia">Provincia</label>
                    </div>

                    </div>

                    <div class="input-field col s4">
                    
                    <div class="canton">
                    <a class="prefix btn-floating blue tooltipped" data-position="button" data-tooltip="Ingresar Cantón" href="#!" style="width: 2.5rem" det="canton" d-b="9" prev="vidprovincia"><i class="material-icons">add</i></a>

                    <select id="vidcanton" type="select">
                    <option value="">Seleccione un Cantón</option>
                    </select>
                    <label for="vidcanton">Cantón</label>
                    </div>

                    </div>

                    <div class="input-field col s4">
                    
                    <div class="distrito">
                    <a class="prefix btn-floating blue tooltipped" data-position="button" data-tooltip="Ingresar Distrito" href="#!" style="width: 2.5rem" det="distrito" d-b="10" prev="vidcanton"><i class="material-icons">add</i></a>
                    
                    <select id="viddistrito" type="select">
                    <option value="">Seleccione un Distrito</option>
                    </select>
                    <label for="viddistrito">Distrito</label>
                    </div>

                    </div>

                </div>

                <div class="row">

                    <div class="input-field col s12">
                    <label for="vdireccion">Dirección Exacta</label>
                    <textarea id="vdireccion" class="materialize-textarea" length="100"></textarea>
                    </div>

                    
                    <div class="input-field col s12 m6 l6">
                        <label for="vlatitud">Latitud</label>
                        <input type="text" class="eder" id="vlatitud">
                    </div>

                    <div class="input-field col s12 m6 l6">
                        <label for="vlongitud">Longitud</label>
                        <input type="text" class="eder" id="vlongitud">
                    </div>

                </div>
            </div>
        </div>

        <div id="exo" class="col s12">
            <div class="card-title"><b>Impuestos</b></div>
        </div>

        </div>
    </div>

</div>
</div>

<div class="modal-footer">
   
    <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
    <button type="button" class="waves-effect waves-green btn-flat add" id="agClie" codigo="1" modulo="cliente" varias="1" >Guardar</button>
</div>

</div>

</div>
</div>
</div>

<script src="../assets/js/modulos/clientes.js"></script>

</body>
</html>