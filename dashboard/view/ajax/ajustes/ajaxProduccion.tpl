<div class="tamLetra">
<div class="card card-block z-depth-5">
    <span class="accmodulo">Variables de Producción</span><hr>
    <div class="row">
        <div id="fvariablesproducciones" class="col s12 m5">
            <div class="input-field col s12 l5">
                <input id="vnombre" type="text" class="validate">
                <label for="vnombre">Nombre de la variable</label>
            </div>
            <div class="input-field col s12 l5">
            	<i class="material-icons prefix">¢</i>
            	<input id="vvalor" type="text" class="validate" value="">
            	<label for="vvalor">Costo de la variable</label>
            	<input type="hidden" id="vidmoneda" value="1">
            	<input type="hidden" id="vid" value="0">
            	<input type="hidden" id="vidsucursal" value="">
            </div>
            <div class="input-field col s12 l2">
  				<button type="button" class="btn-floating waves-effect waves-light blue add material-icons z-depth-5" modulo="variablesproduccione" title="Agregar Variable de Producción" id="addvarprod">add</button>
            </div>
        </div>
        <div class="col s12 l7">
            <table class="table highlight centered responsive-table striped z-depth-3" id="data-table-vp" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Variables</th>
                        <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Valor</th>
                        <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Acciones</th>
                    </tr>
                </thead>
                <tbody id="listavariablesproducciones">
                    {section name=LE loop=$VP}
                    <tr>
                        <td>{$VP[LE][1]}</td>
                        <td>{$VP[LE][2]}</td>
                        <td>
                        	<a class="pbtn btn-color material-icons addserv blueh modal-trigger" id="a{$VP[LE][0]}" href="#modal-assignservices">info_outline</a>
                        	<a class="pbtn btn-color material-icons shserv blueh modal-trigger" id="s{$VP[LE][0]}" href="#modal-servsasoc">announcement</a>
                            <i class="pbtn btn-color material-icons load" id="m{$VP[LE][0]}" modulo="variablesproduccione">edit</i>
                            {if ($VP[LE][0] neq 1) and ($VP[LE][0] neq 2) and ($VP[LE][0] neq 3)}
                            <i class="pbtn btn-color cdel material-icons delete" id="d{$VP[LE][0]}" modulo="variablesproduccione">close</i>
                            {/if}
                        </td>
                    </tr>
                    {/section}
                </tbody>
            </table>
        </div>
    </div>
        
    </div>

<div class="card card-block z-depth-5">
    <span class="accmodulo">Asignar Inventarios a Producción</span><hr>
    <div class="row">
        
    </div>
</div>
</div>

<div id="modal-assignservices" class="modal modal-fixed-footer">
	<div class="modal-header">
		<h4 class="modal-title" style="background-color:#0B3861">Asignar Servicios a Variables de Producción <span class="varprod"></span></h4>
	</div>
	<div class="modal-content" id="fserviciosproducciones">
		<div class="row">
			<div class="col s6 m6 l6">
				<label for="vidbodega">Seleccionar Bodega</label>
				<select id="vidbodega" type="select"></select>
			</div>
			<div class="col s6 m6 l6 inv" id="dinvent">
				<label for="vidinventario">Seleccionar Inventario</label>
				<select id="vidinventario" type="select"></select>
			</div>
		</div>
		<div class="row">
			<div class="input-field col s6 m6 l6 inv" id="dserv">
				<select id="vidservicio" type="select" multiple></select>
				<label>Seleccione un Servicio</label>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<a class="modal-action modal-close waves-effect waves-red btn-flat ">Salir</a>
		<a class="modal-action waves-effect waves-green btn-flat" id="addservprod">Guardar</a>
	</div>
</div>

<div id="modal-servsasoc" class="modal modal-fixed-footer">
	<div class="modal-header">
		<h4 class="modal-title" style="background-color:#0B3861">Servicios Asociados a Variable de Producción <span class="varprod"></span></h4>
	</div>
	<div class="modal-content">
		<div class="row">
			<table class="table responsive-table centered striped bordered highlight z-depth-5" id="data-table-servsasoc" cellspacing="0" width="100%" >
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 40%">Servicio</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 40%">Inventario</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 20%">Acciones</th>
                </tr>
            </thead>
            <tbody id="listaserviciosasociados"></tbody>
        </table>
		</div>
	</div>
	<div class="modal-footer">
		<a class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
		<a class="modal-action waves-effect waves-green btn-flat" id="addservprod">Guardar</a>
	</div>
</div>