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
		$this->db  = trim($this->encrypt->decy('Uyp/p/7Y5S+7mmilYzGx/URNNNoD3yRx62G/GJXtSr0='));
		$this->usr = trim($this->encrypt->decy("dvywc7DJzGEs7FG3xzA3149kB4NoWJ/180efl9v3EkI="));
	    $this->pss = trim($this->encrypt->decy("1eKYMc9PrUoktk7U7n5oiko86fKxQ/FiTOMD8SER7bY="));
		
		$this->host = '127.0.0.1';
	}

	function conect(){
		$this->mysql_conexion = new mysqli($this->host,$this->usr,$this->pss,$this->db);
		
		if($this->mysql_conexion->connect_error){
			//die("ERROR DE CONEXION: ". $this->mysql_conexion->connect_errno.", " . $this->mysql_conexion->connect_error);
			$this->mysql_conexion->set_charset('utf8');
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
			$salida = $this->mysql_conexion->error; 
		}
		$this->close();
		return $salida;
	}
}

?>