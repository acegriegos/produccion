<?php
$ubi = '../';
if (isset($url2)){
  switch($url2){
    case 99:
      $ubi = './';
      break;
    case 98:
      $ubi = '../';
      break;
    default:
      $ubi = '';
      break;
  }
}

require_once $ubi.'assets/libs/swiftmail/swift_required.php';

class correo 
{
    var $mailer;
    var $message;
    var $ubi;
    var $borrar;

    function __construct($pr,$tit,$msj,$ubi='../',$borrar=1)
    { 
      	include_once 'mysqlDB.php';
        session_write_close();
        $this->ubi = $ubi;
        $this->borrar = $borrar;
		$base = new DBClass();

    //<img height="32" src="https://www.logintechcr.com/resources/img/logo/logogmail.gif" style="display:block;width:92px;height:32px" width="92" class="CToWUd">
    // <tr><td><table bgcolor="#0080C6" border="0" cellpadding="0" cellspacing="0" style="display:none;min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:0;border-top-left-radius:3px;border-top-right-radius:3px" width="100%"><tbody><tr><td colspan="3" height="72px"></td></tr><tr><td width="32px"></td><td style="display:none;font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:24px;color:#ffffff;line-height:1.25;min-width:300px">Solicitud de cambio de contraseña</td><td width="32px"></td></tr><tr><td colspan="3" height="18px"></td></tr></tbody></table></td></tr>
    $gcrr = isset($_SESSION['IMPRESA']) ? $_SESSION['IMPRESA'] : 0;
		$res = $base->ejecutar('call sp_getGeneralMail('.$gcrr.')')->fetch_all()[0];
    $msj = '<table border="0" cellpadding="0" cellspacing="0" style="max-width:600px"><tbody><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="left"></td><td align="right"><img height="32" src="https://www.logintechcr.com/resources/img/logo/safe.png" style="display:block;width:32px;height:32px" width="32" class="CToWUd"></td></tr></tbody></table></td></tr><tr height="16"></tr><tr><td><table bgcolor="#FAFAFA" border="0" cellpadding="0" cellspacing="0" style="min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:1px solid #c0c0c0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px" width="100%"><tbody><tr height="16px"><td rowspan="3" width="32px"></td><td></td><td rowspan="3" width="32px"></td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" style="min-width:300px"><tbody><tr><td style=" display:none;font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;padding-bottom:4px"></td></tr><tr><td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;padding:4px 0">'.$msj.'</td></tr><tr><td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;padding-top:28px">El equipo de cuentas de logintech</td></tr><tr height="16px"></tr><tr><td><table style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:12px;color:#b9b9b9;line-height:1.5"><tbody><tr><td>Esta dirección de correo electrónico no admite respuestas. Para obtener más información, visita el sitio <a href="https://www.logintechcr.com" style="text-decoration:none;color:#4285f4" target="_blank" data-saferedirecturl="#!">www.logintechcr.com</a>.</td></tr></tbody></table></td></tr></tbody></table></td></tr><tr height="32px"></tr></tbody></table></td></tr><tr height="16"></tr><tr><td style="max-width:600px;font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:10px;color:#bcbcbc;line-height:1.5"></td></tr><tr><td><table style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:10px;color:#666666;line-height:18px;padding-bottom:10px"><tbody><tr><td></td></tr></tbody></table></td></tr></tbody></table>';
      	$transport = Swift_SmtpTransport::newInstance($res[2],$res[3])
      		->setUsername($res[1])
      		->setPassword($res[0]);
      $empresa = isset($_SESSION['EMPRESA']) ? $_SESSION['EMPRESA'] : 'APSY';
     	$this->mailer = Swift_Mailer::newInstance($transport);
     	$this->message = Swift_Message::newInstance($tit)
     		->setFrom(array($res[1] => $empresa))
     		->setTo( explode(',',$pr) )
     		->setBody($msj,'text/html');

      if (isset($_SESSION['BUSS'])) 
        if ($_SESSION['BUSS'] == 1) {
          $this->message->setCc(array($_SESSION['CRR']=>$_SESSION['NOM']));
        }
    }

    function enviar(){

	     if($this->mailer->send($this->message,$failures)){
        $salida = ['success'=>1];
      }else{
        $salida = ['success'=>0,'error'=>$failures];
      }

      return json_encode($salida);
    }

    function enviar_adjunto($vAdjunto){

      if ($vAdjunto == '')
        return 1;
    
      if(is_array($vAdjunto)){
        for ($i=0; $i < sizeof($vAdjunto); $i++) { 
          if (file_exists($this->ubi.'assets/'.$vAdjunto[$i]))
            $this->message->attach(Swift_Attachment::fromPath($this->ubi.'assets/'.$vAdjunto[$i]));
          else
            echo $this->ubi.'assets/'.$vAdjunto[$i];
        }
      }else
        $this->message->attach(Swift_Attachment::fromPath($this->ubi.'assets/'.$vAdjunto));      


      if($this->mailer->send($this->message,$failures)){
        $salida = ['success'=>1];
      }else{
        $salida = ['success'=>0,'error'=>$failures];
      }

      if($this->borrar){
        if(is_array($vAdjunto)){
          for ($i=0; $i < sizeof($vAdjunto); $i++) { 
            if (file_exists($this->ubi.'assets/'.$vAdjunto[$i]))
              unlink($this->ubi.'assets/'.$vAdjunto[$i]);
          }
        }else
          unlink($this->ubi.'assets/'.$vAdjunto);
      }
          
      return json_encode($salida);

    }
}

?>