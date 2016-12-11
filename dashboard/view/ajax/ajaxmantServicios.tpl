<div id="mantServ">
<div class="row">
<div class="col s8 m6">
<div class="input-field col s10">
<input id="searchsrv" type="text" class="validate">
<label for="icon_prefix" id="phs">Buscar por Código</label>
</div>
<a class="dropdown-button btn-floating btn-large waves-effect waves-light green" data-activates="fserv"><i class="material-icons">search</i></a>
<ul id="fserv" class="dropdown-content" filter="1">
<li><a class="dropdown-item filtersrv" filtro="f1">Código</a></li>
<li><a class="dropdown-item filtersrv" filtro="f2">Nombre</a></li>
</ul>            
</div>
<div class="col s4 m6">
<a id="addservice" class="btn-floating btn-large waves-effect waves-light right blue" href="#modal-servicios"><i class="material-icons">add</i></a>
</div>
</div>
    
<div class="row">
<div class="col s12 m12">
<div class="table-responsive">
<table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-servicios" cellspacing="0" width="100%">
<thead>
<tr>
<th style="width: 20%">Código</th>
<th>Nombre</th>
<th>Precio</th>
<th>Período</th>
<th>Outsourcing</th>
<th>Acciones</th>
</tr>
</thead>
<tbody id="listaservicios">
{section name=LE loop=$SERV}
<tr>
<td>{$SERV[LE][1]}</td>
<td>{$SERV[LE][2]}</td>
<td>{$SERV[LE][3]}</td>
<td>{$SERV[LE][4]}</td>
<td>{$SERV[LE][5]}</td>
<td>
    <a class="btn-floating waves-effect waves-light blue loadserv" id="m{$SERV[LE][0]}" href="#modal-servicios" title="Editar Servicio"><i class="fa fa-pencil-square-o"></i></a>
    <a class="btn-floating waves-effect waves-light red delete" modulo="servicio" id="d{$SERV[LE][0]}" title="Eliminar Producto"><i class="fa fa-times"></i></a>
</td>
</tr>
{/section}
</tbody>
</table>
</div>
</div>
</div>
    
<div id="modal-servicios" class="modal modal-fixed-footer" style="width:70%;height:90%">
    <div class="modal-content">
        <h4 class="accmodal">Agregar Servicio</h4><hr>
        <nav class="blue">
            <div class="nav-wrapper">
                <ul class="left">
                    <li class="menuS active" id="ms1"><a>Datos Servicios</a></li>
                    <li class="menuS" id="ms2"><a>Financiero</a></li>
                </ul>
            </div>
        </nav>
        <br>
        <form id="fservicios">
            <div id="datosservicios">
                <input type="hidden" id="vidmoneda" value="1">
                <input type="hidden" id="vid" value="0">
                <input type="hidden" id="vidproveedor" value="0">
                <input type="hidden" id="vidusuario" value="">
                <div class="row">
                    <div class="input-field col s6">
                        <input id="vcodigo" type="text" class="validate">
                        <label for="vcodigo">Código de Servicio</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="vnombre" type="text" class="validate">
                        <label for="vnombre">Nombre de Servicio</label>
                    </div>
                    <div class="input-field col s12">
                        <textarea id="vdescripcion" class="materialize-textarea" length="150"></textarea>
                        <label for="vdescripcion">Descripción del Servicio</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m12">
                        <div class="row">
                            <div class="col s3 m3">
                                <input type="checkbox" id="isPeriodo" value="0">
                                <label for="isPeriodo">Por Periodo</label>
                                <input type="hidden" id="vperiodo" value="0">
                            </div>
                            <div class="col s2 m2 opPeriodo">
                                <input type="radio" class="with-gap cper" id="diario" valor="1" name="speriodo" disabled>
                                <label for="diario">Diario</label>
                            </div>
                            <div class="col s2 m2 opPeriodo">
                                <input type="radio" class="with-gap cper" id="mensual" valor="2" name="speriodo" disabled>
                                <label for="mensual">Mensual</label>
                            </div>
                            <div class="col s2 m2 opPeriodo">
                                <input type="radio" class="with-gap cper" id="anual" valor="3" name="speriodo" disabled>
                                <label for="anual">Anual</label>
                            </div>
                            <div class="col s2 m2 opPeriodo" id="dotros">
                                <input type="radio" class="with-gap cper" id="otros" valor="4" name="speriodo" disabled>
                                <label for="otros">Otros:</label>
                                <input type="hidden" id="botro" value="0">
                            </div>
                            <div class="input-field col s3 m3 hide" id="dhotro">
                                <input id="vdias" type="number" class="validate" min="1" value="0">
                                <label for="vdias">Período en Días</label>
                            </div>
                        </div>
                    </div>
                </div><br>
                <div class="row">
                    <div class="col s12 m3">
                        <input type="checkbox" id="outsourcing" value="0">
                        <label for="outsourcing">Outsourcing</label>
                        <input type="hidden" id="boutsrc" value="0">
                    </div>
                <!-- </div> -->
                <!-- <div class="row"> -->
                    <div class="input-field col s12 m6">
                        <select id="prov" disabled>
                        <option value="0" disabled selected>Proveedor</option>
                        {section name=LE loop=$CLI}
                        <option value="{$CLI[LE][0]}">{$CLI[LE][1]}</option>
                        {/section}
                        </select>
                        <label>Seleccione un Proveedor</label>
                    </div>
                </div>
            </div>
            <div id="financiero" class="hide">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">¢</i>
                        <input id="vpbase" type="number" class="validate" min="1">
                        <label for="vpbase">Precio Base</label>
                    </div>
                    <div class="input-field col s6">
                        <i class="material-icons prefix">¢</i>
                        <input id="vpcompra" type="number" class="validate" min="1">
                        <label for="vpcompra">Precio Compra</label>
                    </div>
                    <div class="input-field col s6">
                        <i class="material-icons prefix">%</i>
                        <input id="vpganancia" type="number" class="validate" min="1" value="0.00">
                        <label for="vganancia">Ganancia</label>
                    </div>
                </div>
                
            </div>

        </form>
        </div>
        <div class="modal-footer">
            <!-- <a class="modal-action waves-effect waves-light btn-flat blue lighten-1 white-text" id="prueba">Prueba</a> -->
            <a class="modal-action waves-effect waves-light btn-flat blue white-text add" id="addserv" modulo="servicio">Agregar</a>
            <a class="modal-action modal-close waves-effect waves-light btn-flat grey lighten-1 white-text">Salir</a>
    </div>
</div>