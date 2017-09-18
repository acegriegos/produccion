$(function(){

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