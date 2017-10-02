$(function(){
    $("#mchange").change(function(){
        console.log(mantenimiento('main',3,$(this).val()));
    });

    generarSSuc();
    $("#mchange").val($("#mchange").attr('sel'));
    $("#mchange").material_select('update');

     var f = mantenimiento_async('login',8,{arch:'recibo',id:mid,mic:1,tit:'Factura',sel:'',tbl:186,where:mid},1);

     
})