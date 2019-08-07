$(function(){
    var param = getParameterByName('rep');

    switch(param){
        case 'invgen':
            arr('login',6,'',254,'6,0,"","",@@impresa,0,0,0,-1,-1,-1,-1,-1,-1','',1,$(".detrep")); 
            $(".excel").data('parametros')['vista'] = '0,1,2,3,4,5,6,10';
            $(".excel").data('parametros')['conteo'] = 1;
            $(".excel").data('parametros')['suma'] = ',9,10,';
            $(".excel").data('parametros')['original'] = 1;
            break;
        case 'movinv':
            arr('login',6,'',255,'6,0,"","",@@impresa,0','',1,$(".detrep")); 
            break;
        case 'inventarios':
            arr('login',6,'',127,'6,@@impresa','127_1',1,$(".detrep"));
            break;
        default:
            break;
            
    }

});