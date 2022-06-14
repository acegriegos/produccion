<!DOCTYPE html>
 <html>
 <head>
 	<meta charset="utf-8">
 	<title>Calculadora</title>

	<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
	<link rel="stylesheet" type="text/css" href="./assets/css/materialize.min.css?v=10.3.0.21">
	<link rel="stylesheet" type="text/css" href="./assets/libs/DataTables/media/css/jquery.dataTables.css?v=10.3.0.21">
	<link rel="stylesheet" type="text/css" href="./assets/libs/DataTables/media/css/dataTables.responsive.css?v=10.3.0.21">
	<link rel="stylesheet" type="text/css" href="./assets/css/modulos/style-menu.css?v=10.3.0.21">
	<link rel="stylesheet" type="text/css" href="./assets/css/materialdesignicons.min.css?v=10.3.0.21">

	<style type="text/css">
		label, span{
			font-size: 40px !important;
		}

		td{
			padding: 0px;
		}
	</style>

 </head>
 <body>

 	<div class="row">
 		<div class="col s3"></div>

 	<div class="col s6" style="border: 1px solid black;">
 		<h3>Calculadora de Vueltos</h3>
 		<hr>

 		<input type="radio" name="tp" value="1" id="tp1" checked>
          	<label for="tp1">Factura</label>

          	<input type="radio" name="tp" value="7" id="tp7">
          	<label for="tp7">Tiquete</label>

          	<input type="radio" name="tp" value="8" id="tp8">
          	<label for="tp8">01</label>

        <div class="modal-content container center" style="padding: 0px;">
          
          <div class="input-fieldx">

          	<input type="text" id="fact" maxlength="10"  style="font-size: 40px; text-align: center;">
          	
          </div>	
          <span id="vuelto_tot" style="font-weight: bold;font-size: 18px">0.00</span> <span>CRC</span>
          <br><br><br>

          <span>Paga con:</span> <br>
          <input type="text" id="vuelto_pcon" value="0.00" autocomplete="off" style="width: 55%; font-size: 44px; text-align: center;">
          <br><br><br>

          <span>Vuelto:</span><br>
          <span style="font-size: 44px;" id="vuelto_">0.00</span>

        </div>

 	</div>

 	<div class="col s3">

 		<input type="date" id="fch">

 		<table>
 			<tr>
 				<td colspan="3"><b>N-FACTURA</b></td>
 			</tr>
 			<tr style="border-bottom: 1px dashed black;">
 				<td style="text-align: center;"><b>TOTAL</b></td>
	 			<td style="text-align: center;"><b>PAGA CON</b></td>
	 			<td style="text-align: center;"><b>VUELTO</b></td>
	 		</tr>
 			<tbody id="listavueltos"></tbody>
 			<tfoot>
 				<tr>
 					<td><b>TOTAL(CRC)</b></td>
 					<td colspan="2" style="text-align: right;" id="ttot">0.00</td>
 				</tr>

 				<tr>
 					<td><b>TOTAL 01(CRC)</b></td>
 					<td colspan="2" style="text-align: right;" id="stot">0.00</td>
 				</tr>
 			</tfoot>
 		</table>
 	</div>

 	</div>
 	
 	<script src="./assets/js/jquery.js?v=10.3.0.21"></script>
	<script src="./assets/js/materialize.min.js?v=10.3.0.21"></script>
	<script src="./assets/js/asgard.js?v=10.3.0.21"></script>
	<script src="./assets/js/main.js?v=10.3.0.21"></script>
	<script src="./assets/js/calc.js?v=10.3.0.21-3"></script>
 </body>
 </html>