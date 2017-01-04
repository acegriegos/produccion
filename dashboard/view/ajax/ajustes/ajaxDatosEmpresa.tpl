<div class="card">
    <h3 class="card-header">Datos de la Empresa</h3>
    <div class="card-block">
        <div class="row">
            <div class="col s6">
                <label for="vnombre">Nombre de la Empresa</label>
                <input type="text" class="infoempresa validate" id="vnombre" field="empresa">
            </div>
            <div class="col s6">
                <label for="vcedula">Cédula Jurídica</label>
                <input type="text" class="infoempresa validate" id="vcedula" field="CJuridica">
            </div>
        </div>
        <div class="row">
            <div class="col s6">
                <label for="vtelefono">Teléfonos de la Empresa</label>
                <input type="text" class="infoempresa validate" id="vtelefono" field="telefonos">
            </div>
            <div class="col s6">
                <label for="vcorreo">Correo Principal de la Empresa</label>
                <input type="email" class="infoempresa validate" id="vcorreo" field="correo">
            </div>
        </div>

        <div class="row">
            <div class="col s6">
                <label for="vdireccion">Dirección de la Empresa</label>
                <input type="text" class="infoempresa validate" id="vdireccion" field="direccion">
            </div>
            <div class="col s6">
                <button type="button" class="btn btn-primary der" id="actinfo">Actualizar</button>
            </div>
        </div>

        <div class="row">

            <div class="col s6">
                <img src="#" class="img-responsive" alt="Image" width="200px" height="100px" id="vlogo">
           
                <div class="file-field der">
                  <div class="btn">
                    <span>Logo</span>
                    <input type="file" id="archivo" name="imagen" multiple="false" class="file-loading">
                  </div>
                </div>
            </div>
            
        </div>
    </div>
<hr style="border: 1px solid #e2e2e2">

    <h3 class="card-header">Monedas</h3>
    <div class="class-block">

        <a href='#modal-monedas' id="addMoneda" class="btn btn-info der tooltipped modal-trigger" data-position="left" data-tooltip="Ingresar Moneda">Agregar Moneda</a>

        <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-monedas">
        <thead>
        <tr>
        <th>Símbolo</th>
        <th>Moneda</th>
        <th>Valor</th>
        <th>Estado</th>
        </tr>
        </thead>
        <tbody id="listamonedas">
            {section name=LE loop=$MON}
            <tr id="f1">
            <td>{$MON[LE][4]}</td>
            <td>{$MON[LE][1]}</td>
            <td>{$MON[LE][2]}</td>
            <td>{$MON[LE][3]}
                <a class='dropdown-button btn der mydrop' data-activates='dropdown-m{$MON[LE][0]}'><i class="material-icons">menu</i></a>

                <ul id='dropdown-m{$MON[LE][0]}' class='dropdown-content'>
                    <li>
                        <a class="btn load accion" id="a{$MON[LE][0]}" data-target="modal" href='#modal-monedas' modulo="moneda" title="Editar Moneda"><i class="fa fa-pencil-square-o"></i></a>
                    </li>
                    <li>
                        <a modulo="moneda" id="b{$MON[LE][0]}" style="color: #D9534F" title="Eliminar Moneda" class="btn delete accion"><i class="fa fa-times"></i></a>
                    </li>
                </ul>
            </td>
            </tr>
            {/section}
        </tbody>
        </table>
    </div>
<hr style="border: 1px solid #e2e2e2">
    <h3 class="card-header">Tipo de Usuarios</h3>
    <div class="class-block">
        <div id="ftipousuarios">
        <input type="text" id="vnombre" placeholder="">
        </div>
        <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-tipousuarios">
        <thead>
        <tr>
        <th>Tipo</th>
        <th>Acciones</th>
        </tr>
        </thead>
        <tbody id="listatipousuarios">
            {section name=LE loop=$TUSR}
            <tr id="f1">
            <td>{$TUSR[LE][1]}</td>
            <td align="right">
            {if $TUSR[LE][2] eq 0}
            <a href='#modal-tusuarios' class="btn valorestu" id="c{$TUSR[LE][0]}" modulo="moneda" title="Valores en el Sistema">
            <i class="fa fa-gg-circle"></i>
            </a>
            <a href="#" class="btn delete" modulo="tipousuario" id="d{$TUSR[LE][0]}" title="Eliminar Tipo Usuario">
            <i class="fa fa-times"  style="color: #D9534F" readonly></i>
            </a>
            </td>
            {/if}
            </tr>
            {/section}
        </tbody>
        </table>
    </div>
<hr style="border: 1px solid #e2e2e2">
    <h3 class="card-header">Tipo de Pagos</h3>
    <div class="class-block">
        <div id="ftipopagos">
        <input type="text" id="vnombre" placeholder="">
        </div>

        <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-tipopagos">
        <thead>
        <tr>
        <th>Nombre</th>
        <th>Acciones</th>
        </tr>
        </thead>
        <tbody id="listatipopagos">
            {section name=LE loop=$TPAG}
            <tr id="f1">
            <td>{$TPAG[LE][1]}</td>
            <td align="right">
            {if $TPAG[LE][1]}{/if}
            <i class="fa fa-times btn delete" modulo="tipopago" id="f{$TPAG[LE][0]}" style="color: #D9534F" title="Eliminar Tipo Pago"></i>
            </td>
            </tr>
            {/section}
        </tbody>
        </table>
    </div>
<hr style="border: 1px solid #e2e2e2">
    <h3 class="card-header">Categorías</h3>
    <div class="class-block">
        <div id="fnivelesclientes">
        <input type="text" id="vnombre" placeholder="">
        </div>

        <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-nivelesclientes">
        <thead>
        <tr>
        <th>Nombre</th>
        <th>Acciones</th>
        </tr>
        </thead>
        <tbody id="listanivelesclientes">
            {section name=LE loop=$CATC}
            <tr id="f1">
            <td>{$CATC[LE][1]}</td>
            <td align="right">
            <i class="fa fa-gg-circle btn valorescc" id="g{$CATC[LE][0]}" data-toggle="modal" href='#modal-valorescat' title="Valores en el Sistema"></i>
            <i class="fa fa-times btn delete" modulo="nivelescliente" id="h{$CATC[LE][0]}" style="color: #D9534F" title="Eliminar Nivel de Cliente"></i>
            </td>
            </tr>
            {/section}
        </tbody>
        </table>
        
    </div>
<hr style="border: 1px solid #e2e2e2">
    <h3 class="card-header">Período Fiscal</h3>
    <div class="card-block">
        <div class="row">
            <div class="col s6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Fecha Inicio</b></div>
                    <input type="date" id="vfechainicio" value="">
                </div>
            </div>
            <div class="col s6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Fecha Cierre</b></div>
                    <input type="date" id="vfechafinal" value="">
                </div>
            </div>
        </div><br>
        <div class="row">
            <div class="col s12">
                <button type="button" class="btn btn-primary der" id="sfechafiscal">Guardar</button>
            </div>
        </div>
    </div>

</div>

<div class="modal modal-fixed-footer" id="modal-monedas">

        <div class="modal-header">
            <h4 class="modal-title" id="tit-modal-m"></h4>
        </div>
        <div class="modal-content">
            <div id="fmonedas">
            <input type="hidden" name="vid" value="0">
                <div class="row">
                    
                    <div class="input-field col s6">
                        <label for="vnombremon">Nombre de Moneda</label>
                        <input type="text" id="vnombremon" maxlength="45">
                    </div>

                    <div class="input-field col s6">
                        <label for="vsimbolo">Símbolo de Moneda</label>
                        <input type="text" id="vsimbolo" maxlength="2">
                    </div>

                </div>

                <div class="class">
                    
                    <div class="input-field col s12">
                        <label for="vvalor">Valor de Moneda</label>
                        <input type="number" id="vvalor" value="0.00" class="eder"> 
                    </div>

                </div>
                
                <label class="row">
                    <div class="input-field col s4">
                    <p>
                      <input type="checkbox" name="vprincipal" id="vprincipal" value="0" />
                      <label for="vprincipal">Moneda Principal</label>
                    </p>
                    </div>

                    <div class="input-field col s4">
                    <p>
                      <input type="checkbox" id="iswsdl" />
                      <label for="iswsdl">Valor por WSDL</label>
                    </p>
                    </div>
                </label>

                 <div class="wsdl-op">
                    <select type="select" id="vwsdl" noClear="1">
                        <option value="0">Agregar WSDL</option>
                        {section name=LE loop=$WSDL}
                        <option value="{$WSDL[LE][0]}">{$WSDL[LE][1]}</option>
                        {/section}
                    </select>

                    <div class="add-wsdl" id="fwsdls">
                        <label>Dirección URL del WSDL</label>
                        <input type="text" id="vwsdlsnom" placeholder="http://" maxlength="255">
                        <label>Peticion XML</label>
                        <input type="text" id="vxmlsen" placeholder="SOAP" maxlength="255">
                        <label>Respuesta XML</label>
                        <input type="text" id="vxmlreq" placeholder="SOAP" maxlength="100">
                        <label>Respuesta Array</label>
                        <input type="text" id="vobtener" placeholder="VALOR_1,VALOR_2" maxlength="255">
                        <label>Parámetros</label>
                        <table>
                            <th>Campo</th>
                            <th>Valor</th>
                            <tbody id="detallewsdl">
                                <tr id="fl0">
                                    <td>
                                    <input type="hidden" id="vidwsdl" value="?">
                                    <input type="text" id="wsn1" class="constante" value="" placeholder="Nombre del Parámetro" maxlength="64"></td>
                                    <td><input type="text" id="wsv1" value="" placeholder="Valor del Parámetro" maxlength="64"></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-info add" modulo="wsdl" detalle="1">Agregar WSDL</button>
                     </div>
                 </div>
            </div>
        </div>

        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
            <button type="button" class="btn btn-primary add" modulo="moneda">Agregar</button>
        </div>
        
</div><!-- /.modal -->