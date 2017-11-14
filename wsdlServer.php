<?php 
    
    require_once ('assets/libs/nusoapLT/nusoap.php');
    require_once '_config/mysqlDB.php';
    $mysql = new DBClass();

    $server = new soap_server();
    $server->configureWSDL('server', 'urn:server');

    $server->wsdl->schemaTargetNamespace = 'urn:server';

    $server->wsdl->addComplexType(
       'Person',
       'complexType',
       'struct',
       'all',
       '',
       array('id_user' => array('name' => 'id_user',
             'type' => 'xsd:int'))
    );

    $server->register('getEncabezado',
             array('factura' => 'xsd:string'),   // parameter
             array('return' => 'xsd:Person'),     // output
             'urn:server',                        // namespace
             'urn:server#encabezado',            // soapaction
             'rpc',                               // style
             'encoded',                           // use
             'Just say hello');                   // description

    function getEncabezado($factura) {
        // $salida = [];
        // try {
        //     $rs = $mysql->ejecutar('call fe_getencabezado($factura)');
        // } catch (Exception $e) {
        //     $rs = "hola";
        // }
        
        // foreach ($rs as $obj =>) {
        //     $salida[]
        // }
        // $mysql->ejecutar('select 1 from dual');
        $Person = array('id_user'=>$factura);
        return $Person;
    }

    $HTTP_RAW_POST_DATA = isset($HTTP_RAW_POST_DATA)
       ? $HTTP_RAW_POST_DATA : '';
    $server->service(file_get_contents("php://input"));

 ?>