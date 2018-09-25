<div class="card card-block z-depth-5 pequeño">
    <ul class="collapsible" data-collapsible="accordion">

        <li class="hide">
              <div class="collapsible-header"><i class="mdi mdi-view-list"></i><h5>Características</h5></div>

              <div class="collapsible-body pequeño"><div class="card-block">

              </div></div>
        </li>

        <li>
              <div class="collapsible-header"> <i class="mdi mdi-group"></i><h5>Familias</h5></div>

              <div class="collapsible-body pequeño"><div class="card-block">
                    <div class="card-block" pmodulo="familias" vtbl="1" omit=",1," acc="3"></div>
              </div></div>
        </li>

        <li>
              <div class="collapsible-header"> <i class="mdi mdi-group"></i><h5>Tipos</h5></div>

              <div class="collapsible-body pequeño"><div class="card-block">
                    {section name=LE loop=$TIP}
                      
                    {/section}
              </div></div>
        </li>

        <li>
              <div class="collapsible-header"> <i class="mdi mdi-group"></i><h5>Marcas</h5></div>

              <div class="collapsible-body pequeño"><div class="card-block">
                    {section name=LE loop=$MAR}
                      
                    {/section}
              </div></div>
        </li>

        <li class="hide">
              <div class="collapsible-header"><i class="mdi mdi-arrow-up-drop-circle-outline"></i><h5>Tipos</h5></div>

              <div class="collapsible-body pequeño"><div class="card-block">

              </div></div>
        </li>

        <li class="hide">
              <div class="collapsible-header "><i class="mdi mdi-map-marker-circle"></i><h5>Marcas</h5></div>

              <div class="collapsible-body pequeño"><div class="card-block">

              </div></div>
        </li>

    </ul>
</div>