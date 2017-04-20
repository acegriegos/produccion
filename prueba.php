<?php 
    require_once '_config/mysqlDB.php';
    require_once '_config/ecy.php';

    if (isset($_REQUEST['accion'])) {
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');

        $cy = new _cy();
        $base = new DBClass();
        $max = isset($_SESSION['max']) ? $_SESSION['max'] : 0;

        // $usr = str_replace("\0","",$cy->decy($_SESSION['USR']));
        $alerta = $base->ejecutar("select id,tarea,proceso,date_format(inicio,'%H:%i:%s') as hora from prueba where id > ". $max );
        $salida = [];

        $alerta = $alerta->fetch_all();

        if (sizeof($alerta) > 0) {
            $salida = $alerta;
            $_SESSION['max'] = ($salida[sizeof($salida)-1][0]);
        }else{
            $salida = "";
        }
            
        echo "data: ".json_encode($salida)."\n\n";


        ob_end_flush();
        flush();
        sleep(5);
    }else{
 ?>

<link rel="icon" type="image/png" href="assets/img/favicon.ico">
<link rel="stylesheet" href="assets/css/materialize.css">
<link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/jquery.dataTables.css">
<link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/dataTables.responsive.css">
<link rel="stylesheet" type="text/css" href="assets/libs/iconos/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="assets/css/modulos/style-menu.css">
<link rel="stylesheet" type="text/css" href="assets/fonts/material-icons.css">
<link rel="stylesheet" type="text/css" href="assets/css/system.min.css">

<table id="tblprocesos">
<tr>
    <td><b>ID PROCESO</b></td>
    <td><b>PROCESO</b></td>
    <td><b>TAREA</b></td>
    <td><b>TIEMPO</b></td>
</tr>
<?php $base = new DBClass(); 
$procesos = $base->ejecutar("select id,tarea,proceso,timediff(now(),inicio) as hora from prueba order by id")->fetch_all(); 

foreach ($procesos as $obj) { ?>

<tr>
    <td><?php echo $obj[0]; ?></td>
    <td><?php echo $obj[1]; ?></td>
    <td><?php echo $obj[2]; ?></td>
    <td id="t<?php echo $obj[0]; ?>"> <span class="reloj"><span class="hora">00</span>:<span class="minuto">00</span>:<span class="segundo">00</span></span> <button class="comenzar" begin="1" time="<?php echo $obj[3]; ?>" id="c<?php echo $obj[0]; ?>">COMENZAR</button></td>
</tr>

<?php $max = $obj[0]; } $_SESSION['max'] = $max;?>
</table>

<script src="assets/js/jquery.js"></script>
<script src="assets/js/mask/jquery.mask.js"></script>
<script src="assets/js/materialize.js?v=1.8"></script>
<script src="assets/js/modulos/menu.js?v=1.4"></script>
<script src="assets/libs/charts/chart.js"></script>
<script src="assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
<script src="assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
<script src="assets/js/asgard.js?v=1.16"></script>

<script type="text/javascript">
$(function(){
    if(typeof(EventSource) !== "undefined") {
        source = new EventSource("prueba.php?accion=1");
        source.onmessage = function(event) {
            var data = JSON.parse(event.data);
            
            if(data != ''){
                $.each(data,function(index){
                    $("#tblprocesos").append('<tr> <td>'+data[index][0]+'</td> <td>'+data[index][1]+'</td> <td>'+data[index][2]+'</td> <td id="t'+data[index][0]+'"> <span class="reloj"><span class="hora">00</span>:<span class="minuto">00</span>:<span class="segundo">00</span></span> <button class="comenzar" begin="1" time="'+data[index][3]+'" id="c'+data[index][0]+'">COMENZAR</button> </td> </tr>');
                });
                $(".comenzar[begin='1']").click();
            }
        };
    } else {
        Materialize.toast("Sorry, your browser does not support server-sent events...",4000,"red");
    }

    var time = {};

    var tiempo_corriendo = {};

    $(document).on("click",".comenzar",function(){
        var id = $(this).attr('id').substr(1);

        if ( $(this).attr('begin') == 1 )
        {
            tiempo_corriendo[id] = null;
            time[id] = {
                    hora: 0,
                    minuto: 0,
                    segundo: 0
                };
            var clock = '<span class="hora">00</span>:<span class="minuto">00</span>:<span class="segundo">00</span>';   
            if($("#t"+id+" .reloj").html() == clock ){
                
                var mytime = $(this).attr('time');
                time[id].hora = parseInt(mytime.substr(0,2));
                time[id].minuto = parseInt(mytime.substring(3,5));
                time[id].segundo = parseInt(mytime.substr(6));
            }else{
                time[id].hora = parseInt($("#t"+id+" .hora").html());
                time[id].minuto = parseInt($("#t"+id+" .minuto").html());
                time[id].segundo = parseInt($("#t"+id+" .segundo").html());
            }

            $(this).attr('begin',0);
            $(this).text('Pausar');                         
            tiempo_corriendo[id] = setInterval(function(){ cronometro(id,time);}, 1000);
        }
        else 
        {
            $(this).attr('begin',1);
            $(this).text('Comenzar'); 
            clearInterval(tiempo_corriendo[id]);
        }
    });

    $(".comenzar[begin='1']").click();
});

function cronometro(id,reloj){
    // Segundos
    reloj[id].segundo++;
    if(reloj[id].segundo >= 60)
    {
        reloj[id].segundo = 0;
        reloj[id].minuto++;
    }      

    // Minutos
    if(reloj[id].minuto >= 60)
    {
        reloj[id].minuto = 0;
        reloj[id].hora++;
    }

    $("#t"+id+" .hora").html(reloj[id].hora < 10 ? '0' + reloj[id].hora : reloj[id].hora);
    $("#t"+id+" .minuto").html(reloj[id].minuto < 10 ? '0' + reloj[id].minuto : reloj[id].minuto);
    $("#t"+id+" .segundo").html(reloj[id].segundo < 10 ? '0' + reloj[id].segundo : reloj[id].segundo);

};
</script>
<?php } ?>