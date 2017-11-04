var indice = 1;
var indice2 = 1;
var indicep = 1;
var indicep2 = 1;

$(document).ready(function(){
     $('select').material_select();
    $('li').removeClass('active');
    $('#ws').addClass('active');
    $('.t1').addClass('active');

    $('.menut').click(function(){
        
        $('.t').removeClass('active');
        $('.t'+$(this).attr('id')).addClass('active');

        $('.sub').hide();
        $('#t'+$(this).attr('id')).show();

        if($(this).attr('id') == 3)
            $("#data-table-vtaller").dataTable();
        else if ($(this).attr('id') == 2) 
            $("#data-table-vboletas").dataTable();

    });

    $('.descr').autoComplete({
        minChars: 1,
        source: function(term, response){
            term = term.toLowerCase();
            var arreglo = {} 
            arreglo['nombre'] = term
            msuggest = mantProducto(15,arreglo,'')[0];              
            response(msuggest);
        }
    });

    $('#bnomclie').autoComplete({
        minChars: 1,
        source: function(term, response){
            term = term.toLowerCase();
            var arreglo = {} 
            arreglo['nombre'] = term
            arreglo['tipo'] = 1;
            msuggest = mantTaller(2,arreglo)[0];              
            response(msuggest);
        }
    });

    $('#bvinplaca').autoComplete({
        minChars: 1,
        source: function(term, response){
            term = term.toLowerCase();
            var arreglo = {} 
            arreglo['nombre'] = term
            arreglo['tipo'] = 2;
            msuggest = mantTaller(2,arreglo)[0];              
            response(msuggest);
        }
    });

    $(document).on('click','.editboleta',function(){
    edvBoleta($(this).attr('tipo'));
    $('.descr2').autoComplete({
        minChars: 3,
        source: function(term, response){
            term = term.toLowerCase();
            var arreglo = {} 
            arreglo['nombre'] = term
            msuggest = mantProducto(15,arreglo,'')[0];              
            response(msuggest);
        }
    });

    $(".tservicio2").autoComplete({
            minChars: 1,
            source: function(term, response){
            term = term.toLowerCase();

            msuggest = mantTaller(7,term)[0];              
            response(msuggest);
            }
        });
});

    $("#vboletas").click(function(){
        if( $("#dbolF").val() == '' && $("#hbolF").val() != ''){
            alert('Fechas Requeridas')
            return false;
        }

        var boleta = {};

        boleta['id'] = $("#nbolF").val() == '' ? 0 : $("#nbolF").val();
        boleta['ref'] = $("#nrefF").val();
        boleta['desde'] = $("#dbolF").val();
        boleta['hasta'] = $("#hbolF").val();
        
        var p = mantTaller(8,boleta);

        $(this).attr("data-dismiss","modal")

        var tabla = $("#data-table-vboletas").DataTable();
        tabla.destroy();   
        $("#listaBoletas").html(p);
        $("#data-table-vboletas").DataTable();

    });

    $(".tservicio").autoComplete({
        minChars: 1,
        source: function(term, response){
        term = term.toLowerCase();

        msuggest = mantTaller(7,term)[0];              
        response(msuggest);
        }
    });

    $(".fsearch").keyup(function(e){
        if(e.keyCode == 13)
            loadClient($(this).val());
    });

    $(".strSer").keyup(function(e){
        if(e.keyCode == 13)
            $("#c1").focus();
    });

    $('#boletar').click(function(){
        var p = mantTaller(1,generarBoleta(1));
        window.open("index.php?accion=5&boleta="+p[0]['Boleta']);
        location.reload();
    });

    $("#vveh").change(function(){
        loadClient($("#vveh option:selected").val())
        $(".varios").hide()
        $("#fbvarios").show()
    });

    $("#facturar").click(function(){
        var p = mantTaller(1,generarBoleta(1));
        window.open("../facturacion/index.php?boleta="+p[0]['Boleta']);
        location.reload();
    });

    $("#saveBoleta").click(function(){

        mantTaller(12,actBoleta());
        alert("Boleta Guardada Correctamente")
    });

    $(".swBoleta").click(function(){
        var p = mantTaller(13,$(this).attr("tipo"))[0];
        for (var i = 0; i < p.length; i++) {
            $("#lclieBol").append('<tr><td>'+p[i][0]+'</td><td>'+p[i][9]+'</td><td><a class="btn btn-success shBoleta" data-dismiss="modal" data-toggle="modal" tipo="'+p[i][0]+'" href="#modal-showBoleta">Ver Boleta</a></td></tr>');
        };
    });

    $("#bnomclie").focus();

    $("#exit1").click(function(){
        location.reload();
    });

});

$(document).on('keyup','.sservice',function(e){
    var code = e.keyCode || e.which;
    var id = $(this).attr('id').substr(1);
    k_p(code,id,$(this).val());
});

$(document).on('keyup','.sservice2',function(e){
    var code = e.keyCode || e.which;
    var id = $(this).attr('id').substr(2);
    k_p2(code,id,$(this).val());
});

$(document).on('click','#fbsearch',function(){
    $(".tsearch").toggle();
});

$(document).on('click','#fbvarios',function(){
    $(".varios").toggle();
});

$(document).on('click','.shBoleta',function(){

     var p = $(this).attr('tipo').substr(0,2);
        window.open("index.php?accion=5&boleta="+p);
        location.reload();
    
    // cargarBoleta($(this).attr('tipo'),$(this).attr('id'));
    // $('.descr2').autoComplete({
    //     minChars: 3,
    //     source: function(term, response){
    //         term = term.toLowerCase();
    //         var arreglo = {} 
    //         arreglo['nombre'] = term
    //         msuggest = mantProducto(15,arreglo,'')[0];              
    //         response(msuggest);
    //     }
    // }); 
    $(".tservicio2").autoComplete({
            minChars: 1,
            source: function(term, response){
            term = term.toLowerCase();

            msuggest = mantTaller(7,term)[0];              
            response(msuggest);
            }
        });
});


$(document).on('keyup','.codigo',function(e){
    var code = e.keyCode || e.which;
    var id = $(this).attr('id').substr(1);
    k_s(code,id,1);
});


$(document).on('keyup','.cantidad',function(e){
    var code = e.keyCode || e.which;
    k_d(code);
});

// $(document).on('change','.cantidad',function(e){
//     var code = e.keyCode || e.which;
//     k_d(code)
// });

$(document).on("keyup",".descr",function(e){
    var code = e.keyCode || e.which;
    var id = $(this).attr('id').substr(1);
    k_s(code,id,2);
});

$(document).on("blur",".descr",function(){
    var id = $(this).attr('id').substr(1);
    k_s(13,id,2);
});

$(document).on('keyup','.codigo2',function(e){
    var code = e.keyCode || e.which;
    var id = $(this).attr('id').substr(2);
    k_s2(code,id,1);
});


$(document).on('keyup','.cantidad2',function(e){
    var code = e.keyCode || e.which;
    k_d2(code)
});

$(document).on("keyup",".descr2",function(e){
    var code = e.keyCode || e.which;
    var id = $(this).attr('id').substr(2);
    k_s2(code,id,2);
});

$(document).on("blur",".descr2",function(){
    var id = $(this).attr('id').substr(2);
    k_s2(13,id,2);
});

$(document).on('click','.addFast', function(){
    var servicio = {}
    var elemento = $("#x"+$(this).attr('tipo'));
    $("#errC").hide();

    if(elemento.val() == ''){
        $("#errC").html('Nombre Requerido')
        $("#errC").show();
        elemento.focus();
        return false;
    }
    servicio['nombre'] = elemento.val()
    var p = mantTaller(6,servicio)[0][0];
    $("#c"+$(this).attr('tipo')).val(p[0])
    elemento.val(p[1])
});

$(document).on('click','.addFast2', function(){
    var servicio = {}
    var elemento = $("#xx"+$(this).attr('tipo'));
    $("#errC1").hide();

    if(elemento.val() == ''){
        $("#errC1").html('Nombre Requerido')
        $("#errC1").show();
        elemento.focus();
        return false;
    }
    servicio['nombre'] = elemento.val()
    var p = mantTaller(6,servicio)[0][0];
    $("#cc"+$(this).attr('tipo')).val(p[0])
    elemento.val(p[1])
});

$(document).on("click","#facturar2",function(){
        window.open("../facturacion/index.php?boleta="+$("#numBoleta").val());
        location.reload();
});

// function cargarBoleta(vid,vboleta){
    
//     var p = mantTaller(9,vid);
//     var a = mantTaller(14,vboleta);
//     indice2 = 1;
//     indicep2 = 1;
//     $("#detBoleta").html(p);
// }

function edvBoleta(vid){
    
    var p = mantTaller(9,vid);
    indice2 = 1;
    indicep2 = 1;
    $("#detBoleta").html(p);

}

function k_s(code,id,vnom){

    if (code == '13') {
            var producto = {};
            producto['id'] = vnom == 1 ? $("#d"+id).val() : $("#e"+id).val();
            producto['filtro'] = vnom;
            var p = mantProducto(10,producto);

            var pindice = parseInt(id);

            if(p['succed'] == 0 && vnom == 1){
                return false;
            }
            else{
                if (p[0].length == 0) {
                    $("#d"+pindice).val('');
                    $('#o'+pindice).html(0.00);
                    $('#s'+pindice).val(0.00);
                    $('#d'+pindice).focus();
                    return false
                }
                p = p[0][0]
            }
            
            $("#d"+pindice).val(p[0]);
            $('#e'+pindice).val(p[17]);
            $('#o'+pindice).html(p[15].replace(',',''));
            $('#s'+pindice).val(p[15].replace(',',''));
            $('#n'+pindice).focus();
            $('#n'+pindice).select();
    }
}

function k_s2(code,id,vnom){

    if (code == '13') {
            var producto = {};
            producto['id'] = vnom == 1 ? $("#dd"+id).val() : $("#ee"+id).val();
            producto['filtro'] = vnom;
            var p = mantProducto(10,producto);

            var pindice = parseInt(id);

            if(p['succed'] == 0 && vnom == 1){
                return false;
            }
            else{
                if (p[0].length == 0) {
                    $("#dd"+pindice).val('');
                    $('#oo'+pindice).html(0.00);
                    $('#ss'+pindice).val(0.00);
                    $('#dd'+pindice).focus();
                    return false
                }
                p = p[0][0]
            }
            
            $("#dd"+pindice).val(p[0]);
            $('#ee'+pindice).val(p[17]);
            $('#oo'+pindice).html(p[15].replace(',',''));
            $('#ss'+pindice).val(p[15].replace(',',''));
            $('#nn'+pindice).focus();
            $('#nn'+pindice).select();
    }
}

function actBoleta () {
    var detalle = {}
    var bole = $("#numBoleta").val();
    var id = 0;
    var index = 0;
    detalle['boleta'] = bole;
    detalle[0] = {}

    $("#addServ2 tr").each(function(){
        id = $(this).attr('id').substr(2);

        detalle[0][index] = {}
        if ($("#cc"+id).val() != '') {
            detalle[0][index]['accion'] = 1;
            detalle[0][index]['idboleta'] = bole;
            detalle[0][index]['idservicio'] = $('#cc'+id).val();
            detalle[0][index]['idproducto'] = 0;
            detalle[0][index]['cantidad'] = 1;
            detalle[0][index]['subtotal'] = 0;
            detalle[0][index]['imv'] = 0;
            index += 1;
        }
        
    });

    $("#addProd2 tr").each(function(){
        id = $(this).attr('id').substr(2);
        detalle[0][index] = {}
        if ($("#dd"+id).val() != '') {
            detalle[0][index]['accion'] = 1;
            detalle[0][index]['idboleta'] = bole;
            detalle[0][index]['idservicio'] = 0;
            detalle[0][index]['idproducto'] = $('#dd'+id).val();
            detalle[0][index]['cantidad'] = $('#nn'+id).val();
            detalle[0][index]['subtotal'] = $('#ss'+id).val();
            detalle[0][index]['imv'] = 0;
            index += 1;
        }
    });

    return detalle;
}

function generarBoleta(x1){
    var boleta ={}
    var arreglo = {}
    var detalle = {}

    arreglo['accion'] = x1;
    arreglo['id'] = 0
    arreglo['idnivel'] = 0;
    arreglo['idvehiculo'] = $('#idvehiculo').val();
    arreglo['iduser'] = 0; 
    arreglo['subtotal'] = 0;
    arreglo['imv'] = 0;
    arreglo['ajuste'] = 0;
    arreglo['referencia'] = $("#bref").val();
    arreglo['bkilo'] = $("#bkilo").val() == '' ? 0 : $("#bkilo").val();
    arreglo['mecanico'] = $("#bmec").val();
    
    boleta['boleta'] = arreglo;

    var id = 0;
    var index = 0;
    $("#addServ tr").each(function(){
        id = $(this).attr('id').substr(1);
        detalle[index] = {}
        if ($("#c"+id).val() != '') {
            detalle[index]['accion'] = x1;
            detalle[index]['idboleta'] = 0;
            detalle[index]['idservicio'] = $('#c'+id).val();
            detalle[index]['idproducto'] = 0;
            detalle[index]['cantidad'] = 1;
            detalle[index]['subtotal'] = 0;
            detalle[index]['imv'] = 0;
        }

        index += 1;
        
    });

    $("#addProd tr").each(function(){
        id = $(this).attr('id').substr(1);
        detalle[index] = {}
        if ($("#d"+id).val() != '') {
            detalle[index]['accion'] = x1;
            detalle[index]['idboleta'] = 0;
            detalle[index]['idservicio'] = 0;
            detalle[index]['idproducto'] = $('#d'+id).val();
            detalle[index]['cantidad'] = $('#n'+id).val();
            detalle[index]['subtotal'] = $('#s'+id).val();
            detalle[index]['imv'] = 0;
        }
        index += 1;
    });

    boleta['detalle'] = detalle;
    return boleta;
}

function mantProducto(x1,vproducto,vtipofactura){
    var p;

    $.ajax({
            async: false,
            url: '../inventario/index.php',
            type: 'POST',
            data: {producto : vproducto, accion: x1, tipoFactura : vtipofactura}
            })
            .done(function(data) {

                try {
                    p = JSON.parse(data);
                }
                catch(err){
                    p = data;
                }
            });
    return p;
}

function loadClient(str){
    var p = mantTaller(3,str)
    if(p[0] != ''){
        if(p[0].length > 1){

            $("#vveh").empty();

            $("#vveh").append('<option value=""> Seleccione una Placa </option>');

            for (var i = 0; i < p[0].length; i++) {
                $("#vveh").append('<option value="'+p[0][i][5]+'"> '+p[0][i][5]+'('+p[0][i][6]+') </option>')
            };    

            $(".varios").show();
            $("#vveh").focus();
            $("#fbsearch").show();
            $(".tsearch").hide();
        }else{
            p = p[0][0];
            $("#idvehiculo").val(p[11]);
            $("#bcliente").val(p[1]);
            $("#bcedula").val(p[2]);
            $("#btelefono").val(p[4]);
            $("#bplaca").val(p[5]);
            $("#bmodelo").val(p[9]);
            $("#bmarca").val(p[8]);
            $("#bano").val(p[7]);
            $("#bvid").val(p[6]);

            $(".boleta").show("fast");
            $("#bkilo").focus();
            $("#fbsearch").show();
            $(".tsearch").hide();
        }
    }
}

function k_p(code,id,vnom){

    if (code == '13') {

        var p = mantTaller(4,vnom);

        if(p['succed'] == 0 && vnom == 1){
            return false;
        }
        else{
            if (p[0].length == 0) {
                $('#x'+id).val('');
                $('#c'+id).val('');
                return false;
            }
            p = p[0][0]
        }
        
        $('#c'+id).val(p[0]);
        $('#x'+id).val(p[1]);
        k_r();
    }
}

function k_p2(code,id,vnom){

    if (code == '13') {

        var p = mantTaller(4,vnom);

        if(p['succed'] == 0 && vnom == 1){
            return false;
        }
        else{
            if (p[0].length == 0) {
                $('#xx'+id).val('');
                $('#cc'+id).val('');
                return false;
            }
            p = p[0][0]
        }
        
        $('#cc'+id).val(p[0]);
        $('#xx'+id).val(p[1]);
        k_r2();
    }
}

function k_d(code){
    if (code == '13'){

        $("#o"+indicep).html( (parseFloat($("#s"+indicep).val()) * parseInt($("#n"+indicep).val())).toFixed(2) )
        
        if(!$("#d"+indicep).val() == '' || indicep == 1){
        indicep += 1;
        $("#addProd").append('<tr id="l'+indicep+'"><td><input type="text" id="d'+indicep+'" class="form-control codigo der" placeholder="Codigo" ></td><td><input type="text" id="e'+indicep+'" class="form-control descr" placeholder="Descripcion"></td><td><input type="number" value="1" id="n'+indicep+'" class="form-control cantidad" min="1" placeholder="Cantidad"></td><td>¢<span id="o'+indicep+'">0.00</span><input type="hidden" id="s'+indicep+'" value="0.00"></td></tr>');

            $('.descr').autoComplete({
                minChars: 1,
                source: function(term, response){
                    term = term.toLowerCase();
                    var arreglo = {} 
                    arreglo['nombre'] = term
                    msuggest = mantProducto(15,arreglo,'')[0];              
                    response(msuggest);
                }
            });    
        }
        $("#d"+indicep).focus();

    }

}

function k_d2(code){
    if (code == '13'){
        $("#oo"+indicep2).html( (parseFloat($("#ss"+indicep2).val()) * parseInt($("#nn"+indicep2).val())).toFixed(2) )
        
        if(!$("#dd"+indicep2).val() == '' || indicep2 == 1){
        indicep2 += 1;
        $("#addProd2").append('<tr id="ll'+indicep2+'"><td><input type="text" id="dd'+indicep2+'" class="form-control codigo2 der" placeholder="Codigo" ></td><td><input type="text" id="ee'+indicep2+'" class="form-control descr2" placeholder="Descripcion"></td><td><input type="number" value="1" id="nn'+indicep2+'" class="form-control cantidad2" min="1" placeholder="Cantidad"></td><td>¢<span id="oo'+indicep+'">0.00</span><input type="hidden" id="ss'+indicep2+'" value="0.00"></td></tr>');

            $('.descr2').autoComplete({
                minChars: 3,
                source: function(term, response){
                    term = term.toLowerCase();
                    var arreglo = {} 
                    arreglo['nombre'] = term
                    msuggest = mantProducto(15,arreglo,'')[0];              
                    response(msuggest);
                }
            });    
        }
        $("#dd"+indicep2).focus();

    }

}


function k_r(){

    if(!$("#c"+indice).val() == '' || indice == 1){
        indice += 1;
        $("#addServ").append('<tr id="f'+indice+'"><td style="display: none"><input type="text" id="c'+indice+'" class="form-control sservice" placeholder="Código"></td><td><div class="input-group"><input type="text" class="form-control tservicio sservice" placeholder="Digite el Servicio" id="x'+indice+'"><span class="input-group-addon btn addFast" tipo="'+indice+'"><i class="fa fa-plus"></i></span></div></td></tr>');

        $(".tservicio").autoComplete({
            minChars: 1,
            source: function(term, response){
            term = term.toLowerCase();

            msuggest = mantTaller(7,term)[0];              
            response(msuggest);
            }
        });
    }
        $("#x"+indice).focus();
}

function k_r2(){
    
    if(!$("#cc"+indice2).val() == '' || indice2 == 1){
        indice2 += 1;
        $("#addServ2").append('<tr id="ff'+indice2+'"><td style="display: none"><input type="text" id="cc'+indice2+'" class="form-control sservice2" placeholder="Código"></td><td><div class="input-group"><input type="text" class="form-control tservicio2 sservice2" placeholder="Digite el Servicio" id="xx'+indice2+'"><span class="input-group-addon btn addFast2" tipo="'+indice2+'"><i class="fa fa-plus"></i></span></div></td></tr>');

        $(".tservicio2").autoComplete({
            minChars: 1,
            source: function(term, response){
            term = term.toLowerCase();

            msuggest = mantTaller(7,term)[0];              
            response(msuggest);
            }
        });
    }
        $("#xx"+indice2).focus();
}

function mantTaller(x1,obj){
    var p;

    $.ajax({
            async: false,
            url: 'index.php',
            type: 'POST',
            data: {arreglo : obj, accion: x1}
            })
            .done(function(data) {
                
                try {
                    p = JSON.parse(data);
                }
                catch(err){
                    p = data;
                }
            });
    return p;
}

