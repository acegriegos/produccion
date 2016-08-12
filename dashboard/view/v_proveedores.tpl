<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Proveedores 2.0</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-proveedores.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    {$NAV}
    <br><br>
    <div class="bdy">
    <h3 class="card-header card-primary" style="color: #fff"><b>PROVEEDORES</b></h3><br>
    <input type="hidden" id="vtabla" value="17">

    <div class="row">
    <div class="col-md-8 col-lg-8">
    <div class="input-group">
        <span class="input-group-btn">
        <button class="btn btn-primary" type="button"><i class="fa fa-search"></i><span style="color: transparent">.</span></button>
        </span>
        <input type="search" class="form-control" placeholder="Nombre de Proveedor">
    </div>
    </div>
    <div class="col-md-4 col-lg-4">
        <button type="button" id="ingProv" class="btn btn-primary der" data-toggle="modal" href="#modal-proveedores" style="margin-right: 15px; padding: 12px 18px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button>
    </div>
  </div><br><br>
    
    <div class="card-block">
    <table class="table table-striped table-bordered table-hover dt-responsive nowrap">
        <thead>
            <tr>
                <th>Cédula Jurídica</th>
                <th>Razón Social</th>
                <th>Teléfonos</th>
                <th>Correo</th>
                <th>Web</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="listaProveedores">
            {section name=LE loop=$PROV}
          <tr id="f1">
            <td>{$PROV[LE][1]}</td>
            <td>{$PROV[LE][2]}</td>
            <td>{$PROV[LE][3]}</td>
            <td style="font-size: 0.9em">{$PROV[LE][4]}</td>
            <td>{$PROV[LE][5]}</td>
            <td>
                <i class="fa fa-pencil-square-o btn load" id="m{$PROV[LE][0]}" data-toggle="modal" href='#modal-proveedores' modulo="proveedore"></i>
                <i class="fa fa-times btn delete" codigo="1" modulo="proveedore" id="d{$PROV[LE][0]}" style="color: #D9534F"></i>
            </td>
          </tr>
          {/section}
        </tbody>
    </table>
    </div>

     <div class="modal fade" id="modal-proveedores">
         <div class="modal-dialog" style="width: 50%;">
             <div class="modal-content">
                 <div class="modal-header">
                     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                     <h4 class="modal-title" id="titModal">Agregar Proveedor</h4>
                 </div>
                 <div class="modal-body">
                     <form id="fproveedores">
                     <input type="hidden" id="vid" value="0">

                        <div class="row">
                        <div class="col-md-8 col-lg-8">
                            <div class="input-group">
                                <div class="input-group-addon"><b>Cédula Jurídica</b></div>
                                <input type="text" class="form-control eder" id="vcedula" placeholder="Cédula de Proveedor" data-mask="9-999-999999">
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-4">
                            <div class="input-group">
                                <div class="input-group-addon"><b>Código</b></div>
                                <input type="text" class="form-control eder" id="vid" placeholder="Código" value="P-{$MAXID[0][0]}" readonly>
                            </div>
                        </div>
                        </div><br>

                        <div class="row">
                        <div class="col-md-12 col-lg-12">
                            <div class="input-group">
                                <div class="input-group-addon"><b>Razón Social</b></div>
                                <input type="text" class="form-control eder" id="vnombre" placeholder="Nombre de Proveedor">
                            </div> 
                        </div>
                        </div><br>
                        
                        <div class="card-header" vtabla="telefono" id="ftelefonos" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
                        <div class="card-title"><b>Teléfonos</b></div>
                        <div class="row">
                            <div class="col-md-4 col-lg-4">
                                <div class="input-group">
                                    <div class="input-group-addon"><b><i class="fa fa-building" aria-hidden="true"></i></b></div>
                                    <input type="text" class="form-control eder" id="vtrabajo" placeholder="Trabajo" data-mask="9999-9999">
                                </div> 
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <div class="input-group">
                                    <div class="input-group-addon"><b><i class="fa fa-home" aria-hidden="true"></i></b></div>
                                    <input type="text" class="form-control eder" id="vcasa" placeholder="Casa" data-mask="9999-9999">
                                </div> 
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <div class="input-group">
                                    <div class="input-group-addon"><b><i class="fa fa-mobile" aria-hidden="true"></i></b></div>
                                    <input type="text" class="form-control eder" id="vmovil" placeholder="Móvil" data-mask="9999-9999">
                                </div> 
                            </div>
                        </div><br>
                        </div><br>

                        <div class="card-header" vtabla="correo" id="fcorreos" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
                        <div class="card-title"><b>Correos</b></div>
                        <input type="hidden" id="vcorreo3" value="">
                        <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <div class="input-group">
                                <div class="input-group-addon"><b><i class="fa fa-envelope-o" aria-hidden="true"></i><small> (1)</small></b></div>
                                <input type="text" class="form-control eder" id="vcorreo1" placeholder="ejemplo@dominio.com">
                            </div> 
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="input-group">
                                <div class="input-group-addon"><b><i class="fa fa-envelope" aria-hidden="true"></i><small> (2)</small></b></div>
                                <input type="text" class="form-control eder" id="vcorreo2" placeholder="ejemplo@dominio.com">
                            </div> 
                        </div>
                        </div><br>
                        </div><br>

                        <div class="row">
                        <div class="col-md-12 col-lg-12">
                            <div class="input-group">
                                <div class="input-group-addon"><b>Web</b></div>
                                <input type="text" class="form-control eder" id="vweb" placeholder="www.dominio.com">
                            </div> 
                        </div>
                        </div><br>

                        <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <div class="input-group">
                                <div class="input-group-addon"><b>Crédito</b></div>
                                <input type="text" class="form-control eder" id="vcredito" placeholder="0" data-mask="999999999">
                                <div class="input-group-addon"><b>¢</b></div>
                            </div> 
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="input-group">
                                <div class="input-group-addon"><b>Plazo</b></div>
                                <input type="text" class="form-control eder" id="vplazo" placeholder="0" data-mask="999999999">
                                <div class="input-group-addon"><b>días</b></div>
                            </div> 
                        </div>
                        </div><br>
                     </form>
                
                <div class="alert alert-danger err_" id="err1" style="display: none">
                    <strong id="errm1"></strong>
                </div>
                <div class="alert alert-success suc_" id="suc1" style="display: none">
                    <strong id="sucm1"></strong>
                </div>

                 </div>
                 <div class="modal-footer">
                     <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                     <button type="button" class="btn btn-primary add" modulo="proveedore" id="agProv" codigo="1" vtablas="1">Agregar</button>
                 </div>
             </div>
         </div>
     </div>

    </div> <!-- END BDY -->

    </div>
    <script src="../assets/js/bootstrap.js"></script>
    <script src="../assets/js/alertModal.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
    <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
    <script src="../assets/js/asgard.js"></script>
    <script src="../assets/js/jquery.mask.min.js"></script>
    <script src="../assets/js/modulos/proveedores.js"></script>
    <script src='https://maps.googleapis.com/maps/api/js?v=3.exp'></script>
  </body>
</html>