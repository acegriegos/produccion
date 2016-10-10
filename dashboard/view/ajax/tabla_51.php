<div class="row">

<?php
// echo '<pre>';
// print_r($transaccion);
// echo '</pre>';

for ($i=0; $i < sizeof($transaccion); $i++) { 
	$vuelta = $i%2;
	if ($vuelta == 1) {
		echo '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
 			<div class="input-group">
 				<div class="input-group-addon"><b>'.$transaccion[$i][1].'</b></div>
 				<input type="text" class="form-control eder" id="'.$transaccion[$i][0].'" placeholder="Impuesto de '.$transaccion[$i][1].'" value="'.$transaccion[$i][2].'" name="impuesto">
 				<div class="input-group-addon"><b>%</b></div>';
 				if ($transaccion[$i][0] != 1) {
 					echo '<div class="input-group-addon btn"><i class="fa fa-times delimp" id="'.$transaccion[$i][0].'"></i></div>';
 				}
 			echo '</div>
		</div><br><br><br>';
	}else{
		echo '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
			<div class="input-group">
				<div class="input-group-addon"><b>'.$transaccion[$i][1].'</b></div>
					<input type="text" class="form-control eder" id="'.$transaccion[$i][0].'" placeholder="Impuesto de '.$transaccion[$i][1].'" value="'.$transaccion[$i][2].'" name="impuesto">
				<div class="input-group-addon"><b>%</b></div>';
				if ($transaccion[$i][0] != 1) {
					echo '<div class="input-group-addon btn"><i class="fa fa-times delimp" id="'.$transaccion[$i][0].'"></i></div>';
				}
			echo '</div>
		</div>';
	}
}





// foreach ($transaccion as $obj) {
// 	$ispar = $obj[3]%2;
// 	if ($ispar == 0) {
// 		echo '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
// 			<div class="input-group">
// 				<div class="input-group-addon"><b>'.$obj[1].'</b></div>
// 				<input type="text" class="form-control eder" id="'.$obj[1].'" placeholder="Impuesto de '.$obj[1].'" value="'.$obj[2].'" vid="'.$obj[0].'" name="impuesto">
// 				<div class="input-group-addon"><b>%</b></div>
// 			</div>
// 		</div><br><br><br>';
// 	}else{
		// echo '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
		// 	<div class="input-group">
		// 		<div class="input-group-addon"><b>'.$obj[1].'</b></div>
		// 		<input type="text" class="form-control eder" id="'.$obj[1].'" placeholder="Impuesto de '.$obj[1].'" value="'.$obj[2].'" vid="'.$obj[0].'" name="impuesto">
		// 		<div class="input-group-addon"><b>%</b></div>
		// 	</div>
		// </div>';
// 	}

	
// }


?>


</div>