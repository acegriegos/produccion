<div class="panel-body">
		   <div class="row">
            <div class="col-md-6 col-lg-6">
                <label for="selectUser" >Elegir Usuario a Desplegar</label>
                
                   <select id="selectUser" class="form-control" style="width: 70%">
                <option value="0">--Selecione un Usuario--</option>
                <?php foreach ($usr as $obj) { ?>
                    <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
                <?php } ?>
                </select>
            </div>
            
            <div class="col-md-6 col-lg-6">
                <label for="selectType" >Elegir Tipo de Usuario a Desplegar</label>
                
                <select id="selectType" class="form-control" style="width: 70%">
                <option value="0">--Selecione un Tipo de Usuario--</option>
                <?php foreach ($tusr as $obj) { ?>
                    <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
                <?php } ?>
                </select>
            </div>

          </div>
          <br><br>
          <table class="display" id="data-table-usuariosPermisos">
            <thead>
                <tr>
                    <th> Ventana </th>
                    <th> Habilitar </th>
                    <th> Deshabilitar </th>
                    <th> Invisible </th>
                </tr>
            </thead>
            <tbody id="lista">
                
            </tbody>
        </table>

		</div>
	</div>