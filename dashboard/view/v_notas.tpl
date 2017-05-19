<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Notas</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-notas.css?v=0.1">


</head>
<body>
  {$NAV}
  <div class="bdy">
    <div class="card z-depth-5">
      <div class="card-header center white-text" style="background-color:#0B3861">
        <p class="flow-text" style="font-size: 1.9em;">Notas</p>
      </div>
      <div class="card-content">
        <div class="row">
          <div class="col s12 m5 ">

           <div class="row">
            <div class="col s12 ">
              <div class="switch">
                <label style="color: black; font-size: 1.5em">
                  <b>Clientes</b>
                  <input type="checkbox" id="chg_tipo" value="1" >
                  <span class="lever"></span>
                  <b>Proveedor</b>
                </label>
              </div>
            </div>

          </div>
          
            <div class="row">
              <div class="col s6">
                <div class="switch ">
                  <label style="color: black; font-size: 1.5em">

                    <input type="checkbox" id="chg_tipo" value="0" checked="1">
                    <span class="lever"></span>
                    <b>Por Numero de Factura</b>
                  </label>
                </div>
              </div>
              <div class="input-field col s12 m6 " id="ftr0">

                <i class="material-icons prefix">description</i>
                <input id="vvalor" type="text"  class="validate eder">
                <label for="vvalor" style="font-size: 1.2em !important">Numero de Factura</label>
              </div>
            </div>
             <div class="row">
              <div class="col s12">
                <div class="switch">
                  <label style="color: black; font-size: 1.5em">
                    <b></b>
                    <input type="checkbox" id="chg_tipo" value="1" >
                    <span class="lever"></span>
                    <b>Por Cliente</b>
                  </label>
                </div>
              </div>
              </div>
              <div class="row">
            <div class="input-field col s7">

              <a class="prefix  tooltipped "  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="small material-icons">search</i></a>

              <input type="text" id="search_clientes" maxlength="100" num="v29" var="nombre">
              <label class="truncate" for="search_clientes">Buscar Cliente por Nombre o Cédula</label>

            </div>
          </div>
          <div class="row">
              <br>
                <div class="col s6">
                  <div class="switch">
                  <label style="color: black; font-size: 1.5em">
                    <b></b>
                    <input type="checkbox" id="chg_tipo" value="2" >
                    <span class="lever"></span>
                    <b>Entre Fechas</b>
                  </label>
                </div>
                </div>  
              </div>
               <div class="row " id="ftr2">
                <div class="input-field col s6">


                 <i class="fa fa-calendar-o prefix"></i>
                 <label for="desde">DESDE</label>
                 <input type="date" class="datepicker " id="desde" value="" style="font-size: 1.5em; color: black; font-weight: bold;">

               </div> 

               <div class="col s6">

                <div class="input-field">


                 <i class="fa fa-calendar-o prefix"></i>
                 <label for="hasta">HASTA</label>
                 <input type="date" class="datepicker vfecha" id="hasta" value="" style="font-size: 1.5em; color: black; font-weight: bold;">

               </div>

             </div> 
           </div>










        </div>
        <!--lado derecho de la pantalla -->
        <div class="col s12 m7">

          <div class="row">
            <div class="col s12">
              <table  class="table centered highlight bordered responsive-table z-depth-3" id="data-table-Notas">
                <thead>
                  <tr>
                    <th class="sinborde white-text blue" >Factura</th>
                    <th class="sinborde white-text blue" >Nombre</th>
                    <th class="sinborde white-text blue" >Fecha</th>
                    <th class="sinborde white-text blue" >Sucursal</th>

                  </tr>
                </thead>
                <tbody id="listaclientes">

                  <tr ">
                    <td style=" padding: 10px;">1</td>
                    <td style=" padding: 10px;">1</td>
                    <td style=" padding: 10px;">1</td>
                    <td style=" padding: 10px;">1</td>

                  </tr>
                </tbody>
              </table>

            </div>      
          </div>

        </div>
      </div>


    </div>

  </div>
</div>






{$SCR}
<script src="../assets/js/modulos/notas.js?v=0.2"></script>
</body>
</html>