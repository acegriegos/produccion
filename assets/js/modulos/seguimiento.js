$(function(){
	getinproduction(1);
});

$(document).on("click","#inprocess",function(){
	var acc = $(this).attr('acc');
	if (acc == 1) {
		$("#process1").addClass('hide');
		$(this).text('keyboard_arrow_down');
		$(this).attr('acc',2);
	}else{
		$("#process1").removeClass('hide');
		$(this).text('keyboard_arrow_up');
		$(this).attr('acc',1);
	}
});

$(document).on("click","#inpause",function(){
	var acc = $(this).attr('acc');
	if (acc == 1) {
		$("#process2").addClass('hide');
		$(this).text('keyboard_arrow_down');
		$(this).attr('acc',2);
	}else{
		$("#process2").removeClass('hide');
		$(this).text('keyboard_arrow_up');
		$(this).attr('acc',1);
	}
});

$(document).on("click",".next",function(){
	var id = $(this).attr('id').substr(1);
	
});

function getinproduction(idaccion) {
	var p = arr('login',4,'',151,idaccion,0,0,0)[0][0];
	if (p != undefined) {
		$("#process"+idaccion).append('<div class="col s6 m6 l6"><table class="table responsive-table centered striped bordered highlight z-depth-5" id="data-table-producciones" cellspacing="0" width="100%" ><thead><tr><th colspan="3" class="white-text grey lighten-1" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">'+p[3]+'</th><th colspan="1" class="white-text grey lighten-1" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Cantidad: <span id="c'+p[0]+'">'+p[3]+'</span></th></tr><tr><th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Tarea Actual</th><th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Inicio</th><th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Tiempo Estimado</th><th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Acciones</th></tr></thead><tbody id="detprod'+p[0]+'"><tr><td>'+p[7]+'</td><td>'+p[8]+'</td><td>'+p[9]+'</td><td><i class="material-icons pbtn btn-color next" id="s'+p[0]+'"  title="Siguiente">forward</i><i class="material-icons pbtn btn-color pausepr" id="p'+p[0]+'" title="Pausar">pause</i><i class="material-icons pbtn btn-color finish" id="t'+p[0]+'" title="Terminar">done</i></td></tr></tbody></table></div>');
	}else{
		$("#process"+idaccion).append('<div class="card orange lighten-4 center marginzero rounded" style="height: 35px"><p>No Se Encuentran Procesos Activos</p></div>');
	}
}