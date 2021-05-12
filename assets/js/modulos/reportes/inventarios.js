$(function(){
    var param = getParameterByName('rep');
    switch(param){
        case 'invgen':
            arr('login',6,'',254,'6,@@impresa,"",-1,-1,-1,-1,-1,-1,""','',1,$(".detrep")); 
            console.log(getDatos('',254,'6,@@impresa,"",-1,-1,-1,-1,-1,-1,""'))
            $(".excel").data('parametros')['vista'] = '2,6,12,15';
            $(".excel").data('parametros')['conteo'] = 1;
            $(".excel").data('parametros')['suma'] = ',6,15,';
            $(".excel").data('parametros')['original'] = 1;

            $("#fbtns").append('<a class="der btn-floating lpc" style="margin-right:2%;" title="Inventariar"><i class="mdi mdi-format-list-checks mdi-24px"></i> </a>');

            $('.lpc').on('click',function(){
               
                
                var str = '<style>           th, td {                 padding-top: 1%;                 background-color:none;             }  .borde{border-bottom: 1px solid black; margin-left:2%}        </style> <table style="width: 100%" cellspadding="2"> <tr style="margin-bottom: 2%"> <td style="width: 50%"></td> <td style="width: 3%;" align="center">CANTIDAD</td> <td style="width:2%"></td> <td style="width: 45%" align="center">OBSERVACION</td> </tr>';

                var last = $("tbody tr").length-1;

                $("tbody tr").each(function(index){
                    if(index != last)
                    str += '<tr><td style="size: 8px">'+$('td:nth-child(1)',this).html()+'</td> <td class="borde"></td> <td></td> <td class="borde"></td> </tr>'
                });

                //console.log(str)
                newWin= window.open("");
                newWin.document.write(str);
                newWin.print();
                newWin.close();

            });

            $("#vidtipo1").keyup(function(e){
                var code = e.wich || e.keyCode;
                if(code == 13)
                    doreport();
            });
            break;
        case 'movinv':
             arr('login',6,'',284,'"","",0,@@impresa,0,0,0','',1,$(".detrep"));
            break;
        case 'inventarios':
            arr('login',6,'',127,'6,@@impresa','127_1',1,$(".detrep"));
            break;
        case 'movprod':
            
            var orden = '0,1,8,6,7,2,3,4,5';
            var suma = ',2,7,';
            var conteo = 1;

            $(".excel").data('parametros')['vista'] = orden;
            $(".excel").data('parametros')['conteo'] = conteo;
            $(".excel").data('parametros')['suma'] = suma;

            //arr('login',6,'',329,'0,0','271',1,$(".detrep"),0,Array(Array('orden',orden),Array('conteo',conteo),Array('suma',suma)));
            $("#vidtipo1").change(function(){
                if($(this).val() == "1")
                    $(".principal .filtros").removeAttr('bisprov')
                else
                    $(".principal .filtros").attr('bisprov',1)
            });

            $("#chktipo1").click();
            $("#vidtipo1").change();

            $("#doreport").click(function(){
                if($("#cliente").val().trim() == '')
                    $("#vidcliente").val(0)
                if($("#productos").val().trim() == '')
                    $("#vidproducto").val(0)

                if($("#vidcliente").val() == '0' && $("#vidproducto").val() != '0')
                    $(".excel").data('parametros')['vista'] = '8,6,7,2,3,4,5';
                else /*if($("#vidcliente").val() != '0' && $("#vidproducto").val() == '0')*/
                    $(".excel").data('parametros')['vista'] = '0,1,6,7,2,3,4,5';

                var leyenda = $("#vidtipo1 option:selected").html()

                if($("#vdesde").val() == ''){
                    var fecha = new Date();
                    var hasta = fecha.getFullYear()+'-'+("0"+(fecha.getMonth()+1)).slice(-2)+'-'+("0"+fecha.getDate()).slice(-2);
                    leyenda += ' Desde Hasta '+Hasta
                }

                $("#leyenda").html(leyenda)


            });

            break;
        default:
            break;
            
    }

});