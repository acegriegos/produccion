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

    <a href='#modal-monedas' id="addMoneda" class="btn green der tooltipped modal-trigger" data-position="top" data-tooltip="Ingresar Moneda">Agregar Moneda</a>

    <a href='#modal-wsdl' id="mantWsdl" class="btn btn-info der tooltipped modal-trigger" data-position="left" data-tooltip="WSDL">Mantenimiento WSDL</a>

    <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-monedas">
        <thead>
            <tr>
                <th>Símbolo</th>
                <th>Moneda</th>
                <th>Valor</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="listamonedas">
            {section name=LE loop=$MON}
            <tr id="a_{$MON[LE][0]}">
                <td {if $MON[LE][3] neq ''} class="tooltipped" style="border: 1px solid red;" data-position="top" data-tooltip="Moneda por Defecto"{/if}>{$MON[LE][4]}</td>
                <td>{$MON[LE][1]}</td>
                <td>{$MON[LE][2]}</td>
                <td>
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
            <tr id="b_1">
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
    <div class="row">

        <div class="input-field col s6">
            <a class="prefix"><i class="small material-icons">search</i></a>
            <input type="text" id="search_tipopagos" maxlength="100" num="+26" var="nombre">
            <label for="search_tipopagos">Buscar Tipo Pago</label>
        </div>

        <div id="ftipopagos" class="col s6">

            <div class="row">

                <div class="col s1">
                    <a class="prefix btn-floating blue add tooltipped" modulo="tipopago" data-position="top" data-tooltip="Ingresar Tipo de Pago"><i class="small material-icons">add</i></a>
                </div>

                <div class="input-field col s11">
                    <input type="text" id="vnombre_pago">
                    <label for="vnombre_pago">Ingresar Tipo Pago</label>
                </div>
            
            </div>

            <div class="modal modal-fixed-footer" id="modal-tipopagos">

                <div class="modal-header">
                    Editar Tipo Pago "<span id="pname-mod"></span>"
                    <input type="hidden" id="vid" value="0">
                </div>

                <div class="modal-content">
                    
                    <div class="row">
                        <div class="col s6">
                            <div class="input-field">    
                            <input type="text" id="tmp_pagos">
                            <label id="tmp_l_pagos" for="tmp_pagos">Nombre del Pago</label>
                            </div>

                            <!-- <br>

                            <div class="input-field mix">    
                            <select type="select" id="vcuenta" defecto="">
                                <option value="" disabled>Seleccione una Cuenta</option>
                                {section name=LE loop=$CUE}
                                <option value="">{$CUE[LE][1]}</option>
                                {/section}
                            </select>
                            <label for="cta-pagos">Cuenta Contable</label>
                            </div>  -->

                        </div>

                        <div class="input-field col s6 mix">
                            <p>
                            <input type="checkbox" id="vbancos" />
                            <label for="vbancos">Acredita Bancos</label>
                            </p>

                            <p>
                            <input type="checkbox" id="extra" />
                            <label for="extra">Tiene Extras</label>
                            </p>

                        </div>
                    </div>

                    <div class="row extra hide">
                        <div class="input-field col s6">
                            <input type="text" id="vextra">
                            <label for="vextra">Nombre de la Extra</label>
                        </div>

                        <div class="input-field col s6">
                            <input type="text" id="vregex">
                            <label for="vregex">Expresión regular</label>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
                    <button type="button" class="btn btn-primary edit" modulo="tipopago">Guardar</button>
                </div>

            </div>

        </div>
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
            <tr id="c_{$TPAG[LE][0]}">
                <td><input type="text" value="{$TPAG[LE][1]}" readonly style="border: 0px;margin: 0px; padding: 0px;"></td>
                <td align="right">

                    <a class="btn load_x" modulo="tipopago" id="e{$TPAG[LE][0]}" title="Editar Tipo Pago" href='#modal-tipopagos'><i class="fa fa-pencil-square-o"></i></a>
                    {if $TPAG[LE][0] neq 0}
                    <a class="btn delete" modulo="tipopago" id="f{$TPAG[LE][0]}" style="color: #D9534F" title="Eliminar Tipo Pago"><i class="fa fa-times"></i></a>
                    {/if}
                    
                </td>
            </tr>
            {/section}
        </tbody>
    </table>
</div>

<hr style="border: 1px solid #e2e2e2">
<h3 class="card-header">Bancos</h3>
<div class="class-block">
    <div class="row">

        <div class="input-field col s6">
            <a class="prefix"><i class="small material-icons">search</i></a>
            <input type="text" id="search_bancos" maxlength="100" num="+202" var="nombre">
            <label for="search_bancos">Buscar Banco</label>
        </div>

        <div id="fbancos" class="col s6">

            <div class="row">

                <div class="col s1">
                    <a class="prefix btn-floating blue add tooltipped" modulo="banco" varias="1" data-position="top" data-tooltip="Ingresar Banco"><i class="small material-icons">add</i></a>
                </div>

                <div class="input-field col s11">
                    <input type="text" id="vnombre_banco" noClear="1">
                    <label for="vnombre_banco">Ingresar Banco</label>
                </div>
            
            </div>

            <div class="modal modal-fixed-footer" id="modal-bancos">

                <div class="modal-header">
                    Valores del Banco "<span id="bname-mod" type="html"></span>"
                    <input type="hidden" id="vid" value="0">
                </div>

                <div class="modal-content">
                    <div class="row">
                        <div class="input-field col s6">
                            <input type="number" id="vcomision" class="eder" value="0">
                            <label for="vcomision">Comisón por Uso de Datáfono</label>
                        </div>
                        <div class="input-field col s6">
                            <select type="select" id="vcuenta" defecto="1" noClear="1">
                                <option value="" disabled>Seleccione una Cuenta</option>
                                {section name=LE loop=$CUE}
                                <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                {/section}
                            </select>
                            <label for="vcuenta">Cuenta Comisión de Datáfono</label>
                        </div>
                    </div>

                    <div vtabla="detallebanco" detalle="1" vnum="203">
                        <h4>Cuentas Bancarias</h4>
                        <div class="row">
                            <div class="input-field col s2 m3">
                                <a class="btn-floating prefix small" id="add_x"><i class="material-icons blue">add</i></a>
                                <input type="text" id="vdet_nom">
                                <label for="vdet_nom">Nombre</label>
                            </div> 

                            <div class="input-field col s2 m3">
                                <input type="text" id="vdet_cta">
                                <label for="vdet_cta">Número</label>
                            </div>  

                            <div class="input-field col s2 m3">
                                <select type="select" id="vdet_moneda">
                                    <option value="" disabled selected>Seleccione una Moneda</option>
                                    {section name=LE loop=$MON}
                                    <option value="{$MON[LE][0]}" simb="{$MON[LE][4]}">{$MON[LE][1]}</option>
                                    {/section}
                                </select>
                                <label for="vdet-moneda">Moneda de la Cuenta</label>
                            </div> 

                            <div class="input-field col s2 m3">
                                <select type="select" id="vctabnk">
                                    <option value="" disabled selected>Seleccione una Cuenta</option>
                                    {section name=LE loop=$CUE}
                                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                    {/section}
                                </select>
                                <label for="vdet-cuenta">Cuenta Contable Asociada</label>
                            </div>   
                        </div>

                        <ul class="collection" id="fdetallebancos" tp="1">
                           
                        </ul>
                    </div>
                    
                </div>

                <div class="modal-footer">
                    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
                    <button type="button" class="btn btn-primary edit" modulo="banco" varias="1">Guardar</button>
                </div>

            </div>

        </div>
    </div>

    <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-bancos">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="listabancos">
            {section name=LE loop=$BNK}
            <tr id="e_{$BNK[LE][0]}">
                <td><input type="text" value="{$BNK[LE][1]}" class="fast-edit" style="border: 0px;margin: 0px; padding: 0px;"></td>
                <td align="right">

                   <a class="btn load" modulo="banco" varias="1" id="i{$BNK[LE][0]}" href='#modal-bancos' title="Valores del Banco" ><i class="fa fa-gg-circle"></i></a>
                    
                    <a class="btn delete" modulo="banco" id="j{$BNK[LE][0]}" style="color: #D9534F" title="Eliminar Banco"><i class="fa fa-times"></i></a>
                    
                </td>
            </tr>
            {/section}
        </tbody>
    </table>
</div>

<hr style="border: 1px solid #e2e2e2">
<h3 class="card-header">Categorías</h3>
<div class="class-block">
    <div class="row">

        <div class="input-field col s6">
            <a class="prefix"><i class="small material-icons">search</i></a>
            <input type="text" id="search_nivelesclientes" maxlength="100" num="+69" var="nombre">
            <label for="search_nivelesclientes">Buscar Categoría</label>
        </div>

        <div id="fnivelesclientes" class="col s6">

            <div class="row">

                <div class="col s1">
                    <a class="prefix btn-floating blue add tooltipped" modulo="nivelescliente" data-position="top" data-tooltip="Ingresar Categoría"><i class="small material-icons">add</i></a>
                </div>

                <div class="input-field col s11">
                    <input type="text" id="vnombre_nivel">
                    <label for="vnombre_nivel">Ingresar Categoría</label>
                </div>
            
            </div>

        </div>
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
            <tr id="d_{$CATC[LE][0]}">
                <td><input type="text" id="vnombre" class="fast-edit fast-edit-r" value="{$CATC[LE][1]}" style="border: 0px;margin: 0px; padding: 0px;" maxlength="20"></td>
                <td align="right">
                    
                    <a class="btn valorescc" id="g{$CATC[LE][0]}" href='#modal-valorescat' title="Valores en el Sistema"><i class="fa fa-gg-circle"></i></a>
                    
                    
                    <a class="btn delete" modulo="nivelescliente" id="h{$CATC[LE][0]}" style="color: #D9534F" title="Eliminar Nivel de Cliente"><i class="fa fa-times"></i></a>
                    
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
                    <input type="checkbox" name="vprincipal" id="vprincipal" value="0" stay="0" />
                    <label for="vprincipal">Moneda Principal</label>
                </div>

                <div class="input-field col s4">
                    <input type="checkbox" id="iswsdl" name="iswsdl" stay="0" changed="1" />
                    <label for="iswsdl">Valor por WSDL</label>
                </div>
      </label>

      <div class="wsdl-op">
      <br>
        <div class="input-field" >
            <select id="vwsdl" type="select" noClear="1">
                <option value="0">Seleccione un WSDL</option>
                {section name=LE loop=$WSDL}
                <option value="{$WSDL[LE][0]}">{$WSDL[LE][1]}</option>
                {/section}
            </select>
            <label>WSDL</label>
        </div>

    </div>
</div>
</div>

<div class="modal-footer">
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
    <button type="button" class="btn btn-primary add" modulo="moneda">Agregar</button>
</div>

</div><!-- /.modal -->


<div class="modal" id="modal-wsdl">

    <div class="modal-content">
    <a href='#modal-wsdl-bt' id="mantWsdl-bt" class="btn-floating modal-trigger tooltipped material
    " data-position="top" data-tooltip="Ingresar Moneda"><i class="material-icons">adds</i></a>

    <ul class="collection" id="showWSDL">
        {section name=LE loop=$WSDL}
             <li class="collection-item dismissable" style="cursor: pointer;" id="ws_{$WSDL[LE][0]}"><div><span class="wsdls" id="wsid_{$WSDL[LE][0]}">{$WSDL[LE][1]}</span><a class="secondary-content delws" id="delws{$WSDL[LE][0]}"><i class="material-icons">delete</i></a></div></li>
        {/section}
       
    </ul>

    </div>

</div><!-- /.modal -->

<div class="modal bottom-sheet" id="modal-wsdl-bt">

    <div class="modal-content">
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
                
            <div class="fixed-action-btn">
                <a class="btn-floating btn-large red" modulo="wsdl" detalle="1">
                  <i class="large material-icons">add</i>
                </a>
            </div>
        </div>
    </div>
        
</div><!-- /.modal -->

<div class="modal modal-fixed-footer" id="modal-valorescat" style="width: 80%; height: 550px">

    <div class="modal-header">
        Valores en el Sistema - Categoría "<span id="cname-mod"></span>"
    </div>

    <div class="modal-content" id="fdetallenivelesclientes">
        <h3>Clientes</h3>
        <input type="hidden" id="viddetalle">
        <input type="hidden" id="vidnivel">
        <div class="row">
            <div class="input-field col s6 l3">
                <a class="prefix">%</a>
                <input type="text" id="vclie_descuento_max" class="eder set0">
                <label for="vclie_descuento_max">Descuento Max.</label>
            </div>
            <div class="input-field col s6 l3">
                <a class="prefix">%</a>
                <input type="text" id="vclie_descuento" class="eder set0">
                <label for="vclie_descuento">Descuento Base</label>
            </div>
            <div class="input-field col s6 l3">
                <input type="text" id="vclie_plazo" class="eder set0">
                <label for="vclie_plazo">Plazo en Días</label>
            </div>
            <div class="input-field col s6 l3">
                <input type="text" id="vclie_credito" class="eder set0">
                <label for="vclie_credito">Crédito</label>
            </div>
        </div>

        <div class="row">
            <div class="input-field col s6 l3">
                <select id="vdcontado" type="select">
                    <option value="" disabled selected defecto="">Seleccione una Cuenta</option>
                    {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vdcontado">Contado Debe</label>
            </div>
            <div class="input-field col s6 l3">
                <select id="vhcontado" type="select" defecto="">
                    <option value="" disabled selected>Seleccione una Cuenta</option>
                    {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vhcontado">Contado Haber</label>
            </div>
            <div class="input-field col s6 l3">
                <select id="vdcredito" type="select" defecto="">
                    <option value="" disabled selected>Seleccione una Cuenta</option>
                    {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vdcredito">Crédito Debe</label>
            </div>
            <div class="input-field col s6 l3">
                <select id="vhcredito" type="select" defecto="">
                    <option value="" disabled selected>Seleccione una Cuenta</option>
                    {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vhcredito">Crédito Haber</label>
            </div>
        </div>
       
        <h3>Productos</h3>

        <div class="row">

            <div class="input-field col s6 l4">
                <a class="prefix">%</a>
                <input type="text" id="vprod_descuento_max" class="eder set0">
                <label for="vprod_descuento_max">Descuento Max.</label>
            </div>

            <div class="input-field col s6 l4">
                <input type="text" id="vprod_descuento" class="eder set0">
                <label for="vprod_descuento">Descuento Base</label>
            </div>

            <div class="input-field col s6 l4">
                <select id="vprod_cuenta" type="select" defecto="">
                    <option value="" disabled selected>Seleccione una Cuenta</option>
                    {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vprod_cuenta">Cuenta Inventario</label>
            </div>
        </div>

    </div>

    <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
        <button type="button" class="btn btn-primary edit" modulo="detallenivelescliente">Guardar</button>
    </div>

</div>