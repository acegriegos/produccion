$(function(){
	var tiempos = arr('login',4,'1',150,'idaccion <> 3',0,0,0)[0];
	for (var i = 1, len = tiempos.length; i < len; i++) {
		$("#process").append('<span class="reloj" id="horas'+i+'">00</span><span class="reloj">:</span><span class="reloj" id="minutos'+i+'">00</span><span class="reloj">:</span><span class="reloj" id="segundos'+i+'">00</span><br>');
	}

	setInterval(function(){
		var segundos = arr('login',4,'date_format(timediff(now(),fecha),"%S")',150,'idaccion <> 3',0,0,0);
		var minutos = arr('login',4,'date_format(timediff(now(),fecha),"%i")',150,'idaccion <> 3',0,0,0);
		var horas = arr('login',4,'date_format(timediff(now(),fecha),"%H")',150,'idaccion <> 3',0,0,0);
		for (var i = 0, len = tiempos.length; i < len; i++) {
			var id = i + 1;
			$("#segundos"+id).text(segundos[0][i]);
			$("#minutos"+id).text(minutos[0][i]);
			$("#horas"+id).text(horas[0][i]);
		}
	}, 1000);

});