<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Facturas</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-verfacturas.css">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">

        <div class="card z-depth-5 ">
            <div class="card-header center blue-grey white-text"> 
            <p class="flow-text" style="margin-top: 0%; background-color:#0B3861">
            Vista de Facturas {$smarty.session.EMPRESA|upper}</p>
            </div>

            <div class="row">
            <div class="col s6 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf1" {if $TF eq 1}checked{/if}/>
                <label for="tf1">Ventas</label>
            </div>
            <div class="col s6 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf2" {if $TF eq 2}checked{/if}/>
                <label for="tf2">Compras</label>
            </div>

            <div class="col s6 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf3" {if $TF eq 3}checked{/if}/>
                <label for="tf3">Ordenes de Compras</label>
            </div>
            <div class="col s6 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf4" {if $TF eq 4}checked{/if}/>
                <label for="tf4">Cotizaciones</label>
            </div>

            <div class="col s6 m2">
                <input name="tventa" class="with-gap" type="radio" id="tf5" {if $TF eq 5}checked{/if}/>
                <label for="tf5">Orden de Pedidos</label>
            </div>      
                
            </div>

            <hr>
            <div class="row">
                <div class="col s12">
                    <span>Filtros</span>
                </div>
            </div>
            <br><br>
        </div>

    </div>
    {$SCR}
    <script src="../assets/js/modulos/verfacturas.js?v=0.1"></script>
  </body>
</html>