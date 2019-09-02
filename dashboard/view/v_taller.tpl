<DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Cache-Control" content="max-age=86400"/>
        <title>Taller</title>
    </head>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-taller.css?v=10.2.0.10">
    <body>
        {$NAV}
        <div class="bdy">
            <div class="card z-depth-5">
                <div class="card-header center blue-grey white-text z-depth-1">
                    <p class="flow-text"  style="background-color:#0B3861;">Taller</p>
                </div>
                <nav class="navbar navbar-dark blue z-depth-1" style="margin-top: -25px;">
                    <ul class="nav navbar-nav">
                        <li class="nav-item menu active per4101" id="t1">
                            <a class="nav-link" href="#" title="Ingresar Boleta">Ingresar Boleta</a>
                        </li>
                        <li class="nav-item menu per4102" id="t2">
                            <a class="nav-link" href="#" title="Buscar Boleta">Buscar Boleta</a>
                        </li>
                        <li class="nav-item menu per4103" id="t3">
                            <a class="nav-link" href="#" title="Vehículos">Vehículos</a>
                        </li>
                    </ul>
                </nav>
                <div id="mtaller"></div>
            </div>
        </div> <!-- END BDY -->
        {$SCR}
        <script src="../assets/js/modulos/taller.js?v=10.2.0.10"></script>
    </body>
</html>