$(function(){
    var param = getParameterByName('rep');

    switch(param){
        case 'invgen':
            arr('login',6,'',254,'6,0,"","",@@impresa,0,0,0,-1,-1,-1,-1,-1,-1','',1,$(".detrep")); 
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