<div class="card pequeño">
   <div class="row  pequeño" style="margin-bottom: 0px">
    <div class="col s12 m6 l6 pequeño">
        <label for="selectUser" >Elegir Usuario a Desplegar</label>
        
        <select id="selectUser" type="select" style="width: 70%">
            <option value="0">--Selecione un Usuario--</option>
            <?php foreach ($usr as $obj) { ?>
            <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
            <?php } ?>
        </select>
    </div>
    
    <div class="col s12 m6 l6 pequeño">
        <label for="selectType" >Elegir Tipo de Usuario a Desplegar</label>
        
        <select id="selectType" style="width: 70%">
            <option value="0">--Selecione un Tipo de Usuario--</option>
            <?php foreach ($tusr as $obj) { ?>
            <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
            <?php } ?>
        </select>
    </div>

</div>
<div class="row pequeño ">
    <div class="col s12 m12 l12 pequeño ">
      <table class="display table pequeño bordered highlight responsive-table striped centered" id="data-table-usuariosPermisos">
        <thead class="tab1">
            <tr>
                <th style="border: 0; border-radius: 0px !important;">Ventana</th>
                <th style="border: 0; border-radius: 0px !important;">Habilitar</th>
                <th style="border: 0; border-radius: 0px !important;">deshabilitar</th>
            </tr>
        </thead>
        <tbody id="lista">
            
        </tbody>
    </table>
</div>
</div>

</div>