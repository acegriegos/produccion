$(function(){
    
    $("#bsse1").click(function(){
        return false;
    });

    $("#movil").click(function(){
        $("#cpu").click()
    });

    $('.button-collapses').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });

    if(parseInt($("#cpu").attr('xyz')) == 5){   


            // $("#grubro").blur(function(){
            //     var isproveedor = 0;
            //     var idrubro = getDatos('vid',281,'vid > 0 and nombre = "'+$(this).val()+'"',0,0,0);

            //     if(idrubro[0].length){
            //         $(this).attr('idrubro',idrubro[0][0][0]);
            //         $("#gvalor").focus().select();
            //     }else {
            //         if($(this).val().trim().length){
            //         var $toastContent = $('<span>Rubro no Existente</span>').add($('<button class="btn-flat toast-action green white-text addRubro">Agregarlo</button>'));
            //             Materialize.toast($toastContent, 5000);

            //         $(".addRubro").focus();
            //         }
            //     }
            // });

        $("#flujo").click(function(){
            $("#modal-flujo").modal('open');
            $("#grubro").val('').focus()      
        });

        var rubros = getDatos('vid,nombre',281,'vid > 0 and idsucursal in(-1,@@impresa) and !idtiporubro order by nombre',0,0,0)[0]
        var strboletas = '<option value="0" selected disabled>Rubro</option>';
        for (var i = 0; i < rubros.length; i++) {
            strboletas += '<option value="'+rubros[i][0]+'">'+rubros[i][1]+'</option>';
        }

        $("#listrubros").html(strboletas); 
    }

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
            default:
                break
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
                .done(function(data) {

                    /*console.log('REFRESH TOKEN');   
                    console.log(data)*/
              });
            }

            if ($("#cantFact:visible").length)
                $("#cantFact").html(p[0][0][2]);
            
            if(parseInt(p[0][0][3])){ //RECURSIVIDAD 20MIN
                $.post('../_config/autofacturas.php')
                    .done(function(data){ });
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
