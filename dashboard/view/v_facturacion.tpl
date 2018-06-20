<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Facturación</title>
  </head>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-facturacion.css?v=10.0.0.4">
  <body >
  {$NAV}
    <div class="bdy pequeño movil" >
      <div id="mfacturacion"></div>
    </div>
  </body>
  {$SCR}
  <script src="../assets/js/modulos/facturacion.js?v=10.0.0.4"></script>
</html>

<div id="modal-edit" class="modal modal-fixed-footer">
  <div class="modal-content">
    <h4 id="titmod">Modal Header</h4>
    
    <div class="row">

      <div class="input-field col s6 ecant">
        <input type="text" id="ecantidad">
        <label for="ecantidad">Cantidad</label>
      </div>

      <div class="input-field col s6 eunit">
        <input type="text" id="eunitario">
        <label for="eunitario">Precio Unitario</label>
      </div>

      <div class="input-field col s6 edescu">
        <tr>
          <td><label>Descuento</label></td>
          <td>
            <select id="tdescuentol" class="eder tdesc" tp="2">
            </select>
            <input type="text" id="edescuento" class="hide" tdesc="2">
          </td>
        </tr>
      </div>

      <div class="input-field col s6 eimp">
        <input type="text" id="eimpuesto">
        <label for="eimpuesto">Impuesto</label>
      </div>

      <div class="input-field col s6 eexct">
        <input type="text" id="texct">
        <label for="texct">Excento</label>
      </div>

      <div class="input-field col s6 eexo hide">
        <input type="text" id="eexon">
        <label for="eexon">Exoneración</label>
      </div>
      <input type="hidden" id="hdnprd" value="0">
    </div>

  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" id="editprod">Aceptar</a>
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
  </div>
</div>

<div class="modal modal-fixed-footer grandemodal" id="addClie" style="height: 80%; width: 75%">
    <div class="modal-header center">
      Ingresar Cliente
    </div>
    <div class="modal-content">
      <section id="fclientes">
        <input type="hidden" class="zelda">

        <div class="row" style="margin: 0px">
          <div class="col s6 m3 l2">
            <p>
              <input class="with-gap" name="tipoclie" type="radio" id="cfisico" tipoClie="1" checked="checked" principal="1"/>
              <label for="cfisico">Físico</label>
            </p>
          </div>
          <div class="col s6 m3 l2">
            <p>
              <input class="with-gap" name="tipoclie" type="radio" id="cjuridico" tipoClie="2" />
              <label for="cjuridico">Jurídico</label>
            </p>
          </div>
          <div class="col s6 m3 l2">
            <p>
              <input class="with-gap" name="tipoclie" type="radio" id="cnite" tipoClie="3" />
              <label for="cnite">NITE</label>
            </p>
          </div>
          <div class="col s6 m3 l2">
            <p>
              <input class="with-gap" name="tipoclie" type="radio" id="cdimex" tipoClie="4" />
              <label for="cdimex">DIMEX</label>
            </p>
          </div>
          </div>
        <div class="card-title pequeño" id="titInfo" align="center"><b>Datos Personales</b></div><br>
          <div class="row ">
            <div class="input-field col s12 m6 l4 pequeño">
              <label id="nomClie" for="vnombre">Nombre</label>
              <input type="text" class="validate onblur" id="vnombre" autocomplete="off">
              <input type="hidden" id="vid" value="0">
              <input type="hidden" id="vbisproveedor" value="0">
              <input type="hidden" id="vidsucursal" value="">
            </div>
            <div class="input-field col s12 m6 l4 hid">
              <label for="vapellido1">Primer Apellido</label>
              <input type="text" class="validate onblur" id="vapellido1" autocomplete="off">
            </div>
            <div class="input-field col s12 m6 l4 hid">
              <label for="vapellido2">Segundo Apellido</label>
              <input type="text" class="validate onblur" id="vapellido2" autocomplete="off">
            </div>
            <div class="input-field col s12 m6 l4">
              <label for="vcedula">Cédula del Cliente</label>
              <input type="text" class="validate onblur" id="vcedula">
            </div>
          </div>
          <div class="row">
              <div class="input-field col s12 m12 l4">
                <div>
                  <div class="prefix"><i class="mdi mdi-email mdi-24px"></i></div>
                  <input type="email" class="validateMail" id="correo_in">
                  <label for="correo_in">Ingresar Correo</label>
                <ul class="collection" vtabla="correo" id="fcorreos" hasTabla="1" tp="4" style="border: 0;"></ul>
              </div>
            </div>
            <div class="col s12 m7 l8">
              <div class="ciclos" style="background-color: white;">
                <div class="row ">
                  <!-- <div class="col s6 m3 input-field">
                    <div class="prefix"><i class="mdi-phone mdi mdi-24px"></i></div>
                    <input type="text" id="pais" class="autocomplete">
                    <input type="hidden" id="vidpais" value="52">
                    <label for="pais">País</label>
                  </div> -->
                  <div class="input-field col s4 m4">
                    <!-- <div class="prefix"><i class="fa fa-phone"></i></div> -->
                    <select type="select" id="tptel">
                      <option value="" disabled selected>Seleccione Tipo de Tel.</option>
                      {section name=LE loop=$TPTEL}
                      <option value="{$TPTEL[LE][0]}">{$TPTEL[LE][1]}</option>
                      {/section}
                    </select>
                    <label for="tptel">Tipo Teléfono</label>
                    <input type="hidden" id="htipo">
                  </div>
                  <div class="input-field col s12 m5">
                    <input type="text" class="validate" id="telefono_in" data-mask="9999-9999">
                    <input type="hidden" id="vtelefono" fill="19">
                    <label class="truncate" for="telefono_in">Ingresar Teléfono</label>
                  <ul class="collection" vtabla="telefono" id="ftelefonos" hasTabla="1" tp="4" style="border: 0;"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </div>
    <div class="modal-footer">
      <button type="button" class="waves-effect waves-green btn-flat add" modulo="cliente" varias="1">Guardar</button>
      <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
    </div>
  </div>