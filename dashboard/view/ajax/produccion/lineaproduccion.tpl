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
                <div class="input-field col s4 m4 l4">
                    <input id="anombre" type="text" class="validate">
                    <label for="anombre">Nombre Linea Producción</label>
                </div>
            </div>
            <div class="row hide dcline">
                <div class="input-field col s3 m3 l3 mtopcero">
                    <input id="atarea" type="text" class="validate autocomplete faddline" disabled>
                    <label for="atarea">Tarea de Producción</label>
                </div>
                <div class="input-field col s3 m3 l3 mtopcero">
                    <input id="aestimado" type="number" class="validate faddline" min="0" disabled>
                    <label for="aestimado">Tiempo Estimado</label>
                </div>
                <div class="input-field col s2 m2 l2 mtopcero">
                    <select type="select" id="aunidad" class="faddline" disabled>
                        <option value="0">Seleccione una Opción</option>
                        {section name=LE loop=$UNI}
                        <option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>
                        {/section}
                    </select>
                    <label for="aunidad">Unidad</label>
                </div>
                <div class="col s1 m1 l1">
                    <button type="button" class="btn-floating waves-effect waves-light blue mbutton faddline" id="addprodline" disabled><i class="material-icons">add</i></button>
                </div>
            </div>
            <div class="row hide" id="tablelineas">
                <div class="col s2 m2 l2"></div>
                <div class="col s8 m8 l8">
                    <table class="table responsive-table striped bordered highlight centered" id="data-table-detalles" cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <td>Nombre: <span id="nomlinea"></span></td>
                                <td colspan="3"></td>
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
                                <th>Nombre</th>
                                <th>Receta</th>
                                <th style="width: 20%">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listamantlinea"></tbody>
                    </table>
                </div>
                <div class="col s8 m8 l8 hide" id="dactrec">
                    <div class="row marginzero">
                        <div class="input-field col s4 m4 l4">
                            <!-- <a class="material-icons prefix pbtn btn-color blueh mbutton">save</a> -->
                            <input id="vnomlinea" type="text" class="validate mbotcero"><!-- imp -->
                            <label for="vnomlinea">Nombre Linea</label>
                        </div>
                        <div class="input-field col s4 m4 l4">
                            <i class="material-icons prefix pbtn mbutton blue-text" id="chrecipe">search</i>
                            <input id="actrec" type="text" readonly>
                            <input type="hidden" id="bautoinc" value="0">
                            <label for="actrec">Receta</label>
                        </div>
                    </div>
                    <div class="row marginzero">
                        <div class="input-field col s4 m4 l4 marginzero">
                            <input id="vtarea" type="text" class="validate autocomplete">
                            <label for="vtarea">Tarea Producción</label>
                        </div>
                        <div class="input-field col s3 m3 l3 marginzero">
                            <input id="testimado" type="number" class="validate">
                            <label for="testimado">Estimado</label>
                        </div>
                        <div class="input-field col s3 m3 l3 marginzero">
                            <select id="tuni" type="select">
                                <option value="0">Seleccione una Opción</option>
                                {section name=LE loop=$UNI}
                                <option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>
                                {/section}
                            </select>
                            <label for="tuni">Unidad</label>
                        </div>
                        <div class="col s2 m2 l2">
                            <button type="button" class="btn-floating waves-effect waves-light blue"><i class="material-icons">add</i></button>
                        </div>
                    </div>
                    <div class="row">
                        <table class="table responsive-table striped bordered highlight centered" id="data-table-detprod" cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <td>Nombre: <span id="nl"></span></td>
                                <td colspan="3"></td>
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
                        <th>Tiempo Est.</th>
                        <th>Horas Hombre</th>
                        <th>Horas Maquina</th>
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