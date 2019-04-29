<!DOCTYPE html>
<html>
<head>
    {$STY}
    <title>Vista General</title>
</head>
<body>
    <div class="card">
        <h3 class="center">Movimientos por Usuario</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>USUARIO</th>
                    <th>RUTA</th>
                    <th>PRESTAMOS</th>
                    <th>ABONOS</th>
                    <th>GASTOS</th>
                    <th>CAJA</th>
                </tr>
            </thead>
            <tbody id="vistag"></tbody>
        </table>
    </div>
    

{$SCR}
{literal}
    <script type="text/javascript">
        $(function(){
            arr('login',6,'',283,'@@impresa,curdate()',0,1,$("#vistag"));
        })
    </script>
{/literal}
</body>
</html>