<?php foreach ($transaccion as $obj) {
                      
  ?>
      <tr>
        <td><?php echo $obj[1] ?></td>
        <td><?php echo $obj[2] ?></td>
        <td><?php echo $obj[3] ?></td>
        <td><a data-toggle="modal" href='#modal-sendMail' class="correo" id="e<?php echo $obj[0] ?>"><?php echo $obj[4] ?></a></td>
        <td><?php echo $obj[5] ?></td>
        <td><?php echo $obj[6] ?></td>
        <td><?php echo $obj[7] ?></td>
       <td>
          <?php if ($obj[1] == 'admin') {
            echo '<a class="btn-floating waves-effect waves-light blue cargar load" modulo="usuario" title="Editar Usuario" id="m'.$obj[0].'" disabled><i class="fa fa-pencil-square-o"></i></a>';
          }else{
            echo '<a class="btn-floating waves-effect waves-light blue cargar load" modulo="usuario" title="Editar Usuario" id="m'.$obj[0].'"><i class="fa fa-pencil-square-o"></i></a>';
          } ?>
          <?php if ($obj[1] == 'admin') {
            echo '<a class="btn-floating waves-effect waves-light red delete eliminar" modulo="usuario" title="Eliminar Usuario" id="d'.$obj[0].'" disabled><i class="fa fa-times"></i></a>';
          }else{
            echo '<a class="btn-floating waves-effect waves-light red delete eliminar" modulo="usuario" title="Eliminar Usuario" id="d'.$obj[0].'"><i class="fa fa-times"></i></a>';
          } ?>
          
          
        </td>
      </tr>
  <?php } ?>


  <script type="text/javascript">
  $(function(){
    permisos(310,311);
  })
 </script>