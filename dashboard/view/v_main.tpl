<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Sistema BMS</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu.css">

  </head>
  <body>
    {$NAV}
    <div class="bdy">
    {if $smarty.session.TIPO eq 1}
        <div class="row">
            <div class="input-field col s12 m6 l3">

                <select>
                    <option value="0">Todas las Sucursales</option>
                    {section name=LE loop=$SUC}
                    <option value="{$SUC[LE][0]}">{$SUC[LE][1]}</option>
                    {/section}
                </select>
                <label>Seleccione una Sucursal</label>
            </div>
        </div>
    {/if}
    

    </div>
    <script src="../assets/js/main.js"></script>
  </body>
</html>