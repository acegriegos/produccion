<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-inventarios.css">
<div id="mantinsumos">
<div class="row">
    <div class="col s8 m8 l8"><br>
        <div class="input-field col s8 m8">
            <input id="vfiltro" type="text" class="validate">
            <label for="vfiltro" class="truncate">Buscar por nombre</label>
            
        </div>
        <div class="col s4 m4">
            <a type="button" class="btn-floating waves-effect waves-light blue"><i class="material-icons">search</i></a>
        </div>
    </div>
     

</div>
<div class="row">
    <div class="col-md-12 col-lg-12">
        <div class="table-responsive">
            <table class="table striped bordered responsive-table" id="data-table-inventarios" cellspacing="0" width="100%" >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                        <th style="width: 15%">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listainsumos">
                    {section name=LE loop=$INSU}
                    <tr>
                    	<td>{$INSU[LE][1]}</td>
                        <td>{$INSU[LE][2]}</td>
                        <td>{$INSU[LE][3]}</td>
                        <td>{$INSU[LE][4]}</td>
                        <td>
                            <a class="btn-floating waves-effect waves-light blue load" modulo="insumos" id="m{$INSU[LE][0]}" href="#modal-insumos"><i class="fa fa-pencil-square-o"></i></a>
                            <a class="btn-floating waves-effect waves-light red del" modulo="insumo" id="d{$INSU[LE][0]}"><i class="fa fa-times"></i></a>
                        </td>
                    </tr>
                    {/section}
                </tbody>
            </table>
        </div>
    </div>
</div>

<div id="modal-insumos" class="modal modal-fixed-footer" style="width:70%;height:90%">
    <div class="modal-content">
        <h4>Agregar Insumo</h4><hr>
        <form id="finsumoss">
        <div class="row">
            <div class="input-field col s6 m6">
                <input id="vnombre" type="text" class="validate">
                <label for="vnombre">Nombre del Insumo</label>
                <input type="hidden" id="vid" value="0">
                <input type="hidden" id="vidmoneda" value="1">
                <input type="hidden" id="vidusuario" value="">
            </div>
            <div class="input-field col s6 m6">
                <input id="vpreciocosto" type="number" class="validate">
                <label for="vpreciocosto">Precio Costo del Insumo</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s6 m6">
                <input id="vcantidad" type="number" class="validate">
                <label for="vcantidad">Cantidad</label>
            </div>
            <div class="input-field col s6 m6">
                <select id="vidunidad" type="select">
                    {section name=LE loop=$UNI}
                    <option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>
                    {/section}
                </select>
            </div>
        </div>
        </form>

    </div>
    <div class="modal-footer">
        <a class="modal-action waves-effect waves-light btn-flat white-text blue add" modulo="insumo" id="addinsumo">Agregar</a>
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
    </div>
</div> <!-- modal-insumos -->

<ul id="nav-tipoinsumo" class="side-nav">
<li></li>
<li><h5 class="center">Agregar Tipo de Insumo</h5></li>
<li><div class="divider"></div></li>
<li></li><br>
<li>
    <form id="ftipoinsumos">
        <div class="input-field col s12 m12">
            <input id="vnombretipo" type="text" class="validate">
            <input id="vidtipo" type="hidden" value="0">
            <label for="vnombretipo">Tipo de Insumo</label>
        </div>
    </form>
    <button type="button" class="btn waves-effect waves-light center blue add" modulo="tipoinsumo" id="addtipo">Agregar</button>
</li>
<li><br><br>
    <div class="table-responsive">
        <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-tipoinsumos" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="listatipoinsumos">
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</li>
</ul>
<div class="fixed-action-btn toolbar">
    <a class="btn-floating btn-large red">
      <i class="large material-icons">input</i>
    </a>
    <ul>
      <li class="waves-effect waves-light">hola</li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">format_quote</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">publish</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">attach_file</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">insert_chart</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">format_quote</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">publish</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">attach_file</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">insert_chart</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">format_quote</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">publish</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">attach_file</i></a></li>

    </ul>
    <ul>
        
    </ul>
  </div>
</div> <!-- mantinsumo -->