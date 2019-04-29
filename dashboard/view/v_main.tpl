<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Cache-Control" content="max-age=86400"/>
        <title>Sistema BMS</title>
        {$STY}
        <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu.css?v=10.0.1.18">
    </head>
    <body>
        {$NAV}
        <div class="bdy">
            <div class="row" style="border-bottom: 1px solid #e2e2e2">
                
                <div class="input-field col s12 m6 l3">
                <select class="ssuc" id="mchange" sel="{$smarty.session.TMP_CIA}"></select>
                <label>Seleccione una Sucursal</label>
            </div>
            {if $USRCIERRE eq 1}
            <div id="fcajainicialusuarios">
                <div class="input-field col s12 m6 l3" style="border: 3px">
                    <i class="prefix">{$MONEDA}</i>
                    <input type="hidden" id="vidusuario" value="">
                    <input type="number" id="vmonto" value="0">
                    <input type="hidden" id="vid" value="0">
                    <input type="hidden" id="vidsucursal" value="">
                    <input type="hidden" id="vfmonto" value="1">
                    <input type="hidden" id="vcajareal" value="0">
                    <label for="vmonto">Monto Caja Inicial</label>
                </div>
                <div class="col s3 m3 l3">
                    <button class="waves-effect waves-light btn1 btn" id="iniciar" modulo="cajainicialusuario">Iniciar Caja</button>
                </div>
            </div>
            {/if}
            <div class="col s12 m6 l3">
                <label class="red-text">{$MSJ}</label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12 m6 pequeño " id="graf1">
            <canvas class="charts" id="chartG1" width="100%" height="50"></canvas>
        </div>
    </div>
    {$SCR}
    <script src="../assets/js/modulos/main.js?v=10.0.1.18"></script>
</body>
</html>