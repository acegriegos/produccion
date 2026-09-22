
<?php   
        session_start();
 ?>
<!DOCTYPE html>
<html>
<head>

    <title>Integracion</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.ico">
    <link rel="stylesheet" type="text/css" href="assets/css/materialize.min.css?v=10.4.1.0">
    <link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/jquery.dataTables.css?v=10.4.1.0">
    <link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/dataTables.responsive.css?v=10.4.1.0">
    <link rel="stylesheet" type="text/css" href="assets/css/modulos/style-menu.css?v=10.4.1.0">
    <link rel="stylesheet" type="text/css" href="assets/fonts/materialdesignicons/materialdesignicons.css?v=10.4.1.0">
    <link rel="stylesheet" type="text/css" href="assets/css/system.min.css?v=10.4.1.0">
</head>
<body style="margin-left: 3%; margin-right: 3%">

    <div class="card z-depth-3 ">
            <div class="card-header center"> 
            <p class="flow-text head1">
            Vista de Facturas <span class="hide-on-med-and-down"><?php echo $_SESSION['EMPRESA']; ?></span></p>
            </div>

            <div class="row">
            <div class="col s12  m2">
                <input name="tventa" class="with-gap" type="radio" id="tf0" checked />
                <label for="tf0">Ventas y Tiquetes</label>
            </div>
            
           
            <div class="col s12 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf3" />
                <label for="tf3">Notas de Credito</label>
            </div> 

             <div class="col s12  m2">
                <input name="tventa" class="with-gap" type="radio" id="tf2" />
                <label for="tf2">Notas de Debito</label>
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
                  <input type="text" id="search_integracion" maxlength="100" num="v315" var="0,1" filtro="1" autocomplete="off">
                  <label class="truncate" for="search_integracion">Buscar Factura por <span>Número</span></label>
                </div>
 
                <div class="col s12" id="vfacturas">
                     <table class="table tablatitulos dt-responsive nowrap centered striped bordered highlight z-depth-3" id="data-table-integracion" cellspacing="0" width="100%" >
                        <thead class="tab1">
                            <tr>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">N° Factura</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Consecutivo</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Fecha</th>
                                <th class="white-text" rm="2" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Cliente</th>
                                <th class="white-text" rm="2" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Gravado</th>
                                <th class="white-text" rm="2" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">IVA</th>
                                <th class="white-text" rm="2" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Exento</th>
                                <th class="white-text" rm="2" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Exonerado</th>
                                <th class="white-text" rm="2" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Descuento</th>
                                <th class="white-text" rm="2" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Total</th>
                                <th class="white-text" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Acciones</th>
                            </tr>
                        </thead>

                        <tbody id="listaintegracion" class="tpag">
                            
                        </tbody>
                    </table>
                    <ul class="left showing" modulo="315"><small></small></ul>
                    <ul class="pagination right" vtbl="315" modulo="integracion" filtro_sp="@@impresa,0"></ul>
                </div>
            </div>
            <br><br>
        </div>

    <script src="assets/js/jquery.js?v=10.4.1.0"></script>
    <script src="assets/js/materialize.min.js?v=10.4.1.0"></script>
    <script src="assets/js/asgard.js?v=10.4.1.0"></script>
    <script src="assets/js/main.js?v=10.4.1.0"></script>
    <script src="assets/libs/charts/chart.js?v=10.4.1.0"></script>
    <script src="assets/libs/DataTables/media/js/jquery.dataTables.min.js?v=10.4.1.0"></script>
    <script src="assets/libs/DataTables/media/js/dataTables.responsive.min.js?v=10.4.1.0"></script>

    <script type="text/javascript">
        $(function(){
          arr('login',6,'',315,'0,0,"@@impresa,0","0,10"', 0, 1, $("#listaintegracion"));  
          paginate($("ul.pagination").attr('vtbl'),undefined,'@@impresa,0') 
          $(".pagination").attr('filtro_sp','@@impresa,0,^,?');
        });

        $(document).on('click','.print',function(){
            var cons = $(this).parent().parent().attr('clave').substring(21,41);
            window.open('wsdlClient.php?accion=14&id=0&sucursal=0&ruta=RICANO&cons='+cons+'&sucname=RICANO&arreglo[show]=1');
        });

        $(document).on('click','.enviar',function(){
            var cons = $(this).parent().parent().attr('fact');
            
            $.get( 'http://localhost/wsdlClient.php?accion=17&ruta=RICANO&cons='+cons+'&sucursal=0&sucname=RICANO&id=0', function( data ) {
              console.log(data)
              Materialize.toast('Correo Enviado',4000,'green')
            });
        });

        $("[name=tventa]").click(function(){
            var id = $(this).attr('id').substr(2);
            arr('login',6,'',315,'0,0,"@@impresa,'+id+'","0,10"', 0, 1, $("#listaintegracion"));  
            $("ul.pagination").attr('filtro_sp','@@impresa,'+id)
            paginate($("ul.pagination").attr('vtbl'),undefined,'@@impresa,'+id);
             $(".pagination").attr('filtro_sp','@@impresa,'+id+',^,?');
        });
        
        $(document).on('click','.status',function(){

            var vclave = $(this).parent().parent().attr('clave');

            if ($(this).is("[disabled]")) {
                event.preventDefault();
            }

            if($(this).attr('style').indexOf('lime') > -1){
                Materialize.toast('Documento Electrónico Aceptado',4000,'green');
                return false;
            }

            var vid = $(this).attr('id').substr(1);

                $(this).removeClass('mdi-information-outline').addClass('mdi-spin mdi-loading')
    $.get('../wsdlClient.php',{accion:4,id:0,clave:vclave})
        .done(function(data){
            var ex;
            var p;
            var color = msj = colort = '';
            var state = 0;

            try{
                p = JSON.parse(data);
                console.log(p['estado'])
                switch(p['estado']){
                    case 'aceptado':
                        color = 'lime';
                        state = 1;
                        msj = !p['rs'].trim().length ? 'Documento Electrónico Aceptado' : p['rs'];
                        colort = 'green';
                        break;
                    case 'recibido':
                        color = 'light-green';
                        state = 9;
                        msj = 'Documento Electrónico Recibido';
                        colort = 'light-green';
                        break;
                    case 'rechazado':
                        color = 'red';
                        state = 3;
                        msj = !p['rs'].trim().length ? 'Documento Electrónico Rechazado' : p['rs'];
                        colort = 'red';
                        break;
                    case 'procesando':
                        color = 'yellow';
                        state = 2;
                        msj = 'Procesando Documento Electrónico';
                        colort = 'yellow'
                        break;
                    case 'Sin Subir':
                        msj = 'Sin Subir';
                        colort = 'blue';
                        color = 'blue';
                        state = 7;
                        break;
                    case 'Sin Internet':
                        color = 'blue';
                        state = 0;
                        msj = p['rs'];
                        colort = 'blue';
                        break;
                    case 'error':
                        state = 8;
                        color = 'red'
                        msj = 'Error en Documento Electrónico';
                        colort = 'red';
                        break;
                    default:
                        break;
                }

                if (state){

                    $("#e"+vid).css('color',color);
                    arr('login',7,2,188,'feestado='+state,'id='+vid,0,0);
                    
                }
                //console.log(p+' '+msj)
                Materialize.toast(msj,6000,colort);
            }catch(ex){
                console.log(ex)
                console.log(data)
                Materialize.toast('Error Obteniendo Estado',6000,'red')
            }
            $(".status").attr('disabled',false)
            $("#e"+vid).removeClass('mdi-spin mdi-loading').addClass('mdi-information-outline');
            $("#e"+vid).css('color',color);
        });
        });
    </script>
</body>
</html>