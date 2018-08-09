<?php

require_once '../assets/libs/smarty/Smarty.class.php';

class mySmarty extends Smarty{
    
    function __construct(){
        parent::__construct();
        
        $this->template_dir = "";
        $this->compile_dir = "";
        $this->config_dir = "../config/confSmarty";
        $this->cache_dir = "";
        
    }
    
    function setModule($directorio) {
        $this->template_dir = "../$directorio/view";
        $this->compile_dir = "../$directorio/view/compiled";
    }
    
    
}


?>
