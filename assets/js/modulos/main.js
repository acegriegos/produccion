$(function(){
    $("#mchange").change(function(){
        console.log(mantenimiento('main',3,$(this).val()));
    });

    generarSSuc();
    $("#mchange").val($("#mchange").attr('sel'));
    $("#mchange").material_select('update');

     var fecha = new Date();
    fecha=fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate();
    dibujarGrafico("chartG1",'Ganancias por Dia','Ganancias','line',{sel:'',tbl:307,where:'3,0,0,0,"'+fecha+'","",0,0,0'},2,0,2);
     
})