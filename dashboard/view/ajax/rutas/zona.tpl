<div class="row">
    <div class="col s4">
        <div class="input-field">
            
            <select id="seachcliente" maxlength="64">
                <option value="" disabled selected>Seleccione una Tipo de Ruta</option>
                <option value="0">Rutas para Cargar</option>
                <option value="1">Rutas para Descargar</option>
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

            <label for="seachruteros" style="color: black"> <b>Ruteros</b></label>
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
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="row" style="border-bottom: 1px solid #e2e2e2;margin-bottom: 0px;">
    <div class="col s5" align="center">
        <span class="sd"><b>INVENTARIOS</b></span>
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
        <span class="sd"><b>INVENTARIO DE LA RUTA</b></span>
         <div class="row ld" style="border-bottom: 0px;">
            
            <div class="col s12 input-field" align="center">
                <span id="invname" nv="" style="float: left;">NOMBRE DE INVENTARIO</span>

                <a href="#" class="mdi mdi-24px mdi-playlist-plus cargar load_inv" title="Cargar Inventario" style="padding-right: 2%"></a>

                <a href="#" class="mdi mdi-24px mdi-playlist-minus descargar" title="Descargar Inventario" style="padding-right: 2%"></a>

                <a href="#" class="mdi mdi-24px mdi-content-duplicate load_ped" title="Cargar Pedidos" style="padding-right: 2%"></a>

                <a href="#" class="mdi mdi-24px mdi-content-save" title="Guardar Inventario" style="padding-right: 2%"></a>

                <a href="#" class="mdi mdi-24px mdi-printer " title="Imprimir Inventario de Ruta" style="padding-right: 2%"></a>

            </div>

            

        </div>
    </div>
</div>

<div class="row ld" style="margin: 0px;">
    <div class="col s6 input-field" align="center">
            <input type="text" id="descp" class="fd autocomplete prod" value="" placeholder="Buscar Producto">
            <!-- <label for="seachpinv" style="color: black;"> <b>Buscar Producto</b></label> -->
        </div>
  <!--   <div class="col s6 input-field" align="center">
        <i class="fa fa-search prefix"></i>
        <input type="text" id="seachpinvrut" style="margin-bottom: 0px" class="darkholder" placeholder="Buscar Producto">
    </div> -->
</div>

<div class="row collection" style="margin: 0px;">

    <div class="col s6" style="overflow-y: scroll;max-height: 100vh;" id="coll0">
    </div>
    <div class="col s6 =" style="border-left: 1px solid #e2e2e2; overflow-y: scroll;max-height: 50vh;" id="coll1">
        
    </div>
</div>