<ul class="collapsible" data-collapsible="accordion">
    <li>
        <div class="collapsible-header"><i class="material-icons">add_circle</i>Agregar Tareas de Producción</div>
        <div class="collapsible-body row tasks">
            <div class="col s6 m6 l6">
                <div class="row" id="flineaproducciones">
                    <div class="input-field col s6 m6 l6">
                        <input id="vnombre" type="text" class="validate">
                        <label for="vnombre">Linea de Producción</label>
                        <input type="hidden" id="vid" value="0">
                    </div>
                    <div class="col s1 m1 l1">
                        <a class="waves-effect waves-light btn-floating white-text blue add mbutton" id="addlinea" modulo="lineaproduccione"><i class="material-icons">add</i></a>
                    </div>         
                </div>
            </div>
            <div class="col s6 m6 l6">
                <table class="table responsive-table striped bordered highlight centered" id="data-table-lineaproducciones" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th style="width: 20%">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listalineaproducciones">
                        {section name=LE loop=$LPR}
                        <tr>
                            <td>{$LPR[LE][1]}</td>
                            <td>
                                <a class="btn-color pbtn load" id="m{$LPR[LE][0]}" modulo="lineaproduccione"><i class="material-icons">edit</i></a>
                                <a class="btn-color pbtn cdel delete" id="d{$LPR[LE][0]}" modulo="lineaproduccione"><i class="material-icons">close</i></a>
                            </td>
                        </tr>
                        {/section}
                    </tbody>
                </table>
            </div>
        </div>
    </li>
    <li>
        <div class="collapsible-header active"><i class="material-icons">assignment</i>Crear Linea de Producción</div>
        <div class="collapsible-body tasks">
            <div class="row" id="drecipe">
                <div class="input-field col s4 m4 l4 dcline">
                    <a class="material-icons prefix pbtn blue-text mbutton" id="searchrecetas" href="#modal-search">search</a>
                    <input id="vreceta" type="text" class="validate">
                    <label for="vreceta">Receta</label>
                </div>
            </div>
            <div class="row hide dcline mbotcero">
                <div class="col s3 m3 l3">
                    <p class="flow-text namereceta"></p>
                    <input type="hidden" id="autoi" value="0">
                </div>
                <div class="input-field col s3 m3 l3">
                    <input id="nombrelinea" type="text" class="validate">
                    <label for="nombrelinea">Nombre Linea Producción</label>
                </div>
            </div>
            <div class="row hide dcline">
                <div class="input-field col s3 m3 l3 mtopcero">
                    <input id="vlinea" type="text" class="validate autocomplete faddline" disabled>
                    <label for="vlinea">Tarea de Producción</label>
                </div>
                <div class="input-field col s3 m3 l3 mtopcero">
                    <input id="vtestimado" type="number" class="validate faddline" disabled>
                    <label for="vtestimado">Tiempo Estimado</label>
                </div>
                <div class="input-field col s2 m2 l2 mtopcero">
                    <select type="select" id="viduni" class="faddline" disabled>
                        <option value="0">Seleccione una Opción</option>
                        {section name=LE loop=$UNI}
                        <option value="{$UNI[LE][0]}" class="viduni">{$UNI[LE][1]}</option>
                        {/section}
                    </select>
                    <label for="viduni">Unidad</label>
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
                                <th>Estimado</th>
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
    <li>
        <div class="collapsible-header"><i class="material-icons">play_arrow</i>Iniciar Producción</div>
        <div class="collapsible-body row tasks">

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