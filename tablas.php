<?php 
require_once '_config/mysqlDB.php';
$mysql = new DBClass();

if (isset($_POST['op'])) {
    switch ($_POST['op']) {
        case 1:
            $mysql->ejecutar("INSERT INTO tablas(nombre) values('".$_POST['arreglo']."')");
            break;
        
        default:
            # code...
            break;
    }
    
}else{
 ?>

<body>
<?php 
    
    $rs = $mysql->ejecutar("SELECT * FROM tablas order by id")->fetch_all();
    echo '<b>Agregar Tabla</b> <input type="text" maxlength="45" placeholder="Nombre de la Tabla" id="tname">
    <br>
    <table>
    <tr>
    <td>Número</td><td>Nombre</td></tr><tbody id="cuerpo">';
    foreach ($rs as $obj) {
        echo '<tr><td>'.$obj[0].'</td><td>'.$obj[1].'</td></tr>';
    }
    echo "</tbody></table>";

 ?>
 <script src="assets/js/jquery.js"></script>
 <script type="text/javascript">
     $(function(){
        $("#tname").keyup(function(e){
            var code = e.wich || e.keyCode
            if (code == 13 && $(this).val() != '') {
                $.ajax({
                async: false,
                url: 'tablas.php',
                type: 'POST',
                data: {op: 1,arreglo : $(this).val()}
                })
                .done(function(data) {
                    console.log(data)
                    location.reload()
                }); 
            }
        })
     });
 </script>
 </body>

 <?php 
}
  ?>