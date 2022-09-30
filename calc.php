<!DOCTYPE html>
 <html>
 <head>
    <meta charset="utf-8">
    <title>Calculadora</title>

    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link rel="stylesheet" type="text/css" href="./assets/css/materialize.min.css?v=10.4.0.3">
    <link rel="stylesheet" type="text/css" href="./assets/libs/DataTables/media/css/jquery.dataTables.css?v=10.4.0.3">
    <link rel="stylesheet" type="text/css" href="./assets/libs/DataTables/media/css/dataTables.responsive.css?v=10.4.0.3">
    <link rel="stylesheet" type="text/css" href="./assets/css/modulos/style-menu.css?v=10.4.0.3">
    <link rel="stylesheet" type="text/css" href="./assets/css/materialdesignicons.min.css?v=10.4.0.3">

    <style type="text/css">
        #calc label, #calc span{
            font-size: 40px !important;
        }

        td{
            padding: 0px;
        }

    </style>

 </head>
 <body>

    <div class="row">
        <div class="col s3 center">
            
            <div class="row">
                    <span class="abo"><b id="ulogged"></b></span> <br>
                <a data-activates="pagomultiples" class="btn abo hide pagomu col s6" id="abonar">Abonar</a>
                <a class="btn abo hide col s6 red" id="anular">Anular Abono</a>
            </div>
            

            <span class="center" style="border-bottom: 1px dashed black;font-weight: bold;">01</span>
        <table>
            <tr>
                <td colspan="3"><b>EFECTIVO</b></td>
            </tr>
            <tr style="border-bottom: 1px dashed black;">
                <td style="text-align: center;"><b>TOTAL</b></td>
                <td style="text-align: center;"><b>PAGA CON</b></td>
                <td style="text-align: center;"><b>VUELTO</b></td>
            </tr>
            <tbody id="listavueltos_spec"></tbody>
            <tfoot>

                <tr>
                    <td><b>TOTAL(CRC)</b></td>
                    <td colspan="2" style="text-align: right;" id="stot">0.00</td>
                </tr>
            </tfoot>
        </table>
        <br>
        <table>
            <tr>
                <td><b>TARJETA</b></td>
                <td style="text-align: center;"><b>TOTAL</b></td>
            </tr>
            <tbody id="listavueltos_spec_tar"></tbody>
            <tfoot>

                <tr>
                    <td><b>TOTAL 01(CRC)</b></td>
                    <td style="text-align: right;" id="stot_tar">0.00</td>
                </tr>
            </tfoot>
        </table>

        </div>

    <div class="col s6 center" id="calc" style="border: 1px solid black;">
        <h3>Calculadora de Vueltos</h3>
        <hr>

        <input type="radio" name="tp" value="1" id="tp1" checked>
            <label for="tp1">Factura</label>

            <input type="radio" name="tp" value="7" id="tp7">
            <label for="tp7">Tiquete</label>

            <input type="radio" name="tp" value="8" id="tp8">
            <label for="tp8">01</label>

          
          <div class="center">

            <input type="text" id="fact" maxlength="10"  style="font-size: 40px; text-align: center;">
            
            <span id="vuelto_tot" style="font-weight: bold;font-size: 18px">0.00</span> <span>CRC</span>

            <div id="err_dia" class="red-text hide">
            	<small>Documento pertenece al día </small>
            	<small id="err_dia_dato">08-01-2022</small>
            </div>

          <br>
          </div>

        <div class="modal-content row" style="padding: 0px;">   
            <div class="col s6 center" style="border-right: 1px solid black;">
                <span>Paga con:</span> <br>
              <input type="text" id="vuelto_pcon" value="0.00" autocomplete="off" style="font-size: 44px; text-align: center;">
              <br><br><br>

              <span>Vuelto:</span><br>
              <span style="font-size: 44px;" id="vuelto_">0.00</span>
            </div>
            

            <div class="col s6 center">
                <span>Tarjeta:</span> <br>
                <input type="text" id="_tar" value="0.00" autocomplete="off" style="font-size: 44px; text-align: center;">

                <span>Bancos:</span> <br>
                <input type="text" id="_dep" value="0.00" autocomplete="off" style="font-size: 44px; text-align: center;">

            </div>

        </div>

        <a class="btn green" style="width: 100%" id="proc_cierre">Procesar</a>
        <br>
        <a class="btn red" style="width: 100%" id="do_cierre">Realizar Cierre</a>
    </div>

    <div class="col s3 center">

        <input type="date" id="fch">
        <span class="center" style="border-bottom: 1px dashed black;font-weight: bold;">FACTURA ELECTRONICA</span>
        <table>
            <tr>
                <td colspan="3"><b>EFECTIVO</b></td>
            </tr>
            <tr style="border-bottom: 1px dashed black;">
                <td style="text-align: center;"><b>TOTAL</b></td>
                <td style="text-align: center;"><b>PAGA CON</b></td>
                <td style="text-align: center;"><b>VUELTO</b></td>
            </tr>
            <tbody id="listavueltos"></tbody>
            <tfoot>
                <tr>
                    <td><b>TOTAL(CRC)</b></td>
                    <td colspan="2" style="text-align: right;" id="ttot">0.00</td>
                </tr>
            </tfoot>
        </table>
        <br>
        <table>
            <tr>
                <td><b>TARJETA</b></td>
                <td style="text-align: center;"><b>TOTAL</b></td>
            </tr>
            <tbody id="listavueltos_tar"></tbody>
            <tfoot>
                <tr>
                    <td><b>TOTAL(CRC)</b></td>
                    <td style="text-align: right;" id="ttot_tar">0.00</td>
                </tr>
            </tfoot>
        </table>
        <br>
        
    </div>

    </div>

    <ul id="pagomultiples" class="side-nav"  style="width: 60%;overflow-y: scroll;">
        <div class="card-header center pequeño head1" style="margin: 0 !important" >
            <p class="flow-text">Pago Multiple</p>
        </div>
        <div class="row">
            <div class="input-field col s12 m7">
                <span id="buscarcli" class="prefix medium mdi-magnify mdi mdi-24px blue-text "></span>   
                <input  type="text" id="ncli" maxlength="100" num="v29" var="nombre" autocomplete="off">
                <input type="hidden" id="hclie" value="0">
                <label for="ncli">Buscar Cliente</label>
            </div>
            <div class="card-block pequeño">
                <div class="row  pequeño">
                    <div class="col s12 pequeño">
                        <table id="data-table-facturas" class="pequeño  table centered highlight bordered responsive-table z-depth-3 pbtns" style="max-height: 550px; overflow-y: auto">
                            <thead>
                                <tr>
                                    <th class="white-text tab1" style=" padding: 10px; color:black; border-radius: 0px!important;"></th>
                                    <th class="white-text tab1 sorting" style=" padding: 10px; color:black; border-radius: 0px!important;">No Factura</th>
                                    <th class="white-text tab1 sorting" style=" padding: 10px; color:black; border-radius: 0px!important; ">Fecha</th>
                                    <th class="white-text tab1 sorting" style=" padding: 10px; color:black; border-radius: 0px!important;">Saldo</th>
                                    <th class="white-text tab1 sorting" style=" padding: 10px; color:black; border-radius: 0px!important;">Abono</th>
                                </tr>
                            </thead>
                            <tbody id="listaCuentasPm" style="max-height: 250px; overflow-y: auto;"></tbody>
                        </table>
                    </div>
                    <div class="col s12 m12">
                        <div class="input-field col s6">
                            <input class="eder" min="0" id="monto" type="number" name="monto" autocomplete="off" style="margin: 0px">
                            <label for="monto">Digitar Monto</label>
                        </div>
                        <div class="input-field col s6">
                            <input class="" id="comentario" type="text" name="comentario" style="margin: 0px">
                            <label for="comentario">Comentario</label>
                        </div>
                        <div class="input-field col s6 m6 hide">
                             <input type="date" class="datepickere" id="fecha" value="" style="margin: 0px" />
                        </div>
                        <div class="input-field col s6 m6 hide">
                            <input  id="referencia" type="text" style="margin: 0px">
                            <label for="referencia">Referencia</label>
                        </div>
                        <div class="input-field col s6">
                            <select type="select" id="idtipopagopagar" style="margin: 0px">
                            </select>
                        </div>
                        <div class="input-field col s6 m6">
                            <select id="monedas" style="margin: 0px">
                            </select>
                            <label for="monedas">Moneda</label>
                        </div>
                        <div class="col s6 hide">
                            <select id="vcta">
                                <option disabled selected value="0">Cuenta Contable</option>
                                {section name=LE loop=$CUE}
                                <option value="{$CUE[LE][0]}">{$CUE[LE][1]}</option>
                                {/section}
                            </select>
                        </div>
                        <div class="col s6">
                            Saldo Actual: <span class="moneda"></span> <span id="saldo">0.00</span>
                            <button id="btnPagar" type="button" class="der btn btn-flat btn1 white-text waves-effect">Pagar</button>
                            <p>
                                <input type="checkbox" id="p_vm" title="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'"/>
                                <label for="p_vm">Punto Venta</label>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </ul>
    
    <script src="./assets/js/jquery.js?v=10.4.0.3"></script>
    <script src="./assets/js/materialize.min.js?v=10.4.0.3"></script>
    <script src="./assets/js/asgard.js?v=10.4.0.3"></script>
    <script src="./assets/js/main.js?v=10.4.0.3"></script>
  <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js?v=10.4.0.3"></script>
  <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js?v=10.4.0.3"></script>
    <script src="./assets/js/calc.js?v=10.4.0.3"></script>
 </body>
 </html>