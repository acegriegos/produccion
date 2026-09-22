<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Area de Recursos Humanos</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-rrhh.css?v=10.4.0.11-1">
  </head>
  <body>
    {$NAV}
    <div class="bdy" style="margin-top: 0px;">

      <div class="row no-margin">
           <nav class="z-depth-1" style="background:#f5f5f5;">
            <div class="nav-wrapper" style="line-height:56px; padding:0 10px;">

              <!-- Contexto / Info -->
              <ul class="left">
                <li>
                  <span class="black-text" style="font-size:14px;">
                    📅 Próximo pago:
                    <b>
                      <span class="pquin hide" id="dquin"></span>
                      <span class="psem hide" id="dsem"></span>
                    </b>
                  </span>
                </li>
              </ul>

              <!-- Navegación principal -->
              <ul class="right hide-on-med-and-down">

                <!-- Uso diario -->
                <li>
                  <a class="btn-flat tooltipped mn2 active"
                     data-tooltip="Inicio / Dashboard"
                     data-position="bottom"
                     num="0">
                    INICIO
                  </a>
                </li>

                <li>
                  <a class="btn-flat tooltipped mn2"
                     data-tooltip="Mantenimiento de Empleados"
                     data-position="bottom"
                     num="1">
                    EMPLEADOS
                  </a>
                </li>

                <!-- Gestion Laboral -->

                <li>
                  <a class="dropdown-button btn-flat"
                     href="#!"
                     data-activates="submenuGestion">
                    ASISTENCIA
                  </a>

                  <ul id="submenuGestion" class="dropdown-content" style="min-width: 200px !important;">
                  <li>
                    <a class="mn2" num="5">
                      ⏱️
                      Marcas
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li>
                    <a class="mn2" num="4">
                      🌴
                      Vacaciones
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li>
                    <a class="mn2" num="7">
                      🏥
                      Incapacidades
                    </a>
                  </li>
                </ul>
                </li>

                <!-- Planilla -->
                <li>
                  <a class="dropdown-button btn-flat"
                     href="#!"
                     data-activates="planillas">
                    PLANILLA
                  </a>
                  <ul id="planillas" class="dropdown-content" style="min-width: 200px">
                    <li>
                      <a class="mn2" num="3">
                        💵 Planilla
                      </a>
                    </li>
                    <li class="divider"></li>
                    <li>
                      <a class="mn2" num="9">
                        <i class="mdi mdi-file-document-alert-outline"></i>
                        🎁 Aguinaldo
                      </a>
                    </li>
                    <li class="divider"></li>
                    <li>
                    <a class="mn2" num="8">
                      <i class="mdi mdi-file-document-alert-outline"></i>
                      📄 Cesantías
                    </a>
                    </li>
                    <li class="divider"></li>
                    <li>
                    <a class="mn2" num="8">
                      <i class="mdi mdi-file-document-alert-outline"></i>
                      ➖ Otras Deducciones
                    </a>
                  </li>
                  </ul>
                </li>

                <!-- Acciones secundarias -->
                <li>
                  <a class="dropdown-button btn-flat"
                     href="#!"
                     data-activates="menuRRHH">
                    ⚙
                  </a>
                  <ul id="menuRRHH" class="dropdown-content" style="min-width: 200px">
                    <li>
                      <a class="mn2" num="2">
                        ⚙ Ajustes RRHH
                      </a>
                    </li>
                    <li class="divider"></li>
                    <li>
                      <a class="mn2" num="10">
                        📊 Reportes
                      </a>
                    </li>
                  </ul>
                </li>

              </ul>

          </div>
        </nav>

        <div class="col s12" id="_rrhh" style="background-color: white; height: 100vh;padding-top: 2%;">

          <section id="sect0" class="sectbase">

          <div class="row">
            <div class="col s3">
              <div class="card">
                <div class="card-content center">
                  <span class="card-title">Empleados Activos</span>

                  <div style="position: relative; height: 180px;">
                    <canvas id="chart_empleados_tipo"></canvas>
                  </div>

                  <div class="grey-text" style="font-size:12px;">
                    Distribución por tipo de jornada
                  </div>
                </div>
              </div>
            </div>

            <div class="col s3">
              <div class="card-panel center green lighten-4">
                <h6>Asistencia Hoy</h6>
                <h4 id="kpi_asistencia"><span id="kpis_asis_porcentaje"></span>%</h4>
              </div>
            </div>

            <div class="col s3 pbtn mn2" num="4">
              <div class="card-panel center amber lighten-4">
                <h6>Vacaciones Activas</h6>
                <h4 id="kpi_vacaciones">0</h4>
              </div>
            </div>

            <div class="col s3">
              <div class="card-panel center red lighten-4">
                <h6>Alertas</h6>
                <h4 id="kpi_alertas" class="tooltipped pbtn" data-position="button" data-tooltip="✔ Incluye:
Marcas incompletas,Incapacidades sin respaldo,Vacaciones críticas, Conflictos de horario,Marcas fuera de rango">0</h4>
              </div>
            </div>

             <div class="col s3 pbtn mn2" num="3">
              <div class="card-panel center teal lighten-4">
                <h6>Costo Planilla</h6>
                <h4 id="kpi_costo">₡0</h4>
                <span class="grey-text">Mes actual</span>
              </div>
            </div>

            <!-- 📊 EFICIENCIA -->
            <div class="col s3">
              <div class="card-panel center indigo lighten-4">
                <h6>Eficiencia</h6>
                <h4 id="kpi_eficiencia">0%</h4>
                <span class="grey-text">Horas trabajadas vs programadas</span>
              </div>
            </div>

          </div>

          <div class="row" style="background: white;">

            <div class="col s8">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">Resumen de Asistencia (Semana)</span>
                  <canvas id="chart_asistencia"></canvas>
                </div>
              </div>
            </div>

            <div class="col s4">
              <ul class="collection with-header">
                <li class="collection-header"><b>Alertas Importantes</b></li>
                <li class="collection-item">⛔ Marcas sin salida: <span id="a_marcas">0</span></li>
                <li class="collection-item">⚠ Incapacidades activas: <span id="a_incap">0</span></li>
                <li class="collection-item">📅 Vacaciones críticas: <span id="a_vac">0</span></li>
              </ul>
            </div>

          </div>

        </section>

        

          <section id="sect5" class="sectbase hide">
            <div class="row">
              <div class="input-field col s3">
                <i class="mdi mdi-account mdi-24px prefix"></i>
                <input type="text" id="usr_name" maxlength="9" autocomplete="off" class="autocomplete usr_name" vid="0">
                <label for="usr_name">Ingrese Cedula de Empleado</label>
              </div>

                <div class="col s3 _con_marcas input-field">
                  <i class="mdi mdi-calendar mdi-24px prefix"></i>
                  <input type="date" id="marca_desde" class="eder" autocomplete="off">
                  <label for="marca_desde">Desde</label>
                </div>

                <div class="col s3 _con_marcas input-field">
                  <i class="mdi mdi-calendar mdi-24px prefix"></i>
                  <input type="date" id="marca_hasta" class="eder" autocomplete="off">
                  <label for="marca_hasta">Hasta</label>
                </div>

                <div class="col s3 _con_marcas"> 
                    <a class="btn" title="Marcas que no completaron el flujo">Error de Proceso (<span id="marcas_sin_salida">0</span>)</a>
                    <i class="mdi mdi-magnify mdi-24px der pbtn" title="Buscar" id="searchMarcas"> </i>
                    <i class="mdi mdi-file-excel mdi-24px der pbtn tbl_to_xls" idname="marcas_tiempo_real" filename="Reporte Marcas" title="Descargar Excel"> </i>
                </div>

            </div>
              <div class="center"> 
                <b> <span id="marcas_desde"></span> <span id="marcas_hasta"></span> </b>

                <div style="float: right;">
                  <input type="radio" id="vlista_marcas" vid="1" name="_tipoMarca" checked>
                  <label for="vlista_marcas">Lista</label>

                  <input type="radio" id="vporsemana_marcas" vid="2" name="_tipoMarca">
                  <label for="vporsemana_marcas">Semanal</label>
                </div>
              </div>

              <table id="marcas_tiempo_real" class="tbl striped bordered centered">
                <tr style="background-color: lightsalmon;" id="header_mtr">
                </tr>
                <tbody id="listaEmpleadoMarcas"></tbody>
              </table>

          </section>
          
          <section id="sect1" class="sectbase hide">
            <i class="btn-floating mdi mdi-24px mdi-plus center" id="mnt-empleado" style="cursor: pointer; float: right;"></i>
            <table class="tbl striped bordered">
              <tr style="background-color: lightblue">
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Salario Neto</th>
                <th>Hora</th>
                <th>Extra</th>
                <th>Puesto</th>
                <th>Departamento</th>
                <th>Acciones</th>
              </tr>
              <tbody id="listaempleados"></tbody>
            </table>

          </section>

          <section id="sect4" class="sectbase hide">

            <!-- Filtros -->
            <div class="row">
              <div class="input-field col s3">
                <i class="mdi mdi-account mdi-24px prefix"></i>
                <input type="text" id="f_empleado" autocomplete="off" class="usr_name">
                <label for="f_empleado">Empleado (nombre o cédula)</label>
              </div>

              <div class="input-field col s2">
                <select id="f_estado">
                  <option value="0">Todos</option>
                  <option value="1" selected>Pendiente</option>
                  <option value="2">Aprobada</option>
                  <option value="3">Rechazada</option>
                  <option value="4">Anulada</option>
                </select>
                <label for="f_estado">Estado</label>
              </div>

              <div class="input-field col s2">
                <input type="date" id="f_desde">
                <label for="f_desde" class="active">Desde</label>
              </div>

              <div class="input-field col s2">
                <input type="date" id="f_hasta">
                <label for="f_hasta" class="active">Hasta</label>
              </div>

              <div class="col s3 right-align">

                <a class="btn green core_modal" id="btnAddVacaciones" data-accion="1" data-modal="modal-vacaciones" data-btn_close="0">
                  <i class="mdi mdi-plus"></i> Agregar
                </a>

                <a class="btn" id="btnBuscarVacaciones">
                  <i class="mdi mdi-magnify"></i> Buscar
                </a>
              </div>
            </div>

            <!-- Resumen rápido -->
            <div class="row resumen-admin">
              <div class="col s2"><b>Pendientes:</b> <span id="r_pend">0</span></div>
              <div class="col s2"><b>Aprobadas:</b> <span id="r_apr">0</span></div>
              <div class="col s2"><b>Hoy:</b> <span id="r_hoy">0</span></div>
              <div class="col s2"><b>Este mes:</b> <span id="r_mes">0</span></div>
            </div>

            <div id="gridVacaciones" data-fn="487"></div>

            <div class="modal modal-fixed-footer core" id="modal-vacaciones" data-fn="419">
              <div class="modal-header head2 center" style="font-size: 22px;"><span class="tit_modal"></span> Vacaciones</div>
              <div class="modal-content">
                <div class="row">
                  <div class="col s6 input-field">
                    <input type="text" id="empleado_vacaciones" data-field="idempleado" class="autocomplete usr_name" vid="0" autocomplete="off">
                    <label for="empleado_vacaciones">Empleado</label>
                  </div>

                  <div class="col s6 row">

                    <div class="col s6 input-field">
                      <input type="date" id="desde_vacaciones" data-field="desde">
                      
                      <label for="desde_vacaciones" class="active">Desde</label>
                    </div>

                    <div class="col s6 input-field">
                      <label for="hasta_vacaciones" class="active">Hasta</label>
                      <input type="date" id="hasta_vacaciones" data-field="hasta">
                    </div>

                </div>

                <div class="row">
                  <div class="col s6 input-field">
                    <select id="estado_vacaciones" data-field="idestado">
                      <option value="1">Pendiente</option>
                      <option value="2" selected>Aprobada</option>
                      <option value="3">Rechazada</option>
                      <option value="4">Anulada</option>
                    </select>
                    <label for="estado_vacaciones">Estado</label>
                  </div>

                  <div class="col s6">
                    <input type="checkbox" data-field="afecta_planilla" checked="true" id="vafecta_planilla_vacaciones">
                    <label for="vafecta_planilla_vacaciones">Afecta Planilla</label>
                  </div>
                </div>

                <div class="row">
                  <div class="col s12 input-field">
                    <textarea data-field="comentario" id="comentario_vacaciones" style="border: 1px solid #e2e2e2;margin: 0px;"></textarea>
                    <label for="comentario_vacaciones">Observaciones</label>
                  </div>
                </div>

                </div>

              </div>
              <div class="modal-footer">
                  <a class="modal-action waves-effect waves-green btn-flat core_save" data-fn="1">Aceptar</a>
                  <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
              </div>
            </div>

          </section>

          <section id="sect3" class="sectbase hide">
            Deducciones : <span id="ded_val"></span>%, Aporte Patronal: 
            <span id="pat_val"></span>%
            <a class="btn" id="doplanilla" style="float: right;">Realizar Planilla</a>
            <table id="tbl_planilla" class="centered tbl striped bordered">
              <thead>
                <tr style="background-color: lightgreen;">
                  <th>Empleado</th>
                  <th>Jornada</th>
                  <th>Permisos</th>
                  <th>Tardías</th>
                  <th>Ausencias</th>
                  <th>Extras</th>
                  <th>Vacaciones</th>
                  <th>Incapacidades</th>
                  <th>Salario Bruto</th>
                  <th>Deducciones</th>
                  <th>Salario Neto</th>
                  <th>Aporte Patronal</th>
                </tr>
              </thead>
              <tbody id="listaplanilla">
              </tbody>
              <tfoot>
                <tr>
                  <th>Totales:</th>
                  <th style="text-align: right;padding: 0;">  <span id="thoras"></span></th>
                  <th style="text-align: right;padding: 0;">  <span id="ttardias">0</span></th>
                  <th style="text-align: right;padding: 0;">  <span id="tasusencias">0</span></th>
                  <th style="text-align: right;padding: 0;">  <span id="tpermisos">0</span></th>
                  <th style="text-align: right;padding: 0;">  <span id="textras"></span></th>
                  <th style="text-align: right;padding: 0;">  <span id="tvacas"></span></th>
                  <th style="text-align: right;padding: 0;">¢ <span id="tincap">0.00</span></th>
                  <th style="text-align: right;padding: 0;">¢ <span id="tbruto">0.00</span></th>
                  <th style="text-align: right;padding: 0;">¢ <span id="tdeduc">0.00</span></th>
                  <th style="text-align: right;padding: 0;">¢ <span id="tneto">0.00</span></th>
                  <th style="text-align: right;padding: 0;">¢ <span id="tpat">0.00</span></th>
                  <th></th>
                </tr>
              </tfoot>  
            </table>

            <div class="modal modal-fixed-footer grandemodal" id="modal-diaslaborados">
              <div class="modal-header head2 center" style="font-size: 22px;">
                <span class="de_ename"></span>
              </div>

              <div class="modal-content row">

              <div class="col s8"> 
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>LUN</th>
                      <th>MAR</th>
                      <th>MIE</th>
                      <th>JUE</th>
                      <th>VIE</th>
                      <th>SAB</th>
                      <th>DOM</th>
                    </tr>
                  </thead>
                  <tbody id="listaDiaLaborado" style="font-size: 10px;">
                    
                  </tbody>
                </table>

                <table>
                  <tr>
                    <td>
                      <b>Total Horas Laboradas:</b>
                    </td>
                    <td>
                      <input type="text" id="thoras_laboradas" value="0" class="browser-default eder numeric">
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Total Horas Extras:</b>
                    </td>
                    <td>
                      <input type="text" id="thoras_extras" value="0" class="browser-default eder numeric">
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Total Horas Permisos:</b>
                    </td>
                    <td>
                      <input type="text" id="thoras_regalia" value="0" class="browser-default eder numeric">
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Total Días Vacaciones:</b>
                    </td>
                    <td>
                      <input type="text" id="thoras_vacaciones" value="0" class="browser-default eder numeric">
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Total Días Incapacidad:</b>
                    </td>
                    <td>
                      <input type="text" id="thoras_incapacidad" value="0" class="browser-default eder numeric">
                    </td>
                  </tr>

                </table>
              </div>

                <div class="col s4 hide center" id="marcas_empleado">
                  
                  <b><span class="center" id="_day"></span></b>
                  <hr>

                  <div class="row" id="rastreo_marcas">
                    
                  </div>

                  <div class="row">
                    <div class="col s12 input-field">
                      <textarea id="vcomentario" cols="25" class="materialize-textarea" type="textarea" style="min-height: 40px; max-height: 60px; height: 60px; min-width: 100%; max-width:100%; width: 100%;border: 1px solid #e2e2e2;margin: 0px;" data-length="180"></textarea>
                      <label for="vcomentario">Comentario</label>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div class="modal-footer">
                  <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
                  <a class="modal-action waves-effect waves-green btn-flat" id="saveDiasLaborados">Aceptar</a>
              </div>
            </div>

          </section>

          <section id="sect7" class="sectbase hide">

          <!-- Filtros -->
          <div class="row">
            <div class="input-field col s3">
              <i class="mdi mdi-account mdi-24px prefix"></i>
              <input type="text" id="f_empleado_inc" autocomplete="off" class="usr_name">
              <label for="f_empleado_inc">Empleado (nombre o cédula)</label>
            </div>

            <div class="input-field col s2">
              <select id="f_estado_inc">
                <option value="0">Todos</option>
                <option value="1" selected>Activa</option>
                <option value="2">Finalizada</option>
                <option value="3">Anulada</option>
              </select>
              <label for="f_estado_inc">Estado</label>
            </div>

            <div class="input-field col s2">
              <input type="date" id="f_desde_inc">
              <label for="f_desde_inc" class="active">Desde</label>
            </div>

            <div class="input-field col s2">
              <input type="date" id="f_hasta_inc">
              <label for="f_hasta_inc" class="active">Hasta</label>
            </div>

            <div class="col s3 right-align">

              <a class="btn red core_modal" id="btnAddIncapacidad"
                 data-accion="1"
                 data-modal="modal-incapacidad"
                 data-btn_close="0">

                <i class="mdi mdi-plus"></i> Agregar
              </a>

              <a class="btn" id="btnBuscarIncapacidad">
                <i class="mdi mdi-magnify"></i> Buscar
              </a>

            </div>
          </div>


          <!-- Resumen rápido -->
          <div class="row resumen-admin">

            <div class="col s2">
              <b>Activas:</b>
              <span id="r_act">0</span>
            </div>

            <div class="col s2">
              <b>Finalizadas:</b>
              <span id="r_fin">0</span>
            </div>

            <div class="col s2">
              <b>Hoy:</b>
              <span id="r_hoy_inc">0</span>
            </div>

            <div class="col s2">
              <b>Este mes:</b>
              <span id="r_mes_inc">0</span>
            </div>

            <div class="col s2">
              <b>Días totales:</b>
              <span id="r_dias">0</span>
            </div>

          </div>


          <!-- Grid -->
          <div id="gridIncapacidades" data-fn="493"></div>



          <!-- Modal -->
          <div class="modal modal-fixed-footer core"
               id="modal-incapacidad"
               data-fn="492">

            <div class="modal-header head2 center"
                 style="font-size: 22px;">
              <span class="tit_modal"></span> Incapacidad
            </div>

            <div class="modal-content">

              <!-- fila 1 -->
              <div class="row">

                <div class="col s6 input-field">

                  <input type="text"
                         id="empleado_incapacidad"
                         data-field="idempleado"
                         class="autocomplete usr_name"
                         vid="0"
                         autocomplete="off">

                  <label for="empleado_incapacidad">Empleado</label>

                </div>

                <div class="col s6 input-field">

                  <select data-field="tipo" id="tipo_incapacidad">

                    <option value="1">Enfermedad</option>
                    <option value="2">Accidente</option>
                    <option value="3">Maternidad</option>
                    <option value="4">Riesgo laboral</option>

                  </select>

                  <label for="tipo_incapacidad">Tipo</label>

                </div>

              </div>


              <!-- fila 2 -->
              <div class="row">

                <div class="col s4 input-field">

                  <input type="date"
                         data-field="desde"
                         id="desde_incapacidad">

                  <label class="active">Desde</label>

                </div>

                <div class="col s4 input-field">

                  <input type="date"
                         data-field="hasta"
                         id="hasta_incapacidad">

                  <label class="active">Hasta</label>

                </div>

                <div class="col s4 input-field">

                  <input type="number"
                         data-field="dias"
                         id="dias_incapacidad">

                  <label>Días</label>

                </div>

              </div>


              <!-- fila 3 -->
              <div class="row">

                <div class="col s4 input-field">

                  <input type="number"
                         data-field="porcentaje_pago"
                         id="porcentaje_pago">

                  <label>% Pago</label>

                </div>

                <div class="col s4 input-field">

                  <input type="number"
                         data-field="monto_diario"
                         id="monto_diario">

                  <label>Monto diario</label>

                </div>

                <div class="col s4 input-field">

                  <select data-field="quien_paga">

                    <option value="3">Empresa</option>
                    <option value="1" selected>CCSS</option>
                    <option value="2">INS</option>

                  </select>

                  <label>Incapacita</label>

                </div>

              </div>


              <!-- fila 4 -->
              <div class="row">

                <div class="col s4 input-field">

                  <select data-field="afecta_planilla">

                    <option value="1">Sí</option>
                    <option value="0">No</option>

                  </select>

                  <label>Afecta planilla</label>

                </div>

                <div class="col s4 input-field">

                  <select data-field="idestado">

                    <option value="1">Activa</option>
                    <option value="2">Finalizada</option>
                    <option value="3">Anulada</option>

                  </select>

                  <label>Estado</label>

                </div>

              </div>


              <!-- observacion -->
              <div class="row">

                <div class="col s12 input-field">

                  <textarea
                    data-field="observacion"
                    id="observacion_incapacidad"
                    style="border:1px solid #e2e2e2;margin:0px;"></textarea>

                  <label>Observación</label>

                </div>

              </div>

            </div>


            <div class="modal-footer">

              <a class="modal-action waves-effect waves-green btn-flat core_save"
                 data-fn="1">
                Aceptar
              </a>

              <a class="modal-action modal-close waves-effect waves-green btn-flat">
                Salir
              </a>

            </div>

          </div>

        </section>

        <section id="sect8" class="sectbase hide">

        <!-- Filtros -->
        <div class="row">

          <div class="input-field col s3">
            <i class="mdi mdi-account mdi-24px prefix"></i>
            <input type="text" id="f_empleado_ded" class="usr_name" autocomplete="off">
            <label for="f_empleado_ded">Empleado</label>
          </div>

          <div class="input-field col s2">
            <select id="f_tipo_ded">
              <option value="0">Todos</option>
              <option value="1">Rebajo salarial</option>
              <option value="2">Préstamo</option>
            </select>
            <label>Tipo</label>
          </div>

          <div class="input-field col s2">
            <input type="date" id="f_desde_ded">
            <label class="active">Desde</label>
          </div>

          <div class="input-field col s2">
            <input type="date" id="f_hasta_ded">
            <label class="active">Hasta</label>
          </div>

          <div class="col s3 right-align">

            <a class="btn orange core_modal"
               data-accion="1"
               data-modal="modal-deduccion"
               data-btn_close="0">

              <i class="mdi mdi-plus"></i> Agregar
            </a>

            <a class="btn" id="btnBuscarDeduccion">
              <i class="mdi mdi-magnify"></i> Buscar
            </a>

          </div>

        </div>


        <!-- Resumen -->
        <div class="row resumen-admin">

          <div class="col s2">
            <b>Registros:</b>
            <span id="r_reg">0</span>
          </div>

          <div class="col s2">
            <b>Préstamos:</b>
            <span id="r_pres">0</span>
          </div>

          <div class="col s2">
            <b>Rebajos:</b>
            <span id="r_reb">0</span>
          </div>

          <div class="col s3">
            <b>Total deducciones:</b>
            <span id="r_total">₡0</span>
          </div>

        </div>


        <!-- Grid -->
        <div id="gridDeducciones" data-fn="530"></div>



        <!-- Modal -->
        <div class="modal modal-fixed-footer core"
             id="modal-deduccion"
             data-fn="442">

          <div class="modal-header head2 center"
               style="font-size:22px;">
            <span class="tit_modal"></span> Otras deducciones
          </div>


          <div class="modal-content">

            <div class="row">

              <div class="col s6 input-field">

                <input type="text"
                       id="empleado_deduccion"
                       data-field="idempleado"
                       class="autocomplete usr_name"
                       vid="0"
                       autocomplete="off">

                <label>Empleado</label>

              </div>

              <div class="col s6 input-field">

                <select data-field="tipo">

                  <option value="1">Rebajo salarial</option>
                  <option value="2">Préstamo empleado</option>

                </select>

                <label>Tipo</label>

              </div>

            </div>


            <div class="row">

              <div class="col s6 input-field">

                <input type="number"
                       data-field="valor"
                       step="0.01">

                <label>Monto</label>

              </div>

            </div>


            <div class="row">

              <div class="col s12 input-field">

                <textarea
                  data-field="nombre"
                  style="border:1px solid #e2e2e2;margin:0px;"></textarea>

                <label>Detalle / descripción</label>

              </div>

            </div>

          </div>


          <div class="modal-footer">

            <a class="modal-action waves-effect waves-green btn-flat core_save"
               data-fn="1">
              Aceptar
            </a>

            <a class="modal-action modal-close waves-effect waves-green btn-flat">
              Salir
            </a>

          </div>

        </div>

      </section>


          <section id="sect2" class="sectbase row hide">

            <div class="collection col s3" id="submenu">
              <a class="collection-item" num="1">Departamentos</a>
              <a class="collection-item" num="4">Deducciones</a>
              <a class="collection-item" num="5">Cálculos</a>
              <a class="collection-item" num="6">Días Feriados</a>
              <a class="collection-item" num="2">Puestos</a>
              <a class="collection-item" num="3">Horarios</a>
            </div>

            <div class="col s9">
              <div class="hide coldiv" id="cldiv1">
                <span class="rline" mod="departamentos">
                  Agregar Departamento: <input type="text" class="browser-default" id="t_adpt"> Pertenece a <input type="text" class="browser-default autocomplete" id="t_sdpt" vid="0"> <a class="btn-floating" id="b_adpt"><i class="mdi mdi-24px mdi-plus"></i></a>
                </span>
                
                <section class="center organigrama" style="margin-top:3%">
                  <ul style="display: inline-block;" id="organigrama" vul="0">  
                  </ul>
                </section>
                
              </div>

              <div class="hide coldiv" id="cldiv2">
                <div class="input-field">
                  <select id="pseldept"></select>
                  <label for="pseldept">Seleccione un Departamento</label>
                </div>
                <table class="no-border" mod="puestos">
                  <tr>
                    <td>Agregar Puesto:</td>
                    <td><input type="text" id="t_adpst" class="browser-default" autocomplete="off"></td>
                    <td>Supervisado por:</td>
                    <td><input type="text" class="browser-default autocomplete" id="t_spst" vid="0" autocomplete="off"></td>
                  </tr>
                  <tr>
                    <td>Salario:</td>
                    <td>
                      <input type="text" class="browser-default numeric eder" id="t_salary" value="0.00" autocomplete="off">
                      <input type="checkbox" name="nb" id="aplicarDeducciones"> <label for="aplicarDeducciones">Neto</label>
                    </td>
                    <td>Moneda</td>
                    <td><select id="s_mpst" class="moneda browser-default"></select></td>
                  </tr>
                  <tr>
                    <td colspan="4"><a class="btn-floating der" id="b_adpst"><i class="mdi mdi-24px mdi-plus" title="Agregar Puesto"></i></a></td>
                  </tr>
                </table>

                <table class="centered highlight">
                  <tr>
                    <th>Puesto</th>
                    <th>Salario Bruto</th>
                    <th>Salario Neto</th>
                    <th>Supervisado</th>
                    <th>Acciones</th>
                  </tr>
                  <tbody id="lpuestos">
                   
                  </tbody>
                </table>
              </div>

              <div class="hide coldiv" id="cldiv5">
                <span><b>Cálculos</b></span> <br>
                  <ul class="collapsible" data-collapsible="accordion">
                    <li>
                      <div class="collapsible-header">Salario Base</div>
                      <div class="collapsible-body"><span>SALARIO * (HORAS_LABORADAS_JORNADA) / JORNADA</span></div>
                    </li>
                    <li>
                      <div class="collapsible-header">Salario Bruto</div>
                      <div class="collapsible-body"><span>SALARIO_BASE + (HORAS_EXTRAORDINARIAS * VALOR_HORA_EXTRA) + BONIFICACIONES + COMISIONES</span></div>
                    </li>
                    <li>
                      <div class="collapsible-header">Horas Extraordinarias</div>
                      <div class="collapsible-body"><span><b>Extra Diurna: </b> SALARIO_BASE_DIARIO / JORNADA_DIARIA * 1.5 <br>
                      <b>Extra Nocturna: </b> SALARIO_BASE_DIARIO / JORNADA_DIARIA * 2 <br>
                      <b>Extra Mixta: </b> SALARIO_BASE_DIARIO / JORNADA_DIARIA * 1.75 <br>
                      <b>Extra Festivo: </b> SALARIO_BASE_DIARIO / JORNADA_DIARIA * 2 <br></span></div>
                    </li>
                    <li>
                      <div class="collapsible-header">Aguinaldo</div>
                      <div class="collapsible-body"><span>(ULTIMOS 12 SALARIOS BRUTOS)/12</span></div>
                    </li>
                    <li>
                      <div class="collapsible-header">Vacaciones</div>
                      <div class="collapsible-body"><span>SALARIO_BASE_DIARIO * DIAS_VACACIONES</span></div>
                    </li>
                    <li>
                      <div class="collapsible-header">Salario Neto</div>
                      <div class="collapsible-body"><span>SALARIO_BRUTO - DEDUCCIONES</span></div>
                    </li>
                  </ul>
              </div>

              <div class="hide coldiv" id="cldiv6">
                <span><b>Días Feriados</b></span> <br>
                <ul class="collection with-header" id="lista_feriados">
                </ul>
              </div>

              <div class="hide coldiv" id="cldiv4">

                 <span class="rline" mod="deducciones">
                  Nombre: <input type="text" id="t_adec" class="browser-default" style="width: 35%;" stoast="Nombre Deducción">
                  Sobre:<select class="browser-default" id="s_dedsobre"><option value="1">SALARIO BRUTO</option> <option value="2">SALARIO SIN CARGAS</option> <option value="3">PATRONO</option></select> 
                   <br>
                  Valor: <input type="text" id="t_adv" class="browser-default" style="width: 35%;" stoast="Valor Deducción">
                  Tipo: <select class="browser-default" id="s_dedtipo"><option value="1">%</option> <option value="2">¢</option> <option value="3">Rangos</option></select> 
                  <br>
                  <div class="hide" id="rangos_deduc">
                    Entre <input type="text" class="numeric browser-default eder" id="t_deddesde" value="0"> Hasta <input type="text" class="numeric browser-default eder" id="t_deddhasta" value="0">
                  </div>
                  <a class="btn-floating der" id="b_adec"><i class="mdi mdi-24px mdi-plus" title="Agregar"></i></a> <br>
                  </span>
                
                  <table class="centered">
                    <tr><th>Deducción</th> <th>Valor</th> <th>Sobre</th> <th></th></tr>
                    <tbody id="listadeducciones"></tbody>
                  </table>

              </div>

              <div class="hide coldiv" id="cldiv3">

                <table class="no-border" mod="horarios">
                  <tr>
                    <td colspan="3">
                      <b>Jornada</b>
                      <input type="radio" name="thorario" checked id="dia" class="with-gap" vl="1">
                      <label for="dia">Diurna</label>

                      <input type="radio" name="thorario" id="noc" class="with-gap" vl="2">
                      <label for="noc">Nocturna</label>

                      <input type="radio" name="thorario" id="mxt" class="with-gap" vl="3">
                      <label for="mxt">Mixta</label>
                    </td>
                    <td colspan="3">
                      <b>Tipo</b>
                      <input type="radio" name="tjornada" checked id="continua" class="with-gap" vid="1">
                      <label for="continua">Continua</label>

                      <input type="radio" name="tjornada" id="discontinua" class="with-gap" vid="2">
                      <label for="discontinua">Discontinua</label>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="1">
                      <b>Nombre de Horario</b>
                    </td>
                    <td colspan="5">
                      <input type="text" class="browser-default" id="t_nhor" autocomplete="off">
                    </td>
                  </tr>
                  <tr class="hide">
                    <td style="text-align: right;">Horas por Semana:</td>
                    <td style="width: 10%"><input type="text" class="browser-default numeric eder" autocomplete="off" value="48" ></td>
                    <td style="text-align: right;">Horas por Día:</td>
                    <td style="width: 10%"><input type="text" class="browser-default numeric eder" id="t_hxdia" autocomplete="off" value="8"></td>
                    <td style="text-align: right;">Días por Mes:</td>
                    <td style="width: 10%"><input type="text" class="browser-default numeric eder" id="t_dxmes" autocomplete="off" value="30"></td>
                  </tr>
                </table>
                <table class="no-border" id="defult_horario">               
                </table>

                <br>

                <tr>
                    <td colspan="3"> <a  data-activates="slide-horario" class="nav-horarios btn" idempleado="0" fecha="" vid="0">Lista de Horarios (<span id="clistah"></span>)</a> <a class="btn-floating der" id="b_adhor"><i class="mdi mdi-24px mdi-plus" title="Agregar Horario"></i></a></td>
                  </tr>
              </div>

            </div>

          </section>

        </div>
      </div>

      <div class="modal modal-fixed-footer" id="modal-emarcas">
        <div class="modal-header head2 center" style="font-size: 22px;" id="edit_marca_empleado"></div>
        <div class="modal-content row">
          <div class="col s12 center">
            <span id="edit_marca_fecha"></span>
          </div>

          <div class="col s12">
            <table>
              <tr>
                <td><b>Marca</b></td>
                <td><b>Entrada</b></td>
                <td><b>Salida</b></td>
                <td></td>   
              </tr>
              <tbody class="marca_edit hide" id="edit_marca_trabajo" tipo="1"></tbody>
              <tbody class="marca_edit hide" id="edit_marca_cafe" tipo="3"></tbody>
              <tbody class="marca_edit hide" id="edit_marca_almuerzo" tipo="5"></tbody>
            </table>
          </div>

          <div class="col s12 input-field">
            <textarea id="edit_marca_comentario" cols="25" class="materialize-textarea" type="textarea" style="min-height: 40px; max-height: 60px; height: 60px; min-width: 100%; max-width:100%; width: 100%;border: 1px solid #e2e2e2;margin: 0px;" data-length="180"></textarea>
            <label for="edit_marca_comentario">Comentario</label>
          </div>
          
        </div>
        <div class="modal-footer">
              <a class="modal-action waves-effect waves-green btn-flat" id="edit_marca_acept">Editar</a>
              <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
          </div>
      </div>

      <div class="modal modal-fixed-footer" id="modal-marcas">
          <div class="modal-header head2 center" style="font-size: 22px;">Marcas de Horario</div>
          <div class="modal-content row">
            <div class="col s12">
              <div class="col s8">
                <label for="hor_getMarca">Marca</label>
                <select class="browser-default" id="hor_getMarca"></select>
                
              </div>

              <div class="col s4">
                <a class="btn-floating" id="hor_setMarca" title="Agregar Marca"> <i class="mdi mdi-plus"></i> </a>
              </div>
            </div>

            <div class="col s12">
              <table>
                <thead>
                  <tr>
                    <th>Marca</th>
                    <th>Entrada</th>
                    <th>Salida</th>
                    <th>Lun</th>
                    <th>Mar</th>
                    <th>Mie</th>
                    <th>Jue</th>
                    <th>Vie</th>
                    <th>Sab</th>
                    <th>Dom</th>
                  </tr>
                </thead>
                <tbody id="listaMarcas"></tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
              <a class="modal-action waves-effect waves-green btn-flat" id="hor_lib_acep">Aceptar</a>
              <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
          </div>
        </div>  

       <div class="modal modal-fixed-footer grandemodal" id="modal-horario-empleado">

        <div class="modal-header head2 center" style="font-size: 22px;">
          <span class="de_ename"></span>
        </div>

        <div class="modal-content">

          <!-- MODOS -->
          <div class="row">
            <div class="col s12 center">
              <div class="chip pbtn modo active" data-modo="horario">Horario</div>
              <div class="chip pbtn modo hide" data-modo="rotacion">Rotación</div>
              <div class="chip pbtn modo hide" data-modo="eventos">Eventos</div>
              <div class="chip pbtn modo hide" data-modo="eventos">Overrride</div>
            </div>
          </div>

          <!-- ========================= -->
          <!-- HORARIO -->
          <!-- ========================= -->
          <div id="sec_horario" class="seccion">

            <div class="row hide">
              <div class="col s4 input-field">
                <label class="active">Fecha</label>
                <input type="date" id="he_fecha" disabled>
              </div>

              <div class="col s4 input-field">
                <input type="number" id="he_total" value="0">
                <label>Total Horas</label>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>LUN</th><th>MAR</th><th>MIE</th>
                  <th>JUE</th><th>VIE</th><th>SAB</th><th>DOM</th>
                </tr>
              </thead>
              <tbody id="horario_x_empleado">
              </tbody>
            </table>

            <dov class="row">
              <a class="btn der" id="save_horario_empleado">Guardar Horario</a>
            </dov>

          </div>

          <!-- ========================= -->
          <!-- ROTACION -->
          <!-- ========================= -->
          <div id="sec_rotacion" class="seccion hide">

            <div class="row">
              <div class="col s6 input-field">
                <select id="he_rotacion">
                  <option value="">Sin rotación</option>
                  <option value="0">➕ Crear Rotación</option>
                </select>
                <label>Rotación</label>
              </div>

              <div class="col s6">
                <a class="btn blue" id="btn_asignar_rotacion">Asignar</a>
              </div>
            </div>

            <!-- PANEL CREAR -->
            <div id="panel_rotacion" class="hide">

              <div class="row">
                <div class="col s6 input-field">
                  <input id="rot_nombre">
                  <label for="rot_nombre">Nombre</label>
                </div>

                <div class="col s3 input-field">
                  <input type="number" id="rot_ciclo" value="2">
                  <label for="rot_ciclo">Ciclo</label>
                </div>

                <div class="col s3">
                  <a class="btn green" id="btn_guardar_rotacion">Guardar</a>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Semana</th>
                    <th>Día</th>
                    <th>Tipo</th>
                    <th>Entrada</th>
                    <th>Salida</th>
                  </tr>
                </thead>
                <tbody id="rotacion_detalle"></tbody>
              </table>

            </div>

          </div>

          <!-- ========================= -->
          <!-- EVENTOS -->
          <!-- ========================= -->
          <div id="sec_eventos" class="seccion hide">

            <ul class="collection" id="lista_eventos"></ul>

          </div>

        </div>

        <div class="modal-footer">
          <a class="btn-flat modal-close">Cerrar</a>
        </div>

      </div>

       <div id="modal-empleado" class="modal modal-fixed-footer mymodal" style="border-bottom: 1px solid #e3e3ee">
        <div class="modal-header"><h4 class="center" id="metit" style="margin: 0;">Agregar Empleado</h4> </div>
        <div class="modal-content" style="padding-bottom: 55px;">
          <div class="row" style="margin: 0;">
            <div class="col s4 input-field">
              <input type="text" id="t_eced" stoast="Cédula" autocomplete="off">
              <label for="t_eced">Cédula</label>
            </div>

            <div class="col s4 input-field">
              <input type="text" id="t_enom" stoast="Nombre" autocomplete="off">
              <label for="t_enom">Nombre</label>
            </div>

            <div class="col s4 input-field">
              <input type="text" id="t_eiduser" class="autocomplete" autocomplete="off" vid="0">
              <label for="t_eiduser">Usuario en Sistema</label>
            </div>
          </div>

          <div class="row" style="margin: 0;">
            <div class="col s4 input-field">
              <i class="prefix mdi mdi-minus red-text pbtn"  id="rfh" title="Remover Fecha y Hora"></i>
              <input type="date" id="t_efe">
              <label for="t_efe" class="active">Fecha Contrato</label>
            </div>
            <div class="col s4 input-field">
              <input type="time" id="t_edat">
              <label for="t_edat" class="active">Hora Contrato</label>
            </div>

            <div class="col s4 input-field">
              <input type="text" id="t_email">
              <label for="t_email">Correo</label>
            </div>
          </div>

          <div class="row" style="margin: 0;">
            <div class="col s4">
              <div class="input-field">
                <select id="s_ehor"></select>
                <label for="s_ehor">Horario</label>
              </div>
              <div class="input-field">
                <input type="text" id="t_ehoras" value="0" class="eder numeric" stoast="Horas por Semana">
                <label for="t_ehoras">Horas por Semana</label>
              </div>
              <a data-activates="slide-horario" class="nav-horarios btn hide" istemporal vid="0" idempleado="0" fecha="" id="e_ajust_h">Ajustar Horario</a>
            </div>

            <div class="col s4">
              <div class="input-field">
                <input type="text" autocomplete="off" class="autocomplete" id="s_epuesto"></input>
                <label for="s_epuesto">Puesto</label>
              </div>

              <div class="switch" align="center">
                <label>
                  Bruto
                  <input type="checkbox" id="s_tipopago" checked>
                  <span class="lever"></span>
                  Neto
                </label>
              </div>

              <div class="input-field">
                <input type="text" class="numeric eder" id="t_esalario" value="0" stoast="Salario Neto" autocomplete="off">
                <label for="t_esalario">Salario</label>
              </div>

              <div class="input-field">
                <input type="text" class="numeric eder" id="t_valxhora" value="0" autocomplete="off">
                <label for="t_valxhora">Valor Hora</label>
              </div>

              <div>
                <b>Tipo de Pago</b> <br>
                <input type="radio" name="tipopago" id="semanal" checked vid="1">
                <label for="semanal">Semanal</label>
                <br>
                <input type="radio" name="tipopago" id="quincenal" vid="2">
                <label for="quincenal">Quincenal</label>
                <br>
                <input type="radio" name="tipopago" id="mensual" vid="3">
                <label for="mensual">Mensual</label>
              </div>
            </div>

            <div class="col s4">
              <div class="input-field">
                <input type="text" id="t_evacas" value="12">
                <label for="t_evacas">Días de Vacaciones</label>
              </div>

              <div class="input-field">
                <select id="tipoPuesto">
                  <option value="0">NO</option>
                  <option value="1">Sustitución</option>
                  <option value="2">Período</option>
                  <option value="3">Pasantía</option>
                </select>
                <label for="tipoPuesto">Temporal</label>
              </div>

              <div class="input-field">
                <input type="text" id="t_diastemp" disabled value="0">
                <label for="t_diastemp">Duración</label>
              </div>

            </div>

          </div>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-action waves-effect waves-green btn-flat" id="b_aempleado">Aceptar</a>
          <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</a>
        </div>
      </div>

      <div class="modal modal-fixed-footer" id="modal-deducciones">
        <div class="modal-header head2 center" style="font-size: 22px;">Deducciones Aplicadas</div>
        <div class="modal-content deduccionesxempleado">
          <span><b class="de_ename">NOMBRE_EMPLEADO</b></span>

          <div class="row">
            <div class="col s4 input-field">
              <input type="text" id="de_name" value="">
              <label for="de_name">Descripción</label>
            </div>

            <div class="col s3 input-field">
              <select id="de_tipo">
                <option>Única</option>
                <option>CxC</option>
              </select>
              <label for="de_tipo">Tipo</label>
            </div>

            <div class="col s3 input-field">
              <input type="text" id="de_valor" value="0" class="numeric eder">
              <label for="de_valor">Valor</label>
            </div>

            <div class="col s2">
              <i class="mdi mdi-24px mdi-plus pbtn" id="de_add" title="Agregar Deducción"></i>
            </div>
          </div>

          <div class="row">

            <div class="col s3 input-field">
              <input type="text" id="de_inicial" value="0" class="numeric eder">
              <label for="de_inicial">Deuda Inicial</label>
            </div>
            
            <div class="col s3 input-field">
              <input type="text" id="de_saldo" value="0" class="numeric eder">
              <label for="de_saldo">Saldo Actual</label>
            </div>

          </div>

          <div id="de_lista"></div>
        </div>
        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-green btn-flat" id="saveDeduc">Guardar</a>
            <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
        </div>
      </div>

       <ul id="slide-horario" class="side-nav" style="width:45%; z-index: 9999;">
        <li><div class="user-view">
          LISTA DE HORARIOS

          <a class="btn">Salir <i class="mdi mdi-24px mdi-arrow-right"></i></a>
        </div></li>
        <li>
          <table class="no-border">
            <tbody id="listahorarios"></tbody>
          </table>
        </li>
      </ul>
            

    </div>
    {$SCR}
    <script src="../assets/libs/charts/chart.js?v=10.4.1.1"></script>  
    <script src="../assets/js/modulos/rrhh.js?v=10.4.0.11-4"></script>
  </body>
</html>