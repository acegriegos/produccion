<?php 
    require_once '_config/mysqlDB.php';
    set_time_limit(0);
    $_REQUEST['accion'] = 99;
    require_once 'wsdlClient.php';
 ?>
<!DOCTYPE html>
<html>
<head>
    <title>IRobot</title>
</head>
<body>

<?php 
    $fe = new facturaElectronica(0);
    $db = new DBClass();
    set_time_limit(0);
    if (isset($_REQUEST['succ'])) {
        $valores = $db->ejecutar('select botmail,botpswd from ajustessucursales where idsucursal = '.$_REQUEST['succ'])->fetch_all()[0];
        $username = $valores[0];
        $password  = $valores[1];
        $cedula = $db->ejecutar('select replace(cedula,"-","") from sucursales where id = '.$_REQUEST['succ'])->fetch_all()[0][0];
        $check = 1;
    }else{
        $username = 'fe.recepcionelectronica@gmail.com';
        $password  = 'Login2Help';
        $check = 0;
        $cedula = '';
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

    $inbox = imap_open($hostname,$username,$password) or die('Cannot connect: ' . imap_last_error());
    
    $emails = imap_search($inbox,'UNSEEN');
    
    if($emails) {
        $emails = array_reverse($emails);
        foreach($emails as $index => $email_number) {
        /*if ($index+1 >= 20) {
            break;
        }*/

        $_index = 0;
        $overview = imap_fetch_overview($inbox,$email_number,0);
        $message = imap_fetchbody($inbox,$email_number, 1);
        $structure = imap_fetchstructure($inbox,$email_number);

        $attachments = array();
        if(!isset($structure->parts))
            continue;
        if(count($structure->parts)) 
        {
            for($i = 0; $i < count($structure->parts); $i++) 
         
            {
                if($structure->parts[$i]->subtype == 'MIXED') 
                {

                   $spart = 0;
                   foreach($structure->parts[$i] as $object) 
                    {   

                        if(is_array($object)){
            
                        $spart++;    
                        foreach($object as $j=>$nobject){
                            
                            $attachments[$_index] = array(
                                'is_attachment' => false,
                                'filename' => '',
                                'name' => '',
                                'attachment' => ''
                            );
                            if(isset($nobject->dparameters)){
                           
                           if($nobject->ifdparameters){ 
                            
                           foreach($nobject->dparameters as $_object) 
                                {
                                    
                                    if(strtolower($_object->attribute) == 'filename') 
                                    {   
                                        
                                        $attachments[$_index]['is_attachment'] = true;
                                        $attachments[$_index]['filename'] = $_object->value;
                                    }
                                }
                            }
                            }  

                            if(isset($nobject->parameters)){
                               
                            if($nobject->ifparameters){
                                
                                foreach($nobject->parameters as $__object) 
                                {
                                    
                                    if(strtolower($__object->attribute) == 'name') 
                                    {
                                        
                                        $attachments[$_index]['is_attachment'] = true;
                                        $attachments[$_index]['name'] = $__object->value;
                                    }
                                }
                            }
                            }

                            if($attachments[$_index]['is_attachment']) 
                        {
                                $attachments[$_index]['attachment'] = imap_fetchbody($inbox, $email_number, $spart.'.'.($j+1));
                                $attachments[$_index]['attachment'] = base64_decode($attachments[$_index]['attachment']);
                                $_index++;
                        }
                        }

                        }
                    }

                }else{

                      if(isset($structure->parts[$i]->parts)){
                        foreach ($structure->parts[$i]->parts as $indx => $obj) {
                            $attachments[$_index] = array(
                                'is_attachment' => false,
                                'filename' => '',
                                'name' => '',
                                'attachment' => ''
                            );

                            if($obj->ifdparameters) 
                            {
                                foreach($obj->dparameters as $object) 
                                {
                                    if(strtolower($object->attribute) == 'filename') 
                                    {   
                                        $attachments[$_index]['is_attachment'] = true;
                                        $attachments[$_index]['filename'] = $object->value;
                                    }
                                }
                            }

                            if($obj->ifparameters) 
                            {   
                                
                                foreach($obj->parameters as $object) 
                                {
                                    if(strtolower($object->attribute) == 'name') 
                                    {
                                        $attachments[$_index]['is_attachment'] = true;
                                        $attachments[$_index]['name'] = $object->value;
                                    }
                                }
                            }

                            if($attachments[$_index]['is_attachment']) 
                            {
                                $attachments[$_index]['attachment'] = imap_fetchbody($inbox, $email_number, ($i+1).'.'.($indx+1));
                                if($obj->encoding == 3) 
                                { 
                                    $attachments[$_index]['attachment'] = base64_decode($attachments[$_index]['attachment']);
                                }
                                elseif($obj->encoding == 4) 
                                { 
                                    $attachments[$_index]['attachment'] = quoted_printable_decode($attachments[$_index]['attachment']);
                                }
                                elseif($obj->encoding == 0)
                                {
                                     $attachments[$_index]['attachment'] = base64_decode($attachments[$_index]['attachment']);

                                }

                                $_index++;
                            }
                        }
                      }else{

                           $attachments[$_index] = array(
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
                                        $attachments[$_index]['is_attachment'] = true;
                                        $attachments[$_index]['filename'] = $object->value;
                                    }
                                }
                            }

                            if($structure->parts[$i]->ifparameters) 
                            {   
                                
                                foreach($structure->parts[$i]->parameters as $object) 
                                {
                                    if(strtolower($object->attribute) == 'name') 
                                    {
                                        $attachments[$_index]['is_attachment'] = true;
                                        $attachments[$_index]['name'] = $object->value;
                                    }
                                }
                            }

                            if($attachments[$_index]['is_attachment']) 
                            {
                                $attachments[$_index]['attachment'] = imap_fetchbody($inbox, $email_number, $i+1);
                                if($structure->parts[$i]->encoding == 3) 
                                { 
                                    $attachments[$_index]['attachment'] = base64_decode($attachments[$_index]['attachment']);
                                }
                                elseif($structure->parts[$i]->encoding == 4) 
                                { 
                                    $attachments[$_index]['attachment'] = quoted_printable_decode($attachments[$_index]['attachment']);
                                }
                                elseif($structure->parts[$i]->encoding == 0)
                                {
                                     $attachments[$_index]['attachment'] = base64_decode($attachments[$_index]['attachment']);

                                }

                                $_index++;
                            }
                        }
                }
            }

        }

        foreach($attachments as $attachment)
        {
            if($attachment['is_attachment'] == 1)
            {
               if (strpos(strtolower($attachment['name']), '.xml') || strpos(strtolower($attachment['filename']), '.xml') || strpos($attachment['attachment'], '.xml')) {
                    $salida = [];
                    $fe->loadXML_FILE($attachment['attachment'],$salida,$db,$cedula);
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