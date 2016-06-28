<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Compras</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-compras.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/jquery.auto-complete.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  <!-- Wrapper -->
    <div id="wrapper">
 <!-- Page Content -->
    <div id="page-content-wrapper">
    
    {$NAV}
    <div class="bdy">
        <div class="panel panel-default">
        <div id="fcompras">

        <div class="panel-heading">
            <h3 class="panel-title"><b id="tptit">COMPRAS</b></h3><br>

          <span class="der asterisco ncompra"><b>N° Compra: {$NFACT}</b></span>
          <input type="hidden" id="vid" value="0">
          <input type="hidden" id="vidempresa" value="{$smarty.session.IMPRESA}">

          <br>

          <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
              <div class="radio">
                <label>
                  <input type="radio" id="vidtipofactura" name="vidtipofactura" value="1" checked="checked">
                  Contado
                </label>
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
              <div class="radio">
                <label>
                  <input type="radio" id="cred" name="vidtipofactura" value="2">
                  Crédito
                </label>
              </div>
            </div>

            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
              
              <div class="input-group">
                <div class="input-group-addon"><b>Forma de Pago</b></div>
                <select id="vtipopago" class="form-control" type="select">
                  {section name=LE loop=$TPAGO}
                    <option value="{$TPAGO[LE][0]}">{$TPAGO[LE][1]}</option>
                  {/section}
                </select>
              </div>
    
            </div>
          </div>

          <br>
                <div class="row">
                  <div class="col-md-4 col-lg-4">
                    
                    <div class="input-group">
                        <div class="input-group-addon"><b>Número Referencia</b></div>
                        <input type="text" class="form-control eder" id="vreferencia" placeholder="Numero de Referencia">
                    </div>
                    
                    <br>
                  </div>
                    
                  <div class="col-md-4 col-lg-4">  
                    <div class="input-group">
                        <div class="input-group-addon"><b>Fecha Inclusión</b></div>
                        <input type="date" id="vfecha_inclucion" class="form-control" value="{$smarty.now|date_format:'%Y-%m-%d'}" >
                    </div>
                   
                    <br>
                  </div>
                    
                  <div class="col-md-4 col-lg-4">

          
                  <div class="input-group">
                      <div class="input-group-addon"><b>Fecha Entrega</b></div>
                      <input type="date" id="vfecha_entrega" class="form-control" value="" >
                      
                  </div>
                    
                    <input type="hidden" id="tipopago" class="form-control" value="1"> 
                           
                  </div>
                  <br>
                </div>
            <!-- </div> -->
            <!-- <div class="panel-body" style="border-top: 1px dashed rgb(238,238,238)"> -->
                <!-- <h3 class="panel-title"><b id="ncli">DATOS DEL PROVEEDOR</b></h3><br> -->
               
                <div class="row">
                    
                    <div class="col-md-6 col-lg-6">
                        <div class="input-group">
                            <div class="input-group-addon"><b>Nombre</b></div>
                            <input type="text" class="form-control" id="nprv" placeholder="Nombre del Proveedor">
                        </div>
                        <br>
                    </div>

                    <div class="col-md-6 col-lg-6">
                        <div class="input-group">
                            <div class="input-group-addon"><b>Cédula</b></div>
                            <input type="text" class="form-control" id="idprv" placeholder="Cédula del Proveedor">
                            <input type="hidden" id="vidproveedor" class="form-control" value="0">
                        </div>
                    </div>

                </div>
              
            </div>
            <div class="panel-heading panel-footer" style="border-top: 1px solid rgb(245,245,245);">
                <h3 class="panel-title"><b id="det">INGRESAR PRODUCTOS</b></h3><br>
                <div class="row">
                <!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"> -->
                <!-- <div class="table-responsive"> -->
                <!-- <table class="table table-striped dt-responsive nowrap" id="data-table-ingresar" cellspacing="0" width="100%"> -->
                        <!-- <thead> -->
               <!--      <tr>
                      <th>Descripción</th>
                      <th width="25%">Código</th>
                    </tr>
                  </thead>
                  <tbody id="addprdct">
                    <tr>
                      <td><input type="text" id="descr" class="form-control" value="" ></td>
                      <td><input type="text" id="cod" class="form-control" value="" ></td>
                    </tr>
                  </tbody>
                </table> -->
              <!-- </div> -->
            <!-- </div> -->

            <div class="col-md-6 col-lg-6">
              <div class="input-group">
                  <div class="input-group-addon"><b>Descripción</b></div>
                  <input type="text" id="descr" class="form-control" value="">
              </div>
              <br>
            </div>
            <div class="col-md-3 col-lg-3">
              <div class="input-group">
                  <div class="input-group-addon"><b>Código</b></div>
                  <input type="text" id="cod" class="form-control" value="">
              </div>
            </div>
            <div class="col-md-3 col-lg-3">
              <div class="checkbox">
                <label>
                  <input type="checkbox" id="prodprov">
                  Cargar Productos del Proveedor
                </label>
              </div>
            </div>

            </div>

            <div class="alert alert-warning" align="center" style="display: none" id="alert-prod">
                <strong >Producto no Existente,</strong>
                Desea Agregarlo al Realizar la Compra?<br> <button type="button" class="btn btn-info" id="includ">Aceptar</button> <button type="button" class="btn btn-success" id="ninunclud">Declinar</button>
              </div>
            </div>
            <div class="panel-body">
            <div class="row">
              <h3 class="panel-title" align="center"><b>DETALLE COMPRA</b></h3><br>
              <button type="button" class="btn btn-info der" id="del1" style="margin-right: 15px">Eliminar Filas</button>
              <br><br>
            </div>
              <div class="row">
                    <div class="table-responsive">
                      <table class="table table-striped table-bordered dt-responsive nowrap" id="data-table-detalle" cellspacing="0" width="100%">
                        <thead>
                          <tr>
                            <th>Descripción</th>
                            <th style="width: 13%">Cantidad</th>
                            <th style="width: 13%">Costo</th>
                            <th style="width: 13%">Precio</th>
                            <th style="width: 13%">Margen</th>
                            <th style="width: 13%">Total Margen</th>
                            <th  style="width: 8%" align="center">%</th>
                          </tr>
                        </thead>
                        <tbody id="detallecompra">
                          <tr id="f1">
                            <td>  <span class="checkbox" id="prod1"></span><input type="hidden" id="vidproducto1" class="constante1" value=""><input type="hidden" id="vidfactura1" value="?"></td>
                            <td><input type="number" id="vcantidad1" idx=1 class="form-control xort" value="1"  min="1"></td>
                            <td><input type="text" id="vcosto1" idx=1 class="form-control xort eder" value="0.00"  data-mas="99999999.99"></td>
                            <td><input type="text" id="vprecio1" idx=1 class="form-control xort eder" value="0.00"  data-mas="99999999.99"></td>
                            <td align="right"><div class="checkbox"> <span class="valores" id="margen1">0.00</span></div></td>
                            <td align="right"><div class="checkbox"> <span class="valores" id="totm1">0.00</span></div></td>
                            <td align="left"><div class="checkbox "> <input type="checkbox" class="delf" name="eliminarf" value="1" style="float: right;"> <span id="prcent1" value="0">0.00</span>  </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
              </div>
            </div>

            <div class="panel-heading">
              <h3 class="panel-title"><b>OPCIONES DE COMPRA</b></h3><br>

              <div class="row">
                <div class="col-md-6 col-lg-6">

                <strong>

                <table class="table table-striped table-hover" style="border: 1px solid #e2e2e2;">
                  <tbody>
                    <tr>
                      <td>TOTAL:</td>
                      <td align="right"><span><b>¢</b></span> <span id="tot">0.00</span>
                      <input type="hidden" id="vtsubtotal" value="0"></td>
                    </tr>
                    <tr>
                      <td>TOTAL MARGEN:</td>
                      <td align="right"><span><b>¢</b></span> <span id="tmargen">0.00</span><input type="hidden" id="vtmargen" value="0"> </td></td>
                    </tr>
                  </tbody>
                </table>

                </strong>

                </div>
               
                <div class="col-md-6 col-lg-6">

                  <textarea id="vcomentario" class="form-control" cols="25" placeholder="Comentario de la Compra" type="textarea"></textarea>

                <br>
                  <button class="btn btn-primary der add" modulo="compra" codigo="1" id="comprar" detalle=1>Ingresar Factura</button>
                </div>

                </div> 
              </div>
              <br>
              
              <div class="alert alert-danger err_" id="err1">
                  <strong id="errm1"></strong>
              </div>
              <div class="alert alert-success suc_" id="suc1">
                  <strong id="sucm1"></strong>
              </div>
              
              </div>
        </div>
    </div>

    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/mask/jquery.mask.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
    <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
    <script src="../assets/js/jquery.auto-complete.min.js"></script>
    <script src="../assets/js/asgard.js"></script>
    <script src="../assets/js/modulos/compras.js"></script>

  </div>
</div>    

  </body>
</html>



