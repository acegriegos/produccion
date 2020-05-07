<?php 
	
	if (!isset($_REQUEST['sr'])) {
		header('../_config/error.php');
	}else
    	require_once 'view/changePasword.php';

 ?>