<?php
include('Mail.php');
/**
* CORREO
*/
class correo 
{
	var $para;
	var $titulo;
	var $body;
	var $headers;
	var $mail_object;

	var $smtpinfo;

	function __construct($pr,$tit,$msj)
	{
		include_once 'mysqlDB.php';
		$base = new DBClass();
		$res = $base->ejecutar('(select aes_decrypt(valor, "Login2Help") from ajustes where descr = "smtpp")union(select valor from ajustes where descr in ("smtp","smtphost","smtpport"))')->fetch_all();
	    $this->para = $pr;

	    $this->headers['From']    = $res[1][0];
	    $this->headers['To']      = $pr;
	    $this->headers['Subject'] = $tit;
	    $this->headers['Content-Type'] = 'text/html; charset=UTF-8';

	    $this->smtpinfo["host"] = $res[2][0];
	    $this->smtpinfo["port"] = $res[3][0];
	    $this->smtpinfo["auth"] = true;
	    $this->smtpinfo["username"] = $res[1][0];
	    $this->smtpinfo["password"] = $res[0][0];

	    $this->body = $msj;
	    
	    $this->mail_object =& Mail::factory("smtp", $this->smtpinfo); 
	}

	function enviar(){
		return $this->mail_object->send($this->para, $this->headers, $this->body);
	}

	function enviar_general(){
		return $this->mail_object->send('info@logintechcr.com', $this->headers, $this->body);
		//
	}

	function enviar_adjunto($vAdjunto){

		$separador = "_separador_de_trozos_".md5(uniqid(rand()));

		$this->headers['Content-Type'] = "multipart/mixed; boundary = $separador";

		$sCabeceraTexto = "--".$separador;
		$sCabeceraTexto .= "MIME-Version: 1.0\r\n";
		$sCabeceraTexto .= "Content-Type: multipart/mixed; boundary=\"".$separador."\"\r\n\r\n";
		$sCabeceraTexto .= "This is a multi-part message in MIME format.\r\n";
		$sCabeceraTexto .= "\r\n--".$separador."\r\n";
		$sCabeceraTexto .= "Content-type: text/html; charset=UTF-8\r\n"; 
		$sCabeceraTexto .= "Content-transfer-encoding: 7BIT\r\n\r\n";

		$texto = $sCabeceraTexto.$this->body;

		$sAdjuntos = "\r\n--".$separador."\r\n";
		$sAdjuntos .= "Content-Type: application/octet-stream; name=\"".$vAdjunto["name"]."\";multipart/mixed;\r\n";
		$sAdjuntos .= "Content-Transfer-Encoding: BASE64\r\n";
		$sAdjuntos .= "Content-disposition: attachment;filename=\"".$vAdjunto["name"]."\"\r\n\r\n";

		$oFichero = fopen($vAdjunto["tmp_name"], 'r'); 
		$sContenido = fread($oFichero, filesize($vAdjunto["tmp_name"])); 
		$sAdjuntos .= chunk_split(base64_encode($sContenido)); 
		fclose($oFichero); 

		$this->body = $texto.$sAdjuntos;

		return $this->mail_object->send($this->para, $this->headers, $this->body);

	}	

}

 

?>