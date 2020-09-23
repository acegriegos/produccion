$(function(){
    
    $("#bsse1").click(function(){
        return false;
    });

    $("#movil").click(function(){
        $("#cpu").click()
    });

    $("#help").click(function(){
        $("#modal-help").modal('open'); 
    }); 

    $('.button-collapses').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });

    $(".otpmenu").click(function(){
        var opt = parseInt($(this).attr('value'));
        switch(opt){
            case 1:
                $("#modal-info").modal('open');
                break;
            case 2: 
                window.open("notificaciones","_self");
                break;
            case 3:
                window.open("cierres","_self");
                break;
            case 4:
                var datos = getDatos('',245,'@@impresa',0,0)[0];
                
                $("#psystem").html(datos[0][1]);
                $("#msystem").html(datos[0][2]);
                $("#tsystem").html(datos[0][3]);
                $("#fsystem").html(datos[0][4]);
                $("#dsystem").html(datos[0][5]);

                $("#psoport").html(datos[0][6]);
                $("#msoport").html(datos[0][7]);
                $("#tsoport").html(datos[0][8]);
                $("#fsoport").html(datos[0][9]);
                $("#dsoport").html(datos[0][10]);

                $("#modal-system").data('akey',datos[0][0]);
                $("#modal-system").modal('open');
                break;
            case 5:
                abrirFlujo()
                break; 
            default:
            console.log('opcion no valida');
                break
        }
    });

    $("#gproveedor").on("keydown",function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        var elm = $(this)

        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();
            elm.autocomplete({
                limit: 10,
                data: arr('login',4,'concat(nombre," ",apellido1," ",apellido2,", ",cedula),null',2,'id > 0 and bisproveedor=1 and concat(nombre," ",cedula) like \"%'+elm.val()+'%\" and idsucursal = @@impresa limit 10',0,0,0,1),
                onAutocomplete: function(val){
                    $("#gproveedor").blur();
                }
            });
            elm.siblings($(".autocomplete-content")).css('width','25%').css('margin-top','5px');
        }
    });

    $("#gproveedor").blur(function(){
        var id = arr('login',4,'id',2,'concat(nombre," ",apellido1," ",apellido2,", ",cedula) = "'+$(this).val()+'" and id > 0 and bisproveedor=1 and idsucursal = @@impresa',0,0,0);
        
        if (id[0].length){
            $("#gproveedor").data('id',id[0][0][0]);
            $("#gproveedor").css('border-bottom','1px solid green');
        }
        else{
            $("#gproveedor").data('id',0);
            $("#gproveedor").css('border-bottom','1px solid red');
        }
    });

    $("#doflujo").click(function(){
        var idfila = 0;
        var idtabla = 0;
        var comodin = '';

        if(!validarNumero($("#gvalor")))
            return false;
        if($(".gres:visible").length){
            switch (parseFloat($(".gres:visible").attr('tr'))) {
                case 1:
                    if(parseFloat($("#gproveedor").data('id')) == 0){
                        Materialize.toast('Proveedor Requerido',4000,'red');
                        $("#gproveedor").focus().select();
                        return false;
                    }
                    break;
                case 2:
                    if(!validarTexto($("#guser"))){
                        return false;
                    }
                    break;
                case 3:
                    if(!validarTexto($("#gvoucher"))){
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
        if(!validarTexto($("#gcomentario"),'Comentario',100))
            return false;

        var tp = $("#tiporubro").is(":checked") ? 1 : 0;
        var id = getDatos('',317,'1,0,@@usr,@@impresa,'+idfila+','+idtabla+',"'+comodin+'",'+tp+','+$("#listrubros option:selected").val()+','+$("#gvalor").val().replace(/,/g,'')+',"'+$("#gcomentario").val()+'",'+$('#monrubros option:selected').val()+','+$('#monrubros option:selected').attr('rv'));
        Materialize.toast('Registro Ingresado Correctamente',4000,'green');
        $("#modal-flujo").modal('close')

    });

    $(document).on("click","#shflujo",function(){
        $(this).sideNav({
                menuWidth: 700,
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );
        //$("#gextra").html(123)
        $(this).sideNav('show');
    })

    $("#tiporubro").change(function(){
        var opciones = '';
        $(".gres").addClass('hide');

        if(!$(this).is(':checked')){
            opciones = '<option value="1" selected="">Pago Proveedor</option> <option value="2">Depósito Banco</option> <option value="3">Vales</option> <option value="5">Otros</option>';
        }else{
            opciones = '<option value="4">Reintegro</option>';
        }   

        $("#listrubros").html(opciones).change();
        $("#gvalor").focus().select();
    })

    $("#listrubros").change(function(){
        $(".gres").addClass('hide');
        
        switch (parseInt($(this).val())) {
            case 1:
                $(".po").removeClass('hide');
                break;
            case 2:
                $(".vo").removeClass('hide');
                break;
            case 3:
                $(".us").removeClass('hide');
                break;
            default:
                break;
        }
    });

    $("#numtrans").keyup(function(e){ //accesos
        var code = e.which || e.keyCode;
        if (code == 13) {
            var numtrans = $(this).val();
            var ruta = arr('login',4,'direccion',196,'codigo = "'+numtrans+'" or codigointerno = '+numtrans,0,0,0)[0][0];
            window.open(ruta,'_self');
        }
    });

    $("#mntNotas").click(function(){
        if( !$("#_vnota").val().trim().length){
            Materialize.toast('Nota Requrida',4000,'red');
            $("#_vnota").focus()
            return false;
        }

        switch(parseInt($(this).attr('tp'))){
            case 1:
                insertar(333,'','null,'+$(this).attr('idtabla')+','+$(this).attr('idfila')+',"'+$("#_vnota").val()+'",now(),@@usr,@@impresa,'+$("#_vtiponota option:selected").val())
                $("#_vnota").val('')
                $("#_vtiponota").val(1).change()
                Materialize.toast('Nota Registrada Correctamente',4000,'green');
                break;
            case 2:
                console.log(actualizar(333,'nota="'+$("#_vnota").val()+'",idtipo='+$("#_vtiponota option:selected").val(),'id='+$(this).attr('vid')))
                Materialize.toast('Nota Editada Correctamente',4000,'green');
                break;
            default:
                console.log(eliminar(333,'id='+$(this).attr('vid')))
                Materialize.toast('Nota Elminada Correctamente',4000,'green');
                break;    
        }
        
        arr('login',6,'',334,'@@impresa,'+$(this).attr('idtabla')+','+$(this).attr('idfila'),0,1,$("#_listanotas"));
    });

    var moneda = getDatos('nombre,id,valor+suma',54,'id > 0',0,0);
    var ht = '';
    for (var i = 0; i < moneda[0].length; i++) {
        ht += '<option value="'+moneda[0][i][1]+'" rv="'+moneda[0][i][2]+'">'+moneda[0][i][0]+'</option>';
    }
    $("#monrubros").html(ht)

    permisos(1,50);
    SSE_SERVER('login',4,{sel:'',tbl:234,where:'@@usr,@@impresa'},1);

    setInterval(function(){
        SSE_SERVER('login',4,{sel:'',tbl:234,where:'@@usr,@@impresa'},1);
    },5000);
});

function SSE_SERVER(vmodulo,vaccion,varreglo,vid,vjson) {
    
    var p;

        if (vjson)
            varreglo['JSON'] = vjson

        $.ajax({
                url: '../dashboard/'+vmodulo,
                type: 'POST',
                data: {accion: vaccion,arreglo : varreglo}
                })
                .done(function(data) {
                    try {
                        p = JSON.parse(data);
                    }
                    catch(err){
                        p = data;
                    }

                    sse_response(vid,p);
                });
    return true;
}

function sse_response(vid,p) {
    
    switch(parseInt(vid)){
        case 1:
            
            if (p['succed'] == undefined || p['succed'] == '')
                location.reload();
            if (p[0][0][0] != 0) {
                $(".sse_cnt").removeClass('hide');
                $(".sse_cnt").html(p[0][0][0]);
            }else{
                $(".sse_cnt").addClass('hide');
            }

            if (parseInt(p[0][0][1])) {
                //REFRESH TOKEN
                
                $.ajax({
                    url: "../wsdlClient.php",
                    type: 'POST',
                    data: {id: 0, accion : 13}
                })
                .done(function(data) { //REFRESH DATA
              });
            }

            if ($("#cantFact:visible").length)
                $("#cantFact").html(p[0][0][2]);
            
            if(parseInt(p[0][0][3])){ //RECURSIVIDAD 20MIN
                $.post('../_config/autofacturas.php')
                    .done(function(data){ });
            }

            if(parseInt(p[0][0][5])){ //ENVIO AL CONTADOR
                $.post('../_config/sendcontador.php')
                    .done(function(data){ console.log(data)});
            }

            if(p[0][0][6] != '' && parseInt(p[0][0][7])){ //SINCRONIZADOR
                $.post('../sincro.php',{server:p[0][0][6]})
                    .done(function(data){ console.log(data)});   
            }

            break;
        case 2:
            $(".asig").addClass('hide');
            if (p[0].length) {
                for (var i = 0; i < p[0].length; i++) {
                    $("#"+p[0][i][0]).removeClass('hide');
                    $("#"+p[0][i][0]).html(p[0][i][1]);
                }
                
            }
            break;
        case 3: //RESTAURANTES
            if (p[0].length) {

                for (var i = 0; i < p[0].length; i++) {
                    switch(parseInt(p[0][i][1])){
                        case 5:
                            $("#m"+p[0][i][0]).css('background-color','#cfd8dc');
                            $("#sm"+p[0][i][0]).html('<i class="mdi mdi-dots-horizontal"></i><i class="mdi mdi-pencil"></i>');
                            break;
                        case 2:
                            $("#m"+p[0][i][0]).css('background-color','#b3e5fc ');
                            $("#sm"+p[0][i][0]).html('');
                            break;
                        default:
                            $("#m"+p[0][i][0]).css('background-color','white');
                            $("#sm"+p[0][i][0]).html('');
                            break;
                    }
                    $("#m"+p[0][i][0]).attr('estado',p[0][i][1]);
                }
                
            }
            break;
        default:
            console.log('ID NO ASIGNADO')
            break;
    }
}

function generarSSuc(){

    var p = getDatos('',155,'@@usr',0,0)[0];
    var sucursales = '';

    for (var i = 0; i < p.length; i++) {
        sucursales += '<option value="'+p[i][0]+'">'+p[i][1]+'</option>';
    }

    // if ($(".ssuc").attr('multiple')) {
    //     $(".ssuc").change(function(){
    //         alert($('option:selected',this).val())
    //     })
    // }
    
    $(".ssuc").material_select('destroy');
    var valor = $(".ssuc").attr("sel");
    $(".ssuc").append(sucursales);
    $(".ssuc").val(valor);
    $(".ssuc").material_select();
}


function abrirFlujo(){
    $("#modal-flujo").modal('open');
    $("#gvalor").val('0.00').focus().select();
    $("#gcomentario").val('');
    $("#gproveedor").val('');
    $("#gproveedor").data('id',0);
    $("#guser").val('');
    $("#gvoucher").val('')
    $("#tiporubro").prop('checked',false).change();
}