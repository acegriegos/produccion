<div class="card pequeño">
    
    <div class="card-block pequeño">
        
        <div style="float: right;width: 25%;margin:0px;padding: 0px" class="input-field">
          <i class="mdi mdi-magnify prefix"></i>
          <input type="text" id="bcuenta" style="padding: 0px;margin-top: 0px;margin-bottom: 0px" placeholder="Buscar Cuenta por Nosmbre">
        </div>
        <h3 class="center">Catálogo de Cuentas</h3>
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
            <a href="#!" class="collection-item cuecon" style="color:black;max-height:220px;padding:0;padding-top: 2px; {if $VCUE[LE][4] neq 1}display: none;{/if}" deep="{$VCUE[LE][3]}" ndeep="{$VCUE[LE][4]}">
              <div class="row">
                <div class="col s4 left">
                    <input type="text" tp="{$VCUE[LE][0]}" class="editc" value="{$VCUE[LE][1]}" title="Editar Nombre" style="border: 0px; border-left:1px solid #e2e2e2;margin-bottom: 0px;{if $VCUE[LE][4] neq 1} margin-left: {math equation='x * y' x=2 y=$VCUE[LE][4]}%;{/if}" {if $VCUE[LE][4] eq 1} readonly {/if} maxlength="40">
                </div>
              <div class="col s4 numcon center" style="cursor: pointer; min-height: 40px;">
                    {$VCUE[LE][2]}
                </div>
                <div class="col s4 right">
                    <i class="mdi mdi-plus mdi-24px" id="ac{$VCUE[LE][0]}" title="Agregar Cuenta"></i>
                    <i class="mdi mdi-delete mdi-24px {if $VCUE[LE][4] eq 1} disabled {/if} " id="ec{$VCUE[LE][0]}" title="Eliminar Cuenta"></i>
                </div>
              </div>
            </a>
            {/section}
            </div>
        </div>

        <br>
         <h3 class="center-align">Cuentas por Procesos del Sistema</h3>

         <div class="row">
            <a href="#subpro" id="pventas"  class="btn btn-success col s2 mp" mp=1  style="margin-left: 1%;margin-top: 1%;">Ventas</a>
            <a href="#subpro" id="pcobro"   class="btn btn-success col s2 mp" mp=3  style="margin-left: 1%;margin-top: 1%;">Cobros</a>
            <a href="#subpro" id="pcompras" class="btn btn-success col s2 mp" mp=2  style="margin-left: 1%;margin-top: 1%;">Compras</a>
            <a href="#subpro" id="ppagos"   class="btn btn-success col s2 mp" mp=4  style="margin-left: 1%;margin-top: 1%;">Pagos</a>
            <a href="#subpro" id="pdevo"    class="btn btn-success col s2 mp" mp=5  style="margin-left: 1%;margin-top: 1%;">Devoluciones</a>
            <a href="#subpro" id="pncre"    class="btn btn-success col s2 mp" mp=6  style="margin-left: 1%;margin-top: 1%;">Nota Crédito</a>
            <a href="#subpro" id="pndeb"    class="btn btn-success col s2 mp" mp=7  style="margin-left: 1%;margin-top: 1%;">Nota Débito</a>
            <a href="#subpro" id="pinve"    class="btn btn-success col s2 mp" mp=8  style="margin-left: 1%;margin-top: 1%;">Entrada Inventario</a>
            <a href="#subpro" id="pinvs"    class="btn btn-success col s2 mp" mp=9  style="margin-left: 1%;margin-top: 1%;">Salida Inventario</a>
            <a href="#subpro" id="pefecte"  class="btn btn-success col s2 mp" mp=10 style="margin-left: 1%;margin-top: 1%;">Entrada Efectivo</a>
            <a href="#subpro" id="pefects"  class="btn btn-success col s2 mp" mp=11 style="margin-left: 1%;margin-top: 1%;">Salida Efectivo</a>
         </div>
         
         <section id="subpro" class="row" style="padding-top: 1%;"></section>
         <section id="vistat" style="padding-top: 1%;width: 100%" class="hide">
          <select id="tmoneda"><option value="1">Colones (CRC)</option> <option value="2">Dolares (USD)</option></select>
           <table style="width: 50%;margin: 0px auto;" id="tbl1" class="hide atbl">
             <tr>
               <td></td>
               <td style="border-bottom: 1px solid black; border-right: 1px solid black; text-align: center"><b>DÉBITO</b></td>
               <td style="border-bottom: 1px solid black; text-align: center"><b>CRÉDITO</b></td>
               <td></td>
             </tr>
             <tbody id="cuerpoc">
              
               <tr>
                 <td style="padding: 0px">Bancos</td>
                 <td style="padding: 0px;border-right: 1px solid black;border-top: 1px solid black;"><select class="browser-default"><option>bancos</option></select></td>
                 <td style="padding: 0px;border-top: 1px solid black;"></td>
                 <td style="padding: 0px"></td>
               </tr>
               <tr>
                 <td style="padding: 0px">SERV. BANCARIO</td>
                 <td style="padding: 0px;border-right: 1px solid black;"><select class="browser-default"><option>datafonos</option></select></td>
                 <td style="padding: 0px"></td>
                 <td style="padding: 0px"></td>
               </tr>
               <tr>
                 <td style="padding: 0px"></td>
                 <td style="padding: 0px;border-right: 1px solid black;"></td>
                 <td style="padding: 0px"><select class="browser-default"><option>tarjetas</option></select></td>
                 <td style="padding: 0px">TARJETAS</td>
               </tr>
             </tbody>
           </table>
         </section>
    </div>
</div>
