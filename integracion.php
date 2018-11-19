<?php 
    session_start();
    require_once '_config/mysqlDB.php';
    $db = new DBClass();
    $lista =  $db->ejecutar('select * from integraciones where idsucursal = '.$_SESSION['IMPRESA'].'  order by id desc')->fetch_all();

    function XMLtoArray($xml) {
            $previous_value = libxml_use_internal_errors(true);
            $dom = new DOMDocument('1.0', 'UTF-8');
            $dom->preserveWhiteSpace = false; 
            $dom->loadXml($xml);
            libxml_use_internal_errors($previous_value);
            if (libxml_get_errors()) {
                return [];
            }
            return DOMtoArray($dom);
        }  

     function DOMtoArray($root) {
            $result = array();

            if ($root->hasAttributes()) {
                $attrs = $root->attributes;
                foreach ($attrs as $attr) {
                    $result['@attributes'][$attr->name] = $attr->value;
                }
            }

            if ($root->hasChildNodes()) {
                $children = $root->childNodes;
                if ($children->length == 1) {
                    $child = $children->item(0);
                    if (in_array($child->nodeType,[XML_TEXT_NODE,XML_CDATA_SECTION_NODE])) {
                        $result['_value'] = $child->nodeValue;
                        return count($result) == 1
                            ? $result['_value']
                            : $result;
                    }

                }
                $groups = array();
                foreach ($children as $child) {
                    if (!isset($result[$child->nodeName])) {
                        $result[$child->nodeName] = DOMtoArray($child);
                    } else {
                        if (!isset($groups[$child->nodeName])) {
                            $result[$child->nodeName] = array($result[$child->nodeName]);
                            $groups[$child->nodeName] = 1;
                        }
                        $result[$child->nodeName][] = DOMtoArray($child);
                    }
                }
            }
            return $result;
        }   
 ?>
<!DOCTYPE html>
<html>
<head>
    <title>Integracion</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.ico">
    <link rel="stylesheet" type="text/css" href="assets/css/materialize.min.css?v=10.0.0.67">
    <link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/jquery.dataTables.css?v=10.0.0.67">
    <link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/dataTables.responsive.css?v=10.0.0.67">
    <link rel="stylesheet" type="text/css" href="assets/css/modulos/style-menu.css?v=10.0.0.67">
    <link rel="stylesheet" type="text/css" href="assets/fonts/materialdesignicons/materialdesignicons.css?v=10.0.0.67">
    <link rel="stylesheet" type="text/css" href="assets/css/system.min.css?v=10.0.0.67">
</head>
<body style="margin-left: 3%; margin-right: 3%">

    <div class="card z-depth-3 ">
            <div class="card-header center"> 
            <p class="flow-text head1">
            Vista de Facturas <span class="hide-on-med-and-down"><?php echo $_SESSION['EMPRESA']; ?></span></p>
            </div>

            <div class="row">
            <div class="col s12  m2">
                <input name="tventa" class="with-gap" type="radio" id="tf1" checked />
                <label for="tf1">Ventas y Tiquetes</label>
            </div>
            
           
            <div class="col s12 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf7" />
                <label for="tf7">Notas de Credito</label>
            </div> 

             <div class="col s12  m2">
                <input name="tventa" class="with-gap" type="radio" id="tf4" />
                <label for="tf4">Notas de Debito</label>
            </div>     
                
            </div>

            <hr>
            <div class="row">
                <div class="col s9 m7 input-field">
                  <a class="prefix dropdown-button tooltipped"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="mdi mdi-magnify mdi-24px"></i></a>
                  <ul id='filtr_1' class='dropdown-content'>
                    <li><a class="optns" href="#!" fltr="1">Número</a></li>
                    <li><a class="optns" href="#!" fltr="2">Razón Social o Cédula</a></li>
                    <li><a class="optns" href="#!" fltr="3">Fecha</a></li>
                  </ul>
                  <input type="text" id="search_facturas" maxlength="100" num="v158" var="0,1" filtro="1">
                  <label class="truncate" for="search_facturas">Buscar Factura por <span>Número</span></label>
                </div>
 
                <div class="col s12" id="vfacturas">
                     <table class="table tablatitulos dt-responsive nowrap centered striped bordered highlight z-depth-3" id="data-table-facturas" cellspacing="0" width="100%" >
                        <thead class="tab1">
                            <tr>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">N° Factura</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Consecutivo</th>
                                <th class="white-text" rm="1" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Clave</th>
                                <th class="white-text" rm="2" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Cliente</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Acciones</th>
                            </tr>
                        </thead>

                        <tbody id="listafacturas" class="tpag">
                            <?php foreach ($lista as $obj) { ?>
                            <tr>
                                <td><?php echo $obj[3] ?></td>
                                <td><?php echo substr($obj[1], 31,10); ?></td>
                                <td><?php echo $obj[1] ?></td>
                                <td><?php if($obj[6] != '') echo $obj[6].', '.$obj[7]; ?></td>
                                <td style="width: 10%">
                                    <a class="btn-color pbtn mdi mdi-24px mdi-printer print blueh tooltipped" id="a<?php echo $obj[0]; ?>" tv="" data-tooltip="Visualizar Factura" data-position="bottom"></a>

                                    <?php if(substr($obj[3], 0,1) == 'F'){ ?>
                                        <a class="btn-color pbtn mdi mdi-24px mdi-note blueh tooltipped" id="b<?php echo $obj[0]; ?>" tv="" data-tooltip="Hacer Nota de Credito o Debito" data-position="bottom"></a>
                                    <?php } ?>

                                    <?php if($obj[6] != ''){ ?>
                                        <a class="btn-color pbtn mdi mdi-24px mdi-send enviar blueh tooltipped" id="c<?php echo $obj[0]; ?>" tv="" data-tooltip="Enviar Correo" data-position="bottom"></a>
                                    <?php } ?>
                                </td>
                            </tr>
                            <?php } ?>
                        </tbody>
                        <!-- <tbody id="loadbody"><tr><td colspan="100"><i class="mdi mdi-spin mdi-refresh mdi-48px center"></i></td><tr></tbody> -->
                    </table>
                    <ul class="left showing" modulo="158"><small></small></ul>
                    <ul class="pagination right" vtbl="158" modulo="facturas" filtro_sp="{$TF},0,@@impresa,^,?"></ul>
                </div>
            </div>
            <br><br>
        </div>


    <script src="assets/js/jquery.js?v=10.0.0.67"></script>
    <script src="assets/js/materialize.min.js?v=10.0.0.67"></script>
    <script src="assets/js/asgard.js?v=10.0.0.67"></script>
    <script src="assets/js/main.js?v=10.0.0.67"></script>
    <script src="assets/libs/charts/chart.js?v=10.0.0.67"></script>
    <script src="assets/libs/DataTables/media/js/jquery.dataTables.min.js?v=10.0.0.67"></script>
    <script src="assets/libs/DataTables/media/js/dataTables.responsive.min.js?v=10.0.0.67"></script>
</body>
</html>