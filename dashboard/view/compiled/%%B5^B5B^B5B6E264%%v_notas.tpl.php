<?php /* Smarty version 2.6.17, created on 2017-06-01 17:01:03
         compiled from v_notas.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Notas</title>
  <?php echo $this->_tpl_vars['STY']; ?>

  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-notas.css?v=0.2">


</head>
<body>
  <?php echo $this->_tpl_vars['NAV']; ?>

  <div class="bdy">
    <div class="card z-depth-5">
      <div class="card-header center white-text" style="background-color:#0B3861">
        <p class="flow-text" style="font-size: 1.9em;">Notas</p>
      </div>
      <div class="card-content">
        <div class="row">
          <div class="col s12 m12 l5 ">

           <div class="row">
            <div class="col s12 m6 ">
              <div class="switch">
                <label style="color: black; font-size: 1.5em">
                  <b>Clientes</b>
                  <input type="checkbox" class="chg" value="1" id="cp">
                  <span class="lever"></span>
                  <b>Proveedor</b>
                </label>
              </div>
            </div>
            <div class="col s12 m2 offset-m4">
              <a class="waves-effect waves-light btn" id="busnota">Buscar</a>

            </div>

          </div>
          
          <div class="row">
            <div class="col s6">
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
                  <b>Por Cliente</b>
                </label>
              </div>
            </div>
            <div class="input-field col hide s12 m6" id="ftr1">

              <a class="prefix  tooltipped "  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="small material-icons">search</i></a>
<label class="truncate" for="ncli" style="font-size: 1.2em !important"> <b>Nombre o Cédula del Cliente</b></label>
      <input type="text" id="ncli" var="nombre" class="autocomplete validate sclie" maxlength="64" />
              
            </div> 
          </div>

          <div class="row">

            <div class="col s6">
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
    <div class="col s12 m12 l7">

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


            </tbody>
          </table>

        </div>      
      </div>

      <ul id="acciones" class="side-nav side-nav-cuentas"  style="width: 60%">

      <div id="listaCuentasNotaDetalle"></div>

            </ul>
          </div>
        </div>


      </div>

    </div>
  </div>






  <?php echo $this->_tpl_vars['SCR']; ?>

  <script src="../assets/js/modulos/notas.js?v=0.11"></script>
</body>
</html>