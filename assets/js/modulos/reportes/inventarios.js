$(function(){
    var param = getParameterByName('rep');

    switch(param){
        case 'invgen':
            //arr('login',6,'',254,'6,@@impresa,"",-1,-1,-1,-1,-1','',1,$(".detrep")); 
            $(".excel").data('parametros')['vista'] = '0,1,2,3,4,5,6,10';
            $(".excel").data('parametros')['conteo'] = 1;
            $(".excel").data('parametros')['suma'] = ',9,10,';
            $(".excel").data('parametros')['original'] = 1;

            $("#fbtns").append('<a class="der btn-floating lpc" style="margin-right:2%;" title="Inventariar"><i class="mdi mdi-format-list-checks mdi-24px"></i> </a>');

            $('.lpc').on('click',function(){
               
                
                var str = '<table> <tr> <td></td> <td>CANTIDAD</td> <td>OBSERVACION</td> </tr>';

                $("tbody tr").each(function(){
                    str += '<tr><td>'+$('td:nth-child(1)',this).html()+'</td> <td style="border-bottom:1px solid black;padding-left:25px; width: 20%"></td> <td style="border-bottom:1px solid black;padding-left:25px; width: 20%"></td> </tr>'
                })

                //console.log(str)
                newWin= window.open("");
                newWin.document.write(str);
                newWin.print();
                //newWin.close();

            })
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