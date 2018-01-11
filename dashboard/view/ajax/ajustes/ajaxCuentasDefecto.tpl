<div class="card pequeño">
    
    <div class="card-block pequeño">
        <h3 class="center-align">Mantenimiento Cuentas</h3>
        <div class="z-depth-5" id="vcuentas">
            <div class="collection">

            <a class="collection-item blue" style="color: black;">
              <b><div class="row">
                <div class="col s4 left blue   white-text">
                    Nombre de la Cuenta
                </div>
                <div class="col s4 center blue white-text"> 
                    Número de la Cuenta
                </div>
                <div class="col s4 right blue  white-text">
                    Acciones
                </div>
              </div></b>
            </a>
            
            {section name=LE loop=$VCUE}
            <a href="#!" class="collection-item cuecon" style="max-height:220px;padding:0;padding-top: 2px; {if $VCUE[LE][4] neq 1}display: none;{/if}" deep="{$VCUE[LE][3]}" ndeep="{$VCUE[LE][4]}">
              <div class="row">
                <div class="col s4 left">
                    <input type="text" tp="{$VCUE[LE][0]}" class="editc" value="{$VCUE[LE][1]}" title="Editar Nombre" style="border: 0px; border-left:1px solid #e2e2e2;margin-bottom: 0px;{if $VCUE[LE][4] neq 1} margin-left: {math equation='x * y' x=2 y=$VCUE[LE][4]}%;{/if}" {if $VCUE[LE][4] eq 1} readonly {/if} maxlength="40">
                </div>
                <div class="col s4 numcon center" style="cursor: pointer; min-height: 40px; margin: 0 auto;">
                    {$VCUE[LE][2]}
                </div>
                <div class="col s4 right">

                    <input type="checkbox" class="ispadr" {if $VCUE[LE][4] eq 1} disabled {/if} id="ip{$VCUE[LE][0]}" title="Sub Cuenta" {if $VCUE[LE][5] eq 1} checked {/if}>
                    <label for="ip{$VCUE[LE][0]}"></label>
                    <i class="mdi mdi-plus mdi-24px" id="ac{$VCUE[LE][0]}" title="Agregar Cuenta"></i>
                    <i class="mdi mdi-delete mdi-24px" id="ec{$VCUE[LE][0]}" {if $VCUE[LE][4] eq 1} disabled {/if} title="Eliminar Cuenta"></i>
                </div>
              </div>
            </a>
            {/section}
            </div>
        </div>

        <br>
         <h3 class="center-align">Cuentas por Defecto Sistema</h3>

         <div class="row pequeño">

            <div class="col s12 pequeño">
            <table class=" pequeño centered highlight bordered responsive-table z-depth-5 " id="data-table-defecto">
            <thead>
                <th class="white-text blue" style="border: 0px;  border-radius: 0px !important">Nombre</th>
                <th class="white-text blue" style="border: 0px;  border-radius: 0px !important; width: 100%;">Cuenta</th>
                <th class="white-text blue" style="border: 0px;  border-radius: 0px !important; width: 100%;">Cambiar</th>
            </thead>
            <tbody>
             {section name=LE loop=$DCUE}
                <tr id="def{$DCUE[LE][0]}">
                    <td style="width:20%">{$DCUE[LE][4]} {$DCUE[LE][6]}</td>
                    <td style="width:50%" id="cta{$DCUE[LE][0]}" pr="{$DCUE[LE][1]}">{$DCUE[LE][2]}</td>
                    <td style="width:50%">
                      <input name="cta-def" type="radio" id="r{$DCUE[LE][0]}"/>
                      <label for="r{$DCUE[LE][0]}"></label>
                    </td>
                </tr>
            {/section}
            </tbody>
            </table>
            </div>
         </div>

         <div id="modal-defcta" class="modal bottom-sheet" style="min-height:520px;" >
            <div class="modal-content">
              <h4>Cambio de Cuenta por Defecto</h4>
              <br>
              <div class="input-field">
                  <select id="vdefecto">
                    <option value="0" disabled>Seleccione una Opción</option>
                    {section name=LE loop=$RCUE}
                        <option value="{$RCUE[LE][0]}">{$RCUE[LE][1]}</option>
                    {/section}
                </select>
                <label for="vdefecto" id="ldef-cta"></label>
            </div>
            </div>
            <div class="modal-footer">
              <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
            </div>
          </div>
         
    </div>
</div>
