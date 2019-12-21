<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Reporte D-151</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.2.0.49">
</head>
<body class="black">
  <div class="principal contenedor" >
      <div class="filtros row" entrefechas entrenumeros elem="@@impresa" sp="235" modulo="dinformativa" style="margin:0px;"></div>
      <!-- HEADER -->
    <div class="row header">
      <!-- <div class="col s4 m4 l4">
        {if $MIS[3]}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s4 m4 l4" align="center">
        <font size="3">
          <b>{$MIS[0]}</b><br>
          {if $MIS[2]}<b>{$MIS[2]}</b><br>{/if}
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
         
      </div> -->
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" id="ofiltr" title="Mostrar Filtros"></i>
      </div>
    </div>

<!--     <div class="center">
      <h3>Declaraciones Informativas</h3>
      <span id="leyenda"></span>
    </div> -->
    
    <table class="table responsive-table centered bordered z-depth-3 detrep" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
      <tbody style="text-align: center;font-size: 18px;" id="cabeza">
        <tr><!-- 
            <td>
              {if $MIS[3]}
              <img src="{$MIS[3]}" class="img-responsive" style="width: 100%">
              {/if}
            </td> -->
            <td colspan="100%"> 
              <b id="sucursal">{$MIS[0]}</b><br>
              {if $MIS[2]}{$MIS[2]}</b><br>{/if}
              <b>Cédula:</b> {$MIS[1]}<br>
              <b>Teléfono:</b> {$MIS[5]}<br>
              <h3>Declaraciones Informativas</h3>
              <span id="leyenda">D151</span>
            </td>
        </tr>
      </tbody>
      
      <tr><td class="center" colspan="100%">No se a Seleccionado Ninguna Declaración</td></tr>
    </table>
  </div>
  {$SCR}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.2.0.49"></script>
  <script src="../assets/js/modulos/reportes/xlsx.core.min.js?v=10.2.0.49"></script>
  <script src="../assets/js/modulos/reportes/FileSaver.min.js?v=10.2.0.49"></script>
  <script src="../assets/js/modulos/reportes/tableexport.min.js?v=10.2.0.49"></script>
  {literal}
  <script type="text/javascript">

    function rxlxs(cabeza){
      $(".detrep").prepend(cabeza);
      //$("table").tableExport();

      if($(".excel").length){
        $(".excel").addClass('exc').removeClass('excel');
      }

      var ExportButtons = document.getElementById('data-table-ventas');

      var instance = new TableExport(ExportButtons, {
          formats: ['xlsx'],
          exportButtons: false,
          filename: $("#leyenda").html()+', '+$("#sucursal").html()
      });

      var exportData = instance.getExportData()['data-table-ventas']['xlsx'];
      $(".exc").unbind();
      $(".exc").click(function (e) {
        instance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
      });
     
    }

    $(function(){   

      $(".principal .filtros").append('<div class="col s6"> <select id="vdeclaracion" class="browser-default"> <option value="0" selected>Seleccione una Declaración</option> <option value="1">D151</option> <option value="2">D104-2</option> </select> </div>');

      $("#vdeclaracion").change(function(){
        var date = new Date(); 
        if(!$("#xfec").is(":checked"))
          $("#xfec").prop('checked',true).change()
        
        switch(parseInt($('option:selected',this).val())){
          case 1:
            if(date.getFullYear() >= 2019){
              $("#vdesde").attr('type','date').val((date.getFullYear()-1)+'-10-01');
              $("#vhasta").val(date.getFullYear()+'-09-30').show();
            }

            if(!$("#xum").is(":checked"))
              $("#xum").prop('checked',true).change()

            $("#vnum1").val(2500000);
            break;
          case 2:
            $("#vdesde").attr('type','month').val(date.getFullYear()+'-'+(date.getMonth()+1))
            $("#vhasta").val('').hide();

            if($("#xum").is(":checked"))
              $("#xum").prop('checked',false).change()

            $("#vnum1").val(0);
            $("#vnum2").val(0);
            break;
          default:
            break;
        }
      });



    })
  </script>
  {/literal}
</body>
</html>