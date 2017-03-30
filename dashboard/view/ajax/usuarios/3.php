<?php if (isset($tbl)) {
    foreach ($log as $obj) {
        ?>

        <tr>
            <td><?php echo $obj[0] ?></td>
            <td><?php echo $obj[1] ?></td>
            <td><?php echo $obj[2] ?></td>
            <td><?php echo $obj[3] ?></td>    
        </tr>

        <?php
    }
}else{  
    ?>

    <div class="panel-body">
       <div class="row">
        <div class="col-md-6 col-lg-6">
            <label for="selectUserh" >Elegir Usuario a Desplegar</label>
            
            <select id="selectUserH" class="form-control" style="width: 70%">
                <option value="0">--Selecione un Usuario--</option>
                <?php foreach ($usr as $obj) { ?>
                <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
                <?php } ?>
            </select>
        </div>
        
    </div>
    <br><br>
    <div class="row">
        <div class="col s12 m12 l12">
          <table class="table bordered highlight responsive-table z-depth-3 centered" cellspacing="0" width="100%" id="data-table-usuariosHistorial">
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;"> Usuario </th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;"> Acción </th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;"> Descripción </th>
                    <th class="white-text blue" style="border: 0; border-radius: 0px !important;"> Fecha </th>
                </tr>
            </thead>
            <tbody id="lista">
                <?php
                foreach ($log as $obj) {
                    ?>

                    <tr>
                        <td><?php echo $obj[0] ?></td>
                        <td><?php echo $obj[1] ?></td>
                        <td><?php echo $obj[2] ?></td>
                        <td><?php echo $obj[3] ?></td>    
                    </tr>

                    <?php
                }  
                ?>
            </tbody>
        </table>
    </div></div>
</div>
</div>

<?php } ?>