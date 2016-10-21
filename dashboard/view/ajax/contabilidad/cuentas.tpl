<div class="row">
            <div class="col-md-6 col-lg-6">
                <h3>Ingresar Cuenta</h3>
                <div class="input-group" modulo="scontabilidad">
                    <div class="input-group-addon slide" cod="1"><b>Cuenta</b></div>
                    
                    <select class="form-control slide" cod="1" id="vgenero" lvl="0">
                        <option value="0">Seleccione una Opción</option>
                        {section name=LE loop=$CUE}
                            <option value="{$CUE[LE][0]}" num="{$CUE[LE][2]}">{$CUE[LE][1]}</option>
                        {/section}
                    </select>

                    <div class="input-group-addon slide" cod="2" style="display:none"><b>Descripción</b></div>
                    <input type="text" class="form-control slide" cod="2" style="display:none" id="vnombre" placeholder="Nombre Cuenta" maxlength="40">
                    <div class="input-group-addon addglobal btn" title="Agregar Cuenta"><i class="fa fa-plus"></i></div>
                    <div class="input-group-addon moveL btn" style="display:none"><i class="fa fa-arrow-left"></i></div>
                    <div class="input-group-addon slider btn" style="display:none"><i class="fa fa-arrow-right"></i></div>
                    <div class="input-group-addon" title="Cuenta Padre">
                        <input type="checkbox" id="continuo" checked>
                        <input type="hidden" id="vispadre" value="1">
                    </div>
                </div><br>
                

                <div class="card" id="show_cuentas">
                    <div class="card-header">
                        <div class="row">
                                <div class="col-md-3 col-lg-3" >
                                    <h3>Cuentas</h3>
                                </div>
                                <div class="col-md-9 col-lg-9" align="center">
                                    <div class="input-group">
                                        <div class="input-group-addon"><b>Buscar</b></div>
                                        <input type="text" class="form-control" id="vbusqueda" placeholder="Número / Descripción" maxlength="20">

                                        <div class="btn-group input-group-addon" role="group" id="fgrande">
                                            <i id="btnGroupDrop1" class="dropdown-toggle fa fa-navicon" data-toggle="dropdown" style="cursor: pointer;">
                                            </i>
                                            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                <a class="dropdown-item vfiltros" href="#" filtro="f1">Filtro Normal</a>
                                                <a class="dropdown-item vfiltros" href="#" filtro="f2">Saldo Igual a</a>
                                                <a class="dropdown-item vfiltros" href="#" filtro="f3">Saldo Mayor o Igual a</a>
                                                <a class="dropdown-item vfiltros" href="#" filtro="f4">Saldo Menor o Igual a</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    <div class="card-block blc1">
                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" align="center">
                                Número de Cuenta
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" align="center">
                                Descripción
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" align="center">
                                Saldo(CRC)
                            </div>
                        </div>
                    </div>
                        <ul class="list-group list-group-flush" id="vcuentas">

                                  
                            {section name=LE loop=$VCUE}
                            
                                <li class="list-group-item" style="cursor: pointer;">
                                  <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        {$VCUE[LE][0]}
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" align="center">
                                        {$VCUE[LE][1]}
                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" align="right">
                                        {$VCUE[LE][2]}
                                    </div>
                                  </div>
                                </li>
                            
                            {/section}

                          </ul>
                        
                    </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <small class="myh3"></small>
                <div class="alert alert-danger err_" id="err1" style="display: none">
                    <strong id="errm1"></strong>
                </div>
                <div class="alert alert-danger inf_" id="inf1" style="display: none">
                    <strong id="infm1"></strong>
                </div>
            </div>
            

            </div>