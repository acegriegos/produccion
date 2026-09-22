<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Estado de Cuenta</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.4.1.0">
  {literal}
    <style type="text/css">
      .cliente{
        margin-bottom: 15px !important;
      }
    </style>
  {/literal}
</head>
<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" sp="269" elem="" modulo="reportecxc"></div>
      <input type="hidden" id="vishistorico" value="0">
      <input type="hidden" id="visproveedor" value="0">
      <input type="hidden" id="vintereses" value="0">
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3]}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s4 m4 l4" align="center">
          <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" title="Mostrar Filtros" style="display:none;"></i>
          <input type="hidden" class="zelda">

         <font size="4"><b align="center" style="margin-top: 0px;" id="titrep"></b></font><br>
        <font size="3">
          <b>{$MIS[0]}</b><br>
          {if $MIS[2]}<b>{$MIS[2]}</b><br>{/if}
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
         
      </div>
    </div>
    <small id="leyenda"></small>
    
    <table class="table responsive-table centered bordered z-depth-3" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
      <thead>
      <tr>
        <td class="white-text blue sinborde" style="text-align: center"><b>Número de Factura</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Fecha</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Monto Fact.</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Abonos</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>NC</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>ND</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Saldo</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Interés</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Cliente</b></td>
      </tr>
      </thead>
      <tbody class="detrep"></tbody>
    </table>
  <br><br>
  </div>

      <ul id="acciones" class="side-nav side-nav-cuentas" style="width: 60%">
        <div class="card-header center pequeño head1" style="margin: 0 !important">
            <p class="flow-text" style="font-size: 1.9em;margin: 0 !important;padding-top: 20px !important">Detalle de la Cuenta</p>
        </div>
        <div class="row pequeño">
            <div class="col s12 m12 pequeño">
                <div class="card bg1 z-depth-3 pequeño">
                    <div class="card-content white-text center-align" style="padding-top: 0.5% !important; padding-bottom: 0 !important">
                        <div class="col s12 m8 l8 right-align" style="padding-right: 10% !important;">
                            <span class="card-title"><b>Factura: <span id="ifac"></span></b></span>
                        </div>
                    </div>
                    <div class="card-content white-text" style="padding: 0.1% !important">
                        <div class="row pequeño">
                            <div class="col s12 m8">
                                <div class="col s12 m12">
                                    <p><b>Nombre:</b><span id="inombr"> </span></p>
                                </div>
                                <div class="col s12 m6">
                                    <p><b>Fecha: </b><span id="ifecha"> </span></p>
                                </div>
                                <div class="col s12 m6">
                                    <p><b>Saldo: </b><span id="isaldo"> </span></p>
                                </div>
                                <div class="col s12 m6">
                                    <p><b>Plazo: </b><span id="iplazo"> </span></p>
                                </div>
                                <div class="col s12 m6">
                                    <p><b>Dias del credito :</b><span id="idias"> </span></p>
                                </div>
                            </div>
                            <div class="col s12 m12 l4 pequeño">
                                <div class="row hide" style="padding-top: 10%;">
                                    <div class="col s12">
                                        <button href="#!" class="waves-effect waves-light btn btn2 rigth z-depth-3" id="btn-div"><i class="mdi mdi-24px mdi-credit-card left"></i>Realizar Abono</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div> <!-- end divabono -->
                </div>
            </div>
            <div class="card-block pequeño" >
                <div class="row pequeño">
                    <div class="col s12 pequeño">
                        <table id="data-table-cuentas-detalle" class="dt-responsive nowrap pequeño table centered highlight bordered  z-depth-3 ">
                            <thead>
                                <tr>
                                    <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Movimientos</th>
                                    <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Consecutivo</th>
                                    <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Fecha</th>
                                    <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Monto</th>
                                    <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Saldo</th>
                                    <th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Usuario</th>
                                </tr>
                            </thead>
                            <tbody id="listaCuentasxCDetalle"></tbody>
                        </table>
                    </div>
                    <div class="col s4 offset-s8  l2 offset-l10">
                    <button href="#!" class="waves-effec btn btn1 waves-light z-depth-3 " id="btn-navsalir">Salir</button></div>
                </div>
            </div>
        </div>
    </ul>


      <ul id="extra" class="side-nav side-nav-conta1" style="overflow-y: hidden;">
        <span id="retfact" class="pbtn"><i class="mdi mdi-keyboard-backspace mdi-24px" title="Salir"></i></span>
        <i class="mdi mdi-refresh mdi-spin loader" style="font-size:65px;margin-left: 50%;"></i>
        <iframe src="" id="extra-i" style="width: 100%;height: 100vh;" class="hide"></iframe>
      </ul>

  {$SCR}
  {literal}
  <script type="text/javascript">
    /*porcliente portipo="varios" tbltipos="0,0,0" tipos="Fecha Vencimiento,Cobrar Interéses,Fecha Corte" types="5,3,5" elem=""*/
    $(function(){
      let pr = getParameterByName('tp');
      pr = pr == undefined ? 0 : pr;
      let bisprov = pr.toString().match(new RegExp(/\b1\b|\b3\b/g)) ? 'bisprov' : '';

      $(".filtros").data('filtros',{
        "ncliente":{
          "tipo":1,
          "texto":"Razón Social",
          "class" : "cliente",
          "attr" : bisprov,
          "autocomplete" : {
            "id" : "vidcliente"
          }
        },
        "vencimiento":{
          "tipo":4,
          "texto":"Fecha de Vencimiento",
          "sub": 5,
          "change_type": 6,
          "values":{
            "vvencimiento":"1"
          }
        },
        "corte":{
          "tipo":4,
          "texto":"Fecha de Corte",
          "sub": 5,
          "change_type": 6,
          "values":{
            "vcorte":"1"
          }
        },
        "entrefechas":{
          "tipo":4,
          "texto": "Entre Fechas",
          "sub": 5,
          "values": {
            "vdesde":"1",
            "vhasta":""
          }
        },
        "vinteres":{
          "tipo":2,
          "texto":'Cargar Interés(%)',
          "change_type":3
        },
        "vintto":{
          "tipo":2,
          "texto":'Plazo Interés(Días)',
          "change_type":3
        }
      });

    });

    $(document).on("click","#btn-navsalir",function(){
      $('.side-nav-cuentas').sideNav('hide');
      $('.button-collapse').sideNav('destroy');
    });

  </script>
  {/literal}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.4.1.0"></script>
  <script src="../assets/js/modulos/reportes/cxc.js?v=10.4.1.0"></script>
</body>
</html>