<?php foreach ($transaccion as $obj) {
                      
  ?>
      <tr>
        <td><?php echo $obj[0] ?></td>
        <td><?php echo $obj[1] ?></td>
        <td><?php echo $obj[2] ?></td>
        <td><a data-toggle="modal" href='#modal-sendMail' class="correo" id="e<?php echo $obj[0] ?>"><?php echo $obj[3] ?></a></td>
        <td><?php echo $obj[4] ?></td>
        <td><?php echo $obj[5] ?></td>
        <td><?php echo $obj[6] ?></td>
       <td>
          <i class="fa fa-pencil-square-o load cargar btn" modulo="usuario" title="Cargar Usuario" id="m<?php echo $obj[0] ?>"></i>
          <i class="fa fa-times delete eliminar btn" modulo="usuario" title="Eliminar Usuario" id="d<?php echo $obj[0] ?>"></i>
        </td>
      </tr>
  <?php } ?>


  <script type="text/javascript">
  $(function(){
    permisos(310,311);
  })
 </script>