<?php

 /* use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;*/

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

require_once $ubi.'assets/libs/phpmailer/PHPMailer.php';
require_once $ubi.'assets/libs/phpmailer/SMTP.php';
require_once $ubi.'assets/libs/phpmailer/Exception.php';


class correo 
{
    var $mailer;
    var $message;
    var $ubi;
    var $borrar;
    var $mail;

    function __construct($pr,$tit,$msj,$ubi='../',$borrar=1)
    { 
        include_once 'mysqlDB.php';
        session_write_close();
        $this->ubi = $ubi;
        $this->borrar = $borrar;
        $base = new DBClass();

        $gcrr = isset($_SESSION['IMPRESA']) ? $_SESSION['IMPRESA'] : 0;
        $res = $base->ejecutar('call sp_getGeneralMail('.$gcrr.')')->fetch_all()[0];
        $no_replay = $res[1] == 'correos.logintechcr@gmail.com' || $res[1] == 'facturacion@apsycr.com' ? 'Esta dirección de correo electrónico no admite respuestas. Para obtener más información, visita el sitio' : '';
        
        $msj = $this->getBody($msj,$no_replay);

        $this->mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $this->mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_OFF;
        $this->mail->isSMTP();
        $this->mail->Host       = $res[2];
        $this->mail->SMTPAuth   = true;
        $this->mail->Username   = $res[1];
        $this->mail->Password   = $res[0];
        $this->mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $this->mail->Port       = $res[3]; 

        $empresa = isset($_SESSION['EMPRESA']) ? $_SESSION['EMPRESA'] : 'APSY';
        $this->mail->setFrom($res[1], $empresa);
        $marray = explode(',', $pr);
        foreach ($marray as $_correo) {
          $this->mail->addAddress($_correo); //AGREGAR NOMBRE A QUIEN VA EL CORREO
        }
        
        $this->mail->isHTML(true);
        $this->mail->Subject = $tit;
        $this->mail->Body    = $msj;
        $this->mail->CharSet = 'UTF-8';

        if (isset($_SESSION['BUSS'])) 
          if ($_SESSION['BUSS'] == 1)
            $this->mail->addCC($_SESSION['CRR'],$_SESSION['NOM']);
    }

    function getBody($msj,$no_replay){
      return '<table border="0" cellpadding="0" cellspacing="0" style="max-width:600px"><tbody><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="left"></td><td align="right"></td></tr></tbody></table></td></tr><tr height="16"></tr><tr><td><table bgcolor="#FAFAFA" border="0" cellpadding="0" cellspacing="0" style="min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:1px solid #c0c0c0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px" width="100%"><tbody><tr height="16px"><td rowspan="3" width="32px"></td><td></td><td rowspan="3" width="32px"></td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" style="min-width:300px"><tbody><tr><td style=" display:none;font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;padding-bottom:4px"></td></tr><tr><td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;padding:4px 0">'.$msj.'</td></tr><tr><td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;padding-top:28px">El equipo de cuentas de APSY</td></tr><tr height="16px"></tr><tr><td><table style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:12px;color:#b9b9b9;line-height:1.5"><tbody><tr><td>'.$no_replay.' <a href="https://www.apsycr.com" style="text-decoration:none;color:#4285f4" target="_blank" data-saferedirecturl="#!">www.apsycr.com</a>.</td></tr></tbody></table></td></tr></tbody></table></td></tr><tr height="32px"></tr></tbody></table></td></tr><tr height="16"></tr><tr><td style="max-width:600px;font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:10px;color:#bcbcbc;line-height:1.5"></td></tr><tr><td><table style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:10px;color:#666666;line-height:18px;padding-bottom:10px"><tbody><tr><td></td></tr></tbody></table></td></tr></tbody></table>';
    }

    function enviar(){

      $salida = ['success'=>1];

      try{
        $this->mail->send();
      }catch (Exception $e) {
         $salida = ['success'=>0,'error'=>$this->mail->ErrorInfo]; 
      }

      return json_encode($salida);
    }

    function enviar_adjunto($vAdjunto){

      if ($vAdjunto == ''){
        return 1;
      }
    
      if(is_array($vAdjunto)){
        for ($i=0; $i < sizeof($vAdjunto); $i++) { 
          if (file_exists($this->ubi.'assets/'.$vAdjunto[$i]))
            $rs = $this->mail->addAttachment($this->ubi.'assets/'.$vAdjunto[$i]);
          else
            echo $this->ubi.'assets/'.$vAdjunto[$i];
        }
      }else
        $this->$mail->addAttachment($this->ubi.'assets/'.$vAdjunto);      


      $salida = ['success'=>1];

      try{
        $this->mail->send();
      }catch (Exception $e) {
        $salida = ['success'=>0,'error'=>$this->mail->ErrorInfo]; 
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