<?php 
    
    foreach ($transaccion as $obj) {
?>
<!-- <?php echo $obj[0] ?> -->
<li class="collection-item dismissable" id="newimp<?php echo $obj[0] ?>">
    <div class="row" style="margin: 0px">
        <div class="col s6">
            <span class="impuestos" id="vimv<?php echo $obj[0] ?>" value="<?php echo $obj[2] ?>"><?php echo $obj[1] ?> - <?php echo $obj[3] ?></span>
        </div>
        <div class="col s6">
            <label>Exoneracion</label>
            <input id="impexo<?php echo $obj[0] ?>" type="number" class="validate eder" value="<?php echo $obj[4] ?>" style="margin: 0px;width: 50%">
        </div>
    </div>
</li>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>