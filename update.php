<?php
    set_time_limit(0);
    /**
     * ACTUALIZACIONES Y PRIMER INSTALACION
     */
    class updated
    {
        var $cia;

        function __construct()
        {
            $this->cia = isset($_SESSION['IMPRESA']) ? isset($_SESSION['IMPRESA']) : 0;
        }

        public function instalar()
        {
            echo "empezamos ?";
        }

        public function actualizarBase()
        {
            echo "actualizamos ?";
        }

        public function actualizarBMS()
        {
            echo "actualizamos ?";
        }

        public function cargarPermisos()
        {
            echo "actualizamos ?";
        }

        public function isConfigFile(){
            return file_exists('_config/mysqlDB.php');
        }

        public function getCurl($url,$params){
            $source = $url;
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, true);

            if ($params) {
                $postData = "";

                foreach($params as $k => $v)
                {
                   $postData .= $k . '='.urlencode($v).'&';
                }

                $postData = rtrim($postData, '&');

                curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);   
            }

            $data = curl_exec ($ch);
            $error = curl_error($ch);

            curl_close ($ch);

            return $error ? $error : $data;
        }

        public function ubicaciones()
        {
            $source = "https://logintechcr.com/descargas/dump-ubicaciones.sql";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);

            $destination = "./assets/update/ubicaciones.sql";
            $file = fopen($destination, "w+");
            fputs($file, $data);
            fclose($file);

            shell_exec("mysql -u".$user." -p".$pass." -P".$port." -f ".$mdb." < ./assets/update/ubicaciones.sql >> ./assets/update/update.log 2>&1");
        }

        public function cargarConfigFile($mdb)
        {
            $source = "https://logintechcr.com/descargas/db.lt";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);

            $destination = "./_config/mysqlDB.php";
            $file = fopen($destination, "w+");
            fputs($file, base64_decode($data)); //openssl_decrypt(base64_decode($da$
            fclose($file);

            $archivo = file_get_contents($destination);
            $archivo = preg_replace('/developer/', $mdb, $archivo);
            file_put_contents($destination, $archivo);
        }

        public function inicial()
        {
            fclose(fopen('./assets/update/update.log','w'));

            $db = new DBClass();
            $mdb = $db->getDB();
            $user = $db->getUSR();
            $pass = $db->getPSS();
            $port = $db->getPort();
            $salida = [];
            set_time_limit(0);

            $source = "https://logintechcr.com/descargas/firts.sql";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);

            $destination = "./assets/update/first.sql";
            $file = fopen($destination, "w+");
            fputs($file, $data);
            fclose($file);

            shell_exec("mysql -u".$user." -p".$pass." -P".$port." -f ".$mdb." < ./assets/update/first.sql >> ./assets/update/update.log 2>&1");

            unlink($destination);
            
            $source = "https://logintechcr.com/descargas/310169776129.p12";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);

            $destination = "./assets/p12/310169776129.p12";
            $file = fopen($destination, "w+");
            fputs($file, $data);
            fclose($file);

            $source = "https://logintechcr.com/descargas/dump-ubicaciones.sql";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);

            $destination = "./assets/update/ubicaciones.sql";
            $file = fopen($destination, "w+");
            fputs($file, $data);
            fclose($file);

            shell_exec("mysql -u".$user." -p".$pass." -P".$port." -f ".$mdb." < ./assets/update/ubicaciones.sql >> ./assets/update/update.log 2>&1");
            
            unlink($destination);
        }
    }
    
    
    $tupdate = isset($_REQUEST['tupdate']) ? $_REQUEST['tupdate'] : 0;
    $update = new updated();

    switch ($tupdate) {
        case 0:
            ?>
            <!DOCTYPE html>
            <html>
            <head>
                <link rel="icon" type="image/png" href="assets/img/favicon.ico">
                <link rel="stylesheet" type="text/css" href="assets/css/materialize.min.css?v=10.0.0.29">
                <link rel="stylesheet" type="text/css" href="assets/css/materialdesignicons.min.css?v=10.0.0.29">
                <title>APSY</title>
            </head>
            <body>
            
            <div class="row">
                <div class="col s12 m3 center">
                    <label>Credenciales</label>
                    <div class="input-field">
                        <span class="prefix"><i class="mdi mdi-account"></i></span>
                        <input type="text" id="rusr" autocomplete="off" autofocus="true" autosave="off" class="credentials">
                        <label for="rusr">Usuario</label>
                    </div>
                    <div class="input-field">
                        <span class="prefix"><i class="mdi mdi-account-key"></i></span>
                        <input type="password" id="rpsw" autocomplete="new-password" class="credentials">
                        <label for="rpsw">Contraseña</label>
                    </div>
                    <a href="#!" class="btn valid credentials" style="float: right;">Validar</a>
                </div>

                <div class="col s12 m9 isvalid center hide">
                    <h3>Hola <span id="unom"></span></h3>
                    <hr style="border: 1px dashed #e2e2e2;">
                    
                    <div class="row">
                        <div class="col s4">
                            <a href="#" class="btn btn-info dropdown-button" data-activates='dropdown1'>Nueva Instalación</a>
                            <ul id='dropdown1' class='dropdown-content'>
                                <li><a href="#!" id="lt" class="instalar">Prueba LT</a></li>
                                <li><a href="#!" id="fe" class="instalar">Con FE</a></li>
                                <li><a href="#!" id="si" class="instalar">Sin FE</a></li>
                            </ul>
                            <section id="insta" class="hide" style="text-align: left;">
                                <i class="mdi mdi-checkbox-blank-circle-outline"></i> Instalando <br>
                                <i class="mdi mdi-checkbox-blank-circle-outline"></i> Actualizando <br>
                                <i class="mdi mdi-checkbox-blank-circle-outline"></i> Cargando Permisos <br>
                            </section>
                        </div>

                        <div class="col s4">
                            <a href="#" class="btn btn-info dropdown-button" data-activates='dropdown2'>Actualizacion</a>
                            <ul id='dropdown2' class='dropdown-content'>
                                <li><a href="#!" id="db">Base de Datos</a></li>
                                <li><a href="#!" id="bm">BMS</a></li>
                                <li><a href="#!" id="bm">Archivo de Configuración</a></li>
                            </ul>
                        </div>

                        <div class="col s4">
                            <a href="#" class="btn btn-info" id="cp">Cargar Permisos</a> 
                        </div>
                    </div> 
                    <div class="row">
                        <section id="insta-data" class="hide sub col s4">
                            <div class="row data">
                                <div class="input-field col s12" style="margin:0px">
                                    <input type="text" id="nchema" value="production">
                                    <label for="nchema">Base de Datos</label>
                                </div>

                                <div class="col s2 cbh si hide" style="margin:0px">
                                    <input type="checkbox" id="tipocliete" name="chk1">
                                    <label for="tipocliete" class="tooltipped pbtn" data-tooltip="Cliente Jurídico" data-position="button"></label>
                                </div>

                                <div class="input-field col s5 cbh si hide" style="margin:0px">
                                    <input type="text" id="nombre">
                                    <label for="nombre">Razon Social</label>
                                </div>

                                <div class="input-field col s5 cbh si hide" style="margin:0px">
                                    <input type="text" id="cedula">
                                    <label for="cedula">Cédula</label>
                                </div>

                                <div class="input-field col s6 cbh si fe hide" style="margin:0px">
                                    <input type="text" id="correo">
                                    <label for="correo">Correo</label>
                                </div>

                                 <div class="input-field col s6 cbh si fe hide" style="margin:0px">
                                    <input type="text" id="telefono">
                                    <label for="telefono">Teléfono</label>
                                </div>

                                <div class="input-field col s6 cbh si fe hide" style="margin:0px">
                                    <select id="provincia" style="font-size: 9px">
                                        <option disabled selected>Seleccione una Opcion</option>
                                        <option value="1">San José</option>
                                    </select>
                                    <label for="provincia">Provincia</label>
                                </div>

                                <div class="input-field col s6 cbh si fe hide" style="margin:0px">
                                    <select id="canton">
                                        <option>---</option>
                                    </select>
                                    <label for="canton">Canton</label>
                                </div>

                                <div class="input-field col s6 cbh si fe hide" style="margin:0px">
                                    <select id="distrito">
                                        <option>---</option>
                                    </select>
                                    <label for="distrito">Distrito</label>
                                </div>

                                <div class="input-field col s6 cbh si fe hide" style="margin:0px">
                                    <select id="barrio">
                                        <option>---</option>
                                    </select>
                                    <label for="barrio">Barrio</label>
                                </div>

                                <div class="input-field col s9 cbh si fe hide" style="margin:0px">
                                    <input type="text" id="direccion">
                                    <label for="direccion">Dirección</label>
                                </div>
                            </div> 

                        </section>

                        <div class="row col s4 hide">
                                LOGO, CHECKS
                            </div> 

                            <div class="row fe col s4 hide">
                                FACTURA ELECTRONICA
                            </div> 

                            <div class="row si col s4 hide">
                                SIN FACTURA ELECTRONICA
                            </div> 

                            <div class="col s12">
                                <a href="#" class="next btn-floating mdi mdi-check tooltipped" data-tooltip="Finaliar" data-position="button" st="3" style="float: right;"></a>
                            </div>  
                    </div>                  
                </div>
            </div>

            <div class="row isvalid hide">
                <div class="col s12" style="position: fixed;bottom: 0; height: 15%; border-top: 1px dashed black; overflow-y: auto; font-family: 'Courier New', Courier, monospace">
                    Console:<br><span id="consoleText"></span>
                </div>
            </div>

            <script src="assets/js/jquery.js?v=10.0.0.29"></script>
            <script src="assets/js/materialize.min.js?v=10.0.0.29"></script>
            <script src="assets/js/asgard.js?v=10.3.0.9"></script>
            <script type="text/javascript">

                $(window).keydown(function(e){
                    var code = e.wich || e.keyCode
                    // if (e.ctrlKey && e.shiftKey && e.keyCode == 73)// Prevent Ctrl+Shift+I .. +J(74)
                    //     return false;        
                        
                });

                // $(document).on("contextmenu", function (e) {        
                //     e.preventDefault();
                // });

                $('.tooltipped').tooltip({delay: 50});
                $('select').material_select();

                $("#db").click(function(){
                    $("#consoleText").html('')
                    $("#consoleText").append('Actualizando Base de Datos<br>Cargando Ultima Version....<span id="lver">##</span><br>Version Actual....<span id="aver">##</span><br>');
                    var _aver = getDatos('valor',15,'descr="versionbase"')[0][0][0];

                    $.post('http://sistema.apsycr.com/wsdlServer.php',{cmd:11,acc:1,aver:_aver})
                        .done(function(data){

                            $("#aver").html(_aver);
                            $("#lver").html(data.rs[0])
                            $("#consoleText").append('Descargando Archivos...<br>')
                            $.post('update.php',{tupdate:3,file:data.file})
                                .done(function(data){
                                    console.log(data)
                                    $("#consoleText").append('BASE ACTUALIZADA<br>')
                            })
                    })

                });

                $(".instalar").click(function(){
                    var id = $(this).attr('id');
                    console.log(id)
                    $("#insta-data").removeClass('hide');
                    $(".cbh").addClass('hide');
                    $("."+id).removeClass('hide');
                });

                $("#rpsw").keyup(function(e){
                    var code =  e.keyCode || e.wich;
                    if (code == 13)
                        $(".valid").click();
                });

                $(".valid").click(function(){
                    $(this).attr('disabled',true);

                    $.post('http://sistema.apsycr.com/wsdlServer.php',{cmd:10,usr:$("#rusr").val(),pswd:$("#rpsw").val()})
                        .done(function(data){
                            if(data.succed && data.rs.length == 1){
                                if (data.rs[0][3] != 1) {
                                    $(".valid").attr('disabled',false);
                                    Materialize.toast('Solo Usuarios Autorizados',4000,'red');
                                }else{
                                    $(".credentials").attr('disabled','true');
                                    $("#unom").html(data.rs[0][2]);
                                    $(".isvalid").removeClass('hide');
                                    $(".valid").data('usr',(parseInt(Math.random()*1000)+' '+data.rs[0][0]+' '+parseInt(Math.random()*1000)).replace(/ /g,''))
                                }
                                
                            }else{
                                $(".valid").attr('disabled',false);
                                Materialize.toast(data.rs,4000,'red');
                            }
                        })
                        .fail(function(x){
                            console.log(x);
                        });
                })
            </script>
            </body>
            </html>
            <?php break;
        case 1: //CONFIGURACION MYSQLDB
            $mdb = isset($_REQUEST['nschema']) ? $_REQUEST['nschema'] : 'production';
            $source = "https://logintechcr.com/descargas/db.lt";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);

            $destination = "./_config/mysqlDB.php";
            $file = fopen($destination, "w+");
            fputs($file, base64_decode($data)); //openssl_decrypt(base64_decode($da$
            fclose($file);

            $archivo = file_get_contents($destination);
            $archivo = preg_replace('/developer/', $mdb, $archivo);
            file_put_contents($destination, $archivo);
            
            $salida['MYSQL'] = $error ? $error : 'OK: Base en '.$mdb;
	    echo json_encode($salida);
            break;
        case 2: //CONFIGURACION BASE INICIAL
            require_once '_config/mysqlDB.php';
            fclose(fopen('./assets/update/update.log','w'));

            $db = new DBClass();
            $mdb = $db->getDB();
            $user = $db->getUSR();
            $pass = $db->getPSS();
            $port = $db->getPort();
            $salida = [];
            set_time_limit(0);

            $source = "https://logintechcr.com/descargas/firts.sql";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);

            $destination = "./assets/update/first.sql";
            $file = fopen($destination, "w+");
            fputs($file, $data);
            fclose($file);

            shell_exec("mysql -u".$user." -p".$pass." -P".$port." -f ".$mdb." < ./assets/update/first.sql >> ./assets/update/update.log 2>&1");

            $source = "https://logintechcr.com/descargas/310169776129.p12";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);

            $destination = "./assets/p12/310169776129.p12";
            $file = fopen($destination, "w+");
            fputs($file, $data);
            fclose($file);

            $source = "https://logintechcr.com/descargas/dump-ubicaciones.sql";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);

            $destination = "./assets/update/ubicaciones.sql";
            $file = fopen($destination, "w+");
            fputs($file, $data);
            fclose($file);

            shell_exec("mysql -u".$user." -p".$pass." -P".$port." -f ".$mdb." < ./assets/update/ubicaciones.sql >> ./assets/update/update.log 2>&1");
            
            unlink($destination);
            
            if(filesize("assets/update/update.log"))
                $salida['CONF'] = "ERROR";
            break;
        case 3:
            require_once '_config/mysqlDB.php';
            fclose(fopen('./assets/update/update.log','w'));
            $db = new DBClass();
            $mdb = $db->getDB();
            $user = $db->getUSR();
            $pass = $db->getPSS();
            $port = $db->getPort();

            file_put_contents('mysqlfile', base64_decode($_REQUEST['file']));
            print_r(shell_exec("mysql -u".$user." -p".$pass." -P".$port." -f ".$mdb." < mysqlfile >> ./assets/update/update.log 2>&1"));
            unlink('mysqlfile');
            break;
        case 12:
            echo json_encode($update->ubicaciones());
            break;
        case 13:
            echo json_encode($update->isConfigFile());
            break;
        case 14:
            echo json_decode($update->cargarConfigFile());
            break;
        case 4: //CONFIGURAION LOGINTECH
            $user = isset($_REQUEST['user']) ? $_REQUEST['user'] : '';
            $salida = [];

            $source = "http://sistema.apsycr.com/wsdlServer.php";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, true);
            $params = array(
              "client_id" => $user,
              "cmd" => "1");

            $postData = "";

            foreach($params as $k => $v)
            {
               $postData .= $k . '='.urlencode($v).'&';
            }

            $postData = rtrim($postData, '&');

            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

            $data = curl_exec ($ch);
            $error = curl_error($ch);

            curl_close ($ch);

            if ($error){
                $salida['PERMISOS'] = $error;
            }
            else{
                $salida['PERMISOS'] = $data;

                require_once '_config/mysqlDB.php';
            
                $db = new DBClass();
                //$db->ejecutar('delete from permisosLogintech where id > 0');
                $db->ejecutar('truncate permisosLogintech');

                //$db->ejecutar('delete from permisosCliente where id > 0');
                $db->ejecutar('truncate permisosCliente');

                //$db->ejecutar('delete from permisos where id > 0');
                $db->ejecutar('truncate permisos');
                $str = 'INSERT INTO permisosLogintech values';

                $data = json_decode($data);
                
                foreach ($data->permisos as $row) {
                    $row[4] = !strlen($row[4]) ? 'null' : $row[4];
                    $str .= "(".$row[0].",'".$row[1]."',".$row[2].",".$row[3].",".$row[4]."),";
                }

                print_r($db->ejecutar(substr($str, 0, strlen($str)-1)));

            }
            break; 
        case 6:
            require_once '_config/mysqlDB.php';

            $db = new DBClass();
            $act = new updated();

            /*fclose(fopen('./assets/update/update.git','w'));

            shell_exec('git config --global user.name "APSY"');
            shell_exec('git config --global user.email "info@apsycr.com"');

            shell_exec('git commit -a -m"sync"');
            shell_exec('git pull >> ./assets/update/update.git 2>&1');
            shell_exec('git reset --hard HEAD~1');
            shell_exec('git pull >> ./assets/update/update.git 2>&1');*/

            $vbase = $db->ejecutar('select if(count(valor),valor,0) from ajustes where descr= "versionbase"')->fetch_all();
            if(!$vbase[0][0][0]){ //CARGAR TODO Y VERSION 0
                //TRAER VERSION 0
                //ACTUALIZAR AJUSTES
                //ACTUALIZAR VERSION
                $cu = $act->getCurl('http://logintechcr.com/descargas/actualizaciones/v0.sql','');
                $destination = "./assets/update/act.sql";

                $rte = $act->getCurl('http://logintechcr.com/descargas/RTE.sql','');

                $file = fopen($destination, "w+");
                fputs($file, $cu);
                fputs($file, '\n'.$rte);  
                fclose($file);


                // $archivo = file_get_contents('./assets/update/update.sql');
                // $archivo = preg_replace('/`root`/', `".$user."`, $archivo);
                // $archivo = preg_replace('/`%`/', `localhost`, $archivo);
                // $archivo = preg_replace('/developer/', $rdb, $archivo);
                // file_put_contents($destination, $archivo);
            }else{
                //WHILE A LA ULTIMA VERSION
                //ACTUALIZAR VERSION
                echo "while";
            }
            break;     
        default:
            break;
    }

 ?>
