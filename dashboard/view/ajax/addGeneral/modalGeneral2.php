<div id="modal-generalServicio" class="modal modal-fixed-footer grandemodal" style="width:70%;height:90%">
    <div id="fservicios">
        <div class="modal-header">
            <ul class="tabs blue">
                <li class="tab col s3"><a class="white-text menuS active" id="ms1" href="#">Datos Servicio</a></li>
            </ul>
        </div>
        <div class="modal-content" style="padding: 0px;">
            <input type="hidden" class="zelda">
            <div id="datosservicios" style="padding: 25px 10px 0 10px">
                <div class="row">
                    <div class="input-field col s12 m6 l6" style="margin: 0">
                        <input id="vcodigo" type="text" class="validate" autocomplete="off">
                        <label for="vcodigo">Código de Servicio</label>
                    </div>
                    <div class="input-field col s12  m6 l6" style="margin: 0">
                        <!-- <a class="prefix modal-trigger" href="#hextra"><i class="mdi mdi-help pbtn"></i></a> -->
                        <input id="vnombre" type="text" class="validate" autocomplete="off">
                        <label for="vnombre">Nombre de Servicio</label>
                    </div>
                    <div class="input-field col s12 " style="margin: 0">
                        <textarea id="vdescripcion" type="textarea" class="materialize-textarea" length="150" style="margin: 0"></textarea>
                        <label for="vdescripcion">Descripción del Servicio</label>
                    </div>
                    <div class="input-field col s6">
                        <select type="select" id="vidinventario">
                            <option value="0">Seleccione una opción</option>
                        </select>
                        <label for="vidinventario">Seleccione un inventario</label>
                    </div>
                </div>
                <div class="row hide">
                    <div class="col s12 m12">
                        <div class="row" style="margin: 0">
                            <div class="col s12 m12 l3">
                                <input type="checkbox" id="isPeriodo" value="0">
                                <label for="isPeriodo">Por Periodo</label>

                                <input type="hidden" id="vperiodo" value="0">
                            </div>

                            <div class="col s6 l2 opPeriodo">
                                <br>
                                <input type="radio" class="with-gap cper" id="diario" valor="1" name="speriodo" disabled>
                                <label for="diario">Diario</label>
                            </div>
                            <div class="col s6 l2 opPeriodo">
                                <br>
                                <input type="radio" class="with-gap cper" id="mensual" valor="2" name="speriodo" disabled>
                                <label for="mensual">Mensual</label>
                            </div>
                            <div class="col s6 l2 opPeriodo">
                                <br>
                                <input type="radio" class="with-gap cper" id="anual" valor="3" name="speriodo" disabled>
                                <label for="anual">Anual</label>
                            </div>
                            <div class="col s6 l2 opPeriodo" id="dotros">
                                <br>
                                <input type="radio" class="with-gap cper" id="otros" valor="4" name="speriodo" disabled>
                                <label for="otros">Otros:</label>
                                <input type="hidden" id="botro" value="0">
                            </div>
                            <div class="input-field col s6 m3 hide" id="dhotro">
                                <input id="vdias" type="number" class="validate" min="1" value="0">
                                <label for="vdias">Período en Días</label>
                            </div>
                        </div><br>
                    </div>
                </div>
                <div class="row hide">
                    <div class="col s12 m3">
                        <input type="checkbox" id="outsourcing" value="0">
                        <label for="outsourcing">Outsourcing</label>
                        <input type="hidden" id="boutsrc" value="0">
                    </div>
                    <!-- </div> -->
                    <!-- <div class="row"> -->
                    <div class="input-field col s12 m6 ">
                        <select id="prov" disabled>
                            <br><option value="0" disabled selected>Seleccione un Proveedor</option>
                            {section name=LE loop=$CLI}
                            <option value="{$CLI[LE][0]}">{$CLI[LE][1]}</option>
                            {/section}
                        </select>
                    </div>
                    <div class="col s12 m3">
                        <div class="switch">
                            <label>
                            <input type="checkbox" id="servpro">
                            <span class="lever"></span>
                            Servicio Profesional
                            </label>
                            <input type="hidden" id="vservprofesional">
                        </div>
                    </div>
                </div>
                <div class="row hide">
                    <div class="col s6 m6 l6 input-field" id="dinvent">
                        <!--  -->
                        <select id="vidinventario" type="select"></select>
                        <label for="vidinventario">Inventarios</label>
                    </div>

                    <div class="input-field col s6 m6 hide">
                        <select id="vsucursales" type="select"></select>
                        <label for="vsucursales">Sucursales</label>
                    </div>
                </div>
                <div id="financiero"  style="padding: 25px 10px 0 10px">
                <div class="row">
                    <div class="input-field col s12 m6 hide">
                        <i class="material-icons prefix">¢</i>
                        <input id="vpbase" type="number" class="validate vcalcserv" min="1" num="1">
                        <label for="vpbase">Precio</label>

                    </div>
                    <div class="input-field col s12 m6 hide">
                        <i class="material-icons prefix">%</i>
                        <input id="vpganancia" type="number" class="validate vcalcserv" min="1" value="100.00" num="2">
                        <label for="vganancia">Ganancia</label>
                    </div>
                    <div class="input-field col s12 m6 hide">
                        <i class="material-icons prefix">¢</i>
                        <input id="vprecio" type="number" class="validate vcalcserv" num="3">
                        <label for="vprecio">Precio Total</label>
                    </div>
                </div>
            </div>
                <br>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="waves-effect waves-green btn-flat add" modulo="servicio" tp="5">Guardar</button>
            <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
        </div>
    </div>
</div>