<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Ajustes Laboratorio</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-laboratorio.css">
  </head>
<body>
  {$NAV}
    <div class="bdy pequeño">
        <div class="card-header center  white-text hide-on-small-only" style="background-color:#0B3861 "><p class="flow-text"></p>
         <div class="col s12">
            Ajustes de Laboratorio
          </div>
        </div>
          <div class="card-panel pequeño">
            
            <div class="row">
              
              <div class="col s12 m4 input-field">
                <select multiple id="invVariedad">
                  <option disabled selected value="0">Seleccione una Opción</option>
                  {section name=LE loop=$INV}
                    <option value="{$INV[LE][0]}">{$INV[LE][1]}</option>
                  {/section}
                </select>
                <label for="invVariedad">Inventarios Variedades</label>
              </div>

            </div>
 
          </div>
      </div>
    </div>


    {$SCR}
    <script src="../assets/js/modulos/laboratorio.js?v=0.1"></script>
  </body>
</html>