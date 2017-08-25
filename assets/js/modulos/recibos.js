$(function(){
    
    

     Materialize.updateTextFields();

    $('#lcorreos').click(function(){

        var p= getdatos("correo",17,"id>0 and idtabla=2 and idfila="+$('#vid').val(),0,0)[0];
        var str="";
        p.each(function(){
            str+='<div class="chip"> Tag   <i class="close material-icons">close</i>  </div>'
        });

        $('.chips').material_chip();

    });




});

