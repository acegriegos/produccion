$(function(){
    
    $('.button-collapses').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });
    $('.button-collapse').sideNav({
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
                var datos = getDatos('',245,'',0,0)[0];
                var data = datos[3][0].split(',');
                
                $("#tsystem").html(datos[0][0]);
                $("#fsystem").html(datos[1][0]);
                $("#dsystem").html(datos[2][0]);
                $("#psystem").html(data[0]);
                $("#msystem").html(data[1]);
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
    SSE_SERVER('login',4,{sel:'',tbl:234,where:'@@usr'},1);

    setInterval(function(){
        SSE_SERVER('login',4,{sel:'',tbl:234,where:'@@usr'},1);
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
            if (p[0][0][0] != 0) {
                $(".sse_cnt").removeClass('hide');
                $("#bsse1").html(p[0][0][0]);
            }else{
                $(".sse_cnt").addClass('hide');
            }
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
