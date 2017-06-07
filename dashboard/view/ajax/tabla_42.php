<?php 
    
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1]?></td>
    <td><?php echo $obj[2]?></td>
    <td><?php echo $obj[3]?></td>
    <td><?php echo $obj[4]?></td>
    <td>
        <a class="btn-floating waves-effect waves-light blue load" modulo="insumos" id="m<?php echo $obj[0]?>" href="#modal-insumos"><i class="fa fa-pencil-square-o"></i></a>
        <a class="btn-floating waves-effect waves-light red del" modulo="insumo" id="d<?php echo $obj[0]?>"><i class="fa fa-times"></i></a>
    </td>
  </tr>

<?php }

?>

 <script type="text/javascript">
    $(function()
        permisos(310,311);
    ?>)
 </script>