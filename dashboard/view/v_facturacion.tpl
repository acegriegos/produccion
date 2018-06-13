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
              <option value='0'>No Aplica - 0%</option>
              <option value='' class="per1103">Por Vendedor</option>
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

  <div class="modal modal-fixed-footer grandemodal" id="addClie" style="height: 80%; width: 75%">
  <div class="modal-header">
    <ul class="tabs tabs-fixed-width head3">
      <li class="tab"><a class="active white-text titadd" href="#!" style="cursor: default;"></a></li>
    </ul>
  </div>
  <div class="modal-content">
    <div class="row nserv">
      <div class="col s6 m3 input-field">
        <input type="text" id="vpais" class="autocomplete pais">
        <label for="vpais">País</label>
      </div>
      
      <div class="col s6 m3 input-field">
        <select id="provincia"> <option value="0" disabled>Seleccione una Opción</option></select>
        <label for="provincia">Provincia</label>
      </div>
      
      <div class="col s6 m3 input-field">
        <select id="canton"> <option value="0" disabled>Seleccione una Opción</option></select>
        <label for="canton">Cantón</label>
      </div>
      
      <div class="col s6 m3 input-field">
        <select id="viddistrito"><option value="0" disabled>Seleccione una Opción</option></select>
        <label for="viddistrito">Distrito</label>
      </div>

      <div class="col s6 m3 input-field">
        <select id="vidbarrio"><option value="0" disabled>Seleccione una Opción</option></select>
        <label for="vidbarrio">Barrio</label>
      </div>
      
      <div class="col s6 m3 prod input-field">
        <input type="text" id="vregion" class="autocomplete" autocomplete="off">
        <label for="vregion">Región</label>
      </div>
      
      <div class="col s6 m3 prod input-field">
        <input type="text" id="finca" class="autocomplete" autocomplete="off">
        <label for="finca">Finca</label>
      </div>
    </div>
    <div class="row nserv">
      <div class="col s12 input-field">
        <textarea id="vdireccion" class="materialize-textarea"></textarea>
        <label for="vdireccion">Otras Señas</label>
      </div>
      
      <div class="col s6 m3 prod input-field">
        <input type="text" id="vlatitud" value="0">
        <label for="vlatitud">Latitud</label>
      </div>
      <div class="col s6 m3 prod input-field">
        <input type="text" id="vlongitud" value="0">
        <label for="vlongitud">Longitud</label>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="waves-effect waves-green btn-flat" id="ingresar">Guardar</button>
    <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
  </div>
</div>

</div>