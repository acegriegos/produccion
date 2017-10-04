<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-contabilidad-cuentas.css">

<div class="row">
<!--  -->
<div class="col l6 m12 s12">
<div class="card z-depth-5" id="show_cuentas">
<div class="card-header">
    <div class="row">
        <div class="col s3 centro" >
            <h3>Cuentas</h3>
        </div>
    </div>

<div class="row">
    <div class="col s12 m12 l8 ">
        <div class="row">

            <div class="input-field col s12 m6 l6">
                <a class="prefix"><i class="small mdi mdi-magnify mdi-24px"></i></a>
                <input type="text" id="vbusqueda" maxlength="45" num="+27" var="nombre">
                <label for="vbusqueda">Número / Descripción</label>
            </div>

            <div class="col s10 offset-s2 m6 l6">
                <ul id="dropdown2" class="dropdown-content">
                    <li><a class="dropdown-item vfiltros" href="#" filtro="f1">Filtro Normal</a></li>
                    <li><a class="dropdown-item vfiltros" href="#" filtro="f2">Saldo Igual a</a></li>
                    <li><a class="dropdown-item vfiltros" href="#" filtro="f3">Saldo Mayor o Igual a</a></li>
                    <li><a class="dropdown-item vfiltros" href="#" filtro="f4">Saldo Menor o Igual a</a></li>
                    <li><a class="dropdown-item" href="#" id="refresh">Refrescar</a></li>
                    <li>  <a class="dropdown-item" href="#" id="refresh4ever">Refrescar Contínuo</a></li>
                </ul>
                <a class="btn dropdown-button z-depth-5" href="#!" data-activates="dropdown2">Filtro de Busqueda<i class="mdi-navigation-arrow-drop-down right"></i></a>
            </div>

        </div>
    </div>
</div>

<div class="card-block blc1" style="padding: 2%;">
    <div class="row" style="padding: 2%;">
        <div class="col s4 card-title white-text blue truncate " align="center" style="padding: 0.8%; font-size: 1em">
            Número de Cuenta
        </div>
        <div class="col s4 card-title white-text blue " align="center" style="padding: 0.8%; font-size: 1em">
            Descripción
        </div>
        <div class="col s4 card-title white-text blue " align="center" style="padding: 0.8%; font-size: 1em">
            Saldo(CRC)
        </div>
    </div>


<ul class="list-group list-group-flush" id="vcuentas">
{section name=LE loop=$VCUE}
    <li class="list-group-item view-cuenta" style="cursor: pointer;" id="c{$VCUE[LE][3]}">
        <div class="row">
            <div class="col s4 center-align" style="font-size: 1.2em">
                {$VCUE[LE][0]}
            </div>
            <div class="col s4 center-align" style="font-size: 1.2em" id="n{$VCUE[LE][3]}">
                {$VCUE[LE][1]}
            </div>
            <div class="col s4 center-align" style="font-size: 1.2em">
                {$VCUE[LE][2]}
            </div>
        </div>
    </li>
{/section}
</ul>

</div>

</div>


<br>
</div>
</div>
<!--  -->
<div class="row">
    <div class="col s12 m12 l6">

        <div class="colDetalle"></div>
        <!-- <small class="myh3"></small> -->
    </div>
</div>



<div class="row">

<ul id="transacciones" class="side-nav side-nav-conta">

<div class="card-header center white-text" style="background-color:#0B3861; padding: 0.3%;">
    <h3 class="flow-text">Detalle de Transacción</h3>
</div>

<div class="card-content" style="padding: 2%;">

<div class="row pequeño">
    <div class="col s12 m12 pequeño">
      <div class="card blue z-depth-5 pequeño">

        <div class="col s12 m12 l6">
            <p class="fsize"><b>N° Transacción:</b> <span id="dtranN"></span></p>
        </div>

        <div class="col s12 m12 l6">
            <p class="fsize"><b>Fecha:</b> <span id="dtranF"></span></p> 
        </div>

        <div class="col s12 m12 l6">
            <p class="fsize"><b>Usuario:</b> <span id="dtranU"></span></p>
        </div>

        <div class="col s12 m12 l6">
            <p class="fsize"><b>Empresa:</b> <span id="dtranE"></span></p>
        </div>

        <div class="col s12 m12 l12">
            <p class="fsize"><b>Descripción:</b> <span id="dtranD"></span></p>
            <br><br>
        </div>

        </div>
    </div>
</div>

<div class="row pequeño">
    <div class="col s12 m12 pequeño">

        <div class="col s12 ">
            <div class="card-block ">
                <div class="row">
                    <div class="col s2 m3 white-text blue" align="center" style="padding: 0.8%">
                        Cuenta
                    </div>
                    <div class="col s4 m3 white-text blue" align="center" style="padding: 0.8%">
                        Comentario
                    </div>
                    <div class="col s3 white-text blue" align="center" style="padding: 0.8%">
                        Debe
                    </div>
                    <div class="col s3 white-text blue" align="center" style="padding: 0.8%">
                        Haber
                    </div>
                </div>


                <div id="dtranDet"></div>

            </div>
            <div class="card-block sh-cta-card">
                <div class="row">
                    <div class="col s3" align="center" style="height: 5px;">
                        <b>TOTAL</b>
                    </div>
                    <div class="col s3" align="center" style="height: 5px;">
                    </div>
                    <div class="col s3 numeros" align="center" style="height: 5px;">
                        <span id="tdebe" class="tdettran"></span>
                    </div>
                    <div class="col s3 numeros" align="center" style="height: 5px;">
                        <span id="thaber" class="tdettran"></span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>


</div>

</ul>

<ul id="extra" class="side-nav side-nav-conta1" >
<h1>EXTRA</h1>
</ul>

</div>

</div>
