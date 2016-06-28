<?php 
				
	require_once '../_config/RUD.php';
	require_once '../_config/ecy.php';

	class _login extends RUD
	{
		var $user;
		var $pass;

		function mantenimiento($arreglo){

			if (isset($arreglo['atributos']['vidusuario'])) {
				if ($arreglo['atributos']['vidusuario'] == '') {
					$cy = new _cy();
					$arreglo['atributos']['vidusuario'] = str_replace("\0","",$cy->decy($_SESSION['USR']));
				}
			}

			$id_new = $this->mant($arreglo['modulo'],$arreglo['atributos']);

			if (isset($arreglo['detalle'])) {
				$accion = $arreglo['atributos']['vaccion'];
				foreach ($arreglo['detalle']['registros'] as $obj) {
					$obj['vaccion'] = $accion;
					$rs = $this->mant($arreglo['detalle']['tabla'],$obj,$id_new);
				}
			}

			return array('0' => $id_new);;
		}

		function analizarTabla($arreglo){
			$salida = array();

			$this->sql = "SHOW CREATE PROCEDURE sp_mant".$arreglo['modulo']."s";
			$rs = $this->ejecutarSelect()[0][2] or die("No existe SP asociado");
			$rs = substr($rs, strpos($rs,"(")+1);
			$rs = substr($rs, 0,strpos($rs,"BEGIN"));
			$rs = str_replace("\n", " ", $rs);
			$rs = explode(',', $rs);

			$arreglo = $rs;

			foreach ($arreglo as $obj) {
				$primer = substr($obj, 0,1);
				
				if ($primer == ' ') 
					$obj = substr($obj, 1);
				elseif (is_numeric($primer)) {
					$obj = '';
				}

				$cadena = substr($obj, 0,strpos($obj," "));
				if (strlen($cadena) != 0)
					array_push($salida, $cadena);
				
			}

			return $salida;
		}

		function autenticar() {
	
			$sql = "CALL sp_Login('$this->user','$this->pass')";

			$resul = $this->db->ejecutar($sql);
			
			if ($resul->num_rows > 0) {
				
				$resul = $resul->fetch_all();

				if ($resul[0][0] != '') {
					return $resul;
				}else{
					return 0;
				}
				
			}
			else{
				return 0;
			}
		}

		function ini($id,$pss){
			$this->user = $id;
			$this->pass = $pss;
		}
	}
			
?>