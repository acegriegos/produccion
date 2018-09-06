<ul class="collapsible" data-collapsible="accordion">
<li>
<div class="collapsible-header"><i class="small mdi mdi-seat-recline-normal"></i><h5>Mesas y Barras</h5></div>
<div class="collapsible-body pequeño card" id="frestaurantes-mesas">
    <input type="hidden" class="zelda">
    <div class="class-block">
            <div class="row pequeño">

                <div class="col s12 l6 pequeño row">
                    <div class="input-field col s12 pequeño">
                        <a class="prefix"><i class="small mdi mdi-magnify  mdi-24px gtext"></i></a>
                        <input type="text" id="search_restaurantes-mesas" maxlength="45" num="v801" var="0,1" autocomplete="off">
                        <label for="search_restaurantes-mesas">Buscar Mesa</label>
                    </div>
                    <div class="col s12 pequeño row">
                        <div class="input-field col s9">
                            <a class="prefix btn-floating btn2 add tooltipped z-depth-3" modulo="restaurantes-mesa" data-position="top" data-tooltip="Ingresar Mesa"><i class="small mdi mdi-plus mdi-24px"></i></a>
                            <input type="text" id="nombre-mesa" value="">
                            <label for="nombre-mesa">Nombre de Mesa</label>
                        </div>

                        <div class="col s3">
                            <input type="checkbox" id="vbarra" class="with-gap">
                            <label for="vbarra">Barra</label>
    
                            <select id="vidseccion" type="select">
                                <option value="0" selected disabled>Sección</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="col s12 m12 l6 pequeño">
                    <table class="table bordered pequeño highlight responsive-table z-depth-3 centered" id="data-table-restaurantes-mesas">
                        <thead>
                        <tr>
                            <th class="tab1" style="border: 0; border-radius: 0px !important;">Nombre</th>
                            <th class="tab1" style="border: 0; border-radius: 0px !important; width: 100%">Sección</th>
                            <th class="tab1" style="border: 0; border-radius: 0px !important;">Barra</th>
                            <th class="tab1" style="border: 0; border-radius: 0px !important; width: 100%">Acciones</th>
                        </tr>
                        </thead>
                        <tbody id="listarestaurantes-mesas">
                            
                        </tbody>
                    </table>
                    <ul class="left showing" modulo="801"><small></small></ul>
                    <ul class="pagination right" vtbl="801" modulo="restaurantes-mesas" filtro_sp="?,0,0"></ul>
                </div>
            </div>
        </div>
</div>
</li>

<li>
<div class="collapsible-header"><i class="small mdi mdi-table"></i><h5>Secciones</h5></div>
<div class="collapsible-body pequeño">
<div class="card card-block z-depth-3 pequeño row" id="frestaurantes-secciones">
    <input type="hidden" class="zelda">
    <div class="class-block">
        <h5>Secciones</h5>
            <div class="row pequeño">

                <div class="col s12 m12 l6 pequeño">
                    <div class="input-field col s12 pequeño">
                        <a class="prefix"><i class="small mdi mdi-magnify  mdi-24px gtext"></i></a>
                        <input type="text" id="search_tipousuarios" maxlength="45" num="+27" var="nombre">
                        <label for="search_tipousuarios">Buscar Sección</label>
                    </div>
                    <div class="col s12 pequeño input-field">
                        <a class="prefix btn-floating btn2 add tooltipped z-depth-3" modulo="restaurantes-seccione" data-position="top" data-tooltip="Ingresar Sección"><i class="small mdi mdi-plus mdi-24px"></i></a>
                        <input type="text" id="nombre-secc" value="">
                        <label for="nombre-secc">Nombre de Sección</label>
                    </div>
                </div>

                <div class="col s12 m12 l6 pequeño">
                    <table class="table bordered pequeño highlight responsive-table z-depth-3 centered" id="data-table-secciones" style="margin: 1%;">
                        <thead>
                        <tr>
                            <th class="tab1" style="border: 0; border-radius: 0px !important;">Nombre</th>
                            <th class="tab1" style="border: 0; border-radius: 0px !important; width: 100%">Acciones</th>
                        </tr>
                        </thead>
                        <tbody id="listasecciones">
                            {section name=LE loop=$SECCIONES}
                                <tr id="s_{$SECCIONES[LE][0]}">
                                <td style="padding: 10px; color:black">{$SECCIONES[LE][0]}</td>
                                    <a class="waves-effect waves-light delete gtext" modulo="restaurantes-mesa" id="d{$SECCIONES[LE][0]}"  title="Eliminar Mesa"><i class="mdi mdi-close left mdi-24px"></i></a>
                                </td>
                            </tr>
                            {/section}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</div>
</div>
</li>
<li>
    <div style="background-color: white;height: 75px;">
       <div class="row">
            <div class="col s2">
                <label>Inventario del Restaurante:</label>    
            </div>
            <div class="col s4">
                <select id="vinventario">
                    <option value="0" disabled>Seleccione un Inventario</option>
                    {section name=LE loop=$INV}
                    <option value="{$INV[LE][0]}">{$INV[LE][1]}</option>
                    {/section}
                </select>   
            </div>
            
           
       </div>
    </div>
</li>
</ul>