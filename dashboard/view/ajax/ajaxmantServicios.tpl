<div id="mantServ">
<div class="row">
<div class="col s8 m6">
<div class="input-field col s10">
<input id="searchsrv" type="text" class="validate">
<label for="icon_prefix" id="phs">Buscar Nombre</label>
</div>
<a class="dropdown-button btn-floating btn-large waves-effect waves-light green" data-activates="fgrande"><i class="material-icons">search</i></a>
<ul id="fgrande" class="dropdown-content" filter="1">
<li><a class="dropdown-item vfiltros" filtro="f1">Código</a></li>
<li><a class="dropdown-item vfiltros" filtro="f2">Nombre</a></li>
</ul>            
</div>
<div class="col s4 m6">
<a id="ingInvServ" class="btn-floating btn-large waves-effect waves-light right blue" href="#modal-servicios"><i class="material-icons">add</i></a>
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
    <a class="btn-floating waves-effect waves-light blue load" id="m{$PROD[LE][0]}" href="#modal-servicios" title="Editar Servicio" modulo="servicio"><i class="fa fa-pencil-square-o"></i></a>
    <a class="btn-floating waves-effect waves-light red delprod" id="d{$PROD[LE][0]}" title="Eliminar Producto"><i class="fa fa-times"></i></a>

</td>
</tr>
{/section}
</tbody>
</table>
</div>
</div>
</div>
    
<div id="modal-servicios" class="modal modal-fixed-footer" style="width:70%;max-height:100%">
    <div class="modal-content">
        <h4>Agregar Servicio</h4><hr><br>
        <form id="fservicios">
            <input type="hidden" id="vidproveedor" value="0">
            <input type="hidden" id="vidmoneda" value="1">
            <input type="hidden" id="idServ" value="0">
            <input type="hidden" id="vid" value="0">
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
                    <textarea id="vdescripcion" class="materialize-textarea" length="45"></textarea>
                    <label for="vdescripcion">Descripción del Servicio</label>
                </div>
            </div>
        </form>
        </div>
        <div class="modal-footer">
            <a class="modal-action waves-effect waves-green btn-flat">Agregar</a>
            <a class="modal-action waves-effect waves-green btn-flat hide">Guardar</a>
            <a class="modal-action waves-effect waves-green btn-flat">Salir</a>
    </div>
</div>

<script src="../assets/js/alertModal.js"></script>