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
          <table class="display table bordered highlight responsive-table z-depth-3 centered" id="data-table-usuariosPermisos">
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;"> Ventana </th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;"> Habilitar </th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;"> Deshabilitar </th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;"> Invisible </th>
                </tr>
            </thead>
            <tbody id="lista">
                
            </tbody>
        </table>

		</div>
	</div>