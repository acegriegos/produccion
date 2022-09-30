<?php 
  
  if (isset($_POST['accion'])) {

    require_once '_config/mysqlDB.php';
    $db = new DBClass();

    switch ($_POST['accion']) {
      case 1:
        $sucursales = $db->ejecutar("select a.id,if(a.pfisico <> '',a.pfisico,a.nombre) as nombre,replace(a.cedula,'-','') as ced,a.pfisico,b.correo,c.telefono,ifnull(e.fct,0),ifnull(e.tkt,0),ifnull(e.tkt/2+e.fct,0) as tot,if(f.idtipousuario = 3,'checked','') as bloq,if(date_add(g.fch, INTERVAL +1 year) <= CURDATE(),1,0) al_cobro,f.id as user from sucursales a join (select correo,idfila from correos where idtabla = 39) b on b.idfila = a.id join (select telefono,idfila from telefonos where idtabla = 39) c on c.idfila = a.id left join (select idsucursal as suc,sum(if(idtipoventa = 1,1,0)) as fct,sum(if(idtipoventa = 7,1,0)) as tkt from facturas where idtipoventa in(1,7) and if('".$_POST['f1']."' <> '',date_format(fecha,'%Y-%m-%d') between '".$_POST['f1']."' and '".$_POST['f2']."',1) group by idsucursal) e on e.suc = a.id join usuarios f on f.idsucursal = a.id left join (select min(fecha) as fch,idsucursal as suc from facturas where idtipoventa in(1,7) group by idsucursal ) g on g.suc = a.id where !a.isPrueba group by a.id having if('".$_POST['name']."' <> '', nombre like '%".$_POST['name']."%',1) and if('".$_POST['ced']."' <> '', ced like '%".$_POST['ced']."%',1) order by a.nombre;")->fetch_all();
	
          $tot = 0;
          foreach ($sucursales as $obj) {

            $estimado = 15000;

            if($obj[8] == 0 || !$obj[10])
              $estimado = 0;
            /*else if($obj[8] > 50 && $obj[8] <= 150)
              $estimado = 100000;*/

            $estimado = $_POST['iva'] == 1 ? $estimado*1.13 : $estimado;

            $tot += $estimado;

            echo '<tr id="'.$obj[0].'"><td>'.$obj[0].'</td><td><span style="border-bottom: 1px dashed black;cursor:pointer;" class="srep">'.$obj[1].'</span></td><td>'.$obj[2].'</td><td>'.$obj[4].'</td><td>'.$obj[5].'</td><td>'.$obj[6].'</td> <td>'.$obj[7].'</td> <td>'.number_format($obj[8],1).'</td> <td style="color:green">'.number_format($estimado,2).'</td> <td><input type="checkbox" '.$obj[9].' class="bloq" id="b'.$obj[11].'"/><label for="b'.$obj[11].'"></label></td></tr>';
          }

          echo '<tr id="stot" class="hide" tot="'.number_format($tot,2).'"></tr>';
        break;
      case 2:
        $salida = [];
        
        $etq = $db->ejecutar('select date_format(min(fecha),"%d-%m-%Y") as finic,b.consecutivo as fact,b.consecutivo6 as tk from facturas a join consecutivos b on b.idsucursal = a.idsucursal where idtipoventa in (1,7) and a.idsucursal = '.$_POST['id'])->fetch_all();
        
        $det = $db->ejecutar('')->fetch_all();

        $salida[0] = $etq;
        $salida[0] = $det;
        echo json_encode($salida);
        break;
      default:
        echo "not valid";
        break;
    }
    

    

  }else{
    
?>

<!DOCTYPE html>
<html>
<head>
 <title>VISTA USUARIOS NUBE</title>
 <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link rel="stylesheet" type="text/css" href="../assets/css/materialize.min.css?v=10.4.0.3">
<link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css?v=10.4.0.3">
<link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css?v=10.4.0.3">
<link rel="stylesheet" type="text/css" href="../assets/css/materialdesignicons.min.css?v=10.4.0.3">

<script src="../assets/js/jquery.js?v=10.4.0.3"></script>
<script src="../assets/js/materialize.min.js?v=10.4.0.3"></script>
<script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js?v=10.4.0.3"></script>
<script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js?v=10.4.0.3"></script>
 <script type="text/javascript">
  $(function(){
  
  $('.modal').modal(); 

  $(document).on("click",".bloq",function(){

    if($(this).is(":checked")){
      tipo =3;
       Materialize.toast('USUARIO BLOQUEADO',4000,'red');
    }else{
      tipo = 2;
       Materialize.toast('USUARIO DESBLOQUEADO',4000,'green'); 
   }
   var arr = {};
   arr['accion'] = 2;
        arr['tabla'] = 1;
        arr['arg1'] = 'idtipousuario= '+tipo;
        arr['arg2'] = 'id = '+$(this).attr('id').substr(1);
	console.log(arr)
   $.ajax({
            async: false,
            url: '/dashboard/login',
            type: 'POST',
            data: {accion: 7,arreglo : arr}
        })
    .done(function(data) {
      console.log(data) 
    });

  });

  $("#buscar").click(function(){
    cargarTabla();
  });

  $(".filtro").change(function(){
    cargarTabla();
  });

  var fecha = new Date();
  $("#from").val((fecha.getFullYear()-1)+'-11-01');
  $("#to").val(fecha.getFullYear()+'-10-31');

   cargarTabla();
})

  $(document).on('click','.srep',function(){
    $("#cnom").html('<br>'+$(this).html())
    $("#modal-rep").modal('open');
    $.ajax({
            async: true,
            url: './varios.php',
            type: 'POST',
            data: {accion: 2,id:$(this).parent().parent().attr('id')}
        })
    .done(function(data) {
      var p = JSON.parse(data);
      if(p){
        $("#ffe").html(p[0][0][0])
        $("#cfa").html(p[0][0][1])
        $("#cta").html(p[0][0][2])
      }
    });
  });

  function cargarTabla(){
    $("#list").html('<td class="center" colspan="100%"><i class="mdi mdi-refresh mdi-48px mdi-spin"></i></td>')
    $.ajax({
            async: true,
            url: './varios.php',
            type: 'POST',
            data: {accion: 1,f1:$("#from").val(),f2:$("#to").val(),name:$("#name").val(),ced:$("#ced").val(),iva:$("#iva").is(':checked') ? 1 : 0}
        })
    .done(function(data) {
      $("#list").html(data)
      $("#ltot").html($("#stot").attr('tot'))
    });
  }

</script>
</head>
<body>

<?php 
  
  require_once '_config/mysqlDB.php';
  $db = new DBClass();
  

  $estadistca = $db->ejecutar('select sum(if(b.idtipousuario = 3,1,0)) as bloq,sum(if(b.idtipousuario <> 3,1,0)) as actv from sucursales a join usuarios b on b.idsucursal = a.id where !a.isPrueba')->fetch_all();
 ?>

<div class="filtro row" style="padding-top:15px;position: fixed;width: 100%;background-color: white;z-index: 999;top: 0;margin: 0px;">
  
  <div class="input-field col s3" style="margin: 0">
    <input type="text" id="name" class="filtro">
    <label for="name">Razon Social</label>
  </div>

  <div class="input-field col s3" style="margin: 0">
    <input type="text" id="ced" class="filtro">
    <label for="ced">Cedula</label>
  </div>

  <div class="input-field col s3" style="margin: 0">
    <label for="from" class="active">Entre Fechas</label>
    <input type="date" id="from">
  </div>

  <div class="input-field col s3" style="margin: 0">
    <input type="date" id="to">
  </div>

  <span><b>Bloqueados: </b> <span style="color: red"><?php echo $estadistca[0][0]; ?></span> <b style="margin-left: 5%">Activos: </b> <?php echo $estadistca[0][1]; ?> <b style="margin-left: 5%">$$$: </b> <span style="color: green;" id="ltot">0.00</span> </span> 

  <a class="btn" style="float: right;" id="buscar"><i class="mdi mdi-24px mdi-magnify"></i> Buscar</a>

  <div class="switch col s2" align="center" style="float: right;">
    <label>
      ---
      <input type="checkbox" id="iva" checked>
      <span class="lever"></span>
      IVA
    </label>
  </div>
</div>

<table class="table centered striped bordered highlight z-depth-3 pequeño dt-responsive nowrap tableBodyScroll" style="font-size: 12px;margin-top: 120px" width="100%">
  <thead><tr><th><b>ID</b></th><th><b>RAZON SOCIAL</b></th><th><b>CEDULA</b></th><th><b>CORREO</b></th><th>TELEFONO</th><th><b>FACTURAS</b></th> <th>TIQUETES</th> <th>TOTAL</th> <th> $$$ </th> <th>BLOQUEO</th></tr> 

  <tbody id="list">
  </tbody>
</table>

 <div id="modal-rep" class="modal modal-fixed-footer mymodal" style="border-bottom: 1px solid #e3e3ee;">
   <div class="modal-header center"> Consumo Anual de Facturas <span id="cnom"></span>  </div>
  <div class="modal-content">
    Primer Factura Emitida: <span id="ffe">Cargando...</span> <br>
    Consecutivo Factura Actual: <span id="cfa">...</span> <br>
    Consecutivo Tiquet Actual: <span id="cta">...</span>
    <table class="table bordered">
      <tr>
        <th>Corte</th>
        <th>Cantidad</th>
        <th>Monto</th>
        <th>Estado</th>
      </tr>
      <tbody id="lcc">
        <tr>
          <td class="center" colspan="100%"><i class="mdi mdi-refresh mdi-48px mdi-spin"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal-footer" style="padding-bottom: 55px;">
    <a href="#!" class="modal-action waves-effect waves-green btn-flat">Aceptar</a>
  </div>
</div>

 </body>
 </html>


<?php 
  }
 ?>  