$(function(){
    $("#mchange").change(function(){
        console.log(mantenimiento('main',3,$(this).val()));
    });

    generarSSuc();
    $("#mchange").val($("#mchange").attr('sel'));
    $("#mchange").material_select('update');
})