<div class="card card-block z-depth-3 pequeño">

        <h5 class="head1 padding1 center">Mantenimiento de Rubros de Flujo de Caja</h5>

    <div class="row pequeño">
        <a id="ingRub" class="der btn-floating btn2 tooltipped z-depth-2" data-position="left" data-tooltip="Ingresar Rubro"><i class="mdi mdi-plus mdi-24px "></i></a>
        <table>
            <thead>
                <tr>
                    <th>Rubro</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            {section name=LE loop=$RUB}
            <tr>
                <td>{$RUB[LE][1]}</td>
                <td>{$RUB[LE][2]}</td>
                <td>
                    <i class="mdi mdi-24px mdi-pencil pbtn edi" id="a{$RUB[LE][0]}"></i>
                    <i class="mdi mdi-24px mdi-close pbtn del" id="b{$RUB[LE][0]}"></i>
                </td>
            </tr>
            {/section}
        </table>
    </div>
</div>

    <div id="modal-rubros" class="modal modal-fixed-footer">
      <div class="modal-header head3 center" style="height: 36px;"><span id="btit">Rubro</span></div>

      <div class="modal-content" style="padding: 0px">

      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
        <a href="#!" class="modal-action waves-effect waves-green btn-flat" id="dosrubro">Aceptar</a>
      </div>
    </div>

    <div id="modal-labonos" class="modal modal-fixed-footer">
      <div class="modal-header head3 center" style="height: 36px;"><span id="btit">Rubro</span></div>

      <div class="modal-content" style="padding: 0px">
        
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
      </div>
    </div>

    <div id="modal-lprestamos" class="modal modal-fixed-footer">
      <div class="modal-header head3 center" style="height: 36px;"><span id="btit">Rubro</span></div>

      <div class="modal-content" style="padding: 0px">
        
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
      </div>
    </div>

    <div id="modal-lflujo" class="modal modal-fixed-footer">
      <div class="modal-header head3 center" style="height: 36px;"><span id="btit">Rubro</span></div>

      <div class="modal-content" style="padding: 0px">
        
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
      </div>
    </div>
