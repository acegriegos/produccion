
<a id="ingRut" class="der btn-floating tooltipped modal-trigger pluskey der" data-position="left" data-tooltip="Ingresar Ruta" href="#modal-rutas"><i class="large material-icons ">add</i></a>


<div class="row">

    <div class="input-field col s4">
        <a class="prefix dropdown-button tooltipped"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="small material-icons">search</i></a>
        <ul id='filtr_1' class='dropdown-content'>
            <li><a class="optns" tipo="nombre" href="#!" fltr="1">Nombre</a></li>
            <li class="hide"><a class="optns" tipo="vcedula" href="#!" fltr="2">Encargado</a></li>
            <li class="hide"><a class="optns" tipo="telefonos" href="#!" fltr="3">Cliente</a></li>
        </ul>
        <input type="text" id="search_rutas" maxlength="100" num="v208" var="nombre">
        <label class="truncate" for="search_rutas">Buscar Ruta por Nombre</label>
    </div>

    <div class="card-block col s8">
            <table  class="table centered highlight bordered responsive-table z-depth-3" id="data-table-rutas">
                <thead>
                    <tr>
                        <th class="sinborde white-text blue" >Código</th>
                        <th class="sinborde white-text blue" >Ruta</th>
                        <th class="sinborde white-text blue" >Acciones</th>
                    </tr>
                </thead>
                <tbody id="listarutas">
                    {section name=LE loop=$RUT}
                    <tr id="f{$RUT[LE][0]}">
                        <td style=" padding: 10px;">{$RUT[LE][2]}</td>
                        <td style=" padding: 10px;">{$RUT[LE][1]}</td>
                        <td>
                        
                            <a href="#" class="der delete pbtn" modulo="ruta" id="d{$RUT[LE][0]}" style="font-size: 2em; color: #607d8b"><i class="fa fa-trash"></i></a>    
                            
                            <a href="#modal-rutas" class="der load pbtn" id="m{$RUT[LE][0]}" modulo="ruta" style="font-size: 2em; color: #607d8b"><i class="fa fa-pencil"></i></a>
                            
                            <a href="#!" class="der pbtn" id="z{$RUT[LE][0]}" style="font-size: 2em; color: #607d8b" title="Zona de Carga y Descarga"><i class="fa fa-truck"></i></a>

                            <a href="#modal-ruser" class="der luser pbtn" id="u{$RUT[LE][0]}" style="font-size: 2em; color: #607d8b" title="Encargados de la Ruta"><i class="fa fa-vcard-o"></i></a>

                            <a href="#modal-rcliente" class="der lcliente pbtn" id="c{$RUT[LE][0]}" style="font-size: 2em; color: #607d8b" title="Clientes de la Ruta"><i class="fa fa-group"></i></a>
                        </td>
                    </tr>
                    {/section}
                </tbody>
            </table>
    </div>
</div>

 <div class="modal modal-fixed-footer" id="modal-rutas" style="height: 210px;">
    <div class="modal-header blue white-text center">
        <span id="titrut">Ingresar Ruta</span>
    </div>
    <div class="modal-content" >
        <div id="frutas">
            <input type="hidden" id="vid">
            <div class="row">
                <div class="col s6 input-field">
                    <label for="vnombre">Nombre de la Ruta</label>
                    <input type="text" id="vnombre">
                </div>

                <div class="col s6 input-field">
                    <label for="vcodigoruta">Código de la Ruta</label>
                    <input type="text" id="vcodigoruta">
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">

        <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        <button type="button" class="waves-effect waves-green btn-flat add" modulo="ruta" varias="0" id="garuta">Guardar</button>
</div>
</div>

 <div class="modal modal-fixed-footer" id="modal-ruser" style="width: 85%;">
    <div class="modal-header blue white-text center">
        <span>Ruteros</span>
    </div>
    <div class="modal-content" >

        <div class="row">
            <div class="col s8">
                <div class="row">

                    <div class="input-field col s6">
                        <label>Tipo de Rutero</label>
                        <select class="browser-default">
                            <option value="1" selected>Usuarios</option>
                        </select>
                    </div>

                    <div class="input-field col s6">
                        <label>Usuario</label>
                        <select class="browser-default">
                            <option value="1" selected>Usuarios</option>
                        </select>
                    </div>

                </div>
                
            </div>
            <div class="col s4">
                <div class="collection">
                    <a href="#!" class="collection-item">Alan</a>
                </div>
            </div>
        </div>  
        
    </div>
</div>