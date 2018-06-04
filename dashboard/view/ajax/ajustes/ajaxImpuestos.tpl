<div class="card pequeño">
    <h3 class="card-block center-align">Impuestos</h3>
    <div class="card-block pequeño">
        <div class="row" id="fimpuestos">
            <div class="input-field col s12 m3 l3">
                <input type="text" class="validate" id="vnombre">
                <label for="vnombre">Nombre de Impuesto</label>
                <input type="hidden" id="vid" value="0">
            </div>
            <div class="input-field col s12 m2 l2">
                <input type="text" class="validate" id="vresumen">
                <label for="vresumen">Abreviatura de Impuesto</label>
            </div>
            <div class="input-field col s12 m2 l2">
                <input type="number" class="validate" id="vvalor" placeholder="%">
                <label for="vvalor" style="margin-left: 4%;">Valor de impuesto</label>
                <button type="button" class="btn btn-primary der z-depth-3 btn1 add" modulo="impuesto" id="addimp">Agregar</button>
                <br>
            </div>
            <div class="col s12 m5 l5 pequeño ">
            <br>
                <table class="table  pequeño responsive-table centered striped bordered highlight z-depth-3" id="data-table-impuestos" cellspacing="0" width="100%" >
                    <thead class="tab1">
                        <tr>
                            <th style="border: 0; border-radius: 0px !important; ">Nombre</th>
                            <th style="border: 0; border-radius: 0px !important; ">Abreviatura</th>
                            <th style="border: 0; border-radius: 0px !important; ">Valor</th>
                            <th style="border: 0; border-radius: 0px !important; " >Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaimpuestos">
                    {section name=LE loop=$IMP}
                        <tr>
                            <td style="width: 10%">{$IMP[LE][1]}</td>
                            <td style="width: 10%">{$IMP[LE][2]}</td>
                            <td style="width: 10%">{$IMP[LE][3]}</td>
                            <td style="width: 10%">
                                <a href="#modal-vimpuestos" class="mdi-24px mdi vimpuesto mdi-playlist-plus pbtn btn-color modal-trigger" id="v{$IMP[LE][0]}" title="Ver Asignaciones del Impuesto"></a>
                                <a class="load mdi-24px mdi mdi-playlist-check pbtn gtext" id="m{$IMP[LE][0]}" modulo="impuesto" title="Editar Impuesto"></a>
                                <a class="delete mdi-24px mdi mdi-playlist-remove pbtn gtext cdel" modulo="impuesto" id="d{$IMP[LE][0]}" title="Eliminar Impuesto"></a>
                            </td>
                        </tr>
                    {/section}
                    </tbody>
                </table>   
            </div>
        </div>
    </div>

    <div id="modal-vimpuestos" class="modal modal-fixed-footer grandemodal" style="width:70%;height:90%">
    <div class="modal-header head2 padding1">
        <h5 class="modal-title center-align">Asignaciones de Impuesto</h5>
    </div>
    <div class="container">
    <ul class="collapsible" data-collapsible="accordion">
    
    <li>                             
    <div class="collapsible-header">
        <a class="catimpuesto gtext"><i class="mdi mdi-clipboard-account mdi-24px"></i> Cliente Físicos o Jurídicos</a>
    </div>
    <div class="collapsible-body">
     <table  class="table tabladetalles bordered striped centered highlight bordered dt-responsive nowrap z-depth-3" id="data-table-impuesto" style="width: 100%">
            <thead class="tab1">
                <tr>
                    <th class="sinborde" style="width: 50%; border: none;" >Nombre</th>
                    <th class="sinborde" style="width: 50%; border: none;" >Cédula</th>
                   
                </tr>
            </thead>
            <tbody id="listaimpuesto">
              <!-- AJAX -->
           </tbody>
       </table>
    </div>
    </li>
    <li>
    <div class="collapsible-header gtext">
        <a class="gtext"><i class="mdi-clipboard-text mdi mdi-24px"></i> Productos</a>
    </div>
    <div class="collapsible-body">
        <span>Lorem ipsum dolor sit amet.</span>
    </div>
    </li>
        
      </ul>
      </div>
        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-light waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
        </div>
    </div>
</div>