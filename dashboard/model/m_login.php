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

			if (isset($arreglo['atributos']['vidsucursal'])) {
				if ($arreglo['atributos']['vidsucursal'] == '') {
					$arreglo['atributos']['vidsucursal'] = $_SESSION['IMPRESA'];
				}
			}
			
			$id_new = $this->mant($arreglo['modulo'],$arreglo['atributos']);
			$accion = $arreglo['atributos']['vaccion'];

			if (isset($arreglo['varios']) && $accion != 3 && isset($arreglo['varios'][0]['atributos'])) {
			$id_tabla = $this->kamehameha('id',70,'nombre like "'.$arreglo['modulo'].'s"')[0][0];
				foreach ($arreglo['varios'] as $index => $varios) {

					foreach ($varios['atributos'] as $detalles) {

						if ($varios['hasTabla']) {
							$detalles['vidfila'] = isset($detalles['vidfila']) ? $detalles['vidfila'] == 0 ? $id_new[0][0] : $detalles['vidfila'] : $id_new[0][0];
							$detalles['vidtabla'] = isset($detalles['vidtabla']) ? $detalles['vidtabla'] == 0 ? $id_tabla : $detalles['vidtabla'] : $id_tabla;
						}

						$detalles['vaccion'] = $accion;
						$rs = $this->mant($varios['modulo'],$detalles,$id_new[0][0]);

					}
				}
			}

			return is_array($id_new) ? array('0' => $id_new) : $id_new;
		}

		function mantenimientoTransaccion($arreglo){

			if (isset($arreglo['atributos']['vidusuario'])) {
				if ($arreglo['atributos']['vidusuario'] == '') {
					$cy = new _cy();
					$arreglo['atributos']['vidusuario'] = str_replace("\0","",$cy->decy($_SESSION['USR']));
				}
			}

			if (isset($arreglo['atributos']['vidsucursal'])) {
				if ($arreglo['atributos']['vidsucursal'] == '') {
					$arreglo['atributos']['vidsucursal'] = $_SESSION['IMPRESA'];
				}
			}

			$this->setSQL($this->mantTransaccion($arreglo['modulo'],$arreglo['atributos']));
			$accion = $arreglo['atributos']['vaccion'];
			
			if (isset($arreglo['varios']) && $accion != 3 && isset($arreglo['varios'][0]['atributos'])) {
			$id_tabla = $this->kamehameha('id',70,'nombre like "'.$arreglo['modulo'].'s"')[0][0];
				foreach ($arreglo['varios'] as $index => $varios) {

					foreach ($varios['atributos'] as $detalles) {

						if ($varios['hasTabla']) {
							$detalles['vidfila'] = isset($detalles['vidfila']) ? $detalles['vidfila'] == 0 ? '?' : $detalles['vidfila'] : '?';
							$detalles['vidtabla'] = isset($detalles['vidtabla']) ? $detalles['vidtabla'] == 0 ? $id_tabla : $detalles['vidtabla'] : $id_tabla;
						}

						$detalles['vaccion'] = $accion;
						$this->setSQL($this->mantTransaccion($varios['modulo'],$detalles,'?'));

					}
				}
			}
			
			return $this->startTransaccion($arreglo['modulo'].'s');
		}

		function analizarTabla($arreglo){
			$salida = array();
			$posicion = strpos($arreglo['modulo'], '-');
			$schema = $posicion ? substr($arreglo['modulo'], 0,$posicion).'.' : '';
			$arreglo['modulo'] = $posicion ? substr($arreglo['modulo'], $posicion+1) : $arreglo['modulo'];

			$this->sql = "SHOW CREATE PROCEDURE ".$schema."sp_mant".$arreglo['modulo']."s";

			$rs = $this->ejecutarSelect();
			if (!isset($rs[0][2])) {
				$err = $posicion ? "No existe SP asociado: ".$arreglo['modulo']."s, <a style='color: black;' href='../DB.php?tabla=".$arreglo['modulo']."s&schema=".substr($schema,0,strlen($schema)-1)."' target='new'>AGREGARLO</a>" : "No existe SP asociado: ".$arreglo['modulo']."s, <a style='color: black;' href='../DB.php?tabla=".$arreglo['modulo']."s' target='new'>AGREGARLO</a>";
				return $err;
			}else
				$rs = $rs[0][2];
			$rs = substr($rs, strpos($rs,"(")+1);
			$rs = substr($rs, 0,strpos($rs,"BEGIN"));
			$rs = str_replace("\n", " ", $rs);
			$rs = str_replace("inout ", "", $rs);
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
	
			$this->sql = "CALL sp_Login('$this->user','$this->pass')";

			$resul = $this->ejecutarSelect();
			
			return $resul;
		}

		function ini($id,$pss){
			$this->user = $id;
			$this->pass = $pss;
		}
	}
			
?>