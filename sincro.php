<?php 
    session_start();
	// ob_end_clean();
 //    ignore_user_abort();
 //    ob_start();
 //    header("Connection: close");
 //    echo json_encode(['success'=>1]);
 //    header("Content-Length: " . ob_get_length());
 //    ob_end_flush();
 //    flush();

	$curl = curl_init($_POST['server'].'/wsdlServer.php');
    curl_setopt($curl, CURLOPT_HEADER, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    //curl_setopt($curl, CURLOPT_SSLVERSION, 6);
    curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

    $params = array(
      "cmd" => "3",
      "vid" => "",
      "vsucursal" => $_SESSION['IMPRESA']);

    $postData = "";

    foreach($params as $k => $v)
    {
       $postData .= $k . '='.urlencode($v).'&';
    }

    $postData = rtrim($postData, '&');

    curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

    $json_response = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    curl_close($curl);

    echo json_encode($json_response);
 ?>