<!DOCTYPE html>
<html>
<head>
    <title>IRobot</title>
</head>
<body>

<?php 
    require_once '_config/mysqlDB.php';

    $hostname='{imap.gmail.com:993/debug/imap/ssl/novalidate-cert}INBOX';
    $username = 'fe.recepcionelectronica@gmail.com';
    $password = 'Login2Help';

    $inbox = imap_open($hostname,$username,$password) or die('Cannot connect to Tiriyo: ' . imap_last_error());
    
    $emails = imap_search($inbox,'UNSEEN'); //UNSEEN

    if($emails) {
        rsort($emails);
        foreach($emails as $email_number) {
    
        $overview = imap_fetch_overview($inbox,$email_number,0);
        $message = imap_fetchbody($inbox,$email_number, 1);
        $structure = imap_fetchstructure($inbox,$email_number);

        $attachments = array();

        /* if any attachments found... */
        if(isset($structure->parts) && count($structure->parts)) 
        {
            for($i = 0; $i < count($structure->parts); $i++) 
            {
                $attachments[$i] = array(
                    'is_attachment' => false,
                    'filename' => '',
                    'name' => '',
                    'attachment' => ''
                );

                if($structure->parts[$i]->ifdparameters) 
                {
                    foreach($structure->parts[$i]->dparameters as $object) 
                    {
                        if(strtolower($object->attribute) == 'filename') 
                        {   
                            $attachments[$i]['is_attachment'] = true;
                            $attachments[$i]['filename'] = $object->value;
                        }
                    }
                }

                if($structure->parts[$i]->ifparameters) 
                {
                    foreach($structure->parts[$i]->parameters as $object) 
                    {
                        if(strtolower($object->attribute) == 'name') 
                        {
                            $attachments[$i]['is_attachment'] = true;
                            $attachments[$i]['name'] = $object->value;
                        }
                    }
                }

                if($attachments[$i]['is_attachment']) 
                {
                    $attachments[$i]['attachment'] = imap_fetchbody($inbox, $email_number, $i+1);

                    /* 3 = BASE64 encoding */
                    if($structure->parts[$i]->encoding == 3) 
                    { 
                        $attachments[$i]['attachment'] = base64_decode($attachments[$i]['attachment']);
                    }
                    /* 4 = QUOTED-PRINTABLE encoding */
                    elseif($structure->parts[$i]->encoding == 4) 
                    { 
                        $attachments[$i]['attachment'] = quoted_printable_decode($attachments[$i]['attachment']);
                    }
                }
            }
        }

        foreach($attachments as $attachment)
        {
            if($attachment['is_attachment'] == 1)
            {
                if (strpos($attachment['name'], '.xml')) {
                    $salida = [];
                    loadXML_FILE($attachment['attachment'],$salida);
                    print_r($salida);
                }
            }
        }
         
        $email_number;
        $overview[0]->subject;
        $from = $overview[0]->from;
        $date = $overview[0]->date;
  }
 }
 imap_close($inbox);

 function loadXML_FILE($_xml,&$salida)
    {       
        $db = new DBClass();
        $inv_xml = simplexml_load_string($_xml);
        if (!isset($inv_xml->Clave)) {
            $salida = ['succed' => 0,'ERROR' => 'XML no Válido'];
            return false;
        }
        
        $ispruebas = 0;
        if(strpos($_xml, 'SANDBOX') > -1)
            $ispruebas = 1;

        if (!isset($inv_xml->Emisor->Identificacion->Numero)) {
            $inv_xml = (Array) $inv_xml;
            
            if ($inv_xml['Mensaje'] == 3) {
                $salida = ['succed' => 0,'ERROR' => 'El Comprobante Electrónico no fue Aceptado'];
                return false;
            }

            if (substr($inv_xml['Clave'], 30,1) >= 5) {
                $salida = ['succed' => 0,'ERROR' => 'Comprobante no Válido'];
                return false;
            }

            if (strlen($inv_xml['Clave']) != 50){
                $salida = ['succed' => 0,'ERROR' => 'Clave no Válida'];
                return false;
            }

            if (!isset($inv_xml['NombreEmisor'])) {
                $salida = ['succed' => 0,'ERROR' => 'Comprobante no Válido'];
                return false;
            }

            $salida['clave'] = $inv_xml['Clave'];
            $f1 = strpos($_xml, '<xades:SigningTime>');
            $f2 = strpos($_xml, '</xades:SigningTime>');
            $f2 = $f2 - $f1-19;
            $fecha = str_replace("Z","",str_replace('T', " ", substr($_xml, $f1+19,$f2)));

            $sub = $inv_xml['TotalFactura']-$inv_xml['MontoTotalImpuesto'];

            $idprov = $db->ejecutar('call sp_rmantclientes("'.$inv_xml['NombreEmisor'].'","'.$inv_xml['NumeroCedulaEmisor'].'","","",'.$inv_xml['TipoIdentificacionEmisor'].',0,0,0,0,0)');
            if(isset($idprov->num_rows)) 
                $idprov = $idprov->fetch_all()[0][0];
            else{
                 $salida = ['succed' => 0,'ERROR' => $idprov,'mod'=>'PROVEEDOR R'];
                return false;
            }

            $idfact = $db->ejecutar('call sp_rmantfacturas(1,null,2,1,1,'.$idprov.',1,0,'.$inv_xml['MontoTotalImpuesto'].','.$sub.',0,0,0,0,0,"","'.$inv_xml['Clave'].'",1,1,0,"",0,"","","'.$fecha.'",1,"",'.$inv_xml['Mensaje'].',"'.$inv_xml['NumeroCedulaReceptor'].'",'.$ispruebas.')');
            if(isset($idfact->num_rows)){
                $idfact = $idfact->fetch_all()[0][0];
                $salida['ifactura'] = $idfact;
            }
            else{
                $db->ejecutar('insert into registroSQL values(null,now(),\''.'call sp_rmantfacturas(1,null,2,1,1,'.$idprov.',1,0,'.$inv_xml['MontoTotalImpuesto'].','.$sub.',0,0,0,0,0,"","'.$inv_xml['Clave'].'",1,1,0,"",0,"","","'.$fecha.'",1,"",'.$inv_xml['Mensaje'].',"'.$inv_xml['NumeroCedulaReceptor'].'",'.$ispruebas.')'.'\',\''.$idfact.'\')');
                $salida = ['succed' => 0,'ERROR' => $idfact,'mod'=>'Factura R'];
                return false;
            }
            if ($idfact) {

                $iddet = $db->ejecutar('call sp_rmantdetallefacturas(1,0,'.$idfact.',"Mensaje de Hacienda","",1,'.$sub.',0,'.$inv_xml['MontoTotalImpuesto'].',1)');

                if (!isset($iddet->num_rows)) {
                    $db->ejecutar('insert into registroSQL values(null,now(),\''.'call sp_rmantdetallefacturas(1,0,'.$idfact.',"Mensaje de Hacienda","",1,'.$sub.',0,'.$inv_xml['MontoTotalImpuesto'].',1)'.'\',\''.$iddet.'\')');
                    $salida = ['succed' => 0,'ERROR' => $iddet,'mod'=>'Detalle Factura R'];
                    //$db->ejecutar('call sp_rrollback('.$idfact.')');1
                    return false;
                }
            }
            return false;
        }
        $salida['clave'] = $inv_xml->Clave[0];
        
        if (strlen($salida['clave']) != 50){
            $salida = ['succed' => 0,'ERROR' => 'Clave no Válida'];
            return false;
        }

        $prov = [];
        $prov['cedula'] = (array) $inv_xml->Emisor->Identificacion->Numero;
        $prov['cedula'] = $prov['cedula'][0];
        if (trim($prov['cedula']) != trim(substr($salida['clave'], 9,12))) {
            $salida = ['succed' => 0,'ERROR' => 'Cédula no Válida'];
            return false;
        }

        $prov['nombre'] = (array) $inv_xml->Emisor->Nombre;
        $prov['nombre'] = $prov['nombre'][0];
        
        $prov['tipo']       = (array) $inv_xml->Emisor->Identificacion->Tipo;
        $prov['tipo']       = $prov['tipo'][0];

        $prov['barrio']     = isset($inv_xml->Emisor->Ubicacion->Barrio) ? (array) $inv_xml->Emisor->Ubicacion->Barrio : 0;
        $prov['barrio'] = $prov['barrio'] == 0 ? $prov['barrio'] : $prov['barrio'][0];

        $prov['distrito']   = isset($inv_xml->Emisor->Ubicacion->Distrito) ? (array) $inv_xml->Emisor->Ubicacion->Distrito : 0;
        $prov['distrito'] = $prov['distrito'] == 0 ? $prov['distrito'] : $prov['distrito'][0];

        $prov['canton']     = isset($inv_xml->Emisor->Ubicacion->Canton) ? (array) $inv_xml->Emisor->Ubicacion->Canton : 0;
        $prov['canton']  = $prov['canton']  == 0 ? $prov['canton']  : $prov['canton'] [0];

        $prov['provincia']  = isset($inv_xml->Emisor->Ubicacion->Provincia) ? (array) $inv_xml->Emisor->Ubicacion->Provincia : 0;
        $prov['provincia'] = $prov['provincia'] == 0 ? $prov['provincia'] : $prov['provincia'][0];

        $prov['otrassenas'] = isset($inv_xml->Emisor->Ubicacion->OtrasSenas) ? (array) $inv_xml->Emisor->Ubicacion->OtrasSenas : 0;
        $prov['otrassenas'] = $prov['otrassenas'] == 0 ? $prov['otrassenas'] : $prov['otrassenas'][0];

        $prov['correo']     = isset($inv_xml->Emisor->CorreoElectronico) ? (array) $inv_xml->Emisor->CorreoElectronico : 0;
        $prov['correo'] = $prov['correo'] == 0 ? $prov['correo'] : $prov['correo'][0];

        $prov['telefono']   = isset($inv_xml->Emisor->Telefono->NumTelefono) ? (array) $inv_xml->Emisor->Telefono->NumTelefono : 0;
        $prov['telefono'] = $prov['telefono'] == 0 ? $prov['telefono'] : $prov['telefono'][0];

        $prov['pais']       = isset($inv_xml->Emisor->Telefono->CodigoPais) ? (array) $inv_xml->Emisor->Telefono->CodigoPais : 0;
        $prov['pais'] = $prov['pais'] == 0 ? $prov['pais'] : $prov['pais'][0];

        $prov['id']         = $db->ejecutar('call sp_rmantclientes("'.$prov['nombre'].'","'.$prov['cedula'].'","'.$prov['correo'].'","'.$prov['telefono'].'",'.$prov['tipo'].','.$prov['barrio'].','.$prov['distrito'].','.$prov['canton'].','.$prov['provincia'].','.$prov['pais'].')');
        if(isset($prov['id']->num_rows)) 
            $prov['id'] = $prov['id']->fetch_all()[0][0];
        else{
             $salida = ['succed' => 0,'ERROR' => $prov['id'],'mod'=>'PROVEEDOR'];
            return false;
        }


        $fecha = (array) $inv_xml->FechaEmision;
        $fecha = $fecha[0];
        if (strpos($fecha, '.')) {
            $fecha = substr($fecha, 0,strpos($fecha, '.'));
        }
        $fecha = strlen($fecha) > 19 ? strtotime(substr(str_replace('T', ' ', $fecha),0,-6)) : strtotime(str_replace('T', ' ', $fecha));
        $fechasistema =  date('Y/m/d H:i:s',$fecha);

        $fact['tipoventa'] = (array) $inv_xml->CondicionVenta;
        $fact['tipoventa'] = $fact['tipoventa'][0];
        $fact['plazo']     = isset($inv_xml->PlazoCredito) ? (array) $inv_xml->PlazoCredito : 0;
        $fact['plazo']     = $fact['plazo'] == 0 ? $fact['plazo'] : isset($fact['plazo'][0]) ? $fact['plazo'][0] : 0;
        preg_match_all('!\d+!', $fact['plazo'], $matches);
        $fact['plazo']     = $matches[0][0];
        $fact['tipopago']  = (array) $inv_xml->MedioPago;
        $fact['tipopago']  = $fact['tipopago'][0];

        $fact['moneda']    = (array) $inv_xml->ResumenFactura->CodigoMoneda;
        $fact['moneda']    = $fact['moneda'][0];
        $fact['divisa']    = (array) $inv_xml->ResumenFactura->TipoCambio;
        $fact['divisa']    = isset($fact['divisa'][0]) ? $fact['divisa'][0] : 0;
        $fact['divisa']    = $fact['divisa'] == 0 ? 1 : $fact['divisa'];

        $fact['subtotal']  = (array) $inv_xml->ResumenFactura->TotalGravado;
        $fact['subtotal']  = $fact['subtotal'][0];
        $fact['exento']    = (array) $inv_xml->ResumenFactura->TotalExento;
        $fact['exento']    = isset($fact['exento'][0]) ? $fact['exento'][0] : 0;
        $fact['descuento'] = (array) $inv_xml->ResumenFactura->TotalDescuentos;
        $fact['descuento'] = isset($fact['descuento'][0]) ? $fact['descuento'][0]: 0;
        $fact['impuesto']  = (array) $inv_xml->ResumenFactura->TotalImpuesto;
        $fact['impuesto']  = $fact['impuesto'][0];
        $fact['cedula'] = (array) $inv_xml->Receptor->Identificacion->Numero;
        $fact['cedula'] = $fact['cedula'][0];

        $idfact = $db->ejecutar('call sp_rmantfacturas(1,null,2,'.$fact['tipoventa'].','.$fact['tipopago'].','.$prov['id'].',1,0,'.$fact['impuesto'].','.$fact['subtotal'].','.$fact['exento'].','.$fact['descuento'].',0,0,'.$fact['plazo'].',"","'.$inv_xml->Clave.'","'.$fact['moneda'].'",1,0,"",0,"","","'.$fechasistema.'",'.$fact['divisa'].',"",9,"'.$fact['cedula'].'",'.$ispruebas.')');

        if(isset($idfact->num_rows)){
            $idfact = $idfact->fetch_all()[0][0];
            $salida['ifactura'] = $idfact;
        }
        else{
            $db->ejecutar('insert into registroSQL values(null,now(),\''.'call sp_rmantfacturas(1,null,2,'.$fact['tipoventa'].','.$fact['tipopago'].','.$prov['id'].',1,0,'.$fact['impuesto'].','.$fact['subtotal'].','.$fact['exento'].','.$fact['descuento'].',0,0,'.$fact['plazo'].',"","'.$inv_xml->Clave.'","'.$fact['moneda'].'",1,0,"",0,"","","'.$fechasistema.'",'.$fact['divisa'].',"",9,"'.$fact['cedula'].'",'.$ispruebas.')'.'\',\''.$idfact.'\')');
            $salida = ['succed' => 0,'ERROR' => $idfact,'mod'=>'Factura'];
            return false;
        }

        if ($idfact) {

            $ciclo = (array) $inv_xml->DetalleServicio;
            
            if (!isset($ciclo['LineaDetalle']->NumeroLinea)) {
                $ciclo = $ciclo['LineaDetalle'];
            }

            foreach ($ciclo as $key) {
                $vunidad = (array)$key->UnidadMedida;
                $vunidad = $vunidad[0] == 'Otros' ? (array)$key->UnidadMedidaComercial : (array)$key->UnidadMedida;
                $vunidad = isset($vunidad[0]) ? $vunidad[0] : 1 ;
                $vunidad = $vunidad == 0 ? 1 : $vunidad[0] ;

                $num = (array)$key->NumeroLinea;
                $dcodigo = (array)$key->Codigo->Codigo;
                $dcodigo = isset($dcodigo[0]) ? $dcodigo[0] : '';
                
                $dcantidad = (array)$key->Cantidad;
                $ddetalle = (array)$key->Detalle;
                $dunitario = (array)$key->PrecioUnitario;
                $dsubtotal = (array)$key->SubTotal;
                $ddescuento = isset($key->MontoDescuento) ? (array)$key->MontoDescuento : 0;
                $ddescuento = $ddescuento == 0 ? $ddescuento : $ddescuento[0];
                $dimpuesto = isset($key->Impuesto->Monto) ? (array)$key->Impuesto->Monto : 0;
                $dimpuesto = $dimpuesto == 0 ? $dimpuesto : $dimpuesto[0];

                $iddet = $db->ejecutar('call sp_rmantdetallefacturas(1,0,'.$idfact.',"'.$ddetalle[0].'","'.$dcodigo.'",'.$dcantidad[0].','.$dunitario[0].','.$ddescuento.','.$dimpuesto.',"'.$vunidad.'")');
                
                if (!isset($iddet->num_rows)) {
                    $db->ejecutar('insert into registroSQL values(null,now(),\''.'call sp_rmantdetallefacturas(1,0,'.$idfact.',"'.$ddetalle[0].'","'.$dcodigo.'",'.$dcantidad[0].','.$dunitario[0].','.$ddescuento.','.$dimpuesto.',"'.$vunidad.'")'.'\',\''.$iddet.'\')');
                    $salida = ['succed' => 0,'ERROR' => $iddet,'mod'=>'Detalle Factura'];
                    //$db->ejecutar('call sp_rrollback('.$idfact.')');
                    return false;
                }

            }
        }
    }
  
?>

</body>
</html>