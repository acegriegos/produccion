<!DOCTYPE html>
<html>
<head>
    <title>IRobot</title>
</head>
<body>

<?php 
    set_time_limit(0);
    require_once '_config/mysqlDB.php';
    $_REQUEST['accion'] = 99;
    require_once 'wsdlClient.php';
    $fe = new facturaElectronica();
    $db = new DBClass();
    set_time_limit(0);
    if (isset($_REQUEST['succ'])) {
        $valores = $db->ejecutar('select botmail,botpswd from ajustessucursales where idsucursal = '.$_REQUEST['succ'])->fetch_all()[0];
        $username = $valores[0];
        $password  = $valores[1];

        $check = 1;
    }else{
        $username = 'fe.recepcionelectronica@gmail.com';
        $password  = 'Login2Help';
        $check = 0;
    }
    
    $hostname='{imap.gmail.com:993/debug/imap/ssl/novalidate-cert}INBOX';

    if($check){
       $arroba = strrpos($username, '@');
        if($arroba){
            $p1 = substr($username, $arroba+1);
            $point = strrpos($p1, '.');
            $final = substr($p1, 0,$point);
            switch($final){
                case 'hotmail':
                case 'outlook':
                    $hostname = '{imap-mail.outlook.com:993/imap/ssl/novalidate-cert}INBOX';
                    break;
                case 'yahoo':
                    $hostname = "{imap.mail.yahoo.com:993/imap/ssl/novalidate-cert}INBOX";
                    break;
                default:
                    break;
            }
        }else
            exit(0); 
    }
    

    $inbox = imap_open($hostname,$username,$password) or die('Cannot connect to Tiriyo: ' . imap_last_error());
    
    $emails = imap_search($inbox,'UNSEEN');

    if($emails) {
        $emails = array_reverse($emails);
        foreach($emails as $index => $email_number) {
        
        if ($index+1 >= 20) {
           break;
        }

        $overview = imap_fetch_overview($inbox,$email_number,0);
        $message = imap_fetchbody($inbox,$email_number, 1);
        $structure = imap_fetchstructure($inbox,$email_number);

        $attachments = array();

        if(isset($structure->parts) && count($structure->parts)) 
        {
            for($i = 0; $i < count($structure->parts); $i++) 
            {
                $attachments[$i] = array(
                    'is_attachment' => false,
                    'filename' => '',
                    'name' => '',
                    'attachment' => ''
                );

                if($structure->parts[$i]->ifdparameters) 
                {
                    foreach($structure->parts[$i]->dparameters as $object) 
                    {
                        if(strtolower($object->attribute) == 'filename') 
                        {   
                            $attachments[$i]['is_attachment'] = true;
                            $attachments[$i]['filename'] = $object->value;
                        }
                    }
                }

                if($structure->parts[$i]->ifparameters) 
                {
                    foreach($structure->parts[$i]->parameters as $object) 
                    {
                        if(strtolower($object->attribute) == 'name') 
                        {
                            $attachments[$i]['is_attachment'] = true;
                            $attachments[$i]['name'] = $object->value;
                        }
                    }
                }

                if($attachments[$i]['is_attachment']) 
                {
                    $attachments[$i]['attachment'] = imap_fetchbody($inbox, $email_number, $i+1);

                    if($structure->parts[$i]->encoding == 3) 
                    { 
                        $attachments[$i]['attachment'] = base64_decode($attachments[$i]['attachment']);
                    }
                    elseif($structure->parts[$i]->encoding == 4) 
                    { 
                        $attachments[$i]['attachment'] = quoted_printable_decode($attachments[$i]['attachment']);
                    }
                }
            }
        }

        foreach($attachments as $attachment)
        {

            if($attachment['is_attachment'] == 1)
            {
                if (strpos($attachment['name'], '.xml') || strpos($attachment['filename'], '.xml') || strpos($attachment['attachment'], 'xml')) {
                    $salida = [];
                    loadXML_FILE($attachment['attachment'],$salida,$db);
                    print_r($salida);
                }
            }
        }
         
        $email_number;
        $overview[0]->subject;
        $from = $overview[0]->from;
        $date = $overview[0]->date;
  }
 }
 imap_close($inbox);
  
?>

</body>
</html>