<div class="row">
    <div class="col s6 m6 l6">
        
    </div>
    <div class="col s6 m6 l6">
        <span class="reloj" id="Horas">00</span>
        <span class="reloj" id="Minutos">:00</span>
        <span class="reloj" id="Segundos">:00</span>
        <span class="reloj" id="Centesimas">:00</span><br>
        <input type="button" class="waves-effect waves-light btn blue" id="inicio" value="Start &#9658;" onclick="inicio();">
        <input type="button" class="waves-effect waves-light btn blue" id="parar" value="Stop &#8718;" onclick="parar();" disabled>
        <input type="button" class="waves-effect waves-light btn blue" id="continuar" value="Resume &#8634;" onclick="inicio();" disabled>
        <input type="button" class="waves-effect waves-light btn blue" id="reinicio" value="Reset &#8635;" onclick="reinicio();" disabled>
    </div>
</div>