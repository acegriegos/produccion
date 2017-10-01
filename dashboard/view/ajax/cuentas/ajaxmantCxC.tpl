      <link rel="stylesheet" href="../assets/css/modulos/style-cuentas.css?v=0.10">

      <nav class="nav-extended  white-text z-depth-5" style="background-color:#0B3861">
          <div class="nav-wrapper">
            <h4 align="center" >Cuentas por Cobrar</h4>

        </div>
    </nav>
    <div id="mantCxC" class="pequeño" >



        <div class="card z-depth-5 ">

            <div class="row padd">
                <br><br>

                <div class="input-field col s12 m7">

                    <a class="prefix dropdown-button tooltipped "  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="small mdi mdi-magnify mdi-24px"></i></a>
                    <ul id='filtr_1' class='dropdown-content'>
                        <li><a href="#!" fltr="1">Nombre</a></li>
                        <li><a href="#!" fltr="2">Cédula</a></li>
                        <li><a href="#!" fltr="3">Teléfono</a></li>
                    </ul>
                    <input type="text" id="search_clientes" maxlength="100" num="v29" var="nombre">
                    <label class="truncate" for="search_clientes">Buscar Cliente por Nombre o Cédula</label>

                </div>
                <div class="col s12 m5">
                    <div class="col s12 m4">
                        <input name="ctas" class="with-gap" type="radio" id="all" checked value="1" />
                        <label for="all">Todo</label>
                    </div>
                    <div class="col s12 m4">
                        <input name="ctas" class="with-gap" type="radio" id="vencidas" value="2" />
                        <label for="vencidas">Vencidas</label>
                    </div>
                    <div class="col s12 m4">
                        <input name="ctas" class="with-gap" type="radio" id="porvencer" value="3" />
                        <label for="porvencer">Por Vencer</label>
                    </div>
                </div>


            </div>
            <br>

            <div class="card-block pequeño">
                <div class="row  pequeño">
                    <div class="col s12">      
                              <a data-activates="pagomultiples" class="btn-flat waves-light blue white-text pagomu">Pago Multiple</a>
                              <br>
</div>
                    <div class="col s12 pequeño">
                        <br>
                        <table id="data-table-cuentas" class="pequeño  table centered highlight bordered responsive-table z-depth-5 pbtns">
                            <thead>
                                <tr>
                                    <th class="white-text blue" style=" padding: 10px; color:black; border-radius: 0px!important;">Factura</th>
                                    <th class="white-text blue" style=" padding: 10px; color:black; border-radius: 0px!important; ">Nombre</th>
                                    <th class="white-text blue" style=" padding: 10px; color:black; border-radius: 0px!important;">Cédula</th>
                                    <th class="white-text blue" style=" padding: 10px; color:black; border-radius: 0px!important;">Fecha</th>
                                    <th class="white-text blue" style=" padding: 10px; color:black; border-radius: 0px!important;">Saldo</th>
                                    <th class="white-text blue" style=" padding: 10px; color:black; border-radius: 0px!important;">Plazo</th>
                                    <th class="white-text blue " style=" padding: 10px; color:black; border-radius: 0px!important;">Días</th>
                                    <th class="white-text blue" style=" padding: 10px; color:black; border-radius: 0px!important;">Sucursal</th>
 

                                </tr>
                            </thead>
                            <tbody id="listaCuentasx">
                        </tbody>
                    </table>
                    <br>

                </div>
            </div>
        </div>
        

    </div>
    <ul id="acciones" class="side-nav side-nav-cuentas"  style="width: 60%">


        <div class="card-header center white-text pequeño" style="background-color:#0B3861; margin: 0 !important" >
            <p class="flow-text" style="font-size: 1.9em; margin: 0 !important">Detalle de la Cuenta</p>
        </div>
        <div class="row pequeño">
            <div class="col s12 m12 pequeño">
              <div class="card blue z-depth-5 pequeño">
                <div class="card-content white-text center-align" style="padding-top: 0.5% !important; padding-bottom: 0 !important">



                    <div class="col s12 m8 l8 right-align " style="padding-right: 10% !important; "><span class="card-title "><b>Factura: <span id="ifac"> </span></b></span> 
                    </div>
                    
               </div>
               <br>
               <div class="card-content white-text  " style="padding: 0.1% !important">

                  <div class="row  pequeño">
                   <div class="col s12 m8">
                      <br>
                      <div class="col s12 m6">
                          <p><b>Nombre:</b> <span id="inombr"> </span></p>
                      </div>
                      <div class="col s12 m6">
                        <p><b>Fecha: </b><span id="ifecha"> </span></p>
                    </div>
                    <div class="col s12 m6">
                        <p><b>Saldo: </b><span id="isaldo"> </span></p>
                    </div>
                    <div class="col s12 m6">
                        <p><b>Plazo: </b><span id="iplazo"> </span></p>
                    </div>
                    <div class="col s12 m6">
                        <p><b>Dias del credito :</b> <span id="idias"> </span></p>
                    </div>


                    </div>
                    <div class="col s12 m12 l4  pequeño"  >
                <div class="row " style=" padding-top: 10%;">
                      <div class="col s12">
                        <button href="#!" class="waves-effect waves-light btn rigth z-depth-5 "  id="btn-div" style="background-color:#0B3861;"><i class="mdi mdi-24px mdi-credit-card left"></i>Realizar Abono</button>
                      </div>
                    </div>
                   



                </div>
                </div>


            </div>

            <div id="festadoscuentas" class="divabono " visible="0">
                <input type="hidden" id="vid" value="0">
                <input type="hidden" id="vidtipo" value="3">
                <input type="hidden" id="videstado" value="1">
                <input type="hidden" id="vidfactura" value="">
                <input type="hidden" id="vdebe" value="0">
                <input type="hidden" id="vhaber" value="0">
                <input type="hidden" id="vconsecutivo" value="0">
                <input type="hidden" id="vcomentario" value="">
                <div class="row">
                    <div class="col s12 ">
                        <div class="card" style="background-color:#0B3861">
                            <div class="card-content white-text ">
                                <div class="center-align"><span class="card-title  ">Abonos</span>
                                </div>
                                <div class="row">
                                    <div class="col s12 ">
                                        <p>Saldo Actual: <span id="isaldovista"> </span></p>
                                        <br>
                                    </div>


                                    <div class="input-field col s12 m6">
                                        <i class="mdi-credit-card mdi-24px mdi prefix"></i>
                                        <input id="vvalor" type="text"  class="validate eder" value="0.00">
                                        <label for="vvalor" style="color: white !important">Monto</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <select type="select" id="vidtipopago">
                                            <option value="" disabled selected style="font-size: 1.2em !important">Tipo de Pago</option>
                                            {section name=LE loop=$TIPOPAGO}
                                            <option value="{$TIPOPAGO[LE][0]}">{$TIPOPAGO[LE][1]}</option>
                                            {/section}
                                        </select>
                                    </div>
                                    <div class="row">
                                        <div class="col s12 m6">
                                          <p>
                                            <input type="checkbox" id="p_v" title="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'"/>
                                            <label for="p_v" style="color: white !important">Punto Venta</label>
                                        </p>
                                    </div> 
                                    </div>
                                    <div class="row">
                                    <div class="col s12 m8 offset-m4 ">
                                        <button href="#!" class="waves-effect btn waves-light  z-depth-5 add" tipo="1" modulo="estadoscuenta" >Realizar Pago</button>
                                        <button href="#!" class="waves-effec btn waves-light  z-depth-5" id="btn-divsalir">Salir</button>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  

        </div> <!-- end divabono -->

    </div>
</div>


<div class="card-block pequeño" >
    <div class="row pequeño">
        <div class="col s12 pequeño">

            <table id="data-table-cuentas-detalle" class="dt-responsive nowrap pequeño table centered highlight bordered  z-depth-5 ">
                <thead>
                    <tr>
                        <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Movimientos</th>
                        <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Fecha</th>
                        <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Monto</th>
                        <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Saldo</th>
                        <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Usuario</th>


                    </tr>
                </thead>
                <tbody id="listaCuentasxCDetalle">

                </tbody>
            </table>
            <br>
<br>
        </div>
           <div class="col s4 offset-s8  l2 offset-l10">
   <button href="#!" class="waves-effec btn waves-light  z-depth-5 " id="btn-navsalir">Salir</button></div>

   <br>
    </div>
    <br>

</div>


</ul>


<ul id="pagomultiples" class="side-nav"  style="width: 60%">
        <div class="card-header center white-text pequeño" style="background-color:#0B3861; margin: 0 !important" >
            <p class="flow-text" style="font-size: 1.9em; margin: 0 !important">Detalle de la Cuenta</p>
            <p class="flow-text">Pago Multiple</p>
            <br>
            </div>
            <div class="row">
                <div class="input-field col s12 m7">
                    <span id="buscarcli" class="prefix medium mdi-magnify mdi mdi-24px blue-text "></span>   
                    <input  type="text" id="ncli" maxlength="100" num="v29" var="nombre">
                    <label for="ncli">Buscar Cliente</label>
            </div>
            <div class="card-block pequeño">
                <div class="row  pequeño">
                    <div class="col s12 pequeño">
                        <table id="data-table-facturas" class="pequeño  table centered highlight bordered responsive-table z-depth-5 pbtns">
                            <thead>
                                <tr>
                                    <th class="white-text blue" style=" padding: 10px; color:black; border-radius: 0px!important;"></th>
                                    <th class="white-text blue sorting" style=" padding: 10px; color:black; border-radius: 0px!important;">No Factura</th>
                                    <th class="white-text blue sorting" style=" padding: 10px; color:black; border-radius: 0px!important; ">Fecha</th>
                                    <th class="white-text blue sorting" style=" padding: 10px; color:black; border-radius: 0px!important;">Saldo</th>
                                </tr>
                            </thead>
                            <tbody id="listaCuentasPm"> 

                        </tbody>

              
                    </table>
                    
                <div class="col s12 m12" style="margin-top:20px;">
                    <div class="input-field col s6 m6">
                        <input class="eder"  min="0" id="monto" type="number" name="monto">
                        <label for="monto">Digitar Monto</label>
                    </div>
                    <div class="input-field col s6 m6">
                        <button id="btnPagar" type="button" class="btn btn-flat blue white-text waves-effect">Pagar</button>
                    </div>
                </div>
</ul>
</div> <!-- mantCxC -->