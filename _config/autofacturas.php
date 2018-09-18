<?php 
    session_start();

    if (!isset($_SESSION['IMPRESA'])) {
        echo "Usuaro sin Registrar";
        exit(0);
    }
    
    require_once 'mysqlDB.php';
    require_once '../wsdlClient.php';
    $db = new DBClass();

    /*$fact_sin_subir = $db->ejecutar('call krattos("id,consecutivo",64,"feestado in(0,7) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].'")')->fetch_all();
    echo "Facturas sin Subir: ".sizeof($fact_sin_subir).'<br>';
    foreach ($fact_sin_subir as $obj) {
        $fe = new facturaElectronica($obj[0]);
        echo "<hr>No: ".$obj[1].'<br>';
        $rs = $fe->recepcion();
        print_r($rs);
        if ($rs['success']) {
            $estado = $fe->estado();
            print_r($estado);
            $nesatdo = 7;
            switch ($estado['estado']) {
                case 'aceptado':
                        $nesatdo = 1;
                        break;
                    case 'rechazado':
                        $nesatdo = 3;
                        break;
                    case 'procesando':
                        $nesatdo = 2;
                        break;
                    case 'Sin Internet':
                        $nesatdo = 0;
                        break;
                default:
                    $nesatdo = 9;
                    break;
            }
            $db->ejecutar('call shadow(2,64,"feestado = '.$nesatdo.'","id = '.$obj[0].'")');
        }
        echo "<br>";
    }*/


    $fact_sin_estado = $db->ejecutar('call krattos("id,consecutivo",64,"feestado in(2) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].'")')->fetch_all();
    echo "Facturas sin Estado: ".sizeof($fact_sin_estado).'<br>';
    foreach ($fact_sin_estado as $obj) {
        $fe = new facturaElectronica($obj[0]);
        echo "<hr>No: ".$obj[1].'<br>';

        $estado = $fe->estado();
        print_r($estado);
        $nesatdo = 7;
        switch ($estado['estado']) {
            case 'aceptado':
                    $nesatdo = 1;
                    break;
                case 'rechazado':
                    $nesatdo = 3;
                    break;
                case 'procesando':
                    $nesatdo = 2;
                    break;
                case 'Sin Internet':
                    $nesatdo = 0;
                    break;
            default:
                $nesatdo = 9;
                break;
        }
        $db->ejecutar('call shadow(2,64,"feestado = '.$nesatdo.'","id = '.$obj[0].'")');

        echo "<br>";
    }
     

?>