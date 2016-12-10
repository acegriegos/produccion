<div id="mantPaquetes">
  <div class="row">
    <div class="col s6 m6">
        <div class="input-field col s6">
            <input id="searchpqt" type="text" class="validate">
            <label for="searchpqt" id="lpq">Buscar por Código</label>
        </div>
        <a class="dropdown-button btn-floating btn-large waves-effect waves-light green" data-activates="fpqt"><i class="material-icons">search</i></a>
        <ul id="fpqt" class="dropdown-content" filter="1">
            <li><a class="dropdown-item filtropqt" filtro="f1">Código</a></li>
            <li><a class="dropdown-item filtropqt" filtro="f2">Nombre</a></li>
        </ul> 
      </div>
      <div class="col s6 col m6">
          <a id="addpackage" class="btn-floating btn-large waves-effect waves-light right blue" href="#modal-paquetes"><i class="material-icons">add</i></a>
      </div>
  </div>
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

<div id="modal-paquetes" class="modal modal-fixed-footer" style="width:70%;height:90%">
    <div class="modal-content">
        <h4  id="titpqt">Agregar Paquete</h4><hr>
        <div class="row">
            <div class="input-field col s6">
                <input id="vcodigo" type="text" class="validate" disabled>
                <label for="vcodigo">Codigo</label>
            </div>
            <div class="input-field col s6">
                <input id="vnombre" type="text" class="validate">
                <label for="vnombre">Nombre del Paquete</label>
            </div>
        </div>

        <div class="row">
            <div class="col s6">
                <table class="responsive-table bordered highlight">
                    <thead>
                        <tr>
                            <th>Nombre Producto</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" id="prod" class="autocomplete">
                                <input type="hidden" id="hprod" value="">
                            </td>
                            <td>
                               
                                <input id="cantidad" type="text">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col s6"><br>
                <div id="listapaquetes">
                    <!-- <div class="chip blue lighten-3">
                    Producto1 (3)
                    <i class="close material-icons">close</i>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a class="waves-effect waves-light btn-flat modal-action blue white-text">Agregar</a>
        <a class="waves-effect waves-light btn-flat modal-action modal-close grey lighten-1 white-text" red>Salir</a>
    </div>
</div>

</div> <!-- End mantPaquetes -->