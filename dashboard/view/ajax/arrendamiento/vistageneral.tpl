<!DOCTYPE html>
<html>
<head>
    {$STY}
    <title>Vista General</title>
</head>
<body>
    <div class="card">
        <h3 class="center">Movimientos por Ruta</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>RUTA</th>
                    <th>PRESTAMOS</th>
                    <th>ABONOS</th>
                    <th>GASTOS</th>
                    <th>CAJA</th>
                    <th>ACC</th>
                </tr>
            </thead>
            <tbody id="vistag"></tbody>
        </table>
    </div>

    <div class="modal modal-fixed-footer" id="modal-icaja" style="height: 50%; width: 50%">
    <div class="modal-header head3 center" style="font-size: 22px;">Iniciar Caja</div>
    <div class="modal-content row">

        <div class="col s6 input-field">
          <input type="text" id="ivalor" class="eder" value="0">
          <label for="ivalor">Monto</label>  
        </div>

    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
        <a class="modal-action doflujo waves-effect waves-green btn-flat" id="aepicaja">Aceptar</a>
    </div>
  </div>
    

{$SCR}
{literal}
    <script type="text/javascript">
        $(function(){
            arr('login',6,'',283,'@@impresa,curdate()',0,1,$("#vistag"));

            $("#ivalor").keyup(function(e){
                var code = e.wich || e.keyCode;
                if(code == 13)
                    $("#aepicaja").click();
            });

            $("#aepicaja").click(function(){
                if($("#ivalor").val().trim() == ''){
                    Materialize.toast('Monto Requerido',4000,'red');
                    $("#ivalor").focus().select();
                    return false;
                }
                if(isNaN($("#ivalor").val())){
                    Materialize.toast('Monto No es Numerico',4000,'red');
                    $("#ivalor").focus().select();
                    return false;
                }
                insertar(404,)
            });
        });

        $(document).on('click','.mdi-clock-start',function(){
            var id = $(this).attr('gid');
            $("#modal-icaja").modal('open');
            $("#aepicaja").attr('rid',id);
            $("#ivalor").focus().select();
        });


    </script>
{/literal}
</body>
</html>