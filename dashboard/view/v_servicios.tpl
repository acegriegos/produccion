<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Servicio por Clientes</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-servicios.css">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
      <div class="row">
        <div class="input-field col s3">
          <input type="text" id="porrazon" placeholder="[ ---TODOS--- ]">
          <label for="porrazon">Razón Social, Cédula o Nombre Fantasia</label>
        </div>

        <div class="input-field col s3">
          <select id="porservicio" class="default-browser" multiple>
            <option value="0" selected>Todos</option>
            <option value="1">Uno</option>
          </select>
          <label for="porservicio">Servicio</label>
        </div>

        <div class="input-field col s3">
          <a class="prefix dropdown-button tooltipped pbtn"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="mdi mdi-equal mdi-24px" id="logo"></i></a>
              <ul id='filtr_1' class='dropdown-content'>
                <li><a class="optns" tipo="mdi-equal" href="#!" fltr="1">Igual</a></li>
                <li><a class="optns" tipo="mdi-greater-than" href="#!" fltr="2">Mayor</a></li>
                <li><a class="optns" tipo="mdi-greater-than-or-equal" href="#!" fltr="3">Mayor e Igual</a></li>
                <li><a class="optns" tipo="mdi-less-than" href="#!" fltr="4">Menor</a></li>
                <li><a class="optns" tipo="mdi-less-than-or-equal" href="#!" fltr="5">Menor e Igual</a></li>
              </ul>
          <input type="text" id="pormonto" class="eder numeric" value="0.00">
          <label for="pormonto">Monto Servicio</label>
        </div>

        <i class="mdi mdi-magnify mdi-24px pbtn der" title="Buscar"></i>

      </div>

      <table class="tbl striped bordered">
        <thead>
          <tr>
            <th>Razon Social</th>
            <th>Servicio</th>
            <th>Periodo</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="bservicios">
          <tr>
            <td id="init" colspan="100%" style="text-align: center;"></td>
          </tr>
        </tbody>
      </table>
    </div>
    {$SCR}
    <script src="../assets/js/modulos/servicios.js"></script>
  </body>
</html>