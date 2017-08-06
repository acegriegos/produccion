    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-contabilidad-cuentas.css">

<div class="row">

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
                        <a class="prefix"><i class="small material-icons">search</i></a>
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
    </div>
    <div class="row">
        <div class="col s12 m12 l6">
            <div class="card z-depth-5">
                <div class="card-block blc1" >

                    <div class="row " style="margin: 0.5%;" >
                        <div class="col s4 card-title white-text blue truncate " align="center" style="font-size: 1.2em">
                            Número de Cuenta
                        </div>
                        <div class="col s4 card-title white-text blue " align="center" style="font-size: 1.2em">
                            Descripción
                        </div>
                        <div class="col s4 card-title white-text blue " align="center" style="font-size: 1.2em">
                            Saldo(CRC)
                        </div>
                    </div>
                </div>
                <ul class="list-group list-group-flush" id="vcuentas">


                    {section name=LE loop=$VCUE}

                    <li class="list-group-item view-cuenta" style="cursor: pointer;" id="c{$VCUE[LE][3]}">
                      <div class="row">
                        <div class="col s4 center-align" style="font-size: 1.2em" >
                            {$VCUE[LE][0]}
                        </div>
                        <div class="col s4 center-align" style="font-size: 1.2em"  id="n{$VCUE[LE][3]}">
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

    <div class="col s12 m12 l6">

        <div class="colDetalle"></div>

        <small class="myh3"></small>

    </div>

    <ul id="transacciones" class="side-nav side-nav-conta" >


        <div class="card-header center white-text" style="background-color:#0B3861" >
            <p class="flow-text" style="font-size: 1.9em;">Detalle de Transacción</p>
        </div>
        <div class="card-content" style="padding-top: 0px;">

            <div class="card z-depth-5">
             <div class="row">    

                <div class="col s12 m12 l6">
                    <h5><b>N° Transacción: <span id="dtranN"></span></b></h5>
                    
                </div>

                <div class="col s12 m12 l6">
                    <h5><b>Fecha: <span id="dtranF"></span></b></h5>
                    
                </div>

                <div class="col s12 m12 l6">
                    <h5><b>Usuario: <span id="dtranU"></span></b></h5>
                    
                </div>

                <div class="col s12 m12 l6">
                    <h5><b>Empresa: <span id="dtranE"></span></b></h5>
                    
                </div>

                <div class="col s12 m12 l12">
                    <h5><b>Descripción: <span id="dtranD"></span></b></h5>
                    
                    <br><br>
                </div>   


                <div class="col s12 ">
                    <div class="card-block ">
                        <b><div class="row">

                            <div class="col s2 m3 white-text blue" align="center" style="border-bottom: 1px solid black; font-size: 1.2em; margin: 0; padding-top: 1%; padding-bottom: 1%; height: 1.9em;">
                                Cuenta
                            </div>
                            <div class="col s4 m3 white-text blue" align="center" style="border-bottom: 1px solid black; font-size: 1.2em; margin: 0; padding-top: 1%; padding-bottom: 1%; height: 1.9em;">
                                Comentario
                            </div>
                            <div class="col s3 white-text blue" align="center" style="border-bottom: 1px solid black;  font-size: 1.2em; margin: 0; padding-top: 1%; padding-bottom: 1%; height: 1.9em;">
                                Debe
                            </div>
                            <div class="col s3 white-text blue" align="center" style="border-bottom: 1px solid black; font-size: 1.2em; margin: 0; padding-top: 1%; padding-bottom: 1%;  height: 1.9em;">
                                Haber
                            </div>
                        </div></b>
                        <div id="dtranDet"></div>
                    </div>
                    <div class="card-block sh-cta-card"> <div class="row">
                        <div class="col s3" align="center" style="border-bottom: 1px solid black; font-size: 1.2em; margin: 0; height: 1.9em;">
                            <b>TOTAL</b>
                        </div>
                        <div class="col s3" align="center" style="border-bottom: 1px solid black;color: white; font-size: 1.2em; margin: 0; height: 1.9em;">
                        </div>
                        <div class="col s3 numeros" align="center" style="border-bottom: 1px solid black;  font-size: 1.2em; margin: 0; height: 1.9em;">
                            <span id="tdebe" class="tdettran"></span>
                        </div>
                        <div class="col s3 numeros" align="center" style="border-bottom: 1px solid black; font-size: 1.2em; margin: 0; height: 1.9em;">
                            <span id="thaber" class="tdettran"></span>
                        </div>
                    </div> </div>
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

</div>
