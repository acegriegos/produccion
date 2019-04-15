<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Boletas</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-arrendamiento.css?v=10.0.1.17">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
        <div class="card">
          <h4 class="center">Boleta de Recibo</h4>
          <div class="row">
            <div class="input-field col s12 m6 show_cliente" style="position: relative;">
                <i class="mdi mdi-face mdi-24px prefix"></i>
                <input type="text" id="ncli" value="" class="autocomplete validate sclie" maxlength="64" autocomplete="off"/>
                <label for="ncli">Cliente</label>

                <a class="mdi mdi-16px mdi-plus text-green pbtn tooltipped clieBTN" id="ingclie" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 8px; z-index: 180;cursor: pointer;" data-position="bottom" data-tooltip="Agregar Cliente"></a>              
              </div>

              <div class="col s6 m3">
                <select id="idboletas">
                   <option value="0" disabled>Seleccione una Boleta</option> 
                </select>
              </div>

              <a href="#" class="s6 m3 btn-floating der" id="addboleta" title="Agregar Boleta"><i class="mdi mdi-plus"></i></a>

              <a href="#" class="s6 m3 btn-floating der" id="flujo" title="Flujo de Caja"><i class="mdi mdi-recycle"></i></a>

              <a href="#" class="s6 m3 btn-floating der" id="shrutas" title="Ruta"><i class="mdi mdi-motorbike"></i></a>

            </div> 

            <div class="row">
              <div class="col s6">
                  <b>Préstamo:</b> <span id="prestamo">1,000,000.00 CRC</span>                
              </div>
              <div class="col s6">
                  <b>Cuota:</b> <span id="cuota">40,000.00 CRC</span>                
              </div>
              <div class="col s6">
                  <b>Fecha Inic.:</b> <span id="finic">01-01-2019</span>                
              </div>
              <div class="col s6">
                  <b>Fecha Venc.:</b> <span id="ffin">30-01-2019</span>                
              </div>
              <div class="col s6">
                  <b>Saldo:</b> <span id="saldo">510,000.00 CRC</span>                
              </div>
              <div class="col s6">
                  <b>A Favor:</b> <span id="positivo">10,000.00 CRC</span>                
              </div>
              <div class="col s12 center">
                  <b>Cantidad de Cuotas:</b> <span id="ccuota">30</span>                
              </div>
            </div>
              {php}
                  $fila1 = '<div class="row container" style="margin-bottom: 10px">';
                  $fila2 = '<div class="row container" style="margin-bottom: 10px">';
                  $fila3 = '<div class="row container" style="margin-bottom: 10px">';
                  $fila4 = '<div class="row container" style="margin-bottom: 10px">';
                  $fila5 = '<div class="row container" style="margin-bottom: 10px">';
                  $fila6 = '<div class="row container" style="margin-bottom: 10px">';
                  $mciclo = 1;

                  for($i=0;$i<40;$i++){
                    switch($mciclo){
                      case 1:
                        $fila1 = $fila1.'<div class="col s2 center" ><a class="green btn-floating">'.($i+1).'</a></div>';
                        break;
                      case 2:
                        $fila2 = $fila2.'<div class="col s2 center" ><a class="grey btn-floating">'.($i+1).'</a></div>';
                        break;
                      case 3:
                        $fila3 = $fila3.'<div class="col s2 center" ><a class="grey btn-floating">'.($i+1).'</a></div>';
                        break;
                      case 4:
                        $fila4 = $fila4.'<div class="col s2 center" ><a class="grey btn-floating">'.($i+1).'</a></div>';
                        break;
                      case 5:
                        $fila5 = $fila5.'<div class="col s2 center" ><a class="grey btn-floating">'.($i+1).'</a></div>';
                        break;
                      case 6:
                        $fila6 = $fila6.'<div class="col s2 center" ><a class="grey btn-floating">'.($i+1).'</a></div>';
                        break;
                      default:
                      echo $i.'<br>';
                        break;
                    }   

                    if((($i+1)%30 == 1 && $i > 1) || $i == 39){
                      echo $fila1."</div> ".$fila2."</div>  ".$fila3."</div>  ".$fila4."</div>  ".$fila5."</div>  ".$fila6."</div>";
                      $fila1 = '<div class="row container" style="border-top:1px solid #e2e2e2">';
                      $fila2 = '<div class="row container">';
                      $fila3 = '<div class="row container">';
                      $fila4 = '<div class="row container">';
                      $fila5 = '<div class="row container">';
                      $fila6 = '<div class="row container">';
                      $mciclo = 6;
                    }

                    $mciclo = $mciclo+1 > 6 ? 1 : $mciclo+1;
                    
                  }

              {/php}
        </div>
    </div>
    {$SCR}
    <script src="../assets/js/modulos/arrendamiento.js?v=10.0.1.17"></script>
  </body>
</html>