<link rel="stylesheet" href="../assets/css/bootstrap-tokenfield.css">
<link rel="stylesheet" href="../assets/css/tokenfield-typeahead.css">

<div id="mantPaquetes">
<h2 align="center">Mantenimiento Paquetes</h2>
<hr>
  <div class="row">
    <div class="col-md-6 col-lg-6">
        <div class="input-group">
            <span class="input-group-btn">
            <button class="btn btn-primary" type="button"><i class="fa fa-search"></i><span style="color: transparent">.</span></button>
            </span>
            <input type="search" class="form-control" placeholder="Nombre de Paquete">
        </div>
      </div>
      <div class="col-md-6 col-lg-6">
          <button type="button" id="ingInvPqts" class="btn btn-primary der" data-toggle="modal" href="#modal-paquetes" style="margin-right: 15px; padding: 16px 18px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button>
      </div>
  </div><br><br>

<div class="input-group">
  <input type="text" class="form-control" aria-label="Text input with dropdown button">
    <div class="input-group-btn">
      <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Action
      </button>
      <div class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="#"><i class="fa fa-pencil"></i>&nbsp;&nbsp;Editar</a>
        <a class="dropdown-item" href="#"><i class="fa fa-certificate" style="color: #f0ad4e"></i>&nbsp;&nbsp;Promoción</a>
        <div role="separator" class="dropdown-divider"></div>
        <a class="dropdown-item" href="#"><i class="fa fa-times" style="color: #D9534F"></i>&nbsp;&nbsp;Eliminar</a>
      </div>
    </div>
</div>

<div class="modal fade" id="modal-paquetes">
  <div class="modal-dialog" style="width: 80%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Agregar Paquetes</h4>
      </div>
      <div class="modal-body">
      <div class="row">
        <div class="col-md-8 col-lg-8">
          <div class="input-group input-group">
            <span class="input-group-addon">Nombre</span>
            <input type="text" class="form-control" aria-label="Nombre de Paquete" placeholder="Nombre de Paquete">
          </div>
        </div>
        <div class="col-md-4 col-lg-4">
          <div class="input-group input-group">
            <span class="input-group-addon">Código</span>
            <input type="text" class="form-control" aria-label="Código de Paquete" placeholder="Código" value="PCK-122" disabled>
          </div>
        </div>
        <br><br>
      </div>
      <hr>
        <div class="row">
          <div class="col-md-6 col-lg-6">
          <h3>Contenido</h3>
            <div class="row">
              <div class="col-md-8 col-lg-8">
                <legend>Productos</legend>
              </div>
              <div class=" col-md-2 col-lg-2">
                <legend>Cantidad</legend>
              </div>
              <div class="col-md-8 col-lg-8">
                <input type="text" name="" id="descrP" class="form-control" value="" required="required" title="" placeholder="Nombre de Producto" style="width: 182%;">
              </div>
              <div class="col-xs-2" style="padding: 0 1 0 3%">
                <input type="number" name="" id="cantProd" class="form-control" value="" required="required" title=
              "" placeholder="1" min="1" value="1">
              </div>
              <div class="col-xs-2" style="padding: 0 1 0 3%">
                <button type="button" id="agInvProPqts" class="btn btn-primary" style="padding: 12px 13px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button>
              </div>
            </div><br>
            <div class="row">
              <div class="col-md-8 col-lg-8">
                <legend>Servicios</legend>
              </div>
              <div class=" col-md-2 col-lg-2">
                <legend>Cantidad</legend>
              </div>
              <div class=" col-md-2 col-lg-2"></div>
              <div class="col-md-8 col-lg-8">
              <input type="text" name="" id="descrS" class="form-control" value="" required="required" pattern="" title="" placeholder="Nombre de Servicio" style="width: 182%;">
              </div>
              <div class="col-xs-2" style="padding: 0 1 0 3%">
              <input type="number" name="" id="cantServ" class="form-control" value="" required="required" pattern="" title="" placeholder="1" min="1" value="1">
              </div>
              <div class="col-xs-2" style="padding: 0 1 0 3%">
              <button type="button" id="agInvSerPqts" class="btn btn-primary" style="padding: 12px 13px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button>
              </div>
            </div>
          </div>
          <!--  -->
          <!--  -->
          <div class="col-md-6 col-lg-6" style="border-left: 0.5px solid #E2E2E2;">
          <h3>Contenido</h3>
          <legend>Productos</legend>
          <input id="textProd" class="form-control" required="required">
          <input type="hidden" id="idProdStr" class="form-control" value="0">
          <input type="hidden" id="cProdStr" class="form-control" value="0">
          <legend>Servicios</legend>
          <input id="textServ" class="form-control" required="required">
          <input type="hidden" id="idServStr" class="form-control" value="0">
          <input type="hidden" id="cServStr" class="form-control" value="0">
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-lg-8"></div>
          <div class="col-lg-4">
              <div class="input-group">
                <span class="input-group-addon">TOTAL</span>
                <input type="text" class="form-control" aria-label="Amount (rounded to the nearest dollar)" placeholder="0.00">
              </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
        <button type="button" class="btn btn-primary">Agregar</button>
      </div>
    </div>
  </div>
</div>

</div> <!-- End mantPaquetes -->