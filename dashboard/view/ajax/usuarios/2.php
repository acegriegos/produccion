<div class="card">
   <div class="row">
    <div class="col s12 m6 l6">
        <label for="selectUser" >Elegir Usuario a Desplegar</label>
        
        <select id="selectUser" type="select" style="width: 70%">
            <option value="0">--Selecione un Usuario--</option>
            <?php foreach ($usr as $obj) { ?>
            <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
            <?php } ?>
        </select>
    </div>
    
    <div class="col s12 m6 l6">
        <label for="selectType" >Elegir Tipo de Usuario a Desplegar</label>
        
        <select id="selectType" style="width: 70%">
            <option value="0">--Selecione un Tipo de Usuario--</option>
            <?php foreach ($tusr as $obj) { ?>
            <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
            <?php } ?>
        </select>
    </div>

</div>
<br>
<div class="row">
    <div class="col s12 m12 l12">
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

</div>