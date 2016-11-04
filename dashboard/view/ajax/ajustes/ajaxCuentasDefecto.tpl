<div class="card">
    
    <div class="card-block">
        <h3>Ingresar Cuenta</h3>
        <div class="input-group" modulo="scontabilidad">
            <div class="input-group-addon slide" cod="1"><b>Cuenta</b></div>
            
            <select class="form-control slide" cod="1" id="vgenero" lvl="0">
                <option value="0">Seleccione una Opción</option>
                {section name=LE loop=$CUE}
                    <option value="{$CUE[LE][0]}" num="{$CUE[LE][2]}">{$CUE[LE][1]}</option>
                {/section}
            </select>

            <div class="input-group-addon slide" cod="2" style="display:none"><b>Descripción</b></div>
            <input type="text" class="form-control slide" cod="2" style="display:none" id="vnombre" placeholder="Nombre Cuenta" maxlength="40">
            <div class="input-group-addon addglobal btn" title="Agregar Cuenta"><i class="fa fa-plus"></i></div>
            <div class="input-group-addon moveL btn" style="display:none"><i class="fa fa-arrow-left"></i></div>
            <div class="input-group-addon slider btn" style="display:none"><i class="fa fa-arrow-right"></i></div>
            <div class="input-group-addon" title="Cuenta Padre">
                <input type="checkbox" id="continuo" checked>
                <input type="hidden" id="vispadre" value="1">
            </div>
        </div><br>
         <h3>Modificar Cuentas</h3>
        <div id="vcuentas">
            <li class="list-group-item cuecon" style="cursor: pointer;">
              <b><div class="row">
                <div class="col-md-4 col-lg-4" align="center">
                    Nombre de la Cuenta
                </div>
                <div class="col-md-4 col-lg-4" align="right">
                    Número de la Cuenta
                </div>
                <div class="col-md-4 col-lg-4" align="right">
                    Acciones
                </div>
              </div></b>
            </li>
            {section name=LE loop=$VCUE}
            <li class="list-group-item cuecon" style="cursor: pointer;{if $VCUE[LE][4] neq 1}display: none;{/if}" deep="{$VCUE[LE][3]}" ndeep="{$VCUE[LE][4]}">
              <div class="row">
                <div class="col-md-4 col-lg-4" align="center">
                    <input type="text" tp="{$VCUE[LE][0]}" class="editc" value="{$VCUE[LE][1]}" title="Editar Nombre" style="border: 0px; width:100%; " {if $VCUE[LE][4] eq 1} readonly {/if}>
                </div>
                <div class="col-md-4 col-lg-4" align="right">
                    {$VCUE[LE][2]}
                </div>
                <div class="col-md-4 col-lg-4" align="right">
                    {if $VCUE[LE][4] neq 1}
                    <input type="checkbox" class="ispadr" id="ip{$VCUE[LE][5]}" {if $VCUE[LE][5] eq 1} checked {/if}>
                    <i class="fa fa-times btn" id="ec{$VCUE[LE][0]}" title="Eliminar Cuenta"></i>
                    {/if}
                </div>
              </div>
            </li>
            {/section}
        </div>
        <br>
         <h3>Cuentas por Defecto</h3>

        <div class="alert alert-danger err_" id="err1" style="display: none">
            <strong id="errm1"></strong>
        </div>
        <div class="alert alert-success suc_" id="suc1" style="display: none">
            <strong id="sucm1"></strong>
        </div>
    </div>
</div>