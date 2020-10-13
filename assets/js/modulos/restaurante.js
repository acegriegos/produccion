var param = 6;
var mesa;
var ipbebidas = '';
var ipcomidas = '';
var tipo_cmd;
var auth;
var config;

$(function(){
    $("#ffacturas .zelda").data()['idmesa'] = 0;
    $("#ffacturas .zelda").data()['idbarra'] = 0;

    config = getDatos('',42,'@@impresa',0,0)[0][0];
    tipo_cmd = getDatos('valor',809,'descr="PER_CMD"')[0][0][0];
    auth = getDatos('valor',809,'descr="AUTH"')[0][0][0];

    var impresoras = getDatos('ip,port,cola,tipo',288,'idsucursal = @@impresa',0,0,0);
    if(impresoras[0].length){
        for (var i = impresoras[0].length - 1; i >= 0; i--) {
            if(parseInt(impresoras[0][i][3]) == 1)
                ipcomidas = {ip:impresoras[0][i][0],port:impresoras[0][i][1],cola:impresoras[0][i][2]};
            else
                ipbebidas = {ip:impresoras[0][i][0],port:impresoras[0][i][1],cola:impresoras[0][i][2]};
        }

    }

    var dolar = getDatos('valor',54,'id = 2',0,0,0)[0][0][0];

    $("#ffacturas .zelda").data('triforce',{vidtipo:1, vidtipoventa:6, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : 0,vidusuario:'',vidtipopago:0,vidodt:0,voc:0, idline:0,  saldo : 0, notific : 0,tmpcorreo:'',videxoneracion:'',vexento:0,vexonerado:0,vplazo:0,vcomentario:'',vfecha:'',vidagente:0,vterminal:0,dolares:dolar});

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
        var cusr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? '@@usr' : $("#ffacturas .zelda").data('triforce')['vidusuario'];
        if(cusr == '@@usr' && auth == '1'){
            Materialize.toast('Usuario sin Autenticar',4000,'red');
            $("#usr").focus().select();
            return false;
        }

        var id = $("#ffacturas .zelda").data('triforce')['vidtipo'];
        var idfactura = getDatos('',259,id+',0,'+$("#ffacturas .zelda").data('triforce')['vidtipopago'],0,0,0)
        idfactura = idfactura[0][0][0];
        var idprod = cant = precio = imv = idimv = 0;

        if($(".ciclos").length){
            $(".ciclos").each(function(){
                insertar(260,'','null,'+idfactura+','+$(this).attr('strid')+','+$(this).attr('strcol')+',null,'+$(this).find('.clinea').val()+','+$(this).data('triforce')['vprecio']+',0,0,0,"",1,'+$(this).attr('iva')+',"",6,"'+$(this).data('triforce')['vcomodin']+'"');
            });

            vdata = generarComanda(id);
            // console.log(vdata)
            if(vdata['cocina'] != ''){
                mantenimiento('login',12,{data:vdata['cocina'],ip:ipcomidas['ip'],port:ipcomidas['port'],cola:ipcomidas['cola']},1);
              //  mantenimiento('login',12,{data:vdata['cocina'],ip:ipcomidas['ip'],port:ipcomidas['port'],cola:ipcomidas['cola']},1);
            }
            
            if(vdata['refresco'] != '')    
                mantenimiento('login',12,{data:vdata['refresco'],ip:ipbebidas['ip'],port:ipbebidas['port'],cola:ipbebidas['cola']},1);

            var cons = getDatos('consecutivo',261,'id='+idfactura);
            insertar(810,'','null,'+cons[0][0][0]+','+idfactura+',2,'+$('#total_mesa').html().replace(/,/g,'')+','+cusr+',@@impresa,now()');

            Materialize.toast('Orden Editada Corectamente',4000,'green');
        }else{
            Materialize.toast('No Hay Productos que Ingresar',4000,'red');
            $("#detfactmsj").show();
        }
    });

    $(".barra").click(function(){
       $("#modal-barra").modal('open');
       $("#btit").html($("strong b",this).html() == '' ? 'Llevar' : $("strong b",this).html());
       var idbarra = $(this).attr('id').substr(1);
       var clientes = getDatos('',805,'2,'+idbarra+',""',0,0,0)[0];

       var str = '';
       $("#listaclientes").html('');
       for (var i = 0; i < clientes.length; i++) {
           str += '<div class="card-panel teal lighten-2 truncate col s2 center row" style="margin-right: 1%;margin-left:1%; padding:0px;position:relative;"><span class="cdb col s10" style="cursor:pointer" id="c'+clientes[i][0]+'">'+clientes[i][1]+'</span> <i class="mdi mdi-close delb col s2" style="cursor:pointer;float:right;position:absolute;right:0;"></i> </div>';
       }

       $("#modal-barra").attr('bnumber',idbarra);
       $("#listaclientes").html(str);
    });

    $("#usr").keyup(function(e){
        var code =  e.which || e.keyCode

        if(code == 13){
            var cod =  $("#ecouser").val();
            var rs = getDatos('',137,'"'+$(this).val()+'"',0,0,0);
          
            if(parseInt(rs['succed'])){
                if (rs[0].length){
                    $("#ffacturas .zelda").data('triforce')['vidusuario'] = rs[0][0][0];
                    $("#username").html(rs[0][0][1])
                    $("#sprod").focus();
                    $(this).val(rs[0][0][0])
                }
                else{
                    Materialize.toast('Usuario no Valido',4000,'red');
                    $("#usr").focus().select();

                }
            }else{
                Materialize.toast('Usuario no Valido',4000,'red');
                 $("#usr").focus().select();
            }
        }
     });

    $("#printOrder").click(function(){
        var isbarra = parseInt($(".zelda").data('triforce')['vidtipopago']);
        var id = $("#ffacturas .zelda").data()['idmesa'];
        var idtpa = 0;
        if(isbarra){
            id = '-1'+$("#modal-barra").attr('bnumber');
            idtpa = isbarra
        }

        window.open('restaurante?accion=1&id='+id+'&tpago='+idtpa);
    });

    $("#cancOrder").click(function(){
        var isbarra = parseInt($(".zelda").data('triforce')['vidtipopago']);
        var cusr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? '@@usr' : $("#ffacturas .zelda").data('triforce')['vidusuario'];

        if(cusr == '@@usr' && auth == '1'){
            Materialize.toast('Usuario sin Autenticar',4000,'red');
            $("#usr").focus().select();
            return false;
        }

        if(isbarra){
            var cons = getDatos('consecutivo,id',261,'idtipo = -1*'+$("#modal-barra").attr('bnumber')+' and idtipopago = '+isbarra);
            insertar(810,'','null,'+cons[0][0][0]+','+cons[0][0][1]+',3,'+$('#total_mesa').html().replace(/,/g,'')+','+cusr+',@@impresa,now()');

            eliminar(261,'idtipo = -1*'+$("#modal-barra").attr('bnumber')+' and idtipopago = '+isbarra);
        }else{
            var cons = getDatos('consecutivo,id',261,'idtipo = '+$("#ffacturas .zelda").data()['idmesa']+' and idtipopago = 0');
            insertar(810,'','null,'+cons[0][0][0]+','+cons[0][0][1]+',3,'+$('#total_mesa').html().replace(/,/g,'')+','+cusr+',@@impresa,now()');

            eliminar(261,'idtipo = '+$("#ffacturas .zelda").data()['idmesa']+' and idtipopago = 0');
            actualizar(800,'idtipoocupado = 1','id='+$("#ffacturas .zelda").data()['idmesa']);
        }

        eliminar(260,'idfactura not in(select id from tmpfacturas)');
        eliminar(261,'id not in(select idfactura from tmpdetallefacturas)');
        Materialize.toast("Orden Cancelada Correctamente",4000,'green');
    });

    $("#dofact").click(function(){
        var cusr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? '@@usr' : $("#ffacturas .zelda").data('triforce')['vidusuario'];
        if(cusr == '@@usr' && auth == '1'){
            $("#usr").focus().select();
            Materialize.toast('Usuario sin Autenticar',4000,'red');
            return false;
        }

        var isbarra = parseInt($(".zelda").data('triforce')['vidtipopago']);
        if(isbarra){
            var idfactura = getDatos('id',261,'idtipopago = '+isbarra)[0][0][0];
        }
        else{
            var id = $("#ffacturas .zelda").data('triforce')['vidtipo'];
            var idfactura = getDatos('id',261,'idtipo = '+id)[0][0][0];
        }
        var usr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? 0 : $("#ffacturas .zelda").data('triforce')['vidusuario'];
        window.open('facturacion?id=-'+idfactura+'&au='+usr+'&ebd=1','_blank');
        $("#modal-mesa").modal('close')
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

            var str = '<div class="card-panel teal lighten-2 truncate col s2 center row" style="margin-right: 1%;margin-left:1%; padding:0px;position:relative;"><span class="cdb col s10" style="cursor:pointer" id="c'+clientes[0][0]+'">'+$("#abarra").val().trim()+'</span> <i class="mdi mdi-close delb col s2" style="cursor:pointer;float:right;position:absolute;right:0;"></i> </div>';
            $("#listaclientes").append(str);
            $("#abarra").val('')
        }
       
    });

    $(".mesa").click(function(){
        
        var estado = parseInt($(this).attr('estado'));
        var id = $(this).attr('id').substr(1);
        $("#saveOrder").removeClass('add');
        $("#saveOrder").removeClass('saveOrder');
        $("#printOrder").removeClass('hide')
        $("#cancOrder").removeClass('hide');
        $("#dofact").removeClass('hide');
        $(".zelda").data('triforce')['vidtipopago'] = 0;

        $("#total_mesa").html('0.00');
        $("#total_mesa_d").html('0.00');
        mesa = id;
        $("#sprod").val('');
        switch(estado){
            case 5:
            case 1:
                if(estado == 5)
                    Materialize.toast('Tomando Pedido en Mesa',4000,'red');
                var fecha = new Date();
                
                $(".zelda").data('triforce')['vidtipo'] = mesa;
                $(".zelda").data('triforce')['vcomodin'] = $(this).attr('nmesa');
                $(".zelda").data('triforce')['videstado'] = $(this).attr('estado')

                $("#modal-mesa").modal('open');
                /mobile/i.test(navigator.userAgent) && document.documentElement.scrollTop === 0 && !pageYOffset && !location.hash && setTimeout(function () {
                    window.scrollTo(0, 1);
                }, 1000);
                $("#ffacturas .zelda").data()['idmesa'] = id;
                $("#ffacturas .zelda").data()['idbarra'] = 0;
                $("#tit").html($(this).attr('nmesa'));
                $("#fdetallefacturas .ciclos").remove();
                $("#detfactmsj").show();
                $(".showprod").hide();
                $("#saveOrder").addClass('add');
                $("#cancOrder").addClass('hide');
                $("#printOrder").addClass('hide');
                $("#dofact").addClass('hide');

                $("#lfam").change();
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
                    var flag  = '<i class="mdi mdi-flag-variant pbtn der" style="color:black;"></i>';
                    t_mesa += total;

                    mstr = '<section strid="'+idproducto+'" iva="'+imp+'" strcol="0" nuevo="'+cantidad+'" style="border-bottom: 1px solid #e2e2e2;" class="ciclos"><b class="lpname">'+detalle[0][i][0]+'</b><span class="der">¢<span class="tprod">'+total.formatMoney(2,'.',',')+'</span></span> <br> <input type="number" class="browser-default eder clinea" style="border: 0;width: 20%;" value="'+cantidad+'">a '+parseFloat(precio).formatMoney(2,'.',',')+'/Und <i class="mdi mdi-close pbtn der dellinea" title="Eliminar Línea"></i> <i class="mdi mdi-flag-variant pbtn der" style="color:black;"></i> <i class="der mdi mdi-calendar-text pbtn coment" title="Comentarios del Artículo"></i><br></section';

                    $("#fdetallefacturas").prepend(mstr);
                    
                    $("[strid="+idproducto+"][strcol=0]").data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : idproducto,vcantidad : cantidad,vprecio : (precio).formatMoney(5,'.',''),vdesc : 0,vtotal : total.formatMoney(5,'.',''),vidinventario : hinv,vidodt : 0,vimv : cimp.formatMoney(5,'.',''),vcomodin : detalle[0][i][11],vidunidad : 1,vidimpuestos:imp,viddescuentos:'',exoneracion:0,vdescuento : 0,ocantidad: cantidad,idimv:imp,vcomision : 0,videxoneracion:'',idtipo:1});

                };

                $("#lfam").change();

                $("#total_mesa").html(t_mesa.formatMoney(2,'.',','));
                $("#total_mesa_d").html((t_mesa/parseFloat($("#ffacturas .zelda").data('triforce')['dolares'])).formatMoney(2,'.',','));
                $("#modal-mesa").modal('open');
                $("#ffacturas .zelda").data()['idmesa'] = id;
                $("#tit").html($(this).attr('nmesa'));
                $("#detfactmsj").hide();
                $(".showprod").hide();
                $("#saveOrder").addClass('saveOrder');
                break;
            default:
                break;
        }

        if($("#usr:visible").length)
            $("#usr").focus().select();
        else
            $("#sprod").focus();
        
    });
    
    $('.button-collapses-com').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
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

    $("#fam").change(function(){
        var id = $('#fam option:selected').val();
        $("#tip").html();

        var tipos = getDatos('',802,'0,'+id,0,0,0);
        
        var tstr = '<option value="0" selected disabled>Seleccione una Opción</option>';
        var bstr = '';

        for (var i = 0; i < tipos[0].length; i++) {
            if(parseInt(tipos[0][i][3]))
                bstr += '<div id="p'+tipos[0][i][0]+'" class="col s4 m2 pbtn prod center" style="background-color: #F58345;padding: 0;border: 1px solid black;height: 45px;max-height: 45px;margin-left:1%;word-wrap:break-word;overflow:hidden"><b>'+tipos[0][i][1]+'</b></div>';
            else
                tstr += '<option value="'+tipos[0][i][0]+'">'+tipos[0][i][1]+'</option>';
        }

        $("#tip").html(tstr)
        $("#productos").html(bstr);

        $("#descp").val('');
        $("#codp").val('');
    });

    $("#tip").change(function(){

        var id = $("#tip option:selected").val();
        
        $("#productos").html('');
        var productos = getDatos('',802,id+',0',0,0,0);
        var tstr = '';

        for (var i = 0; i < productos[0].length; i++) {
            tstr += '<div id="p'+productos[0][i][0]+'" class="col s4 m2 pbtn prod center" style="background-color: #F58345;padding: 0;border: 1px solid black;height: 45px;max-height: 45px;margin-left:1%;word-wrap:break-word;overflow:hidden"><b>'+productos[0][i][1]+'</b></div>'; //<span>'+productos[0][i][1]+'</span>
        }

        $("#productos").html(tstr);

        $("#descp").val('');
        $("#codp").val('');
    });

    $("#sprod").keyup(function(e){
        /*$(".comida").addClass('hide');
        var comidas = $(".comida").filter(function(){
            return $(this).find('.nprod').html().toLowerCase().match($("#sprod").val().toLowerCase());
        })
        comidas.removeClass('hide');*/

        cargarProdList();
    });

    $("#agcliente").click(function(){
        $("#clientes").append('');
    });

    $("#mcomanda").click(function(){
        $("#userView").html(mantenimiento('facturacion',11,{tp:1}));
    });

    $("#savecoment").click(function(){
        var gstr = ''
        var qrc = '';

        $(".comentr").each(function(index){
            qrc = $(this).val();
            qrc = parseInt(qrc.lastIndexOf('\n')) != -1 ? qrc.substring(0,qrc.lastIndexOf('\n')): qrc;
            gstr += '?^'+qrc+'!\n';
        });
       
        $("[strid="+$("#pname").attr('idf')+"][strcol="+$("#pname").attr('icol')+"]").data('triforce')['vcomodin'] = gstr;

    });

    $("#lfam").change(function(){
        cargarProdList()
    });

    $('.collapsible').collapsible();
    loadmybussiness();
    SSE_SERVER('login',4,{sel:'id,idtipoocupado',tbl:800,where:'id > 0 and !bisbarra'},3);

    setInterval(function(){
        SSE_SERVER('login',4,{sel:'id,idtipoocupado',tbl:800,where:'id > 0 and !bisbarra'},3);
    },3000);

});

    function addline(tfila,tcolor){

        var elem = $("[strid="+tfila+"][strcol="+tcolor+"]");

        if(elem.length){
            var cactual = parseFloat(elem.find('.clinea').val());
            elem.find('.clinea').val(cactual+1)
            elem.data('triforce')['vcantidad'] = cactual+1;
            totalizar()
            return false;
        }

        tcolor = parseInt(tcolor);
        var color = '';
        var seccion = 'lbebidas';

        switch (tcolor) {
            case 0:
                seccion = 'lgeneral';
                color = 'black';
                break;
            case 1:
                seccion = 'lentradas';
                color = 'green';
                break;
            case 2:
                seccion = 'lpfuertes';
                color = '#C32B1B';
                break;
            case 3:
                seccion = 'lpostres';
                color = 'blue';
                break;
            default:
                break;
        }
        var precio = $("[trid="+tfila+"]").find('.cprod').html().replace(/,/g,'');
        var iva = $("[trid="+tfila+"]").attr('iva')
        var cantidad = 1;
        var total = parseFloat(precio)*cantidad;
        var flag  = tcolor == -1 ? '' : '<i class="mdi mdi-flag-variant pbtn der" style="color:'+color+';"></i>';

        var linea = '<section strid="'+tfila+'" iva="'+iva+'" strcol="'+tcolor+'" nuevo="0" style="border-bottom: 1px solid #e2e2e2;" class="ciclos"><b class="lpname">'+$("[trid="+tfila+"]").find('.nprod').html()+'</b><span class="der">¢<span class="tprod">'+total.formatMoney(2,'.',',')+'</span></span> <br> <input type="number" class="browser-default eder clinea" style="border: 0;width: 20%;" value="1">a '+parseFloat(precio).formatMoney(2,'.',',')+'/Und <i class="mdi mdi-close pbtn der dellinea" title="Eliminar Línea"></i> '+flag+' <i class="der mdi mdi-calendar-text pbtn coment" title="Comentarios del Artículo"></i><br></section';

        $("#"+seccion).append(linea);

        $("[strid="+tfila+"][strcol="+tcolor+"]").data('triforce',{vaccion : 0,vid : -1,vidfactura : '?',videntrada : tfila,vcantidad : cantidad,vprecio : parseFloat(precio).formatMoney(5,'.',''),vdesc : 0,vtotal : (total).formatMoney(5,'.',''),vidinventario : 6,vidodt : 0,vimv : 0,vcomodin : "",vidunidad : 1,vidimpuestos:iva,viddescuentos:'',exoneracion:0,vdescuento : 0,idimv:1,vcomision : tcolor,videxoneracion:''});

        totalizar();
    }

    $(document).on('mouseenter','.comida',function(){
        $(this).find('.chover').removeClass('hide');
    });

    $(document).on('mouseleave','.comida',function(){
        $(this).find('.chover').addClass('hide');
    });

    $(document).on('click','.comida',function(){
        $("#sprod").focus().select();
        addline($(this).attr('trid'),$(this).attr('trcol'));
    });

    $(document).on('click','.tlista',function(e){
        e.preventDefault();
        addline($(this).parent().parent().attr('trid'),$(this).attr('trcol'));
        return false;
    });

    $(document).on('click','.dellinea',function(e){
        $(this).parent().remove();
        totalizar();
    });


     $(document).on('click','.coment',function(){
        $("#pname").html($(this).parent().find('.lpname').html());
        $("#pname").attr('idf',$(this).parent().attr('strid'))
        $("#pname").attr('icol',$(this).parent().attr('strcol'));
        var largo = $(this).parent().data('triforce')['vcomodin'].replace(/\#/g,'');
        var lindex = 0;
        var cstr = '';
        var cdiv = '';
        for (var i = 0; i < $(this).parent().find('.clinea').val(); i++) {
            cdiv = largo.substr(largo.indexOf('^', lindex)+1,(largo.indexOf('!',lindex)-lindex)-1);
            lindex = largo.indexOf('!',lindex)+2;
            
            cstr += '<section style="float: left;width: 25%;"><label for="cm'+i+'" class="center">'+(i+1)+'</label> <textarea class="comentr textarea" id=""cm'+i+'"" cols="25" rows="10" style="background-image: -webkit-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px);    background-image: -moz-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px);    background-image: -ms-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px);    background-image: -o-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px);    background-image: linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px);    background-size: 100% 31px;    border: 1px solid #ccc;    border-radius: 8px;    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);    line-height: 31px;    font-family: Arial, Helvetica, Sans-serif;    padding: 8px; min-height: 98px; max-height: 98px; min-width: 100%; max-width: 100% ">'+cdiv+'\n</textarea> </section>';
        }
        $("#cbody").html(cstr);
        $("#modal-comentario").modal('open').css('z-index','1600');
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

    $("#tit").html('Orden de '+$(this).html()+', '+$("#btit").html());
    var id = parseFloat($("#modal-barra").attr('bnumber'));
    var idcliente = $(this).attr('id').substr(1);

    var detalle = getDatos('',803,id*-1+','+idcliente,0,0,0);

    $("#total_mesa").html('0.00')
    $("#total_mesa_d").html('0.00')
    $("#lfam").change()
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

            mstr = '<section strid="'+idproducto+'" iva="'+imp+'" strcol="0" nuevo="'+cantidad+'" style="border-bottom: 1px solid #e2e2e2;" class="ciclos"><b class="lpname">'+detalle[0][i][0]+'</b><span class="der">¢<span class="tprod">'+total.formatMoney(2,'.',',')+'</span></span> <br> <input type="number" class="browser-default eder clinea" style="border: 0;width: 20%;" value="'+cantidad+'">a '+parseFloat(precio).formatMoney(2,'.',',')+'/Und <i class="mdi mdi-close pbtn der dellinea" title="Eliminar Línea"></i> <i class="mdi mdi-flag-variant pbtn der" style="color:black;"></i> <i class="der mdi mdi-calendar-text pbtn coment" title="Comentarios del Artículo"></i><br></section';
            $("#fdetallefacturas").prepend(mstr);
                    
            $("[strid="+idproducto+"][strcol=0]").data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : idproducto,vcantidad : cantidad,vprecio : (precio).formatMoney(5,'.',''),vdesc : 0,vtotal : total.formatMoney(5,'.',''),vidinventario : hinv,vidodt : 0,vimv : cimp.formatMoney(5,'.',''),vcomodin : detalle[0][i][11],vidunidad : 1,vidimpuestos:imp,viddescuentos:'',exoneracion:0,vdescuento : 0,ocantidad: cantidad,idimv:imp,vcomision : 0,videxoneracion:'',idtipo:1});

        };

        $("#total_mesa").html(t_mesa.formatMoney(2,'.',','));
        $("#detfactmsj").hide();
        $("#saveOrder").addClass('saveOrder').removeClass('add');
        $("#cancOrder").removeClass('hide');
        $("#printOrder").removeClass('hide');
        $("#dofact").removeClass('hide')
    }else{
        $("#detfactmsj").show();
        $("#fdetallefacturas .ciclos").remove();
        $("#saveOrder").addClass('add').removeClass('saveOrder');
        $("#cancOrder").addClass('hide');
        $("#printOrder").addClass('hide');
        $("#dofact").addClass('hide')
    }


    $(".zelda").data('triforce')['vidtipo'] = id*-1;
    $(".zelda").data('triforce')['vidtipopago'] = idcliente;
    $(".zelda").data('triforce')['videstado'] = 0;
    $(".zelda").data('triforce')['vcomodin'] = $(this).html()+', '+$("#btit").html();

    $("#modal-mesa").modal('open');
    $("#ffacturas .zelda").data()['idbarra'] = id;
    $("#ffacturas .zelda").data()['idmesa'] = 0;
    $(".showprod").hide();
    
    
});

$(document).on("change",".clinea",function(){  
    if(isNaN($(this).val()))
        $(this).val(0);
    if(parseInt($(this).val()) < 0)
        $(this).val(0) 
    $(this).parent().data('triforce')['vcantidad'] = $(this).val();
    totalizar();
});

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

    var cusr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? '@@usr' : $("#ffacturas .zelda").data('triforce')['vidusuario'];
    if(cusr == '@@usr' && auth == '1'){
        $("#usr").focus().select();
        return 'Usuario sin Autenticar';
    }

    return false;
}


function validarDetalleFactura(){

    return false;
}

function endDetail(vid,vacc,vmodulo) {
   
    vdata = generarComanda(vid[0][0]);

    if(vdata['cocina'] != ''){
        mantenimiento('login',12,{data:vdata['cocina'],ip:ipcomidas['ip'],port:ipcomidas['port'],cola:ipcomidas['cola']},1);
        //mantenimiento('login',12,{data:vdata['cocina'],ip:ipcomidas['ip'],port:ipcomidas['port'],cola:ipcomidas['cola']},1);
    }
    
    if(vdata['refresco'] != '')    
        mantenimiento('login',12,{data:vdata['refresco'],ip:ipbebidas['ip'],port:ipbebidas['port'],cola:ipbebidas['cola']},1);
    
    actualizar(800,'idtipoocupado=2','id='+mesa);
    $("#saveOrder").removeClass('add');
    $("#saveOrder").addClass('saveOrder');
    $("#cancOrder").removeClass('hide');
    $("#printOrder").removeClass('hide');
    $("#dofact").removeClass('hide');

    var cons = getDatos('consecutivo',261,'id='+vid[0][0]);
    var cusr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? '@@usr' : $("#ffacturas .zelda").data('triforce')['vidusuario'];
    insertar(810,'','null,'+cons[0][0][0]+','+vid[0][0]+',1,'+$('#total_mesa').html().replace(/,/g,'')+','+cusr+',@@impresa,now()');


};

function totalizar(){
    var total = 0;
    var cantidad = precio = dtotal = imp = 0;
    var elemento = '';

    if($(".ciclos").length){
        $(".ciclos").each(function(){
            elemento = $(this);
            cantidad = parseFloat(elemento.data('triforce')['vcantidad']);
            precio = parseFloat(elemento.data('triforce')['vprecio']);
            imp = parseFloat(elemento.data('triforce')['vimv']);
            dtotal = cantidad*(precio);

            elemento.data('triforce')['vtotal'] = dtotal;
            elemento.find('.tprod').html(dtotal.formatMoney(2,'.',','))
            total += parseFloat(dtotal);
        });
    }

    $("#total_mesa").html(total.formatMoney(2,'.',','));
    $("#total_mesa_d").html((total/parseFloat($("#ffacturas .zelda").data('triforce')['dolares'])).formatMoney(2,'.',','))
}

function generarComanda(idfactura){

    var sucursal = $('#sucname').html() == undefined ? $('#loadMyBussiness').html() : $('#sucname').html();
    var cfecha = new Date();
    var hours = cfecha.getHours();
    var minutes = cfecha.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var str_fecha = ("0"+cfecha.getDate()).slice(-2)+'/'+("0"+cfecha.getMonth()).slice(-2)+'/'+cfecha.getFullYear()+' '+strTime;
    var vcocina = "\n\t"+sucursal+"\n\t"+str_fecha+"\n\tOrden #"+idfactura+"\n"+$("#tit").html(); 
    var vrefresco = "\n\t"+sucursal+"\n\tOrden #"+idfactura+"\n"+$("#tit").html();
    var lcant = 0;
    var imprimir = 0;

    listacocina = [];
    listarefresco = [];

    $(".ciclos").each(function(){
        idprod = $(this).attr('strid');
        cant = $(this).data('triforce')['vcantidad'];
        precio = $(this).data('triforce')['vprecio'];

        lcant = parseFloat(cant) - parseFloat($(this).attr('nuevo'));
        
        if(lcant > 0){
            var color = parseInt($(this).attr('strcol'));
            var strl = '';
            var arreglo = listacocina;

            switch (color) {
                case 1:
                    if(listacocina[color] == undefined)
                        listacocina[color] = {str:'',nombre:'ENTRADAS'};

                      strl = "\n"+lcant.toString().padEnd(6,' ')+$(this).find('.lpname').html().trim(); 
                    break;
                case 2:
                    if(listacocina[color] == undefined)
                        listacocina[color] = {str:'',nombre:'PLATOS FUERTES'};

                     strl = "\n"+lcant.toString().padEnd(6,' ')+$(this).find('.lpname').html().trim(); 
                     break;
                case 3:
                    if(listacocina[color] == undefined)
                        listacocina[color] = {str:'',nombre:'POSTRES'};

                     strl = "\n"+lcant.toString().padEnd(6,' ')+$(this).find('.lpname').html().trim(); 
                     break;
                case 4:
                    if(listarefresco[color] == undefined)
                        listarefresco[color] = {str:'',nombre:'BEBIDAS'};

                     strl = "\n"+lcant.toString().padEnd(6,' ')+$(this).find('.lpname').html().trim(); 
                     arreglo = listarefresco;
                    break;
                default:
                    if(listacocina[color] == undefined)
                        listacocina[color] = {str:'',nombre:''};

                     strl = "\n"+lcant.toString().padEnd(6,' ')+$(this).find('.lpname').html().trim(); 
                    break;
            }
            if($(this).data('triforce')['vcomodin'].indexOf('?') != -1){
                var comentario  = $(this).data('triforce')['vcomodin'].substr('?');
                var cntcom = comentario.length - comentario.replace(/\?/g,'').length;
                var rcantl = 0;
                strl = '';

                for (var i = 0; i < cntcom; i++) {
                    var scomen = comentario.substring(comentario.indexOf('?')+2,comentario.indexOf('!'));
                    if(scomen != ''){
                        rcantl += 1;
                        strl += "\n"+('1').padEnd(6,' ')+$(this).find('.lpname').html().trim() + "\n"+(" ").padEnd(6,' ')+'---'+scomen;
                        comentario = comentario.replace('?','');
                        comentario = comentario.substr(comentario.indexOf('?'));
                    }
                }

                if(rcantl < lcant){
                    strl += "\n"+(rcantl-cntcom).toString().padEnd(6,' ')+$(this).find('.lpname').html().trim(); 
                }

                $(this).data('triforce')['vcomodin'] = $(this).data('triforce')['vcomodin'].replace(/\?/g,'');

            }
            console.log(strl)
            arreglo[color]['str'] += strl;
            
        }

        $(this).attr('nuevo',cant);
    });
    var tit = '';

    listacocina = listacocina.sort();

    listacocina.forEach(function(element){
         if(tit != element['nombre']){
            vcocina += '\n\n---'+element['nombre']+'---';    
        }
        vcocina += '\n'+element['str'];
    })
    
    listarefresco.forEach(function(element){
        if(tit != element['nombre']){
            vrefresco += '\n\n---'+element['nombre']+'---';    
        }
        vrefresco += '\n'+element['str'];
    })

    vcocina += '\n\n\n\n\n\n\n\n--------';
    vrefresco += '\n\n\n\n\n\n\n\n\n--------';
    vcocina = listacocina.length ? vcocina : '';
    vrefresco = listarefresco.length ? vrefresco : '';
    console.log({cocina:vcocina,refresco:vrefresco})
    return {cocina:vcocina,refresco:vrefresco}
}

function cargarProdList(){
    var productos = getDatos('',807,'@@impresa,"'+$("#sprod").val().trim()+'",'+$("#lfam option:selected").val(),0,0,0);

    var epp = '';
    var str = '';
    var isbebida = 1;
    var btns = '';
    var tfoto = getDatos('valor',809,'descr="FT_SZ"')[0][0];

    for(var i = 0; i < productos[0].length; i++){
        if(parseInt(productos[0][i][4]) != 4){
            isbebida  = 0;
            btns = '<div class="chover hide" style="position: absolute;right: 0;padding-top: 20%">                <i class="mdi mdi-circle tlista" trcol="1" style="color: green;z-index: 998" title="ENTRADA"></i> <br>                <i class="mdi mdi-circle tlista" trcol="2" style="color: #C32B1B;z-index: 998" title="PLATO FUERTE"></i> <br>                <i class="mdi mdi-circle tlista" trcol="3" style="color: blue;z-index: 998" title="POSTRE"></i>               </div>';
        }else{
            isbebida = 1;
            btns = '';
        }

        switch(parseInt(tfoto)){
            case 1:
                str += '<div class="comida" iva="'+productos[0][i][5]+'" trid="'+productos[0][i][0]+'" trcol="'+productos[0][i][4]+'" isbebida="'+isbebida+'" style=" width: 100px;height: 50px;border: 1px solid #e2e2e2;margin-bottom: 1%; margin-right: 1%;position: relative;display: inline-block;cursor: pointer;">              <span style="background-color: #e2e2e2;z-index: 999;position: absolute;top: 0;right: 0">¢<span class="cprod">'+productos[0][i][2]+'</span></span>              <span style="position: absolute;bottom: 0;width:100%;font-size: 10px;;white-space: nowrap;overflow:hidden;    font-weight: bold;" class="nprod">'+productos[0][i][1]+'</span>          </div>'
                break;
            default:
                str += '<div class="comida" iva="'+productos[0][i][5]+'" trid="'+productos[0][i][0]+'" trcol="'+productos[0][i][4]+'" isbebida="'+isbebida+'" style=" width: 100px;height: 100px;border: 1px solid #e2e2e2;margin-bottom: 1%; margin-right: 1%;position: relative;display: inline-block;cursor: pointer;">              <span style="background-color: #e2e2e2;z-index: 999;position: absolute;top: 0;right: 0">¢<span class="cprod">'+productos[0][i][2]+'</span></span>              <span style="position: absolute;bottom: 0;width:100%;font-size: 10px;;white-space: nowrap;overflow:hidden;    font-weight: bold;" class="nprod">'+productos[0][i][1]+'</span> '+btns+' <img src="'+productos[0][i][3]+'" height="90%" width="90%;">            </div>'
                break;
        }

    }
    $("#test1").html(str)
}