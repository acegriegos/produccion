<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Boletas de Inventario</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-listaboletas.css?v=10.1.0.41">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
       <div class="card-block">
            <table  class="table centered striped bordered highlight z-depth-3 pequeño dt-responsive nowrap" id="data-table-listaboletas" cellspacing="0" width="100%" style="width: 100%">
              <thead>
                <tr>
                  <th class="sinborde white-text tab1"><b>Boleta</b></th>
                  <th class="sinborde white-text tab1">Fecha</th>
                  <th class="sinborde white-text tab1">Tipo</th>
                  <th class="sinborde white-text tab1">Usuario</th>
                  <th class="sinborde white-text tab1">Acciones</th>
                </tr>
              </thead>
              <tbody id="listaclientes">
                {section name=LE loop=$LBO}
                <tr id="f{$LBO[LE][0]}">
                  <td style=" padding: 0px !important;color:black">{$LBO[LE][0]}</td>
                  <td style=" padding: 0px !important;color:black">{$LBO[LE][1]}</td>
                  <td style=" padding: 0px !important;color:black">{$LBO[LE][2]}</td>
                  <td style=" padding: 0px !important;color:black">{$LBO[LE][3]}</td>
                  <td>
                    <a href="productos?accion=4&id={$LBO[LE][4]}&tp=false" target="_blank" class="mdi mdi-24px mdi-eye" style="color:black"></a>
                    <a href="#modal-clientes" class="load mdi mdi-pencil mdi-24px pbtn per1002 modal-trigger" id="m{$LBO[LE][4]}" modulo="listaboleta" style="color:black"></a>
                    <a href="#" class="delete mdi mdi-close mdi-24px pbtn per1003" modulo="listaboleta" id="d{$LBO[LE][4]}" style="color:black"></a>
                  </td>
                </tr>
                {/section}
              </tbody>
            </table>
            <ul class="left showing" modulo="76"><small></small></ul>
            <ul class="pagination right" vtbl="76" modulo="clientes" cambio="29" filtro_sp="?,0,@@impresa"></ul>
          <br>
          <br>
        </div>
    </div>
    {$SCR}
    <script src="../assets/js/modulos/listaboletas.js?v=10.1.0.41"></script>
  </body>
</html>