<?php 

    error_reporting(E_ALL);
    ini_set('display_errors', TRUE);
    ini_set('display_startup_errors', TRUE);
    set_time_limit(0);

    if (PHP_SAPI == 'cli')
      die('This example should only be run from a Web Browser');

    require_once '../assets/libs/phpexcel/Classes/PHPExcel.php';
    $objPHPExcel = new PHPExcel();
    $objPHPExcel->getProperties()->setCreator("Andres Miranda")
               ->setLastModifiedBy("Andres Miranda")
               ->setTitle($arch)
               ->setSubject($arch)
               ->setDescription("")
               ->setKeywords("office 2007 openxml php")
               ->setCategory("");

        // HEADER
        $styleArray = array(
          'font'  => array(
            'bold'  => true,
            'color' => array('rgb' => '000000'),
            'size'  => 48,
            'name'  => 'Verdana'
          ),
          'alignment' => array(
              'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
          )
        );
        $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue('A1', $tit)
                ->mergeCells('A1:J5')
                ->getStyle('A1')->applyFromArray($styleArray);

        $styleArray = array(
          'font'  => array(
            'bold'  => true
          ),
          'alignment' => array(
              'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
          )
        );

        // $styleTotal = array(
        //   'font'  => array(
        //     'bold'  => true
        //   ),
        //   'alignment' => array(
        //       'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
        //   )
        // );

        $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue('A6', $miscelaneos[2] ? $miscelaneos[2] : $miscelaneos[0])
                ->mergeCells('A6:J6')
                 ->getStyle('A6')->applyFromArray($styleArray);
        $objPHPExcel->setActiveSheetIndex(0)
                 ->setCellValue('A7', $miscelaneos[1])
                ->mergeCells('A7:J7')
                 ->getStyle('A7')->applyFromArray($styleArray);
        $objPHPExcel->setActiveSheetIndex(0)
                 ->setCellValue('A8', $miscelaneos[5])
                ->mergeCells('A8:J8')
                 ->getStyle('A8')->applyFromArray($styleArray);

        if($tit2){
          $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue('A10', $tit2)
                ->mergeCells('A10:J10')
                ->getStyle('A10')->applyFromArray($styleArray);
          $row = 13;
          $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells('A9:J9')
                ->mergeCells('A11:J11');
        }
        else{
          $row = 11;
          $objPHPExcel->setActiveSheetIndex(0)
                ->mergeCells('A9:J9');
        }

        $tsuma = [];
        $column = 'A';
        $varray = explode(',', $vista);

        foreach($varray as $index => $obj) {
          $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue($column.($row-1), strtoupper($transaccion[1][$obj]->name))
               ->getStyle($column.($row-1))->applyFromArray($styleArray);

          if(is_numeric(strpos($suma, ",".$obj.","))){
            $tsuma[$index]['valor'] = 0;
            $tsuma[$index]['nombre'] = $transaccion[1][$obj]->name;
            $tsuma[$index]['columna'] = $column;
          }

          $column++;
        }
        
        $lastcolumn = sizeof($varray)-1;
        $lastrow = sizeof($transaccion[0])-1;

        foreach ($transaccion[0] as $indexk => $obj) {
          $column = 'A';
          foreach ($varray as $indexj => $data) {
            $rvalor = $transaccion[0][$indexk][$data];

            if(is_numeric(strpos($suma, ",".$data.","))){
              $tsuma[$indexj]['valor'] += $rvalor;
            }
            
            $rvalor = is_numeric($rvalor) ? number_format($rvalor,2,'.','') : $rvalor;
            $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue($column.$row, strtoupper($rvalor));

            if ($indexk == $lastrow) {

              if (sizeof($tsuma) && $indexj == $lastcolumn){
                $ftotal = $row+2;
                $objPHPExcel->setActiveSheetIndex(0)
                       ->setCellValue('A'.$ftotal,'TOTAL(CRC)')
                       ->getStyle('A'.$ftotal)->applyFromArray($styleArray);

                foreach ($tsuma as $aindex => $areglo) {
                    if($areglo['valor'] == 0){
                      $objPHPExcel->removeColumn($areglo['columna']);
                    }else{
                      $objPHPExcel->setActiveSheetIndex(0)  
                          ->setCellValue($areglo['columna'].$ftotal, strtoupper(number_format($areglo['valor'],2,".","")));
                    }
                }
              }
                
                $objPHPExcel->getActiveSheet()->getColumnDimension($column)
                        ->setAutoSize(true);
            }
            $column++;
            
          }
          $row++;
        }

        $objPHPExcel->setActiveSheetIndex(0);

    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="'.$arch.'.xlsx"');
    header('Cache-Control: max-age=0');

    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
    if ($save)
      $objWriter->save("../assets/excel/".$arch.".xlsx");
    else
      $objWriter->save("php://output");

    exit;

    //<img src="'.$miscelaneos[3].'" style="width:200px !important;height:152px !important;"/>

    /*if ($conteo) {
      $archivo .= '<table><tr><td colspan="2"></td></tr><tr><td><b>Cantidad:</b></td><td>'.sizeof($transaccion[1]).'</td></tr></table>';
    } */
 ?>
