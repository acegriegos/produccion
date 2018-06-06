<div class="pequeño" id="mantProd" >
	<div class="row">
		<div class="input-field col s11 m8 l5">
			<a class="prefix dropdown-button tooltipped small mdi mdi-magnify pbtn"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"></a>
			<ul id='filtr_1' class='dropdown-content' style="width: auto;">
				<li><a class="optns" tipo="codigo,codigointerno,nombre" href="#!" fltr="1">Código, Código Interno o Nombre</a></li>
				<li><a class="optns" tipo="codigo" href="#!" fltr="4">Código</a></li>
				<li><a class="optns" tipo="codigointerno" href="#!" fltr="5">Código Interno</a></li>
				<li><a class="optns" tipo="nombre" href="#!" fltr="2">Nombre</a></li>
				<li><a class="optns" tipo="marca" href="#!" fltr="3">Marca</a></li>
			</ul>
			<input type="text" id="search_productos" maxlength="100" num="v14" var="0,1">
			<label class="truncate" for="search_productos">Buscar Producto por Código, Código Interno o Nombre</label>
		</div>
		<div class="col s12 m4 l7 per4102">
			<a id="addproduct" class="btn-floating waves-effect waves-light btn2 right z-depth-3 modal-trigger" href="#modal-productos"><i class="mdi mdi-plus"></i></a>
		</div>
	</div>
	<div class="row pequeño">
		<div class="col s12 m12 l12 pequeño">
			<table class="table centered striped bordered highlight z-depth-3 pequeño" cellspacing="0" width="100%" >
				<thead>
					<tr>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Código {$TMPCIA}</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Código Interno</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Nombre</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Marca</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Precio Costo</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Precio Venta</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Ganancia</th>
						<th class="white-text tab1" style="border: 0; border-radius: 0px !important; width: 18%;">Acciones</th>
					</tr>
				</thead>
				<tbody id="listaproductos">
					{section name=LE loop=$PROD}
					<tr>
						<td style="padding: 10px;">{$PROD[LE][1]}</td>
						<td style="padding: 10px;">{$PROD[LE][2]}</td>
						<td style="padding: 10px;">{$PROD[LE][3]}</td>
						<td style="padding: 10px;">{$PROD[LE][29]}</td>
						<td style="padding: 10px;">{$PROD[LE][6]}</td>
						<td style="padding: 10px;">{$PROD[LE][12]}</td>
						<td style="padding: 10px;">{$PROD[LE][9]}</td>
						<td>
							<a class="btn-color pbtn info mdi mdi-alert-circle mdi-24px blueh per4115" id="info{$PROD[LE][0]}" href="#modal-info2" title="Mostrar Informacion del Producto"></a>
							<a class="btn-color pbtn descuentos per4103 mdi mdi-percent mdi-24px modal-trigger" id="desc{$PROD[LE][0]}" href="#modal-descuentos" title="Mostrar Descuentos del Producto"></a>
							<a class="btn-color pbtn salidainv per4116 mdi mdi-arrow-down-bold-box mdi-24px  modal-trigger" id="s{$PROD[LE][0]}" href="#modal-movinventario" title="Movimiento de Inventario"></a>
							<a class="btn-color pbtn editprod mdi mdi-pencil mdi-24px per4108 modal-trigger" id="m{$PROD[LE][0]}" href="#modal-productos" title="Editar Producto"></a>
							<a class="btn-color pbtn cdel delprod  mdi mdi-close mdi-24px per4109" id="d{$PROD[LE][0]}" title="Eliminar Producto"></a>
						</td>
					</tr>
					{/section}
				</tbody>
			</table>
		<ul class="pagination right" vtbl="14" modulo="productos"></ul>
		<br><br><br>
	</div>
</div>
<div id="modal-productos" class="modal modal-fixed-footer grandemodal">
	<div class="modal-header">
		<ul class="tabs head3">
			<li class="tab col s3 menuP but" id="tb1"><a class="white-text">Datos Productos</a></li>
			<li class="tab col s3 menuP but" id="tb2"><a class="white-text">Financiero</a></li>
			<li class="tab col s3 menuP but" id="tb3"><a class="white-text">Impuestos</a></li>
			<li class="tab col s3 menuP but  {if $smarty.session.BUSS eq 1} hide {/if}" id="tb4"><a class="white-text">Características</a></li>
		</ul>
	</div>
	<div class="modal-content" style="padding: 0px;">
		<div id="datosproductos" style="padding: 30px 10px 0 10px">
			<div class="row">
				<div class="col s12 m12 l6" id="col1">
					<div class="input-field marginzero">
						<input id="vfamilia" type="text" class="validate autocomplete" autocomplete="off">
						<label for="vfamilia">Familia</label>
						<input type="hidden" id="vidfamilia" value="0">
					</div>
					<div class="input-field marginzero">
						<input id="vtipo" type="text" class="validate autocomplete" autocomplete="off">
						<label for="vtipo">Tipo</label>
						<input type="hidden" id="vidtipo" value="0">
					</div>
					<div class="input-field marginzero">
						<input id="vmarca" type="text" class="validate autocomplete" autocomplete="off">
						<label for="vmarca">Marca</label>
						<input type="hidden" id="vidmarca" value="0">
					</div>
					<!-- {if $smarty.session.BUSS eq 1} 
						<input type="hidden" id="vidinventario" value="6">
					 {else} -->
					<div class="input-field marginzero" id="dinventario">
						<select type="select" id="vidinventario">
							<option value="0">Seleccione un Inventario</option>
							{section name=LE loop=$INV}
							<option value="{$INV[LE][0]}">{$INV[LE][1]}</option>
							{/section}
						</select>
						<label for="vidinventario">Inventario</label>
					</div>
					<!-- {/if} -->
					<div class="input-field marginzero">
						<select type="select" id="vidunidad">
							<option value="">Seleccione una Unidad</option>
							{section name=LE loop=$UNI}
							<option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>
							{/section}
						</select>
						<label for="vidunidad">Unidad</label>
					</div>
					 <div class="input-field marginzero">
                        <select id="vidmoneda" type="select">
                          {section name="LE" loop=$MON}
                            <option value="{$MON[LE][0]}" dv="{$MON[LE][2]}">{$MON[LE][1]} {if $smarty.section.LE.index neq 0} ({$MON[0][3]} {$MON[LE][2]}) {/if}</option>
                          {/section}
                        </select>
                        <label for="vidmoneda">Moneda</label>
                    </div>
					<div class="input-field marginzero hide" id="dpeso">
						<input id="vpeso" type="number" class="validate" min="0" autocomplete="off">
						<label for="vpeso">Peso</label>
					</div>
				</div>
				<div class="col s12 m12 l6" id="col2">
					<div class="input-field marginzero">
						<input type="text" id="vnombre" class="formprod validate" value="" focus="1vcodigo" autocomplete="off">
						<label for="vnombre">Nombre</label>
					</div>
					<div class="input-field marginzero">
						<input type="text" id="vcodigo" class="formprod validate" value="" focus="1vcodigointerno" autocomplete="off">
						<label class="active" for="vcodigo">Código</label>
						<input type="hidden" id="vid" value="0">
						<input type="hidden" id="vidmoneda" value="1">
						<input type="hidden" id="vidusuario" value="">
						<input type="hidden" id="vidsucursal" value="">
						<input type="hidden" id="vimg" value="">
					</div>
					<div class="input-field marginzero">
						<input type="text" id="vcodigointerno" class="formprod validate" value="" focus="1vminimo" autocomplete="off">
						<label class="active" for="vcodigointerno">Código Interno</label>
					</div>
					{if $smarty.session.BUSS eq 1} 
						<input type="hidden" id="vminimo" value="1">
						<input type="hidden" id="vmaximo" value="300">
					 {else}
					<div class="input-field marginzero">
						<input type="number" id="vminimo" class="formprod validate" value="" min="0" focus="1vmaximo" autocomplete="off">
						<label class="active" for="vminimo">Mínimo</label>
					</div>
					<div class="input-field marginzero">
						<input type="number" id="vmaximo" class="formprod validate" value="" min="0" focus="1vmaxdescuento" autocomplete="off">
						<label class="active" for="vmaximo">Máximo</label>
					</div>
					{/if}
					<div class="input-field marginzero {if $smarty.session.BUSS eq 1} hide {/if}">
						<i class="mdi prefix">%</i>
						<input type="number" id="vmaxdescuento" class="formprod validate" value="" min="0" focus="2vcosto" autocomplete="off">
						<label class="active" for="vmaxdescuento">Descuento Máximo</label>
					</div><br><br>
				</div>
			</div>
		</div>
		<div id="financiero" class="row hide" style="padding: 20px 10px 0 10px">
			<table>
				<tr>
					<td colspan="4" class="center" style="padding: 0px">
						<b>Precio General</b>
					</td>
				</tr>
				<tr>
					<td class="center" style="padding: 0px"><label>Precio Costo</label></td>
					<td class="center" style="padding: 0px"><label>Ganancia</label></td>
					<td class="center" style="padding: 0px"><label>Precio Venta</label></td>
					<td class="center" style="padding: 0px"><label>Exención</label></td>
				</tr>
			<tr>
				<td class="center-align input-field" style="padding: 0">
					<i class="mdi prefix moneda">¢</i>
					<input type="text" id="vcosto" class="validate eder numeric cos calcvv" style="margin: 0px;" value="0.00" data-mask="9999999999.99" focus="vganancia" num="1">
					<input type="hidden" id="hvcosto" value="">
				</td>
				<td class="center-align input-field" style="padding: 0">
					<i class="mdi prefix">%</i>
					<input type="text" id="vganancia" class="validate calcvv eder numeric gan" style="margin: 0px;" value="0.00" data-mask="9999999999.99" focus="vventa" num="2">
				</td>
				<td class="center-align input-field" style="padding: 0">
					<i class="mdi prefix moneda">¢</i>
					<input type="text" id="vventa" class="validate calcvv eder numeric ven" style="margin: 0px;" value="0.00" data-mask="9999999999.99" focus="vexoneracion" num="3">
					<input type="hidden" id="hventa" value="">
				</td>
				<td class="center-align input-field" style="padding: 0">
					<i class="mdi prefix">%</i>
					<input type="text" id="vexoneracion" class="validate calcvv eder numeric exo" style="margin: 0px;" value="0.00" data-mask="9999999999.99" num="4">
				</td>
			</tr>

			<tr> 
				<td><div class="switch {if $smarty.session.BUSS eq 1} hide {/if}">
						<label>
							Cliente
							<input type="checkbox" class="chg" value="1" checked>
							<span class="lever"></span>
							Categoria
						</label>
					</div></td>
				<td colspan="2" style="padding: 2%;"> <b class="chg0 {if $smarty.session.BUSS eq 1} hide {/if}">Precio por Categoría</b> <b class="chg1 hide">Precio por Cliente</b> </td>
			</tr>
			{section name=LE loop=$NIV}
			<tr class="precionivel chg0 {if $smarty.session.BUSS eq 1} hide {/if}" id="f{$NIV[LE][0]}" style="border: 1px solid #e2e2e2">
				<td style="padding: 0px"><b>Categoria: {$NIV[LE][1]}</b></td>
				<td class="center-align input-field" style="padding: 0px">
					<i class="mdi prefix">%</i>
					<input type="text" id="vganancia{$NIV[LE][0]}" class="validate calcvv eder gan numeric" value="0.00" data-mask="9999999999.99" num="2" style="margin: 0px">
				</td>
				<td class="center-align input-field {if $smarty.session.BUSS eq 1} hide {/if}" style="padding: 0px">
					<i class="mdi prefix moneda">¢</i>
					<input type="text" id="vventa{$NIV[LE][0]}" class="validate calcvv eder ven numeric" value="0.00" data-mask="9999999999.99" num="3" style="margin: 0px">
					<input type="hidden" id="hventa{$NIV[LE][0]}" class="hven" value="">
				</td>
				<td class="center-align input-field {if $smarty.session.BUSS eq 1} hide {/if}" style="padding: 0px">
					<i class="mdi prefix">%</i>
					<input type="text" id="vexoneracion{$NIV[LE][0]}" class="validate calcvv eder exo numeric" value="0.00" data-mask="9999999999.99" num="4" style="margin: 0px">
				</td>
			</tr>
			{/section}
			<tfoot class="chg1 hide precclienete">
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
						<input type="text" id="vganancia1" class="validate calcvv eder" value="0" data-mask="9999999999.99" focus="vventa" num="2" line="1" style="margin: 0px">
					</td> 
					<td class="center-align input-field" style="padding: 0px">
						<i class="mdi prefix moneda">¢</i>
						<input type="text" id="vventa1" class="validate calcvv eder" value="0" data-mask="9999999999.99" focus="vexoneracion" num="3" line="1" style="margin: 0px">
						<input type="hidden" id="hventa1" value="0">
					</td> 
					<td class="center-align input-field" style="padding: 0px">
						<i class="mdi prefix">%</i>
						<input type="text" id="vexoneracion1" style="width: 70%;margin: 0px" class="validate calcvv eder" value="0" data-mask="9999999999.99" nc="1" line="1"> 
						<i class="mdi mdi-delete der red-text pbtn mdi-24px cl"></i> 
					</td>
				</tr>
			</tfoot>
			</table>
		</div>

		<div id="dimpuestos" class="row hide" style="padding: 50px 10px 0 10px">
			<div class="col s12">
				<div class="col s2">
				</div>
				<div class="row">
					<div class="col s12">
					<ul class="collection hide  z-depth-3" id="impuestos"></ul>
				</div>
			</div>
		</div>
	</div>
	<div id="features" class="row hide" style="padding: 30px 10px 0 10px">
		<div class="col s5 m5 l5">
			<div class="input-field col s12 m12 l12">
				<input type="text" class="validate ffeat" id="nom">
				<input type="hidden" id="cnt" value="0">
				<label for="nom">Nombre</label>
			</div>
			<div class="input-field col s5 m5 l5">
				<input type="text" class="validate ffeat autocomplete" id="val">
				<label for="val">Valor</label>
			</div>
			<div class="col s1 m1 l1">
				<button type="button" class="btn-floating waves-effect waves-light blue z-depth-4" id="addfeat"><i class="mdi mdi-plus">add</i></button>
			</div>
		</div>
		<div class="col s7 m7 l7">
			<div class="input-field col s6 m6 l6 right">
				<input type="text" class="validate" id="fltr">
				<label for="fltr">Filtro:</label>
			</div>
			<div class="col s12 m12 l12 pequeño">
				<table class="table responsive-table pequeño centered striped bordered highlight z-depth-3" cellspacing="0" width="100%" >
					<thead class="head1">
						<tr>
							<th style="border: 0; border-radius: 0px !important;">Nombre</th>
							<th style="border: 0; border-radius: 0px !important;">Valor</th>
							<th style="border: 0; border-radius: 0px !important; width: 20%">Acciones</th>
						</tr>
					</thead>
				<tbody id="listavariables"></tbody>
			</table>
		</div>
	</div>
</div>
</div>
<div class="modal-footer ">
<a class="modal-action waves-effect waves-green btn-flat z-depth-3" id="addprod">Agregar</a>
<a class="modal-action waves-effect waves-green btn-flat z-depth-3" id="editprod">Guardar</a>
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
<!-- <script src="../assets/js/jquery.mask.min.js?v=10.0.0.4"></script> -->