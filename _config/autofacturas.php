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

    $tipo = isset($_REQUEST['tipo']) ? $_REQUEST['tipo'] : 1;

    switch ($tipo) {
        case 1:
            $fact_sin_estado = $db->ejecutar('call krattos("id,consecutivo",64,"feestado in(2,9) and idtipo = 1 and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and idtipoventa = 1")')->fetch_all();
            foreach ($fact_sin_estado as $obj) {
                $fe = new facturaElectronica($obj[0]);

                $estado = $fe->estado();
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
            break;
        case 4:
            $fact_sin_estado = $db->ejecutar('call krattos("id,consecutivo",64,"feestado in(2,9) and idtipo = 1 and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and idtipoventa = 7")')->fetch_all();
            foreach ($fact_sin_estado as $obj) {
                $fe = new facturaElectronica($obj[0]);

                $estado = $fe->estado();
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
            break;
        case 2:
            $fact_sin_estado = $db->ejecutar('select a.id,a.consecutivo from estadoscuentas a join facturas b on b.id = a.idfactura and b.idsucursal = '.$_SESSION['IMPRESA'].' where a.feestado in(2,9) and a.idtipo = 6 and a.id > 1;')->fetch_all();
            foreach ($fact_sin_estado as $obj) {
                $fe = new facturaElectronica($obj[0]);

                $estado = $fe->estado();
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
            break;
        case 3:
            $fact_sin_estado = $db->ejecutar('select a.id,a.consecutivo from estadoscuentas a join facturas b on b.id = a.idfactura and b.idsucursal = '.$_SESSION['IMPRESA'].' where a.feestado in(2,9) and a.idtipo = 5 and a.id > 1;')->fetch_all();
            foreach ($fact_sin_estado as $obj) {
                $fe = new facturaElectronica($obj[0]);

                $estado = $fe->estado();
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
            break;
        case 5:
             $fact_sin_estado = $db->ejecutar('call krattos("id,consecutivo",64,"feestado in(2,9) and idtipo = 2 and idestado = 5 and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].'")')->fetch_all();
            foreach ($fact_sin_estado as $obj) {
                $fe = new facturaElectronica($obj[0]);

                $estado = $fe->estado();
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
            break;
        case 6:
             $fact_sin_estado = $db->ejecutar('call krattos("id,consecutivo",64,"feestado in(2,9) and idtipo = 2 and idestado = 6 and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].'")')->fetch_all();
            foreach ($fact_sin_estado as $obj) {
                $fe = new facturaElectronica($obj[0]);

                $estado = $fe->estado();
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
            break;
        case 7:
            $fact_sin_estado = $db->ejecutar('call krattos("id,consecutivo",64,"feestado in(2,9) and idtipo = 2 and idestado = 7 and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].'")')->fetch_all();
            foreach ($fact_sin_estado as $obj) {
                $fe = new facturaElectronica($obj[0]);

                $estado = $fe->estado();
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
            break;
        default:
            break;
    }
    
     

?>