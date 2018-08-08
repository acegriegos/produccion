<?php 

    $carpeta = 'dashboard/view/compiled';
    if(!file_exists($carpeta)){
        mkdir($carpeta);
    }
    header("location: dashboard");	

?>