<div class="pequeño" id="mantProd" >
	<div class="row">
		<div class="input-field col s10 m8 l5">
			<a class="prefix dropdown-button tooltipped small mdi mdi-magnify pbtn"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"></a>
			<ul id='filtr_1' class='dropdown-content' style="width: auto;">
				<li><a class="optns" tipo="codigo,codigointerno,nombre" href="#!" fltr="1">Código, Código Interno o Nombre</a></li>
				<li><a class="optns" tipo="codigo" href="#!" fltr="4">Código</a></li>
				<li><a class="optns" tipo="codigointerno" href="#!" fltr="5">Código Interno</a></li>
				<li><a class="optns" tipo="nombre" href="#!" fltr="2">Nombre</a></li>
				<li><a class="optns" tipo="marca" href="#!" fltr="3">Marca</a></li>
			</ul>
			<input type="text" id="search_productos" maxlength="100" num="v14" var="0,1" autocomplete="off">
			<label class="truncate" for="search_productos">Buscar Producto por Código, Código Interno o Nombre</label>
		</div>

		<div class="col s2 m4 l7">

			<a id="addproduct" class="btn-floating waves-effect waves-light btn2 right z-depth-3 modal-trigger per4102" href="#modal-productos" title="Agregar Producto"><i class="mdi mdi-plus"></i></a>

            {if $smarty.session.BUSS eq 3 or $smarty.session.BUSS eq 0}
             <a id="boletaes" class="btn-floating waves-effect waves-light right z-depth-3 per4110" title="Boleta E/S Inventario" style="margin-right: 2%;"><i class="mdi mdi-truck"></i></a>
             {/if}
		</div>
	</div>
	<div class="row pequeño">
		<div class="col s12 m12 l12 pequeño">
			<table class="table centered striped bordered highlight z-depth-3 pequeño dt-responsive nowrap" cellspacing="0" width="100%" id="data-table-productos">
				<thead>
					<tr>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Código {$TMPCIA}</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Nombre</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Cantidad</th>
						<th class="white-text tab1 per4119" style="border: 0; border-radius: 0px !important;">Precio Costo</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Precio Venta</th>
						<th class="white-text tab1 per4120" style="border: 0; border-radius: 0px !important;">Ganancia</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important; width: 18%;">Acciones</th>
					</tr>
				</thead>
				<tbody id="listaproductos">
					
				</tbody>
			</table>
        <ul class="left showing" modulo="14"><small></small></ul>
        <ul class="pagination right" vtbl="14" modulo="productos"></ul>
        <br><br><br>
    </div>
</div>
<div id="modal-productos" class="modal modal-fixed-footer grandemodal">
	<div class="modal-header">
		<ul class="tabs head3">
			<li class="tab col s3 menuP but" id="tb1"><a class="white-text">Datos Productos</a></li>
			<li class="tab col s3 menuP but" id="tb2"><a class="white-text">Financiero</a></li>
			<li class="tab col s3 menuP but hide" id="tb3"><a class="white-text">Impuestos</a></li>
			<li class="tab col s3 menuP but  {if $smarty.session.BUSS neq 0} hide {/if}" id="tb4"><a class="white-text">Características</a></li>
		</ul>
	</div>
	<div class="modal-content" style="padding: 0px;" id="fproductos">
		<input type="hidden" class="zelda">
        <input type="hidden" id="visinventariado" value="0">
		<div id="datosproductos" style="padding: 30px 10px 0 10px">
            <div class="row" style="margin: 0px">
                <div class="col s12 l4 row" style="margin:0px; padding: 0px">
                    <div class="input-field marginzero col s12">
                        <input id="vfamilia" type="text" class="validate autocomplete" autocomplete="off" tabindex="1">
                        <label for="vfamilia">Familia</label>
                    </div>

                    <div class="input-field marginzero col s12">
                        <input id="vtipo" type="text" class="validate autocomplete" autocomplete="off" tabindex="2">
                        <label for="vtipo">Tipo</label>
                    </div>

                    <div class="input-field marginzero col s12">
                        <input id="vmarca" type="text" class="validate autocomplete" autocomplete="off" tabindex="3">
                        <label for="vmarca">Marca</label>
                    </div>

                    <div class="col s12 switch">
                        <label>
                          <input type="checkbox" id="variable" ische="{if $smarty.session.BUSS eq 1}3{else}1{/if}">
                          <span class="lever tooltipped " data-tooltip="Define si el Precio de Venta Varía Cuando Factura" data-position="button"></span>
                          Producto Variable
                        </label>
                    </div>
                    <div class="col s12 switch">
                        <label>
                          <input type="checkbox" id="pesaje">
                          <span class="lever tooltipped " data-tooltip="Define si el Producto varía por el Peso" data-position="button"></span>
                          Producto de Pesaje
                        </label>
                    </div>
                {if $smarty.session.BUSS eq 3}
                    <div class="col s12 switch">
                        <label>
                          <input type="checkbox" id="goldinventariado">
                          <span class="lever tooltipped " data-tooltip="Llevar Control de Inventario del Producto" data-position="button"></span>
                          Producto Inventariado
                        </label>
                    </div>
                {/if}
                </div>
                
                <div class="col s12 l4 row" style="margin:0px; padding: 0px">

                    <div class="input-field marginzero col s12">
                        <input type="text" id="vnombre" class="formprod validate" value="" focus="1vcodigo" autocomplete="off" tabindex="4">
                        <label for="vnombre">Nombre</label>
                    </div>

                    <div class="input-field marginzero col s12">
                        <input type="text" id="vcodigo" class="formprod validate" value="" focus="1vcodigointerno" autocomplete="off" tabindex="5">
                        <label class="active" for="vcodigo">Código</label>
                    </div>

                    <div class="input-field marginzero col s12">
                        <input type="text" id="vcodigointerno" class="formprod validate" value="" focus="1vidunidad" autocomplete="off" tabindex="6">
                        <label class="active" for="vcodigointerno">Código Interno</label>
                    </div>

                    {if $smarty.session.BUSS eq 1}
                        <input type="hidden" id="vminimo" value="0">
                        <input type="hidden" id="vmaximo" value="0">
                     {else}
                        <div class="input-field marginzero col s12 _inventariado">
                            <input type="number" id="vminimo" class="formprod validate eder" value="" min="0" focus="1vmaximo" autocomplete="off" tabindex="7">
                            <label for="vminimo">Mínimo</label>
                        </div>
                        <div class="input-field marginzero col s12 _inventariado">
                            <input type="number" id="vmaximo" class="formprod validate eder" value="" min="0" focus="1vmaxdescuento" autocomplete="off" tabindex="8">
                            <label for="vmaximo">Máximo</label>
                        </div>
                    {/if}

                </div>

                <div class="col s12 l4 row" style="margin:0px; padding: 0px">

                    <div class="input-field marginzero col s12">
                        <select type="select" id="vidunidad">
                            <option value="">Seleccione una Unidad</option>
                            {section name=LE loop=$UNI}
                            <option value="{$UNI[LE][0]}" tipo="{$UNI[LE][3]}">{$UNI[LE][1]}</option>
                            {/section}
                        </select>
                        <label for="vidunidad">Unidad</label>
                    </div> 

                    <div class="input-field marginzero col s12">
                        <select id="vidmoneda" type="select" noClear="1">
                          {section name="LE" loop=$MON}
                            <option value="{$MON[LE][0]}" dv="{$MON[LE][2]}">{$MON[LE][1]} {if $smarty.section.LE.index neq 0} ({$MON[0][3]} {$MON[LE][2]}) {/if}</option>
                          {/section}
                        </select>
                        <label for="vidmoneda">Moneda</label>
                    </div>

                    <div class="input-field marginzero col s12">
                        <input type="text" id="vcomision" value="0" noClear="1" class="eder" autocomplete="off">
                        <label>Comision de Venta</label>
                    </div>

                    {if $smarty.session.BUSS neq 0} 
                    {if $smarty.session.BUSS eq 3}
                        <div class="input-field marginzero col s12 " id="cantpro">
                            <input type="text" id="vcantidad" noClear="1" class="validate" value="0.00" autocomplete="off">
                            <label class="active" for="vcantidad">Cantidad</label>
                        </div>
                    {/if}

                    <input type="hidden" id="vidinventario" value="6" noClear="1">
                    {else}
                    <div class="input-field marginzero col s12" id="dinventario">
                        <select type="select" id="vidinventario" noClear="1">
                            <option value="0">Seleccione un Inventario</option>
                            {section name=LE loop=$INV}
                            <option value="{$INV[LE][0]}" {if $INV[LE][0] eq 6} selected {/if}>{$INV[LE][1]}</option>
                            {/section}
                        </select>
                        <label for="vidinventario">Inventario</label>
                    </div>
                     {/if}

                    {if $smarty.session.BUSS eq 3 or $smarty.session.BUSS eq 0}
                    <div class="input-field marginzero col s12">
                        <a href="#" id="heredado" class="btn-floating tooltipped hide" data-tooltip="Producto Heredado" data-position="bottom"><i>H</i></a>
                        <a href="#" id="union" class="btn-floating tooltipped" data-tooltip="Producto de Receta" data-position="bottom"><i class="mdi mdi-book-multiple-variant mdi-24px"></i></a>
                        <a href="#" id="proveedores" class="btn-floating tooltipped" data-tooltip="Proveedores" data-position="bottom" style="margin-bottom: 5px"><i class="mdi mdi-account-multiple-outline mdi-24px"></i></a>
                        <a href="#" id="imagenes" class="btn-floating tooltipped" data-tooltip="Imagenes" data-position="bottom"><i class="mdi mdi-image-multiple mdi-24px"></i></a>
                        <a href="#" id="dimensiones" class="btn-floating tooltipped" data-tooltip="Dimensiones" data-position="bottom"><i class="mdi mdi-move-resize-variant mdi-24px"></i></a>
                    </div>
                    {/if}

                </div>

                                
            </div>


            <div class="row">
                <div class="marginzero hide col s12 m12 l12 row">
                    <div class="col s4 m2 l2">
                        <input type="checkbox" id="visheredado" class="filled-in">
                        <label for="visheredado">Heredado</label>
                        <input type="hidden" id="vidheredado" value="">
                        <input type="hidden" id="vinvheredado" value="">
                    </div>
                    <div class="input-field col s4 m4 l4">
                        <input type="text" id="prodher" class="autocomplete" disabled autocomplete="off" value="0">
                        <label for="prodher">Producto padre</label>
                    </div>
                    <div class="input-field col s2 m2 l2 equivalente hide">
                        <label>Equivalente a </label>
                    </div>
                    <div class="input-field col s2 m2 l2 equivalente hide">
                        <input type="text" id="vcantequiv" value="0">
                    </div>
                    <div class="input-field col s2 m2 l2 equivalente hide">
                        <label id="ud_equiv"></label>
                    </div>
                </div>
                <div class="marginzero col s12 m12 l4 row">
                	<div class="col s12 input-field hide marginzero">
                		<i class="mdi prefix">%</i>
	                    <input type="number" id="vmaxdescuento" class="formprod validate" value="" min="0" focus="2vcosto" autocomplete="off">
	                    <label class="active" for="vmaxdescuento">Descuento Máximo</label>
                	</div>
                    
                </div>
            </div>

           	<input type="hidden" id="vidheredado" value="0">

        </div>

        <div id="financiero" class="row hide" style="padding: 10px 10px 0 0px"> 

                <div class="row" style="padding: 0px;float: right;margin: 0px;">
                    
                    <label class="col s3 red-text"><b>IVA:</b></label>
                    <select id="vimpiva" class="col s9 calcvv" style="margin: 0px" num="4">
                        <option selected value="1" num="0">Exento 0%</option>
                        <option selected value="2" num="1">Reducido 1%</option>
                        <option selected value="3" num="2">Reducido 2%</option>
                        <option selected value="4" num="4">Reducido 4%</option>
                        <option selected value="5" num="0">Transitorio 0%</option>
                        <option selected value="6" num="4">Transitorio 4%</option>
                        <option selected value="7" num="8">Transitorio 8%</option>
                        <option selected value="8" num="13">General 13%</option>
                    </select>
                    
                </div>
                <input type="checkbox" id="pu" >
                    <label for="pu" class="col s6" style="padding: 0px; padding-left: 25px; margin-left: 2%;">Por Unidad</label>
            <br><br>
            <div class="row" style="margin: 0;margin-top:20px;">

                <div class="col s12 l3 ">
                    <div class="input-field">
                        <i class="mdi prefix" id="icosto">¢</i>
                        <input type="text" id="vcosto" class="validate eder numeric cos calcvv" value="0.00" num="1" autocomplete="off" focus="vgganancia">
                        <label for="vcosto">Precio Costo</label>
                    </div>
                     <div class="switch hide" id="costodivisa">
                        <label>
                          <input type="checkbox" id="cdivisa">
                          <span class="lever tooltipped " data-tooltip="Define si el Costo Actualiza el Monto de Divisa Original" data-position="button"></span>
                          Cambiar Monto de Divisa
                        </label>
                        <input type="hidden" id="vdivisa" value="1">
                    </div>
                </div>

                <div class="col s12 l3 input-field">
                    <i class="mdi prefix">%</i>
                    <input type="text" id="vgganancia" class="validate calcvv eder numeric gan" value="0.00" focus="vventa" num="2" autocomplete="off">
                    <input type="hidden" id="vganancia" value="0" class="rgan">
                    <label for="vgganancia">Ganancia</label>
                </div>

                <div class="col s12 l3 input-field">
                    <i class="mdi prefix moneda">¢</i>
                    <input type="text" id="vventa" class="validate calcvv eder numeric ven" value="0.00" num="3" autocomplete="off">
                    <label for="vventa">Precio Venta</label>
                </div>

                 <div class="col s12 l3 input-field">
                    <i class="mdi prefix moneda">¢</i>
                    <input type="text" id="vventaiva" class="validate calcvv eder numeric veniva" value="0.00" num="5" autocomplete="off">
                    <label for="vventaiva">Precio Venta +IVA</label>
                </div>

            </div>

            <div class="hide precunidiv" map="0">
                
            </div>

            {if $smarty.session.BUSS eq 0 || $smarty.session.BUSS eq 3}

            <div class="col s12 hide">
                <input type="radio" name="tprecio" value="1" id="tpr1" checked class="with-gap">
                <label for="tpr1">Categoría</label>

                <input type="radio" name="tprecio" value="2" id="tpr2" class="with-gap">
                <label for="tpr2">Unidad</label>
            </div>

            {section name=LE loop=$NIV}
            <div style="margin: 0; padding: 0;" id="precionivel">
                <div class="precionivel row" id="f{$NIV[LE][0]}" style="margin: 0px">
                    <div class="col s12 l3">
                        <b>{$NIV[LE][1]}</b>
                    </div>
                    <div class="col s12 l3 input-field">
                        <i class="mdi prefix">%</i>
                        <input type="text" id="vgganancia{$NIV[LE][0]}" class="validate calcvv eder gan numeric" value="0.00" num="2" style="margin-bottom: 0px" autocomplete="off">
                        <input type="hidden" id="vganancia{$NIV[LE][0]}" value="0" class="rgan">
                    </div>
                    <div class="col s12 l3 input-field">
                        <i class="mdi prefix moneda">¢</i>
                        <input type="text" id="vventa{$NIV[LE][0]}" class="validate calcvv eder ven numeric" value="0.00" num="3" style="margin-bottom: 0px" autocomplete="off">
                    </div>
                    <div class="col s12 l3 input-field">
                    <i class="mdi prefix moneda">¢</i>
                    <input type="text" id="vventaiva{$NIV[LE][0]}" class="validate calcvv eder numeric veniva" value="0.00" num="5" autocomplete="off">
                </div>
                </div>
            </div>
            {/section}

            <div class="chg hide precclienete">
                <tr>
                    <td style="padding: 0px"><label>Nombre Cliente</label></td>
                </tr>
                <tr class="preciocliente" id="c1" accion="1" idf="0" style="border: 1px solid #e2e2e2">
                    <td class="center-align input-field" style="padding: 0px">
                        <input type="text" id="vcliente1" class="validate autocomplete" style="font-size: 12px; margin: 0px">
                        <input type="hidden" class="vidcliente" id="vidcliente1">
                    </td> 
                    <td class="center-align input-field" style="padding: 0px"> 
                        <i class="mdi prefix">%</i>
                        <input type="text" id="vgganancia1" class="validate calcvv eder" value="0" focus="vventa" num="2" line="1" style="margin: 0px">
                        <input type="hidden" id="vganancia1" value="0">
                    </td> 
                    <td class="center-align input-field" style="padding: 0px">
                        <i class="mdi prefix moneda">¢</i>
                        <input type="text" id="vventa1" class="validate calcvv eder" value="0" num="3" line="1" style="margin: 0px">
                    </td>
                </tr>
            </div>

        {/if}

	</div>
    </div>
	<div class="modal-footer ">
		<a class="modal-action waves-effect waves-green btn-flat z-depth-3 add" modulo="producto"  id="agProd">Agregar</a>
		<a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
	</div>
</div>

<div id="modal-movinventario" class="modal modal-fixed-footer grandemodal" style="width:70%;height:90%">
<div class="modal-content" style="padding: 0px;">
<ul class="tabs head1">
	<li class="tab col s3 minvent but per4105" id="mv1"><a class="white-text">Entrada Inventario</a></li>
	<li class="tab col s3 minvent but per4106" id="mv2"><a class="white-text">Salida Inventario</a></li>
	<li class="tab col s3 minvent but per4107" id="mv3"><a class="white-text">Movimiento Inventario</a></li>
</ul>
<ul class="tabs head2">
	<li class="tab col s3" style="width: 100%">
		<div class="row">
			<div class="col s12 l6">
				<a class="white-text">Producto:
					<span id="nomprod"></span>
					<input type="hidden" id="idprd" value="">
					<input type="hidden" id="oldinvent" value="">
				</a>
			</div>
			<div class="col s12 l6">
				<a class="white-text">Cantidad:
					<span id="prodcant"></span>
				</a>
			</div>
		</div>
	</li>
</ul>
<input type="hidden" id="spot" value="0">
<div id="ininvent" class="movsinvent" style="padding: 15px 10px 0 10px">
	<div class="row">
		<div class="input-field col s12 l6">
			<select type="select" id="inidbodega">
				<option value="0">Seleccione una Bodega</option>
			</select>
			<label for="inidbodega">Bodega</label>
		</div>
		<div class="input-field col s12 l6">
			<select type="select" id="inidinventario">
				<option value="0">Seleccione un Inventario</option>
			</select>
			<label for="inidinventario">Inventario</label>
		</div>
		<div class="input-field col s12 l4">
			<input id="vincantidad" type="text" class="validate">
			<label for="vincantidad">Cantidad Entrante</label>
		</div>
		<div class="input-field col s12  l8">
			<input type="text" id="vincomentario" class="validate" length="150">
			<label for="vincomentario">Comentario</label>
		</div>
	</div>
</div>
<div id="outinvent" class="movsinvent hide">
	<div class="row">
		<!-- <div class="input-field col s12 l6">
			<select type="select" id="outidbodega">
				<option value="0">Seleccione una Bodega</option>
			</select>
			<label for="outidbodega">Bodega Origen</label>
		</div> -->
		<!-- <div class="input-field col s12 l6">
			<select type="select" id="outidinventario">
				<option value="0">Seleccione un Inventario</option>
			</select>
			<label for="outidinventario">Inventario Origen</label>
		</div> -->
		<div class="input-field col s12 l6">
			<select type="select" id="outidbodega">
				<option value="0">Seleccione una Bodega</option>
			</select>
			<label for="outidbodega">Bodega</label>
		</div>
		<div class="input-field col s12 l6">
			<select type="select" id="outidinventario">
				<option value="0">Seleccione un Inventario</option>
			</select>
			<label for="outidinventario">Inventario</label>
		</div>
		<div class="input-field col s12 l4">
			<input id="voutcantidad" type="text" class="validate">
			<label for="voutcantidad">Cantidad Saliente</label>
		</div>
		<div class="input-field col s12 l8">
			<input type="text" id="voutcomentario" class="validate" length="150">
			<label for="voutcomentario">Comentario</label>
		</div>
	</div>
</div>
<div id="movinvent" class="movsinvent hide">
	<div class="row">
		<div class="input-field col s12 l6">
			<select type="select" id="movidbodega">
				<option value="0">Seleccione una Bodega</option>
			</select>
			<label for="movidbodega">Bodega Origen</label>
		</div>
		<div class="input-field col s12 l6">
			<select type="select" id="movidinventario">
				<option value="0">Seleccione un Inventario</option>
			</select>
			<label for="movidinventario">Inventario Origen</label>
		</div>
		<div class="input-field col s12 l6">
			<select type="select" id="didbodega">
				<option value="0">Seleccione una Bodega</option>
			</select>
			<label for="didbodega">Bodega Destino</label>
		</div>
		<div class="input-field col s12 l6">
			<select type="select" id="didinventario">
				<option value="0">Seleccione un Inventario</option>
			</select>
			<label for="didinventario">Inventario Destino</label>
		</div>
		<div class="input-field col s12 l4">
			<input id="vmovcantidad" type="text" class="validate">
			<label for="vmovcantidad">Cantidad</label>
		</div>
		<div class="input-field col s12 l8">
			<input type="text" id="vmovcomentario" class="validate" length="150">
			<label for="vmovcomentario">Comentario</label>
		</div>
	</div>
</div>
</div>
<div class="modal-footer">
<a class="modal-action waves-effect waves-light waves-green btn-flat z-depth-3" id="actinv">Guardar</a>
<a class="modal-action modal-close waves-effect waves-light waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
</div>
</div>
<div id="modal-descuentos" class="modal modal-fixed-footer grandemodal" style="width:45%;height:90%">
<div class="modal-header">
<ul class="tabs head2">
	<li class="tab col s3"><a class="white-text">Mostrar Descuentos de Producto <span class="dprod"></span></a></li>
</ul>
</div>
<div class="modal-content" stylle="padding: 0px;">
<div class="row">
	<ul class="collection with-header" id="listadescuentos">
		<!-- <li class="collection-item"><div class="row"><div class="col s6 m6 l6">Nombre del Descuento: <span id="nmdesc1">Leche</span></div><div class="col s6 m6 l6"><a class="secondary-content">Valor: <span id="valdesc1">15%</span></a></div></div></li> -->
	</ul>
</div>
</div>
<div class="modal-footer">
<a class="modal-action modal-close waves-effect waves-light waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
</div>
</div>
<div id="modal-info2" class="modal modal-fixed-footer grandemodal" >
<div class="modal-header">
<ul class="tabs head2">
	<li class="tab col s3"><a class="white-text">Mostrar Características del Producto <span id="dprd"></span></a></li>
</ul>
</div>
<div class="modal-content pequeño" stylle="padding: 0px;">
<div class="row pequeño"><br>
	<table class="table pequeño responsive-table centered striped bordered highlight z-depth-3" cellspacing="0" width="100%" >
		<thead class="head1">
			<tr>
				<th style="border: 0; border-radius: 0px !important;">Nombre</th>
				<th style="border: 0; border-radius: 0px !important;">Valor</th>
			</tr>
		</thead>
	<tbody id="listainfo"></tbody>
</table>
</div>
</div>
<div class="modal-footer">
<a class="modal-action modal-close waves-effect waves-light waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
</div>
</div>
</div> <!-- End mantProductos -->


<div id="modal-esinventario" class="modal modal-fixed-footer grandemodal" style="width:70%;height:90%">
    <div class="modal-header center">
        <input type="radio" name="mov" id="_einv" value="1" class="with-gap" checked>
        <label for="_einv">Entrada de Inventario</label>
        <input type="radio" name="mov" id="_sinv" value="2" class="with-gap">
        <label for="_sinv">Salida de Inventario</label>
        <input type="radio" name="mov" id="_minv" value="3" class="with-gap">
        <label for="_minv">Movimiento de Inventario</label>
    </div>
<div class="modal-content" style="padding: 0px;">
    <h5 class="center">Boleta Entrada/Salida de Inventario</h5>
    <a href="listaboletas" target="_new" class="der" title="Lista de Boletas"><i class="mdi mdi-magnify mdi-24px"></i></a>
    <br>
    <div class="row">
        <div class="col s3 input-field">
            <select type="select" id="bod1">
                <option value="6" selected="">Producto Venta</option>
            </select>
            <label for="bod1">Bodega 1</label>
        </div>
        <div class="col s3 input-field bd2 hide">
            <select type="select" id="bod2">
                <option value="6">Producto Venta</option>
            </select>
            <label for="bod2">Bodega 2</label>
        </div>

        <div class="col s6 input-field">
            <input type="text" id="bol-comen">
            <label for="bol-comen">Comentario</label>
        </div>
    </div>
    <div class="row">
        <div class="col s4 input-field">
            <i class="mdi mdi-magnify prefix"></i>
            <input type="text" id="bpes" autocomplete="off">
            <label for="bpes">Buscar Producto</label>
        </div>
        <div class="col s2">
            En Inventario: <span id="cesin">0.00</span>
        </div>
        <div class="col s3 input-field">
            <input type="text" id="cpes" autocomplete="off" value="0">
            <label class="truncate" for="cpes">Cantidad</label>
        </div>
        <div class="col s3">
            <a id="addline" class="btn-floating waves-effect waves-light btn2 right z-depth-3" title="Agregar Linea"><i class="mdi mdi-plus"></i></a>
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th style="padding: 0px">Producto</th>
                <th style="padding: 0px">Cantidad</th>
                <th style="padding: 0px">Acciones</th>
            </tr>
        </thead>
        <tbody id="bes">
            
        </tbody>
    </table>
</div>
<div class="modal-footer">
    <input type="checkbox" id="p_v" checked />
              <label for="p_v" style="color: black; padding-left: 20px;" class="tooltipped" data-tooltip="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'" data-position="left">Punto Venta</label>
<a class="modal-action waves-effect waves-light waves-green btn-flat z-depth-3" id="boletainv">Guardar</a>
<a class="modal-action modal-close waves-effect waves-light waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
</div>
</div>

<div id="modal-imagenes" class="modal modal-fixed-footer grandemodal" >
<div class="modal-header">
<ul class="tabs head2">
    <li class="tab col s3"><a class="white-text">Imágenes del Producto <span class="dprd"></span></a></li>
</ul>
</div>
<div class="modal-content pequeño" stylle="padding: 0px;">
<div class="row pequeño"><br>
    <div class="col s6">
        SUBIR
    </div>

    <div class="col s6">
         <ul class="collection">
            <li class="collection-item avatar">
              <img src="images/yuna.jpg" alt="">
              <span class="title">Foto 1</span>
              <p>
                <a href="#" class="der red-text"><i class="mdi mdi-close"></i></a>
              </p>
            </li>
            <li class="collection-item avatar">
              <img src="images/yuna.jpg" alt="">
              <span class="title">Foto 2</span>
              <p>
                <a href="#" class="der red-text"><i class="mdi mdi-close"></i></a>
              </p>
            </li>
            <li class="collection-item avatar">
              <img src="images/yuna.jpg" alt="">
              <span class="title">Foto 3</span>
              <p>
                <a href="#" class="der red-text"><i class="mdi mdi-close"></i></a>
              </p>
            </li>
            <li class="collection-item avatar">
              <img src="images/yuna.jpg" alt="">
              <span class="title">Foto 4</span>
              <p>
                <a href="#" class="der red-text"><i class="mdi mdi-close"></i></a>
              </p>
            </li>
          </ul>
    </div>
</div>
</div>
<div class="modal-footer">
<a class="modal-action modal-close waves-effect waves-light waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
</div>
</div>

<div id="modal-dimensiones" class="modal modal-fixed-footer grandemodal" >
<div class="modal-header">
<ul class="tabs head2">
    <li class="tab col s3"><a class="white-text">Dimensiones del Producto <span class="dprd"></span></a></li>
</ul>
</div>
<div class="modal-content pequeño" stylle="padding: 0px;">
<div class="row pequeño"><br>
    <table class="table pequeño responsive-table centered striped bordered highlight z-depth-3" cellspacing="0" width="100%" >
        <thead class="head1">
            <tr>
                <th style="border: 0; border-radius: 0px !important;">Característica</th>
                <th style="border: 0; border-radius: 0px !important;">Valor</th>
                <th style="border: 0; border-radius: 0px !important;">Unidad</th>
            </tr>
        </thead>
        <tbody>
            <tr id="dimension1" vid="0">
                <td>LONGITUD</td>
                <td><input type="text" class="eder" id="vldimension1" value="0"></td> 
                <td><select id="unidimension1"><option value="0">Seleccione una Unidad</option>
                            {section name=LE loop=$UNI}
                            {if $UNI[LE][0] eq 8 or $UNI[LE][4] eq 8}
                            <option value="{$UNI[LE][0]}" tipo="{$UNI[LE][3]}">{$UNI[LE][1]}</option>
                            {/if}
                            {/section}</select></td>
            </tr>

             <tr id="dimension2" vid="0">
                <td>PESO</td>
                <td><input type="text" class="eder" id="vldimension2" value="0"></td> 
                <td><select id="unidimension2"><option value="0">Seleccione una Unidad</option>
                            {section name=LE loop=$UNI}
                            {if $UNI[LE][0] eq 3 or $UNI[LE][4] eq 3}
                            <option value="{$UNI[LE][0]}" tipo="{$UNI[LE][3]}">{$UNI[LE][1]}</option>
                            {/if}
                            {/section}</select></td>
            </tr>

             <tr id="dimension3" vid="0">
                <td>TIEMPO</td>
                <td><input type="text" class="eder" id="vldimension3" value="0"></td> 
                <td><select id="unidimension3"><option value="">Seleccione una Unidad</option>
                            {section name=LE loop=$UNI}
                            {if $UNI[LE][3] eq 2}
                            <option value="{$UNI[LE][0]}" tipo="{$UNI[LE][3]}">{$UNI[LE][1]}</option>
                            {/if}
                            {/section}</select></td>
            </tr>
        </tbody>
    </table>
</div>
</div>
<div class="modal-footer">
<a class="modal-action waves-effect waves-light waves-red btn-flat z-depth-3" id="edim" style="margin-right: 2%">Salir</a>
</div>
</div>

<div id="modal-proveedores" class="modal modal-fixed-footer grandemodal" >
<div class="modal-header">
<ul class="tabs head2">
    <li class="tab col s3"><a class="white-text">Proveedores del Producto <span class="dprd"></span></a></li>
</ul>
</div>
<div class="modal-content pequeño" stylle="padding: 0px;">
<div class="row pequeño"><br>
    <table class="table pequeño responsive-table centered striped bordered highlight z-depth-3" cellspacing="0" width="100%" >
        <thead class="head1">
            <tr>
                <th style="border: 0; border-radius: 0px !important;">Proveedor</th>
                <th style="border: 0; border-radius: 0px !important;">Código</th>
                <th style="border: 0; border-radius: 0px !important;">Costo</th>
                <th style="border: 0; border-radius: 0px !important;">Ult. Fecha</th>
                <th style="border: 0; border-radius: 0px !important;">Cantidades</th>
                <th style="border: 0; border-radius: 0px !important;">Lotes</th>
            </tr>
        </thead>
        <tbody id="listainfop"></tbody>
    </table>
</div>
</div>
<div class="modal-footer">
<a class="modal-action modal-close waves-effect waves-light waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
</div>
</div>

<div id="modal-heredado" class="modal modal-fixed-footer grandemodal" >
<div class="modal-header">
<ul class="tabs head2">
    <li class="tab col s3"><a class="white-text">Herencia del Producto <span class="dprd"></span></a></li>
</ul>
</div>
<div class="modal-content pequeño" stylle="padding: 0px;">
<div class="row pequeño"><br>

<div class="col s6 input-field">
    <input type="text" id="prpadre">
    <label for="prpadre">Producto Padre</label>
</div>

<div class="col s6">
    <input type="text" id="cntpadre">
    <label for="cntpadre">Cantidad</label>
</div>

<label>Productos Heredados</label>

<table class="table pequeño responsive-table centered striped bordered highlight z-depth-3" cellspacing="0" width="100%" >
        <thead class="head1">
            <tr>
                <th style="border: 0; border-radius: 0px !important;">Código</th>
                <th style="border: 0; border-radius: 0px !important;">Nombre</th>
                <th style="border: 0; border-radius: 0px !important;">Cantidad</th>
            </tr>
        </thead>
        <tbody id="listainfoh"></tbody>
    </table>

</div>
</div>
<div class="modal-footer">
<a class="modal-action modal-close waves-effect waves-light waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
</div>
</div>

<div id="modal-union" class="modal modal-fixed-footer grandemodal" >
<div class="modal-header">
<ul class="tabs head2">
    <li class="tab col s3"><a class="white-text">Receta del Producto <span class="dprd"></span></a></li>
</ul>
</div>
<div class="modal-content pequeño" stylle="padding: 0px;">
<div class="row pequeño">

<div class="col s6 row">
    <div class="input-field col s12">
        <input type="text" id="prunion">
        <label for="prunion">Buscar Producto</label>
    </div>

    <div class="input-field col s5">
        <input type="text" id="cntunion">
        <label for="cntunion">Cantidad</label>
    </div>

    <div class="input-field col s5">
        <select id="cntunid">
            <option disabled selected>----</option>
        </select>
        <label for="cntunid">Unidad</label>
    </div>

    <a href="#" id="inclreceta" class="btn-floating"><i class="mdi mdi-24px mdi-plus"></i></a>
</div>

<div class="col s6">
    <span>Lista de Ingredientes</span>
</div>

</div>
<label>Productos Elaborados a Base</label>

<table class="table pequeño responsive-table centered striped bordered highlight z-depth-3" cellspacing="0" width="100%" >
        <thead class="head1">
            <tr>
                <th style="border: 0; border-radius: 0px !important;">Código</th>
                <th style="border: 0; border-radius: 0px !important;">Nombre</th>
                <th style="border: 0; border-radius: 0px !important;">Cantidad</th>
                <th style="border: 0; border-radius: 0px !important;">Unidad</th>
                <th style="border: 0; border-radius: 0px !important;">Precio Final</th>
            </tr>
        </thead>
        <tbody id="listainfou"></tbody>
    </table>

</div>
<div class="modal-footer">
<a class="modal-action modal-close waves-effect waves-light waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
</div>
</div>
