-- MySQL dump 10.16  Distrib 10.1.10-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: idemo2
-- ------------------------------------------------------
-- Server version	10.1.10-MariaDB-1~trusty-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ajustes`
--

DROP TABLE IF EXISTS `ajustes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ajustes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descr` varchar(20) DEFAULT NULL,
  `valor` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ajustes`
--

LOCK TABLES `ajustes` WRITE;
/*!40000 ALTER TABLE `ajustes` DISABLE KEYS */;
INSERT INTO `ajustes` VALUES (1,'empresa','Cajetas Chavela'),(2,'CJuridica','3101234756'),(3,'telefonos','24448000'),(4,'correo','cajetas@gmail.com'),(5,'direccion','San Isidro, Grecia, Alajuela'),(6,'logo','../assets/img/logo.png'),(7,'Cambio de Dia','0'),(8,'fecha_inicio_fiscal','2016-10-01'),(9,'fecha_final_fiscal','2017-09-30');
/*!40000 ALTER TABLE `ajustes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cantones`
--

DROP TABLE IF EXISTS `cantones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cantones` (
  `id` int(5) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `idprovincia` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cantones`
--

LOCK TABLES `cantones` WRITE;
/*!40000 ALTER TABLE `cantones` DISABLE KEYS */;
INSERT INTO `cantones` VALUES (1,'grecia',2);
/*!40000 ALTER TABLE `cantones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apellido1` varchar(64) DEFAULT NULL,
  `apellido2` varchar(64) DEFAULT NULL,
  `nombre` varchar(80) DEFAULT NULL,
  `cedula` varchar(45) DEFAULT NULL,
  `idtipocliente` int(3) unsigned DEFAULT NULL,
  `idestado` int(5) unsigned DEFAULT NULL,
  `bisproveedor` tinyint(2) unsigned DEFAULT '0',
  `idnivel` int(11) NOT NULL,
  `credito` int(9) DEFAULT '0',
  `plazo` int(9) DEFAULT '0',
  `idestadocontable` tinyint(2) unsigned DEFAULT NULL,
  `bisnacional` tinyint(2) DEFAULT NULL,
  `web` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `idusuario` int(11) NOT NULL,
  `descuentop` int(11) DEFAULT NULL,
  `descuentom` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Miranda','Castro','Juan Diego','2-2222-2222',1,1,1,0,100000,30,1,1,'www.logintechcr.com','2016-05-18 00:00:00',0,NULL,NULL),(2,'Alfaro','Loria','Rolando','2-0654-0321',1,1,0,1,10210,23,1,1,'','2016-06-07 00:00:00',0,5,0.00),(3,'Cespedes','Rojas','Andres','2-0459-0658',1,1,0,2,100000,30,1,1,'','2016-08-24 00:00:00',0,7,0.00),(4,'','','Prueba 1','2-0578-0321',2,1,0,3,55000,30,1,1,'','2016-11-03 08:58:16',2,30,500000.00),(5,'','','Prueba Conta','2-0555-6777',1,1,0,0,0,0,1,1,'','2016-10-28 18:29:20',2,0,0.00),(6,'Conta','Cta','Prueba','1-9536-9877',1,1,0,0,0,0,1,1,'','2016-10-29 12:17:30',2,0,0.00),(7,'','','Supermercado Gigante S.A.','3-1019-8765',2,1,0,0,0,0,1,1,'','2016-10-30 12:11:18',6,0,0.00),(8,'','','SUPER MERCADO GIGANTE S.A.','3-1010-9836',2,1,0,0,0,0,1,1,'','2016-10-30 12:13:50',6,0,0.00),(9,'','','SUPER MERCADO GIGANTE S.A.','3-1013-9457',2,1,0,0,0,0,1,1,'','2016-10-30 12:18:36',6,0,0.00),(10,'','','Prueba Correos','8-9647-778',1,1,0,0,0,0,1,1,'','2016-10-30 12:44:09',1,0,0.00),(11,'','','Correos1 ','2-3',1,1,0,0,0,0,1,1,'','2016-10-30 12:55:41',1,0,0.00),(12,'','','Correo2','2-35',1,1,0,0,0,0,1,1,'','2016-10-30 12:57:46',1,0,0.00);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `correos`
--

DROP TABLE IF EXISTS `correos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `correos` (
  `idfila` int(11) NOT NULL,
  `idtabla` int(11) NOT NULL,
  `correo1` varchar(45) DEFAULT NULL,
  `correo2` varchar(45) DEFAULT NULL,
  `correo3` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `correos`
--

LOCK TABLES `correos` WRITE;
/*!40000 ALTER TABLE `correos` DISABLE KEYS */;
INSERT INTO `correos` VALUES (1,29,'info@correo.com','jperez@correo.com',NULL),(2,29,'info@empresa.com','pepegrillo@empresa.com',NULL),(3,29,'ances@gmail.com','a.cespedes@empresa.com',NULL),(12,2,'o@a.com',NULL,NULL),(1,2,'','',''),(2,2,'','',''),(3,2,'','',''),(4,2,'','',''),(5,2,'','',''),(6,2,'','',''),(7,2,'','',''),(8,2,'','',''),(9,2,'','',''),(10,2,'','',''),(11,2,'','','');
/*!40000 ALTER TABLE `correos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuentas`
--

DROP TABLE IF EXISTS `cuentas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuentas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idsubcuenta` int(10) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `deep` tinyint(3) DEFAULT NULL,
  `valor` decimal(11,2) DEFAULT '0.00',
  `ispadre` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentas`
--

LOCK TABLES `cuentas` WRITE;
/*!40000 ALTER TABLE `cuentas` DISABLE KEYS */;
INSERT INTO `cuentas` VALUES (1,0,'Activos','1',1,40216.50,1),(2,0,'Costos','5',1,0.00,1),(3,0,'Gastos','4',1,0.00,1),(4,0,'Ingresos','3',1,0.00,1),(5,0,'Pasivos','2',1,1300.00,1),(6,0,'Patrimonio','6',1,0.00,1),(7,1,'Circulante','11',2,4237.50,1),(8,7,'Efectivo','1101',3,2825.00,1),(9,8,'Cajas','110101',4,2825.00,1),(10,9,'Caja Chica','11010101',5,2825.00,0),(11,7,'Cuentas','1108',2,0.00,1),(12,11,'Cuentas por Cobrar','110801',3,0.00,0),(13,1,'Inventarios','12',2,30329.00,1),(14,13,'Producto a la Venta','1201',3,30329.00,0),(15,4,'Ventas','31',2,0.00,0),(16,6,'Sociedad','61',2,0.00,1),(17,16,'LoginTech','6101',3,0.00,0),(18,4,'Servicios','32',2,0.00,1),(19,18,'Venta de Servicios','3201',3,0.00,0),(20,5,'Impuestos','21',2,1300.00,1),(21,7,'Bancos','1103',3,0.00,1),(22,7,'Depreciación Acumulada','1104',3,1412.50,0),(23,7,'Decuentos','1105',3,0.00,0),(24,20,'IMV','2101',3,1300.00,0),(25,7,'Fletes','1106',3,0.00,0),(26,7,'Ajustes','1107',3,0.00,0),(27,5,'Cuentas','22',2,0.00,1),(28,27,'Cuentas por Pagar','2201',3,0.00,0),(29,2,'Ventas','51',2,0.00,1),(30,29,'Costo de Venta','5101',3,0.00,0);
/*!40000 ALTER TABLE `cuentas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `idemo2`.`cuentas_BEFORE_DELETE` BEFORE DELETE ON `cuentas` FOR EACH ROW
BEGIN
	if old.id in(1,2,3,4,5,6) then
	 SET @msj = concat('Nombre Cuenta \'',old.nombre,'\' No se Puede Eliminar');
		SIGNAL SQLSTATE '47000'
	 SET MESSAGE_TEXT = @msj;
    end if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `defectocuentas`
--

DROP TABLE IF EXISTS `defectocuentas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `defectocuentas` (
  `idcuenta` int(11) NOT NULL,
  `idtabla` int(11) DEFAULT NULL,
  `idfila` int(11) DEFAULT NULL,
  `bisdefecto` tinyint(2) DEFAULT NULL,
  `vidtipocuenta` int(5) unsigned NOT NULL,
  `porcentaje` int(5) NOT NULL,
  `vidtipo` tinyint(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defectocuentas`
--

LOCK TABLES `defectocuentas` WRITE;
/*!40000 ALTER TABLE `defectocuentas` DISABLE KEYS */;
INSERT INTO `defectocuentas` VALUES (1,2,4,0,1,100,1),(10,0,0,1,1,100,1),(12,0,0,1,3,100,1),(10,0,0,1,1,100,2),(28,0,0,1,3,100,2),(23,0,0,1,7,100,0),(24,0,0,1,6,100,0),(10,2,6,0,1,50,1),(22,2,6,0,1,50,1),(12,2,6,0,3,100,1);
/*!40000 ALTER TABLE `defectocuentas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defectoimpuestos`
--

DROP TABLE IF EXISTS `defectoimpuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `defectoimpuestos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idfila` int(11) NOT NULL,
  `idtabla` int(11) NOT NULL,
  `idimpuesto` tinyint(2) NOT NULL,
  `exoneracion` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defectoimpuestos`
--

LOCK TABLES `defectoimpuestos` WRITE;
/*!40000 ALTER TABLE `defectoimpuestos` DISABLE KEYS */;
/*!40000 ALTER TABLE `defectoimpuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descuentos`
--

DROP TABLE IF EXISTS `descuentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `descuentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idciclo` int(11) DEFAULT NULL,
  `descuento` decimal(6,2) unsigned NOT NULL,
  `f1` date DEFAULT NULL,
  `f2` date DEFAULT NULL,
  `idfila` int(11) DEFAULT NULL,
  `idtabla` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descuentos`
--

LOCK TABLES `descuentos` WRITE;
/*!40000 ALTER TABLE `descuentos` DISABLE KEYS */;
INSERT INTO `descuentos` VALUES (1,NULL,2.00,NULL,NULL,NULL,NULL),(2,NULL,3.00,NULL,NULL,NULL,NULL),(3,NULL,6.00,NULL,NULL,NULL,NULL),(4,NULL,10.00,NULL,NULL,NULL,NULL),(5,0,2.00,NULL,NULL,3,11),(6,0,3.00,NULL,NULL,3,11),(7,0,4.00,NULL,NULL,3,11),(8,0,5.00,NULL,NULL,3,11);
/*!40000 ALTER TABLE `descuentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallefacturaimpuestos`
--

DROP TABLE IF EXISTS `detallefacturaimpuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detallefacturaimpuestos` (
  `idimpuesto` int(11) DEFAULT NULL,
  `idfactura` int(11) DEFAULT NULL,
  `valor` decimal(8,2) NOT NULL,
  `exoneracion` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallefacturaimpuestos`
--

LOCK TABLES `detallefacturaimpuestos` WRITE;
/*!40000 ALTER TABLE `detallefacturaimpuestos` DISABLE KEYS */;
INSERT INTO `detallefacturaimpuestos` VALUES (1,1,0.00,0.00),(2,1,0.00,0.00),(3,1,0.00,0.00),(1,1,13.00,0.00),(2,1,12.00,0.00),(3,1,14.00,0.00);
/*!40000 ALTER TABLE `detallefacturaimpuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallefacturas`
--

DROP TABLE IF EXISTS `detallefacturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detallefacturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idfactura` int(11) NOT NULL,
  `idproducto` int(11) DEFAULT NULL,
  `idservicio` int(11) DEFAULT NULL,
  `idpaquete` int(11) DEFAULT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `descuento` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_detallefacturas_1_idx` (`idpaquete`),
  KEY `fk_detallefacturas_2_idx` (`idservicio`),
  CONSTRAINT `fk_detallefacturas_1` FOREIGN KEY (`idpaquete`) REFERENCES `paquetes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_detallefacturas_2` FOREIGN KEY (`idservicio`) REFERENCES `servicios` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallefacturas`
--

LOCK TABLES `detallefacturas` WRITE;
/*!40000 ALTER TABLE `detallefacturas` DISABLE KEYS */;
INSERT INTO `detallefacturas` VALUES (1,1,5,NULL,NULL,1.00,293.80,0.00),(2,1,6,NULL,NULL,1.00,19097.00,0.00),(3,2,5,NULL,NULL,1.00,293.80,0.00),(4,2,6,NULL,NULL,1.00,19097.00,0.00),(5,3,7,NULL,NULL,1.00,2260.00,0.00),(6,3,8,NULL,NULL,1.00,2486.00,0.00),(7,4,5,NULL,NULL,1.00,293.80,0.00),(8,4,6,NULL,NULL,1.00,19097.00,0.00),(9,5,5,NULL,NULL,1.00,293.80,0.00),(10,5,6,NULL,NULL,1.00,19097.00,0.00),(11,6,5,NULL,NULL,1.00,293.80,0.00),(12,9,1,NULL,NULL,1.00,293.80,0.00),(13,10,1,NULL,NULL,1.00,2500.00,0.00),(14,11,1,NULL,NULL,1.00,2500.00,0.00),(15,12,1,NULL,NULL,1.00,2500.00,0.00),(16,13,1,NULL,NULL,1.00,2500.00,0.00);
/*!40000 ALTER TABLE `detallefacturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallepaquetes`
--

DROP TABLE IF EXISTS `detallepaquetes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detallepaquetes` (
  `idpaquete` int(11) NOT NULL,
  `idproducto` int(11) DEFAULT NULL,
  `idservicio` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallepaquetes`
--

LOCK TABLES `detallepaquetes` WRITE;
/*!40000 ALTER TABLE `detallepaquetes` DISABLE KEYS */;
/*!40000 ALTER TABLE `detallepaquetes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleruta`
--

DROP TABLE IF EXISTS `detalleruta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalleruta` (
  `idruta` tinyint(3) DEFAULT NULL,
  `latitud` decimal(10,0) DEFAULT NULL,
  `longitud` decimal(10,0) DEFAULT NULL,
  `idubicacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleruta`
--

LOCK TABLES `detalleruta` WRITE;
/*!40000 ALTER TABLE `detalleruta` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalleruta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalletelefonos`
--

DROP TABLE IF EXISTS `detalletelefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalletelefonos` (
  `numero` int(12) NOT NULL,
  `idtipotelefonos` tinyint(3) NOT NULL,
  `idcliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalletelefonos`
--

LOCK TABLES `detalletelefonos` WRITE;
/*!40000 ALTER TABLE `detalletelefonos` DISABLE KEYS */;
INSERT INTO `detalletelefonos` VALUES (24444444,1,1);
/*!40000 ALTER TABLE `detalletelefonos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalletransacciones`
--

DROP TABLE IF EXISTS `detalletransacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalletransacciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcuenta` int(11) NOT NULL,
  `idtransaccion` int(11) NOT NULL,
  `debe` decimal(10,2) NOT NULL,
  `haber` decimal(10,2) NOT NULL,
  `vidodt` int(11) NOT NULL,
  `vcomentario` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalletransacciones`
--

LOCK TABLES `detalletransacciones` WRITE;
/*!40000 ALTER TABLE `detalletransacciones` DISABLE KEYS */;
INSERT INTO `detalletransacciones` VALUES (1,10,1,315.39,0.00,0,'Subtotal Realizado'),(2,23,1,16.60,0.00,0,'Descuento Realizado'),(3,24,1,0.00,38.19,0,'Impuesto de Venta Realizado'),(4,10,2,315.39,0.00,0,'Subtotal Realizado'),(5,23,2,16.60,0.00,0,'Descuento Realizado'),(6,24,2,0.00,38.19,0,'Impuesto de Venta Realizado'),(7,14,2,0.00,293.80,0,'Producto Procesado'),(9,10,3,1412.50,0.00,0,'Subtotal Realizado'),(10,22,3,1412.50,0.00,0,'Subtotal Realizado'),(17,24,3,0.00,325.00,0,'Impuesto de Venta Realizado'),(18,14,3,0.00,2500.00,0,'Producto Procesado'),(19,1,4,2825.00,0.00,0,'Subtotal Realizado'),(20,10,4,0.00,0.00,0,'Subtotal Realizado'),(21,22,4,0.00,0.00,0,'Subtotal Realizado'),(22,24,4,0.00,325.00,0,'Impuesto de Venta Realizado'),(23,14,4,0.00,2500.00,0,'Producto Procesado'),(24,10,5,1412.50,0.00,0,'Subtotal Realizado'),(25,22,5,0.00,0.00,0,'Subtotal Realizado'),(26,24,5,0.00,325.00,0,'Impuesto de Venta Realizado'),(27,14,5,0.00,2500.00,0,'Producto Procesado'),(28,10,6,1412.50,0.00,0,'Subtotal Realizado'),(29,22,6,1412.50,0.00,0,'Subtotal Realizado'),(30,24,6,0.00,325.00,0,'Impuesto de Venta Realizado'),(31,14,6,0.00,2500.00,0,'Producto Procesado');
/*!40000 ALTER TABLE `detalletransacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleubicaciones`
--

DROP TABLE IF EXISTS `detalleubicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalleubicaciones` (
  `iddistrito` int(3) NOT NULL,
  `idcliente` int(11) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleubicaciones`
--

LOCK TABLES `detalleubicaciones` WRITE;
/*!40000 ALTER TABLE `detalleubicaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalleubicaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devoluciones`
--

DROP TABLE IF EXISTS `devoluciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devoluciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idfactura` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `comentario` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devoluciones`
--

LOCK TABLES `devoluciones` WRITE;
/*!40000 ALTER TABLE `devoluciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `devoluciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distritos`
--

DROP TABLE IF EXISTS `distritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `distritos` (
  `id` int(5) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `idcanton` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distritos`
--

LOCK TABLES `distritos` WRITE;
/*!40000 ALTER TABLE `distritos` DISABLE KEYS */;
INSERT INTO `distritos` VALUES (1,'San Jose',1);
/*!40000 ALTER TABLE `distritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadoclientes`
--

DROP TABLE IF EXISTS `estadoclientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadoclientes` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadoclientes`
--

LOCK TABLES `estadoclientes` WRITE;
/*!40000 ALTER TABLE `estadoclientes` DISABLE KEYS */;
INSERT INTO `estadoclientes` VALUES (1,'activo'),(0,'inactivo');
/*!40000 ALTER TABLE `estadoclientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadofacturas`
--

DROP TABLE IF EXISTS `estadofacturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadofacturas` (
  `id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadofacturas`
--

LOCK TABLES `estadofacturas` WRITE;
/*!40000 ALTER TABLE `estadofacturas` DISABLE KEYS */;
INSERT INTO `estadofacturas` VALUES (2,'Anulada'),(1,'Editada');
/*!40000 ALTER TABLE `estadofacturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadoinv`
--

DROP TABLE IF EXISTS `estadoinv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadoinv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadoinv`
--

LOCK TABLES `estadoinv` WRITE;
/*!40000 ALTER TABLE `estadoinv` DISABLE KEYS */;
/*!40000 ALTER TABLE `estadoinv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idtipoventa` tinyint(3) NOT NULL,
  `idtipo` tinyint(3) NOT NULL,
  `idtipopago` tinyint(3) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `idcliente` int(11) NOT NULL,
  `idestado` tinyint(3) NOT NULL,
  `isregistrada` tinyint(3) NOT NULL,
  `imv` decimal(10,2) unsigned NOT NULL,
  `subtotal` decimal(10,2) unsigned NOT NULL,
  `descuento` decimal(10,2) DEFAULT NULL,
  `flete` decimal(10,2) DEFAULT NULL,
  `ajuste` decimal(10,2) DEFAULT NULL,
  `plazo` varchar(45) DEFAULT NULL,
  `comentario` varchar(45) DEFAULT NULL,
  `referencia` varchar(45) DEFAULT NULL,
  `idmoneda` tinyint(2) NOT NULL,
  `idusuario` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` VALUES (1,1,1,1,'2016-10-13 10:53:33',2,1,0,13.00,19390.80,5.00,0.00,0.00,'0','','0',1,2),(2,1,1,1,'2016-10-13 10:53:34',2,1,0,13.00,19390.80,5.00,0.00,0.00,'0','','0',1,2),(3,1,1,1,'2016-10-13 10:54:35',2,1,0,13.00,4746.00,5.00,0.00,0.00,'0','','0',1,2),(4,1,1,1,'2016-10-13 10:56:29',2,1,0,13.00,19390.80,5.00,0.00,0.00,'0','','0',1,2),(5,1,1,1,'2016-10-13 10:56:32',2,1,0,13.00,19390.80,5.00,0.00,0.00,'0','','0',1,2),(6,1,1,1,'2016-10-13 10:57:03',2,1,0,13.00,293.80,5.00,0.00,0.00,'0','','0',1,2),(7,1,2,1,'2016-10-13 11:32:31',1,1,0,13.00,1000.00,0.00,0.00,0.00,'0','','0',1,1),(8,1,1,1,'2016-11-02 10:34:43',2,1,0,13.00,293.80,5.00,0.00,0.00,'0','','0',1,2),(9,1,1,1,'2016-11-02 10:43:24',2,1,0,13.00,293.80,5.00,0.00,0.00,'0','','0',1,2),(10,1,1,1,'2016-10-29 17:02:22',6,1,0,13.00,2500.00,0.00,0.00,0.00,'0','Prueba 1','0',1,2),(11,1,1,1,'2016-10-29 17:14:29',6,1,0,13.00,2500.00,0.00,0.00,0.00,'0','Prueba 2','0',1,2),(12,1,1,1,'2016-10-29 17:16:42',6,1,0,13.00,2500.00,0.00,0.00,0.00,'0','Prueba 3','0',1,2),(13,1,1,1,'2016-10-29 17:20:41',6,1,0,13.00,2500.00,0.00,0.00,0.00,'0','Prueba 4','0',1,2);
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familias`
--

DROP TABLE IF EXISTS `familias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `familias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `idusuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familias`
--

LOCK TABLES `familias` WRITE;
/*!40000 ALTER TABLE `familias` DISABLE KEYS */;
INSERT INTO `familias` VALUES (1,'Fam1',2),(2,'Fam2',1);
/*!40000 ALTER TABLE `familias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financierovalores`
--

DROP TABLE IF EXISTS `financierovalores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `financierovalores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idnivel` int(11) DEFAULT NULL,
  `descripcion` varchar(64) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financierovalores`
--

LOCK TABLES `financierovalores` WRITE;
/*!40000 ALTER TABLE `financierovalores` DISABLE KEYS */;
/*!40000 ALTER TABLE `financierovalores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flotilla`
--

DROP TABLE IF EXISTS `flotilla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flotilla` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idvehiculo` int(11) DEFAULT NULL,
  `idtipo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flotilla`
--

LOCK TABLES `flotilla` WRITE;
/*!40000 ALTER TABLE `flotilla` DISABLE KEYS */;
/*!40000 ALTER TABLE `flotilla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impuestos`
--

DROP TABLE IF EXISTS `impuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `impuestos` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `valor` decimal(6,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impuestos`
--

LOCK TABLES `impuestos` WRITE;
/*!40000 ALTER TABLE `impuestos` DISABLE KEYS */;
INSERT INTO `impuestos` VALUES (1,'Venta',13.00),(2,'Servicio',12.00);
/*!40000 ALTER TABLE `impuestos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `idemo2`.`impuestos_BEFORE_UPDATE` BEFORE UPDATE ON `impuestos` FOR EACH ROW
BEGIN
	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `invcontable`
--

DROP TABLE IF EXISTS `invcontable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invcontable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idproducto` int(11) DEFAULT NULL,
  `idcontable` int(11) DEFAULT NULL,
  `depreciacion` decimal(10,0) DEFAULT NULL,
  `cantidad` decimal(10,0) DEFAULT NULL,
  `imv` decimal(10,0) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `detalle` varchar(150) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invcontable`
--

LOCK TABLES `invcontable` WRITE;
/*!40000 ALTER TABLE `invcontable` DISABLE KEYS */;
INSERT INTO `invcontable` VALUES (1,6,1,0,3,13,12000,NULL,'2016-08-19 00:00:00',1),(2,8,1,0,3,13,14000,NULL,'2016-08-19 00:00:00',1);
/*!40000 ALTER TABLE `invcontable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invdevoluciones`
--

DROP TABLE IF EXISTS `invdevoluciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invdevoluciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idproducto` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  `cantidad` decimal(10,0) DEFAULT NULL,
  `detalle` varchar(150) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `idestado` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invdevoluciones`
--

LOCK TABLES `invdevoluciones` WRITE;
/*!40000 ALTER TABLE `invdevoluciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `invdevoluciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invgastos`
--

DROP TABLE IF EXISTS `invgastos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invgastos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idproducto` int(11) DEFAULT NULL,
  `cantidad` decimal(10,0) DEFAULT NULL,
  `imv` decimal(10,0) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `detalle` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invgastos`
--

LOCK TABLES `invgastos` WRITE;
/*!40000 ALTER TABLE `invgastos` DISABLE KEYS */;
/*!40000 ALTER TABLE `invgastos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invinsumos`
--

DROP TABLE IF EXISTS `invinsumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invinsumos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idproducto` int(11) DEFAULT NULL,
  `idinventario` int(11) DEFAULT NULL,
  `idunidad` int(11) DEFAULT NULL,
  `cantidad` decimal(10,0) DEFAULT NULL,
  `ajuste` decimal(10,0) DEFAULT NULL,
  `detalle` varchar(150) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `idmoneda` int(11) DEFAULT NULL,
  `precio` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invinsumos`
--

LOCK TABLES `invinsumos` WRITE;
/*!40000 ALTER TABLE `invinsumos` DISABLE KEYS */;
INSERT INTO `invinsumos` VALUES (1,8,2,1,2,0,'Trabajo','2016-08-23 00:00:00',1,1,120000);
/*!40000 ALTER TABLE `invinsumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invproductos`
--

DROP TABLE IF EXISTS `invproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invproductos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idproducto` int(11) DEFAULT NULL,
  `idinventario` int(11) DEFAULT NULL,
  `idunidad` int(11) DEFAULT NULL,
  `imv` decimal(10,0) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `cantidad` decimal(10,0) DEFAULT NULL,
  `ajuste` decimal(10,0) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `idmoneda` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invproductos`
--

LOCK TABLES `invproductos` WRITE;
/*!40000 ALTER TABLE `invproductos` DISABLE KEYS */;
/*!40000 ALTER TABLE `invproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invruta`
--

DROP TABLE IF EXISTS `invruta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invruta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idproducto` int(11) DEFAULT NULL,
  `idinventario` int(11) DEFAULT NULL,
  `idunidad` int(11) DEFAULT NULL,
  `imv` decimal(10,0) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `usuarioasign` int(11) DEFAULT NULL,
  `idruta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invruta`
--

LOCK TABLES `invruta` WRITE;
/*!40000 ALTER TABLE `invruta` DISABLE KEYS */;
/*!40000 ALTER TABLE `invruta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idtabla` int(11) NOT NULL,
  `idaccion` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `fecha` datetime NOT NULL,
  `idsucursal` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (1,64,1,'Ingreso de Factura: 1','2','2016-10-12 16:27:39',1),(2,64,1,'Ingreso de Factura: 1','2','2016-10-12 16:29:59',1),(3,64,1,'Ingreso de Factura: 2','2','2016-10-12 16:30:42',1),(4,64,1,'Ingreso de Factura: 3','1','2016-10-12 16:33:30',1),(5,64,1,'Ingreso de Factura: 4','1','2016-10-12 16:33:56',1),(6,64,1,'Ingreso de Factura: 1','2','2016-10-12 16:39:49',1),(7,64,1,'Ingreso de Factura: 2','2','2016-10-12 16:40:42',1),(8,64,1,'Ingreso de Factura: 3','2','2016-10-12 16:41:07',1),(9,64,1,'Ingreso de Factura: 1','2','2016-10-12 16:46:46',1),(10,64,1,'Ingreso de Factura: 2','2','2016-10-12 16:47:28',1),(11,64,1,'Ingreso de Factura: 3','1','2016-10-13 10:29:56',1),(12,0,4,'CIA: Sucursal1','2','2016-10-13 10:43:11',1),(13,0,4,'CIA: Sucursal1','2','2016-10-13 10:43:11',1),(14,0,4,'CIA: Sucursal1','2','2016-10-13 11:06:38',1),(15,0,4,'CIA: Sucursal1','2','2016-10-13 11:06:38',1),(16,64,1,'Ingreso de Factura: 7','1','2016-10-13 11:32:31',1),(17,0,4,'CIA: Sucursal1','2','2016-11-02 10:02:38',1),(18,64,1,'Ingreso de Venta8','2','2016-11-02 10:34:43',1),(19,0,4,'CIA: Sucursal1','2','2016-11-02 10:38:15',1),(20,0,4,'CIA: Sucursal1','2','2016-11-02 10:38:15',1),(21,64,1,'Ingreso de Venta9','2','2016-11-02 10:43:24',1),(22,0,4,'CIA: Sucursal1','2','2016-11-02 13:39:41',1),(23,0,4,'CIA: Sucursal1','2','2016-11-02 13:39:41',1),(24,0,4,'CIA: Sucursal1','2','2016-11-03 08:44:54',1),(25,0,4,'CIA: Sucursal1','2','2016-11-03 08:44:54',1),(26,0,4,'CIA: Sucursal1','2','2016-11-03 09:56:31',1),(27,0,4,'CIA: Sucursal1','2','2016-11-03 09:56:31',1),(28,1,1,'0','2','2016-11-03 11:30:17',1),(29,0,4,'CIA: Sucursal1','2','2016-11-03 13:41:04',1),(30,0,4,'CIA: Sucursal1','2','2016-11-03 13:41:04',1),(31,11,1,'Producto Nuevo: Producto1','2','2016-11-03 13:43:24',1),(32,11,1,'Producto Nuevo: Producto2','2','2016-11-03 13:45:07',1),(33,11,1,'Producto Nuevo: Producto3','2','2016-11-03 13:46:20',1),(34,11,1,'Producto Nuevo: Producto4','2','2016-11-03 13:53:22',1),(35,0,4,'CIA: Sucursal1','2','2016-11-03 14:08:51',1),(36,0,4,'CIA: Sucursal1','2','2016-11-03 14:08:51',1),(37,11,1,'Producto Nuevo: Producto5','2','2016-11-03 14:22:32',1),(38,0,4,'CIA: Sucursal1','2','2016-11-03 15:28:57',1),(39,0,4,'CIA: Sucursal1','2','2016-11-03 15:28:57',1),(40,0,4,'CIA: Sucursal1','2','2016-11-07 08:57:43',1),(41,11,1,'Producto Nuevo: Producto6','2','2016-11-07 09:01:05',1),(42,0,4,'CIA: Sucursal1','2','2016-11-07 09:08:40',1),(43,0,4,'CIA: Sucursal1','2','2016-11-07 09:08:40',1),(44,0,4,'CIA: Sucursal1','2','2016-11-07 09:12:40',1),(45,0,4,'CIA: Sucursal1','2','2016-11-07 09:12:40',1),(46,11,3,'Producto Eliminado ','2','2016-11-07 10:23:21',1),(47,11,3,'Producto Eliminado ','2','2016-11-07 10:29:17',1),(48,11,3,'Producto Eliminado ','2','2016-11-07 10:31:26',1),(49,11,3,'Producto Eliminado ','2','2016-11-07 10:35:22',1),(50,0,4,'CIA: Sucursal1','2','2016-10-29 11:28:45',1),(51,0,4,'CIA: Sucursal1','2','2016-10-29 11:28:45',1),(52,0,4,'CIA: Sucursal1','2','2016-10-29 16:39:06',1),(53,0,4,'CIA: Sucursal1','2','2016-10-29 16:39:07',1),(54,64,1,'Ingreso de Venta10','2','2016-10-29 17:02:22',1),(55,64,1,'Ingreso de Venta11','2','2016-10-29 17:14:29',1),(56,64,1,'Ingreso de Venta12','2','2016-10-29 17:16:43',1),(57,64,1,'Ingreso de Venta13','2','2016-10-29 17:20:41',1),(58,0,4,'CIA: Sucursal1','2','2016-10-29 17:22:24',1),(59,0,4,'CIA: Sucursal1','2','2016-10-29 17:22:24',1),(60,0,4,'CIA: Sucursal1','2','2016-10-30 10:15:20',1),(61,0,4,'CIA: Sucursal1','2','2016-10-30 10:15:20',1),(62,0,4,'CIA: Sucursal1','2','2016-10-30 10:30:39',1),(63,0,4,'CIA: Sucursal1','2','2016-10-30 10:30:39',1),(64,0,4,'CIA: Sucursal1','2','2016-10-30 11:08:14',1),(65,0,4,'CIA: Sucursal1','2','2016-10-30 11:08:14',1),(66,1,1,'4','2','2016-10-30 11:08:35',0),(67,1,1,'3','2','2016-10-30 11:08:49',0),(68,1,1,'1','2','2016-10-30 11:08:51',0),(69,1,1,'5','2','2016-10-30 11:08:53',0),(70,1,1,'0','2','2016-10-30 11:12:11',1),(71,1,1,'2','2','2016-10-30 11:12:17',0),(72,0,1,'Familia: Fam1','2','2016-10-30 11:24:39',1),(73,0,1,'Tipo: Tipo1','2','2016-10-30 11:24:45',1),(74,0,1,'Marca: Marca1','2','2016-10-30 11:24:51',1),(75,0,1,'Modelo: Modelo1','2','2016-10-30 11:24:56',1),(76,0,4,'CIA: Sucursal1','6','2016-10-30 11:47:06',1),(77,0,4,'CIA: Sucursal1','6','2016-10-30 11:47:06',1),(78,11,1,'Producto Nuevo: Producto1','2','2016-10-30 11:48:07',1),(79,0,4,'CIA: Sucursal1','6','2016-10-30 12:14:44',1),(80,0,4,'CIA: Sucursal1','6','2016-10-30 12:14:44',1),(81,0,4,'CIA: Sucursal1','6','2016-10-30 12:19:25',1),(82,0,4,'CIA: Sucursal1','6','2016-10-30 12:19:25',1),(83,0,4,'CIA: Sucursal1','1','2016-10-30 12:22:57',1),(84,0,4,'CIA: Sucursal1','1','2016-10-30 12:22:57',1),(85,0,4,'CIA: Sucursal1','1','2016-10-30 12:31:45',1),(86,0,4,'CIA: Sucursal1','1','2016-10-30 12:31:45',1),(87,0,1,'Familia: Fam2','1','2016-10-30 12:35:55',1),(88,0,1,'Tipo: Tipo2','1','2016-10-30 12:35:59',1),(89,0,1,'Marca: Marca2','1','2016-10-30 12:36:04',1),(90,0,1,'Modelo: Modelo2','1','2016-10-30 12:36:17',1),(91,0,4,'CIA: Sucursal1','1','2016-10-30 12:36:41',1),(92,0,4,'CIA: Sucursal1','1','2016-10-30 12:36:41',1),(93,11,1,'Producto Nuevo: Producto2','1','2016-10-30 12:37:01',1),(94,11,1,'Producto Nuevo: Producto3','1','2016-10-30 12:44:15',1),(95,11,1,'Producto Nuevo: producto impuesto','1','2016-10-30 13:04:39',1),(96,11,1,'Producto Nuevo: Producto impuesto 2','1','2016-10-30 13:07:44',1),(97,11,1,'Producto Nuevo: Prueba1','1','2016-10-30 13:09:01',1),(98,11,1,'Producto Nuevo: Producto1','1','2016-10-30 13:14:31',1),(99,11,1,'Producto Nuevo: Producto1','1','2016-10-30 13:19:23',1),(100,11,1,'Producto Nuevo: Producto2','1','2016-10-30 13:24:05',1),(101,0,4,'CIA: Sucursal1','1','2016-10-30 15:57:11',1),(102,0,4,'CIA: Sucursal1','1','2016-10-30 15:57:11',1),(103,0,4,'CIA: Sucursal1','1','2016-10-30 16:00:20',1),(104,0,4,'CIA: Sucursal1','1','2016-10-30 16:00:21',1),(105,11,1,'Producto Nuevo: Producto10','1','2016-10-30 16:23:38',1),(106,11,1,'Producto Nuevo: Producto4','1','2016-10-30 17:10:30',1),(107,11,1,'Producto Nuevo: Producto5','1','2016-10-30 17:13:58',1),(108,11,1,'Producto Nuevo: Productojk1','1','2016-10-30 17:16:29',1),(109,11,2,'Actualización Producto: Productojk12','1','2016-10-30 17:29:08',1),(110,0,4,'CIA: Sucursal1','1','2016-10-30 17:30:18',1),(111,0,4,'CIA: Sucursal1','1','2016-10-30 17:30:18',1),(112,11,1,'Producto Nuevo: Prod05','1','2016-10-30 17:35:48',1),(113,11,2,'Actualización Producto: Prod05','1','2016-10-30 17:54:17',1),(114,11,1,'Producto Nuevo: Prod0001','1','2016-10-30 17:58:24',1),(115,11,2,'Actualización Producto: Prod0001','1','2016-10-30 17:59:13',1),(116,11,1,'Producto Nuevo: Producto1','1','2016-10-30 18:01:23',1),(117,11,2,'Actualización Producto: Producto1','1','2016-10-30 18:01:47',1),(118,11,2,'Actualización Producto: Producto1','1','2016-10-30 18:04:37',1),(119,11,1,'Producto Nuevo: Producto2','1','2016-10-30 18:05:16',1),(120,11,2,'Actualización Producto: Producto2','1','2016-10-30 18:05:27',1),(121,11,2,'Actualización Producto: Producto1','1','2016-10-30 18:06:33',1),(122,11,2,'Actualización Producto: Producto2','1','2016-10-30 18:07:07',1),(123,0,4,'CIA: Sucursal1','1','2016-10-30 18:08:28',1),(124,0,4,'CIA: Sucursal1','1','2016-10-30 18:08:28',1),(125,0,4,'CIA: Sucursal1','1','2016-10-30 18:13:45',1),(126,0,4,'CIA: Sucursal1','1','2016-10-30 18:13:45',1),(127,11,2,'Actualización Producto: Producto2','1','2016-10-30 18:17:43',1),(128,0,4,'CIA: Sucursal1','1','2016-10-30 18:17:50',1),(129,0,4,'CIA: Sucursal1','1','2016-10-30 18:17:51',1),(130,11,2,'Actualización Producto: Producto2','1','2016-10-30 18:19:25',1),(131,11,2,'Actualización Producto: Producto1','1','2016-10-30 18:20:18',1);
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `idusuario` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Marca1','2'),(2,'Marca2','1');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelos`
--

DROP TABLE IF EXISTS `modelos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modelos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idmarca` int(11) DEFAULT NULL,
  `idtipo` int(11) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelos`
--

LOCK TABLES `modelos` WRITE;
/*!40000 ALTER TABLE `modelos` DISABLE KEYS */;
INSERT INTO `modelos` VALUES (1,1,1,'Modelo1',2),(2,2,2,'Modelo2',1);
/*!40000 ALTER TABLE `modelos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monedas`
--

DROP TABLE IF EXISTS `monedas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monedas` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `simbolo` varchar(2) NOT NULL,
  `valor` decimal(8,2) NOT NULL,
  `principal` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monedas`
--

LOCK TABLES `monedas` WRITE;
/*!40000 ALTER TABLE `monedas` DISABLE KEYS */;
INSERT INTO `monedas` VALUES (1,'Colones','¢',1.00,1),(2,'Dólares Venta','$',0.00,0),(3,'Dólares Compra','$',0.00,0);
/*!40000 ALTER TABLE `monedas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivelesclientes`
--

DROP TABLE IF EXISTS `nivelesclientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nivelesclientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `bisproveedor` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivelesclientes`
--

LOCK TABLES `nivelesclientes` WRITE;
/*!40000 ALTER TABLE `nivelesclientes` DISABLE KEYS */;
INSERT INTO `nivelesclientes` VALUES (1,'Bajo',0),(2,'Medio',0),(3,'Alto',0);
/*!40000 ALTER TABLE `nivelesclientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenestrabajos`
--

DROP TABLE IF EXISTS `ordenestrabajos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordenestrabajos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `isfinita` tinyint(2) NOT NULL DEFAULT '1',
  `comentario` varchar(100) NOT NULL,
  `idusuario` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenestrabajos`
--

LOCK TABLES `ordenestrabajos` WRITE;
/*!40000 ALTER TABLE `ordenestrabajos` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenestrabajos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paquetes`
--

DROP TABLE IF EXISTS `paquetes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paquetes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `descuento` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paquetes`
--

LOCK TABLES `paquetes` WRITE;
/*!40000 ALTER TABLE `paquetes` DISABLE KEYS */;
/*!40000 ALTER TABLE `paquetes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permisos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `codigo` int(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisostipousuario`
--

DROP TABLE IF EXISTS `permisostipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permisostipousuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpermiso` int(11) NOT NULL,
  `idtipoUsuario` varchar(45) NOT NULL,
  `tipo` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisostipousuario`
--

LOCK TABLES `permisostipousuario` WRITE;
/*!40000 ALTER TABLE `permisostipousuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisostipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisosusuarios`
--

DROP TABLE IF EXISTS `permisosusuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permisosusuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpermiso` int(11) NOT NULL,
  `idusuario` varchar(45) NOT NULL,
  `tipo` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisosusuarios`
--

LOCK TABLES `permisosusuarios` WRITE;
/*!40000 ALTER TABLE `permisosusuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisosusuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `ganancia` decimal(5,2) NOT NULL,
  `venta` decimal(10,2) NOT NULL,
  `idunidad` tinyint(3) NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `minimo` int(9) NOT NULL,
  `maximo` int(9) NOT NULL,
  `maxdescuento` decimal(6,2) unsigned DEFAULT '0.00',
  `fechacreacion` datetime NOT NULL,
  `idmodelo` int(11) NOT NULL,
  `idusuario` varchar(45) NOT NULL,
  `idmoneda` tinyint(2) unsigned NOT NULL,
  `idcuenta` int(11) NOT NULL,
  `idsucursal` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'P01','Producto1',2000.00,0.00,2500.00,1,0.00,1,25,0.00,'2016-10-30 18:01:23',1,'1',1,0,1),(2,'P02','Producto2',3600.00,10.00,4950.00,2,0.00,1,30,0.00,'2016-10-30 18:05:16',2,'1',1,0,1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincias`
--

DROP TABLE IF EXISTS `provincias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provincias` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincias`
--

LOCK TABLES `provincias` WRITE;
/*!40000 ALTER TABLE `provincias` DISABLE KEYS */;
INSERT INTO `provincias` VALUES (2,'Alajuela'),(3,'Cartago'),(5,'Guanacaste'),(4,'Heredia'),(7,'Limon'),(6,'Puntarenas'),(1,'San José');
/*!40000 ALTER TABLE `provincias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutas`
--

DROP TABLE IF EXISTS `rutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rutas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `codigoruta` varchar(45) DEFAULT NULL,
  `idvehiculo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutas`
--

LOCK TABLES `rutas` WRITE;
/*!40000 ALTER TABLE `rutas` DISABLE KEYS */;
/*!40000 ALTER TABLE `rutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `pbase` decimal(10,2) NOT NULL,
  `periodo` int(3) unsigned DEFAULT NULL,
  `idproveedor` int(11) DEFAULT NULL,
  `pcompra` decimal(10,2) DEFAULT NULL,
  `pganancia` decimal(6,2) DEFAULT NULL,
  `fcreacion` datetime NOT NULL,
  `idusuario` varchar(45) NOT NULL,
  `idmoneda` tinyint(2) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (-3,'','Mantenimiento FFA','Mantenimiento',67000.00,0,0,0.00,0.00,'2016-06-24 14:54:28','sadmin',1),(-2,'','Reparación de Celular','Reparación de fallos en telefono celular',30000.00,0,1,0.00,0.00,'2016-06-17 00:00:00','1',0),(-1,'','Mantenimiento VTT','Manteni VTT',120000.00,12,0,0.00,0.00,'2016-06-23 09:53:49','sadmin',1),(0,'','Mantenimiento Preventivo','Correcciones menores para garantizar el correcto funcionamiento de los equipos',67000.00,30,1,0.00,0.00,'2016-06-21 16:33:40','sadmin',1),(1,'','Soporte','Mantenimiento de ocmputadoras y Formateo de Equipos',200000.00,30,1,150000.00,50.00,'2016-06-17 00:00:00','1',0),(4,'','Mantenimiento RR','Ror Riacaso',400000.00,0,0,0.00,0.00,'2016-06-22 16:16:33','sadmin',1),(6,'','Mantenimiento QQ','Mant QQ',12000.00,17,1,0.00,0.00,'2016-06-24 14:23:16','sadmin',0),(8,'','Mantenimiento GGhJ','Mant GGhJ',34000.00,0,0,0.00,0.00,'2016-06-24 14:57:31','sadmin',1),(9,'','serv1','algo',2000.00,0,0,0.00,0.00,'2016-08-03 14:15:18','2',1),(10,'','serv2','prueba2',25000.00,0,0,0.00,0.00,'2016-08-04 09:11:25','2',1);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursales`
--

DROP TABLE IF EXISTS `sucursales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sucursales` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `idusuario` int(11) NOT NULL,
  `factura` varchar(5) NOT NULL,
  `consecutivo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursales`
--

LOCK TABLES `sucursales` WRITE;
/*!40000 ALTER TABLE `sucursales` DISABLE KEYS */;
INSERT INTO `sucursales` VALUES (1,'Sucursal1',NULL,2,'PA',31),(2,'Sucursal2',NULL,2,'PB',1);
/*!40000 ALTER TABLE `sucursales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablas`
--

DROP TABLE IF EXISTS `tablas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tablas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablas`
--

LOCK TABLES `tablas` WRITE;
/*!40000 ALTER TABLE `tablas` DISABLE KEYS */;
INSERT INTO `tablas` VALUES (15,'ajustes'),(9,'cantones'),(2,'clientes'),(36,'cuentas'),(87,'defectoimpuestos'),(79,'descuentos'),(65,'detallefacturas'),(59,'detallepaquetes'),(3,'detalletelefonos'),(10,'distritos'),(68,'estadoclientes'),(64,'facturas'),(20,'familias'),(80,'impuestoproductos'),(51,'impuestos'),(49,'imvproductos'),(22,'marcas'),(23,'modelos'),(54,'monedas'),(69,'nivelesclientes'),(55,'ordenestrabajos'),(58,'paquetes'),(11,'productos'),(8,'provincias'),(63,'searchclient'),(16,'servicios'),(0,'Sistema'),(46,'sp_cambioclave'),(56,'sp_changepssw'),(31,'sp_clientes'),(25,'sp_filtrarproductos'),(71,'sp_getCuenta'),(85,'sp_getdefectocuentas'),(47,'sp_mantajustes'),(37,'sp_mantcuentas'),(86,'sp_mantdefectoimpuestos'),(82,'sp_mantdescuentos'),(67,'sp_mantdetallefacturas'),(61,'sp_mantdetallepaquetes'),(66,'sp_mantfacturas'),(52,'sp_mantfechafiscal'),(81,'sp_mantimpuestoproductos'),(48,'sp_mantimpuestos'),(24,'sp_mantjerarquia'),(60,'sp_mantpaquetes'),(78,'sp_mantproductos'),(44,'sp_mantsubcuentas'),(45,'sp_manttipocuentas'),(32,'sp_proveedores'),(53,'sp_searchCuenta'),(35,'subcuentas'),(39,'sucursales'),(70,'tablas'),(5,'tipoclientes'),(38,'tipocontable'),(34,'tipocuentas'),(41,'tipoinventarios'),(26,'tipopagos'),(21,'tipos'),(4,'tipotelefonos'),(27,'tipousuarios'),(1,'usuarios'),(29,'v_clientes'),(33,'v_cuentas'),(50,'v_datosEmpresa'),(84,'v_descuentos'),(73,'v_detallefacturas'),(62,'v_detallepaquetes'),(72,'v_facturas'),(83,'v_impuestoproductos'),(40,'v_invcontable'),(42,'v_invinsumos'),(76,'v_paquetes'),(14,'v_productos'),(77,'v_productosservicios'),(30,'v_proveedores'),(13,'v_servicios'),(43,'v_serviciosfact'),(57,'v_sucursales'),(12,'v_unidad'),(7,'v_usuarios');
/*!40000 ALTER TABLE `tablas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefonos`
--

DROP TABLE IF EXISTS `telefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telefonos` (
  `casa` varchar(45) DEFAULT NULL,
  `trabajo` varchar(45) DEFAULT NULL,
  `movil` varchar(45) DEFAULT NULL,
  `idtabla` int(11) NOT NULL,
  `idfila` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonos`
--

LOCK TABLES `telefonos` WRITE;
/*!40000 ALTER TABLE `telefonos` DISABLE KEYS */;
INSERT INTO `telefonos` VALUES ('2444-4444','2555-5555','8888-8888',2,1),('2444-4444','2666-6666','8888-00000',2,2),('2111-3300','2698-8855','88445637',2,3),('','3333-3333','',2,4),('','','',2,5),('','','6259-8979',2,6),('','','',2,7),('','','',2,8),('7474-7475','6454-6464','6464-6464',2,9),('','','',2,10),('','','',2,11),('','','',2,12);
/*!40000 ALTER TABLE `telefonos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temporalcuentas`
--

DROP TABLE IF EXISTS `temporalcuentas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temporalcuentas` (
  `idtransaccion` int(11) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `idfactura` int(11) DEFAULT NULL,
  `bhascosto` tinyint(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temporalcuentas`
--

LOCK TABLES `temporalcuentas` WRITE;
/*!40000 ALTER TABLE `temporalcuentas` DISABLE KEYS */;
INSERT INTO `temporalcuentas` VALUES (1,293.80,8,0);
/*!40000 ALTER TABLE `temporalcuentas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoacciones`
--

DROP TABLE IF EXISTS `tipoacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipoacciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoacciones`
--

LOCK TABLES `tipoacciones` WRITE;
/*!40000 ALTER TABLE `tipoacciones` DISABLE KEYS */;
INSERT INTO `tipoacciones` VALUES (2,'Actualizar'),(4,'Autenticar'),(3,'Eliminar'),(1,'Insercion');
/*!40000 ALTER TABLE `tipoacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipociclos`
--

DROP TABLE IF EXISTS `tipociclos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipociclos` (
  `id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipociclos`
--

LOCK TABLES `tipociclos` WRITE;
/*!40000 ALTER TABLE `tipociclos` DISABLE KEYS */;
INSERT INTO `tipociclos` VALUES (3,'Dias repetidos'),(1,'Entre Fechas'),(4,'Inactivo'),(2,'Meses repetidos'),(0,'Sin limite');
/*!40000 ALTER TABLE `tipociclos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoclientes`
--

DROP TABLE IF EXISTS `tipoclientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipoclientes` (
  `id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `new_tablecol_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoclientes`
--

LOCK TABLES `tipoclientes` WRITE;
/*!40000 ALTER TABLE `tipoclientes` DISABLE KEYS */;
INSERT INTO `tipoclientes` VALUES (1,'Físico'),(2,'Jurídico');
/*!40000 ALTER TABLE `tipoclientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipocuentas`
--

DROP TABLE IF EXISTS `tipocuentas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipocuentas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `descripcion` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipocuentas`
--

LOCK TABLES `tipocuentas` WRITE;
/*!40000 ALTER TABLE `tipocuentas` DISABLE KEYS */;
INSERT INTO `tipocuentas` VALUES (1,'Cash','Cuentas de Dinero'),(2,'INV','Cuentas de Inventarios'),(3,'CTA','Cuentas de crédito'),(4,'Ventas','Cuentas de Ingreso'),(5,'Servicios','Cuentas de Venta de Servicio'),(6,'IMP','Cuentas de Impuestos'),(7,'DESC','Cuentas de Descuentos');
/*!40000 ALTER TABLE `tipocuentas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipofacturas`
--

DROP TABLE IF EXISTS `tipofacturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipofacturas` (
  `id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipofacturas`
--

LOCK TABLES `tipofacturas` WRITE;
/*!40000 ALTER TABLE `tipofacturas` DISABLE KEYS */;
INSERT INTO `tipofacturas` VALUES (1,'Contado'),(2,'Credito');
/*!40000 ALTER TABLE `tipofacturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoflotilla`
--

DROP TABLE IF EXISTS `tipoflotilla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipoflotilla` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoflotilla`
--

LOCK TABLES `tipoflotilla` WRITE;
/*!40000 ALTER TABLE `tipoflotilla` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipoflotilla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoinventarios`
--

DROP TABLE IF EXISTS `tipoinventarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipoinventarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoinventarios`
--

LOCK TABLES `tipoinventarios` WRITE;
/*!40000 ALTER TABLE `tipoinventarios` DISABLE KEYS */;
INSERT INTO `tipoinventarios` VALUES (1,'Devoluciones'),(2,'Insumos'),(3,'Gastos'),(4,'Contable');
/*!40000 ALTER TABLE `tipoinventarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipojerarquia`
--

DROP TABLE IF EXISTS `tipojerarquia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipojerarquia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipojerarquia`
--

LOCK TABLES `tipojerarquia` WRITE;
/*!40000 ALTER TABLE `tipojerarquia` DISABLE KEYS */;
INSERT INTO `tipojerarquia` VALUES (1,'Familia'),(2,'Tipo'),(3,'Marca'),(4,'Modelo');
/*!40000 ALTER TABLE `tipojerarquia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipopagos`
--

DROP TABLE IF EXISTS `tipopagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipopagos` (
  `id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipopagos`
--

LOCK TABLES `tipopagos` WRITE;
/*!40000 ALTER TABLE `tipopagos` DISABLE KEYS */;
INSERT INTO `tipopagos` VALUES (3,'Depósito'),(1,'Efectivo'),(4,'Mixto'),(2,'Tarjeta');
/*!40000 ALTER TABLE `tipopagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos`
--

DROP TABLE IF EXISTS `tipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `idfamilia` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos`
--

LOCK TABLES `tipos` WRITE;
/*!40000 ALTER TABLE `tipos` DISABLE KEYS */;
INSERT INTO `tipos` VALUES (1,'Tipo1',1,2),(2,'Tipo2',2,1);
/*!40000 ALTER TABLE `tipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipotelefonos`
--

DROP TABLE IF EXISTS `tipotelefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipotelefonos` (
  `id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipotelefonos`
--

LOCK TABLES `tipotelefonos` WRITE;
/*!40000 ALTER TABLE `tipotelefonos` DISABLE KEYS */;
INSERT INTO `tipotelefonos` VALUES (1,'Casa'),(3,'Móvil'),(2,'Trabajo');
/*!40000 ALTER TABLE `tipotelefonos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuarios`
--

DROP TABLE IF EXISTS `tipousuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipousuarios` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuarios`
--

LOCK TABLES `tipousuarios` WRITE;
/*!40000 ALTER TABLE `tipousuarios` DISABLE KEYS */;
INSERT INTO `tipousuarios` VALUES (1,'Administrador'),(3,'Cajero'),(4,'Denegado'),(2,'Supervidor');
/*!40000 ALTER TABLE `tipousuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacciones`
--

DROP TABLE IF EXISTS `transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transacciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `idempresa` int(11) NOT NULL,
  `idmoneda` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacciones`
--

LOCK TABLES `transacciones` WRITE;
/*!40000 ALTER TABLE `transacciones` DISABLE KEYS */;
INSERT INTO `transacciones` VALUES (1,'2016-11-02 10:34:43','Venta de Contado al Cliente: Alfaro Loria Rolando',2,1,1),(2,'2016-11-02 10:43:24','Venta de Contado al Cliente: Alfaro Loria Rolando',2,1,1),(3,'2016-10-29 17:02:22','Venta de Contado al Cliente: Conta Cta Prueba',2,1,1),(4,'2016-10-29 17:14:30','Venta de Contado al Cliente: Conta Cta Prueba',2,1,1),(5,'2016-10-29 17:16:43','Venta de Contado al Cliente: Conta Cta Prueba',2,1,1),(6,'2016-10-29 17:20:41','Venta de Contado al Cliente: Conta Cta Prueba',2,1,1);
/*!40000 ALTER TABLE `transacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicaciones`
--

DROP TABLE IF EXISTS `ubicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ubicaciones` (
  `iddistrito` int(11) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `latitud` decimal(8,4) DEFAULT NULL,
  `longitud` decimal(8,4) DEFAULT NULL,
  `idtabla` int(11) NOT NULL,
  `idfila` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicaciones`
--

LOCK TABLES `ubicaciones` WRITE;
/*!40000 ALTER TABLE `ubicaciones` DISABLE KEYS */;
INSERT INTO `ubicaciones` VALUES (0,'Por ahi',17.2570,0.2568,2,4),(0,'Casa',0.0000,0.0000,2,1),(0,'asdknasdk',0.0000,0.0000,2,2),(0,'asdknasdk',0.0000,0.0000,2,3),(0,'',0.0000,0.0000,2,5),(0,'',0.0000,0.0000,2,6),(0,'',0.0000,0.0000,2,7),(0,'',0.0000,0.0000,2,8),(0,'',0.0000,0.0000,2,9),(0,'',0.0000,0.0000,2,10),(0,'',0.0000,0.0000,2,11),(0,'',0.0000,0.0000,2,12);
/*!40000 ALTER TABLE `ubicaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidades` (
  `id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `simbolo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
INSERT INTO `unidades` VALUES (0,'Unidad','UN'),(1,'Litro','L'),(2,'Gramo','G'),(3,'Metro','M');
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(64) CHARACTER SET utf8 NOT NULL,
  `idTipoUsuario` int(3) unsigned NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 NOT NULL,
  `clave` varchar(100) NOT NULL,
  `cedula` varchar(25) CHARACTER SET utf8 NOT NULL,
  `mail` varchar(64) CHARACTER SET utf8 DEFAULT NULL,
  `bcambioPSSW` tinyint(2) unsigned DEFAULT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `limite1` time NOT NULL DEFAULT '07:00:00',
  `limite2` time NOT NULL DEFAULT '17:00:00',
  `idsucursal` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'sadmin',1,'Super Administrador','¨¸‚ÁÄíò$èo‰;æ','202220222','info@logintechcr.com',1,'¸_àþ³Æb6 È=ð¨BËÎâf$[KÜûBd?Ãƒ','00:00:00','00:00:00',1),(2,'chavela',1,'Dulces Chavela',']³ž¹àQÍ“¬•à»_S','123456789','',0,NULL,'08:00:00','17:00:00',1),(3,'brojas',1,'Bryan Rojas Bo','‡\rÆµíðñ.œ4m\\ŽÜB','207060843','brojas1992@gmail.com',0,NULL,'00:00:00','00:00:00',2),(4,'acespedes',2,'Andres Cespedes','ßkž[ÆVOˆî°ñ/KÈ','222222222','ac@gmail.com1',0,NULL,'08:00:00','17:00:00',2),(5,'prueba',3,'prueba12','eÖ·ÉÛSóç8åŸÙ','102020202','',0,NULL,'08:00:00','17:00:00',2),(6,'admin',1,'Rodrigo Oviedo','ÆÎÛ\ZC2›iSœñR`°u','222222222','',0,NULL,'00:00:00','23:59:00',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_clientes`
--

DROP TABLE IF EXISTS `v_clientes`;
/*!50001 DROP VIEW IF EXISTS `v_clientes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_clientes` (
  `vid` tinyint NOT NULL,
  `vcedula` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `bisnacional` tinyint NOT NULL,
  `telefonos` tinyint NOT NULL,
  `correos` tinyint NOT NULL,
  `tipocliente` tinyint NOT NULL,
  `estado` tinyint NOT NULL,
  `credito` tinyint NOT NULL,
  `plazo` tinyint NOT NULL,
  `idconta` tinyint NOT NULL,
  `fecha_creacion` tinyint NOT NULL,
  `idusuario` tinyint NOT NULL,
  `descuentop` tinyint NOT NULL,
  `descuentom` tinyint NOT NULL,
  `idtipocliente` tinyint NOT NULL,
  `idestado` tinyint NOT NULL,
  `idnivel` tinyint NOT NULL,
  `nivel` tinyint NOT NULL,
  `web` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_cuentas`
--

DROP TABLE IF EXISTS `v_cuentas`;
/*!50001 DROP VIEW IF EXISTS `v_cuentas`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_cuentas` (
  `Cuenta` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `Valor` tinyint NOT NULL,
  `id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_datosempresa`
--

DROP TABLE IF EXISTS `v_datosempresa`;
/*!50001 DROP VIEW IF EXISTS `v_datosempresa`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_datosempresa` (
  `valor` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_detallefacturas`
--

DROP TABLE IF EXISTS `v_detallefacturas`;
/*!50001 DROP VIEW IF EXISTS `v_detallefacturas`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_detallefacturas` (
  `id` tinyint NOT NULL,
  `idfactura` tinyint NOT NULL,
  `idproducto` tinyint NOT NULL,
  `nombreproducto` tinyint NOT NULL,
  `codigoproducto` tinyint NOT NULL,
  `cantidad` tinyint NOT NULL,
  `precio` tinyint NOT NULL,
  `descuento` tinyint NOT NULL,
  `total` tinyint NOT NULL,
  `ftotal` tinyint NOT NULL,
  `totaldesc` tinyint NOT NULL,
  `ftotaldesc` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_detallepaquetes`
--

DROP TABLE IF EXISTS `v_detallepaquetes`;
/*!50001 DROP VIEW IF EXISTS `v_detallepaquetes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_detallepaquetes` (
  `idpaquete` tinyint NOT NULL,
  `idproducto` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `cantidad` tinyint NOT NULL,
  `venta` tinyint NOT NULL,
  `ptotal` tinyint NOT NULL,
  `idservicio` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_facturas`
--

DROP TABLE IF EXISTS `v_facturas`;
/*!50001 DROP VIEW IF EXISTS `v_facturas`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_facturas` (
  `idfactura` tinyint NOT NULL,
  `idtipofactura` tinyint NOT NULL,
  `tipofactura` tinyint NOT NULL,
  `idtipopago` tinyint NOT NULL,
  `tipopago` tinyint NOT NULL,
  `fecha` tinyint NOT NULL,
  `idcliente` tinyint NOT NULL,
  `cliente` tinyint NOT NULL,
  `idestado` tinyint NOT NULL,
  `estadofactura` tinyint NOT NULL,
  `isregistrada` tinyint NOT NULL,
  `imv` tinyint NOT NULL,
  `descuento` tinyint NOT NULL,
  `tdescuento` tinyint NOT NULL,
  `flete` tinyint NOT NULL,
  `ajuste` tinyint NOT NULL,
  `subtotal` tinyint NOT NULL,
  `fsubtotal` tinyint NOT NULL,
  `total` tinyint NOT NULL,
  `ftotal` tinyint NOT NULL,
  `plazo` tinyint NOT NULL,
  `comentario` tinyint NOT NULL,
  `referencia` tinyint NOT NULL,
  `idmoneda` tinyint NOT NULL,
  `moneda` tinyint NOT NULL,
  `simbolo` tinyint NOT NULL,
  `idusuario` tinyint NOT NULL,
  `usuario` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_impuestoproductos`
--

DROP TABLE IF EXISTS `v_impuestoproductos`;
/*!50001 DROP VIEW IF EXISTS `v_impuestoproductos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_impuestoproductos` (
  `id` tinyint NOT NULL,
  `idproducto` tinyint NOT NULL,
  `idtabla` tinyint NOT NULL,
  `tabla` tinyint NOT NULL,
  `idimpuesto` tinyint NOT NULL,
  `impuesto` tinyint NOT NULL,
  `valor` tinyint NOT NULL,
  `exoneracion` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_invcontable`
--

DROP TABLE IF EXISTS `v_invcontable`;
/*!50001 DROP VIEW IF EXISTS `v_invcontable`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_invcontable` (
  `id` tinyint NOT NULL,
  `codigo` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `cantidad` tinyint NOT NULL,
  `cuenta` tinyint NOT NULL,
  `fecha` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_invinsumos`
--

DROP TABLE IF EXISTS `v_invinsumos`;
/*!50001 DROP VIEW IF EXISTS `v_invinsumos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_invinsumos` (
  `id` tinyint NOT NULL,
  `codigo` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `cantidad` tinyint NOT NULL,
  `precio` tinyint NOT NULL,
  `fecha` tinyint NOT NULL,
  `detalle` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_logusuarios`
--

DROP TABLE IF EXISTS `v_logusuarios`;
/*!50001 DROP VIEW IF EXISTS `v_logusuarios`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_logusuarios` (
  `Usuario` tinyint NOT NULL,
  `accion` tinyint NOT NULL,
  `descripcion` tinyint NOT NULL,
  `Fecha` tinyint NOT NULL,
  `f1` tinyint NOT NULL,
  `id_user` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_permisostipos`
--

DROP TABLE IF EXISTS `v_permisostipos`;
/*!50001 DROP VIEW IF EXISTS `v_permisostipos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_permisostipos` (
  `id_tipo` tinyint NOT NULL,
  `idcodigo` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `permiso` tinyint NOT NULL,
  `nombre_permiso` tinyint NOT NULL,
  `id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_permisosusuario`
--

DROP TABLE IF EXISTS `v_permisosusuario`;
/*!50001 DROP VIEW IF EXISTS `v_permisosusuario`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_permisosusuario` (
  `id_user` tinyint NOT NULL,
  `idcodigo` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `permiso` tinyint NOT NULL,
  `nombre_permiso` tinyint NOT NULL,
  `id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_permisosusuarios`
--

DROP TABLE IF EXISTS `v_permisosusuarios`;
/*!50001 DROP VIEW IF EXISTS `v_permisosusuarios`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_permisosusuarios` (
  `idUsuario` tinyint NOT NULL,
  `idcodigo` tinyint NOT NULL,
  `permiso` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_productos`
--

DROP TABLE IF EXISTS `v_productos`;
/*!50001 DROP VIEW IF EXISTS `v_productos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_productos` (
  `id` tinyint NOT NULL,
  `codigo` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `costo` tinyint NOT NULL,
  `scosto` tinyint NOT NULL,
  `fcosto` tinyint NOT NULL,
  `ganancia` tinyint NOT NULL,
  `sganancia` tinyint NOT NULL,
  `venta` tinyint NOT NULL,
  `sventa` tinyint NOT NULL,
  `fventa` tinyint NOT NULL,
  `idunidad` tinyint NOT NULL,
  `nombreunidad` tinyint NOT NULL,
  `simbolo` tinyint NOT NULL,
  `cantidad` tinyint NOT NULL,
  `minimo` tinyint NOT NULL,
  `maximo` tinyint NOT NULL,
  `maxdescuento` tinyint NOT NULL,
  `smaxdescuento` tinyint NOT NULL,
  `fecha` tinyint NOT NULL,
  `idfamilia` tinyint NOT NULL,
  `familia` tinyint NOT NULL,
  `idtipo` tinyint NOT NULL,
  `tipo` tinyint NOT NULL,
  `idmarca` tinyint NOT NULL,
  `marca` tinyint NOT NULL,
  `idmodelo` tinyint NOT NULL,
  `modelo` tinyint NOT NULL,
  `idusuario` tinyint NOT NULL,
  `usuario` tinyint NOT NULL,
  `idmoneda` tinyint NOT NULL,
  `moneda` tinyint NOT NULL,
  `idcuenta` tinyint NOT NULL,
  `idsucursal` tinyint NOT NULL,
  `sucursal` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_productosservicios`
--

DROP TABLE IF EXISTS `v_productosservicios`;
/*!50001 DROP VIEW IF EXISTS `v_productosservicios`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_productosservicios` (
  `id` tinyint NOT NULL,
  `codigo` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `nombreprecio` tinyint NOT NULL,
  `precio` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_proveedores`
--

DROP TABLE IF EXISTS `v_proveedores`;
/*!50001 DROP VIEW IF EXISTS `v_proveedores`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_proveedores` (
  `vid` tinyint NOT NULL,
  `vcedula` tinyint NOT NULL,
  `vnombre` tinyint NOT NULL,
  `vbisnacional` tinyint NOT NULL,
  `vtelefonos` tinyint NOT NULL,
  `vcorreos` tinyint NOT NULL,
  `vweb` tinyint NOT NULL,
  `vidtipocliente` tinyint NOT NULL,
  `vestado` tinyint NOT NULL,
  `vcredito` tinyint NOT NULL,
  `vplazo` tinyint NOT NULL,
  `videstadocontable` tinyint NOT NULL,
  `vfechacreacion` tinyint NOT NULL,
  `vidsuario` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_servicios`
--

DROP TABLE IF EXISTS `v_servicios`;
/*!50001 DROP VIEW IF EXISTS `v_servicios`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_servicios` (
  `codigo` tinyint NOT NULL,
  `nombre` tinyint NOT NULL,
  `precio` tinyint NOT NULL,
  `periodo` tinyint NOT NULL,
  `outsourcing` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_serviciosfact`
--

DROP TABLE IF EXISTS `v_serviciosfact`;
/*!50001 DROP VIEW IF EXISTS `v_serviciosfact`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_serviciosfact` (
  `vid` tinyint NOT NULL,
  `vcodigo` tinyint NOT NULL,
  `vnombre` tinyint NOT NULL,
  `vprecio` tinyint NOT NULL,
  `vcantidad` tinyint NOT NULL,
  `vhcodigo` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_unidad`
--

DROP TABLE IF EXISTS `v_unidad`;
/*!50001 DROP VIEW IF EXISTS `v_unidad`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_unidad` (
  `idunidad` tinyint NOT NULL,
  `nombre` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_usuarios`
--

DROP TABLE IF EXISTS `v_usuarios`;
/*!50001 DROP VIEW IF EXISTS `v_usuarios`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_usuarios` (
  `Id` tinyint NOT NULL,
  `Usuario` tinyint NOT NULL,
  `Nombre` tinyint NOT NULL,
  `Cedula` tinyint NOT NULL,
  `Correo` tinyint NOT NULL,
  `Tipo Usuario` tinyint NOT NULL,
  `pssw` tinyint NOT NULL,
  `Hora Entrada` tinyint NOT NULL,
  `Hora Salida` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placa` varchar(8) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  `chofer` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `kilometraje` decimal(10,0) DEFAULT NULL,
  `vin` varchar(45) DEFAULT NULL,
  `idmodelo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'idemo2'
--
/*!50003 DROP PROCEDURE IF EXISTS `krattos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `krattos`(vsel varchar(500),vtabla int, vwhere varchar(600))
BEGIN

select nombre from tablas where id = vtabla into @ntabla;

if vsel <> '' then /* and vtabla REGEXP '^-?[0-9]+$'*/

if vwhere = '' then
set @mysql = concat('SELECT ',vsel,' FROM ',@ntabla);
else
set @mysql = concat('SELECT ',vsel,' FROM ',@ntabla,' WHERE ',vwhere);
end if;

prepare stmt from @mysql;
execute stmt;



else

set @mysql = concat('CALL ',@ntabla,'(',vwhere,')');
prepare stmt from @mysql;
execute stmt;


end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `naruto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`10.50.13.%` PROCEDURE `naruto`(vstring varchar(255),vtabla varchar(64),vvariable int)
begin
DECLARE parte varchar(20);
select char_length(vstring) - char_length(replace(vstring,':','')) into @cantidad;

if vvariable <> 0 then
	set vstring = replace(vstring,'?',vvariable);
end if;

while @cantidad > 0 do

set parte = replace(replace(substring_index(vstring,':',1),'[','('),']',')');
set vstring = substring(vstring,locate(':',vstring)+1);
set @mysql = concat('INSERT INTO ',vtabla,' values',parte);

prepare stmt from @mysql;
execute stmt;

set @cantidad = @cantidad -1;

end while;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `searchclient` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `searchclient`(vvariable varchar(45),visprv tinyint(2))
BEGIN

SELECT id as vid,concat(nombre,' ',apellido1,' ',apellido2) as vnombre,cedula as vcedula,plazo as vplazo,
descuentop as vdescuento
FROM clientes 
WHERE id > 0 AND bisproveedor = visprv
HAVING vnombre like concat('%',vvariable,'%') or cedula like concat('%',vvariable,'%');


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `shadow` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `shadow`(vaccion tinyint(3),vtabla int(3),arg1 varchar(100),arg2 varchar(100))
begin
        
	select nombre from tablas where id = vtabla into @ntabla;
    
    if vaccion = 1 then
		set @mysql = concat('INSERT INTO ',@ntabla,if(arg1 <> '',concat('(',arg1,')'),''),
			' VALUES(',arg2,')');
	else if vaccion = 2 then
		set @mysql = concat('UPDATE ',@ntabla,' SET ',arg1,' WHERE ',arg2);
	else if vaccion = 3 then
		set @mysql = concat('DELETE FROM ',@ntabla,' WHERE ',arg1);
	end if;
    end if;
    end if;

	prepare stmt from @mysql;
	execute stmt;
    
    if vaccion = 1 then
		set @mysql = concat('select max(id) from ',@ntabla);
		prepare stmt2 from @mysql;
        execute stmt2;
	else
		select true;
	end if;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_cambioclave` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_cambioclave`(vcodigo varchar(45),vidusuario int(11))
BEGIN
	
	update usuarios set bcambioPSSW = 1,codigo = aes_encrypt(vcodigo,'lt2016') where id = vidusuario;
    select aes_decrypt(codigo,'lt2016') from usuarios where id = vidusuario;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_changepssw` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_changepssw`(vuser VARCHAR(64),vclave VARCHAR(100))
BEGIN

SELECT aes_decrypt(clave,'lt2016') FROM usuarios WHERE user = vuser INTO @oldpssw;

IF vuser not in (select user from usuarios) then
	SET @msj = concat('Nombre Usuario Inválido');
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = @msj;
end if;


IF vclave = @oldpssw then
	SET @msj = concat('Contraseña no Puede ser Igual a la Anterior');
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = @msj;
END IF; 

UPDATE usuarios SET clave = aes_encrypt(vclave,'lt2016') where user = vuser;
select vuser;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_clientes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_clientes`(vid int)
BEGIN
SELECT 
        `c`.`id` AS `vid`,
        `c`.`cedula` AS `vcedula`,
        `c`.`nombre` as vnombre,
        `c`.`apellido1` as vapellido1,
        `c`.`apellido2` AS vapellido2,
        `c`.`bisnacional` AS `vbisnacional`,
        `t`.`trabajo` as vtrabajo,
        `t`.`casa` as vcasa,
        `t`.`movil` AS vmovil,
        `o`.`correo1` AS `vcorreos1`,
        `c`.`credito` AS `vcredito`,
        `c`.`plazo` AS `vplazo`,
        `c`.`idestadocontable` AS `videstadocontable`,
        `c`.`idusuario` AS `vidusuario`,
        `c`.`descuentop` AS `vdescuentop`,
        `c`.`descuentom` AS `vdescuentom`,
        `c`.`idtipocliente` AS `vidtipocliente`,
        `c`.`idestado` AS `videstado`,
        `c`.`idnivel` AS `vidnivel`,
        `c`.`web` AS `vweb`,
        u.latitud as vlatitud,
        u.longitud as vlongitud,
        ifnull(d.id,0) as viddistrito,
        ifnull(a.id,0) as vidcanton,
        ifnull(p.id,0) as vidprovincia,
        u.direccion as vdireccion
    FROM
        `clientes` `c`
        JOIN `telefonos` `t` ON `t`.`idfila` = `c`.`id`
            AND `t`.`idtabla` = 2
        JOIN `ubicaciones` `u` ON `u`.`idfila` = `c`.`id`
            AND `u`.`idtabla` = 2
		JOIN `correos` `o` ON `o`.`idfila` = `c`.`id`
			AND `o`.`idtabla` = 2
        left join distritos d on d.id = u.iddistrito
        left join cantones a on a.id = d.idcanton
        left join provincias p on p.id = a.idprovincia
    WHERE
        (`c`.`bisproveedor` = 0) and c.id = vid
    GROUP BY c.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_filtrarproductos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_filtrarproductos`(vfiltro varchar(45))
begin

if vfiltro = '' then

	select id,codigo,nombre,costo,ganancia,venta from productos where id > 0 order by id limit 20;

else

	select id,codigo,nombre,costo,ganancia,venta from productos where codigo like concat('%',vfiltro,'%') or nombre like concat('%',vfiltro,'%')
or costo like concat('%',vfiltro,'%') or ganancia like concat('%',vfiltro,'%') or venta like concat('%',vfiltro,'%') having id > 0
order by id limit 20;

end if;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_getCuenta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_getCuenta`(vaccion tinyint(3),vidcuenta int,vaccion1 tinyint(3),vf1 date,vf2 date)
begin
declare f1 date;
declare f2 date;

select valor from ajustes where id = 8 into f1;
select valor from ajustes where id = 9 into f2;

select t.id,date_format(t.fecha,'%d/%m/%Y') as vistafecha,sum(debe),sum(haber) from detalletransacciones dt 
join transacciones t on t.id = dt.idtransaccion
where dt.idcuenta = vidcuenta and
case vaccion1 when 1 then date_format(t.fecha,'%Y-%m-%d') = curdate() 
when 2 then date_format(t.fecha,'%Y-%m') = date_format(vf1,'%Y-%m') 
when 3 then yearweek(t.fecha) = yearweek(vf1) 
when 4 then date_format(t.fecha,'%Y-%m-%d') between f1 and f2
when 5 then date_format(t.fecha,'%Y-%m-%d') = vf1 
when 6 then date_format(t.fecha,'%Y-%m-%d') between vf1 and vf2  end
group by case vaccion when 1 then date_format(t.fecha,'%Y-%m-%d') when 2 then date_format(t.fecha,'%Y-%m') when 3 then yearweek(t.fecha) 
when 4 then
date_format(t.fecha,'%Y-%m-%d') between f1 and f2 else dt.id end order by dt.id;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_getdefectocuentas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`10.50.13.%` PROCEDURE `sp_getdefectocuentas`(vidtipo tinyint(3),vtipocuenta tinyint(3),vidcliente int)
begin
	select a.idcuenta,c.nombre,c.numero,d.id,d.nombre,a.porcentaje from defectocuentas a 
    left join defectocuentas b on b.idtabla = 2 and a.idfila = vidcliente
    join cuentas c on c.id = a.idcuenta
	join tipocuentas d on d.id = a.vidtipocuenta
	where a.vidtipo = vidtipo and a.vidtipocuenta = if(vtipocuenta = 1,1,3) and 
    if(b.idcuenta is null,a.bisdefecto,!a.bisdefecto)
    group by a.idcuenta;
 end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_Login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_Login`(vuser varchar(60),vpass varchar(20))
BEGIN

SELECT u.id,u.user,trim(u.nombre), idTipoUsuario,s.nombre,s.id 
FROM usuarios u join sucursales s on 
s.id = u.idsucursal
where u.user = vuser and aes_decrypt(u.clave,'lt2016') = vpass 
into @id,@usr,@nom,@tu,@enom,@eid;

if @id is null then
	(SELECT 'Usuario o Contraseña Incorrecta') union (select 1);
else 
	
	if(select count(id) from usuarios where id = @id and ((curtime() between limite1 and limite2) or idtipousuario = 1)) = 0 then
		(SELECT 'Ingreso no Autorizado') union (select 2);
    elseif (select count(id) from usuarios where id = @id and id > 0 and idtipousuario not in(3)) = 0 then
		(SELECT 'Usuario o Contraseña Incorrecta') union (select 3);
	else
		select @id,@usr,@nom,@tu,@enom,@eid,a.valor from ajustes a where a.descr = 'empresa';
        insert into log values(null,0,4,concat('CIA: ',@enom),@id,now(),@eid);
    end if;
end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantajustes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantajustes`(vvalor varchar(45),vcampo varchar(45))
BEGIN 

update ajustes set valor = vvalor where descr = vcampo;
select vvalor;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantclientes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantclientes`(vaccion tinyint(2),vid int(11),
vapellido1 varchar(64),vapellido2 varchar(64),vnombre varchar(80),vcedula varchar(45),
vidtipocliente int(3) unsigned,videstado int(5) unsigned,vbisproveedor tinyint(2) unsigned,vidnivel int,
vcredito int(9),vplazo int(9),videstadocontable tinyint(2) unsigned,vbisnacional tinyint(2),vweb varchar(45),
vfecha_creacion datetime,vidusuario int(11),
vdescuentop int,vdescuentom decimal(10,2),vidcuenta varchar(100))
BEGIN 

CASE vaccion WHEN 1 THEN  

    INSERT INTO clientes VALUES(null,vapellido1,vapellido2,vnombre,vcedula,vidtipocliente,videstado,vbisproveedor,vidnivel,
    vcredito,vplazo,videstadocontable,vbisnacional,vweb,now(),vidusuario,vdescuentop,vdescuentom);
    
    SELECT @@identity into vid;
    
    if vidcuenta <> '' then
        call naruto(vidcuenta,'defectocuentas',vid);
    end if;

	SELECT vid;

	INSERT INTO log values(null,0,1,'',vidusuario,now());  

WHEN 2 THEN  

    UPDATE clientes SET apellido1 = vapellido1,apellido2 = vapellido2,nombre = vnombre,cedula = vcedula,
    idtipocliente = vidtipocliente,idestado = videstado,bisproveedor = vbisproveedor,credito = vcredito,plazo = vplazo,
    idestadocontable = videstadocontable,bisnacional = vbisnacional,web = vweb, descuentop = vdescuentop,
    descuentom = vdescuentom

WHERE id = vid;

	if vidcuenta <> '' then
		delete from defectocuentas where idtabla = 2 and idfila = vid limit 50;
        call naruto(vidcuenta,'defectocuentas',vid);
    end if;

    SELECT vid;

    INSERT INTO log values(null,0,2,'',vidusuario,now());

WHEN 3 THEN

    SELECT ifnull(min(id),-1)-1 FROM clientes INTO @id;  

    UPDATE clientes set id = @id where id = vid;

    SELECT @id;

    INSERT INTO log values(null,0,3,'',vidusuario,now());

END CASE; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantcorreos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantcorreos`(vaccion tinyint(2),
vcorreo1 varchar(45),vcorreo2 varchar(45),
vcorreo3 varchar(45),vidfila int(11),vidtabla int(11))
BEGIN 
if vcorreo1 = '' then
	set vcorreo1 = null;
end if;
if vcorreo2 = '' then
	set vcorreo2 = null;
end if;
if vcorreo3 = '' then
	set vcorreo3 = null;
end if;
CASE vaccion WHEN 1 THEN  
	INSERT INTO correos VALUES(vidfila,vidtabla,vcorreo1,vcorreo2,vcorreo3);
	SELECT vidfila;
WHEN 2 THEN  
	UPDATE correos SET correo1 = vcorreo1,correo2 = vcorreo2,correo3 = vcorreo3
	WHERE idfila = vidfila and idtabla = vidtabla;
	SELECT vidfila;

when 3 then
	delete from correos where idtabla = vidtabla and idfila = vidfila;
	SELECT vidfila;
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantcuentas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantcuentas`(vaccion tinyint(2),vid int(11),vidsubcuenta int(11),vnombre varchar(40),vidusuario int,vispadre tinyint(2))
BEGIN 

CASE vaccion WHEN 1 THEN  

	IF (select count(id) from cuentas where nombre = vnombre and id > 0 
		and idsubcuenta = vidsubcuenta) > 0  THEN 
	SET @msj = concat('Nombre Cuenta \'',vnombre,'\' Existente');
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = @msj;
	END IF; 
	select count(id)+1 from cuentas where idsubcuenta = vidsubcuenta into @num;
    select deep+1 from cuentas where id = vidsubcuenta into @deep;
    
    select concat(numero,if(char_length(@num) = 1 and @deep > 2,concat('0',@num),@num)
    ) from cuentas where id = vidsubcuenta into @num;
    
	INSERT INTO cuentas VALUES(null,vidsubcuenta,vnombre,@num,@deep,0);

	SELECT @@identity;

	INSERT INTO log values(null,36,1,concat('Cuenta: ',vnombre),vidusuario,now());

WHEN 2 THEN  

	if (select count(id) from cuentas where nombre = vnombre and idsubcuenta = vidsubcuenta 
    and id = vid) = 0 then
    SET @msj = concat('Nombre Cuenta \'',vnombre,'\' Existente');
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = @msj;
	END IF; 

	UPDATE cuentas SET nombre = vnombre WHERE id = vid;

	SELECT vid;

	INSERT INTO log values(null,36,2,concat('Cuenta: ',vnombre),vidusuario,now());

WHEN 3 THEN

	SELECT ifnull(min(id),-1)-1 FROM cuentas INTO @id;  

	UPDATE cuentas set id = @id where id = vid;

	SELECT @id;

	INSERT INTO log values(null,36,3,concat('Cuenta: ',vnombre),vidusuario,now());

END CASE; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantdefectocuentas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantdefectocuentas`(vaccion tinyint(2),
vidcuenta varchar(255),vidfila int(11),vidtabla int(11))
BEGIN 
CASE vaccion WHEN 1 THEN  
	INSERT INTO defectocuentas VALUES(vidcuenta,vidtabla,vidfila);
SELECT vidfila;
 
WHEN 2 THEN  
	UPDATE defectocuentas SET idcuenta = vidcuenta,idtabla = vidtabla,idfila = vidfila
WHERE id = vid;
	SELECT vid;
	/*INSERT INTO log values(null,0,2,'',vidusuario,now());*/
WHEN 3 THEN
	SELECT ifnull(if(min(id)-1 = 0,-1,min(id)-1),-1) FROM defectocuentas INTO @id;  
	UPDATE defectocuentas set id = @id where id = vid;
	SELECT @id;
	/*INSERT INTO log values(null,0,3,'',vidusuario,now());*/
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantdefectoimpuestos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantdefectoimpuestos`(vaccion tinyint(2),vid int(11),vidfila int(11),vidtabla int(11),vidimpuesto tinyint(2),vexoneracion decimal(5,2))
BEGIN 
CASE vaccion WHEN 1 THEN  
	INSERT INTO defectoimpuestos VALUES(null,vidfila,vidtabla,vidimpuesto,vexoneracion);
SELECT @@identity;
/*INSERT INTO log values(null,0,1,'',vidusuario,now());  */
WHEN 2 THEN  
	UPDATE defectoimpuestos SET idfila = vidfila,idtabla = vidtabla,idimpuesto = vidimpuesto,exoneracion = vexoneracion
WHERE id = vid;
	SELECT vid;
	/*INSERT INTO log values(null,0,2,'',vidusuario,now());*/
WHEN 3 THEN
	DELETE FROM defectoimpuestos WHERE idfila = vidfila AND idtabla = vidtabla;
	/*INSERT INTO log values(null,0,3,'',vidusuario,now());*/
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantdescuentoproductos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantdescuentoproductos`(vaccion tinyint(2),vid int(11),vidproducto int(11),vdescuento decimal(6,2) unsigned)
BEGIN 
CASE vaccion WHEN 1 THEN  
	INSERT INTO descuentoproductos VALUES(null,vidproducto,vdescuento);
SELECT @@identity;
INSERT INTO log values(null,0,1,'',vidusuario,now());  
WHEN 2 THEN  
	UPDATE descuentoproductos SET idproducto = vidproducto,descuento = vdescuento
WHERE id = vid;
	SELECT vid;
	/*INSERT INTO log values(null,0,2,'',vidusuario,now());*/
WHEN 3 THEN
	SELECT ifnull(if(min(id)-1 = 0,-1,min(id)-1),-1) FROM descuentoproductos INTO @id;  
	UPDATE descuentoproductos set id = @id where id = vid;
	SELECT @id;
	/*INSERT INTO log values(null,0,3,'',vidusuario,now());*/
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantdescuentos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantdescuentos`(vaccion tinyint(2),
viddescuento int(11),vidciclo int(11),vdescuento decimal(6,2) unsigned,vf1 date,vf2 date,
vidfila int,vidtabla int)
BEGIN 
CASE vaccion WHEN 1 THEN  
	INSERT INTO descuentos VALUES(null,vidciclo,vdescuento,vf1,vf2,vidfila,vidtabla);
	SELECT @@identity;
	/*INSERT INTO log values(null,0,1,'',vidusuario,now());*/
WHEN 2 THEN  
	UPDATE descuentos SET idciclo = vidciclo,descuento = vdescuento,
    f1 = vf1, f2 = vf2
WHERE id = viddescuento;
	SELECT vid;
	/*INSERT INTO log values(null,0,2,'',vidusuario,now());*/
WHEN 3 THEN
	SELECT ifnull(if(min(id)-1 = 0,-1,min(id)-1),-1) FROM descuentos INTO @id;  
	UPDATE descuentos set id = @id,idciclo = 0 where id = viddescuento;
	SELECT @id;
	/*INSERT INTO log values(null,0,3,'',vidusuario,now());*/
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantdetallefacturas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantdetallefacturas`(vaccion tinyint(2),
vid int(11),vidfactura int(11),vidproducto int(11),vidservicio int(11),vidpaquete int(11)
,vcantidad decimal(10,2),
vprecio decimal(10,2),vdesc decimal(10,2))
BEGIN 
declare vtransaccion int default 0;
if vidproducto = 0 then
    set vidproducto = null;
end if;

if vidservicio = 0 then
    set vidservicio = null;
end if;

if vidpaquete = 0 then
    set vidpaquete = null;
end if;

CASE vaccion WHEN 1 THEN 
 
INSERT INTO detallefacturas VALUES(null,vidfactura,vidproducto,vidservicio,
    vidpaquete,vcantidad,vprecio,vdesc);
    
    if vidfactura > 0 then
        UPDATE productos SET cantidad = cantidad - vcantidad WHERE id = vidproducto;
    else
        UPDATE productos SET cantidad = cantidad + vcantidad WHERE id = vidproducto;
    end if;
    
    select vidfactura;

  select idtransaccion from temporalcuentas where idfactura = vidfactura into vtransaccion;
    select vtransaccion;
    update temporalcuentas set subtotal = subtotal - (vprecio*vcantidad) where idfactura = vidfactura limit 1;
    
    if (select subtotal from temporalcuentas where idfactura = vidfactura) = 0 then 
        delete from temporalcuentas where idfactura = vidfactura limit 1;
    end if;
    
    if vidproducto is not null then
        call `sp_mantdetalletransacciones`(1,0,14,vtransaccion,if(vidfactura > 0,0,vprecio*vcantidad),if(vidfactura > 0,vprecio*vcantidad,0),
        0,'Producto Procesado');
    end if;
    
    if vidservicio is not null then
        call `sp_mantdetalletransacciones`(1,0,19,vtransaccion,if(vidfactura > 0,0,vprecio*vcantidad),if(vidfactura > 0,vprecio*vcantidad,0),
        0,'Sevicio Procesado');
    end if;
    
WHEN 2 THEN  
    UPDATE detallefacturas SET idfactura = vidfactura,idproducto = vidproducto,cantidad = vcantidad,precio = vprecio,descuento = vdesc
WHERE id = vid;
    SELECT vid;
WHEN 3 THEN
    SELECT ifnull(min(id),-1)-1 FROM detallefacturas INTO @id;  
    UPDATE detallefacturas set id = @id where id = vid;
    SELECT @id;
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantdetallepaquetes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`%` PROCEDURE `sp_mantdetallepaquetes`(vaccion tinyint(2),vidpaquete int(11),vidproducto int(11),vidservicio int(11),vcantidad int(11),vidusuario int(11),vidsucursal int(3))
BEGIN 
CASE vaccion WHEN 1 THEN  
	SELECT nombre FROM paquetes WHERE id = vidpaquete INTO @paquete;
    SELECT nombre FROM productos WHERE id = vidproducto INTO @producto;
	INSERT INTO detallepaquetes VALUES(vidpaquete,vidproducto,vidservicio,vcantidad);
SELECT @@identity INTO @vid;
INSERT INTO log VALUES(null,59,1,concat('Producto ',@producto,' Agregado a Paquete ',@paquete),vidusuario,now(),vidsucursal); 
SELECT @vid;
WHEN 2 THEN  
	UPDATE detallepaquetes SET idpaquete = vidpaquete,idproducto = vidproducto,idservicio = vidservicio,cantidad = vcantidad
WHERE id = vid;
	SELECT vid;
	INSERT INTO log VALUES(null,59,2,'',vidusuario,now(),vidusucursal);
WHEN 3 THEN 
	UPDATE detallepaquetes SET idpaquete = concat('-',vidpaquete) WHERE idpaquete = vidpaquete;
	INSERT INTO log VALUES(null,59,3,'',vidusuario,now(),vidsucursal);
    SELECT vidpaquete;
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantdetalletelefonos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantdetalletelefonos`(vaccion tinyint(2),vnumero int(12),vidtipotelefonos tinyint(3),vidcliente int(11))
BEGIN 
CASE vaccion WHEN 1 THEN  
	INSERT INTO detalletelefonos VALUES(vnumero,vidtipotelefonos,vidcliente);
SELECT @@identity;
INSERT INTO log values(null,0,1,'',vidusuario,now());  
WHEN 2 THEN  
	UPDATE detalletelefonos SET numero = vnumero,idtipotelefonos = vidtipotelefonos,idcliente = vidcliente
WHERE id = vid;
	SELECT vid;
	INSERT INTO log values(null,0,2,'',vidusuario,now());
WHEN 3 THEN
	SELECT ifnull(min(id),-1)-1 FROM detalletelefonos INTO @id;  
	UPDATE detalletelefonos set id = @id where id = vid;
	SELECT @id;
	INSERT INTO log values(null,0,3,'',vidusuario,now());
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantdetalletransacciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantdetalletransacciones`(vaccion tinyint(2),vid int(11),
vidcuenta int(11),vidtransaccion int(11),vdebe decimal(10,2),vhaber decimal(10,2),vidodt int,vcomentario varchar(100))
BEGIN 
select valor from transacciones t join monedas m on m.id = t.idmoneda and t.id = vidtransaccion into @moneda;
set vdebe = @moneda*vdebe;
set vhaber = @moneda*vhaber;

CASE vaccion WHEN 1 THEN 

    INSERT INTO detalletransacciones VALUES(null,vidcuenta,vidtransaccion,vdebe,vhaber,vidodt,vcomentario);
    
    select substring(numero,1,1) from cuentas where id = vidcuenta into @num;
    select if( @num in(1,4),vdebe - vhaber,vhaber - vdebe) from dual into @valor;
    update cuentas set valor = valor + @valor where id = vidcuenta;
    select idsubcuenta from cuentas where id = vidcuenta into @sub;
    
    while @sub do
        select substring(numero,1,1) from cuentas where id = @sub into @num;
    
        update cuentas set valor = valor + @valor where id = @sub;
        select idsubcuenta from cuentas where id = @sub into @sub;
    end while;
    

WHEN 2 THEN  
    UPDATE detalletransacciones SET idcuenta = vidcuenta,idtransaccion = vidtransaccion,debe = vdebe,haber = vhaber
WHERE id = vid;
    SELECT vid;
    INSERT INTO log values(null,0,2,'',vidusuario,now());
WHEN 3 THEN
    SELECT ifnull(min(id),-1)-1 FROM detalletransacciones INTO @id;  
    UPDATE detalletransacciones set id = @id where id = vid;
    SELECT @id;
    INSERT INTO log values(null,0,3,'',vidusuario,now());
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantfacturas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantfacturas`(vaccion tinyint(2),vid int(11),vidtipoventa tinyint(3),
vidtipo tinyint(3),vidtipopago tinyint(3),vfecha datetime,vidcliente int(11),videstado tinyint(3),visregistrada tinyint(3),
vimv varchar(255),vsubtotal decimal(10,2) unsigned,vdescuento varchar(255),vflete decimal(10,2),
vajuste decimal(10,2),vplazo varchar(45),vcomentario varchar(45),vreferencia varchar(45),vidmoneda tinyint(2),
vidusuario int(11),vidsucursal int(3))
BEGIN

DECLARE sub decimal(10,2);
DECLARE vcuenta int;
DECLARE vporcentaje decimal(5,2);
DECLARE eof tinyint(2) default 0;
DECLARE cur1 cursor for select a.idcuenta,a.porcentaje from defectocuentas a 
left join defectocuentas b on b.idtabla = 2 and a.idfila = vidcliente
where a.vidtipo = vidtipoventa and a.vidtipocuenta = if(vidtipo = 1,1,3) and 
if(b.idcuenta is null,a.bisdefecto,!a.bisdefecto) group by a.idcuenta;
declare continue handler for sqlstate '02000' set eof =1 ; 


CASE vaccion WHEN 1 THEN

if vidtipoventa = 1 then
    set vid = null;
else
    select if(ifnull(min(id)-1,0) = 0,-1,min(id)-1) from facturas into vid;
end if;

    INSERT INTO facturas VALUES(vid,vidtipoventa,vidtipo,vidtipopago,now(),vidcliente,videstado,visregistrada,vimv,vsubtotal,vdescuento,vflete,vajuste,vplazo,vcomentario,vreferencia,vidmoneda,vidusuario);
    select if(vidtipoventa = 1,@@identity,vid) into vid;
    update sucursales set consecutivo = consecutivo+1 where id = vidsucursal;    
    
    INSERT INTO log values(null,64,1,concat(if(vidtipoventa = 1,'Ingreso de Venta','Ingreso de Compra: '),abs(vid)),vidusuario,now(),vidsucursal); 
    
        insert into transacciones values(null,now(),concat('Venta de ',if(vidtipoventa = 1,if(vidtipo = 1,
    'Contado al Cliente: ','Crédito al Cliente'),if(vidtipo = 1,
    'Contado al Proveedor: ','Crédito al Proveedor')),
    (select concat(apellido1,' ',apellido2,' ',nombre) from clientes where id = vidcliente) )
    ,vidusuario,vidsucursal,vidmoneda);
    
    select @@identity into @transaccion;
        
    set @des = vsubtotal*(1+(vimv/100))*(vdescuento/100);
    set @imv = vsubtotal*(vimv/100);
    set sub = vsubtotal*(1+(vimv/100))*(1-(vdescuento/100));
    
    open cur1;
    
    myloop: loop
    fetch cur1 into vcuenta,vporcentaje;
    if eof then
		leave myloop;
    end if;
    
    call `sp_mantdetalletransacciones`(1,0,vcuenta,
        @transaccion,if(vidtipoventa = 1,(sub*(vporcentaje)/100),0),
        if(vidtipoventa = 1,0,(sub*(vporcentaje)/100)),0,'Subtotal Realizado');
	
    end loop myloop;
    
	close cur1;
    set eof = 0;
    
    if vdescuento <> 0 then
        call `sp_mantdetalletransacciones`(1,0,23,@transaccion,if(vidtipoventa = 1,@des,0),if(vidtipoventa = 1,0,@des),
        0,'Descuento Realizado');
    end if;
    
    if vimv <> 0 then
        call `sp_mantdetalletransacciones`(1,0,24,@transaccion,if(vidtipoventa = 1,0,@imv),if(vidtipoventa = 1,@imv,0),
        0,'Impuesto de Venta Realizado');
    end if;
    
    insert into temporalcuentas values(@transaccion,vsubtotal,vid,0);

    select vid;
WHEN 2 THEN  
    UPDATE facturas SET idtipo = vidtipo,idtipopago = vidtipopago,fecha = now(),idcliente = vidcliente,idestado = videstado,isregistrada = visregistrada,imv = vimv,subtotal = vsubtotal,descuento = vdescuento,flete = vflete,ajuste = vajuste,plazo = vplazo,comentario = vcomentario,referencia = vreferencia,idmoneda = vidmoneda,idusuario = vidusuario
WHERE id = vid;
    INSERT INTO log values(null,64,2,concat('Actualización de Factura: ',vid),vidusuario,now(),vidsucursal);
    SELECT vid;
WHEN 3 THEN
    UPDATE facturas set idestado = 3 where id = vid;
    INSERT INTO log values(null,64,3,concat('Factura Anulada: ',vid),vidusuario,now(),vidsucursal);
    SELECT vid;
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantfechafiscal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantfechafiscal`(vfechainicio date,vfechafinal date)
BEGIN 
	update ajustes set valor = vfechainicio where descr = 'fecha_inicio_fiscal' limit 1;
	update ajustes set valor = vfechafinal where descr = 'fecha_final_fiscal' limit 1;
    select 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantimpuestoproductos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantimpuestoproductos`(vaccion tinyint(2),vid int(11),vidproducto int(11),vidimpuesto tinyint(2))
BEGIN 
CASE vaccion WHEN 1 THEN  
	INSERT INTO impuestoproductos VALUES(null,vidproducto,vidimpuesto);
	SELECT @@identity;
	/*INSERT INTO log values(null,0,1,'',vidusuario,now());*/
WHEN 2 THEN  
	UPDATE impuestoproductos SET idproducto = vidproducto,idimpuesto = vidimpuesto
WHERE id = vid;
	SELECT vid;
	/*INSERT INTO log values(null,0,2,'',vidusuario,now());*/
WHEN 3 THEN
	SELECT ifnull(if(min(id)-1 = 0,-1,min(id)-1),-1) FROM impuestoproductos INTO @id;  
	UPDATE impuestoproductos set id = @id where id = vid;
	SELECT @id;
	/*INSERT INTO log values(null,0,3,'',vidusuario,now());*/
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantimpuestos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantimpuestos`(vaccion tinyint(2),vid tinyint(2),vnombre varchar(45),vvalor double)
BEGIN 

CASE vaccion WHEN 1 THEN  
	insert into impuestos values (null,vnombre,vvalor);
WHEN 2 THEN
	update impuestos set valor = vvalor where id = vid;
    select vid;
	select 1;
WHEN 3 THEN
	select min(id)-1 from impuestos into @id;
    update impuestos set id = @id where id = vid;
    select @id;
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantjerarquia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantjerarquia`(vaccion tinyint(2),vidtipo tinyint(2), vid int(11),vnombre varchar(45),vidreferencia int(11),vidreferencia2 int(11),vidusuario int(11),vidsucursal tinyint(3))
begin

case vaccion when 1 then
if vidtipo = 1 then
insert into familias values(null,vnombre,vidusuario);
select @@identity into @vid;
insert into log values(null,0,1,concat('Familia: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

elseif vidtipo = 2 then
insert into tipos values(null,vnombre,vidreferencia,vidusuario);
select @@identity into @vid;
insert into log values(null,0,1,concat('Tipo: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

elseif vidtipo = 3 then
insert into marcas values(null,vnombre,vidusuario);
select @@identity into @vid;
insert into log values(null,0,1,concat('Marca: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

else 
insert into modelos values(null,vidreferencia,vidreferencia2,vnombre,vidusuario);
select @@identity into @vid;
insert into log values(null,0,1,concat('Modelo: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

end if;

when 2 then
if vidtipo = 1 then
update familias set nombre = vnombre where id = vid;
select @@identity into @vid;
insert into log values(null,0,2,concat('Familia: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

elseif vidtipo = 2 then
update tipos set nombre = vnombre where id = vid;
select @@identity into @vid;
insert into log values(null,0,2,concat('Tipo: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

elseif vidtipo = 3 then
update marcas set nombre = vnombre where id = vid;
select @@identity into @vid;
insert into log values(null,0,2,concat('Marca: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

else
update modelos set nombre = vnombre where id = vid;
select @@identity into @vid;
insert into log values(null,0,2,concat('Modelo: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

end if;

when 3 then
if vidtipo = 1 then
select ifnull(if(min(id)-1 <> 0,0,min(id)-1),0) from familias into @id;
update familias set id = @id where id = vid;
select @@identity into @vid;
insert into log values(null,0,3,concat('Familia: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

elseif vidtipo = 2 then
select ifnull(if(min(id)-1 <> 0,0,min(id)-1),0) from tipos into @id;
update tipos set id = @id where id = vid;
select @@identity into @vid;
insert into log values(null,0,3,concat('Tipo: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

elseif vidtipo = 3 then
select ifnull(if(min(id)-1 <> 0,0,min(id)-1),0) from marcas into @id;
update marcas set id = @id where id = vid;
select @@identity into @vid;
insert into log values(null,0,3,concat('Marca: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

else
select ifnull(if(min(id)-1 <> 0,0,min(id)-1),0) from modelos into @id;
update modelos set id = @id where id = vid;
select @@identity into @vid;
insert into log values(null,0,3,concat('Modelo: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;

end if;
end case ;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantpaquetes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`%` PROCEDURE `sp_mantpaquetes`(vaccion tinyint(2),vid int(11),vcodigo varchar(10),vnombre varchar(64),vdescuento decimal(10,2),vtotal decimal(10,2),vidusuario int(11),vidsucursal int(3))
BEGIN 
CASE vaccion WHEN 1 THEN  
	INSERT INTO paquetes VALUES(null,vcodigo,vnombre,vdescuento,vtotal);
SELECT @@identity INTO @vid;
INSERT INTO log VALUES(null,58,1,concat('Ingreso Paquete Nuevo: ',vnombre),vidusuario,now(),vidsucursal);
select @vid;
WHEN 2 THEN  
	UPDATE paquetes SET codigo = vcodigo,nombre = vnombre,descuento = vdescuento,total = vtotal
WHERE id = vid;
	INSERT INTO log VALUES(null,58,2,concat('Actualización Paquete: ',vnombre),vidusuario,now(),vidsucursal);
    SELECT vid;
WHEN 3 THEN
	SELECT ifnull(min(id),-1)-1 FROM paquetes INTO @id;  
	UPDATE paquetes set id = @id where id = vid;
	INSERT INTO log VALUES(null,58,3,concat('Paquete Eliminado: ',vnombre),vidusuario,now(),vidsucursal);
    SELECT @id;
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantproductos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantproductos`(vaccion tinyint(2),vid int(11),vcodigo varchar(45),
vnombre varchar(45),vcosto decimal(10,2),vganancia decimal(5,2),vventa decimal(10,2),
vidunidad tinyint(3),vcantidad decimal(10,2),vminimo int(9),vmaximo int(9),vmaxdescuento decimal(6,2) unsigned,
vidmodelo int(11),vidusuario varchar(45),vidsucursal int(11))
BEGIN

IF (select count(id) from productos where codigo = vcodigo and id > 0) > 0 and vaccion = 1 THEN 
	 SET @msj = concat('Código de Producto \'',vcodigo,'\' Existente');
     SIGNAL SQLSTATE '45000'
     SET MESSAGE_TEXT = @msj;
END IF;

IF (select count(id) from productos where nombre = vnombre and id > 0) > 0 and vaccion = 1 THEN 
	 SET @msj = concat('Nombre de Producto \'',vnombre,'\' Existente');
     SIGNAL SQLSTATE '45000'
     SET MESSAGE_TEXT = @msj;
END IF;

select id from monedas where principal = 1 into @vidmoneda;

CASE vaccion WHEN 1 THEN
	INSERT INTO productos VALUES(null,vcodigo,vnombre,vcosto,vganancia,vventa,vidunidad,vcantidad,vminimo,vmaximo,
    vmaxdescuento,now(),vidmodelo,vidusuario,@vidmoneda,0,vidsucursal);
	SELECT @@identity into @id;
	INSERT INTO log values(null,11,1,concat('Producto Nuevo: ',vnombre),vidusuario,now(),vidsucursal);
	select @id;
WHEN 2 THEN
	UPDATE productos SET codigo = vcodigo,nombre = vnombre,costo = vcosto,ganancia = vganancia,venta = vventa,
    idunidad = vidunidad,cantidad = vcantidad,minimo = vminimo,maximo = vmaximo,maxdescuento = vmaxdescuento,
    idmodelo = vidmodelo,idusuario = vidusuario
WHERE id = vid;
	INSERT INTO log values(null,11,2,concat('Actualización Producto: ',vnombre),vidusuario,now(),vidsucursal);
    SELECT vid;
WHEN 3 THEN
	SELECT ifnull(min(id),-1)-1 FROM productos INTO @id;
	UPDATE productos set id = @id where id = vid;
	INSERT INTO log values(null,11,3,concat('Producto Eliminado ',vnombre),vidusuario,now(),vidsucursal);
    SELECT @id;
END CASE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantservicios` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantservicios`(vaccion tinyint(2),vid int(11),vnombre varchar(45),
vdescripcion varchar(100),vpbase decimal(10,2),vperiodo int(3) unsigned,vidproveedor int(11),vpcompra decimal(10,2),
vpganancia decimal(6,2),vfcreacion datetime,vidusuario varchar(45),vidmoneda tinyint(2))
BEGIN 
CASE vaccion WHEN 1 THEN  
	INSERT INTO servicios VALUES(null,vnombre,vdescripcion,vpbase,vperiodo,vidproveedor,vpcompra,vpganancia,now(),vidusuario,
    vidmoneda);
SELECT @@identity;
INSERT INTO log values(null,16,1,concat('Registro: ',vnombre),vidusuario,now());  
WHEN 2 THEN  
	UPDATE servicios SET nombre = vnombre,descripcion = vdescripcion,pbase = vpbase,periodo = vperiodo,
    idproveedor = vidproveedor,pcompra = vpcompra,pganancia = vpganancia,fcreacion = now(),
    idusuario = vidusuario,idmoneda = vidmoneda
WHERE id = vid;
	SELECT vid;
	INSERT INTO log values(null,0,2,'',vidusuario,now());
WHEN 3 THEN
	SELECT ifnull(min(id),-1)-1 FROM servicios INTO @id;  
	UPDATE servicios set id = @id where id = vid;
	SELECT @id;
	INSERT INTO log values(null,0,3,'',vidusuario,now());
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantsucursales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`%` PROCEDURE `sp_mantsucursales`(vaccion tinyint(2),vid int(3),vnombre varchar(45),vtelefono int(11),vidusuario int(11),vfactura varchar(5),vconsecutivo int(11),vidcanton int(3),vidsucursal int(3))
BEGIN 

CASE vaccion WHEN 1 THEN  
	INSERT INTO sucursales VALUES(null,vnombre,vtelefono,vidusuario,'AA',vconsecutivo,vidcanton);
	SELECT @@identity INTO @vid;
    SELECT upper(concat(substring(c.nombre,1,1),CHAR(96+count(c.id)))) AS identificador FROM cantones c
	JOIN sucursales s ON s.idcanton = c.id WHERE s.idcanton = vidcanton
	GROUP BY c.id INTO @vfactura;
    UPDATE sucursales set factura = @vfactura where id = @vid;
	INSERT INTO log values(null,0,1,'',vidusuario,now(),vidsucursal);
    SELECT @vid;
WHEN 2 THEN  
	UPDATE sucursales SET nombre = vnombre,telefono = vtelefono,idusuario = vidusuario,factura = vfactura,consecutivo = vconsecutivo,idcanton = vidcanton
WHERE id = vid;
	INSERT INTO log values(null,0,2,'',vidusuario,now(),vidsucursal);
	SELECT vid;
WHEN 3 THEN
	SELECT ifnull(min(id),-1)-1 FROM sucursales INTO @vid;  
	UPDATE sucursales set id = @vid where id = vid;
	INSERT INTO log values(null,0,3,'',vidusuario,now(),vidsucursal);
    SELECT @vid;
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_manttelefonos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_manttelefonos`(vaccion tinyint(2),vcasa varchar(45),vtrabajo varchar(45),
vmovil varchar(45),vidfila int(11),vidtabla int(11))
BEGIN 
CASE vaccion WHEN 1 THEN  
    INSERT INTO telefonos VALUES(vcasa,vtrabajo,vmovil,vidtabla,vidfila);
    SELECT vidfila;
WHEN 2 THEN  
    UPDATE telefonos SET casa = vcasa,trabajo = vtrabajo,movil = vmovil
where idtabla = vidtabla and idfila = vidfila;
    SELECT vidfila;
WHEN 3 THEN
    delete from telefonos where idtabla = vidtabla and idfila = vidfila;
    SELECT vidfila;

END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_manttransacciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_manttransacciones`(vaccion tinyint(2),vid int(11),vfecha datetime,vdescripcion varchar(100),vidusuario int(11),vidempresa int(11),vidmoneda int(11))
BEGIN 
CASE vaccion WHEN 1 THEN  
	INSERT INTO transacciones VALUES(null,now(),vdescripcion,vidusuario,vidempresa,vidmoneda);
	SELECT @@identity;
/*INSERT INTO log values(null,0,1,'',vidusuario,now());  */
WHEN 2 THEN  
	UPDATE transacciones SET fecha = now(),descripcion = vdescripcion,idusuario = vidusuario,idempresa = vidempresa,idmoneda = vidmoneda
WHERE id = vid;
	SELECT vid;
	INSERT INTO log values(null,0,2,'',vidusuario,now());
WHEN 3 THEN
	SELECT ifnull(min(id),-1)-1 FROM transacciones INTO @id;  
	UPDATE transacciones set id = @id where id = vid;
	SELECT @id;
	INSERT INTO log values(null,0,3,'',vidusuario,now());
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantubicaciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantubicaciones`(vaccion tinyint(2),viddistrito int(11),vdireccion varchar(100),vlatitud decimal(8,4),vlongitud decimal(8,4),
vidfila int,vidtabla int)
BEGIN 
CASE vaccion WHEN 1 THEN  
	INSERT INTO ubicaciones VALUES(viddistrito,vdireccion,vlatitud,vlongitud,vidtabla,vidfila);
	SELECT vidfila;
WHEN 2 THEN  
	UPDATE ubicaciones SET iddistrito = viddistrito,direccion = vdireccion,latitud = vlatitud,longitud = vlongitud
	WHERE id = vid;
	SELECT vidfila;
	
WHEN 3 THEN
	DELETE FROM ubicaciones where idfila = vidfila and idtabla = vidtabla;
	SELECT vidfila;
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_mantusuarios` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_mantusuarios`(vaccion tinyint(2),vid int(11),vuser varchar(64),vidTipoUsuario int(3) unsigned,vnombre varchar(100),
vclave varchar(100),vcedula varchar(25),vmail varchar(64),vbcambioPSSW tinyint(2) unsigned,vcodigo varchar(8),vlimite time,vlimite2 time,
vidsucursal int(3),vidusuario int(11))
BEGIN 

set vcedula = replace(vcedula,'-','');

   IF (select count(user) from usuarios where user = vuser and id > 0) > 0 and vaccion = 1 THEN 
 SET @msj = concat('Usuario \'',vuser,'\' Existente');
     SIGNAL SQLSTATE '45000'
     SET MESSAGE_TEXT = @msj;
   END IF; 
  
  IF (select count(id) from usuarios where cedula = vcedula and id > 0) > 0 and vaccion = 1 THEN 
 SET @msj = concat('Cédula \'',vcedula,'\' Existente');
     SIGNAL SQLSTATE '45000'
     SET MESSAGE_TEXT = @msj;
   END IF; 

CASE vaccion WHEN 1 THEN  
	INSERT INTO usuarios VALUES(null,vuser,vidTipoUsuario,vnombre,aes_encrypt(vclave,'lt2016'),vcedula,vmail,0,null,vlimite,vlimite2,vidsucursal);
	SELECT @@identity into @vid; 
	INSERT INTO log values(null,1,1,vid,vidusuario,now(),vidsucursal);
	select @vid;
WHEN 2 THEN
	
	UPDATE usuarios SET user = vuser,idTipoUsuario = vidTipoUsuario,nombre = vnombre,
    clave = aes_encrypt(vclave,'lt2016'),cedula = vcedula,mail = vmail,
    bcambioPSSW = vbcambioPSSW,codigo = vcodigo,limite1 = vlimite,limite2 = vlimite2
	WHERE id = vid;
	INSERT INTO log values(null,1,2,vid,vidusuario,now(),vidsucursal);
	SELECT vid;
WHEN 3 THEN
	select ifnull(min(id),0)-1 from usuarios where id < 0 into @nid;
	UPDATE usuarios set id = @nid where id = vid;
	INSERT INTO log values(null,1,1,vid,vidusuario,now(),vidsucursal);
	SELECT vid;
END CASE; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_proveedores` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`itech01`@`localhost` PROCEDURE `sp_proveedores`(vid int)
BEGIN
SELECT c.id as vid, c.cedula as vcedula,
c.nombre as vnombre, c.apellido1 as vapellido1, c.apellido2 as vapellido2, c.bisnacional as vbisnacional, t.trabajo as vtrabajo,
t.casa as vcasa, t.movil as vmovil, m.correo1 as vcorreo1, m.correo2 as vcorreo2, c.web as vweb, c.idtipocliente as vidtipocliente,
c.idestado as vestado, c.credito as vcredito, c.plazo as vplazo, c.idestadocontable as videstadocontable,
c.fecha_creacion as vfechacreacion, c.idusuario as vidsuario
FROM clientes c
JOIN telefonos t ON c.id = t.idfila
JOIN correos m ON c.id = m.idfila
WHERE bisproveedor = 1 AND c.id = vid
GROUP BY c.id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_searchCuenta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_searchCuenta`(vvariable varchar(20),vfiltro tinyint(2) unsigned)
begin

SELECT 
        RPAD(`cuentas`.`numero`, 10, 0) AS `Cuenta`,
        `cuentas`.`nombre` AS `nombre`,
        if(valor < 0,concat('(',FORMAT(`cuentas`.`valor`, 2),')'),FORMAT(`cuentas`.`valor`, 2)) AS `Valor`,
        id as id
    FROM
        `cuentas`
    WHERE
        !ispadre and if(vfiltro = 1,(numero = vvariable or nombre like concat('%',vvariable,'%')),
        case vfiltro when 2 then valor = vvariable when 3 then valor >= vvariable else valor <= vvariable end)
    ORDER BY `cuentas`.`numero`;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `v_clientes`
--

/*!50001 DROP TABLE IF EXISTS `v_clientes`*/;
/*!50001 DROP VIEW IF EXISTS `v_clientes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_clientes` AS select `c`.`id` AS `vid`,`c`.`cedula` AS `vcedula`,trim(concat(`c`.`nombre`,' ',`c`.`apellido1`,' ',`c`.`apellido2`)) AS `nombre`,`c`.`bisnacional` AS `bisnacional`,concat(`t`.`trabajo`,' | ',`t`.`casa`,' | ',`t`.`movil`) AS `telefonos`,`o`.`correo1` AS `correos`,`tc`.`nombre` AS `tipocliente`,`ec`.`nombre` AS `estado`,`c`.`credito` AS `credito`,`c`.`plazo` AS `plazo`,`c`.`idestadocontable` AS `idconta`,`c`.`fecha_creacion` AS `fecha_creacion`,`c`.`idusuario` AS `idusuario`,`c`.`descuentop` AS `descuentop`,`c`.`descuentom` AS `descuentom`,`tc`.`id` AS `idtipocliente`,`ec`.`id` AS `idestado`,ifnull(`nc`.`id`,0) AS `idnivel`,ifnull(`nc`.`nombre`,'Standard') AS `nivel`,`c`.`web` AS `web` from ((((((`clientes` `c` join `tipoclientes` `tc` on((`tc`.`id` = `c`.`idtipocliente`))) join `estadoclientes` `ec` on((`ec`.`id` = `c`.`idestado`))) left join `nivelesclientes` `nc` on((`nc`.`id` = `c`.`idnivel`))) join `telefonos` `t` on(((`t`.`idfila` = `c`.`id`) and (`t`.`idtabla` = 2)))) join `ubicaciones` `u` on(((`u`.`idfila` = `c`.`id`) and (`u`.`idtabla` = 2)))) join `correos` `o` on(((`o`.`idfila` = `c`.`id`) and (`o`.`idtabla` = 2)))) where (`c`.`bisproveedor` = 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_cuentas`
--

/*!50001 DROP TABLE IF EXISTS `v_cuentas`*/;
/*!50001 DROP VIEW IF EXISTS `v_cuentas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`10.50.13.%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_cuentas` AS select rpad(`cuentas`.`numero`,10,0) AS `Cuenta`,`cuentas`.`nombre` AS `nombre`,if((`cuentas`.`valor` < 0),concat('(',format((`cuentas`.`valor` * -(1)),2),')'),format(`cuentas`.`valor`,2)) AS `Valor`,`cuentas`.`id` AS `id` from `cuentas` where (`cuentas`.`ispadre` = 0) order by `cuentas`.`numero` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_datosempresa`
--

/*!50001 DROP TABLE IF EXISTS `v_datosempresa`*/;
/*!50001 DROP VIEW IF EXISTS `v_datosempresa`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`10.50.13.%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_datosempresa` AS select 1 AS `valor` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_detallefacturas`
--

/*!50001 DROP TABLE IF EXISTS `v_detallefacturas`*/;
/*!50001 DROP VIEW IF EXISTS `v_detallefacturas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`10.50.13.%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_detallefacturas` AS select `d`.`id` AS `id`,`d`.`idfactura` AS `idfactura`,(case when (isnull(`d`.`idservicio`) and isnull(`d`.`idpaquete`)) then `d`.`idproducto` when (isnull(`d`.`idproducto`) and isnull(`d`.`idpaquete`)) then `d`.`idservicio` else `d`.`idpaquete` end) AS `idproducto`,(case when (isnull(`d`.`idservicio`) and isnull(`d`.`idpaquete`)) then `p`.`nombre` when (isnull(`d`.`idproducto`) and isnull(`d`.`idpaquete`)) then `s`.`nombre` else `q`.`nombre` end) AS `nombreproducto`,(case when (isnull(`d`.`idservicio`) and isnull(`d`.`idpaquete`)) then `p`.`codigo` when (isnull(`d`.`idproducto`) and isnull(`d`.`idpaquete`)) then `s`.`codigo` else `q`.`codigo` end) AS `codigoproducto`,replace(`d`.`cantidad`,'.00','') AS `cantidad`,`d`.`precio` AS `precio`,`d`.`descuento` AS `descuento`,truncate((`d`.`cantidad` * `d`.`precio`),2) AS `total`,format((`d`.`cantidad` * `d`.`precio`),2) AS `ftotal`,truncate(((`d`.`cantidad` * `d`.`precio`) / ((`d`.`descuento` / 100) + 1)),2) AS `totaldesc`,format(((`d`.`cantidad` * `d`.`precio`) / ((`d`.`descuento` / 100) + 1)),2) AS `ftotaldesc` from (((`detallefacturas` `d` left join `productos` `p` on((`p`.`id` = `d`.`idproducto`))) left join `servicios` `s` on((`s`.`id` = `d`.`idservicio`))) left join `paquetes` `q` on((`q`.`id` = `d`.`idpaquete`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_detallepaquetes`
--

/*!50001 DROP TABLE IF EXISTS `v_detallepaquetes`*/;
/*!50001 DROP VIEW IF EXISTS `v_detallepaquetes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_detallepaquetes` AS select `d`.`idpaquete` AS `idpaquete`,`p`.`id` AS `idproducto`,`p`.`nombre` AS `nombre`,`d`.`cantidad` AS `cantidad`,`p`.`venta` AS `venta`,(`p`.`venta` * `d`.`cantidad`) AS `ptotal`,`d`.`idservicio` AS `idservicio` from (`detallepaquetes` `d` join `productos` `p` on((`p`.`id` = `d`.`idproducto`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_facturas`
--

/*!50001 DROP TABLE IF EXISTS `v_facturas`*/;
/*!50001 DROP VIEW IF EXISTS `v_facturas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`10.50.13.%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_facturas` AS select `f`.`id` AS `idfactura`,`t`.`id` AS `idtipofactura`,`t`.`nombre` AS `tipofactura`,`p`.`id` AS `idtipopago`,`p`.`nombre` AS `tipopago`,date_format(`f`.`fecha`,'%Y-%m-%d') AS `fecha`,`c`.`id` AS `idcliente`,concat(`c`.`nombre`,' ',`c`.`apellido1`,' ',`c`.`apellido2`) AS `cliente`,`e`.`id` AS `idestado`,`e`.`nombre` AS `estadofactura`,`f`.`isregistrada` AS `isregistrada`,`f`.`imv` AS `imv`,`f`.`descuento` AS `descuento`,format(((`f`.`subtotal` * ((`f`.`imv` / 100) + 1)) / ((`f`.`descuento` / 100) + 1)),2) AS `tdescuento`,`f`.`flete` AS `flete`,`f`.`ajuste` AS `ajuste`,`f`.`subtotal` AS `subtotal`,format(`f`.`subtotal`,2) AS `fsubtotal`,replace(format(((((`f`.`subtotal` * ((`f`.`imv` / 100) + 1)) / ((`f`.`descuento` / 100) + 1)) + `f`.`flete`) + `f`.`ajuste`),2),',','') AS `total`,format(((((`f`.`subtotal` * ((`f`.`imv` / 100) + 1)) / ((`f`.`descuento` / 100) + 1)) + `f`.`flete`) + `f`.`ajuste`),2) AS `ftotal`,`f`.`plazo` AS `plazo`,ifnull('N/A',`f`.`comentario`) AS `comentario`,`f`.`referencia` AS `referencia`,`m`.`id` AS `idmoneda`,`m`.`nombre` AS `moneda`,`m`.`simbolo` AS `simbolo`,`u`.`id` AS `idusuario`,`u`.`nombre` AS `usuario` from ((((((`facturas` `f` join `tipofacturas` `t` on((`t`.`id` = `f`.`idtipo`))) join `tipopagos` `p` on((`p`.`id` = `f`.`idtipopago`))) join `clientes` `c` on((`c`.`id` = `f`.`idcliente`))) join `estadofacturas` `e` on((`e`.`id` = `f`.`idestado`))) join `monedas` `m` on((`m`.`id` = `f`.`idmoneda`))) join `usuarios` `u` on((`u`.`id` = `f`.`idusuario`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_impuestoproductos`
--

/*!50001 DROP TABLE IF EXISTS `v_impuestoproductos`*/;
/*!50001 DROP VIEW IF EXISTS `v_impuestoproductos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`10.50.13.%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_impuestoproductos` AS select `di`.`id` AS `id`,`di`.`idfila` AS `idproducto`,`di`.`idtabla` AS `idtabla`,`t`.`nombre` AS `tabla`,`di`.`idimpuesto` AS `idimpuesto`,`i`.`nombre` AS `impuesto`,`i`.`valor` AS `valor`,`di`.`exoneracion` AS `exoneracion` from ((`defectoimpuestos` `di` join `tablas` `t` on((`di`.`idtabla` = `t`.`id`))) join `impuestos` `i` on((`di`.`idimpuesto` = `i`.`id`))) where (`di`.`idtabla` = 11) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_invcontable`
--

/*!50001 DROP TABLE IF EXISTS `v_invcontable`*/;
/*!50001 DROP VIEW IF EXISTS `v_invcontable`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`itech01`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_invcontable` AS select `i`.`id` AS `id`,`p`.`codigo` AS `codigo`,`p`.`nombre` AS `nombre`,`i`.`cantidad` AS `cantidad`,`c`.`nombre` AS `cuenta`,`i`.`fecha` AS `fecha` from ((`invcontable` `i` join `productos` `p` on((`i`.`idproducto` = `p`.`id`))) join `cuentas` `c` on((`p`.`idcuenta` = `c`.`id`))) where (`p`.`id` > 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_invinsumos`
--

/*!50001 DROP TABLE IF EXISTS `v_invinsumos`*/;
/*!50001 DROP VIEW IF EXISTS `v_invinsumos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`10.50.13.%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_invinsumos` AS select `i`.`id` AS `id`,`p`.`codigo` AS `codigo`,`p`.`nombre` AS `nombre`,`i`.`cantidad` AS `cantidad`,`i`.`precio` AS `precio`,`i`.`fecha` AS `fecha`,`i`.`detalle` AS `detalle` from (`invinsumos` `i` join `productos` `p` on((`i`.`idproducto` = `p`.`id`))) where (`p`.`id` > 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_logusuarios`
--

/*!50001 DROP TABLE IF EXISTS `v_logusuarios`*/;
/*!50001 DROP VIEW IF EXISTS `v_logusuarios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`itech01`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_logusuarios` AS select `u`.`nombre` AS `Usuario`,concat(`a`.`nombre`,if((`l`.`idtabla` <> 0),' en el Módulo:',' al '),`t`.`nombre`) AS `accion`,`l`.`descripcion` AS `descripcion`,ucase(date_format(`l`.`fecha`,'%d de %b del %Y a las %h:%i:%s %p')) AS `Fecha`,date_format(`l`.`fecha`,'%Y-%m-%d') AS `f1`,`u`.`id` AS `id_user` from (((`log` `l` join `usuarios` `u` on((convert(`u`.`id` using utf8) = convert(`l`.`usuario` using utf8)))) join `tablas` `t` on((`t`.`id` = `l`.`idtabla`))) join `tipoacciones` `a` on((`a`.`id` = `l`.`idaccion`))) order by date_format(`l`.`fecha`,'%Y-%m-%d') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_permisostipos`
--

/*!50001 DROP TABLE IF EXISTS `v_permisostipos`*/;
/*!50001 DROP VIEW IF EXISTS `v_permisostipos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`itech01`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_permisostipos` AS select `p`.`idtipoUsuario` AS `id_tipo`,`s`.`id` AS `idcodigo`,`s`.`nombre` AS `nombre`,`p`.`tipo` AS `permiso`,(case `p`.`tipo` when 1 then 'Habilitado' when 2 then 'Deshabilitado' when 3 then 'Invisible' end) AS `nombre_permiso`,`p`.`id` AS `id` from (`permisostipousuario` `p` join `permisos` `s` on((`p`.`idpermiso` = `s`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_permisosusuario`
--

/*!50001 DROP TABLE IF EXISTS `v_permisosusuario`*/;
/*!50001 DROP VIEW IF EXISTS `v_permisosusuario`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`itech01`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_permisosusuario` AS select `p`.`idusuario` AS `id_user`,`s`.`id` AS `idcodigo`,`s`.`nombre` AS `nombre`,`p`.`tipo` AS `permiso`,(case `p`.`tipo` when 1 then 'Habilitado' when 2 then 'Deshabilitado' when 3 then 'Invisible' end) AS `nombre_permiso`,`p`.`id` AS `id` from (`permisosusuarios` `p` join `permisos` `s` on((`p`.`idpermiso` = `s`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_permisosusuarios`
--

/*!50001 DROP TABLE IF EXISTS `v_permisosusuarios`*/;
/*!50001 DROP VIEW IF EXISTS `v_permisosusuarios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`itech01`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_permisosusuarios` AS select `pu`.`idusuario` AS `idUsuario`,`p`.`id` AS `idcodigo`,`pu`.`tipo` AS `permiso` from (`permisosusuarios` `pu` join `permisos` `p` on((`p`.`id` = `pu`.`idpermiso`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_productos`
--

/*!50001 DROP TABLE IF EXISTS `v_productos`*/;
/*!50001 DROP VIEW IF EXISTS `v_productos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`itech01`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_productos` AS select `p`.`id` AS `id`,`p`.`codigo` AS `codigo`,`p`.`nombre` AS `nombre`,`p`.`costo` AS `costo`,concat('¢ ',format(`p`.`costo`,2)) AS `scosto`,format(`p`.`costo`,2) AS `fcosto`,`p`.`ganancia` AS `ganancia`,concat(replace(`p`.`ganancia`,'.00',''),'%') AS `sganancia`,`p`.`venta` AS `venta`,concat('¢ ',format(`p`.`venta`,2)) AS `sventa`,format(`p`.`venta`,2) AS `fventa`,`u`.`id` AS `idunidad`,`u`.`nombre` AS `nombreunidad`,`u`.`simbolo` AS `simbolo`,`p`.`cantidad` AS `cantidad`,`p`.`minimo` AS `minimo`,`p`.`maximo` AS `maximo`,replace(`p`.`maxdescuento`,'.00','') AS `maxdescuento`,concat(replace(`p`.`maxdescuento`,'.00',''),'%') AS `smaxdescuento`,date_format(`p`.`fechacreacion`,'%d-%m-%Y') AS `fecha`,`f`.`id` AS `idfamilia`,`f`.`nombre` AS `familia`,`t`.`id` AS `idtipo`,`t`.`nombre` AS `tipo`,`a`.`id` AS `idmarca`,`a`.`nombre` AS `marca`,`m`.`id` AS `idmodelo`,`m`.`nombre` AS `modelo`,`s`.`id` AS `idusuario`,`s`.`nombre` AS `usuario`,`o`.`id` AS `idmoneda`,`o`.`nombre` AS `moneda`,`p`.`idcuenta` AS `idcuenta`,`c`.`id` AS `idsucursal`,`c`.`nombre` AS `sucursal` from ((((((((`productos` `p` join `unidades` `u` on((`p`.`idunidad` = `u`.`id`))) join `modelos` `m` on((`p`.`idmodelo` = `m`.`id`))) join `marcas` `a` on((`m`.`idmarca` = `a`.`id`))) join `tipos` `t` on((`m`.`idtipo` = `t`.`id`))) join `familias` `f` on((`t`.`idfamilia` = `f`.`id`))) join `usuarios` `s` on((`p`.`idusuario` = `s`.`id`))) join `monedas` `o` on((`p`.`idmoneda` = `o`.`id`))) join `sucursales` `c` on((`p`.`idsucursal` = `c`.`id`))) order by `p`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_productosservicios`
--

/*!50001 DROP TABLE IF EXISTS `v_productosservicios`*/;
/*!50001 DROP VIEW IF EXISTS `v_productosservicios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`10.50.13.%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_productosservicios` AS (select `productos`.`id` AS `id`,`productos`.`codigo` AS `codigo`,`productos`.`nombre` AS `nombre`,concat(`productos`.`nombre`,' - ','¢ ',format(`productos`.`venta`,2)) AS `nombreprecio`,`productos`.`venta` AS `precio` from `productos`) union (select `servicios`.`id` AS `id`,`servicios`.`codigo` AS `codigo`,`servicios`.`nombre` AS `nombre`,concat('[SERV] ',`servicios`.`nombre`,' - ','¢ ',format(`servicios`.`pbase`,2)) AS `nombreprecio`,`servicios`.`pbase` AS `precio` from `servicios`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_proveedores`
--

/*!50001 DROP TABLE IF EXISTS `v_proveedores`*/;
/*!50001 DROP VIEW IF EXISTS `v_proveedores`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`itech01`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_proveedores` AS select `c`.`id` AS `vid`,`c`.`cedula` AS `vcedula`,concat(`c`.`nombre`,' ',`c`.`apellido1`,' ',`c`.`apellido2`) AS `vnombre`,`c`.`bisnacional` AS `vbisnacional`,concat(`t`.`trabajo`,' | ',`t`.`casa`,' | ',`t`.`movil`) AS `vtelefonos`,concat(`m`.`correo1`,' | ',`m`.`correo2`) AS `vcorreos`,`c`.`web` AS `vweb`,`c`.`idtipocliente` AS `vidtipocliente`,`c`.`idestado` AS `vestado`,`c`.`credito` AS `vcredito`,`c`.`plazo` AS `vplazo`,`c`.`idestadocontable` AS `videstadocontable`,`c`.`fecha_creacion` AS `vfechacreacion`,`c`.`idusuario` AS `vidsuario` from ((`clientes` `c` join `telefonos` `t` on((`c`.`id` = `t`.`idfila`))) join `correos` `m` on((`c`.`id` = `m`.`idfila`))) where (`c`.`bisproveedor` = 1) group by `c`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_servicios`
--

/*!50001 DROP TABLE IF EXISTS `v_servicios`*/;
/*!50001 DROP VIEW IF EXISTS `v_servicios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`itech01`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_servicios` AS select `s`.`id` AS `codigo`,`s`.`nombre` AS `nombre`,concat('¢ ',format(`s`.`pbase`,2)) AS `precio`,(case `s`.`periodo` when 0 then 'Ocacional' when 1 then 'Diario' when 7 then 'Semanal' when 15 then 'Quincenal' when 30 then 'Mensual' when 90 then 'Trimestral' when 180 then 'Semestral' when 365 then 'Anual' else concat(`s`.`periodo`,' días') end) AS `periodo`,if((`s`.`idproveedor` = 0),'N/A',concat(`c`.`nombre`,' ',`c`.`apellido1`,' ',`c`.`apellido2`)) AS `outsourcing` from (`servicios` `s` left join `clientes` `c` on(((`c`.`id` = `s`.`idproveedor`) and (`c`.`bisproveedor` <> 0)))) where (`s`.`id` > 0) order by `s`.`nombre` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_serviciosfact`
--

/*!50001 DROP TABLE IF EXISTS `v_serviciosfact`*/;
/*!50001 DROP VIEW IF EXISTS `v_serviciosfact`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`10.50.13.%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_serviciosfact` AS (select `servicios`.`id` AS `vid`,concat('S-',`servicios`.`id`) AS `vcodigo`,concat('[SERV] ',`servicios`.`nombre`) AS `vnombre`,format(`servicios`.`pbase`,2) AS `vprecio`,'∞' AS `vcantidad`,concat('S-',`servicios`.`id`) AS `vhcodigo` from `servicios` where (`servicios`.`id` > 0)) union (select `productos`.`id` AS `vid`,`productos`.`codigo` AS `vcodigo`,`productos`.`nombre` AS `vnombre`,format(`productos`.`venta`,2) AS `vprecio`,truncate(`productos`.`cantidad`,0) AS `vcantidad`,`productos`.`codigo` AS `vhcodigo` from `productos` where (`productos`.`id` > 0)) union (select `paquetes`.`id` AS `vid`,concat('P-',`paquetes`.`id`) AS `vcodigo`,concat('[PCK] ',`paquetes`.`nombre`) AS `vnombre`,format((`paquetes`.`total` / ((`paquetes`.`descuento` / 100) + 1)),2) AS `vprecio`,'∞' AS `vcantidad`,concat('P+',`paquetes`.`id`) AS `vhcodigo` from `paquetes` where (`paquetes`.`id` > 0)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_unidad`
--

/*!50001 DROP TABLE IF EXISTS `v_unidad`*/;
/*!50001 DROP VIEW IF EXISTS `v_unidad`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`itech01`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_unidad` AS select `unidades`.`id` AS `idunidad`,concat(`unidades`.`nombre`,' (',`unidades`.`simbolo`,')') AS `nombre` from `unidades` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_usuarios`
--

/*!50001 DROP TABLE IF EXISTS `v_usuarios`*/;
/*!50001 DROP VIEW IF EXISTS `v_usuarios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`itech01`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_usuarios` AS select `u`.`id` AS `Id`,`u`.`user` AS `Usuario`,`u`.`nombre` AS `Nombre`,`u`.`cedula` AS `Cedula`,`u`.`mail` AS `Correo`,`t`.`nombre` AS `Tipo Usuario`,aes_decrypt(`u`.`clave`,'lt2015') AS `pssw`,if((`u`.`idTipoUsuario` <> 1),date_format(`u`.`limite1`,'%h:%i:%s %p'),'--') AS `Hora Entrada`,if((`u`.`idTipoUsuario` <> 1),date_format(`u`.`limite2`,'%h:%i:%s %p'),'--') AS `Hora Salida` from (`usuarios` `u` join `tipousuarios` `t` on((`t`.`id` = `u`.`idTipoUsuario`))) order by `u`.`idTipoUsuario` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-30 22:49:59
