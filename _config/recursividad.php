<?php 
	
	require_once 'mysqlDB.php';
	require_once 'correo.php';

	set_time_limit(0);

	$is24 = ejecutar_r("valor",15,"descr = \'24/7\'")[0][0];

	if($is24){
		$lista = ejecutar_r("idsucursal,correoconta,if((select rep_conta from recursividad where idsucursal = ajustessucursales.idsucursal )<=curdate(),1,0) as envio_contador,if((select next_day from recursividad where idsucursal = ajustessucursales.idsucursal )<=curdate(),1,0) as lectura_dias,autoacept,simplificado,(select nombre from sucursales where id = ajustessucursales.idsucursal),(select replace(cedula,\'-\',\'\') from sucursales where id = ajustessucursales.idsucursal)",40,"idsucursal in( select id from sucursales where sysmod <> -1) and autoacept > 0 having envio_contador or lectura_dias and correoconta <> \'\'");

		foreach ($lista as $value) {
			echo '<br>'.$value[6].'<br>';
			if($value[3]){
				#ACEPTAR COMPRAS AUTOMATICAS
				#VALUE[4] DIAS DE DIFERENCIA A PROCESAR
				ejecutar_r('','',"call loadCompras(".$value[0].")");
				ejecutar_r('','','update set next_day = date_add(next_day,interval +'.$value[4].' day) recursividad where idsucursal = '.$value[0]);
			}	

			/*$marray = [];
			if($value[2]){
				#VALUE[5] SIMPLIFICADO
				#DIA PARA ENVIAR EL CORREO
				$idsucursal = $value[0];
				$rep_defecto = ejecutar("select id from ajustesreportes where idsucursal = if((select count(id) from ajustesreportes where idreporte = 1 and idsucursal = ".$idsucursal."),".$idsucursal.",-1) and idreporte = 1;");

				$det_defecto = ejecutar("select 0,filtro,valor from detalleajustesreportes where idajuste = ".$rep_defecto[0][0].";");
				foreach ($det_defecto as $defecto) {
					$marray[$defecto[0]] = [];
					$dlinea = array($defecto[1] => $defecto[2]);
					array_push($marray[$defecto[0]], $dlinea);
				}

			}*/
		}
	}
	else{
		$sucursal = isset($_GET['suc']) ? $_GET['suc'] : 0;

		$fechas = ejecutar_r("if(next_day<=curdate(),1,0),if(rep_conta<=curdate(),1,0),rrhh",393,'idsucursal='.$sucursal)[0];
		if(isset($_GET['mes']))
			$fechas[1] = 1;

		if($fechas[0]){
			$db = new DBClass();
          	$db->ejecutar('update recursividad set next_day = date_add(next_day,interval 1 day) where idsucursal = '.$sucursal);
          	$db->ejecutar('call loadCompras('.$sucursal.');');
		}
		if($fechas[1]){
			//REPORTE CONTADOR
			$info_sucursal = ejecutar_r('correoconta,simplificado',40,'idsucursal='.$sucursal)[0];
			$correo_conta =  $info_sucursal[0];
			$simplificado = $info_sucursal[1];

			//$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
          	$actual_link = 'http://127.0.0.1/dashboard/login';//str_replace('ctr_login.php','/dashboard/login', $actual_link);

          	$sname = ejecutar_r('if(pfisico <> \"\",pfisico,nombre)',39,'id='.$sucursal)[0][0];
          	$valores = getValores($sname,$simplificado);
          	$params = getParams($sucursal,$valores['monthStart'],$valores['monthEnd'],$valores['monthName']);

          	if(!$simplificado){
			    
	            $params['arreglo[where]'] = '"1,7,10",'.$sucursal.',"0","","'.$valores['monthStart'].'","'.$valores['monthEnd']->format('Y-m-d').'","","","1,7,10","null","0",""';
			    $params['arreglo[archivo]'] = $valores['narchivo'];
			    $params['arreglo[tit]'] = 'VENTAS DEL MES '.$valores['monthName'];
			    getCURL($actual_link,$params);

			    $params['arreglo[where]'] = '"2",'.$sucursal.',"0","","'.$valores['monthStart'].'","'.$valores['monthEnd']->format('Y-m-d').'","","","105","null","0",""';
			    $params['arreglo[archivo]'] = $valores['garchivo'];
			    $params['arreglo[tit]'] = 'GASTOS DEL MES '.$valores['monthName'];

			    getCURL($actual_link,$params);
			}

            $params['arreglo[where]'] = '"2",'.$sucursal.',"0","","'.$valores['monthStart'].'","'.$valores['monthEnd']->format('Y-m-d').'","","","2","null","0",""';
		    $params['arreglo[archivo]'] = $valores['carchivo'];
		    $params['arreglo[tit]'] = 'COMPRAS DEL MES '.$valores['monthName'];

		    getCURL($actual_link,$params);

		    $_SESSION['IMPRESA'] = $sucursal;
          	$_SESSION['EMPRESA'] = $sname;
          	$_SESSION['BUSS']    = 0;
          	$_SESSION['CRR']     = '';
          	$_SESSION['NOM']     = '';
          
          	$correo = new correo($correo_conta,$sname.' ARCHIVOS DEL MES '.$valores['monthName'],"Se adjuntan los archivos correspondientes.",'../');
          	$envio = $correo->enviar_adjunto(['excel/'.$valores['narchivo'].'.xlsx','excel/'.$valores['carchivo'].'.xlsx','excel/'.$valores['garchivo'].'.xlsx']);
          	$envio = json_decode($envio,true);
          	if(isset($envio['success'])){
          		echo "Envio del Correo: ".$envio['success'];
          		if($envio['success'] && !isset($_GET['mes'])){
          			$db = new DBClass();
          			$db->ejecutar('update recursividad set rep_conta = date_add(rep_conta,interval if('.$simplificado.',3,1) month) where idsucursal = '.$sucursal);
          		}

          	}
		}

		if($fechas[2]){ //RRHH
			print_r(ejecutar_r('',479,$sucursal));
		}
	}

	function ejecutar_r($sel,$tbl,$whr){
		$db = new DBClass();
		if($tbl != '')
			$rs = $db->ejecutar('call krattos("'.$sel.'",'.$tbl.',"'.$whr.'")');
		else
			$rs = $db->ejecutar($whr);

		if(isset($rs->num_rows))
			return $rs->fetch_all();
		else
			echo $rs;
	}

	function getValores($sname,$simplificado){
		if(isset($_GET['mes'])){
			$monthEnd = (new DateTime(date("Y-m-t", strtotime($_GET['mes'])) ));
			$monthStart  = $_GET['mes'].'-01';
			if($simplificado){
				$monthEnd = $monthStart->modify('+2 month');
			}
		}else{
			$monthEnd = (new DateTime("last day of last month"));
			$monthStart = (new DateTime("first day of last month"));	
			if($simplificado){
				$monthStart = $monthStart->modify('-2 month');
			}
			$monthStart = $monthStart->format('Y-m-d');
		}
		
		if($simplificado){
			$monthName = strtoupper($monthEnd->modify('-2 month')->format('M').','.$monthEnd->modify('+1 month')->format('M').','.$monthEnd->modify('+1 month')->format('M Y'));
		}else
        	$monthName = $monthEnd->format('m-Y');
		return array(
				'monthStart' 	=> $monthStart,
	     		'monthEnd' 		=> $monthEnd,
		    	'monthName' 		=> $monthName,
		    	'narchivo' 		=> 'VENTAS DEL MES '.$monthName.' '.$sname,
		    	'carchivo' 		=> 'COMPRAS DEL MES '.$monthName.' '.$sname,
		    	'garchivo' 		=> 'GASTOS DEL MES '.$monthName.' '.$sname,
		);
	}

	function getParams($suc,$monthStart,$monthEnd,$monthName){
		return array(
		        "accion" => 11,
		        "arreglo[sel]" => '',
		        "arreglo[tbl]" => 167,
		        "arreglo[where]" => '',
		        'arreglo[vista]' => '0,1,2,3,4,5,8,10,13,14,15,16,17,18,19,20,21,22,23,12,24,25,26,27,28,29,30,31,32,33,34,35,40,36',
		        'arreglo[conteo]' => 1,
		        'arreglo[suma]' => ',8,10,13,14,15,16,17,18,19,20,21,22,23,12,24,25,26,27,28,29,30,31,32,33,34,35,40,36,',
		        'arreglo[tit]' => '',
		        'arreglo[archivo]' => '',
		        'arreglo[save]' => 1,
		        'arreglo[empresaid]' => 0
		      );
	}

	function getCURL($url,$param,$post=true){
			$curl = curl_init($url);
	        curl_setopt($curl, CURLOPT_HEADER, true);
	        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	        curl_setopt($curl, CURLOPT_POST, $post);
	        curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

	        $postData = "";

	        foreach($param as $k => $v)
	        {
	           $postData .= $k . '='.urlencode($v).'&';
	        }

	        $postData = rtrim($postData, '&');

	        curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

	        $json_response = curl_exec($curl);
	        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	        $error = curl_error($curl);

	        curl_close($curl);

	        return array('rs' => $json_response, 'status' => $status,'error' => $error);
	}

?>