<?php
    session_start();

    if(!empty($_FILES)){
        require_once '_config/mysqlDB.php';
        $base = new DBClass();
        print_r($_REQUEST);
        if (isset($_REQUEST['accion'])) {

            if (is_array($_FILES['file']['name'])) {

                for ($i=0; $i < sizeof($_FILES['file']['name']); $i++) { 

                    $temp = $_FILES['file']['tmp_name'][$i];
                    $dir_separator = DIRECTORY_SEPARATOR;

                    switch ($_REQUEST['accion']) {
                        case 1: //IMAGENES SUCURSALES
                            $folder = 'assets/img/logos';
                            $name = $_FILES['file']['name'][$i];
                            $ext = end(explode('.', $name));
                            $destination_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator.'logo'.$REQUEST['idsucursal'].$ext;
                            $base->ejecutar("UPDATE sucursales SET logo = '.".$dir_separator.$folder.$dir_separator."logo".$REQUEST['idsucursal'].$ext."' WHERE id = ".$REQUEST['idsucursal']);
                            break;

                        case 2: //P12 SUCURSALES
                            $folder = 'assets/img/logos';
                            $name = $_FILES['file']['name'][$i];
                            $ext = end(explode('.', $name));
                            $destination_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator.'logo'.$REQUEST['idsucursal'].$ext;
                            $base->ejecutar("UPDATE sucursales SET p12 = '.".$dir_separator.$folder.$dir_separator."logo".$REQUEST['idsucursal'].$ext."' WHERE id = ".$REQUEST['idsucursal']);
                            break;
                        case 3: //VALIDAR P12

                            if ($_POST['clave'] == '') {
                                $arr_json = 'Clave de Llave Vacia';
                            }

                            echo $arr_json;
                            break;
                        default:
                            $index = $base->ejecutar('select lpad(count(id)+1, 2,0) from adjuntos where idtabla = 12 and idfila = "'.$_REQUEST['idcompra'].'"')->fetch_all()[0][0];

                            $folder = 'assets/imgupload';
                            $bname = '../assets/imgupload/';
                            $name = $_FILES['file']['name'][$i];
                            $ext = end(explode('.', $name));

                            $destination_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator;
                            $target_path = $destination_path.'img'.$_REQUEST['idcompra'].$index.'.'.$ext;

                            $bname .= 'img'.$_REQUEST['idcompra'].$index.'.'.$ext;
                            $base->ejecutar('insert into adjuntos values(null,12,"'.$_REQUEST['idcompra'].'","'.$bname.'")');
                            break;
                    }

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