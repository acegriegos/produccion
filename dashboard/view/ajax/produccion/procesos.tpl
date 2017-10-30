<!-- hacer 2 div en donde cada uno tenga como encabezado creacion de procesos y edicion de procesos para futura version, esto para hacer que el sistema permita agregar varias procesos a las vez mientras que tambien pueda editar procesos mientras agrega procesos -->
<div class="row">
    <div class="col s12 m12 l12">
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header active"><i class="mdi mdi-tab-plus mdi-24px"></i>Crear Proceso</div>
                <div class="collapsible-body row" style="margin-top: 15px">
                    <div class="col s12 m12 l8 per5001">
                        <div class="row raddproceso">
                            <div class="input-field col s12 m5 l5">
                                <input id="vnombre" type="text" autocomplete="off">
                                <label for="vnombre">Nombre del Proceso</label>
                                <input type="hidden" id="acount" value="0">
                                <input type="hidden" id="aspot" value="0">
                            </div>
                            <div class="input-field col s12 m5 l5">
                                <input id="vcodigo" type="text" autocomplete="off">
                                <label for="vcodigo">Codigo del Proceso</label>
                            </div>
                            <div class="col s2 m2 l2">
                                <span class="mdi mdi-plus-circle mdi-36px blue-text pbtn" id="addprocess"></span>
                                <span class="mdi mdi-content-save mdi-36px blue-text pbtn hide" id="edtitcod"></span>
                                <!-- <button type="button" class="btn-floating waves-effect waves-light blue hide" id="edtitcod" title="Editar nombre y codigo del proceso"><i class="material-icons" style="padding-top: 3px">save</i></button> -->
                                <!-- <button type="button" class="btn-floating waves-effect waves-light blue z-depth-5" id="addrecipe"><i class="material-icons">add</i></button> -->
                            </div>
                        </div>
                        <div class="row hide" id="adaddprod">
                            <div class="input-field col s4 m4">
                                <input id="aproducto" type="text" class="autocomplete vproducto">
                                <label for="aproducto">Insumo</label>
                            </div>
                            <div class="input-field col s3 m3">
                                <input id="acantidad" type="number" min="0" class="vcantidad">
                                <label for="acantidad">Cantidad</label>
                            </div>
                            <div class="input-field col s4 m4">
                                <select id="aidunidad" class="vidunidad">
                                    {section name=LE loop=$UNIP}
                                    <option value="{$UNIP[LE][0]}" unidad="{$UNIP[LE][2]}">{$UNIP[LE][1]}</option>
                                    {/section}
                                </select>
                                <label for="aidunidad">Seleccione una Unidad</label>
                            </div>
                            <div class="col s1 m1">
                                <i class="mdi mdi-plus-circle mdi-36px blue-text pbtn addproduct" tipo="a"></i>
                                <!-- <button type="button" class="btn-floating waves-effect waves-light blue" id="addproduct"><i class="material-icons">add</i></button> -->
                            </div>
                        </div>
                        <div class="row" id="amakerecipe">
                            
                        </div>
                    </div>
                    <div class="col s12 l4 ">
                        <table class="table responsive-table striped bordered highlight z-depth-3" id="data-table-procesos" cellspacing="0" >
                            <thead>
                                <tr>
                                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
                                    <th  class="white-text blue" style="border: 0; border-radius: 0px !important;">Total</th>
                                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="listaprocesos">
                                {section name=LE loop=$REC}
                                <tr>
                                    <td style=" padding: 10px;">{$REC[LE][1]}</td>
                                    <td style=" padding: 10px;">{$REC[LE][2]}</td>
                                    <td style=" padding: 10px;">
                                        <a class="btn-color pbtn instoproduct mdi mdi-basket-fill mdi-24px modal-trigger" href="#modal-addtoproducts" id="i{$REC[LE][0]}" title="Ingresar proceso a Inventario Producto Final"></a>
                                        <a class="btn-color pbtn editproceso mdi mdi-pencil mdi-24px" id="m{$REC[LE][0]}"></a>
                                        <a class="btn-color pbtn cdel delproceso mdi mdi-close mdi-24px" id="d{$REC[LE][0]}"></a>
                                    </td>
                                </tr>
                                {/section}
                            </tbody>
                        </table>
                        <ul class="pagination right" vtbl="99" modulo="procesos"></ul>
                    </div>
                </div>
            </li>
            <li>
                <div class="collapsible-header"><i class="mdi mdi-asterisk mdi-24px"></i>Asignar Producto como Proceso</div>
                <div class="collapsible-body">
                    <div class="row" id="dchargeprod">
                        <div class="input-field col s3 m3 l3">
                            <input type="text" id="cprod" class="validate autocomplete" value="" autocomplete="off">
                            <label for="cprod">Cargar Producto</label>
                        </div>
                        <div class="col s2 m2 l2" style="margin-top: 10px">
                            <i class="mdi mdi-plus-circle mdi-36px blue-text pbtn" id="chargeprod"></i>
                        </div>
                    </div>
                    <div class="row hide" id="assproc">
                        <div class="row">
                            <div class="col s6 m6 l6" style="margin-top: 15px;">
                                <span id="hprod" style="font-size: 35px"></span><i class="mdi mdi-magnify mdi-36px blue-text pbtn" id="changeprod"></i>
                            </div>
                            <div class="col s6 m6 l6" style="margin-top: 10px;">
                                <p class="marginzero">
                                    <input type="checkbox" class="filled-in" id="includeprice" />
                                    <label for="includeprice">Incluir precio de proceso</label>
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4 m4">
                                <input id="bproducto" type="text" class="autocomplete vproducto">
                                <input type="hidden" id="bcount" value="0">
                                <input type="hidden" id="bspot" value="0">
                                <label for="bproducto">Insumo</label>
                            </div>
                            <div class="input-field col s3 m3">
                                <input id="bcantidad" type="number" min="0" class="vcantidad">
                                <label for="bcantidad">Cantidad</label>
                            </div>
                            <div class="input-field col s4 m4">
                                <select id="bidunidad">
                                    {section name=LE loop=$UNIP}
                                    <option value="{$UNIP[LE][0]}" unidad="{$UNIP[LE][2]}">{$UNIP[LE][1]}</option>
                                    {/section}
                                </select>
                                <label for="bidunidad">Seleccione una Unidad</label>
                            </div>
                            <div class="col s1 m1">
                                <i class="mdi mdi-plus-circle mdi-36px blue-text addproduct" tipo="b"></i>
                                <!-- <button type="button" class="btn-floating waves-effect waves-light blue" id="addproduct"><i class="material-icons">add</i></button> -->
                            </div>
                        </div>
                        <div class="row" id="bmakerecipe"></div>
                    </div>
                </div>
            </li>
            <li class="hide">
                <div class="collapsible-header"><i class="mdi mdi-asterisk mdi-24px"></i>Third</div>
                <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
        </ul>
    </div>
</div>
