
    <div class="card pequeño">
       <div class="row  pequeño">
        <div class="col s12 m6 l6 pequeño">
            <label for="selectper" >Elegir Usuario a Desplegar</label>
            <select id="selectper" class="form-control" style="width: 70%">
                <option value="0">--Selecione un Usuario--</option>
                <?php foreach ($usr as $obj) { ?>
                <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
                <?php } ?>
            </select>
        </div>
        <div class="col s12 m6 l6 pequeño">
            <label for="selectAcc" >Elegir Acción</label>
            <select id="selectAcc" class="form-control" style="width: 70%">
                <option value="0">--Selecione un Usuario--</option>
                <?php foreach ($acc as $obj) { ?>
                <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
                <?php } ?>
            </select>
        </div>
                <div class="input-field col s12 m6">


             <i class="fa fa-calendar-o prefix"></i>
             <input type="date" placeholder="DESDE" class="datepicker " id="desde" value="" style="color: black">

           </div> 
            <div class="col s12 m6">

            <div class="input-field">


             <i class="fa fa-calendar-o prefix"></i>

             <input placeholder="HASTA" type="date" class="datepicker vfecha" id="hasta" value="" style=" color: black; ">

           </div>

         </div> 
         <div class="col s8 m2  offset-m10 offset-s3" style="padding-left: 7%">
            <br>
              <a class="waves-effect waves-light btn" id="hist">Buscar</a>

            </div>
    </div>
    <br><br>
    <div class="row pequeño">
        <div class="col s12 m12 l12 pequeño">
          <table class="table bordered pequeño highlight responsive-table z-depth-3 centered" cellspacing="0" id="data-table-usuariosHistorial">
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

  <!-- Modal Structure -->
  <div id="modal-actualizacion" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
    </div>
  </div>