<div class="row">

    <div class="card" id="show_cuentas">
        <div class="card-header">
            <div class="row">
                <div class="col s3" >
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
                        <a class="btn dropdown-button" href="#!" data-activates="dropdown2">Filtro de Busqueda<i class="mdi-navigation-arrow-drop-down right"></i></a>
                    </div>
                    

                </div>

            </div>

        </div>
    </div>
    <div class="row">
        <div class="col s12 m12 l6">
            <div class="card-block blc1" >

                <div class="row " style="margin: 0.5%;" >
                    <div class="col s4 card-title grey white-text truncate " align="center" style="font-size: 1.2em">
                        Número de Cuenta
                    </div>
                    <div class="col s4 card-title grey white-text " align="center" style="font-size: 1.2em">
                        Descripción
                    </div>
                    <div class="col s4 card-title grey white-text " align="center" style="font-size: 1.2em">
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

    <div class="col s12 m12 l6">

        <div class="colDetalle"></div>

        <small class="myh3"></small>

    </div>

    <ul id="transacciones" class="side-nav">
        <li><div class="userView">
          <div class="background">
            <img src="images/office.jpg">
          </div>
          <a href="#!user"><img class="circle" src="images/yuna.jpg"></a>
          <a href="#!name"><span class="white-text name">John Doe</span></a>
          <a href="#!email"><span class="white-text email">jdandturk@gmail.com</span></a>
        </div></li>
        <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
        <li><a href="#!">Second Link</a></li>
        <li><div class="divider"></div></li>
        <li><a class="subheader">Subheader</a></li>
        <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    </ul>

</div>

</div>

</div>
