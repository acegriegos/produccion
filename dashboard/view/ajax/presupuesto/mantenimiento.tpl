<div class="modal modal-fixed-footer" id="modal-odt">
    <div class="modal-header center">
        Asignar ODT al Presupuesto <span id="gid" tr="0"></span>
    </div>
    <div class="modal-content">
        <div class="row">
            <div class="col s5">
                <label for="nodt">ODT</label>
                <input type="text" class=" autocomplete" id="nodt" placeholder="Buscar y Asignar ODT">

                <div id="fodts" style="border: 1px solid #e2e2e2;padding: 1%;">

                    <input type="hidden" class="zelda">
                    <label class="center">Crear y Asignar ODT</label>
                    <input type="text" id="vcodigo" placeholder="Código" maxlength="10">
                    <input type="text" id="vdescripcion" placeholder="Descripción" maxlength="255">

                    <a href="#" class="btn-floating der add proyect" modulo="odt" title="Crear ODT"><i class="mdi mdi-plus small"></i></a>

                </div>

            </div>

            <div class="col s5">
                <label>Lista de ODT Asignadas</label>
                <div class="listaodt">
                    
                </div>
            </div>

            <div class="col s2">
                <i class="fa fa-trash pbtn black-text" id="qodt" title="Quitar ODT"></i>
            </div>
        </div>
        
    </div>

    <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
        </div>
</div>

<div id="addPre" class="modal modal-fixed-footer" style="width: 90%">
    <div class="modal-header center" id="titpre">

    </div>  
    <div class="modal-content">
      <section id="fpresupuestos">

            <input type="hidden" class="zelda">
            
            <div class="row">
                
                <div class="col s6 m4 input-field">
                    <label for="vcodigo">Código</label>
                    <input type="text" id="vcodigo" maxlength="10">
                </div>

                <div class="col s6 m4 input-field">
                    <label for="vdescripcion">Descripción</label>
                    <input type="text" id="vdescripcion" maxlength="255">
                </div>

                <div class="col s6 m4 input-field">
                    <label for="vidmoneda">Monto</label>
                    <select id="vidmoneda" class="prefix" type="select" noClear="1">
                        {section name=LE loop=$MON}
                            <option value="{$MON[LE][0]}" title="{$MON[LE][2]}">{$MON[LE][1]}</option>
                        {/section}
                    </select>
                    <input type="text" id="monto" maxlength="18" value="0.00" class="eder numeric">
                </div>

            </div>

            <div class="row">

                <div class="col s6 m4">
                    <label>Duración del Presupuesto</label><br>
                    <input name="tfecha" type="radio" id="tp1" class="with-gap" checked />
                    <label for="tp1">Entre Fechas</label>

                    <input name="tfecha" type="radio" id="tp5" class="with-gap" />
                    <label for="tp5">Mes</label>

                    <input name="tfecha" type="radio" id="tp2" class="with-gap" />
                    <label for="tp2">Trimestre</label>

                    <input name="tfecha" type="radio" id="tp6" class="with-gap" />
                    <label for="tp6">Cuatrimestre</label>

                    <input name="tfecha" type="radio" id="tp3" class="with-gap" />
                    <label for="tp3">Semestre</label>

                    <input name="tfecha" type="radio" id="tp4" class="with-gap" />
                    <label for="tp4">Anual</label>
                </div>

                <div class="col s6 m4 input-field general">
                    <i class="fa fa-calendar-o prefix"></i>
                    <input type="date" id="vfecha_inicio" class="datepicker">
                </div>

                <div class="col s6 m4 input-field general">
                    <i class="fa fa-calendar-o prefix"></i>
                    <input type="date" id="vfecha_fin" class="datepicker">
                </div>

                <div class="col s6 m4 input-field rest hide">
                    <label for="ano">Año</label>
                    <input type="number" id="year" min="{'Y'|date}" value="{'Y'|date}" class="validate eder">
                </div>

                <div class="col s6 m4 input-field rest0 hide">
                    
                    <select id="periodo">
                        
                    </select>

                    <label for="periodo" id="plabel">Período</label>
                </div>

            </div>

            <div class="row">
                <div class="col s6 m4">
                    <label for="vidtoempresa">Sucursal Acredora</label>
                    <select id="vidtoempresa" type="select">
                        {section name=LE loop=$SUC}
                            <option name="{$SUC[LE][1]}" value="{$SUC[LE][0]}">{$SUC[LE][1]}</option>
                        {/section}
                    </select>
                </div>

                <div class="col s6 m4">
                    <label for="videstado">Tipo de Presupuesto</label>
                    <select id="videstado" type="select">
                        <option selected value="2">Aprobado</option>
                        <option disabled value="1">Solicitud</option>
                        <option disabled value="5">Segmentado</option>
                    </select>
                </div>
            </div>
            
        </section>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
      <a href="#" class="btn-flat add" modulo="presupuesto" id="btnpre">Guardar</a>
    </div>
  </div>

<div class="row">
    <div class="input-field col s12 m6">
        <a class="prefix mdi mdi-magnify"></a>
        <input type="text" id=".search_productos" maxlength="100" num="v14" var="codigo,descripcion" placeholder="Filtros">
    </div>

    <a href="#addPre" class="btn-floating der pluskey modal-trigger" modulo="presupuesto" title="Ingresar Presupuesto" id="ingPre"><i class="mdi mdi-plus"></i></a>

</div>
    <div class="card-block" style="padding: 0 1% 0 1% ; ">
        <table class="table  bordered striped centered highlight bordered dt-responsive nowrap z-depth-3" id="data-table-presupuestos" cellspacing="0" width="100%" >
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Código</th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Descripción</th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Monto</th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Estado</th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Sucursal</th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Acciones</th>
                </tr>
            </thead>
            <tbody id="listapresupuestos">

            </tbody>

        </table>
        <ul class="pagination right" vtbl="" modulo="" cambio=""></ul>
          <br>
          <br>
    </div>
