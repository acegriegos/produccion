<?php 
    session_start();

    if (!isset($_SESSION['IMPRESA'])) {
        echo "Usuaro sin Registrar";
        exit(0);
    }
    
    require_once 'mysqlDB.php';
    require_once '../wsdlClient.php';
    $db = new DBClass();
    
    //ESTADO PROCESANDO

    //FACTURAS Y TICKETS

    $lista = $db->ejecutar('select id from facturas where feestado in(2,9) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and idtipoventa in(1,7) limit 1');

    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();

        foreach ($lista as $obj) {
            $fe = new facturaElectronica($obj[0]);

            $estado = $fe->estado();

            $nesatdo = 2;
            if(isset($estado['estado'])){
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
                        $nesatdo = 2;
                        break;
                    default:
                        break;
                }

                $db->ejecutar('call shadow(2,64,"feestado = '.$nesatdo.'","id = '.$obj[0].'")');
            }
        }
    }
    /*
    //ACPTACIONES ACEPTACIONES-PARCIALES RECHAZOS

    $lista = $db->ejecutar('select id from facturas where feestado in(2,9) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and chat_lenght(referencia) = 50 order by id desc limit 50');
    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica('^'.$obj[0]);

            $estado = $fe->estado();
            $nesatdo = 2;
            if(isset($estado['estado'])){
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
                        $nesatdo = 2;
                        break;
                    default:
                        break;
                }

                $db->ejecutar('call shadow(2,64,"feestado = '.$nesatdo.'","id = '.$obj[0].'")');
            }
        }
    }

    //NC ND

    $lista = $db->ejecutar('select a.id from estadoscuentas a join facturas b on b.id = a.idfactura and b.idsucursal = '.$_SESSION['IMPRESA'].' where a.feestado in(2,9) and a.idtipo in(5,6) order by id desc limit 50');

    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica('-'.$obj[0]);

            $estado = $fe->estado();
            $nesatdo = 2;
            if(isset($estado['estado'])){
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
                        $nesatdo = 2;
                        break;
                    default:
                        break;
                }

                $db->ejecutar('call shadow(2,301,"feestado = '.$nesatdo.'","id = '.$obj[0].'")');
            }
        }
    }

    //ESTADO SIN ENVIAR, SIN INTERNET
    //TIQUETES Y FACTURAS
    $lista = $db->ejecutar('select id from facturas where feestado in(0,7) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and idtipoventa in(1,7) order by id desc limit 50');
    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica($obj[0]);

            $fe->recepcion();

            $db->ejecutar('call shadow(2,64,"feestado = 2","id = '.$obj[0].'")');
        }
    }

    //A A-P R
    $lista = $db->ejecutar('select id from facturas where feestado in(0,7) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and char_length(referencia) = 50 order by id desc limit 50');
    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica('^'.$obj[0]);

            $fe->recepcion();

            $db->ejecutar('call shadow(2,64,"feestado = 2","id = '.$obj[0].'")');
        }
    }

    //NC ND
    $lista = $db->ejecutar('select a.id from estadoscuentas a join facturas b on b.id = a.idfactura and b.idsucursal = '.$_SESSION['IMPRESA'].' where a.feestado in(0,7) and a.idtipo in(5,6) order by id desc limit 50');
    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica('-'.$obj[0]);

            $fe->recepcion();

            $db->ejecutar('call shadow(2,301,"feestado = 2","id = '.$obj[0].'")');
        }
    }*/



?>

<script type="text/javascript">
    function load() {
        window.close();
    }
    window.onload = load;
</script>