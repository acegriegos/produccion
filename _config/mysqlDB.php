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
	var $port = 3306;
	var $mysql_conexion;

	function __construct()
	{
		$this->encrypt = new _cy();
		$this->db  = 'production';
		$this->usr = 'itech01';
	    $this->pss = 'Login2Help';
		$this->host = '127.0.0.1';
	}

	function conect(){
		$this->mysql_conexion = new mysqli($this->host,$this->usr,$this->pss,$this->db,$this->port);
		
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
		$_SESSION['ERRNO'] = 0;
		/*CONOCER EL ERROR*/
		if (!$salida) {
			$_SESSION['ERRNO'] = $this->mysql_conexion->errno;
			if($this->mysql_conexion->errno != '1644' && $this->mysql_conexion->errno != '45000'){
				$_salida = $this->mysql_conexion->query('insert into registrosql values(null,now(),"'.$sql.'","'.addslashes($this->mysql_conexion->error).'")');
			}
			switch ($this->mysql_conexion->errno) {
				case '1318':
					$salida = "Prámetros Incompatibles entre el SP y la Vista(".$sql.")";
					break;
				case '1172':
					$salida =  $sql;
					break;
				default:
					$salida = $this->mysql_conexion->error; 
					break;
			}
			
		}
		$this->close();
		return $salida;
	}

	public function getDB()
	{
		return $this->db;
	}

	public function getUSR()
	{
		return $this->usr;
	}

	public function getPSS()
	{
		return $this->pss;
	}

	public function getPort()
	{
		return $this->port;
	}
}

?>