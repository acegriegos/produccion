<?php 
    
    foreach ($transaccion as $obj) {
?>
<!-- <?php echo $obj[1] ?> -->
<li class="collection-item" id="ld<?php echo $obj[0] ?>">
    <div class="row">
        <div class="col s6 m6 l6">
            Nombre del Descuento: <span id="nmdesc<?php echo $obj[0] ?>"><?php echo $obj[1] ?></span>
        </div>
        <div class="col s6 m6 l6">
            <a class="secondary-content">Valor: <span id="valdesc<?php echo $obj[0] ?>"><?php echo $obj[3] ?></span></a>
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