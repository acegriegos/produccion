<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Recepción Lab.</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-laboratorio.css">
  </head>
<body>
  {$NAV}
    <div class="bdy pequeño">
        <div class="card-header center  white-text hide-on-small-only" style="background-color:#0B3861 "><p class="flow-text">Recepción de Explante</p></div>
          <div class="card-panel pequeño">
          
            <div id="fexplantes">
              
              <div class="row">

                <div class="col s6 input-field">
                  <input type="text" id="vnombre">
                  <label for="vnombre">Explante</label>
                </div>

                <div class="col s6 input-field">
                  <input type="date" id="vfecha" class="datepicker eder">
                  
                </div>

              </div>
              
              <div class="row">

                <div class="col s6 input-field">
                  <input type="text" id="vvariedad" class="eder">
                  <label for="vvariedad">Variedad</label>
                </div>

              </div>
              
              <div class="row">
                
                <div class="col s6 input-field">
                  <input type="text" id="clie" placeholder="Nombre o Cédula del Cliente">
                  <label for="clie">Procedencia</label>
                </div>



              </div>


              <div class="row">
                
                <div class="col s6 input-field">
                  <input type="text" id="vcantidad" class="eder">
                  <label for="vcantidad">Cantidad</label>
                </div>

                <div class="col s6 input-field">
                  <input type="text" id="vexpectativa" class="eder">
                  <label for="vexpectativa">Expectativa</label>
                </div>

              </div>

              <div class="row">
                <a href="#!" class="btn add der" modulo="explante">Ingresar</a>
              </div>

            </div> 
 
          </div>
      </div>
    </div>

    <div class="modal" id="addClie">
      <div class="modal-header">
        Agregar Cliente
      </div>
      <div class="modal-content">
        <div class="row">
          <div class="col s6 input-field">
                  <select id="pais"></select>
                  <label for="pais">País</label>
                </div>
                
                <div class="col s6 input-field">
                  <select id="provincia"></select>
                  <label for="provincia">Provincia</label>
                </div>
                
                <div class="col s6 input-field">
                  <select id="canton"></select>
                  <label for="canton">Cantón</label>
                </div>
                
                <div class="col s6 input-field">  
                  <select id="vdistrito"></select>
                  <label for="vdistrito">Distrito</label>
                </div>
                
                <div class="col s6 input-field">  
                  <select id="vregion"></select>
                  <label for="vregion">Región</label>
                </div>
                
                <div class="col s6 input-field">  
                  <select id="vfinca"></select>
                  <label for="vfinca">Finca</label>
                </div>
                
                <div class="col s6 input-field">  
                  <select id="vcategoria"></select>
                  <label for="vcategoria">Categoría</label>
                </div>
                
                <div class="col s6 input-field">  
                  <textarea id="vdireccion"></textarea>
                  <label for="vdireccion">Otras Señas</label>
                </div>
                
                <div class="col s6 input-field">  
                  <input type="text" id="vlatitud">
                  <label for="vlatitud">Latitud</label>
                </div>

                <div class="col s6 input-field">  
                  <input type="text" id="vlongitud">
                  <label for="vlongitud">Longitud</label>
                </div>
        </div>
      </div>
    </div>


    {$SCR}
    <script src="../assets/js/modulos/laboratorio.js?v=0.1"></script>
  </body>
</html>