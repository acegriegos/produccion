<?php

require_once '../assets/libs/swiftmail/swift_required.php';

class correo 
{
    var $mailer;
    var $message;

    function __construct($pr,$tit,$msj)
    {
      	include_once 'mysqlDB.php';
		$base = new DBClass();
		$res = $base->ejecutar('call sp_getGeneralMail();')->fetch_all();

      	$transport = Swift_SmtpTransport::newInstance($res[2][0],$res[3][0])
      		->setUsername($res[1][0])
      		->setPassword($res[0][0]);
    $empresa = isset($_SESSION['EMPRESA']) ? $_SESSION['EMPRESA'] : 'Logintech';
     	$this->mailer = Swift_Mailer::newInstance($transport);
     	$this->message = Swift_Message::newInstance($tit)
     		->setFrom(array($res[1][0] => $empresa))
     		->setTo( explode(',',$pr) )
     		->setBody($msj,'text/html');

        //'<div style="min-height:250px;background-color: #0B3861; margin-left:15%;margin-right: 15%;color: white">'. .'</div>'
    }

    function enviar(){
	     if ($this->mailer->send($this->message)) {
	        return 1;
	     } else {
	        return 0;
	     }
    }

    function enviar_adjunto($vAdjunto){

      if ($vAdjunto == '')
        return 1;
      
      if(is_array($vAdjunto)){
        for ($i=0; $i < sizeof($vAdjunto); $i++) { 
          $this->message->attach(Swift_Attachment::fromPath('../assets/'.$vAdjunto[$i]));
        }
      }else
        $this->message->attach(Swift_Attachment::fromPath('../assets/'.$vadjunto));      

      if ($this->mailer->send($this->message)) {
          if(is_array($vAdjunto)){
            for ($i=0; $i < sizeof($vAdjunto); $i++) { 
              unlink('../assets/'.$vAdjunto[$i]);
            }
          }else
            unlink('../assets/'.$vAdjunto);
              
          return 1;
       } else {
          return 0;
       }

    }
}

?>