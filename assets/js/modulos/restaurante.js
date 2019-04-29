var param = 6;
var mesa;

$(function(){
	$("#ffacturas .zelda").data()['idmesa'] = 0;
    $("#ffacturas .zelda").data()['idbarra'] = 0;

    $("#ffacturas .zelda").data('triforce',{vidtipo:1, vidtipoventa:6, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : 0,vidusuario:'',vidtipopago:0,vidodt:0,vajuste:0, idline:0,  saldo : 0, notific : 0,tmpcorreo:'',videxoneracion:'',vexento:0,vflete:0,vplazo:0,vcomentario:'',vfecha:'',vidagente:0});

	$("#descp").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)

        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            $(".autocomplete-content").remove();
            
            $("#descp").autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+busqueda+'",7,@@impresa',0,0,0,1)
            })

            $("#descp").siblings($(".autocomplete-content")).css('width','100%').css('position','absolute !important').css('bottom','100px');
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
                data: arr('login',4,'',6,'"'+busqueda+'",8,@@impresa',0,0,0,1)
            })

            $(this).siblings($(".autocomplete-content")).css('width','50%');
        }
    });

    $("#addline").click(function(){

        var cantidad = parseFloat($("#cantp").val());

        if (cantidad < 0) {
            Materialize.toast('Cantidad debe ser Mayor a 0',4000,'red');
            $("#cantp").select().focus();
            return false;
        }

        if ($("#cantp").attr('fila') != undefined) {

            var idproducto = $("#cantp").attr('fila');

            if (cantidad == 0) {
                $("#fd"+idproducto).remove();
                $("#cantp").removeAttr('fila').val(1).blur();
                totalizar();
                return false;
            }

            $("#fd"+idproducto).data('triforce')['vcantidad'] = cantidad;
            $("#fd"+idproducto+" #fcant").html(cantidad)
            $("#cantp").removeAttr('fila').val(1).blur();
            totalizar();
            return false;
        }

        if($("#valores").data('elemento') != undefined){
            var existe = 0;
            var idproducto = $("#valores").data('elemento')['idp'];

            $("#fdetallefacturas .ciclos").each(function(){
                if ($(this).data('triforce')['videntrada'] == idproducto)
                    existe = 1;
            });

            if (cantidad > parseFloat($("#valores").data('elemento')['cantidad']) && parseInt($("#valores").data('elemento')['inventariado'])) {
                Materialize.toast('Cantidad Insuficiente en Inventario',4000,'red')
                $("#cantp").select().focus();
                return false;
            }

            if (!existe) {
                $("#detfactmsj").hide();
                var imp = $("#valores").data('elemento')['exo'];
                var precio = parseFloat($("#valores").data('elemento')['hprec']);
                var hinv = $("#valores").data('elemento')['hinv'];
                var cimp = (precio/((imp/100)+1))*(imp/100);
                var total = precio*cantidad;

                $("#fdetallefacturas").prepend('<a href="#!" class="collection-item col12 row ciclos black-text" nuevo="0" id="fd'+idproducto+'" style="padding: 0px"><small id="fnom" class="col s6" style="font: bold">'+$("#descp").val()+'</small> <small class="col s6">Uni:<span id="funit" class="der">'+(precio).formatMoney(2,'.',',')+'</span></small> <small class="col s6">Cant: <span id="fcant">'+cantidad+'</span></small> <small class="col s6">Total: <span id="ftot" class="der">'+(total).formatMoney(2,'.',',')+'</span></small></a>');

                $("#fd"+idproducto).data('triforce',{vaccion : 0,vid : -1,vidfactura : '?',videntrada : idproducto,vcantidad : cantidad,vprecio : (precio-cimp).formatMoney(5,'.',''),vdesc : 0,vtotal : (total).formatMoney(5,'.',''),vidinventario : hinv,vidodt : 0,vimv : cimp.formatMoney(5,'.',''),vcomodin : $("#valores").data('elemento')['hcomodin'],vidunidad : 1,vidimpuestos:$("#valores").data('elemento')['idimv'],viddescuentos:'',exoneracion:0,vdescuento : 0,idimv:$("#valores").data('elemento')['idimv'],vcomision : 0});
            }else{
                cantidad = cantidad + parseFloat($("#fd"+idproducto).data('triforce')['vcantidad'])
                $("#fd"+idproducto).data('triforce')['vcantidad'] = cantidad;
                $("#fd"+idproducto+" #fcant").html(cantidad)
            }

            $("#cantp").val(1)
            $("#valores").removeData('elemento');

            if ($(".prod").is(":visible"))
                $(".prod").css('border','0px');            
        }else{
            if($("#fdetallefacturas .ciclos").length == 0)
                $("#detfactmsj").show();
            Materialize.toast('No hay Producto Seleccionado',4000,'red');
        }
        totalizar();
        $("#cantp").blur();
    });

    $("#cantp").keyup(function(e){
        var code = e.which || e.keyCode;
        switch(code) {
            case 13:
                $("#addline").click();
                break;
            case 46:
                $("#cantp").val(0);
                $("#addline").click();
                break;
            default:
                break;
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
    	if($(".sprod").is(":visible")){
    		$(".sprod").addClass('hide')
            $("#descp").val('');
            $("#codp").val('');

        }
    	else{
    		$(".sprod").removeClass('hide')
    		$("#descp").focus();
    	}
    });

    $(document).on('click',".saveOrder",function(){
        var id = $("#ffacturas .zelda").data('triforce')['vidtipo'];
        var idfactura = getDatos('',259,id+',0,'+$("#ffacturas .zelda").data('triforce')['vidtipopago'],0,0,0)
        //console.log(id+',0,'+$("#ffacturas .zelda").data('triforce')['vidtipopago'])
        idfactura = idfactura[0][0][0];
        var idprod = cant = precio = imv = idimv = 0;

        if($(".ciclos").length){
            var vdata = "\t   COMANDA\n\tOrden #"+idfactura+" - "+$("#tit").html()+"\n\nCANT \tPRODUCTOS"; //20 CARACTERES DE PRODUCTO
            var lcant = 0;
            var imprimir = 0;
            $(".ciclos").each(function(){
                idprod = $(this).attr('id').substr(2);
                cant = $(this).data('triforce')['vcantidad'];
                precio = $(this).data('triforce')['vprecio'];
                imv = $(this).data('triforce')['vimv'];
                idimv = $(this).data('triforce')['idimv'];
                insertar(260,'','null,'+idfactura+','+idprod+',null,null,'+cant+','+precio+',0,0,'+imv+',"",1,"'+idimv+'","",6');
                lcant = parseFloat(cant) - parseFloat($(this).attr('nuevo'));
                if(lcant > 0){
                    imprimir = 1;
                    vdata += "\n"+lcant.toString().padEnd(6,' ')+$("#fnom",this).html().trim().substr(0,20).padEnd(20,' ');
                }
                $(this).attr('nuevo',cant);
            });
            vdata += '\n\n\n\n\n\n\n\n\n ';

            Materialize.toast('Orden Editada Corectamente',4000,'green');
            
            /*if(imprimir)
            mantenimiento('login',12,{data:vdata,ip:"192.168.31.133"},1);*/
        }else{
            Materialize.toast('No Hay Productos que Ingresar',4000,'red');
            $("#detfactmsj").show();
        }
    });

    $(".barra").click(function(){
       $("#modal-barra").modal('open');
       $("#btit").html($("strong b",this).html());
       var idbarra = $(this).attr('id').substr(1);
       var clientes = getDatos('',805,'2,'+idbarra+',""',0,0,0)[0];
       var str = '';
       $("#listaclientes").html('');
       for (var i = 0; i < clientes.length; i++) {
           str += '<div class="card-panel teal lighten-2 truncate col s2 center row" style="margin-right: 1%;margin-left:1%; padding:0px"><span class="cdb col s10" style="cursor:pointer" id="c'+clientes[i][0]+'">'+clientes[i][1]+'</span> <i class="mdi mdi-close delb col s2" style="cursor:pointer;float:right"></i> </div>';
       }

       $("#modal-barra").attr('bnumber',idbarra);
       $("#listaclientes").html(str);
    });

    $("#cancOrder").click(function(){
        var isbarra = parseInt($(".zelda").data('triforce')['vidtipopago']);
        if(isbarra){
            eliminar(261,'idtipo = -1*'+$("#modal-barra").attr('bnumber')+' and idtipopago = '+isbarra);
        }else{
            eliminar(261,'idtipo = '+$("#ffacturas .zelda").data()['idmesa']+' and idtipopago = 0');
            actualizar(actualizar(800,'idtipoocupado = 1','id='+$("#ffacturas .zelda").data()['idmesa']));
        }

        eliminar(260,'idfactura not in(select id from tmpfacturas)');
        eliminar(261,'id not in(select idfactura from tmpdetallefacturas)');
        Materialize.toast("Orden Cancelada Correctamente",4000,'green');
    });

    $("#abarra").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $("#addclient").click();
        }
    });

    $("#addclient").click(function(){
        if($("#abarra").val().trim().length){
             var idbarra = $("#modal-barra").attr('bnumber');
            var clientes = getDatos('',805,'1,'+idbarra+',"'+$("#abarra").val()+'"',0,0,0)[0];

            var str = '<div class="row col s2"><div class="card-panel teal lighten-2 truncate col s10 center cdb" style="margin-right: 1%;margin-left:1%;cursor:pointer" id="c'+clientes[0][0]+'">'+$("#abarra").val()+' </div><i class="mdi mdi-close delb s2" style="cursor:pointer"><i>';
            $("#listaclientes").append(str);
            $("#abarra").val('')
        }
       
    });

	$(".mesa").click(function(){
		var estado = parseInt($(this).attr('estado'));
        var id = $(this).attr('id').substr(1);
        $("#saveOrder").removeClass('add');
        $("#saveOrder").removeClass('saveOrder');
        $("#cancOrder").removeClass('hide');
        $(".zelda").data('triforce')['vidtipopago'] = 0;

        $("#total_mesa").html('0.00');
        mesa = id;
		switch(estado){
            case 5:
			case 1:
                if(estado == 5)
                    Materialize.toast('Tomando Pedido en Mesa',4000,'red');
                var fecha = new Date();
				
                $(".zelda").data('triforce')['vidtipo'] = mesa;
                $(".zelda").data('triforce')['vcomodin'] = 'MESA '+$(this).attr('nmesa');

				$("#modal-mesa").modal('open');
				$("#tipos").html('').hide();
				$("#productos").html('').hide();
				$("#ffacturas .zelda").data()['idmesa'] = id;
                $("#ffacturas .zelda").data()['idbarra'] = 0;
				$("#tit").html('MESA '+$(this).attr('nmesa'));
                $("#fdetallefacturas .ciclos").remove();
                $("#detfactmsj").show();
                $(".showprod").hide();
                $("#saveOrder").addClass('add');
                $("#cancOrder").addClass('hide');
				actualizar(800,'idtipoocupado=5','id='+id);
				break;
            case 2:
                var detalle = getDatos('',803,mesa+',0',0,0,0);
                var mstr = '';
                $("#fdetallefacturas .ciclos").remove();
                $(".zelda").data('triforce')['vidtipo'] = mesa;
                $(".zelda").data('triforce')['vcomodin'] = 'MESA '+$(this).attr('nmesa');
                var t_mesa = 0;

                for (var i = 0; i < detalle[0].length; i++){

                    var imp = detalle[0][i][7];
                    var precio = parseFloat(detalle[0][i][2]);
                    var cantidad = detalle[0][i][1];
                    var idproducto = detalle[0][i][6];
                    var hinv = detalle[0][i][5];
                    var cimp = parseFloat(detalle[0][i][4])
                    var total = parseFloat((precio+cimp)*cantidad);
                    t_mesa += total;

                    mstr = '<a href="#!" class="collection-item col12 row ciclos black-text" nuevo="'+cantidad+'" id="fd'+idproducto+'" style="padding: 0px"><small id="fnom" class="col s6" style="font: bold">'+detalle[0][i][0]+'</small> <small class="col s6">Uni:<span id="funit" class="der">'+(total/cantidad).formatMoney(2,'.',',')+'</span></small> <small class="col s6">Cant: <span id="fcant">'+cantidad+'</span></small> <small class="col s6">Total: <span id="ftot" class="der">'+(total).formatMoney(2,'.',',')+'</span></small></a>';

                    $("#fdetallefacturas").prepend(mstr);
                    
                    $("#fd"+idproducto).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : idproducto,vcantidad : cantidad,vprecio : (precio).formatMoney(5,'.',''),vdesc : 0,vtotal : total.formatMoney(5,'.',''),vidinventario : hinv,vidodt : 0,vimv : cimp.formatMoney(5,'.',''),vcomodin : detalle[0][i][0],vidunidad : 1,vidimpuestos:imp,viddescuentos:'',exoneracion:0,vdescuento : 0,ocantidad: cantidad,idimv:imp,vcomision : 0});

                };

                $("#total_mesa").html(t_mesa.formatMoney(2,'.',','));
                $("#modal-mesa").modal('open');
                $("#tipos").html('').hide();
                $("#productos").html('').hide();
                $("#ffacturas .zelda").data()['idmesa'] = id;
                $("#tit").html('MESA '+$(this).attr('nmesa'));
                $("#detfactmsj").hide();
                $(".showprod").hide();
                $("#saveOrder").addClass('saveOrder');
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
		},
        ready: function(){
            $("#modal-mesa").css("top",0).css("min-height","100vh");
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
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).parent().find('.collapsible-body').slideUp();
            return false;
        }
        $("#tipos").html('')
		var id = $(this).parent().attr('id').substr(1);

		$(".fam").css('text-align','left').removeClass('active');
		$(this).parent().addClass('active');
		
		var tipos = getDatos('id,nombre',21,'idfamilia = '+id+' having nombre <> ""',0,0,0);
		var tstr = '<ul class="collapsible" style="margin:0;">';

		for (var i = 0; i < tipos[0].length; i++) {
			tstr += '<li id="t'+tipos[0][i][0]+'"><div class="collapsible-header tip">'+tipos[0][i][1]+'</div></li>';
		}

		$("#tipos").append(tstr+"</ul>");

        $("#descp").val('');
        $("#codp").val('');
	});

    $('.collapsible').collapsible();
	SSE_SERVER('login',4,{sel:'id,idtipoocupado',tbl:800,where:'id > 0 and !bisbarra'},3);

    setInterval(function(){
        SSE_SERVER('login',4,{sel:'id,idtipoocupado',tbl:800,where:'id > 0 and !bisbarra'},3);
    },3000);

});

$(document).on("click",".delb",function(){
    var id = $(this).parent().find(".cdb").attr('id').substr(1);
    var hasordenes = getDatos('count(id)',261,'id in(select idfactura from tmpdetallefacturas) and idtipo = -1*'+$("#modal-barra").attr('bnumber')+' and idtipopago = '+id,0,0,0)
    if (hasordenes.succed) {
        if(parseInt(hasordenes[0][0][0]) > 0)
            Materialize.toast('Cliente con Ordenes Activas ',4000,'red');
        else{
            $(this).parent().remove();
            eliminar(806,'id = '+id);
        }
    }
});

$(document).on("click",".cdb",function(){

    $("#tit").html('Orden de '+$(this).html()+', Barra '+$("#btit").html());
    var id = parseFloat($("#modal-barra").attr('bnumber'));
    var idcliente = $(this).attr('id').substr(1);

    var detalle = getDatos('',803,id*-1+','+idcliente,0,0,0);

    $("#total_mesa").html('0.00')
    if(detalle[0].length){
        var mstr = '';
        $("#fdetallefacturas .ciclos").remove();
        var t_mesa = 0;

        for (var i = 0; i < detalle[0].length; i++){

            var imp = detalle[0][i][7];
            var precio = parseFloat(detalle[0][i][2]);
            var cantidad = detalle[0][i][1];
            var idproducto = detalle[0][i][6];
            var hinv = detalle[0][i][5];
            var cimp = parseFloat(detalle[0][i][4])
            var total = parseFloat((precio+cimp)*cantidad);
            t_mesa += total;

            mstr = '<a href="#!" class="collection-item col12 row ciclos black-text" nuevo="'+cantidad+'" id="fd'+idproducto+'" style="padding: 0px"><small id="fnom" class="col s6" style="font: bold">'+detalle[0][i][0]+'</small> <small class="col s6">Uni:<span id="funit" class="der">'+(total/cantidad).formatMoney(2,'.',',')+'</span></small> <small class="col s6">Cant: <span id="fcant">'+cantidad+'</span></small> <small class="col s6">Total: <span id="ftot" class="der">'+(total).formatMoney(2,'.',',')+'</span></small></a>';

            $("#fdetallefacturas").prepend(mstr);
            
            $("#fd"+idproducto).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : idproducto,vcantidad : cantidad,vprecio : precio.formatMoney(5,'.',''),vdesc : 0,vtotal : total.formatMoney(5,'.',''),vidinventario : hinv,vidodt : 0,vimv : cimp.formatMoney(5,'.',''),vcomodin : detalle[0][i][0],vidunidad : 1,vidimpuestos:imp,viddescuentos:'',exoneracion:0,vdescuento : 0,ocantidad: cantidad,idimv:imp});

        };

        $("#total_mesa").html(t_mesa.formatMoney(2,'.',','));
        $("#detfactmsj").hide();
        $("#saveOrder").addClass('saveOrder').removeClass('add');
        $("#cancOrder").removeClass('hide');
    }else{
        $("#detfactmsj").show();
        $("#fdetallefacturas .ciclos").remove();
        $("#saveOrder").addClass('add').removeClass('saveOrder');
        $("#cancOrder").addClass('hide');
    }


    $(".zelda").data('triforce')['vidtipo'] = id*-1;
    $(".zelda").data('triforce')['vidtipopago'] = idcliente;
    $(".zelda").data('triforce')['vcomodin'] = $(this).html()+', Barra '+$("#btit").html();

    $("#modal-mesa").modal('open');
    $("#tipos").html('').hide();
    $("#productos").html('').hide();
    $("#ffacturas .zelda").data()['idbarra'] = id;
    $("#ffacturas .zelda").data()['idmesa'] = 0;
    $(".showprod").hide();
    
});

$(document).on("click",".ciclos",function(){
    $("#cantp").val($(this).data('triforce')['vcantidad']).select().focus();
    $("#cantp").attr('fila',$(this).attr('id').substr(2))
});

$(document).on("click",".tip",function(){

        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).parent().find('.collapsible-body').slideUp();
            return false;
        }
        $(this).parent().find('.collapsible-body').remove();
        var id = $(this).parent().attr('id').substr(1);

        $(".tip").css('text-align','left').removeClass('active');
        $(this).parent().addClass('active');
        
        var productos = getDatos('',802,id,0,0,0);
        var tstr = '<div class="collapsible-body" style="padding: 0px;"><ul class="collapsibl" style="margin:0;">';

        for (var i = 0; i < productos[0].length; i++) {
            tstr += '<li id="p'+productos[0][i][0]+'" class="tip"><div class="collapsible-header"><small><span>'+productos[0][i][1]+'</span> '+productos[0][i][5]+''+productos[0][i][4]+'</small></div></li>';
        }

        $(this).parent().append(tstr+"</ul></div>");
        console.log(tstr)
        $("#descp").val('');
        $("#codp").val('');
});

$(document).on("click",".prod",function(){
		var id = $(this).attr('id').substr(1);
		$(".prod").css('border','');
		$(this).css('border','1px solid #26a69a');
		

        $(".sprod").addClass('hide')
        $("#descp").val($('small span',this).html()).blur();
        $("#codp").val('');
        $("#cantp").select().focus();
});

function cargarProducto(kbrota,elemento) {
    var cantidad = 1;
    var iscomodin = 0;

    $("#precp").attr('base',"0.00");
    $("#totp").attr('base',"0.00");

    var cod = arr('login',4,'',43,'"R-'+ kbrota +'",@@impresa,'+$(".zelda").data('triforce')['vidcliente']+','+$(".zelda").data('triforce')['vidtipoventa']+',6',0,0,0);

    if (cod[0][0] != undefined) {

        cod = cod[0][0];
        var char1 = cod[0].substring(0,1);
        var tabla = char1 == '+' ? 58 : char1 == '-' ? 16 : 11;
        var dvalor = iscomodin ? {descuento:0,iddescuento:0} : cargarDescuentos(cod[0].substr(1)+',0',tabla,2);
       
        $("#valores").data("elemento",{idp : cod[0],hcodp : cod[1],hprec : cod[3],hdesc : dvalor,hdescm : cod[12], hinv : cod[13], hbod:cod[14], hunidad: cod[15], hcomodin: cod[16],isdesgloce: cod[17],exo: cod[9],ncomodin : iscomodin,idheredado : cod[18],imv: cod[8],idimv: cod[6],cantidad: cod[4],inventariado:cod[20]}) //,imp: cod[6]
        $("#codp").val(cod[1]);
        $("#descp").val(cod[2]);
        // $("#precp").val(parseFloat(cod[3]/parseFloat($("#monedas option:selected").attr('dv'))).formatMoney(2,'.',','));
        // $("#totp").val((parseFloat(cod[3]/parseFloat($("#monedas option:selected").attr('dv')))*cantidad).formatMoney(2,'.',','))
        
        var strimp = cargarImpuestos(cod[0].substr(1)+',0',tabla);

        $("#valores").data("elemento")['strimp'] = strimp;
        // cargarunidades(cod[0],cod[15]);
        $("#cantp").val(cantidad);

        // if(param != 2){ //PRODUCTO DE VALOR VARIABLE
        //     if(!cod[19])
        //         $("#precp").prop("readonly",true);
        //     else
        //         $("#precp").removeAttr("readonly");
        // }

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

	
function cargarDescuentos(vfila,vtabla,vtipo,vcarga,vidfila){
    
    var desc = getDatos('',115,'@@impresa,"'+vfila+'","'+vtabla+'"',0,0);
    var strDesc = '<option value="" valor="0">No Aplica - 0%</option>';
    var valor;

    if (desc['succed']) {
        var mdesc = mdescid =  0;
        var smdesc;
        for (var i = 0; i < desc[0].length; i++) {
            smdesc = '';
            if (parseFloat(desc[0][i][1]) > mdesc && desc[0][i][3] == 0)  {
                mdesc = desc[0][i][1];
                smdesc = 'selected';
                mdescid = desc[0][i][0];
            }
            strDesc += '<option value="'+desc[0][i][0]+'" valor="'+desc[0][i][1]+'" '+smdesc+'>'+desc[0][i][2]+"</option>"
        }
    }else
        console.log('ERROR con Descuentos: '+desc)

    if ($(".per1103.hide").length == 0 || vcarga == 1)
        strDesc += '<option value="0" class="per1103" valor="0">Por Vendedor</option>';

    switch(vtipo){
        case undefined:
            $("#tdescuento").html(strDesc);
            $("#tdescuento").material_select('update');
            $("#vdescuentop").val(mdesc);
            break;
        case 1:
            // if (parseInt($("#fd"+vidfila).data("triforce")['iddesc']) == 1) {

            // }
            $("#tdescuentol").html(strDesc)
            $("#tdescuentol").material_select('update');
            $("#edescuento").val(mdesc);
            break;
        case 2:
            break;
        default:
            break;
    }   

    //totalizar();
    return {'descuento':mdesc,'iddescuento': mdescid};
}

function cargarImpuestos(vfila,vtabla){

    var imp = getDatos('',109,'@@impresa,"'+vfila+'","'+vtabla+'"',0,0)[0];
    var textImpuestos = '';
    var exo = 0;
    var sMoneda = $(".moneda").html();
    var aexo = 0;
    var noBorrar = vtabla = '11,2' ? 'noBorrar' : '';
    var impuestoStr = '';
 
    for (var i = 0; i < imp.length; i++) {
        impuestoStr += ","+imp[i][0]+",";

        if (!$("#imp_"+imp[i][0]).length) {
            exo = (parseFloat(imp[i][3])*(1-(parseFloat(imp[i][4])/100))).toFixed(2);
            textImpuestos = '<tr id="imp_'+imp[i][0]+'" class="dimpuesto" '+noBorrar+'><td id="imp_v'+imp[i][0]+'">'+imp[i][2]+' ['+exo+'%]:</td><td style="float: right;"><span class="moneda">'+sMoneda+'</span><span id="imv_'+imp[i][0]+'" type="html">0.00</span></td></tr>';
            
            $("#sh_imp").append(textImpuestos);

            $("#imp_"+imp[i][0]).data('valores',{vid:imp[i][0],vmonto:imp[i][3],exoneracion:imp[i][4]});
        }else{
            if (vtabla == 2){
                $("#imp_"+imp[i][0]).data('valores')['exoneracion'] = imp[i][4];
            }
        }
        
    }
    return impuestoStr;
}


function endCargarProducto(exo){
    var modselec = 1;//$("input[name='modselected']:checked").val();

    if (modselec == 1) {
        if (($("#precp").prop("readonly") == undefined || !$("#precp").prop("readonly")) && param != 6){
            $("#precp").focus().select();
            if (exo < 100) {
                var impuestos = 0;
                $(".dimpuesto").each(function(){
                    if ($("#valores").data("elemento")['strimp'].indexOf(','+$(this).data('valores')['vid']+',') >= 0)
                        impuestos += parseFloat($(this).data('valores')['vmonto'])
                });

                $("#precp").val( (parseFloat($("#valores").data("elemento")['hprec'].replace(/,/g,''))*(1+(impuestos/100))).formatMoney(2,'.',',') ) 
                $("#precp").blur();
                $("#precp").select().focus();
                $("[for=iva]").removeClass('hide');
                $("#iva").attr('checked',true);
            }
        }else{
            $("#cantp").focus().select();
        }
        
    }else{
        var e = jQuery.Event("keyup");
        e.which = 13;
        $("#cantp").trigger(e);
    }     
}

function validar (varreglo,vmodulo) {
    
    var salida = {}
    
        /*VALIDACION FRONT END*/
    
    switch(vmodulo['modulo']) {
        case 'factura':
            if (vmodulo['tip'] == '') {
                
                err = validarFactura();
                if ( err ) {
                    return err;
                }
            }
            break;
        case 'detallefactura':
            if (vmodulo['tip'] == '') {
                err = validarDetalleFactura();
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

function validarFactura() {

    if ($("#fdetallefacturas .ciclos").length == 0) {
        $("#codp").focus()
        return "No se Han Ingresado Productos en Detalle";
    }

    return false;
}


function validarDetalleFactura(){
    // var ciclos = $("#fdetallefacturas .ciclos");
    // var fila;
    // var cantidad = ciclos.length;

    // ciclos.each(function(index){
    //     var fila = $(this);
    //     var i = $(this).attr('id').substr(2)
    //     if (fila.data() != undefined) {
    //         if(fila.data('triforce')['vcomodin'] == "1")
    //         fila.data('triforce')['vcomodin'] = $("#desc"+i).html();    
    //     }
    // });

    return false;
}

function endDetail(vid,vacc,vmodulo) {

    var vdata = "\t   COMANDA\n\tOrden #"+vid[0][0][0]+" - "+$("#tit").html()+"\n\nCANT \tPRODUCTOS"; //20 CARACTERES 
    var lcant = 0;
    var imprimir = 0;
    $(".ciclos").each(function(){
        cant = $(this).data('triforce')['vcantidad'];
        vdata += "\n"+cant.toString().padEnd(6,' ')+$("#fnom",this).html().trim().substr(0,20).padEnd(20,' ');
        $(this).attr('nuevo',cant);
    });

    vdata += '\n\n\n\n\n\n\n\n\n ';

    //mantenimiento('login',12,{data:vdata,ip:"192.168.31.133"},1);
    actualizar(800,'idtipoocupado=2','id='+mesa);
    $("#saveOrder").removeClass('add');
    $("#saveOrder").addClass('saveOrder');
    $("#cancOrder").removeClass('hide');
};

function totalizar(){
    var total = 0;
    var id = 0
    var cantidad = precio = dtotal = imp = 0;
    
    if($(".ciclos").length){
        $(".ciclos").each(function(){
            id = $(this).attr('id').substr(2);
            cantidad = parseFloat($("#fd"+id).data('triforce')['vcantidad']);
            precio = parseFloat($("#fd"+id).data('triforce')['vprecio']);
            imp = parseFloat($("#fd"+id).data('triforce')['vimv']);
            dtotal = cantidad*(precio+imp);
            $("#fd"+id+" #ftot").html(dtotal.formatMoney(2,'.',','));
            $(this).data('triforce')['vtotal'] = dtotal;
            total += parseFloat(dtotal);
        });
    }else
        $("#detfactmsj").show();

    $("#total_mesa").html(total.formatMoney(2,'.',','))
}