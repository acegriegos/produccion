$(function(){

	var ruta = getDatos('idruta',217,'idfila_enc = @@usr',0,0,0);
	if(ruta[0].length){
		$("#idruta").val(ruta[0][0][0]);
		$(".show_cliente").removeClass('hide');
		$("#idruta").parent().addClass('hide');

        // <img src="images/yuna.jpg" alt="" class="circle">
        var lrcliente = getDatos('',285,ruta[0]+',@@impresa',0,0,0)[0];
        var salida = '';
        for (var i = 0; i < lrcliente.length; i++) {
            salida += '<li class="collection-item avatar" id="x'+lrcliente[i][0]+'"><i class="mdi mdi-24px mdi-account circle"></i><span class="title">'+lrcliente[i][1]+'</span><p>UNO<br>DOS</p><a href="#!" class="secondary-content"></a></li>' //<i class="mdi mdi-24px mdi-star"></i></a></li>
        }
        $("#lclientes").html(salida);
	}

	$("#idruta").change(function(){
		var id = $('option:selected',this).val();
		getDatos('',278,'1,'+id+',@@usr,0,0,@@impresa',0,0,0);
		$(this).addClass('hide');
		$(".show_cliente").removeClass('hide');
	});

    $("#abonar").click(function(){
        $("#modal-abono").modal('open');
        $("#vabono").val($("#cuota").html().replace(/,/g,'')).focus().select();      
    });

    $("#vabono").keyup(function(e){
    	var code = e.wich || e.keyCode;
    	if (code == 13) {
    		$("#doabono").click();
    	}
    });

    $("#doabono").click(function(){
    	var vmonto = parseFloat($("#vabono").val());
    	monto = isNaN(vmonto) ? 0 : vmonto;
    	var limite = 0;
    	if (vmonto <= limite) {
    		Materialize.toast('Valor de Abono debe ser mayor a '+limite,4000,'red');
    		return false;
    	}
    	var idestadocuenta = getDatos('',300,'1,0,3,1,'+$("#idboletas option:selected").val()+',@@usr,'+vmonto+',0,'+vmonto+',0,0,"",@@impresa,"",1,1,null',0,0,0);
    	Materialize.toast('Abono Realizado Correctamente',4000,'green');
    	$("#modal-abono").modal('close');

        getcolordias()
    });

    $("#grubro").keydown(function(e){
        var charCode = e.which //|| e.keyCode;
        var charStr = keysight(e);
        
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            
            $(".autocomplete-content").remove();
            $("#grubro").autocomplete({
                limit: 20,
                data: getDatos('nombre as nom,null',2,'vid > 0 and find_in_set(idsucursal,concat("-1,",@@impresa)) and !idtiporubro having nom like "%'+busqueda+'%" limit 20',0,0,0,1)
            });

            $("#grubro").siblings($(".autocomplete-content")).css('width','50%');
        }
    });

     $("#grubro").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $(this).blur()
        }
    });

    $("#ncli").keydown(function(e){
        var charCode = e.which //|| e.keyCode;
        var charStr = keysight(e);
        
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            
            $(".autocomplete-content").remove();
            $("#ncli").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'!bisproveedor and id > 0 and find_in_set(idsucursal,concat("-1,",@@impresa)) and id in(select idcliente from rutaclientes where idruta = '+$("#idruta option:selected").val()+') having nom like "%'+busqueda+'%" limit 20',0,0,0,1)
            });

            $("#ncli").siblings($(".autocomplete-content")).css('width','100%');
        }
    });

    $("#ncli").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            // var isproveedor = param.toString().match(new RegExp(/[23]/i)) ? 1 : 0;
            // searchClient($(this).val(),isproveedor);
            $(this).blur()
        }
    });

    $("#ncli").blur(function(){
        var isproveedor = 0;
        searchClient();       
    });

    $("#addboleta").click(function(){
    	$("#modal-boleta").modal('open');
    	$("#bvalor").focus().select();
    });

    $(".cprecio").keyup(function(e){
    	var precio = $("#bvalor").val();
    	var interes = $("#bporcenntaje").val();
    	var tiempo = $("#btime").val();
    	
    	precio = isNaN(precio) ? 0 : parseFloat(precio);
    	interes = isNaN(interes) ? 0 : parseFloat(interes);
    	tiempo = isNaN(tiempo) ? 0 : parseFloat(tiempo);

    	var tot = precio*((interes/100)+1);
    	var cuot = tot/tiempo;

    	$("#btotal").val(tot.formatMoney(2,'.',','))
    	$("#bcuota").val(cuot.formatMoney(2,'.',','))
    });

    $("#saveboleta").click(function(){
    	var idserv = getDatos('id',16,'idsucursal = @@impresa',0,0,0);
    	if (!idserv[0].length) {
    		Materialize.toast('No se a Registrado Servicio de Prestamo',4000,'red');
    		return false;
    	}
    	var fact = getDatos('',66,'1,0,1,2,1,'+$("#cliename").attr('idclie')+','+$("#btipo option:selected").val()+','+$("#bporcenntaje").val()+',0,'+$("#bvalor").val()+',0,0,0,0,'+$("#btime").val()+',"","",1,@@usr,@@impresa,"",0,"","",curdate(),1,"",0',0,0,0);

    	var detfact = getDatos('',67,'1,0,'+fact[0][0][0]+',-'+idserv[0][0][0]+',1,'+$("#bvalor").val()+',0,6,0,0,"",0,"","",0',0,0,0);

    	var vmonto = parseFloat($("#bvalor").val())*(parseFloat($("#bporcenntaje").val())/100);
    	var idestadocuenta = getDatos('',300,'1,0,2,1,'+fact[0][0][0]+',@@usr,'+vmonto+','+vmonto+',0,0,0,"",@@impresa,"",1,1,null',0,0,0);

    	var log = insertar(279,'','null,64,1,"Creación de Boleta",@@usr,now(),@@impresa,'+fact[0][0][0]);
    	Materialize.toast('Boleta Ingresada Correctamente',4000,'green');
        var strboletas = '<option value="0" selected disabled>Tarjetas</option>';

        var boletasclie = getDatos('id,concat("-",format(subtotal,2))',64,'id > 0 and idcliente = '+$("#cliename").attr('idclie'),0,0,0)[0];
        
        for (var i = 0; i < boletasclie.length; i++) {
            strboletas += '<option value="'+boletasclie[i][0]+'">'+(i+1)+boletasclie[i][1]+'</option>';
        }

        $("#idboletas").html(strboletas);  
    		
    });

    $("#idboletas").change(function(){
    	var id = $('option:selected',this).val();

    	if(parseInt(id)){
			var listado = getDatos('',280,id,0,0,0)[0][0];
			$("#prestamo").html(listado[0]);
			$("#cuota").html(listado[1]);
			$("#finic").html(listado[2]);
			$("#ffin").html(listado[3]);
			$("#saldo").html(listado[4]);
			$("#positivo").html(listado[5]);
			$("#ccuota").html(listado[6]);

			pagos(parseInt(listado[6]));
            getcolordias();
			$(".abon").removeClass('hide');
		}else{
			$("#prestamo").html('--');
			$("#cuota").html('--');
			$("#finic").html('--');
			$("#ffin").html('--');
			$("#saldo").html('--');
			$("#positivo").html('--');
			$("#ccuota").html('--');

			pagos(0);
			$(".abon").addClass('hide');
		}


    });

    $(".avatar").click(function(){
        $("#tarjeta").removeClass('hide')
        $("#base").addClass('hide');
        $("#cliename").html($(this).find(".title").html()).attr('idclie',$(this).attr('id').substr(1));

        searchClient()
    });

    if($("#ncli:visible").length)
    	$("#ncli").focus();	
});

$(document).on('click','.addRubro',function(){
	var rubro = getDatos('',282,'1,0,"'+$("#grubro").val()+'",@@impresa,0',0,0,0)
	if(rubro.succed){
		Materialize.toast('Rubro Ingresado Correctamente',4000,'green');
		$("#grubro").attr('idrubro',rubro[0][0][0])
	}else{
		Materialize.toast(rubro[0]['ERROR'],4000,'red');
		$("#grubro").attr('idrubro',0)
	}
});

$(document).on('click','.pdia',function(){
    var num = parseInt($(this).html());
    var pdias = $(".pdia.grey").filter(function(){
        return parseInt($(this).html()) <= num;
    });

    if(pdias.length > 0){
        var vl = pdias.length * parseFloat($("#cuota").html().replace(/,/g,''))
        $("#modal-abono").modal('open');
        $("#vabono").val(vl).focus().select();
        pdias.removeClass('grey').addClass('orange');    
    }
       
});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'arrendamiento':
			if (vmodulo['tip'] == '') {
				err = validararrendamiento();
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

function validararrendamiento() {


	return false;
}

function endDetail(vid,vacc,modulo){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'arrendamiento':
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

function searchClient(){
    clie = $("#cliename").attr('idclie');
    var strboletas = '<option value="0" selected disabled>Tarjetas</option>';

    if (clie != 0) {

        $("#addboleta").removeClass('hide');
        
        var boletasclie = getDatos('id,concat("-",format(subtotal,2))',64,'id > 0 and idcliente = '+$("#cliename").attr('idclie'),0,0,0)[0];
        
        for (var i = 0; i < boletasclie.length; i++) {
        	strboletas += '<option value="'+boletasclie[i][0]+'">'+(i+1)+boletasclie[i][1]+'</option>';
        }

    }else{
       $("#addboleta").addClass('hide');
       $("#idboletas").change();

    }

    $("#idboletas").html(strboletas);    
}

function pagos(cantidad){
	$("#pagos").html('');

	var fila1 = '<div class="row container" style="margin-bottom: 10px">';
    var fila2 = '<div class="row container" style="margin-bottom: 10px">';
    var fila3 = '<div class="row container" style="margin-bottom: 10px">';
    var fila4 = '<div class="row container" style="margin-bottom: 10px">';
    var fila5 = '<div class="row container" style="margin-bottom: 10px">';
    var fila6 = '<div class="row container" style="margin-bottom: 10px">';
    var mciclo = 1;
    var fstr = '';

    for(var i=0;i<cantidad;i++){
        switch(mciclo){
          case 1:
            fila1 = fila1+'<div class="col s2 center"><a class="grey btn-floating pdia">'+(i+1)+'</a></div>';
            break;
          case 2:
            fila2 = fila2+'<div class="col s2 center"><a class="grey btn-floating pdia">'+(i+1)+'</a></div>';
            break;
          case 3:
            fila3 = fila3+'<div class="col s2 center"><a class="grey btn-floating pdia">'+(i+1)+'</a></div>';
            break;
          case 4:
            fila4 = fila4+'<div class="col s2 center"><a class="grey btn-floating pdia">'+(i+1)+'</a></div>';
            break;
          case 5:
            fila5 = fila5+'<div class="col s2 center"><a class="grey btn-floating pdia">'+(i+1)+'</a></div>';
            break;
          case 6:
            fila6 = fila6+'<div class="col s2 center"><a class="grey btn-floating pdia">'+(i+1)+'</a></div>';
            break;
          default:
	          console.log(i);
	            break;
	    }   

        if(((i+1)%30 == 1 && i > 1) || i == (cantidad-1)){
          fstr += fila1+"</div> "+fila2+"</div>  "+fila3+"</div>  "+fila4+"</div>  "+fila5+"</div>  "+fila6+"</div>";
          
          fila1 = '<div class="row container" style="border-top:1px solid #e2e2e2">';
          fila2 = '<div class="row container">';
          fila3 = '<div class="row container">';
          fila4 = '<div class="row container">';
          fila5 = '<div class="row container">';
          fila6 = '<div class="row container">';
          mciclo = 6;
        }

        mciclo = mciclo+1 > 6 ? 1 : mciclo+1;
        
      }

      $("#pagos").html(fstr)
}

function getcolordias(){ 
    var vid = $("#idboletas option:selected").val()
    var cdias = getDatos('',286,vid,0,0,0);
    if(cdias[0].length){
        var pdiasV = $(".pdia.grey").filter(function(){
            return parseInt($(this).html()) <= cdias[0][0][1]
        });
        pdiasV.removeClass('grey').addClass('green');

        pdiasV = $(".pdia.grey").filter(function(){
            return parseInt($(this).html()) <= cdias[0][0][0]
        });
        pdiasV.removeClass('grey').addClass('orange');
    }
}