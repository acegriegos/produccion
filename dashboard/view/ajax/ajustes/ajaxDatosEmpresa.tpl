

<div class="card">
    <ul class="collapsible" data-collapsible="accordion">
      <li>
          <div class="collapsible-header"><i class="small material-icons">work</i><h5>Datos de la Empresa</h5></div>

          <div class="collapsible-body"><div class="card-block">
            <div class="row">
                <div class="col s12 m12 l6">
                    <label for="vnombre">Nombre de la Empresa</label>
                    <input type="text" class="infoempresa validate" id="vnombre" field="empresa">
                </div>
                <div class="col s12 m12 l6">
                    <label for="vcedula">Cédula Jurídica</label>
                    <input type="text" class="infoempresa validate" id="vcedula" field="CJuridica">
                </div>
            </div>
            <div class="row">
                <div class="col s12 m12 l6">
                    <label for="vtelefono">Teléfonos de la Empresa</label>
                    <input type="text" class="infoempresa validate" id="vtelefono" field="telefonos">
                </div>
                <div class="col s12 m12 l6">
                    <label for="vcorreo">Correo Principal de la Empresa</label>
                    <input type="email" class="infoempresa validate" id="vcorreo" field="correo">
                </div>
            </div>

            <div class="row">
                <div class="col s12 m12 l6">
                    <label for="vdireccion">Dirección de la Empresa</label>
                    <input type="text" class="infoempresa validate" id="vdireccion" field="direccion">
                </div>
                <div class="col s12 m12 l6">
                    <div class="col s6 m4">
                        <img src="#" class="responsive-img" alt="Image" width="200px" height="100px" id="vlogo">
                    </div>
                    <div class="col s6 m6">

                        <div class="file-field ">
                          <div class="btn">
                            <i class="small material-icons right">perm_media</i>Logo
                            <input type="file" id="archivo" name="imagen" multiple="false" class="file-loading">
                        </div>
                    </div>
                </div>

            </div>

            <div class="col s12 m12 pull-s2">

               <button type="button" class="btn btn-primary der" id="actinfo"><i class="small material-icons right">loop</i>Actualizar</button>
           </div>
       </div>


   </div></div>
   <!-- Datos de la empresa -->
</li>
<li>
    <div class="collapsible-header"><i class="material-icons">verified_user</i><h5>Monedas</h5></div>

    <div class="collapsible-body"><div class="class-block">


        <br>
        <div class="row"> 

            <div class="col s12 m4 l5">
                <div class="row">
                    <div class="col s10 m9 l6 offset-s2">
                        <a href='#modal-monedas' id="addMoneda" class="btn  tooltipped modal-trigger" data-position="top" data-tooltip="Ingresar Moneda" style="margin-top: 5%; margin-bottom: 1%; margin-right: 1%;">Agregar Moneda</a>
                    </div>
                    <div class="col s9 m10 l6 offset-s2">
                        <a href='#modal-wsdl' id="mantWsdl" class="btn  tooltipped modal-trigger" data-position="left" data-tooltip="WSDL" style="margin-top: 5%; margin-bottom: 1%; margin-right: 1%;">Mantenimiento WSDL</a>
                    </div>
                </div>
                <br>
            </div>

            <div class="col s12 m7 l6">
                <table class="table bordered highlight responsive-table " id="data-table-monedas" style="margin: 1%;">
                    <thead>
                        <tr>
                            <th style="border: 0;">Símbolo</th>
                            <th style="border: 0;">Moneda</th>
                            <th style="border: 0;">Valor</th>
                            <th style="border: 0;"></th>
                        </tr>
                    </thead>
                    <tbody id="listamonedas">
                        {section name=LE loop=$MON}
                        <tr id="a_{$MON[LE][0]}">
                            <td {if $MON[LE][3] neq ''} class="tooltipped" style="background-color: rgba(99, 190, 29, 0.3);" data-position="top" data-tooltip="Moneda por Defecto"{/if}>{$MON[LE][4]}</td>
                            <td>{$MON[LE][1]}</td>
                            <td>{$MON[LE][2]}</td>
                            <td>
                               <a class="waves-effect waves-light load_x" id="a{$MON[LE][0]}" data-target="modal" href='#modal-monedas' modulo="moneda" title="Editar Moneda"><i class="material-icons left">mode_edit</i></a>

                               <a class="waves-effect waves-light load_x" modulo="moneda" id="b{$MON[LE][0]}"  title="Eliminar Moneda"><i class="material-icons left">delete</i></a>

                           </td>
                       </tr>
                       {/section}
                   </tbody>
               </table>
           </div>
       </div>
   </div>    <br></div>
   <!-- Datos de las monedas -->
</li>
<li>
    <div class="collapsible-header"><i class="material-icons">supervisor_account</i><h5>Tipo de Usuarios</h5></div>

    <div class="collapsible-body"><div class="class-block">
        <br>
        
        <div class="row">
            <div class="col s12 m12 l5">

             <div class="input-field col s12 m11">
                <a class="prefix"><i class="small material-icons">search</i></a>
                <input type="text" id="search_tipousuarios" maxlength="45" num="+27" var="nombre">
                <label for="search_tipousuarios">Buscar Tipo de Usuario</label>
            </div>

            <div id="ftipousuarios" class="col s12 m11">
                <div class="row">
                  <div class="col s1 m1">
                    <a class="prefix btn-floating blue add tooltipped" modulo="tipousuario" data-position="top" data-tooltip="Ingresar Tipo de Usuario"><i class="small material-icons">add</i></a>
                </div>

                <div class="input-field col s8 offset-s1 m11 l11">
                    <input type="text" id="vnombre_tusuario">
                    <label for="vnombre_tusuario">Ingresar Tipo Usuario</label>
                </div>



            </div>
            <br>
        </div>



    </div>

    <br>
    <div class="col s12 m12 l6 ">
        <table class="table highlight responsive-table " id="data-table-tipousuarios">
            <thead>
                <tr>
                    <th style="border: 0px;">Tipo</th>
                    <th style="border: 0px;">Acciones</th>
                </tr>
            </thead>
            <tbody class="centered" id="listatipousuarios">
                {section name=LE loop=$TUSR}
                <tr id="b_{$TUSR[LE][0]}">
                    <td style="margin:0;">
                        <input type="text" value="{$TUSR[LE][1]}"  class="fast-edit" style="border: 0px; margin: 0;">
                    </td>
                    <td style="margin:0;">
                        {if $TUSR[LE][2] eq 0}
                        <a href='#modal-tusuarios' id="c{$TUSR[LE][0]}" modulo="moneda" title="Valores en el Sistema">
                            <i class="small material-icons left">info_outline</i></a>
                    <!-- <a href='#modal-tusuarios' class="btn valorestu" id="c{$TUSR[LE][0]}" modulo="moneda" title="Valores en el Sistema">
                        <i class="fa fa-gg-circle"></i>
                    </a> -->
                    <a href="#" modulo="tipousuario" id="d{$TUSR[LE][0]}" title="Eliminar Tipo Usuario"><i class="small material-icons left">delete</i></a>
                    <!-- <a href="#" class="btn delete" modulo="tipousuario" id="d{$TUSR[LE][0]}" title="Eliminar Tipo Usuario">
                        <i class="fa fa-times"  style="color: #D9534F" readonly></i>
                    </a> -->
                </td>
                {/if}
            </tr>
            {/section}
        </tbody>
    </table>
</div></div>
</div><br></div>
<!-- Datos de las Usuarios -->
</li>
<li>
    <div class="collapsible-header"><i class="medium material-icons">credit_card</i><h5>Tipo de Pagos</h5></div>

    <div class="collapsible-body"><div class="class-block">
        <br>
        <div class="row">

        </div>
        <div class="row">
            <div class="col s12 m12 l5">
                <div class="input-field col s12 m11">
                    <a class="prefix"><i class="small material-icons">search</i></a>
                    <input type="text" id="search_tipopagos" maxlength="100" num="+26" var="nombre">
                    <label for="search_tipopagos">Buscar Tipo Pago</label>
                </div>

                <div id="ftipopagos" class="col s12 ">

                    <div class="row">

                      <div class="col s1">
                        <a class="prefix btn-floating blue add tooltipped" modulo="tipopago" data-position="top" data-tooltip="Ingresar Tipo de Pago"><i class="small material-icons">add</i></a>
                    </div>

                    <div class="input-field col s10 offset-s1 m10 l11">
                        <input type="text" id="vnombre_pago">
                        <label for="vnombre_pago">Ingresar Tipo Pago</label>
                    </div>



                </div>
                <br>
                <div class="modal modal-fixed-footer" id="modal-tipopagos">

                    <div class="modal-header">
                        Editar Tipo Pago "<span id="pname-mod"></span>"
                        <input type="hidden" id="vid" value="0">
                    </div>

                    <div class="modal-content">

                        <div class="row">
                            <div class="col s12 m5">
                                <div class="input-field">    
                                    <input type="text" id="tmp_pagos">
                                    <label id="tmp_l_pagos" for="tmp_pagos">Nombre del Pago</label>
                                </div>

                            </div>

                            <div class="input-field col s12 m7 mix">

                                <div class="row">
                                    <div class="col s6">
                                        <input class="with-gap" name="vbancos" type="radio" id="vbancos" value="1" />
                                        <label for="acr">Acredita Bancos</label>
                                    </div>
                                    <div class="col s6">
                                        <input class="with-gap" name="vbancos" type="radio" id="dat" value="2" />
                                        <label for="dat">Uso de Datáfono</label>
                                    </div>
                                </div>
                                
                                <p>
                                <input type="checkbox" name="vprincipal" id="vprincipal" />
                                <label for="vprincipal">Pago Principal</label>
                                </p>

                                <p>
                                <input type="checkbox" id="extra" />
                                <label for="extra">Tiene Extras</label>
                                </p>

                            </div>
                        </div>

                        <div class="row extra hide">
                            <div class="input-field col s12 m6">
                                <input type="text" id="vextra">
                                <label for="vextra">Nombre de la Extra</label>
                            </div>

                            <div class="input-field col s12 m6">
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



        <div class="col s12 m6">
            <table class="table highlight  responsive-table " id="data-table-tipopagos">
             <thead>
                <tr>
                    <th style="border: 0px;">Tipo</th>
                    <th style="border: 0px;">Accion</th>
                </tr>
            </thead>
            <tbody id="listatipopagos">
                {section name=LE loop=$TPAG}
                <tr id="c_{$TPAG[LE][0]}">
                    <td align="right"><input type="text"  value="{$TPAG[LE][1]}" readonly style="border: 0px;margin: 0px; padding: 0px;"></td>
                    <td >
                        <a class="waves-effect waves-light load_x" modulo="tipopago" id="e{$TPAG[LE][0]}" title="Editar Tipo Pago" href='#modal-tipopagos' ><i class="material-icons left">mode_edit</i></a>
                        {if $TPAG[LE][0] neq 0}
                        <a class="waves-effect waves-light " modulo="tipopago" id="f{$TPAG[LE][0]}"  title="Eliminar Tipo Pago"><i class="material-icons left">delete</i></a>
                        {/if}

                    </td>
                </tr>
                {/section}
            </tbody>
        </table>
    </div>
</div>
</div><br>
</div>
<!-- Datos de Tipos de Pagos  -->
</li>
<li>
    <div class="collapsible-header"><i class="material-icons">business</i><h5>Bancos</h5></div>

    <div class="collapsible-body"><div class="class-block">
        <br>
        
        <div class="row">
            <div class="col s12 m12 l5">
                <div class="input-field col s12 m11 ">
                    <a class="prefix"><i class="small material-icons">search</i></a>
                    <input type="text" id="search_bancos" maxlength="100" num="+202" var="nombre">
                    <label for="search_bancos">Buscar Banco</label>
                </div>

                <div id="fbancos" class="col s12 ">

                    <div class="row">
                        <div class="col s1">
                            <a class="prefix btn-floating blue add tooltipped" modulo="banco" varias="1" data-position="top" data-tooltip="Ingresar Banco"><i class="small material-icons">add</i></a>
                        </div>
                        <div class="input-field col s10 offset-s1 m10">
                            <input type="text" id="vnombre_banco" noClear="1">
                            <label for="vnombre_banco">Ingresar Banco</label>
                        </div>


                    </div>

                    <div class="modal modal-fixed-footer" id="modal-bancos" style="width: 65%;min-height: 550px">

                        <div class="modal-header">
                            Valores del Banco "<span id="bname-mod" type="html"></span>"
                            <input type="hidden" id="vid" value="0">
                        </div>

                        <div class="modal-content">
                        <div class="row">
                            <div class="col s12 m6">
                                
                                <div vtabla="detallebanco" detalle="1" vnum="203">
                                <h4 class="center-align">Cuentas Bancarias</h4>
                                <div class="row">
                                    <div class="input-field col s6">
                                        <input type="text" id="vdet_nom">
                                        <label for="vdet_nom">Nombre de Cuenta</label>
                                    </div> 

                                    <div class="input-field col s6">
                                        <input type="text" id="vdet_cta">
                                        <label for="vdet_cta">Número de Cuenta</label>
                                    </div> 

                                    <div class="input-field col s6">
                                        <select type="select" id="vdat_moneda">
                                            <optgroup label="Porcentual">
                                                <option value="" selected>Porcentaje</option>
                                            </optgroup>
                                            <optgroup label="Valor Fijo">
                                                {section name=LE loop=$MON}
                                                <option value="{$MON[LE][0]}" simb="{$MON[LE][4]}">{$MON[LE][1]}</option>
                                                {/section}
                                            </optgroup>
                                        </select>
                                        <label for="vdat-moneda">Tipo de Comisión</label>
                                    </div> 

                                    <div class="input-field col s6">
                                        <select type="select" id="vctacom" defecto="1" noClear="1">
                                            <option value="" disabled>Seleccione una Cuenta</option>
                                            {section name=LE loop=$CUE}
                                            <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                            {/section}
                                        </select>
                                        <label for="vctacom">Cuenta Comisión de Datáfono</label>
                                    </div>

                                    <div class="input-field col s12">
                                        <input type="number" id="vcomision_txt" class="eder" value="0" noClear="1">
                                        <label for="vcomision_txt">Comisón pot Datáfono</label>
                                    </div>

                                    <div class="input-field col s6">
                                        <select type="select" id="vdet_moneda">
                                            <option value="" disabled selected>Seleccione una Moneda</option>
                                            {section name=LE loop=$MON}
                                            <option value="{$MON[LE][0]}" simb="{$MON[LE][4]}">{$MON[LE][1]}</option>
                                            {/section}
                                        </select>
                                        <label for="vdet-moneda">Moneda de la Cuenta</label>
                                    </div> 

                                    <div class="input-field col s6">
                                        <select type="select" id="vctabnk">
                                            <option value="" disabled selected>Seleccione una Cuenta</option>
                                            {section name=LE loop=$CUE}
                                            <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                            {/section}
                                        </select>
                                        <label for="vctabnk">Cuenta Contable Asociada</label>
                                    </div>
                                </div>
                                <a class="btn-floating small der" id="add_x"><i class="material-icons blue">add</i></a>
                            </div>

                            </div>

                            <div class="col s6">
                                <ul class="collection" id="fdetallebancos" tp="1">

                                </ul>
                            </div>
                        </div>
                            

                        </div>

                        <div class="modal-footer">
                            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
                            <button type="button" class="btn btn-primary edit" modulo="banco" varias="1">Guardar</button>
                        </div>

                    </div>

                </div>


                <br>
            </div>


            <div class="col s12 m12 l6">
                <table class="table responsive-table" id="data-table-bancos">
                    <thead>
                        <tr>
                            <th style="border: 0px;">Nombre</th>
                            <th style="border: 0px;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listabancos">
                        {section name=LE loop=$BNK}
                        <tr id="e_{$BNK[LE][0]}">
                            <td><input type="text" value="{$BNK[LE][1]}" class="fast-edit" style="border: 0px;margin: 0px; padding: 0px;"></td>
                            <td align="right">

                             <a class="waves-effect load" modulo="banco" varias="1" id="i{$BNK[LE][0]}" href='#modal-bancos' title="Valores del Banco" ><i class="material-icons left">mode_edit</i></a>

                             <a class="waves-effect" modulo="banco" id="j{$BNK[LE][0]}"  title="Eliminar Banco"><i class="material-icons left">delete</i></a>

                         </td>
                     </tr>
                     {/section}
                 </tbody>
             </table>
         </div>
     </div>
 </div><br></div>
 <!-- Datos de los Bancos  -->
</li>
<li>
    <div class="collapsible-header"><i class="material-icons">settings</i><h5>Categorías</h5></div>

    <div class="collapsible-body"><div class="class-block">
        <br>
        
        <div class="row">

            <div class="col s12 m12 l5">
                <div class="row">
                    <div class="input-field col s11 ">
                        <a class="prefix"><i class="small material-icons">search</i></a>
                        <input type="text" id="search_nivelesclientes" maxlength="100" num="+69" var="nombre">
                        <label for="search_nivelesclientes">Buscar Categoría</label>
                    </div>

                    <div id="fnivelesclientes" class="col s12 ">

                        <div class="row">

                            <div class="col s1">
                                <a class="prefix btn-floating blue add tooltipped" modulo="nivelescliente" data-position="top" data-tooltip="Ingresar Categoría"><i class="small material-icons">add</i></a>
                            </div>

                            <div class="input-field col s10">
                                <input type="text" id="vnombre_nivel">
                                <label for="vnombre_nivel">Ingresar Categoría</label>
                            </div>
                            

                        </div>

                    </div>

                </div>




            </div>



            <div class="col s12 m11 l6">
                <table class="table responsive-table" id="data-table-nivelesclientes">
                    <thead>
                        <tr>
                            <th style="border: 0;">Nombre</th>
                            <th style="border: 0;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listanivelesclientes">
                        {section name=LE loop=$CATC}
                        <tr id="d_{$CATC[LE][0]}">
                            <td><input type="text" id="vnombre" class="fast-edit fast-edit-r" value="{$CATC[LE][1]}" style="border: 0px;margin: 0px; padding: 0px;" maxlength="20"></td>
                            <td align="right">
                                <a class="waves-effect waves-light load_x" id="g{$CATC[LE][0]}" href='#modal-valorescat' title="Valores en el Sistema"><i class="material-icons left">mode_edit</i></a>

                                <a class="waves-effect waves-light load_x" modulo="nivelescliente" id="h{$CATC[LE][0]}" title="Eliminar Nivel de Cliente"><i class="material-icons left">delete</i></a>


                            </td>
                        </tr>
                        {/section}
                    </tbody>
                </table>
            </div>
        </div>

    </div></div>
    <!-- Datos de las Categorías -->
</li>
<li>
    <div class="collapsible-header"><i class="material-icons">schedule</i><h5>Período Fiscal</h5></div>

    <div class="collapsible-body"><div class="card-block">
        <div class="row">
            <div class="col s12 m4">
                <div class="input-group">
                    <div class="input-group-addon"><b>Fecha Inicio</b></div>




                    <input type="date" class="datepicker" id="vfechainicio" value="">
                </div>
            </div>
            <div class="col s12 m4">
                <div class="input-group">
                    <div class="input-group-addon"><b>Fecha Cierre</b></div>
                    <input type="date" class="datepicker" id="vfechafinal" value="">
                </div>
            </div>
            <div class="col s12 m1">
             <br>
             <button type="button" class="btn btn-primary " id="sfechafiscal" style="margin-top: 5%;">Guardar</button>
         </div>
     </div><br>
     <div class="row">

     </div>
 </div>

</div></div>
<!-- Datos del Período Fiscal -->
</li>
</ul>





<div class="modal modal-fixed-footer " id="modal-monedas">

    <div class="modal-content">
        <div id="fmonedas">
            <input type="hidden" name="vid" value="0">
            <div class="row">

                <div class="input-field col s12 m6">
                    <label for="vnombremon" class="truncate">Nombre de Moneda</label>
                    <input type="text" id="vnombremon" maxlength="45">
                </div>

                <div class="input-field col s12 m6">
                    <label for="vsimbolo" class="truncate">Símbolo de Moneda</label>
                    <input type="text" id="vsimbolo" maxlength="1">
                </div>

            </div>

            <div class="class">

                <div class="input-field col s12">
                    <label for="vvalor" class="truncate">Valor de Moneda</label>
                    <input type="number" id="vvalor" value="0.00" class="eder"> 
                </div>

            </div>

            <label class="row">
                <div class="input-field col s6">
                    <input type="checkbox" name="vprincipal" id="vprincipal" value="0" stay="0" />
                    <label for="vprincipal">Moneda Principal</label>
                </div>

                <div class="input-field col s6">
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
<br>
<div class="modal-footer">
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
    <button type="button" class="btn btn-primary add" modulo="moneda">Agregar</button>
</div>

</div><!-- /.modal -->


<div class="modal" id="modal-wsdl">

    <div class="modal-content">

        <ul class="collection" id="showWSDL">
            {section name=LE loop=$WSDL}
            <li class="collection-item dismissable" style="cursor: pointer;" id="ws_{$WSDL[LE][0]}"><div><span class="wsdls" id="wsid_{$WSDL[LE][0]}">{$WSDL[LE][1]}</span><a class="secondary-content delws" id="delws{$WSDL[LE][0]}"><i class="material-icons">delete</i></a></div></li>
            {/section}

        </ul>
        <a href='#modal-wsdl-bt' id="mantWsdl-bt" class="btn-floating right btn-medium waves-effect waves-light modal-trigger" data-position="top" data-tooltip="Ingresar Moneda"><i class="material-icons">add</i></a>


    </div>
    <br>

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
        <h3 class="center-align">Clientes</h3>
        <input type="hidden" id="viddetalle">
        <input type="hidden" id="vidnivel">
        <div class="row">
        <div class="input-field col s12 m6 l4">
                <a class="prefix">%</a>
                <input type="text" id="vclie_descuento_max" class="eder set0">
                <label for="vclie_descuento_max">Descuento Max.</label>
            </div>
            <div class="input-field col s12 m6 l4">
                <a class="prefix">%</a>
                <input type="text" id="vclie_descuento" class="eder set0">
                <label for="vclie_descuento">Descuento Base</label>
            </div>
            <div class="input-field col s12 m6 l4">
                <input type="text" id="vclie_plazo" class="eder set0">
                <label for="vclie_plazo">Plazo en Días</label>
            </div>
            <div class="input-field col s12 m6 l4">
                <input type="text" id="vclie_credito" class="eder set0">
                <label for="vclie_credito">Crédito</label>
            </div>
        
        <div class="input-field col s12 m6 l4">
                <select id="vdcontado" type="select">
                    <option value="" disabled selected defecto="">Seleccione una Cuenta</option>
                    {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vdcontado">Contado Debe</label>
            </div>
            <div class="input-field col s12 m6 l4">
                <select id="vhcontado" type="select" defecto="">
                    <option value="" disabled selected>Seleccione una Cuenta</option>
                    {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vhcontado">Contado Haber</label>
            </div>
            <div class="input-field col s12 m6 l6">
                <select id="vdcredito" type="select" defecto="">
                    <option value="" disabled selected>Seleccione una Cuenta</option>
                    {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vdcredito">Crédito Debe</label>
            </div>
            <div class="input-field col s12 m6 l6">
                <select id="vhcredito" type="select" defecto="">
                    <option value="" disabled selected>Seleccione una Cuenta</option>
                    {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vhcredito">Crédito Haber</label>
            </div>
        </div>

        <h3 class="center-align">Productos</h3>

        <div class="row">

            <div class="input-field col s12 m6 l4">
                <a class="prefix">%</a>
                <input type="text" id="vprod_descuento_max" class="eder set0">
                <label for="vprod_descuento_max">Descuento Max.</label>
            </div>

            <div class="input-field col s12 m6 l4">
                <input type="text" id="vprod_descuento" class="eder set0">
                <label for="vprod_descuento">Descuento Base</label>
            </div>

            <div class="input-field col s12 m6 l4">
                <select id="vprod_cuenta" type="select" defecto="">
                    <option value="" disabled selected>Seleccione una Cuenta</option>
                    {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vprod_cuenta">Cuenta Inventario</label>
            </div>
            <br>
        </div>
        <br>
    </div>

    <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
        <button type="button" class="btn btn-primary edit" modulo="detallenivelescliente">Guardar</button>
    </div>

</div>