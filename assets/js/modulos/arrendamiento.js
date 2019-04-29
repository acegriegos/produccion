$(function(){

	var ruta = getDatos('idruta',217,'idfila_enc = @@usr',0,0,0);
	if(ruta[0].length){
		$("#idruta").val(ruta[0][0][0]);
		$(".show_cliente").removeClass('hide');
		$("#idruta").parent().addClass('hide');
	}

	$("#idruta").change(function(){
		var id = $('option:selected',this).val();
		getDatos('',278,'1,'+id+',@@usr,0,0,@@impresa',0,0,0);
		$(this).addClass('hide');
		$(".show_cliente").removeClass('hide');
	});

	$("#ingclie").click(function(){
        $("#modal-clientes").modal('open');
        $("#c-ced").focus();        
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
    });

    $("#addclie").click(function(){
        // if($("#slideCorreo").data('fila1') == undefined && param.toString().match(new RegExp(/[145678]/i))){
        //     Materialize.toast('Correo sin Asignar',4000,'red');
        //     $("#slideCorreo").click();
        //     return false;
        // }
        var isprov =  0;
        var pr = getDatos('',172,'1,0,"'+$("#c-ap1").val()+'","'+$("#c-ap2").val()+'","'+$("#c-nom").val()+'","'+$("#c-ced").val()+'",'+$("#c-nom").attr('tipo')+',1,'+isprov+',0,500000,30,0,1,"",@@usr,30,"",0,@@impresa,@id,1,0,0,""',0,0,0);
        if(guardarSlide(1,pr,2)){
            Materialize.toast('Cliente Agregado Exitosamente',4000,'green');
            insertar(219,'','null,'+pr[0][0][0]+','+$("#idruta option:selected").val());
            $("#ncli").val($("#c-nom").val()+' '+$("#c-ap1").val()+' '+$("#c-ap2").val()+' *'+$("#c-ced").val()+'*');
            $("#slideDireccion").data('idbarrio',0);
            $("#slideDireccion").data('direccion','');
            $(".c-st").addClass('hide');
            $("#c-ced").val('');
            ind_2 = 0;
            ind_1 = 0;
            $("#modal-clientes").modal('close');
            $("#ncli").focus();
            var e = jQuery.Event("keyup");
            e.which = 13;
            $("#ncli").trigger(e);
        }
        
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

    $("#grubro").blur(function(){
        var isproveedor = 0;
        var idrubro = getDatos('vid',281,'vid > 0 and nombre = "'+$(this).val()+'"',0,0,0);

        if(idrubro[0].length){
        	$(this).attr('idrubro',idrubro[0][0][0]);
        	$("#gvalor").focus().select();
        }else {
        	var $toastContent = $('<span>Rubro no Existente</span>').add($('<button class="btn-flat toast-action green white-text addRubro">Agregarlo</button>'));
                Materialize.toast($toastContent, 5000);

            $(".addRubro").focus();
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
        searchClient($(this).val(),isproveedor);       
    });

    $("#addboleta").click(function(){
    	$("#modal-boleta").modal('open');
    	$("#bvalor").focus().select();
    });

    $("#shrutas").click(function(){
    	$("#modal-rutas").modal('open');
    	$("#chruta").val($("#idruta option:selected").val());
    });

    $("#chruta").change(function(){
    	var id = $('option:selected',this).val();
    	$("#idruta").val(id);
    	$("#ncli").val('').attr('idclie',0).blur();
    	$("#idboletas").val(0).change();
    	getDatos('',278,'1,'+id+',@@usr,0,0,@@impresa',0,0,0);
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
    	var fact = getDatos('',66,'1,0,1,2,1,'+$("#ncli").attr('idclie')+','+$("#btipo option:selected").val()+','+$("#bporcenntaje").val()+',0,'+$("#bvalor").val()+',0,0,0,0,'+$("#btime").val()+',"","",1,@@usr,@@impresa,"",0,"","",curdate(),1,"",0',0,0,0);

    	var detfact = getDatos('',67,'1,0,'+fact[0][0][0]+',-'+idserv[0][0][0]+',1,'+$("#bvalor").val()+',0,6,0,0,"",0,"","",0',0,0,0);

    	var vmonto = parseFloat($("#bvalor").val())*(parseFloat($("#bporcenntaje").val())/100);
    	var idestadocuenta = getDatos('',300,'1,0,2,1,'+fact[0][0][0]+',@@usr,'+vmonto+','+vmonto+',0,0,0,"",@@impresa,"",1,1,null',0,0,0);

    	var log = insertar(279,'','null,64,1,"Creación de Boleta",@@usr,now(),@@impresa,'+fact[0][0][0]);
    	Materialize.toast('Boleta Ingresada Correctamente',4000,'green');
    		
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

    $("#flujo").click(function(){
        $("#modal-flujo").modal('open');
        $("#grubro").val('').focus()      
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

function searchClient(vvariable,visprv){
    var clie = arr('login',4,'',63,'\"'+vvariable+'\",'+visprv+',@@impresa','',0,'');
    var strboletas = '<option value="0" selected disabled>Boletas</option>';

    if (clie[0][0][0] != 0) {
        var vclie = clie[0][0];
        $("#ncli").attr('idclie',vclie[0]);
        $("#ncli").val(vclie[1]+' '+vclie[2]);
        $("#addboleta").removeClass('hide');
        
        var boletasclie = getDatos('id,concat(consecutivo,"-",format(subtotal,2))',64,'id > 0 and idcliente = '+$("#ncli").attr('idclie'),0,0,0)[0];
        
        for (var i = 0; i < boletasclie.length; i++) {
        	strboletas += '<option value="'+boletasclie[i][0]+'">'+boletasclie[i][1]+'</option>';
        }

    }else{
       $("#ncli").attr('idclie',0);
       $("#addboleta").addClass('hide');
       $("#idboletas").change();

    }

    $("#idboletas").html(strboletas);
    Materialize.updateTextFields()
    
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

    for(var i=0;i<cantidad;i++){
        switch(mciclo){
          case 1:
            fila1 = fila1+'<div class="col s2 center" ><a class="grey btn-floating">'+(i+1)+'</a></div>';
            break;
          case 2:
            fila2 = fila2+'<div class="col s2 center" ><a class="grey btn-floating">'+(i+1)+'</a></div>';
            break;
          case 3:
            fila3 = fila3+'<div class="col s2 center" ><a class="grey btn-floating">'+(i+1)+'</a></div>';
            break;
          case 4:
            fila4 = fila4+'<div class="col s2 center" ><a class="grey btn-floating">'+(i+1)+'</a></div>';
            break;
          case 5:
            fila5 = fila5+'<div class="col s2 center" ><a class="grey btn-floating">'+(i+1)+'</a></div>';
            break;
          case 6:
            fila6 = fila6+'<div class="col s2 center" ><a class="grey btn-floating">'+(i+1)+'</a></div>';
            break;
          default:
	          console.log(i);
	            break;
	    }   

        if(((i+1)%30 == 1 && i > 1) || i == (cantidad-1)){
          $("#pagos").html(fila1+"</div> "+fila2+"</div>  "+fila3+"</div>  "+fila4+"</div>  "+fila5+"</div>  "+fila6+"</div>");
          
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
}