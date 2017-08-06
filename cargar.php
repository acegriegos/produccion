<?php
    session_start();
    require_once '_config/ecy.php';
    $cy = new _cy();

    if(!empty($_FILES)){
        require_once '_config/mysqlDB.php';
        $base = new DBClass();

        if (isset($_REQUEST['idcompra'])) {
            if (is_array($_FILES['file']['name'])) {

                for ($i=0; $i < sizeof($_FILES['file']['name']); $i++) { 

                    $temp = $_FILES['file']['tmp_name'][$i];
                    $dir_separator = DIRECTORY_SEPARATOR;
                    $folder = 'assets/imgupload';
                    $bname = '../assets/imgupload/';

                    $destination_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator;

                    $index = $base->ejecutar('select lpad(count(id)+1, 2,0) from adjuntos where idtabla = 12 and idfila = "'.$_REQUEST['idcompra'].'"')->fetch_all()[0][0];

                    $name = $_FILES['file']['name'][$i];
                    $ext = end(explode('.', $name));
                    $target_path = $destination_path.'img'.$_REQUEST['idcompra'].$index.'.'.$ext;
                    
                    $bname .= 'img'.$_REQUEST['idcompra'].$index.'.'.$ext;
                    $base->ejecutar('insert into adjuntos values(null,12,"'.$_REQUEST['idcompra'].'","'.$bname.'")');

                    json_encode(move_uploaded_file($temp, $target_path));
                }
            }else{
                $temp = $_FILES['file']['tmp_name'];
                $dir_separator = DIRECTORY_SEPARATOR;
                $folder = 'assets/imgupload';
                $bname = '../assets/imgupload/';

                $destination_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator;

                $index = $base->ejecutar('select lpad(count(id)+1, 2,0) from adjuntos where idtabla = 12 and idfila = "'.$_REQUEST['idcompra'].'"')->fetch_all()[0][0];

                $name = $_FILES['file']['name'];
                $ext = end(explode('.', $name));
                $target_path = $destination_path.'img'.$_REQUEST['idcompra'].$index.'.'.$ext;
                
                $bname .= 'img'.$_REQUEST['idcompra'].$index.'.'.$ext;
                $base->ejecutar('insert into adjuntos values(null,12,"'.$_REQUEST['idcompra'].'","'.$bname.'")');

                echo(json_encode(move_uploaded_file($temp, $target_path)));
            }
        }else{
            echo json_encode("ERROR");
        }
    }
?>