<?php 
    
    require_once '../dashboard/model/m_login.php';
    $log = new _login();

    $mes = date('Y-m');
    $primero = date('Y-m').'-01';
    $ultimo = date('Y-m-t', strtotime($primero));
    $empresa = $_SESSION['EMPRESA'];
    $impresa = $_SESSION['IMPRESA'];
    #hacer excel de compras y ventas

    $result = $log->getCurl('http://localhost/dashboard/login?accion=11&arreglo[sel]=&arreglo[tbl]=167&arreglo[where]=0,"1,7,10",'.$impresa.',"0","0","1","'.$primero.'","'.$ultimo.'","0","0","0"&arreglo[save]=1&arreglo[vista]=0,1,2,3,4,5,11,12,16,17,18,19,20,21,22,23,24,25,26,14,27,29,28,30,31,32,33,34,35,36,37,38,39,40&arreglo[tit]=DESGLOCE_VENTAS_'.$empresa.'_'.$mes.'&arreglo[archivo]=DESGLOCE_VENTAS_'.$empresa.'_'.$mes.'&arreglo[conteo]=1&arreglo[suma]=,11,12,16,17,18,19,20,21,22,23,24,25,26,14,27,28,29,30,31,32,33,34,35,36,37,38,39,40,&arreglo[empresaid]='.$impresa,'',0);

    $ventas = 'DESGLOCE_VENTAS_'.$empresa.'_'.$mes;

    $result = $log->getCurl('http://localhost/dashboard/login?accion=11&arreglo[sel]=&arreglo[tbl]=167&arreglo[where]=0,"2,9",'.$impresa.',"0","0","1","'.$primero.'","'.$ultimo.'","0","0","0"&arreglo[save]=1&arreglo[vista]=0,1,2,3,4,5,11,12,16,17,18,19,20,21,22,23,24,25,26,14,27,29,28,30,31,32,33,34,35,36,37,38,39,40&arreglo[tit]=DESGLOCE_COMPRAS_'.$empresa.'_'.$mes.'&arreglo[archivo]=DESGLOCE_COMPRAS_'.$empresa.'_'.$mes.'&arreglo[conteo]=1&arreglo[suma]=,11,12,16,17,18,19,20,21,22,23,24,25,26,14,27,28,29,30,31,32,33,34,35,36,37,38,39,40,&arreglo[empresaid]='.$impresa,'',0);

    $compras = 'DESGLOCE_COMPRAS_'.$empresa.'_'.$mes;

    $result = $log->getCurl('http://localhost/dashboard/login?accion=11&arreglo[sel]=&arreglo[tbl]=167&arreglo[where]=0,"2,9",'.$impresa.',"0","0","1","'.$primero.'","'.$ultimo.'","0","0","105"&arreglo[save]=1&arreglo[vista]=0,1,2,3,4,5,11,12,16,17,18,19,20,21,22,23,24,25,26,14,27,29,28,30,31,32,33,34,35,36,37,38,39,40&arreglo[tit]=DESGLOCE_GASTOS_'.$empresa.'_'.$mes.'&arreglo[archivo]=DESGLOCE_GASTOS_'.$empresa.'_'.$mes.'&arreglo[conteo]=1&arreglo[suma]=,11,12,16,17,18,19,20,21,22,23,24,25,26,14,27,28,29,30,31,32,33,34,35,36,37,38,39,40,&arreglo[empresaid]='.$impresa,'',0);

    $gastos = 'DESGLOCE_GASTOS_'.$empresa.'_'.$mes;

    #generar pdf d104-2

    $result = $log->getCurl('http://localhost/dashboard/login?accion=8&arreglo[arch]=d104-2&arreglo[sel]=&arreglo[tbl]=294&arreglo[where]='.$impresa.',"'.$mes.'"&arreglo[mic]=1&arreglo[tit]=D104-2[id]=1&arreglo[empresaid]='.$impresa,'',0);

    $d104 = 'D104-2_'.$empresa.'_'.$mes;

    #enviar correo
    
    $_POST['accion'] = 3;
    $_POST['body'] = 'Se adjuntan los reportes de Compras, Ventas y Gastos para la d104-2';
    $_POST['subject'] = 'Reportes '.$empresa.' '.$mes;
    $_POST['to'] = 'amiranda@apsycr.com';
    $_POST['adjunto'] = [0=>'excel/'.$ventas.'.xlsx',1=>'excel/'.$compras.'.xlsx',2=>'excel/'.$gastos.'.xlsx',3=>'pdf/'.$d104.'.pdf'];

    require_once 'correoAjax.php';

    require_once 'mysqlDB.php';
    $db = new DBClass();

    $db->ejecutar('update ajustes set valor = 1 where descr = "Rep Conta"');

 ?>