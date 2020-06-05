<?php 

	require_once 'mysqlDB.php';
	require_once '../_config/ecy.php';
	ini_set("memory_limit",-1);
	/**
	* RUP crea los metodos para insertar,actualizar y eliminar de forma abstracta
	*/
	 abstract class RUD 
	{
		
		var $db;
		var $sql;
		var $lsql = [];
		var $cy;

		function __construct()
		{
			$this->db = new dbClass();
			$this->cy = new _cy();
		}

		public function getDB(){
			return $this->db;
		}

		public function setSQL($str){
			$this->lsql[] = $str;
		}

		public function ejecutarSelect(){
			$rs = $this->db->ejecutar($this->sql);

			if (isset($rs->num_rows)) {
				return $rs->fetch_all();
			}else{
				return $rs;	//." ".$this->sql;
			}
		}

		public function ejecutarSelectColums($sql){
			$salida = [];
			$rs = $this->db->ejecutar($sql);

			if (isset($rs->num_rows)) {
				$salida[0] = $rs->fetch_all();
				$salida[1] = $rs->fetch_fields();
				return $salida;
			}else{
				return $rs;
			}
		}


		public function kaioken($sel,$tabl,$wher)
		{
			if (strpos($wher,'@usr')) {
				require_once '../_config/ecy.php';
				$cy = new _cy();
				$usr = str_replace("\0","",base64_decode($_SESSION['USR']));//$cy->decy($_SESSION['USR']));
				$wher = str_replace('@@usr', $usr, $wher);
			}

			if (strpos($sel,'@tp')) {
				$sel = str_replace('@@tp', 'idtipousuario', $sel);
			}

			$wher = addslashes($wher);

			$rs = $this->db->ejecutar("call krattos('$sel',$tabl,'$wher')");
			if (isset($rs->num_rows)) {
				$salida[0] = $rs->fetch_all();
				$salida[1] = $rs->fetch_fields();
				return $salida;
			}else{
				return $rs;//." call krattos('$sel',$tabl,'$wher')";
			}
		}

		public function genkidama($accion,$tabl,$arg1,$args2)
		{

			if (strpos($args2,'@usr')) {
				$usr = str_replace("\0","",base64_decode($_SESSION['USR']));//$cy->decy($_SESSION['USR']));
				$args2 = str_replace('@@usr', $usr, $args2);
			}

			if (strpos($args2,'@impresa')) {
				$impresa = $_SESSION['IMPRESA'];
				$args2 = str_replace('@@impresa', $impresa, $args2);
			}

			if (strpos($arg1,'@impresa')) {
				$impresa = $_SESSION['IMPRESA'];
				$arg1 = str_replace('@@impresa', $impresa, $arg1);
			}
			
			if (strpos($arg1,'@usr')) {
				$usr = str_replace("\0","",base64_decode($_SESSION['USR']));
				$arg1 = str_replace('@@usr', $usr, $arg1);
			}

			$args2 = addslashes($args2);

			$rs = $this->db->ejecutar("call shadow($accion,$tabl,'$arg1','$args2')");

			if (isset($rs->num_rows)) {
				return $rs->fetch_all();
			}else{
				return $rs;//." call shadow($accion,$tabl,'$arg1','$args2')";//$rs." ".$this->sql;
			}
		}

		public function sel_col($sel,$tabl,$wher){

			if (strpos($wher,'@usr')) {
				require_once '../_config/ecy.php';
				$cy = new _cy();
				$usr = str_replace("\0","",base64_decode($_SESSION['USR']));//$cy->decy($_SESSION['USR']));
				$wher = str_replace('@@usr', $usr, $wher);
			}

			if (strpos($sel,'@tp')) {
				// require_once '../_config/ecy.php';
				$sel = str_replace('@@tp', 'idtipousuario', $sel);
			}

			if (strpos($wher,'@impresa')) {
				$impresa = $_SESSION['IMPRESA'];
				$wher = str_replace('@@impresa', $impresa, $wher);
			}

			if (strpos($wher, '@tmp')) {
				// $str = ($_SESSION['TIPO'] == 1) && ($_SESSION['TMP_CIA'] == 0) ? "0" : $_SESSION['IMPRESA'];
				$str  = $_SESSION['TMP_CIA'];
				$wher = str_replace('@@tmp_cia', $str , $wher);
			}

			$wher = addslashes($wher);

			$rs = $this->ejecutarSelectColums("call krattos('$sel',$tabl,'$wher')");
			
			if (isset($rs->num_rows)) {
				return $rs->fetch_all();
			}else{
				return $rs;//." call krattos('$sel',$tabl,'$wher')";
			}
		}

		public function kamehameha($sel,$tabl,$wher){

			if (strpos($wher,'@usr')) {
				require_once '../_config/ecy.php';
				$cy = new _cy();
				$usr = str_replace("\0","",base64_decode($_SESSION['USR']));//$cy->decy($_SESSION['USR']));
				$wher = str_replace('@@usr', $usr, $wher);
			}

			if (strpos($sel,'@tp')) {
				// require_once '../_config/ecy.php';
				$sel = str_replace('@@tp', 'idtipousuario', $sel);
			}

			if (strpos($wher,'@impresa')) {
				$impresa = $_SESSION['IMPRESA'];
				$wher = str_replace('@@impresa', $impresa, $wher);
			}

			if (strpos($sel,'@impresa')) {
				$impresa = $_SESSION['IMPRESA'];
				$sel = str_replace('@@impresa', $impresa, $sel);
			}

			if (strpos($wher, '@tmp')) {
				// $str = ($_SESSION['TIPO'] == 1) && ($_SESSION['TMP_CIA'] == 0) ? "0" : $_SESSION['IMPRESA'];
				$str  = $_SESSION['TMP_CIA'];
				$wher = str_replace('@@tmp_cia', $str , $wher);
			}

			$wher = addslashes($wher);

			$rs = $this->db->ejecutar("call krattos('$sel',$tabl,'$wher')");
			
			if (isset($rs->num_rows)) {
				return $rs->fetch_all();
			}else{
				return $rs;//." call krattos('$sel',$tabl,'$wher')";
			}
		}

		public function usrDecy()
		{
			return base64_decode($_SESSION['USR']);//$this->cy->decy($_SESSION['USR']);
		}

		public function mant($tabla,$args,$ant = ''){
			$posicion = strpos($tabla, '-');
			$schema = $posicion ? substr($tabla, 0,$posicion).'.' : '';
			$tabla = $posicion ? substr($tabla, $posicion+1) : $tabla;

			$this->sql = "call ".$schema."sp_mant".$tabla."s(".$this->_values($args,$ant);
			return $this->ejecutarSelect();
		}

		public function startTransaccion($tabla){
			$this->db->conect();
			$this->db->mysql_conexion->autocommit(FALSE);

			try {
				mysqli_begin_transaction($this->db->mysql_conexion);

				$id_new = mysqli_query($this->db->mysql_conexion,$this->lsql[0]);

				if ($id_new) {
					$id_new = $id_new->fetch_all();
				}else{
					throw new Exception($this->db->mysql_conexion->error, 1);
				}

				array_shift($this->lsql);

				if (sizeof($this->lsql)) { //TIENE DETALLE
					
					foreach ($this->lsql as $obj) {
						$msql = str_replace('?', $id_new[0][0], $obj);
						$rs = mysqli_query($this->db->mysql_conexion,$msql);
						
						// $rs = str_replace('?', $id_new[0][0], $obj);
						if( !$rs )
							throw new Exception($this->db->mysql_conexion->error, 1);
					}
					
				}
				mysqli_commit($this->db->mysql_conexion);
			} catch (Exception $e) {
				$id_new = $e->getMessage();
				$this->db->mysql_conexion->rollback();
			}
			$this->db->mysql_conexion->autocommit(TRUE);
			mysqli_close($this->db->mysql_conexion);
			
			return $id_new.' - ';//is_array($id_new) ? array('0' => $id_new) : $id_new;
			
		}

		public function mantTransaccion($tabla,$args,$ant = ''){
			$posicion = strpos($tabla, '-');
			$schema = $posicion ? substr($tabla, 0,$posicion).'.' : '';
			$tabla = $posicion ? substr($tabla, $posicion+1) : $tabla;
			return "call ".$schema."sp_mant".$tabla."s(".$this->_values($args,$ant);
		}

		private function _values($arg,$ant){
			$salida = '';
			
			foreach ($arg as $key) {
				$param = str_replace('?', $ant, $key);

				if (is_array($param)) {
					$it = '';
					foreach ($param as $obj) {
						$it .= $obj.',';
					}
					$param = $it;
				}

				$param = addslashes($param);
				
				if ($param == '@@@')
					$salida .= "@var,";
				else
			    	$salida .= "'".$param."',";
			}

			$salida = substr($salida,0,-1);
			$salida .= ")";
			return $salida;
		}

		function _names($arg){
			$salida = '';
			while (list($clave) = each($arg)) {
			    $salida .= "'".$clave."',";
			}
			$salida = substr($salida,0,-1);
			$salida .= ")";
			return $salida;
		}


	}
	

 ?>