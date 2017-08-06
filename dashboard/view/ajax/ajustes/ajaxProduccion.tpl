<div class="card card-block z-depth-5 pequeño">
 <h3 class=" center-align">Variables de Producción</h3>
  
    <div class="row pequeño">
        <div id="fvariablesproducciones" class="col s12 m5 pequeño">
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
        <div class="col s12 l7 pequeño">
        <br>
            <table class="table highlight pequeño centered responsive-table striped z-depth-3" id="data-table-vp" cellspacing="0" width="100%">
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

<div class="card card-block z-depth-5 pequeño">
 <h3 class=" center-align">Asignar Inventarios a Producción</h3>

    <div class="row pequeño" id="fproduccioninventarios">
        <div class="col s12 m4 l4 pequeño">
        	<input type="hidden" id="xid" value="0">
        	<input type="hidden" id="vidsucursal" value="">
        	<label for="videtapa">Seleccione una Etapa de Producción</label>
        	<select id="videtapa" type="select">
        		<option value="0">Seleccione una Opción</option>
        		{section name=LE loop=$ET}
        		<option value="{$ET[LE][0]}">{$ET[LE][1]}</option>
        		{/section}
        	</select>
        </div>
        <div class="col s12 m4 l4 inv" id="dbod">
        	<label for="xidbodega">Seleccione una Bodea</label>
        	<select id="xidbodega" type="select"></select>
        </div>
        <div class="col s12 m4 l4 inv" id="dinv">
        	<label for="xidinventario">Seleccione un Inventario</label>
        	<select id="xidinventario" type="select"></select>
        </div>
    </div>
    <div class="row">
    	<a class="waves-effect waves-light blue btn right add inv" modulo="produccioninventario">Guardar</a>
    </div>
    <div class="row">
    	<div class="col s12 m12 l12 pequeño">
    		<table class="table responsive-table pequeño centered striped bordered highlight z-depth-5" id="data-table-productos" cellspacing="0" width="100%" >
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Etapa</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Inventario</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 100%" >Acciones</th>
                </tr>
            </thead>
            <!-- aqui quede -->
            <tbody id="listaproduccioninventarios">
            	{section name=LE loop=$PINV}
                <tr>
                    <td style=" padding: 10px;">{$PINV[LE][1]}</td>
                    <td style=" padding: 10px;">{$PINV[LE][2]}</td>
                    <td>
                        <a class="btn-color pbtn salidainv material-icons per4104" id="s{$PINV[LE][0]}" href="#modal-movinventario" title="Movimiento de Inventario" style="font-size: 2em; color: #607d8b">compare_arrows</a>
                        <a class="btn-color pbtn editprod material-icons per4108" id="m{$PINV[LE][0]}" href="#modal-productos" title="Editar Producto" style="font-size: 2em; color: #607d8b">edit</a>
                        <a class="btn-color pbtn cdel delprod material-icons per4109" id="d{$PINV[LE][0]}" title="Eliminar Producto" style="font-size: 2em; color: #607d8b">close</a>
                    </td>
                </tr>
            {/section}
            </tbody>
        </table>
    	</div>
    </div>
</div>

<div id="modal-assignservices" class="modal modal-fixed-footer" style="width:70%;height:90%">
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
				<label for="vidinvent">Seleccionar Inventario</label>
				<select id="vidinvent" type="select"></select>
			</div>
		</div>
		<div class="row">
			<div class="input-field col s6 m6 l6 inv" id="dserv">
				<select id="vidserv" type="select" multiple></select>
				<label>Seleccione un Servicio</label>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<a class="modal-action modal-close waves-effect waves-red btn-flat ">Salir</a>
		<a class="modal-action waves-effect waves-green btn-flat" id="addservprod">Guardar</a>
	</div>
</div>

<div id="modal-servsasoc" class="modal modal-fixed-footer" style="width:70%;height:90%">
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
	            <tbody id="listaserviciosproducciones"></tbody>
	        </table>
        <div id="fserviciosproducciones">
			<input type="hidden" id="vid" value="0">
			<input type="hidden" id="vidvariable" value="0">
			<input type="hidden" id="vidinventario" value="0">
			<input type="hidden" id="vidservicio" value="0">
			<input type="hidden" id="vidsucursal" value="">
			<input type="hidden" id="vidusuario" value="">
        </div>
		</div>
	</div>
	<div class="modal-footer">
		<a class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
		<a class="modal-action waves-effect waves-green btn-flat" id="addservprod">Guardar</a>
	</div>
</div>