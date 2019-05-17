<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Notas</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-notas.css?v=10.0.1.22">
</head>
<body>
  {$NAV}
  <div class="bdy pequeño">
    <div class="card z-depth-3">
      <div class="card-header center head1">
        <span class="flow-text">Notas</span>
        <a href="vistanotaspagos" target="_new" class="der pbtn tooltipped white-text" data-tooltip="Ver Notas" data-position="botton"><i class="mdi mdi-magnify mdi-24px" ></i></a>
      </div>
      <div class="card-content pequeño">
        <div class="row">
          <div class="col s12 m12 l12">
            <div class="row">
             <div class="col s10 m10 l10 {if $smarty.session.BUSS eq 1} hide {/if} ">
                <div class="switch hide">
                  <label style="color: black; font-size: 1.3em">
                    <b>Clientes</b>
                    <input type="checkbox" class="chg" value="1" id="cp">
                    <span class="lever"></span>
                    <b>Proveedor</b>
                  </label>
                </div>
              </div>
              <div class="col s2 hide">
                <a class="waves-effect waves-light btn btn1" id="busnota">Buscar</a>
              </div>
            </div>
            <div class="row">
              <div class="col s12 m6 l6">
                <div class="row">
                  <div class="col s12 m12 l12 hide">
                    <div class="switch ">
                      <label style="color: black; font-size: 1.1em">
                        <input type="checkbox" class="chg_tipo" value="0">
                        <span class="lever"></span>
                        <b>Por Numero de Factura</b>
                      </label>
                    </div>
                  </div>
                  <div class="input-field col s12 m12 " id="ftr0">
                    <div class="row">
                      <div class="col s12">
                        <i class=" mdi mdi-magnify mdi-24px prefix"></i>
                        <input id="vfac" type="text"  class="validate eder">
                        <label for="vfac" style="font-size: 1em !important">Numero de Factura</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col s12 m6 l6 hide">
                <div class="row">
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
                    <input type="text" id="ncli" var="nombre" class="autocomplete validate sclie snota" maxlength="64" />
                  </div> 
                </div>
              </div>
            </div>

            <div class="row hide">
              <div class="col s12 m6 l6">
                <div class="row">
                  <div class="col s12 m6">
                    <div class="switch">
                      <label style="color: black; font-size: 1.1em">
                        <input type="checkbox" class="chg_tipo" value="2" >
                        <span class="lever"></span>
                        <b>Entre Fechas</b>
                      </label>
                    </div>
                  </div>  
                </div>
                <div class="row hide " id="ftr2">
                  <div class="input-field col s12 m6">
                    <i class="mdi mdi-24px mdi-calendar-question prefix"></i>
                    <label for="desde">DESDE</label>
                    <input type="date" class="datepicker " id="desde" value="" style="font-size: 1em; color: black; font-weight: bold;">
                  </div>
                  <div class="col s12 m6">
                    <div class="input-field">
                      <i class="mdi mdi-24px mdi-calendar-question prefix"></i>
                      <label for="hasta">HASTA</label>
                      <input type="date" class="datepicker vfecha" id="hasta" value="" style="font-size: 1em; color: black; font-weight: bold;">
                    </div>
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
                <div class="row hide"  id="ftr3">
                  <div class="input-field col s12 m6 ">
                    <i class="mdi mdi-sort-numeric mdi-24px prefix"></i>
                    <input id="vnum1" type="text"  class="validate eder">
                    <label for="vnum1" style="font-size: 1em !important">Desde la Factura</label>
                  </div>
                  <div class="input-field col s12 m6 " id="ASD">
                    <i class="mdi mdi-sort-numeric mdi-24px prefix"></i>
                    <input id="vnum2" type="text"  class="validate eder">
                    <label for="vnum2" style="font-size: 1em !important">Hasta la Factura</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--lado derecho de la pantalla -->
          <div class="col s12 m12 l12 pequeño ">
            <div class="row pequeño ">
              <div class="col s12 pequeño ">
                <table  class="dt-responsive nowrap centered striped bordered highlight z-depth-3" id="data-table-Notas">
                  <thead>
                    <tr>
                      <th class="sinborde white-text tab1">Factura</th>
                      <th class="sinborde white-text tab1">Cliente</th>
                      <th class="sinborde white-text tab1">Fecha</th>
                      <th class="sinborde white-text tab1">Sucursal</th>
                    </tr>
                  </thead>
                  <tbody id="listaclientes">

                  </tbody>
                </table>
                <ul class="left showing" modulo="302"><small></small></ul>
                <ul class="pagination right" vtbl="302" modulo="facturas" filtro_sp="0,0,0,,,0,0,@@impresa"></ul>
              </div>      
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  {$SCR}
  <script src="../assets/js/modulos/notas.js?v=10.0.1.22"></script>
</body>
</html>