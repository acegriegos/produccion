<br>
<div class="row">
	<div class="col-md-6 col-lg-6">
		<div class="input-group">
		    <div class="input-group-addon"><b>Familia</b></div>
			    <select type="select" id="vidfamilia" class="form-control" required="required" cambio="1">
			        <option value="0">Seleccione una Familia</option>
			        {section name=LE loop=$FAM}
			        <option value="{$FAM[LE][0]}">{$FAM[LE][1]}</option>
			        {/section}
			    </select>
		    	<input type="text" id="newfam" class="form-control" value="" required="required" style="display:none">
		    <div class="input-group-addon" id="dbck1" style="display:none">
		    	<i class="fa fa-reply bbck" tipo="1"></i>
		    </div>
		    <!-- <div class="input-group-addon"><i class="fa fa-plus bjerarquia" id="baddj1" tipo="1" nombre="familia" ref="0"></i></div> -->
		</div><br>
		<div class="input-group">
		    <div class="input-group-addon"><b>Tipo</b></div>
		        <select type="select" id="vidtipo" class="form-control" required="required">
		        	<option value="0">Sin Tipo</option>
		        </select>
		        <input type="text" id="newtip" class="form-control" value="" required="required" style="display:none">
		    <div class="input-group-addon" id="dbck2" style="display:none">
		    	<i class="fa fa-reply bbck" tipo="2"></i>
		   	</div>
		    <!-- <div class="input-group-addon"><i class="fa fa-plus" id="baddj2" tipo="2" nombre="tipo" ref="1" ref1="familia"></i></div> -->
		</div><br>
		<div class="input-group">
		    <div class="input-group-addon"><b>Marca</b></div>
		        <select type="select" id="vidmarca" class="form-control" required="required" cambio="1">
			        <option value="0">Seleccione una Marca</option>
			        {section name=LE loop=$MAR}
			        <option value="{$MAR[LE][0]}">{$MAR[LE][1]}</option>
			        {/section}
		        </select>
		        <input type="text" id="newmar" class="form-control" value="" required="required" style="display:none">
		    <div class="input-group-addon" id="dbck3" style="display:none">
		    	<i class="fa fa-reply bbck" tipo="3"></i>
			</div>
		    <!-- <div class="input-group-addon"><i class="fa fa-plus bjerarquia" id="baddj3" tipo="3" nombre="marca" ref="0"></i></div> -->
		</div><br>
		<div class="input-group">
		    <div class="input-group-addon"><b>Modelo</b></div>
		    	<select type="select" id="vidmodelo" class="form-control" required="required">
		    		<option value="0">Sin Modelo</option>
		    	</select>
		    	<input type="text" id="newmod" class="form-control" value="" required="required" style="display:none">
		    <div class="input-group-addon" id="dbck4" style="display:none">
		    	<i class="fa fa-reply bbck" tipo="4"></i>
		    </div>
		    <!-- <div class="input-group-addon"><i class="fa fa-plus" id="baddj4" tipo="4" nombre="modelo" ref="2" ref1="marca" ref2="tipo"></i>	</div> -->
		</div>
	</div>

	<div class="col-md-6 col-lg-6">
		<div class="input-group">
        	<div class="input-group-addon"><b>Nombre</b></div>
        	<input type="text" class="form-control" id="vnombre" placeholder="Nombre de Producto">
        </div><br>
        <div class="input-group">
	        <div class="input-group-addon"><b>Código</b></div>
	        <input type="text" class="form-control" id="vcodigo" placeholder="Código de Producto">
	        <input type="hidden" id="vid" value="0">
	        <input type="hidden" id="vidusuario" value="">
	        <input type="hidden" id="vidsucursal" value="">
        </div><br>
	</div>





</div>