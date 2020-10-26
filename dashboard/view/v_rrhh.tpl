<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Area de Recursos Humanos</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-rrhh.css?v=10.2.0.97">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">

      <div class="row">
        <div class="col s3 center" style="border: 1px solid #e2e2e2;height: 100vh;background-color: #ffffff;padding-top: 10px;">
          
          <a class="btn tooltipped mn2" data-tooltip="Mantenimiento de Empleados" data-position="bottom" num="1"> <i class="mdi mdi-account-hard-hat mdi-24px"></i> EMPLEADOS</a>

          <a class="btn tooltipped mn2" data-tooltip="Generar Planilla" data-position="bottom" num="2"> <i class="mdi mdi-clipboard-list-outline mdi-24px"></i> PLANILLA</a>

          <a class="btn tooltipped mn2" data-tooltip="Generar Reportes" data-position="bottom" num="2"> <i class="mdi mdi-chart-multiple mdi-24px"></i> REPORTES</a>

        </div>

        <div class="col s9" id="_rrhh" style="background-color: white; height: 100vh;padding-top: 2%;">

          <section id="sect0" class="sect">
              <div class="input-field container center">
                <i class="mdi mdi-account mdi-24px prefix"></i>
                <input type="text" id="usr_name" maxlength="9">
                <label for="usr_name">Ingrese Cedula de Empleado</label>
              </div>

              <table id="tbl1">
                <tr>
                  <td><b>Empleado</b></td>
                  <td id="n_empl">Andres Miranda Castro</td>
                  <td><b>Cedula</b></td>
                  <td id="c_empl">206650577</td>
                </tr>
                <tr>
                  <td><b>Departamento</b></td>
                  <td id="d_empl">TI</td>
                  <td><b>Salario</b></td>
                  <td id="s_empl">500,000.00 CRC</td>
                </tr>
              </table>

              <p class="center">
                <input class="with-gap" name="opc1" type="radio" id="op1" />
                <label for="op1">Vacaciones</label>

                <input class="with-gap" name="opc1" type="radio" id="op2" />
                <label for="op2">Liquidacion</label>

                <input class="with-gap" name="opc1" type="radio" id="op4" />
                <label for="op4">Tiempo Laborado</label>
              
              </p>

          </section>
          
          <section id="sect1" class="hide sect">
            <i class="btn-floating mdi mdi-24px mdi-plus center" id="mnt-empleado" style="cursor: pointer; float: right;"></i>
          </section>

        </div>
      </div>

       <div id="modal-empleado" class="modal modal-fixed-footer mymodal" style="border-bottom: 1px solid #e3e3ee;">
        <div class="modal-header"><h4 class="center">Agregar Empleado</h4> </div>
        <div class="modal-content" style="padding-bottom: 55px;">

        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-action waves-effect waves-green btn-flat">Aceptar</a>
        </div>
      </div>

    </div>
    {$SCR}
    <script src="../assets/js/modulos/rrhh.js?v=10.2.0.97"></script>
  </body>
</html>