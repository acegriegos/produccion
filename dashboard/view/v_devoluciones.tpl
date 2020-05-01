<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Devoluciones</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-devoluciones.css?v=10.2.0.69">
</head>
<body>
  {$NAV}
  <div class="bdy pequeño card z-depth-5">
    <div class="card-header center head1">
      <p class="flow-text">Devoluciones</p>
    </div>
    <div class="card-content pequeño row marginzero" style="padding-top: 0;">
      <div class="col s12 m12 l12">
        <!-- Realizar o mostrar devoluciones -->
        <div class="row marginzero">
          <div class="col s12 m12 l12">
            <div class="switch">
              <label style="color: black; font-size: 1.3em">
                <b>Realizar Devolución</b>
                <input type="checkbox" class="chgtipo" value="0" id="tpdev">
                <span class="lever"></span>
                <b>Ver devolución</b>
              </label>
            </div>
          </div>
        </div>
        <br>
        <div class="row marginzero">
          <div class="col s12 m10 l10">
            <div class="switch">
              <label style="color: black; font-size: 1.2em">
                <b>Clientes</b>
                <input type="checkbox" class="chg" value="1" id="cp">
                <span class="lever"></span>
                <b>Proveedor</b>
              </label>
            </div>
          </div>
          <div class="col s12 m2 2">
            <a class="waves-effect waves-light btn btn1" id="srchfact">Buscar</a>
          </div>
        </div>
        <div class="row">
          <div class="col s12 m6 l6">
            <div class="row marginzero">
              <div class="col s12 m12 l12">
                <div class="switch ">
                  <label style="color: black; font-size: 1.1em">
                    <input type="checkbox" class="chg_tipo" value="0">
                    <span class="lever"></span>
                    <b>Por Numero de Factura</b>
                  </label>
                </div>
              </div>
              <div class="input-field col s12 m12 hide" id="ftr0">
                <i class=" mdi mdi-magnify mdi-24px prefix"></i>
                <input id="vfac" type="text"  class="validate">
                <label for="vfac" style="font-size: 1em !important">Numero de Factura</label>
              </div>
            </div>
          </div>
          <div class="col s12 m6 l6">
            <div class="row marginzero">
              <div class="col s12 m12 ">
                <div class="switch">
                  <label style="color: black; font-size: 1.1em">
                    <input type="checkbox" class="chg_tipo" value="1" >
                    <span class="lever"></span>
                    <b>Por <span class="tipoclie">Cliente</span></b>
                    </label>
                </div>
              </div>
              <div class="input-field col hide s12 m12" id="ftr1">
                <a class="prefix  tooltipped "  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"><i class="small mdi mdi-magnify mdi-24px"></i></a>
                <label class="truncate" for="ncli" style="font-size: 1em !important"> Nombre o Cédula del <span class="tipoclie">Cliente</span></label>
                <input type="text" id="ncli" var="nombre" class="autocomplete validate sclie" maxlength="64" />
              </div> 
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col s12 m6 l6">
            <div class="row marginzero">
              <div class="col s12 m12">
                <div class="switch">
                  <label style="color: black; font-size: 1.1em">
                    <input type="checkbox" class="chg_tipo" value="2" >
                    <span class="lever"></span>
                    <b>Entre Fechas</b>
                  </label>
                </div>
              </div>  
            </div>
            <div class="row marginzero hide" id="ftr2">
              <div class="input-field col s12 m6">
                <i class="mdi mdi-24px mdi-calendar-question prefix"></i>
                <input type="date" class="datepicker " id="desde" value="" style="font-size: 1em; color: black; font-weight: bold;">
              </div>
              <div class="input-field col s12 m6">
                  <i class="mdi mdi-24px mdi-calendar-question prefix"></i>
                  <input type="date" class="datepicker" id="hasta" value="" style="font-size: 1em; color: black; font-weight: bold;">
              </div> 
            </div>
          </div>
          <div class="col s12 m6 l6">
            <div class="row">
              <div class="col s12">
                <div class="switch">
                  <label style="color: black; font-size: 1.1em">
                    <input type="checkbox" class="chg_tipo" value="3">
                    <span class="lever"></span>
                    <b>Entre Numero de Facturas</b>
                  </label>
                </div>
              </div>  
            </div>
            <div class="row marginzero hide"  id="ftr3">
              <div class="input-field col s12 m6">
                <i class="mdi mdi-sort-numeric mdi-24px prefix"></i>
                <input id="vnum1" type="text"  class="validate eder">
                <label for="vnum1" style="font-size: 1em !important">Desde la Factura</label>
              </div>
              <div class="input-field col s12 m6" id="ASD">
                <i class="mdi mdi-sort-numeric mdi-24px prefix"></i>
                <input id="vnum2" type="text"  class="validate eder">
                <label for="vnum2" style="font-size: 1em !important">Hasta la Factura</label>
              </div>
            </div>
          </div>
        </div>
        <!-- Fin realizar o mostrar devoluciones -->
        <div id="toolDevolucion"></div>
        
        
        
      </div>
      <!--lado derecho de la pantalla -->
      <div class="col s12 m12 l12 pequeño" style="margin-top: 3%">
        <div class="row pequeño ">
          <div class="col s12 pequeño ">
            <table  class="table centered pequeño highlight bordered responsive-table z-depth-3 pbtns" id="data-table-facturas">
              <thead>
                <tr>
                  <th class="sinborde white-text tab1">Factura</th>
                  <th class="sinborde white-text tab1">Nombre</th>
                  <th class="sinborde white-text tab1">Fecha</th>
                  <th class="sinborde white-text tab1">Sucursal</th>
                </tr>
              </thead>
              <tbody id="listafacturas">

              </tbody>
            </table>
          </div>      
        </div>
        <ul id="acciones" class="side-nav side-nav-cuentas asd"  style="width: 60%">
          <div id="listaDetalleFacturas"></div>
        </ul>
      </div>
    </div>
  </div>
  {$SCR}
  <script src="../assets/js/modulos/devoluciones.js?v=10.2.0.69"></script>
</body>
</html>