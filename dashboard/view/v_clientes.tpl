<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Clientes</title>
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-clientes.css">

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

<div class="card">

<h3 class="card-header card-primary">CLIENTES</h3>

<div class="row">

    <div class="input-field col m8 col l8">

        <a href="#" class="prefix" style="cursor: default;"><i  class="fa fa-search"></i></a>
        <input type="text" id="searh_clie">
        <label for="searh_clie">Buscar Cliente por Nombre</label>

    </div>

    <div class="col m4">
        <a id="ingClie" class="btn der btn-floating" href="#modal-clientes" ><i class="fa fa-plus" title="Agregar Cliente"></i></a>
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
<tbody id="listaClientes">
{section name=LE loop=$CLIE}
<tr id="f1">
<td>{$CLIE[LE][1]}</td>
<td>{$CLIE[LE][2]}</td>
<td>{$CLIE[LE][4]}</td>
<td>{$CLIE[LE][5]}</td>
<td>{$CLIE[LE][6]}</td>
<td>
<i class="fa fa-pencil-square-o btn load" id="m{$CLIE[LE][0]}" data-toggle="modal" href='#modal-clientes' modulo="cliente" title="Editar Cliente"></i>
<i class="fa fa-times btn delete" codigo="1" modulo="cliente" id="d{$CLIE[LE][0]}" style="color: #D9534F" title="Eliminar Cliente"></i>
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
        <li class="tab col s3"><a href="#exo" class="white-text" id="ln4">Exoneraciones</a></li>
      </ul>
</div>



<div class="modal-content" style="padding: 0px;">

    <div id="fclientes">

    <div class="row">
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
                <div class="input-field col s6 m4 l4" id="colMod">
                <label id="nomClie" for="vnombre">Nombre del Cliente</label>
                <input type="text" class="validate" id="vnombre">

                <input type="hidden" id="vid" value="0">
                <input type="hidden" id="vbisproveedor" value="0">
                </div>

                <div class="input-field col s6 m4 l4 hid">
                <label for="vapellido1">Primer Apellido</label>
                <input type="text" class="validate" id="vapellido1">
                </div>

                <div class="input-field col s6 m4 l4 hid">
                <label for="vapellido2">Segundo Apellido</label>
                <input type="text" class="validate" id="vapellido2">
                </div>

            </div>

            <div class="row">
            
                <div class="input-field col s6 m4 l4" id="colMod">
                <label for="vcedula">Cédula del Cliente</label>
                <input type="text" class="validate" id="vcedula" data-mask="9-9999-9999">
                </div>

                <div class="input-field col s6 m4 col l4">
                <label for="vweb">Web</label>
                <input type="text" class="form-control" id="vweb" placeholder="Página Web">
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
                <input type="email" class="validate tooltipped" id="correo_in" data-position="top" data-delay="50" data-tooltip="Ingresar Correo con la Tecla [right]">
                <input type="hidden" id="vcorreo">
                <label for="correo_in">Ingresar Correo</label>
                <br>
                <div class="col s12">
                    <ul class="collapsible" data-collapsible="accordion" id="shcorreos">
                      
                    </ul>
                </div>
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
                        <input type="text" class="validate tooltipped" id="telefono_in" data-mask="9999-9999" data-position="top" data-delay="50" data-tooltip="Ingresar Teléfono con la Tecla [right]">
                        <input type="hidden" id="vtelefono">
                        <label for="telefono_in">Ingresar Teléfono</label>

                    </div>
                    <div class="col s4"></div>
                    <div class="col s8">
                        <ul class="collapsible" data-collapsible="accordion" id="shtelefonos">
                          
                        </ul>
                    </div>

                </div>

                </div>
            </div>

        </div>

        <div id="fina" class="col s12">

            <div class="row">
                <div class="col-md-6 col-lg-6">
                <div class="input-group">
                <div class="input-group-addon"><b>Categoría del Cliente</b></div>
                <select type="select" class="form-control" id="vidnivel">
                    <option value="">Seleccione una Categoría</option>
                    {section name=LE loop=$NVLCLIE}
                    <option value="{$NVLCLIE[LE][0]}">{$NVLCLIE[LE][1]}</option>
                    {/section}
                </select>
                </div>
                </div>
                <div class="col-md-6 col-lg-6">
                    <label>Tipo Cliente:</label>
                    <label class="radio-inline">
                        <input type="radio" name="tipocliente" class="tipocl" tp="1" checked principal="1"> Contado
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="tipocliente" class="tipocl" tp="2"> Crédito
                    </label>
                </div>
            </div> <br>

            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                    <div class="input-group-addon"><b>Descuento</b></div>
                    <input type="number" class="form-control eder" id="vdescuentop" placeholder="Descuento Porcentual del Cliente">
                    <div class="input-group-addon"><b>%</b></div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                    <div class="input-group-addon"><b>Descuento Max</b></div>
                    <input type="number" class="form-control eder" id="vdescuentom" placeholder="Descuento Máximo">
                    <div class="input-group-addon"><b>%</b></div>
                    </div>
                </div>
            </div><br>

            <div class="row cre" style="display: none;">   
            <div class="col-md-6 col-lg-6">
            <div class="input-group">
            <div class="input-group-addon"><b>Plazo</b></div>
            <input type="number" class="form-control eder" id="vplazo" placeholder="Plazo en Días">
            <div class="input-group-addon"><b>días</b></div>
            </div>
            </div>
            <div class="col-md-6 col-lg-6">
            <div class="input-group">
            <div class="input-group-addon"><b>Crédito</b></div>
            <input type="number" class="form-control eder" id="vcredito" placeholder="Crédito del Cliente">
            </div> 
            </div>

            </div>



            <div vtabla="defectocuenta" id="fdefectocuentas">
            <input type="hidden" id="videstadocontable" value="1">
            <input type="hidden" id="vidcuenta" value="">

            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="card-title"><b> Cuentas Contado <i class="fa fa-plus btn btn-success addcta" tp="1" title="Agregar Cuenta" style="border-radius: 25px;width: 7%;padding: 0px;display: none;"></i> </b></div>
                    <div id="ctacontado">
                        
                    </div>
                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 cre" style="display: none;">
                    <div class="card-title"><b> Cuentas Crédito <i class="fa fa-plus btn btn-success addcta" tp="2" title="Agregar Cuenta" style="border-radius: 25px;width: 7%;padding: 0px;display: none;"></i> </b></div>
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
            <div class="col-md-12 col-lg-12">
            <div tabla="detalleubicacione" class="enrutador">

            <div class="row">
            <div class="col-md-6 col-lg-6">

            <div class="input-group">
            <div class="input-group-addon"><b> Provincia</b></div>
            <select id="idprovincia" type="select">
            <option value="">Seleccione una Provincia</option>
            {section name=LE loop=$PRO}
            <option value="{$PRO[LE][0]}">{$PRO[LE][1]}</option>
            {/section}
            </select>
            <div class="input-group-addon"><i class="fa fa-plus"></i></div>
            </div>

            <div class="input-group">
            <div class="input-group-addon"><b> Cantón </b></div>
            <select id="idcanton" type="select">
            <option value="">Seleccione un Cantón</option>
            </select>
            <div class="input-group-addon"><i class="fa fa-plus"></i></div>
            </div>

            <div class="input-group">
            <div class="input-group-addon"><b> Distrito</b></div>
            <select id="viddistrito" type="select">
            <option value="">Seleccione un Distrito</option>
            </select>
            <div class="input-group-addon"><i class="fa fa-plus"></i></div>
            </div>

            </div>

            <div class="col-md-6 col-lg-6">
            <div class="input-group">
            <div class="input-group-addon"><b> Dirección Exacta </b></div>
            <textarea id="vdireccion" class="form-control" rows="3"></textarea>
            </div>
            </div>

            </div><br>

            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                    <div class="input-group-addon"><b> Latitud </b></div>
                    <input type="text" class="form-control eder" id="vlatitud" placeholder="00.00">
                    </div>
                </div>
                <div class="col-md-6 col-lg-6">
                    <div class="input-group">
                    <div class="input-group-addon"><b> Longitud </b></div>
                    <input type="text" class="form-control eder" id="vlongitud" placeholder="00.00">
                    </div>
                </div>
            </div>

            </div>
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

<script src="../assets/js/modulos/clientes.js"></script>

</body>
</html>