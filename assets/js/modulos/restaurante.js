$(function(){
	$("#ffacturas .zelda").data()['idmesa'] = 0;

	 $("#descp").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)
       
        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            var tipo = getParameterByName('tf');
            $(".autocomplete-content").remove();
            
            $("#descp").autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+busqueda+'",6,@@impresa',0,0,0,1)
            })

            $("#descp").siblings($(".autocomplete-content")).css('width','100%');
        }
    });

    $("#codp").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)

        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            $(".autocomplete-content").remove();
            
            $(this).autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+busqueda+'",6,@@impresa',0,0,0,1)
            })

            $(this).siblings($(".autocomplete-content")).css('width','50%');
        }
    });

    $("#cantp").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $("#addline").click();
        }
    });

    $("#codp").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $(this).blur();
        }
    });

    $("#codp").blur(function(){
       cargarProducto($(this).val(),$(this));
    });

    $("#descp").blur(function(){
        cargarProducto($(this).val(),$(this));
    });

    $("#descp").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $(this).blur();
        }
    });

    $("#showprod").click(function(){
    	if($(".sprod").is(":visible"))
    		$(".sprod").addClass('hide')
    	else{
    		$(".sprod").removeClass('hide')
    		$("#descp").focus();
    	}
    });

	$(".mesa").click(function(){
		var estado = parseInt($(this).attr('estado'));
		switch(estado){
			case 5:
				Materialize.toast('Tomando Pedido en Mesa',4000,'red');
				break;
			case 1:
				var id = $(this).attr('id').substr(1);
				$("#ffacturas .zelda").data('triforce',{vidtipo:1, vidtipoventa:6, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : 0,vidusuario:'',vidtipopago:0,vidodt:0,vajuste:0, idline:0,  saldo : 0, notific : 0,tmpcorreo:'',videxoneracion:''});
				$("#modal-mesa").modal('open');
				$("#tipos").html('').hide();
				$("#productos").html('').hide();
				$("#ffacturas .zelda").data()['idmesa'] = id;
				$("#tit").html('MESA '+$(this).attr('nmesa'));
				actualizar(800,'idtipoocupado=5','id='+id);
				break;
			default:
				break;
		}
		
	});

	$("#modal-mesa").modal({
		dismissible:false,
		complete: function(){
			var id = $("#ffacturas .zelda").data('idmesa');
			actualizar(800,'idtipoocupado=case idtipoocupado when 5 then 1 else idtipoocupado end','id='+id);
		}
	});

	$("#bmesas").keyup(function(e){
		var valor = $(this).val().trim().length ? $(this).val() : 0;
		var haslines = valor ? $("[nmesa*="+valor+"]").length : 0;
		if (haslines) {
			$("[nmesa]").hide();
			$("[nmesa*="+valor+"]").show();
		}else
			$("[nmesa]").show();
	});

	$(".fam").click(function(){
		var id = $(this).attr('id').substr(1);
		$("#tipos").html('').slideUp();
		$("#productos").html('').slideUp();

		if (id==='salir') {
			$(".fam").css('text-align','center').removeClass('active');
			return false;
		}
		$(".fam").css('text-align','left').removeClass('active');
		$(this).addClass('active');
		
		var tipos = getDatos('id,nombre',21,'idfamilia = '+id,0,0,0);
		var tstr = '';
		for (var i = 0; i < tipos[0].length; i++) {
			tstr += '<a id="t'+tipos[0][i][0]+'" class="btn cyan darken-4 s12 tip" style="width: 100%"><small>'+tipos[0][i][1]+'</small></a>';
		}

		$("#tipos").append(tstr).slideDown();
	});

	SSE_SERVER('login',4,{sel:'id,idtipoocupado',tbl:800,where:'id > 0 and !bisbarra'},3);

    setInterval(function(){
        SSE_SERVER('login',4,{sel:'id,idtipoocupado',tbl:800,where:'id > 0 and !bisbarra'},3);
    },3000);

});


$(document).on("click",".tip",function(){
		var id = $(this).attr('id').substr(1);
		$(".tip").css('text-align','left').removeClass('active');
		$(this).addClass('active');
		$("#productos").html('').hide();
		var productos = getDatos('',802,id,0,0,0);
		var tstr = '';

		for (var i = 0; i < productos[0].length; i++) {
			tstr += '<a id="p'+productos[0][i][0]+'" class="btn white black-text s12 prod" style="width: 100%"><small>'+productos[0][i][1]+'</small></a>';
		}
		$("#productos").append(tstr).slideDown();
});

$(document).on("click",".prod",function(){
		var id = $(this).attr('id').substr(1);
		$(".prod").css('border','');
		$(this).css('border','1px solid #26a69a');
		$("#cantp").select().focus();
});

function cargarProducto(kbrota,elemento) {
    var cantidad = 1;
    var iscomodin = 0;

    $("#precp").attr('base',"0.00");
    $("#totp").attr('base',"0.00");

    var cod = arr('login',4,'',43,'"'+ kbrota +'",@@impresa,'+$(".zelda").data('triforce')['vidcliente']+','+$(".zelda").data('triforce')['vidtipoventa'],0,0,0);
    if (cod[0][0] != undefined) {

        cod = cod[0][0];
        var char1 = cod[0].substring(0,1);
        var tabla = char1 == '+' ? 58 : char1 == '-' ? 16 : 11;
        var dvalor = iscomodin ? {descuento:0,iddescuento:0} : cargarDescuentos(cod[0].substr(1)+',0',tabla,2);

        $("#valores").data("elemento",{idp : cod[0],hcodp : cod[1],hprec : cod[3],hdesc : dvalor,hdescm : cod[12], hinv : cod[13], hbod:cod[14], hunidad: cod[15], hcomodin: cod[16],isdesgloce: cod[17],exo: cod[9],ncomodin : iscomodin,idheredado : cod[18]}) //,imp: cod[6]
        $("#codp").val(cod[1]);
        $("#descp").val(cod[2]);
        $("#precp").val(parseFloat(cod[3]/parseFloat($("#monedas option:selected").attr('dv'))).formatMoney(2,'.',','));
        $("#totp").val((parseFloat(cod[3]/parseFloat($("#monedas option:selected").attr('dv')))*cantidad).formatMoney(2,'.',','))
        
        if (cod[4] == '?') {
            $("#cantI").html('∞');
        }else{
            $("#cantI").html(cod[4]);
            $("#bname-inv").html(cod[4]);
        }
        var strimp = cargarImpuestos(cod[0].substr(1)+',0',tabla);

        $("#valores").data("elemento")['strimp'] = strimp;
        cargarunidades(cod[0],cod[15]);
        $("#cantp").val(cantidad);

        if(param != 2){ //PRODUCTO DE VALOR VARIABLE
            if(!cod[19])
                $("#precp").prop("readonly",true);
            else
                $("#precp").removeAttr("readonly");
        }

        if (iscomodin) {
            switch(iscomodin){
                case 4:
                    $("#codp").select().focus();
                    break;
                default:
                    $("#precp").prop("readonly",false);
                    $("#descp").select().focus();
                    break;
            }
        }else{
            endCargarProducto(cod[9]);   
        }

        Materialize.updateTextFields()
    }else{
        switch(param) {
            case 2:
                var $toastContent = $('<span>Producto no Existente</span>').add($('<button class="btn-flat toast-action green white-text addProduct">Agregarlo</button>'));
                Materialize.toast($toastContent, 10000);

                $(".addProduct").focus();
                break;
            default:
                Materialize.toast('Producto no Existente',4000,'red');
                //elemento.select()
                break;
        }
        
    }
}

	
