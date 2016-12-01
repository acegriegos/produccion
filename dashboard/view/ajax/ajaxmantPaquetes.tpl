<link rel="stylesheet" href="../assets/css/bootstrap-tokenfield.css">
<link rel="stylesheet" href="../assets/css/tokenfield-typeahead.css">
<link rel="stylesheet" type="text/css" href="../assets/css/bv2_toggle.css">

<div id="mantPaquetes">
<h2 align="center">Mantenimiento Paquetes</h2>
<hr>
  <div class="row">
    <div class="col-md-6 col-lg-6">
        <div class="input-group">
            <span class="input-group-btn">
            <button class="btn btn-primary" type="button"><i class="fa fa-search"></i><span style="color: transparent">.</span></button>
            </span>
            <input type="search" id="searchpqt" class="form-control" placeholder="Buscar Código">
            <div class="btn-group input-group-addon" role="group" id="fpqt" filter="1">
              <i id="btnGroupDrop1" class="dropdown-toggle fa fa-navicon but" data-toggle="dropdown">
              </i>
              <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <a class="dropdown-item filtropqt" href="#" filtro="f1">Código</a>
                  <a class="dropdown-item filtropqt" href="#" filtro="f2">Nombre</a>
              </div>
            </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-6">
          <button type="button" id="ingInvPqts" class="btn btn-primary der" data-toggle="modal" href="#modal-paquetes" style="margin-right: 15px; padding: 16px 18px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button>
      </div>
  </div><br><br>

<!-- <div class="input-group">
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
</div> -->

<br>
<div class="table-responsive">
    <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-paquetes" cellspacing="0" width="100%" >
          <thead>
              <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Descuento</th>
                  <th>Total</th>
                  <th style="width:9%">Acciones</th>
              </tr>
          </thead>
            <tbody id="listapqts">
                {section name=LE loop=$PAQ}
                <tr>
                    <td>{$PAQ[LE][1]}</td>
                    <td>{$PAQ[LE][2]}</td>
                    <td>{$PAQ[LE][3]}</td>
                    <td>{$PAQ[LE][4]}</td>
                    <td>
                      <i class="fa fa-pencil-square-o btn loadpck" id="e{$PAQ[LE][0]}" data-toggle="modal" href="#modal-paquetes"></i>
                      <i class="fa fa-times btn delpck" id="d{$PAQ[LE][0]}" style="color: #D9534F"></i>
                    </td>
                </tr>
                {/section}
            </tbody>
      </table>
  </div>
  <br><br>
</div>

<div class="modal fade" id="modal-paquetes">
  <div class="modal-dialog" style="width: 80%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="titpqt">Agregar Paquetes</h4>
      </div>
      <div class="modal-body">
      <div class="row">
        <div class="col-md-8 col-lg-8">
          <div class="input-group input-group">
            <span class="input-group-addon"><b>Nombre</b></span>
            <input type="hidden" id="vid" value="">
            <input type="text" id="vnombre" class="form-control" aria-label="Nombre de Paquete" placeholder="Nombre de Paquete">
          </div>
        </div>
        <div class="col-md-4 col-lg-4">
          <div class="input-group input-group">
            <span class="input-group-addon"><b>Código</b></span>
            <input type="text" class="form-control" id="vcodigo" aria-label="Código de Paquete" placeholder="Código" value="PCK-122" disabled>
          </div>
        </div>
        <br><br>
      </div>
      <hr>
      <!-- <div class="row">
        <div class="col-md-12 col-lg-12" align="right">
          
        </div>
      </div><br> -->
      <div class="row">
        <div class="col-md-7 col-lg-7">
          <div class="input-group">
            <div class="input-group-addon btn"><b>Producto</b></div>
            <input type="text" class="form-control" id="prod" placeholder="Producto">
            <input type="hidden" id="hprod" class="form-control" value="">
            <div class="input-group-addon btn"><b>Cantidad</b></div>
            <input type="number" id="cantidad" class="form-control" value="">
            <div class="input-group-addon btn"><i class="fa fa-plus" id="bProd"></i></div>
          </div>
        </div>
        <div class="col-md-5 col-lg-5" style="border-left: 0.5px solid #E2E2E2;">
          <ul class="list-group">
            <input type="hidden" id="arrpqt" value="0">
            <input type="checkbox" checked data-toggle="toggle" data-off="<span id='editoff'>Editable</span>" data-on="<span id='editon'>Editar</span>" data-size="small" data-width="100" data-onstyle="primary active" data-offstyle="primary active"><br><br>
            <div  id="listapaquetes"></div>
          </ul>
        </div>
      </div>
        <hr>
        <div class="row">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <div class="input-group">
              <div class="input-group-addon"><b>Descuento</b></div>
              <select id="vdescuento" class="form-control" required="required"></select>
              <div class="input-group-addon"><b>%</b></div>
            </div>
          </div>
          <div class="col-lg-4">
              <div class="input-group">
                <span class="input-group-addon"><b>TOTAL</b></span>
                <input type="text" class="form-control" value="0.00" id="totpqt" aria-label="Amount (rounded to the nearest dollar)" disabled>
                <input type="hidden" id="htotal" class="form-control" value="0.00">
              </div>
          </div>
        </div><br>
        <div class="alert alert-danger err_" id="err1" style="display: none">
          <strong id="errm1"></strong>
        </div>
        <div class="alert alert-success suc_" id="suc1" style="display: none">
          <strong id="sucm1"></strong>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
        <button type="button" class="btn btn-primary" id="addpqt">Agregar</button>
        <button type="button" class="btn btn-primary inv" id="editpck">Guardar</button>
      </div>
    </div>
  </div>
</div>

</div> <!-- End mantPaquetes -->

<script src="../assets/js/bv2_toggle.js"></script>