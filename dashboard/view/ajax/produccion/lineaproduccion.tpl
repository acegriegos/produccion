<ul class="collapsible pequeño" data-collapsible="accordion">
    <li class="per5101" id="pl1">
        <div class="collapsible-header productline active centro3"><i class="mdi mdi-plus-circle mdi-36px blue-text"></i>Agregar Tareas de Producción</div>
        <div class="collapsible-body row tasks pequeño">
            <div class="col s12 m4 l4 per5102 pequeño" id="ftareaproducciones">
                <div class="row">
                    <div class="input-field col s12 m12 l12">
                        <input type="text" id="vnombre" class="validate" ku="1" autocomplete="off">
                        <label for="vnombre">Tarea de Producción</label>
                        <input type="hidden" id="vid" value="0">
                        <input type="hidden" class="zelda">
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6 m6 l6">
                        <input type="number" id="vhombre" class="validate" min="0">
                        <label for="vhombre">Duración Hombre</label>
                    </div>
                    <div class="input-field col s6 m6 l6">
                        <select type="select" id="vidunidad1" class="vidunidad">
                        <option value="0">Seleccione una opcion</option>
                            {section name=LE loop=$UNI}
                                <option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>
                            {/section}
                        </select>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="input-field col s6 m6 l6">
                        <input type="number" id="vmaquina" class="validate" min="0">
                        <label for="vmaquina">Duración Máquina</label>
                    </div>
                    <div class="input-field col s6 m6 l6">
                        <select type="select" id="vidunidad2" class="vidunidad">
                            <option value="0">Seleccione una opción</option>
                            {section name=LE loop=$UNI}
                                <option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>
                            {/section}
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s8 m4 l4">
                        <input type="text" id="vbandejas" class="validate">
                        <label for="vbandejas">Bandejas</label>
                    </div>
                    <a class="waves-effect waves-light btn blue z-depth-3 white-text blue add mbutton" id="addlinea" modulo="tareaproduccione">Agregar</a>
                </div>
            </div>
            <div class="col s12 m8 l8 pequeño">
                <div class="input-field col s12 m6 l6" style="padding-left: 0%">
                    <i class="mdi mdi-magnify prefix blue-text"></i>
                    <input type="text" id="search_tareaproducciones" class="validate" num="v180" var="vnombre" cambio="134">
                    <label for="search_tareaproducciones">Buscar por nombre</label>
                </div>
                <table class="table pequeño responsive-table striped bordered highlight z-depth-3" id="data-table-tareaproducciones"  >
                    <thead>
                        <tr>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 35% !important">Duración hombre</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 35% !important">Duración maquina</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 30% !important">Bandejas</th>
                            <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listatareaproducciones">
                        {section name=LE loop=$LPR}
                        <tr>
                            <td style=" padding: 10px;">{$LPR[LE][1]}</td>
                            <td style=" padding: 10px;">{$LPR[LE][2]}</td>
                            <td style=" padding: 10px;">{$LPR[LE][3]}</td>
                            <td style=" padding: 10px;">{$LPR[LE][4]}</td>
                            <td style=" padding: 10px;">
                                <a class="btn-color pbtn load" id="m{$LPR[LE][0]}" modulo="tareaproduccione"><i class="mdi mdi-pencil mdi-24px"></i></a>
                                <a class="btn-color pbtn cdel delete" id="d{$LPR[LE][0]}" modulo="tareaproduccione"><i class="mdi mdi-close mdi-24px"></i></a>
                            </td>
                        </tr>
                        {/section}
                    </tbody>
                </table>
                <br>
            </div>
        </div>
    </li>
    <li class="per5103" id="pl2">
        <div class="collapsible-header productline"><i class="material-icons">assignment</i>Crear Linea de Producción</div>
        <div class="collapsible-body tasks">
            <div class="row" id="drecipe">
                <div class="input-field col s12 m6 l4 dcline" id="nac">
                    <a class="material-icons prefix pbtn blue-text mbutton" id="searchprocesos" href="#modal-search">search</a>
                    <input id="vproceso" type="text" class="validate autocomplete" autocomplete="off">
                    <label for="vproceso">Proceso</label>
                </div>
            </div>
            <div class="row hide dcline mbotcero">
                <div class="col s3 m3 l3">
                    <p class="flow-text nameproceso"></p>
                    <input type="hidden" id="aautoinc" value="0">
                </div>
            </div>
            <div class="row hide dcline">
                <div class="input-field col s12 m3 l3 mtopcero">
                    <input id="atarea" type="text" class="validate autocomplete faddline tarea">
                    <label for="atarea">Tarea de Producción</label>
                </div>
                <div class="col s1 m1 l1">
                    <button type="button" class="btn-floating waves-effect waves-light blue mbutton faddline z-depth-5" id="addprodline"><i class="material-icons">add</i></button>
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
                                <th>Duracion Hombre</th>
                                <th>Duracion Máquina</th>
                                <th>Bandejas</th>
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
    <li class="per5104" id="pl3">
        <div class="collapsible-header productline"><i class="material-icons">build</i>Mantenimiento Lineas de Producción</div>
        <div class="collapsible-body tasks">
            <div class="row">
                <div class="col s12 m6 l6">
                <br>
                    <table class="table striped bordered highlight centered z-depth-3" id="data-table-mantlinea" cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Proceso</th>
                                <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listamantlinea"></tbody>
                    </table>
                    <br>
                </div>
                <div class="col s8 m8 l8 hide" id="dactrec">
                <input type="hidden" id="bautoinc" value="0">
                    <div class="row">
                        <div class="input-field col s4 m4 l4">
                            <input id="btarea" type="text" class="validate autocomplete tarea">
                            <label for="btarea">Tarea Producción</label>
                        </div>
                        <div class="col s2 m2 l2">
                            <button type="button" class="btn-floating waves-effect waves-light blue z-depth-5"><i class="material-icons">add</i></button>
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
                                <th>Duracion Hombre</th>
                                <th>Duracion Máquina</th>
                                <th>Bandejas</th>
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
    <li class="per5105" id="pl4">
        <div class="collapsible-header productline"><i class="material-icons">input</i>Asignar Linea de Producción a Proceso</div>
            <div class="collapsible-body tasks">
                <div class="row">
                    <div class="row marginzero">
                        <div class="input-field col s3 m3 l3">
                            <input type="text" id="proc" class="validate autocomplete" autocomplete="off">
                            <label>Proceso</label>
                        </div>
                        <div class="input-field col s3 m3 l3">
                            <input type="text" id="ctarea" class="validate autocomplete tarea">
                            <label for="ctarea">Tarea Producción</label>
                        </div>
                    </div>
                    <div class=" col s9 m9 l9">
                        <table class="table responsive-table striped bordered highlight centered" id="data-table-assTasktoProc" cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <td colspan="4"></td>
                                <td class="right"><i class="material-icons btn-color pbtn blueh" id="savelinea">save</i></td>
                            </tr>
                            <tr>
                                <th>Tarea</th>
                                <th>Duracion Hombre</th>
                                <th>Duracion Máquina</th>
                                <th>Bandejas</th>
                                <th style="width: 20%">Orden</th>
                                <th style="width: 20%">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listaasstp">
                            
                        </tbody>
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

<div id="modal-detalleprocesos" class="modal modal-fixed-footer">
    <div class="modal-content" style="padding: 0px;">
        <div style="padding: 10px 15px 0 15px">
            <table class="table responsive-table striped bordered highlight centered" id="data-table-detalleprocesos" cellspacing="0" width="100%" >
                <thead>
                    <tr>
                        <th>Ingredientes</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody id="listadetalleprocesos"></tbody>
            </table>
        </div>
        
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
    </div>
</div>