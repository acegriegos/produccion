<div class="row">
    <div class="col s4">
        <div class="input-field">
            
            <select id="seachcliente" maxlength="64">
                <option value="" disabled selected>Seleccione una Tipo de Ruta</option>
                <option value="1">Rutas para Cargar</option>
                <option value="3">Rutas para Descargar</option>
            </select>

            <label for="seachcliente" style="color: black"> <b>Tipo de Ruta</b></label>
        </div>
    </div>
    <div class="col s4 hide">
        
    </div>
     <div class="col s4 f1 hide">
         <div class="input-field">
            <select id="seachruteros" maxlength="64">
            </select>

            <label for="seachruteros" style="color: black"> <b>Rutas</b></label>
        </div>
    </div>

    <div class="col s4 f2 hide">
          <table  class="table centered highlight bordered responsive-table" id="data-table-rutashow">
            <thead>
                <tr class="white-text tab1">
                    <th class="sinborde">Pedidos</th>
                    <th class="sinborde">Cobros</th>
                    <th class="sinborde">Notas</th>
                </tr>
            </thead>
            <tbody id="listarutashow">
                <tr>
                    <td id="countpedidos">0</td>
                    <td id="countcobros">0</td>
                    <td id="countnotas">0</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="row" style="border-bottom: 1px solid #e2e2e2;margin-bottom: 0px;">
    <div class="col s5" align="center">
        
        <div class="row ld" style="border-bottom: 0px;">
            
            <div class="col s6 input-field" align="center">
                <select id="vidbodega" maxlength="64" style="border-bottom: 0px;">
                    <option value="" disabled selected>Seleccione una Bodega</option>
                    {section name=LE loop=$BOD}
                        <option value="{$BOD[LE][0]}">{$BOD[LE][1]}</option>
                    {/section}
                </select>
                <label for="vidbodega" style="color: black"> <b>Bodega</b></label>
            </div>

            <div class="col s6 input-field" align="center">
                <select id="vidinventario" maxlength="64" style="border-bottom: 0px;">
                    <option value="" disabled selected>Seleccione un Inventario</option>
                </select>
                <label for="vidinventario" style="color: black"> <b>Inventario</b></label>
            </div>
        </div>
    </div>

     <div class="col s2" align="center">
        <i class="fa fa-exchange"></i>
    </div>

    <div class="col s5" align="center">
        <!-- <span class="sd"><b>Productos en ruta</b></span> -->
         <div class="row ld" style="border-bottom: 0px;">
            <!-- <div class="col s12 input-field" align="center">
                <span style="float: left;">Inventario: <span id="invname" idinv="">NOMBRE DE INVENTARIO</span></span> -->
               <!--  <div class="col s4 m4 l4">
                    <select id="invname" type="select"></select>
                    <label for="invname">Inventario</label>
                </div> -->

                <!-- <a class="mdi mdi-24px mdi-playlist-plus cargar load_inv pbtn" title="Cargar Inventario" style="padding-right: 2%"></a>

                <a class="mdi mdi-24px mdi-playlist-minus descargar" title="Descargar Inventario" style="padding-right: 2%"></a> -->

                <!-- <a href="#" class="mdi mdi-24px mdi-content-duplicate load_ped" title="Cargar Pedidos" style="padding-right: 2%"></a> -->

                <!-- <a href="#" class="mdi mdi-24px mdi-content-save" title="Guardar Inventario" style="padding-right: 2%"></a> -->

                <!-- <a class="mdi mdi-24px mdi-printer " title="Imprimir Inventario de Ruta" style="padding-right: 2%"></a>

            </div> -->
        </div>
    </div>
</div>
<div class="row ld" style="margin: 0px;">

    <div class="col s3 input-field" align="center">
        
        <input type="text" id="codp" class="autocomplete" value="" autocomplete="off">
        <label for="codp" style="color: black;"> <b>Buscar Código</b></label>
    </div>
    <div class="col s3 input-field" align="center">
        <input type="text" id="descp" class="autocomplete" value="" autocomplete="off">
        <label for="prod" style="color: black;"> <b>Buscar Producto</b></label>
    </div>
    
    <div class="col s3 input-field" align="center">
        <input type="text" id="cantp" value="1">
        <label for="cantp" style="color: black;"> <b>Cantidad</b></label>
    </div>
    <div class="col s3 input-field" align="center">
        <a class="btn" id="assgninvtoruta">Agregar</a>
    </div>
</div>

<div class="row">
    <div class="col s12 m6 l6">
        <label style="font-size: 0.7em" class="ld">*(P): Producto proveniente de un pedido</label>
        <div class="collection" id="coll1">
            <!-- <a class="collection-item">Alan<span class="badge mdi mdi-close mdi-24px cdel pbtn"></span><span class="new badge">4</span></a> -->
        </div>
    </div>
    <div class="col s12 m6 l6 ff hide">
        <!-- <div align="center"> -->
            <!--  <div class="col s4 m4 l4">
                <select id="invname" type="select"></select>
                <label for="invname">Inventario</label>
            </div> -->

            <a class="mdi mdi-24px mdi-playlist-plus cargar load_inv pbtn" title="Cargar Inventario" style="padding-right: 2%"></a>

            <a class="mdi mdi-24px mdi-playlist-minus descargar" title="Descargar Inventario" style="padding-right: 2%"></a>

            <a href="#" class="mdi mdi-24px mdi-content-duplicate load_ped chrgpedido" title="Cargar Pedidos" style="padding-right: 2%"></a>

            <!-- <a href="#" class="mdi mdi-24px mdi-content-save" title="Guardar Inventario" style="padding-right: 2%"></a> -->

            <a class="mdi mdi-24px mdi-printer print_inv pbtn" title="Imprimir Inventario de Ruta" style="padding-right: 2%"></a>

            <span>Inventario: <span id="invname" idinv="">NOMBRE DE INVENTARIO</span></span>
        <!-- </div> -->
    </div>
</div>

<div class="modal modal-fixed-footer" id="modal-eliminar">
    <div class="modal-header head3 center">
        <span style="font-size: 22px">Devolver producto a inventario</span>
    </div>
    <div class="modal-content row">
        <div class="input-field col s12 m4 l4">
            <input type="text" id="nameprod" readonly>
            <label for="nameprod">Producto</label>
        </div>
        <div class="input-field col s12 m4 l4">
            <input type="number" id="cantprod">
            <label for="cantprod">Cantidad</label>
        </div>
        <div class="input-field col s12 m4 l4">
            <select type="select" id="invprod"></select>
            <label for="invprod">Inventario</label>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="waves-effect waves-green btn-flat"id="devolverprod">Guardar</button>
        <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
    </div>
</div>

<div class="modal modal-fixed-footer" id="modal-editar">
    <div class="modal-header head3 center">
        <span style="font-size: 22px">Editar</span>
    </div>
    <div class="modal-content row">
        <div class="input-field col s12 m6 l6">
            <input type="text" id="nameprodz" readonly>
            <label for="nameprod">Producto</label>
        </div>
        <div class="input-field col s12 m6 l6">
            <input type="number" id="cantprodz">
            <label for="cantprod">Cantidad</label>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="waves-effect waves-green btn-flat"id="changecant">Guardar</button>
        <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
    </div>
</div>