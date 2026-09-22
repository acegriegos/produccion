<?php foreach ($transaccion as $obj) {
                      
  ?>
      <tr>
          <td style=" padding: 10px;"><?php echo $obj[1]; ?></td>
          <td style=" padding: 10px;"><?php echo $obj[2]; ?></td>
          <td style=" padding: 10px;"><?php echo $obj[3]; ?></td>
          <td style=" padding: 10px;"><a data-toggle="modal" class="correo" href='#modal-sendMail' id="e<?php echo $obj[0]; ?>"><?php echo $obj[4]; ?></a></td>
          <td style=" padding: 10px;"><?php echo $obj[5]; ?></td>
          <td style=" padding: 10px;"><?php echo $obj[6]; ?></td>
          <td style=" padding: 10px;"><?php echo $obj[7]; ?></td>
          <td style=" padding: 10px;">
            <a class="cargar load black-text pbtn" modulo="usuario" title="Editar Usuario" id="m<?php echo $obj[0]; ?>" <?php if($obj[1] == 'admin' && $_SESSION['NUM'] != 0) echo "disabled"; ?> ><i class="mdi mdi-pencil mdi-24px"></i></a>
            <a class="delete eliminar black-text pbtn" modulo="usuario" title="Eliminar Usuario" id="d<?php echo $obj[0]; ?>" <?php if($obj[1] == 'admin') echo "disabled"; ?>><i class="mdi mdi-delete mdi-24px"></i></a>
          </td>
        </tr>
  <?php } ?>


  <script type="text/javascript">
  $(function(){
    permisos(310,311);
  })
 </script>