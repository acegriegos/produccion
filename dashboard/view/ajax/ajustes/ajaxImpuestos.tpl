<div class="card">
    <h3 class="card-block">Impuestos</h3>
    <div class="card-block">
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
                <label for="vvalor">Valor de impuesto</label>
                <button type="button" class="btn btn-primary der z-depth-5 blue add" modulo="impuesto" id="addimp">Agregar</button>
            </div>
            <div class="col s12 m5 l5">
                <table class="table responsive-table centered striped bordered highlight z-depth-5" id="data-table-impuestos" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 25%">Nombre</th>
                            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 25%">Abreviatura</th>
                            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 25%">Valor</th>
                            <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important; width: 20%" >Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaimpuestos">
                    {section name=LE loop=$IMP}
                        <tr>
                            <td style="width: 10%">{$IMP[LE][1]}</td>
                            <td style="width: 10%">{$IMP[LE][2]}</td>
                            <td style="width: 10%">{$IMP[LE][3]}</td>
                            <td style="width: 10%">
                                <a class="load material-icons pbtn btn-color" id="m{$IMP[LE][0]}" modulo="impuesto">edit</a>
                                <a class="delete material-icons pbtn btn-color cdel" modulo="impuesto" id="d{$IMP[LE][0]}">delete</a>
                            </td>
                        </tr>
                    {/section}
                    </tbody>
                </table>   
            </div>
        </div>
    </div>
</div>