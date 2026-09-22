<?php 
    if(!isset($_REQUEST['exo'])){
        $salida['error'] = 'Exoneración no Existente';
        $salida['succed'] = 0; 
    }else{
    $_REQUEST['ced'] = isset($_REQUEST['ced']) ? $_REQUEST['ced'] : '0';
    $source = "https://api.hacienda.go.cr/fe/ex?autorizacion=".$_REQUEST['exo'];
    $ch = curl_init($source);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    /*curl_setopt($ch, CURLOPT_SSLVERSION,0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);*/
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Connection:keep-alive',
        'Cache-Control: no-cache',
        'Pragma: no-cache',
        'Expires: 0',
        'User-Agent: PHP',
    ]);
    $data = curl_exec($ch);
    $error = curl_error($ch);
    echo $error;
    curl_close ($ch);
    
    $data = (array)json_decode($data);
    
    if (isset($data['numeroDocumento'])) {
        if($data['identificacion'] == $_REQUEST['ced']){
            $salida = $data;
            $salida['succed'] = 1;
            if(isset($data['cabys'])){
                include_once './_config/mysqlDB.php';
                $db = new dbClass();

                $lista = implode(',', $data['cabys']);
                $lista = '("'.$_REQUEST['exo'].'","'.str_replace(',', '"),("'.$_REQUEST['exo'].'","',$lista).'")';
                
                $salida['del'] = $db->ejecutar('delete from exoneracioncabys where idexo = "'.$_REQUEST['exo'].'"');
                $salida['ins'] = $db->ejecutar('insert into exoneracioncabys values '.$lista);
            }else{
                $salida['del'] = $db->ejecutar('delete from exoneracioncabys where idexo = "'.$_REQUEST['exo'].'"');
                $salida['ins'] = $db->ejecutar('insert into exoneracioncabys values ("'.$_REQUEST['exo'].'","*")');
            }
            
        }else{
            $salida['error'] = 'Exoneración no Corresponde al Cliente';
            $salida['succed'] = 0;
        }
    }else{
        $salida['error'] = 'Exoneración no Existente';
        $salida['succed'] = 0;
    }
    }
    echo json_encode($salida);
    
 ?>