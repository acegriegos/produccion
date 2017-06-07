<?php 

	require_once 'mysqlDB.php';
	require_once '../_config/ecy.php';
	/**
	* RUP crea los metodos para insertar,actualizar y eliminar de forma abstracta
	*/
	 abstract class RUD 
	{
		
		var $db;
		var $sql;
		var $cy;

		function __construct()
		{
			$this->db = new dbClass();
			$this->cy = new _cy();
		}

		public function getDB(){
			return $this->db;
		}

		public function ejecutarSelect(){
			$rs = $this->db->ejecutar($this->sql);

			if (isset($rs->num_rows)) {
				return $rs->fetch_all();
			}else{
				return $rs;//." ".$this->sql;
			}
		}

		public function ejecutarSelectColums(){
			$salida = [];
			$rs = $this->db->ejecutar($this->sql);

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
				$usr = str_replace("\0","",$cy->decy($_SESSION['USR']));
				$wher = str_replace('@@usr', $usr, $wher);
			}

			if (strpos($sel,'@tp')) {
				$sel = str_replace('@@tp', 'idtipousuario', $sel);
			}

			$wher = str_replace("'", '\\\'', $wher);
			$wher = str_replace('"', '\\"', $wher);

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
				require_once '../_config/ecy.php';
				$cy = new _cy();
				$usr = str_replace("\0","",$cy->decy($_SESSION['USR']));


				$args2 = str_replace('@@usr', $usr, $args2);
			}

			if (strpos($args2,'@impresa')) {
				$impresa = $_SESSION['IMPRESA'];
				$args2 = str_replace('@@impresa', $impresa, $args2);

				if (($_SESSION['TIPO'] == 1) && ($_SESSION['TMP_CIA'] == 0)) {
					$args2 = str_replace('and idempresa = '.$impresa ,'', $args2);
				}
			}

			$args2 = str_replace("'", '\\\'', $args2);
			$args2 = str_replace('"', '\\"', $args2);

			$rs = $this->db->ejecutar("call shadow($accion,$tabl,'$arg1','$args2')");

			if (isset($rs->num_rows)) {
				return $rs->fetch_all();
			}else{
				return "call shadow($accion,$tabl,'$arg1','$args2')";//$rs." ".$this->sql;
			}
		}

		public function kamehameha($sel,$tabl,$wher){

			if (strpos($wher,'@usr')) {
				require_once '../_config/ecy.php';
				$cy = new _cy();
				$usr = str_replace("\0","",$cy->decy($_SESSION['USR']));
				$wher = str_replace('@@usr', $usr, $wher);
			}

			if (strpos($sel,'@tp')) {
				require_once '../_config/ecy.php';
				$sel = str_replace('@@tp', 'idtipousuario', $sel);
			}

			if (strpos($wher,'@impresa')) {
				$impresa = $_SESSION['IMPRESA'];
				$wher = str_replace('@@impresa', $impresa, $wher);

				if (($_SESSION['TIPO'] == 1) && ($_SESSION['TMP_CIA'] == 0)) {
					$wher = str_replace('and idempresa = '.$impresa ,'', $wher);
				}
			}

			if (strpos($wher, '@tmp')) {
				$str = ($_SESSION['TIPO'] == 1) && ($_SESSION['TMP_CIA'] == 0) ? "0" : $_SESSION['IMPRESA'];
				$wher = str_replace('@@tmp_cia', $str , $wher);
			}

			$wher = addslashes($wher);
			
			$rs = $this->db->ejecutar("call krattos('$sel',$tabl,'$wher')");

			if (isset($rs->num_rows)) {
				return $rs->fetch_all();
			}else{
				return $rs." call krattos('$sel',$tabl,'$wher')";
			}
		}

		public function usrDecy()
		{
			return $this->cy->decy($_SESSION['USR']);
		}

		public function mant($tabla,$args,$ant = ''){
			$this->sql = "call sp_mant".$tabla."s(".$this->_values($args,$ant);
			return $this->ejecutarSelect();
		}

		private function _values($arg,$ant){
			$salida = '';
			
			while (list($clave,$param) = each($arg)) {
				if ($param == '?')
					$param = $ant;
				if (is_array($param)) {
					$it = '';
					foreach ($param as $obj) {
						$it .= $obj.',';
					}
					$param = $it;
				}
				$param = str_replace("'", '\\\'', $param);
				$param = str_replace('"', '\\"', $param);
				
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