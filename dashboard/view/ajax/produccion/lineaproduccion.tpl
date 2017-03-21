<ul class="collapsible" data-collapsible="accordion">
    <li class="productline" id="pl1">
        <div class="collapsible-header active"><i class="material-icons">add_circle</i>Agregar Tareas de Producción</div>
        <div class="collapsible-body row tasks">
            <div class="col s6 m6 l6">
                <div class="row" id="ftareaproducciones">
                    <div class="input-field col s6 m6 l6">
                        <input id="vnombre" type="text" class="validate" ku="1" autocomplete="off">
                        <label for="vnombre">Tarea de Producción</label>
                        <input type="hidden" id="vid" value="0">
                    </div>
                    <div class="col s1 m1 l1">
                        <a class="waves-effect waves-light btn-floating white-text blue add mbutton" id="addlinea" modulo="tareaproduccione"><i class="material-icons">add</i></a>
                    </div>
                </div>
            </div>
            <div class="col s6 m6 l6">
                <table class="table responsive-table striped bordered highlight centered" id="data-table-tareaproducciones" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th style="width: 20%">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listatareaproducciones">
                        {section name=LE loop=$LPR}
                        <tr>
                            <td>{$LPR[LE][1]}</td>
                            <td>
                                <a class="btn-color pbtn load" id="m{$LPR[LE][0]}" modulo="tareaproduccione"><i class="material-icons">edit</i></a>
                                <a class="btn-color pbtn cdel delete" id="d{$LPR[LE][0]}" modulo="tareaproduccione"><i class="material-icons">close</i></a>
                            </td>
                        </tr>
                        {/section}
                    </tbody>
                </table>
            </div>
        </div>
    </li>
    <li class="productline" id="pl2">
        <div class="collapsible-header"><i class="material-icons">assignment</i>Crear Linea de Producción</div>
        <div class="collapsible-body tasks">
            <div class="row" id="drecipe">
                <div class="input-field col s4 m4 l4 dcline">
                    <a class="material-icons prefix pbtn blue-text mbutton" id="searchrecetas" href="#modal-search">search</a>
                    <input id="vreceta" type="text" class="validate autocomplete" autocomplete="off">
                    <label for="vreceta">Receta</label>
                </div>
            </div>
            <div class="row hide dcline mbotcero">
                <div class="col s3 m3 l3">
                    <p class="flow-text namereceta"></p>
                    <input type="hidden" id="aautoinc" value="0">
                </div>
                <div class="s49 m49 l49"></div>
            </div>
            <div class="row hide dcline">
                <div class="input-field col s3 m3 l3 mtopcero">
                    <input id="atarea" type="text" class="validate autocomplete faddline tarea">
                    <label for="atarea">Tarea de Producción</label>
                </div>
                <div class="input-field col s3 m3 l3 mtopcero">
                    <input id="aestimado" type="number" class="validate faddline aestimado" min="0">
                    <label for="aestimado">Tiempo Estimado</label>
                </div>
                <div class="input-field col s2 m2 l2 mtopcero">
                    <select type="select" id="aunidad" class="faddline">
                        <option value="0">Seleccione una Opción</option>
                        {section name=LE loop=$UNI}
                        <option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>
                        {/section}
                    </select>
                    <label for="aunidad">Unidad</label>
                </div>
                <div class="col s1 m1 l1">
                    <button type="button" class="btn-floating waves-effect waves-light blue mbutton faddline" id="addprodline"><i class="material-icons">add</i></button>
                </div>
            </div>
            <div class="row hide" id="tablelineas">
                <div class="col s2 m2 l2"></div>
                <div class="col s8 m8 l8">
                    <table class="table responsive-table striped bordered highlight centered" id="data-table-detalles" cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <td colspan="4"></td>
                                <td class="right"><i class="material-icons btn-color pbtn blueh" id="savelinea">save</i></td>
                            </tr>
                            <tr>
                                <th>Tarea</th>
                                <th>Tiempo Est.</th>
                                <th>Unidad</th>
                                <th style="width: 20%">Orden</th>
                                <th style="width: 20%">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listadetalles">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </li>
    <li class="productline" id="pl3">
        <div class="collapsible-header"><i class="material-icons">build</i>Mantenimeinto Lineas de Producción</div>
        <div class="collapsible-body tasks">
            <div class="row">
                <div class="col s4 m4 l4">
                    <table class="table striped bordered highlight centered" id="data-table-mantlinea" cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <th>Receta</th>
                                <th style="width: 25%">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listamantlinea"></tbody>
                    </table>
                </div>
                <div class="col s8 m8 l8 hide" id="dactrec">
                <input type="hidden" id="bautoinc" value="0">
                    <div class="row">
                        <div class="input-field col s4 m4 l4">
                            <input id="btarea" type="text" class="validate autocomplete tarea">
                            <label for="btarea">Tarea Producción</label>
                        </div>
                        <div class="input-field col s3 m3 l3">
                            <input id="bestimado" type="number" class="validate bestimado">
                            <label for="bestimado">Estimado</label>
                        </div>
                        <div class="input-field col s3 m3 l3">
                            <select id="bunidad" type="select">
                                <option value="0">Seleccione una Opción</option>
                                {section name=LE loop=$UNI}
                                <option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>
                                {/section}
                            </select>
                            <label for="bunidad">Unidad</label>
                        </div>
                        <div class="col s2 m2 l2">
                            <button type="button" class="btn-floating waves-effect waves-light blue"><i class="material-icons">add</i></button>
                        </div>
                    </div>
                    <div class="row">
                        <table class="table responsive-table striped bordered highlight centered" id="data-table-detprod" cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <td colspan="4"></td>
                                <td class="right"><i class="material-icons btn-color pbtn blueh" id="dsavelinea">save</i></td>
                            </tr>
                            <tr>
                                <th>Tarea</th>
                                <th>Tiempo Est.</th>
                                <th>Unidad</th>
                                <th style="width: 20%">Orden</th>
                                <th style="width: 20%">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listadetprod"></tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </li>
</ul>

<div id="modal-search" class="modal bottom-sheet">
    <div class="modal-content row">
        <div class="col s12 m12 l12">
            <table class="table responsive-table striped bordered highlight centered" id="data-table-search" cellspacing="0" width="100%" >
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th style="width: 20%">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listasearch">
                </tbody>
            </table>
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
    </div>
</div>

<div id="modal-linea" class="modal bottom-sheet">
    <div class="modal-content row">
        <div class="col s12 m12 l12" id="dtableline">
            <table class="table responsive-table striped bordered highlight centered" id="data-table-linea" cellspacing="0" width="100%" >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="listalinea">
                </tbody>
            </table>
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
    </div>
</div>

<div id="modal-detallerecetas" class="modal modal-fixed-footer">
    <div class="modal-content" style="padding: 0px;">
        <div style="padding: 10px 15px 0 15px">
            <table class="table responsive-table striped bordered highlight centered" id="data-table-detallerecetas" cellspacing="0" width="100%" >
                <thead>
                    <tr>
                        <th>Ingredientes</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody id="listadetallerecetas"></tbody>
            </table>
        </div>
        
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
    </div>
</div>