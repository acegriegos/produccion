var config1 = {
    type: 'doughnut',
    data: {
        labels: ['a','b','c','d','e'],
        datasets: [{
            label: 'Al Día',
            data: ['10','20','15','5','30'],
            backgroundColor: [
            "rgba(70,191,189,0.7)",
            "rgba(247,70,74,0.7)",
            "rgba(148,159,177,0.7)",
            "rgba(253,180,92,0.7)",
            "rgba(180,253,92,0.7)"
            ]
        }],
    },
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Grafico 1'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
};

$(function(){
	var ctx = $("#chartG1");
    var myChart = new Chart(ctx, config1);

});

$(document).on("click","#Iadd",function(){
	deadclear('comercial')

});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'comercial':
			if (vmodulo['tip'] == '') {
				err = validarcomercial();
				if ( err ) {
					return err;
				}
			}
			
			break;
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarcomercial() {


	return false;
}

function endDetail(vid){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'comercial':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 3;
			vmodulo['where'] ='';
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	
	return vmodulo;
}

function cargarSintax(){
	var arr = {}

	arr['sel'] = '';
	arr['tbl'] = 4;
	arr['where'] = '';

	return arr;
}


function endDetail(vid) {
	setTimeout(function(){ console.log('Registro Ingresado') }, 2000);
	return false;
}