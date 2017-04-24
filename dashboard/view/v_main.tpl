<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Sistema BMS</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu.css">

  </head>
  <body>
    {$NAV}
    <div class="bdy">

    <div class="row" style="border-bottom: 1px solid #e2e2e2">
    {if $smarty.session.TIPO eq 1}
        
            <div class="input-field col s12 m6 l3">

                <select>
                    <option value="0">Todas las Sucursales</option>
                    {section name=LE loop=$SUC}
                    <option value="{$SUC[LE][0]}">{$SUC[LE][1]}</option>
                    {/section}
                </select>
                <label>Seleccione una Sucursal</label>
            </div>
    {/if}
    <a href="#" class="btn-floating der"><i class="material-icons">add</i></a>
    </div>

    <!-- <form id="checkout-form" action="main" method="post">
      <div id="error-message"></div>

      <label for="card-number">Card Number</label>
      <div class="hosted-field" id="card-number"></div>

      <label for="cvv">CVV</label>
      <div class="hosted-field" id="cvv"></div>

      <label for="expiration-date">Expiration Date</label>
      <div class="hosted-field" id="expiration-date"></div>

      <input type="hidden" name="payment_method_nonce">
      <input type="hidden" name="accion" value="1">

      <input type="submit" value="Pay $10" disabled>
    </form>

    <script src="https://js.braintreegateway.com/web/3.11.1/js/client.js"></script>
    <script src="https://js.braintreegateway.com/web/3.11.1/js/hosted-fields.js "></script> -->

    <script src="../assets/js/main.js?v=1.1"></script>


  </body>
</html>