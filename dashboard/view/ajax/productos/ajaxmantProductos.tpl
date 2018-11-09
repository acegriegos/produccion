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
		<div class="col s2 m4 l7 per4102">
			<a id="addproduct" class="btn-floating waves-effect waves-light btn2 right z-depth-3 modal-trigger" href="#modal-productos" title="Agregar Producto"><i class="mdi mdi-plus"></i></a>
		</div>
	</div>
	<div class="row pequeño">
		<div class="col s12 m12 l12 pequeño">
			<table class="table centered striped bordered highlight z-depth-3 pequeño dt-responsive nowrap" cellspacing="0" width="100%" id="data-table-productos">
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
						<td style="padding: 10px;">{$PROD[LE][4]}</td>
						<td style="padding: 10px;">{$PROD[LE][5]}</td>
						<td style="padding: 10px;">{$PROD[LE][6]}</td>
						<td style="padding: 10px;">{$PROD[LE][7]}</td>
						<td>
							{if $smarty.session.BUSS eq 0} <a class="btn-color pbtn info mdi mdi-alert-circle mdi-24px blueh per4115  " id="info{$PROD[LE][0]}" href="#modal-info2" title="Mostrar Informacion del Producto"></a> {/if}
							<a class="btn-color pbtn descuentos per4103 mdi mdi-percent mdi-24px modal-trigger" id="desc{$PROD[LE][0]}" href="#modal-descuentos" title="Mostrar Descuentos del Producto"></a>
							{if $smarty.session.BUSS eq 0} <a class="btn-color pbtn salidainv per4116 mdi mdi-arrow-down-bold-box mdi-24px  modal-trigger  " id="s{$PROD[LE][0]}" href="#modal-movinventario" title="Movimiento de Inventario"></a> {/if}
							<a class="btn-color pbtn load mdi mdi-pencil mdi-24px per4108 modal-trigger" id="m{$PROD[LE][0]}" href="#modal-productos" title="Editar Producto" modulo="producto"></a>
							<a class="btn-color pbtn cdel delete  mdi mdi-close mdi-24px per4109" id="d{$PROD[LE][0]}" title="Eliminar Producto" modulo="producto"></a>
						</td>
					</tr>
					{/section}
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
			<li class="tab col s3 menuP but" id="tb3"><a class="white-text">Impuestos</a></li>
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

                </div>

                <div class="col s12 l4 row" style="margin:0px; padding: 0px">

                    <div class="input-field marginzero col s12">
                        <select type="select" id="vidunidad">
                            <option value="">Seleccione una Unidad</option>
                            {section name=LE loop=$UNI}
                            <option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>
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

                    {if $smarty.session.BUSS neq 0} 
                    {if $smarty.session.BUSS eq 3}
                        <div class="input-field marginzero col s12 hide" id="cantpro">
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

                </div>

                                
            </div>


            <div class="row">

            	{if $smarty.session.BUSS neq 0}
            	<div class="col s12 m12 l8"> 
                    <input type="hidden" id="vminimo" value="0">
                    <input type="hidden" id="vmaximo" value="0">
                </div>
                 {else}
                 <div class="row col s12 m12 l8">
	             	<div class="switch col s6">
	                    <label>
	                      <input type="checkbox" id="inventariado" class="isinv" checked>
	                      <span class="lever tooltipped	" data-tooltip="Llevar Control de Inventario del Producto" data-position="button"></span>
	                      Producto Inventariado
	                    </label>
	                </div>
	                <div class="input-field marginzero col s3 _inventariado">
	                    <input type="number" id="vminimo" class="formprod validate eder" value="" min="0" focus="1vmaximo" autocomplete="off" tabindex="7">
	                    <label for="vminimo">Mínimo</label>
	                </div>
	                <div class="input-field marginzero col s3 _inventariado">
	                    <input type="number" id="vmaximo" class="formprod validate eder" value="" min="0" focus="1vmaxdescuento" autocomplete="off" tabindex="8">
	                    <label for="vmaximo">Máximo</label>
	                </div>
	            </div>
                {/if}
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
            
            {if $smarty.session.BUSS eq 0}
            	 <input type="hidden" id="vidheredado" value="0">
           	{else}
           	<div class="row hide">
           		<input type="hidden" id="vidheredado" value="0">
           	</div>

            {/if}

            <div class="row marginzero">
                <div class="row col s12 switch">
                    <label class="col s4">
                      <input type="checkbox" id="variable" ische="{if $smarty.session.BUSS eq 1}3{else}1{/if}">
                      <span class="lever tooltipped " data-tooltip="Define si el Precio de Venta Varía Cuando Factura" data-position="button"></span>
                      Producto Variable
                    </label>
                </div>
                <div class="row col s12 switch">
                    <label class="col s4">
                      <input type="checkbox" id="pesaje">
                      <span class="lever tooltipped " data-tooltip="Define si el Producto varía por el Peso" data-position="button"></span>
                      Producto de Pesaje
                    </label>
                </div>
            {if $smarty.session.BUSS eq 3}
                <div class="row col s12 switch">
                    <label class="col s4">
                      <input type="checkbox" id="goldinventariado">
                      <span class="lever tooltipped " data-tooltip="Llevar Control de Inventario del Producto" data-position="button"></span>
                      Producto Inventariado
                    </label>
                </div>
            {/if}

            </div>

        </div>

        <div id="financiero" class="row hide" style="padding: 20px 10px 0 10px">
            
            <div class="center"><b>Precio General</b> <br><br> </div>
            <div class="row">

                <div class="col s12 l3 input-field">
                    <i class="mdi prefix moneda">¢</i>
                    <input type="text" id="vcosto" class="validate eder numeric cos calcvv" value="0.00" data-mask="9999999999.99" num="1" autocomplete="off" focus="vgganancia">
                    <label for="vcosto">Precio Costo</label>
                </div>

                <div class="col s12 l3 input-field">
                    <i class="mdi prefix">%</i>
                    <input type="text" id="vgganancia" class="validate calcvv eder numeric gan" value="0.00" data-mask="9999999999.99" focus="vventa" num="2" autocomplete="off">
                    <input type="hidden" id="vganancia" value="0" class="rgan">
                    <label for="vgganancia">Ganancia</label>
                </div>

                <div class="col s12 l3 input-field">
                    <i class="mdi prefix moneda">¢</i>
                    <input type="text" id="vventa" class="validate calcvv eder numeric ven" value="0.00" data-mask="9999999999.99" focus="vexoneracion" num="3" autocomplete="off">
                    <label for="vventa">Precio Venta</label>
                </div>

                <div class="col s12 l3 input-field">
                    <i class="mdi prefix">%</i>
                    <input type="text" id="vexoneracion" class="validate calcvv eder numeric exo" value="0.00" data-mask="9999999999.99" num="4" autocomplete="off">
                    <label>Exención</label>
                </div>

            </div>

            <tr> 
                <td><div class="switch {if $smarty.session.BUSS neq 0} hide {else} hide {/if}">
                        <label>
                            Cliente
                            <input type="checkbox" class="chg" value="1" checked>
                            <span class="lever"></span>
                            Categoria
                        </label>
                    </div></td>
                <td colspan="2" style="padding: 2%;"> <b class="chg0 {if $smarty.session.BUSS neq 0} hide {/if}">Precio por Categoría</b> <b class="chg1 hide">Precio por Cliente</b> </td>
            </tr>

            <table>
            {section name=LE loop=$NIV}
            <tr class="precionivel chg0 {if $smarty.session.BUSS neq 0} hide {/if}" id="f{$NIV[LE][0]}" style="border: 1px solid #e2e2e2">
                <td style="padding: 0px"><b>Categoria: {$NIV[LE][1]}</b></td>
                <td class="center-align input-field" style="padding: 0px">
                    <i class="mdi prefix">%</i>
                    <input type="text" id="vgganancia{$NIV[LE][0]}" class="validate calcvv eder gan numeric" value="0.00" data-mask="9999999999.99" num="2" style="margin: 0px">
                    <input type="hidden" id="vganancia{$NIV[LE][0]}" value="0" class="rgan">
                </td>
                <td class="center-align input-field {if $smarty.session.BUSS neq 0} hide {/if}" style="padding: 0px">
                    <i class="mdi prefix moneda">¢</i>
                    <input type="text" id="vventa{$NIV[LE][0]}" class="validate calcvv eder ven numeric" value="0.00" data-mask="9999999999.99" num="3" style="margin: 0px">
                </td>
                <td class="center-align input-field {if $smarty.session.BUSS neq 0} hide {/if}" style="padding: 0px">
                    <i class="mdi prefix">%</i>
                    <input type="text" id="vexoneracion{$NIV[LE][0]}" class="validate calcvv eder exo numeric" value="0.00"  num="4" style="margin: 0px">
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
                        <input type="text" id="vgganancia1" class="validate calcvv eder" value="0" data-mask="9999999999.99" focus="vventa" num="2" line="1" style="margin: 0px">
                        <input type="hidden" id="vganancia1" value="0">
                    </td> 
                    <td class="center-align input-field" style="padding: 0px">
                        <i class="mdi prefix moneda">¢</i>
                        <input type="text" id="vventa1" class="validate calcvv eder" value="0" data-mask="9999999999.99" focus="vexoneracion" num="3" line="1" style="margin: 0px">
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
            <div class="col s2"></div>
            <div class="row">
                <div class="col s12">
                    <ul class="collection z-depth-3" id="impuestos"></ul>
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
<!-- <script src="../assets/js/jquery.mask.min.js?v=10.0.0.70"></script> -->