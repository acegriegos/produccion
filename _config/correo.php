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
		
	    $this->para = $pr;

	    $this->headers['From']    = 'sistemas.compras.lt@gmail.com';//'smtp@supercable.co.cr';
	    $this->headers['To']      = $pr;
	    $this->headers['Subject'] = $tit;
	    $this->headers['Content-Type'] = 'text/html; charset=UTF-8';

	    $this->smtpinfo["host"] = "smtp.gmail.com";
	    $this->smtpinfo["port"] = "587";
	    $this->smtpinfo["auth"] = true;
	    $this->smtpinfo["username"] = "sistemas.compras.lt@gmail.com";
	    $this->smtpinfo["password"] = "p82F5bxh";

	    $this->body = $msj;
	    // Create the mail object using the Mail::factory method
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