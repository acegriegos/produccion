<?php 

print_r($miscelaneos);
// $html = '<meta charset="utf-8">
//  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
//  <link href="../assets/css/bootstrap.css" rel="stylesheet">
//  <link href="../assets/css/modulos/style-reportes.css" rel="stylesheet">
//  <body>';
//  // <div id="pageFooter"></div>
// $suc = 0;
// $prov = '';
// $sz = sizeof($transaccion) -1;
// $subtp = $subts = $totp = $tots = 0;
// $cant = 0;
// $nula = 0;

// //HEADER
// $html .= '<div class="hoja">';

// $day = date("d");
// $month = date("m");
// $year = date("Y");
//  $html .= '<table width="100%" id="header">
//   <tr>
//     <td width="30%">
//       <img src="../assets/img/logo.png" style="width:160px">
//     </td>
//     <td align="center" width="50%">
//       <font size="7"><b>EMPRESA</b></font>
//       <br>
//     </td>
//     <td align="center" width="20%">
//       <table style="border: 1px solid black;" width="80%">
//         <tr align="center">
//           <td style="border: 1px solid black;" width="36%">Día</td>
//           <td style="border: 1px solid black;" width="36%">Mes</td>
//           <td style="border: 1px solid black;" width="36%">Año</td>
//         </tr>
//         <tr align="center">
//           <td style="border: 1px solid black;">{day}</td>
//           <td style="border: 1px solid black;">{month}</td>
//           <td style="border: 1px solid black;">{year}</td>
//         </tr>
//       </table>
      
//     </td>
//   </tr>
// </table>
// <br>';
// $html = str_replace('{day}',$day, $html);
// $html = str_replace('{month}',$month, $html);
// $html = str_replace('{year}',$year, $html);

// foreach ($transaccion as $clave => $obj) {
//   $colorG = $obj[10] <= 4 ? 'style="color: #ED532C;"' : '';  
//   $cl = 'class="salto"';
//   $tbl = '</table>';

//   if ($suc != $obj[11]) {

    
//     if($suc == 0){
//       $cl = ''; 
//       $tbl = '';
//     }

//      if ($obj[13] == 3) {
//         $isnul = 'style="color: red"';
//         $nul = '<span style="color: red">[ANULADA]</span>';
//         $nula += 1;
//       }else{
//         $isnul = '';
//         $nul = '';
//       }

//     if ($suc != 0) {


//       $html .= '<tr style="border-top: 1px solid black;">
//               <td align="left"><b style="font-size: 12px;">TOTAL FACTURA(Subtotal-Total-Margen)</b></td>
//               <td align="right" colspan="2" >¢ '.number_format($subtp,2).'</td>
//               <td align="right" colspan="2" >¢ '.number_format($totp,2).'</td>
//               <td align="right" colspan="2" >¢ '.number_format(($totp-$subtp)/2,2).'</td>
//               <td></td>
//             </tr>
//             <tr><td colspan="7" style="color: white">.</td></tr>';
//             $subtp = 0;
//             $totp = 0;
//     $html .= '<tr style="border-top: 1px solid black;">
//               <td align="center"><b style="font-size: 12px;">TOTAL SUCURSAL(Subtotal-Total-Margen)</b></td>
//               <td align="right" colspan="2">¢ '.number_format($subts,2).'</td>
//               <td align="right" colspan="2">¢ '.number_format($tots,2).'</td>
//               <td align="right" colspan="2">¢ '.number_format(($tots-$subts)/2,2).'</td>
//               <td></td>
//             </tr>
//             <tr><td colspan="7"></td></tr><tr><td colspan="10"></td></tr></table><br>Cantidad de Compras: '.$cant.'
//             <br>Compras Anuladas: '.$nula;
//             $cant = 0;;
//             $subts = 0;
//             $tots = 0;
//             $nula = 0;
//     }

//     $html .= '<hr '.$cl.'><h4>Sucursal '.$obj[12].'</h4><hr>';


//     $prov = $obj[3];
//     $cant += 1;
//     $html .= '<b>Proveedor: </b>'.$obj[2].' <table class="tbl01"><tr><td>'.$nul.'Compra: '.$obj[0].'</td><td>Referencia: '.$obj[15].'</td><td>Fecha: '.$obj[14].'</td></tr></table><br>';

//      $html .= '<table width="100%">
//         <tr>
//           <td align="center" width="30%"><b>Producto</b></td>
//           <td align="center" width="30%"><b>Descricpión</b></td>
//           <td align="center" width="8%"><b>Cantidad</b></td>
//           <td align="center" width="8%"><b>Costo</b></td>
//           <td align="center" width="8%"><b>Precio</b></td>
//           <td align="center" width="8%"><b>Margen</b></td>
//           <td align="center" width="8%"><b>Ganancia</b></td>
//         </tr>
//         <tr>
//           <td align="center" width="30%">'.$obj[4].'</td>
//           <td width="30%">'.$obj[5].'</td>
//           <td align="center">'.$obj[6].'</td>
//           <td align="right">'.$obj[8].'</td>
//           <td align="right">'.$obj[7].'</td>
//           <td align="right">'.$obj[9].'</td>
//           <td '.$colorG.' align="center">'.$obj[10].' %</td>
//         </tr>';

//     $subtp += $obj[6] * $obj[8];

//     $totp += $obj[6] * $obj[7];

//     if ($obj[13] != 3) {
//       $subts += $obj[6] * $obj[8];
//       $tots += $obj[6] * $obj[7];
//     }

//     $suc = $obj[11];

//   }else{

//     if ($prov != $obj[3]) {

//       if ($obj[13] == 3) {
//         $isnul = 'style="color: red"';
//         $nul = '<span style="color: red">[ANULADA]</span>';
//         $nula += 1;
//       }else{
//         $isnul = '';
//         $nul = '';
//       }

//       if ($prov != '') {
//       $html .= '<tr style="border-top:1px solid black">
//                 <td align="left"><b style="font-size: 12px;">TOTAL FACTURA(Subtotal-Total-Margen)</b></td>
//                 <td align="right" colspan="2" >¢ '.number_format($subtp,2).'</td>
//                 <td align="right" colspan="2" >¢ '.number_format($totp,2).'</td>
//                 <td align="right" colspan="2" >¢ '.number_format(($totp-$subtp)/2,2).'</td>
//                 <td></td>
//               </tr>
//               <tr><td colspan="7"></td></tr>';
//               $subtp = 0;
//               $totp = 0;
//               // $mgp = 0;
//       }

//       $prov = $obj[3];
//       $cant += 1;
//       $html .= $tbl.'<br><b>Proveedor: </b>'.$obj[2].' <table class="tbl01"><tr><td>'.$nul.'Compra: '.$obj[0].'</td><td>Referencia: '.$obj[15].'</td><td>Fecha: '.$obj[14].'</td></tr></table>';

//        $html .= '<table width="100%">
//         <tr>
//           <td align="center" width="30%"><b>Producto</b></td>
//           <td align="center" width="30%"><b>Descricpión</b></td>
//           <td align="center" width="8%"><b>Cantidad</b></td>
//           <td align="center" width="8%"><b>Costo</b></td>
//           <td align="center" width="8%"><b>Precio</b></td>
//           <td align="center" width="8%"><b>Margen</b></td>
//           <td align="center" width="8%"><b>Ganancia</b></td>
//         </tr>
//         <tr>
//           <td align="center" width="30%">'.$obj[4].'</td>
//           <td width="30%">'.$obj[5].'</td>
//           <td align="center">'.$obj[6].'</td>
//           <td align="right">'.$obj[8].'</td>
//           <td align="right">'.$obj[7].'</td>
//           <td align="right">'.$obj[9].'</td>
//           <td '.$colorG.' align="center">'.$obj[10].' %</td>
//         </tr>';

//         $subtp += $obj[6] * $obj[8];

//         $totp += $obj[6] * $obj[7];

//         if ($obj[13] != 3) {
//           $subts += $obj[6] * $obj[8];
//           $tots += $obj[6] * $obj[7];
//         }

//     }else{

//       $html .= '<tr>
//           <td align="center" width="30%">'.$obj[4].'</td>
//           <td width="30%">'.$obj[5].'</td>
//           <td align="center">'.$obj[6].'</td>
//           <td align="right">'.$obj[8].'</td>
//           <td align="right">'.$obj[7].'</td>
//           <td align="right">'.$obj[9].'</td>
//           <td '.$colorG.' align="center">'.$obj[10].' %</td>
//         </tr>';

//       $subtp += $obj[6] * $obj[8];

//       $totp += $obj[6] * $obj[7];

//       if ($obj[13] != 3) {
//         $subts += $obj[6] * $obj[8];
//         $tots += $obj[6] * $obj[7];
//       }

//     }

//     if ($clave == $sz) {
//           //ultimo
//           $html .= '<tr style="border-top: 1px solid black;">
//               <td align="left"><b style="font-size: 12px;">TOTAL FACTURA(Subtotal-Total-Margen)</b></td>
//               <td align="right" colspan="2">¢ '.number_format($subtp,2).'</td>
//               <td align="right" colspan="2">¢ '.number_format($totp,2).'</td>
//               <td align="right" colspan="2">¢ '.number_format(($totp-$subtp)/2,2).'</td>
//               <td></td>
//             </tr>
//             <tr><td colspan="7" style="color: white">.</td></tr>';
//             $subtp = 0;
//           $html .= '<tr style="border-top: 1px solid black;">
//               <td align="center"><b style="font-size: 12px;">TOTAL SUCURSAL(Subtotal-Total-Margen)</b></td>
//               <td align="right" colspan="2">¢ '.number_format($subts,2).'</td>
//               <td align="right" colspan="2">¢ '.number_format($tots,2).'</td>
//               <td align="right" colspan="2">¢ '.number_format(($tots-$subts)/2,2).'</td>
//               <td></td>
//             </tr>
//             <tr><td colspan="7"></td></tr><tr><td colspan="10"></td></tr></table>
//             <br>Cantidad de Compras: '.$cant.'
//             <br>Compras Anuladas: '.$nula;
//             $cant = 0;
//             $subts = 0;
//             $nula = 0;
//     }

//   }
  
// }

// $html .= '</div>
// <script src="../assets/js/jquery.js"></script>
// <script src="../assets/js/bootstrap.min.js"></script>
// </body>';
// print_r($html);

 ?>