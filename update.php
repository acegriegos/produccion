<?php 

    $info = shell_exec("mysqldump --user=itech01 --password=Login2Help developer --no-create-info --skip-triggers > assets/update/info.sql");
    
    exit(0);
 ?>