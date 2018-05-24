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
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-facturacion.css">
  <body >
  {$NAV}
    <div class="bdy pequeño" >
      <div id="mfacturacion"></div>
    </div>
  </body>
  {$SCR}
  <script src="../assets/js/modulos/facturacion.js?v=0.1"></script>
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
        <input type="text" id="edescuento">
        <label for="edescuento">Descuento</label>
      </div>

      <div class="input-field col s6 eimp">
        <input type="text" id="eimpuesto">
        <label for="eimpuesto">Impuesto</label>
      </div>

      <div class="input-field col s6 eexct">
        <input type="text" id="texct">
        <label for="texct">Excento</label>
      </div>
      <input type="hidden" id="hdnprd" value="0">
    </div>

  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" id="editprod">Aceptar</a>
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Salir</a>
  </div>
</div>