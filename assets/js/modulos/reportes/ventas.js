$(function(){
	arr('login',6,'',167,'0,1,@@impresa,0,0,0,0,"1990-01-01","1990-01-01",0,0',0,1,$(".detrep"));
	// $(".zelda").data('triforce',{vidcliente:0,vidusuario:0,vnum1:0,vnum2:2,vdesde:'',vhasta:'',vidtipo:0});
});

// $(document).on("blur","#nclie",function(){
// 	var id = arr('login',4,'id',2,'concat(nombre," ",apellido1," ",apellido2) like \"%'+$(this).val()+'%\"',0,0,0)[0][0];
// 	if (id != undefined) {
// 		$(".zelda").data('triforce')['vidcliente'] = id;
// 	}else{
// 		$(".zelda").data('triforce')['vidcliente'] = 0;
// 	}
// });

// $(document).on("blur","#nuser",function(){
// 	var id = arr('login',4,'id',1,'nombre = \"%'+$(this).val()+'%\" or user = \"%'+$(this).val()+'%\"',0,0,0)[0][0];
// 	if (id != undefined) {
// 		$(".zelda").data('triforce')['vidusuario'] = id;
// 	}else{
// 		$(".zelda").data('triforce')['vidusuario'] = 0;
// 	}
// });

// $(document).on("keyup","#num1",function(e){
// 	var charCode = e.which || e.keyCode;
// 	var charStr = String.fromCharCode(charCode);

// 	if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode != 8) {
// 		$(".zelda").data('triforce')['vnum1'] = id;
// 	}
// });

// $(document).on("keyup","#num2",function(e){
// 	var charCode = e.which || e.keyCode;
// 	var charStr = String.fromCharCode(charCode);

// 	if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode != 8) {
// 		$(".zelda").data('triforce')['vnum2'] = $(this).val();
// 	}
// });

//quede x aqui, pasar elem x data