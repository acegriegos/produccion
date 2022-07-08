<?php 
	session_start();

	if (!isset($_SESSION['USR'])){
		header('Location: ../');
	}

	require_once './_config/mysqlDB.php';
	$db = new DBClass();

	$sucs = $db->ejecutar('select b.nombre,b.pfisico from usuarios a join sucursales b on find_in_set(b.id,a.idsucursal) where a.id = 182 order by b.nombre')->fetch_all(); //base64_decode($_SESSION['USR']);
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>CONTADOR</title>
	<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
	<link rel="stylesheet" type="text/css" href="./assets/css/materialize.min.css?v=10.4.0.2">
	<link rel="stylesheet" type="text/css" href="./assets/libs/DataTables/media/css/jquery.dataTables.css?v=10.4.0.2">
	<link rel="stylesheet" type="text/css" href="./assets/libs/DataTables/media/css/dataTables.responsive.css?v=10.4.0.2">
	<link rel="stylesheet" type="text/css" href="./assets/css/modulos/style-menu.css?v=10.4.0.2">
	<link rel="stylesheet" type="text/css" href="./assets/css/materialdesignicons.min.css?v=10.4.0.2">

	<style type="text/css">
		td, th{
			padding: 0px;
		}
	</style>
</head>
<body>

	<div class="card">
		<div class="card-header center">
			<p class="flow-text head1">Clientes Enlazados a <?php echo $_SESSION['NOM']; ?></p>
		</div>

		<table class="tbl">
			<thead>
				<th>RAZON SOCIAL</th>
				<th>N.FANTASIA</th>
			</thead>
			<tbody>
				<?php 
					foreach ($sucs as $obj) {
						echo '<tr> <td>'.$obj[0].'</td> <td>'.$obj[1].'</td> </tr>';
					}
				 ?>
			</tbody>
		</table>
		
	</div>

	<script src="./assets/js/jquery.js?v=10.4.0.2"></script>
	<script src="./assets/js/materialize.min.js?v=10.4.0.2"></script>
	<script src="./assets/js/asgard.js?v=10.4.0.2"></script>
	<script src="./assets/js/main.js?v=10.4.0.2"></script>
	<script src="./assets/libs/charts/chart.js?v=10.4.0.2"></script>
	<script src="./assets/libs/DataTables/media/js/jquery.dataTables.min.js?v=10.4.0.2"></script>
	<script src="./assets/libs/DataTables/media/js/dataTables.responsive.min.js?v=10.4.0.2"></script>
</body>
</html>