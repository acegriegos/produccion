$(function(){
	
});

function validar (varreglo) {
	var salida = {}

	/*VALIDACION FRONT END Y SI SE PUEDE AJAX*/

	for (var i = 0; i < varreglo.length; i++) {
		salida[varreglo[i]] = 2;
	};

	return salida;

}