<?php 
    
    if(isset($_REQUEST['accion'])){
        require_once './_config/mysqlDB.php';
        $db = new DBClass();

        switch($_REQUEST['accion']){
            case 1:
                //$lista = $db->ejecutar("select a.id,a.idtipoventa,date_format(a.fecha,'%d-%m-%Y') as fecha,concat(case a.idtipoventa when 1 then 'F-' when 7 then 'T-' when 8 then 'S-' else '' end,lpad(a.consecutivo,10,0)) as cons,d.nombre,ifnull(c.nombre,if(a.comodin='','',a.comodin)) as cliente,(subtotal+imv+exonerado+exento-descuento)-ifnull(sum(e.total),0) - ifnull(sum(g.valor),0) - ifnull(sum(h.total+h.pagacon-h.vuelto),0)-ifnull(sum(f.monto),0) as total from facturas a left join vueltos b on a.id = b.ifactura left join clientes c on c.id = a.idcliente join tipoventas d on d.id = a.idtipoventa left join pagosvarios f on f.idfactura = a.id left join pagosmixtos e on e.id = f.idmixto left join estadoscuentas g on g.idfactura = a.id and g.idtipo in(5,10) left join (select a.* from pagosmixtos a left join pagosvarios b on b.idmixto = a.id where b.id is null and a.anulada is null) h on h.idfactura = a.id  where !a.isregistrada and if(a.idestado = 1, b.id is null,1) and a.idtipoventa in(1,7,10,8) and a.idtipo = 1 and a.idtipopago <> 2 and a.idestado <> 4 and a.id > 0 group by a.id having truncate(total,0) > 0 order by idtipoventa,a.id desc;")->fetch_all();
                $lista = $db->ejecutar("select a.id,
        a.idtipoventa,
        date_format(a.fecha,'%d-%m-%Y') as fecha,
        concat(case a.idtipoventa when 1 then 'F-' when 7 then 'T-' when 8 then 'S-' else '' end,lpad(a.consecutivo,10,0)) as cons,
        d.nombre,
        ifnull(c.nombre,if(a.comodin='','',a.comodin)) as cliente,
        (subtotal+imv+exonerado+exento-descuento)-e.pago - g.abono  as total 
    from facturas a
    left join clientes c on c.id = a.idcliente join tipoventas d on d.id = a.idtipoventa 
    join (select id,pago from ((select a.id as id,sum(b.total+b.pagacon-b.vuelto) as pago from facturas a join      pagosmixtos b on b.idfactura = a.id and b.anulada is null group by a.id) 
        union
        (select id,0 from facturas) ) a group by id) e on e.id = a.id 
    join (select id,abono from ((select a.id as id,sum(b.valor) as abono from facturas a join estadoscuentas b on       b.idfactura = a.id and b.idestado = 1 and b.idtipo in(3,7,5,10) group by a.id) 
        union
        (select id,0 from facturas) ) a group by id) g on g.id = a.id  
    where !a.isregistrada and  a.idtipoventa in(1,7,10,8) and a.idtipo = 1 and a.idtipopago <> 2 and a.idestado <> 4 and a.id > 0 group by a.id having truncate(total,0) > 0 order by idtipoventa,a.id desc;")->fetch_all();
                echo json_encode($lista);
                break;
            case 2:
                $lista = $db->ejecutar("select b.id,concat(case b.idtipoventa when 1 then 'F-' when 7 then 'T-' when 8 then 'S-' else '' end,lpad(b.consecutivo,10,0)) as con,a.total as total,ifnull(c.nombre,if(b.comodin='','',b.comodin)) as cliente,b.idtipoventa,a.id,a.id from pagosmixtos a join facturas b on b.id = a.idfactura left join clientes c on c.id = b.idcliente where date_format(if(".$_REQUEST['tfecha'].",a.registro,a.fecha),'%Y-%m-%d') between '".$_REQUEST['desde']."' and '".$_REQUEST['hasta']."' and a.idpago = 3 and a.anulada is null and b.idtipoventa in(1,7,8,10)")->fetch_all();
                echo json_encode($lista);
                break;
            case 3:
                $datos = $db->ejecutar('select a.idbanco,a.extra,date_format(a.fecha,"%Y-%m-%d"),a.total as total from pagosmixtos a join facturas b on b.id = a.idfactura where a.id = '.$_REQUEST['vid'])->fetch_all();
                echo json_encode($datos);
                break;
        }
        
        exit(0);
    }


    $bancos = '<option value="0">N/A</option> <option value="1">BAC</option> <option value="2">BCR</option> <option value="3">BN</option> <option value="3">Grupo Mutual</option>';

 ?>

<!DOCTYPE html>
 <html>
 <head>
    <meta charset="utf-8">
    <title>Bancos</title>

    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link rel="stylesheet" type="text/css" href="./assets/css/materialize.min.css?v=10.4.1.0">
    <link rel="stylesheet" type="text/css" href="./assets/css/modulos/style-menu.css?v=10.4.1.0">
    <link rel="stylesheet" type="text/css" href="./assets/css/materialdesignicons.min.css?v=10.4.1.0">

    <style type="text/css">

        th{
            padding: 0px;
        }

    </style>

 </head>
 <body>

    <div class="row filtros_old">
        <span class="col s3"></span>
        <section class="col s6 row">
            <div class="input-field col s6">
                <input type="date" id="fch" class="fch" >
                <label for="fch" class="active">Desde</label>
            </div>
            <div class="input-field col s6">
                <input type="date" id="fch1" class="fch">
                <label for="fch1" class="active">Hasta</label>
            </div>
        </section>
        <div class="col s3">
            <a class="btn" id="drefresh">Refrescar <i class="mdi mdi-refresh"></i></a>
            <br>
            <label>Por Fecha de:</label>
             <div class="switch">
              <label>
                <span class="hide-on-small">Inclución</span>
                <input type="checkbox" id="tfecha" checked>
                <span class="lever"></span>
                Transacción
              </label>
        </div>
        </div>
    </div>

    <div class="filtros_new hide row">
        <div class="col s4 center row" style="border-right: 1px solid #e2e2e2">
            <span class="col s12"><b>Filtros 01</b></span>
            <div class="input-field col s6">
                <input type="date" class="bowser-default" id="sfincd">
                <label for="sfincd" class="active">Fecha Inclución, Desde</label>
            </div>

            <div class="input-field col s6">
                <input type="date" class="bowser-default" id="sfinch">
                <label for="sfinch" class="active">Hasta</label>
            </div>

            <div class="input-field col s6">
                <input type="date" class="bowser-default" id="sftrad">
                <label for="sftrad" class="active">Fecha Transacción, Desde</label>
            </div>

            <div class="input-field col s6">
                <input type="date" class="bowser-default" id="sftrah">
                <label for="sftrah" class="active">Hasta</label>
            </div>

            <div class="col s6 input-field">
                <select id="stbanco"> <?php echo $bancos; ?> </select>
                <label for="stbanco">Banco</label>
            </div>

            <div class="col s6 input-field">
                <input type="text" id="strans">
                <label for="strans">Transferencia</label>
            </div>

             <div class="col s12 input-field">
                <input type="text" id="srz">
                <label for=scrz">Razón Social</label>
            </div>

            <div class="col s6 input-field">
                <input type="text" id="scons">
                <label for="scons">Consecutivo</label>
            </div>

            <a class="btn col s12"><i class="mdi mdi-magnify mdi-24px"></i> Buscar</a>
        </div>

        <div class="col s4 row center">
            <span class="col s12"><b>Filtros sin Conciliar</b></span>

            <div class="col s12 input-field">
                <input type="text" id="crz">
                <label for="crz">Razón Social</label>
            </div>

            <div class="col s6 input-field">
                <input type="text" id="ccons">
                <label for="ccons">Consecutivo</label>
            </div>

            <a class="btn col s12"><i class="mdi mdi-magnify mdi-24px"></i> Buscar</a>
        </div>

        <div class="col s4 center row" style="border-right: 1px solid #e2e2e2">
            <span class="col s12"><b>Filtros FE</b></span>
            <div class="input-field col s6">
                <input type="date" class="bowser-default" id="ffincd">
                <label for="ffincd" class="active">Fecha Inclución, Desde</label>
            </div>

            <div class="input-field col s6">
                <input type="date" class="bowser-default" id="ffinch">
                <label for="ffinch" class="active">Hasta</label>
            </div>

            <div class="input-field col s6">
                <input type="date" class="bowser-default" id="fftrad">
                <label for="fftrad" class="active">Fecha Transacción, Desde</label>
            </div>

            <div class="input-field col s6">
                <input type="date" class="bowser-default" id="fftrah">
                <label for="fftrah" class="active">Hasta</label>
            </div>

            <div class="col s6 input-field">
                <select id="ftbanco"> <?php echo $bancos; ?> </select>
                <label for="ftbanco">Banco</label>
            </div>

            <div class="col s6 input-field">
                <input type="text" id="ftransf">
                <label for="ftransf">Transferencia</label>
            </div>

             <div class="col s12 input-field">
                <input type="text" id="frz">
                <label for="frz">Razón Social</label>
            </div>

            <div class="col s6 input-field">
                <input type="text" id="fcons">
                <label for="fcons">Consecutivo</label>
            </div>

            <a class="btn col s12"><i class="mdi mdi-magnify mdi-24px"></i> Buscar</a>
        </div>
    </div>
     
    <div class="row">
        <div class="col s3">
            <h4 class="center">01</h4>
            <table>
                <tr>
                    <th>#</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <th colspan="2">Cliente</th>  
                </tr>
            <tbody id="listaconciliadas1" style="font-size: 13px">
                
            </tbody>
            </table>
        </div>
        <div class="col s6">
            <h4 class="center">Facturas Sin Concilar (<span id="csc">0</span>)</h4>
            <table>
            <thead>
            <tr>
                <th>Consecutivo</th>
                <th>Fecha</th>
                <th style="width: 50%">Razón Social</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody id="listafacturas" style="font-size: 13px;border:1px solid black;height: 70vh; overflow-y: auto">

            </tbody>
         </table>
        </div>
        <div class="col s3">
            <h4 class="center">FE</h4>
            <table>
                <tr>
                    <th>#</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <th colspan="2">Cliente</th>  
                </tr>
            <tbody id="listaconciliadas" style="font-size: 13px">

            </tbody>
            </table>
        </div>
    </div>
     
    <div class="modal modal-fixed-footer" id="modal-datos" style="height: 75%; width: 50%" vid="0">
    <div class="modal-header head3 center" style="font-size: 22px;">Información de Transferencia <span id="numfact"></span></div>
    <div class="modal-content">

        <div class="input-field">
            <select id="idbanco"> <?php echo $bancos; ?> </select>
            <label for="ibanco">Banco</label>
        </div>
        

        <div class="input-field">
            <input type="text" id="ebancos" style="text-align:right" placeholder="0000000">
            <label for="ebancos">Transferencia</label>
        </div>
        

        <div class="input-field">
         <input type="date" id="ftrans" style="text-align: right;">
         <label for="ftrans" class="active">Fecha Transferencia</label>   
        </div>

        <div class="input-field">
         <input type="text" id="ttrans" class="eder numeric" value="0" style="text-align: right;">
         <label for="ttrans" class="active">Monto de Transferencia</label>  
        </div>
        <small id="tmsj" class="red-text"></small> 
         

    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a>
        <a class="modal-action waves-effect waves-green btn-flat" id="doact">Aceptar</a>
    </div>
  </div>

    <script src="./assets/js/jquery.js?v=10.4.1.0"></script>
    <script src="./assets/js/materialize.min.js?v=10.4.1.0"></script>
    <script src="./assets/js/asgard.js?v=10.4.1.0"></script>
    <script src="./assets/js/main.js?v=10.4.1.0"></script>
    <script src="./assets/js/bancos.js?v=10.4.1.0"></script>
 </body>
 </html>