<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Cierre Caja</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-cierres.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
    <div class="row">
      <div class="col s12 m12 l12">
        <a class="waves-effect waves-light btn blue right" id="chkcierre">Realizar Cierre</a>
      </div>
      <div class="row">
        <div class="col s3 m3 l3">
          <ul class="collection with-header" id="listacierrespendientes"></ul>
        </div>
        <div class="col s9 m9 l9">
          <h4>Facturas</h4>
          <table class="table responsive-table centered striped bordered highlight z-depth-5" id="data-table-facturas" cellspacing="0" width="100%" >
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Consecutivo</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Fecha</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Cliente</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Tipo</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Tipo Pago</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Total</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Usuario</th>
                </tr>
            </thead>
            <tbody id="listafacturas"></tbody>
        </table>
        <div class="row marginzero">
          <div class="col s3 m3 l3">
            Total contado: <span id="tcontado"></span>
          </div>
          <div class="col s3 m3 l3">
            Total crédito: <span id="tcredito"></span>
          </div>
          <div class="col s6 m6 l6"></div>
        </div>
        <h4>Notas y abonos</h4>
          <table class="table responsive-table centered striped bordered highlight z-depth-5" id="data-table-estadocuenta" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Consecutivo</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Nota/Abono</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Fecha</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Cliente</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Tipo Pago</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Saldo</th>
                    <th class="white-text blue" style="border: 0; font-size: 1.2em; border-radius: 0px !important;">Usuario</th>
                    
                </tr>
            </thead>
            <tbody id="listanotasabonos"></tbody>
          </table>
          <div class="row marginzero">
            <div class="col s4 m4 l4">
              Total Abonos Cliente: <span id="tabono"></span>
            </div>
            <div class="col s4 m4 l4">
              Total Notas Crédito Cliente: <span id="tnotcre"></span>
            </div>
            <div class="col s4 m4 l4 ">
              Total Notas Débito Cliente: <span id="tnotdeb"></span> 
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    {$SRC}
    <script src="../assets/js/modulos/cierres.js"></script>
  </body>
</html>