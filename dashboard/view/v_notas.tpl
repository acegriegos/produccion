<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Notas</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-notas.css?v=0.8">


</head>
<body>
  {$NAV}
  <div class="bdy pequeño">
    <div class="card z-depth-5">
      <div class="card-header center white-text" style="background-color:#0B3861">
        <p class="flow-text" style="font-size: 1.9em;">Notas</p>
      </div>
      <div class="card-content pequeño">
        <div class="row">
          <div class="col s12 m12 l5  ">

           <div class="row">
            <div class="col s12 m6 ">
              <div class="switch">
                <label style="color: black; font-size: 1.5em">
                  <b >Clientes</b>
                  <input type="checkbox" class="chg" value="1" id="cp">
                  <span class="lever"></span>
                  <b >Proveedor</b>
                </label>
              </div>
            </div>
            <div class="col s8 m2 offset-m4 offset-s3">
            <br>
              <a class="waves-effect waves-light btn" id="busnota">Buscar</a>

            </div>

          </div>
          
          <div class="row">
            <div class="col s12 m6">
              <div class="switch ">
                <label style="color: black; font-size: 1.5em">

                  <input type="checkbox" class="chg_tipo" value="0" checked="1">
                  <span class="lever"></span>
                  <b>Por Numero de Factura</b>
                </label>
              </div>
            </div>
            <div class="input-field col s12 m6 " id="ftr0">

              <i class="material-icons prefix">description</i>
              <input id="vfac" type="text"  class="validate eder">
              <label for="vfac" style="font-size: 1.2em !important">Numero de Factura</label>
            </div>
          </div>
          <div class="row">
            <div class="col s12 m6 ">
              <div class="switch">
                <label style="color: black; font-size: 1.5em">
                  <b></b>
                  <input type="checkbox" class="chg_tipo" value="1" >
                  <span class="lever"></span>
                  <b>Por <span class="tipoclie">Cliente</span></b>
                </label>
              </div>
            </div>
              
            <div class="input-field col hide s12 m6" id="ftr1">

              <a class="prefix  tooltipped "  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="small material-icons">search</i></a>
<label class="truncate" for="ncli" style="font-size: 1.2em !important"> <b>Nombre o Cédula del <span class="tipoclie">Cliente</span></b></label>
      <input type="text" id="ncli" var="nombre" class="autocomplete validate sclie" maxlength="64" />
              
            </div> 
          </div>

          <div class="row">

            <div class="col s12 m6">
              <div class="switch">
                <label style="color: black; font-size: 1.5em">
                  <b></b>
                  <input type="checkbox" class="chg_tipo" value="2" >
                  <span class="lever"></span>
                  <b>Entre Fechas</b>
                </label>
              </div>
            </div>  
          </div>
          <div class="row hide " id="ftr2">
            <div class="input-field col s12 m6">


             <i class="fa fa-calendar-o prefix"></i>
             <label for="desde">DESDE</label>
             <input type="date" class="datepicker " id="desde" value="" style="font-size: 1.5em; color: black; font-weight: bold;">

           </div> 

           <div class="col s12 m6">

            <div class="input-field">


             <i class="fa fa-calendar-o prefix"></i>
             <label for="hasta">HASTA</label>
             <input type="date" class="datepicker vfecha" id="hasta" value="" style="font-size: 1.5em; color: black; font-weight: bold;">

           </div>

         </div> 
       </div>
       <div class="row">

        <div class="col s12">
          <div class="switch">
            <label style="color: black; font-size: 1.5em">
              <b></b>
              <input type="checkbox" class="chg_tipo" value="3" >
              <span class="lever"></span>
              <b>Entre Numero de Facturas</b>
            </label>
          </div>
        </div>  
      </div>

      <div class="row hide"  id="ftr3">

        <div class="input-field col s12 m6 ">

          <i class="material-icons prefix">description</i>
          <input id="vnum1" type="text"  class="validate eder">
          <label for="vnum1" style="font-size: 1.2em !important">Desde la Factura</label>
        </div>
        <div class="input-field col s12 m6 " id="ASD">

          <i class="material-icons prefix">description</i>
          <input id="vnum2" type="text"  class="validate eder">
          <label for="vnum2" style="font-size: 1.2em !important">Hasta la Factura</label>
        </div>

      </div>









    </div>
    <!--lado derecho de la pantalla -->
    <div class="col s12 m12 l7 pequeño ">

      <div class="row pequeño ">
        <div class="col s12 pequeño ">
          <table  class="table centered  pequeño highlight bordered responsive-table z-depth-3 pbtns" id="data-table-Notas">
            <thead>
              <tr>
                <th class="sinborde white-text blue" >Factura</th>
                <th class="sinborde white-text blue" >Nombre</th>
                <th class="sinborde white-text blue" >Fecha</th>
                <th class="sinborde white-text blue" >Sucursal</th>

              </tr>
            </thead>
            <tbody id="listaclientes">


            </tbody>
          </table>

        </div>      
      </div>

      <ul id="acciones" class="side-nav side-nav-cuentas asd"  style="width: 60%">

      <div id="listaCuentasNotaDetalle"></div>

            </ul>
          </div>
        </div>


      </div>

    </div>
  </div>






  {$SCR}
  <script src="../assets/js/modulos/notas.js?v=0.16"></script>
</body>
</html>