<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Sistema de Compras</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
    <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu1.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">

  </head>
  <body>
    <br>
    {$NAV}
    <div class="bdy">
    {if $smarty.session.TIPO eq 1}
        <div class="row">
            <div class="col-xs-12 col-md-12 der">
                <div class="input-group">
                    <div class="input-group-addon">Sucursal</div>
                    <select id="vidsucursal" class="form-control" required="required">
                        <option value="0">Todas las Sucursales</option>
                        {section name=LE loop=$SUC}
                        <option value="{$SUC[LE][0]}">{$SUC[LE][1]}</option>
                        {/section}
                    </select>
            </div>
            </div>
        </div>

        <input type="hidden" id="idsuc" value="{$smarty.session.IDSUC}">
    {/if}

    <!-- <form id="fclientes">
    <div class="alert alert-danger err_" id="err1">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <strong id="errm1"></strong>
    </div>
    <small id="suc1" class="suc_"></small>
    <button type="button" class="btn btn-primary add" modulo="clientes" codigo="1">Agregar</button>
    </form>  -->

    </div>

    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/mask/jquery.mask.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
    <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
    <script src="../assets/js/asgard.js"></script>

  </body>
</html>