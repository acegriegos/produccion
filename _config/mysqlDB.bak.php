<?php

if (session_status() !== PHP_SESSION_ACTIVE){
    session_start();
}
require_once 'ecy.php';

/**
* Clase de conexion a base de datos usando MYSQL 
* Se puede pensar a futuro crear clase Abstracta 
* Listo clase RUD creada
*/
class DBClass
{
	var $encrypt;
	var $db;
	var $usr;
	var $pss;
	var $host;
	var $mysql_conexion;

	function __construct()
	{
		$this->encrypt = new _cy();
		$this->db  = trim($this->encrypt->decy("U1Y1N0FCcUthTzRFa2c9PQ=="));
		$this->usr = trim($this->encrypt->decy("VUZoeEJ3ZlpMUT09"));
	    $this->pss = trim($this->encrypt->decy("ZFVOekRRSGJWT0lIakE9PQ=="));
		
		$this->host = '127.0.0.1';
	}

	function conect(){
		$this->mysql_conexion = new mysqli($this->host,$this->usr,$this->pss,$this->db);
		
		if($this->mysql_conexion->connect_error){
			return false;
		}
		else {
			return true;
		}
	}

	function close(){
		$this->mysql_conexion->close();
	}

	function open_Distic_Conection($host,$usr,$pss,$db){
		$this->db = $db;
		$this->usr = $usr;
		$this->pss = $pss;
		$this->host = $host;

	}

	function ejecutar($sql){
		$this->conect();
		$salida = $this->mysql_conexion->query($sql);

		/*CONOCER EL ERROR*/
		if (!$salida) {
			// $_SESSION['ERRNO'] = $this->mysql_conexion->errno;
			switch ($this->mysql_conexion->errno) {
				case '1318':
					$salida = "Prámetros Incompatibles entre el SP y la Vista(".$sql.")";
					break;
				
				default:
					$salida = $this->mysql_conexion->error; 
					break;
			}
			
		}
		$this->close();
		return $salida;
	}
}

?>
