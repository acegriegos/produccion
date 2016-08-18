<?php 

require_once 'mysqlDB.php';

class _permisos
{
    var $id;
    var $db;
    function __construct($id)
    {
       $this->db = new dbClass();
       $this->id = $id;
    }

    function obtener($a,$b){
        $sql = "SELECT idcodigo,permiso FROM v_permisosusuario WHERE id_user = '$this->id' and idcodigo between $a and $b;";
        $result = $this->db->ejecutar($sql);
        if ($result->num_rows > 0) {
            $arr = $result->fetch_all();
            return $arr;
        }
        else{
            return 0;
        }

    }
}
require_once 'ecy.php';
$cy = new _cy();
$user = str_replace("\0","",$cy->decy($_SESSION['USR']));
$permiso = new _permisos($user);

$permisos = $permiso->obtener($_POST['x1'],$_POST['x2']);    

echo json_encode($permisos);

 ?>