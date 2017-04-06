<div class="row">
    <div class="input-field col s6 m4 l4">
        <input id="proceso" type="text" class="validate autocomplete">
        <input type="hidden" id="idproceso" value="0">
        <label for="proceso">Proceso</label>
    </div>
    <div class="input-field col s2 m2 l2">
        <input id="linea" type="text" class="validate">
        <label for="linea">Linea de Producción</label>
    </div>
    <div class="input-field col s4 m2 l2">
        <input id="cantidad" type="number" class="autocomplete">
        <label for="cantidad">Cantidad</label>
    </div>
</div>
<div class="row hide" id="inicio">
    <div class="col s7 m7 l7">
        <ul class="collection with-header" id="detproc">
            <li class="collection-header"><p class="marginzero" style="font-size: 1.5em;">Lista de Elementos para Inicio de Proceso</p></li>

        </ul>
    </div>
    <div class="col s5 m5 l5">
        <ul class="collection with-header" id="taskprod">
        <li class="collection-header"><p class="marginzero" style="font-size: 1.5em;">Lista de Tareas para Inicio de Proceso</p></li>
        <input type="hidden" id="o" value="1">
      </ul>
    </div>
    <!-- <div class="col s4 m4 l4">
        <span class="reloj" id="Horas">00</span>
        <span class="reloj" id="Minutos">:00</span>
        <span class="reloj" id="Segundos">:00</span>
        <span class="reloj hide" id="Centesimas">:00</span>
        <br>
        <input type="button" class="waves-effect waves-light btn blue" id="start" value="Inicio &#9658;">
        <input type="button" class="waves-effect waves-light btn blue" id="parar" value="Detener &#8718;" onclick="parar();" disabled>
        <input type="button" class="waves-effect waves-light btn blue" id="reinicio" value="Reiniciar &#8635;" onclick="reinicio();" disabled>
    </div> -->
</div>

<div id="modal-searchprodline" class="modal bottom-sheet">
    <div class="modal-content">
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
        <a class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
</div>