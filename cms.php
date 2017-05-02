<!DOCTYPE html>
<html>
<head>
    <title>CMS</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.ico">
    <link rel="stylesheet" href="assets/css/materialize.css">
    <link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="assets/css/modulos/style-menu.css">
    <link rel="stylesheet" type="text/css" href="assets/fonts/material-icons.css">
    <link rel="stylesheet" type="text/css" href="assets/css/system.min.css">
    <style type="text/css">
        .rbtn{
            width: 100%;
            text-align: left;
            margin-bottom: 2px;
        }
    </style>
</head>
<body>

    <div style="width: 12%; background-color: #766363; height: 100vh;float: left;position: fixed;">
        MENU<br>
        <a href="#" class="btn place" tp="1">TEXTO</a><br>
        <hr>
        <a href="#" class="btn green rbtn mkcss">CSS</a><br>
        <a href="#" class="btn blue rbtn mkhtml">HTML</a><br>

    </div>
<div style="width: 88%;padding-top: 1%;margin-left: 12%;">
    <div class="canvas" style="border: 1px dashed black; height: 95vh;width: 95%; margin-left: 2%;background-color: white;/*overflow: scroll;*/">
        
    </div>
</div>

    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/mask/jquery.mask.js"></script>
    <script src="assets/js/materialize.js?v=1.8"></script>
    <script src="assets/js/modulos/menu.js?v=1.4"></script>
    <script src="assets/libs/charts/chart.js"></script>
    <script src="assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
    <script src="assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
    <script src="assets/js/asgard.js?v=1.16"></script>
    <script type="text/javascript">
        var tp = 0;
        var cobj = 0;

        $(function(){

            $(".place").click(function(){
                $(".canvas").css('cursor','copy');
                tp = $(this).attr('tp');
            });

            $(".canvas").click(function(e){
                if (tp != 0) {
                    $(".canvas").css('cursor','default');
                    placeObject(e.pageX,e.pageY);
                    tp = 0;
                }
                
            });

            $(".mkcss").click(function(){
                var ocss = {};
                $("[id^=elem_]").each(function(i){

                    ocss[i] = {
                        top: 0,
                        left: 0
                    };

                    ocss[i].top = $(this).offset().top - $(this).parent().offset().top - $(this).parent().scrollTop();
                    ocss[i].left = $(this).offset().left - $(this).parent().offset().left - $(this).parent().scrollLeft();
                });

            });
        });

        function placeObject(posX,posY){
            var obj = '';
            cobj += 1;

            switch(parseInt(tp)){
                case 1:
                    obj = '<input type="text" class="resize" id="elem_'+cobj+'" placeholder="Texto"/>';
                    break;
                default:
                    break;
            }

            $(".canvas").append(obj);
            var new_elemt = $("#elem_"+cobj);
            new_elemt.css({'top':posY,'left':posX,'width':'10%','position':'absolute'}).fadeIn('slow');
        }
    </script>
</body>
</html>
