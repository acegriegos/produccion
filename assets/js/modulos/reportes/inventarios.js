$(function(){
    var param = getParameterByName('rep');

    switch(param){
        case 'existencias':
            arr('login',10,'',127,'6','',1,$(".detrep")); 
            break;
        default:
            arr('login',6,'',127,'6','127_1',1,$(".detrep"));
            break;
    }

});