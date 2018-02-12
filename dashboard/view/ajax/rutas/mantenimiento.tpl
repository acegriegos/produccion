
<a id="ingRut" class="der btn-floating tooltipped modal-trigger pluskey der" data-position="left" data-tooltip="Ingresar Ruta" href="#modal-rutas"><i class="mdi mdi-24px mdi-plus"></i></a>


<div class="row">

    <div class="input-field col s4">
        <a class="prefix dropdown-button tooltipped"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="mdi mdi-24px mdi-magnify"></i></a>
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
                    <tr class="white-text blue">
                        <th class="sinborde" >Código</th>
                        <th class="sinborde" >Ruta</th>
                        <th class="sinborde" >Acciones</th>
                    </tr>
                </thead>
                <tbody id="listarutas">
                    {section name=LE loop=$RUT}
                    <tr id="f{$RUT[LE][0]}">
                        <td style=" padding: 10px;">{$RUT[LE][2]}</td>
                        <td style=" padding: 10px;" id="rn{$RUT[LE][0]}">{$RUT[LE][1]}</td>
                        <td>
                        
                            <a href="#" class="der delete pbtn" modulo="ruta" id="d{$RUT[LE][0]}" style="font-size: 2em; color: #607d8b" title="Eliminar Ruta"><i class="mdi mdi-24px mdi-delete"></i></a>    
                            
                            <a href="#modal-rutas" class="der load pbtn crut modal-trigger" id="m{$RUT[LE][0]}" modulo="ruta" style="font-size: 2em; color: #607d8b"><i class="mdi mdi-24px mdi-pencil" title="Editar Ruta"></i></a>
                            
                            <a href="#!" class="der pbtn" id="z{$RUT[LE][0]}" style="font-size: 2em; color: #607d8b" title="Zona de Carga y Descarga"><i class="mdi mdi-24px mdi-truck"></i></a>

                            <a href="#modal-ruser" class="der luser pbtn modal-trigger" id="u{$RUT[LE][0]}" style="font-size: 2em; color: #607d8b" title="Encargados de la Ruta"><i class="mdi mdi-24px mdi-vcard-o"></i></a>

                            <a href="#modal-rcliente" class="der lcliente pbtn modal-trigger" id="c{$RUT[LE][0]}" style="font-size: 2em; color: #607d8b" title="Clientes de la Ruta"><i class="mdi mdi-24px mdi-group"></i></a>
                        </td>
                    </tr>
                    {/section}
                </tbody>
            </table>
    </div>
</div>

 <div class="modal modal-fixed-footer" id="modal-rutas" style="height: 210px;">
    <div class="modal-header blue white-text center">
        <span id="titrut" style="font-size: 22px">Ingresar Ruta</span>
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


<div class="modal modal-fixed-footer" id="modal-rcliente" style="width: 95%;">
    <div class="modal-header blue white-text center">
        <span style="font-size: 22px">Clientes de la Ruta <span class="titr"></span> </span>
    </div>
    <div class="modal-content" >
        <input type="hidden" id="cidruta">
        <div class="row">
            <div class="col s12 m4">
                <div class="input-field">
                    <i class="mdi mdi-24px mdi-user prefix"></i>
                    <label for="ncli" style="color: black"> <b>Ingresar Cliente</b></label>
                    <input type="text" id="ncli" value="" class="autocomplete validate" maxlength="64" />
                    <input type="hidden" id="idcli">
                </div>
                <div class="input-field">
                    <i class="mdi mdi-24px mdi-search prefix"></i>
                    <label for="seachcliente" style="color: black"> <b>Buscar Cliente</b></label>
                    <input type="text" id="seachcliente" class="validate" maxlength="64" />
                </div>
            </div>

            <div class="col s12 m8">
                <table  class="table centered highlight bordered responsive-table z-depth-3" id="data-table-rutaclientes">
                    <thead>
                        <tr class="white-text blue">
                            <th class="sinborde">Cliente</th>
                            <th class="sinborde">Ventas</th>
                            <th class="sinborde">Pedidos</th>
                            <th class="sinborde">Cobros</th>
                            <th class="sinborde">Notas</th>
                            <th class="sinborde">Devoluciones</th>
                        </tr>
                    </thead>
                    <tbody id="listarutaclientes">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

 <div class="modal modal-fixed-footer" id="modal-ruser" style="width: 85%;">
    <div class="modal-header blue white-text center">
        <span style="font-size: 22px">Ruteros <span class="titr"></span> </span>
    </div>
    <div class="modal-content" >

        <div class="row">
            <div class="col s8" id="fdetallerutas">
                <div class="row">
                    <input type="hidden" id="vidruta">
                    <input type="hidden" id="vid">
                    
                    <div class="input-field col s6">
                        
                        <select id="vidtabla_enc" type='select'>
                            <option value="1" selected>Usuarios</option>
                        </select>

                        <label for="vidtabla_enc">Tipo de Rutero</label>
                    </div>

                    <div class="input-field col s6">
                        
                        <select id="vidfila_enc" type='select'>
                            <option value="" selected disabled>Seleccione un Usuario</option>
                            {section name=LE loop=$USRS}
                            <option value="{$USRS[LE][0]}">{$USRS[LE][1]}</option>
                            {/section}
                        </select>

                        <label for="vidfila_enc">Usuario</label>
                    </div>

                </div>

                <div class="row">

                    <div class="input-field col s4">
                        
                        <select id="vidbodega" type="select">
                            <option value="" selected disabled class="truncate">Seleccione una Bodega</option>
                            {section name=LE loop=$BOD}
                            <option value="{$BOD[LE][0]}">{$BOD[LE][1]}</option>
                            {/section}
                        </select>

                        <label for="vidinventario">Bodega</label>
                    </div>

                    <div class="input-field col s4">
                        
                        <select id="vidinventario" type="select">
                            <option value="" selected disabled class="truncate">Seleccione un Inventario</option>
                        </select>

                        <label for="vidinventario">Inventario</label>
                    </div>

                    <div class="input-field col s4">
                        
                        <select id="vidvehiculo" type='select'>
                            <option value="" selected disabled>Seleccione un Vehículo</option>
                            {section name=LE loop=$FLOT}
                            <option value="{$FLOT[LE][0]}">{$FLOT[LE][1]}</option>
                            {/section}
                        </select>

                        <label for="vidvehiculo">Vehículo</label>
                    </div>
                </div>

                <div class="row">
                    <a class="btn btn-info der add" id="ingdetrut" href="#" data-delay="50">Ingresar</a>
                    <a class="btn btn-default edd der white black-text" id="goback" href="#"><i class="mdi mdi-24px mdi-angle-left"></i></a>
                </div>

                <div class="fixed-action-btn horizontal edd">
                <a class="btn-floating btn-large red tooltipped" data-position="top" title="Información del Rutero">
                  <i class="large mdi mdi-24px mdi-info"></i>
                </a>
                <ul>

                  <li><a class="btn-floating tooltipped red" data-position="top" title="Ventas"><i class="mdi mdi-24px mdi-line-chart"></i></a></li>

                  <li><a class="btn-floating tooltipped yellow darken-1" data-position="top" title="Devoluciones"><i class="mdi mdi-24px mdi-exchange"></i></a></li>

                  <li><a class="btn-floating tooltipped green" data-position="top" title="Inventario"><i class="mdi mdi-24px mdi-book"></i></a></li>

                  <li><a class="btn-floating tooltipped blue" data-position="top" title="Financiero"><i class="mdi mdi-24px mdi-money"></i></a></li>

                </ul>
              </div>
                
            </div>
            <div class="col s4" >
            <h5>Lista de Ruteros</h5>
                <div class="collection" id="lruteros" style="max-height: 500px;overflow-y: scroll;">
                    
                </div>
            </div>
        </div>  
        
    </div>
</div>