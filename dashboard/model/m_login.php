<?php 
				
	require_once '../_config/RUD.php';
	require_once '../_config/ecy.php';

	class _login extends RUD
	{
		var $user;
		var $pass;

		/*
			ERROR 1644 Message: Unhandled user-defined exception condition
		*/
		function mantenimiento($arreglo){
			
			if (isset($arreglo['atributos']['vidusuario'])) {
				if ($arreglo['atributos']['vidusuario'] == '') {
					$cy = new _cy();
					$arreglo['atributos']['vidusuario'] = str_replace("\0","",base64_decode($_SESSION['USR']));//$cy->decy($_SESSION['USR']));
				}
			}

			if (isset($arreglo['atributos']['vidsucursal'])) {
				if ($arreglo['atributos']['vidsucursal'] == '') {
					$arreglo['atributos']['vidsucursal'] = $_SESSION['IMPRESA'];
				}
			}
			
			$id_new = $this->mant($arreglo['modulo'],$arreglo['atributos']);
			$accion = $arreglo['atributos']['vaccion'];
			$rollback = '';

			if (isset($arreglo['varios']) && $accion != 3 && is_array($id_new)) { //isset($arreglo['varios'][0]['atributos'])
				
				$posicion = strpos($arreglo['modulo'], '-');
				$schema = $posicion ? substr($arreglo['modulo'], 0,$posicion).'.' : '';
				$modulo = $posicion ? substr($arreglo['modulo'], $posicion+1) : $arreglo['modulo'];
				$id_tabla = $this->kamehameha('id',70,'nombre like "'.$schema.$modulo.'s"')[0][0];
				$rollback = '';
				$roll_tbl = 0;
				
				foreach ($arreglo['varios'] as $index => $varios) {

					if (isset($varios['atributos'])){
						foreach ($varios['atributos'] as $detalles) {

							if ($varios['hasTabla']) {
								$detalles['vidfila'] = isset($detalles['vidfila']) ? $detalles['vidfila'] == 0 ? $id_new[0][0] : $detalles['vidfila'] : $id_new[0][0];
								$detalles['vidtabla'] = isset($detalles['vidtabla']) ? $detalles['vidtabla'] == 0 ? $id_tabla : $detalles['vidtabla'] : $id_tabla;
							}

							$detalles['vaccion'] = $detalles['vaccion'] == 0 ? $accion : $detalles['vaccion'];
							$rs = $this->mant($varios['modulo'],$detalles,$id_new[0][0]);

							if (!is_array($rs)){
								// $save_sql = $_SESSION['ERRNO'] == 1644 ? '' : $this->genkidama(1,251,'sql_str,sql_res','"'.$this->sql.'","'.$rs.'"');
								$this->genkidama(1,251,'sql_str,sql_res','"'.$this->sql.'","'.$rs.'"');
								$rollback = $rs." Modulo: ".$varios['modulo'];
								$roll_tbl = $varios['rollback'];
							}
						}
					}
				}
			}

			if (is_array($id_new)) {
				return array('0' => $id_new);
			}else{
				if($rollback != ''){
					// $rll = $this->kamehameha('',$roll_tbl,$id_new[0][0]);
					return 'ERROR: '.$rollback.' '.$id_new;
				}else{
					// $save_sql = $_SESSION['ERRNO'] == 1644 ? '' : $this->genkidama(1,251,'sql_str,sql_res',$this->sql,$id_new);
					return $id_new;//." ".$this->sql;
				}
			}
		}

		function analizarTabla($arreglo){
			$salida = array();
			$posicion = strpos($arreglo['modulo'], '-');
			$schema = $posicion ? substr($arreglo['modulo'], 0,$posicion) : $this->db->getDB();
			$arreglo['modulo'] = $posicion ? substr($arreglo['modulo'], $posicion+1) : $arreglo['modulo'];
			
			$this->sql = "SELECT PARAMETER_NAME,DTD_IDENTIFIER FROM information_schema.PARAMETERS where SPECIFIC_NAME = 'sp_mant".$arreglo['modulo']."s' and SPECIFIC_SCHEMA = '".$schema."'";

			$rs = $this->ejecutarSelect();
			if (!isset($rs->num_rows)) {
				$err = $posicion ? "No existe SP asociado: ".$arreglo['modulo']."s, <a style='color: black;' href='../DB.php?tabla=".$arreglo['modulo']."s&schema=".substr($schema,0,strlen($schema)-1)."' target='new'>AGREGARLO</a>" : "No existe SP asociado: ".$arreglo['modulo']."s, <a style='color: black;' href='../DB.php?tabla=".$arreglo['modulo']."s' target='new'>AGREGARLO</a>";
				return $rs;
			}else
				$salida = $rs->fetch_all();
				
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