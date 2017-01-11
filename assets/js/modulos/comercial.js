var config1 = {
    type: 'bar',
    data: {
        labels: ['Al Día','1 Mes','2 Meses','3 Meses','+4 Meses'],
        datasets: [{
            label: 'Morosidad Clientes',
            data: ['80000','200000','300000','400000','500000'],
            backgroundColor: [
            "#9c27b0",
            "#3f51b5",
            "#2196f3",
            "#03a9f4",
            "#00bcd4 "
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
            text: 'Reporte de Ventas'
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