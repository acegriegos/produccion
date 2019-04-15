<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Boletas</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-arrendamiento.css?v=10.0.1.17">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
        <div class="card">
          <h4 class="center">Boleta de Recibo de Dinero</h4>
          <div class="row">
            <div class="input-field col s12 m6 show_cliente" style="position: relative;">
                <i class="mdi mdi-face mdi-24px prefix"></i>
                <input type="text" id="ncli" value="" class="autocomplete validate sclie" maxlength="64" autocomplete="off"/>
                <label for="ncli">Cliente</label>

                <a class="mdi mdi-16px mdi-plus text-green pbtn tooltipped clieBTN" id="ingclie" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 8px; z-index: 180;cursor: pointer;" data-position="bottom" data-tooltip="Agregar Cliente"></a>              
              </div>

              <div class="col s6 m3">
                <select id="idboletas">
                   <option value="0" disabled>Seleccione una Boleta</option> 
                </select>
              </div>

              <a href="#" class="s6 m3 btn-floating der" id="addboleta" title="Agregar Boleta"><i class="mdi mdi-plus"></i></a>
            </div> 
        </div>
    </div>
    {$SCR}
    <script src="../assets/js/modulos/arrendamiento.js?v=10.0.1.17"></script>
  </body>
</html>